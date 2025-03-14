import urlAPI from "../../API/urlAPI";
console.log("urlAPI", urlAPI);

const obtenerUbicaciones = async () => {
  try {
    const response = await fetch(
      `${urlAPI}/gruas_coahuila/src/API/ubicaciones/obtenerUbicaciones.php?accion=obtener`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // Convertir la respuesta a JSON
    console.log("saquen la dataaaa", data);
    return data;
  } catch (error) {
    console.error("Error al obtener ubicaciones:", error);
    return []; // Retorna un array vacío en caso de error
  }
};

const agregarUbicacion = async (ubicacion) => {
  console.log("ubicacion", ubicacion);

  try {
    const response = await fetch(
      `${urlAPI}/gruas_coahuila/src/API/ubicaciones/insertarUbicacion.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ubicacion),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("Respuesta de la API:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error al agregar ubicación:", error);
    return { error: "Error al agregar ubicación" };
  }
};

export { obtenerUbicaciones, agregarUbicacion };
