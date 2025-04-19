import apiUsers from "$lib/endpoints/axiosUser";
import apiAlquiler from "$lib/endpoints/axios.alquiler.js";
import apiJuegos from "$lib/endpoints/axiosJuegos.js";
export async function load({ params }) {
  const { id } = params;

  let datos = null;
  let alquileres = [];
  let juegos = [];
  let mensajeErrorJuegos = "";

  try {
    const datosResponse = await apiUsers.get(`/datos/${id}`);
    datos = datosResponse.data;
  } catch (error) {
    console.error("Error al obtener datos del usuario:", error);
  }

  try {
    const alquilerResponse = await apiAlquiler.get(`/solicitudes/${id}`);
    alquileres = alquilerResponse.data;
  } catch (error) {
    console.error("Error al obtener solicitudes de alquiler:", error);
  }

  try {
    const juegosResponse = await apiJuegos.get(`/${id}`);
    juegos = juegosResponse.data
  } catch (error) {
    console.log(error)
    mensajeErrorJuegos = error.response?.data?.message || "No tienes juegos"
  }

  return {
    datos,
    alquileres,
    juegos,
    mensajeErrorJuegos
  };
}
