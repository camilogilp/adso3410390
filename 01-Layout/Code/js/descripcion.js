// ============================================================
//  Pampa Argentinian Street Food — descripcion.js
//  Toggle "expandir/colapsar" de la descripción de cada
//  hamburguesa (solo .card--hamburguesa, no postres).
//
//  · Click o Enter/Space en la IMAGEN o el TÍTULO (h3)
//    expande/colapsa SOLO esa descripción.
//  · Estado inicial: descripción truncada a ~3 líneas con
//    degradado inferior.
//  · Estado expandido: descripción completa con transición.
//  · El precio (.price) permanece SIEMPRE visible.
//  · Funciona en escritorio, tablet y móvil (no depende del
//    carrusel).
//  · Respeta prefers-reduced-motion (transición instantánea).
//  · No interfiere con el scroll horizontal del carrusel ni
//    con los botones prev/next.
// ============================================================

(function () {
    "use strict";

    const CARDS = document.querySelectorAll(".card--hamburguesa");
    if (!CARDS.length) return;

    // Registro para recalcular alturas al hacer resize.
    const resizeTargets = [];
    let idCounter = 0;

    // Devuelve la altura en px de 3 líneas del <p> dado.
    function collapsedHeight(p) {
        const style = getComputedStyle(p);
        let lh = parseFloat(style.lineHeight);
        if (isNaN(lh)) {
            const fs = parseFloat(style.fontSize) || 16;
            lh = fs * 1.5; // fallback típico
        }
        return lh * 3;
    }

    // Genera un id único a partir del texto del h3.
    function uniqueDescId(h3) {
        const base = "desc-" + h3.textContent
            .trim()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
        const safeBase = base || "desc";
        let id = safeBase;
        while (document.getElementById(id)) {
            id = safeBase + "-" + (++idCounter);
        }
        return id;
    }

    CARDS.forEach((card) => {
        const body = card.querySelector(".card--hamburguesa__body");
        const h3 = card.querySelector("h3");
        const img = card.querySelector(".card--hamburguesa__media img");
        if (!body || !h3 || !img) return;

        // Localizar el <p> de descripción (el que NO es .price).
        let descP = null;
        body.querySelectorAll("p").forEach((p) => {
            if (!descP && !p.classList.contains("price")) descP = p;
        });
        if (!descP) return;

        // ID único para la descripción (necesario para aria-controls).
        descP.id = uniqueDescId(h3);

        // Envolver la descripción en .desc-wrap (para animar).
        const wrap = document.createElement("div");
        wrap.className = "desc-wrap";
        descP.parentNode.insertBefore(wrap, descP);
        wrap.appendChild(descP);

        // Estado inicial: colapsada.
        card.classList.add("desc-collapsed");

        // Ajustar max-height exacto (3 líneas en px) sin animar en init.
        wrap.style.transition = "none";
        const initialCollapsedPx = collapsedHeight(descP);
        wrap.style.maxHeight = initialCollapsedPx + "px";
        void wrap.offsetHeight; // fuerza reflow
        wrap.style.transition = "";

        // ¿El contenido realmente excede 3 líneas? Si no, no mostramos
        // el degradado inferior (sería confuso).
        if (descP.scrollHeight > initialCollapsedPx + 1) {
            card.classList.add("desc-truncatable");
        }

        // Triggers: imagen y título.
        const triggers = [img, h3];

        // La imagen no debe ser arrastrable para no interferir con
        // el scroll horizontal del carrusel en tablet/móvil.
        img.draggable = false;

        triggers.forEach((el) => {
            el.setAttribute("role", "button");
            el.setAttribute("tabindex", "0");
            el.setAttribute("aria-expanded", "false");
            el.setAttribute("aria-controls", descP.id);
            el.style.cursor = "pointer";
        });

        // Alternar estado.
        function toggle() {
            const isCollapsed = card.classList.contains("desc-collapsed");
            const newCollapsedPx = collapsedHeight(descP);

            if (isCollapsed) {
                // Expandir: usar altura completa del contenido.
                // scrollHeight ya refleja el contenido completo aunque
                // el wrap tenga max-height aplicado (overflow hidden).
                const fullH = wrap.scrollHeight;
                card.classList.remove("desc-collapsed");
                wrap.style.maxHeight = fullH + "px";
                triggers.forEach((el) =>
                    el.setAttribute("aria-expanded", "true")
                );
            } else {
                // Colapsar.
                card.classList.add("desc-collapsed");
                wrap.style.maxHeight = newCollapsedPx + "px";
                triggers.forEach((el) =>
                    el.setAttribute("aria-expanded", "false")
                );
            }
        }

        triggers.forEach((el) => {
            el.addEventListener("click", (e) => {
                // Evitar que un "drag" del carrusel dispare el toggle.
                // (El navegador normalmente no dispara click tras un
                // arrastre real, pero por si acaso comprobamos que
                // no venga de un botón del carrusel.)
                if (e.target.closest(".carrusel-btn")) return;
                toggle();
            });

            el.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
                    // Space por defecto hace scroll: evitar.
                    e.preventDefault();
                    toggle();
                }
            });
        });

        // Guardar para recálculo en resize.
        resizeTargets.push({ card, wrap, p: descP });
    });

    // Recalcular alturas al redimensionar la ventana (por si cambia
    // el ancho del p y, con ello, el número de líneas).
    let resizeTimer = null;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            resizeTargets.forEach(({ card, wrap, p }) => {
                const ch = collapsedHeight(p);
                if (card.classList.contains("desc-collapsed")) {
                    wrap.style.maxHeight = ch + "px";
                    // Reevaluar si sigue siendo truncable.
                    if (p.scrollHeight > ch + 1) {
                        card.classList.add("desc-truncatable");
                    } else {
                        card.classList.remove("desc-truncatable");
                    }
                } else {
                    wrap.style.maxHeight = wrap.scrollHeight + "px";
                }
            });
        }, 150);
    });
})();