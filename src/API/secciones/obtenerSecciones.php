<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
include('../Database/conexion.php');


// ENVIAR DATOS DESDE EL FRONT:
// localhost/gruas_coahuila/src/API/secciones/obtenerSecciones.php?id_ubicacion=1

// Validar si se envía el filtro de grua
$idUbicacion = isset($_GET['id_ubicacion']) ? intval($_GET['id_ubicacion']) : null;

if ($idUbicacion) {
    $stmt = $conn->prepare("
        SELECT *
        FROM secciones
        WHERE id_ubicacion = ?
    ");
    $stmt->bind_param("i", $idUbicacion);
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