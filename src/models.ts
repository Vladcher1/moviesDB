export interface IMovie {
  id?: number;
  title?: string;
  info?: string;
  releaseDate?: string;
  posterPath?: string;
  cutInfo?: string;
}
export interface IState {
  data: IMovie[];
}
