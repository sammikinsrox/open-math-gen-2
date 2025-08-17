import { BaseShape } from './BaseShape.js';

/**
 * Triangle shape class
 */
export class Triangle extends BaseShape {
  constructor(base = 100, height = 87, x = 0, y = 0) {
    super(x, y);
    this.base = base;
    this.triangleHeight = height;
    this.type = 'isosceles'; // isosceles, right, equilateral, scalene
  }
  
  /**
   * Set dimensions of the triangle
   */
  setDimensions(base, height) {
    this.base = base;
    this.triangleHeight = height;
    return this;
  }
  
  /**
   * Set triangle type
   */
  setType(type) {
    this.type = type;
    return this;
  }
  
  /**
   * Get triangle vertices relative to position
   */
  getVertices() {
    const vertices = this.calculateVertices();
    return vertices.map(v => ({
      x: v.x + this.x,
      y: v.y + this.y
    }));
  }
  
  /**
   * Calculate vertices based on triangle type
   */
  calculateVertices() {
    switch (this.type) {
      case 'right':
        return [
          { x: 0, y: this.triangleHeight },
          { x: this.base, y: this.triangleHeight },
          { x: 0, y: 0 }
        ];
        
      case 'equilateral':
        const side = this.base;
        const h = side * Math.sqrt(3) / 2;
        return [
          { x: 0, y: h },
          { x: side, y: h },
          { x: side / 2, y: 0 }
        ];
        
      case 'isosceles':
      default:
        return [
          { x: 0, y: this.triangleHeight },
          { x: this.base, y: this.triangleHeight },
          { x: this.base / 2, y: 0 }
        ];
    }
  }
  
  /**
   * Calculate area
   */
  getArea() {
    return (this.base * this.triangleHeight) / 2;
  }
  
  /**
   * Calculate perimeter (assumes isosceles triangle)
   */
  getPerimeter() {
    if (this.type === 'equilateral') {
      return this.base * 3;
    } else if (this.type === 'right') {
      const hypotenuse = Math.sqrt(this.base ** 2 + this.triangleHeight ** 2);
      return this.base + this.triangleHeight + hypotenuse;
    } else {
      // Isosceles - calculate side lengths
      const sideLength = Math.sqrt((this.base / 2) ** 2 + this.triangleHeight ** 2);
      return this.base + 2 * sideLength;
    }
  }
  
  /**
   * Get side lengths
   */
  getSideLengths() {
    const vertices = this.calculateVertices();
    const sides = [];
    
    for (let i = 0; i < vertices.length; i++) {
      const next = (i + 1) % vertices.length;
      const length = Math.sqrt(
        (vertices[next].x - vertices[i].x) ** 2 + 
        (vertices[next].y - vertices[i].y) ** 2
      );
      sides.push(length);
    }
    
    return sides;
  }
  
  /**
   * Render the triangle
   */
  render(layer) {
    const vertices = this.calculateVertices();
    const points = vertices.map(v => `${v.x},${v.y}`).join(' ');
    
    const triangle = layer.append('polygon')
      .attr('points', points)
      .attr('transform', this.getTransform())
      .attr('class', 'shape triangle');
    
    this.applyStyle(triangle);
    
    // Add height line if specified in style
    if (this.style.showHeight) {
      this.renderHeightLine(layer);
    }
    
    return triangle;
  }
  
  /**
   * Render height line
   */
  renderHeightLine(layer) {
    const vertices = this.calculateVertices();
    let heightLine;
    
    if (this.type === 'right') {
      // For right triangle, height line is one of the sides
      heightLine = {
        x1: vertices[2].x, y1: vertices[2].y,
        x2: vertices[0].x, y2: vertices[0].y
      };
    } else {
      // For other triangles, height from apex to base
      heightLine = {
        x1: vertices[2].x, y1: vertices[2].y,
        x2: vertices[2].x, y2: vertices[0].y
      };
    }
    
    layer.append('line')
      .attr('x1', heightLine.x1)
      .attr('y1', heightLine.y1)
      .attr('x2', heightLine.x2)
      .attr('y2', heightLine.y2)
      .attr('transform', this.getTransform())
      .attr('stroke', this.style.heightLineColor || this.style.stroke)
      .attr('stroke-width', this.style.heightLineWidth || 2)
      .attr('stroke-dasharray', this.style.heightLineDash || '5,5')
      .attr('class', 'triangle-height');
  }
  
