import Circle from './Entities/circle';
import {Vector2} from './helper-classes';
import Polygon from './Entities/polygon';

export default class Collisions {
  static collision(entityA, entityB) {
    if(entityA instanceof Polygon) {
      if(entityB instanceof Polygon) {
        return Collisions.intersectPolygons(entityA, entityB);
      } else if(entityB instanceof Circle) {
        return Collisions.intersectPolygon_Circle(entityA, entityB);
      }
    } else if(entityA instanceof Circle) {
      if(entityB instanceof Polygon) {
        return Collisions.intersectPolygon_Circle(entityB, entityA);
      } else if(entityB instanceof Circle) {
        return Collisions.intersectCircles(entityA, entityB);
      }
    }

    return false
  }

  static intersectPolygons(a, b) {
    let normal = new Vector2();
    let depth = Number.MAX_VALUE;

    const verticesA = a.verts;
    const verticesB = b.verts;

    if(verticesA === undefined || verticesB === undefined) return false

    for(let i=0; i < verticesA.length; i++) {
      const va = verticesA[i];
      const vb = verticesA[(i + 1) % verticesA.length];

      const edge = vb.add(va.multiply(-1))
      const axis = new Vector2(-edge.y, edge.x)

      const [minA, maxA] = Collisions.projectVertices(verticesA, axis)
      const [minB, maxB] = Collisions.projectVertices(verticesB, axis)

      if(minA >= maxB || minB >= maxA) {
        return [false, normal, depth];
      }

      const axisDepth = Math.min(maxB - minA, maxA - minB);
      if(axisDepth < depth) {
        depth = axisDepth;
        normal = axis;
      }
    }

    for(let i=0; i < verticesB.length; i++) {
      const va = verticesB[i];
      const vb = verticesB[(i + 1) % verticesB.length];

      const edge = vb.add(va.multiply(-1))
      const axis = new Vector2(-edge.y, edge.x)

      const [minA, maxA] = Collisions.projectVertices(verticesA, axis)
      const [minB, maxB] = Collisions.projectVertices(verticesB, axis)

      if(minA >= maxB || minB >= maxA) {
        return [false, normal, depth];
      }

      const axisDepth = Math.min(maxB - minA, maxA - minB);
      if(axisDepth < depth) {
        depth = axisDepth;
        normal = axis;
      }
    }

    depth = depth / normal.magnitude();
    normal = normal.normalize();

    const centerA = Collisions.findArithmeticMean(verticesA);
    const centerB = Collisions.findArithmeticMean(verticesB);

    const direction = centerA.subtract(centerB);

    if(direction.dot(normal) > 0) {
      normal = normal.multiply(-1); 
    }

    return [true, normal, depth];
  }

  static intersectPolygon_Circle(polygon, circle) {
    let normal = new Vector2();
    let depth = Number.MAX_VALUE;

    const vertices = polygon.verts;
    const center = circle.center;

    for(let i=0; i < vertices.length; i++) {
      const va = vertices[i];
      const vb = vertices[(i + 1) % vertices.length];

      const edge = vb.subtract(va)
      const axis = new Vector2(-edge.y, edge.x)

      const [minA, maxA] = Collisions.projectVertices(vertices, axis)
      const [minB, maxB] = Collisions.projectCircle(circle, axis)

      if(minA >= maxB || minB >= maxA) {
        return [false, normal, depth];
      }

      const axisDepth = Math.min(maxB - minA, maxA - minB);
      if(axisDepth < depth) {
        depth = axisDepth;
        normal = axis;
      }
    }
    const cpIndex = Collisions.findClosestPoint(center, vertices)
    const cp = vertices[cpIndex];

    const axis = cp.subtract(center)

    const [minA, maxA] = Collisions.projectVertices(vertices, axis)
    const [minB, maxB] = Collisions.projectCircle(circle, axis)

    if(minA >= maxB || minB >= maxA) {
      return [false, normal, depth];
    }

    const axisDepth = Math.min(maxB - minA, maxA - minB);
    if(axisDepth < depth) {
      depth = axisDepth;
      normal = axis;
    }

    depth = depth / normal.magnitude();
    normal = normal.normalize();

    const polygonCenter = Collisions.findArithmeticMean(vertices);
    const direction = center.subtract(polygonCenter);

    if(direction.dot(normal) < 0) {
      normal = normal.multiply(-1); 
    }

    return [true, normal, depth];
  }

  static intersectCircles(a, b) {
    const dist = a.center.subtract(b.center).magnitude();
    const collision = dist < a.radius + b.radius;

    const normal = a.center.subtract(b.center).normalize();
    const depth = (a.radius + b.radius) - dist;

    return [collision, normal, depth]
  }
  
  static projectVertices(vertices, axis) {
    let min = Number.MAX_VALUE;
    let max = Number.MIN_VALUE;

    for(let i = 0; i < vertices.length; i++) {
      const v = vertices[i];
      const proj = v.dot(axis);

      if(proj < min) {
        min = proj;
      }
      if(proj > max) {
        max = proj;
      }
    }

    return [min, max]
  }

  static projectCircle(circle, axis) {
    const center = circle.center;
    const radius = circle.radius;

    const direction = axis.normalize();
    const directionAndRadius = direction.multiply(radius);

    const p1 = center.add(directionAndRadius);
    const p2 = center.subtract(directionAndRadius);

    let min = p1.dot(axis);
    let max = p2.dot(axis);

    if(min > max) {
      const t = min;
      min = max;
      max = t;
    }

    return [min, max]
  }

  static findClosestPoint(center, vertices) {
    let result = -1;
    let minDistance = Number.MAX_VALUE;

    for (let i = 0; i < vertices.length; i++) {
      const v = vertices[i];
      const distance = v.distance(center)

      if(distance < minDistance) {
        minDistance = distance;
        result = i;
      }   
    }

    return result;
  }

  static findArithmeticMean(vertices) {
    let sumX = 0;
    let sumY = 0;

    for(let i=0; i < vertices.length; i++) {
      sumX += vertices[i].x;
      sumY += vertices[i].y;
    }

    return new Vector2(sumX / vertices.length, sumY / vertices.length);
  }
}