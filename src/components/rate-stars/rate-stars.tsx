import React from "react";
import { Rate } from "antd";
import "./rate-stars.css";

// eslint-disable-next-line react/function-component-definition
const RateStars = ({ getRatingValue, id }: any): any => {
  const storageValue = localStorage.getItem(`${id}`);
  const showRatingValue = storageValue || 0;
  return (
    <Rate
      count={10}
      onChange={(value) => getRatingValue(value)}
      allowHalf
      defaultValue={Number(showRatingValue)}
    />
  );
};
export default RateStars;
