
document.addEventListener("DOMContentLoaded", () => {

    // AÑO AUTOMÁTICO DEL FOOTER
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // MENÚ MÓVIL
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", () => {
            mainNav.classList.toggle("open");
        });

        document.querySelectorAll("#mainNav a").forEach(link => {
            link.addEventListener("click", () => {
                mainNav.classList.remove("open");
            });
        });
    }

    // ENLACE ACTIVO AL HACER SCROLL
    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".nav a");

    window.addEventListener("scroll", () => {
        let current = "inicio";

        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 130) {
                current = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${current}`
            );
        });
    });

    // BOTÓN FLOTANTE DE WHATSAPP
    const whatsappContainer = document.getElementById("whatsapp-container");

    if (whatsappContainer) {
        window.addEventListener("scroll", () => {
            whatsappContainer.classList.toggle(
                "visible",
                window.scrollY > 50
            );
        });
    }

    // PRODUCTOS
    const products = [
        { id: 1, name: "Pelota mordedora", category: "Juegos", price: 6.99, rating: 4.8, reviews: 27, featured: true, image: "img/pelotamordedora.png" },
        { id: 2, name: "Snack natural para perros", category: "Alimentos", price: 5.49, rating: 4.7, reviews: 38, featured: true, image: "https://images.unsplash.com/photo-1582798358481-d199fb7347bb?auto=format&fit=crop&w=700&q=85" },
        { id: 3, name: "Correa cómoda para paseo", category: "Paseos", price: 12.99, rating: 4.9, reviews: 32, featured: true, image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?auto=format&fit=crop&w=700&q=85" },
        { id: 4, name: "Arnés ajustable acolchado", category: "Accesorios", price: 19.99, rating: 4.8, reviews: 18, featured: true, image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=700&q=85" },
        { id: 5, name: "Disfraz divertido para mascota", category: "Disfraces", price: 16.99, rating: 4.6, reviews: 12, featured: true, image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=700&q=85" },
        { id: 6, name: "Cuerda trenzada para jugar", category: "Juegos", price: 8.99, rating: 4.8, reviews: 15, featured: false, image: "https://images.unsplash.com/photo-1535294435445-d7249524ef2e?auto=format&fit=crop&w=700&q=85" },
        { id: 7, name: "Pienso completo para perro", category: "Alimentos", price: 21.99, rating: 4.7, reviews: 45, featured: false, image: "https://images.unsplash.com/photo-1582798358481-d199fb7347bb?auto=format&fit=crop&w=700&q=85" },
        { id: 8, name: "Collar regulable", category: "Paseos", price: 9.99, rating: 4.6, reviews: 24, featured: false, image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?auto=format&fit=crop&w=700&q=85" },
        { id: 9, name: "Comedero antideslizante", category: "Accesorios", price: 11.50, rating: 4.8, reviews: 21, featured: false, image: "https://images.unsplash.com/photo-1582798358481-d199fb7347bb?auto=format&fit=crop&w=700&q=85" },
        { id: 10, name: "Disfraz de fiesta", category: "Disfraces", price: 18.50, rating: 4.5, reviews: 9, featured: false, image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=700&q=85" },
        { id: 11, name: "Pelota ligera para exterior", category: "Juegos", price: 4.99, rating: 4.7, reviews: 19, featured: false, image: "https://images.unsplash.com/photo-1535294435445-d7249524ef2e?auto=format&fit=crop&w=700&q=85" },
        { id: 12, name: "Chuches de premio", category: "Alimentos", price: 3.99, rating: 4.9, reviews: 41, featured: false, image: "https://images.unsplash.com/photo-1582798358481-d199fb7347bb?auto=format&fit=crop&w=700&q=85" },
        { id: 13, name: "Portabolsas para paseo", category: "Paseos", price: 5.99, rating: 4.6, reviews: 16, featured: false, image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?auto=format&fit=crop&w=700&q=85" },
        { id: 14, name: "Bandana estampada", category: "Accesorios", price: 7.50, rating: 4.8, reviews: 14, featured: false, image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=700&q=85" },
        { id: 15, name: "Disfraz de superhéroe", category: "Disfraces", price: 17.99, rating: 4.7, reviews: 11, featured: false, image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=700&q=85" }
    ];

    const categories = [
        "Juegos",
        "Alimentos",
        "Paseos",
        "Accesorios",
        "Disfraces"
    ];

    const euro = value =>
        new Intl.NumberFormat("es-ES", {
            style: "currency",
            currency: "EUR"
        }).format(value);

    // TARJETA DE PRODUCTO
    function productCard(product) {
        return `
            <article class="product-card">
                <div class="product-image-wrap">
                    <img
                        class="product-image"
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy"
                        onerror="this.onerror=null; this.style.display='none'; console.error('Error al cargar la imagen:', this.src);"
                        onload="this.style.display='block';"
                    >
                </div>

                <p class="product-name">${product.name}</p>

                <p class="product-price">${euro(product.price)}</p>

                <div class="rating" aria-label="Valoración ${product.rating} de 5">
                    <span class="stars" aria-hidden="true">★★★★★</span>
                    <span>(${product.reviews})</span>
                </div>

                <button
                    class="add-button"
                    type="button"
                    data-add="${product.id}"
                >
                    <span aria-hidden="true">🛒</span>
                    Añadir al carrito
                </button>
            </article>
        `;
    }

    // PRODUCTOS DESTACADOS
    function renderFeatured() {
        const container = document.querySelector("#featured-products");

        if (!container) return;

        container.innerHTML = products
            .filter(product => product.featured)
            .map(productCard)
            .join("");
    }

    // PRODUCTOS POR CATEGORÍA
    function renderCategories() {
        const container = document.querySelector("#category-sections");

        if (!container) return;

        container.innerHTML = categories.map(category => {
            const items = products.filter(
                product => product.category === category
            );

            return `
                <section
                    class="product-section category-section"
                    id="category-${category.toLowerCase()}"
                    data-section="${category}"
                >
                    <div class="section-heading">
                        <div class="heading-title">
                            <span class="paw" aria-hidden="true">🐾</span>
                            <h2>${category}</h2>
                        </div>

                        <button
                            class="view-all"
                            type="button"
                            data-view-all="${category}"
                        >
                            Ver todos <span>→</span>
                        </button>
                    </div>

                    <div class="product-grid">
                        ${items.map(productCard).join("")}
                    </div>
                </section>
            `;
        }).join("");
    }

    // FILTRAR CATEGORÍAS
    function setCategory(category) {
        const showAll = category === "Todos";

        document.querySelectorAll(".category-chip").forEach(button => {
            button.classList.toggle(
                "active",
                button.dataset.category === category
            );
        });

        document.querySelectorAll(".category-section").forEach(section => {
            const visible =
                showAll || section.dataset.section === category;

            section.classList.toggle("is-hidden", !visible);
            section.classList.toggle("is-filtered", visible && !showAll);
        });

        if (!showAll) {
            document
                .querySelector(`#category-${category.toLowerCase()}`)
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
        }
    }



    

    // CARRITO
    const cart = [];

    function addToCart(id) {
        const product = products.find(
            item => item.id === Number(id)
        );

        if (!product) return;

        cart.push(product);

        const cartCount = document.querySelector("#cart-count");
        if (cartCount) {
            cartCount.textContent = cart.length;
        }

        const toast = document.querySelector("#cart-toast");

        if (toast) {
            toast.textContent = `✓ ${product.name} añadido al carrito`;
            toast.classList.add("show");

            clearTimeout(addToCart.toastTimer);

            addToCart.toastTimer = setTimeout(() => {
                toast.classList.remove("show");
            }, 2200);
        }
    }

    // EVENTOS DE BOTONES
    document.addEventListener("click", event => {
        const addButton = event.target.closest("[data-add]");

        if (addButton) {
            addToCart(addButton.dataset.add);
        }

        const categoryButton = event.target.closest("[data-category]");

        if (categoryButton) {
            setCategory(categoryButton.dataset.category);
        }

        const viewButton = event.target.closest("[data-view-all]");

        if (viewButton) {
            const target = viewButton.dataset.viewAll;

            if (target === "destacados") {
                document.querySelector("#featured-title")
                    ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                document.querySelectorAll(".category-section")
                    .forEach(section => {
                        section.classList.remove("is-hidden");
                        section.classList.remove("is-filtered");
                    });

                document.querySelectorAll(".category-chip")
                    .forEach(button => button.classList.remove("active"));
            } else {
                setCategory(target);
            }
        }

        if (event.target.closest("#cart-button")) {
            const toast = document.querySelector("#cart-toast");

            if (toast) {
                const total = cart.reduce(
                    (sum, item) => sum + item.price,
                    0
                );

                toast.textContent = cart.length
                    ? `Tu carrito tiene ${cart.length} ${
                        cart.length === 1 ? "producto" : "productos"
                      } · ${euro(total)}`
                    : "Tu carrito está vacío por ahora";

                toast.classList.add("show");

                clearTimeout(addToCart.toastTimer);

                addToCart.toastTimer = setTimeout(() => {
                    toast.classList.remove("show");
                }, 2600);
            }
        }
    });

    // INICIALIZAR LA TIENDA
    renderFeatured();
    renderCategories();

});
