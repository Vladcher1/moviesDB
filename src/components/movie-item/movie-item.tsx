import React from "react";
import "./movie-item.css";

import { IMovie } from "../../models";

const MovieItem = function movieItem({
  id,
  title,
  releaseDate,
  posterPath,
  cutInfo,
}: IMovie) {
  return (
    <div className="movie-container__movie-card movie-card" key={id}>
      <div className="movie-card__image">
        <img className="movie-card__image" src={posterPath} alt={title} />
      </div>
      <div className="movie-card__body">
        <h5 className="movie-card__title">{title}</h5>
        <div className="movie-card__date">{releaseDate}</div>
        <div className="movie-card__categories">
          <span className="movie-card__category">Action</span>
          <span className="movie-card__category">Drama</span>
        </div>
        <p className="movie-card__info">{cutInfo}</p>
      </div>
    </div>
  );
};

export default MovieItem;
