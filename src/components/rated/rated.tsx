import React from "react";

import MovieList from "../movie-list/movie-list";
import MovieDB from "../../servises/data";

function Rated({ ratedInState, ratedMovies }: any) {
  // const movieServise = new MovieDB();
  // let newData;

  // movieServise.getRated().then((rated) => {
  //   newData = rated;
  //   ratedInState(newData);
  // });
  return <MovieList data={ratedMovies} />;
}

export default Rated;
