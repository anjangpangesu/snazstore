// Configuration
const defaultConfig = {
  site_name: "GameVault",
  hero_title: "Instant Game Top Up",
  admin_whatsapp: "6281213699618",
  // URL ASLI (GANTI JIKA PERLU)
  gas_url:
    "https://script.google.com/macros/s/AKfycbwiwCUuCLFSRxiOlOT_PMPiQxAV7CwuBdIw8FQkhShjmx9z0GNicIZX6xVZefSBw_1yRQ/exec",
};

let config = { ...defaultConfig };
let products = [];
let currentProduct = null;
let selectedNominal = null;
let topupDisplayCount = 15;
let currentFilter = "all";
let currentFilterTopup = "all";

const sliders = {
  hero: { current: 0, total: 3, interval: null },
  topup: { current: 0, total: 3, interval: null },
};

// Initialize
document.addEventListener("DOMContentLoaded", async () => {
  await loadProducts();

  if (document.getElementById("popular-games")) {
    setActiveNav("Home");
    renderPopularGames();
    renderAllGames("home");
    renderFlashSale();
    startSlider("hero");
    animateCounters();
  }

  if (document.getElementById("all-games-topup")) {
    setActiveNav("Top Up");
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get("category");

    if (categoryParam) {
      filterGamesTopup(categoryParam);
    } else {
      renderAllGames("topup");
    }
    startSlider("topup");
    renderFlashSale();
  }

  if (document.getElementById("contact-form")) {
    setActiveNav("Contact");
  }

  if (document.getElementById("product-hero")) {
    setActiveNav("Top Up");
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    if (productId) {
      currentProduct = products.find((p) => p.id === productId);
      renderProductDetail();
    }
  }

  setupEventListeners();
  setupTrackingListener();
});

// --- HELPER FUNCTIONS ---

function setActiveNav(name) {
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.classList.remove("text-primary");
    if (link.textContent.trim() === name) {
      link.classList.add("text-primary");
    }
  });
}

// FETCH PRODUCTS
async function loadProducts() {
  try {
    const response = await fetch(`${config.gas_url}?action=getProducts`);
    if (!response.ok) throw new Error("Network response was not ok");
    products = await response.json();
  } catch (error) {
    console.error("Error loading products:", error);
    try {
      let path = "asset/json/product.json";
      if (window.location.pathname.includes("/page/")) {
        path = "../../asset/json/product.json";
      }
      const response = await fetch(path);
      products = await response.json();
    } catch (e) {}
  }
}

// Slider Functions
function startSlider(sliderId) {
  if (!document.getElementById(`${sliderId}-slider`)) return;
  const slider = sliders[sliderId];
  if (slider.interval) clearInterval(slider.interval);
  slider.interval = setInterval(() => nextSlide(sliderId), 5000);
}

function nextSlide(sliderId) {
  const slider = sliders[sliderId];
  slider.current = (slider.current + 1) % slider.total;
  updateSlider(sliderId);
}

function prevSlide(sliderId) {
  const slider = sliders[sliderId];
  slider.current = (slider.current - 1 + slider.total) % slider.total;
  updateSlider(sliderId);
}

function goToSlide(sliderId, index) {
  sliders[sliderId].current = index;
  updateSlider(sliderId);
}

function updateSlider(sliderId) {
  const container = document.getElementById(`${sliderId}-slider`);
  if (!container) return;
  const track = container.querySelector(".slider-track");
  const dots = container.querySelectorAll(".slider-dot");
  const current = sliders[sliderId].current;

  track.style.transform = `translateX(-${current * 100}%)`;
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === current);
    dot.classList.toggle("bg-white", i === current);
  });
}

