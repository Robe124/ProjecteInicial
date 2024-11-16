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

echo "¡Conexión exitosa a la base de datos!";

// Cerrar la conexión
$conn->close();
?>
