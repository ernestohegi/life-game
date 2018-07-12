import React from "react";
import Button from "./Button";
import Life from "../helpers/Life";

const inputStyle = {
  marginRight: "10px"
};

class FormColors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleFormButtonClick = this.handleFormButtonClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const input = e.target;

    this.setState({
      [input.name]: input.value
    });
  }

  handleFormButtonClick(e) {
    e.preventDefault();

    Life.setColors(this.state);
  }

  render() {
    return (
      <form>
        <input
          type="text"
          name="alive"
          onChange={this.handleInputChange}
          placeholder="Alive color"
          style={inputStyle}
        />
        <input
          type="text"
          name="dead"
          onChange={this.handleInputChange}
          placeholder="Dead color"
          style={inputStyle}
        />
        <Button title="Save" onClick={this.handleFormButtonClick} />
      </form>
    );
  }
}

export default FormColors;
