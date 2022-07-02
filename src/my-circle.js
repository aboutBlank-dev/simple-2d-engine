import Circle from "./Entities/circle";
import { Vector2 } from "./helper-classes";
import Input from "./input-manger";

export default class MyCircle extends Circle {

  velocityMultiplier = 500;

  constructor(x, y, radius, color) {
    super(x, y, radius, color);
  }

  update() {
    let velocity = new Vector2(Input.horizontal, Input.vertical);
    velocity = velocity.normalize();
    this.setVelocity(velocity.multiply(100));
  }
}