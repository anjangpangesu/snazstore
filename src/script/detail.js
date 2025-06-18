let products = [];
let currentProduct = null;
let selectedProductVariant = null;
let whatsappUrl = null;

const detailProductName = document.getElementById("detail-product-name");
const detailProductDescription = document.getElementById("detail-product-description");
const detailProductIcon = document.getElementById("detail-product-icon");
const detailProductList = document.getElementById("detail-product-list");

const checkoutModal = document.getElementById("checkout-modal");
const checkoutProductName = document.getElementById("checkout-product-name");
const checkoutProductVariant = document.getElementById("checkout-product-variant");
const checkoutProductIcon = document.getElementById("checkout-product-icon");
const formFieldsContainer = document.getElementById("form-fields");
const successModal = document.getElementById("success-modal");

document.addEventListener("DOMContentLoaded", function () {
    // Mobile menu toggle
    document.getElementById("menu-toggle").addEventListener("click", toggleMobileMenu);

    // Fetch products data
    fetch('src/data/products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            const urlParams = new URLSearchParams(window.location.search);
            const productId = urlParams.get('productId');
            const preselectedProductName = urlParams.get('productName');
            const preselectedProductPrice = urlParams.get('productPrice');

            if (productId) {
                const product = products.find(p => p.id === parseInt(productId));
                if (product) {
                    renderProductDetail(product);
                    // If a specific variant was passed from produk, open the checkout modal directly
                    if (preselectedProductName && preselectedProductPrice) {
                        openCheckoutModal(parseInt(productId), decodeURIComponent(preselectedProductName), decodeURIComponent(preselectedProductPrice));
                    }
                } else {
                    // Redirect to products page if product not found
                    window.location.href = '/produk/';
                }
            } else {
                // Redirect to products page if no ID is provided
                window.location.href = '/produk/';
            }
        })
        .catch(error => console.error('Error fetching products:', error));
});

function toggleMobileMenu() {
    const mobileMenu = document.getElementById("mobile-menu");
    mobileMenu.classList.toggle("hidden");
}

function renderProductDetail(product) {
    currentProduct = product;
    detailProductName.textContent = product.name;
    detailProductDescription.textContent = product.description;
    detailProductIcon.src = product.iconUrl;
    detailProductList.innerHTML = "";

    product.listProduk.forEach((item) => {
        const listItem = document.createElement("div");
        listItem.className = "bg-white p-4 rounded-lg border border-gray-200";
        listItem.innerHTML = `
                        <div class="flex justify-between items-center mb-3">
                            <h4 class="font-medium text-gray-800">${item.productsName}</h4>
                            <p class="text-amber-600 font-semibold">${item.price}</p>
                        </div>
                        <button class="w-full bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm transition-colors" 
                                onclick="openCheckoutModal(${product.id}, '${encodeURIComponent(item.productsName)}', '${encodeURIComponent(item.price)}')">
                            Beli Sekarang
                        </button>
                    `;
        detailProductList.appendChild(listItem);
    });
}

function openCheckoutModal(productId, productNameEncoded, productPriceEncoded) {
    const productName = decodeURIComponent(productNameEncoded);
    const productPrice = decodeURIComponent(productPriceEncoded);

    currentProduct = products.find((product) => product.id === productId);

    if (currentProduct) {
        document.getElementById("checkout-product-name").textContent =
            currentProduct.name;
        document.getElementById("checkout-product-icon").src =
            currentProduct.iconUrl;
        document.getElementById(
            "checkout-product-variant"
        ).textContent = `${productName} - ${productPrice}`;

        selectedProductVariant = {
            productsName: productName,
            price: productPrice,
        };

        generateFormFields(currentProduct.formType, currentProduct.needServer);

        checkoutModal.classList.remove("hidden");
    }
}

function closeCheckoutModal() {
    checkoutModal.classList.add("hidden");
    document.getElementById("form-fields").innerHTML = "";
}

