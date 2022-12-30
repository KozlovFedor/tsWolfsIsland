import { Hex, Layout, OffsetCoord, Point } from '../lib/hexagons';
import { Rabbit } from '../rabbit';

interface Drawable {
  draw: (ctx: CanvasRenderingContext2D) => void;
}

export class Cell implements Drawable {
  private corners: Point[];
  public color: string = 'black';
  public hexCoords: Hex;
  public offsetCoords: OffsetCoord;
  public rabbits: Rabbit[] = [];

  constructor(layout: Layout, coords: Hex)
  constructor(layout: Layout, coords: OffsetCoord)
  constructor(private layout: Layout, coords: Hex | OffsetCoord) {
    if (coords instanceof Hex) {
      this.hexCoords = coords;
      this.offsetCoords = OffsetCoord.roffsetFromCube(OffsetCoord.ODD, coords);
    } else {
      this.offsetCoords = coords;
      this.hexCoords = OffsetCoord.roffsetToCube(OffsetCoord.ODD, coords);
    }
    this.corners = this.layout.polygonCorners(this.hexCoords);
  }

  get neighbors(): OffsetCoord[] {
    return this.hexCoords.neighbors().map(neighbor => OffsetCoord.roffsetFromCube(OffsetCoord.ODD, neighbor));
  }

  private _drawRabbits = (ctx: CanvasRenderingContext2D) => {
    if (!this.rabbits.length) {
      return;
    }
    let pnt = this.layout.hexToPixel(this.hexCoords)
    ctx.font = '20px serif';
    ctx.fillStyle = 'black'
    ctx.fillText(`${this.rabbits.length}`, pnt.x - 20, pnt.y);
  }

  draw = (ctx: CanvasRenderingContext2D) => {
    // drawPolygon(ctx, this.center.x, this.center.y, 6, this.size);
    fillPoints(ctx, this.corners, this.color);
    this._drawRabbits(ctx);
  }
}

// export class Square extends Cell {
//   draw = () => {
//     this.ctx.fillRect(this.x - this.side / 2, this.y - this.side / 2, this.side, this.side);
//   }
// }

const drawPolygon = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  N: number,
  r: number,
  startPos: number = Math.PI / 2
) => {
  const path = new Path2D();
  path.moveTo(x + r * Math.cos(startPos), y + r *  Math.sin(startPos));
  for (let i = 1; i <= N; i++) {
    path.lineTo (x + r * Math.cos(startPos + i * 2 * Math.PI / N), y + r * Math.sin(startPos + i * 2 * Math.PI / N));
  }
  ctx.fill(path);
}

const fillPoints = (ctx: CanvasRenderingContext2D, pts: Point[], color: string) => {
  const path = new Path2D();
  path.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) {
    path.lineTo (pts[i].x, pts[i].y);
  }
  ctx.fillStyle = color;
  ctx.fill(path);
}
