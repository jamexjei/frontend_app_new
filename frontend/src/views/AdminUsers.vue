<template>
  <div>
    <h2>Usuarios</h2>
    <button @click="openNew">Nuevo usuario</button>
    <table class="table">
      <thead><tr><th>ID</th><th>Username</th><th>Nombre</th><th>Email</th><th>Admin</th><th>Acciones</th></tr></thead>
      <tbody>
        <tr v-for="u in users" :key="u.id">
          <td>{{u.id}}</td>
          <td>{{u.username}}</td>
          <td>{{u.full_name}}</td>
          <td>{{u.email}}</td>
          <td>{{u.is_admin}}</td>
          <td><button @click="del(u.id)">Eliminar</button></td>
        </tr>
      </tbody>
    </table>
    <div v-if="show">
      <input v-model="form.username" placeholder="username" />
      <input v-model="form.password" placeholder="password" />
      <label><input type="checkbox" v-model="form.is_admin" /> admin</label>
      <button @click="create">Crear</button>
    </div>
  </div>
</template>

<script>
import api from '../api';
export default {
  data(){ return { users:[], show:false, form:{username:'',password:'',is_admin:false} } },
  methods:{
    async fetch(){ const r = await api.get('/users'); this.users = r.data; },
    openNew(){ this.show=true },
    async create(){ await api.post('/auth/register', { ...this.form }); this.show=false; await this.fetch(); },
    async del(id){ if(confirm('Eliminar?')){ await api.delete(`/users/${id}`); await this.fetch(); } }
  },
  mounted(){ this.fetch(); }
}
</script>
