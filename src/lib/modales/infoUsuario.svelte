<script>
    import { onMount } from "svelte";
    import apiUsers from "$lib/endpoints/axiosUser";
    import apiJuegos from "$lib/endpoints/axiosJuegos";
    import apiReseñas from "$lib/endpoints/axiosReseñas";
    import apiAlquiler from "$lib/endpoints/axios.alquiler";

    // variables que vienen desde el padre
    export let visible = false;
    export let onClose 
    export let usuarioid ;

    let verificacion = '';
    let confianza = '';
    let reviews = [];
    let alquileres = [];
    let imagenVerificado = "/backgrounds/logros/verificado.svg";
    let imagenConfianza = "/backgrounds/logros/confianza.svg";
    let imagenAprendiz ="/backgrounds/logros/aprendiz.svg"
    let fallo = '';

    const infoUsuario = async ()=>{
        try {
            const response = await apiUsers.get(`/datos/${usuarioid}`)
             verificacion = response.data.verificado
             confianza = response.data.usuarioconfianza
        } catch (error) {
            error = error.response?.data?.message
        }
        
    }

    const reseñasUsuario = async () =>{
        try {
            const res = await apiReseñas.get(`/${usuarioid}`)
            reviews = res.data
            
            
        } catch (error) {
            fallo = error.response?.data?.message
        }
    }

    const alquileresUsuario = async() =>{
      try {
        const response = await apiAlquiler.get(`/alquilados/${usuarioid}`)
        alquileres = response.data
      } catch (error) {
        fallo = error.response?.data?.message
      }
    }

    onMount(() => {
    infoUsuario();
    reseñasUsuario();
    alquileresUsuario();
});
    

</script>
<main>
    {#if visible}
    <div class="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div class="relative  p-6 bg-white shadow-lg flex flex-col items-center">
            <div class="flex flex-row justify-around gap-6">
                <h1 class="text-2xl font-bold">Detalles del usuario</h1>
                <button class=" bg-white " on:click={onClose}>✖</button>
            </div>
            <div class="flex flex-col items-center">
               <h1 class="text-2xl text-indigo-700 font-bold mb-3"> Logros</h1>
                <div class="grid grid-cols-3 gap-4 items-center">

                    {#if verificacion === false}
                    <p class="text-red-500">El usuario no está verificado</p>
                    {:else}
                    <div class="flex flex-col mt-3 items-center ">
                        <img class="w-16 mt-4" src={imagenVerificado} alt="icono de usuario verificado">
                        <p class="text-green-600 font-bold text-center mt-4">Usuario verificado</p>
                    </div>
                    {/if}
                
                    {#if confianza === false || !confianza }
                    <p class="text-red-500">El usuario no es de confiar</p>
                    {:else}
                    <div class="flex flex-col mt-3 items-center">
                        <img class="w-24" src={imagenConfianza} alt="icono de usuario confiable">
                        <p class="text-green-600 font-bold text-center">Usuario confiable</p>
                    </div>
                    {/if}

                    {#if  alquileres.length === 0  } 
                    <p class="text-red-600">El usuario aun no ha puesto en alquiler ningun juego</p>
                    {:else if alquileres.length <5}
                    <div class="flex flex-col mt-6 items-center ">
                      <img class="w-20" src={imagenAprendiz} alt="icono de usuario confiable">
                      <p class="text-green-600 font-bold text-center">aprendiz de mercader</p>
                    </div>
                    {/if}
                </div> 
            </div>
            
            <div class="flex flex-col items-center">
                <h1 class="text-2xl text-indigo-700 font-bold mt-4">Reseñas</h1>
                {#if reviews.length >0}
                <div class="p-6 bg-white shadow-md rounded-md space-y-4">
                    {#each reviews as review}
                      <div class="border-b pb-4">
                        <div class="flex items-center justify-between mb-2">
                          <!-- Emisor y Verificado -->
                          <div class="flex items-center gap-2">
                            <p class="font-semibold">{review.emisorid.nombre}</p>
                  
                            {#if review.emisorid.verificado}
                              <span class="text-blue-500 font-bold text-sm flex items-center gap-1">
                                ✔️ <span>Verificado</span>
                              </span>
                            {:else}
                              <span class="text-red-500 font-bold text-sm flex items-center gap-1">
                                ❌ <span>No verificado</span>
                              </span>
                            {/if}
                          </div>
                  
                         
                        </div>
                   <!-- Estrellas -->
                          <div class="flex gap-1">
                            {#each Array(5) as _, i}
                              {#if i < review.puntuacion}
                                <span class="text-yellow-400">★</span>
                              {:else}
                                <span class="text-gray-300">★</span>
                              {/if}
                            {/each}
                          </div>
                        <!-- Mensaje -->
                        <p class="text-gray-700">{review.mensaje}</p>
                      </div>
                    {/each}
                </div>
                {:else}
                <p class=" text-md">"El usuario aun no tiene reseñas"</p>
                {/if}
                
            </div>
            
        </div>
        
    </div>
    {/if}
</main>