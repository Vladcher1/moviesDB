import React from "react";
import "./movie-item.css";

import { IMovie } from "../../models";
// import { MoviesConsumer } from "../../servises/data-context";
import RateStars from "../rate-stars/rate-stars";

const MovieItem = function movieItem({
  id,
  title,
  releaseDate,
  posterPath,
  cutInfo,
  averageRating,
}: IMovie) {
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

  return (
    <div className="movie-container__movie-card movie-card" key={id}>
      <div className="movie-card__image">
        <img className="movie-card__image" src={posterPath} alt={title} />
      </div>

      <div className="movie-card__body">
        <div className="movie-card__header">
          <h5 className="movie-card__title">{title}</h5>
          <div className={classNames}>{averageRating}</div>
        </div>
        <div className="movie-card__date">{releaseDate}</div>
        <div className="movie-card__categories">
          <span className="movie-card__category">Action</span>
          <span className="movie-card__category">Drama</span>
        </div>
        <p className="movie-card__info">{cutInfo}</p>
        <RateStars />
      </div>
    </div>
  );
};

export default MovieItem;
