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

