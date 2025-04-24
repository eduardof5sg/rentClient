<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import Navbar from "$lib/componentes/navbar.svelte";
  export let data;
  const { juego, error } = data;
  import apiAlquiler from "$lib/endpoints/axios.alquiler.js";
  import apiUsers from "$lib/endpoints/axiosUser.js";
  import InfoUsuario from "$lib/modales/infoUsuario.svelte";
  
  let imagenActual = 0;
  let mostrarModal = false;
  let semanas = 1;
  let clienteId = "";
  let usuarioConfianza = '';
  let rol ='';
  let mensaje = "";
  let fallo = "";
  let confirmacion = false;
  let modalInfo = false;
  const siguiente = () => {
    imagenActual = (imagenActual + 1) % juego.imagenes.length;
  };

  const anterior = () => {
    imagenActual =
      (imagenActual - 1 + juego.imagenes.length) % juego.imagenes.length;
  };

  const alquilar = () => {
    const token = localStorage.getItem("token");

    // Verificar si el token existe
    if (!token) {
      alert("Debes iniciar sesión para alquilar un juego.");
      goto("/login"); // Redirigir a la página de login
      return;
    }

    try {
      // Decodificar el token y obtener el usuario ID
      const payload = JSON.parse(atob(token.split(".")[1]));
      const usuarioId = payload.userid;

      // Verificar si el usuario es el propietario del juego
      if (juego.userid === usuarioId) {
        alert("Ya eres propietario de este juego.");
        return; // No continuar con el alquiler
      }
    } catch (err) {
      console.error("Error al decodificar el token:", err);
    }

    // Verificar si el juego está disponible
    if (!juego.disponibilidad) {
      alert("Este juego no está disponible.");
      return;
    }

    // Si pasa todas las verificaciones, mostrar el modal
    mostrarModal = true;
  };
  const datosUsuario = async () =>{
    const response = await apiUsers.get(`/datos/${clienteId}`)
    usuarioConfianza = response.data.usuarioconfianza
    
  }
  onMount(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        clienteId = payload.userid;
        rol = payload.rol
        
      } catch (err) {
        console.error("Error al decodificar token:", err);
      }
    }
    datosUsuario();
  });

  const confirmarAlquiler = async () => {
  mensaje = "";
  fallo = "";
  const gastosEnvio = 1.5;
  const fianza = 20;
  const basePrecio = juego.precio * semanas;
  const preciofinal = basePrecio + gastosEnvio + (usuarioConfianza ? 0 : fianza);
  const hoy = new Date();
  const fechasolicitud = `${hoy.getDate().toString().padStart(2, "0")}/${(hoy.getMonth() + 1).toString().padStart(2, "0")}/${hoy.getFullYear()}`;
  const body = {
    propietario: juego.userid,
    cliente: clienteId,
    semanas,
    preciofinal,
    fechasolicitud,
  };
  try {
    const response = await apiAlquiler.post(`/${juego._id}`, body);
    confirmacion = true;
  } catch (error) {
    fallo = error.response.data.message || "Error de conexión";
  }
};
  function recargarPagina() {
    location.reload();
  }
</script>

