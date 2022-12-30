import { Grid } from './grid';
import styles from './index.module.scss';
import { Layout, Point } from './lib/hexagons';
import { Rabbit } from './rabbit';

const container = document.getElementById('root')!;
const canvas = document.createElement('canvas');
canvas.id = 'canvas';
canvas.width = 1000;
canvas.height = 700;
canvas.className = styles.Canvas;
container.appendChild(canvas);
const ctx = canvas.getContext('2d')!;

const gridWidth = 12;
const gridHeight = 8;

const gridOffset = 50;
const cellSize = 40;
const cellGap = 2;

const layout = new Layout(Layout.pointy, new Point(cellSize, cellSize), new Point(gridOffset, gridOffset), cellGap);

const grid = new Grid(layout, gridWidth, gridHeight);
const population: Rabbit[] = [];
const rabbit = new Rabbit(grid.grid[0][0]);
population.push(rabbit);
grid.grid[0][0].rabbits.push(rabbit);

let days = 0;
const loop = () => {
  const brood: Rabbit[] = [];
  population.forEach(rabbit => {
    // console.log(rabbit.position, rabbit.position.neighbors);
    const dest = rabbit.position.neighbors[Math.floor(Math.random() * rabbit.position.neighbors.length)];
    console.log(dest)
    rabbit.position.rabbits.pop();
    rabbit.position = grid.grid[dest.row][dest.col];
    grid.grid[dest.row][dest.col].rabbits.push(rabbit);

    if (Math.random() < 0.1) {
      const newRabbit = new Rabbit(rabbit.position, rabbit.generation + 1);
      brood.push(newRabbit);
      rabbit.position.rabbits.push(newRabbit);
    }
  });
  population.push(...brood);

  grid.draw();
  days++;
};

let loopInterval = setInterval(() => {
  loop();
  if (days > 100) {
    clearInterval(loopInterval)
  }
}, 200)

// drawGrid();
// drawSquare(50, 50, cellWidth);
