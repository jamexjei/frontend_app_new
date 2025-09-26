<template>
  <div class="admin">
    <aside class="sidebar">
      <router-link to="/admin">Productos</router-link>
      <router-link to="/admin/users">Usuarios</router-link>
      <a @click="doLogout">Cerrar sesión</a>
    </aside>
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script>
import { setAuth } from '../api';
export default {
  methods:{
    doLogout(){
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setAuth(null);
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.admin { display:flex; min-height:100vh; }
.sidebar { width:220px; background:#fff; border-right:1px solid #eee; padding:20px; }
.content { flex:1; padding:20px; }
.sidebar a { display:block; margin-bottom:10px; color:#333; cursor:pointer; }
</style>
