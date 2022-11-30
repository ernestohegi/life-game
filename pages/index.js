import React, { useEffect, useState, useRef } from "react";
import Life from "../helpers/life";
import Button from "../components/Button";
import Copy from "../components/Copy";
import FormColors from "../components/FormColors";
import Link from "../components/Link";
import Title from "../components/Title";

const dimensions = {
  x: 100,
  y: 100,
  z: 6,
  scale: 1,
};

const Index = () => {
  const canvas = useRef(null);

  const [isCanvasClicked, setIsCanvasClicked] = useState(false);
  const [generationCounter, setGenerationCounter] = useState(0);

  useEffect(() => {
    if (canvas.current) {
      Life.init({
        canvas: canvas.current,
        dimensions,
        callback: setGenerationCounter,
      });
    }
  }, [canvas]);

  const handleMouseMoveOverCanvas = (e) => {
    if (!isCanvasClicked) return false;

    drawOnCanvas(e);
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

    Life.selectSurvivor(selectedSurvivor, "live");
  };

  const handleDepopulate = () => {
    Life.stop();
    Life.resetGrid({ callback: setGenerationCounter });
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

      <a
        href="https://github.com/ernestohegi/life-game"
        target="_blank"
        style={{ fontFamily: "gaegu" }}
      >
        {" "}
        Link to GitHub Project
      </a>

      <section>
        <Title type="h2">Colors</Title>
        <FormColors callback={(colors) => Life.setColors(colors)} />
      </section>

      <section>
        <Title type="h2">Action buttons</Title>
        <Button title="Give life" onClick={() => Life.start()} />
        <Button title="Stop the world" onClick={() => Life.stop()} />
        <Button
          title="Advance generation"
          onClick={() => Life.advanceOneGeneration()}
        />
        <Button title="Depopulate" onClick={handleDepopulate} />
        <Copy text="Left click to draw." />
        <Copy text={`Current generation: ${generationCounter}`} />
      </section>

      <canvas
        id="game"
        width={dimensions.x * dimensions.z * dimensions.scale}
        height={dimensions.x * dimensions.z * dimensions.scale}
        onMouseMove={handleMouseMoveOverCanvas}
        onMouseDown={() => setIsCanvasClicked(true)}
        onMouseUp={() => setIsCanvasClicked(false)}
        ref={canvas}
        style={{ cursor: "crosshair" }}
      />
    </>
  );
};

export default Index;
