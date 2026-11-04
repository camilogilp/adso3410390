// ============================================================
//  Pampa Argentinian Street Food — carrusel.js
//  Carrusel horizontal con:
//   · Botones triangulares prev/next (con estado disabled).
//   · Efecto de iluminación central (clase .is-center).
//   · Centrado inicial configurable por índice.
//  Se activa en MÓVIL y TABLET (≤1024px). En escritorio (>1024px)
//  no hace nada y limpia cualquier .is-center residual.
// ============================================================

(function () {
    "use strict";

    // Ahora se activa en móvil + tablet; se desactiva solo en escritorio.
    const MEDIA = window.matchMedia("(max-width: 1024px)");
    const carousels = [];      // { track, center() }
    let listenersAttached = false;

    /**
     * Inicializa un carrusel.
     * @param {HTMLElement} track        Contenedor con overflow-x.
     * @param {HTMLButtonElement} prevBtn
     * @param {HTMLButtonElement} nextBtn
     * @param {number} initialIndex      Índice a centrar al cargar.
     */
    function initCarrusel(track, prevBtn, nextBtn, initialIndex) {
        if (!track || !prevBtn || !nextBtn) return;

        let rafId = null;

        // Ancho de una tarjeta + gap (para avanzar una posición por clic).
        function stepSize() {
            const card = track.querySelector(":scope > .card");
            if (!card) return 0;
            const style = getComputedStyle(track);
            const gapPx = parseFloat(style.columnGap) || 12.8;
            return card.getBoundingClientRect().width + gapPx;
        }

        // Marca con .is-center la tarjeta más próxima al centro del track.
        function updateCenter() {
            const trackRect = track.getBoundingClientRect();
            const center = trackRect.left + trackRect.width / 2;
            const cards = track.querySelectorAll(":scope > .card");

            let closest = null;
            let minDist = Infinity;

            cards.forEach((card) => {
                const rect = card.getBoundingClientRect();
                const cardCenter = rect.left + rect.width / 2;
                const dist = Math.abs(cardCenter - center);
                if (dist < minDist) {
                    minDist = dist;
                    closest = card;
                }
            });

            cards.forEach((card) => {
                card.classList.toggle("is-center", card === closest);
            });
        }

        // Habilita/deshabilita flechas según posición del scroll.
        function updateButtons() {
            const maxScroll = track.scrollWidth - track.clientWidth;
            prevBtn.disabled = track.scrollLeft <= 1;
            nextBtn.disabled = track.scrollLeft >= maxScroll - 1;
        }

        // Handler de scroll con requestAnimationFrame (sin jank).
        function onScroll() {
            if (rafId !== null) return;
            rafId = requestAnimationFrame(() => {
                updateCenter();
                updateButtons();
                rafId = null;
            });
        }

        // Centra una tarjeta por índice. Desactiva temporalmente
        // scroll-behavior:smooth para que el centrado inicial sea
        // instantáneo (luego lo restaura en el siguiente frame).
        function centerCard(index) {
            const cards = track.querySelectorAll(":scope > .card");
            const card = cards[index];
            if (!card) return;

            const trackRect = track.getBoundingClientRect();
            const cardRect = card.getBoundingClientRect();
            const delta = (cardRect.left + cardRect.width / 2) -
                          (trackRect.left + trackRect.width / 2);

            const original = track.style.scrollBehavior;
            track.style.scrollBehavior = "auto";
            track.scrollLeft += delta;
            requestAnimationFrame(() => {
                track.style.scrollBehavior = original || "";
            });
        }

        // Listeners (se registran una sola vez por track).
        track.addEventListener("scroll", onScroll, { passive: true });

        prevBtn.addEventListener("click", () => {
            track.scrollBy({ left: -stepSize(), behavior: "smooth" });
        });
        nextBtn.addEventListener("click", () => {
            track.scrollBy({ left: stepSize(), behavior: "smooth" });
        });

        // Guardamos la referencia para poder re-centrar al
        // cambiar de breakpoint.
        carousels.push({
            track,
            center: () => {
                requestAnimationFrame(() => {
                    centerCard(initialIndex);
                    requestAnimationFrame(() => {
                        updateCenter();
                        updateButtons();
                    });
                });
            },
        });
    }

    // Adjunta los listeners una única vez (evita duplicados al redimensionar).
    function attachListenersOnce() {
        if (listenersAttached) return;
        listenersAttached = true;

        initCarrusel(
            document.getElementById("hamburguesas-track"),
            document.getElementById("hamburguesas-prev"),
            document.getElementById("hamburguesas-next"),
            2 // Entre Rios (3.ª tarjeta tras el reorder)
        );

        initCarrusel(
            document.getElementById("postres-track"),
            document.getElementById("postres-prev"),
            document.getElementById("postres-next"),
            0 // Lemon Pie (1.ª tarjeta)
        );
    }

    function activate() {
        attachListenersOnce();
        carousels.forEach((c) => c.center());
    }

    function deactivate() {
        document.querySelectorAll(".card.is-center").forEach((el) => {
            el.classList.remove("is-center");
        });
    }

    function onMediaChange() {
        if (MEDIA.matches) {
            activate();
        } else {
            deactivate();
        }
    }

    // Inicialización.
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
            if (MEDIA.matches) activate();
        });
    } else if (MEDIA.matches) {
        activate();
    }

    // Soporte para el evento "change" de MediaQueryList (con fallback).
    if (typeof MEDIA.addEventListener === "function") {
        MEDIA.addEventListener("change", onMediaChange);
    } else if (typeof MEDIA.addListener === "function") {
        MEDIA.addListener(onMediaChange);
    }
})();