export interface Anime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  score: number;
  status: string;
  aired: {
    from: string;
    to: string;
  };
  episodes: number;
}

export interface MyAnime {
  id: number;
  title: string;
  image: string;
  score: number;
  status: string;
  aired_from: string;
  aired_to: string;
  total_episodes: number;
  watched_episodes: number;
}
