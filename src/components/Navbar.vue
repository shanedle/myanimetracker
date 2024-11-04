<script setup lang="ts">
import { useTheme } from "@/composables/useTheme";
import { useSharedState } from "@/composables/useSharedState";
import { useAnimeSearch } from "@/composables/useAnimeSearch";
import { useAnimeStorage } from "@/composables/useAnimeStorage";
import { computed, ref, watch, onMounted, onUnmounted } from "vue";
import type { Anime } from "@/types";

const { isDark, toggleTheme } = useTheme();
const { myAnimeList } = useSharedState();
const { query, searchResults, searchAnime, clearSearch } = useAnimeSearch();
const { addAnime } = useAnimeStorage();
const drawer = ref(false);
const showSearch = ref(false);

const savedAnimeCount = computed(() => myAnimeList.value.length);

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
  showSearch.value = false;
};

watch(showSearch, (newValue) => {
  if (!newValue) {
    clearSearch();
  }
});

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape" && showSearch.value) {
    showSearch.value = false;
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <v-app-bar
    :color="isDark ? 'grey-darken-4' : 'white'"
    flat
    border
    elevation="1"
  >
    <v-container class="d-flex align-center px-4 px-sm-6">
      <v-app-bar-nav-icon class="d-flex d-sm-none" @click="drawer = !drawer" />

      <router-link to="/" class="text-decoration-none">
        <v-app-bar-title class="text-body-1 text-sm-h6">
          MyAnimeTracker
        </v-app-bar-title>
      </router-link>

      <v-spacer />

      <v-btn
        icon="mdi-magnify"
        @click="showSearch = !showSearch"
        class="mr-2"
      />

      <div class="d-none d-sm-flex align-center">
        <router-link to="/my-list" class="text-decoration-none">
          <v-btn prepend-icon="mdi-playlist-play" variant="tonal" class="mr-4">
            My List ({{ savedAnimeCount }})
          </v-btn>
        </router-link>

        <v-btn
          :icon="isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          @click="toggleTheme"
        />
      </div>
    </v-container>

    <v-expand-transition>
      <div
        v-if="showSearch"
        class="search-overlay"
        :class="{ 'dark-overlay': isDark }"
      >
        <v-container class="py-2">
          <v-form
            @submit.prevent="handleSearch"
            class="d-flex align-center gap-2"
          >
            <v-text-field
              v-model="query"
              placeholder="Search Anime..."
              variant="outlined"
              density="comfortable"
              hide-details
              autofocus
              @keyup.esc="showSearch = false"
            />
            <v-btn
              icon="mdi-close"
              @click="showSearch = false"
              variant="text"
            />
          </v-form>
        </v-container>

        <v-container v-if="searchResults.length" class="search-results py-0">
          <v-list>
            <v-list-item
              v-for="anime in searchResults"
              :key="anime.mal_id"
              class="mb-2"
            >
              <template v-slot:prepend>
                <v-img
                  :src="anime.images.jpg.image_url"
                  width="50"
                  height="70"
                  cover
                  class="rounded"
                />
              </template>

              <v-list-item-title class="text-subtitle-1 mb-1">
                {{ anime.title }}
              </v-list-item-title>

              <v-list-item-subtitle>
                <div class="d-flex align-center">
                  <v-icon
                    color="amber"
                    icon="mdi-star"
                    size="x-small"
                    class="mr-1"
                  />
                  {{ anime.score || "N/A" }}
                  <v-divider vertical class="mx-2" />
                  Episodes: {{ anime.episodes || "TBA" }}
                </div>
              </v-list-item-subtitle>

              <template v-slot:append>
                <v-btn
                  variant="tonal"
                  size="small"
                  color="primary"
                  @click="handleAddAnime(anime)"
                >
                  Add to List
                </v-btn>
              </template>
            </v-list-item>
          </v-list>
        </v-container>

        <v-container
          v-else-if="query && !searchResults.length"
          class="py-8 text-center"
        >
          <v-icon
            icon="mdi-magnify"
            size="40"
            class="mb-2 text-medium-emphasis"
          />
          <div class="text-medium-emphasis">
            No results found for "{{ query }}"
          </div>
        </v-container>
      </div>
    </v-expand-transition>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" location="left" temporary>
    <v-list>
      <v-list-item prepend-icon="mdi-home" title="Home" to="/" />
      <v-list-item
        prepend-icon="mdi-playlist-play"
        :title="`My List (${savedAnimeCount})`"
        to="/my-list"
      />
      <v-list-item
        :prepend-icon="isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        :title="isDark ? 'Light Mode' : 'Dark Mode'"
        @click="toggleTheme"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.search-overlay {
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  background: white;
  z-index: 100;
  border-bottom: 1px solid rgba(128, 128, 128, 0.2);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.dark-overlay {
  background: rgb(33, 33, 33);
}

.search-results {
  max-height: 400px;
  overflow-y: auto;
}

@media (max-width: 600px) {
  .search-overlay {
    top: 56px;
  }
}

.search-results::-webkit-scrollbar {
  width: 8px;
}

.search-results::-webkit-scrollbar-track {
  background: transparent;
}

.search-results::-webkit-scrollbar-thumb {
  background-color: rgba(128, 128, 128, 0.3);
  border-radius: 4px;
}

.search-results::-webkit-scrollbar-thumb:hover {
  background-color: rgba(128, 128, 128, 0.5);
}
</style>
