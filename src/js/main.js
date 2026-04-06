const defaultConfig = {
  site_name: "SnazStore",
  hero_title: "Instant Game Top Up",
  admin_whatsapp: "6287775314721",
  gas_url:
    "https://script.google.com/macros/s/AKfycbwiwCUuCLFSRxiOlOT_PMPiQxAV7CwuBdIw8FQkhShjmx9z0GNicIZX6xVZefSBw_1yRQ/exec",
  chat_script_url:
    "https://script.google.com/macros/s/AKfycbw4LWC5Q-0Zsnxf_nnxUbxz924LyUuOZgbOMSAkBn_g0H9eM8BALWDjSjBN1vnoCrOOwQ/exec",
};

const CACHE_KEY = "snazstore_products_v1";
/* KOMENTAR: Kunci cache lokal untuk data ulasan pelanggan */
const REVIEWS_CACHE_KEY = "snazstore_reviews_v1";
const HISTORY_KEY = "snazstore_order_history";

let config = { ...defaultConfig };
let products = [];
let reviews = []; 
let isReviewsLoaded = false;
let currentProduct = null;
let selectedNominal = null;
let topupDisplayCount = parseInt(sessionStorage.getItem('topup_count')) || 15;
let previousTopupCount = 0; 
let currentFilter = "all";
let currentFilterTopup = sessionStorage.getItem('topup_filter') || "all";
let currentLang = localStorage.getItem("site_lang") || "id";
let appliedCoupon = null;
let pollingInterval = null;

const sliders = {
  hero: { current: 0, total: 3, interval: null },
  topup: { current: 0, total: 3, interval: null },
};

const translations = {
  id: {
    sect_why_choose:
      "Mengapa Memilih <span class='fusion-text-gradient font-bold'>SnazStore</span>?",
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
    sec_popular: "Produk Populer",
    btn_view_all: "Lihat Semua",
    stats_games: "Total Games",
    stats_products: "Aplikasi Premium",
    stats_trans: "Total Transaksi",
    stats_rating: "Rating",
    sec_all_games: "Semua Produk",
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
    label_account_id: "ID Account",
    label_server: "Server",
    label_nickname: "Nickname",
    label_email: "Email",
    label_whatsapp: "Nomor WhatsApp",
    text_select_server: "Pilih Server",
    placeholder_game_id: "Masukkan ID",
    placeholder_server: "Masukkan Server",
    placeholder_nickname: "Masukkan Nickname",
    placeholder_email: "Masukkan email aktif",
    placeholder_whatsapp: "Contoh: 6287775314721",
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
    text_out_of_stock: "HABIS",
    product_empty: "Produk sedang tidak tersedia sementara waktu.",
    label_promo: "Kode Promo",
    btn_apply: "Gunakan",
    text_discount_promo: "Diskon Promo",
    text_history_title: "Riwayat Pesanan Terakhir",
    label_order_data: "DATA PESANAN",
    text_copied: "Disalin!",
    label_start_date: "Mulai",
    label_expiry_date: "Berakhir",
    link_view_promo: "Lihat Promo Tersedia",
    text_valid_until: "S/d",
    text_hours: "Jam",
    text_discount_off: "Potongan",
    text_discount_disc: "Diskon",
    text_min_purchase: "Min. Belanja",
    text_no_min_purchase: "Tanpa Minimal Pembelian",
    btn_use_coupon: "Pakai",
    text_loading_coupons: "Memuat promo...",
    text_searching_promo: "Mencari promo terbaik...",
    text_no_promo_found: "Tidak ada promo yang cocok untuk produk ini",
    text_failed_load_promo: "Gagal memuat promo.",
    text_click_to_check: "Klik untuk cek",
    text_no_flash_sale: "Tidak ada Flash Sale saat ini.",
    text_coming_soon: "Segera Datang",
    text_product_empty_label: "Produk Sedang Kosong",
    err_email: "Email wajib menggunakan @gmail.com",
    err_whatsapp_prefix: "Nomor WhatsApp wajib diawali 62",
    err_whatsapp_number: "Nomor WhatsApp hanya boleh angka",
    err_game_id: "ID Game wajib diisi",
    err_server_id: "Server ID wajib berupa angka",
    err_nickname: "Nickname wajib diisi",
    err_form_check: "Mohon periksa kembali form anda",
    text_reviews: "ulasan",
    text_sold: "Terjual",
    text_submit_review: "Beri Ulasan Pesanan",
    text_send_review: "Kirim Ulasan",
    text_from: "dari"
  },
  en: {
    sect_why_choose: "Why Choose <span class='fusion-text-gradient font-bold'>SnazStore</span>?",
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
    sec_popular: "Popular Products",
    btn_view_all: "View All",
    stats_games: "Total Games",
    stats_products: "Premium Apps",
    stats_trans: "Total Transactions",
    stats_rating: "Rating",
    sec_all_games: "All Products",
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
    label_account_id: "Account ID",
    label_server: "Server",
    label_nickname: "Nickname",
    label_email: "Email",
    label_whatsapp: "WhatsApp Number",
    text_select_server: "Select Server",
    placeholder_game_id: "Enter ID",
    placeholder_server: "Enter Server",
    placeholder_nickname: "Enter Nickname",
    placeholder_email: "Enter valid email",
    placeholder_whatsapp: "Example: 6287775314721",
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
    text_out_of_stock: "SOLD OUT",
    product_empty: "Product is currently unavailable.",
    label_promo: "Promo Code",
    btn_apply: "Apply",
    text_discount_promo: "Promo Discount",
    text_history_title: "Recent Order History",
    label_order_data: "ORDER DATA",
    text_copied: "Copied!",
    label_start_date: "Start",
    label_expiry_date: "Ends",
    link_view_promo: "View Available Promos",
    text_valid_until: "Valid until",
    text_hours: "Hours",
    text_discount_off: "OFF",
    text_discount_disc: "Discount",
    text_min_purchase: "Min. Purchase",
    text_no_min_purchase: "No Minimum Purchase",
    btn_use_coupon: "Use",
    text_loading_coupons: "Loading coupons...",
    text_searching_promo: "Searching for best promos...",
    text_no_promo_found: "No suitable promos found for this product",
    text_failed_load_promo: "Failed to load promos.",
    text_click_to_check: "Click to check",
    text_no_flash_sale: "No Flash Sale available right now.",
    text_coming_soon: "Coming Soon",
    text_product_empty_label: "Product is Currently Out of Stock",
    err_email: "Email must end with @gmail.com",
    err_whatsapp_prefix: "WhatsApp number must start with 62",
    err_whatsapp_number: "WhatsApp number must be digits only",
    err_game_id: "Game ID is required",
    err_server_id: "Server ID must be a number",
    err_nickname: "Nickname is required",
    err_form_check: "Please check your form again",
    text_reviews: "reviews",
    text_sold: "Sold",
    text_submit_review: "Leave a Review",
    text_send_review: "Submit Review",
    text_from: "from"
  },
};

document.addEventListener("DOMContentLoaded", async () => {
  if (localStorage.getItem("darkMode") === null) {
    localStorage.setItem("darkMode", "true");
    document.documentElement.classList.add("dark");
  } else if (localStorage.getItem("darkMode") === "true") {
    document.documentElement.classList.add("dark");
  }

  setupLanguage();
  checkHistoryExpiration();

  if (document.getElementById("popular-products")) {
    setActiveNav("nav_home");
  } else if (document.getElementById("all-games-topup")) {
    setActiveNav("nav_topup");
  } else if (document.getElementById("contact-form")) {
    setActiveNav("nav_contact");
  } else if (document.getElementById("product-hero")) {
    setActiveNav("nav_topup");
  }

  const handleRender = () => {
    if (document.getElementById("product-hero")) {
      const urlParams = new URLSearchParams(window.location.search);
      const productId = urlParams.get("id");
      if (productId) {
        currentProduct = products.find((p) => p.id === productId);
        if (currentProduct) {
          renderProductDetail();
        } else {
          window.location.replace("../topup/topup.html");
        }
      }
    }

    if (document.getElementById("popular-products")) {
      renderPopularGames();
      renderAllGames("home");
      renderFlashSale();
      updateRealtimeStats();
    }

    if (document.getElementById("all-games-topup")) {
      const urlParams = new URLSearchParams(window.location.search);
      const categoryParam = urlParams.get("category");
      if (categoryParam) {
        filterGamesTopup(categoryParam);
      } else {
        updateFilterButtons(".filter-btn-topup", currentFilterTopup); 
        renderAllGames("topup");
      }
      renderFlashSale();
      
      setTimeout(() => {
          const savedScroll = sessionStorage.getItem('topup_scroll_pos');
          if (savedScroll) {
              window.scrollTo({ top: parseInt(savedScroll), behavior: 'instant' });
          }
      }, 150);
    }
  };

  if (document.getElementById("popular-products")) {
    startSlider("hero");
    animateCounters();
  }
  if (document.getElementById("all-games-topup")) {
    startSlider("topup");
  }

  await loadProductsWithCache(handleRender);
  startAdaptivePolling(handleRender);

  loadReviews(() => {
    if (document.getElementById("popular-products")) {
       renderHomeReviews();
       updateOverallRating();
    }
    if (document.getElementById("product-hero")) updateProductReviewStats();
  });

  setupEventListeners();
  setupTrackingListener();
});

function startAdaptivePolling(renderCallback) {
  const POLLING_INTERVAL = 15000;

  const checkVersion = async () => {
    try {
      const timestamp = new Date().getTime();
      const res = await fetch(
        `${config.gas_url}?action=getVersion&_t=${timestamp}`,
      );
      const data = await res.json();
      const serverVersion = String(data.version);
      const localVersion = localStorage.getItem("data_version");

      if (serverVersion !== localVersion) {
        console.log("New version found:", serverVersion);
        localStorage.setItem("data_version", serverVersion);
        localStorage.removeItem(CACHE_KEY);
        localStorage.removeItem(REVIEWS_CACHE_KEY);
        
        loadProductsWithCache(renderCallback);
        loadReviews(() => {
            if (document.getElementById("popular-products")) {
               renderHomeReviews();
               updateOverallRating();
            }
            if (document.getElementById("product-hero")) updateProductReviewStats();
        });
      }
    } catch (e) {
      console.error("Version check failed", e);
    }
  };

  if (!document.hidden) {
    checkVersion();
    pollingInterval = setInterval(checkVersion, POLLING_INTERVAL);
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (pollingInterval) clearInterval(pollingInterval);
    } else {
      checkVersion();
      pollingInterval = setInterval(checkVersion, POLLING_INTERVAL);
    }
  });
}

async function loadProductsWithCache(renderCallback) {
  const cachedData = localStorage.getItem(CACHE_KEY);
  let hasCache = false;

  if (products.length === 0 && cachedData) {
    try {
      products = JSON.parse(cachedData);
      if (renderCallback) renderCallback();
      hasCache = true;
    } catch (e) {
      localStorage.removeItem(CACHE_KEY);
    }
  }

  if (products.length === 0 && !hasCache) {
    renderSkeletons();
  }

  try {
    const timestamp = new Date().getTime();
    const response = await fetch(
      `${config.gas_url}?action=getProducts&_t=${timestamp}`,
    );
    if (!response.ok) throw new Error("Network response not ok");
    const freshData = await response.json();

    const freshDataStr = JSON.stringify(freshData);
    const currentDataStr = JSON.stringify(products);

    if (freshDataStr !== currentDataStr) {
      products = freshData;
      localStorage.setItem(CACHE_KEY, freshDataStr);
      if (renderCallback) renderCallback();
    }
  } catch (error) {
    console.error("Failed to fetch fresh data:", error);
    if (products.length === 0) {
      try {
        let path = "asset/json/product.json";
        if (window.location.pathname.includes("/page/")) {
          path = "../../asset/json/product.json";
        }
        const fallbackRes = await fetch(path);
        products = await fallbackRes.json();
        if (renderCallback) renderCallback();
      } catch (e) {}
    }
  }
}

