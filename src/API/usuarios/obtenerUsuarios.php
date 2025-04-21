<?php

header("Access-Control-Allow-Origin: *"); // Permite todos los orígenes (para producción, especifica tu dominio)
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
include('../Database/conexion.php');


$sql = "SELECT * FROM usuarios";
$result = $conn->query($sql);

if ($result->num_rows > 0) {

    $ubicaciones = [];
    while ($row = $result->fetch_assoc()) {
        $ubicaciones[] = $row;
    }

    echo json_encode($ubicaciones);
} else {

    echo json_encode([]);
}

$conn->close();


?>