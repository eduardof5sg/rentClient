<script>
    export let filtroCodigoPostal = "";
    export let filtroDisponibilidad = '';
    export let filtroGenero = '';
    export let nombreJuego ='';

    export let onChange = () =>{};
</script>
<div >
    <div  class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2 mt-2" >
        <div>
        <label class="block text-sm font-bold mb-1">Buscar por título</label>
        <input
            type="text"
            placeholder="Buscar juego..."
            bind:value={nombreJuego}
            on:input={onChange}
            class="w-full p-2 border-gray-600 border-2 rounded"
        />
        </div>
        <div>
            <label class="block text-sm font-bold mb-1">Código Postal</label>
            <input
              type="text"
              placeholder="28001"
              bind:value={filtroCodigoPostal}
              on:input={onChange}
              class="w-full p-2 border rounded"
            />
          </div>
    </div>
     <!-- Búsqueda -->
        
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 mt-2">
        
        <!-- Disponibilidad -->
        <div>
        <label class="block text-sm font-bold mb-1">Disponibilidad</label>
        <select bind:value={filtroDisponibilidad} on:change={onChange} class="w-full p-2 border-gray-600 border-2 rounded">
            <option value="">Todos</option>
            <option value="true">Disponible</option>
            <option value="false">No disponible</option>
        </select>
        </div>
    
        <!-- Género -->
        <div>
        <label class="block text-sm font-bold mb-1">Género</label>
        <select bind:value={filtroGenero} on:change={onChange} class="w-full p-2 border-gray-600 border-2 rounded">
            <option value="">Todos</option>
            <option value="acción">Acción</option>
            <option value="aventura">Aventura</option>
            <option value="deportes">Deportes</option>
            <option value="rol">Rol</option>
            <option value="estrategia">Estrategia</option>
            <option value="carreras">Carreras</option>
        </select>
        </div>
    
       
    </div>
</div>
