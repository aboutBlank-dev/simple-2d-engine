'use strict'
export class Vector2 {
  constructor(x= 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

class Entity {
  center = new Vector2()

  velocity = new Vector2()
  position = new Vector2()
  rotation = 45

  collisions = []

  constructor(id, x, y, width, height) {
    this.id = id;

    this.width = width;
    this.height = height;
    this.setPosition(x, y)
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
    this.position.x = x;
    this.position.y = y;

    this.center = new Vector2(this.position.x + this.width/2, this.position.y + this.height/2);
  }

  setVelocity(x, y) {
    this.velocity.x = x;
    this.velocity.y = y;
  }

  toString() {
    return `Entity(${this.id})`
  }
}

export class Square extends Entity {
  constructor(x, y, width, height, color) {
    super(color, x, y, width, height); //the id is the "color" atm
    this.color = color;
  }

  draw(ctx) {
    ctx.translate(this.center.x, this.center.y);
    ctx.rotate(Math.PI / 180 * this.rotation);
    ctx.translate(-this.center.x, -this.center.y);
    
    ctx.fillStyle = this.collisions.length > 0 ? 'green' : this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}