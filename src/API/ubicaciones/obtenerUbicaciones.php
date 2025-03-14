<?php
header("Access-Control-Allow-Origin: *"); // Permite todos los orígenes (para producción, especifica tu dominio)
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
include('../Database/conexion.php'); // Incluir archivo de conexión

// Consulta SQL para obtener las ubicaciones
$sql = "SELECT * FROM ubicaciones";
$result = $conn->query($sql);

// Verificar si hay resultados
if ($result->num_rows > 0) {
    // Crear un array para almacenar las ubicaciones
    $ubicaciones = [];
    while ($row = $result->fetch_assoc()) {
        $ubicaciones[] = $row;
    }
    // Devolver las ubicaciones en formato JSON
    echo json_encode($ubicaciones);
} else {
    // Si no hay ubicaciones, devolver un array vacío
    echo json_encode([]);
}

// Cerrar la conexión
$conn->close();
?>