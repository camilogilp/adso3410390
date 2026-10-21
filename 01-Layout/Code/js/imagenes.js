// ============================================================
//  Pampa Argentinian Street Food — imagenes.js
//  Permite cargar la imagen de cada tarjeta (hamburguesas y postres)
//  desde el computador. La imagen elegida se previsualiza al instante
//  y se guarda en el navegador (localStorage) para no perderla al recargar.
// ============================================================

(function () {
    "use strict";

    const PREFIJO = "pampa-imagen-";
    const inputs = document.querySelectorAll('.card input[type="file"][data-preview]');

    if (!inputs.length) {
        return;
    }

    // Recupera de forma segura un valor guardado (puede fallar en modo privado)
    function leer(clave) {
        try {
            return localStorage.getItem(clave);
        } catch (e) {
            return null;
        }
    }

    function guardar(clave, valor) {
        try {
            localStorage.setItem(clave, valor);
        } catch (e) {
            /* Sin almacenamiento disponible: la imagen solo dura esta sesión */
        }
    }

    inputs.forEach((input) => {
        const img = document.getElementById(input.dataset.preview);
        const clave = PREFIJO + input.id;

        if (!img) {
            return;
        }

        // Restaura la última imagen elegida para esta tarjeta
        const guardada = leer(clave);
        if (guardada) {
            img.src = guardada;
        }

        input.addEventListener("change", () => {
            const archivo = input.files && input.files[0];

            if (!archivo) {
                return;
            }

            const lector = new FileReader();

            lector.addEventListener("load", () => {
                img.src = lector.result;
                guardar(clave, lector.result);
            });

            lector.readAsDataURL(archivo);
        });
    });
})();
