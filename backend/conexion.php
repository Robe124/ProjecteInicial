<?php
 include('conexion.php');

 $datos = json_decode(file_get_contents('php://input'), true);

 if (isset($datos['productoID']) && isset($datos['cantidad'])) {
    $productoID = $datos['productoID'];
    $cantidad = $datos['cantidad'];

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
