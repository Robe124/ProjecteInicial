<?php
include 'conexion.php'; // Archivo de conexión

// Obtener el ID del producto y la cantidad comprada desde la solicitud
$producte_id = $_POST['producte_id'];
$quantitat = $_POST['quantitat'];

// Iniciar una transacción
mysqli_begin_transaction($conn);

try {
    // Actualizar el stock en la tabla Productes
    $sql_update_stock = "UPDATE Productes SET stock = stock - ? WHERE id = ? AND stock >= ?";
    $stmt = $conn->prepare($sql_update_stock);
    $stmt->bind_param('iii', $quantitat, $producte_id, $quantitat);

    if ($stmt->execute()) {
        // Insertar un nuevo pedido en la tabla Comandes
        $sql_insert_order = "INSERT INTO Comandes (producte_id, quantitat, estat) VALUES (?, ?, 'Completado')";
        $stmt_order = $conn->prepare($sql_insert_order);
        $stmt_order->bind_param('ii', $producte_id, $quantitat);
        $stmt_order->execute();

        // Confirmar la transacción
        mysqli_commit($conn);
        echo "Compra completada y stock actualizado.";
    } else {
        // Revertir la transacción en caso de fallo
        mysqli_rollback($conn);
        echo "Error al actualizar el stock o realizar la compra.";
    }

} catch (Exception $e) {
    // Revertir la transacción en caso de excepción
    mysqli_rollback($conn);
    echo "Error en la transacción: " . $e->getMessage();
}

$stmt->close();
$conn->close();
?>
