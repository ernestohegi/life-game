import React, { useEffect, useState } from "react";
import { GithubPicker } from 'react-color'

const getStyle = () => {
  return {
    fontFamily: 'gaegu',
    margin: '1rem 0',
    fontSize: '1.5rem'
  };
};

const FormColors = ({ callback }) => {
  const [colors, setColors] = useState({});

  const handleColorChange = ({ cell, color }) => {
    setColors({ ...colors, [cell]: color });
  };

  useEffect(() => {
    if (Object.keys(colors).length) {
      callback(colors);
    }
  }, [colors])

  return (
    <>
      <div style={{ marginBottom: '1rem' }}>
        <span style={getStyle()}>Cell</span>
        <GithubPicker onChangeComplete={({ hex }) => handleColorChange({ cell: 'alive', color: hex })} />
      </div>
      <div>
        <span style={getStyle()}>Background</span>
        <GithubPicker onChangeComplete={({ hex }) => handleColorChange({ cell: 'dead', color: hex })} />
      </div>
    </>
  );
}
export default FormColors;
