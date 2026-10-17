
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


  // MODAL DE BÚSQUEDA
  const searchModal = document.getElementById("searchModal");
  const searchBtn = document.getElementById("searchBtn");
  const closeSearch = document.getElementById("closeSearch");
  const searchInput = document.getElementById("searchInput");
  const searchSubmit = document.getElementById("searchSubmit");
  const searchResult = document.getElementById("searchResult");

  if (searchModal && searchInput) {

    function closeSearchModal() {

      searchModal.classList.remove("show");
      searchModal.setAttribute("aria-hidden", "true");
      searchInput.value = "";

      if (searchResult) searchResult.textContent = "";
    }

    searchBtn?.addEventListener("click", () => {

      searchModal.classList.add("show");
      searchModal.setAttribute("aria-hidden", "false");
      searchInput.focus();

    });

    closeSearch?.addEventListener("click", closeSearchModal);

    searchModal.addEventListener("click", event => {

      if (event.target === searchModal) {
        closeSearchModal();
      }

    });

    document.addEventListener("keydown", event => {

      if (event.key === "Escape") {
        closeSearchModal();
      }

    });

    function doSearch() {

      if (!searchResult) return;

      const value = searchInput.value.trim();

      searchResult.textContent = value
        ? `Buscando "${value}"... Próximamente conectaremos esta búsqueda con tu catálogo.`
        : "Escribe algo para buscar.";
    }

    searchSubmit?.addEventListener("click", doSearch);

    searchInput.addEventListener("keydown", event => {

      if (event.key === "Enter") doSearch();

    });
  }


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
