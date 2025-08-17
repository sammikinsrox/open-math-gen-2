import { BaseShape } from './BaseShape.js';

/**
 * Polygon shape class for regular polygons
 */
export class Polygon extends BaseShape {
  constructor(sides = 6, radius = 50, x = 0, y = 0) {
    super(x, y);
    this.sides = sides;
    this.radius = radius;
  }
  
  /**
   * Set number of sides
   */
  setSides(sides) {
    this.sides = sides;
    return this;
  }
  
  /**
   * Set radius (distance from center to vertex)
   */
  setRadius(radius) {
    this.radius = radius;
    return this;
  }
  
  /**
   * Get polygon vertices
   */
  getVertices() {
    const vertices = [];
    const angleStep = (2 * Math.PI) / this.sides;
    
    for (let i = 0; i < this.sides; i++) {
      const angle = i * angleStep - Math.PI / 2; // Start from top
      const x = this.x + this.radius * Math.cos(angle);
      const y = this.y + this.radius * Math.sin(angle);
      vertices.push({ x, y });
    }
    
    return vertices;
  }
  
  /**
   * Calculate area
   */
  getArea() {
    return (this.sides * this.radius * this.radius * Math.sin(2 * Math.PI / this.sides)) / 2;
  }
  
  /**
   * Calculate perimeter
   */
  getPerimeter() {
    const sideLength = 2 * this.radius * Math.sin(Math.PI / this.sides);
    return this.sides * sideLength;
  }
  
  /**
   * Render the polygon
   */
  render(layer) {
    const vertices = this.getVertices();
    const points = vertices.map(v => `${v.x},${v.y}`).join(' ');
    
    const polygon = layer.append('polygon')
      .attr('points', points)
      .attr('transform', this.getTransform())
      .attr('class', `shape polygon polygon-${this.sides}`);
    
    this.applyStyle(polygon);
    return polygon;
  }
  
  /**
   * Get bounding box
   */
  getBounds() {
    const vertices = this.getVertices();
    const xs = vertices.map(v => v.x);
    const ys = vertices.map(v => v.y);
    
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    
    return {
      x: minX,
      y: minY,
      width: (maxX - minX) * this.scaleX,
      height: (maxY - minY) * this.scaleY
    };
  }
  
  /**
   * Render measurements for this polygon
   */
  renderMeasurement(layer, measurement, measurementSystem) {
    const bounds = this.getBounds();
    const centerX = bounds.x + bounds.width / 2;
    const centerY = bounds.y + bounds.height / 2;
    
    switch (measurement.type) {
      case 'perimeter':
        // Show perimeter label below the shape
        measurementSystem.createLabel(
          layer,
          centerX,
          bounds.y + bounds.height + 30,
          measurement.options.label || `Perimeter: ${this.getPerimeter().toFixed(1)} units`
        );
        break;
        
      case 'area':
        // Show area label in center
        measurementSystem.createLabel(
          layer,
          centerX,
          centerY,
          measurement.options.label || `Area: ${this.getArea().toFixed(1)} sq units`
        );
        break;
    }
  }
  
  /**
   * Get measurement points (simplified for polygons)
   */
  getMeasurementPoints(type, options = {}) {
    const bounds = this.getBounds();
    const centerX = bounds.x + bounds.width / 2;
    const centerY = bounds.y + bounds.height / 2;
    
    return {
      x1: centerX,
      y1: centerY,
      x2: centerX,
      y2: centerY,
      label: options.label || `${type}: ${type === 'area' ? this.getArea().toFixed(1) : this.getPerimeter().toFixed(1)} units`
    };
  }
  
  /**
   * Create specific polygon types
   */
  static pentagon(radius = 50, x = 0, y = 0) {
    return new Polygon(5, radius, x, y);
  }
  
  static hexagon(radius = 50, x = 0, y = 0) {
    return new Polygon(6, radius, x, y);
  }
  
  static octagon(radius = 50, x = 0, y = 0) {
    return new Polygon(8, radius, x, y);
  }
}

export default Polygon;