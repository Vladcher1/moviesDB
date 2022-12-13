import React from "react";
import { Rate } from "antd";

const RateStars: React.FC = () => (
  <Rate
    count={10}
    onChange={(value) => console.log(value)}
    allowHalf
    defaultValue={0}
  />
);

export default RateStars;
