// import React from "react";

const url = "https://api.themoviedb.org/3/search/movie?api_key=";
const apiKey = "7cbde8d63dac4aeccc5252cbbcef7c4c";
const imgUrl = "https://api.themoviedb.org/3/configuration?api_key=";
const genreUrl = "https://api.themoviedb.org/3/genre/movie/list?api_key=";
//  https://api.themoviedb.org/3/search/company?api_key=7cbde8d63dac4aeccc5252cbbcef7c4c&query=return&page=1
export default class MovieDB {
  constructor() {
    this.getGenres();
  }

  async getResourse(value: string, page = 1) {
    const response = await fetch(
      // `${url}${apiKey}&language=en-US&query=${value}&page=${page}&include_adult=false`
      `${url}${apiKey}&language=en-US&query=${value}&page=${page}&include_adult=false`
    );

    if (!response.ok) {
      throw new Error(
        `Could not fetch website and received ${response.status}`
      );
    }

    const body = await response.json();
    // return body.results;
    return body;
  }

  async getImage() {
    const imageResponse = await fetch(`${imgUrl}${apiKey}`);

    if (!imageResponse.ok) {
      throw new Error(
        `Could not fetch website and received ${imageResponse.status}`
      );
    }

    const imageBody = await imageResponse.json();
    return `${imageBody.base_url}w500`;
  }

  async getGenres() {
    const genresResponse = await fetch(`${genreUrl}${apiKey}&language=en-US`);

    if (!genresResponse.ok) {
      throw new Error(
        `Could not fetch genres and received ${genresResponse.status}`
      );
    }

    const genresBody = await genresResponse.json();
    return genresBody;
  }
}
