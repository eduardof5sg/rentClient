<script>
    import "../app.css"
	let fondo = "/backgrounds/portada/mando.mp4";
    let logo = "/backgrounds/portada/rent.png"
</script>

<main class="relative h-screen w-full overflow-hidden text-white">
	<!-- Video de fondo -->
	<video
		class="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
		autoplay
		muted
		loop
		playsinline
	>
		<source src={fondo} type="video/mp4" />
	</video>

	<!-- Contenido sobre el video -->
	<section class="relative z-1 flex flex-col items-center h-full  text-center">
		
        <img class="w-70 h-auto bg-white/40 backdrop-blur-md p-1 rounded-xl shadow-md  mt-12" src={logo} alt="logo">
		<p class="text-xl max-w-[330px] mb-12 mt-12 text-black font-bold">
			Descubre una nueva forma de jugar. Alquila juegos para tus consolas favoritas o pon los tuyos en alquiler.
            Fácil, rápido y sin complicaciones.
		</p>
		<div class="mt-16 flex gap-4 ">
			<button class="bg-black hover:bg-blue-700 text-white px-5 py-2 rounded-xl shadow-md">
				Explorar juegos
			</button>
			<button class="bg-white text-black hover:bg-gray-100 px-5 py-2 rounded-xl shadow-md">
				Registrarme
			</button>
		</div>
	</section>
</main>
