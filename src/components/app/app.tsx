import React from "react";
import { format } from "date-fns";

import { IState } from "../../models";
import "./app.css";
import MovieList from "../movie-list/movie-list";
import MovieDB from "../../servises/data";

export default class App extends React.Component {
  state: IState = {
    data: [],
  };

  constructor(props: any) {
    super(props);
    this.getMovie();
  }

  getMovie() {
    MovieDB.getResourse().then((body: any) => {
      const moviesArr = body.map((movie: any) => this.createMovie(movie));
      this.setState({ data: moviesArr });
    });
  }

  cutInfo = (text: string) => {
    let counter = 0;
    let res = "";

    // eslint-disable-next-line no-restricted-syntax
    for (const letter of text) {
      counter++;
      res += letter;
      if (counter >= 150 && letter === " ") {
        break;
      }
    }
    res += "...";
    return res;
  };

  createMovie(movie: any) {
    return {
      id: movie.id,
      title: movie.title,
      info: movie.overview,
      releaseDate: format(new Date(movie.release_date), "MMMM dd, yyyy"),
      posterPath: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      cutInfo: this.cutInfo(movie.overview),
    };
  }

  render() {
    const { data } = this.state;
    return <MovieList data={data} />;
  }
}
