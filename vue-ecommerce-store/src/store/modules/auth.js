import jwt_decode from 'jwt-decode';

export default {
  namespaced: true,
  state: {
    token: null,
    user: null
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER(state, user) {
      state.user = user;
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await fetch('https://fakestoreapi.com/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials)
        });
        const data = await response.json();
        if (data.token) {
          localStorage.setItem('token', data.token);
          commit('SET_TOKEN', data.token);
          const user = jwt_decode(data.token);
          commit('SET_USER', user);
          return true;
        }
      } catch (error) {
        console.error('Login error:', error);
      }
      return false;
    },
    logout({ commit }) {
      localStorage.removeItem('token');
      commit('SET_TOKEN', null);
      commit('SET_USER', null);
    },
    checkAuth({ commit }) {
      const token = localStorage.getItem('token');
      if (token) {
        commit('SET_TOKEN', token);
        const user = jwt_decode(token);
        commit('SET_USER', user);
      }
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    currentUser: state => state.user
  }
};