// Game Cards
function createGameCard(product, size = "small") {
  const isSmall = size === "small";
  const imageClass = isSmall
    ? "w-full h-32 object-cover"
    : "w-full h-64 object-cover";

  const isInnerPage = window.location.pathname.includes("/page/");
  const productPath = isInnerPage
    ? `../product/product.html?id=${product.id}`
    : `page/product/product.html?id=${product.id}`;

  let rating = parseFloat(product.rating);
  if (isNaN(rating)) rating = 0;

  if (isSmall) {
    return `
      <a href="${productPath}" class="block card-hover bg-white dark:bg-dark rounded-xl overflow-hidden cursor-pointer shadow-sm">
        <div class="relative">
          <img src="${product.image}" alt="${product.name}" class="${imageClass}" loading="lazy" onerror="this.style.background='#e5e7eb'; this.alt='Image unavailable';">
          ${product.discount > 0 ? `<span class="absolute top-2 right-2 px-2 py-1 bg-primary text-white text-xs font-bold rounded-lg">-${product.discount}%</span>` : ""}
        </div>
        <div class="p-3">
          <h3 class="font-medium text-sm truncate text-gray-900 dark:text-white">${product.name}</h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 capitalize">${product.category}</p>
        </div>
      </a>
    `;
  } else {
    return `
      <a href="${productPath}" class="block card-hover bg-white dark:bg-dark rounded-2xl overflow-hidden cursor-pointer shadow-lg">
        <div class="relative">
          <img src="${product.image}" alt="${product.name}" class="${imageClass}" loading="lazy" onerror="this.style.background='#e5e7eb'; this.alt='Image unavailable';">
          ${product.discount > 0 ? `<span class="absolute top-3 right-3 px-3 py-1 bg-primary text-white text-sm font-bold rounded-lg">-${product.discount}%</span>` : ""}
        </div>
        <div class="p-5">
          <span class="text-xs font-medium text-primary uppercase">${product.category}</span>
          <h3 class="font-heading font-semibold text-lg mt-1 text-gray-900 dark:text-white">${product.name}</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">${product.developer}</p>
          <div class="flex items-center gap-1 mt-3 text-yellow-400 text-sm">
            <i class="fas fa-star"></i>
            <span class="text-gray-600 dark:text-gray-400">${rating}</span>
          </div>
        </div>
      </a>
    `;
  }
}

function renderPopularGames() {
  const container = document.getElementById("popular-games");
  if (!container) return;
  const popularProducts = products.filter((p) => p.popular).slice(0, 3);
  container.innerHTML = popularProducts
    .map((p) => createGameCard(p, "large"))
    .join("");
}

function renderAllGames(page) {
  const containerId = page === "home" ? "all-games-home" : "all-games-topup";
  const container = document.getElementById(containerId);
  if (!container) return;
  const filter = page === "home" ? currentFilter : currentFilterTopup;
  const count = page === "home" ? 15 : topupDisplayCount;

  let filtered =
    filter === "all" ? products : products.filter((p) => p.category === filter);
  const displayed = filtered.slice(0, count);

  container.innerHTML = displayed
    .map((p) => createGameCard(p, "small"))
    .join("");

  if (page === "topup") {
    const loadMoreContainer = document.getElementById("load-more-container");
    if (loadMoreContainer) {
      loadMoreContainer.style.display =
        displayed.length >= filtered.length ? "none" : "block";
    }
  }
}

function renderFlashSale() {
  const container = document.getElementById("flash-sale");
  if (!container) return;
  const discountProducts = products.filter((p) => p.discount > 0).slice(0, 3);
  const isInnerPage = window.location.pathname.includes("/page/");

  container.innerHTML = discountProducts
    .map((p) => {
      const productPath = isInnerPage
        ? `../product/product.html?id=${p.id}`
        : `page/product/product.html?id=${p.id}`;

      let basePrice = 0;
      if (p.nominals && p.nominals.length > 0) {
        basePrice = p.nominals[0].price;
      } else if (p.min_price) {
        basePrice = p.min_price;
      }

      const finalPrice = (basePrice * (100 - p.discount)) / 100;

      return `
    <a href="${productPath}" class="block card-hover bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 rounded-2xl overflow-hidden cursor-pointer border border-primary/20">
      <div class="flex gap-4 p-4">
        <img src="${p.image}" alt="${p.name}" class="w-24 h-24 rounded-xl object-cover" loading="lazy" onerror="this.style.background='#e5e7eb'; this.alt='Image unavailable';">
        <div class="flex-1">
          <span class="inline-block px-2 py-1 bg-primary text-white text-xs font-bold rounded-lg mb-2">-${p.discount}%</span>
          <h3 class="font-heading font-semibold text-gray-900 dark:text-white">${p.name}</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">${p.category}</p>
          <p class="text-sm text-primary font-medium mt-2">Starting from IDR ${formatPrice(finalPrice)}</p>
        </div>
      </div>
    </a>
  `;
    })
    .join("");
}

