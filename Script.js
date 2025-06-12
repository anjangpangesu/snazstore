let products = [
  {
    id: 1,
    name: "Mobile Legends",
    category: "mobile",
    iconUrl: "../img/mobile-legends.jpeg",
    prices: [
      { productsName: "86 Diamonds", price: "Rp 20.000" },
      { productsName: "172 Diamonds", price: "Rp 40.000" },
      { productsName: "257 Diamonds", price: "Rp 60.000" },
      { productsName: "344 Diamonds", price: "Rp 80.000" },
      { productsName: "429 Diamonds", price: "Rp 100.000" },
      { productsName: "514 Diamonds", price: "Rp 120.000" },
      { productsName: "600 Diamonds", price: "Rp 140.000" },
      { productsName: "706 Diamonds", price: "Rp 160.000" },
      { productsName: "878 Diamonds", price: "Rp 200.000" },
      { productsName: "963 Diamonds", price: "Rp 220.000" },
    ],
    needServer: true,
    formType: "game",
  },
  {
    id: 2,
    name: "Free Fire | Free Fire Max",
    category: "mobile",
    iconUrl: "../img/free-fire.webp",
    prices: [
      { productsName: "100 Diamonds", price: "Rp 15.000" },
      { productsName: "210 Diamonds", price: "Rp 30.000" },
      { productsName: "355 Diamonds", price: "Rp 50.000" },
      { productsName: "720 Diamonds", price: "Rp 100.000" },
      { productsName: "1450 Diamonds", price: "Rp 200.000" },
      { productsName: "2180 Diamonds", price: "Rp 300.000" },
      { productsName: "3640 Diamonds", price: "Rp 500.000" },
    ],
    needServer: false,
    formType: "game",
  },
  {
    id: 3,
    name: "PUBG Mobile",
    category: "mobile",
    iconUrl: "../img/pubgm.jpg",
    prices: [
      { productsName: "60 UC", price: "Rp 15.000" },
      { productsName: "325 UC", price: "Rp 80.000" },
      { productsName: "660 UC", price: "Rp 160.000" },
      { productsName: "1800 UC", price: "Rp 400.000" },
      { productsName: "3850 UC", price: "Rp 800.000" },
      { productsName: "8100 UC", price: "Rp 1.600.000" },
    ],
    needServer: false,
    formType: "game",
  },
  {
    id: 4,
    name: "Valorant",
    category: "pc",
    iconUrl: "../img/valorant.png",
    prices: [
      { productsName: "420 Points", price: "Rp 50.000" },
      { productsName: "700 Points", price: "Rp 80.000" },
      { productsName: "1375 Points", price: "Rp 150.000" },
      { productsName: "2400 Points", price: "Rp 250.000" },
      { productsName: "4000 Points", price: "Rp 400.000" },
      { productsName: "8150 Points", price: "Rp 800.000" },
    ],
    needServer: false,
    formType: "game",
  },
  {
    id: 5,
    name: "IDR Steam Wallet",
    category: "pc",
    iconUrl: "../img/steam-wallet.jpeg",
    prices: [
      { productsName: "IDR 60.000", price: "Rp 65.000" },
      { productsName: "IDR 120.000", price: "Rp 130.000" },
      { productsName: "IDR 250.000", price: "Rp 270.000" },
      { productsName: "IDR 400.000", price: "Rp 430.000" },
      { productsName: "IDR 600.000", price: "Rp 640.000" },
    ],
    needServer: false,
    formType: "game",
  },
  {
    id: 6,
    name: "IDR Google Play",
    category: "voucher",
    iconUrl: "../img/google-play.webp",
    prices: [
      { productsName: "IDR 50.000", price: "Rp 55.000" },
      { productsName: "IDR 100.000", price: "Rp 110.000" },
      { productsName: "IDR 250.000", price: "Rp 275.000" },
      { productsName: "IDR 500.000", price: "Rp 550.000" },
      { productsName: "IDR 1.000.000", price: "Rp 1.100.000" },
      { productsName: "IDR 1.500.000", price: "Rp 1.650.000" },
    ],
    needServer: false,
    formType: "phone",
  },
  {
    id: 7,
    name: "Genshin Impact",
    category: "mobile",
    iconUrl: "../img/Genshin_Impact.webp",
    prices: [
      { productsName: "60 Genesis Crystals", price: "Rp 16.000" },
      { productsName: "300 Genesis Crystals", price: "Rp 80.000" },
      { productsName: "980 Genesis Crystals", price: "Rp 250.000" },
      { productsName: "1980 Genesis Crystals", price: "Rp 480.000" },
      { productsName: "3280 Genesis Crystals", price: "Rp 800.000" },
      { productsName: "6480 Genesis Crystals", price: "Rp 1.600.000" },
    ],
    needServer: true,
    formType: "genshin",
    servers: ["Amerika", "Asia", "Europa", "TW_HK_MO"],
  },
  {
    id: 8,
    name: "Call of Duty Mobile",
    category: "mobile",
    iconUrl: "../img/codm.webp",
    prices: [
      { productsName: "62 CP", price: "Rp 15.000" },
      { productsName: "127 CP", price: "Rp 30.000" },
      { productsName: "320 CP", price: "Rp 75.000" },
      { productsName: "645 CP", price: "Rp 150.000" },
      { productsName: "1373 CP", price: "Rp 300.000" },
      { productsName: "2750 CP", price: "Rp 600.000" },
    ],
    needServer: false,
    formType: "game",
  },
  {
    id: 9,
    name: "Netflix",
    category: "voucher",
    iconUrl: "../img/netflix.webp",
    prices: [
      { productsName: "1 Month", price: "Rp 65.000" },
      { productsName: "3 Months", price: "Rp 180.000" },
      { productsName: "6 Months", price: "Rp 350.000" },
      { productsName: "12 Months", price: "Rp 650.000" },
    ],
    needServer: false,
    formType: "phone",
  },
  {
    id: 10,
    name: "Canva",
    category: "voucher",
    iconUrl: "../img/canva.jpeg",
    prices: [
      { productsName: "1 Month", price: "Rp 55.000" },
      { productsName: "3 Months", price: "Rp 150.000" },
      { productsName: "6 Months", price: "Rp 280.000" },
      { productsName: "12 Months", price: "Rp 550.000" },
    ],
    needServer: false,
    formType: "phone",
  },
  {
    id: 11,
    name: "Playstation Gift Card",
    category: "console",
    iconUrl: "../img/playstation-gc.jpg",
    prices: [
      { productsName: "IDR 100.000", price: "Rp 55.000" },
      { productsName: "IDR 100.000", price: "Rp 150.000" },
      { productsName: "IDR 100.000", price: "Rp 280.000" },
      { productsName: "IDR 100.000", price: "Rp 550.000" },
    ],
    needServer: false,
    formType: "phone",
  },
];

