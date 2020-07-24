import React from "react";

const DEFAULT_TYPE = "h3";

const getTitleStyle = (type) => {
  const fontSize = type === 'h1' ? '4rem' : '2rem';

  return {
    fontFamily: 'gaegu',
    margin: "1rem 0",
    fontSize
  };
};

const Title = ({ type, children }) => {
  const Type = type || DEFAULT_TYPE;

  return (
    <Type style={getTitleStyle(type)}>
      {children}
    </Type>
  );
}

export default Title;
