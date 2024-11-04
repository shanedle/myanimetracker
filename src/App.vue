<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useTheme } from "@/composables/useTheme";
import { useAnimeStorage } from "@/composables/useAnimeStorage";
import Navbar from "@/components/Navbar.vue";

const { isDark } = useTheme();
const { loadAnime } = useAnimeStorage();

watch(isDark, (newValue) => {
  document.documentElement.classList.toggle("dark", newValue);
});

onMounted(() => {
  loadAnime();
  document.documentElement.classList.toggle("dark", isDark.value);
});
</script>

<template>
  <v-app :theme="isDark ? 'dark' : 'light'">
    <Navbar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
