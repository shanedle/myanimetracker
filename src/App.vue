<script setup>
import { ref, onMounted, computed } from "vue";

const query = ref("");
const my_anime = ref([]);
const search_results = ref([]);

const my_anime_asc = computed(() => {
  return my_anime.value.sort((a, b) => {
    return a.title.localeCompare(b.title);
  });
});

const searchAnime = () => {
  const url = `https://api.jikan.moe/v4/anime?q=${query.value}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      search_results.value = data.data;
    });
};

const handleInput = (e) => {
  if (!e.target.value) {
    search_results.value = [];
  }
};

const addAnime = (anime) => {
  search_results.value = [];
  query.value = "";
  if (anime !== my_anime.value) {
    my_anime.value.push({
      id: anime.mal_id,
      title: anime.title,
      image: anime.images.jpg.image_url,
      total_episodes: anime.episodes,
      watched_episodes: 0,
    });
    localStorage.setItem("my_anime", JSON.stringify(my_anime.value));
  }
};

const removeAnime = (anime) => {
  const filtered = (my_anime.value = my_anime.value.filter((t) => t !== anime));
  localStorage.setItem("my_anime", JSON.stringify(filtered));
};

const increaseWatch = (anime) => {
  anime.watched_episodes++;
  localStorage.setItem("my_anime", JSON.stringify(my_anime.value));
};

const decreaseWatch = (anime) => {
  anime.watched_episodes--;
  localStorage.setItem("my_anime", JSON.stringify(my_anime.value));
};

onMounted(() => {
  my_anime.value = JSON.parse(localStorage.getItem("my_anime")) || [];
});
</script>

<template>
  <main>
    <h1>MyAnimeTracker</h1>

    <form @submit.prevent="searchAnime">
      <input
        type="text"
        placeholder="Search Anime..."
        v-model="query"
        @input="handleInput"
      />
      <button type="submit" class="button search_btn">Search</button>
    </form>

    <div class="results" v-if="search_results.length > 0">
      <div v-for="anime in search_results" class="result">
        <img :src="anime.images.jpg.image_url" />
        <div class="details">
          <h3>{{ anime.title }}</h3>
          <p :title="anime.synopsis" v-if="anime.synopsis">
            {{ anime.synopsis.slice(0, 120) }}...
          </p>
          <span class="flex-1"></span>
          <button @click="addAnime(anime)" class="button">Add to list</button>
        </div>
      </div>
    </div>

    <div class="my-anime" v-if="my_anime.length > 0">
      <div v-for="anime in my_anime_asc" class="anime">
        <img :src="anime.image" />
        <h3>{{ anime.title }}</h3>
        <div class="flex-1"></div>
        <span class="episodes"
          >{{ anime.watched_episodes }} / {{ anime.total_episodes }}</span
        >

        <button
          v-if="anime.watched_episodes > 0"
          @click="decreaseWatch(anime)"
          class="button"
        >
          -
        </button>
        <button
          v-if="anime.total_episodes !== anime.watched_episodes"
          @click="increaseWatch(anime)"
          class="button"
        >
          +
        </button>
        <button class="button" @click="removeAnime(anime)">Remove</button>
      </div>
    </div>
  </main>
</template>
