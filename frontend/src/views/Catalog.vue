<template>
  <div>
    <header class="catalog-header">
      <h1>Catálogo</h1>
      <div class="cart-mini">
        <button @click="toggleCart"><i class="fas fa-shopping-cart"></i> Carrito ({{ cartCount }})</button>
      </div>
    </header>

    <div class="grid">
      <div class="card" v-for="p in products" :key="p.id">
        <img :src="imgUrl(p.image)" class="portrait" @click="openLightbox(p)" />
        <h3>{{ p.name }}</h3>
        <p>{{ p.type }}</p>
        <p>Stock: {{ p.stock }}</p>
        <p>Precio: ${{ p.unit_price }}</p>
        <div class="qty">
          <input type="number" v-model.number="quantities[p.id]" min="1" :max="p.stock" />
          <button @click="add(p)">Agregar</button>
        </div>
      </div>
    </div>

    <Cart :items="cart" v-if="showCart" @clear="clearCart" @checkout="checkout" />

    <Lightbox v-if="lightbox.open" :src="lightbox.src" @close="closeLightbox" />

  </div>
</template>

<script>
import api from '../api';
import Cart from '../components/Cart.vue';
import Lightbox from '../components/Lightbox.vue';

export default {
  components:{ Cart, Lightbox },
  data(){ return { products:[], cart:[], quantities: {}, showCart:false, lightbox:{open:false,src:''} } },
  computed:{ cartCount(){ return this.cart.reduce((s,i)=>s+i.quantity,0) } },
  methods:{
    imgUrl(path){ return path? `https://catalogo-app.onrender.com${path}` : 'https://via.placeholder.com/300x400'; },
    async fetch(){ const r = await api.get('/products'); this.products = r.data; this.products.forEach(p=>{ this.$set(this.quantities, p.id, 1); }); },
    add(p){
      const q = this.quantities[p.id] || 1;
      const existing = this.cart.find(i => i.id === p.id);
      if(existing) existing.quantity += q; else this.cart.push({ id:p.id, name:p.name, unit_price:p.unit_price, quantity:q, image: p.image? this.imgUrl(p.image) : null });
    },
    toggleCart(){ this.showCart = !this.showCart; },
    clearCart(){ if(confirm('Limpiar carrito?')) this.cart = []; },
    checkout(phone){
      if(!this.cart.length) return alert('Carrito vacío');
      const items = this.cart.map(i=>({ product_id:i.id, quantity:i.quantity }));
      const total = this.cart.reduce((s,i)=>s+i.unit_price*i.quantity,0);
      // call backend to log purchase
      api.post('/purchases', { items, phone, total }).then(()=>{
        // redirect to whatsapp
        const message = this.cart.map(c=>`${c.name} - ${c.quantity} x $${c.unit_price}`).join("%0A");
        // phone param will be configured client-side: pass phone or use default
        const waPhone = phone || '573001112233';
        window.open(`https://wa.me/${waPhone}?text=Hola,%20quiero%20comprar:%0A${message}`, '_blank');
        this.cart = [];
      }).catch(err=> alert(err.response?.data?.msg || 'error'));
    },
    openLightbox(p){ this.lightbox = { open:true, src: this.imgUrl(p.image) }; },
    closeLightbox(){ this.lightbox.open = false; },
  },
  mounted(){ this.fetch(); }
}
</script>

<style scoped>
.grid{ display:grid; grid-template-columns: repeat(4,1fr); gap:12px; }
.card{ background:#fff; padding:12px; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.06); text-align:center; }
.portrait{ width:100%; height:300px; object-fit:cover; border-radius:12px; cursor:pointer; }
.qty{ display:flex; gap:8px; justify-content:center; margin-top:8px; }
.qty input{ width:64px; padding:6px; border-radius:6px; border:1px solid #ddd; }
.cart-mini button{ background:#FFB6C1; color:white; border:none; padding:8px 12px; border-radius:8px; cursor:pointer; }
</style>
