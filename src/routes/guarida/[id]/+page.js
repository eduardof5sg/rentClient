import apiUsers from "$lib/endpoints/axiosUser";
import apiAlquiler from "$lib/endpoints/axios.alquiler.js";

export async function load({ params }) {
  const { id } = params;

  let datos = null;
  let alquileres = [];

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

  return {
    datos,
    alquileres
  };
}
