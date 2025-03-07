<?php

echo "El archivo de conexión se está ejecutando."; // Verifica que el archivo se está ejecutando.

class Database
{
    private $conn;

    public function connect()
    {
        $this->conn = null;
        try {
            // Usar las variables directamente aquí
            $this->conn = new PDO(
                "mysql:host=localhost;dbname=gruas_coahuila",  // Datos directamente
                "root",                                       // Usuario
                ""                                            // Contraseña
            );
            echo "Conexión exitosa"; // Si no ves este mensaje, es un problema de conexión.
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Error al conectar: " . $e->getMessage();
        }

        return $this->conn;
    }
}

?>