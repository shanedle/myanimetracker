import { ref, watch } from "vue";
import type { Anime } from "@/types";

export function useAnimeSearch() {
  const query = ref("");
  const searchResults = ref<Anime[]>([]);
  const isLoading = ref(false);
  let debounceTimeout: NodeJS.Timeout;

  const searchAnime = async () => {
    if (!query.value) {
      searchResults.value = [];
      return;
    }

    isLoading.value = true;
    try {
      const url = `https://api.jikan.moe/v4/anime?q=${query.value}`;
      const response = await fetch(url);
      const data = await response.json();
      searchResults.value = data.data;
    } catch (error) {
      console.error("Error searching anime:", error);
    } finally {
      isLoading.value = false;
    }
  };

  const debouncedSearch = () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      searchAnime();
    }, 300);
  };

  watch(query, () => {
    debouncedSearch();
  });

  const clearSearch = () => {
    searchResults.value = [];
    query.value = "";
  };

  return {
    query,
    searchResults,
    isLoading,
    searchAnime,
    clearSearch,
  };
}
