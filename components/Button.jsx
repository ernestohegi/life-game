import React from "react";

const buttonStyle = {
  marginRight: "10px"
};

class Button extends React.Component {
  render() {
    return (
      <button onClick={this.props.onClick} style={buttonStyle}>
        {this.props.title}
      </button>
    );
  }
}

export default Button;
