<template>
    <header
      @mousemove="onMousemove"
      :style="{ backgroundColor: `hsl(${x}, 80%, 50%)` }"
    >
      <div class="header-content">
        <nav>
          <ul>
            <li><router-link to="/"><i class="fas fa-store"></i> Home</router-link></li>
            <li> <router-link to="/cart">
        <i class="fas fa-shopping-cart"></i> Cart ({{ cartItemCount }})
      </router-link></li>
            <li><router-link to="/wishlist"><i class="fas fa-heart"></i> Wishlist</router-link></li>
            <li v-if="!isLoggedIn">
              <a href="#" @click.prevent="showModal = 'login'">
                <i class="fas fa-sign-in-alt"></i> Login
              </a>
            </li>
            <li v-if="isLoggedIn">
            <a href="#" @click.prevent="logout">Logout</a>
          </li>
          </ul>
        </nav>
      </div>
      <Login v-if="showModal === 'login'" @close="showModal = null" />
    </header>
    </template>
    
    <script>
    import { ref, computed, onMounted } from 'vue';
    import { useStore } from 'vuex';
    import { useRouter } from 'vue-router';
    import Login from './Login.vue';
   
    
    export default {
      components: {
    
    },
      setup() {
        const store = useStore();
        const router = useRouter();
        const x = ref(0);
        const showModal = ref(null);
        const login = ref({ username: '', password: '' });

        
        const isLoggedIn = computed(() => store.getters['auth/isLoggedIn']);
     
        const handleLogout = () => {
        store.dispatch('auth/logout')
      }
        function onMousemove(e) {
          x.value = e.clientX;
        }
  
  
      const cartItemCount = computed(() => store.getters.cartItemCount);
  
    
        function logout() {
          store.dispatch('auth/logout');
          router.push('/');
        }
        onMounted(() => {
        store.dispatch('initTheme');
      });
        return {
          x,
          onMousemove,
          showModal,
          // loginForm,
          isLoggedIn,
          cartItemCount,
          login,
          handleLogout,
         
  
        };
      },
    };
    </script>
    
    <style>
    header {
    transition: 0.3s background-color ease;
    padding: 1rem;
  }
  
  nav ul {
    display: flex;
    justify-content: center;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  
  nav li {
    margin: 0 1rem;
  }
  
  nav a {
    color: #fff;
    text-decoration: none;
    display: flex;
    align-items: center;
  }
  
  nav i {
    margin-right: 0.5rem;
  }
  
  main {
    padding: 2rem;
  }
  
  .modal {
    display: block;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
  }
  
  .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 30%;
  }
  
  .close-button {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  
  .close-button:hover,
  .close-button:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
    form {
      display: flex;
      flex-direction: column;
    }
    
    input {
      margin-bottom: 1rem;
      padding: 0.5rem;
    }
    
    button {
      padding: 0.5rem;
      background-color: #4CAF50;
      color: white;
      border: none;
      cursor: pointer;
    }
    
    button:hover {
      background-color: #45a049;
    }
    .theme-toggle {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    color: #fff;
    padding: 0;
    margin: 0;
  
  }
  
  .theme-toggle:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  } 
    </style>