import * as d3 from 'd3';
import { GeometryRenderer } from './GeometryRenderer.js';
import { Rectangle } from './shapes/Rectangle.js';
import { Triangle } from './shapes/Triangle.js';
import { Circle } from './shapes/Circle.js';
import { Polygon } from './shapes/Polygon.js';

/**
 * DiagramRenderer - Converts generator diagram configs into beautiful SVG diagrams
 */
export class DiagramRenderer {
  constructor() {
    this.themes = {
      educational: {
        backgroundColor: '#ffffff',
        primaryColor: '#3b82f6',
        secondaryColor: '#10b981',
        accentColor: '#f59e0b',
        strokeColor: '#374151',
        fillOpacity: 0.15,
        strokeWidth: 2,
        fontSize: 14,
        fontFamily: 'Inter, system-ui, sans-serif'
      },
      blueprint: {
        backgroundColor: '#1e3a8a',
        primaryColor: '#60a5fa',
        secondaryColor: '#34d399',
        accentColor: '#fbbf24',
        strokeColor: '#93c5fd',
        fillOpacity: 0.1,
        strokeWidth: 1.5,
        fontSize: 12,
        fontFamily: 'JetBrains Mono, monospace'
      },
      minimal: {
        backgroundColor: '#ffffff',
        primaryColor: '#6b7280',
        secondaryColor: '#9ca3af',
        accentColor: '#374151',
        strokeColor: '#d1d5db',
        fillOpacity: 0.05,
        strokeWidth: 1,
        fontSize: 13,
        fontFamily: 'Inter, system-ui, sans-serif'
      },
      colorful: {
        backgroundColor: '#fef3c7',
        primaryColor: '#dc2626',
        secondaryColor: '#059669',
        accentColor: '#7c3aed',
        strokeColor: '#374151',
        fillOpacity: 0.2,
        strokeWidth: 2.5,
        fontSize: 14,
        fontFamily: 'Inter, system-ui, sans-serif'
      }
    };
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
      ...this.themes[config.theme]
    });

    // Render based on shape type
    try {
      this.renderShape(renderer, diagramConfig);
      return renderer.exportSVG();
    } catch (error) {
      console.error('Error rendering diagram:', error);
      return this.createErrorSVG(config.width, config.height);
    }
  }

  /**
   * Render specific shapes based on diagram configuration
   */
  renderShape(renderer, diagramConfig) {
    const { shape, measurements = {}, unit = '', config = {} } = diagramConfig;
    const theme = this.themes[config.theme || 'educational'];

    switch (shape) {
      case 'rectangle':
        this.renderRectangle(renderer, measurements, unit, theme, config);
        break;
      case 'square':
        this.renderSquare(renderer, measurements, unit, theme, config);
        break;
      case 'triangle':
        this.renderTriangle(renderer, measurements, unit, theme, config);
        break;
      case 'circle':
        this.renderCircle(renderer, measurements, unit, theme, config);
        break;
      case 'coordinate-plane':
        this.renderCoordinatePlane(renderer, diagramConfig.data, theme, config);
        break;
      case 'angle':
        this.renderAngle(renderer, measurements, theme, config);
        break;
      case 'line-element':
        this.renderLineElement(renderer, diagramConfig.element, theme, config);
        break;
      case 'parallel-lines':
        this.renderParallelLines(renderer, diagramConfig.pairCount || 1, theme, config);
        break;
      case 'perpendicular-lines':
        this.renderPerpendicularLines(renderer, theme, config);
        break;
      case 'symmetry-figure':
        this.renderSymmetryFigure(renderer, diagramConfig.subject, theme, config);
        break;
      default:
        this.renderBasicShape(renderer, shape, measurements, unit, theme, config);
    }
  }

  renderRectangle(renderer, measurements, unit, theme, config) {
    const { length = 5, width = 3 } = measurements;
    
    // Calculate scale based on diagram dimensions with 20% padding
    const availableWidth = renderer.getContentWidth() * 0.8;
    const availableHeight = renderer.getContentHeight() * 0.8;
    const scale = Math.min(availableWidth / length, availableHeight / width, 80);
    
    // Calculate center position manually
    const centerX = renderer.getContentWidth() / 2;
    const centerY = renderer.getContentHeight() / 2;
    
    const rect = new Rectangle(length * scale, width * scale)
      .setPosition(centerX - (length * scale) / 2, centerY - (width * scale) / 2)
      .setStyle({
        fill: theme.primaryColor,
        fillOpacity: theme.fillOpacity,
        stroke: theme.strokeColor,
        strokeWidth: theme.strokeWidth
      });

    if (config.showMeasurements) {
      rect.addMeasurement('width', { label: `${width} ${unit}`, offset: 30 })
          .addMeasurement('height', { label: `${length} ${unit}`, offset: 30 });
    }

    renderer.add(rect);
  }

  renderSquare(renderer, measurements, unit, theme, config) {
    const { side = 4 } = measurements;
    
    // Calculate scale based on diagram dimensions with 20% padding
    const availableSize = Math.min(renderer.getContentWidth(), renderer.getContentHeight()) * 0.8;
    const scale = Math.min(availableSize / side, 80);
    
    // Calculate center position manually
    const centerX = renderer.getContentWidth() / 2;
    const centerY = renderer.getContentHeight() / 2;
    
    const square = new Rectangle(side * scale, side * scale)
      .setPosition(centerX - (side * scale) / 2, centerY - (side * scale) / 2)
      .setStyle({
        fill: theme.primaryColor,
        fillOpacity: theme.fillOpacity,
        stroke: theme.strokeColor,
        strokeWidth: theme.strokeWidth
      });

    if (config.showMeasurements) {
      square.addMeasurement('width', { label: `${side} ${unit}`, offset: 30 });
    }

    renderer.add(square);
  }

  renderTriangle(renderer, measurements, unit, theme, config) {
    const { base = 6, height = 4 } = measurements;
    
    // Calculate scale based on diagram dimensions with 20% padding
    const availableWidth = renderer.getContentWidth() * 0.8;
    const availableHeight = renderer.getContentHeight() * 0.8;
    const scale = Math.min(availableWidth / base, availableHeight / height, 80);
    
    // Calculate center position manually for triangle
    const centerX = renderer.getContentWidth() / 2;
    const centerY = renderer.getContentHeight() / 2;
    
    const triangle = new Triangle(base * scale, height * scale)
      .setPosition(centerX - (base * scale) / 2, centerY - (height * scale) / 2)
      .setStyle({
        fill: theme.secondaryColor,
        fillOpacity: theme.fillOpacity,
        stroke: theme.strokeColor,
        strokeWidth: theme.strokeWidth
      });

    if (config.showMeasurements) {
      triangle.addMeasurement('base', { label: `${base} ${unit}`, offset: 35 })
              .addMeasurement('height', { label: `${height} ${unit}`, offset: 35 });
    }

    renderer.add(triangle);
  }

  renderCircle(renderer, measurements, unit, theme, config) {
    const { radius = 3 } = measurements;
    
    // Calculate scale based on diagram dimensions with 20% padding
    // Circle diameter = radius * 2, so available space should accommodate diameter
    const availableSize = Math.min(renderer.getContentWidth(), renderer.getContentHeight()) * 0.8;
    const scale = Math.min(availableSize / (radius * 2), 80);
    
    // Calculate center position manually
    const centerX = renderer.getContentWidth() / 2;
    const centerY = renderer.getContentHeight() / 2;
    
    const circle = new Circle(radius * scale)
      .setPosition(centerX - (radius * scale), centerY - (radius * scale))
      .setStyle({
        fill: theme.accentColor,
        fillOpacity: theme.fillOpacity,
        stroke: theme.strokeColor,
        strokeWidth: theme.strokeWidth
      });

    if (config.showMeasurements) {
      circle.addMeasurement('radius', { label: `r = ${radius} ${unit}`, offset: 25 });
    }

    renderer.add(circle);
  }

  renderCoordinatePlane(renderer, data, theme, config) {
    const { point, pointLabel = 'P', coordinateRange = 10, allowNegatives = true, showGridNumbers = true, problemType } = data || {};
    
    // Calculate grid parameters
    const contentWidth = renderer.getContentWidth();
    const contentHeight = renderer.getContentHeight();
    const centerX = contentWidth / 2;
    const centerY = contentHeight / 2;
    
    // Calculate grid spacing based on coordinate range and available space
    const range = coordinateRange;
    const gridSpacing = Math.min(
      (contentWidth * 0.8) / (range * 2), 
      (contentHeight * 0.8) / (range * 2)
    );
    
    // Ensure minimum grid spacing for readability
    const finalGridSpacing = Math.max(gridSpacing, 15);
    
    const group = renderer.mainGroup.append('g').attr('class', 'coordinate-grid');
    
    // Draw grid lines aligned with coordinate system
    const minX = allowNegatives ? -range : 0;
    const maxX = range;
    const minY = allowNegatives ? -range : 0;
    const maxY = range;
    
    // Vertical grid lines (aligned with x-coordinates)
    for (let x = minX; x <= maxX; x++) {
      const screenX = centerX + (x * finalGridSpacing);
      if (screenX >= 0 && screenX <= contentWidth) {
        const isAxis = x === 0;
        group.append('line')
          .attr('x1', screenX)
          .attr('y1', 0)
          .attr('x2', screenX)
          .attr('y2', contentHeight)
          .attr('stroke', isAxis ? theme.strokeColor : theme.strokeColor)
          .attr('stroke-width', isAxis ? 2 : 0.5)
          .attr('opacity', isAxis ? 1 : 0.3)
          .attr('class', isAxis ? 'axis y-axis' : 'grid-line vertical');
      }
    }
    
    // Horizontal grid lines (aligned with y-coordinates)
    for (let y = minY; y <= maxY; y++) {
      const screenY = centerY - (y * finalGridSpacing); // Subtract because SVG y increases downward
      if (screenY >= 0 && screenY <= contentHeight) {
        const isAxis = y === 0;
        group.append('line')
          .attr('x1', 0)
          .attr('y1', screenY)
          .attr('x2', contentWidth)
          .attr('y2', screenY)
          .attr('stroke', isAxis ? theme.strokeColor : theme.strokeColor)
          .attr('stroke-width', isAxis ? 2 : 0.5)
          .attr('opacity', isAxis ? 1 : 0.3)
          .attr('class', isAxis ? 'axis x-axis' : 'grid-line horizontal');
      }
    }
    
    // Add coordinate labels if enabled
    if (showGridNumbers) {
      // X-axis labels
      for (let x = minX; x <= maxX; x++) {
        if (x === 0) continue; // Skip origin
        const screenX = centerX + (x * finalGridSpacing);
        if (screenX >= 20 && screenX <= contentWidth - 20) {
          group.append('text')
            .attr('x', screenX)
            .attr('y', centerY + 15)
            .attr('text-anchor', 'middle')
            .attr('font-family', theme.fontFamily)
            .attr('font-size', Math.max(10, theme.fontSize - 2))
            .attr('fill', theme.strokeColor)
            .attr('opacity', 0.8)
            .text(x);
        }
      }
      
      // Y-axis labels
      for (let y = minY; y <= maxY; y++) {
        if (y === 0) continue; // Skip origin
        const screenY = centerY - (y * finalGridSpacing);
        if (screenY >= 20 && screenY <= contentHeight - 20) {
          group.append('text')
            .attr('x', centerX - 15)
            .attr('y', screenY + 4)
            .attr('text-anchor', 'middle')
            .attr('font-family', theme.fontFamily)
            .attr('font-size', Math.max(10, theme.fontSize - 2))
            .attr('fill', theme.strokeColor)
            .attr('opacity', 0.8)
            .text(y);
        }
      }
      
      // Origin label
      group.append('text')
        .attr('x', centerX - 10)
        .attr('y', centerY + 15)
        .attr('text-anchor', 'middle')
        .attr('font-family', theme.fontFamily)
        .attr('font-size', Math.max(10, theme.fontSize - 2))
        .attr('fill', theme.strokeColor)
        .attr('opacity', 0.8)
        .text('0');
    }
    
    // Add axis arrows
    const arrowSize = 8;
    
    // X-axis arrow (right)
    group.append('path')
      .attr('d', `M ${contentWidth - 15} ${centerY} L ${contentWidth - 15 - arrowSize} ${centerY - arrowSize/2} L ${contentWidth - 15 - arrowSize} ${centerY + arrowSize/2} Z`)
      .attr('fill', theme.strokeColor)
      .attr('opacity', 0.7);
    
    // Y-axis arrow (up)
    group.append('path')
      .attr('d', `M ${centerX} 15 L ${centerX - arrowSize/2} ${15 + arrowSize} L ${centerX + arrowSize/2} ${15 + arrowSize} Z`)
      .attr('fill', theme.strokeColor)
      .attr('opacity', 0.7);
    
    // Add axis labels
    group.append('text')
      .attr('x', contentWidth - 25)
      .attr('y', centerY - 10)
      .attr('font-family', theme.fontFamily)
      .attr('font-size', theme.fontSize)
      .attr('font-weight', 'bold')
      .attr('fill', theme.strokeColor)
      .text('x');
      
    group.append('text')
      .attr('x', centerX + 10)
      .attr('y', 25)
      .attr('font-family', theme.fontFamily)
      .attr('font-size', theme.fontSize)
      .attr('font-weight', 'bold')
      .attr('fill', theme.strokeColor)
      .text('y');
    
    // Add point if provided (but NOT for plotting problems - that would give away the answer!)
    // Exception: plotting-answer problems should show the point for answer sheets
    if (point && (problemType !== 'plotting' || problemType === 'plotting-answer')) {
      const pointX = centerX + (point.x * finalGridSpacing);
      const pointY = centerY - (point.y * finalGridSpacing);
      
      // Only render point if it's within bounds
      if (pointX >= 0 && pointX <= contentWidth && pointY >= 0 && pointY <= contentHeight) {
        group.append('circle')
          .attr('cx', pointX)
          .attr('cy', pointY)
          .attr('r', 5)
          .attr('fill', theme.primaryColor)
          .attr('stroke', '#ffffff')
          .attr('stroke-width', 2)
          .attr('class', 'coordinate-point');
          
        group.append('text')
          .attr('x', pointX + 12)
          .attr('y', pointY - 8)
          .attr('font-family', theme.fontFamily)
          .attr('font-size', theme.fontSize)
          .attr('font-weight', 'bold')
          .attr('fill', theme.strokeColor)
          .attr('class', 'point-label')
          .text(pointLabel);
      }
    }
  }

  renderAngle(renderer, measurements, theme, config) {
    const { angle = 45 } = measurements;
    const centerX = renderer.getContentWidth() / 2;
    const centerY = renderer.getContentHeight() / 2;
    const radius = 80;
    
    const group = renderer.mainGroup.append('g').attr('class', 'angle-diagram');
    
    // Draw angle rays
    group.append('line')
      .attr('x1', centerX - radius).attr('y1', centerY)
      .attr('x2', centerX + radius).attr('y2', centerY)
      .attr('stroke', theme.strokeColor)
      .attr('stroke-width', theme.strokeWidth);
      
    const endX = centerX + radius * Math.cos(angle * Math.PI / 180);
    const endY = centerY - radius * Math.sin(angle * Math.PI / 180);
    
    group.append('line')
      .attr('x1', centerX).attr('y1', centerY)
      .attr('x2', endX).attr('y2', endY)
      .attr('stroke', theme.strokeColor)
      .attr('stroke-width', theme.strokeWidth);
    
    // Draw angle arc
    const arcRadius = 30;
    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(arcRadius)
      .startAngle(0)
      .endAngle(angle * Math.PI / 180);
    
    group.append('path')
      .attr('d', arc)
      .attr('transform', `translate(${centerX}, ${centerY}) scale(1, -1)`)
      .attr('fill', theme.accentColor)
      .attr('fill-opacity', theme.fillOpacity)
      .attr('stroke', theme.accentColor)
      .attr('stroke-width', 1);
    
    // Add angle measurement
    if (config.showMeasurements) {
      group.append('text')
        .attr('x', centerX + 40)
        .attr('y', centerY - 10)
        .attr('font-family', theme.fontFamily)
        .attr('font-size', theme.fontSize)
        .attr('font-weight', 'bold')
        .attr('fill', theme.accentColor)
        .text(`${angle}°`);
    }
  }

  renderBasicShape(renderer, shapeName, measurements, unit, theme, config) {
    // Calculate scale based on diagram dimensions with 20% padding
    const availableSize = Math.min(renderer.getContentWidth(), renderer.getContentHeight()) * 0.8;
    const baseRadius = availableSize / 3; // Use 1/3 of available space as radius
    
    // Use proper shape classes for better rendering
    let shape = null;
    
    switch (shapeName) {
      case 'pentagon':
        shape = Polygon.pentagon(baseRadius)
          .setStyle({
            fill: theme.primaryColor,
            fillOpacity: theme.fillOpacity,
            stroke: theme.strokeColor,
            strokeWidth: theme.strokeWidth
          });
        break;
      case 'hexagon':
        shape = Polygon.hexagon(baseRadius)
          .setStyle({
            fill: theme.primaryColor,
            fillOpacity: theme.fillOpacity,
            stroke: theme.strokeColor,
            strokeWidth: theme.strokeWidth
          });
        break;
      case 'octagon':
        shape = Polygon.octagon(baseRadius * 0.9) // Slightly smaller for octagon
          .setStyle({
            fill: theme.primaryColor,
            fillOpacity: theme.fillOpacity,
            stroke: theme.strokeColor,
            strokeWidth: theme.strokeWidth
          });
        break;
      default:
        // Draw a generic rectangle as fallback
        const rectSize = availableSize * 0.6;
        shape = new Rectangle(rectSize, rectSize * 0.75)
          .setStyle({
            fill: theme.primaryColor,
            fillOpacity: theme.fillOpacity,
            stroke: theme.strokeColor,
            strokeWidth: theme.strokeWidth
          });
    }
    
    if (shape) {
      // Calculate center position manually for polygons
      const centerX = renderer.getContentWidth() / 2;
      const centerY = renderer.getContentHeight() / 2;
      
      shape.setPosition(centerX - baseRadius, centerY - baseRadius);
      renderer.add(shape);
    }
  }

  drawPolygon(group, centerX, centerY, sides, radius, theme) {
    const points = [];
    for (let i = 0; i < sides; i++) {
      const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    
    group.append('polygon')
      .attr('points', points.join(' '))
      .attr('fill', theme.primaryColor)
      .attr('fill-opacity', theme.fillOpacity)
      .attr('stroke', theme.strokeColor)
      .attr('stroke-width', theme.strokeWidth);
  }

  createErrorSVG(width, height) {
    return `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        <rect width="100%" height="100%" fill="#f3f4f6" stroke="#d1d5db"/>
        <text x="50%" y="50%" text-anchor="middle" dy="0.3em" 
              font-family="Inter, sans-serif" font-size="14" fill="#6b7280">
          Diagram Error
        </text>
      </svg>
    `;
  }
}

export default DiagramRenderer;