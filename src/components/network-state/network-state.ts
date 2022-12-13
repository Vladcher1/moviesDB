// import React from "react";

const NetworkState = function NetworkState({ onNetworkState }: any) {
  window.onoffline = () => {
    onNetworkState();
  };
  window.ononline = () => {
    onNetworkState();
  };

  return "";
};

export default NetworkState;
