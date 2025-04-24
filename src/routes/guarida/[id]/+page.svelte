<script>
  import { onMount } from "svelte";
  import Navbar from "$lib/componentes/navbar.svelte";
  import InfoUsuario from "$lib/modales/infoUsuario.svelte";
  import CrearJuego from "$lib/modales/crearJuego.svelte";
  import apiAlquiler from "$lib/endpoints/axios.alquiler.js";
  import apiDelivery from "$lib/endpoints/axiosDelivery.js";
  import apiReseñas from "$lib/endpoints/axiosReseñas.js";
  import { goto } from "$app/navigation";
  import { notificaciones } from "../../../stores/notification.js";
  import Notificacion from "$lib/componentes/Notificacion.svelte";
  import apiJuegos from "$lib/endpoints/axiosJuegos.js";

  export let data;
  const { datos, alquileres, juegos, alquilados, pedidos } = data;
  

  let verificadoImg = "/backgrounds/logros/verificado.svg";
  let tabActivo = "datos";
  let modalReseña = false;
  let modalVisible = false;
  let modalLogros = false;
  let modalVerificar = false;
  let modalInfo = false;
  let propietario = '';
  let fallo = '';
  let falloEstado = '';
  
  // variable para confirmar entrega
  let fechainicio = "";
  let fechafin = "";
  let alquilerSeleccionado = null;
  

  // variables  para la funcion reseñas
  let alquiladoSeleccionado = null;
  let pedidoSeleccionado = null;
  let puntuacion = '';
  let mensajeReseña = '';

  let modalEntrega = false;

  const cambiarTab = (tab) => {
    tabActivo = tab;
  };

  const abrirModalVerificar = () => {
    modalVerificar = true;
  };

  const cerrarModalVerificar = () => {
    modalVerificar = false;
  };
  const enviarMensaje = () => {
    const numero = "627339450";
    const mensaje = "Confirmo mi numero de telefono ✅";

    // Simulación: abrir WhatsApp o log para desarrollo
    window.open(
      `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`,
      "_blank"
    );

    modalVerificar = false;
  };

  const formatFecha = (fecha) => {
    if (!fecha) return "";
    const date = new Date(fecha);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()); // Tomamos solo los 2 últimos dígitos
    return `${day}/${month}/${year}`;
  };

  async function confirmarAlquiler(solicitudId) {
    try {
      const res = await apiAlquiler.put(`/confirmar/${solicitudId}`);
      alert("Solicitud confirmada ✅");
      location.reload(); // refresca la página
    } catch (error) {
      alert("Hubo un problema al confirmar");
    }
  }

  async function confirmarEntrega(alquilerid) {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Debes iniciar sesión.");
        return;
      }

      // Decodificar el token manualmente
      const payload = JSON.parse(atob(token.split(".")[1]));
      // Verificar que el usuario del token coincida con el cliente del alquiler
      if (payload.userid !== alquilerSeleccionado.cliente) {
        alert("No tienes permiso para confirmar esta entrega.");
        return;
      }

      // Enviar la solicitud de confirmación de entrega
      const response = await apiDelivery.put(
        `/entrega/${alquilerSeleccionado._id}`,
        {
          fechainicio: formatFecha(fechainicio),
          fechafin: formatFecha(fechafin),
        }
      );

      alert("Entrega confirmada correctamente.");
      modalEntrega = false;
      window.location.reload();
    } catch (error) {
      console.error("Error al confirmar la entrega:", error);
      alert("Hubo un error al confirmar la entrega.");
    }
  }

  async function confirmarDevolucion(alquilerid){
    try {
      const token = localStorage.getItem("token");

    if (!token) {
      alert("Debes iniciar sesión.");
      return;
    }
    

    // Decodificar el token manualmente
    const payload = JSON.parse(atob(token.split(".")[1]));
    propietario = payload.userid
    
    
    const response = await apiAlquiler.put(`/devolucion/${alquilerid}`,{
      propietario:propietario
      
    })  
    alert("Gracias por confirmar la devolucion, el pedido ha finalizado")
    } catch (error) {
      fallo = error.response?.data?.message
      
    }
  }
  async function crearReview() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesión.");
      return;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));

    // Determinar a quién va dirigida la reseña
    let receptorid = null;
    if (alquiladoSeleccionado) {
      receptorid = alquiladoSeleccionado.cliente._id;
    } else if (pedidoSeleccionado) {
      receptorid = pedidoSeleccionado.propietario._id;
    } else {
      alert("No se ha seleccionado ningún usuario para dejar reseña.");
      return;
    }

    // Enviar la reseña
    const res = await apiReseñas.post(`/${receptorid}`, {
      emisorid: payload.userid,
      puntuacion: puntuacion,
      mensaje: mensajeReseña,
    });

    alert("Reseña creada correctamente.");
    modalReseña = false;
    window.location.reload();
  } catch (error) {
    alert("Hubo un error al crear una reseña");
    console.error(error);
  }
}


  const abrirEntrega = (pedido) => {
    alquilerSeleccionado = pedido;

    modalEntrega = true;
  };
  function cerrarEntrega() {
    modalEntrega = false;
  }

  const abrirReseña = (alquilado) =>{
    alquiladoSeleccionado = alquilado;
    modalReseña = true;
  }

  const cerrarReseña = () =>{
    modalReseña = false
  }

  const reseñaPropietario = (pedido) =>{
    pedidoSeleccionado = pedido
    modalReseña = true;
  }

  

  async function eliminarAlquiler(solicitudId) {
    try {
      const response = await apiAlquiler.delete(`/${solicitudId}`, {
        data: {
          propietario: datos._id, // o datos.propietario si ya lo tienes así
        },
      });

      if (response.status === 200) {
        alert("Solicitud eliminada correctamente.");
        // Opcional: refrescar la lista o navegar
        location.reload(); // o actualiza el array en memoria si prefieres
      }
    } catch (error) {
      console.error("Error al eliminar alquiler:", error);
      alert(error.response?.data?.message || "Error al eliminar la solicitud.");
    }
  }

  function goDelivery(){
    goto("/delivery")
  }

  function faltaUnDia(fechaStr) {
  

  // Obtener la fecha de hoy en formato DD/MM/YYYY
  const hoy = new Date();
  const diaHoy = String(hoy.getDate()).padStart(2, '0');  // Día con 2 dígitos
  const mesHoy = String(hoy.getMonth() + 1).padStart(2, '0');  // Mes con 2 dígitos (0-11 en JS)
  const añoHoy = hoy.getFullYear();
  const hoyStr = `${diaHoy}/${mesHoy}/${añoHoy}`; // Fecha de hoy en formato DD/MM/YYYY

  

  // Convertir la fecha de fin (fechaStr) a un formato comparable (DD/MM/YYYY)
  const [dia, mes, año] = fechaStr.split("/").map(Number);
  const fechaFinStr = `${String(dia).padStart(2, '0')}/${String(mes).padStart(2, '0')}/${año}`;

  

  // Calcular mañana
  const mañana = new Date(hoy);
  mañana.setDate(hoy.getDate() + 1);
  const diaMañana = String(mañana.getDate()).padStart(2, '0');
  const mesMañana = String(mañana.getMonth() + 1).padStart(2, '0');
  const añoMañana = mañana.getFullYear();
  const mañanaStr = `${diaMañana}/${mesMañana}/${añoMañana}`;

  

  // Comparar si la fecha de fin es igual a mañana
  return fechaFinStr === mañanaStr;
}

  function avisarDevolucion(juego) {
    
    const id = crypto.randomUUID();
    notificaciones.update(n => [
      ...n,
      {
        id,
        mensaje: `Recuerda devolver el juego "${juego}" mañana.`,
      }
    ]);
    setTimeout(() => {
      notificaciones.update(n => n.filter(noti => noti.id !== id));
    }, 5000);
  }

  async function cambiarDisponibilidad(juegoid, nuevaDisponibilidad) {
  try {
    await apiJuegos.put(`/disponibilidad/${juegoid}`, {
      disponibilidad: nuevaDisponibilidad
    });
    alert('Disponibilidad de juego cambiada');
  } catch (error) {
    falloEstado = error.response?.data?.message
    setTimeout(() => {
    falloEstado = '';
  }, 2000);
  }
}
</script>

