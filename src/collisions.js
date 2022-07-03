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
        return false;
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
        return false;
      }
    }

    return true;
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

  static intersectCircles(a, b) {
    const dist = a.center.subtract(b.center).magnitude();
    return dist < a.radius + b.radius;
  }

  static intersectPolygon_Circle(polygon, circle) {
    const vertices = polygon.verts;
    const center = circle.center;
    
    for(let i=0; i < vertices.length; i++) {
      const v = vertices[i];
      
      const distance = v.subtract(center).magnitude();
      if(distance < circle.radius) {
        return true;
      }
    }

    return false;
  }
}