'use strict'
import {Vector2} from '../helper-classes'

export default class Entity {
  fillStyle = 'black'

  center = new Vector2();

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
    this.position.y -= this.velocity.y * deltaTime;

    this.rotation += this.angularVelocity * deltaTime;
  }

  postPhysicsUpdate() { 
    this.updateCenter()
  }

  update(deltaTime) { }
  
  draw(ctx) {  }

  drawDebug(ctx) {
    this.debugDrawCenter(ctx)
  }

  setPosition(x, y, aroundCenter = true) {
    if(aroundCenter === true) {
      this.position.x = x - (this.center.x - this.position.x);
      this.position.y = y - (this.center.y - this.position.y);
    } else {
      this.position.x = x
      this.position.y = y
    }    
  }

  move(moveVector) {
    this.position = this.position.add(moveVector)
  }

  rotate(angle) {
    this.rotation += angle
  }

  updateCenter() { }

  setRotation(angle)
  {
    this.rotation = angle
  }

  setVelocity(velocity) {
    this.velocity = velocity;
  }

  setAngularVelocity(angularVelocity) {
    this.angularVelocity = angularVelocity
  }

  debugDrawCenter(ctx, center) {
    if(!center) center = this.position

    ctx.fillStyle = 'pink'
    ctx.fillRect(center.x - 3, center.y - 3, 6, 6)
  }

  toString() {
    return `Entity(${this.id})`
  }
}