<main>
  <Navbar />
  <div class="mt-4 ">
    {#if error}
      <p class="text-red-500">{error}</p>
    {:else if juego}
      <div class="flex flex-col items-center">
        <button
          on:click={alquilar}
          class="bg-violet-700 text-white p-2 rounded-xl mb-2 font-bold"
          >Alquilar</button
        >
        <button on:click={() => (modalInfo = true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><path
              d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"
            /><circle cx="12" cy="10" r="3" /><circle
              cx="12"
              cy="12"
              r="10"
            /></svg
          >
        </button>
        <InfoUsuario
          visible={modalInfo}
          usuarioid={juego.userid}
          onClose={() => (modalInfo = false)}
        />
        <h1 class="text-3xl font-bold text-blue-800 mb-4 text-center">{juego.titulo}</h1>
        <p class="mb-2">"{juego.descripcion}"</p>
        <div
          class="relative w-72 h-72 mb-4 mx-auto gradient-border
          {juego.consola === 'Ps5' ? 'Ps5' : ''}
          {juego.consola === 'XboxSeries' ? 'XboxSeries' : ''}
          {juego.consola === 'NintendoSwitch' ? 'NintendoSwitch' : ''}"
        >
          <img
            src={juego.imagenes[imagenActual]}
            alt="Imagen del juego"
            class="w-full h-full object-cover rounded-xl shadow-lg transition-all duration-300"
          />
          <button
            on:click={anterior}
            class="absolute top-[-92px] right-4 transform -translate-y-1/2 rounded-full shadow"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              ><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" /></svg
            >
          </button>
          <button
            on:click={siguiente}
            class="absolute top-[-92px] left-46 transform -translate-y-1/2 rounded-full shadow"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              ><path d="M13 17l5-5-5-5M6 17l5-5-5-5" /></svg
            >
          </button>
        </div>
        <p>{juego.genero}</p>
        <p class="text-2xl font-bold text-indigo-600">{juego.precio}€</p>
        <p class="font-bold">{juego.estado}</p>
        <p
          class={`${!juego.disponibilidad ? "bg-red-600 text-white p-1 rounded-xl font-bold" : "bg-green-600 text-white p-1 rounded-xl font-bold"}`}
        >
          {juego.disponibilidad ? "Disponible" : "No disponible"}
        </p>
      </div>
    {/if}
  </div>
  {#if mostrarModal}
    <div
      class="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded shadow-xl w-[300px] text-center">
        <h2 class="text-xl font-bold mb-4">Confirmar alquiler</h2>
        <p>Selecciona duración:</p>
        <select bind:value={semanas} class="mt-2 mb-4 border rounded px-2 py-1">
          <option value="1">1 semana</option>
          <option value="2">2 semanas</option>
          <option value="3">3 semanas</option>
        </select>
        <p><strong>Precio</strong> {juego.precio * semanas}€</p>
        <p>Fianza: {usuarioConfianza ? '0€ (usuario de confianza)' : '20€'}</p>
        <p class="text-violet-700"><strong>Envío:</strong> 1.5€</p>
        <p class="mb-4">
          <strong>Total:</strong>
          {juego.precio * semanas + 1.5 + (usuarioConfianza ? 0 : 20)}€
        </p>
        <div class="flex justify-between">
          <button
            on:click={() => (mostrarModal = false)}
            class="bg-gray-300 px-4 py-1 rounded">Cancelar</button
          >
          <button
            on:click={confirmarAlquiler}
            class="bg-violet-700 text-white px-4 py-1 rounded">Confirmar</button
          >
        </div>
        {#if fallo}
          <p class="text-red-600 text-sm font-bold mt-3">{fallo}</p>
        {/if}
      </div>
    </div>
  {/if}
  {#if confirmacion}
    <div
      class="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
    >
      <div
        class="bg-white rounded-lg p-6 shadow-xl max-w-sm w-full text-center text-black flex flex-col items-center"
      >
        <h3 class="text-xl font-semibold mb-4">
          Tu Solicitud se ha enviado con exito
        </h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#009846"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          ><path
            d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
          ></path></svg
        >
        <button
          class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 mt-4"
          on:click={() => {
            confirmacion = false;
            mostrarModal = false;
            recargarPagina();
          }}
        >
          Aceptar
        </button>
      </div>
    </div>
  {/if}
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
  .Ps5::before {
    background: conic-gradient(
      from 0deg,
      #2716e2,
      #ffffff,
      #2716e2
    ); /* azul-blanco */
  }

  .XboxSeries::before {
    background: conic-gradient(
      from 0deg,
      #107c10,
      #ffffff,
      #107c10
    ); /* verde-blanco */
  }

  .NintendoSwitch::before {
    background: conic-gradient(
      from 0deg,
      #e60012,
      #ffffff,
      #16b7e4,
      #ffffff,
      #e60012
    ); /* rojo-blanco-verde */
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
