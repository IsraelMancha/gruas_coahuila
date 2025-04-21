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
    $data = json_decode(file_get_contents('php://input'), true);

    if (!$data) {
        echo json_encode(['status' => 'error', 'message' => 'No se recibieron datos']);
        exit();
    }

    if (isset($data['id_usuario']) && isset($data['email'])) {
        $id_usuario = $data['id_usuario'];
        $email = $data['email'];

        // Preparar la consulta para insertar la ubicación
        $query = "UPDATE ubicaciones SET email = ? WHERE id_usuario = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("si", $email, $id_usuario);

        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Usuario actualizado correctamente']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error al actualizar usuario']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Email de usuario no proporcionado']);
    }
}



?>