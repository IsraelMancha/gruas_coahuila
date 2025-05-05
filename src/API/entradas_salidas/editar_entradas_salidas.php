<?php
header("Access-Control-Allow-Origin: *"); // Permite todos los orígenes (para producción, especifica tu dominio)
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

include '../Database/conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Leer y decodificar el cuerpo de la solicitud JSON
    $data = json_decode(file_get_contents('php://input'), true);

    // Validaciones básicas
    if (!$data || !isset($data['tabla']) || !isset($data['campos']) || !isset($data['condiciones'])) {
        echo json_encode(['status' => 'error', 'message' => 'Datos insuficientes para la actualización']);
        exit();
    }

    // COMO ENVIAR LOS DATOS DESDE EL FRONT:

    // OJO -> De esta forma la fecha_hora se actualiza automaticamente current timestamp, pero se puede enviar manualmente
//     {
//   "tabla": "entradas_salidas",
//   "campos": {
//     "kilometraje": "13000",
//     "nivel_gasolina": "3/4",
//    "tipo_movimiento": "salida" 
//   },
//   "condiciones": {
//     "id_grua": 1
//   }
// }



    $tabla = $data['tabla'];
    $campos = $data['campos'];          // Campos a actualizar
    $condiciones = $data['condiciones']; // Condiciones del WHERE

    // Validar nombre de la tabla (seguridad básica)
    if (!preg_match('/^[a-zA-Z_]+$/', $tabla)) {
        echo json_encode(['status' => 'error', 'message' => 'Nombre de tabla inválido']);
        exit();
    }

    // Preparar partes dinámicas
    $set = implode(', ', array_map(function ($col) {
        return "$col = ?";
    }, array_keys($campos)));
    $where = implode(' AND ', array_map(function ($col) {
        return "$col = ?";
    }, array_keys($condiciones)));

    $valores = array_merge(array_values($campos), array_values($condiciones));

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

    $query = "UPDATE $tabla SET $set WHERE $where";
    $stmt = $conn->prepare($query);

    if (!$stmt) {
        echo json_encode(['status' => 'error', 'message' => 'Error al preparar la consulta']);
        exit();
    }

    $stmt->bind_param($tipos, ...$valores);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Registro actualizado correctamente']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error al actualizar el registro']);
    }
}


// Cerrar la conexión
$conn->close();
?>