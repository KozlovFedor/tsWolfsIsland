import { Cell } from "../cell";
import { Layout, OffsetCoord, Point } from "../lib/hexagons";

export class Grid implements Iterable<Cell> {
  grid: Cell[][];
  ctx: CanvasRenderingContext2D;

  constructor (
    public layout: Layout,
    public width: number,
    public height: number,
  ) {
    this.ctx = (document.getElementById('canvas') as HTMLCanvasElement).getContext('2d')!;
    this.grid = [];

    for (let i = 0; i < this.height; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < this.width; j++) {
        row.push(new Cell(this.layout, new OffsetCoord(j, i)));
      }
      this.grid.push(row);
    }
  };

  [Symbol.iterator](): IterableIterator<Cell> {
    return this.grid.flat().values();
  }

  forEach(fn: (cell: Cell) => void): this {
    for (const cell of this) {
      fn(cell);
    }
    return this;
  };

  map(fn: (cell: Cell) => Cell): Grid {
    const result = new Grid(this.layout, this.width, this.height);

    for (const cell of this) {
      const newCell = fn(cell);
      result.grid[newCell.offsetCoords.row][newCell.offsetCoords.col] = newCell;
    }

    return result;
  };

  inRange = (coord: OffsetCoord): boolean => {
    if (coord.col >= 0 && coord.col < this.width && coord.row >= 0 && coord.row < this.height) {
      return true;
    }
    return false;
  };

  neighbors = (cell: Cell): OffsetCoord[] => {
    return cell.neighbors.filter(coords => this.inRange(coords));
  };

  draw = () => {
    for (const cell of this) {
      cell.color = `rgb(100, 255, 100)`;
      cell.draw(this.ctx);
    }
  };
}