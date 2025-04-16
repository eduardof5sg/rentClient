<script>
    import Navbar from "$lib/componentes/navbar.svelte";
    let ps = "/backgrounds/consolas/psp.jpg"
    let xbox = "/backgrounds/consolas/xbox.jpg"
    let nintendo = "/backgrounds/consolas/nintendo.jpg"
</script>
<main >
    <Navbar />
    <div class="max-h-full">
        <div>
            <img src={ps} alt="ps">
        </div>
        <div>
            <img src={xbox} alt="xbox">
        </div>
        <div>
            <img src={nintendo} alt="nintendo">
        </div>
        
    </div>
</main>
    
