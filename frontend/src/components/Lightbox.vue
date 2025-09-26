<template>
  <div class="overlay" @click.self="$emit('close')">
    <img :src="src" class="zoom" />
  </div>
</template>

<script>
export default { props:['src'] }
</script>

<style scoped>
.overlay{ position:fixed; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.8); z-index:1000; }
.zoom{ max-width:90%; max-height:90%; border-radius:10px; transform:scale(0.8); opacity:0; animation:zoomIn 280ms forwards; }
@keyframes zoomIn { to { transform:scale(1); opacity:1; } }
</style>
