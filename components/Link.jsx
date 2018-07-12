import React from "react";

const linkStyle = {
  textDecoration: "none"
};

class Link extends React.Component {
  render() {
    return (
      <a href={this.props.url} target={this.props.target} style={linkStyle}>
        {this.props.title}
      </a>
    );
  }
}

export default Link;
