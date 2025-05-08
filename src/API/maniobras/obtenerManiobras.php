<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
include('../Database/conexion.php');


// ENVIAR DATOS DESDE EL FRONT:
// localhost/gruas_coahuila/src/API/maniobras/obtenerManiobras.php?id_tipo?auto=1

// Validar si se envía el filtro de grua
$id_tipo_auto = isset($_GET['id_tipo_auto']) ? intval($_GET['id_tipo_auto']) : null;

if ($id_tipo_auto) {
    $stmt = $conn->prepare("
        SELECT *
        FROM maniobras
        WHERE id_tipo_auto = ?
    ");
    $stmt->bind_param("i", $id_tipo_auto);
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