  /**
   * Show height line
   */
  showHeight(show = true, color = null, dash = '5,5') {
    this.style.showHeight = show;
    if (color) this.style.heightLineColor = color;
    if (dash) this.style.heightLineDash = dash;
    return this;
  }
  
  /**
   * Get bounding box
   */
  getBounds() {
    const vertices = this.getVertices();
    const xs = vertices.map(v => v.x);
    const ys = vertices.map(v => v.y);
    
    return {
      x: Math.min(...xs),
      y: Math.min(...ys),
      width: Math.max(...xs) - Math.min(...xs),
      height: Math.max(...ys) - Math.min(...ys)
    };
  }
  
  /**
   * Render measurements for this triangle
   */
  renderMeasurement(layer, measurement, measurementSystem) {
    const points = this.getMeasurementPoints(measurement.type, measurement.options);
    if (!points) return;
    
    measurementSystem.createMeasurementLine(
      layer,
      points.x1, points.y1,
      points.x2, points.y2,
      points.label,
      measurement.options.offset,
      measurement.options
    );
  }
  
  /**
   * Get measurement points for different measurement types
   */
  getMeasurementPoints(type, options = {}) {
    const vertices = this.getVertices();
    const { side = 'auto' } = options;
    
    switch (type) {
      case 'base':
        return {
          x1: vertices[0].x, y1: vertices[0].y,
          x2: vertices[1].x, y2: vertices[1].y,
          label: options.label || `${this.base} units`
        };
        
      case 'height':
        if (this.type === 'right') {
          return {
            x1: vertices[2].x, y1: vertices[2].y,
            x2: vertices[0].x, y2: vertices[0].y,
            label: options.label || `${this.triangleHeight} units`
          };
        } else {
          return {
            x1: vertices[2].x, y1: vertices[2].y,
            x2: vertices[2].x, y2: vertices[0].y,
            label: options.label || `${this.triangleHeight} units`
          };
        }
        
      case 'side1':
        return {
          x1: vertices[0].x, y1: vertices[0].y,
          x2: vertices[2].x, y2: vertices[2].y,
          label: options.label || `${this.getSideLengths()[0].toFixed(1)} units`
        };
        
      case 'side2':
        return {
          x1: vertices[1].x, y1: vertices[1].y,
          x2: vertices[2].x, y2: vertices[2].y,
          label: options.label || `${this.getSideLengths()[1].toFixed(1)} units`
        };
        
      case 'area':
        const center = this.getCenter();
        return {
          x1: center.x, y1: center.y,
          x2: center.x, y2: center.y,
          label: options.label || `Area: ${this.getArea()} sq units`
        };
        
      case 'perimeter':
        const bounds = this.getBounds();
        return {
          x1: bounds.x, y1: bounds.y + bounds.height + 30,
          x2: bounds.x + bounds.width, y2: bounds.y + bounds.height + 30,
          label: options.label || `Perimeter: ${this.getPerimeter().toFixed(1)} units`
        };
        
      default:
        console.warn(`Unknown measurement type: ${type}`);
        return null;
    }
  }
  
  /**
   * Get center point of triangle
   */
  getCenter() {
    const vertices = this.getVertices();
    return {
      x: (vertices[0].x + vertices[1].x + vertices[2].x) / 3,
      y: (vertices[0].y + vertices[1].y + vertices[2].y) / 3
    };
  }
  
  /**
   * Create specific triangle types (static methods)
   */
  static rightTriangle(base, height, x = 0, y = 0) {
    return new Triangle(base, height, x, y).setType('right');
  }
  
  static equilateralTriangle(side, x = 0, y = 0) {
    return new Triangle(side, side * Math.sqrt(3) / 2, x, y).setType('equilateral');
  }
  
  static isoscelesTriangle(base, height, x = 0, y = 0) {
    return new Triangle(base, height, x, y).setType('isosceles');
  }
}

export default Triangle;