let currentSlides = {};
let autoplayIntervals = {};

function initCarousels() {
  const carousels = document.querySelectorAll(".carousel-images");
  carousels.forEach((carousel, index) => {
    const carouselId = index + 1;
    currentSlides[carouselId] = 0;

    // Criar indicadores
    const totalSlides = carousel.children.length;
    const indicators = document.getElementById(
      `carouselIndicators${carouselId}`
    );

    for (let i = 0; i < totalSlides; i++) {
      const indicator = document.createElement("div");
      indicator.className = `indicator ${i === 0 ? "active" : ""}`;
      indicator.onclick = () => goToSlide(carouselId, i);
      indicators.appendChild(indicator);
    }

    // Iniciar autoplay
    startAutoplay(carouselId);

    // Adicionar event listeners para pausar/retomar autoplay
    carousel.parentElement.addEventListener("mouseenter", () =>
      stopAutoplay(carouselId)
    );
    carousel.parentElement.addEventListener("mouseleave", () =>
      startAutoplay(carouselId)
    );

    // Adicionar suporte a touch
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      false
    );

    carousel.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe(carouselId, touchStartX, touchEndX);
      },
      false
    );
  });
}

function handleSwipe(carouselId, startX, endX) {
  const SWIPE_THRESHOLD = 50;
  const diff = startX - endX;

  if (Math.abs(diff) > SWIPE_THRESHOLD) {
    if (diff > 0) {
      nextSlide(carouselId);
    } else {
      prevSlide(carouselId);
    }
  }
}

function updateIndicators(carouselId) {
  const indicators = document.getElementById(
    `carouselIndicators${carouselId}`
  ).children;
  Array.from(indicators).forEach((indicator, index) => {
    indicator.className = `indicator ${
      index === currentSlides[carouselId] ? "active" : ""
    }`;
  });
}

function goToSlide(carouselId, index) {
  const carousel = document.getElementById(`carouselImages${carouselId}`);
  const totalSlides = carousel.children.length;

  if (index >= 0 && index < totalSlides) {
    currentSlides[carouselId] = index;
    carousel.style.transform = `translateX(-${index * 100}%)`;
    updateIndicators(carouselId);
  }
}

function showSlide(carouselId, direction) {
  const carousel = document.getElementById(`carouselImages${carouselId}`);
  const totalSlides = carousel.children.length;
  currentSlides[carouselId] =
    (currentSlides[carouselId] + direction + totalSlides) % totalSlides;

  carousel.style.transform = `translateX(-${currentSlides[carouselId] * 100}%)`;
  updateIndicators(carouselId);
}

function prevSlide(carouselId) {
  showSlide(carouselId, -1);
}

function nextSlide(carouselId) {
  showSlide(carouselId, 1);
}

function startAutoplay(carouselId) {
  if (!autoplayIntervals[carouselId]) {
    autoplayIntervals[carouselId] = setInterval(() => {
      nextSlide(carouselId);
    }, 5000); // Muda a cada 5 segundos
  }
}

function stopAutoplay(carouselId) {
  if (autoplayIntervals[carouselId]) {
    clearInterval(autoplayIntervals[carouselId]);
    autoplayIntervals[carouselId] = null;
  }
}

document.addEventListener("DOMContentLoaded", initCarousels);

document.addEventListener("DOMContentLoaded", function () {
  // Navegação suave para os links
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Botão Voltar ao Topo
  const backToTopButton = document.getElementById("backToTop");

  // Mostrar/ocultar botão baseado na posição da rolagem
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      // Mostrar botão após rolar 300px
      backToTopButton.style.display = "block";
    } else {
      backToTopButton.style.display = "none";
    }
  });

  // Ação de clique no botão Voltar ao Topo
  backToTopButton.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

function initCarousels() {
  const carousels = document.querySelectorAll(".carousel-images");
  carousels.forEach((carousel, index) => {
    const carouselId = index + 1;
    currentSlides[carouselId] = 0;

    // Criar indicadores
    const totalSlides = carousel.children.length;
    const indicators = document.getElementById(
      `carouselIndicators${carouselId}`
    );

    for (let i = 0; i < totalSlides; i++) {
      const indicator = document.createElement("div");
      indicator.className = `indicator ${i === 0 ? "active" : ""}`;
      indicator.onclick = () => goToSlide(carouselId, i);
      indicators.appendChild(indicator);
    }

    // Iniciar autoplay
    startAutoplay(carouselId);

    // Adicionar event listeners para pausar/retomar autoplay
    carousel.parentElement.addEventListener("mouseenter", () =>
      stopAutoplay(carouselId)
    );
    carousel.parentElement.addEventListener("mouseleave", () =>
      startAutoplay(carouselId)
    );

    // Adicionar suporte a touch
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      {
        passive: true,
      }
    );

    carousel.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe(carouselId, touchStartX, touchEndX);
      },
      {
        passive: true,
      }
    );
  });
}
