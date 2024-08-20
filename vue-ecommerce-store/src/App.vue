<template>

 
    <Header/>
    <!-- <ThemeToggle/> -->
    <router-view></router-view>

</template>

<script>

import Header from './components/Header.vue';
// import ThemeToggle from './components/ThemeToggle.vue';
// import './assets/style.css'



export default {
  name:'App',
  components:{
    Header,
    // ThemeToggle,
  },

 
}
</script>
