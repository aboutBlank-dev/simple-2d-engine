'use strict'
export class Vector2 {
  constructor(x= 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

class Entity {
  velocity = new Vector2()
  position = new Vector2()

  collisions = []

  constructor(id, x, y, width, height) {
    this.id = id;

    this.position.x = x;
    this.position.y = y;
    this.width = width;
    this.height = height;
  }

  updatePosition(deltaTime) {
    this.position.x += this.velocity.x * deltaTime;
    this.position.y += this.velocity.y * deltaTime;
  }

  solveCollision(collidees) {
    if(collidees?.length > 0) {
      this.collisions = [...collidees];
      //Solve collision here


    } else {
      this.collisions = [];
    }
  }

  update(deltaTime) { }
  
  draw(ctx) { }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  setVelocity(x, y) {
    this.velocity.x = x;
    this.velocity.y = y;
  }

  toString() {
    return `Entity: ${this.id}`
  }
}

export class Square extends Entity {
  constructor(x, y, width, height, color) {
    super(color, x, y, width, height); //the id is the "color" atm
    this.color = color;
  }

  draw(ctx) { 
    ctx.fillStyle = this.collisions.length > 0 ? 'green' : this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}