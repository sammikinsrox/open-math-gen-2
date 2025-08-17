/**
 * GeometryRenderer Framework
 * A powerful D3-based framework for creating educational geometry diagrams
 */

// Main renderer
export { GeometryRenderer } from './GeometryRenderer.js';

// Base classes
export { BaseShape } from './shapes/BaseShape.js';

// Shapes
export { Rectangle } from './shapes/Rectangle.js';
export { Circle } from './shapes/Circle.js';
export { Triangle } from './shapes/Triangle.js';

// Components
export { MeasurementSystem } from './components/MeasurementSystem.js';
export { Grid } from './components/Grid.js';
export { ThemeManager } from './components/ThemeManager.js';

// Convenience exports for common operations
export const Shapes = {
  Rectangle: import('./shapes/Rectangle.js').then(m => m.Rectangle),
  Circle: import('./shapes/Circle.js').then(m => m.Circle),
  Triangle: import('./shapes/Triangle.js').then(m => m.Triangle)
};

export const Themes = {
  EDUCATIONAL: 'educational',
  BLUEPRINT: 'blueprint',
  DARK: 'dark',
  MINIMAL: 'minimal',
  COLORFUL: 'colorful'
};

export const MeasurementTypes = {
  // Rectangle measurements
  WIDTH: 'width',
  HEIGHT: 'height',
  DIAGONAL: 'diagonal',
  AREA: 'area',
  PERIMETER: 'perimeter',
  
  // Circle measurements
  RADIUS: 'radius',
  DIAMETER: 'diameter',
  CIRCUMFERENCE: 'circumference',
  
  // Triangle measurements
  BASE: 'base',
  SIDE1: 'side1',
  SIDE2: 'side2',
  
  // Common measurements
  ANGLE: 'angle'
};

// Utility functions
export const Utils = {
  /**
   * Convert degrees to radians
   */
  degToRad: (degrees) => degrees * Math.PI / 180,
  
  /**
   * Convert radians to degrees
   */
  radToDeg: (radians) => radians * 180 / Math.PI,
  
  /**
   * Calculate distance between two points
   */
  distance: (x1, y1, x2, y2) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2),
  
  /**
   * Calculate angle between two points
   */
  angle: (x1, y1, x2, y2) => Math.atan2(y2 - y1, x2 - x1),
  
  /**
   * Snap value to grid
   */
  snapToGrid: (value, gridSize) => Math.round(value / gridSize) * gridSize,
  
  /**
   * Clamp value between min and max
   */
  clamp: (value, min, max) => Math.max(min, Math.min(max, value)),
  
  /**
   * Linear interpolation between two values
   */
  lerp: (a, b, t) => a + (b - a) * t,
  
  /**
   * Format number to specified decimal places
   */
  formatNumber: (value, decimals = 1) => Number(value.toFixed(decimals)),
  
  /**
   * Generate a random color
   */
  randomColor: () => `hsl(${Math.random() * 360}, 70%, 50%)`,
  
  /**
   * Calculate polygon area given vertices
   */
  polygonArea: (vertices) => {
    let area = 0;
    for (let i = 0; i < vertices.length; i++) {
      const j = (i + 1) % vertices.length;
      area += vertices[i].x * vertices[j].y;
      area -= vertices[j].x * vertices[i].y;
    }
    return Math.abs(area) / 2;
  }
};

export default GeometryRenderer;