import React from "react";

import MovieItem from "../movie-item/movie-item";
import { IMovie } from "../../models";

const MovieList = function movieList({ data }: any) {
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
  // if (movies.length !== 0) {
  return <ul className="movies-container">{movies}</ul>;
  // }
  // return (
  //   <div className="movies-container">
  //     Sorry, there are no films with this name
  //   </div>
  // );
};

export default MovieList;
