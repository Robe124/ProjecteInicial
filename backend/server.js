const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Habilita CORS para solicitudes desde el frontend

// Configuración de la conexión a SQL Server
const dbConfig = {
    user: 'Roger1234', // Cambia esto a tu usuario
    password: '1286', // Cambia esto a tu contraseña
    server: 'localhost', // Cambia esto a tu servidor SQL (puede ser localhost si estás en tu máquina)
    database: 'BASE DE DADES EMPRESA', // Nombre de tu base de datos
    options: {
        encrypt: true, // Si utilizas Azure o necesitas encriptación
        trustServerCertificate: true // Usado en conexiones locales
    }
};

// Ruta para manejar pedidos
app.post('/api/pedido', async (req, res) => {
    const { producto_id, cantidad } = req.body;

    try {
        // Conectar a SQL Server
        let pool = await sql.connect(dbConfig);

        // Llamar al procedimiento almacenado
        await pool.request()
            .input('producto_id', sql.Int, producto_id)
            .input('cantidad', sql.Int, cantidad)
            .execute('ActualizarStockProducto');

        // Registrar el pedido en la tabla Pedidos
        await pool.request()
            .input('producto_id', sql.Int, producto_id)
            .input('cantidad', sql.Int, cantidad)
            .execute('RegistrarPedido');

        res.json({ status: 'success', message: 'Pedido registrado y stock actualizado' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: 'Error al procesar el pedido' });
    } finally {
        sql.close(); // Cerrar la conexión
    }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
