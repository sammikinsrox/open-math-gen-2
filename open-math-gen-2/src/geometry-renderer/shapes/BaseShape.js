/**
 * BaseShape - Abstract base class for all geometric shapes
 */
export class BaseShape {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.rotation = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.measurements = [];
    this.renderer = null;
    this.style = {
      fill: 'rgba(52, 152, 219, 0.3)',
      stroke: '#2980b9',
      strokeWidth: 2
    };
  }
  
  /**
   * Set the renderer instance (called by GeometryRenderer)
   */
  setRenderer(renderer) {
    this.renderer = renderer;
    return this;
  }
  
  /**
   * Set position of the shape
   */
  setPosition(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }
  
  /**
   * Get current position
   */
  getPosition() {
    return { x: this.x, y: this.y };
  }
  
  /**
   * Position shape at center of canvas
   */
  center() {
    if (this.renderer) {
      const center = this.renderer.getCenter();
      // Get bounds at current position to understand shape dimensions
      const tempX = this.x;
      const tempY = this.y;
      this.x = 0;
      this.y = 0;
      const bounds = this.getBounds();
      
      // Calculate center position accounting for shape's natural offset
      this.setPosition(
        center.x - bounds.x - bounds.width / 2,
        center.y - bounds.y - bounds.height / 2
      );
    }
    return this;
  }
  
  /**
   * Set rotation in degrees
   */
  rotate(degrees) {
    this.rotation = degrees;
    return this;
  }
  
  /**
   * Scale the shape uniformly
   */
  scale(factor) {
    this.scaleX = factor;
    this.scaleY = factor;
    return this;
  }
  
  /**
   * Scale the shape with different factors for X and Y
   */
  scaleXY(factorX, factorY) {
    this.scaleX = factorX;
    this.scaleY = factorY;
    return this;
  }
  
  /**
   * Set style properties
   */
  setStyle(style) {
    this.style = { ...this.style, ...style };
    return this;
  }
  
  /**
   * Add a measurement to this shape
   */
  addMeasurement(type, options = {}) {
    const measurement = {
      type,
      shape: this,
      options: {
        offset: 25,
        side: 'auto',
        label: null,
        ...options
      }
    };
    this.measurements.push(measurement);
    return this;
  }
  
  /**
   * Remove all measurements
   */
  clearMeasurements() {
    this.measurements = [];
    return this;
  }
  
  /**
   * Get transformation string for SVG
   */
  getTransform() {
    const transforms = [];
    
    if (this.x !== 0 || this.y !== 0) {
      transforms.push(`translate(${this.x}, ${this.y})`);
    }
    
    if (this.rotation !== 0) {
      transforms.push(`rotate(${this.rotation})`);
    }
    
    if (this.scaleX !== 1 || this.scaleY !== 1) {
      transforms.push(`scale(${this.scaleX}, ${this.scaleY})`);
    }
    
    return transforms.join(' ');
  }
  
  /**
   * Apply style to SVG element
   */
  applyStyle(element) {
    element
      .attr('fill', this.style.fill)
      .attr('stroke', this.style.stroke)
      .attr('stroke-width', this.style.strokeWidth);
    return element;
  }
  
  /**
   * Render measurements for this shape
   */
  renderMeasurements(layer) {
    if (!this.renderer) return;
    
    const measurementSystem = this.renderer.getMeasurementSystem();
    
    this.measurements.forEach(measurement => {
      this.renderMeasurement(layer, measurement, measurementSystem);
    });
  }
  
  // Abstract methods that must be implemented by subclasses
  
  /**
   * Render the shape to the SVG layer
   * @param {d3.Selection} layer - D3 selection of the layer to render to
   */
  render(layer) {
    throw new Error('render() method must be implemented by subclass');
  }
  
  /**
   * Get bounding box of the shape
   * @returns {Object} {x, y, width, height}
   */
  getBounds() {
    throw new Error('getBounds() method must be implemented by subclass');
  }
  
  /**
   * Render a specific measurement
   * @param {d3.Selection} layer - D3 selection of the measurement layer
   * @param {Object} measurement - Measurement configuration
   * @param {MeasurementSystem} measurementSystem - The measurement system instance
   */
  renderMeasurement(layer, measurement, measurementSystem) {
    throw new Error('renderMeasurement() method must be implemented by subclass');
  }
  
  /**
   * Get measurement points for a specific measurement type
   * @param {string} type - Type of measurement
   * @param {Object} options - Measurement options
   * @returns {Object} {x1, y1, x2, y2, label}
   */
  getMeasurementPoints(type, options) {
    throw new Error('getMeasurementPoints() method must be implemented by subclass');
  }
}

export default BaseShape;