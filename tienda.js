

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

// CATÁLOGO DE PRODUCTOS

const products = [
    
    // ALIMENTACIÓN
        {
        id: 1, name: "Alimento seco (Pienso)",
        image: "img/alimentoseco.png", type: "alimentoseco",
        price: 8.50, rating: 5, reviews: 24, sales: 120,
        relevant: 95, stock: true, badge: "Más vendido"
    },
    {
        id: 2, name: "Comida húmeda para perros",
        image: "img/comidahumeda.png", type: "alimentacion",
        price: 2.20, rating: 4.8, reviews: 18, sales: 85,
        relevant: 90, stock: true, badge: "Popular"
    },
    {
        id: 3, name: "Snacks naturales",
        image: "img/snacksnaturales.png", type: "alimentacion",
        price: 3.50, rating: 4.9, reviews: 32, sales: 110,
        relevant: 94, stock: true, badge: "Favorito"
    },
    {
        id: 4, name: "Galletas para perros",
        image: "img/galletas.png", type: "alimentacion",
        price: 2.80, rating: 4.7, reviews: 15, sales: 60,
        relevant: 85, stock: true, badge: ""
    },
    {
        id: 5, name: "Huesos masticables",
        image: "img/huesosmasticables.png", type: "alimentacion",
        price: 4.50, rating: 4.8, reviews: 21, sales: 75,
        relevant: 88, stock: true, badge: "Recomendado"
    },
    {
        id: 6, name: "Premios de pollo",
        image: "img/premiospollo.png", type: "alimentacion",
        price: 3.20, rating: 4.9, reviews: 27, sales: 95,
        relevant: 92, stock: true, badge: ""
    },
    {
        id: 7, name: "Alimento para cachorros",
        image: "img/piensocachorros.png", type: "alimentacion",
        price: 12.90, rating: 4.8, reviews: 19, sales: 70,
        relevant: 89, stock: true, badge: "Para cachorros"
    },
    {
        id: 8, name: "Barritas dentales",
        image: "img/barritasd entales.png", type: "alimentacion",
        price: 4.90, rating: 4.7, reviews: 16, sales: 65,
        relevant: 84, stock: true, badge: ""
    },
    {
        id: 9, name: "Comida natural deshidratada",
        image: "img/comidanatural.png", type: "alimentacion",
        price: 9.90, rating: 4.9, reviews: 22, sales: 80,
        relevant: 91, stock: true, badge: "Natural"
    },

    // JUGUETES
   
    {
        id: 10, name: "Pelota resistente",
        image: "img/pelota.png", type: "juguetes",
        price: 4.50, rating: 4.8, reviews: 30, sales: 100,
        relevant: 93, stock: true, badge: "Más vendido"
    },
    {
        id: 11, name: "Cuerda para tirar",
        image: "img/cuerda.png", type: "juguetes",
        price: 5.20, rating: 4.7, reviews: 17, sales: 68,
        relevant: 86, stock: true, badge: ""
    },
    {
        id: 12, name: "Peluche con sonido",
        image: "img/peluche.png", type: "juguetes",
        price: 6.90, rating: 4.9, reviews: 25, sales: 90,
        relevant: 92, stock: true, badge: "Favorito"
    },
    {
        id: 13, name: "Juguete mordedor",
        image: "img/mordedor.png", type: "juguetes",
        price: 5.50, rating: 4.6, reviews: 14, sales: 55,
        relevant: 82, stock: true, badge: ""
    },
    {
        id: 14, name: "Juguete dispensador de premios",
        image: "img/dispensadorpremios.png", type: "juguetes",
        price: 9.50, rating: 4.9, reviews: 28, sales: 88,
        relevant: 94, stock: true, badge: "Interactivo"
    },
    {
        id: 15, name: "Frisbee para perros",
        image: "img/frisbee.png", type: "juguetes",
        price: 4.90, rating: 4.7, reviews: 13, sales: 48,
        relevant: 80, stock: true, badge: ""
    },
    {
        id: 16, name: "Hueso de goma",
        image: "img/huesogoma.png", type: "juguetes",
        price: 6.20, rating: 4.8, reviews: 20, sales: 72,
        relevant: 87, stock: true, badge: ""
    },
    {
        id: 17, name: "Alfombra olfativa",
        image: "img/alfombraolfativa.png", type: "juguetes",
        price: 14.90, rating: 4.9, reviews: 26, sales: 78,
        relevant: 93, stock: true, badge: "Estimulación mental"
    },

        //  PASEO Y ACCESORIOS
       {
        id: 18, name: "Collar ajustable",
        image: "img/collar.png", type: "paseos",
        price: 7.90, rating: 4.8, reviews: 22, sales: 85,
        relevant: 90, stock: true, badge: "Popular"
    },
    {
        id: 19, name: "Correa resistente",
        image: "img/correa.png", type: "paseos",
        price: 9.50, rating: 4.7, reviews: 19, sales: 76,
        relevant: 88, stock: true, badge: ""
    },
    {
        id: 20, name: "Arnés ergonómico",
        image: "img/arnes.png", type: "paseos",
        price: 15.90, rating: 4.9, reviews: 31, sales: 105,
        relevant: 96, stock: true, badge: "Más vendido"
    },
    {
        id: 21, name: "Portabolsas higiénico",
        image: "img/portabolsas.png", type: "paseos",
        price: 3.50, rating: 4.6, reviews: 12, sales: 45,
        relevant: 78, stock: true, badge: ""
    },
    {
        id: 22, name: "Botella de agua portátil",
        image: "img/botellaagua.png", type: "paseos",
        price: 8.90, rating: 4.8, reviews: 24, sales: 82,
        relevant: 91, stock: true, badge: "Práctico"
    },
    {
        id: 23, name: "Comedero portátil",
        image: "img/comederoportatil.png", type: "paseos",
        price: 5.90, rating: 4.7, reviews: 15, sales: 53,
        relevant: 83, stock: true, badge: ""
    },
    {
        id: 24, name: "Cama acolchada",
        image: "img/cama.png", type: "accesorios",
        price: 29.90, rating: 4.9, reviews: 35, sales: 98,
        relevant: 95, stock: true, badge: "Confort"
    },
    {
        id: 25, name: "Comedero doble",
        image: "img/comedero.png", type: "accesorios",
        price: 12.50, rating: 4.7, reviews: 18, sales: 61,
        relevant: 86, stock: true, badge: ""
    },
    {
        id: 26, name: "Manta suave para perros",
        image: "img/manta.png", type: "accesorios",
        price: 11.90, rating: 4.8, reviews: 21, sales: 69,
        relevant: 89, stock: true, badge: ""
    },

        // DISFRACES
    
    {
        id: 27, name: "Disfraz de superhéroe",
        image: "img/superheroe.png", type: "disfraces",
        price: 14.90, rating: 4.8, reviews: 20, sales: 65,
        relevant: 89, stock: true, badge: "Divertido"
    },
    {
        id: 28, name: "Disfraz de dinosaurio",
        image: "img/dinosaurio.png", type: "disfraces",
        price: 16.50, rating: 4.9, reviews: 27, sales: 80,
        relevant: 94, stock: true, badge: "Popular"
    },
    {
        id: 29, name: "Disfraz de abeja",
        image: "img/abeja.png", type: "disfraces",
        price: 12.90, rating: 4.7, reviews: 16, sales: 48,
        relevant: 83, stock: true, badge: ""
    },
    {
        id: 30, name: "Disfraz de calabaza",
        image: "img/calabaza.png", type: "disfraces",
        price: 13.90, rating: 4.8, reviews: 23, sales: 73,
        relevant: 91, stock: true, badge: "Halloween"
    },
    {
        id: 31, name: "Disfraz de Papá Noel",
        image: "img/papanoel.png", type: "disfraces",
        price: 15.90, rating: 4.9, reviews: 29, sales: 92,
        relevant: 95, stock: true, badge: "Navidad"
    },
    {
        id: 32, name: "Disfraz de pirata",
        image: "img/pirata.png", type: "disfraces",
        price: 14.50, rating: 4.7, reviews: 14, sales: 44,
        relevant: 81, stock: true, badge: ""
    },
    {
        id: 33, name: "Disfraz de unicornio",
        image: "img/unicornio.png", type: "disfraces",
        price: 17.90, rating: 4.8, reviews: 19, sales: 58,
        relevant: 87, stock: true, badge: "Especial"
    }
];
       
