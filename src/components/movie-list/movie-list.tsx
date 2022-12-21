import React from "react";

import MovieItem from "../movie-item/movie-item";
import { IMovie, IState } from "../../models";

const MovieList = function movieList({ data }: Pick<IState, "data">) {
  const movies = data.map((movie: IMovie) => {
    const {
      id,
      title,
      info,
      releaseDate,
      posterPath,
      cutInfo,
      genreIds,
      averageRating,
    } = movie;
    return (
      <MovieItem
        key={id}
        id={id}
        title={title}
        info={info}
        releaseDate={releaseDate}
        posterPath={posterPath}
        cutInfo={cutInfo}
        genreIds={genreIds}
        averageRating={averageRating}
      />
    );
  });
  return <ul className="movies-container">{movies}</ul>;
};

export default MovieList;
