import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo_gc.png";
import "./sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botón de menú en pantallas pequeñas */}
      <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <img src={logo} alt="logotipo de Gruas Coahuila" />
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/registros" onClick={() => setIsOpen(false)}>
                Registros
              </Link>
            </li>
            <li>
              <Link to="/ubicaciones" onClick={() => setIsOpen(false)}>
                Ubicaciones
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
