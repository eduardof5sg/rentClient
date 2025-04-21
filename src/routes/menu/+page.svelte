<script>
    import Navbar from "$lib/componentes/navbar.svelte";
    let ps = "/backgrounds/consolas/psp.jpg"
    let xbox = "/backgrounds/consolas/xbox.jpg"
    let nintendo = "/backgrounds/consolas/nintendo.jpg"
    import ModalPs from "$lib/modales/modalPs.svelte";
    import ModalXbox from "$lib/modales/modalXbox.svelte";
    let modalPs=false;
    let modalXbox = false;
</script>
<main >
    <Navbar />
    <div class="max-h-full">
        <div class="relative inline-block">
            <div class="gradient-border inline-block ">
                <img src={ps} alt="ps" class="rounded-xl block" />
              </div>
            <button on:click={() =>modalPs = true} class="absolute top-40 left-4 bg-blue-700 p-2 text-white rounded-xl shadow-md font-bold">
              Ver juegos
            </button>
          </div>
          <div class="gradient-border1 inline-block  relative">
            <img src={xbox} alt="xbox" class="rounded-xl block" />
            <button on:click={() =>modalXbox = true} class="absolute top-40 left-4 bg-green-600 p-2 text-white rounded-xl shadow-md font-bold">
              Ver juegos
            </button>
          </div>
        <div class="gradient-border2 inline-block rounded-xl relative" >
            <img src={nintendo} alt="nintendo" class="rounded-xl block">
            <button class="absolute top-40 left-4 bg-white p-2 text-black rounded-xl shadow-md font-bold">
                Ver juegos
              </button>
        </div>
        
    </div>
    <ModalPs visible={modalPs} onClose={() => modalPs = false}/>
    <ModalXbox visible={modalXbox} onClose={() => modalXbox = false}/>
</main>
<style>
    .gradient-border {
      background: linear-gradient(270deg, #3b82f6, #ffffff);
      background-size: 500% 500%;
      animation: borderAnim 5s ease infinite;
      padding: 6px; /* grosor del borde */
      border-radius: 0.2rem; /* igual que la imagen */
    }
  
    @keyframes borderAnim {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }

    .gradient-border1 {
      background: linear-gradient(270deg, #20de2c, #ffffff);
      background-size: 500% 500%;
      animation: borderAnim 5s ease infinite;
      padding: 6px; /* grosor del borde */
      border-radius: 0.2rem; /* igual que la imagen */
    }
  
   
    .gradient-border2 {
      background: linear-gradient(270deg, #fd1a1a, #3f24ed);
      background-size: 500% 500%;
      animation: borderAnim 5s ease infinite;
      padding: 6px; /* grosor del borde */
      border-radius: 0.2rem; /* igual que la imagen */
    }
  
   
  </style>
    
