import React, { useEffect, useState, useRef } from 'react';
import Life from '../helpers/life';
import Button from '../components/Button';
import { PlayIcon, PauseIcon, StepForwardIcon, ResetIcon } from '../components/icons';

const dimensions = {
  rows: 60,
  columns: 60,
  cellSize: 5,
  scale: 2,
};

const Index = () => {
  const canvas = useRef(null);

  const [isCanvasClicked, setIsCanvasClicked] = useState(false);
  const [generationCounter, setGenerationCounter] = useState(0);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Define cursor styles for drawing and normal states
  const cursorStyle = isCanvasClicked
    ? 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="%23ffffff" stroke-width="2"><path d="M19.4 3.6L15 2L10.5 9.5 2 22l9-6L19.4 3.6z"/></svg>\') 0 24, auto'
    : 'crosshair';

  useEffect(() => {
    if (canvas.current) {
      Life.initialise({
        canvas: canvas.current,
        dimensions,
        callback: setGenerationCounter,
      });
    }

    // Ensure year is always current
    setCurrentYear(new Date().getFullYear());
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

    Life.selectSurvivor(selectedSurvivor);
  };

  const handleDepopulate = () => {
    Life.stop();
    Life.resetGrid({ callback: setGenerationCounter });
  };

  return (
    <main className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-gray-100">
      {/* Controls Section */}
      <section className="flex flex-col p-8 md:w-1/3 lg:w-1/4 border-r border-gray-700">
        <a
          href="http://en.wikipedia.org/wiki/Conway's_Game_of_Life"
          target="_blank"
          className="no-underline text-[#FC6336] font-[gaegu] text-4xl mb-6"
        >
          Game of Life
        </a>
        <a
          href="https://github.com/ernestohegi/life-game"
          target="_blank"
          className="font-[gaegu] text-blue-400 hover:text-blue-300 mb-8"
        >
          Link to GitHub Project
        </a>

        {/* Instructions Section */}
        <section className="bg-gray-800 rounded-lg p-6 shadow-lg mb-6">
          <h2 className="font-[gaegu] mb-4 text-2xl text-gray-200">How to Play</h2>
          <div className="space-y-3">
            <p className="font-[roboto] text-gray-300">
              Conway's Game of Life is a cellular automaton where cells live or die based on simple
              rules:
            </p>
            <ul className="list-disc pl-5 text-gray-300 font-[roboto] space-y-1">
              <li>Any live cell with 2 or 3 live neighbors survives</li>
              <li>Any dead cell with exactly 3 live neighbors becomes alive</li>
              <li>All other cells die or stay dead</li>
            </ul>
            <p className="font-[roboto] text-gray-300 pt-2">
              <span className="text-emerald-400 font-bold">Left click</span> on the grid to draw
              living cells, then use the buttons below to control the simulation.
            </p>
          </div>
        </section>

        <section className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="font-[gaegu] mb-4 text-2xl text-gray-200">Controls</h2>
          <div className="flex flex-col gap-3 mb-6">
            <div className="flex justify-center gap-4">
              <Button
                onClick={Life.start}
                color="green"
                title="Give life"
                className="rounded-full p-2"
              >
                <PlayIcon />
                <span className="sr-only">Give life</span>
              </Button>
              <Button
                onClick={Life.stop}
                color="amber"
                title="Stop the world"
                className="rounded-full p-2"
              >
                <PauseIcon />
                <span className="sr-only">Stop the world</span>
              </Button>
            </div>
            <div className="flex justify-center gap-4">
              <Button
                onClick={Life.advanceOneGeneration}
                color="blue"
                title="Advance generation"
                className="rounded-full p-2"
              >
                <StepForwardIcon />
                <span className="sr-only">Advance generation</span>
              </Button>
              <Button
                onClick={handleDepopulate}
                color="red"
                title="Depopulate"
                className="rounded-full p-2"
              >
                <ResetIcon />
                <span className="sr-only">Depopulate</span>
              </Button>
            </div>
          </div>

          {/* Larger Generation Counter */}
          <div className="mt-3 pt-4 border-t border-gray-700 flex justify-center">
            <div className="text-center">
              <div className="font-[gaegu] text-2xl text-gray-200 mb-2">Generation</div>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-24 h-24 flex items-center justify-center mx-auto shadow-glow animate-pulse">
                <span className="font-[gaegu] text-4xl font-bold text-white">
                  {generationCounter}
                </span>
              </div>
            </div>
          </div>

          {/* Footer with name, LinkedIn link and copyright */}
          <footer className="mt-6 pt-4 border-t border-gray-700 text-center text-sm text-gray-400">
            <div className="mb-2">
              <a
                href="https://linkedin.com/in/ernestohegi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Ernesto Hegi
              </a>
            </div>
            <div>&copy; {currentYear} All Rights Reserved</div>
          </footer>
        </section>
      </section>

      {/* Canvas Section */}
      <section className="flex-1 p-8 flex items-center justify-center bg-gray-800">
        <div className="rounded-lg overflow-hidden shadow-2xl border border-gray-700">
          <canvas
            id="game"
            width={dimensions.rows * dimensions.cellSize * dimensions.scale}
            height={dimensions.rows * dimensions.cellSize * dimensions.scale}
            onMouseMove={handleMouseMoveOverCanvas}
            onMouseDown={() => setIsCanvasClicked(true)}
            onMouseUp={() => setIsCanvasClicked(false)}
            onMouseOut={() => setIsCanvasClicked(false)}
            ref={canvas}
            style={{ cursor: cursorStyle }}
          />
        </div>
      </section>
    </main>
  );
};

export default Index;
