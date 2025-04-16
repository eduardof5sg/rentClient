<script>
    import "../../app.css"; // Esto es raro, normalmente no hace falta importar app.css así en un componente.
    import { goto } from "$app/navigation";
  
    let isOpen = false;
  
    function toggleMenu() {
      isOpen = !isOpen;
    }
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
    </nav>
  
    <!-- Menú desplegable -->
    <div
      class={`lg:hidden ${isOpen ? 'block' : 'hidden'} ml-2 text-[16px] font-semibold`}
    >
      <a href="/bares" class="block py-2 px-2 hover:bg-gray-800 rounded">Bares</a>
      <a href="/menus" class="block py-2 px-2 hover:bg-gray-800 rounded">Menus</a>
      <a href="/aboutus" class="block py-2 px-2 hover:bg-gray-800 rounded">About Us</a>
      <a href="/contacto" class="block py-2 px-2 hover:bg-gray-800 rounded">Contacto</a>
    </div>
  </main>
  