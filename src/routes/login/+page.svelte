<script>
    import "../../app.css"
    const portada = "/backgrounds/login/logoRent.png"
</script>

<main class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-4 bg-white rounded-lg shadow-lg">
        <!-- Imagen de portada -->
        <div class="mb-6 flex justify-center">
            <img src={portada} alt="portada" class="w-auto h-auto rounded-xl" />
        </div>

        <!-- Formulario de Login -->
        <form class="space-y-6">
            <!-- Campo de Teléfono -->
            <div>
                <label for="telefono" class="block text-sm font-medium text-gray-700">Teléfono</label>
                <input
                    id="telefono"
                    type="tel"
                    name="telefono"
                    placeholder="Ingresa tu número"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                />
            </div>

            <!-- Campo de Contraseña -->
            <div>
                <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Ingresa tu contraseña"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                />
            </div>

            <!-- Botón de Iniciar sesión -->
            <div>
                <button
                    type="submit"
                    class="w-full py-2 px-4 bg-black text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Iniciar sesión
                </button>
            </div>
        </form>
    </div>
</main>
