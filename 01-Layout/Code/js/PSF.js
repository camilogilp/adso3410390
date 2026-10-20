// Datos extraídos del JSON original
const data = {
    config: {
        brand: "Pampa",
        slogan: "Hamburguesas Street Food",
        heroText: "EL AUTENTICO SABOR ARGENTINO"
    },
    hamburguesas: [
        { id: "h1", name: "Mendocino", description: "Carne de res, queso cheddar, cebolla caramelizada, lechuga, tomate y salsa de la casa.", price: 27900, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500&auto=format&fit=crop" },
        { id: "h2", name: "Pampero", description: "Doble carne, doble queso, panceta crujiente y salsa barbacoa ahumada.", price: 28000, image: "https://images.unsplash.com/photo-1594212896049-40e3c92e39e9?q=80&w=500&auto=format&fit=crop" },
        { id: "h3", name: "Patagónico", description: "Carne de cordero, queso provolone, rúcula y alioli de ajo.", price: 31900, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=500&auto=format&fit=crop" },
        { id: "h4", name: "Iguazú", description: "Carne de res, queso tybo, huevo frito, morrones asados y mayonesa casera.", price: 35900, image: "https://images.unsplash.com/photo-1586816001966-79b736744398?q=80&w=500&auto=format&fit=crop" },
        { id: "h5", name: "Gran Rojo", description: "Triple carne, cheddar, bacon, cebolla morada y salsa picante secreta.", price: 34900, image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=500&auto=format&fit=crop" }
    ],
    postres: [
        { id: "p1", name: "Lemon Pie", description: "Auténtica receta de limón, crema de limón, merengue italiano y toque de canela.", image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?q=80&w=300&auto=format&fit=crop" },
        { id: "p2", name: "Alfajores", description: "Alfajores de maicena, rellenos de dulce de leche, bañados de chocolate o azúcar impalpable.", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=300&auto=format&fit=crop" },
        { id: "p3", name: "Peras al cabernet", description: "Peras cocidas en vino cabernet sauvignon, canela, romero y pistacho.", image: "https://images.unsplash.com/photo-1626027552273-7302b5ba9f5c?q=80&w=300&auto=format&fit=crop" },
        { id: "p4", name: "Volcan de Chocolate", description: "Volcán de chocolate caliente, centro fundido, helado de vainilla, frambuesa y pistacho.", image: "https://images.unsplash.com/photo-1563805042-7684c8e9e3ec?q=80&w=300&auto=format&fit=crop" }
    ],
    contacto: {
        sedes: [
            { nombre: "Direccion Poblado", direccion: "Calle 44# 103-45 Provenza", telefono: "314 362 9459" },
            { nombre: "Direccion Laureles", direccion: "Circular 74 # 39-36 Av Nutibara", telefono: "314 362 9459" }
        ]
    }
};

// Carrito de compras
let cart = [];
let pendingItem = null;

function findItem(id) {
    return data.hamburguesas.find(x => x.id === id) || data.postres.find(x => x.id === id);
}

function updateCart() {
    const cartCount = document.getElementById('cartCount');
    const cartList = document.getElementById('cartList');
    const cartTotal = document.getElementById('cartTotal');

    cartCount.textContent = cart.length;
    cartCount.style.display = cart.length ? 'inline-block' : 'none';

    cartList.innerHTML = '';
    if (cart.length === 0) {
        cartList.innerHTML = '<li class="cart-empty">Tu pedido está vacío</li>';
    }

    let total = 0;
    cart.forEach((item, i) => {
        const li = document.createElement('li');
        li.className = 'cart-item';
        const priceTxt = item.price != null ? '$' + item.price.toLocaleString('es-CO') : '—';
        li.innerHTML = `
            <span class="cart-item-name">${item.name}</span>
            <span class="cart-item-price">${priceTxt}</span>
            <button class="cart-remove" data-i="${i}" aria-label="Quitar">✕</button>
        `;
        cartList.appendChild(li);
        if (item.price != null) total += item.price;
    });

    cartTotal.textContent = '$' + total.toLocaleString('es-CO');

    cartList.querySelectorAll('.cart-remove').forEach(btn => {
        btn.addEventListener('click', () => {
            cart.splice(parseInt(btn.dataset.i, 10), 1);
            updateCart();
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {

    // 0. Renderizar Config (marca, slogan y hero)
    document.querySelectorAll('#brandText, #brandTextFooter').forEach(el => el.textContent = data.config.brand);
    document.querySelectorAll('#sloganText, #sloganTextFooter').forEach(el => el.textContent = data.config.slogan);
    document.getElementById('heroText').textContent = data.config.heroText;

    // 1. Renderizar Hamburguesas (tarjeta clicable)
    const burgersTrack = document.getElementById('burgersTrack');
    data.hamburguesas.forEach(burger => {
        const card = document.createElement('div');
        card.className = 'burger-card clickable';
        card.innerHTML = `
            <img src="${burger.image}" alt="${burger.name}" class="burger-img">
            <h3>${burger.name}</h3>
            <p>${burger.description}</p>
            <div class="card-footer">
                <span class="price">$${burger.price.toLocaleString('es-CO')}</span>
                <button class="fav-btn" aria-label="Pedir ${burger.name}">❤</button>
            </div>
        `;
        card.addEventListener('click', () => openOrderModal(burger.id));
        burgersTrack.appendChild(card);
    });

    // 2. Renderizar Postres (círculo clicable)
    const dessertsGrid = document.getElementById('dessertsGrid');
    data.postres.forEach(postre => {
        const card = document.createElement('div');
        card.className = 'dessert-card clickable';
        card.innerHTML = `
            <div class="dessert-img-container">
                <img src="${postre.image}" alt="${postre.name}" class="dessert-img">
            </div>
            <h3>${postre.name}</h3>
            <p>${postre.description}</p>
        `;
        card.addEventListener('click', () => openOrderModal(postre.id));
        dessertsGrid.appendChild(card);
    });

    // 3. Renderizar Sedes (Contacto)
    const footerSedes = document.getElementById('footerSedes');
    data.contacto.sedes.forEach(sede => {
        const div = document.createElement('div');
        div.className = 'sede';
        div.innerHTML = `
            <h4>${sede.nombre}</h4>
            <p>${sede.direccion}</p>
            <p>${sede.telefono}</p>
        `;
        footerSedes.appendChild(div);
    });

    // 4. Lógica del Carrusel (Flechas izquierda/derecha)
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    const scrollAmount = 270; // Ancho de tarjeta + gap

    btnNext.addEventListener('click', () => {
        burgersTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    btnPrev.addEventListener('click', () => {
        burgersTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    // 5. Modales y Formularios (Lógica de pedidos y reservas)
    const modalOrder = document.getElementById('modalOrder');
    const modalReserve = document.getElementById('modalReserve');
    const modalCart = document.getElementById('modalCart');
    const orderDesc = document.getElementById('orderDesc');

    // Abrir modal de pedido al hacer clic en tarjeta o corazón
    window.openOrderModal = (itemId) => {
        const item = findItem(itemId);
        if (!item) return;
        pendingItem = { id: item.id, name: item.name, price: item.price != null ? item.price : null };
        orderDesc.textContent = `¿Deseas ordenar ${item.name}?`;
        modalOrder.classList.add('active');
    };

    // Cerrar modales
    document.getElementById('cancelOrder').addEventListener('click', () => {
        modalOrder.classList.remove('active');
    });

    document.getElementById('cancelReserve').addEventListener('click', () => {
        modalReserve.classList.remove('active');
    });

    document.getElementById('cancelCart').addEventListener('click', () => {
        modalCart.classList.remove('active');
    });

    // Abrir modal de reservas desde el Nav
    document.getElementById('btnReservas').addEventListener('click', (e) => {
        e.preventDefault();
        modalReserve.classList.add('active');
    });

    // Abrir carrito desde el Nav
    document.getElementById('cartBtn').addEventListener('click', () => {
        updateCart();
        modalCart.classList.add('active');
    });

    // Procesar formulario de PEDIDO (agrega al carrito)
    document.getElementById('formOrder').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('orderName').value;
        const address = document.getElementById('orderAddress').value;

        if (pendingItem) {
            cart.push(pendingItem);
            updateCart();
        }

        alert(`¡Pedido agregado!\nGracias ${name}. Se enviará a: ${address}.`);

        pendingItem = null;
        e.target.reset();
        modalOrder.classList.remove('active');
    });

    // Confirmar todo el carrito
    document.getElementById('confirmCart').addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Tu pedido está vacío. Agrega productos primero.');
            return;
        }
        alert(`¡Pedido confirmado!\nLlevas ${cart.length} producto(s). Total: ${document.getElementById('cartTotal').textContent}.`);
        cart = [];
        updateCart();
        modalCart.classList.remove('active');
    });

    // Procesar formulario de RESERVA
    document.getElementById('formReserve').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('resName').value;
        const date = document.getElementById('resDate').value;
        const time = document.getElementById('resTime').value;

        alert(`¡Reserva confirmada!\n${name}, tu mesa está reservada para el ${date} a las ${time}.`);

        e.target.reset();
        modalReserve.classList.remove('active');
    });

    // Cerrar modales al hacer clic fuera del contenido
    [modalOrder, modalReserve, modalCart].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    });

    updateCart();
});
