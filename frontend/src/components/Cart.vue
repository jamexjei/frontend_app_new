<template>
  <div class="cart-panel">
    <h3>Tu carrito</h3>
    <ul>
      <li v-for="it in items" :key="it.id">
        <img :src="it.image" v-if="it.image" />
        <div>
          <div class="title">{{ it.name }}</div>
          <div class="meta">{{ it.quantity }} x ${{ it.unit_price }}</div>
          <div class="subtotal">Subtotal: ${{ (it.unit_price * it.quantity).toFixed(2) }}</div>
        </div>
      </li>
    </ul>
    <div class="cart-footer">
      <div>Total: ${{ total.toFixed(2) }}</div>
      <div class="actions">
        <button @click="$emit('clear')">Limpiar</button>
        <button @click="doCheckout">Comprar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['items'],
  computed:{
    total(){ return this.items.reduce((s,i)=>s + i.unit_price * i.quantity, 0) }
  },
  methods:{
    doCheckout(){
      const phone = prompt('Ingresa número WhatsApp (ej: 573001234567)') || null;
      this.$emit('checkout', phone);
    }
  }
}
</script>

<style scoped>
.cart-panel{ background:white; padding:12px; border-radius:10px; box-shadow:0 6px 18px rgba(0,0,0,0.08); position:fixed; right:20px; bottom:20px; width:320px; }
.cart-panel ul{ list-style:none; padding:0; margin:0; max-height:260px; overflow:auto; }
.cart-panel li{ display:flex; gap:8px; margin-bottom:8px; }
.cart-panel img{ width:60px; height:60px; object-fit:cover; border-radius:8px; }
.cart-footer{ margin-top:8px; display:flex; justify-content:space-between; align-items:center; }
.actions button{ margin-left:8px; padding:8px 10px; border-radius:8px; border:none; cursor:pointer; }
.actions button:first-child{ background:#FFB6C1; color:white; }
.actions button:last-child{ background:#25D366; color:white; }
</style>