/* KOMENTAR: Penerapan Stale-While-Revalidate untuk sistem cache ulasan pelanggan. UI akan dimuat dengan instan jika cache tersedia, dan akan diperbarui di latar belakang jika terdapat data baru dari server. */
async function loadReviews(callback) {
  const cachedData = localStorage.getItem(REVIEWS_CACHE_KEY);
  let hasCache = false;

  if (cachedData) {
    try {
      reviews = JSON.parse(cachedData);
      isReviewsLoaded = true;
      if (callback) callback();
      hasCache = true;
    } catch (e) {
      localStorage.removeItem(REVIEWS_CACHE_KEY);
    }
  }

  try {
     const timestamp = new Date().getTime();
     const response = await fetch(`${config.gas_url}?action=getReviews&_t=${timestamp}`);
     const freshReviews = await response.json();

     const freshDataStr = JSON.stringify(freshReviews);
     const currentDataStr = JSON.stringify(reviews);

     if (freshDataStr !== currentDataStr || !hasCache) {
         reviews = freshReviews;
         localStorage.setItem(REVIEWS_CACHE_KEY, freshDataStr);
         isReviewsLoaded = true;
         if (callback) callback();
     }
  } catch (e) {
     console.error("Failed to fetch fresh reviews", e);
     if (!hasCache) {
        isReviewsLoaded = true;
        if (callback) callback();
     }
  }
}

function renderSkeletons() {
  const skeletonCard = `
    <div class="bg-white dark:bg-dark rounded-xl overflow-hidden shadow-sm animate-pulse border border-gray-100 dark:border-gray-800">
      <div class="w-full h-32 bg-gray-300 dark:bg-gray-700"></div>
      <div class="p-3 space-y-2">
        <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        <div class="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
      </div>
    </div>
  `;

  const skeletonFlash = `
    <div class="bg-white dark:bg-dark rounded-xl p-2.5 shadow-sm animate-pulse flex items-center gap-2.5 border border-gray-100 dark:border-gray-800">
        <div class="w-14 h-14 md:w-16 md:h-16 bg-gray-300 dark:bg-gray-700 rounded-lg flex-shrink-0"></div>
        <div class="flex-1 space-y-1.5 py-1 overflow-hidden">
            <div class="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
            <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            <div class="h-2.5 bg-gray-200 dark:bg-gray-800 rounded w-1/2 mt-1"></div>
        </div>
    </div>
  `;

  const containers = [
    { id: "popular-products", count: 5, html: skeletonCard },
    { id: "all-products-home", count: 10, html: skeletonCard },
    { id: "all-games-topup", count: 15, html: skeletonCard },
    { id: "flash-sale", count: 5, html: skeletonFlash },
  ];

  containers.forEach((target) => {
    const el = document.getElementById(target.id);
    if (el) {
      el.innerHTML = Array(target.count).fill(target.html).join("");
    }
  });
}

function updateOverallRating() {
  const el = document.getElementById("avg-rating");
  if (!el) return;
  if (reviews.length === 0) {
    el.textContent = "0.0";
    return;
  }
  const sum = reviews.reduce((acc, curr) => acc + curr.rating, 0);
  const avg = (sum / reviews.length).toFixed(1);
  el.textContent = avg;
}

async function updateRealtimeStats() {
  const gamesCount = products.filter(
    (p) => p.category === "mobile" || p.category === "pc",
  ).length;
  const premiumCount = products.filter((p) => p.category === "premium").length;

  const gamesEl = document.getElementById("count-games");
  if (gamesEl) {
    gamesEl.textContent = gamesCount;
    gamesEl.setAttribute("data-target", gamesCount);
  }

  const premiumEl = document.getElementById("count-premium");
  if (premiumEl) {
    premiumEl.textContent = premiumCount;
    premiumEl.setAttribute("data-target", premiumCount);
  }

  const transEl = document.getElementById("count-trans");
  if (transEl) {
    try {
      const timestamp = new Date().getTime();
      const res = await fetch(
        `${config.gas_url}?action=getOrderCount&_t=${timestamp}`,
      );
      const data = await res.json();
      if (data && data.count !== undefined) {
        transEl.textContent = data.count;
        transEl.setAttribute("data-target", data.count);
      }
    } catch (e) {
      console.error("Failed to fetch transaction count:", e);
    }
  }
}

function setActiveNav(targetKey) {
  const navLinks = document.querySelectorAll(
    ".nav-link, #mobile-menu a, #mobile-menu button",
  );

  navLinks.forEach((link) => {
    link.classList.remove("fusion-text-gradient");
    link.classList.remove("font-bold");
  });

  let activated = false;
  if (targetKey) {
    navLinks.forEach((link) => {
      if (link.getAttribute("data-i18n") === targetKey) {
        link.classList.add("fusion-text-gradient");
        link.classList.add("font-bold");
        activated = true;
      }
    });
  }

  if (!activated) {
    navLinks.forEach((link) => {
      if (link.getAttribute("href") && link.href === window.location.href) {
        link.classList.add("fusion-text-gradient");
        link.classList.add("font-bold");
      }
    });
  }
}

