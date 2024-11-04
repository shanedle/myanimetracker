<script setup lang="ts">
import { onMounted } from "vue";
import { useAnimeAPI } from "@/composables/useAnimeAPI";
import AnimeGrid from "@/components/AnimeGrid.vue";

const {
  topAnime,
  seasonalAnime,
  isLoading,
  fetchTopAnime,
  fetchSeasonalAnime,
} = useAnimeAPI();

onMounted(async () => {
  await Promise.all([fetchTopAnime(), fetchSeasonalAnime()]);
});
</script>

<template>
  <div class="py-6">
    <AnimeGrid title="Top Anime" :animes="topAnime" :loading="isLoading" />
    <AnimeGrid
      title="Current Season"
      :animes="seasonalAnime"
      :loading="isLoading"
    />
  </div>
</template>