function renderProductDetail() {
  if (!currentProduct) return;

  document.getElementById("product-banner-img").src = currentProduct.banner;
  document.getElementById("product-image").src = currentProduct.image;
  document.getElementById("product-name").textContent = currentProduct.name;
  document.getElementById("product-category").textContent =
    currentProduct.category.charAt(0).toUpperCase() +
    currentProduct.category.slice(1);
  document.getElementById("product-developer").innerHTML =
    `<i class="fas fa-building mr-2"></i>${currentProduct.developer}`;
  document.getElementById("product-description").textContent =
    currentProduct.description;

  const ratingContainer = document.getElementById("product-rating");

  let rating = parseFloat(currentProduct.rating);
  if (isNaN(rating)) rating = 0;

  const percentage = (rating / 5) * 100;

  ratingContainer.innerHTML = `
    <div class="flex items-center gap-1">
      <div class="relative inline-flex">
        <div class="flex text-gray-300 dark:text-gray-600">
          <i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>
        </div>
        <div class="absolute top-0 left-0 flex text-yellow-400 overflow-hidden" style="width: ${percentage}%;">
          <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
        </div>
      </div>
      <span class="text-gray-600 dark:text-gray-400 ml-2">${rating}/5</span>
    </div>
  `;

  renderNominals();
  renderOrderForm();
  selectedNominal = null;
  updateCheckoutButton();
}

