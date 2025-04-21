<script>
    import "../../app.css"; // Esto es raro, normalmente no hace falta importar app.css así en un componente.
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
  import { page } from "$app/state";
  
    let isOpen = false;
    let token = null;
    let enlaceguarida = '/guarida';
  
    function toggleMenu() {
      isOpen = !isOpen;
    }

    function goToLogin(){
    goto(`/login`)
  }
  function logout() {
    localStorage.removeItem("token");
    token = null;
    goto("/menu") // o redirige donde quieras
  }

  function navegar() {
  const token = localStorage.getItem("token");

  if (!token) {
    goto("/login");
  } else {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const id = payload.userid;

      goto(`/guarida/${id}`);
    } catch (err) {
      console.error("Error al decodificar token:", err);
    }
  }
} 
onMount(() => {
    token = localStorage.getItem("token");
  });
  
   
  </script>
  
  <main class="text-white px-2 py-2 bg-black">
    <!-- Navbar -->
    <nav class="flex items-center justify-between">
      <!-- Botón hamburguesa -->
      <button
        class="p-1 text-white hover:bg-gray-800 rounded"
        on:click={toggleMenu}
        aria-label="Toggle menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      {#if token}
  <!-- Icono de logout -->
  <button on:click={logout} aria-label="Cerrar sesión">
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10 3H6a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h4M16 17l5-5-5-5M19.8 12H9"/>
    </svg>
  </button>
{:else}
  <!-- Icono de usuario -->
  <button on:click={goToLogin} aria-label="Cerrar sesión">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7">
    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
  </button>
  
{/if}
    </nav>
  
    <!-- Menú desplegable -->
    <div
      class={`lg:hidden ${isOpen ? 'block' : 'hidden'} ml-2 text-[16px] font-semibold`}
    >
      <a href="/" class="block py-2 px-2 hover:bg-gray-800 rounded">Inicio</a>
      <a href="/menu" class="block py-2 px-2 hover:bg-gray-800 rounded">Consolas</a>
      <button on:click={navegar}  class="block py-2 px-2 hover:bg-gray-800 rounded">Mi cuenta</button>
      <a href="/contacto" class="block py-2 px-2 hover:bg-gray-800 rounded">Contacto</a>
    </div>
  </main>
  