let categories = [
  {
    id: 1,
    name: "Mobile Games",
    code: "mobile",
  },
  {
    id: 2,
    name: "PC Games",
    code: "pc",
  },
  {
    id: 3,
    name: "Console Games",
    code: "console",
  },
  {
    id: 4,
    name: "Voucher",
    code: "voucher",
  },
];

// DOM Elements
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const productsContainer = document.getElementById("products-container");
const searchInput = document.getElementById("search-input");
const categoryFilters = document.querySelectorAll(".category-filter");
const checkoutModal = document.getElementById("checkout-modal");
const closeModal = document.getElementById("close-modal");
const checkoutForm = document.getElementById("checkout-form");
const formFieldsContainer = document.getElementById("form-fields-container");
const successModal = document.getElementById("success-modal");
const closeSuccessModal = document.getElementById("close-success-modal");
const backToProductsBtn = document.getElementById("back-to-products");
const detailPriceList = document.getElementById("detail-price-list");

// Current state
let currentCategory = "all";
let currentProduct = null;
let currentPrice = null;

// Toggle mobile menu
function toggleMobileMenu() {
  mobileMenu.classList.toggle("hidden");
}

// Show section (beranda, produk, or product-detail)
function showSection(section) {
  document.getElementById("beranda").classList.add("hidden");
  document.getElementById("produk").classList.add("hidden");
  document.getElementById("product-detail").classList.add("hidden");
  document.getElementById(section).classList.remove("hidden");

  // Update active nav link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + section) {
      link.classList.add("active");
    }
  });

  // If showing products, render them
  if (section === "produk") {
    renderProducts();
  }
}

