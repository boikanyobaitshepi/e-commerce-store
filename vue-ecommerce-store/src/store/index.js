import { createStore } from 'vuex';
import auth from './modules/auth';
import cart from './modules/cart';
import products from './modules/products';

export default createStore({
  modules: {
    auth,
    cart,
    products
  },
  state: {
    theme: 'light'
  },
  mutations: {
    SET_THEME(state, theme) {
      state.theme = theme;
    }
  },
  actions: {
    initTheme({ commit }) {
      const theme = localStorage.getItem('theme') || 'light';
      commit('SET_THEME', theme);
    },
    toggleTheme({ commit, state }) {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      commit('SET_THEME', newTheme);
    }
  },
  getters: {
    currentTheme: state => state.theme
  }
});