function renderNominals() {
  const container = document.getElementById("nominal-grid");
  const groupedNominals = {};

  const nominalList = currentProduct.nominals || [];

  if (nominalList.length === 0) {
    container.innerHTML =
      '<div class="col-span-full text-center text-gray-500 py-8">No nominals available yet.</div>';
    return;
  }

  nominalList.forEach((n) => {
    if (!groupedNominals[n.category]) groupedNominals[n.category] = [];
    groupedNominals[n.category].push(n);
  });

  let html = "";
  Object.keys(groupedNominals).forEach((category) => {
    const nominals = groupedNominals[category];
    const categoryIcon = nominals[0].icon;

    html += `
      <div class="col-span-full mb-6">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg overflow-hidden">
            <img src="${categoryIcon}" alt="${category}" class="w-full h-full object-cover" loading="lazy" onerror="this.src='https://via.placeholder.com/40'">
          </div>
          <h3 class="font-heading font-semibold text-lg text-gray-900 dark:text-white">${category}</h3>
          <div class="flex-1 h-px bg-gray-200 dark:bg-gray-700 ml-2"></div>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          ${nominals
            .map((n) => {
              const discountedPrice =
                currentProduct.discount > 0
                  ? (n.price * (100 - currentProduct.discount)) / 100
                  : n.price;
              return `
              <div onclick="selectNominal('${n.id}')" data-nominal-id="${n.id}" class="nominal-card card-hover bg-white dark:bg-dark rounded-xl p-4 cursor-pointer border-2 border-transparent hover:border-primary/50 transition-all">
                <div class="flex items-center gap-3 mb-3">
                  <div class="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex-shrink-0 overflow-hidden">
                    <img src="${n.icon}" alt="${n.name}" class="w-full h-full object-cover" onerror="this.src='https://via.placeholder.com/40'">
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="font-semibold text-sm truncate text-gray-900 dark:text-white">${n.name}</h4>
                  </div>
                </div>
                ${
                  currentProduct.discount > 0
                    ? `
                  <p class="text-xs text-gray-400 line-through">IDR ${formatPrice(n.price)}</p>
                  <p class="text-primary font-bold">IDR ${formatPrice(discountedPrice)}</p>
                `
                    : `
                  <p class="text-primary font-bold">IDR ${formatPrice(n.price)}</p>
                `
                }
              </div>
            `;
            })
            .join("")}
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

function renderOrderForm() {
  const container = document.getElementById("form-fields");
  const isPremium = currentProduct.category === "premium";

  if (isPremium) {
    container.innerHTML = `
      <div>
        <label class="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Email</label>
        <input type="email" id="form-email" required class="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white" placeholder="Enter your email">
      </div>
      <div>
        <label class="block text-sm font-medium mb-2 text-gray-900 dark:text-white">WhatsApp Number</label>
        <input type="tel" id="form-whatsapp" required class="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white" placeholder="6281213699618">
      </div>
    `;
  } else {
    let serverInputHTML = "";
    if (currentProduct.id === "genshin-impact") {
      serverInputHTML = `
        <div class="relative">
          <select id="form-server" class="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white appearance-none cursor-pointer">
            <option value="" disabled selected>Select Server</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="America">America</option>
            <option value="TW/HK/MO">TW/HK/MO</option>
          </select>
          <div class="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500 dark:text-gray-400">
            <i class="fas fa-chevron-down text-sm"></i>
          </div>
        </div>
      `;
    } else {
      serverInputHTML = `
        <input type="text" id="form-server" class="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white" placeholder="Server ID">
      `;
    }

    container.innerHTML = `
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Game ID</label>
          <input type="text" id="form-game-id" required class="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white" placeholder="Enter Game ID">
        </div>
        <div>
          <label class="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Server</label>
          ${serverInputHTML}
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Nickname</label>
        <input type="text" id="form-nickname" class="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white" placeholder="Enter your nickname">
      </div>
      <div>
        <label class="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Email</label>
        <input type="email" id="form-email" required class="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white" placeholder="Enter your email">
      </div>
      <div>
        <label class="block text-sm font-medium mb-2 text-gray-900 dark:text-white">WhatsApp Number</label>
        <input type="tel" id="form-whatsapp" required class="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white" placeholder="6281213699618">
      </div>
    `;
  }
}

function selectNominal(nominalId) {
  selectedNominal = currentProduct.nominals.find((n) => n.id === nominalId);
  document.querySelectorAll(".nominal-card").forEach((card) => {
    card.classList.remove("selected", "border-primary");
    card.classList.add("border-transparent");
  });
  const selectedCard = document.querySelector(
    `[data-nominal-id="${nominalId}"]`,
  );
  if (selectedCard) {
    selectedCard.classList.add("selected", "border-primary");
    selectedCard.classList.remove("border-transparent");
  }
  updateCheckoutButton();
}

function updateCheckoutButton() {
  const btn = document.getElementById("checkout-btn");
  if (!btn) return;
  if (selectedNominal) {
    const price =
      currentProduct.discount > 0
        ? (selectedNominal.price * (100 - currentProduct.discount)) / 100
        : selectedNominal.price;
    btn.textContent = `Checkout - IDR ${formatPrice(price)}`;
    btn.disabled = false;
    btn.className =
      "w-full py-4 bg-primary hover:bg-red-700 text-white rounded-xl font-semibold transition-colors cursor-pointer";
  } else {
    btn.textContent = "Select a nominal first";
    btn.disabled = true;
    btn.className =
      "w-full py-4 bg-gray-300 dark:bg-gray-700 text-gray-500 rounded-xl font-semibold transition-colors cursor-not-allowed";
  }
}

// --- HELPER UNTUK KONVERSI ANGKA KE ROMAWI ---
function toRoman(num) {
  if (num < 1) return "";
  const lookup = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };
  let roman = "";
  for (let i in lookup) {
    while (num >= lookup[i]) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
}

// --- NEW GENERATE ORDER ID FUNCTION (ASYNC) ---
async function generateOrderId() {
  const now = new Date();
  const yearFull = now.getFullYear();
  const yearShort = yearFull % 100; // 2026 -> 26
  const month = now.getMonth() + 1;
  const date = now.getDate();

  // Format: YYYYMMDD
  const yyyymmdd = `${yearFull}${String(month).padStart(2, "0")}${String(date).padStart(2, "0")}`;

  // Format: Romawi
  const yyRoman = toRoman(yearShort);
  const mmRoman = toRoman(month);

  // Format: 5 Digit Sequence (Default 00001 kalau fetch gagal)
  let sequence = "00001";
  try {
    const response = await fetch(`${config.gas_url}?action=getOrderCount`);
    const data = await response.json();
    // Nomor berikutnya = Jumlah saat ini + 1
    const nextNum = data.count + 1;
    sequence = String(nextNum).padStart(5, "0");
  } catch (e) {
    console.error(
      "Failed to fetch order count for sequence. Using fallback '00001'",
      e,
    );
  }

  // Gabungkan semua: ISS/20260129/XXVI/I/00001
  return `ISS/${yyyymmdd}/${yyRoman}/${mmRoman}/${sequence}`;
}

function getFormData() {
  const isPremium = currentProduct.category === "premium";
  if (isPremium) {
    return {
      email: document.getElementById("form-email")?.value || "",
      whatsapp: document.getElementById("form-whatsapp")?.value || "",
    };
  } else {
    return {
      gameId: document.getElementById("form-game-id")?.value || "",
      server: document.getElementById("form-server")?.value || "",
      nickname: document.getElementById("form-nickname")?.value || "",
      email: document.getElementById("form-email")?.value || "",
      whatsapp: document.getElementById("form-whatsapp")?.value || "",
    };
  }
}

function showCheckoutModal() {
  if (!selectedNominal) {
    showToast("Please select a nominal first", "error");
    return;
  }
  const formData = getFormData();
  const isPremium = currentProduct.category === "premium";

  if (isPremium) {
    if (!formData.email || !formData.whatsapp) {
      showToast("Please fill all required fields", "error");
      return;
    }
  } else {
    if (!formData.gameId || !formData.email || !formData.whatsapp) {
      showToast("Please fill all required fields", "error");
      return;
    }
  }

  const price =
    currentProduct.discount > 0
      ? (selectedNominal.price * (100 - currentProduct.discount)) / 100
      : selectedNominal.price;

  let accountInfo = "";
  if (isPremium) {
    accountInfo = `
      <div class="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
        <div class="mb-3">
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Email</p>
            <p class="font-medium text-gray-900 dark:text-white break-all">${formData.email}</p>
        </div>
        <div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">WhatsApp</p>
            <p class="font-medium text-gray-900 dark:text-white">${formData.whatsapp}</p>
        </div>
      </div>
    `;
  } else {
    accountInfo = `
      <div class="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 space-y-3">
        <div class="flex justify-between">
          <span class="text-sm text-gray-500 dark:text-gray-400">Game ID</span>
          <span class="font-medium text-gray-900 dark:text-white">${formData.gameId}</span>
        </div>
        ${formData.server ? `<div class="flex justify-between"><span class="text-sm text-gray-500 dark:text-gray-400">Server</span><span class="font-medium text-gray-900 dark:text-white">${formData.server}</span></div>` : ""}
        ${formData.nickname ? `<div class="flex justify-between"><span class="text-sm text-gray-500 dark:text-gray-400">Nickname</span><span class="font-medium text-gray-900 dark:text-white">${formData.nickname}</span></div>` : ""}
        
        <div class="border-t border-gray-200 dark:border-gray-700 my-2 pt-2"></div>
        
        <div class="flex justify-between">
            <span class="text-sm text-gray-500 dark:text-gray-400">Email</span>
            <span class="font-medium text-gray-900 dark:text-white text-right break-all max-w-[60%]">${formData.email}</span>
        </div>
        <div class="flex justify-between">
            <span class="text-sm text-gray-500 dark:text-gray-400">WhatsApp</span>
            <span class="font-medium text-gray-900 dark:text-white">${formData.whatsapp}</span>
        </div>
      </div>
    `;
  }

  document.getElementById("checkout-content").innerHTML = `
    <div class="flex items-center gap-4 pb-4 border-b dark:border-gray-700">
      <img src="${currentProduct.image}" alt="${currentProduct.name}" class="w-16 h-16 rounded-xl object-cover">
      <div>
        <h4 class="font-semibold text-gray-900 dark:text-white">${currentProduct.name}</h4>
        <p class="text-sm text-gray-500 dark:text-gray-400">${selectedNominal.name}</p>
      </div>
    </div>
    ${accountInfo}
    <div class="bg-primary/10 rounded-xl p-4">
      <div class="flex justify-between items-center">
        <span class="font-medium text-gray-900 dark:text-primary">Total Price</span>
        <span class="text-xl font-bold text-primary">IDR ${formatPrice(price)}</span>
      </div>
    </div>
  `;
  openModal("checkout");
}

function recheckOrder() {
  closeModal("checkout");
}

// CONFIRM ORDER - UPDATED UNTUK HANDLE ASYNC GENERATE ID
async function confirmOrder() {
  const btn = document.querySelector(
    '#checkout-modal button[onclick="confirmOrder()"]',
  );
  const originalText = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

  const formData = getFormData();
  const price =
    currentProduct.discount > 0
      ? (selectedNominal.price * (100 - currentProduct.discount)) / 100
      : selectedNominal.price;
  const isPremium = currentProduct.category === "premium";

  // GENERATE ID (MENUNGGU RESPONSE BACKEND)
  const orderId = await generateOrderId();

  const orderData = {
    action: "createOrder",
    orderId: orderId,
    productName: currentProduct.name,
    nominal: selectedNominal.name,
    price: price,
    gameId: formData.gameId || "",
    server: formData.server || "",
    nickname: formData.nickname || "",
    email: formData.email,
    whatsapp: formData.whatsapp,
  };

  fetch(config.gas_url, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  }).catch((err) => console.error("Order submit failed:", err));

  let orderText = `*NEW ORDER*%0A%0AOrder ID: ${orderId}%0AProduct: ${currentProduct.name}%0ANominal: ${selectedNominal.name}%0APrice: IDR ${formatPrice(price)}%0A%0A*Account Info*%0A`;
  if (isPremium) {
    orderText += `Email: ${formData.email}%0AWhatsApp: ${formData.whatsapp}`;
  } else {
    orderText += `Game ID: ${formData.gameId}%0A`;
    if (formData.server) orderText += `Server: ${formData.server}%0A`;
    if (formData.nickname) orderText += `Nickname: ${formData.nickname}%0A`;
    orderText += `Email: ${formData.email}%0AWhatsApp: ${formData.whatsapp}`;
  }

  window.open(
    `https://wa.me/${config.admin_whatsapp}?text=${orderText}`,
    "_blank",
  );
  closeModal("checkout");
  showToast("Order created! Redirecting to WhatsApp...", "success");

  btn.disabled = false;
  btn.innerHTML = originalText;
}

function filterGames(category) {
  currentFilter = category;
  updateFilterButtons(".filter-btn", category);
  renderAllGames("home");
}

function filterGamesTopup(category) {
  currentFilterTopup = category;
  topupDisplayCount = 15;
  updateFilterButtons(".filter-btn-topup", category);
  renderAllGames("topup");
}

function updateFilterButtons(selector, active) {
  document.querySelectorAll(selector).forEach((btn) => {
    const btnText = btn.textContent.trim().toLowerCase();
    const isActive =
      btnText === active.toLowerCase() ||
      (active === "all" && btnText === "all");

    if (isActive) {
      btn.classList.add("active", "bg-primary", "text-white");
      btn.classList.remove(
        "bg-gray-200",
        "dark:bg-gray-700",
        "hover:bg-primary",
        "hover:text-white",
      );
    } else {
      btn.classList.remove("active", "bg-primary", "text-white");
      btn.classList.add(
        "bg-gray-200",
        "dark:bg-gray-700",
        "hover:bg-primary",
        "hover:text-white",
      );
    }
  });
}

function loadMoreGames() {
  topupDisplayCount += 5;
  renderAllGames("topup");
}

function formatPrice(price) {
  return Math.round(price)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
function toggleDarkMode() {
  document.documentElement.classList.toggle("dark");
  localStorage.setItem(
    "darkMode",
    document.documentElement.classList.contains("dark"),
  );
}
function toggleMobileMenu() {
  document.getElementById("mobile-menu").classList.toggle("hidden");
}
function toggleFaq(btn) {
  const content = btn.nextElementSibling;
  const icon = btn.querySelector("i");
  content.classList.toggle("hidden");
  icon.style.transform = content.classList.contains("hidden")
    ? "rotate(0deg)"
    : "rotate(180deg)";
}
function openModal(modalId) {
  document.getElementById(`${modalId}-modal`).classList.add("active");
  document.body.style.overflow = "hidden";
}
function closeModal(modalId) {
  document.getElementById(`${modalId}-modal`).classList.remove("active");
  document.body.style.overflow = "";
}
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  const icon = document.getElementById("toast-icon");
  const msg = document.getElementById("toast-message");
  msg.textContent = message;
  icon.className =
    type === "success"
      ? "fas fa-check-circle text-green-500"
      : "fas fa-exclamation-circle text-red-500";
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), 3000);
}

