const express = require('express');
const path = require('path'); // Asegúrate de requerir 'path' para la ruta correcta
const router = express.Router();

// Ruta para el 'home'
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'pages', 'index.html'));
});

// Ruta para otra página
router.get('/otro', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'pages', 'crud.html')); 
});

module.exports = router;
