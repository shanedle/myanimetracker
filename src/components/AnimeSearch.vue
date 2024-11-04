<script setup lang="ts">
import { useAnimeSearch } from "@/composables/useAnimeSearch";
import type { Anime } from "@/types";
import moment from "moment";

const emit = defineEmits<{
  (e: "add-anime", anime: Anime): void;
}>();

const { query, searchResults, searchAnime } = useAnimeSearch();

const formattedDate = (date: string) => moment(date).format("MMM D, YYYY");
</script>

<template>
  <div class="mb-6">
    <v-form @submit.prevent="searchAnime" class="px-4 sm:px-0">
      <v-text-field
        v-model="query"
        placeholder="Search Anime..."
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        density="comfortable"
        hide-details
        class="mb-2"
      />
    </v-form>

    <div v-if="searchResults.length" class="search-results px-4 sm:px-0">
      <v-card
        v-for="anime in searchResults"
        :key="anime.mal_id"
        class="mb-3"
        variant="outlined"
      >
        <div class="d-flex flex-column flex-sm-row pa-3 gap-3">
          <v-img
            :src="anime.images.jpg.image_url"
            width="120"
            height="180"
            cover
            class="rounded flex-grow-0"
          />
          <div class="flex-grow-1">
            <h3 class="text-h6 mb-2">{{ anime.title }}</h3>
            <div class="text-body-2 mb-1">
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
              @click="emit('add-anime', anime)"
            >
              Add to list
            </v-btn>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<style scoped>
.search-results {
  max-height: 480px;
  overflow-y: auto;
}
</style>
