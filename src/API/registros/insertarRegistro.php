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
  "tabla": "registros",
  "campos": {
    "folio": "002",
    "id_tipo_auto": 2,
    "id_ubicacion": 2,
    "fecha": "2025-05-04",
    "hora": "10:40:00",
    "recogido_en": "carretera",
    "autoridad": "Policía Municipal",
    "motivo": "Revisión de rutina",
    "km_registro": "12345",
    "marca": "Nissan",
    "modelo": "Altima",
    "color": "Blanco",
    "placas": "ABC-1234",
    "estado": "Coahuila",
    "infraccion": "Ninguna",
    "unidad": "Unidad 5",
    "agente": "Juan Pérez",
    "num_serie": "1HGCM82633A123456",
    "llaves": "SI",
    "placas_frente": "NO",
    "placas_traseras": "SI",
    "tablero": "BIEN",
    "volante": "BIEN",
    "radio_estereo": "MAL",
    "eq_sonido": "NO",
    "reloj": "BIEN",
    "encendedor": "NO",
    "espejos": "BIEN",
    "asientos": "MAL",
    "tapetes": "BIEN",
    "bocinas": "NO",
    "luces": "BIEN",
    "aire_acondicionado": "MAL",
    "compresor": "NO",
    "antena": "BIEN",
    "copas_rines": "NO",
    "bateria": "BIEN",
    "carburador": "NO",
    "filtro_aire": "MAL",
    "distribuidor": "BIEN",
    "bujias_cables": "NO",
    "bobina": "BIEN",
    "gasolina": "M",
    "motor": "F",
    "ventilador": "E",
    "numerador": "F",
    "bomba_agua": "M",
    "observaciones": "Vehículo sin daños visibles. Revisado el 25 de abril de 2025."
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