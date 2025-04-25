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

//  COMO ENVIAR LOS DATOS DESDE EL FRONT
/*
    {
    "tabla": "entradas_salidas",
    "campos": {
        "id_grua": 3,
        "fecha_hora": "2025-04-25 11:00:00",
        "kilometraje": 15300,
        "nivel_gasolina": "bajo",
        "tipo_movimiento": "salida"
    }
    }
*/


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Leer y decodificar el cuerpo de la solicitud JSON
    $data = json_decode(file_get_contents('php://input'), true);

    // Validación inicial
    if (!$data || !isset($data['tabla']) || !isset($data['campos'])) {
        echo json_encode(['status' => 'error', 'message' => 'Datos insuficientes para la inserción']);
        exit();
    }

    $tabla = $data['tabla'];
    $campos = $data['campos'];

    // Validar nombre de la tabla (solo letras y guiones bajos)
    if (!preg_match('/^[a-zA-Z_]+$/', $tabla)) {
        echo json_encode(['status' => 'error', 'message' => 'Nombre de tabla inválido']);
        exit();
    }

    // Construcción dinámica de columnas y valores
    $columnas = implode(', ', array_keys($campos));              // Ej: id_grua, fecha_hora, kilometraje
    $placeholders = implode(', ', array_fill(0, count($campos), '?')); // Ej: ?, ?, ?, ?, ?
    $valores = array_values($campos);                            // Solo los valores

    // Tipos dinámicos (esto puedes ajustarlo más adelante si quieres precisión tipo 'i', 'd', etc.)
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

    // Preparar y ejecutar la consulta
    $query = "INSERT INTO $tabla ($columnas) VALUES ($placeholders)";
    $stmt = $conn->prepare($query);

    if (!$stmt) {
        echo json_encode(['status' => 'error', 'message' => 'Error al preparar la consulta']);
        exit();
    }

    $stmt->bind_param($tipos, ...$valores);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Registro insertado correctamente']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error al insertar el registro']);
    }
}




?>