<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
include('../Database/conexion.php');


// ENVIAR DATOS DESDE EL FRONT:
// localhost/gruas_coahuila/src/API/historial_gruas/obtener_historial_grua.php?id_grua=1

// Validar si se envía el filtro de grua
$idGrua = isset($_GET['id_grua']) ? intval($_GET['id_grua']) : null;

if ($idGrua) {
    $stmt = $conn->prepare("
        SELECT *
        FROM historial_gruas
        WHERE id_grua = ?
        ORDER BY fecha_historial ASC;
    ");
    $stmt->bind_param("i", $idGrua);
}
$stmt->execute();
$result = $stmt->get_result();

$datos = [];
while ($row = $result->fetch_assoc()) {
    $datos[] = $row;
}

echo json_encode($datos);
$conn->close();
?>