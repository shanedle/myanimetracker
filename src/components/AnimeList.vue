<script setup lang="ts">
import { computed } from "vue";
import { useSharedState } from "@/composables/useSharedState";
import { useAnimeStorage } from "@/composables/useAnimeStorage";
import Container from "./Container.vue";

const { myAnimeList } = useSharedState();
const { updateEpisodes, removeAnime } = useAnimeStorage();

const sortedAnime = computed(() => {
  return [...myAnimeList.value].sort((a, b) => a.title.localeCompare(b.title));
});
</script>

<template>
  <Container>
    <template v-if="myAnimeList.length">
      <v-card
        v-for="anime in sortedAnime"
        :key="anime.id"
        class="mb-4"
        variant="outlined"
      >
        <div class="d-flex flex-column flex-sm-row gap-3 pa-3">
          <v-img
            :src="anime.image"
            width="100"
            height="150"
            cover
            class="rounded flex-grow-0"
          />

          <div class="flex-grow-1">
            <div class="d-flex flex-column flex-sm-row gap-3 align-sm-center">
              <h3 class="text-h6">{{ anime.title }}</h3>

              <div class="d-flex align-center gap-2 ms-sm-auto">
                <span class="text-body-2">
                  {{ anime.watched_episodes }} / {{ anime.total_episodes }}
                </span>

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

            <div class="mt-2 text-body-2">
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
          </div>
        </div>
      </v-card>
    </template>

    <v-card v-else class="pa-6 text-center" variant="outlined">
      <v-icon icon="mdi-playlist-plus" size="48" class="mb-2" />
      <div class="mb-2 text-h6">Your list is empty</div>
      <div class="text-body-2 text-medium-emphasis">
        Search and add some anime to your list!
      </div>
    </v-card>
  </Container>
</template>
