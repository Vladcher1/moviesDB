import React from "react";
import { Pagination } from "antd";

import "./pagination.css";
import { IState } from "../../models";

const App: React.FC = function pagination({
  nextPage,
  page,
  totalPages,
}: Pick<IState, "page" | "totalPages">) {
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
