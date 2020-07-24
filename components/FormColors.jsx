import React, { useState } from "react";
import Button from "./Button";

const inputStyle = {
  marginRight: "10px"
};

const handleInputChange = (e, colors, setColors) => {
  const input = e.target;

  if (input.value) {
    setColors({ ...colors, [input.name]: input.value });
  }
}

const handleFormButtonClick = (e, callback, colors) => {
  e.preventDefault();
  console.log(colors);
  callback(colors);
};

const FormColors = ({ callback }) => {
  const [colors, setColors] = useState({});

  return (
    <form>
      <input
        type="text"
        name="alive"
        onChange={e => handleInputChange(e, colors, setColors)}
        placeholder="Alive color, e.g.: #000"
        style={inputStyle}
      />
      <input
        type="text"
        name="dead"
        onChange={e => handleInputChange(e, colors, setColors)}
        placeholder="Dead color e.g.: #FFF"
        style={inputStyle}
      />
      <Button title="Save" onClick={e => handleFormButtonClick(e, callback, colors)} />
    </form>
  );
}
export default FormColors;
