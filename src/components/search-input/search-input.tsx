import React from "react";
import { Input } from "antd";
import "./search-input.css";
import debounce from "lodash.debounce";

export default class SearchInput extends React.Component<any, any> {
  onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { getValue } = this.props;
    getValue(e.target.value);
  };

  onInputDebounce = debounce(this.onInputChange, 1000);

  render() {
    return (
      <form className="form">
        <Input
          onChange={this.onInputDebounce}
          placeholder="Type to search..."
        />
      </form>
    );
  }
}
