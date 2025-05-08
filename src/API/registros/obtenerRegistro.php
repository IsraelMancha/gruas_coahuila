<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
include('../Database/conexion.php');


// ENVIAR DATOS DESDE EL FRONT:
// localhost/gruas_coahuila/src/API/registros/obtenerRegistro.php?folio=001

// Validar si se envía el filtro de grua
$folio = isset($_GET['folio']) ? intval($_GET['folio']) : null;

if ($folio) {
    $stmt = $conn->prepare("
        SELECT *
        FROM registros
        WHERE folio = ?
    ");
    $stmt->bind_param("i", $folio);
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