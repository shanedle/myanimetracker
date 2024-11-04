import { ref } from "vue";
import type { Anime } from "@/types";

export function useAnimeAPI() {
  const topAnime = ref<Anime[]>([]);
  const seasonalAnime = ref<Anime[]>([]);
  const isLoading = ref(false);

  const fetchTopAnime = async () => {
    isLoading.value = true;
    try {
      const response = await fetch(
        "https://api.jikan.moe/v4/top/anime?limit=10"
      );
      const data = await response.json();
      topAnime.value = data.data;
    } catch (error) {
      console.error("Error fetching top anime:", error);
    } finally {
      isLoading.value = false;
    }
  };

  const fetchSeasonalAnime = async () => {
    isLoading.value = true;
    try {
      const response = await fetch(
        "https://api.jikan.moe/v4/seasons/now?limit=10"
      );
      const data = await response.json();
      seasonalAnime.value = data.data;
    } catch (error) {
      console.error("Error fetching seasonal anime:", error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    topAnime,
    seasonalAnime,
    isLoading,
    fetchTopAnime,
    fetchSeasonalAnime,
  };
}