// Filter products by category
function filterByCategory(category) {
  currentCategory = category;

  // Update active category button
  categoryFilters.forEach((btn) => {
    btn.classList.remove("active-category", "bg-amber-100", "text-amber-600");
    if (btn.dataset.category === category) {
      btn.classList.add("active-category", "bg-amber-100", "text-amber-600");
    }
  });

  renderProducts();
}

// Show product detail page
function showProductDetail(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  currentProduct = product;

  // Set product details
  document.getElementById("detail-product-icon").src = product.iconUrl;
  document.getElementById("detail-product-name").textContent = product.name;

  // Get category name
  const category = categories.find((c) => c.code === product.category);
  document.getElementById("detail-product-category").textContent = category
    ? category.name
    : product.category;

  // Render all price options
  detailPriceList.innerHTML = "";
  product.prices.forEach((price, index) => {
    const priceCard = document.createElement("div");
    priceCard.className =
      "bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300";
    priceCard.innerHTML = `
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-amber-600 font-semibold">${price.price}</span>
                            <span class="font-medium">${price.productsName}</span>
                        </div>
                        <button class="w-full mt-2 bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-md transition-colors duration-300"
                                onclick="openCheckoutModal(${product.id}, ${index})">
                            Beli Sekarang
                        </button>
                    `;
    detailPriceList.appendChild(priceCard);
  });

  // Show product detail section
  showSection("product-detail");
}

// Render products based on current filters
function renderProducts() {
  const searchTerm = searchInput.value.toLowerCase();

  let filteredProducts = products;

  // Apply category filter
  if (currentCategory !== "all") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === currentCategory
    );
  }

  // Apply search filter
  if (searchTerm) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );
  }

  // Clear products container
  productsContainer.innerHTML = "";

  // Render filtered products
  if (filteredProducts.length === 0) {
    productsContainer.innerHTML = `
                        <div class="col-span-full text-center py-12">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 class="text-xl font-semibold text-gray-700 mb-2">Tidak ada produk ditemukan</h3>
                            <p class="text-gray-500">Coba ubah filter atau kata kunci pencarian Anda</p>
                        </div>
                    `;
    return;
  }

  filteredProducts.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className =
      "bg-white rounded-lg shadow-md overflow-hidden product-card transition-transform duration-300";

    // Show only first 5 prices, if more add a "View Details" button
    const displayPrices = product.prices.slice(0, 5);
    const hasMorePrices = product.prices.length > 5;

    let priceButtons = "";
    displayPrices.forEach((price, index) => {
      priceButtons += `
                            <button class="price-btn w-full border-b border-gray-200 hover:bg-amber-100 transition-colors duration-200" 
                                    data-product-id="${product.id}" 
                                    data-price-index="${index}">
                                <span>${price.productsName}</span>
                                <span class="font-semibold text-amber-600">${price.price}</span>
                            </button>
                        `;
    });

    // Add "View Details" button if there are more than 5 prices
    const viewDetailsButton = hasMorePrices
      ? `
                        <button class="view-details-btn w-full py-3 px-4 text-center bg-amber-500 hover:bg-amber-600 transition-colors duration-300 text-white font-medium" 
                                data-product-id="${product.id}">
                            Lihat Produk Lainnya (${product.prices.length})
                        </button>
                    `
      : "";

    productCard.innerHTML = `
                        <div class="p-5">
                            <div class="flex items-center mb-4">
                                <div class="w-14 h-14 bg-white rounded-lg flex items-center justify-center mr-4">
                                    <img src="${product.iconUrl}" alt="${product.name}" class="product-icon">
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold">${product.name}</h3>
                                    <p class="text-sm text-gray-500">${product.prices.length} produk lainnya</p>
                                </div>
                            </div>
                            <div class="border rounded-lg overflow-hidden">
                                ${priceButtons}
                                ${viewDetailsButton}
                            </div>
                        </div>
                    `;

    productsContainer.appendChild(productCard);
  });

  // Add event listeners to price buttons
  document.querySelectorAll(".price-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = parseInt(btn.dataset.productId);
      const priceIndex = parseInt(btn.dataset.priceIndex);
      openCheckoutModal(productId, priceIndex);
    });
  });

  // Add event listeners to "View Details" buttons
  document.querySelectorAll(".view-details-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const productId = parseInt(btn.dataset.productId);
    const product = products.find((p) => p.id === productId);
    
    if (product) {
      const slug = product.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");
      window.location.hash = `#produk#${slug}`;
      showProductDetail(productId);
    }
  });
});
}

