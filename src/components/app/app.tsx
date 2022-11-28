import React from "react";

import "./app.css";
import MovieItem from "../movie-item/movie-item";

export default class App extends React.Component {
  state = {
    wow: true,
  };

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    // const { wow }: any = this.state.wow;
    return (
      <div className="movies-container">
        <MovieItem />
      </div>
    );
  }
}
