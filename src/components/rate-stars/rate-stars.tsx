import React from "react";
import { Rate } from "antd";
import "./rate-stars.css";
import { idText } from "typescript";

const RateStars: React.FC = ({ getRatingValue, id }: any) => {
  const storageValue = localStorage.getItem(`${id}`);
  const showRatingValue = storageValue || 0;
  return (
    <Rate
      count={10}
      onChange={(value) => getRatingValue(value)}
      allowHalf
      defaultValue={showRatingValue}
    />
  );
};
export default RateStars;
