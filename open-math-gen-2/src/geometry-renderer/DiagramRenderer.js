import * as d3 from 'd3';
import { GeometryRenderer } from './GeometryRenderer.js';
import { DiagramThemes } from './themes/DiagramThemes.js';
import { toPlainObject, createErrorSVG } from './utils/DiagramUtils.js';
import { BasicShapeRenderer } from './renderers/BasicShapeRenderer.js';
import { AdvancedGeometryRenderer } from './renderers/AdvancedGeometryRenderer.js';
import { ThreeDRenderer } from './renderers/ThreeDRenderer.js';
import { CoordinateRenderer } from './renderers/CoordinateRenderer.js';

/**
 * DiagramRenderer - Main entry point for converting generator diagram configs into SVG diagrams
 * Delegates to specialized renderers based on shape type
 */
export class DiagramRenderer {
  constructor() {
    // Initialize specialized renderers
    this.basicShapeRenderer = new BasicShapeRenderer();
    this.advancedGeometryRenderer = new AdvancedGeometryRenderer();
    this.threeDRenderer = new ThreeDRenderer();
    this.coordinateRenderer = new CoordinateRenderer();
  }

  /**
   * Render a diagram from a generator's diagram configuration
   * @param {Object} diagramConfig - Configuration from generator
   * @param {HTMLElement} container - DOM element to render into
   * @returns {string} SVG string
   */
  renderDiagram(diagramConfig, container) {
    if (!diagramConfig || diagramConfig.type !== 'geometry-renderer') {
      return '';
    }

    const config = {
      width: diagramConfig.config?.width || 300,
      height: diagramConfig.config?.height || 200,
      theme: diagramConfig.config?.theme || 'educational',
      showGrid: diagramConfig.config?.showGrid || false,
      center: diagramConfig.config?.center !== false,
      ...diagramConfig.config
    };

    // Create a temporary container if none provided
    const tempContainer = container || document.createElement('div');
    
    // Initialize renderer
    const renderer = new GeometryRenderer(tempContainer, {
      ...config,
      ...DiagramThemes[config.theme]
    });

    // Render based on shape type
    try {
      this.renderShape(renderer, diagramConfig);
      return renderer.exportSVG();
    } catch (error) {
      console.error('Error rendering diagram:', error);
      return createErrorSVG(config.width, config.height);
    }
  }

  /**
   * Route rendering to appropriate specialized renderer
   * @param {Object} renderer - GeometryRenderer instance
   * @param {Object} diagramConfig - Diagram configuration
   */
  renderShape(renderer, diagramConfig) {
    // Convert Vue reactive proxy to plain object to avoid proxy issues
    const plainConfig = toPlainObject(diagramConfig);
    const { shape, measurements = {}, unit = '', config = {} } = plainConfig;
    const theme = DiagramThemes[config.theme || 'educational'];

    // Route to appropriate specialized renderer
    if (this._isBasicShape(shape)) {
      this.basicShapeRenderer.render(renderer, shape, measurements, unit, theme, config);
    } else if (this._isAdvancedGeometry(shape)) {
      this.advancedGeometryRenderer.render(renderer, shape, plainConfig, theme, config);
    } else if (this._is3DShape(shape)) {
      this.threeDRenderer.render(renderer, shape, measurements, unit, theme, config);
    } else if (this._isCoordinateGeometry(shape)) {
      this.coordinateRenderer.render(renderer, shape, plainConfig, theme, config);
    } else {
      console.warn(`Unknown shape type: ${shape}`);
    }
  }

  /**
   * Check if shape is a basic 2D shape
   * @private
   */
  _isBasicShape(shape) {
    return ['rectangle', 'square', 'triangle', 'circle', 'parallelogram', 'trapezoid'].includes(shape);
  }

  /**
   * Check if shape is advanced geometry
   * @private
   */
  _isAdvancedGeometry(shape) {
    return [
      'arc', 'sector', 'inscribed-square', 'circumscribed-circle', 'tangent',
      'angle', 'line-element', 'parallel-lines', 'perpendicular-lines',
      'symmetry-figure', 'reflection', 'completion', 'symmetry-drawing',
      'line-figure', 'intersecting-lines', 'rays-figure', 'line-segment',
      'properties-figure', 'comparison'
    ].includes(shape);
  }

  /**
   * Check if shape is a 3D shape
   * @private
   */
  _is3DShape(shape) {
    return [
      'rectangularPrism', 'cube', 'cylinder', 'cone', 'sphere',
      'triangularPrism', 'pyramid', 'composite', 'right-triangle'
    ].includes(shape);
  }

  /**
   * Check if shape is coordinate geometry
   * @private
   */
  _isCoordinateGeometry(shape) {
    return ['coordinate-plane', 'distance-points'].includes(shape);
  }

}

export default DiagramRenderer;
