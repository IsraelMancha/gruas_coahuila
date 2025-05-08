import { urlAPI } from "../../API/urlAPI";

export const login = async ({ email, password }) => {
  try {
    const params = new URLSearchParams({ email, password });
    const response = await fetch(
      `${urlAPI}/gruas_coahuila/src/API/Login/verificarUsuario.php?${params.toString()}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en authService:", error);
    return { success: false, message: "Error de conexión con el servidor" };
  }
};
