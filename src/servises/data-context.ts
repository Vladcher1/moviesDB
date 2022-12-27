import React from "react";

const { Provider: MovieContextProvider, Consumer: MovieContextConsumer }: any =
  React.createContext([]);

export { MovieContextProvider, MovieContextConsumer };
