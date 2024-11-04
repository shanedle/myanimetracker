import { useSharedState } from "./useSharedState";

import type { MyAnime } from "@/types";

export function useAnimeStorage() {
  const { myAnimeList } = useSharedState();

  const loadAnime = () => {
    const storedAnime = localStorage.getItem("my_anime");
    if (storedAnime) {
      myAnimeList.value = JSON.parse(storedAnime);
    }
  };

  const saveAnime = (anime: MyAnime[]) => {
    localStorage.setItem("my_anime", JSON.stringify(anime));
  };

  const addAnime = (anime: MyAnime) => {
    const exists = myAnimeList.value.some((a) => a.id === anime.id);
    if (!exists) {
      myAnimeList.value.push(anime);
      saveAnime(myAnimeList.value);
    }
  };

  const removeAnime = (anime: MyAnime) => {
    myAnimeList.value = myAnimeList.value.filter((a) => a.id !== anime.id);
    saveAnime(myAnimeList.value);
  };

  const updateEpisodes = (anime: MyAnime, increment: boolean) => {
    const target = myAnimeList.value.find((a) => a.id === anime.id);
    if (target) {
      if (increment && target.watched_episodes < target.total_episodes) {
        target.watched_episodes++;
      } else if (!increment && target.watched_episodes > 0) {
        target.watched_episodes--;
      }
      saveAnime(myAnimeList.value);
    }
  };

  return {
    myAnimeList,
    loadAnime,
    addAnime,
    removeAnime,
    updateEpisodes,
  };
}
