// Requerir express
const express = require('express');
const path = require('path');
const mysql = require('mysql'); // Asegúrate de tener mysql instalado
const app = express();
const port = 3000;

// Configurar la conexión a la base de datos
const connection = mysql.createConnection({
    host: 'autorack.proxy.rlwy.net',
    user: 'root',
    password: 'ycUEsAhdUpHgMMzLOvsEVBuZGXtSjNFz',
    database: 'railway'
});

connection.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos: ', err);
        return;
    }
    console.log('Conexión a la base de datos establecida');
});

// Usar JSON y URL-encoded middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos como CSS, imágenes, etc.
app.use(express.static(path.join(__dirname, 'styles')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'pages')));

// Ruta para manejar la compra (POST)
app.post('/comprar', (req, res) => {
    const { producto_id, nombre, precio, cantidad, tipo } = req.body;

    // Verificar si todos los datos necesarios están presentes
    if (!producto_id || !nombre || !precio || !cantidad || !tipo) {
        return res.status(400).json({ mensaje: 'Faltan datos para procesar la compra' });
    }

    // Consulta SQL para insertar la compra en la base de datos
    const query = 'INSERT INTO compras (producto_id, nombre, precio, cantidad, tipo) VALUES (?, ?, ?, ?, ?)';
    const valores = [producto_id, nombre, precio, cantidad, tipo];

    // Ejecutar la consulta en la base de datos
    connection.query(query, valores, (err, result) => {
        if (err) {
            console.error('Error al insertar en la base de datos:', err);
            return res.status(500).json({ mensaje: 'Hubo un error al procesar la compra' });
        }

        // Responder con éxito al cliente
        res.status(200).json({ mensaje: 'Producto comprado correctamente', id: result.insertId });
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo.`);
});

//=================================================== PARTE DEL BACKEND ===================================================//

// Obtener todas las compras
app.get('/compras', (req, res) => {
    const query = 'SELECT * FROM compras'; // Ajusta el nombre de la tabla si es necesario
    connection.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al obtener las compras');
        } else {
            res.json(results); // Devolvemos los datos en formato JSON
        }
    });
});

// Eliminar una compra
app.delete('/compras/:id', (req, res) => {
    const { id } = req.params;  // Obtenemos el ID de la compra a eliminar
    const query = 'DELETE FROM compras WHERE id = ?';  // SQL para eliminar la compra por ID
    connection.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al eliminar la compra');
        } else {
            res.status(200).json({ mensaje: 'Compra eliminada correctamente' });
        }
    });
});
