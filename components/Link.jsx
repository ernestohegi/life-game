import React from "react";

class Link extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      linkStyle: {
        textDecoration: "none",
        color: "#FC6336"
      }
    };
  }

  render() {
    return (
      <a href={this.props.url} target={this.props.target} style={this.state.linkStyle}>
        {this.props.title}
      </a>
    );
  }
}

export default Link;
