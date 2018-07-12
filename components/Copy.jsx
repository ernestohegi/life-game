import React from "react";

const copyStyle = {
  fontFamily: "roboto"
};

class Copy extends React.Component {
  render() {
    return <p style={copyStyle}>{this.props.text}</p>;
  }
}

export default Copy;
