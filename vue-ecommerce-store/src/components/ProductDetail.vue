<!-- ProductDetail.vue -->
<template>
    <div v-if="product" class="product-detail">
      <img :src="product.image" :alt="product.title">
      <h2>{{ product.title }}</h2>
      <p>{{ product.description }}</p>
      <p>Price: ${{ product.price }}</p>
      <p>Category: {{ product.category }}</p>
      <p>Rating: {{ product.rating.rate }} ({{ product.rating.count }} reviews)</p>
      <button @click="addToCart">Add to Cart</button>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useStore } from 'vuex';
  
  export default {
    setup() {
      const route = useRoute();
      const store = useStore();
      const product = ref(null);
  
      onMounted(async () => {
        const response = await fetch(`https://fakestoreapi.com/products/${route.params.id}`);
        product.value = await response.json();
      });
  
      const addToCart = () => {
        store.dispatch('addToCart', product.value);
      };
  
      return { product, addToCart };
    }
  }
  </script>