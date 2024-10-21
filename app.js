const express = require('express');
const mongoose = require('./db');
const usuarios = require('./routes/usuarios');
const bodyParser = require('body-parser');
const path = require('path'); 
const app = express();

// Middleware
app.use(bodyParser.json());

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/api/usuarios', usuarios);

// Ruta para el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para otras Paginas en html
app.get('/carrito', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Carrito.html'));
});

app.get('/catalogo', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Catalogo.html'));
});

app.get('/informacion', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'información.html'));
});

app.get('/pasarela', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Pasarela.html'));
});

app.get('/perfil', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Perfil.html'));
});


// Puerto de la aplicación
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
