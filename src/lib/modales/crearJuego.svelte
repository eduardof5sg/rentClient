<script>
    import { onMount } from "svelte";
    import apiJuegos from "$lib/endpoints/axiosJuegos";
  
    export let visible = false;
    let confirmacion = false;
    export let onClose;
    export let userid;
  
    let formulario = {
      consola: "",
      titulo: "",
      descripcion: "",
      genero: "",
      estado: "",
      precio: "",
      imagen1: null,
      imagen2: null
    };
  
    let error = "";
    let mensaje = "";
  
    const registrarJuego = async () => {
  const formData = new FormData();
  formData.append("consola", formulario.consola);
  formData.append("titulo", formulario.titulo);
  formData.append("descripcion", formulario.descripcion);
  formData.append("genero", formulario.genero);
  formData.append("estado", formulario.estado);
  formData.append("precio", formulario.precio);
  formData.append("imagenes", formulario.imagen1);
  formData.append("imagenes", formulario.imagen2);

  try {
    const response = await apiJuegos.post(`/${userid}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    confirmacion = true;
  } catch (error) {
    error = error.response?.data?.message || "Error al registrar";
  }
};
  </script>
  
  {#if visible}
    <div class="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded-lg w-full max-w-md relative text-black">
        <button class="absolute top-2 right-3 text-gray-500" on:click={onClose}
          >✖</button
        >
        <h2 class="text-2xl font-bold mb-4">Agregar juego</h2>
  
        <form class="space-y-4" on:submit|preventDefault={registrarJuego}>
            <select
            bind:value={formulario.consola}
            class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="" disabled selected>Selecciona una consola</option>
            <option value="Ps5">PS5</option>
            <option value="XboxSeries">Xbox Series</option>
            <option value="NintendoSwitch">Nintendo Switch</option>
          </select>
          <input
            bind:value={formulario.titulo}
            placeholder="Titulo"
            class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            bind:value={formulario.descripcion}
            placeholder="Descripcion"
            class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            bind:value={formulario.genero}
            placeholder="Genero"
            class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />
          <select
            bind:value={formulario.estado}
            placeholder="Estado"
            type="tel"
            class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          >
          <option value="" disabled selected>Selecciona el estado del juego</option>
            <option value="Perfecto">Perfecto</option>
            <option value="Nuevo">Nuevo</option>
            <option value="Bueno">Bueno</option>
          </select>
          <input
            bind:value={formulario.precio}
            placeholder="precio"
            class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="file"
            accept="image/*"
            on:change={(e) => formulario.imagen1 = e.target.files[0]}
            class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            required
            />

            <input
            type="file"
            accept="image/*"
            on:change={(e) => formulario.imagen2 = e.target.files[0]}
            class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            required
            />
          
          {#if error}
            <p class="text-red-600 text-sm">{error}</p>
          {/if}
          {#if mensaje}
            <p class="text-green-600 text-sm">{mensaje}</p>
          {/if}
  
          <button
            type="submit"
            class="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700"
          >
            Aceptar
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
        <h3 class="text-xl font-semibold mb-4">Tu juego se ha creado con exito</h3>
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