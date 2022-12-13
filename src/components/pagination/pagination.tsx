import React from "react";
import { Pagination } from "antd";
import "./pagination.css";

const App: React.FC = function pagination({ nextPage, page, totalPages }: any) {
  return (
    <Pagination
      defaultCurrent={1}
      current={page}
      onChange={(page) => nextPage(page)}
      total={totalPages}
    />
  );
};

export default App;
