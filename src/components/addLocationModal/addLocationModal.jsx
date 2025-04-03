import { useEffect, useState } from "react";
import {
  agregarUbicacion,
  editarUbicacion,
} from "../../features/ubicaciones/ubicacionesService";
import "./modal.css";

export default function AgregarUbicacion({
  onUbicacionAgregada,
  ubicacionEditando,
  onUbicacionEditada,
  modalAbierto,
  onCerrar,
}) {
  const [nombreUbicacion, setNombreUbicacion] = useState("");

  useEffect(() => {
    setNombreUbicacion(
      ubicacionEditando ? ubicacionEditando.nombre_ubicacion : ""
    );
  }, [ubicacionEditando]);

  const handleGuardarUbicacion = async () => {
    if (!nombreUbicacion.trim()) {
      alert("Por favor, ingresa un nombre válido.");
      return;
    }

    if (ubicacionEditando) {
      const respuesta = await editarUbicacion(ubicacionEditando.id_ubicacion, {
        nombre_ubicacion: nombreUbicacion,
      });

      if (respuesta.status === "success") {
        onUbicacionEditada();
      } else {
        alert("Hubo un error al editar la ubicación.");
      }
    } else {
      const respuesta = await agregarUbicacion({
        nombre_ubicacion: nombreUbicacion,
      });

      if (respuesta.status === "success") {
        onUbicacionAgregada();
      } else {
        alert("Hubo un error al agregar la ubicación.");
      }
    }

    onCerrar();
  };

  return (
    modalAbierto && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>
            {ubicacionEditando ? "Editar ubicación" : "Agregar ubicación"}
          </h2>
          <input
            type="text"
            id="btn_add_location"
            placeholder="Nombre de la ubicación"
            value={nombreUbicacion}
            onChange={(e) => setNombreUbicacion(e.target.value)}
          />

          <div className="modal-buttons">
            <button onClick={onCerrar} className="btn btn-cancel">
              Cancelar
            </button>
            <button className="btn btn-save" onClick={handleGuardarUbicacion}>
              Guardar
            </button>
          </div>
        </div>
      </div>
    )
  );
}
