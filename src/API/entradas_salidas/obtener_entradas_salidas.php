<?php
header("Access-Control-Allow-Origin: *"); // Permite todos los orígenes (para producción, especifica tu dominio)
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
include('../Database/conexion.php'); // Incluir archivo de conexión

// EN CASO DE REQUERIR BUSQUEDA POR -- ID -- SOLO ES DE ACOPLARLO

// Consulta SQL para obtener las entradas_salidas
$sql = "SELECT * FROM entradas_salidas";
$result = $conn->query($sql);

// Verificar si hay resultados
if ($result->num_rows > 0) {
    // Crear un array para almacenar las entradas_salidas
    $entradas_salidas = [];
    while ($row = $result->fetch_assoc()) {
        $entradas_salidas[] = $row;
    }
    // Devolver las entradas_salidas en formato JSON
    echo json_encode($entradas_salidas);
} else {
    // Si no hay entradas_salidas, devolver un array vacío
    echo json_encode([]);
}

// Cerrar la conexión
$conn->close();
?>