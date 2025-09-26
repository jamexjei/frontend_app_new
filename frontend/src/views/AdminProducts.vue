<template>
  <div>
    <h2>Productos</h2>
    <div class="controls">
      <button @click="openNew">Nuevo producto</button>
      <button @click="exportExcel">Exportar Excel</button>
    </div>

    <table class="table">
      <thead>
        <tr><th>Foto</th><th>Nombre</th><th>Tipo</th><th>Stock</th><th>Precio unit.</th><th>Valor total</th><th>Acciones</th></tr>
      </thead>
      <tbody>
        <tr v-for="p in products" :key="p.id">
          <td><img :src="imgUrl(p.image)" class="thumb" /></td>
          <td>{{ p.name }}</td>
          <td>{{ p.type }}</td>
          <td>{{ p.stock }}</td>
          <td>{{ p.unit_price }}</td>
          <td>{{ p.total_value }}</td>
          <td>
            <button @click="openEdit(p)">Editar</button>
            <button @click="remove(p.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- modal new/edit -->
    <div v-if="showModal" class="modal">
      <div class="modal-body">
        <h3>{{ editing ? 'Editar' : 'Nuevo' }}</h3>
        <form @submit.prevent="save">
          <input v-model="form.name" placeholder="Nombre" required />
          <input v-model="form.type" placeholder="Tipo" />
          <input v-model.number="form.stock" type="number" placeholder="Stock" />
          <input v-model.number="form.unit_price" type="number" step="0.01" placeholder="Precio unitario" />
          <input ref="file" type="file" @change="onFileChange" />
          <div class="modal-actions">
            <button type="submit">Guardar</button>
            <button type="button" @click="closeModal">Cancelar</button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script>
import api from '../api';
export default {
  data(){ return {
    products:[],
    showModal:false,
    editing:false,
    form:{ id:null, name:'', type:'', stock:0, unit_price:0, image:null },
    uploadFile:null
  }},
  methods:{
    imgUrl(path){ return path ? `https://catalogo-app.onrender.com${path}` : 'https://via.placeholder.com/80x80'; },
    async fetch(){
      const res = await api.get('/products');
      this.products = res.data;
    },
    openNew(){ this.editing=false; this.form={name:'',type:'',stock:0,unit_price:0}; this.showModal=true; },
    openEdit(p){ this.editing=true; this.form={...p}; this.showModal=true; },
    closeModal(){ this.showModal=false; this.uploadFile=null; },
    onFileChange(e){ this.uploadFile = e.target.files[0]; },
    async save(){
      // use FormData and call POST with JWT (admin)
      const fd = new FormData();
      fd.append('name', this.form.name);
      fd.append('type', this.form.type);
      fd.append('stock', this.form.stock);
      fd.append('unit_price', this.form.unit_price);
      if(this.uploadFile) fd.append('image', this.uploadFile);
      // POST to /products requires admin JWT, ensure token set in api instance
      await api.post('/products', fd);
      await this.fetch();
      this.closeModal();
    },
    async remove(id){
      if(!confirm('Eliminar producto?')) return;
      await api.delete(`/products/${id}`);
      await this.fetch();
    },
    async exportExcel(){
      const res = await api.get('/products/export', { responseType:'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download','products.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  },
  mounted(){ this.fetch(); }
}
</script>

<style scoped>
.table { width:100%; border-collapse:collapse; margin-top:16px; }
.table th, .table td { border:1px solid #eee; padding:8px; text-align:left; }
.thumb { width:80px; height:80px; object-fit:cover; border-radius:8px; }
.modal { position:fixed; inset:0; background:rgba(0,0,0,0.4); display:flex; align-items:center; justify-content:center; }
.modal-body { background:#fff; padding:20px; border-radius:8px; width:540px; }
.modal-actions { display:flex; gap:8px; justify-content:flex-end; margin-top:12px;}
</style>
