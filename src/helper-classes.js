export class Vector2 {
  constructor(x= 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  divide(n) {
    if(n == 0) return new Vector2(0, 0);

    return new Vector2(this.x / n, this.y / n);
  }

  multiply(n) {
    return new Vector2(this.x * n, this.y * n);
  }
  
  normalize() {
    return this.divide(this.magnitude());
  }
}