function setupLanguage() {
  const btnId = document.getElementById("lang-id");
  const btnEn = document.getElementById("lang-en");

  if (btnId && btnEn) {
    if (currentLang === "id") {
      btnId.classList.add("font-bold", "fusion-text-gradient");
      btnEn.classList.remove("font-bold", "fusion-text-gradient");
    } else {
      btnEn.classList.add("font-bold", "fusion-text-gradient");
      btnId.classList.remove("font-bold", "fusion-text-gradient");
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
  if (document.getElementById("home-review-track")) renderHomeReviews();
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

function createGameCard(product, size = "small", animationDelay = 0) {
  const isSmall = size === "small";
  const imageClass = isSmall
    ? "w-full h-48 object-cover"
    : "w-full h-64 object-cover";
  const isInnerPage = window.location.pathname.includes("/page/");
  const productPath = isInnerPage
    ? `../product/product.html?id=${product.id}`
    : `page/product/product.html?id=${product.id}`;

  let rating = parseFloat(product.rating);
  if (isNaN(rating)) rating = 0;

  const hasImage = product.image && String(product.image).trim() !== "" && !product.image.endsWith("undefined");
  const desc = product.description_id || product.description_en || product.description || "";
  const hasDesc = String(desc).trim() !== "" && String(desc).trim() !== "-";
  
  const validNominals = (product.nominals || []).filter(n => n.name && n.price && parseFloat(n.price) > 0);
  const hasValidNominals = validNominals.length > 0;

  let cardStatus = "active";
  
  if (!hasValidNominals) {
    if (!hasImage && !hasDesc) {
      cardStatus = "coming_soon_no_image";
    } else if (hasImage && !hasDesc) {
      cardStatus = "coming_soon_with_image";
    } else {
      cardStatus = "out_of_stock";
    }
  }
  
  const animationStyle = animationDelay > 0 ? `style="animation: fadeIn 0.5s ease forwards; opacity: 0; animation-delay: ${animationDelay}s"` : '';
  const textComingSoon = translations[currentLang].text_coming_soon;
  const textOutOfStock = translations[currentLang].text_product_empty_label;

  let cardHtml = "";

  if (cardStatus === "coming_soon_no_image") {
    cardHtml = `
      <div class="block bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-800 h-full relative pointer-events-none select-none">
        <div class="relative ${isSmall ? 'h-48' : 'h-48 md:h-56'} flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-700">
           <div class="absolute inset-0 flex items-center justify-center bg-black/40">
             <div class="text-center px-2">
                <i class="fas fa-clock text-white text-2xl mb-1 animate-pulse"></i>
                <p class="text-white font-bold text-xs uppercase border border-white/50 px-2 py-1 rounded bg-black/40 backdrop-blur-sm" data-i18n="text_coming_soon">
                   ${textComingSoon}
                </p>
             </div>
           </div>
        </div>
        <div class="p-3 opacity-60">
          <h3 class="font-medium text-sm truncate text-gray-900 dark:text-white">${product.name}</h3>
          <p class="text-xs text-gray-500 truncate">${product.developer || '-'}</p>
        </div>
      </div>
    `;
  } else if (cardStatus === "coming_soon_with_image") {
    cardHtml = `
      <div class="block bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-800 h-full relative pointer-events-none select-none group">
        <div class="relative overflow-hidden rounded-t-xl">
          <img src="${product.image}" alt="${product.name}" class="${imageClass} grayscale brightness-50 object-cover" loading="lazy" onerror="this.style.background='#f3f4f6'; this.alt='Image unavailable';">
          <div class="absolute inset-0 flex items-center justify-center bg-black/60">
             <div class="text-center px-2">
                <i class="fas fa-clock text-white text-2xl mb-1 animate-pulse"></i>
                <p class="text-white font-bold text-xs uppercase border border-white/50 px-2 py-1 rounded bg-black/40 backdrop-blur-sm" data-i18n="text_coming_soon">
                   ${textComingSoon}
                </p>
             </div>
          </div>
        </div>
        <div class="p-3 opacity-60">
          <h3 class="font-medium text-sm truncate text-gray-900 dark:text-white">${product.name}</h3>
          <p class="text-xs text-gray-500 truncate">${product.developer || '-'}</p>
        </div>
      </div>
    `;
  } else if (cardStatus === "out_of_stock") {
    cardHtml = `
      <div class="block bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-800 h-full relative pointer-events-none select-none group">
        <div class="relative overflow-hidden rounded-t-xl">
          <img src="${product.image}" alt="${product.name}" class="${imageClass} grayscale brightness-50 object-cover" loading="lazy" onerror="this.style.background='#f3f4f6'; this.alt='Image unavailable';">
          <div class="absolute inset-0 flex items-center justify-center bg-black/60">
             <div class="text-center px-2 w-full">
                <i class="fas fa-box-open text-white text-2xl mb-1 opacity-80"></i>
                <p class="text-white font-bold text-[10px] md:text-xs uppercase border border-white/50 px-2 py-1 rounded bg-black/40 backdrop-blur-sm mx-auto w-fit max-w-[90%] text-center" data-i18n="text_product_empty_label">
                   ${textOutOfStock}
                </p>
             </div>
          </div>
        </div>
        <div class="p-3 opacity-60">
          <h3 class="font-medium text-sm truncate text-gray-900 dark:text-white">${product.name}</h3>
          <p class="text-xs text-gray-500 truncate">${product.developer || '-'}</p>
        </div>
      </div>
    `;
  } else if (isSmall) {
    cardHtml = `
      <a href="${productPath}" class="block h-full bg-white dark:bg-gray-800 rounded-xl overflow-visible cursor-pointer relative transition-transform duration-300 hover:scale-[1.02] shadow-md border border-gray-100 dark:border-gray-800">
        <div class="relative overflow-hidden rounded-t-xl">
          <img src="${product.image}" alt="${product.name}" class="${imageClass}" loading="lazy" onerror="this.style.background='#f3f4f6'; this.alt='Image unavailable';">
          ${product.discount > 0 ? `<span class="absolute top-2 right-2 px-2 py-1 bg-primary text-white text-xs font-bold rounded-lg border border-white/20">-${product.discount}%</span>` : ""}
        </div>
        <div class="p-3 relative z-10">
          <h3 class="font-medium text-sm truncate text-gray-900 dark:text-white">${product.name}</h3>
          <p class="text-xs text-primary truncate font-medium">${product.developer || '-'}</p>
        </div>
      </a>
    `;
  } else {
    cardHtml = `
      <a href="${productPath}" class="block h-full bg-white dark:bg-gray-800 rounded-2xl overflow-visible cursor-pointer relative transition-transform duration-300 hover:scale-[1.02] shadow-md border border-gray-100 dark:border-gray-800">
        <div class="relative overflow-hidden rounded-t-2xl">
          <img src="${product.image}" alt="${product.name}" class="w-full h-48 md:h-56 object-cover" loading="lazy" onerror="this.style.background='#f3f4f6'; this.alt='Image unavailable';">
          ${product.discount > 0 ? `<span class="absolute top-3 right-3 px-3 py-1 bg-primary text-white text-sm font-bold rounded-lg border border-white/20">-${product.discount}%</span>` : ""}
        </div>
        <div class="p-3 md:p-4 relative z-10">
          <span class="text-[10px] md:text-xs font-medium text-primary uppercase font-bold tracking-wide">${product.category}</span>
          <h3 class="font-heading font-semibold text-base md:text-lg mt-1 text-gray-900 dark:text-white truncate">${product.name}</h3>
          <p class="text-xs md:text-sm text-gray-500 mt-1 truncate">${product.developer || '-'}</p>
          <div class="flex items-center gap-1 mt-2 text-primary text-xs md:text-sm">
            <i class="fas fa-star"></i>
            <span class="text-gray-600 dark:text-gray-300 font-bold">${rating}</span>
          </div>
        </div>
      </a>
    `;
  }

  return `<div class="h-full" ${animationStyle}>${cardHtml}</div>`;
}

function renderPopularGames() {
  const container = document.getElementById("popular-products");
  if (!container) return;
  const popularProducts = products.filter((p) => p.popular && p.nominals && p.nominals.length > 0);
  container.innerHTML = popularProducts
    .map((p) => createGameCard(p, "large"))
    .join("");
}

function renderAllGames(page) {
  const containerId = page === "home" ? "all-products-home" : "all-games-topup";
  const container = document.getElementById(containerId);
  if (!container) return;
  const filter = page === "home" ? currentFilter : currentFilterTopup;
  const count = page === "home" ? 15 : topupDisplayCount;

  let filtered =
    filter === "all" ? products : products.filter((p) => p.category === filter);
  const displayed = filtered.slice(0, count);

  let startIndex = 0;
  if (page === "topup" && previousTopupCount > 0 && previousTopupCount < count) {
      startIndex = previousTopupCount;
  }

  container.innerHTML = displayed
    .map((p, index) => {
        let delay = 0;
        if (index >= startIndex && startIndex > 0) {
            delay = (index - startIndex) * 0.1; 
        }
        return createGameCard(p, "small", delay);
    })
    .join("");

  if (page === "topup") {
      previousTopupCount = count;
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
        if (!isNaN(disc) && disc > 0 && nominal.price > 0) {
          discountedItems.push({ product: product, nominal: nominal });
        }
      });
    }
  });

  const displayItems = discountedItems;
  const isInnerPage = window.location.pathname.includes("/page/");

  if (displayItems.length === 0) {
    const noSaleText = translations[currentLang].text_no_flash_sale;
    container.innerHTML = `<div class="col-span-full text-center text-gray-500">${noSaleText}</div>`;
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
    <a href="${productPath}" class="block bg-white dark:bg-gray-800 rounded-xl overflow-visible cursor-pointer relative transition-transform duration-300 hover:scale-[1.02] shadow-sm border border-gray-100 dark:border-gray-700">
      <div class="h-full relative overflow-hidden rounded-xl">
        <div class="flex items-center gap-2.5 p-2.5 relative z-10">
          <div class="relative w-12 h-12 md:w-16 md:h-16 flex-shrink-0">
              <img src="${p.image}" alt="${p.name}" class="w-full h-full rounded-lg object-cover border border-gray-200 dark:border-gray-600" loading="lazy">
              <div class="absolute -bottom-1.5 -right-1.5 w-6 h-6 bg-white dark:bg-gray-900 rounded-full p-0.5 shadow-md flex items-center justify-center">
                  <img src="${n.icon}" class="w-5 h-5 object-contain rounded-full" onerror="this.style.display='none'">
              </div>
          </div>
          <div class="flex-1 min-w-0 overflow-hidden text-gray-900 dark:text-white">
            <span class="inline-block px-1.5 py-0.5 bg-primary text-white text-[9px] md:text-[10px] font-bold rounded mb-0.5 border border-white/20">-${disc}%</span>
            <h3 class="font-heading font-semibold text-[10px] md:text-sm text-gray-900 dark:text-white truncate leading-tight">${p.name}</h3>
            <p class="text-[10px] md:text-xs text-gray-500 truncate">${n.name}</p>
            <div class="mt-1 leading-none">
              <p class="text-[9px] text-gray-400 line-through">IDR ${formatPrice(n.price)}</p>
              <p class="text-[10px] md:text-sm font-bold mt-0.5 text-primary">IDR ${formatPrice(finalPrice)}</p>
            </div>
          </div>
        </div>
      </div>
    </a>
  `;
    })
    .join("");
}

function updateProductReviewStats() {
  if (!currentProduct) return;
  
  let avgRating = parseFloat(currentProduct.rating) || 0;
  let reviewCount = 0;

  if (isReviewsLoaded) {
      const productReviews = reviews.filter(r => String(r.productId) === String(currentProduct.id));
      reviewCount = productReviews.length;
      if (reviewCount > 0) {
         const sum = productReviews.reduce((acc, curr) => acc + curr.rating, 0);
         avgRating = (sum / reviewCount).toFixed(1);
      }
  }

  const percentage = (avgRating / 5) * 100;
  const ratingContainer = document.getElementById("product-rating");
  const lang = translations[currentLang];
  
  if (ratingContainer) {
    let reviewTextHTML = isReviewsLoaded 
        ? `<a href="#review-section" class="text-primary hover:underline text-xs font-medium ml-1">${reviewCount} ${lang.text_reviews}</a>`
        : `<span class="text-gray-400 text-xs ml-1"><i class="fas fa-spinner fa-spin"></i></span>`;

    ratingContainer.innerHTML = `
      <div class="relative inline-flex">
        <div class="flex text-gray-300 dark:text-gray-600">
          <i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>
        </div>
        <div class="absolute top-0 left-0 flex text-primary overflow-hidden" style="width: ${percentage}%;">
          <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
        </div>
      </div>
      <span class="text-gray-900 dark:text-white font-bold ml-1">${avgRating}/5</span>
      <span class="text-gray-500 dark:text-gray-400 text-xs ml-1">${lang.text_from}</span>
      ${reviewTextHTML}
    `;
  }
  
  renderProductReviews('all');
}

function renderProductDetail() {
  if (!currentProduct) return;

  document.getElementById("product-banner-img").src = currentProduct.banner;
  document.getElementById("product-image").src = currentProduct.image;
  document.getElementById("product-name").textContent = currentProduct.name;
  document.getElementById("product-category").textContent =
    currentProduct.category.charAt(0).toUpperCase() +
    currentProduct.category.slice(1);
  document.getElementById("product-category").className = "inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-2";
  document.getElementById("product-developer").innerHTML =
    `<i class="fas fa-building mr-2"></i>${currentProduct.developer}`;

  const desc =
    currentLang === "id"
      ? currentProduct.description_id || currentProduct.description
      : currentProduct.description_en || currentProduct.description;
  document.getElementById("product-description").textContent =
    desc || "No description available.";

  const lang = translations[currentLang];
  const soldContainer = document.getElementById("product-sold");
  if (soldContainer) {
      const soldCount = currentProduct.sold_count || 0;
      soldContainer.innerHTML = `<span class="text-gray-500 dark:text-gray-400 text-xs">${lang.text_sold}</span> <span class="font-bold text-gray-900 dark:text-white">${soldCount}</span>`;
  }

  updateProductReviewStats();

  renderProductFAQ();
  renderOrderForm();
  setupRealtimeValidation(); 

  const containerNominal = document.getElementById("nominal-grid");
  const validNominals = (currentProduct.nominals || []).filter(n => n.name && n.price && parseFloat(n.price) > 0);
  const hasValidNominals = validNominals.length > 0;

  if (!hasValidNominals) {
    containerNominal.innerHTML = `
      <div class="col-span-full py-16 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
        <i class="fas fa-box-open text-5xl mb-4 text-gray-400 dark:text-gray-500"></i>
        <p class="font-bold text-xl text-gray-700 dark:text-gray-300" data-i18n="text_product_empty_label">${translations[currentLang].text_product_empty_label}</p>
        <p class="text-sm mt-2">${currentLang === 'id' ? 'Silakan kembali lagi nanti.' : 'Please check back later.'}</p>
      </div>`;
    
    selectedNominal = null;
    updateCheckoutButton();
    const btn = document.getElementById("checkout-btn");
    if(btn) {
       btn.disabled = true;
       btn.textContent = translations[currentLang].text_product_empty_label;
       btn.className = "w-full py-4 bg-gray-300 dark:bg-gray-700 text-gray-500 rounded-xl font-semibold cursor-not-allowed";
    }
  } else {
    renderNominals();
  }

  const urlParams = new URLSearchParams(window.location.search);
  const autoSelectId = urlParams.get("nominal");
  if (autoSelectId && hasValidNominals) {
    setTimeout(() => {
      selectNominal(autoSelectId);
    }, 100);
  } else if (!autoSelectId && hasValidNominals) {
    selectedNominal = null;
    updateCheckoutButton();
  }
}

function renderProductReviews(filter) {
  const container = document.getElementById("product-reviews-list");
  const emptyState = document.getElementById("review-empty-state");
  if (!container) return;

  if (!isReviewsLoaded) {
     container.innerHTML = `<div class="col-span-full py-10 text-center text-gray-500"><i class="fas fa-spinner fa-spin text-2xl text-primary"></i></div>`;
     emptyState.classList.add("hidden");
     return;
  }

  let productReviews = reviews.filter(r => String(r.productId) === String(currentProduct.id));
  
  if (filter !== 'all') {
      productReviews = productReviews.filter(r => Number(r.rating) === Number(filter));
  }

  if (productReviews.length === 0) {
      container.innerHTML = "";
      emptyState.classList.remove("hidden");
  } else {
      emptyState.classList.add("hidden");
      container.innerHTML = productReviews.map(r => createReviewCardHTML(r, false)).join("");
  }
}

function filterReviews(rating) {
  const isAll = rating === 'all';
  document.querySelectorAll(".review-filter-btn").forEach(btn => {
      btn.classList.remove("active", "fusion-gradient", "text-white");
      btn.classList.add("bg-white", "dark:bg-gray-800", "text-gray-900", "dark:text-white");
  });
  
  const attrSelector = isAll ? `'all'` : rating;
  const targetBtn = document.querySelector(`.review-filter-btn[onclick="filterReviews(${attrSelector})"]`);
  if(targetBtn) {
     targetBtn.classList.add("active", "fusion-gradient", "text-white");
     targetBtn.classList.remove("bg-white", "dark:bg-gray-800", "text-gray-900", "dark:text-white");
  }
  
  renderProductReviews(rating);
}

function renderHomeReviews() {
  const container = document.getElementById("home-review-track");
  if (!container) return;
  
  if (!isReviewsLoaded) return;
  
  const goodReviews = reviews.filter(r => r.rating >= 4).slice(0, 10);
  
  if (goodReviews.length === 0) {
     container.innerHTML = `<div class="text-center w-full py-10 text-gray-500">Belum ada ulasan pelanggan.</div>`;
     container.classList.remove("animate-marquee");
     return;
  }

  const displayReviews = [...goodReviews, ...goodReviews];

  container.innerHTML = displayReviews.map(r => createReviewCardHTML(r, true)).join("");
}

function createReviewCardHTML(r, isHome = false) {
  const stars = Array(5).fill(0).map((_, i) => `<i class="fas fa-star ${i < r.rating ? 'text-primary' : 'text-gray-300 dark:text-gray-600'} text-[10px]"></i>`).join("");
  const dateStr = r.date ? new Date(r.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'}) : '';
  const homeClasses = isHome ? "review-card " : "h-full flex flex-col justify-between ";
  const truncateClass = isHome ? "truncate w-32" : "";
  const logoPath = isHome ? "asset/img/icon-logo.png" : "../../asset/img/icon-logo.png";
  
  let productInfoHTML = "";
  if (isHome) {
     productInfoHTML = `<p class="text-[10px] text-gray-500 ${truncateClass}">${r.productName || 'Produk'}</p>`;
  }

  let adminReplyHTML = "";
  /* KOMENTAR: Pengkondisian agar balasan admin hanya tampil jika bukan di beranda dan data balasan memang ada */
  if (!isHome && r.adminReply && String(r.adminReply).trim() !== "") {
     adminReplyHTML = `
     <div class="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
        <div class="flex items-start gap-2.5">
           <img src="${logoPath}" alt="Snaz Store" class="w-8 h-8 rounded-full p-1.5 border border-gray-200 dark:border-gray-600 flex-shrink-0 object-contain bg-gray-100 dark:bg-gray-800">
           <div>
              <h5 class="text-[11px] font-bold text-gray-900 dark:text-white flex items-center gap-1">Snaz Store <i class="fas fa-check-circle text-blue-500 text-[10px]"></i></h5>
              <p class="text-[11px] text-gray-600 dark:text-gray-400 mt-0.5 leading-relaxed">${r.adminReply}</p>
           </div>
        </div>
     </div>`;
  }

  return `
  <div class="${homeClasses}bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:border-primary/50">
      <div>
         <div class="flex justify-between items-start mb-3">
             <div class="flex items-center gap-3">
                 <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shadow-inner flex-shrink-0">
                     ${(r.customerName || 'A').charAt(0).toUpperCase()}
                 </div>
                 <div class="overflow-hidden">
                     <h4 class="font-bold text-sm text-gray-900 dark:text-white ${truncateClass}">${r.customerName || 'Anonymous'}</h4>
                     ${productInfoHTML}
                     <div class="flex gap-0.5 mt-0.5">${stars}</div>
                 </div>
             </div>
             <span class="text-[10px] text-gray-400 flex-shrink-0">${dateStr}</span>
         </div>
         <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed italic line-clamp-4">"${r.review}"</p>
         ${adminReplyHTML}
      </div>
  </div>`;
}

function setupRealtimeValidation() {
  const inputs = document.querySelectorAll(
    '#form-email, #form-whatsapp, #form-game-id, #form-server, #form-nickname'
  );

  inputs.forEach(input => {
    input.addEventListener('input', function() {
      validateFormInput(this);
    });
    input.addEventListener('blur', function() {
      validateFormInput(this);
    });
  });
}

function validateFormInput(input) {
  const lang = translations[currentLang];
  const id = input.id;
  const value = input.value.trim();
  let errorMsg = "";
  
  if (id === 'form-email') {
    if (value && !value.endsWith('@gmail.com')) {
      errorMsg = lang.err_email;
    }
  } else if (id === 'form-whatsapp') {
    if (value) {
      if (!/^\d+$/.test(value)) {
        errorMsg = lang.err_whatsapp_number;
      } else if (!value.startsWith('62')) {
        errorMsg = lang.err_whatsapp_prefix;
      }
    }
  } else if (id === 'form-game-id' && !value) {
  } else if (id === 'form-server') {
     if (input.tagName === 'INPUT' && value && !/^\d+$/.test(value)) {
        errorMsg = lang.err_server_id;
     }
  }

  const errorEl = input.nextElementSibling;
  if (errorEl && errorEl.tagName === 'P') {
    if (errorMsg) {
      errorEl.textContent = errorMsg;
      errorEl.classList.remove('hidden');
      input.classList.add('border-red-500', 'focus:ring-red-500');
      input.classList.remove('border-0', 'focus:ring-primary');
    } else {
      errorEl.classList.add('hidden');
      input.classList.remove('border-red-500', 'focus:ring-red-500');
      input.classList.add('border-0', 'focus:ring-primary');
    }
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
              <i class="fas fa-question-circle fusion-text-gradient mt-1 text-xs flex-shrink-0"></i>
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

  if (nominalList.length === 0) return;

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
          <div class="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden p-[1px] border border-gray-200 dark:border-gray-700">
            <img src="${categoryIcon}" alt="${category}" class="w-full h-full object-cover rounded-md" loading="lazy" onerror="this.src='https://via.placeholder.com/40'">
          </div>
          <h3 class="font-heading font-semibold text-lg text-gray-900 dark:text-white">${category}</h3>
          <div class="flex-1 h-px bg-gray-200 dark:bg-gray-700 ml-2"></div>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          ${nominals
            .map((n) => {
              const disc = parseFloat(n.discount);
              const hasDiscount = !isNaN(disc) && disc > 0;
              const isUnavailable = !n.price || n.price === 0 || !n.icon || n.icon.trim() === "";

              const finalPrice = hasDiscount && !isUnavailable
                ? (n.price * (100 - disc)) / 100
                : n.price;

              const cardClass = isUnavailable
                ? "nominal-card bg-gray-50 dark:bg-gray-800 opacity-70 cursor-not-allowed grayscale relative rounded-xl p-3 sm:p-4 border border-gray-200 dark:border-gray-700"
                : "nominal-card bg-white dark:bg-gray-800 cursor-pointer hover:scale-[1.02] transition-all relative rounded-xl p-3 sm:p-4 border border-gray-200 dark:border-gray-700 overflow-visible shadow-sm hover:border-primary dark:hover:border-primary";

              const onClickAction = isUnavailable
                ? ""
                : `onclick="selectNominal('${n.id}')"`;

              return `
              <div ${onClickAction} data-nominal-id="${n.id}" class="${cardClass}">
                ${hasDiscount && !isUnavailable ? `<span class="absolute top-2 right-2 px-1.5 py-0.5 bg-primary text-white text-[10px] font-bold rounded border border-white/20">- ${disc}%</span>` : ""}
                ${isUnavailable ? `<span class="absolute top-2 right-2 px-1.5 py-0.5 bg-gray-500 text-white text-[10px] font-bold rounded" data-i18n="text_out_of_stock">${translations[currentLang].text_out_of_stock}</span>` : ""}
                
                <div class="flex items-center gap-3 mb-3 relative z-10">
                  <div class="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-700 p-[1px] rounded-lg flex-shrink-0 overflow-hidden border border-gray-200 dark:border-gray-600">
                    <img src="${n.icon}" alt="${n.name}" class="w-full h-full object-cover rounded-md" onerror="this.src='https://via.placeholder.com/40'">
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="font-semibold text-xs sm:text-sm text-gray-900 dark:text-white leading-snug break-words">${n.name}</h4>
                  </div>
                </div>
                <div class="relative z-10">
                ${
                  isUnavailable
                    ? `<p class="text-xs text-gray-500 font-bold" data-i18n="text_coming_soon">${translations[currentLang].text_coming_soon}</p>`
                    : hasDiscount
                      ? `<p class="text-xs text-gray-400 line-through">IDR ${formatPrice(n.price)}</p><p class="font-bold text-primary text-sm">IDR ${formatPrice(finalPrice)}</p>`
                      : `<p class="font-bold text-primary text-sm">IDR ${formatPrice(n.price)}</p>`
                }
                </div>
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
  const lang = translations[currentLang];

  const isVoucher =
    (currentProduct.type && currentProduct.type.toLowerCase() === "voucher") ||
    (currentProduct.form_type &&
      currentProduct.form_type.toLowerCase() === "voucher");

  if (isVoucher) {
    container.innerHTML = `
      <div class="mb-5">
        <label class="block text-sm font-medium mb-2 text-gray-900 dark:text-white">${lang.label_email}</label>
        <input type="email" id="form-email" required class="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white" placeholder="${lang.placeholder_email}">
        <p id="error-email" class="text-red-500 text-xs mt-1 hidden"></p>
      </div>
      <div class="mb-5">
        <label class="block text-sm font-medium mb-2 text-gray-900 dark:text-white">${lang.label_whatsapp}</label>
        <input type="tel" id="form-whatsapp" required class="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white" placeholder="${lang.placeholder_whatsapp}">
        <p id="error-whatsapp" class="text-red-500 text-xs mt-1 hidden"></p>
      </div>
    `;
  } else {
    const idLabel =
      currentProduct.category === "premium"
        ? lang.label_account_id
        : lang.label_game_id;

    let showServerInput = true;
    let isDropdown = false;

    if (
      currentProduct.server_type &&
      String(currentProduct.server_type).trim() === "-"
    ) {
      showServerInput = false;
    } else if (
      currentProduct.server_type &&
      String(currentProduct.server_type).includes(",")
    ) {
      isDropdown = true;
    }

    let serverInputHTML = "";
    if (showServerInput) {
      if (isDropdown) {
        const serverList = currentProduct.server_type.split(",").map(s => s.trim()).filter(s => s !== "");
        const options = serverList
          .map((s) => `<option value="${s}">${s}</option>`)
          .join("");

        serverInputHTML = `
            <div class="mb-5">
              <label class="block text-sm font-medium mb-2 text-gray-900 dark:text-white">${lang.label_server}</label>
              <div class="relative">
                <select id="form-server" required class="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white appearance-none cursor-pointer">
                  <option value="" disabled selected>${lang.text_select_server}</option>
                  ${options}
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500 dark:text-gray-400"><i class="fas fa-chevron-down text-sm"></i></div>
              </div>
            </div>`;
      } else {
        serverInputHTML = `
            <div class="mb-5">
                <label class="block text-sm font-medium mb-2 text-gray-900 dark:text-white">${lang.label_server}</label>
                <input type="text" id="form-server" required class="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white" placeholder="${lang.placeholder_server}">
                <p id="error-server" class="text-red-500 text-xs mt-1 hidden"></p>
            </div>`;
      }
    }

    const gridClass = showServerInput
      ? "grid grid-cols-2 gap-4 mb-5"
      : "grid grid-cols-1 gap-4 mb-5";

    container.innerHTML = `
      <div class="${gridClass}">
        <div class="${showServerInput ? "" : "col-span-1"}">
          <label class="block text-sm font-medium mb-2 text-gray-900 dark:text-white">${idLabel}</label>
          <input type="text" id="form-game-id" required class="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white" placeholder="${lang.placeholder_game_id}">
          <p id="error-game-id" class="text-red-500 text-xs mt-1 hidden"></p>
        </div>
        ${showServerInput ? serverInputHTML.replace('mb-5', '') : ""} 
      </div>
      <div class="mb-5">
        <label class="block text-sm font-medium mb-2 text-gray-900 dark:text-white">${lang.label_nickname}</label>
        <input type="text" id="form-nickname" required class="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white" placeholder="${lang.placeholder_nickname}">
        <p id="error-nickname" class="text-red-500 text-xs mt-1 hidden"></p>
      </div>
      <div class="mb-5">
        <label class="block text-sm font-medium mb-2 text-gray-900 dark:text-white">${lang.label_email}</label>
        <input type="email" id="form-email" required class="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white" placeholder="${lang.placeholder_email}">
        <p id="error-email" class="text-red-500 text-xs mt-1 hidden"></p>
      </div>
      <div class="mb-5">
        <label class="block text-sm font-medium mb-2 text-gray-900 dark:text-white">${lang.label_whatsapp}</label>
        <input type="tel" id="form-whatsapp" required class="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white" placeholder="${lang.placeholder_whatsapp}">
        <p id="error-whatsapp" class="text-red-500 text-xs mt-1 hidden"></p>
      </div>
    `;
  }
}

