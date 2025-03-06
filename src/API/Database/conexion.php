<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);


echo "El archivo de conexión se está ejecutando."; // Deberías ver esto si se está ejecutando el archivo.


require_once __DIR__ . '/../../../vendor/autoload.php';


use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/../../../'); // Esto sube 4 directorios


$dotenv->load();

echo "DB_HOST: " . getenv('DB_HOST') . "\n"; // Utiliza getenv() en lugar de $_ENV


class Database
{
    private $conn;

    public function connect()
    {
        $this->conn = null;
        try {
            $this->conn = new PDO(
                "mysql:host=" . $_ENV['DB_HOST'] . ";dbname=" . $_ENV['DB_NAME'],
                $_ENV['DB_USER'],
                $_ENV['DB_PASS']
            );
            echo "Conexión exitosa"; // Si no ves este mensaje, es un problema de conexión.
        } catch (PDOException $e) {
            echo "Error al conectar: " . $e->getMessage();
        }


        return $this->conn;
    }
}

?>