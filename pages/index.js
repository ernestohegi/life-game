import React from "react";
import Life from "../helpers/life";

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.dimensions = {
      x: 40,
      y: 40,
      z: 20
    };

    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleDepopulate = this.handleDepopulate.bind(this);
    this.handleCanvasClicked = this.handleCanvasClicked.bind(this);
    this.handleMouseMoveOverCanvas = this.handleMouseMoveOverCanvas.bind(this);
  }

  componentDidMount() {
    Life.init({
      canvas: this.canvas,
      dimensions: this.dimensions
    });
  }

  handleStart() {
    Life.start();
  }

  handleStop() {
    Life.stop();
  }

  handleDepopulate() {
    Life.stop();
    Life.drawGrid();
    Life.createGrid();
  }

  handleCanvasClicked(e) {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    let selectedSurvivor = [];

    for (let i = 0; i < this.dimensions.x; i++) {
      for (let j = 0; j < this.dimensions.y; j++) {
        if (
          x >= i * this.dimensions.z &&
          x < (i + 1) * this.dimensions.z &&
          y >= j * this.dimensions.z &&
          y < (j + 1) * this.dimensions.z
        ) {
          selectedSurvivor = [i, j];
        }
      }
    }

    Life.selectSurvivor(selectedSurvivor);
  }

  handleMouseMoveOverCanvas(e) {
    if (e.ctrlKey || e.altKey) {
      this.handleCanvasClicked(e);
    }
  }

  render() {
    return (
      <div className="container">
        <h1>
          <a
            href="http://en.wikipedia.org/wiki/Conway's_Game_of_Life"
            target="_blank"
            className="externalLink"
          >
            Game of Life
          </a>
        </h1>

        <ul>
          <li>
            <span onClick={this.handleStart}> Give life </span>
          </li>
          <li>
            <span onClick={this.handleStop}> Stop the world </span>
          </li>
          <li>
            <span onClick={this.handleDepopulate}> Depopulate </span>
          </li>
        </ul>

        <span>
          Press the control key while clicking to draw seeds
        </span>

        <canvas
          id="game"
          width={800}
          height={800}
          onClick={this.handleCanvasClicked}
          onMouseMove={this.handleMouseMoveOverCanvas}
          ref={node => this.canvas = node}
        />
      </div>
    );
  }
}

export default Index;