// ELEMENTOS HTML

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


// ESTADO DE LA TIENDA

let cart = 0;
let currentSort = "bestsellers";

// Filtros aplicados actualmente
let activeFilters = {
    types: [],
    maxPrice: 50,
    rating: 0,
    inStock: false
};


/* =====================================
   CATEGORÍAS DE LA TIENDA
===================================== */


/* =====================================
   CATEGORÍAS DE LA TIENDA
===================================== */

let activeCategory = "todos";

const categoryNames = {
    todos: "Todos los productos",
    alimentacion: "Alimentación",
    juguetes: "Juguetes",
    paseos: "Paseos y Accesorios",
    disfraces: "Disfraces"
};

// Actualizar el título y la ruta de navegación
function updateCategoryBreadcrumb() {
    const categoryName =
        categoryNames[activeCategory] || "Todos los productos";

    const categoryTitle = document.getElementById("category-title");
    const breadcrumbCategory =
        document.getElementById("breadcrumb-category");

    if (categoryTitle) {
        categoryTitle.textContent = categoryName;
    }

    if (breadcrumbCategory) {
        breadcrumbCategory.textContent = categoryName;
    }
}

// Identificar la categoría de cada producto
function getProductCategory(product) {
    switch (product.type) {
        case "alimentoseco":
        case "alimentacion":
            return "alimentacion";

        case "juguetes":
            return "juguetes";

        case "paseos":
        case "accesorios":
            return "paseos";

        case "disfraces":
            return "disfraces";

        default:
            return "";
    }
}

