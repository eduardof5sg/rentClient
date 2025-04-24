<script>
    import { onMount } from "svelte";
    import apiJuegos from "$lib/endpoints/axiosJuegos";
    import FiltrosJuegos from "$lib/componentes/filtrosJuegos.svelte";
  
    export let visible = false;
    export let onClose;
    // Variable filtros
    let filtroCodigoPostal = "";
    let filtroDisponibilidad = "";
    let filtroGenero = "";
    let nombreJuego = "";
    //
    let juegos = [];
    let codigoPostalToken = null;

    $: juegosFiltrados = juegos.filter(juego => {
      const coincideCodigoPostal = filtroCodigoPostal
    ? juego.userid?.codigopostal?.toString().startsWith(filtroCodigoPostal)
    : true;
    const coincideDisponibilidad = filtroDisponibilidad !== ""
      ? (filtroDisponibilidad === "true" ? juego.disponibilidad : !juego.disponibilidad)
      : true;
    const coincideGenero = filtroGenero ? juego.genero?.toLowerCase().includes(filtroGenero.toLowerCase()) : true;
    const coincideBusqueda = juego.titulo?.toLowerCase().includes(nombreJuego.toLowerCase());

    return coincideCodigoPostal && coincideDisponibilidad && coincideGenero && coincideBusqueda;
    });

    const actualizarFiltro = () => {
    // Reactividad automática, no necesitas hacer nada aquí por ahora
    };
  
    onMount(() => {
      const token = localStorage.getItem("token");
  
      if (token) {
        try {
          // Decodificar el token (solo el payload)
          const payload = JSON.parse(atob(token.split(".")[1])); // Decodificamos el payload
          codigoPostalToken = payload.codigopostal; // Obtener el código postal
          
        } catch (err) {
          console.error("Error al decodificar token:", err);
        }
      }
  
      // Cargar los juegos
      apiJuegos.get("?consola=NintendoSwitch")
        .then(response => {
          juegos = response.data;
          
        })
        .catch(error => {
          console.error("Error al cargar juegos de PS5", error);
        });
    });
  
    // Función para verificar si el código postal coincide
    const verificarZona = (codigoPostalJuego) => {
      return codigoPostalJuego === codigoPostalToken;
    };
  </script>
  
  {#if visible}
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div class="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 relative border-4 border-black">
        <button
          class="absolute top-3 right-3 text-xl text-gray-600 hover:text-black"
          on:click={() =>onClose()}
        >
          ✕
        </button>
  
        <h2 class="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-[#FF2D55]  to-[#0A84FF] bg-clip-text text-transparent">
          Juegos NintendoSwitch
        </h2>
  
        {#if juegos.length > 0}
            <FiltrosJuegos
            bind:filtroCodigoPostal
            bind:filtroDisponibilidad
            bind:filtroGenero
            bind:nombreJuego
            onChange={actualizarFiltro}
          />
          <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {#each juegosFiltrados as juego}
              <div class="bg-white p-2 rounded-lg shadow hover:shadow-md transition max-w-38 flex flex-col items-center">
                <p class="text-sm font-bold mb-2">
                  {#if verificarZona(juego.userid.codigopostal)}
                    <span class="text-green-500">En tu zona</span>
                  {:else}
                    <span class="text-red-500">Fuera de zona</span>
                  {/if}
                </p>
                <img src={juego.imagenes[0]} alt={juego.titulo} class="rounded mb-2 w-full h-26 "/>
                <h3 class="font-semibold text-md text-red-700 text-center">{juego.titulo}</h3>
                <p class="text-xl text-gray-600 font-bold">{juego.precio}€</p>
                <p class="text-sm font-bold">usuario</p>
                <p
                  class="text-sm"
                  class:text-green-500={juego.userid.verificado}
                  class:text-red-500={!juego.userid.verificado}
                >
                  {juego.userid.verificado ? "Verificado" : "Sin verificar"}
                </p>
                <p class="font-bold">juego:</p>
                <p class="text-sm"
                  class:text-green-500={juego.disponibilidad} 
                  class:text-red-500={!juego.disponibilidad}>
                  {juego.disponibilidad ? "Disponible" : "No disponible"}
                </p>
  
                <!-- Mensaje de Zona -->
                
                
                <button
                  class="p-1 bg-orange-700 text-white rounded-xl mt-2"
                  on:click={() => window.location.href = `/juegos/detalles/${juego._id}`}
                >
                  Ir al juego
                </button>
              </div>
            {/each}
          </div>
        {:else}
          <p>No hay juegos disponibles para esta consola.</p>
        {/if}
      </div>
    </div>
  {/if}