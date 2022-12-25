import styles from './index.module.scss';

const container = document.getElementById('root')!;
const canvas = document.createElement('canvas');
canvas.id = 'canvas';
canvas.width = 1000;
canvas.height = 600;
canvas.className = styles.Canvas;
container.appendChild(canvas);
const ctx = canvas.getContext('2d')!;

const gridWidth = 12;
const gridHeight = 8;

const gridOffset = 50;
const cellWidth = 50;
const cellGap = 5;

const calculateCellCenter = (row: number, col: number): [number, number] => {
  return [gridOffset + col * (cellWidth + cellGap) + cellWidth / 2, gridOffset + row * (cellWidth + cellGap) + cellWidth / 2];
}

const drawSquare = (centerX: number, centerY: number, side: number) => {
  ctx.fillRect(centerX - side / 2, centerY - side / 2, side, side);
}

const drawGrid = () => {
  for (let row = 0; row < gridHeight; row++) {
    for (let col = 0; col < gridWidth; col++) {
      const [x, y] = calculateCellCenter(row, col);
      drawSquare(x, y, cellWidth);
    }
  }
};

drawGrid();
// drawSquare(50, 50, cellWidth);
