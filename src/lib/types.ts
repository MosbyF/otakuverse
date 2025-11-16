export type MediaType = {
  id: string;
  title: string;
  type: 'Anime' | 'Manga';
  description: string;
  longDescription: string;
  genres: string[];
  rating: number;
  imageUrl: string;
  imageHint: string;
  status: 'Featured' | 'Trending' | 'Latest';
  duration?: string;
  chapters?: number;
  releaseYear?: number;
};

export type GenreType = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export type FandomPost = {
  id: number;
  author: string;
  avatarUrl: string;
  avatarHint: string;
  content: string;
  timestamp: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
  sentimentScore?: number;
};
