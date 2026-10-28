(function () {
    "use strict";

    const btn = document.getElementById('mburger');
    const nav = document.getElementById('nav-menu');
    const body = document.body;

    if (!btn || !nav) {
        return;
    }

    btn.addEventListener('click', function () {
        const isOpen = body.classList.toggle('nav-open');
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            body.classList.remove('nav-open');
            btn.setAttribute('aria-expanded', 'false');
        });
    });
})();