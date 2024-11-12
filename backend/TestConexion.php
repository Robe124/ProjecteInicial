<?php
$servername = "bbdd.anticaroma.cat";  // Cambia esto según tu servidor
$username = "ddb236806";             // Cambia esto según tu usuario
$password = "Educem1.";               // Cambia esto según tu contraseña
$dbname = "ddb236806";                // Cambia esto según tu base de datos

// Intentamos hacer la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Comprobamos si la conexión es exitosa
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error); // Si falla, muestra un mensaje de error
} else {
    echo "Conexión exitosa a la base de datos."; // Si tiene éxito, muestra este mensaje
}

$conn->close();  // Cerramos la conexión
?>
