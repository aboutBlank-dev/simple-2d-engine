import Entity from './entity'
export default class Polygon extends Entity {
  verts = []

  physicsUpdate(deltaTime) {
    super.physicsUpdate(deltaTime)
    this.updateVerts()
  }

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

    this.debugDrawVerts(ctx)
    this.debugDrawDirection(ctx)
  }

  setPosition(x, y) {
    super.setPosition(x, y)
    this.updateVertPosition()
  }

  setRotation(rot) {
    super.setRotation(rot)
    this.updateVertRotation()
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
}