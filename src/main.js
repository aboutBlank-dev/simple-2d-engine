'use strict'
import { Square } from "./entity"

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

const frameStep = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for(let i=0 ; i<entities.length ; i++) {
    entities[i].update(deltaTime)
  }

  for(let i=0 ; i<entities.length ; i++) {
    entities[i].draw(ctx)
    ctx.setTransform(1,0,0,1,0,0)
  }
}

const physicsStep = (deltaTime) => {
  for(let i=0 ; i < entities.length ; i++) {
    entities[i].updatePosition(deltaTime, entities)
  }

  const collisions = {}

  for(let i=0; i < entities.length ; i++) {
    for(let j=0; j < entities.length ; j++) {
      if(i !== j && hasCollision(entities[i], entities[j])) {
        if(!Array.isArray(collisions[entities[i]])) {
          collisions[entities[i]] = []
        }

        collisions[entities[i]].push(entities[j])
      }
    }  
  }
  
  for(let i=0 ; i < entities.length; i++) {
    entities[i].solveCollision(collisions[entities[i]])
  }
}

//For Un-rotated Squares only at the moment
const hasCollision = (entityA, entityB) => {
  return entityA.position.x < entityB.position.x + entityB.width &&
    entityA.position.x + entityA.width > entityB.position.x &&
    entityA.position.y < entityB.position.y + entityB.height &&
    entityA.position.y + entityA.height > entityB.position.y
}
const entities = []


entities.push(new Square(300, 50, 200, 200, 'red'))
entities.push(new Square(600, 50, 200, 200, 'blue'))
entities.push(new Square(0, 50, 200, 200, 'purple'))


// entities[0].setVelocity(50, 50)
// entities[1].setVelocity(-50, -50)
// entities[2].setVelocity(-50, 50)

requestAnimationFrame(update)