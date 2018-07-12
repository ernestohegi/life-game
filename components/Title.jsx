import React from "react";

const DEFAULT_TYPE = "h3";

class Title extends React.Component {
  getTitleStyle() {
    const fontSize = this.props.type === 'h1' ? '4rem' : '2rem';

    return {
      fontFamily: 'gaegu',
      margin: "1rem 0",
      fontSize
    };
  };

  render() {
    const Type = this.props.type || DEFAULT_TYPE;

    return (
      <Type style={this.getTitleStyle()}>
        {this.props.children}
      </Type>
    );
  }
};

export default Title;
