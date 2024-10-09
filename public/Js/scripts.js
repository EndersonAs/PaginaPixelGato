document.getElementById('loginButton').addEventListener('click', loginUser);
document.getElementById('registerButton').addEventListener('click', toggleRegisterMode);
document.getElementById('salir_perfil').addEventListener('click', logoutUser);

function toggleRegisterMode() {
    document.getElementById('registerFields').classList.remove('hidden');
    document.getElementById('formTitle').innerText = 'Registrarse';
    document.getElementById('loginButton').classList.add('hidden');
    document.getElementById('registerButton').classList.add('hidden');

    const confirmRegisterButton = document.createElement('button');
    confirmRegisterButton.type = 'button';
    confirmRegisterButton.id = 'confirmRegisterButton';
    confirmRegisterButton.innerText = 'Confirmar Registro';
    document.getElementById('authForm').appendChild(confirmRegisterButton);

    confirmRegisterButton.addEventListener('click', registerUser);
}

async function registerUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const username = document.getElementById('username').value;

    if (email && password && confirmPassword && username) {
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        try {
            const response = await fetch('/api/usuarios/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre: username, correo: email, contraseña: password })
            });

            const data = await response.json();
            if (response.ok) {
                alert('Usuario registrado con éxito.');
                window.location.href = 'index.html';
            } else {
                alert(data.mensaje);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al registrar el usuario.');
        }
    } else {
        alert('Por favor, complete todos los campos.');
    }
}

async function loginUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/usuarios/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ correo: email, contraseña: password })
        });

        const data = await response.json();
        if (response.ok) {
            alert('Inicio de sesión exitoso.');
            localStorage.setItem('token', data.token);
            window.location.href = 'Perfil.html';
        } else {
            alert(data.mensaje);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al iniciar sesión.');
    }
}

function logoutUser() {
    alert('Sesión cerrada.');
    localStorage.removeItem('token');
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname.includes('Perfil.html')) {
        displayProfileData();
    }

    const token = localStorage.getItem('token');
    if (token) {
        document.getElementById('sessionStatus').classList.remove('hidden');
        // Add logic to display user information if needed
    }
});

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


