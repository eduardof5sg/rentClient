import apiJuegos from "$lib/endpoints/axiosJuegos";

export async function load({params}){

    const {id} = params;
    try {
        const response = await apiJuegos.get(`detalles/${id}`)
        return {
            juego: response.data
        }
    } catch (error) {
        console.error("Error al obtener detalles:", error);
    return {
      juego: null,
      error: "No se pudo cargar el juego."
    };
    }
}