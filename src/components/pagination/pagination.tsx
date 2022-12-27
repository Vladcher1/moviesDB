import React from "react";
import { Pagination } from "antd";

import "./pagination.css";

const App = function pagination({ nextPage, page, totalPages }: any) {
  return (
    <Pagination
      defaultCurrent={1}
      current={page}
      onChange={(pageCurrent) => nextPage(pageCurrent)}
      total={totalPages}
    />
  );
};

export default App;
