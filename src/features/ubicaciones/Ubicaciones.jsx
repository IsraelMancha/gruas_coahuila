import { useState, useEffect } from "react";
import LocationCard from "../../components/LocationCard/locationCard";
import locationIcon from "../../assets/icons/locationIcon";
import AgregarUbicacion from "../../components/addLocationModal/addLocationModal";
import "../../components/btnAdd/btnAdd.css";
import { obtenerUbicaciones, agregarUbicacion } from "./ubicacionesService";
import "./ubicaciones.css";

const Ubicaciones = () => {
  // Crear el estado para almacenar las ubicaciones
  const [ubicaciones, setUbicaciones] = useState([]);

  // Usar useEffect para llamar a la función obtenerUbicaciones cuando el componente se monte
  useEffect(() => {
    const fetchUbicaciones = async () => {
      const data = await obtenerUbicaciones(); // Obtener las ubicaciones
      console.log(data); // Imprimir los datos en la consola
      setUbicaciones(data); // Actualizar el estado con las ubicaciones obtenidas
    };

    fetchUbicaciones(); // Llamar la función para obtener las ubicaciones
  }, []); // El array vacío asegura que solo se ejecute una vez al montar el componente

  return (
    <div>
      <div className="page-title">
        <h1>Ubicaciones</h1>
      </div>
      <div className="btn-add-container">
        <AgregarUbicacion />
      </div>
      <div className="location-cards-container">
        {/* Recorrer el array de ubicaciones y renderizar un componente LocationCard por cada una */}
        {ubicaciones.map((ubicacion) => (
          <LocationCard
            key={ubicacion.id_ubicacion}
            count={ubicacion.count || 0}
            icon={locationIcon}
            location={ubicacion.nombre_ubicacion}
          />
        ))}
      </div>
    </div>
  );
};

export default Ubicaciones;
