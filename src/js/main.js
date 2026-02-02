// =========================================
// 1. CONFIGURATION & STATE
// =========================================
const defaultConfig = {
  site_name: "SnazStore",
  hero_title: "Instant Game Top Up",
  admin_whatsapp: "6287775314721",
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
let currentLang = localStorage.getItem("site_lang") || "id";

const sliders = {
  hero: { current: 0, total: 3, interval: null },
  topup: { current: 0, total: 3, interval: null },
};

// =========================================
// 2. TRANSLATION DICTIONARY
// =========================================
const translations = {
  id: {
    sect_why_choose:
      "Mengapa Memilih <span class='text-primary'>SnazStore</span>?",
    limited_time: "Waktu Terbatas",
    starting_from: "Mulai dari IDR",
    flash_sale_price: "IDR",
    nav_home: "Beranda",
    nav_topup: "Top Up",
    nav_track: "Lacak Pesanan",
    nav_contact: "Kontak",
    search_placeholder: "Cari game atau aplikasi...",
    hero_title: "Top Up Game Instan",
    hero_subtitle: "Cepat, Aman & Terpercaya",
    btn_topup_now: "Top Up Sekarang",
    hero_flash_title: "Flash Sale Mingguan",
    hero_flash_subtitle: "Diskon hingga 30% untuk item pilihan",
    btn_view_deals: "Lihat Promo",
    hero_support_title: "Layanan 24/7",
    hero_support_subtitle: "Kami siap membantu kapanpun kamu butuh",
    btn_contact_us: "Hubungi Kami",
    feat_fast_title: "Proses Cepat",
    feat_fast_desc: "Pengiriman instan dalam 1-5 menit setelah pembayaran",
    feat_trusted_title: "100% Terpercaya",
    feat_trusted_desc: "Partner resmi SnazStore, aman dan 100% legal",
    feat_guarantee_title: "Garansi Uang Kembali",
    feat_guarantee_desc: "Refund penuh jika pesanan gagal dalam 24 jam",
    sec_popular: "Game Populer",
    btn_view_all: "Lihat Semua",
    stats_games: "Total Game",
    stats_products: "Produk Voucher",
    stats_trans: "Transaksi",
    sec_all_games: "Semua Layanan",
    btn_show_more: "Tampilkan Lebih Banyak",
    btn_load_more: "Muat Lebih Banyak",
    sec_faq: "Pertanyaan Umum",
    faq_1_q: "Berapa lama proses top up?",
    faq_1_a:
      "Proses hanya memakan waktu 1-5 menit saja setelah konfirmasi pembayaran.",
    faq_2_q: "Metode pembayaran apa saja yang tersedia?",
    faq_2_a:
      "Kami menerima pembayaran via QRIS, E-Wallet (GoPay, ShopeePay), dan Bank Jago.",
    faq_3_q: "Proses sudah 5 menit, tapi belum masuk?",
    faq_3_a:
      "Tenang saja, jika pesanan belum diterima, mohon tunggu 1x24 jam atau hubungi CS kami.",
    faq_4_q: "Langganan berakhir sebelum waktunya?",
    faq_4_a: "Silakan hubungi customer service kami untuk klaim garansi.",
    back_to_topup: "Kembali ke Top Up",
    label_nominal: "Pilih Nominal",
    label_account: "Informasi Akun",
    prod_faq_title: "Cara Top Up & Info Penting",
    prod_faq_1_q: "Bagaimana cara melakukan pemesanan?",
    prod_faq_1_a:
      "Masukkan Data Akun > Pilih Nominal > Masukkan Kontak > Klik Pesan Sekarang > Lakukan Pembayaran.",
    prod_faq_2_q: "Apakah layanan ini buka 24 Jam?",
    prod_faq_2_a: "Ya, sistem kami beroperasi otomatis 24 jam non-stop.",
    prod_faq_3_q: "Butuh bantuan?",
    prod_faq_3_a: "Hubungi WhatsApp Admin jika mengalami kendala.",
    label_game_id: "ID Game",
    label_server: "Server",
    label_nickname: "Nickname",
    label_email: "Email",
    label_whatsapp: "Nomor WhatsApp",
    text_select_server: "Pilih Server",
    placeholder_game_id: "Masukkan ID Game",
    placeholder_server: "ID Server",
    placeholder_nickname: "Masukkan Nickname (Opsional)",
    placeholder_email: "Masukkan email aktif",
    placeholder_whatsapp: "Contoh: 087775314721",
    btn_checkout_default: "Pilih nominal dulu",
    modal_summary: "Ringkasan Pesanan",
    label_total: "Total Harga",
    btn_recheck: "Cek Ulang",
    btn_confirm: "Pesan Sekarang",
    modal_track_title: "Lacak Pesanan",
    label_order_id: "ID Pesanan",
    placeholder_order_id: "Masukkan Order ID (Contoh: ISS/...)",
    label_product: "Produk",
    label_status: "Status",
    label_account_info: "Akun",
    btn_check_status: "Cek Status",
    status_pending: "Menunggu Pembayaran",
    status_process: "Pesanan Diproses",
    status_success: "Pesanan Selesai",
    status_canceled: "Pesanan Dibatalkan",
    footer_desc:
      "Partner top up game & aplikasi premium terpercaya. Cepat, aman, dan 100% legal.",
    quick_links: "Link Cepat",
    categories: "Kategori",
    contact_us: "Hubungi Kami",
    rights: "Hak Cipta Dilindungi.",
    contact_title: "Hubungi Kami",
    contact_subtitle: "Kami siap membantu 24/7",
    form_title: "Kirim Pesan",
    label_fullname: "Nama Lengkap",
    label_message: "Pesan",
    placeholder_fullname: "Masukkan nama",
    placeholder_message: "Tulis pesanmu...",
    btn_send_wa: "Kirim via WhatsApp",
    info_title: "Info Kontak",
    op_hours: "Jam Operasional",
    op_desc: "Senin - Minggu: 07.00 - 22.00 WIB",
    follow_us: "Ikuti Kami",
  },
  en: {
    sect_why_choose: "Why Choose <span class='text-primary'>SnazStore</span>?",
    limited_time: "Limited Time",
    starting_from: "Starting from IDR",
    flash_sale_price: "IDR",
    nav_home: "Home",
    nav_topup: "Top Up",
    nav_track: "Track Order",
    nav_contact: "Contact",
    search_placeholder: "Search games or apps...",
    hero_title: "Instant Game Top Up",
    hero_subtitle: "Fast, Secure & Reliable",
    btn_topup_now: "Top Up Now",
    hero_flash_title: "Weekly Flash Sale",
    hero_flash_subtitle: "Up to 30% discount on selected items",
    btn_view_deals: "View Deals",
    hero_support_title: "24/7 Support",
    hero_support_subtitle: "We are here to help anytime you need",
    btn_contact_us: "Contact Us",
    feat_fast_title: "Fast Process",
    feat_fast_desc: "Instant delivery within 1-5 minutes after payment",
    feat_trusted_title: "100% Trusted",
    feat_trusted_desc: "Official SnazStore partner, secure and 100% legal",
    feat_guarantee_title: "Money Back Guarantee",
    feat_guarantee_desc: "Full refund if the order fails within 24 hours",
    sec_popular: "Popular Games",
    btn_view_all: "View All",
    stats_games: "Total Games",
    stats_products: "Voucher Products",
    stats_trans: "Transactions",
    sec_all_games: "All Services",
    btn_show_more: "Show More",
    btn_load_more: "Load More",
    sec_faq: "Frequently Asked Questions",
    faq_1_q: "How long does the top up take?",
    faq_1_a:
      "The process usually takes 1-5 minutes after payment confirmation.",
    faq_2_q: "What payment methods are available?",
    faq_2_a: "We accept QRIS, E-Wallets (GoPay, ShopeePay), and Bank Jago.",
    faq_3_q: "It's been 5 minutes, order not received?",
    faq_3_a: "Don't worry, please wait within 1x24 hours or contact our CS.",
    faq_4_q: "Subscription ended early?",
    faq_4_a: "Please contact our customer service for warranty claims.",
    back_to_topup: "Back to Top Up",
    label_nominal: "Select Nominal",
    label_account: "Account Information",
    prod_faq_title: "How to Order & Info",
    prod_faq_1_q: "How to place an order?",
    prod_faq_1_a:
      "Enter Account Data > Select Nominal > Enter Contact > Click Order Now > Make Payment.",
    prod_faq_2_q: "Is this service available 24/7?",
    prod_faq_2_a: "Yes, our system operates automatically 24 hours non-stop.",
    prod_faq_3_q: "Need help?",
    prod_faq_3_a: "Contact our WhatsApp Admin if you face any issues.",
    label_game_id: "Game ID",
    label_server: "Server",
    label_nickname: "Nickname",
    label_email: "Email",
    label_whatsapp: "WhatsApp Number",
    text_select_server: "Select Server",
    placeholder_game_id: "Enter Game ID",
    placeholder_server: "Server ID",
    placeholder_nickname: "Enter Nickname (Optional)",
    placeholder_email: "Enter valid email",
    placeholder_whatsapp: "Example: 087775314721",
    btn_checkout_default: "Select a nominal first",
    modal_summary: "Order Summary",
    label_total: "Total Price",
    btn_recheck: "Recheck Data",
    btn_confirm: "Order Now",
    modal_track_title: "Track Order",
    label_order_id: "Order ID",
    placeholder_order_id: "Enter Order ID (Ex: ISS/...)",
    label_product: "Product",
    label_status: "Status",
    label_account_info: "Account",
    btn_check_status: "Check Status",
    status_pending: "Pending Payment",
    status_process: "Processing",
    status_success: "Completed",
    status_canceled: "Canceled",
    footer_desc:
      "Trusted premium game & app top-up partner. Fast, secure, and 100% legal.",
    quick_links: "Quick Links",
    categories: "Categories",
    contact_us: "Contact Us",
    rights: "All rights reserved.",
    contact_title: "Contact Us",
    contact_subtitle: "We're here to help you 24/7",
    form_title: "Send us a message",
    label_fullname: "Full Name",
    label_message: "Message",
    placeholder_fullname: "Enter your name",
    placeholder_message: "How can we help you?",
    btn_send_wa: "Send via WhatsApp",
    info_title: "Get in touch",
    op_hours: "Operating Hours",
    op_desc: "Mon - Sun: 07.00 - 22.00 WIB",
    follow_us: "Follow us",
  },
};

// =========================================
// 3. INITIALIZATION
// =========================================
document.addEventListener("DOMContentLoaded", async () => {
  setupLanguage();

  if (document.getElementById("popular-games")) {
    setActiveNav("nav_home");
  } else if (document.getElementById("all-games-topup")) {
    setActiveNav("nav_topup");
  } else if (document.getElementById("contact-form")) {
    setActiveNav("nav_contact");
  } else if (document.getElementById("product-hero")) {
    setActiveNav("nav_topup");
  }

  await loadProducts();

  if (document.getElementById("popular-games")) {
    renderPopularGames();
    renderAllGames("home");
    renderFlashSale();
    startSlider("hero");
    animateCounters();
  }

  if (document.getElementById("all-games-topup")) {
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

  if (document.getElementById("product-hero")) {
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

// =========================================
// 4. CORE FUNCTIONS
// =========================================

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

function setActiveNav(targetKey) {
  const navLinks = document.querySelectorAll(
    ".nav-link, #mobile-menu a, #mobile-menu button",
  );

  navLinks.forEach((link) => {
    link.classList.remove("text-primary");
  });

  let activated = false;
  if (targetKey) {
    navLinks.forEach((link) => {
      if (link.getAttribute("data-i18n") === targetKey) {
        link.classList.add("text-primary");
        activated = true;
      }
    });
  }

  if (!activated) {
    navLinks.forEach((link) => {
      if (link.getAttribute("href") && link.href === window.location.href) {
        link.classList.add("text-primary");
      }
    });
  }
}

function setupLanguage() {
  const btnId = document.getElementById("lang-id");
  const btnEn = document.getElementById("lang-en");

  if (btnId && btnEn) {
    if (currentLang === "id") {
      btnId.classList.add("font-bold", "text-primary");
      btnEn.classList.remove("font-bold", "text-primary");
    } else {
      btnEn.classList.add("font-bold", "text-primary");
      btnId.classList.remove("font-bold", "text-primary");
    }
  }
  applyTranslations();

  setTimeout(() => {
    document.body.classList.remove("lang-loading");
    document.body.classList.add("lang-loaded");
  }, 50);
}

function changeLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("site_lang", lang);
  setupLanguage();
  if (currentProduct) {
    renderProductDetail();
  }
  renderFlashSale();
}

function applyTranslations() {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[currentLang][key]) {
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.placeholder = translations[currentLang][key];
      } else {
        const icon = el.querySelector("i");
        if (icon) {
          const iconHtml = icon.outerHTML;
          el.innerHTML = iconHtml + " " + translations[currentLang][key];
        } else {
          el.innerHTML = translations[currentLang][key];
        }
      }
    }
  });
}

