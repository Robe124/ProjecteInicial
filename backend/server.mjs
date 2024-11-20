import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';


const app = express();
app.use(cors({
    origin: 'localhost:3000', 
    methods: ['GET', 'POST']
}));

app.use(express.json());
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Educem00.', 
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

app.get('/stock', (req, res) => {
    db.query('SELECT * FROM productos', (err, results) => {
        if (err) {
            console.error('Error al obtener el stock:', err);
            return res.status(500).send('Error al obtener el stock');
        }
        res.json(results);
    });
});

app.post('/comprar', (req, res) => {
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

app.listen(3000, () => {
    console.log('Servidor corriendo en http://anticaroma.cat');
});
