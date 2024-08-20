<!-- Cart.vue -->
<template>
    <div class="cart">
      <h2>Your Cart</h2>
      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <img :src="item.image" :alt="item.title">
        <h3>{{ item.title }}</h3>
        <p>Price: ${{ item.price }}</p>
        <p>Quantity: {{ item.quantity }}</p>
        <button @click="updateQuantity(item.id, item.quantity - 1)">-</button>
        <button @click="updateQuantity(item.id, item.quantity + 1)">+</button>
        <button @click="removeFromCart(item.id)">Remove</button>
      </div>
      <p>Total: ${{ cartTotal }}</p>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    setup() {
      const store = useStore();
  
      const cartItems = computed(() => store.state.cart.items);
      const cartTotal = computed(() => store.getters.cartTotal);
  
      const updateQuantity = (id, quantity) => {
        store.dispatch('updateCartItemQuantity', { id, quantity });
      };
  
      const removeFromCart = (id) => {
        store.dispatch('removeFromCart', id);
      };
  
      return { cartItems, cartTotal, updateQuantity, removeFromCart };
    }
  }
  </script>