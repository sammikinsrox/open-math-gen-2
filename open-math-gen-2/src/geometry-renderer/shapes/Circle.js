import { BaseShape } from './BaseShape.js';

/**
 * Circle shape class
 */
export class Circle extends BaseShape {
  constructor(radius = 50, x = 0, y = 0) {
    super(x, y);
    this.radius = radius;
  }
  
  /**
   * Set radius of the circle
   */
  setRadius(radius) {
    this.radius = radius;
    return this;
  }
  
  /**
   * Get radius
   */
  getRadius() {
    return this.radius;
  }
  
  /**
   * Get diameter
   */
  getDiameter() {
    return this.radius * 2;
  }
  
  /**
   * Calculate area
   */
  getArea() {
    return Math.PI * this.radius ** 2;
  }
  
  /**
   * Calculate circumference
   */
  getCircumference() {
    return 2 * Math.PI * this.radius;
  }
  
  /**
   * Get center point (accounting for position)
   */
  getCenter() {
    return {
      x: this.x + this.radius,
      y: this.y + this.radius
    };
  }
  
  /**
   * Render the circle
   */
  render(layer) {
    const center = this.getCenter();
    
    // Main circle
    const circle = layer.append('circle')
      .attr('cx', center.x)
      .attr('cy', center.y)
      .attr('r', this.radius * Math.min(this.scaleX, this.scaleY))
      .attr('class', 'shape circle');
    
    this.applyStyle(circle);
    
    // Add center point if specified in style
    if (this.style.showCenter) {
      layer.append('circle')
        .attr('cx', center.x)
        .attr('cy', center.y)
        .attr('r', 3)
        .attr('fill', this.style.centerColor || this.style.stroke)
        .attr('class', 'circle-center');
    }
    
    return circle;
  }
  
  /**
   * Get bounding box
   */
  getBounds() {
    const effectiveRadius = this.radius * Math.max(this.scaleX, this.scaleY);
    return {
      x: this.x,
      y: this.y,
      width: effectiveRadius * 2,
      height: effectiveRadius * 2
    };
  }
  
  /**
   * Show center point
   */
  showCenter(show = true, color = null) {
    this.style.showCenter = show;
    if (color) this.style.centerColor = color;
    return this;
  }
  
  /**
   * Render measurements for this circle
   */
  renderMeasurement(layer, measurement, measurementSystem) {
    const center = this.getCenter();
    const effectiveRadius = this.radius * Math.min(this.scaleX, this.scaleY);
    
    switch (measurement.type) {
      case 'radius':
        const angle = measurement.options.angle || 0;
        measurementSystem.createRadiusMeasurement(
          layer,
          center.x, center.y,
          effectiveRadius,
          angle * Math.PI / 180,
          {
            ...measurement.options,
            label: measurement.options.label || `r = ${this.radius}`
          }
        );
        break;
        
      case 'diameter':
        const diameterAngle = measurement.options.angle || 0;
        measurementSystem.createDiameterMeasurement(
          layer,
          center.x, center.y,
          effectiveRadius,
          diameterAngle * Math.PI / 180,
          {
            ...measurement.options,
            label: measurement.options.label || `d = ${this.getDiameter()}`
          }
        );
        break;
        
      case 'circumference':
        // Show circumference as a label below the circle
        const bounds = this.getBounds();
        measurementSystem.createMeasurementLine(
          layer,
          bounds.x, bounds.y + bounds.height + 20,
          bounds.x + bounds.width, bounds.y + bounds.height + 20,
          measurement.options.label || `C = ${this.getCircumference().toFixed(1)}`,
          measurement.options.offset || 15,
          measurement.options
        );
        break;
        
      case 'area':
        // Show area as a label in the center
        layer.append('text')
          .attr('x', center.x)
          .attr('y', center.y)
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'middle')
          .attr('class', 'area-label')
          .style('font-size', '12px')
          .style('fill', '#666')
          .text(measurement.options.label || `A = ${this.getArea().toFixed(1)}`);
        break;
        
      default:
        console.warn(`Unknown measurement type for Circle: ${measurement.type}`);
    }
  }
  
  /**
   * Get measurement points (for compatibility with base class)
   */
  getMeasurementPoints(type, options = {}) {
    const center = this.getCenter();
    const bounds = this.getBounds();
    
    switch (type) {
      case 'radius':
        const angle = options.angle || 0;
        const endX = center.x + this.radius * Math.cos(angle * Math.PI / 180);
        const endY = center.y + this.radius * Math.sin(angle * Math.PI / 180);
        return {
          x1: center.x, y1: center.y,
          x2: endX, y2: endY,
          label: options.label || `r = ${this.radius}`
        };
        
      case 'diameter':
        const diameterAngle = options.angle || 0;
        const dx1 = center.x - this.radius * Math.cos(diameterAngle * Math.PI / 180);
        const dy1 = center.y - this.radius * Math.sin(diameterAngle * Math.PI / 180);
        const dx2 = center.x + this.radius * Math.cos(diameterAngle * Math.PI / 180);
        const dy2 = center.y + this.radius * Math.sin(diameterAngle * Math.PI / 180);
        return {
          x1: dx1, y1: dy1,
          x2: dx2, y2: dy2,
          label: options.label || `d = ${this.getDiameter()}`
        };
        
      default:
        return null;
    }
  }
}

export default Circle;