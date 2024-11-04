<script setup lang="ts">
import moment from "moment";

import type { Anime } from "@/types";

import { useAnimeSearch } from "@/composables/useAnimeSearch";

const emit = defineEmits<{
  (e: "add-anime", anime: Anime): void;
}>();

const { query, searchResults, searchAnime, clearSearch } = useAnimeSearch();

const formattedDate = (date: string) => moment(date).format("MMM D, YYYY");

const handleAddAnime = (anime: Anime) => {
  emit("add-anime", anime);
  clearSearch();
};
</script>

<template>
  <div class="mb-8">
    <v-form @submit.prevent="searchAnime">
      <v-text-field
        v-model="query"
        placeholder="Search Anime..."
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        density="comfortable"
        hide-details
        class="mb-4"
      />
    </v-form>

    <div
      v-if="searchResults.length"
      class="max-h-96 overflow-y-auto rounded-lg border border-gray-200"
    >
      <div
        v-for="anime in searchResults"
        :key="anime.mal_id"
        class="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors"
      >
        <div class="flex items-start gap-4">
          <img
            :src="anime.images.jpg.image_url"
            :alt="anime.title"
            class="w-24 h-36 object-cover rounded-lg"
          />
          <div class="flex-1">
            <h3 class="text-lg font-semibold mb-2">{{ anime.title }}</h3>
            <div class="text-sm text-gray-600 space-y-1">
              <p v-if="anime.aired.from">
                Aired: {{ formattedDate(anime.aired.from) }}
                <template v-if="anime.aired.to">
                  to {{ formattedDate(anime.aired.to) }}
                </template>
              </p>
              <p>Score: {{ anime.score || "?" }}</p>
              <p>Status: {{ anime.status }}</p>
            </div>
            <v-btn color="primary" class="mt-4" @click="handleAddAnime(anime)">
              Add to list
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
