import LocationCard from "../../components/LocationCard/locationCard";
import locationIcon from "../../assets/icons/locationIcon";
import AgregarUbicacion from "../../components/addLocationModal/addLocationModal";
import "../../components/btnAdd/btnAdd.css";
import "./ubicaciones.css";

const Ubicaciones = () => {
  // crear alguna variable o estado que contenga la información de las ubicaciones

  return (
    <div>
      <div className="page-title">
        <h1>Ubicaciones</h1>
      </div>
      <div className="btn-add-container">
        <AgregarUbicacion />
      </div>
      <div className="location-cards-container">
        <LocationCard count={5} icon={locationIcon} location="Piedras Negras" />
        <LocationCard count={10} icon={locationIcon} location="Nava" />
        <LocationCard count={3} icon={locationIcon} location="V. Carranza" />
        <LocationCard count={5} icon={locationIcon} location="Morelos" />
        <LocationCard count={10} icon={locationIcon} location="Acuña" />
        <LocationCard count={3} icon={locationIcon} location="Rosita" />
        <LocationCard count={3} icon={locationIcon} location="Múzquiz" />
      </div>
    </div>
  );
};

export default Ubicaciones;
