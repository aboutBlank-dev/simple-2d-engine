import Entity from "./entity";

export default class Circle extends Entity {
  radius = 0;

  constructor(x, y, radius, color = 'black') {
    super(color, x, y);
    this.radius = radius;
    this.fillStyle = color;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.fillStyle;
    ctx.fill();
    ctx.closePath();

    this.debugDrawCenter(ctx);
  }
}