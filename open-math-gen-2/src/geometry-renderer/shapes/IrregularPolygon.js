import { BaseShape } from './BaseShape.js';

/**
 * IrregularPolygon - Polygon with variable number of vertices and custom positions
 */
export class IrregularPolygon extends BaseShape {
  constructor(x = 0, y = 0, vertices = []) {
    super(x, y);
    this.vertices = vertices.length > 0 ? vertices : this.generateRandomPolygon(6);
    this.showVertexLabels = false;
  }
  
  /**
   * Set vertices for the polygon
   * @param {Array} vertices - Array of {x, y} coordinate objects
   */
  setVertices(vertices) {
    this.vertices = vertices;
    return this;
  }
  
  /**
   * Add a vertex to the polygon
   */
  addVertex(x, y) {
    this.vertices.push({ x, y });
    return this;
  }
  
  /**
   * Generate a random irregular polygon
   */
  generateRandomPolygon(numVertices = 6, radius = 80) {
    const vertices = [];
    const angleStep = (2 * Math.PI) / numVertices;
    
    for (let i = 0; i < numVertices; i++) {
      const baseAngle = i * angleStep;
      const angleVariation = (Math.random() - 0.5) * angleStep * 0.3;
      const radiusVariation = radius * (0.7 + Math.random() * 0.6);
      
      const angle = baseAngle + angleVariation;
      const x = Math.cos(angle) * radiusVariation;
      const y = Math.sin(angle) * radiusVariation;
      
      vertices.push({ x, y });
    }
    
    return vertices;
  }
  
  /**
   * Generate a convex polygon inscribed in a circle
   */
  generateConvexPolygon(numVertices = 6, radius = 80) {
    const vertices = [];
    
    for (let i = 0; i < numVertices; i++) {
      const angle = (2 * Math.PI * i) / numVertices;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      vertices.push({ x, y });
    }
    
    this.vertices = vertices;
    return this;
  }
  
  /**
   * Generate a star polygon
   */
  generateStarPolygon(numPoints = 5, outerRadius = 80, innerRadius = 40) {
    const vertices = [];
    
    for (let i = 0; i < numPoints * 2; i++) {
      const angle = (Math.PI * i) / numPoints;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      vertices.push({ x, y });
    }
    
    this.vertices = vertices;
    return this;
  }
  
  /**
   * Set whether to show vertex labels
   */
  setShowVertexLabels(show) {
    this.showVertexLabels = show;
    return this;
  }
  
  /**
   * Render the irregular polygon
   */
  render(layer) {
    if (this.vertices.length < 3) return this;
    
    // Create group for polygon
    const polygonGroup = layer.append('g')
      .attr('class', 'irregular-polygon')
      .attr('transform', this.getTransform());
    
    // Create points string for polygon
    const points = this.vertices.map(v => `${v.x},${v.y}`).join(' ');
    
    // Render polygon
    const polygon = polygonGroup.append('polygon')
      .attr('points', points);
    
    this.applyStyle(polygon);
    
    // Render vertex labels if enabled
    if (this.showVertexLabels) {
      this.renderVertexLabels(polygonGroup);
    }
    
    return this;
  }
  
  /**
   * Render labels for vertices
   */
  renderVertexLabels(group) {
    this.vertices.forEach((vertex, index) => {
      group.append('circle')
        .attr('cx', vertex.x)
        .attr('cy', vertex.y)
        .attr('r', 3)
        .attr('fill', this.style.stroke)
        .attr('stroke', 'white')
        .attr('stroke-width', 1);
      
      group.append('text')
        .attr('x', vertex.x + 8)
        .attr('y', vertex.y - 8)
        .attr('font-size', '12')
        .attr('font-family', 'Arial, sans-serif')
        .attr('fill', this.style.stroke)
        .text(`${String.fromCharCode(65 + index)}`); // A, B, C, etc.
    });
  }
  
