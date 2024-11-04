<script setup lang="ts">
import { onMounted } from "vue";

import type { Anime } from "./types";

import { useAnimeStorage } from "./composables/useAnimeStorage";

import AnimeSearch from "./components/AnimeSearch.vue";
import AnimeList from "./components/AnimeList.vue";

const { loadAnime, addAnime } = useAnimeStorage();

const handleAddAnime = (anime: Anime) => {
  const newAnime = {
    id: anime.mal_id,
    title: anime.title,
    image: anime.images.jpg.image_url,
    score: anime.score,
    status: anime.status,
    aired_from: anime.aired.from,
    aired_to: anime.aired.to,
    total_episodes: anime.episodes,
    watched_episodes: 0,
  };

  addAnime(newAnime);
};

onMounted(() => {
  loadAnime();
});
</script>

<template>
  <v-app class="bg-primary min-h-screen">
    <v-main>
      <v-container class="max-w-4xl mx-auto">
        <h1 class="text-center text-4xl font-bold text-white mb-8">
          MyAnimeTracker
        </h1>
        <div class="bg-white rounded-lg shadow-lg p-6">
          <AnimeSearch @add-anime="handleAddAnime" />
          <AnimeList />
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>
