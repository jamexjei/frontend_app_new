<template>
  <div id="app" class="min-h-screen bg-gray-100">
    <nav class="bg-pink-300 p-4 shadow-md flex justify-between items-center">
      <h1 class="text-xl font-bold text-gray-700">Catalogo App</h1>
      <div class="space-x-4">
        <router-link to="/admin" class="hover:underline">Admin</router-link>
        <router-link to="/catalogo" class="hover:underline">Catálogo</router-link>
        <router-link to="/login" class="hover:underline">Login</router-link>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
</script>

<style>
body {
  margin: 0;
  font-family: 'Arial', sans-serif;
}
</style>
