<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
include('../Database/conexion.php');

// Validar si se envía el filtro de ubicación
$idUbicacion = isset($_GET['id_ubicacion']) ? intval($_GET['id_ubicacion']) : null;

if ($idUbicacion !== null) {
    $stmt = $conn->prepare("
        SELECT es.*
        FROM entradas_salidas es
        INNER JOIN (
            SELECT id_grua, MAX(fecha_hora) AS ultima_fecha
            FROM entradas_salidas
            GROUP BY id_grua
        ) ultimos
            ON es.id_grua = ultimos.id_grua AND es.fecha_hora = ultimos.ultima_fecha
        INNER JOIN gruas g
            ON es.id_grua = g.id_grua
        WHERE g.id_ubicacion = ?
    ");
    $stmt->bind_param("i", $idUbicacion);
} else {
    $stmt = $conn->prepare("
        SELECT es.*
        FROM entradas_salidas es
        INNER JOIN (
            SELECT id_grua, MAX(fecha_hora) AS ultima_fecha
            FROM entradas_salidas
            GROUP BY id_grua
        ) ultimos
        ON es.id_grua = ultimos.id_grua AND es.fecha_hora = ultimos.ultima_fecha
    ");
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