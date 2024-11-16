<?php
$port = getenv("PORT") ?: 8080;
$host = "0.0.0.0";

echo "Servidor ejecutándose en http://$host:$port";
?>