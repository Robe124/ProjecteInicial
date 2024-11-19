const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors({
    origin: 'https://anticaroma.cat', // Permite solicitudes solo desde tu dominio
    methods: ['GET', 'POST']
}));

app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Educem00.', // Usa tu contraseña correcta
    database: 'antica_roma'
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos');
});

// Endpoint para obtener el stock
app.get('/stock', (req, res) => {
    db.query('SELECT * FROM productos', (err, results) => {
        if (err) {
            console.error('Error al obtener el stock:', err);
            return res.status(500).send('Error al obtener el stock');
        }
        res.json(results);
    });
});

// Endpoint para reducir el stock
app.post('/comprar', (req, res) => {
    const { producto, cantidad } = req.body;

    if (!producto || !cantidad) {
        return res.status(400).json({ error: 'Producto o cantidad no especificados' });
    }

    const query = 'UPDATE productos SET cantidad = cantidad - ? WHERE producto = ? AND cantidad >= ?';
    db.query(query, [cantidad, producto, cantidad], (err, result) => {
        if (err) {
            console.error('Error al actualizar la cantidad:', err);
            return res.status(500).json({ error: 'Error al procesar la compra' });
        }

        if (result.affectedRows === 0) {
            return res.status(400).json({ error: 'Stock insuficiente o producto no encontrado' });
        }

        res.json({ message: 'Compra realizada con éxito' });
    });
});

// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://anticaroma.cat');
});
