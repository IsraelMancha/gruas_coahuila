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

    return data;
  } catch (error) {
    console.error("Error al obtener ubicaciones:", error);
    return []; // Retorna un array vacío en caso de error
  }
};

const agregarUbicacion = async (ubicacion) => {
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

const editarUbicacion = async (id_ubicacion, { nombre_ubicacion }) => {
  try {
    const response = await fetch(
      `${urlAPI}/gruas_coahuila/src/API/ubicaciones/editarUbicacion.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_ubicacion,
          nombre_ubicacion: nombre_ubicacion,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error("Error al editar ubicación:", error);
    return { error: "Error al editar ubicación" };
  }
};

const eliminarUbicacion = async (id_ubicacion) => {
  try {
    const response = await fetch(
      `${urlAPI}/gruas_coahuila/src/API/ubicaciones/eliminarUbicacion.php?id_ubicacion=${id_ubicacion}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error("Error al eliminar ubicación:", error);
    return { error: "Error al eliminar ubicación" };
  }
};

export {
  obtenerUbicaciones,
  agregarUbicacion,
  editarUbicacion,
  eliminarUbicacion,
};
