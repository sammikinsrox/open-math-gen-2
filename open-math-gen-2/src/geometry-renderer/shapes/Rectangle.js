import { BaseShape } from './BaseShape.js';

/**
 * Rectangle shape class
 */
export class Rectangle extends BaseShape {
  constructor(width = 100, height = 60, x = 0, y = 0) {
    super(x, y);
    this.width = width;
    this.height = height;
  }
  
  /**
   * Set dimensions of the rectangle
   */
  setSize(width, height) {
    this.width = width;
    this.height = height;
    return this;
  }
  
  /**
   * Set width only
   */
  setWidth(width) {
    this.width = width;
    return this;
  }
  
  /**
   * Set height only
   */
  setHeight(height) {
    this.height = height;
    return this;
  }
  
  /**
   * Get dimensions
   */
  getDimensions() {
    return { width: this.width, height: this.height };
  }
  
  /**
   * Calculate area
   */
  getArea() {
    return this.width * this.height;
  }
  
  /**
   * Calculate perimeter
   */
  getPerimeter() {
    return 2 * (this.width + this.height);
  }
  
  /**
   * Render the rectangle
   */
  render(layer) {
    const rect = layer.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('transform', this.getTransform())
      .attr('class', 'shape rectangle');
    
    this.applyStyle(rect);
    return rect;
  }
  
  /**
   * Get bounding box
   */
  getBounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.width * this.scaleX,
      height: this.height * this.scaleY
    };
  }
  
  /**
   * Render measurements for this rectangle
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
    const { side = 'auto' } = options;
    
    // Apply transformation to get actual coordinates
    const bounds = this.getBounds();
    const x1 = bounds.x;
    const y1 = bounds.y;
    const x2 = bounds.x + bounds.width;
    const y2 = bounds.y + bounds.height;
    
    switch (type) {
      case 'width':
        const widthSide = side === 'auto' ? 'bottom' : side;
        if (widthSide === 'top') {
          return {
            x1, y1: y1, x2, y2: y1,
            label: options.label || `${this.width} units`
          };
        } else { // bottom
          return {
            x1, y1: y2, x2, y2: y2,
            label: options.label || `${this.width} units`
          };
        }
        
      case 'height':
        const heightSide = side === 'auto' ? 'right' : side;
        if (heightSide === 'left') {
          return {
            x1, y1, x2: x1, y2,
            label: options.label || `${this.height} units`
          };
        } else { // right
          return {
            x1: x2, y1, x2, y2,
            label: options.label || `${this.height} units`
          };
        }
        
      case 'diagonal':
        return {
          x1, y1, x2, y2,
          label: options.label || `${Math.sqrt(this.width ** 2 + this.height ** 2).toFixed(1)} units`
        };
        
      case 'area':
        // For area, we could show it as a label in the center
        return {
          x1: x1 + bounds.width / 2,
          y1: y1 + bounds.height / 2,
          x2: x1 + bounds.width / 2,
          y2: y1 + bounds.height / 2,
          label: options.label || `Area: ${this.getArea()} sq units`
        };
        
      case 'perimeter':
        // Show perimeter as combined measurement
        return {
          x1, y1: y2 + 30, x2, y2: y2 + 30,
          label: options.label || `Perimeter: ${this.getPerimeter()} units`
        };
        
      default:
        console.warn(`Unknown measurement type: ${type}`);
        return null;
    }
  }
  
  /**
   * Create a square (convenience method)
   */
  static square(size, x = 0, y = 0) {
    return new Rectangle(size, size, x, y);
  }
}

export default Rectangle;