// =========================================
// 5. SLIDER & RENDER FUNCTIONS
// =========================================

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

  let discountedItems = [];
  products.forEach((product) => {
    if (product.nominals && product.nominals.length > 0) {
      product.nominals.forEach((nominal) => {
        const disc = parseFloat(nominal.discount);
        if (!isNaN(disc) && disc > 0) {
          discountedItems.push({ product: product, nominal: nominal });
        }
      });
    }
  });

  const displayItems = discountedItems.slice(0, 3);
  const isInnerPage = window.location.pathname.includes("/page/");
  const lang = translations[currentLang];

  if (displayItems.length === 0) {
    container.innerHTML = `<div class="col-span-full text-center text-gray-500">No Flash Sale available right now.</div>`;
    return;
  }

  container.innerHTML = displayItems
    .map((item) => {
      const p = item.product;
      const n = item.nominal;
      const productPath = isInnerPage
        ? `../product/product.html?id=${p.id}&nominal=${n.id}`
        : `page/product/product.html?id=${p.id}&nominal=${n.id}`;

      const disc = parseFloat(n.discount);
      const finalPrice = (n.price * (100 - disc)) / 100;

      return `
    <a href="${productPath}" class="block card-hover bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 rounded-2xl overflow-hidden cursor-pointer border border-primary/20">
      <div class="flex gap-4 p-4">
        <div class="relative w-24 h-24 flex-shrink-0">
            <img src="${p.image}" alt="${p.name}" class="w-full h-full rounded-xl object-cover" loading="lazy">
            <div class="absolute -bottom-2 -right-2 w-10 h-10 bg-white dark:bg-dark rounded-full p-1 shadow-md flex items-center justify-center">
                <img src="${n.icon}" class="w-8 h-8 object-contain rounded-full" onerror="this.style.display='none'">
            </div>
        </div>
        <div class="flex-1 min-w-0">
          <span class="inline-block px-2 py-1 bg-primary text-white text-xs font-bold rounded-lg mb-2">-${disc}%</span>
          <h3 class="font-heading font-semibold text-gray-900 dark:text-white truncate">${p.name}</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 truncate">${n.name}</p>
          <div class="mt-2">
            <p class="text-xs text-gray-400 line-through">IDR ${formatPrice(n.price)}</p>
            <p class="text-sm text-primary font-bold">IDR ${formatPrice(finalPrice)}</p>
          </div>
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

  const desc =
    currentLang === "id"
      ? currentProduct.description_id || currentProduct.description
      : currentProduct.description_en || currentProduct.description;
  document.getElementById("product-description").textContent =
    desc || "No description available.";

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
  renderProductFAQ();

  const urlParams = new URLSearchParams(window.location.search);
  const autoSelectId = urlParams.get("nominal");
  if (autoSelectId) {
    setTimeout(() => {
      selectNominal(autoSelectId);
    }, 100);
  } else {
    selectedNominal = null;
    updateCheckoutButton();
  }
}

function renderProductFAQ() {
  const listContainer = document.getElementById("product-faq-list");
  if (!listContainer) return;

  const lang = translations[currentLang];

  let rawData =
    currentLang === "id" ? currentProduct.faq_id : currentProduct.faq_en;

  let htmlContent = "";

  try {
    if (rawData && String(rawData).trim() !== "") {
      let cleanJson = String(rawData)
        .trim()
        .replace(/(\r\n|\n|\r)/gm, "");
      const faqArray = JSON.parse(cleanJson);

      if (Array.isArray(faqArray)) {
        htmlContent = faqArray
          .map(
            (item) => `
          <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 transition-all hover:shadow-md">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-2 flex items-start gap-2 leading-snug">
              <i class="fas fa-question-circle text-primary mt-1 text-xs flex-shrink-0"></i>
              <span>${item.q}</span>
            </h4>
            <p class="text-sm text-gray-600 dark:text-gray-400 pl-5 leading-relaxed">${item.a}</p>
          </div>
        `,
          )
          .join('<div class="h-3"></div>');
      }
    }
  } catch (e) {
    console.warn("FAQ JSON Parsing Error:", e);
  }

  if (htmlContent !== "") {
    listContainer.innerHTML = htmlContent;
  } else {
    listContainer.innerHTML = `<div class="text-center text-gray-400 text-sm py-4 italic">Tidak ada info tambahan.</div>`;
  }
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
              const disc = parseFloat(n.discount);
              const hasDiscount = !isNaN(disc) && disc > 0;
              const finalPrice = hasDiscount
                ? (n.price * (100 - disc)) / 100
                : n.price;
              return `
              <div onclick="selectNominal('${n.id}')" data-nominal-id="${n.id}" class="nominal-card card-hover bg-white dark:bg-dark rounded-xl p-3 sm:p-4 cursor-pointer border-2 border-transparent hover:border-primary/50 transition-all relative">
                ${hasDiscount ? `<span class="absolute top-2 right-2 px-1.5 py-0.5 bg-primary text-white text-[10px] font-bold rounded">- ${disc}%</span>` : ""}
                <div class="flex items-center gap-3 mb-3">
                  <div class="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex-shrink-0 overflow-hidden">
                    <img src="${n.icon}" alt="${n.name}" class="w-full h-full object-cover" onerror="this.src='https://via.placeholder.com/40'">
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="font-semibold text-xs sm:text-sm text-gray-900 dark:text-white leading-snug break-words">${n.name}</h4>
                  </div>
                </div>
                ${
                  hasDiscount
                    ? `<p class="text-xs text-gray-400 line-through">IDR ${formatPrice(n.price)}</p><p class="text-primary font-bold">IDR ${formatPrice(finalPrice)}</p>`
                    : `<p class="text-primary font-bold">IDR ${formatPrice(n.price)}</p>`
                }
              </div>`;
            })
            .join("")}
        </div>
      </div>`;
  });
  container.innerHTML = html;
}

