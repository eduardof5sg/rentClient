<script>
    import { notificaciones } from "../../stores/notification.js";
    import { fly } from "svelte/transition";

    let listaNotificaciones = [];
    notificaciones.subscribe(value => {
    listaNotificaciones = value;
    console.log("Notificaciones actuales:", listaNotificaciones);
  });

  function cerrar(id) {
    notificaciones.update(n => n.filter(noti => noti.id !== id));
  }
</script>
<div class="toast-container">
    {#each $notificaciones as noti (noti.id)}
      <div
        class="bg-green-500 p-4 rounded shadow-md mb-2 max-w-sm text-white"
        in:fly={{ x: 200, duration: 300 }}
        out:fly={{ x: 200, duration: 600 }}
      >
        <div class="flex justify-between items-center">
          <div>{noti.mensaje}</div>
          <button class="ml-4 text-lg font-bold" on:click={() => cerrar(noti.id)}>×</button>
        </div>
      </div>
    {/each}
  </div>
  <style>
    .toast-container {
      position: fixed;
      top: 1rem;
      right: 1rem;
      z-index: 9999;
    }
  </style>