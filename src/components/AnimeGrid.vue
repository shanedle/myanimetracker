<script setup lang="ts">
import type { Anime } from "@/types";
import { useAnimeStorage } from "@/composables/useAnimeStorage";

defineProps<{
  title: string;
  animes: Anime[];
  loading?: boolean;
}>();

const { addAnime } = useAnimeStorage();

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
</script>

<template>
  <div class="mb-8">
    <h2 class="text-xl sm:text-2xl font-bold mb-4 px-4 sm:px-0">{{ title }}</h2>
    <v-row v-if="!loading">
      <v-col
        v-for="anime in animes"
        :key="anime.mal_id"
        cols="6"
        sm="4"
        md="3"
        lg="2"
        class="pa-2"
      >
        <v-card class="h-100 d-flex flex-column">
          <div class="anime-image-container">
            <v-img
              :src="anime.images.jpg.image_url"
              cover
              class="anime-image"
            />
          </div>
          <v-card-title class="text-subtitle-2 text-sm-subtitle-1 py-2">
            <div class="line-clamp-2">{{ anime.title }}</div>
          </v-card-title>
          <v-card-text class="py-2 flex-grow-1">
            <div class="d-flex align-center mb-1">
              <v-icon color="amber" icon="mdi-star" size="small" class="mr-1" />
              <span class="text-body-2">{{ anime.score || "N/A" }}</span>
            </div>
            <div class="text-caption">
              Episodes: {{ anime.episodes || "TBA" }}
            </div>
          </v-card-text>
          <v-card-actions class="pa-2">
            <v-btn
              variant="tonal"
              block
              size="small"
              @click="handleAddAnime(anime)"
            >
              Add to List
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col
        v-for="n in 12"
        :key="n"
        cols="6"
        sm="4"
        md="3"
        lg="2"
        class="pa-2"
      >
        <v-skeleton-loader type="image, article" class="h-100" />
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.anime-image-container {
  position: relative;
  width: 100%;
  padding-top: 140%;
}

.anime-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-clamp: 2;
  overflow: hidden;
}
</style>
