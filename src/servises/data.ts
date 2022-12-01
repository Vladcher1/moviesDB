// import React from "react";

export default class MovieDB {
  static async getResourse() {
    const response = await fetch(
      "https://api.themoviedb.org/3/search/movie?api_key=7cbde8d63dac4aeccc5252cbbcef7c4c&language=en-US&query=return&page=1&include_adult=false"
    );

    if (!response.ok) {
      throw new Error(
        `Could not fetch website and received ${response.status}`
      );
    }

    const body = await response.json();
    return body.results;
  }

  static async getImage() {
    const imageResponse = await fetch(
      "https://api.themoviedb.org/3/configuration?api_key=7cbde8d63dac4aeccc5252cbbcef7c4c"
    );

    if (!imageResponse.ok) {
      throw new Error(
        `Could not fetch website and received ${imageResponse.status}`
      );
    }

    const imageBody = await imageResponse.json();
    return `${imageBody.base_url}w500`;
  }
}