function animateCounters() {
  const counters = document.querySelectorAll(".counter");
  if (counters.length === 0) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.dataset.target);
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;
          const animate = () => {
            current += step;
            if (current < target) {
              counter.textContent = Math.floor(current).toLocaleString();
              requestAnimationFrame(animate);
            } else {
              counter.textContent = target.toLocaleString();
            }
          };
          animate();
          observer.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 },
  );
  counters.forEach((counter) => observer.observe(counter));
}

function navigateToProduct(productId) {
  const isInnerPage = window.location.pathname.includes("/page/");
  const path = isInnerPage
    ? `../product/product.html?id=${productId}`
    : `page/product/product.html?id=${productId}`;
  window.location.href = path;
}

function setupEventListeners() {
  const orderForm = document.getElementById("order-form");
  if (orderForm)
    orderForm.addEventListener("submit", (e) => {
      e.preventDefault();
      showCheckoutModal();
    });

  const contactForm = document.getElementById("contact-form");
  if (contactForm)
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("contact-name").value;
      const email = document.getElementById("contact-email").value;
      const phone = document.getElementById("contact-phone").value;
      const message = document.getElementById("contact-message").value;
      const text = `*Contact Form*%0A%0AName: ${name}%0AEmail: ${email}%0APhone: ${phone}%0A%0AMessage: ${message}`;
      window.open(
        `https://wa.me/${config.admin_whatsapp}?text=${text}`,
        "_blank",
      );
      showToast("Redirecting to WhatsApp...", "success");
    });

  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");
  if (searchInput && searchResults) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (query.length > 0) {
        const filtered = products.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query) ||
            p.developer.toLowerCase().includes(query),
        );
        if (filtered.length > 0) {
          searchResults.innerHTML = filtered
            .slice(0, 6)
            .map(
              (p) => `
            <div onclick="navigateToProduct('${p.id}')" class="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors border-b dark:border-gray-700 last:border-b-0">
              <img src="${p.image}" alt="${p.name}" class="w-12 h-12 rounded-lg object-cover">
              <div class="flex-1">
                <h4 class="font-medium text-sm text-gray-900 dark:text-white">${p.name}</h4>
                <p class="text-xs text-gray-500 dark:text-gray-400 capitalize">${p.category} • ${p.developer}</p>
              </div>
              <i class="fas fa-chevron-right text-gray-400 text-sm"></i>
            </div>
          `,
            )
            .join("");
          searchResults.classList.remove("hidden");
        } else {
          searchResults.innerHTML =
            '<div class="p-4 text-center text-gray-500 text-sm">No games found</div>';
          searchResults.classList.remove("hidden");
        }
      } else {
        searchResults.classList.add("hidden");
      }
    });
    document.addEventListener("click", (e) => {
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target))
        searchResults.classList.add("hidden");
    });
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        searchResults.classList.add("hidden");
        searchInput.blur();
      }
    });
  }
}

