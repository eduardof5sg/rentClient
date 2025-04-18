<script>
    import { onMount } from 'svelte';
    import Navbar from '$lib/componentes/navbar.svelte';
    import apiAlquiler from '$lib/endpoints/axios.alquiler.js';
    export let data;
    const {datos,alquileres} = data
    let tabActivo = 'datos';
    console.log(data)

    const cambiarTab = (tab) =>{
        tabActivo = tab;
    }

    async function confirmarAlquiler(solicitudId){
        try {
            const res = await apiAlquiler.put(`/confirmar/${solicitudId}`)
            alert("Solicitud confirmada ✅");
         location.reload(); // refresca la página
        } catch (error) {
            alert("Hubo un problema al confirmar");
        }
    }
</script>
<Navbar />
<main class="p-2">
    <!-- Barra superior tipo tabs -->
    <div class="flex space-x-4 border-b pb-2 mb-6 overflow-y-auto">
      <button 
        class="px-4 py-2 font-semibold rounded-t hover:bg-gray-100 transition"
        class:bg-black={tabActivo === 'datos'}
        class:text-white={tabActivo === 'datos'}
        on:click={() => cambiarTab('datos')}
      >
        Datos
      </button>
      <button 
        class="px-4 py-2 font-semibold rounded-t hover:bg-gray-100 transition"
        class:bg-black={tabActivo === 'juegos'}
        class:text-white={tabActivo === 'juegos'}
        on:click={() => cambiarTab('juegos')}
      >
        Juegos
      </button>
      <button 
        class="px-4 py-2 font-semibold rounded-t hover:bg-gray-100 transition"
        class:bg-black={tabActivo === 'pedidos'}
        class:text-white={tabActivo === 'pedidos'}
        on:click={() => cambiarTab('pedidos')}
      >
        Pedidos
      </button>
      <button 
        class="px-4 py-2 font-semibold rounded-t hover:bg-gray-100 transition"
        class:bg-black={tabActivo === 'solicitudes'}
        class:text-white={tabActivo === 'solicitudes'}
        on:click={() => cambiarTab('solicitudes')}
      >
        Solicitudes
      </button>
      <button 
        class="px-4 py-2 font-semibold rounded-t hover:bg-gray-100 transition"
        class:bg-black={tabActivo === 'logros'}
        class:text-white={tabActivo === 'logros'}
        on:click={() => cambiarTab('logros')}
      >
        Logros
      </button>
    </div>
  
    <!-- Contenido dinámico según tab activo -->
    <div class="bg-white p-2 rounded shadow-md min-h-[200px]">
      {#if tabActivo === 'datos'}
      <div class="flex flex-col items-center">
        <h2 class="text-xl font-bold text-gray-600"> Datos personales 🧑</h2>
        <table class="min-w-full bg-white rounded-lg shadow overflow-hidden mt-4">
            <tbody class="divide-y divide-gray-200">
              <tr>
                <td class="px-4 py-2 font-semibold text-white bg-gray-600">Nombre:</td>
                <td class="px-4 py-2 bg-gray-200">{datos.nombre}</td>
              </tr>
              <tr>
                <td class="px-4 py-2 font-semibold text-gray-600 ">Apellidos:</td>
                <td class="px-4 py-2">{datos.apellidos}</td>
              </tr>
              <tr>
                <td class="px-4 py-2 font-semibold bg-gray-600 text-white">Estado:</td>
                <td class="px-4 py-2 bg-gray-200">{datos.estadocuenta}</td>
              </tr>
              <tr>
                <td class="px-4 py-2 font-semibold text-gray-600">Dirección:</td>
                <td class="px-4 py-2">{datos.direccion}</td>
              </tr>
              <tr>
                <td class="px-4 py-2 font-semibold bg-gray-600 text-white">Verificación:</td>
                <td class="px-4 py-2 bg-gray-200">
                  {#if datos.verificado}
                    <span class="text-green-600 font-semibold">verificado</span>
                  {:else}
                    <span class="text-red-600 font-semibold"> No verificado</span>
                  {/if}
                </td>
              </tr>
            </tbody>
        </table>
      </div>
        
      {:else if tabActivo === 'juegos'}
        <p class="text-xl font-bold text-green-600">Aquí puedes gestionar tus juegos 🎮</p>
      {:else if tabActivo === 'pedidos'}
        <p class="text-xl font-bold text-yellow-600">Aquí verás tus pedidos 📦</p>
      {:else if tabActivo === 'solicitudes'}
      <div class="flex flex-col items-center">
         <p class="text-xl font-bold text-red-600 text-center">Aquí están tus solicitudes de alquiler 📝</p>
        {#if alquileres.length > 0}
        <div class="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {#each alquileres as alquiler}
            <div class=" bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
              <h2 class=" font-bold text-indigo-700 mb-2 text-center"> {alquiler.juegoid.titulo}</h2>
              <img
                src={alquiler.juegoid.imagenes[0]}
                alt="Imagen del juego"
                class="w-auto object-cover rounded mb-2"
              />
              <p><strong>Cliente:</strong> {alquiler.cliente.nombre}</p>
              <p><strong>Estado:</strong> {alquiler.estado}</p>
              <p><strong>Precio:</strong> {alquiler.preciofinal}€</p>
    
              <button
                class="mt-4 bg-green-600 text-white p-1 rounded hover:bg-green-700"
                on:click={() => confirmarAlquiler(alquiler._id)}
              >
                Confirmar 
              </button>
            </div>
          {/each}
        </div>
      {:else}
        <p class="text-gray-500">No tienes solicitudes por el momento.</p>
      {/if}
      </div>
       
      {:else if tabActivo === 'logros'}
        <p class="text-xl font-bold text-purple-600">Aquí puedes ver tus logros 🏆</p>
      {/if}
    </div>
  </main>