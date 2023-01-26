import React from "react";

import MovieItem from "../movie-item/movie-item";
import { IMovie, IState } from "../../types";

const MovieList = function movieList({ data }: Pick<IState, "data">) {
  const movies = data.map((movie: IMovie) => (
    <MovieItem {...movie} key={movie.id} />
  ));
  return <ul className="movies-container">{movies}</ul>;
};

export default MovieList;
