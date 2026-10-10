

document.addEventListener("DOMContentLoaded", () => {

    // Año automático del footer
    document.getElementById("year").textContent = new Date().getFullYear();

    // MENÚ MÓVIL
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    menuToggle.addEventListener("click", () => {
        mainNav.classList.toggle("open");
    });

    // Cerrar menú al pulsar un enlace
    document.querySelectorAll("#mainNav a").forEach(link => {
        link.addEventListener("click", () => {
            mainNav.classList.remove("open");
        });
    });

    // ENLACE ACTIVO AL HACER SCROLL
    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".nav a");

    window.addEventListener("scroll", () => {
        let current = "inicio";

        sections.forEach(section => {
            const top = section.offsetTop - 130;

            if (window.scrollY >= top) {
                current = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");

            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });

    // CARRITO
    let cart = 0;
    const cartCount = document.getElementById("cartCount");
    const cartNumber = document.getElementById("addCartBtn");

    document.querySelectorAll(".add-btn").forEach(button => {
        button.addEventListener("click", () => {
            cart++;
            cartCount.textContent = cart;

            const originalText = button.textContent;
            button.textContent = "✓ Añadido al carrito";

            setTimeout(() => {
                button.textContent = originalText;
            }, 1400);
        });
    });

    document.getElementById("addCartBtn").addEventListener("click", () => {
        if (cart === 0) {
            alert("Tu carrito está vacío 🐾");
        } else {
            alert(`Tienes ${cart} producto${cart > 1 ? "s" : ""} en el carrito 🛒`);
        }
    });

    // MODAL DE BÚSQUEDA
    const searchModal = document.getElementById("searchModal");
    const searchBtn = document.getElementById("searchBtn");
    const closeSearch = document.getElementById("closeSearch");
    const searchInput = document.getElementById("searchInput");
    const searchSubmit = document.getElementById("searchSubmit");
    const searchResult = document.getElementById("searchResult");

    function openSearch() {
        searchModal.classList.add("show");
        searchModal.setAttribute("aria-hidden", "false");
        setTimeout(() => searchInput.focus(), 100);
    }

    function closeSearchModal() {
        searchModal.classList.remove("show");
        searchModal.setAttribute("aria-hidden", "true");
        searchInput.value = "";
        searchResult.textContent = "";
    }

    searchBtn.addEventListener("click", openSearch);
    closeSearch.addEventListener("click", closeSearchModal);

    searchModal.addEventListener("click", (event) => {
        if (event.target === searchModal) {
            closeSearchModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeSearchModal();
        }
    });

    function doSearch() {
        const value = searchInput.value.trim();

        if (!value) {
            searchResult.textContent = "Escribe algo para buscar.";
            return;
        }

        searchResult.textContent =
            `Buscando "${value}"... Próximamente conectaremos esta búsqueda con tu catálogo.`;
    }

    searchSubmit.addEventListener("click", doSearch);

    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            doSearch();
        }
    });

    // BOTÓN "VER PRODUCTOS"
    document.getElementById("viewProductsBtn").addEventListener("click", () => {
        document.getElementById("products").scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    });
});

// =====================================
// CATÁLOGO DE PRODUCTOS
// =====================================

const products = [
    {
        id: 1,
        name: "Collares",
        image: "img/pelota.jpg",
        type: "collares",
        price: 8.50,
        rating: 5,
        reviews: 24,
        sales: 120,
        relevant: 95,
        stock: true,
        badge: "Más vendido"
    },
    {
        id: 2,
        name: "Correas",
        image: "img/mordedor.jpg",
        type: "correas",
        price: 12.90,
        rating: 4,
        reviews: 18,
        sales: 95,
        relevant: 90,
        stock: true,
        badge: ""
    },
    {
        id: 3,
        name: " Arneses",
        image: "img/peluche.jpg",
        type: " arneses",
        price: 10.50,
        rating: 5,
        reviews: 32,
        sales: 110,
        relevant: 98,
        stock: true,
        badge: "Favorito"
    },
    {
        id: 4,
        name: "Complementos de paseo",
        image: "img/interactivo.jpg",
        type: "complementospaseo",
        price: 18.90,
        rating: 4,
        reviews: 15,
        sales: 65,
        relevant: 88,
        stock: true,
        badge: ""
    },
    {
        id: 5,
        name: "Mochilas para perros",
        image: "img/pelota-sonido.jpg",
        type: "mochilasperro",
        price: 6.90,
        rating: 4,
        reviews: 12,
        sales: 80,
        relevant: 82,
        stock: true,
        badge: ""
    },
    {
        id: 6,
        name: "Colgantes luminosos",
        image: "img/cuerda.jpg",
        type: "colgantesluminosos",
        price: 7.50,
        rating: 5,
        reviews: 21,
        sales: 100,
        relevant: 93,
        stock: false,
        badge: ""
    },
    {
        id: 7,
        name: "Chubasqueros",
        image: "img/conejo.jpg",
        type: "chubasqueros",
        price: 14.50,
        rating: 4,
        reviews: 9,
        sales: 45,
        relevant: 75,
        stock: true,
        badge: ""
    },
    {
        id: 8,
        name: "Portabolsas",
        image: "img/inteligencia.jpg",
        type: "portabolsas",
        price: 24.90,
        rating: 5,
        reviews: 28,
        sales: 70,
        relevant: 100,
        stock: true,
        badge: "Recomendado"
    }
];