function selectNominal(nominalId) {
  if (selectedNominal && selectedNominal.id === nominalId) {
    selectedNominal = null;
    appliedCoupon = null;
    document.querySelectorAll(".nominal-card").forEach((card) => {
      card.classList.remove("selected");
    });
    updateCheckoutButton();
    return;
  }

  const nominal = currentProduct.nominals.find((n) => n.id === nominalId);
  if (!nominal || !nominal.price || nominal.price === 0 || !nominal.icon) return;

  selectedNominal = nominal;
  appliedCoupon = null;

  document.querySelectorAll(".nominal-card").forEach((card) => {
    card.classList.remove("selected");
  });
  const selectedCard = document.querySelector(
    `[data-nominal-id="${nominalId}"]`,
  );
  if (selectedCard) {
    selectedCard.classList.add("selected");
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
      "w-full py-4 fusion-gradient text-white rounded-xl font-semibold transition-all cursor-pointer hover:shadow-lg shadow-primary/20";
  } else {
    btn.textContent = lang.btn_checkout_default;
    btn.disabled = true;
    btn.className =
      "w-full py-4 bg-gray-300 dark:bg-gray-700 text-gray-500 rounded-xl font-semibold transition-colors cursor-not-allowed";
  }
}

function getFormData() {
  const isVoucher =
    (currentProduct.type && currentProduct.type.toLowerCase() === "voucher") ||
    (currentProduct.form_type &&
      currentProduct.form_type.toLowerCase() === "voucher");

  if (isVoucher) {
    return {
      email: document.getElementById("form-email")?.value || "",
      whatsapp: document.getElementById("form-whatsapp")?.value || "",
    };
  } else {
    const serverInput = document.getElementById("form-server");
    return {
      gameId: document.getElementById("form-game-id")?.value || "",
      server: serverInput ? serverInput.value : "",
      nickname: document.getElementById("form-nickname")?.value || "",
      email: document.getElementById("form-email")?.value || "",
      whatsapp: document.getElementById("form-whatsapp")?.value || "",
    };
  }
}