function generateFormFields(formType, needServer) {
    formFieldsContainer.innerHTML = "";
    let fieldsHtml = "";

    if (formType === "game") {
        let serverField = "";
        if (needServer) {
            serverField = `
                            <div class="mb-4">
                                <label for="server-id" class="block text-gray-700 font-medium mb-2">Server <span class="text-red-500">*</span></label>
                                <input type="text" id="server-id" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none" required>
                                <div class="error-message hidden text-red-500 text-sm mt-1" id="server-id-error">Server harus berupa angka</div>
                            </div>
                        `;
        }

        fieldsHtml = `
                        <div class="mb-4">
                            <label for="game-id" class="block text-gray-700 font-medium mb-2">ID Game <span class="text-red-500">*</span></label>
                            <input type="text" id="game-id" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none" required>
                            <div class="error-message hidden text-red-500 text-sm mt-1" id="game-id-error">ID Game harus berupa angka</div>
                        </div>
                        
                        <div class="mb-4">
                            <label for="nick-name" class="block text-gray-700 font-medium mb-2">Nick In Game <span class="text-red-500">*</span></label>
                            <input type="text" id="nick-name" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none" required>
                            <div class="error-message hidden text-red-500 text-sm mt-1" id="nick-name-error">Nickname tidak boleh kosong</div>
                        </div>
                        
                        ${serverField}
                        
                        <div class="mb-4">
                            <label for="phone" class="block text-gray-700 font-medium mb-2">Nomor Handphone <span class="text-red-500">*</span></label>
                            <input type="tel" id="phone" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none" required>
                            <div class="error-message hidden text-red-500 text-sm mt-1" id="phone-error">Nomor handphone harus berupa angka</div>
                        </div>
                    `;
    } else if (formType === "vouch&app") {
        fieldsHtml = `
                        <div class="mb-4">
                            <label for="email" class="block text-gray-700 font-medium mb-2">Email <span class="text-red-500">*</span></label>
                            <input type="email" id="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none" required>
                            <div class="error-message hidden text-red-500 text-sm mt-1" id="email-error">Format email tidak valid</div>
                        </div>
                        
                        <div class="mb-4">
                            <label for="phone" class="block text-gray-700 font-medium mb-2">Nomor Handphone <span class="text-red-500">*</span></label>
                            <input type="tel" id="phone" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none" required>
                            <div class="error-message hidden text-red-500 text-sm mt-1" id="phone-error">Nomor handphone harus berupa angka</div>
                        </div>
                    `;
    } else if (formType === "hoyogame") {
        let serverField = "";
        if (needServer) {
            serverField = `
                            <div class="mb-4">
                                <label for="server" class="block text-gray-700 font-medium mb-2">Pilih Server <span class="text-red-500">*</span></label>
                                <select id="server" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none" required>
                                    <option value="">Pilih Server</option>
                                    <option value="America">America</option>
                                    <option value="Asia">Asia</option>
                                    <option value="Europe">Europe</option>
                                    <option value="TW/HK/MO">TW/HK/MO</option>
                                </select>
                                <div class="error-message hidden text-red-500 text-sm mt-1" id="server-error">Pilih server</div>
                            </div>
                        `;
        }

        fieldsHtml = `
                        <div class="mb-4">
                            <label for="game-id" class="block text-gray-700 font-medium mb-2">ID Game <span class="text-red-500">*</span></label>
                            <input type="text" id="game-id" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none" required>
                            <div class="error-message hidden text-red-500 text-sm mt-1" id="game-id-error">ID Game harus berupa angka</div>
                        </div>
                        
                        <div class="mb-4">
                            <label for="nick-name" class="block text-gray-700 font-medium mb-2">Nick In Game <span class="text-red-500">*</span></label>
                            <input type="text" id="nick-name" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none" required>
                            <div class="error-message hidden text-red-500 text-sm mt-1" id="nick-name-error">Nickname tidak boleh kosong</div>
                        </div>
                        
                        ${serverField}
                        
                        <div class="mb-4">
                            <label for="phone" class="block text-gray-700 font-medium mb-2">Nomor Handphone <span class="text-red-500">*</span></label>
                            <input type="tel" id="phone" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none" required>
                            <div class="error-message hidden text-red-500 text-sm mt-1" id="phone-error">Nomor handphone harus berupa angka</div>
                        </div>
                    `;
    }
    formFieldsContainer.innerHTML = fieldsHtml;
}

