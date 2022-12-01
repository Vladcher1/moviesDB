import React from "react";

import MovieItem from "../movie-item/movie-item";
import { IState, IMovie } from "../../models";

const MovieList = function movieList({ data }: IState) {
  const movies = data.map((movie: IMovie) => {
    const { id, title, info, releaseDate, posterPath, cutInfo } = movie;
    return (
      <MovieItem
        key={id}
        id={id}
        title={title}
        info={info}
        releaseDate={releaseDate}
        posterPath={posterPath}
        cutInfo={cutInfo}
      />
    );
  });
  return <ul className="movies-container">{movies}</ul>;
};

export default MovieList;
