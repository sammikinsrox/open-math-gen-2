import * as d3 from 'd3';
import { Grid } from './components/Grid.js';
import { MeasurementSystem } from './components/MeasurementSystem.js';
import { ThemeManager } from './components/ThemeManager.js';

/**
 * GeometryRenderer - A framework for creating educational geometry diagrams with D3
 */
export class GeometryRenderer {
  constructor(selector, options = {}) {
    this.container = d3.select(selector);
    this.options = {
      width: 400,
      height: 300,
      margin: { top: 20, right: 20, bottom: 20, left: 20 },
      showGrid: true,
      gridSize: 20,
      theme: 'educational',
      backgroundColor: '#ffffff',
      ...options
    };
    
    this.shapes = [];
    this.measurements = [];
    
    // Initialize components
    this.themeManager = new ThemeManager(this.options.theme);
    this.grid = new Grid(this.options);
    this.measurementSystem = new MeasurementSystem(this.themeManager);
    
    this.init();
  }
  
  init() {
    // Clear existing content
    this.container.selectAll('*').remove();
    
    // Create main SVG
    this.svg = this.container
      .append('svg')
      .attr('width', this.options.width)
      .attr('height', this.options.height)
      .style('background-color', this.options.backgroundColor);
    
    // Create main group for all content
    this.mainGroup = this.svg
      .append('g')
      .attr('transform', `translate(${this.options.margin.left}, ${this.options.margin.top})`);
    
    // Add grid if enabled
    if (this.options.showGrid) {
      this.grid.render(this.mainGroup, this.getContentWidth(), this.getContentHeight());
    }
    
    // Create layers for different element types
    this.shapeLayer = this.mainGroup.append('g').attr('class', 'shapes-layer');
    this.measurementLayer = this.mainGroup.append('g').attr('class', 'measurements-layer');
  }
  
  getContentWidth() {
    return this.options.width - this.options.margin.left - this.options.margin.right;
  }
  
  getContentHeight() {
    return this.options.height - this.options.margin.top - this.options.margin.bottom;
  }
  
  /**
   * Add a shape to the renderer
   */
  add(shape) {
    this.shapes.push(shape);
    shape.setRenderer(this);
    this.render();
    return this;
  }
  
  /**
   * Remove a shape from the renderer
   */
  remove(shape) {
    const index = this.shapes.indexOf(shape);
    if (index > -1) {
      this.shapes.splice(index, 1);
      this.render();
    }
    return this;
  }
  
  /**
   * Clear all shapes and measurements
   */
  clear() {
    this.shapes = [];
    this.measurements = [];
    this.render();
    return this;
  }
  
  /**
   * Render all shapes and measurements
   */
  render() {
    // Clear existing shapes and measurements
    this.shapeLayer.selectAll('*').remove();
    this.measurementLayer.selectAll('*').remove();
    
    // Render all shapes
    this.shapes.forEach(shape => {
      shape.render(this.shapeLayer);
    });
    
    // Render measurements after shapes
    this.shapes.forEach(shape => {
      shape.renderMeasurements(this.measurementLayer);
    });
    
    return this;
  }
  
  /**
   * Update theme
   */
  setTheme(theme) {
    this.themeManager.setTheme(theme);
    this.render();
    return this;
  }
  
  /**
   * Get measurement system for adding custom measurements
   */
  getMeasurementSystem() {
    return this.measurementSystem;
  }
  
  /**
   * Export as SVG string
   */
  exportSVG() {
    return new XMLSerializer().serializeToString(this.svg.node());
  }
  
  /**
   * Get center point of the canvas
   */
  getCenter() {
    return {
      x: this.getContentWidth() / 2,
      y: this.getContentHeight() / 2
    };
  }
  
  /**
   * Convert relative coordinates to absolute canvas coordinates
   */
  toCanvasCoords(x, y) {
    return {
      x: x + this.options.margin.left,
      y: y + this.options.margin.top
    };
  }
  
  /**
   * Fit all shapes within the canvas bounds
   */
  fitToCanvas() {
    if (this.shapes.length === 0) return this;
    
    // Calculate bounding box of all shapes
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    
    this.shapes.forEach(shape => {
      const bounds = shape.getBounds();
      minX = Math.min(minX, bounds.x);
      minY = Math.min(minY, bounds.y);
      maxX = Math.max(maxX, bounds.x + bounds.width);
      maxY = Math.max(maxY, bounds.y + bounds.height);
    });
    
    const shapeWidth = maxX - minX;
    const shapeHeight = maxY - minY;
    const canvasWidth = this.getContentWidth();
    const canvasHeight = this.getContentHeight();
    
    // Calculate scale and offset to center and fit shapes
    const scale = Math.min(canvasWidth / shapeWidth, canvasHeight / shapeHeight) * 0.8;
    const offsetX = (canvasWidth - shapeWidth * scale) / 2 - minX * scale;
    const offsetY = (canvasHeight - shapeHeight * scale) / 2 - minY * scale;
    
    // Apply transformation to all shapes
    this.shapes.forEach(shape => {
      const pos = shape.getPosition();
      shape.setPosition(pos.x * scale + offsetX, pos.y * scale + offsetY);
      shape.scale(scale);
    });
    
    this.render();
    return this;
  }
}

export default GeometryRenderer;