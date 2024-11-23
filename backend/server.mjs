import path from 'path';
import * as url from 'url';

import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';

const PROTOCOL = "http";
const DOMAIN = "localhost";
const HOST = PROTOCOL + "://" + DOMAIN;
const PORT = 3000;

const SERVER = HOST + ":" + PORT;

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();
app.use(cors({
    origin: SERVER, 
    methods: ['GET', 'POST']
}));

app.use(express.json());
const db = mysql.createConnection({
    host: DOMAIN,
    user: 'root',
    password: '', 
    database: 'antica_roma'
});
app.use(express.static(__dirname+'/public'));

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        process.exit(1);
    }
    console.log('Conectado a la base de datos.');
});


app.get('/', (req, res) => {
    console.log("recabando información de la pizza del mes\n");
    db.query('SELECT featured_pizza_id FROM featured_pizzas', (err, featured_pizzas) => {
        if (err) {
            console.error('Error al obtener el stock:', err);
            return res.status(500).send('Error al obtener el stock');
        }

        //res.json(results);
    });




});

app.patch('/update', (req, res) => {
    console.log("updating product...");
    const {id, cantidad} = req.body;

    db.query('update productos set cantidad = cantidad - ' + cantidad + " where id = '" + id + "'", (err, results) => {
        if (err) {
            console.error('Error al obtener el stock:', err);
            return res.status(500).send('Error al obtener el stock');
        }
        res.json(results);
    });
});

app.get('/stock', (req, res) => {
    console.log("seleccionando productos\n");
    db.query('SELECT * FROM productos', (err, results) => {
        if (err) {
            console.error('Error al obtener el stock:', err);
            return res.status(500).send('Error al obtener el stock');
        }
        res.json(results);
    });
});

app.post('/comprar', (req, res) => {
    console.log("comprando productos\n");
    console.table(req.body);
    const { producto, cantidad } = req.body;

    if (!producto || !cantidad) {
        console.error('Producto o cantidad no especificados');
        return res.status(400).json({ error: 'Producto o cantidad no especificados' });
    }

    console.log('Intentando procesar compra:', { producto, cantidad });
    const query = 'UPDATE productos SET cantidad = cantidad - ? WHERE producto = ? AND cantidad >= ?';
    db.query(query, [cantidad, producto, cantidad], (err, result) => {
        if (err) {
            console.error('Error al actualizar el stock:', err);
            return res.status(500).json({ error: 'Error al procesar la compra' });
        }

        console.log('Resultado de la actualización:', result);
        if (result.affectedRows === 0) {
            return res.status(400).json({ error: 'Stock insuficiente o producto no encontrado' });
        }

        res.json({ message: 'Compra realizada con éxito' });
    });
});

app.listen(PORT, () => {
    console.log("Servidor ejecutándose en " + SERVER);
});
