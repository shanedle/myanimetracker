<script setup lang="ts">
import AnimeList from "@/components/AnimeList.vue";
import Container from "@/components/Container.vue";
import { useAnimeSearch } from "@/composables/useAnimeSearch";
import { useAnimeStorage } from "@/composables/useAnimeStorage";
import type { Anime } from "@/types";
import moment from "moment";

const { query, searchResults, searchAnime, clearSearch } = useAnimeSearch();
const { addAnime } = useAnimeStorage();

const handleSearch = (e: Event) => {
  e.preventDefault();
  searchAnime();
};

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
  clearSearch();
};

const formattedDate = (date: string) => moment(date).format("MMM D, YYYY");
</script>

<template>
  <div class="py-6">
    <Container>
      <h2 class="mb-4 text-xl font-bold sm:text-2xl">My Anime List</h2>

      <div class="mb-6">
        <v-form @submit.prevent="handleSearch">
          <v-text-field
            v-model="query"
            placeholder="Search Anime..."
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            density="comfortable"
            hide-details
          />
        </v-form>

        <div v-if="searchResults.length" class="mt-4">
          <v-card
            v-for="anime in searchResults"
            :key="anime.mal_id"
            class="mb-3"
            variant="outlined"
          >
            <div class="d-flex flex-column flex-sm-row gap-3 pa-3">
              <v-img
                :src="anime.images.jpg.image_url"
                width="120"
                height="180"
                cover
                class="rounded flex-grow-0"
              />
              <div class="flex-grow-1">
                <h3 class="mb-2 text-h6">{{ anime.title }}</h3>
                <div class="mb-1 text-body-2">
                  <div v-if="anime.aired.from">
                    Aired: {{ formattedDate(anime.aired.from) }}
                    <template v-if="anime.aired.to">
                      to {{ formattedDate(anime.aired.to) }}
                    </template>
                  </div>
                  <div class="d-flex align-center">
                    <v-icon
                      color="amber"
                      icon="mdi-star"
                      size="small"
                      class="mr-1"
                    />
                    {{ anime.score || "N/A" }}
                  </div>
                  <div>Status: {{ anime.status }}</div>
                </div>
                <v-btn
                  color="primary"
                  variant="tonal"
                  size="small"
                  @click="handleAddAnime(anime)"
                >
                  Add to list
                </v-btn>
              </div>
            </div>
          </v-card>
        </div>
      </div>

      <AnimeList />
    </Container>
  </div>
</template>
