import React from "react";

import MovieList from "../movie-list/movie-list";

function Rated({ ratedMovies }: any) {
  return <MovieList data={ratedMovies} />;
}

export default Rated;