  /**
   * Get bounding box of the polygon
   */
  getBounds() {
    if (this.vertices.length === 0) {
      return { x: this.x, y: this.y, width: 0, height: 0 };
    }
    
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    
    this.vertices.forEach(vertex => {
      minX = Math.min(minX, this.x + vertex.x);
      minY = Math.min(minY, this.y + vertex.y);
      maxX = Math.max(maxX, this.x + vertex.x);
      maxY = Math.max(maxY, this.y + vertex.y);
    });
    
    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    };
  }
  
  /**
   * Calculate area using shoelace formula
   */
  getArea() {
    if (this.vertices.length < 3) return 0;
    
    let area = 0;
    const n = this.vertices.length;
    
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      area += this.vertices[i].x * this.vertices[j].y;
      area -= this.vertices[j].x * this.vertices[i].y;
    }
    
    return Math.abs(area) / 2;
  }
  
  /**
   * Calculate perimeter
   */
  getPerimeter() {
    if (this.vertices.length < 2) return 0;
    
    let perimeter = 0;
    const n = this.vertices.length;
    
    for (let i = 0; i < n; i++) {
      const current = this.vertices[i];
      const next = this.vertices[(i + 1) % n];
      
      const dx = next.x - current.x;
      const dy = next.y - current.y;
      perimeter += Math.sqrt(dx * dx + dy * dy);
    }
    
    return perimeter;
  }
  
  /**
   * Get side lengths
   */
  getSideLengths() {
    const sides = [];
    const n = this.vertices.length;
    
    for (let i = 0; i < n; i++) {
      const current = this.vertices[i];
      const next = this.vertices[(i + 1) % n];
      
      const dx = next.x - current.x;
      const dy = next.y - current.y;
      sides.push(Math.sqrt(dx * dx + dy * dy));
    }
    
    return sides;
  }
  
  /**
   * Check if polygon is convex
   */
  isConvex() {
    if (this.vertices.length < 3) return false;
    
    const n = this.vertices.length;
    let sign = null;
    
    for (let i = 0; i < n; i++) {
      const prev = this.vertices[(i - 1 + n) % n];
      const curr = this.vertices[i];
      const next = this.vertices[(i + 1) % n];
      
      // Calculate cross product
      const cross = (curr.x - prev.x) * (next.y - curr.y) - (curr.y - prev.y) * (next.x - curr.x);
      
      if (cross !== 0) {
        const currentSign = cross > 0;
        if (sign === null) {
          sign = currentSign;
        } else if (sign !== currentSign) {
          return false; // Found a concave angle
        }
      }
    }
    
    return true;
  }
  
  /**
   * Get measurement points for polygon
   */
  getMeasurementPoints(type, options) {
    const bounds = this.getBounds();
    
    switch (type) {
      case 'side':
        // Measure a specific side
        const sideIndex = options.sideIndex || 0;
        const vertex1 = this.vertices[sideIndex];
        const vertex2 = this.vertices[(sideIndex + 1) % this.vertices.length];
        
        return {
          x1: this.x + vertex1.x,
          y1: this.y + vertex1.y + 15,
          x2: this.x + vertex2.x,
          y2: this.y + vertex2.y + 15,
          label: options.label || `${Math.sqrt((vertex2.x - vertex1.x)**2 + (vertex2.y - vertex1.y)**2).toFixed(1)}`
        };
        
      case 'area':
        // Place area label in center
        return {
          x1: bounds.x + bounds.width / 2,
          y1: bounds.y + bounds.height / 2,
          x2: bounds.x + bounds.width / 2,
          y2: bounds.y + bounds.height / 2,
          label: options.label || `Area = ${this.getArea().toFixed(1)}`
        };
        
      case 'perimeter':
        // Place perimeter label outside polygon
        return {
          x1: bounds.x + bounds.width + 10,
          y1: bounds.y + bounds.height / 2,
          x2: bounds.x + bounds.width + 10,
          y2: bounds.y + bounds.height / 2,
          label: options.label || `P = ${this.getPerimeter().toFixed(1)}`
        };
        
      default:
        return super.getMeasurementPoints(type, options);
    }
  }
  
  /**
   * Render measurement for polygon
   */
  renderMeasurement(layer, measurement, measurementSystem) {
    const points = this.getMeasurementPoints(measurement.type, measurement.options);
    
    if (points) {
      measurementSystem.drawMeasurement(
        layer,
        points.x1, points.y1,
        points.x2, points.y2,
        points.label,
        measurement.options
      );
    }
  }
}

/**
 * CompositeShape - Combination of multiple shapes
 */
export class CompositeShape extends BaseShape {
  constructor(x = 0, y = 0) {
    super(x, y);
    this.shapes = [];
    this.operations = []; // 'union', 'subtract', 'intersect'
  }
  
  /**
   * Add a shape to the composite
   */
  addShape(shape, operation = 'union') {
    this.shapes.push(shape);
    this.operations.push(operation);
    return this;
  }
  
  /**
   * Render the composite shape
   */
  render(layer) {
    // Create group for composite shape
    const compositeGroup = layer.append('g')
      .attr('class', 'composite-shape')
      .attr('transform', this.getTransform());
    
    // For now, render all shapes (complex Boolean operations would need more advanced implementation)
    this.shapes.forEach((shape, index) => {
      const operation = this.operations[index];
      
      // Apply different styling based on operation
      if (operation === 'subtract') {
        shape.setStyle({
          fill: 'rgba(255, 255, 255, 0.8)',
          stroke: '#e74c3c',
          strokeWidth: 2
        });
      } else if (operation === 'intersect') {
        shape.setStyle({
          fill: 'rgba(155, 89, 182, 0.3)',
          stroke: '#9b59b6',
          strokeWidth: 1
        });
      }
      
      shape.render(compositeGroup);
    });
    
    return this;
  }
  
  /**
   * Get bounding box of all shapes combined
   */
  getBounds() {
    if (this.shapes.length === 0) {
      return { x: this.x, y: this.y, width: 0, height: 0 };
    }
    
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    
    this.shapes.forEach(shape => {
      const bounds = shape.getBounds();
      minX = Math.min(minX, bounds.x);
      minY = Math.min(minY, bounds.y);
      maxX = Math.max(maxX, bounds.x + bounds.width);
      maxY = Math.max(maxY, bounds.y + bounds.height);
    });
    
    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    };
  }
  
  /**
   * Get measurement points for composite shape
   */
  getMeasurementPoints(type, options) {
    // Delegate to the first shape or calculate based on composite bounds
    if (this.shapes.length > 0) {
      return this.shapes[0].getMeasurementPoints(type, options);
    }
    return super.getMeasurementPoints(type, options);
  }
  
  /**
   * Render measurements for composite shape
   */
  renderMeasurement(layer, measurement, measurementSystem) {
    const points = this.getMeasurementPoints(measurement.type, measurement.options);
    
    if (points) {
      measurementSystem.drawMeasurement(
        layer,
        points.x1, points.y1,
        points.x2, points.y2,
        points.label,
        measurement.options
      );
    }
  }
}

export default IrregularPolygon;