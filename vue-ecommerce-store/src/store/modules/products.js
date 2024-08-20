export default {
    namespaced: true,
    state: {
      all: [],
      categories: []
    },
    mutations: {
      SET_PRODUCTS(state, products) {
        state.all = products;
      },
      SET_CATEGORIES(state, categories) {
        state.categories = categories;
      }
    },
    actions: {
      async fetchProducts({ commit }) {
        try {
          const response = await fetch('https://fakestoreapi.com/products');
          const products = await response.json();
          commit('SET_PRODUCTS', products);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      },
      async fetchCategories({ commit }) {
        try {
          const response = await fetch('https://fakestoreapi.com/products/categories');
          const categories = await response.json();
          commit('SET_CATEGORIES', categories);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      }
    },
    getters: {
      allProducts: state => state.all,
      allCategories: state => state.categories,
      getProductById: state => id => state.all.find(product => product.id === id)
    }
  };