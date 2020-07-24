import React, { useEffect } from "react";
import Head from "next/head";
import Life from "../helpers/life";
import Button from "../components/Button";
import Copy from "../components/Copy";
import FormColors from "../components/FormColors";
import Link from "../components/Link";
import Title from "../components/Title";

let canvas;

const dimensions = {
  x: 200,
  y: 200,
  z: 5
};

const handleStart = () => {
  Life.start();
};

const handleStop = () => {
  Life.stop();
};

const handleDepopulate = () => {
  Life.stop();
  Life.drawGrid();
  Life.createGrid();
};

const handleCanvasClicked = (e) => {
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

const handleMouseMoveOverCanvas = (e) => {
  if (e.ctrlKey || e.altKey) {
    handleCanvasClicked(e);
  }
};

const handleStep = () => {
  Life.advanceOneGeneration();
};

const handleFormColorsSubmit = (colors) => {
  Life.setColors(colors);
};

const Index = () => {
  useEffect(() => {
    Life.init({
      canvas,
      dimensions
    });
  }, []);

  return (
    <React.Fragment>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Gaegu|Roboto"
          rel="stylesheet"
        />
      </Head>

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
        <FormColors callback={handleFormColorsSubmit} />
      </section>

      <section>
        <Title type="h2">Action buttons</Title>
        <Button title="Give life" onClick={handleStart} />
        <Button title="Stop the world" onClick={handleStop} />
        <Button title="Advance generation" onClick={handleStep} />
        <Button title="Depopulate" onClick={handleDepopulate} />
        <Copy text="Press the control key while moving your mouse over the screen to draw cells" />
      </section>

      <canvas
        id="game"
        width={dimensions.x * dimensions.z}
        height={dimensions.x * dimensions.z}
        onClick={handleCanvasClicked}
        onMouseMove={handleMouseMoveOverCanvas}
        ref={node => canvas = node}
      />
    </React.Fragment>
  );
};

export default Index;