function setupTrackingListener() {
  const trackBtn = document.getElementById("btn-track-order");
  if (trackBtn) {
    trackBtn.addEventListener("click", () => openModal("tracking"));
  }
}

async function checkOrderStatus() {
  const input = document.getElementById("tracking-order-id");
  const resultDiv = document.getElementById("tracking-result");
  const orderId = input.value.trim();

  if (!orderId) {
    showToast("Please enter Order ID", "error");
    return;
  }

  resultDiv.innerHTML =
    '<div class="text-center py-4"><i class="fas fa-spinner fa-spin text-primary text-2xl"></i></div>';

  try {
    const response = await fetch(
      `${config.gas_url}?action=trackOrder&orderId=${orderId}`,
    );
    const data = await response.json();

    if (data.found) {
      let statusColor = "text-yellow-500";
      if (data.status === "Diproses") statusColor = "text-blue-500";
      if (data.status === "Selesai") statusColor = "text-green-500";

      resultDiv.innerHTML = `
                <div class="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 mt-4">
                    <div class="flex justify-between mb-2">
                        <span class="text-sm text-gray-500">Order ID</span>
                        <span class="font-medium dark:text-white">${data.orderId}</span>
                    </div>
                    <div class="flex justify-between mb-2">
                        <span class="text-sm text-gray-500">Product</span>
                        <span class="font-medium dark:text-white">${data.product} - ${data.nominal}</span>
                    </div>
                    <div class="flex justify-between mb-2">
                        <span class="text-sm text-gray-500">Status</span>
                        <span class="font-bold ${statusColor}">${data.status}</span>
                    </div>
                </div>
            `;
    } else {
      resultDiv.innerHTML =
        '<div class="text-center text-gray-500 py-4">Order ID not found.</div>';
    }
  } catch (error) {
    resultDiv.innerHTML =
      '<div class="text-center text-red-500 py-4">Error tracking order.</div>';
  }
}
