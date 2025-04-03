import { useState, useEffect } from "react";
import LocationCard from "../../components/LocationCard/locationCard";
import locationIcon from "../../assets/icons/locationIcon";
import AgregarUbicacion from "../../components/addLocationModal/addLocationModal";
import "../../components/btnAdd/btnAdd.css";
import { obtenerUbicaciones, eliminarUbicacion } from "./ubicacionesService";
import "./ubicaciones.css";

const Ubicaciones = () => {
  // Crear el estado para almacenar las ubicaciones
  const [ubicaciones, setUbicaciones] = useState([]);
  const [ubicacionEditando, setUbicacionEditando] = useState(null);

  const [modalAbierto, setModalAbierto] = useState(false);

  useEffect(() => {
    fetchUbicaciones();
  }, []);

  const fetchUbicaciones = async () => {
    const data = await obtenerUbicaciones();
    setUbicaciones(data);
  };

  const handleUbicacionAgregada = async () => {
    await fetchUbicaciones();
  };

  const handleEdit = (id_ubicacion) => {
    const ubicacion = ubicaciones.find((u) => u.id_ubicacion === id_ubicacion);
    setUbicacionEditando(ubicacion);
    setModalAbierto(true);
  };
  const handleCerrarModal = () => {
    setUbicacionEditando("");
    setModalAbierto(false);
  };

  const handleDelete = async (id_ubicacion) => {
    alert("¿Seguro que deseas eliminar esta ubicación?");
    const respuesta = await eliminarUbicacion(id_ubicacion);
    if (respuesta.status === "success") {
      await fetchUbicaciones();
    } else {
      alert("Hubo un error al editar la ubicación.");
    }
  };

  return (
    <div>
      <div className="page-title">
        <h1>Ubicaciones</h1>
      </div>
      <div className="btn-add-container">
        <button
          onClick={() => {
            setUbicacionEditando(null);
            setModalAbierto(true);
          }}
          className="btn"
        >
          Agregar Ubicación
        </button>

        <AgregarUbicacion
          onUbicacionAgregada={handleUbicacionAgregada}
          ubicacionEditando={ubicacionEditando}
          onUbicacionEditada={fetchUbicaciones}
          onCerrar={handleCerrarModal}
          modalAbierto={modalAbierto}
        />
      </div>
      <div className="layout-container">
        <div className="location-cards-container">
          {ubicaciones.map((ubicacion) => (
            <div
              key={ubicacion.id_ubicacion}
              onClick={() => {
                console.log("Click sobre card", ubicacion.nombre_ubicacion);
              }}
            >
              <LocationCard
                key={ubicacion.id_ubicacion}
                count={ubicacion.count || 0}
                icon={locationIcon}
                location={ubicacion.nombre_ubicacion}
              />
            </div>
          ))}
        </div>
        <div className="location-table-container">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Registros actuales</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {ubicaciones.map((ubicacion) => (
                <tr key={ubicacion.id_ubicacion}>
                  <td>{ubicacion.nombre_ubicacion}</td>
                  <td>{ubicacion.count}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(ubicacion.id_ubicacion)}
                    >
                      Editar
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(ubicacion.id_ubicacion)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Ubicaciones;