// Generate form fields based on product type
function generateFormFields(product) {
  let formHTML = "";

  switch (product.formType) {
    case "phone":
      // For vouchers - only phone number
      formHTML = `
                            <div class="mb-4">
                                <label for="phone" class="block text-gray-700 font-medium mb-2">Nomor Handphone</label>
                                <input type="text" id="phone" name="phone" pattern="\\d{1,25}" inputmode="numeric" maxlength="25"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg 
                                focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent" required>
                            </div>
                    `;
      break;

    case "genshin":
      // Untuk Genshin Impact - ID Game, Server, Nickname, dan Nomor HP
      formHTML = `
                            <div class="mb-4">
                                <label for="game-id" class="block text-gray-700 font-medium mb-2">ID Game</label>
                                <input type="text" id="game-id" name="game-id" pattern="\\d{1,25}" inputmode="numeric" maxlength="25"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg 
                                focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent" required>
                            </div>
                            <div class="mb-4">
                                <label for="nickname" class="block text-gray-700 font-medium mb-2">Nick In Game</label>
                                <input type="text" id="nickname" name="nickname" maxlength="25"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg 
                                focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent" required>
                            </div>
                            <div class="mb-4">
                                <label for="server" class="block text-gray-700 font-medium mb-2">Server</label>
                                <select id="server" name="server"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg 
                                    focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent" required>
                                    <option value="" disabled selected>Pilih Server</option>
                                     ${product.servers
                                       .map(
                                         (server) =>
                                           `<option value="${server}">${server}</option>`
                                       )
                                       .join("")}
                                </select>
                            </div>
                            <div class="mb-4">
                                <label for="phone" class="block text-gray-700 font-medium mb-2">Nomor Handphone</label>
                                <input type="text" id="phone" name="phone" pattern="\\d{1,25}" inputmode="numeric" maxlength="25"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg 
                                focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent" required>
                            </div>
                    `;
      break;

    case "game":
    default:
      // Untuk game biasa - ID Game, (optional server), Nickname, dan Nomor HP
      formHTML = `
                            <div class="mb-4">
                                <label for="game-id" class="block text-gray-700 font-medium mb-2">ID Game</label>
                                <input type="text" id="game-id" name="game-id" pattern="\\d{1,25}" inputmode="numeric" maxlength="25"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg 
                                focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent" required>
                            </div>
                            <div class="mb-4">
                                <label for="nickname" class="block text-gray-700 font-medium mb-2">Nick In Game</label>
                                <input type="text" id="nickname" name="nickname" maxlength="25"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg 
                                focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent" required>
                             </div>
                    `;

      if (product.needServer && product.name !== "Genshin Impact") {
        formHTML += `
                        <div class="mb-4">
                            <label for="server" class="block text-gray-700 font-medium mb-2">Server</label>
                            <input type="text" id="server" name="server" pattern="\\d{1,25}" inputmode="numeric" maxlength="25"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg 
                            focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent" required>
                        </div>
                        `;
      }

      formHTML += `
                        <div class="mb-4">
                            <label for="phone" class="block text-gray-700 font-medium mb-2">Nomor Handphone</label>
                            <input type="text" id="phone" name="phone" pattern="\\d{1,25}" inputmode="numeric" maxlength="25"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg 
                            focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent" required>
                        </div>
                    `;
      break;
  }

  return formHTML;
}

