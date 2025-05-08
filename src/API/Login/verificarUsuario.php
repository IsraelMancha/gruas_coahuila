<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include('../Database/conexion.php');

$email = isset($_GET['email']) ? $_GET['email'] : '';
$password = isset($_GET['password']) ? $_GET['password'] : '';

if (!$email || !$password) {
    echo json_encode([
        "success" => false,
        "message" => "Faltan datos de inicio de sesión"
    ]);
    exit;
}

// Verificar si existe el usuario
$stmt = $conn->prepare("SELECT * FROM usuarios WHERE email = ? LIMIT 1");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($user = $result->fetch_assoc()) {
    // Validar con password_verify (para contraseñas hasheadas)
    if (password_verify($password, $user['password'])) {
        echo json_encode([
            "success" => true,
            "user_id" => $user['id_usuario'],
            "nombre" => $user['nombre_usuario'],
            "email" => $user['email'],
            "rol" => $user['rol_usuario'],
            "id_ubicacion" => $user['id_ubicacion']
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Contraseña incorrecta"
        ]);
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "Usuario no encontrado"
    ]);
}

$conn->close();
?>