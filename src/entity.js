'use strict'
export class Vector2 {
  constructor(x= 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

class Entity {
  verts = []
  center = new Vector2()

  velocity = new Vector2()
  position = new Vector2()
  rotation = 0

  collisions = []

  constructor(id, x, y, width, height) {
    this.id = id;

    this.width = width;
    this.height = height;

    this.verts = [
      new Vector2(x, y),
      new Vector2(x + width, y),
      new Vector2(x + width, y + height),
      new Vector2(x, y + height)
    ]

    this.setPosition(x, y)
    this.setRotation(0)
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
    this.velocity.x = x
    this.velocity.y = y
  }

  setRotation(angle)
  {
    this.rotation = angle

    //Rotate verts 
    //https://math.stackexchange.com/questions/270194/how-to-find-the-vertices-angle-after-rotation

    const p = this.center.x;
    const q = this.center.y;
    
    const radians = this.rotation * Math.PI / 180;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);

    for(let i = 0; i < this.verts.length; i++) {
      const x = this.verts[i].x;
      const y = this.verts[i].y;

      this.verts[i].x = (x - p) * cos - (y - q) * sin + p;
      this.verts[i].y = (x - p) * sin + (y - q) * cos + q;
    }
  }

  debugDrawVerts(ctx) {
    ctx.fillStyle = 'pink';
    for(let i=0; i<this.verts.length; i++) {
      ctx.fillRect(this.verts[i].x - 3, this.verts[i].y - 3, 6, 6);
    }
    
    ctx.fillRect(this.center.x - 3, this.center.y - 3, 6, 6);
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