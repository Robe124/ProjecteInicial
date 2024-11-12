<?php
// Iniciar la conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ANTICAROMA";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Comprobar si la conexión fue exitosa
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener los datos enviados en la petición
$data = json_decode(file_get_contents('php://input'), true);

// Verificar que los datos existen
if (!isset($data['producto_id']) || !isset($data['cantidad'])) {
    echo json_encode(['message' => 'Datos incompletos']);
    exit;
}

// Extraer los datos del JSON
$producto_id = $data['producto_id'];
$cantidad = $data['cantidad'];

// Comprobar el stock actual del producto
$sql = "SELECT stock FROM Productes WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $producto_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $stock_actual = $row['stock'];

    // Comprobar si hay suficiente stock
    if ($stock_actual >= $cantidad) {
        // Restar la cantidad del stock
        $nuevo_stock = $stock_actual - $cantidad;
        
        $update_sql = "UPDATE Productes SET stock = ? WHERE id = ?";
        $update_stmt = $conn->prepare($update_sql);
        $update_stmt->bind_param("ii", $nuevo_stock, $producto_id);
        
        if ($update_stmt->execute()) {
            echo json_encode(['message' => 'Stock actualizado correctamente']);
        } else {
            echo json_encode(['message' => 'Error al actualizar el stock']);
        }
    } else {
        echo json_encode(['message' => 'Stock insuficiente']);
    }
} else {
    echo json_encode(['message' => 'Producto no encontrado']);
}

$conn->close();
?>
