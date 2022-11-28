import React from "react";
import "./movie-item.css";

export default class MovieItem extends React.Component {
  state = {};

  render() {
    return (
      <div className="movie-container__movie-card movie-card">
        <div className="movie-card__image">img</div>
        <div className="movie-card__body">
          <h5 className="movie-card__title">The way back</h5>
          <div className="movie-card__date">March 5, 2020</div>
          <div className="movie-card__categories">
            <span className="movie-card__category">Action</span>
            <span className="movie-card__category">Drama</span>
          </div>
          <p className="movie-card__info">
            A former basketball all-star, who has lost his wife and family
            foundation in a struggle with addiction attempts to regain his soul
            and salvation by becoming the coach of a disparate ethnically mixed
            high ...
          </p>
        </div>
      </div>
    );
  }
}
