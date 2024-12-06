import path from 'path';
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

console.log(__dirname);

const app = express();
app.use(cors({
    origin: 'localhost', 
    methods: ['GET', 'POST', 'PATCH']
}));

app.use(express.json());
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Educem00.', 
    database: 'antica_roma'
});

app.use(express.static(__dirname+'public'));

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        process.exit(1);
    }
    console.log('Conectado a la base de datos.');
});

// Ruta para obtener información básica
app.get('/', (req, res) => {
    console.log("Recabando información de la pizza del mes\n");
    db.query('SELECT featured_pizza_id FROM featured_pizzas', (err, featured_pizzas) => {
        if (err) {
            console.error('Error al obtener el stock:', err);
            return res.status(500).send('Error al obtener el stock');
        }
        res.json(featured_pizzas);
    });
});

// Ruta para actualizar el stock de productos
app.patch('/update', (req, res) => {
    console.log("PATCH /update - Actualizando producto");
    const { id, cantidad } = req.body;

    if (!id || cantidad === undefined) {
        console.error("Datos incompletos:", req.body);
        return res.status(400).json({ error: 'Faltan datos: id o cantidad no proporcionados' });
    }

    // Consulta SQL actualizada para tratar id como VARCHAR
    db.query(
        'UPDATE productos SET cantidad = cantidad - ? WHERE id = ? AND cantidad >= ?',
        [cantidad, id, cantidad],
        (err, results) => {
            if (err) {
                console.error('Error al actualizar el stock:', err);
                return res.status(500).json({ error: 'Error al actualizar el stock' });
            }

            if (results.affectedRows === 0) {
                console.warn('No se encontró el producto o stock insuficiente:', req.body);
                return res.status(400).json({ error: 'Producto no encontrado o stock insuficiente' });
            }

            console.log('Stock actualizado correctamente:', results);
            res.json({ message: 'Stock actualizado' });
        }
    );
});



// Ruta para obtener el stock de productos
app.get('/stock', (req, res) => {
    console.log("Seleccionando productos\n");
    db.query('SELECT * FROM productos', (err, results) => {
        if (err) {
            console.error('Error al obtener el stock:', err);
            return res.status(500).send('Error al obtener el stock');
        }
        res.json(results);
    });
});

// Ruta para procesar compras y actualizar el stock
app.post('/comprar', (req, res) => {
    console.log("Procesando compra...");
    console.table(req.body);

    const { producto, cantidad } = req.body;

    if (!producto || !cantidad) {
        console.error('Producto o cantidad no especificados');
        return res.status(400).json({ error: 'Producto o cantidad no especificados' });
    }

    const query = 'UPDATE productos SET cantidad = cantidad - ? WHERE producto = ? AND cantidad >= ?';
    db.query(query, [cantidad, producto, cantidad], (err, result) => {
        if (err) {
            console.error('Error al actualizar el stock:', err);
            return res.status(500).json({ error: 'Error al procesar la compra' });
        }

        if (result.affectedRows === 0) {
            return res.status(400).json({ error: 'Stock insuficiente o producto no encontrado' });
        }

        res.json({ message: 'Compra realizada con éxito' });
    });
});

// Ruta para incrementar el stock de un producto
app.patch('/stock/incrementar/:id', (req, res) => {
    const { id } = req.params;
    const { cantidad } = req.body;

    const query = 'UPDATE productos SET cantidad = cantidad + ? WHERE id = ?';
    db.query(query, [cantidad, id], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.affectedRows === 0) {
            res.status(404).send({ message: 'Producto no encontrado' });
        } else {
            res.send({ message: 'Cantidad incrementada correctamente' });
        }
    });
});

// Ruta para registrar comandas
app.post('/comandas', (req, res) => {
    const { mesa, productos } = req.body;

    if (!mesa || !productos || productos.length === 0) {
        console.error('Datos incompletos:', { mesa, productos });
        return res.status(400).json({ error: 'Número de mesa o productos no especificados' });
    }

    const detalles = productos.map(p => [mesa, p.id, p.cantidad]);

    const query = 'INSERT INTO comandas (mesa, producto_id, cantidad) VALUES ?';
    db.query(query, [detalles], (err) => {
        if (err) {
            console.error('Error al guardar la comanda en la base de datos:', err);
            return res.status(500).json({ error: 'Error al guardar la comanda' });
        }
        res.json({ message: 'Comanda creada con éxito' });
    });
});

app.get('/comandas', (req, res) => {
    db.query('SELECT * FROM comandas', (err, results) => {
        if (err) {
            console.error('Error al obtener las comandas:', err);
            return res.status(500).send('Error al obtener las comandas');
        }
        res.json(results);
    });
});

// Escuchar al servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
