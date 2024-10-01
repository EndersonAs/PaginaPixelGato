/*logica para actualizacion de datos perfil*/
document.getElementById('profile-form').addEventListener('submit', function(event) {
    event.preventDefault();
    updateProfile();
});

function updateProfile() {
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;

    document.getElementById('display-first-name').innerText = firstName;
    document.getElementById('display-last-name').innerText = lastName;
    document.getElementById('display-phone').innerText = phone;
    document.getElementById('display-address').innerText = address;

    disableEditing();
}

function enableEditing() {
    document.getElementById('first-name').disabled = false;
    document.getElementById('last-name').disabled = false;
    document.getElementById('phone').disabled = false;
    document.getElementById('address').disabled = false;
}

function disableEditing() {
    document.getElementById('first-name').disabled = true;
    document.getElementById('last-name').disabled = true;
    document.getElementById('phone').disabled = true;
    document.getElementById('address').disabled = true;
}

document.getElementById('delete-button').addEventListener('click', function() {
    if (confirm('¿Estás seguro de que deseas eliminar tu cuenta?')) {
        // Lógica para eliminar la cuenta
        alert('Cuenta eliminada.');
        // Aquí podrías agregar lógica adicional para redirigir o limpiar el formulario
    }
});

// Al cargar la página, deshabilitar los campos de entrada
window.onload = disableEditing;

/*JavaScript para el catálogo*/
// scripts.js
// Función para incrementar la cantidad
function increaseQuantity(event) {
    const quantityInput = event.target.parentNode.querySelector('input');
    quantityInput.value = parseInt(quantityInput.value) + 1;
}

// Función para decrementar la cantidad
function decreaseQuantity(event) {
    const quantityInput = event.target.parentNode.querySelector('input');
    if (parseInt(quantityInput.value) > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
    }
}

// Añadir evento a los botones de añadir al carrito
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', event => {
        const card = event.target.closest('.card_shop');
        const id = card.id;
        const quantity = parseInt(card.querySelector('.quantity-selector input').value);
        const name = card.querySelector('h5').innerText;
        const priceText = card.querySelector('.ul li:nth-child(2)').innerText;
        const price = parseFloat(priceText.replace('Precio: $', '').replace(' Cop', '').replace('.', '').replace(',', '.'));

        addToCart(id, name, quantity, price);
    });
});

function addToCart(id, name, quantity, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProductIndex = cart.findIndex(item => item.id === id);
    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += quantity;
    } else {
        cart.push({ id, name, quantity, price });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Producto añadido al carrito');
}

/*JavaScript para el  carrito*/
// scripts.js
// Cargar el carrito cuando se carga la página del carrito
document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.querySelector('.container-carro');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.forEach(item => {
        cartContainer.innerHTML += `
            <div class="card_carro" id="cart-${item.id}">
                <h5>${item.name}</h5>
                <p>Cantidad: ${item.quantity}</p>
                <p>Precio: $${(item.price * item.quantity).toFixed(2)} Cop</p>
                <button class="remove-from-cart-btn" data-id="${item.id}">Eliminar</button>
            </div>
        `;
    });
    updateTotal();
    
    // Añadir eventos a los botones de eliminar del carrito
    document.querySelectorAll('.remove-from-cart-btn').forEach(button => {
        button.addEventListener('click', event => {
            const id = event.target.getAttribute('data-id');
            removeFromCart(id);
            event.target.parentElement.remove();
            updateTotal();
        });
    });
});

function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('Subtotal').innerText = `$${subtotal.toFixed(2)} Cop`;
    document.getElementById('Total').innerText = `$${subtotal.toFixed(2)} Cop`;
}


