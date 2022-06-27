'use strict'
import Entity from "./entity"

const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

let lastFrameTime = new Date().getTime()
let deltaTime = 0
const update = () => {
  const newframeTime = new Date().getTime()
  deltaTime = (newframeTime - lastFrameTime) / 1000
  lastFrameTime = newframeTime

  physicsStep(deltaTime)
  frameStep(deltaTime)

  requestAnimationFrame(update)
}

const frameStep = (deltaTime) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for(let i=0 ; i<entities.length ; i++) {
    entities[i].draw(ctx)
  }
}

const physicsStep = (deltaTime) => {
  for(let i=0 ; i<entities.length ; i++) {
    entities[i].physicsUpdate(deltaTime)
  }
}


const entities = []
entities.push(new Entity(50, 50, 100, 100, 'red'))
entities[0].setVelocity(50, 0)

requestAnimationFrame(update)