// =====================================
// ELEMENTOS HTML
// =====================================

const productGrid = document.getElementById("productGrid");
const resultsCount = document.getElementById("resultsCount");
const emptyProducts = document.getElementById("emptyProducts");

const openFiltersBtn = document.getElementById("openFilters");
const closeFiltersBtn = document.getElementById("closeFilters");
const filterPanel = document.getElementById("filterPanel");
const filterOverlay = document.getElementById("filterOverlay");

const applyFiltersBtn = document.getElementById("applyFilters");
const resetFiltersBtn = document.getElementById("resetFilters");
const resetEmptyBtn = document.getElementById("resetEmpty");

const sortTrigger = document.getElementById("sortTrigger");
const sortMenu = document.getElementById("sortMenu");
const sortLabel = document.getElementById("sortLabel");

const maxPriceInput = document.getElementById("maxPrice");
const maxPriceLabel = document.getElementById("maxPriceLabel");
const inStockInput = document.getElementById("inStock");


// =====================================
// ESTADO DE LA TIENDA
// =====================================

let cart = 0;
let currentSort = "bestsellers";

// Filtros aplicados actualmente
let activeFilters = {
    types: [],
    maxPrice: 50,
    rating: 0,
    inStock: false
};


// =====================================
// ABRIR Y CERRAR EL PANEL DE FILTROS
// =====================================

function openFilters() {
    filterPanel.classList.add("is-open");
    filterOverlay.classList.add("is-visible");

    filterPanel.removeAttribute("inert");
    filterPanel.setAttribute("aria-hidden", "false");
    openFiltersBtn.setAttribute("aria-expanded", "true");

    document.body.style.overflow = "hidden";

    closeFiltersBtn.focus();
}

function closeFilters() {
    filterPanel.classList.remove("is-open");
    filterOverlay.classList.remove("is-visible");

    filterPanel.setAttribute("inert", "");
    filterPanel.setAttribute("aria-hidden", "true");
    openFiltersBtn.setAttribute("aria-expanded", "false");

    document.body.style.overflow = "";

    openFiltersBtn.focus();
}

openFiltersBtn.addEventListener("click", openFilters);
closeFiltersBtn.addEventListener("click", closeFilters);

// Cerrar al pulsar fuera del panel
filterOverlay.addEventListener("click", closeFilters);

// Cerrar con Escape
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        if (filterPanel.classList.contains("is-open")) {
            closeFilters();
        }

        closeSortMenu();
    }
});


// =====================================
// MENÚ DESPLEGABLE DE ORDENACIÓN
// =====================================

function closeSortMenu() {
    sortMenu.hidden = true;
    sortTrigger.setAttribute("aria-expanded", "false");
}

sortTrigger.addEventListener("click", event => {
    event.stopPropagation();

    const isOpening = sortMenu.hidden;

    sortMenu.hidden = !isOpening;
    sortTrigger.setAttribute(
        "aria-expanded",
        String(isOpening)
    );
});

// Cerrar el desplegable al pulsar fuera
document.addEventListener("click", event => {
    if (
        !sortMenu.hidden &&
        !sortMenu.contains(event.target) &&
        !sortTrigger.contains(event.target)
    ) {
        closeSortMenu();
    }
});

sortMenu.querySelectorAll("[data-sort]").forEach(button => {
    button.addEventListener("click", () => {
        currentSort = button.dataset.sort;

        sortLabel.textContent = button.textContent.trim();

        sortMenu.querySelectorAll("button").forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        closeSortMenu();
        renderProducts();
    });
});


// =====================================
// ACTUALIZAR EL PRECIO MÁXIMO
// =====================================

maxPriceInput.addEventListener("input", () => {
    maxPriceLabel.textContent =
        `${maxPriceInput.value} €`;
});


// =====================================
// LEER Y APLICAR LOS FILTROS
// =====================================

function readFilters() {
    const selectedTypes = [
        ...document.querySelectorAll(
            'input[name="type"]:checked'
        )
    ].map(input => input.value);

    const selectedRating = document.querySelector(
        'input[name="rating"]:checked'
    );

    activeFilters = {
        types: selectedTypes,
        maxPrice: Number(maxPriceInput.value),
        rating: selectedRating
            ? Number(selectedRating.value)
            : 0,
        inStock: inStockInput.checked
    };
}

applyFiltersBtn.addEventListener("click", () => {
    readFilters();
    renderProducts();
    closeFilters();
});


// =====================================
// LIMPIAR TODOS LOS FILTROS
// =====================================

function resetFilters() {
    document.querySelectorAll('input[name="type"]')
        .forEach(input => {
            input.checked = false;
        });

    document.querySelector(
        'input[name="rating"][value="0"]'
    ).checked = true;

    maxPriceInput.value = 50;
    maxPriceLabel.textContent = "50 €";
    inStockInput.checked = false;

    readFilters();
    renderProducts();
}

