import React from "react";
import { Rate } from "antd";

import "./rate-stars.css";
import MovieDB from "../../servises/data";

function RateStars({ id, rating }: any): any {
  const movieServise = new MovieDB();
  return (
    <Rate
      count={10}
      onChange={(value) => movieServise.rate(id, value)}
      allowHalf
      defaultValue={Number(rating[1])}
    />
  );
}
export default RateStars;
