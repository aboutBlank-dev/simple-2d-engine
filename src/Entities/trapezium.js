'use strict'

import { Vector2 } from "../helper-classes";
import Polygon from "./polygon";

export default class Trapezium extends Polygon {

  constructor(x, y, color) {
    super(color, x, y);

    this.fillStyle = color
  }

  //override
  updateVertPosition() {
    this.verts = [
      new Vector2(this.position.x, this.position.y),
      new Vector2(this.position.x + 100, this.position.y),
      new Vector2(this.position.x + 120, this.position.y + 100),
      new Vector2(this.position.x + 20, this.position.y + 100)
    ];
  }
}