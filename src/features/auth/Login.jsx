import React from "react";
import logo from "../../assets/logo_gc.png";
import "../../styles/loginStyles.css";
import "../../styles/globalStyles.css";

const Login = () => {
  return (
    <div className="container-login">
      <div className="logo-container">
        <img src={logo} alt="logotipo de Gruas Coahuila" />
      </div>
      <div className="form-container">
        <form action="">
          <div className="inputs-container">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Correo Electrónico"
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Contraseña"
            />
            <button className="login-button">Iniciar Sesión</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
