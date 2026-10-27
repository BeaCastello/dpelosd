
document.addEventListener("DOMContentLoaded", () => {

  // MENÚ DE NAVEGACIÓN
  const boton = document.getElementById("menuToggle");
  const menu = document.getElementById("mainNav");
  const enlaces = menu?.querySelectorAll("a") || [];

  boton?.addEventListener("click", () => {
    const abierto = menu.classList.toggle("open");
    boton.classList.toggle("active", abierto);
    boton.setAttribute("aria-expanded", String(abierto));
  });

  const paginaActual =
    location.pathname.split("/").pop() || "index.html";

  enlaces.forEach(enlace => {
    const href = enlace.getAttribute("href");
enlace.classList.toggle(
  "active",
  paginaActual === "tienda.html" && href === "tienda.html"
);

    enlace.addEventListener("click", () => {
      menu.classList.remove("open");
      boton?.classList.remove("active");
      boton?.setAttribute("aria-expanded", "false");
    });
  });


  // SLIDER PELUQUERÍA CANINA

  const slider = document.getElementById("groomingSlider");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dotsContainer = document.getElementById("sliderDots");

  if (slider && prevBtn && nextBtn && dotsContainer) {

    const cards = [...slider.querySelectorAll(".grooming-card")];

    if (cards.length) {

      let currentSlide = 0;
      let autoplay;
      let scrollTimer;

      dotsContainer.replaceChildren();

      // CREAR INDICADORES
      const dots = cards.map((card, index) => {

        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "slider-dot";

        dot.setAttribute(
          "aria-label",
          `Ir al servicio ${index + 1}`
        );

        dot.addEventListener("click", () => {
          goToSlide(index);
          restartAutoplay();
        });

        dotsContainer.appendChild(dot);

        return dot;
      });


      // ACTUALIZAR INDICADORES
      function updateDots() {

        dots.forEach((dot, index) => {

          const active = index === currentSlide;

          dot.classList.toggle("active", active);

          dot.setAttribute(
            "aria-current",
            active ? "true" : "false"
          );

        });
      }


      // DESPLAZAR SLIDER
      function goToSlide(index) {

        currentSlide =
          (index + cards.length) % cards.length;

        const card = cards[currentSlide];

        const left =
          card.getBoundingClientRect().left -
          slider.getBoundingClientRect().left +
          slider.scrollLeft - 10;

        slider.scrollTo({
          left: left,
          behavior: "smooth"
        });

        updateDots();
      }

      // BOTÓN ANTERIOR
      prevBtn.addEventListener("click", () => {

        goToSlide(currentSlide - 1);
        restartAutoplay();

      });


      // BOTÓN SIGUIENTE
      nextBtn.addEventListener("click", () => {

        goToSlide(currentSlide + 1);
        restartAutoplay();

      });


      // DETECTAR DESPLAZAMIENTO MANUAL
      slider.addEventListener("scroll", () => {

        clearTimeout(scrollTimer);

        scrollTimer = setTimeout(() => {

          const sliderLeft =
            slider.getBoundingClientRect().left;

          let closestIndex = 0;
          let smallestDistance = Infinity;

          cards.forEach((card, index) => {

            const distance = Math.abs(
              card.getBoundingClientRect().left -
              sliderLeft - 10
            );

            if (distance < smallestDistance) {

              smallestDistance = distance;
              closestIndex = index;

            }

          });

          currentSlide = closestIndex;
          updateDots();

        }, 120);

      }, { passive: true });


      // AUTOPLAY
      function restartAutoplay() {

        clearInterval(autoplay);

        autoplay = setInterval(() => {
          goToSlide(currentSlide + 1);
        }, 5000);

      }


      // PAUSAR AL PASAR EL RATÓN
      slider.addEventListener("mouseenter", () => {
        clearInterval(autoplay);
      });

      slider.addEventListener("mouseleave", () => {
        restartAutoplay();
      });


      // CONTROL TÁCTIL
      slider.addEventListener("touchstart", () => {
        clearInterval(autoplay);
      }, { passive: true });

      slider.addEventListener("touchend", () => {
        restartAutoplay();
      }, { passive: true });


      // INICIALIZAR
      updateDots();
      restartAutoplay();

    }
  }

  // BOTONES DE FILTROS
    const filtros = document.querySelectorAll(".news-filter");

    // TARJETAS DE NOTICIAS
    const noticias = document.querySelectorAll(".news-card");

    filtros.forEach(boton => {

        boton.addEventListener("click", () => {

            const categoria = boton.dataset.filter;

            // QUITAR ACTIVE DE TODOS LOS BOTONES
            filtros.forEach(filtro => {
                filtro.classList.remove("active");
            });

            // ACTIVAR EL BOTÓN SELECCIONADO
            boton.classList.add("active");

            // FILTRAR LAS NOTICIAS
            noticias.forEach(noticia => {

                const categoriaNoticia = noticia.dataset.category;

                if (categoria === "todos" ||
                    categoria === categoriaNoticia) {

                    noticia.style.display = "";

                } else {

                    noticia.style.display = "none";

                }

            });

        });

    });


  // COOKIES
  const banner = document.getElementById("cookie-banner");
  const overlay = document.getElementById("page-overlay");

  if (banner) {

    banner.style.display =
      localStorage.getItem("cookiesDecision")
        ? "none"
        : "block";

    function hideBanner(decision) {

      localStorage.setItem("cookiesDecision", decision);
      banner.style.display = "none";

      if (overlay) overlay.style.display = "none";
    }

    document.getElementById("acceptCookies")
      ?.addEventListener("click", () => hideBanner("accepted"));

    document.getElementById("rejectCookies")
      ?.addEventListener("click", () => hideBanner("rejected"));
  }

  // WHATSAPP
  const whatsappContainer =
    document.getElementById("whatsapp-container");

  if (whatsappContainer) {

    window.addEventListener("scroll", () => {

      whatsappContainer.classList.toggle(
        "visible",
        window.scrollY > 50
      );

    }, { passive: true });

  }

});


document.addEventListener("DOMContentLoaded", function () {

    const modal = document.getElementById("reservaModal");
    const cerrar = document.getElementById("cerrarReserva");

    if (!modal) {
        console.error("No existe el modal reservaModal");
        return;
    }

    // ABRIR AL HACER CLIC EN RESERVAR CITA
    document.addEventListener("click", function (e) {

        const boton = e.target.closest(".service-link");

        if (!boton) return;

        e.preventDefault();

        modal.classList.add("activo");
        document.body.style.overflow = "hidden";

        

    });

    // CERRAR CON LA X
    if (cerrar) {
        cerrar.addEventListener("click", cerrarModal);
    }

    // CERRAR AL HACER CLIC FUERA
    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            cerrarModal();
        }
    });

    // CERRAR CON ESCAPE
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            cerrarModal();
        }
    });

    function cerrarModal() {
        modal.classList.remove("activo");
        document.body.style.overflow = "";
    }

});


document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("footerVideo");

    if (video) {
        video.playbackRate = 0.90;
    }
});



    