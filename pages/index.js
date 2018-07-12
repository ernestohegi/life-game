import React from "react";
import Life from "../helpers/life";
import Button from "../components/Button";
import Copy from "../components/Copy";

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
      <React.Fragment>
        <h1>
          <a
            href="http://en.wikipedia.org/wiki/Conway's_Game_of_Life"
            target="_blank"
            className="externalLink"
          >
            Game of Life
          </a>
        </h1>

        <Button title="Give life" onClick={this.handleStart} />
        <Button title="Stop the world" onClick={this.handleStop} />
        <Button title="Depopulate" onClick={this.handleDepopulate} />

        <Copy text="Press the control key while clicking to draw seeds" />

        <canvas
          id="game"
          width={800}
          height={800}
          onClick={this.handleCanvasClicked}
          onMouseMove={this.handleMouseMoveOverCanvas}
          ref={node => this.canvas = node}
        />
      </React.Fragment>
    );
  }
}

export default Index;
