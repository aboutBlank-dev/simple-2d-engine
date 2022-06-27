class Vector2 {
  constructor(x= 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

export default class Entity {
  velocity = new Vector2()
  position = new Vector2()

  constructor(x, y, width, height, color) {
    this.position.x = x;
    this.position.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  physicsUpdate(deltaTime) {
    this.position.x += this.velocity.x * deltaTime;
    this.position.y += this.velocity.y * deltaTime;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  setVelocity(x, y) {
    this.velocity.x = x;
    this.velocity.y = y;
  }
}