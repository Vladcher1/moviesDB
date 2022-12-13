import React from "react";
import { Input } from "antd";
import "./search-input.css";
import debounce from "lodash.debounce";

export default class SearchInput extends React.Component<any, any> {
  // state = {
  //   value: "",
  // };

  // componentDidUpdate() {
  // console.log("updated", this.state);
  // const { value }: any = this.state;
  // const { getMovie }: any = this.props;
  // const cb = getMovie;
  // return cb(value);
  // if (value !== "") getMovie(value);
  // }

  onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // this.setState({ value: e.target.value });
    const { getValue } = this.props;
    getValue(e.target.value);
  };

  onInputDebounce = debounce(this.onInputChange, 1000);

  render() {
    return (
      <form>
        <Input
          onChange={this.onInputDebounce}
          placeholder="Type to search..."
        />
      </form>
    );
  }
}
