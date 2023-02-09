export interface IMovie {
  rating: any;
  id?: number;
  title?: string;
  info?: string;
  releaseDate?: string;
  posterPath?: string;
  cutInfo?: string;
  genreIds: string;
  averageRating: number;
}
export interface IState {
  data: IMovie[];
  loading: boolean;
  error: boolean;
  network: boolean;
  value: string;
  page: number;
  notFound: boolean;
  totalPages: number;
  isSearch: boolean;
  ratedMovies: IMovie[];
  totalPagesRated: number;
  currentRatedPage: number;
}

export interface IMovieFromServer {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  rating: number;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
