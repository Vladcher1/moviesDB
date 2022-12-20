// import React from "react";

import { type } from "os";

const url = "https://api.themoviedb.org/3/search/movie?api_key=";
const apiKey = "7cbde8d63dac4aeccc5252cbbcef7c4c";
const imgUrl = "https://api.themoviedb.org/3/configuration?api_key=";
const genreUrl = "https://api.themoviedb.org/3/genre/movie/list?api_key=";
const guestSessionId = "aaacf62bea4be71fa47cf297cab21966";
//  https://api.themoviedb.org/3/search/company?api_key=7cbde8d63dac4aeccc5252cbbcef7c4c&query=return&page=1
export default class MovieDB {
  async createGuestSession() {
    // const cteareToken = await fetch(
    //   `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`
    // );
    // const requestToken = await cteareToken.json();
    // console.log(requestToken.request_token);
    // const guestToken = requestToken.request_token;
    // const guestSessionId =
    // const askingPermission = await fetch(
    //   `https://www.themoviedb.org/authenticate/${requestToken.request_token}`
    // );

    const createSession = await fetch(
      `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${apiKey}`
    );
    // const guestSession = await createSession.json();
    // const guestSessionId = guestSession.guest_session_id;
    // console.log("ID", guestSessionId);

    // const rate = await fetch(
    //   `https://api.themoviedb.org/3/movie/1/rating?api_key=${apiKey}&guest_session_id=${guestSessionId}`,
    //   {
    //     method: "POST",
    //     body: JSON.stringify({ value: 8.5 }),
    //   }
    // );

    // const rateJson = await rate.json();
    // console.log(rateJson);
    // return rateJson;
    // return askingPermission;
    // const auntefication = await fetch(
    //   `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}`,
    //   {
    //     method: "POST",
    //     body: JSON.stringify({
    //       request_token: `${requestToken.request_token}`,
    //     }),
    //   }
    // );

    // return auntefication;
  }

  async getRated() {
    const ratedRequest = await fetch(
      `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=${apiKey}&language=en-US&sort_by=created_at.asc`
    );
    const rated = await ratedRequest.json();
    return rated.results;
  }

  async rate(id: number, valueRate: number) {
    const rate = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/rating?api_key=${apiKey}&guest_session_id=${guestSessionId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({ value: valueRate }),
      }
    );

    const rateJson = await rate.json();
    // console.log(rateJson);
    return rateJson;
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
