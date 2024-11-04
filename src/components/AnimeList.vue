<script setup lang="ts">
import { computed } from "vue";
import { useSharedState } from "@/composables/useSharedState";
import { useAnimeStorage } from "@/composables/useAnimeStorage";

const { myAnimeList } = useSharedState();
const { updateEpisodes, removeAnime } = useAnimeStorage();

const sortedAnime = computed(() => {
  return [...myAnimeList.value].sort((a, b) => a.title.localeCompare(b.title));
});
</script>

<template>
  <div class="space-y-4">
    <template v-if="myAnimeList.length">
      <div
        v-for="anime in sortedAnime"
        :key="anime.id"
        class="bg-white rounded-lg shadow p-4 flex items-center gap-4"
      >
        <img
          :src="anime.image"
          :alt="anime.title"
          class="w-16 h-16 object-cover rounded-lg"
        />

        <div class="flex-1">
          <h3 class="text-lg font-semibold">{{ anime.title }}</h3>
        </div>

        <div class="flex items-center gap-4">
          <span class="text-gray-600">
            {{ anime.watched_episodes }} / {{ anime.total_episodes }}
          </span>

          <div class="flex gap-2">
            <v-btn
              v-if="anime.watched_episodes > 0"
              icon="mdi-minus"
              variant="text"
              size="small"
              @click="updateEpisodes(anime, false)"
            />

            <v-btn
              v-if="anime.watched_episodes < anime.total_episodes"
              icon="mdi-plus"
              variant="text"
              size="small"
              @click="updateEpisodes(anime, true)"
            />

            <v-btn
              icon="mdi-delete"
              variant="text"
              color="error"
              size="small"
              @click="removeAnime(anime)"
            />
          </div>
        </div>
      </div>
    </template>

    <div v-else class="text-center py-8 text-gray-500">
      No anime in your list yet. Search and add some anime!
    </div>
  </div>
</template>
