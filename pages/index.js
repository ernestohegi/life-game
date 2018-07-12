import React from "react";
import Head from "next/head";
import Life from "../helpers/Life";
import Button from "../components/Button";
import Copy from "../components/Copy";
import FormColors from "../components/FormColors";
import Link from "../components/Link";
import Title from "../components/Title";

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
    this.handleStep = this.handleStep.bind(this);
    this.handleFormColorsSubmit = this.handleFormColorsSubmit.bind(this);
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

  handleStep() {
    Life.advanceOneGeneration();
  }

  handleFormColorsSubmit(colors) {
    Life.setColors(colors);
  }

  render() {
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

        <section>
          <Title type="h2">Colors</Title>
          <FormColors handleFormButtonClick={this.handleFormColorsSubmit} />
        </section>

        <section>
          <Title type="h2">Action buttons</Title>
          <Button title="Give life" onClick={this.handleStart} />
          <Button title="Stop the world" onClick={this.handleStop} />
          <Button title="Advance generation" onClick={this.handleStep} />
          <Button title="Depopulate" onClick={this.handleDepopulate} />
          <Copy text="Press the control key while clicking to draw seeds" />
        </section>

        <canvas
          id="game"
          width={this.dimensions.x * this.dimensions.z}
          height={this.dimensions.x * this.dimensions.z}
          onClick={this.handleCanvasClicked}
          onMouseMove={this.handleMouseMoveOverCanvas}
          ref={node => (this.canvas = node)}
        />
      </React.Fragment>
    );
  }
}

export default Index;
