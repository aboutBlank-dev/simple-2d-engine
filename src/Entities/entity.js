'use strict'
import {Vector2} from '../helper-classes'

export default class Entity {
  fillStyle = 'black'

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
  }

  update(deltaTime) { }
  
  draw(ctx) {  }

  setPosition(x, y) {
    this.position.x = x
    this.position.y = y
  }

  setRotation(angle)
  {
    this.rotation = angle
  }

  setVelocity(x, y) {
    this.velocity.x = x
    this.velocity.y = y
  }

  setAngularVelocity(angularVelocity) {
    this.angularVelocity = angularVelocity
  }

  debugDrawDirection(ctx) {
    ctx.strokeStyle = 'rgba(255, 255, 255, 1)'
    ctx.beginPath()
    ctx.moveTo(this.position.x, this.position.y)
    ctx.lineTo(this.position.x, this.position.y - this.height/2)
    ctx.stroke()
    ctx.closePath()

    ctx.setTransform(1,0,0,1,0,0)
  }

  toString() {
    return `Entity(${this.id})`
  }
}