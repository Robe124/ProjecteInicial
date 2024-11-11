<?php
// Conexión a la base de datos (reemplaza con tus credenciales)
$servername = "bbdd.anticaroma.cat";  
$username = "ddb236806";            
$password = "Educem1.";         
$dbname = "ddb236806";            
$port = 3306;                     

try {
    $conn = new mysqli($servername, $username, $password, $dbname, $port);

    if ($conn->connect_error) {
        throw new Exception("Conexión fallida: " . $conn->connect_error);
    }

    if (!$conn->set_charset("utf8")) {
        throw new Exception("Error al establecer el conjunto de caracteres: " . $conn->error);
    }

    echo "Conexión exitosa";

} catch (Exception $e) {
    echo "Error en la conexión: " . $e->getMessage();
}

// Validar y sanitizar los datos enviados
if (isset($_POST['producto']) && isset($_POST['cantidad'])) {
    $producto = $conn->real_escape_string($_POST['producto']);
    $cantidad = intval($_POST['cantidad']); // Asegurarse de que es un número entero

    // Consultar el stock y el precio actual del producto
    $sql = "SELECT stock, preu FROM Productes WHERE nom = '$producto'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $stock_actual = $row['stock'];
        $precio_producto = $row['preu'];

        // Verificar si hay suficiente stock disponible
        if ($stock_actual >= $cantidad) {
            // Actualizar el stock en la base de datos
            $nuevo_stock = $stock_actual - $cantidad;
            $sql_update = "UPDATE Productes SET stock = $nuevo_stock WHERE nom = '$producto'";

            if ($conn->query($sql_update) === TRUE) {
                echo "Stock actualizado correctamente.";
            } else {
                echo "Error al actualizar el stock: " . $conn->error;
            }
        } else {
            echo "No hay suficiente stock disponible.";
        }
    } else {
        echo "Producto no encontrado.";
    }
} else {
    echo "Datos incompletos.";
}

// Cerrar la conexión
$conn->close();
?>
