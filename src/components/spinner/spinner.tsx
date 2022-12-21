import React from "react";
import { Space, Spin } from "antd";
import "./spinner.css";

const Spinner: React.FC = function spinner() {
  return (
    <div className="spinner-container">
      <Space size="middle">
        <Spin className="spinner" size="large" />
      </Space>
    </div>
  );
};
export default Spinner;
