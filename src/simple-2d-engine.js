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
    }

    //Collisions here ?
  }
  
  frameStep = () => {
    const ctx = this.ctx
    const entities = this.entities

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  
    for(let i=0 ; i < entities.length ; i++) {
      entities[i].update(this.deltaTime)
      entities[i].draw(ctx)
    }
  }
}