<Navbar />
<main class="p-2">
  <!-- Barra superior tipo tabs -->
  <div class="flex space-x-4 border-b pb-2 mb-6 overflow-y-auto">
    <button
      class="px-4 py-2 font-semibold rounded-t hover:bg-gray-100 transition"
      class:bg-black={tabActivo === "datos"}
      class:text-white={tabActivo === "datos"}
      on:click={() => cambiarTab("datos")}
    >
      Datos
    </button>
    <button
      class="px-4 py-2 font-semibold rounded-t hover:bg-gray-100 transition"
      class:bg-black={tabActivo === "juegos"}
      class:text-white={tabActivo === "juegos"}
      on:click={() => cambiarTab("juegos")}
    >
      Juegos
    </button>
    <button
      class="px-4 py-2 font-semibold rounded-t hover:bg-gray-100 transition"
      class:bg-black={tabActivo === "pedidos"}
      class:text-white={tabActivo === "pedidos"}
      on:click={() => cambiarTab("pedidos")}
    >
      Pedidos
    </button>
    <button
      class="px-4 py-2 font-semibold rounded-t hover:bg-gray-100 transition"
      class:bg-black={tabActivo === "solicitudes"}
      class:text-white={tabActivo === "solicitudes"}
      on:click={() => cambiarTab("solicitudes")}
    >
      Solicitudes
    </button>
    <button
      class="px-4 py-2 font-semibold rounded-t hover:bg-gray-100 transition"
      class:bg-black={tabActivo === "logros"}
      class:text-white={tabActivo === "logros"}
      on:click={() => modalLogros = true}
    >
      Logros
    </button>
    <InfoUsuario
    visible={modalLogros}
    usuarioid={datos._id}
    onClose={() => (modalLogros = false)}
  />
  </div>

  <!-- Contenido dinámico según tab activo -->
  <div class="bg-white p-2 rounded shadow-md min-h-[200px]">
    {#if tabActivo === "datos"}
      <div class="flex flex-col items-center">
        {#if datos.rol === "repartidor"}
        <button class="bg-green-600 p-2 rounded-xl text-white mb-3" on:click={goDelivery}>Go to delivery</button>
        {:else}
        <p class="mb-3 font-bold">Que tal estas hoy, colega ?</p>
        {/if}
        <h2 class="text-xl font-bold text-gray-600">Datos personales 🧑</h2>
        <table
          class="min-w-full bg-white rounded-lg shadow overflow-hidden mt-4"
        >
          <tbody class="divide-y divide-gray-200">
            <tr>
              <td class="px-4 py-2 font-semibold text-white bg-gray-600"
                >Nombre:</td
              >
              <td class="px-4 py-2 bg-gray-200">{datos.nombre}</td>
            </tr>
            <tr>
              <td class="px-4 py-2 font-semibold text-gray-600">Apellidos:</td>
              <td class="px-4 py-2">{datos.apellidos}</td>
            </tr>
            <tr>
              <td class="px-4 py-2 font-semibold bg-gray-600 text-white"
                >Estado:</td
              >
              <td class="px-4 py-2 bg-gray-200">{datos.estadocuenta}</td>
            </tr>
            <tr>
              <td class="px-4 py-2 font-semibold text-gray-600">Dirección:</td>
              <td class="px-4 py-2">{datos.direccion}</td>
            </tr>
            <tr>
              <td class="px-4 py-2 font-semibold bg-gray-600 text-white"
                >Verificación:</td
              >
              <td class="px-4 py-2 bg-gray-200">
                {#if datos.verificado}
                  <span class="text-green-600 font-semibold">verificado</span>
                {:else}
                  <div class="flex flex-row justify-around items-center">
                    <span class="text-red-600 font-semibold">
                      No verificado</span
                    >
                    <button
                      class="p-1 bg-green-500 rounded-xl shadow-md text-white"
                      on:click={abrirModalVerificar}
                    >
                      Verificar
                    </button>
                  </div>
                {/if}
              </td>
            </tr>
          </tbody>
        </table>
        {#if modalVerificar}
          <div
            class="fixed inset-0 flex justify-center items-center bg-black/50 z-50"
          >
            <div class="bg-white p-6 rounded-xl shadow-lg text-center w-auto">
              <h2 class="text-lg font-semibold mb-4">
                ¿Enviar mensaje de verificación?
              </h2>
              <div class="flex justify-center gap-4">
                <button
                  class="px-4 py-2 bg-red-500 text-white rounded-lg"
                  on:click={cerrarModalVerificar}>Cancelar</button
                >
                <button
                  class="px-4 py-2 bg-green-600 text-white rounded-lg"
                  on:click={enviarMensaje}>Aceptar</button
                >
              </div>
            </div>
          </div>
        {/if}
      </div>
    {:else if tabActivo === "juegos"}
      <div class="flex flex-row mb-6">
        <button
          class="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700"
          on:click={() => (modalVisible = true)}
        >
          Subir juego
        </button>

        <CrearJuego
          visible={modalVisible}
          userid={datos._id}
          onClose={() => (modalVisible = false)}
        />
      </div>
      <p class="text-xl font-bold text-green-600 text-center">
        Aquí puedes gestionar tus juegos 🎮
      </p>
      {#if juegos.length > 0}
        <div class="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {#each juegos as juego}
            <div
              class=" bg-gray-200 rounded-lg shadow-md p-1 flex flex-col items-center mt-4"
            >
              <p
                class:text-green-600={juego.disponibilidad}
                class:text-red-600={!juego.disponibilidad}
              >
                {juego.disponibilidad ? "Disponible" : "Alquilado"}
              </p>
              <img
                src={juego.imagenes[0]}
                alt="Imagen del juego"
                class="w-auto object-cover rounded mb-2 mt-1"
              />
              <p class="font-bold text-blue-600 text-xl">{juego.precio}€</p>
              <p class="text-center">
                <strong>Alquileres:</strong>
                {juego.totalalquileres}
              </p>
              <input
                type="checkbox"
                bind:checked={juego.disponibilidad}
                on:change={() => cambiarDisponibilidad(juego._id, !juego.disponibilidad)}
              />
              <label>Disponible</label>
              {#if falloEstado}
              <p class="text-red-500 font bold">{falloEstado}</p>
              {/if}
            </div>
          {/each}
        </div>
      {:else}
        <p class="text-center">Aun no tienes juegos subidos</p>
      {/if}
    {:else if tabActivo === "pedidos"}
      <p class="text-xl font-bold text-yellow-600 text-center">
        Aquí verás tus pedidos 📦
      </p>
      <h1
        class="text-white text-xl text-center bg-black p-1 rounded-xl font-bold mt-5 w-auto"
      >
        Juegos que has alquilado
      </h1>
      {#if alquilados.length > 0}
        <div>
          {#each alquilados as alquilado}
            <div
              class="bg-white shadow-md rounded-lg p-6 w-full max-w-md mx-auto mt-6"
            >
              <h2 class="text-md font-bold mb-4 text-gray-800">
                Detalles del alquiler
              </h2>
              <div class="space-y-3">
                <div class="flex justify-between border-b pb-2">
                  <span class="font-semibold text-gray-600">Juego:</span>
                  <span>{alquilado.juegoid.titulo}</span>
                </div>
                <div class="flex justify-between border-b pb-2">
                  <span class="font-semibold text-gray-600">Estado:</span>
                  <span class="text-violet-600 font-bold"
                    >{alquilado.estado}</span
                  >
                </div>
                <div class="flex justify-between border-b pb-2">
                  <span class="font-semibold text-gray-600">Fecha:</span>
                  <span>{alquilado.fechasolicitud}</span>
                </div>
                <div class="flex justify-between border-b pb-2">
                  <span class="font-bold text-violet-600">Dia de devolucion:</span>
                  <span>{alquilado.fechafin}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-semibold text-gray-600">Precio final:</span>
                  <span>{alquilado.preciofinal}€</span>
                </div>
              </div>
              <div class="flex flex-col items-center gap-4">
                 <button class="bg-green-600 p-2 text-white rounded-xl font-bold mt-4 " on:click={() =>abrirReseña(alquilado)}>
                Dejar reseña al cliente
              </button>
              {#if alquilado.estado !== "devuelto"}
              <button class="bg-violet-600 text-white p-2 rounded-xl" on:click={()=>confirmarDevolucion(alquilado._id)}>Confirmar Devolucion del juego</button>
              {#if fallo}
              <p class="font-bold text-red-600">{fallo}</p>
              {/if}
              {/if}
              </div>
             
            </div>
          {/each}
        </div>
      {:else}
        <p>Aun no has Puesto en alquiler ningun juego</p>
      {/if}
      <h1
        class="text-xl text-white text-center font-bold bg-black p-1 rounded-xl mt-5"
      >
        Juegos que has solicitado
      </h1>
      {#if pedidos.length > 0}
        <div>
          {#each pedidos as pedido}
            <div
              class="bg-white shadow-md rounded-lg p-2 w-full max-w-md mx-auto"
            >
              <h2 class="text-md font-bold mb-2 mt-3 text-gray-800">
                Detalles del pedido
              </h2>
              <div class="space-y-3">
                <div class="flex justify-between border-b pb-2">
                  <span class="font-semibold text-gray-600">Juego:</span>
                  <span>{pedido.juegoid.titulo}</span>
                </div>
                <div class="flex justify-between border-b pb-2">
                  <span class="font-semibold text-gray-600">Estado:</span>
                  <span class="text-violet-700">{pedido.estado}</span>
                </div>
                <div class="flex justify-between border-b pb-2">
                  <span class="font-semibold text-gray-600">Fecha:</span>
                  <span>{pedido.fechasolicitud}</span>
                </div>
                {#if pedido.fechainicio && pedido.fechafin}
                  <div class="flex justify-between border-b pb-2">
                    <span class="font-semibold text-gray-600"
                      >Fecha de inicio:</span
                    >
                    <span>{pedido.fechainicio}</span>
                  </div>
                  <div class="flex justify-between border-b pb-2">
                    <span class="font-semibold text-gray-600"
                      >Fecha de devolucion:</span
                    >
                    <span class="text-violet-700 font-bold"
                      >{pedido.fechafin}</span
                    >
                  </div>
                  {#if pedido.fechafin && faltaUnDia(pedido.fechafin)}
                  <p>Notificación de devolución se muestra</p>  <!-- Para depurar -->
                  {@html avisarDevolucion(pedido.juegoid.titulo)}
                {/if}
                {/if}
                <div class="flex justify-between">
                  <span class="font-semibold text-gray-600">Precio final:</span>
                  <span>{pedido.preciofinal}€</span>
                </div>
                {#if pedido.estado !== "entregado"}
                  <button
                    on:click={() => abrirEntrega(pedido)}
                    class="p-2 rounded-xl bg-violet-600 text-white px-16 ml-10 mt-2"
                    >Confirmar Entrega</button
                  >
                {/if}
              </div>
              <button class="bg-green-600 p-2 text-white rounded-xl font-bold mt-4 ml-16" on:click={() =>reseñaPropietario(pedido)}>
                Dejar reseña al propietario
              </button>
            </div>
          {/each}
        </div>
      {:else}
        <p>Aun no has alquilado ningun juego</p>
      {/if}
    {:else if tabActivo === "solicitudes"}
      <div class="flex flex-col items-center">
        <p class="text-xl font-bold text-red-600 text-center">
          Aquí están tus solicitudes de alquiler 📝
        </p>
        {#if alquileres.length > 0}
          <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {#each alquileres as alquiler}
              <div
                class=" bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
              >
                <h2 class=" font-bold text-indigo-700 mb-2 text-center">
                  {alquiler.juegoid.titulo}
                </h2>
                <img
                  src={alquiler.juegoid.imagenes[0]}
                  alt="Imagen del juego"
                  class="w-auto object-cover rounded mb-2"
                />
                <div class="flex flex-row justify-around">
                  <p><strong>Cliente</strong> {alquiler.cliente.nombre}</p>
                  <button class="ml-2" on:click={() => (modalInfo = true)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FF0000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      ><circle cx="12" cy="12" r="10"></circle><line
                        x1="12"
                        y1="8"
                        x2="12"
                        y2="12"
                      ></line><line x1="12" y1="16" x2="12.01" y2="16"
                      ></line></svg
                    >
                  </button>
                </div>

                <p><strong>Estado:</strong> {alquiler.estado}</p>
                <p><strong>Precio:</strong> {alquiler.preciofinal}€</p>

                <button
                  class="mt-4 bg-green-600 text-white p-1 rounded hover:bg-green-700"
                  on:click={() => confirmarAlquiler(alquiler._id)}
                >
                  Confirmar
                </button>
                <button
                  class="mt-4 bg-red-600 text-white p-1 rounded hover:bg-green-700"
                  on:click={() => eliminarAlquiler(alquiler._id)}
                >
                  Descartar
                </button>
                <InfoUsuario
                  visible={modalInfo}
                  usuarioid={alquiler.cliente._id}
                  onClose={() => (modalInfo = false)}
                />
              </div>
            {/each}
          </div>
        {:else}
          <p class="text-gray-500">No tienes solicitudes por el momento.</p>
        {/if}
      </div>
    
    {/if}
  </div>
  {#if modalEntrega}
    <div class="fixed inset-0 flex justify-center items-center bg-black/50">
      <div
        class="bg-white p-6 w-auto rounded-xl shadow-md relative flex flex-col gap-4"
      >
        <p class="text-xl font-bold">Confirmar Entrega</p>
        <form on:submit|preventDefault={confirmarEntrega}>
          <div class="flex flex-col gap-2 mb-4">
            <label class="text-sm font-semibold">Fecha de inicio:</label>
            <input
              type="date"
              bind:value={fechainicio}
              class="border rounded p-1"
            />

            <label class="text-sm font-semibold">Fecha de fin:</label>
            <input
              type="date"
              bind:value={fechafin}
              class="border rounded p-1"
            />
          </div>
          <div class="flex gap-4 justify-end">
            <button
              type="button"
              on:click={cerrarEntrega}
              class="p-2 bg-red-500 rounded-xl text-white">Cancelar</button
            >
            <button
              type="submit"
              class="p-2 bg-indigo-600 rounded-xl text-white">Confirmar</button
            >
          </div>
        </form>
      </div>
    </div>
  {/if}
  {#if modalReseña}
    <div class="fixed inset-0 flex justify-center items-center bg-black/50">
      <div
        class="bg-white p-6 w-auto rounded-xl shadow-md relative flex flex-col gap-4"
      >
        <p class="text-xl font-bold">Añadir reseña</p>
        <form on:submit|preventDefault={crearReview}>
          <div class="flex flex-col gap-2 mb-4">
            <label class="text-sm font-semibold">Puntos:</label>
            <select bind:value={puntuacion} class="border rounded p-2">
              <option disabled value="">Selecciona puntuación</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>

            <label class="text-sm font-semibold">Mensaje:</label>
            <input
              type="value"
              bind:value={mensajeReseña}
              class="border rounded p-1"
            />
          </div>
          <div class="flex gap-4 justify-end">
            <button
              type="button"
              on:click={() =>cerrarReseña()}
              class="p-2 bg-red-500 rounded-xl text-white">Cancelar</button
            >
            <button
              type="submit"
              class="p-2 bg-indigo-600 rounded-xl text-white">Confirmar</button
            >
          </div>
        </form>
      </div>
    </div>
  {/if}
  <Notificacion />
</main>