// Open checkout modal
function openCheckoutModal(productId, priceIndex) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  currentProduct = product;
  currentPrice = product.prices[priceIndex];

  // Set modal content
  document.getElementById("product-name").textContent = product.name;
  document.getElementById(
    "product-price"
  ).textContent = `${currentPrice.productsName} - ${currentPrice.price}`;
  document.getElementById("product-icon-img").src = product.iconUrl;

  // Generate form fields based on product type
  formFieldsContainer.innerHTML = generateFormFields(product);

  // Prevent page scroll
  document.body.style.overflow = "hidden";

  // Show modal
  checkoutModal.classList.remove("hidden");
}

// Close checkout modal
function closeCheckoutModal() {
  checkoutModal.classList.add("hidden");
  document.body.style.overflow = "";
  currentProduct = null;
  currentPrice = null;
}

// Format WhatsApp message based on product type and form data
function formatWhatsAppMessage(product, price, formData) {
  let message = `Halo Min Snaz, Saya ingin membeli produk berikut.\n \n`;
  message += `Nama Produk: ${product.name} - ${price.productsName}\n`;
  message += `Harga: ${price.price}\n`;
  // Add game ID if applicable
  if (product.formType === "game" || product.formType === "genshin") {
    message += `ID Game: ${formData.gameId}\n`;
    message += `Nick In Game: ${formData.nickGame}\n`;
  }

  // Add server if applicable
  if (
    (product.needServer || product.formType === "genshin") &&
    formData.server
  ) {
    message += `Server: ${formData.server}\n`;
  }

  message += `Nomor Handphone: ${formData.phone}\n\n`;
  message += `Tolong segara proses yah min, Terima kasih min.`;

  return encodeURIComponent(message);
}

// Handle checkout form submission
function handleCheckoutSubmit(e) {
  e.preventDefault();

  // Get form values
  const formData = {
    phone: document.getElementById("phone").value,
  };

  // Get game ID if applicable
  if (
    currentProduct.formType === "game" ||
    currentProduct.formType === "genshin"
  ) {
    formData.gameId = document.getElementById("game-id").value;
    formData.nickGame = document.getElementById("nickname").value;
  }

  // Get server if applicable
  if (currentProduct.needServer || currentProduct.formType === "genshin") {
    if (currentProduct.formType === "genshin") {
      formData.server = document.getElementById("server").value;
    } else if (document.getElementById("server")) {
      formData.server = document.getElementById("server").value;
    }
  }

  // Format WhatsApp message
  const message = formatWhatsAppMessage(currentProduct, currentPrice, formData);

  // Create WhatsApp URL
  const whatsappURL = `https://wa.me/6287775314721?text=${message}`;

  // Close checkout modal
  closeCheckoutModal();

  // Open WhatsApp in a new tab
  window.open(whatsappURL, "_blank");

  // Show success message
  document.getElementById(
    "success-message"
  ).textContent = `Terima kasih telah berbelanja di Anjang Store. Anda akan diarahkan ke WhatsApp untuk menyelesaikan pesanan.`;
  successModal.classList.remove("hidden");

  // Reset form
  checkoutForm.reset();
}

// Close success modal
function closeSuccessMessage() {
  successModal.classList.add("hidden");
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  menuToggle.addEventListener("click", toggleMobileMenu);

  // Search input
  searchInput.addEventListener("input", renderProducts);

  // Category filters
  categoryFilters.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterByCategory(btn.dataset.category);
    });
  });

  // Back to products button
  backToProductsBtn.addEventListener("click", () => {
    showSection("produk");
    window.location.hash = "produk";
  });

  // Checkout modal
  closeModal.addEventListener("click", closeCheckoutModal);
  checkoutForm.addEventListener("submit", handleCheckoutSubmit);

  // Success modal
  closeSuccessModal.addEventListener("click", closeSuccessMessage);

  // Show beranda section by default
  showSection("beranda");
});
