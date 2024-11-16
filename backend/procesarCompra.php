<?php
// Configuración de la base de datos
$host = "p:r42ii9gualwp7i1y.chr7pe7iynqr.eu-west-1.rds.amazonaws.com";
$port = 3306;
$username = "jl68wn415dcxig69";
$password = "b1wuyilx8zrxf3jj";
$dbname = "euu0ehbvpbwmjiyg";

// Conexión persistente
$conn = new mysqli($host, $username, $password, $dbname, $port);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Leer datos enviados desde el frontend
$data = json_decode(file_get_contents("php://input"), true);
$cliente = $data['cliente'];
$productos = $data['productos'];

foreach ($productos as $producto) {
    $productoId = $producto['id'];
    $cantidad = $producto['cantidad'];

    // Verificar stock
    $result = $conn->query("SELECT stock FROM productos WHERE id = $productoId");
    $row = $result->fetch_assoc();

    if ($row['stock'] < $cantidad) {
        echo json_encode(["status" => "error", "message" => "Stock insuficiente para el producto ID $productoId"]);
        exit;
    }

    // Actualizar stock
    $conn->query("UPDATE productos SET stock = stock - $cantidad WHERE id = $productoId");

    // Registrar pedido
    $conn->query("INSERT INTO pedidos (cliente, producto_id, cantidad) VALUES ('$cliente', $productoId, $cantidad)");
}

// Cerrar la conexión al finalizar el script
$conn->close();

echo json_encode(["status" => "success"]);
?>
