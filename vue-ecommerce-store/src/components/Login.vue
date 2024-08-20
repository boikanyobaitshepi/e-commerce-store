<template>
    <div class="login-container">
      <div v-if="isLoggedIn" class="logged-in">
        <p>Welcome, {{ username }}!</p>
        <button @click="handleLogout" class="logout-button">Log Out</button>
      </div>
      <form v-else @submit.prevent="handleSubmit" class="login-form">
        <h2>Login</h2>
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model.trim="username"
            required
            autocomplete="username"
            placeholder="Enter your username"
            class="form-input"
            :disabled="isLoading"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <div class="password-input">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model.trim="password"
              required
              autocomplete="current-password"
              placeholder="Enter your password"
              class="form-input"
              :disabled="isLoading"
            />
            <button type="button" @click="togglePassword" class="toggle-password" :disabled="isLoading">
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" aria-label="Toggle password visibility"></i>
            </button>
          </div>
        </div>
        <p v-if="error" class="error-message">{{ error }}</p>
        <button type="submit" :disabled="isLoading" class="submit-button">
          <span v-if="isLoading" class="loader"></span>
          <span v-else>Log In</span>
        </button>
      </form>
    </div>
  </template>
  <script>
  import { ref, computed } from 'vue';
  import {useStore} from 'vuex'
  import { useRouter, useRoute } from 'vue-router';
  // import axios from 'axios';
  
  export default {
    setup() {
      const store = useStore()
      const username = ref('');
      const password = ref('');
      const showPassword = ref(false);
      const isLoading = ref(false);
      const error = ref('');
      const isLoggedIn = ref(false);
  
      const router = useRouter();
      const route = useRoute();
  
      const togglePassword = () => {
        showPassword.value = !showPassword.value;
      };
  
      const handleSubmit = async () => {
    if (!username.value || !password.value) {
      error.value = 'Username and password are required';
      return;
    }
  
    isLoading.value = true;
  
    try {
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          username: username.value,
          password: password.value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const jsonData = await response.json();
  
      if (jsonData.token) {
        isLoggedIn.value = true;
        username.value = '';
        password.value = '';
        error.value = '';
        isLoading.value = false;
        router.push('/dashboard');
      } else {
        error.value = 'Invalid username or password';
        isLoading.value = false;
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      error.value = 'An error occurred. Please try again.';
      isLoading.value = false;
    }
  };
  
      const handleLogout = () => {
        isLoggedIn.value = false;
        router.push('/login');
      };
  
      return {
        username,
        password,
        showPassword,
        isLoading,
        error,
        isLoggedIn,
        togglePassword,
        handleSubmit,
        handleLogout
      };
    }
  }
  </script>
  
  <style scoped>
  .login-container {
    max-width: 300px;
    margin: 40px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .logged-in {
    text-align: center;
  }
  
  .logout-button {
    background-color: #4CAF50;
    color: #fff;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
  
  .logout-button:hover {
    background-color: #3e8e41;
  }
  
  .login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
  }
  
  .password-input {
    position: relative;
  }
  
  .toggle-password {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  
  .toggle-password i {
    font-size: 18px;
    color: #666;
  }
  
  .toggle-password:hover i {
    color: #333;
  }
  
  .submit-button {
    position: relative;
    background-color: #009688;
    color: #fff;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .submit-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  .loader {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid #ffffff;
    border-radius: 50%;
    border-top: 2px solid #009688;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .form-input:disabled {
    background-color: #f0f0f0;
    cursor: not-allowed;
  }
  
  .toggle-password:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  .error-message {
    color: red;
    font-size: 14px;
    margin-bottom: 10px;
  }
  </style>