import React from "react";
import Button from "./Button";
import Life from "../helpers/Life";

const inputStyle = {
  marginRight: "10px"
};

class FormCanvasDimensions extends React.Component {
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
    this.props.handleFormButtonClick(this.state);
  }

  render() {
    return (
      <form>
        <input
          type="text"
          name="x"
          onChange={this.handleInputChange}
          placeholder="Width"
          style={inputStyle}
        />
        <input
          type="text"
          name="y"
          onChange={this.handleInputChange}
          placeholder="Height"
          style={inputStyle}
        />
        <input
          type="text"
          name="z"
          onChange={this.handleInputChange}
          placeholder="Depth"
          style={inputStyle}
        />
        <Button title="Save" onClick={this.handleFormButtonClick} />
      </form>
    );
  }
}

export default FormCanvasDimensions;