function showCheckoutModal() {
  const lang = translations[currentLang];

  if (!selectedNominal) {
    showToast("Please select a nominal first", "error");
    return;
  }
  const formData = getFormData();
  const serverInput = document.getElementById("form-server");
  const isServerRequired = !!serverInput;
  let isValid = true;

  document.querySelectorAll("[id^='error-']").forEach(el => {
    el.textContent = ""; 
    el.classList.add("hidden");
  });

  if (!formData.email || !formData.email.endsWith("@gmail.com")) {
      const err = document.getElementById("error-email");
      if(err) {
        err.textContent = lang.err_email;
        err.classList.remove("hidden");
      }
      isValid = false;
  }

  if (!formData.whatsapp || !/^\d+$/.test(formData.whatsapp) || !formData.whatsapp.startsWith("62")) {
      const err = document.getElementById("error-whatsapp");
      if(err) {
        if (!/^\d+$/.test(formData.whatsapp)) err.textContent = lang.err_whatsapp_number;
        else err.textContent = lang.err_whatsapp_prefix;
        
        err.classList.remove("hidden");
      }
      isValid = false;
  }

  const isVoucher =
    (currentProduct.type && currentProduct.type.toLowerCase() === "voucher") ||
    (currentProduct.form_type &&
      currentProduct.form_type.toLowerCase() === "voucher");

  if (!isVoucher) {
      if (!formData.gameId) {
          const err = document.getElementById("error-game-id");
          if(err) { err.textContent = lang.err_game_id; err.classList.remove("hidden"); }
          isValid = false;
      }
      if (!formData.nickname) {
          const err = document.getElementById("error-nickname");
          if(err) { err.textContent = lang.err_nickname; err.classList.remove("hidden"); }
          isValid = false;
      }
      if (isServerRequired && serverInput.tagName === "INPUT") {
          if (!formData.server || !/^\d+$/.test(formData.server)) {
              const err = document.getElementById("error-server");
              if(err) {
                 err.textContent = lang.err_server_id;
                 err.classList.remove("hidden");
              }
              isValid = false;
          }
      } else if (isServerRequired && !formData.server) {
          isValid = false;
      }
  }

  if (!isValid) {
      showToast(lang.err_form_check, "error");
      return;
  }

  const disc = parseFloat(selectedNominal.discount);
  const hasDiscount = !isNaN(disc) && disc > 0;
  let price = hasDiscount
    ? (selectedNominal.price * (100 - disc)) / 100
    : selectedNominal.price;

  let accountInfoHTML = "";
  if (isVoucher) {
    accountInfoHTML = `
      <div class="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
        <div class="mb-3"><p class="text-sm text-gray-500 dark:text-gray-400 mb-1">${lang.label_email}</p><p class="font-medium text-gray-900 dark:text-white break-all">${formData.email}</p></div>
        <div><p class="text-sm text-gray-500 dark:text-gray-400 mb-1">${lang.label_whatsapp}</p><p class="font-medium text-gray-900 dark:text-white">${formData.whatsapp}</p></div>
      </div>`;
  } else {
    const serverDisplay = formData.server
      ? `<div class="flex justify-between"><span class="text-sm text-gray-500 dark:text-gray-400">${lang.label_server}</span><span class="font-medium text-gray-900 dark:text-white">${formData.server}</span></div>`
      : "";
    const idLabel =
      currentProduct.category === "premium"
        ? lang.label_account_id
        : lang.label_game_id;

    accountInfoHTML = `
      <div class="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 space-y-3">
        <div class="flex justify-between"><span class="text-sm text-gray-500 dark:text-gray-400">${idLabel}</span><span class="font-medium text-gray-900 dark:text-white">${formData.gameId}</span></div>
        ${serverDisplay}
        <div class="flex justify-between"><span class="text-sm text-gray-500 dark:text-gray-400">${lang.label_nickname}</span><span class="font-medium text-gray-900 dark:text-white">${formData.nickname}</span></div>
        <div class="border-t border-gray-200 dark:border-gray-700 my-2 pt-2"></div>
        <div class="mb-3"><p class="text-sm text-gray-500 dark:text-gray-400 mb-1">${lang.label_email}</p><p class="font-medium text-gray-900 dark:text-white break-all">${formData.email}</p></div>
        <div><p class="text-sm text-gray-500 dark:text-gray-400 mb-1">${lang.label_whatsapp}</p><p class="font-medium text-gray-900 dark:text-white">${formData.whatsapp}</p></div>
      </div>`;
  }

  const promoHTML = `
    <div class="mt-4 mb-4">
      <div class="flex justify-between items-center mb-2">
         <label class="block text-sm font-medium text-gray-900 dark:text-white">${lang.label_promo}</label>
         <button type="button" onclick="toggleCouponList()" class="text-xs fusion-text-gradient hover:underline font-medium">
           <i class="fas fa-tags mr-1"></i> ${lang.link_view_promo}
         </button>
      </div>
      
      <div id="available-coupons-area" class="hidden mb-3 space-y-2 max-h-40 overflow-y-auto custom-scrollbar p-1">
         <div class="text-center py-2"><i class="fas fa-spinner fa-spin fusion-text-gradient"></i> ${lang.text_loading_coupons}</div>
      </div>

      <div class="flex gap-2">
        <input type="text" id="promo-code-input" class="flex-1 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white uppercase" placeholder="CODE">
        <button onclick="applyCoupon()" class="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-xl font-medium transition-colors">${lang.btn_apply}</button>
      </div>
      <div id="promo-message" class="text-xs mt-2"></div>
    </div>
  `;

  document.getElementById("checkout-content").innerHTML = `
    <div class="flex items-center gap-4 pb-4 border-b dark:border-gray-700">
      <img src="${currentProduct.image}" alt="${currentProduct.name}" class="w-16 h-16 rounded-xl object-cover">
      <div><h4 class="font-semibold text-gray-900 dark:text-white">${currentProduct.name}</h4><p class="text-sm text-gray-500 dark:text-gray-400">${selectedNominal.name}</p></div>
    </div>
    ${accountInfoHTML}
    ${promoHTML}
    <div class="bg-primary/10 rounded-xl p-4">
      <div id="price-summary">
        <div class="flex justify-between items-center"><span class="font-medium text-gray-900 dark:text-white">${lang.label_total}</span><span class="text-xl font-bold fusion-text-gradient">IDR ${formatPrice(price)}</span></div>
      </div>
    </div>`;

  openModal("checkout");
}

async function toggleCouponList() {
  const area = document.getElementById("available-coupons-area");
  const emailVal = document.getElementById("form-email")?.value || "";
  const waVal = document.getElementById("form-whatsapp")?.value || "";
  const gameIdVal = document.getElementById("form-game-id")?.value || "";

  const lang = translations[currentLang];

  if (area.classList.contains("hidden")) {
    area.classList.remove("hidden");

    area.innerHTML = `<div class="text-center py-2"><i class="fas fa-spinner fa-spin text-primary"></i> ${lang.text_searching_promo}</div>`;

    try {
      const timestamp = new Date().getTime();
      const params = new URLSearchParams({
        action: "getCoupons",
        email: emailVal,
        phone: waVal,
        gameId: gameIdVal,
        _t: timestamp,
      });

      const response = await fetch(`${config.gas_url}?${params.toString()}`);
      const allCoupons = await response.json();

      const validCoupons = allCoupons.filter((c) => {
        const pCat = currentProduct.category.toLowerCase();
        const pId = currentProduct.id.toLowerCase();

        if (
          c.allowed_category !== "all" &&
          c.allowed_category.toLowerCase() !== pCat
        )
          return false;
        if (
          c.allowed_products !== "all" &&
          c.allowed_products.toLowerCase() !== pId
        )
          return false;
        if (selectedNominal && c.allowed_nominal_category !== "all") {
          if (
            selectedNominal.category.toLowerCase() !==
            c.allowed_nominal_category.toLowerCase()
          )
            return false;
        }

        const now = new Date();
        if (c.start_date) {
          const start = new Date(c.start_date);
          start.setHours(0, 0, 0, 0);
          if (now < start) return false;
        }
        if (c.end_date) {
          const end = new Date(c.end_date);
          end.setHours(23, 59, 59, 999);
          if (now > end) return false;
        }
        return true;
      });

      if (validCoupons.length === 0) {
        area.innerHTML = `<div class="text-xs text-gray-500 text-center py-2">${lang.text_no_promo_found}</div>`;
      } else {
        area.innerHTML = validCoupons.map((c) => formatCouponCard(c)).join("");
      }
    } catch (e) {
      console.error(e);
      area.innerHTML = `<div class="text-xs text-red-500 text-center">${lang.text_failed_load_promo}</div>`;
    }
  } else {
    area.classList.add("hidden");
  }
}

function formatCouponCard(c) {
  const lang = translations[currentLang];
  let discountText = "";
  if (c.type === "fixed") {
    discountText = `${lang.text_discount_off} Rp ${formatPrice(c.value)}`;
  } else {
    discountText = `${lang.text_discount_disc} ${c.value}%`;
    if (c.max_discount > 0) {
      discountText += ` (Max Rp ${formatPrice(c.max_discount)})`;
    }
  }

  let minBuyText = "";
  if (c.min_purchase > 0) {
    minBuyText = `${lang.text_min_purchase} Rp ${formatPrice(c.min_purchase)}`;
  } else {
    minBuyText = lang.text_no_min_purchase;
  }

  let timeInfo = "";
  if (c.end_date) {
    const d = new Date(c.end_date);
    const locale = currentLang === "id" ? "id-ID" : "en-US";
    const dateStr = d.toLocaleDateString(locale, {
      day: "numeric",
      month: "short",
    });

    timeInfo += `<span class="bg-red-100 text-red-600 px-1.5 py-0.5 rounded text-[10px] mr-1"><i class="far fa-clock"></i> ${lang.text_valid_until} ${dateStr}</span>`;
  }

  if (c.allowed_hours) {
    timeInfo += `<span class="bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded text-[10px]"><i class="far fa-clock"></i> ${lang.text_hours} ${c.allowed_hours}</span>`;
  }

  return `
    <div onclick="useCoupon('${c.code}')" class="coupon-card rounded-xl p-3 mb-2 cursor-pointer relative group bg-white dark:bg-gray-800 border border-dashed border-primary hover:border-red-600 transition-all shadow-sm">
       <div class="flex justify-between items-start">
         <div>
           <div class="font-bold text-gray-800 dark:text-white text-sm flex items-center gap-2">
             ${c.code}
             ${timeInfo}
           </div>
           <div class="text-primary dark:text-primary font-bold text-xs mt-0.5">${discountText}</div>
           <div class="text-[10px] text-gray-500 dark:text-gray-400 mt-1">${minBuyText}</div>
         </div>
         
         <div class="absolute right-3 top-1/2 transform -translate-y-1/2">
             <button class="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-lg font-medium hover:bg-primary/20 transition-colors">
               ${lang.btn_use_coupon}
             </button>
         </div>
       </div>
    </div>
  `;
}

