import React, { useEffect, useState } from "react";
import Head from "next/head";
import Life from "../helpers/life";
import Button from "../components/Button";
import Copy from "../components/Copy";
import FormColors from "../components/FormColors";
import Link from "../components/Link";
import Title from "../components/Title";

let canvas;

const dimensions = {
  x: 100,
  y: 100,
  z: 6,
  scale: 1
};

const handleStart = () => {
  Life.start();
};

const handleStop = () => {
  Life.stop();
};

const handleDepopulate = () => {
  Life.stop();
  Life.clearGrid();
};

const drawOnCanvas = (e) => {
  const x = e.nativeEvent.offsetX;
  const y = e.nativeEvent.offsetY;
  let selectedSurvivor = [];

  for (let i = 0; i < dimensions.x; i++) {
    for (let j = 0; j < dimensions.y; j++) {
      if (
        x >= i * dimensions.z &&
        x < (i + 1) * dimensions.z &&
        y >= j * dimensions.z &&
        y < (j + 1) * dimensions.z
      ) {
        selectedSurvivor = [i, j];
      }
    }
  }

  Life.selectSurvivor(selectedSurvivor, 'live');
};

const handleStep = () => {
  Life.advanceOneGeneration();
};

const handleColourChange = (colors) => {
  Life.setColors(colors);
};

const Index = () => {
  const [isCanvasClicked, setIsCanvasClicked] = useState(false);

  useEffect(() => {
    Life.init({
      canvas,
      dimensions
    });
  }, []);

  const handleMouseMoveOverCanvas = (e) => {
    if (!isCanvasClicked) return false;

    drawOnCanvas(e);
  };

  const handleMouseDownOverCanvas = (e) => {
    setIsCanvasClicked(true);
  };

  const handleMouseUpOverCanvas = (e) => {
    setIsCanvasClicked(false);
  };

  return (
    <>
      <Title type="h1">
        <Link
          url="http://en.wikipedia.org/wiki/Conway's_Game_of_Life"
          target="_blank"
          title="Game of Life"
        />
      </Title>

      <a href="https://github.com/ernestohegi/life-game" target="_blank" style={{fontFamily: 'gaegu'}}> Link to GitHub Project</a>

      <section>
        <Title type="h2">Colors</Title>
        <FormColors callback={handleColourChange} />
      </section>

      <section>
        <Title type="h2">Action buttons</Title>
        <Button title="Give life" onClick={handleStart} />
        <Button title="Stop the world" onClick={handleStop} />
        <Button title="Advance generation" onClick={handleStep} />
        <Button title="Depopulate" onClick={handleDepopulate} />
        <Copy text="Left click to draw." />
      </section>

      <canvas
        id="game"
        width={dimensions.x * dimensions.z * dimensions.scale}
        height={dimensions.x * dimensions.z * dimensions.scale}
        onMouseMove={handleMouseMoveOverCanvas}
        onMouseDown={handleMouseDownOverCanvas}
        onMouseUp={handleMouseUpOverCanvas}
        ref={node => canvas = node}
        style={{ cursor: "crosshair" }}
      />
    </>
  );
};

export default Index;
