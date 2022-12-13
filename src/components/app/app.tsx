import React from "react";
import { format } from "date-fns";

import { IState } from "../../models";
import "./app.css";
import MovieList from "../movie-list/movie-list";
import MovieDB from "../../servises/data";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../error/error-message";
import NetworkState from "../network-state/network-state";
import Pagination from "../pagination/pagination";
import SearchInput from "../search-input/search-input";
import Header from "../header/header";
import { MoviesProvider } from "../../servises/data-context";
import Rated from "../rated/rated";

export default class App extends React.Component<any, any> {
  movieServise = new MovieDB();

  state: IState = {
    data: [],
    loading: false,
    error: false,
    network: true,
    value: "",
    page: 1,
    notFound: false,
    totalPages: 0,
    isSearch: true,
  };

  componentDidUpdate(prevProps: any, prevState: Readonly<any>): void {
    const { value, page } = this.state;
    if (value === "") {
      return;
    }
    if (value !== prevState.value || page !== prevState.page) {
      this.setState({ loading: true, notFound: false });
      this.movieServise.getGenres().then((genres) => console.log(genres));
      this.movieServise
        .getResourse(value, page)
        .then((body: any) => {
          const { results } = body;
          console.log(results);
          if (results.length === 0) {
            this.setState({
              notFound: true,
              loading: false,
              error: false,
              data: [],
            });
          } else {
            const moviesArr = results.map((movie: any) =>
              this.createMovie(movie)
            );
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
      if (counter >= 150 && letter === " ") {
        break;
      }
    }
    res += "...";
    return res;
  };

  getValue = (valueC: string) => {
    this.setState({ value: valueC });
  };

  nextPage = (page: any) => {
    this.setState({
      page,
    });
  };

  toggleSearch = (button: string) => {
    if (button !== "search") {
      this.setState({
        isSearch: false,
      });
    } else {
      this.setState({
        isSearch: true,
      });
    }
  };

  createMovie(movie: any) {
    const releaseDate = movie.release_date;
    format(new Date(movie.release_date), "MMMM dd, yyyy");
    return {
      id: movie.id,
      title: movie.title,
      info: movie.overview,
      releaseDate,
      posterPath: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      cutInfo: this.cutInfo(movie.overview),
      genreIds: movie.genre_ids,
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
      averageRating,
    } = this.state;

    const hasData = !loading && !error && value !== "";
    const movieList = hasData ? <MovieList data={data} value={value} /> : null;
    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage network={network} /> : null;
    const noNetwork = !network ? <ErrorMessage network={network} /> : null;
    const notFoundMovies = notFound ? (
      <div className="not-found">
        <span>Sorry, no films "{value}" are found :(</span>
      </div>
    ) : null;
    const rated = !isSearch ? <Rated /> : null;
    return (
      <div className="body-container">
        <MoviesProvider value={this.movieServise}>
          {rated}
          <NetworkState onNetworkState={this.onNetworkState} />
          {!error ? <Header toggleSearch={this.toggleSearch} /> : null}
          {!error && isSearch ? <SearchInput getValue={this.getValue} /> : null}
          {noNetwork}
          {movieList}
          {notFoundMovies}
          {spinner}
          {errorMessage}
          {hasData && !notFound ? (
            <Pagination
              page={page}
              nextPage={this.nextPage}
              totalPages={totalPages}
            />
          ) : null}
        </MoviesProvider>
      </div>
    );
  }
}