function useCoupon(code) {
  const input = document.getElementById("promo-code-input");
  input.value = code;
  document.getElementById("available-coupons-area").classList.add("hidden");
  applyCoupon();
}

async function applyCoupon() {
  const input = document.getElementById("promo-code-input");
  const msg = document.getElementById("promo-message");
  const priceContainer = document.getElementById("price-summary");
  const code = input.value.trim();
  const lang = translations[currentLang];
  const emailVal = document.getElementById("form-email")?.value || "";
  const waVal = document.getElementById("form-whatsapp")?.value || "";
  const gameIdVal = document.getElementById("form-game-id")?.value || "";

  if (!code) return;

  msg.className = "text-xs mt-2 text-gray-500";
  msg.textContent = currentLang === "en" ? "Checking..." : "Mengecek...";

  const disc = parseFloat(selectedNominal.discount);
  const hasDiscount = !isNaN(disc) && disc > 0;
  let basePrice = hasDiscount
    ? (selectedNominal.price * (100 - disc)) / 100
    : selectedNominal.price;

  const params = new URLSearchParams({
    action: "checkCoupon",
    code: code,
    price: basePrice,
    category: currentProduct.category,
    productId: currentProduct.id,
    nominalCategory: selectedNominal.category,
    email: emailVal,
    phone: waVal,
    gameId: gameIdVal,
    lang: currentLang,
  });

  try {
    const timestamp = new Date().getTime();
    const response = await fetch(
      `${config.gas_url}?${params.toString()}&_t=${timestamp}`,
    );
    const data = await response.json();

    if (data.valid) {
      appliedCoupon = { code: code, discount: data.discount };
      msg.className = "text-xs mt-2 text-green-500 font-medium";
      msg.textContent = `✓ ${data.message}`;

      let finalPrice = basePrice - data.discount;
      if (finalPrice < 0) finalPrice = 0;

      priceContainer.innerHTML = `
        <div class="flex justify-between items-center mb-1 text-sm text-gray-500"><span class="dark:text-gray-400">Subtotal</span><span>IDR ${formatPrice(basePrice)}</span></div>
        <div class="flex justify-between items-center mb-2 text-sm text-green-500 font-medium"><span>${lang.text_discount_promo} (${code})</span><span>- IDR ${formatPrice(data.discount)}</span></div>
        <div class="border-t border-primary/20 my-2 pt-2"></div>
        <div class="flex justify-between items-center"><span class="font-medium text-gray-900 dark:text-white">${lang.label_total}</span><span class="text-xl font-bold fusion-text-gradient">IDR ${formatPrice(finalPrice)}</span></div>
      `;
    } else {
      appliedCoupon = null;
      msg.className = "text-xs mt-2 text-red-500";
      msg.textContent = `✕ ${data.message}`;

      priceContainer.innerHTML = `<div class="flex justify-between items-center"><span class="font-medium text-gray-900 dark:text-white">${lang.label_total}</span><span class="text-xl font-bold fusion-text-gradient">IDR ${formatPrice(basePrice)}</span></div>`;
    }
  } catch (e) {
    console.error(e);
    msg.textContent =
      currentLang === "en" ? "Error checking coupon" : "Gagal mengecek kupon";
  }
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
  let price = hasDiscount
    ? (selectedNominal.price * (100 - disc)) / 100
    : selectedNominal.price;

  if (appliedCoupon) {
    price = price - appliedCoupon.discount;
    if (price < 0) price = 0;
  }

  const isVoucher =
    (currentProduct.type && currentProduct.type.toLowerCase() === "voucher") ||
    (currentProduct.form_type &&
      currentProduct.form_type.toLowerCase() === "voucher");

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
    couponCode: appliedCoupon ? appliedCoupon.code : "",
  };

  fetch(config.gas_url, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  }).catch((err) => console.error("Order submit failed:", err));

  saveOrderToHistory(orderId);

  let orderText = `*NEW ORDER*%0A%0AOrder ID: ${orderId}%0AProduct: ${currentProduct.name}%0ANominal: ${selectedNominal.name}%0APrice: IDR ${formatPrice(price)}%0A%0A*Account Info*%0A`;

  if (isVoucher) {
    orderText += `Email: ${formData.email}%0AWhatsApp: ${formData.whatsapp}`;
  } else {
    const idLabel =
      currentProduct.category === "premium" ? "ID Account" : "Game ID";

    orderText += `${idLabel}: ${formData.gameId}%0A`;
    if (formData.server) orderText += `Server: ${formData.server}%0A`;
    if (formData.nickname) orderText += `Nickname: ${formData.nickname}%0A`;
    orderText += `Email: ${formData.email}%0AWhatsApp: ${formData.whatsapp}`;
  }

  if (appliedCoupon) {
    orderText += `%0A%0A*Promo Used:* ${appliedCoupon.code}`;
  }

  window.open(
    `https://wa.me/${config.admin_whatsapp}?text=${orderText}`,
    "_blank",
  );

  const orderForm = document.getElementById("order-form");
  if (orderForm) orderForm.reset();

  selectedNominal = null;
  appliedCoupon = null;
  updateCheckoutButton();

  document.querySelectorAll(".nominal-card").forEach((card) => {
    card.classList.remove("selected");
  });

  closeModal("checkout");
  showToast("Order created! Redirecting to WhatsApp...", "success");
  btn.disabled = false;
  btn.innerHTML = originalText;
}

