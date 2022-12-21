import React from "react";

import { IState } from "../../models";
import MovieList from "../movie-list/movie-list";

function Rated({ ratedMovies }: IState) {
  return <MovieList data={ratedMovies} />;
}

export default Rated;
