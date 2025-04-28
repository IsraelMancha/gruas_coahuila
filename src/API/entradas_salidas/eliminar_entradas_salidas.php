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

// ------------
//  COMO ENVIAR LOS DATOS DESDE EL FRONTEND:
//  {
//      "tabla": "entradas_salidas",
//      "condiciones": {
//      "id": 5
//      }
//  }

//  Esto genera un -> DELETE FROM entradas_salidas WHERE id = ?

// -----------


// Validar que el método es DELETE
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Leer y decodificar el cuerpo de la solicitud JSON
    $data = json_decode(file_get_contents('php://input'), true);

    // Validaciones básicas
    if (!$data || !isset($data['tabla']) || !isset($data['condiciones'])) {
        echo json_encode(['status' => 'error', 'message' => 'Datos insuficientes para la eliminación']);
        exit();
    }

    $tabla = $data['tabla'];
    $condiciones = $data['condiciones']; // Ejemplo: ['id' => 5]

    // Validar nombre de tabla
    if (!preg_match('/^[a-zA-Z_]+$/', $tabla)) {
        echo json_encode(['status' => 'error', 'message' => 'Nombre de tabla inválido']);
        exit();
    }

    // Preparar cláusula WHERE dinámica
    $where = implode(' AND ', array_map(function ($col) {
        return "$col = ?";
    }, array_keys($condiciones)));

    $valores = array_values($condiciones);

    // Detectar tipos dinámicamente
    $tipos = '';
    foreach ($valores as $valor) {
        if (is_int($valor)) {
            $tipos .= 'i';
        } elseif (is_float($valor)) {
            $tipos .= 'd';
        } else {
            $tipos .= 's';
        }
    }

    $query = "DELETE FROM $tabla WHERE $where";
    $stmt = $conn->prepare($query);

    if (!$stmt) {
        echo json_encode(['status' => 'error', 'message' => 'Error al preparar la consulta']);
        exit();
    }

    $stmt->bind_param($tipos, ...$valores);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Registro eliminado correctamente']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error al eliminar el registro']);
    }
}

?>