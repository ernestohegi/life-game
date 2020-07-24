import React from "react";

const buttonStyle = {
  marginRight: "10px"
};

const Button = ({ onClick, title }) => (
  <button onClick={onClick} style={buttonStyle}>
    {title}
  </button>
);

export default Button;