resetFiltersBtn.addEventListener("click", resetFilters);
resetEmptyBtn.addEventListener("click", resetFilters);


// =====================================
// FILTRAR Y ORDENAR LOS PRODUCTOS
// =====================================

function getVisibleProducts() {
    let visibleProducts = products.filter(product => {

        // Filtrar por tipo
        const matchesType =
            activeFilters.types.length === 0 ||
            activeFilters.types.includes(product.type);

        // Filtrar por precio
        const matchesPrice =
            product.price <= activeFilters.maxPrice;

        // Filtrar por valoración
        const matchesRating =
            product.rating >= activeFilters.rating;

        // Filtrar por disponibilidad
        const matchesStock =
            !activeFilters.inStock || product.stock;

        return (
            matchesType &&
            matchesPrice &&
            matchesRating &&
            matchesStock
        );
    });

    // Ordenar según la opción seleccionada
    switch (currentSort) {
        case "bestsellers":
            visibleProducts.sort(
                (a, b) => b.sales - a.sales
            );
            break;

        case "relevant":
            visibleProducts.sort(
                (a, b) => b.relevant - a.relevant
            );
            break;

        case "alphabetical":
            visibleProducts.sort(
                (a, b) => a.name.localeCompare(
                    b.name,
                    "es"
                )
            );
            break;

        case "price-asc":
            visibleProducts.sort(
                (a, b) => a.price - b.price
            );
            break;

        case "price-desc":
            visibleProducts.sort(
                (a, b) => b.price - a.price
            );
            break;
    }

    return visibleProducts;
}


// =====================================
// DIBUJAR LAS TARJETAS DE PRODUCTOS
// =====================================

function renderProducts() {
    const visibleProducts = getVisibleProducts();

    productGrid.innerHTML = "";

    resultsCount.textContent =
        `${visibleProducts.length} productos`;

    emptyProducts.hidden = visibleProducts.length > 0;
    productGrid.hidden = visibleProducts.length === 0;

    visibleProducts.forEach(product => {
        const card = document.createElement("article");

        card.className = "product-card";

        const badgeHTML = product.badge
            ? `<span class="product-badge">${product.badge}</span>`
            : "";

        const stars = "★".repeat(product.rating) +
            "☆".repeat(5 - product.rating);

        card.innerHTML = `
            <div class="product-image-wrap">
                ${badgeHTML}

                <img
                    class="product-image"
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >
            </div>

            <h2 class="product-name">
                ${product.name}
            </h2>

            <div class="product-rating"
                 aria-label="Valoración: ${product.rating} de 5 estrellas">
                <span aria-hidden="true">${stars}</span>
                <span class="rating-number">
                    (${product.reviews})
                </span>
            </div>

            <p class="product-price">
                ${product.price.toLocaleString("es-ES", {
                    style: "currency",
                    currency: "EUR"
                })}
            </p>

            <button
                class="add-btn"
                data-product-id="${product.id}"
                ${product.stock ? "" : "disabled"}
            >
                ${product.stock
                    ? "Añadir al carrito"
                    : "Agotado"}
            </button>
        `;

        productGrid.appendChild(card);

        // Imagen alternativa si el archivo no existe
        const image = card.querySelector(".product-image");

        image.addEventListener("error", () => {
            image.alt = `${product.name} — imagen no disponible`;
            image.style.opacity = "0.25";
        }, { once: true });
    });
}


// =====================================
// CARRITO
// =====================================

// En tu HTML, #cartCount es el botón completo
// y #addCartBtn es el contador que está dentro.

const cartButton = document.getElementById("cartCount");
const cartBadge = document.getElementById("addCartBtn");

function updateCartCount() {
    cartBadge.textContent = cart;
}

// Delegación de eventos: funciona también cuando
// se vuelven a dibujar las tarjetas filtradas.
productGrid.addEventListener("click", event => {
    const button = event.target.closest(".add-btn");

    if (!button || button.disabled) return;

    const productId = Number(button.dataset.productId);
    const product = products.find(
        item => item.id === productId
    );

    if (!product || !product.stock) return;

    cart++;

    updateCartCount();

    const originalText = button.textContent;

    button.textContent = "✓ Añadido al carrito";
    button.disabled = true;

    setTimeout(() => {
        // Solo restaurar el botón si sigue en el catálogo
        if (button.isConnected) {
            button.textContent = originalText;
            button.disabled = false;
        }
    }, 1400);
});

// Consultar el carrito
cartButton.addEventListener("click", () => {
    if (cart === 0) {
        alert("Tu carrito está vacío 🐾");
    } else {
        alert(
            `Tienes ${cart} producto${cart !== 1 ? "s" : ""} en el carrito 🛒`
        );
    }
});


// =====================================
// INICIALIZAR TIENDA
// =====================================

readFilters();

sortMenu.querySelector(
    '[data-sort="bestsellers"]'
).classList.add("active");

renderProducts();
updateCartCount();