let products = [];
let currentCategory = "all";

const productsContainer = document.getElementById("products-container");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const sidebarCategories = document.querySelectorAll(".sidebar-category");

document.addEventListener("DOMContentLoaded", function () {
    // Mobile menu toggle
    document
        .getElementById("menu-toggle")
        .addEventListener("click", toggleMobileMenu);

    // Fetch products data
    fetch("../src/data/products.json")
        .then((response) => response.json())
        .then((data) => {
            products = data;
            const urlParams = new URLSearchParams(window.location.search);
            const categoryFromUrl = urlParams.get("category");
            if (categoryFromUrl) {
                filterByCategory(categoryFromUrl);
            } else {
                filterByCategory("all"); // Default to all
            }
        })
        .catch((error) => console.error("Error fetching products:", error));

    // Add event listener for search input (real-time search)
    searchInput.addEventListener("input", searchProducts);

    // Keep the search button for users who prefer clicking
    searchButton.addEventListener("click", searchProducts);
});

function toggleMobileMenu() {
    const mobileMenu = document.getElementById("mobile-menu");
    mobileMenu.classList.toggle("hidden");
}

function renderProducts(productsToRender) {
    productsContainer.innerHTML = "";

    if (productsToRender.length === 0) {
        productsContainer.innerHTML = `
                        <div class="col-span-full text-center py-10">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 class="text-xl font-medium text-gray-700">Produk tidak ditemukan</h3>
                            <p class="text-gray-500 mt-2">Coba kata kunci lain atau pilih kategori yang berbeda</p>
                        </div>
                    `;
        return;
    }

    productsToRender.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className =
            "game-card bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300";

        const showAllProducts = product.listProduk.length <= 1;
        const previewProducts = showAllProducts
            ? product.listProduk
            : product.listProduk.slice(0, 5);

        let productListHTML = "";
        previewProducts.forEach((item, index) => {
            productListHTML += `
                            <div class="flex justify-between items-center w-full border-b border-gray-200 px-4 py-2">
                                <span>${item.productsName}</span>
                                <span class="font-semibold text-[#FD5B0E]">${item.price}</span>
                            </div>
                        `;
        });

        let viewDetailsButton = "";
        if (!showAllProducts) {
            viewDetailsButton = `
                            <div class="see-more-button bg-[#FB923C] hover:bg-[#FD5B0E] text-white font-medium py-2 px-4 text-center cursor-pointer transition-colors" onclick="showProductDetail(${product.id})">
                                Lihat Semua Produk
                            </div>
                        `;
        }

        productCard.innerHTML = `
                            <div class="p-5">
                                <div class="flex items-center mb-4">
                                    <div class="w-14 h-14 bg-white rounded-lg flex items-center justify-center mr-4">
                                        <img src="${product.iconUrl}" alt="${product.name}" class="product-icon rounded-[10%]">
                                    </div>
                                    <div>
                                        <h3 class="text-lg font-semibold">${product.name}</h3>
                                        <p class="text-sm text-gray-500">${product.listProduk.length} Produk Tersedia</p>
                                    </div>
                                </div>
                                <div class="border rounded-lg overflow-hidden">
                                    ${productListHTML}
                                    ${viewDetailsButton}
                                </div>
                            </div>
                        `;
        productsContainer.appendChild(productCard);
    });
}

function filterByCategory(category) {
    currentCategory = category;
    sidebarCategories.forEach((item) => {
        item.classList.remove("active", "bg-orange-100", "text-orange-700");
        item.classList.add("text-gray-700", "hover:bg-gray-100");

        if (
            (category === "all" && item.textContent.trim() === "Semua Kategori") ||
            item.textContent.trim() === category
        ) {
            item.classList.add("active", "bg-orange-100", "text-orange-700");
        }
    });
    applyFilters();
}

function applyFilters() {
    let filtered = products;

    if (currentCategory !== "all") {
        filtered = filtered.filter(
            (product) => product.category === currentCategory
        );
    }

    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm) {
        filtered = filtered.filter(
            (product) =>
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm) ||
                product.listProduk.some((item) =>
                    item.productsName.toLowerCase().includes(searchTerm)
                )
        );
    }
    renderProducts(filtered);
}

// Search products - now works in real-time as user types
function searchProducts() {
    const searchTerm = document
        .getElementById("search-input")
        .value.toLowerCase();
    let filteredProducts = products;

    if (searchTerm) {
        filteredProducts = products.filter(
            (product) =>
                product.name.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.listProduk.some((item) =>
                    item.productsName.toLowerCase().includes(searchTerm)
                )
        );
    }

    renderProducts(filteredProducts);
}

function showProductDetail(productId) {
    window.location.href = `/detail/?productId=${productId}`;
}
