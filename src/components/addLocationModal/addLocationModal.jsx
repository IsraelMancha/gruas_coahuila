import { useState } from "react";
import "./modal.css";

export default function AgregarUbicacion() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)} className="btn">
        Agregar
      </button>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Agregar Ubicación</h2>
            <input type="text" placeholder="Nombre de la ubicación" />

            <div className="modal-buttons">
              <button
                onClick={() => setIsOpen(false)}
                className="btn btn-cancel"
              >
                Cancelar
              </button>
              <button className="btn btn-save">Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
