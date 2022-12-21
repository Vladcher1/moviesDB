import React from "react";
import { format } from "date-fns";

import { IMovie, IState, IMovieFromServer } from "../../models";
import "./app.css";
import MovieList from "../movie-list/movie-list";
import MovieDB from "../../servises/data";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../error/error-message";
import NetworkState from "../network-state/network-state";
import Pagination from "../pagination/pagination";
import SearchInput from "../search-input/search-input";
import Header from "../header/header";
import { MovieContextProvider } from "../../servises/data-context";
import Rated from "../rated/rated";

export default class App extends React.Component<any, any> {
  static cutInfo = (text: string) => {
    let counter = 0;
    let res = "";

    // eslint-disable-next-line no-restricted-syntax
    for (const letter of text) {
      counter++;
      res += letter;
      if (counter >= 100 && letter === " ") {
        break;
      }
    }
    res += "...";
    return res;
  };

  movieServise = new MovieDB();

  genresArray = undefined;

  state: IState = {
    data: [],
    ratedMovies: [],
    loading: false,
    error: false,
    network: true,
    value: "",
    page: 1,
    notFound: false,
    totalPages: 0,
    isSearch: true,
  };

  componentDidMount() {
    this.movieServise.getGenres().then((genres) => {
      this.genresArray = genres;
    });
  }

  componentDidUpdate(prevProps: any, prevState: Readonly<any>): void {
    const { value, page } = this.state;
    if (value === "") {
      return;
    }
    if (value !== prevState.value || page !== prevState.page) {
      this.setState({ loading: true, notFound: false });
      this.movieServise
        .getResourse(value, page)
        .then((body: any) => {
          const { results } = body;
          if (results.length === 0) {
            this.setState({
              notFound: true,
              loading: false,
              error: false,
              data: [],
            });
          } else {
            const moviesArr = results.map((movie: IMovie) => {
              const newMovie = this.createMovie(movie);
              return newMovie;
            });
            this.setState({
              data: moviesArr,
              loading: false,
              error: false,
              notFound: false,
              totalPages: body.total_pages,
            });
          }
        })
        .catch((error) => this.onError(error));
    }
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
      notFound: false,
    });
  };

  onNetworkState: Function = () => {
    this.setState(({ network }: Pick<IState, "network">) => ({
      network: !network,
      loading: false,
      notFound: false,
    }));
  };

  getValue = (valueC: string) => {
    this.setState({ value: valueC });
  };

  nextPage = (page: number) => {
    this.setState({
      page,
    });
  };

  toggleSearch = (button: string) => {
    if (button !== "search") {
      this.movieServise.getRated().then((rated: IMovie[]) => {
        this.ratedInState(rated);
      });

      this.setState({
        isSearch: false,
      });
    } else {
      this.setState({
        isSearch: true,
      });
    }
  };

  ratedInState = (newData: IMovie[]) => {
    const ratedList = newData.map((movieRated: any) => {
      const ratedMovie = this.createMovie(movieRated);
      return ratedMovie;
    });
    this.setState({
      ratedMovies: ratedList,
    });
  };

  createMovie(movie: IMovieFromServer) {
    const releaseDate = movie.release_date;
    if (movie.release_date !== "") {
      format(new Date(movie.release_date), "MMMM dd, yyyy");
    }
    return {
      id: movie.id,
      title: movie.title,
      info: movie.overview,
      releaseDate,
      posterPath: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      cutInfo: this.cutInfo(movie.overview),
      genreIds: Array.from(movie.genre_ids),
      rating: [false, 0],
      averageRating: movie.vote_average,
    };
  }

  render() {
    const {
      data,
      loading,
      error,
      network,
      value,
      notFound,
      page,
      totalPages,
      isSearch,
      ratedMovies,
    } = this.state;

    const hasData = !loading && !error && value !== "";
    const movieList =
      hasData && isSearch ? <MovieList data={data} value={value} /> : null;
    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage network={network} /> : null;
    const noNetwork = !network ? <ErrorMessage network={network} /> : null;
    const notFoundMovies = notFound ? (
      <div className="not-found">
        <span>Sorry, no films &quot;{value}&quot; are found :(</span>
      </div>
    ) : null;
    const rated = !isSearch ? (
      <Rated ratedMovies={ratedMovies} ratedInState={this.ratedInState} />
    ) : null;
    return (
      <div className="body-container">
        <MovieContextProvider value={this.genresArray}>
          <NetworkState onNetworkState={this.onNetworkState} />
          {!error ? (
            <Header toggleSearch={this.toggleSearch} isSearch={isSearch} />
          ) : null}
          {rated}
          {!error && isSearch ? <SearchInput getValue={this.getValue} /> : null}
          {noNetwork}
          {movieList}
          {notFoundMovies}
          {spinner}
          {errorMessage}
          {hasData && !notFound && !rated ? (
            <Pagination
              page={page}
              nextPage={this.nextPage}
              totalPages={totalPages}
            />
          ) : null}
        </MovieContextProvider>
      </div>
    );
  }
}
