import React from "react";
import { format } from "date-fns";

import { IMovie, IState } from "../../models";
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

  onError = (error: any) => {
    this.setState({
      error: true,
      loading: false,
      notFound: false,
    });
    console.log(error);
  };

  onNetworkState = () => {
    this.setState(({ network }: any) => ({
      network: !network,
      loading: false,
      notFound: false,
    }));
  };

  cutInfo = (text: string) => {
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
      let newData;

      this.movieServise.getRated().then((rated) => {
        newData = rated;
        this.ratedInState(newData);
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

  ratedInState = (newData: any) => {
    const ratedList = newData.map((movieRated: any) => {
      const ratedMovie = this.createMovie(movieRated);
      return ratedMovie;
    });

    const { ratedMovies } = this.state;
    this.setState({
      ratedMovies: ratedList,
    });
  };

  createMovie(movie: any) {
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
        <span>Sorry, no films "{value}" are found :(</span>
      </div>
    ) : null;
    const rated = !isSearch ? (
      <Rated ratedMovies={ratedMovies} ratedInState={this.ratedInState} />
    ) : null;
    // const genresArray = MovieContextProvider;
    return (
      <div className="body-container">
        <MovieContextProvider value={this.genresArray}>
          <NetworkState onNetworkState={this.onNetworkState} />
          {!error ? <Header toggleSearch={this.toggleSearch} /> : null}
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
