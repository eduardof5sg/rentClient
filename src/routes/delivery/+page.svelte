<script>
    import "../../app.css"
    import { onMount } from 'svelte';
    import apiDelivery from '$lib/endpoints/axiosDelivery'; // Asegúrate de importar el archivo con tu configuración de axios
  
    let alquileres = []; // Aquí guardaremos los alquileres que obtenemos del backend
    let error = ''; // Para manejar posibles errores
  
    // Función para obtener alquileres según el código postal
    const obtenerAlquileres = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtenemos el token desde localStorage
  
        // Asegúrate de que el token esté presente
        if (!token) {
          error = "No se encontró el token de autenticación.";
          return;
        }
  
        // Realizamos la solicitud con el token en la cabecera
        const response = await apiDelivery.get('/reparto', {
          headers: {
            Authorization: `Bearer ${token}`, // Enviamos el token en el header 'Authorization'
          },
        });
        
        alquileres = response.data; // Guardamos los alquileres en el array
        console.log(alquileres)
      } catch (err) {
        error = 'Error al obtener los alquileres.'; // Manejo de errores
        // Mostrar detalles del error
      }
    };
  
    // Ejecutar obtenerAlquileres cuando el componente se monte
    onMount(() => {
      obtenerAlquileres();
    });
  </script>
  
  <main class="p-8 bg-gray-50 min-h-screen">
    <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">Alquileres Confirmados</h1>
  
    {#if error}
      <p class="text-red-600 text-center mb-4">{error}</p>
    {/if}
  
    {#if alquileres.length === 0}
      <p class="text-center text-gray-600">No se encontraron alquileres.</p>
    {:else}
      <div class="overflow-x-auto">
        <table class="min-w-full table-auto bg-white rounded-lg shadow-md border border-gray-200">
          <thead>
            <tr class="bg-gray-200 text-gray-700 text-sm">
              <th class="px-4 py-2 text-left">Propietario</th>
              <th class="px-4 py-2 text-left">Teléfono</th>
              <th class="px-4 py-2 text-left">Dirección de Recogida</th>
              <th class="px-4 py-2 text-left">Cliente</th>
              <th class="px-4 py-2 text-left">Teléfono</th>
              <th class="px-4 py-2 text-left">Dirección de Entrega</th>
              <th class="px-4 py-2 text-left">Estado</th>
            </tr>
          </thead>
          <tbody>
            {#each alquileres as alquiler}
              <tr class="border-t border-gray-200">
                <td class="px-4 py-2">{alquiler.propietario?.nombre} {alquiler.propietario?.apellidos}</td>
                <td class="px-4 py-2">{alquiler.propietario?.telefono}</td>
                <td class="px-4 py-2">{alquiler.propietario?.direccion}</td>
                <td class="px-4 py-2">{alquiler.cliente?.nombre} {alquiler.cliente?.apellidos}</td>
                <td class="px-4 py-2">{alquiler.cliente?.telefono}</td>
                <td class="px-4 py-2">{alquiler.cliente?.direccion}</td>
                <td class="px-4 py-2">
                  <span class="inline-block px-3 py-1 text-xs font-semibold rounded-full
                    {alquiler.estado === 'confirmado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                    {alquiler.estado}
                  </span>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </main>
  
  