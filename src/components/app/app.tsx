import React from "react";
import { format } from "date-fns";

import { IMovie, IState, IMovieFromServer } from "../../models";
import "./app.css";
import MovieList from "../movie-list/movie-list";
import MovieDB from "../../servises/data";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../error/error-message";
import Pagination from "../pagination/pagination";
import SearchInput from "../search-input/search-input";
import Header from "../header/header";
import { MovieContextProvider } from "../../servises/data-context";
import Rated from "../rated/rated";
import { cutInfo } from "../../utilities";

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

    window.onoffline = () => {
      this.setState(({ network }: Pick<IState, "network">) => ({
        network: !network,
        loading: false,
        notFound: false,
      }));
    };
    window.ononline = () => {
      this.setState(({ network }: Pick<IState, "network">) => ({
        network: !network,
        loading: false,
        notFound: false,
      }));
    };
  }

  componentDidUpdate(prevProps: any, prevState: Readonly<any>): void {
    const { value, page } = this.state;
    if (value === "") {
      return;
    }
    if (value !== prevState.value || page !== prevState.page) {
      window.onoffline = () => {
        this.setState(({ network }: Pick<IState, "network">) => ({
          network: !network,
          loading: false,
          notFound: false,
        }));
      };
      window.ononline = () => {
        this.setState(({ network }: Pick<IState, "network">) => ({
          network: !network,
          loading: false,
          notFound: false,
        }));
      };

      this.setState({ loading: true, notFound: false });
      this.movieServise
        .getResourse(value, page)
        .then(({ results, total_pages: totalPages }: any) => {
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
              totalPages,
            });
          }
        })
        .catch(() => this.onError());
    }
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
      notFound: false,
    });
  };

  getValue = (value: string) => {
    this.setState({ value });
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
    const ratedList = newData.map((movieRated: any) =>
      this.createMovie(movieRated)
    );
    this.setState({
      ratedMovies: ratedList,
    });
  };

  createMovie({
    release_date: releaseDate,
    id,
    title,
    overview,
    poster_path: posterPath,
    genre_ids: genreIds,
    vote_average: averageRating,
  }: IMovieFromServer) {
    if (releaseDate !== "") {
      format(new Date(releaseDate), "MMMM dd, yyyy");
    }
    return {
      id,
      title,
      info: overview,
      releaseDate,
      posterPath: `https://image.tmdb.org/t/p/w500${posterPath}`,
      cutInfo: cutInfo(overview),
      genreIds: Array.from(genreIds),
      rating: [false, 0],
      averageRating,
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
      hasData && isSearch ? (
        <MovieList
          data={data}
          // value={value}
        />
      ) : null;
    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage network={network} /> : null;
    const noNetwork = !network ? <ErrorMessage network={network} /> : null;
    const notFoundMovies = notFound ? (
      <div className="not-found">
        <span>Sorry, no films &quot;{value}&quot; are found :(</span>
      </div>
    ) : null;
    const rated = !isSearch ? <Rated ratedMovies={ratedMovies} /> : null;
    return (
      <div className="body-container">
        <MovieContextProvider value={this.genresArray}>
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
