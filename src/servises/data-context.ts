import React from "react";

const { Provider: MovieContextProvider, Consumer: MovieContextConsumer } =
  React.createContext([]);

export { MovieContextProvider, MovieContextConsumer };
