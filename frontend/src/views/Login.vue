<template>
  <div class="page auth">
    <div class="card auth-card">
      <h2>Iniciar sesión</h2>
      <form @submit.prevent="doLogin">
        <input v-model="username" placeholder="Usuario" required />
        <input v-model="password" type="password" placeholder="Contraseña" required />
        <button type="submit">Entrar</button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import api, { setAuth } from '../api';
export default {
  data(){ return { username:'', password:'', error:'' } },
  methods:{
    async doLogin(){
      try{
        const res = await api.post('/auth/login', { username:this.username, password:this.password });
        const token = res.data.access_token;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setAuth(token);
        this.$router.push('/admin');
      }catch(e){
        this.error = e.response?.data?.msg || 'Error de login';
      }
    }
  },
  mounted(){
    const t = localStorage.getItem('token');
    if(t){ setAuth(t); this.$router.push('/admin'); }
  }
}
</script>

<style scoped>
/* minimal styles */
.auth { display:flex; justify-content:center; align-items:center; height:80vh; }
.auth-card { width:320px; padding:20px; background:#fff; border-radius:8px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
.auth-card input { width:100%; margin:8px 0; padding:8px; border-radius:6px; border:1px solid #ddd; }
.auth-card button { background:#FFB6C1; color:white; border:none; padding:8px 12px; border-radius:6px; cursor:pointer; }
.error { color:red; margin-top:8px; }
</style>
