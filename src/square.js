import Entity from './entity.js'
import {Vector2} from './helper-classes.js'

export default class Square extends Entity {
  width = 0
  height = 0

  constructor(x, y, width, height, color) {
    super(color, x, y);

    this.width = width
    this.height = height
    this.fillStyle = color

    this.verts = [
      new Vector2(this.position.x - this.width/2, this.position.y + this.height/2),
      new Vector2(this.position.x + this.width/2, this.position.y + this.height/2),
      new Vector2(this.position.x + this.width/2, this.position.y - this.height/2),
      new Vector2(this.position.x - this.width/2, this.position.y - this.height/2)
    ]
  }

  //override
  updateVertPosition() {
    //Make verts representing a square.
    this.verts = [
      new Vector2(this.position.x - this.width/2, this.position.y + this.height/2),
      new Vector2(this.position.x + this.width/2, this.position.y + this.height/2),
      new Vector2(this.position.x + this.width/2, this.position.y - this.height/2),
      new Vector2(this.position.x - this.width/2, this.position.y - this.height/2)
    ]
  }
}