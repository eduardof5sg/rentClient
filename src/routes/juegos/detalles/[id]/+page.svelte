<script>
    import Navbar from '$lib/componentes/navbar.svelte';
    export let data;
    const {juego, error} = data
    

    let imagenActual = 0;

    const siguiente = () => {
    imagenActual = (imagenActual + 1) % juego.imagenes.length;
    };

    const anterior = () => {
    imagenActual = (imagenActual - 1 + juego.imagenes.length) % juego.imagenes.length;
    };
</script>
<main >
    <Navbar />
    <div class="mt-4 p-4">
       {#if error}
      <p class="text-red-500">{error}</p>
    {:else if juego}
    <div class="flex flex-col items-center ">
        <button class="bg-violet-700 text-white p-2 rounded-xl mb-2 font-bold">Alquilar</button>
        <h1 class="text-2xl font-bold text-blue-800 mb-4">{juego.titulo}</h1>
        <p class="mb-8">"{juego.descripcion}"</p>
        <div class="relative w-64 h-64 mb-4 mx-auto gradient-border 
          {juego.consola === 'ps5' ? 'ps5' : ''}
          {juego.consola === 'xbox' ? 'xbox' : ''}
          {juego.consola === 'nintendo' ? 'nintendo' : ''}"
      >
        <img
          src={juego.imagenes[imagenActual]}
          alt="Imagen del juego"
          class="w-full h-full object-cover rounded shadow-md transition-all duration-300"
        />
        <button on:click={anterior} class="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"></button>
        <button on:click={siguiente} class="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"></button>
      </div>
      <p><strong>Género:</strong> {juego.genero}</p>
      <p><strong>Precio por semana:</strong> {juego.precio}€</p>
      <p><strong>Estado:</strong> {juego.estado}</p>
      <p class:text-green-600={juego.disponibilidad} class:text-red-600={!juego.disponibilidad}>
        {juego.disponibilidad ? "Disponible" : "No disponible"}
      </p> 
    </div>
    {/if} 
    </div>
    
    
  </main>
  <style>
    .gradient-border {
      position: relative;
      padding: 26px;
      border-radius: 0.2rem;
      z-index: 0;
    }
  
    .gradient-border::before {
      content: "";
      position: absolute;
      top: 20px;
      left: 20px;
      right: 20px;
      bottom: 20px;
      border-radius: inherit;
      z-index: -1;
      animation: rotateBorder 12s linear infinite;
    }
  
    /* Estilos para cada consola */
    .ps5::before {
      background: conic-gradient(from 0deg, #2716e2, #ffffff, #2716e2); /* azul-blanco */
    }
  
    .xbox::before {
      background: conic-gradient(from 0deg, #107c10, #ffffff, #107c10); /* verde-blanco */
    }
  
    .nintendo::before {
      background: conic-gradient(from 0deg, #e60012, #ffffff, #43b047, #ffffff, #e60012); /* rojo-blanco-verde */
    }
  
    @keyframes rotateBorder {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  
    .gradient-border > * {
      background: white;
      border-radius: 0.2rem;
      position: relative;
      z-index: 1;
    }
  </style>
  