function renderOrderForm() {
  const container = document.getElementById("form-fields");
  const isPremium = currentProduct.category === "premium";
  const lang = translations[currentLang];

  if (isPremium) {
    container.innerHTML = `
      <div>
        <label class="block text-sm font-medium mb-2 text-gray-900 dark:text-white">${lang.label_email}</label>
        <input type="email" id="form-email" required class="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white" placeholder="${lang.placeholder_email}">
      </div>
      <div>
        <label class="block text-sm font-medium mb-2 text-gray-900 dark:text-white">${lang.label_whatsapp}</label>
        <input type="tel" id="form-whatsapp" required class="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white" placeholder="${lang.placeholder_whatsapp}">
      </div>
    `;
  } else {
    let serverInputHTML = "";
    if (
      currentProduct.server_type &&
      String(currentProduct.server_type).trim().length > 0
    ) {
      const serverList = currentProduct.server_type.split(",");
      const options = serverList
        .map((s) => `<option value="${s.trim()}">${s.trim()}</option>`)
        .join("");
      serverInputHTML = `
        <div class="relative">
          <select id="form-server" class="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white appearance-none cursor-pointer">
            <option value="" disabled selected>${lang.text_select_server}</option>
            ${options}
          </select>
          <div class="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500 dark:text-gray-400"><i class="fas fa-chevron-down text-sm"></i></div>
        </div>`;
    } else {
      serverInputHTML = `<input type="text" id="form-server" class="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white" placeholder="${lang.placeholder_server}">`;
    }

    container.innerHTML = `
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-2 text-gray-900 dark:text-white">${lang.label_game_id}</label>
          <input type="text" id="form-game-id" required class="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white" placeholder="${lang.placeholder_game_id}">
        </div>
        <div>
          <label class="block text-sm font-medium mb-2 text-gray-900 dark:text-white">${lang.label_server}</label>
          ${serverInputHTML}
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium mb-2 text-gray-900 dark:text-white">${lang.label_nickname}</label>
        <input type="text" id="form-nickname" class="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white" placeholder="${lang.placeholder_nickname}">
      </div>
      <div>
        <label class="block text-sm font-medium mb-2 text-gray-900 dark:text-white">${lang.label_email}</label>
        <input type="email" id="form-email" required class="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white" placeholder="${lang.placeholder_email}">
      </div>
      <div>
        <label class="block text-sm font-medium mb-2 text-gray-900 dark:text-white">${lang.label_whatsapp}</label>
        <input type="tel" id="form-whatsapp" required class="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white" placeholder="${lang.placeholder_whatsapp}">
      </div>
    `;
  }
}

