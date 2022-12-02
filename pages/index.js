import React, { useEffect, useState, useRef } from "react";
import Life from "../helpers/life";
import Button from "../components/Button";
import Copy from "../components/Copy";
import FormColors from "../components/FormColors";
import Link from "../components/Link";
import Title from "../components/Title";
import { ACTIVE_STATUS } from "../helpers/utils";

const dimensions = {
  rows: 60,
  columns: 60,
  cellSize: 10,
  scale: 1.5,
};

const Index = () => {
  const canvas = useRef(null);

  const [isCanvasClicked, setIsCanvasClicked] = useState(false);
  const [generationCounter, setGenerationCounter] = useState(0);

  useEffect(() => {
    if (canvas.current) {
      Life.initialise({
        canvas: canvas.current,
        dimensions,
        callback: setGenerationCounter,
      });
    }
  }, [canvas]);

  const handleMouseMoveOverCanvas = (e) => {
    Life.stop();

    if (!isCanvasClicked) return false;

    drawOnCanvas(e);
  };

  const drawOnCanvas = (e) => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    let selectedSurvivor = [];

    const cellSize = dimensions.cellSize * dimensions.scale;

    for (let i = 0; i < dimensions.rows; i++) {
      for (let j = 0; j < dimensions.columns; j++) {
        if (
          x >= i * cellSize &&
          x < (i + 1) * cellSize &&
          y >= j * cellSize &&
          y < (j + 1) * cellSize
        ) {
          selectedSurvivor = [i, j];
        }
      }
    }

    Life.selectSurvivor(selectedSurvivor, ACTIVE_STATUS);
  };

  const handleDepopulate = () => {
    Life.stop();
    Life.resetGrid({ callback: setGenerationCounter });
  };

  return (
    <main
      style={{
        display: "flex",
      }}
    >
      <div>
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
          Link to GitHub Project
        </a>

        <section>
          <Title type="h2">Colors</Title>
          <FormColors callback={(colors) => Life.setColors(colors)} />
        </section>

        <section>
          <Title type="h2">Action buttons</Title>
          <Button title="Give life" onClick={Life.start} />
          <Button title="Stop the world" onClick={Life.stop} />
          <Button
            title="Advance generation"
            onClick={Life.advanceOneGeneration}
          />
          <Button title="Depopulate" onClick={handleDepopulate} />
          <Copy text="Left click to draw." />
          <Copy text={`Current generation: ${generationCounter}`} />
        </section>
      </div>

      <canvas
        id="game"
        width={dimensions.rows * dimensions.cellSize * dimensions.scale}
        height={dimensions.rows * dimensions.cellSize * dimensions.scale}
        onMouseMove={handleMouseMoveOverCanvas}
        onMouseOut={Life.start}
        onMouseDown={() => setIsCanvasClicked(true)}
        onMouseUp={() => setIsCanvasClicked(false)}
        ref={canvas}
        style={{ cursor: "crosshair" }}
      />
    </main>
  );
};

export default Index;
