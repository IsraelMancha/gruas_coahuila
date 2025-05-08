import React, { useState } from "react";
import { login as loginService } from "./authService";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo_gc.png";
import "../../styles/loginStyles.css";
import "../../styles/globalStyles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [rol, setRol] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginService({ email, password });
      setRol(response.rol);

      if (response.success) {
        login(response);
        localStorage.setItem("user", JSON.stringify(response));
        navigate("/ubicaciones");
      } else {
        setError(response.message || "Credenciales inválidas");
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <div className="container-login">
      <div className="logo-container">
        <img src={logo} alt="logotipo de Gruas Coahuila" />
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="inputs-container">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="login-button">
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
