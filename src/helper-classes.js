export class Vector2 {
  constructor(x= 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  add(vector) {
    return new Vector2(this.x + vector.x, this.y + vector.y);
  }

  subtract(vector) {
    return new Vector2(this.x - vector.x, this.y - vector.y);
  }

  divide(n) {
    if(n == 0) return new Vector2(0, 0);

    return new Vector2(this.x / n, this.y / n);
  }

  multiply(n) {
    return new Vector2(this.x * n, this.y * n);
  }
  
  dot(vector) {
    return this.x * vector.x + this.y * vector.y;
  }

  normalize() {
    return this.divide(this.magnitude());
  }

  copy() {
    return new Vector2(this.x, this.y);
  }
}