// =========================================
// 8. CHECKOUT LOGIC & HELPERS
// =========================================

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
  const lang = translations[currentLang];
  if (selectedNominal) {
    const disc = parseFloat(selectedNominal.discount);
    const hasDiscount = !isNaN(disc) && disc > 0;
    const price = hasDiscount
      ? (selectedNominal.price * (100 - disc)) / 100
      : selectedNominal.price;
    btn.textContent = `${lang.btn_confirm} - IDR ${formatPrice(price)}`;
    btn.disabled = false;
    btn.className =
      "w-full py-4 bg-primary hover:bg-red-700 text-white rounded-xl font-semibold transition-colors cursor-pointer";
  } else {
    btn.textContent = lang.btn_checkout_default;
    btn.disabled = true;
    btn.className =
      "w-full py-4 bg-gray-300 dark:bg-gray-700 text-gray-500 rounded-xl font-semibold transition-colors cursor-not-allowed";
  }
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

  const disc = parseFloat(selectedNominal.discount);
  const hasDiscount = !isNaN(disc) && disc > 0;
  const price = hasDiscount
    ? (selectedNominal.price * (100 - disc)) / 100
    : selectedNominal.price;

  let accountInfo = "";
  const lang = translations[currentLang];

  if (isPremium) {
    accountInfo = `
      <div class="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
        <div class="mb-3"><p class="text-sm text-gray-500 dark:text-gray-400 mb-1">${lang.label_email}</p><p class="font-medium text-gray-900 dark:text-white break-all">${formData.email}</p></div>
        <div><p class="text-sm text-gray-500 dark:text-gray-400 mb-1">${lang.label_whatsapp}</p><p class="font-medium text-gray-900 dark:text-white">${formData.whatsapp}</p></div>
      </div>`;
  } else {
    accountInfo = `
      <div class="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 space-y-3">
        <div class="flex justify-between"><span class="text-sm text-gray-500 dark:text-gray-400">${lang.label_game_id}</span><span class="font-medium text-gray-900 dark:text-white">${formData.gameId}</span></div>
        ${formData.server ? `<div class="flex justify-between"><span class="text-sm text-gray-500 dark:text-gray-400">${lang.label_server}</span><span class="font-medium text-gray-900 dark:text-white">${formData.server}</span></div>` : ""}
        ${formData.nickname ? `<div class="flex justify-between"><span class="text-sm text-gray-500 dark:text-gray-400">${lang.label_nickname}</span><span class="font-medium text-gray-900 dark:text-white">${formData.nickname}</span></div>` : ""}
        <div class="border-t border-gray-200 dark:border-gray-700 my-2 pt-2"></div>
        <div class="flex justify-between"><span class="text-sm text-gray-500 dark:text-gray-400">${lang.label_email}</span><span class="font-medium text-gray-900 dark:text-white text-right break-all max-w-[60%]">${formData.email}</span></div>
        <div class="flex justify-between"><span class="text-sm text-gray-500 dark:text-gray-400">${lang.label_whatsapp}</span><span class="font-medium text-gray-900 dark:text-white">${formData.whatsapp}</span></div>
      </div>`;
  }
  document.getElementById("checkout-content").innerHTML = `
    <div class="flex items-center gap-4 pb-4 border-b dark:border-gray-700">
      <img src="${currentProduct.image}" alt="${currentProduct.name}" class="w-16 h-16 rounded-xl object-cover">
      <div><h4 class="font-semibold text-gray-900 dark:text-white">${currentProduct.name}</h4><p class="text-sm text-gray-500 dark:text-gray-400">${selectedNominal.name}</p></div>
    </div>
    ${accountInfo}
    <div class="bg-primary/10 rounded-xl p-4">
      <div class="flex justify-between items-center"><span class="font-medium text-gray-900 dark:text-primary">${lang.label_total}</span><span class="text-xl font-bold text-primary">IDR ${formatPrice(price)}</span></div>
    </div>`;
  openModal("checkout");
}

