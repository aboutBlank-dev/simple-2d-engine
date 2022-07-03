import Collisions from "./collisions"
import Polygon from "./Entities/polygon"
export default class SimpleEngine {
  canvas = document.getElementById('game')
  ctx = this.canvas.getContext('2d')

  lastFrameTime = new Date().getTime()
  deltaTime = 0

  entities = []

  constructor() {
    requestAnimationFrame(this.update)
  }

  update = () => {
    const newframeTime = new Date().getTime()
    this.deltaTime = (newframeTime - this.lastFrameTime) / 1000
    this.lastFrameTime = newframeTime
  
    this.physicsStep(this.deltaTime)
    this.frameStep(this.deltaTime)
  
    requestAnimationFrame(this.update)
  }
  
  physicsStep = () => {
    const entities = this.entities
    for(let i=0 ; i < entities.length ; i++) {
      this.entities[i].physicsUpdate(this.deltaTime, entities)
      this.entities[i].postPhysicsUpdate()
    }

    //Collisions here ?
    for(let i = 0; i < entities.length; i++) {
      const entityA = entities[i]
      for(let j = i + 1; j < entities.length; j++) {
        const entityB = entities[j]
        
        if(Collisions.collision(entityA, entityB)) {
          console.log("collision")
        }
      }
    }

  }
  
  frameStep = () => {
    const ctx = this.ctx
    const entities = this.entities

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  
    for(let i=0 ; i < entities.length; i++) {
      entities[i].update(this.deltaTime)
      entities[i].draw(ctx)
    }
    
    for(let i=0 ; i < entities.length ; i++) {
      entities[i].drawDebug(ctx)
    }
  }
}