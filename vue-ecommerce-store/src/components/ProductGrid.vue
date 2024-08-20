<!-- ProductGrid.vue -->
<template>
    <div class="product-grid">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import ProductCard from './ProductCard.vue';
  
  export default {
    components: { ProductCard },
    setup() {
      const products = ref([]);
  
      onMounted(async () => {
        const response = await fetch('https://fakestoreapi.com/products');
        products.value = await response.json();
      });
  
      return { products };
    }
  }
  </script>