<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);


header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Permite todas las conexiones (puedes restringirlo a tu dominio específico)
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');


include '../Database/conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener los datos del cuerpo de la solicitud
    $data = json_decode(file_get_contents('php://input'), true);
    if (!$data) {
        echo json_encode(['status' => 'error', 'message' => 'No se recibieron datos']);
        exit();
    }

    if (isset($data['nombre_ubicacion'])) {
        $nombreUbicacion = $data['nombre_ubicacion'];

        // Preparar la consulta para insertar la ubicación
        $query = "INSERT INTO ubicaciones (nombre_ubicacion) VALUES (?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("s", $nombreUbicacion);

        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Ubicación insertada correctamente']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error al insertar la ubicación']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Nombre de ubicación no proporcionado']);
    }

}


?>