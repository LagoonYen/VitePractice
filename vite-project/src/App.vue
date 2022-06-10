<template>
  <div>
    <nav>
      <div>
        <button @click="handSignOut" v-if="isLoggedIn">退出</button>
      </div>
    </nav>
    <nav>
      <mainPageMenuVue></mainPageMenuVue>
    </nav>
    
    <router-view />
    
  </div>
</template>

<script setup>
  import { onMounted, ref } from "vue";
  import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
  import { useRouter } from "vue-router";
  import { realtimeDb } from "../src/configs/firebase"
  import { ref as ref_database, set } from "firebase/database"
  import mainPageMenuVue from "./components/mainPageMenu.vue";

  const isLoggedIn = ref(false);
  const router = useRouter()
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>

