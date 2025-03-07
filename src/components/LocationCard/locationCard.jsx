import "./locationCard.css";
const LocationCard = ({ count, icon: Icon, location, className }) => {
  return (
    <div className={className || "location-card"}>
      {/* Número de notificación */}
      <span className="notification-badge">{count}</span>

      {/* Icono de ubicación */}
      <div className="icon-container">
        <Icon fill="red" />
      </div>

      {/* Nombre de la ubicación */}
      <p className="location-name">{location}</p>
    </div>
  );
};

export default LocationCard;
