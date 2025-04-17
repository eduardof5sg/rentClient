<script>
    import Navbar from "$lib/componentes/navbar.svelte";
    let ps = "/backgrounds/consolas/psp.jpg"
    let xbox = "/backgrounds/consolas/xbox.jpg"
    let nintendo = "/backgrounds/consolas/nintendo.jpg"
    import ModalPs from "$lib/modales/modalPs.svelte";
    let modalPs=false;
</script>
<main >
    <Navbar />
    <div class="max-h-full">
        <div class="relative inline-block">
            <img src={ps} alt="ps" class="bg-blue-700/40 p-1" />
            <button on:click={() =>modalPs = true} class="absolute top-40 left-4 bg-white p-2 text-black rounded-xl shadow-md font-bold">
              Ver juegos
            </button>
          </div>
        <div class="relative inline-block">
            <img src={xbox} alt="xbox" class="w-full h-auto rounded-lg bg-green-700 backdrop-blur-md p-1  shadow-md">
            <button class="absolute top-40 left-4 bg-white p-2 text-black rounded-xl shadow-md font-bold">
                Ver juegos
              </button>
        </div>
        <div class="relative inline-block" >
            <img src={nintendo} alt="nintendo" class="w-full h-auto rounded-lg">
            <button class="absolute top-40 left-4 bg-white p-2 text-black rounded-xl shadow-md font-bold">
                Ver juegos
              </button>
        </div>
        
    </div>
    <ModalPs visible={modalPs} onClose={() => modalPs = false}/>
</main>
    
