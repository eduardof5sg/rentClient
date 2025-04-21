<script>
    import "../../app.css"
    import Navbar from "$lib/componentes/navbar.svelte";
    import { onMount } from 'svelte';
    import apiDelivery from '$lib/endpoints/axiosDelivery'; // Asegúrate de importar el archivo con tu configuración de axios
  
    let alquileres = []; // Aquí guardaremos los alquileres que obtenemos del backend
    let historiales =[];
    let error = ''; // Para manejar posibles errores
    let textoIncidencia = '';
    let modalConfirmar = false
    let modalHistorial = false
    let modalIncidencia = false
    let alquilerSeleccionado = null;
    let historialSeleccionado = null;

    const abrirModal = (alquiler)=>{
      alquilerSeleccionado = alquiler;
      
      modalConfirmar = true;
    }

    function cerrarModal (){
      modalConfirmar = false
    }

    const abrirModalHistorial= () =>{
      modalHistorial = true;
      
    }

    const cerrarModalHistorial = () =>{
      modalHistorial = false;
    }

    const abriModalIncidencia = (historial)=>{
      historialSeleccionado = historial
      modalIncidencia = true;      
      console.log(historialSeleccionado)
    }

    const cerrarModalIncidencia = ()=>{
      
      modalIncidencia = false;      
    }
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

    const estadoReparto = async (alquilerId) => {
    try {
    const token = localStorage.getItem('token'); // Obtenemos el token desde localStorage
    if (!token) {
      error = "No se encontró el token de autenticación.";
      return;
    }

    // Realizamos la solicitud con el token en la cabecera
    const response = await apiDelivery.put(
      `/reparto/${alquilerId}`,// URL correcta para el PUT
      {},// No se está enviando un cuerpo, así que pasamos `null`
      {
        headers: {
          Authorization: `Bearer ${token}`, // Enviamos el token en el header 'Authorization'
        },
      }
    );

    console.log("Respuesta de la solicitud:", response); 
    modalConfirmar = false// Verifica la respuesta del servidor
    alert('El pedido está listo para su expedición');
  } catch (err) {
    console.error("❌ Error al cambiar el estado:", err); // Detalles del error
    error = 'Error al cambiar a modo reparto';
  }
    };
    
    const historialPedidos = async() =>{
      try {
        const token = localStorage.getItem('token'); // Obtenemos el token desde localStorage
  
        // Asegúrate de que el token esté presente
        if (!token) {
          error = "No se encontró el token de autenticación.";
          return;
        }
  
        // Realizamos la solicitud con el token en la cabecera
        const response = await apiDelivery.get('/historial', {
          headers: {
            Authorization: `Bearer ${token}`, // Enviamos el token en el header 'Authorization'
          },
        });
        
        historiales = response.data.reparto; // Guardamos los alquileres en el array
        console.log(historiales)
      } catch (err) {
        error = 'Error al obtener los alquileres.'; // Manejo de errores
        // Mostrar detalles del error
      }
    }
    const reportarIncidencia = async(historialId)=>{
      try {
    const token = localStorage.getItem('token'); // Obtenemos el token desde localStorage
    if (!token) {
      error = "No se encontró el token de autenticación.";
      return;
    }

    // Realizamos la solicitud con el token en la cabecera
    const response = await apiDelivery.put(
      `/incidencias/${historialId}`,// URL correcta para el PUT
      {incidencia:textoIncidencia},// No se está enviando un cuerpo, así que pasamos `null`
      {
        headers: {
          Authorization: `Bearer ${token}`, // Enviamos el token en el header 'Authorization'
        },
      }
    );

    
    modalIncidencia = false
    textoIncidencia = '';
    alert('Incidencia añadida correctamente');
  } catch (err) {
    
    error = 'Error al añadir la incidencia';
  }
    }
    // Ejecutar obtenerAlquileres cuando el componente se monte
    onMount(() => {
      obtenerAlquileres();
      historialPedidos();
    });
  </script>
  
  <main class=" bg-gray-50 min-h-screen">
    <Navbar />
    <div class="flex flex-col items-center">
      <h1 class="text-3xl font-bold mb-4 mt-4 text-center text-gray-800">Alquileres Confirmados</h1>
    <button on:click={() =>abrirModalHistorial()} class="p-2 bg-violet-600 rounded-xl shadow-md text-white mb-4">Historial de pedidos</button>
    </div>
    
    {#if error}
      <p class="text-red-600 text-center mb-4">{error}</p>
    {/if}
  
    {#if alquileres.length === 0}
      <p class="text-center text-gray-600 mt-4">No se encontraron alquileres.</p>
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
                  <button
                    class="text-green-600 p-1 bg-gray-200 rounded-xl"
                    on:click={() => abrirModal(alquiler)}
                  >
                    {alquiler.estado}
                  </button>
                </td>
              </tr>
              
            {/each}
          </tbody>
        </table>
        {#if modalConfirmar && alquilerSeleccionado}
        <div class=" fixed inset-0 flex justify-center items-center bg-black/50 ">
          <div class="bg-white p-6 w-auto relative flex items-center flex-col ">
            <p class="text-xl mb-3">Cambiar estado a reparto ?</p>
            <div class="flex flex-row gap-8">
              <button class="p-2 bg-red-500 rounded-xl text-white" on:click={cerrarModal}>Cancelar</button>
              <button class="p-2 bg-indigo-600 rounded-xl text-white" on:click={() => estadoReparto(alquilerSeleccionado._id)}>Confirmar</button>
            </div>
          </div>
        </div>
        {/if}
      </div>
    {/if}
    {#if modalHistorial}
    <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4">
        <div class="flex flex-row justify-around">
          <h2 class="text-xl text-center bg-violet-700 text-white rounded-xl p-2 ">Historial de pedidos</h2>
          <button class="absolute top-10 right-6 text-white" on:click={() =>cerrarModalHistorial()}
        >✖</button
      >
        </div>
        {#each historiales as historial}
          <div class="bg-gray-100 shadow rounded-md p-4">
            <h2 class="text-lg font-bold mb-2 text-gray-800">Detalles del pedido</h2>
            <div class="space-y-2">
              <div class="flex justify-between border-b pb-1">
                <span class="font-semibold text-gray-600">Juego:</span>
                <span>{historial.juegoid}</span>
              </div>
              <div class="flex justify-between border-b pb-1">
                <span class="font-semibold text-gray-600">Estado:</span>
                <span class="text-violet-700">{historial.estado}</span>
              </div>     
              
              <div class="flex justify-between border-b pb-1">
                <span class="font-semibold text-gray-600">Direccion entrega:</span>
                <span>{historial.cliente.direccion}</span>
              </div>
              <div class="flex justify-between border-b pb-1">
                <span class="font-semibold text-gray-600">Direccion de Recogida</span>
                <span>{historial.propietario.direccion}</span>
              </div>
              {#if historial.fechainicio && historial.fechafin}
                <div class="flex justify-between border-b pb-1">
                  <span class="font-semibold text-gray-600">Inicio:</span>
                  <span>{historial.fechainicio}</span>
                </div>
                <div class="flex justify-between border-b pb-1">
                  <span class="font-semibold text-gray-600">Fin:</span>
                  <span>{historial.fechafin}</span>
                </div>
              {/if}
              <div class="flex justify-between">
                <span class="font-semibold text-gray-600">Semanas:</span>
                <span>{historial.semanas}€</span>
              </div>
              <div class="flex justify-between">
                <span class="font-semibold text-gray-600">Precio:</span>
                <span>{historial.preciofinal}€</span>
              </div>
            </div>
            <button class="bg-red-500 text-white p-2 rounded-xl mt-2 px-10 ml-8" on:click={()=>abriModalIncidencia(historial)}>Repotar incidencia</button>
          </div>
        {/each}
      </div>
      {#if modalIncidencia}
      <div class="fixed inset-0 flex justify-center items-center bg-black/50">
        <div class="bg-white p-6 w-auto relative flex items-center flex-col gap-4">
          <p class="text-xl mb-3">Enviar incidencia</p>
    
          <textarea
            bind:value={textoIncidencia}
            placeholder="Describe la incidencia..."
            class="border border-gray-300 rounded p-2 w-full min-w-[300px] min-h-[100px] resize-none"
          ></textarea>
    
          <div class="flex flex-row gap-8 mt-4">
            <button class="p-2 bg-red-500 rounded-xl text-white" on:click={cerrarModalIncidencia}>Cancelar</button>
            <button class="p-2 bg-indigo-600 rounded-xl text-white" on:click={() => reportarIncidencia(historialSeleccionado._id)}>Confirmar</button>
          </div>
        </div>
      </div>
    {/if}
    </div>
  {/if}
   
  </main>
  
  