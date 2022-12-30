import { Cell } from "../cell";

export class Rabbit {
  constructor (public position: Cell, public generation: number = 0) {}
}