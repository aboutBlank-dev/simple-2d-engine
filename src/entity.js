'use strict'
import {Vector2} from './helper-classes.js'

export default class Entity {
  fillStyle = 'black'

  verts = []
  collisions = []

  position = new Vector2()
  velocity = new Vector2()

  rotation = 0
  angularVelocity = 0

  constructor(id, x = 0, y = 0, rot = 0) {
    this.id = id;

    this.position.x = x;
    this.position.y = y;
    this.rotation = rot;
  }

  physicsUpdate(deltaTime) {
    this.position.x += this.velocity.x * deltaTime;
    this.position.y += this.velocity.y * deltaTime;

    this.rotation += this.angularVelocity * deltaTime

    this.updateVerts()
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
  
  draw(ctx) {  
    if(this.verts.length < 3) return
    //Draw concave polygon
    ctx.beginPath()
    ctx.moveTo(this.verts[0].x, this.verts[0].y)

    for(let i = 1; i < this.verts.length; i++) {
      ctx.lineTo(this.verts[i].x, this.verts[i].y)
    }

    ctx.fillStyle = this.fillStyle
    ctx.fill()
    ctx.closePath()
  }

  setPosition(x, y) {
    this.position.x = x
    this.position.y = y

    this.updateVertPosition()
  }

  setRotation(angle)
  {
    this.rotation = angle

    this.updateVertRotation()
  }

  setVelocity(x, y) {
    this.velocity.x = x
    this.velocity.y = y
  }

  setAngularVelocity(angularVelocity) {
    this.angularVelocity = angularVelocity
  }

  updateVerts() {
    this.updateVertPosition()
    this.updateVertRotation()
  }

  updateVertPosition() { }

  //https://math.stackexchange.com/questions/270194/how-to-find-the-vertices-angle-after-rotation
  updateVertRotation() {
    const p = this.position.x;
    const q = this.position.y;

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
    for(let i=0; i < this.verts.length; i++) {
      ctx.fillRect(this.verts[i].x - 3, this.verts[i].y - 3, 6, 6);
    }
    
    ctx.fillRect(this.position.x - 3, this.position.y - 3, 6, 6);
  }

  debugDrawDirection(ctx) {
    ctx.strokeStyle = 'rgba(255, 255, 255, 1)'
    ctx.beginPath()
    ctx.moveTo(this.position.x, this.position.y)

    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(Math.PI / 180 * this.rotation);
    ctx.translate(-this.position.x, -this.position.y);
    
    ctx.lineTo(this.position.x, this.position.y - this.height/2)

    ctx.stroke()
    ctx.closePath()

    ctx.setTransform(1,0,0,1,0,0)
  }

  toString() {
    return `Entity(${this.id})`
  }
}