function recheckOrder() {
  closeModal("checkout");
}

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

async function generateOrderId() {
  const now = new Date();
  const yearFull = now.getFullYear();
  const yearShort = yearFull % 100;
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const yyyymmdd = `${yearFull}${String(month).padStart(2, "0")}${String(date).padStart(2, "0")}`;
  const yyRoman = toRoman(yearShort);
  const mmRoman = toRoman(month);

  let sequence = "00001";
  try {
    const response = await fetch(`${config.gas_url}?action=getOrderCount`);
    const data = await response.json();
    const nextNum = data.count + 1;
    sequence = String(nextNum).padStart(5, "0");
  } catch (e) {
    console.error("Failed to fetch order count", e);
  }
  return `ISS/${yyyymmdd}/${yyRoman}/${mmRoman}/${sequence}`;
}

async function confirmOrder() {
  const btn = document.querySelector(
    '#checkout-modal button[onclick="confirmOrder()"]',
  );
  const originalText = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

  const formData = getFormData();
  const disc = parseFloat(selectedNominal.discount);
  const hasDiscount = !isNaN(disc) && disc > 0;
  const price = hasDiscount
    ? (selectedNominal.price * (100 - disc)) / 100
    : selectedNominal.price;
  const isPremium = currentProduct.category === "premium";

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

// UI HELPERS
// NEW: Helper function to setup search logic for a given input & results container
function setupSearch(inputId, resultsId) {
  const searchInput = document.getElementById(inputId);
  const searchResults = document.getElementById(resultsId);

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
            </div>`,
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
      if (
        !searchInput.contains(e.target) &&
        !searchResults.contains(e.target)
      ) {
        searchResults.classList.add("hidden");
      }
    });

    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        searchResults.classList.add("hidden");
        searchInput.blur();
      }
    });
  }
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

  // Updated: Register search listeners for BOTH desktop and mobile inputs
  setupSearch("search-input", "search-results");
  setupSearch("search-input-mobile", "search-results-mobile");
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
    const lang = translations[currentLang];

    if (data.found) {
      let statusColor = "text-gray-500";
      let displayStatus = data.status;

      if (data.status === "Menunggu Pembayaran") {
        statusColor = "text-red-500";
        displayStatus = translations[currentLang].status_pending;
      } else if (data.status === "Pesanan Diproses") {
        statusColor = "text-yellow-500";
        displayStatus = translations[currentLang].status_process;
      } else if (data.status === "Pesanan Selesai") {
        statusColor = "text-green-500";
        displayStatus = translations[currentLang].status_success;
      } else if (data.status === "Pesanan Dibatalkan") {
        statusColor = "text-gray-500";
        displayStatus = translations[currentLang].status_canceled;
      }

      let additionalInfoHTML = "";
      if (
        data.gameId &&
        data.gameId !== "-" &&
        String(data.gameId).trim() !== ""
      ) {
        let nickDisplay =
          data.nickname && data.nickname !== "-" ? ` - (${data.nickname})` : "";
        additionalInfoHTML = `
          <div class="flex justify-between mb-2">
            <span class="text-sm text-gray-500">${translations[currentLang].label_account_info}</span>
            <span class="font-medium dark:text-white text-right">${data.gameId}${nickDisplay}</span>
          </div>`;
      } else {
        additionalInfoHTML = `
          <div class="flex justify-between mb-2">
            <span class="text-sm text-gray-500">${translations[currentLang].label_account_info}</span>
            <span class="font-medium dark:text-white text-right">${data.email}</span>
          </div>`;
      }

      resultDiv.innerHTML = `
        <div class="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 mt-4">
          <div class="flex justify-between mb-2"><span class="text-sm text-gray-500">${translations[currentLang].label_order_id}</span><span class="font-medium dark:text-white">${data.orderId}</span></div>
          <div class="flex justify-between mb-2"><span class="text-sm text-gray-500">${translations[currentLang].label_product}</span><span class="font-medium dark:text-white">${data.product} - ${data.nominal}</span></div>
          ${additionalInfoHTML}
          <div class="flex justify-between mb-2 items-center"><span class="text-sm text-gray-500">${translations[currentLang].label_status}</span><span class="font-bold ${statusColor} text-lg">${displayStatus}</span></div>
        </div>`;
    } else {
      resultDiv.innerHTML =
        '<div class="text-center text-gray-500 py-4">Order ID not found.</div>';
    }
  } catch (error) {
    resultDiv.innerHTML =
      '<div class="text-center text-red-500 py-4">Error tracking order.</div>';
  }
}
