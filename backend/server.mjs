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







//ESCUCHAR AL SERVIDOR 

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
