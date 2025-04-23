<script>
  import { onMount } from "svelte";
  import apiUsers from "$lib/endpoints/axiosUser";

  export let visible = false;
  let confirmacion = false;
  export let onClose;

  let formulario = {
    nombre: "",
    apellidos: "",
    edad: "",
    direccion: "",
    codigopostal: "",
    telefono: "",
    contraseña: "",
    repetircontraseña: "",
  };

  let error = "";
  let mensaje = "";

  const registrarUsuario = async () => {
  error = "";
  mensaje = "";

  // Validaciones personalizadas
  const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  const soloNumeros = /^\d+$/;
  const contraseñaValida = /^(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/;

  if (!soloLetras.test(formulario.nombre)) {
    error = "El nombre solo debe contener letras.";
    return;
  }
  if (!soloLetras.test(formulario.apellidos)) {
    error = "Los apellidos solo deben contener letras.";
    return;
  }
  if (!soloNumeros.test(formulario.codigopostal)) {
    error = "El código postal solo debe contener números.";
    return;
  }
  if (!soloNumeros.test(formulario.telefono) || formulario.telefono.length !== 9) {
    error = "El teléfono debe contener exactamente 9 dígitos.";
    return;
  }
  if (!contraseñaValida.test(formulario.contraseña)) {
    error = "La contraseña debe contener al menos un número y un carácter especial.";
    return;
  }
  if (formulario.contraseña !== formulario.repetirContraseña) {
    error = "Las contraseñas no coinciden.";
    return;
  }

  try {
    const response = await apiUsers.post("/registro", formulario);
    mensaje = "Registro exitoso. ¡Bienvenido!";
    confirmacion = true;
  } catch (err) {
    error = err.response?.data?.error || "Error al registrarse.";
  }
};
</script>

{#if visible}
  <div class="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
    <div class="bg-white p-6 rounded-lg w-full max-w-md relative text-black">
      <button class="absolute top-2 right-3 text-gray-500" on:click={onClose}
        >✖</button
      >
      <h2 class="text-2xl font-bold mb-4">Crear cuenta</h2>

      <form class="space-y-4" on:submit|preventDefault={registrarUsuario}>
        <input
          bind:value={formulario.nombre}
          placeholder="Nombre"
          class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          bind:value={formulario.apellidos}
          placeholder="Apellidos"
          class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          required
        />
        <select
          bind:value={formulario.edad}
          class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          required
        >
          <option value="" disabled selected>Selecciona tu edad</option>
          {#each Array(48)
            .fill(0)
            .map((_, i) => 18 + i) as edad}
            <option value={edad}>{edad}</option>
          {/each}
        </select>
        <input
          bind:value={formulario.direccion}
          placeholder="Nombre de la calle , nº portal , piso y letra"
          class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          bind:value={formulario.codigopostal}
          placeholder="Código Postal"
          class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          bind:value={formulario.telefono}
          placeholder="Teléfono"
          type="tel"
          class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          bind:value={formulario.contraseña}
          placeholder="Contraseña"
          type="password"
          class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          bind:value={formulario.repetirContraseña}
          placeholder="Repetir Contraseña"
          type="password"
          class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          required
        />

        {#if error}
          <p class="text-red-600 text-lg font-bold">{error}</p>
        {/if}
        {#if mensaje}
          <p class="text-green-600 text-sm">{mensaje}</p>
        {/if}

        <button
          type="submit"
          class="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700"
        >
          Registrarse
        </button>
      </form>
    </div>
  </div>
{/if}
{#if confirmacion}
  <div class="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
    <div
      class="bg-white rounded-lg p-6 shadow-xl max-w-sm w-full text-center text-black flex flex-col items-center"
    >
      <h3 class="text-xl font-semibold mb-4">Te has registrado con exito</h3>
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
          onClose(); // cerrar el modal principal
        }}
      >
        Aceptar
      </button>
    </div>
  </div>
{/if}
