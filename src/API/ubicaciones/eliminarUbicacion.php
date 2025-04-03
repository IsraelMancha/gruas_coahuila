<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Permite todas las conexiones (puedes restringirlo a tu dominio específico)
header('Access-Control-Allow-Methods: DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

include '../Database/conexion.php';

// Manejo de preflight request para CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Validar que el método es DELETE
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    if (!isset($_GET['id_ubicacion'])) {
        echo json_encode(['status' => 'error', 'message' => 'ID de ubicación no proporcionado']);
        exit();
    }

    // Obtener y sanitizar el ID
    $id_ubicacion = intval($_GET['id_ubicacion']);

    // Preparar la consulta
    $query = "DELETE FROM ubicaciones WHERE id_ubicacion = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $id_ubicacion);

    // Ejecutar la consulta y verificar si se eliminó correctamente
    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Ubicación eliminada correctamente']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error al eliminar la ubicación']);
    }
}
?>