import {Vector2} from '../helper-classes.js'
import Polygon from './polygon.js';

export default class Square extends Polygon {
  width = 0
  height = 0

  constructor(x, y, width, height, color = 'black') {
    super(color, x, y);

    this.width = width
    this.height = height
    this.fillStyle = color
  }

  //override
  updateVertPosition() {
    //Make verts representing a square.
    this.verts = [
      new Vector2(this.position.x, this.position.y),
      new Vector2(this.position.x + this.width, this.position.y),
      new Vector2(this.position.x + this.width, this.position.y + this.height),
      new Vector2(this.position.x, this.position.y + this.height)
    ]
  }
}