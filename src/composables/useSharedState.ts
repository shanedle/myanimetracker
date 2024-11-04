import { ref } from "vue";

import type { MyAnime } from "@/types";

const myAnimeList = ref<MyAnime[]>([]);

export function useSharedState() {
  return {
    myAnimeList,
  };
}
