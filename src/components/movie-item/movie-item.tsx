import React from "react";
import "./movie-item.css";

import { IMovie } from "../../types";
import { MovieContextConsumer } from "../../servises/data-context";
import RateStars from "../rate-stars/rate-stars";

const MovieItem = function movieItem({
  id,
  title,
  releaseDate,
  posterPath,
  cutInfo,
  averageRating,
  genreIds,
  rating,
}: IMovie) {
  const classNamesMovieCard = () => {
    let classNames = "movie-card__average-rating";
    if (averageRating <= 3) {
      classNames += " red-rating";
    }
    if (averageRating <= 5 && averageRating > 3) {
      classNames += " orange-rating";
    }
    if (averageRating <= 7 && averageRating > 5) {
      classNames += " yellow-rating";
    }
    if (averageRating > 7) {
      classNames += " green-rating";
    }
    return classNames;
  };

  return (
    <MovieContextConsumer>
      {(genresArray: any) => {
        const { genres }: any = genresArray;
        const genreSpans = Array.from(genreIds).map((movieGenre: any) => {
          for (const obj of genres) {
            if (movieGenre === obj.id) {
              return (
                <span key={movieGenre} className="movie-card__category">
                  {obj.name}
                </span>
              );
            }
          }
        });

        return (
          <article className="movie-container__movie-card movie-card" key={id}>
            <div className="movie-card__image">
              <img className="movie-card__image" src={posterPath} alt={title} />
            </div>

            <div className="movie-card__body">
              <div className="movie-card__header">
                <h5 className="movie-card__title">{title}</h5>
                <div className={String(classNamesMovieCard())}>
                  <span>{averageRating.toFixed(1)}</span>
                </div>
              </div>
              <div className="movie-card__date">{releaseDate}</div>

              <div className="movie-card__categories">{genreSpans}</div>

              <p className="movie-card__info">{cutInfo}</p>
              <RateStars rating={rating} id={id} />
            </div>
          </article>
        );
      }}
    </MovieContextConsumer>
  );
};

export default MovieItem;