function validateAndProcessCheckout() {
    if (!currentProduct || !selectedProductVariant) return;

    let isValid = true;
    let formData = {};

    document.querySelectorAll(".error-message").forEach((el) => el.classList.add("hidden"));
    document.querySelectorAll("input, select").forEach((el) => el.classList.remove("error"));

    if (currentProduct.formType === "game") {
        const gameId = document.getElementById("game-id").value;
        if (!gameId || isNaN(gameId)) {
            document.getElementById("game-id-error").classList.remove("hidden");
            document.getElementById("game-id").classList.add("error");
            isValid = false;
        } else {
            formData.gameId = gameId;
        }

        const nickName = document.getElementById("nick-name").value;
        if (!nickName) {
            document.getElementById("nick-name-error").classList.remove("hidden");
            document.getElementById("nick-name").classList.add("error");
            isValid = false;
        } else {
            formData.nickName = nickName;
        }

        if (currentProduct.needServer) {
            const serverId = document.getElementById("server-id").value;
            if (!serverId || isNaN(serverId)) {
                document.getElementById("server-id-error").classList.remove("hidden");
                document.getElementById("server-id").classList.add("error");
                isValid = false;
            } else {
                formData.serverId = serverId;
            }
        }

        const phone = document.getElementById("phone").value;
        if (!phone || isNaN(phone)) {
            document.getElementById("phone-error").classList.remove("hidden");
            document.getElementById("phone").classList.add("error");
            isValid = false;
        } else {
            formData.phone = phone;
        }
    } else if (currentProduct.formType === "vouch&app") {
        const email = document.getElementById("email").value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            document.getElementById("email-error").classList.remove("hidden");
            document.getElementById("email").classList.add("error");
            isValid = false;
        } else {
            formData.email = email;
        }

        const phone = document.getElementById("phone").value;
        if (!phone || isNaN(phone)) {
            document.getElementById("phone-error").classList.remove("hidden");
            document.getElementById("phone").classList.add("error");
            isValid = false;
        } else {
            formData.phone = phone;
        }
    } else if (currentProduct.formType === "hoyogame") {
        const gameId = document.getElementById("game-id").value;
        if (!gameId || isNaN(gameId)) {
            document.getElementById("game-id-error").classList.remove("hidden");
            document.getElementById("game-id").classList.add("error");
            isValid = false;
        } else {
            formData.gameId = gameId;
        }

        const nickName = document.getElementById("nick-name").value;
        if (!nickName) {
            document.getElementById("nick-name-error").classList.remove("hidden");
            document.getElementById("nick-name").classList.add("error");
            isValid = false;
        } else {
            formData.nickName = nickName;
        }

        if (currentProduct.needServer) {
            const server = document.getElementById("server").value;
            if (!server) {
                document.getElementById("server-error").classList.remove("hidden");
                document.getElementById("server").classList.add("error");
                isValid = false;
            } else {
                formData.server = server;
            }
        }

        const phone = document.getElementById("phone").value;
        if (!phone || isNaN(phone)) {
            document.getElementById("phone-error").classList.remove("hidden");
            document.getElementById("phone").classList.add("error");
            isValid = false;
        } else {
            formData.phone = phone;
        }
    }

    if (isValid) {
        processCheckout(formData);
    }
}

function processCheckout(formData) {
    let message = `Halo Admin Anjang Store, saya ingin order:\n\n`;
    message += `Produk: ${currentProduct.name} - ${selectedProductVariant.productsName}\n`;
    message += `Harga: ${selectedProductVariant.price}\n`;

    if (currentProduct.formType === "game") {
        message += `ID Game: ${formData.gameId}\n`;
        message += `Nickname: ${formData.nickName}\n`;
        if (currentProduct.needServer) {
            message += `Server ID: ${formData.serverId}\n`;
        }
    } else if (currentProduct.formType === "vouch&app") {
        message += `Email: ${formData.email}\n`;
    } else if (currentProduct.formType === "hoyogame") {
        message += `ID Game: ${formData.gameId}\n`;
        message += `Nickname: ${formData.nickName}\n`;
        if (currentProduct.needServer) {
            message += `Server: ${formData.server}\n`;
        }
    }
    message += `Nomor HP: ${formData.phone}\n\n`;
    message += `Tolong segara proses yah min, Terima kasih min.`;

    const encodedMessage = encodeURIComponent(message);
    whatsappUrl = `https://wa.me/6287775314721?text=${encodedMessage}`;

    document.getElementById("checkout-modal").classList.add("hidden");
    document.getElementById("success-modal").classList.remove("hidden");
}

function closeSuccessModal() {
    document.getElementById("success-modal").classList.add("hidden");
    if (whatsappUrl) {
        window.open(whatsappUrl, "_blank");
        whatsappUrl = null;
    }
}