function saveOrderToHistory(orderId) {
  let history = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  history.unshift({ id: orderId, timestamp: new Date().getTime() });
  if (history.length > 5) history = history.slice(0, 5);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

function checkHistoryExpiration() {
  const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  if (history.length > 0) {
    const lastOrder = history[0];
    const oneDay = 24 * 60 * 60 * 1000;
    if (new Date().getTime() - lastOrder.timestamp > oneDay) {
      localStorage.removeItem(HISTORY_KEY);
    }
  }
}

function copyText(text, btnElement) {
  navigator.clipboard.writeText(text).then(() => {
    const tooltip = btnElement.querySelector(".copy-tooltip");
    if (tooltip) {
      tooltip.classList.remove("opacity-0", "invisible");
      setTimeout(() => {
        tooltip.classList.add("opacity-0", "invisible");
      }, 2000);
    }
  });
}

function filterGames(category) {
  currentFilter = category;
  updateFilterButtons(".filter-btn", category);
  renderAllGames("home");
}
function filterGamesTopup(category) {
  currentFilterTopup = category;
  topupDisplayCount = 15;
  sessionStorage.setItem('topup_filter', category);
  sessionStorage.setItem('topup_count', 15);
  updateFilterButtons(".filter-btn-topup", category);
  renderAllGames("topup");
}

function updateFilterButtons(selector, active) {
  document.querySelectorAll(selector).forEach((btn) => {
    const btnText = btn.textContent.trim().toLowerCase();

    const isActive =
      btnText === active.toLowerCase() ||
      (active === "all" && btnText === "all") ||
      (active === "premium" && btnText.includes("premium"));

    if (isActive) {
      btn.classList.add("active", "fusion-gradient", "text-white");
      btn.classList.remove(
        "bg-gray-200",
        "dark:bg-gray-700",
        "hover:bg-primary",
        "hover:text-white",
        "dark:hover:bg-primary",
        "dark:hover:text-white"
      );
    } else {
      btn.classList.remove("active", "fusion-gradient", "text-white");
      btn.classList.add(
        "bg-gray-200",
        "dark:bg-gray-700",
        "hover:bg-primary",
        "hover:text-white",
        "dark:hover:bg-primary",
        "dark:hover:text-white"
      );
    }
  });
}

function loadMoreGames() {
  topupDisplayCount += 5;
  sessionStorage.setItem('topup_count', topupDisplayCount);
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

function closeModal(modalId) {
  const modal = document.getElementById(`${modalId}-modal`);
  if (modal) {
    modal.classList.add("opacity-0", "pointer-events-none");
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (modalId === "tracking") {
    const input = document.getElementById("tracking-order-id");
    const resultDiv = document.getElementById("tracking-result");
    const historyDiv = document.getElementById("tracking-history");
    if (input) input.value = "";
    if (resultDiv) resultDiv.innerHTML = "";
    if (historyDiv) historyDiv.innerHTML = "";
  }
}

function openModal(modalId) {
  const modal = document.getElementById(`${modalId}-modal`);
  if (modal) {
    modal.classList.remove("opacity-0", "pointer-events-none");
    modal.classList.add("active");
    document.body.style.overflow = "hidden";

    if (modalId === "tracking") {
      renderTrackingHistory();
    }
  }
}

function renderTrackingHistory() {
  let historyDiv = document.getElementById("tracking-history");
  if (!historyDiv) {
    const modalBody = document.querySelector("#tracking-modal .p-6");
    if (modalBody) {
      historyDiv = document.createElement("div");
      historyDiv.id = "tracking-history";
      historyDiv.className = "mt-6";
      modalBody.appendChild(historyDiv);
    }
  }

  if (!historyDiv) return;

  const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  const lang = translations[currentLang];

  if (history.length > 0) {
    const listHtml = history
      .map(
        (item) =>
          `<div onclick="fillTrackingInput('${item.id}')" class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors mb-2">
         <span class="text-sm font-medium text-gray-700 dark:text-gray-300">${item.id}</span>
         <span class="text-xs text-gray-400">${lang.text_click_to_check}</span>
       </div>`,
      )
      .join("");

    historyDiv.innerHTML = `
      <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-3 border-t dark:border-gray-700 pt-4">${lang.text_history_title}</h4>
      ${listHtml}
    `;
  } else {
    historyDiv.innerHTML = "";
  }
}

function fillTrackingInput(orderId) {
  const input = document.getElementById("tracking-order-id");
  if (input) {
    input.value = orderId;
    checkOrderStatus();
  }
}

function setRatingInput(val) {
  document.getElementById('input-review-rating').value = val;
  const stars = document.querySelectorAll('#star-rating-input i');
  stars.forEach((star, idx) => {
      if (idx < val) {
          star.classList.remove('far', 'text-gray-300');
          star.classList.add('fas', 'text-primary');
      } else {
          star.classList.remove('fas', 'text-primary');
          star.classList.add('far', 'text-gray-300');
      }
  });
}

async function submitReview(orderId, productId, productName) {
  const rating = document.getElementById('input-review-rating').value;
  const name = document.getElementById('input-review-name').value.trim();
  const text = document.getElementById('input-review-text').value.trim();

  if (rating == 0) return showToast(currentLang === 'id' ? "Silakan pilih rating bintang" : "Please select a star rating", "error");
  if (!name) return showToast(currentLang === 'id' ? "Silakan isi nama" : "Please enter your name", "error");
  if (!text) return showToast(currentLang === 'id' ? "Silakan isi ulasan" : "Please enter a review", "error");

  const btn = document.getElementById('btn-submit-review');
  const origText = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
  btn.disabled = true;

  try {
      const res = await fetch(config.gas_url, {
          method: "POST",
          body: JSON.stringify({
              action: "submitReview",
              orderId: orderId,
              productId: productId,
              productName: productName,
              customerName: name,
              rating: Number(rating),
              review: text
          })
      });
      
      const data = await res.json();
      if (data.status === "success") {
          showToast(currentLang === 'id' ? "Ulasan berhasil dikirim!" : "Review submitted!", "success");
          closeModal("tracking");
          
          const timestamp = new Date().getTime();
          const refreshRes = await fetch(`${config.gas_url}?action=getReviews&_t=${timestamp}`);
          reviews = await refreshRes.json();
          localStorage.setItem(REVIEWS_CACHE_KEY, JSON.stringify(reviews));

          if (document.getElementById("product-hero")) updateProductReviewStats();
          if (document.getElementById("popular-products")) {
             renderHomeReviews();
             updateOverallRating();
          }
      } else {
          showToast(data.message || "Gagal mengirim ulasan", "error");
          btn.innerHTML = origText;
          btn.disabled = false;
      }
  } catch(e) {
      showToast("System error", "error");
      btn.innerHTML = origText;
      btn.disabled = false;
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
    const timestamp = new Date().getTime();
    const response = await fetch(
      `${config.gas_url}?action=trackOrder&orderId=${orderId}&_t=${timestamp}`,
    );
    const data = await response.json();

    if (data.found) {
      let statusColor = "text-gray-500";
      let displayStatus = data.status;
      const lang = translations[currentLang];

      if (data.status === "Menunggu Pembayaran") {
        statusColor = "text-red-500";
        displayStatus = lang.status_pending;
      } else if (data.status === "Pesanan Diproses") {
        statusColor = "text-yellow-500";
        displayStatus = lang.status_process;
      } else if (data.status === "Pesanan Selesai") {
        statusColor = "text-green-500";
        displayStatus = lang.status_success;
      } else if (data.status === "Pesanan Dibatalkan") {
        statusColor = "text-gray-500";
        displayStatus = lang.status_canceled;
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
            <span class="text-sm text-gray-500">${lang.label_account_info}</span>
            <span class="text-sm md:text-base font-medium dark:text-white text-right">${data.gameId}${nickDisplay}</span>
          </div>`;
      } else {
        additionalInfoHTML = `
          <div class="flex justify-between mb-2">
            <span class="text-sm text-gray-500">${lang.label_email}</span>
            <span class="text-sm md:text-base font-medium dark:text-white text-right">${data.email}</span>
          </div>`;
      }

      let voucherHTML = "";
      if (data.info_admin && data.info_admin.trim() !== "") {
        let subscriptionInfo = "";
        if (data.start_date !== "-" && data.expiry_date !== "-") {
          subscriptionInfo = `
         <div class="mt-3 pt-3 border-t border-green-200 dark:border-green-800 flex justify-between text-xs">
            <div>
               <span class="block text-gray-500 dark:text-gray-400">${lang.label_start_date}</span> <span class="font-medium text-gray-800 dark:text-white">${data.start_date}</span>
            </div>
            <div class="text-right">
               <span class="block text-gray-500 dark:text-gray-400">${lang.label_expiry_date}</span> <span class="font-bold text-primary">${data.expiry_date}</span>
            </div>
         </div>
       `;
        }

        let renewalHTML = "";
        if (data.renewal_info && data.renewal_info.trim() !== "") {
          renewalHTML = `
             <div class="mt-3 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-700">
               <p class="text-xs font-bold text-yellow-700 dark:text-yellow-400 mb-1">
                 <i class="fas fa-sync-alt mr-1"></i> UPDATE AKUN/PERPANJANGAN
               </p>
               <div class="text-sm font-mono text-gray-800 dark:text-white break-all select-all">
                 ${data.renewal_info}
               </div>
             </div>
           `;
        }

        voucherHTML = `
      <div class="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl relative group">
        <p class="text-xs text-green-600 dark:text-green-400 font-bold uppercase mb-2">
          <i class="fas fa-gift mr-1"></i> ${lang.label_order_data} </p>
        <div class="font-mono text-sm text-gray-800 dark:text-white break-all select-all bg-white dark:bg-black/20 p-3 rounded border border-green-100 dark:border-green-900 pr-10">
          ${data.info_admin}
        </div>
        
        <button onclick="copyText('${data.info_admin.replace(/'/g, "\\'")}', this)" class="absolute top-10 right-6 p-2 text-gray-400 hover:text-primary transition-colors bg-white dark:bg-gray-800 rounded shadow-sm border border-gray-200 dark:border-gray-700" title="${lang.text_copy}">
           <i class="far fa-copy"></i>
           <span class="copy-tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 invisible transition-opacity shadow-lg">
             ${lang.text_copied} </span>
        </button>
        ${subscriptionInfo}
        ${renewalHTML}
      </div>
    `;
      }

      let reviewFormHTML = "";
      if (data.status === "Pesanan Selesai" && !data.is_reviewed && data.productId) {
         reviewFormHTML = `
            <div class="mt-4 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
                <h4 class="text-sm font-bold text-gray-900 dark:text-white mb-2" data-i18n="text_submit_review">${lang.text_submit_review}</h4>
                <div class="flex justify-center gap-2 mb-3" id="star-rating-input">
                    <i class="far fa-star text-2xl text-gray-300 cursor-pointer hover:text-primary transition-colors" onclick="setRatingInput(1)"></i>
                    <i class="far fa-star text-2xl text-gray-300 cursor-pointer hover:text-primary transition-colors" onclick="setRatingInput(2)"></i>
                    <i class="far fa-star text-2xl text-gray-300 cursor-pointer hover:text-primary transition-colors" onclick="setRatingInput(3)"></i>
                    <i class="far fa-star text-2xl text-gray-300 cursor-pointer hover:text-primary transition-colors" onclick="setRatingInput(4)"></i>
                    <i class="far fa-star text-2xl text-gray-300 cursor-pointer hover:text-primary transition-colors" onclick="setRatingInput(5)"></i>
                </div>
                <input type="hidden" id="input-review-rating" value="0">
                <input type="text" id="input-review-name" placeholder="Nama Kamu" class="w-full px-3 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 border-0 mb-2 focus:ring-2 focus:ring-primary outline-none dark:text-white">
                <textarea id="input-review-text" rows="2" placeholder="Bagaimana pengalaman belanjamu?" class="w-full px-3 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 border-0 mb-3 focus:ring-2 focus:ring-primary outline-none dark:text-white resize-none"></textarea>
                <button onclick="submitReview('${data.orderId}', '${data.productId}', '${data.product}')" id="btn-submit-review" class="w-full py-2 fusion-gradient text-white rounded-lg text-sm font-bold shadow-md hover:opacity-90 transition-opacity" data-i18n="text_send_review">${lang.text_send_review}</button>
            </div>
         `;
      }

      resultDiv.innerHTML = `
        <div class="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 mt-4">
          <div class="flex justify-between mb-2"><span class="text-sm text-gray-500">${lang.label_order_id}</span><span class="text-sm md:text-base font-medium dark:text-white">${data.orderId}</span></div>
          <div class="flex justify-between mb-2"><span class="text-sm text-gray-500 flex-shrink-0">${lang.label_product}</span><span class="text-sm md:text-base font-medium dark:text-white text-right ml-4 break-words">${data.product} - ${data.nominal}</span></div>
          ${additionalInfoHTML}
          <div class="flex justify-between mb-2 items-center"><span class="text-sm text-gray-500">${lang.label_status}</span><span class="font-bold ${statusColor} text-sm md:text-base">${displayStatus}</span></div>
          ${voucherHTML}
        </div>
        ${reviewFormHTML}`;
    } else {
      resultDiv.innerHTML =
        '<div class="text-center text-gray-500 py-4">Order ID not found.</div>';
    }
  } catch (error) {
    resultDiv.innerHTML =
      '<div class="text-center text-red-500 py-4">Error tracking order.</div>';
  }
}

function showToast(message, type = "success") {
  let toast = document.getElementById("toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className =
      "fixed top-4 left-1/2 transform -translate-x-1/2 z-50 hidden transition-all duration-300 -translate-y-full opacity-0";
    toast.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 p-4 flex items-center gap-3 min-w-[300px]">
        <div id="toast-icon" class="text-xl"></div>
        <p id="toast-message" class="text-sm font-medium text-gray-800 dark:text-white flex-1"></p>
      </div>
    `;
    document.body.appendChild(toast);
  }

  const icon =
    toast.querySelector("#toast-icon") || document.getElementById("toast-icon");
  const msg =
    toast.querySelector("#toast-message") ||
    document.getElementById("toast-message");

  if (!msg || !icon) return;

  msg.textContent = message;
  icon.className =
    type === "success"
      ? "fas fa-check-circle text-green-500"
      : "fas fa-exclamation-circle text-red-500";

  toast.classList.remove("hidden");
  
  setTimeout(() => {
    toast.classList.remove("-translate-y-full", "opacity-0");
  }, 10);

  setTimeout(() => {
    toast.classList.add("-translate-y-full", "opacity-0");
    setTimeout(() => toast.classList.add("hidden"), 300);
  }, 3000);
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

      contactForm.reset();
    });

  setupSearch("search-input", "search-results");
  setupSearch("search-input-mobile", "search-results-mobile");

  window.addEventListener("beforeunload", () => {
    if (document.getElementById("all-games-topup")) {
      sessionStorage.setItem("topup_scroll_pos", window.scrollY);
    }
  });
}

function setupSearch(inputId, resultsId) {
  const searchInput = document.getElementById(inputId);
  const searchResults = document.getElementById(resultsId);

  const abbreviations = {
      "ml": "Mobile Legends",
      "mlbb": "Mobile Legends",
      "ff": "Free Fire",
      "pubg": "PUBG Mobile",
      "pubgm": "PUBG Mobile",
      "gi": "Genshin Impact",
      "hok": "Honor of Kings",
      "valo": "Valorant",
      "coc": "Clash of Clans",
      "hi": "Honkai Impact",
      "hsr": "Honkai Star Rail",
      "zzz": "Zenless Zone Zero",
      "cod": "Call of Duty",
      "codm": "Call of Duty Mobile",
      "aov": "Arena of Valor",
      "lol": "League of Legends"
  };

  if (searchInput && searchResults) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (query.length > 0) {
        const filtered = products.filter((p) => {
            const hasStock = p.nominals && p.nominals.length > 0;
            if (!hasStock) return false;

            const matchesQuery =
                p.name.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query) ||
                p.developer.toLowerCase().includes(query);

            const acronym = p.name.split(' ').map(w => w[0]).join('').toLowerCase();
            const matchesAcronym = acronym.includes(query);

            const mappedName = abbreviations[query];
            const matchesMapping = mappedName && p.name.toLowerCase().includes(mappedName.toLowerCase());

            return matchesQuery || matchesAcronym || matchesMapping;
        });

        if (filtered.length > 0) {
          searchResults.innerHTML = filtered
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

function setupTrackingListener() {
  const trackBtn = document.getElementById("btn-track-order");
  if (trackBtn) {
    trackBtn.addEventListener("click", () => openModal("tracking"));
  }
}

let chatInterval = null;
let chatUserId = localStorage.getItem("snaz_chat_id");
let lastRenderedCount = 0;
let replyContext = null;
let selectedFiles = [];

if (
  !chatUserId ||
  chatUserId.startsWith("guest_") ||
  chatUserId.startsWith("cs-")
) {
  chatUserId = "customer_" + Math.random().toString(36).substr(2, 9);
  localStorage.setItem("snaz_chat_id", chatUserId);
}

function toggleChat() {
  const modal = document.getElementById("chat-widget");
  const btn = document.getElementById("chat-toggle-btn");

  if (modal.classList.contains("hidden")) {
    modal.classList.remove("hidden");
    btn.classList.add("hidden");
    document.getElementById("chat-badge").classList.add("hidden");

    const container = document.getElementById("chat-messages");
    if (container) container.scrollTop = container.scrollHeight;

    fetchMessages();
    fetchAdminStatus();
    chatInterval = setInterval(() => {
      fetchMessages(true);
      fetchAdminStatus();
    }, 4000);
  } else {
    modal.classList.add("hidden");
    btn.classList.remove("hidden");
    if (chatInterval) clearInterval(chatInterval);
  }
}

async function fetchAdminStatus() {
  try {
    const res = await fetch(
      `${config.chat_script_url}?action=getAdminStatus&_t=${Date.now()}`,
    );
    const data = await res.json();
    const statusEl = document.getElementById("chat-status");
    const indicatorEl = document.getElementById("chat-indicator");
    const lastSeenText = data.last_seen_text ? `• ${data.last_seen_text}` : "";

    if (String(data.status).toUpperCase() === "ONLINE") {
      statusEl.innerText = `Online ${lastSeenText}`;
      indicatorEl.className =
        "absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full animate-pulse";
    } else {
      statusEl.innerText = `Offline ${lastSeenText}`;
      indicatorEl.className =
        "absolute bottom-0 right-0 w-2.5 h-2.5 bg-gray-400 border-2 border-white rounded-full";
    }
  } catch (e) {}
}

async function fetchMessages(isPolling = false) {
  try {
    const res = await fetch(
      `${config.chat_script_url}?action=pollMessages&userId=${chatUserId}&_t=${Date.now()}`,
    );
    const data = await res.json();

    if (isPolling && data.messages.length === lastRenderedCount) return;

    renderChatHistory(data.messages);
    lastRenderedCount = data.messages.length;
  } catch (e) {
    console.error(e);
  }
}

function formatDateHeader(dateObj) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (dateObj.toDateString() === today.toDateString()) return "Hari Ini";
  if (dateObj.toDateString() === yesterday.toDateString()) return "Kemarin";

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return dateObj.toLocaleDateString("id-ID", options);
}

function renderChatHistory(messages) {
  const container = document.getElementById("chat-messages");
  const isScrolledToBottom =
    container.scrollHeight - container.clientHeight <=
    container.scrollTop + 100;

  let html = `<div class="flex justify-center my-4"><span class="text-[10px] text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700">Percakapan Dienkripsi</span></div>`;
  let lastDateLabel = null;

  messages.forEach((msg) => {
    const isMe = msg.sender === "User";
    const msgDate = new Date(msg.time);
    const dateLabel = formatDateHeader(msgDate);

    if (lastDateLabel !== dateLabel) {
      html += `
         <div class="flex justify-center my-4 sticky top-0 z-10">
           <span class="text-[10px] font-bold text-gray-500 bg-white/90 dark:bg-gray-800/90 backdrop-blur px-3 py-0.5 rounded-full shadow-sm border border-gray-200 dark:border-gray-700">
             ${dateLabel}
           </span>
         </div>`;
      lastDateLabel = dateLabel;
    }

    html += buildMessageHTML(msg, isMe, false);
  });

  container.innerHTML = html;
  if (isScrolledToBottom) container.scrollTop = container.scrollHeight;
}

function buildMessageHTML(msg, isMe, isSending) {
  let content = msg.content;
  let mediaUrl = null;
  let isMedia = msg.type !== "text";

  if (isMedia) {
    try {
      const obj = JSON.parse(msg.content);
      mediaUrl = obj.url;
      content = obj.caption || "";
    } catch (e) {
      mediaUrl = msg.content;
      content = "";
    }
  }

  const align = isMe ? "justify-end" : "justify-start";
  
  const bubbleStyle = isMe
    ? "fusion-gradient text-white rounded-tr-sm shadow-md"
    : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-tl-sm shadow-sm";

  let replyHtml = "";
  if (msg.replyTo) {
    try {
      const rObj =
        typeof msg.replyTo === "string" ? JSON.parse(msg.replyTo) : msg.replyTo;
      const replyBorder = isMe ? "border-white/50" : "border-primary";
      const replyBg = isMe ? "bg-black/10" : "bg-gray-100 dark:bg-gray-700";

      replyHtml = `
            <div class="mb-1 p-2 rounded ${replyBg} border-l-4 ${replyBorder} text-xs cursor-pointer opacity-90">
                <p class="font-bold mb-0.5 text-[10px]">${rObj.sender}</p>
                <p class="truncate max-w-[150px]">${rObj.content}</p>
            </div>`;
    } catch (e) {}
  }

  let mediaHtml = "";
  if (msg.type === "image") {
    mediaHtml = `<img src="${mediaUrl}" class="w-full max-w-[200px] rounded-lg mb-1 cursor-pointer hover:brightness-90 transition-all border border-black/10" onclick="window.open('${mediaUrl}')">`;
  } else if (msg.type === "video") {
    if (mediaUrl.includes("drive.google.com")) {
      mediaHtml = `<div class="w-full max-w-[280px] h-[200px] rounded-lg overflow-hidden bg-black mb-1 relative border border-gray-300 dark:border-gray-700 shadow-sm flex items-center justify-center">
                        <iframe src="${mediaUrl}" class="w-full h-full border-0" allow="autoplay; fullscreen"></iframe>
                      </div>`;
    } else {
      mediaHtml = `<div class="w-full max-w-[280px] h-[200px] rounded-lg overflow-hidden bg-black mb-1 flex items-center justify-center border border-gray-300 dark:border-gray-700">
                        <video src="${mediaUrl}" controls class="w-full h-full object-contain"></video>
                      </div>`;
    }
  } else if (msg.type === "file") {
    mediaHtml = `
        <a href="${mediaUrl}" target="_blank" class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors mb-1 border border-gray-200 dark:border-gray-600">
            <div class="w-10 h-10 bg-white text-primary rounded-lg flex items-center justify-center shrink-0 shadow-sm"><i class="fas fa-file-alt text-lg"></i></div>
            <div class="flex flex-col overflow-hidden">
            <span class="text-xs font-bold truncate">File Dokumen</span>
            <span class="text-[10px] opacity-70">Klik untuk download</span>
            </div>
        </a>`;
  }

  const msgDate = new Date(msg.time || Date.now());
  const timeStr = msgDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const statusText = isSending
    ? `<span class="flex items-center gap-1 opacity-80 italic">${timeStr} • <i class="fas fa-paper-plane animate-pulse text-[10px]"></i> Sending...</span>`
    : timeStr;
  const timeColor = isMe ? "text-white/80" : "text-gray-400";

  return `
        <div class="flex ${align} animate-fade-in mb-3 group">
        <div class="flex flex-col ${isMe ? "items-end" : "items-start"} max-w-[90%] md:max-w-[85%]">
            <div class="p-3 rounded-2xl ${bubbleStyle} relative min-w-[100px]" onclick="setReply('${msg.sender}', '${content || (isMedia ? "[File]" : "")}')">
            ${replyHtml}
            ${mediaHtml}
            ${content ? `<p class="text-sm leading-relaxed whitespace-pre-wrap font-sans">${content}</p>` : ""}
            <span class="text-[10px] ${timeColor} block text-right mt-1.5 flex items-center justify-end gap-1">${statusText}</span>
            </div>
        </div>
        </div>
    `;
}

function handleFileSelect(input) {
  const files = input.files;
  if (!files || files.length === 0) return;

  const limitImg = 1 * 1024 * 1024;
  const limitVideo = 5 * 1024 * 1024;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    if (file.type.startsWith("image/") || file.type === "application/pdf") {
      if (file.size > limitImg) {
        alert(`File ${file.name} terlalu besar (Max 1MB)`);
        continue;
      }
    } else if (file.type.startsWith("video/")) {
      if (file.size > limitVideo) {
        alert(`Video ${file.name} terlalu besar (Max 5MB)`);
        continue;
      }
    }
    selectedFiles.push(file);
  }

  updateFilePreviews();
}

function updateFilePreviews() {
  const container = document.getElementById("file-preview-container");
  const area = document.getElementById("chat-preview-area");

  if (selectedFiles.length > 0 || replyContext) {
    area.classList.remove("hidden");
    area.classList.add("flex");
  } else {
    area.classList.add("hidden");
    area.classList.remove("flex");
  }

  if (selectedFiles.length > 0) {
    container.classList.remove("hidden");
    container.classList.add("flex");
    container.innerHTML = "";

    selectedFiles.forEach((file, index) => {
      let previewContent = "";
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        previewContent = `<img src="${url}" class="h-16 w-16 object-cover rounded-lg border border-gray-200 dark:border-gray-700">`;
      } else {
        previewContent = `<div class="h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center border border-gray-300 dark:border-gray-600"><i class="fas fa-file-alt text-2xl text-gray-500"></i></div>`;
      }

      const itemHtml = `
          <div class="relative flex-shrink-0 group">
             ${previewContent}
             <button onclick="removeFile(${index})" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow hover:scale-110 transition-transform z-10">
               <i class="fas fa-times"></i>
             </button>
             <p class="text-[9px] text-gray-500 dark:text-gray-400 mt-1 truncate max-w-[64px] text-center">${file.name}</p>
          </div>
        `;
      container.innerHTML += itemHtml;
    });
  } else {
    container.classList.add("hidden");
    container.classList.remove("flex");
  }
}

function removeFile(index) {
  selectedFiles.splice(index, 1);
  if (selectedFiles.length === 0) {
    document.getElementById("chat-file-upload").value = "";
  }
  updateFilePreviews();
}

async function sendChatMessage() {
  const input = document.getElementById("chat-input");
  const text = input.value.trim();

  if (!text && selectedFiles.length === 0) return;

  const replyJson = replyContext ? JSON.stringify(replyContext) : null;

  if (text) {
    const tempMsg = {
      sender: "User",
      time: new Date(),
      type: "text",
      content: text,
      replyTo: replyJson,
    };
    document.getElementById("chat-messages").innerHTML += buildMessageHTML(
      tempMsg,
      true,
      true,
    );
    document.getElementById("chat-messages").scrollTop =
      document.getElementById("chat-messages").scrollHeight;

    fetch(config.chat_script_url, {
      method: "POST",
      body: JSON.stringify({
        action: "sendMessage",
        userId: chatUserId,
        sender: "User",
        content: text,
        replyTo: replyJson,
      }),
    });
  }

  if (selectedFiles.length > 0) {
    const filesToSend = [...selectedFiles];

    filesToSend.forEach((file) => {
      let tempMsg = {
        sender: "User",
        time: new Date(),
        type: "file",
        content: "",
        replyTo: replyJson,
      };
      const fileUrl = URL.createObjectURL(file);

      if (file.type.startsWith("image/")) {
        tempMsg.type = "image";
        tempMsg.content = JSON.stringify({ url: fileUrl, caption: "" });
      } else if (file.type.startsWith("video/")) {
        tempMsg.type = "video";
        tempMsg.content = JSON.stringify({ url: fileUrl, caption: "" });
      } else {
        tempMsg.content = JSON.stringify({ url: "#", caption: "" });
      }

      document.getElementById("chat-messages").innerHTML += buildMessageHTML(
        tempMsg,
        true,
        true,
      );
    });
    document.getElementById("chat-messages").scrollTop =
      document.getElementById("chat-messages").scrollHeight;

    for (const file of filesToSend) {
      const reader = new FileReader();
      reader.onload = async function (e) {
        const base64 = e.target.result.split(",")[1];
        await fetch(config.chat_script_url, {
          method: "POST",
          body: JSON.stringify({
            action: "uploadFile",
            userId: chatUserId,
            sender: "User",
            fileName: file.name,
            mimeType: file.type,
            fileData: base64,
            caption: "",
            replyTo: replyJson,
          }),
        });
      };
      reader.readAsDataURL(file);
    }
  }

  input.value = "";
  selectedFiles = [];
  replyContext = null;
  document.getElementById("reply-preview").classList.add("hidden");
  updateFilePreviews();

  setTimeout(() => fetchMessages(), 2000);
}

function setReply(sender, text) {
  replyContext = { sender: sender, content: text };
  document.getElementById("chat-preview-area").classList.remove("hidden");
  document.getElementById("chat-preview-area").classList.add("flex");

  document.getElementById("reply-preview").classList.remove("hidden");
  document.getElementById("reply-to-name").innerText = sender;
  document.getElementById("reply-to-text").innerText = text;
}
function cancelReply() {
  replyContext = null;
  document.getElementById("reply-preview").classList.add("hidden");
  updateFilePreviews();
}
function cancelFile() {
  selectedFiles = [];
  updateFilePreviews();
}
function triggerFileUpload() {
  document.getElementById("chat-file-upload").click();
}