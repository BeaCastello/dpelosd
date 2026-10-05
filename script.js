

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

    document.getElementById("cartBtn").addEventListener("click", () => {
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

/* ==========================================
   SLIDER PELUQUERÍA CANINA
========================================== */

const groomingSlider =
    document.getElementById("groomingSlider");

const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");

const sliderDots =
    document.getElementById("sliderDots");

const groomingCards =
    document.querySelectorAll(".grooming-card");


/* ==========================================
   CONFIGURACIÓN
========================================== */

let currentSlide = 0;

const totalSlides = groomingCards.length;


/* ==========================================
   CREAR PUNTOS
========================================== */

groomingCards.forEach((card, index) => {

    const dot = document.createElement("button");

    dot.classList.add("slider-dot");

    dot.setAttribute(
        "aria-label",
        `Ir al servicio ${index + 1}`
    );

    dot.addEventListener("click", () => {

        currentSlide = index;

        scrollToSlide(currentSlide);

    });

    sliderDots.appendChild(dot);
});


const dots =
    document.querySelectorAll(".slider-dot");


/* ==========================================
   ACTUALIZAR PUNTO ACTIVO
========================================== */

function updateDots() {

    dots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentSlide
        );

    });
}


/* ==========================================
   MOVER SLIDER
========================================== */

function scrollToSlide(index) {

    const card =
        groomingCards[index];

    if (!card) return;

    groomingSlider.scrollTo({

        left: card.offsetLeft - 10,

        behavior: "smooth"

    });

    updateDots();
}


/* ==========================================
   BOTÓN ANTERIOR
========================================== */

prevBtn.addEventListener("click", () => {

    currentSlide--;

    if (currentSlide < 0) {

        currentSlide =
            totalSlides - 1;

    }

    scrollToSlide(currentSlide);

});


/* ==========================================
   BOTÓN SIGUIENTE
========================================== */

nextBtn.addEventListener("click", () => {

    currentSlide++;

    if (currentSlide >= totalSlides) {

        currentSlide = 0;

    }

    scrollToSlide(currentSlide);

});


/* ==========================================
   DETECTAR SCROLL MANUAL
========================================== */

groomingSlider.addEventListener(
    "scroll",
    () => {

        const sliderLeft =
            groomingSlider.scrollLeft;

        let closestIndex = 0;

        let smallestDistance = Infinity;


        groomingCards.forEach(
            (card, index) => {

                const distance =
                    Math.abs(
                        card.offsetLeft -
                        sliderLeft -
                        10
                    );

                if (
                    distance <
                    smallestDistance
                ) {

                    smallestDistance =
                        distance;

                    closestIndex =
                        index;

                }

            }
        );


        currentSlide =
            closestIndex;

        updateDots();

    }
);


/* ==========================================
   INICIALIZAR
========================================== */

updateDots();


/* ==========================================
   AUTOPLAY
========================================== */

let autoplay =
    setInterval(() => {

        currentSlide++;

        if (
            currentSlide >= totalSlides
        ) {

            currentSlide = 0;

        }

        scrollToSlide(currentSlide);

    }, 5000);


/*
   Cuando el usuario interactúa,
   pausamos temporalmente el autoplay.
*/

groomingSlider.addEventListener(
    "mouseenter",
    () => {
        clearInterval(autoplay);
    }
);


groomingSlider.addEventListener(
    "mouseleave",
    () => {

        autoplay =
            setInterval(() => {

                currentSlide++;

                if (
                    currentSlide >= totalSlides
                ) {

                    currentSlide = 0;

                }

                scrollToSlide(currentSlide);

            }, 5000);

    }
);

/* ==========================================
   CONSEJOS Y NOTICIAS
========================================== */

const newsFilters =
    document.querySelectorAll(".news-filter");

const newsCards =
    document.querySelectorAll(".news-card");

const newsMore =
    document.getElementById("newsMore");


/* ==========================================
   FILTROS
========================================== */

newsFilters.forEach(filter => {

    filter.addEventListener("click", () => {

        /* Cambiar botón activo */

        newsFilters.forEach(button => {
            button.classList.remove("active");
        });

        filter.classList.add("active");


        /* Categoría seleccionada */

        const selectedCategory =
            filter.dataset.filter;


        /* Mostrar / ocultar artículos */

        newsCards.forEach((card, index) => {

            const cardCategory =
                card.dataset.category;


            if (
                selectedCategory === "todos" ||
                cardCategory === selectedCategory
            ) {

                card.style.display = "block";

                /* Reiniciar animación */

                card.style.animation = "none";

                void card.offsetWidth;

                card.style.animation =
                    `newsAppear .45s ease ${index * .05}s both`;

            } else {

                card.style.display = "none";

            }

        });

    });

});


/* ==========================================
   BOTÓN VER TODOS
========================================== */

newsMore.addEventListener("click", () => {

    /* Activar "Todos" */

    newsFilters.forEach(button => {
        button.classList.remove("active");
    });

    const allButton =
        document.querySelector(
            '.news-filter[data-filter="todos"]'
        );

    allButton.classList.add("active");


    /* Mostrar todas las noticias */

    newsCards.forEach((card, index) => {

        card.style.display = "block";

        card.style.animation = "none";

        void card.offsetWidth;

        card.style.animation =
            `newsAppear .45s ease ${index * .05}s both`;

    });

});
