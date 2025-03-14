import { useState } from "react";
import { agregarUbicacion } from "../../features/ubicaciones/ubicacionesService";
import "./modal.css";

export default function AgregarUbicacion() {
  const [isOpen, setIsOpen] = useState(false);
  const [nombreUbicacion, setNombreUbicacion] = useState(""); // Estado para el input

  const handleAgregarUbicacion = async () => {
    if (!nombreUbicacion.trim()) {
      alert("Por favor, ingresa un nombre válido.");
      return;
    }

    // Preparamos el objeto con la clave correcta para enviar al servidor
    const nuevaUbicacion = { nombre_ubicacion: nombreUbicacion };

    // Llamamos al servicio para agregar la ubicación
    const respuesta = await agregarUbicacion(nuevaUbicacion);
    console.log("Respuesta del servidor:", respuesta);

    if (respuesta.status === "success") {
      // Verificar si la respuesta indica éxito
      setIsOpen(false); // Cerrar modal solo si la inserción fue exitosa
      setNombreUbicacion(""); // Limpiar input
    } else {
      alert("Hubo un error al agregar la ubicación."); // Mostrar mensaje si hubo error
    }
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)} className="btn">
        Agregar
      </button>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Agregar Ubicación</h2>
            <input
              type="text"
              placeholder="Nombre de la ubicación"
              value={nombreUbicacion}
              onChange={(e) => setNombreUbicacion(e.target.value)} // Guardar el valor del input
            />

            <div className="modal-buttons">
              <button
                onClick={() => setIsOpen(false)}
                className="btn btn-cancel"
              >
                Cancelar
              </button>
              <button className="btn btn-save" onClick={handleAgregarUbicacion}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