// Activar los botones de las categorías
document.querySelectorAll(".category-card").forEach(button => {
    button.addEventListener("click", () => {
        activeCategory = button.dataset.category;

        // Actualizar título y ruta
        updateCategoryBreadcrumb();

        // Marcar la categoría seleccionada
        document.querySelectorAll(".category-card").forEach(item => {
            const selected =
                item.dataset.category === activeCategory;

            item.classList.toggle("is-active", selected);
            item.setAttribute("aria-pressed", String(selected));
        });

        // Mostrar los productos correspondientes
        renderProducts();
    });
});

// Mostrar la categoría inicial
updateCategoryBreadcrumb();


// ABRIR Y CERRAR EL PANEL DE FILTROS

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


// MENÚ DESPLEGABLE DE ORDENACIÓN

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


// ACTUALIZAR EL PRECIO MÁXIMO

maxPriceInput.addEventListener("input", () => {
    maxPriceLabel.textContent =
        `${maxPriceInput.value} €`;
});

// LEER Y APLICAR LOS FILTROS

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

// LIMPIAR TODOS LOS FILTROS

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

    
activeCategory = "todos";

document.querySelectorAll(".category-card").forEach(button => {
    const selected = button.dataset.category === "todos";

    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-pressed", String(selected));
});


    readFilters();
    renderProducts();
}

resetFiltersBtn.addEventListener("click", resetFilters);
resetEmptyBtn.addEventListener("click", resetFilters);

// FILTRAR Y ORDENAR LOS PRODUCTOS


function getVisibleProducts() {

    let visibleProducts = products.filter(product => {

        // Filtrar por categoría
        const matchesCategory =
            activeCategory === "todos" ||
            getProductCategory(product) === activeCategory;

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
            matchesCategory &&
            matchesType &&
            matchesPrice &&
            matchesRating &&
            matchesStock
        );

    });

    // Conserva aquí tu switch de ordenación
    // y el return visibleProducts que ya tienes.


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

// DIBUJAR LAS TARJETAS DE PRODUCTOS

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

// CARRITO

const cartButton = document.getElementById("cartCount");
const cartBadge = document.getElementById("addCartBtn");

function updateCartCount() {
    cartBadge.textContent = cart;
}

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

// INICIALIZAR TIENDA

readFilters();

sortMenu.querySelector(
    '[data-sort="bestsellers"]'
).classList.add("active");

renderProducts();
updateCartCount();