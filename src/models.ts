export interface IMovie {
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
}
