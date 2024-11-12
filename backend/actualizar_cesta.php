<?php

$host = 'localhost';
$usuario = 'tu_usuario';
$clave = 'tu_clave';
$base_de_datos = 'tu_base_de_datos';

$conexion = new mysqli($host, $usuario, $clave, $base_de_datos);

if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}

// Obtener los datos del cuerpo de la solicitud
$datos = json_decode(file_get_contents('php://input'), true);

if (isset($datos['productoID']) && isset($datos['cantidad'])) {
    $productoID = $datos['productoID'];
    $cantidad = $datos['cantidad'];

    // Actualizar el stock en la base de datos
    $query = "UPDATE productos SET stock = stock - ? WHERE id_producto = ?";
    $stmt = $conexion->prepare($query);
    $stmt->bind_param('ii', $cantidad, $productoID);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Error al actualizar el stock']);
    }

    $stmt->close();
} else {
    echo json_encode(['success' => false, 'error' => 'Datos faltantes']);
}

$conexion->close();
?>
