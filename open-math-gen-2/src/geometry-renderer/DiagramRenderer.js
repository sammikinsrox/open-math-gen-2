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
      case 'parallelogram':
        this.renderParallelogram(renderer, measurements, unit, theme, config);
        break;
      case 'trapezoid':
        this.renderTrapezoid(renderer, measurements, unit, theme, config);
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
      case 'reflection':
        this.renderReflection(renderer, diagramConfig, theme, config);
        break;
      case 'completion':
        this.renderCompletion(renderer, diagramConfig, theme, config);
        break;
      case 'symmetry-drawing':
        this.renderSymmetryDrawing(renderer, diagramConfig, theme, config);
        break;
      case 'line-figure':
        this.renderLineFigure(renderer, diagramConfig, theme, config);
        break;
      case 'intersecting-lines':
        this.renderIntersectingLines(renderer, diagramConfig, theme, config);
        break;
      case 'rays-figure':
        this.renderRaysFigure(renderer, diagramConfig, theme, config);
        break;
      case 'line-segment':
        this.renderLineSegment(renderer, diagramConfig, theme, config);
        break;
      case 'properties-figure':
        this.renderPropertiesFigure(renderer, diagramConfig, theme, config);
        break;
      case 'comparison':
        this.renderComparison(renderer, diagramConfig, theme, config);
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

  renderParallelogram(renderer, measurements, unit, theme, config) {
    const { base = 6, height = 4 } = measurements;
    
    // Calculate scale based on diagram dimensions with 20% padding
    const availableWidth = renderer.getContentWidth() * 0.8;
    const availableHeight = renderer.getContentHeight() * 0.8;
    const scale = Math.min(availableWidth / base, availableHeight / height, 80);
    
    // Calculate center position manually
    const centerX = renderer.getContentWidth() / 2;
    const centerY = renderer.getContentHeight() / 2;
    
    // Create parallelogram using polygon points
    // Skew angle for parallelogram effect (30 degrees)
    const skewOffset = (height * scale) * 0.4; // 40% of height for skew
    const scaledBase = base * scale;
    const scaledHeight = height * scale;
    
    const points = [
      { x: 0, y: scaledHeight },                    // Bottom left
      { x: scaledBase, y: scaledHeight },           // Bottom right  
      { x: scaledBase + skewOffset, y: 0 },         // Top right (skewed)
      { x: skewOffset, y: 0 }                       // Top left (skewed)
    ];
    
    const group = renderer.mainGroup.append('g').attr('class', 'parallelogram-shape');
    
    const parallelogram = group.append('polygon')
      .attr('points', points.map(p => `${p.x},${p.y}`).join(' '))
      .attr('transform', `translate(${centerX - scaledBase/2 - skewOffset/2}, ${centerY - scaledHeight/2})`)
      .attr('fill', theme.primaryColor)
      .attr('fill-opacity', theme.fillOpacity)
      .attr('stroke', theme.strokeColor)
      .attr('stroke-width', theme.strokeWidth)
      .attr('class', 'shape parallelogram');
    
    // Add measurements if enabled
    if (config.showMeasurements) {
      const baseY = centerY + scaledHeight/2 + 30;
      const heightX = centerX + scaledBase/2 + 40;
      
      // Base measurement
      group.append('line')
        .attr('x1', centerX - scaledBase/2)
        .attr('y1', baseY)
        .attr('x2', centerX + scaledBase/2)
        .attr('y2', baseY)
        .attr('stroke', theme.strokeColor)
        .attr('stroke-width', 1);
      
      group.append('text')
        .attr('x', centerX)
        .attr('y', baseY + 15)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .attr('fill', theme.strokeColor)
        .text(`${base} ${unit}`);
      
      // Height measurement  
      group.append('line')
        .attr('x1', heightX)
        .attr('y1', centerY - scaledHeight/2)
        .attr('x2', heightX)
        .attr('y2', centerY + scaledHeight/2)
        .attr('stroke', theme.strokeColor)
        .attr('stroke-width', 1);
      
      group.append('text')
        .attr('x', heightX + 15)
        .attr('y', centerY)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .attr('fill', theme.strokeColor)
        .attr('transform', `rotate(90, ${heightX + 15}, ${centerY})`)
        .text(`${height} ${unit}`);
    }
  }

  renderTrapezoid(renderer, measurements, unit, theme, config) {
    const { base1 = 8, base2 = 4, height = 5 } = measurements;
    
    // Calculate scale based on diagram dimensions with 20% padding
    const maxBase = Math.max(base1, base2);
    const availableWidth = renderer.getContentWidth() * 0.8;
    const availableHeight = renderer.getContentHeight() * 0.8;
    const scale = Math.min(availableWidth / maxBase, availableHeight / height, 80);
    
    // Calculate center position manually
    const centerX = renderer.getContentWidth() / 2;
    const centerY = renderer.getContentHeight() / 2;
    
    // Create trapezoid points (base1 is bottom, base2 is top)
    const scaledBase1 = base1 * scale;
    const scaledBase2 = base2 * scale;
    const scaledHeight = height * scale;
    
    const points = [
      { x: 0, y: scaledHeight },                           // Bottom left
      { x: scaledBase1, y: scaledHeight },                 // Bottom right
      { x: (scaledBase1 - scaledBase2)/2 + scaledBase2, y: 0 }, // Top right
      { x: (scaledBase1 - scaledBase2)/2, y: 0 }           // Top left
    ];
    
    const group = renderer.mainGroup.append('g').attr('class', 'trapezoid-shape');
    
    const trapezoid = group.append('polygon')
      .attr('points', points.map(p => `${p.x},${p.y}`).join(' '))
      .attr('transform', `translate(${centerX - scaledBase1/2}, ${centerY - scaledHeight/2})`)
      .attr('fill', theme.secondaryColor)
      .attr('fill-opacity', theme.fillOpacity)
      .attr('stroke', theme.strokeColor)
      .attr('stroke-width', theme.strokeWidth)
      .attr('class', 'shape trapezoid');
    
    // Add measurements if enabled
    if (config.showMeasurements) {
      const bottomY = centerY + scaledHeight/2 + 30;
      const topY = centerY - scaledHeight/2 - 15;
      const heightX = centerX + scaledBase1/2 + 40;
      
      // Base1 (bottom) measurement
      group.append('line')
        .attr('x1', centerX - scaledBase1/2)
        .attr('y1', bottomY)
        .attr('x2', centerX + scaledBase1/2)
        .attr('y2', bottomY)
        .attr('stroke', theme.strokeColor)
        .attr('stroke-width', 1);
      
      group.append('text')
        .attr('x', centerX)
        .attr('y', bottomY + 15)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .attr('fill', theme.strokeColor)
        .text(`${base1} ${unit}`);
      
      // Base2 (top) measurement
      group.append('line')
        .attr('x1', centerX - scaledBase2/2)
        .attr('y1', topY)
        .attr('x2', centerX + scaledBase2/2)
        .attr('y2', topY)
        .attr('stroke', theme.strokeColor)
        .attr('stroke-width', 1);
      
      group.append('text')
        .attr('x', centerX)
        .attr('y', topY - 5)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .attr('fill', theme.strokeColor)
        .text(`${base2} ${unit}`);
      
      // Height measurement
      group.append('line')
        .attr('x1', heightX)
        .attr('y1', centerY - scaledHeight/2)
        .attr('x2', heightX)
        .attr('y2', centerY + scaledHeight/2)
        .attr('stroke', theme.strokeColor)
        .attr('stroke-width', 1);
      
      group.append('text')
        .attr('x', heightX + 15)
        .attr('y', centerY)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .attr('fill', theme.strokeColor)
        .attr('transform', `rotate(90, ${heightX + 15}, ${centerY})`)
        .text(`${height} ${unit}`);
    }
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
    
    // Draw angle arc (angle marks) if enabled
    if (config.showAngleMarks) {
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
    }
    
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

  renderLineFigure(renderer, diagramConfig, theme, config) {
    const { countType, elementCount, intersectionCount } = diagramConfig;
    const centerX = renderer.getContentWidth() / 2;
    const centerY = renderer.getContentHeight() / 2;
    
    const group = renderer.mainGroup.append('g').attr('class', 'line-figure');
    
    // Create a simple intersecting lines figure for counting
    const radius = 80;
    for (let i = 0; i < elementCount; i++) {
      const angle = (i * Math.PI * 2) / elementCount;
      const x1 = centerX + radius * Math.cos(angle);
      const y1 = centerY + radius * Math.sin(angle);
      const x2 = centerX - radius * Math.cos(angle);
      const y2 = centerY - radius * Math.sin(angle);
      
      group.append('line')
        .attr('x1', x1).attr('y1', y1)
        .attr('x2', x2).attr('y2', y2)
        .attr('stroke', theme.strokeColor)
        .attr('stroke-width', theme.strokeWidth);
    }
  }
  
  renderIntersectingLines(renderer, diagramConfig, theme, config) {
    const { lineCount, intersectionPoints } = diagramConfig;
    const centerX = renderer.getContentWidth() / 2;
    const centerY = renderer.getContentHeight() / 2;
    
    const group = renderer.mainGroup.append('g').attr('class', 'intersecting-lines');
    
    // Draw intersecting lines
    const radius = 100;
    for (let i = 0; i < lineCount; i++) {
      const angle = (i * Math.PI) / lineCount;
      const x1 = centerX + radius * Math.cos(angle);
      const y1 = centerY + radius * Math.sin(angle);
      const x2 = centerX - radius * Math.cos(angle);
      const y2 = centerY - radius * Math.sin(angle);
      
      group.append('line')
        .attr('x1', x1).attr('y1', y1)
        .attr('x2', x2).attr('y2', y2)
        .attr('stroke', theme.strokeColor)
        .attr('stroke-width', theme.strokeWidth);
    }
    
    // Highlight intersection points if enabled
    if (config.highlightIntersections) {
      group.append('circle')
        .attr('cx', centerX)
        .attr('cy', centerY)
        .attr('r', 4)
        .attr('fill', theme.accentColor)
        .attr('stroke', '#ffffff')
        .attr('stroke-width', 2);
    }
  }
  
  renderRaysFigure(renderer, diagramConfig, theme, config) {
    const { rayCount } = diagramConfig;
    const centerX = renderer.getContentWidth() / 2;
    const centerY = renderer.getContentHeight() / 2;
    
    const group = renderer.mainGroup.append('g').attr('class', 'rays-figure');
    
    // Draw rays emanating from center
    const radius = 120;
    for (let i = 0; i < rayCount; i++) {
      const angle = (i * Math.PI * 2) / rayCount;
      const endX = centerX + radius * Math.cos(angle);
      const endY = centerY + radius * Math.sin(angle);
      
      // Draw ray line
      group.append('line')
        .attr('x1', centerX).attr('y1', centerY)
        .attr('x2', endX).attr('y2', endY)
        .attr('stroke', theme.strokeColor)
        .attr('stroke-width', theme.strokeWidth);
      
      // Add arrow if enabled
      if (config.showArrows) {
        const arrowSize = 8;
        const arrowAngle = angle;
        const arrowX = endX - arrowSize * Math.cos(arrowAngle - 0.3);
        const arrowY = endY - arrowSize * Math.sin(arrowAngle - 0.3);
        const arrowX2 = endX - arrowSize * Math.cos(arrowAngle + 0.3);
        const arrowY2 = endY - arrowSize * Math.sin(arrowAngle + 0.3);
        
        group.append('polygon')
          .attr('points', `${endX},${endY} ${arrowX},${arrowY} ${arrowX2},${arrowY2}`)
          .attr('fill', theme.strokeColor);
      }
    }
    
    // Draw starting point
    group.append('circle')
      .attr('cx', centerX)
      .attr('cy', centerY)
      .attr('r', 3)
      .attr('fill', theme.strokeColor);
  }
  
  renderLineSegment(renderer, diagramConfig, theme, config) {
    const { measurements, unit } = diagramConfig;
    const { length } = measurements;
    const centerX = renderer.getContentWidth() / 2;
    const centerY = renderer.getContentHeight() / 2;
    
    const group = renderer.mainGroup.append('g').attr('class', 'line-segment');
    
    // Scale the line segment to fit nicely in the diagram
    const scale = Math.min(200 / length, 10); // Max 200px or 10px per unit
    const segmentLength = length * scale;
    
    // Draw line segment
    const x1 = centerX - segmentLength / 2;
    const x2 = centerX + segmentLength / 2;
    
    group.append('line')
      .attr('x1', x1).attr('y1', centerY)
      .attr('x2', x2).attr('y2', centerY)
      .attr('stroke', theme.strokeColor)
      .attr('stroke-width', theme.strokeWidth);
    
    // Add endpoints
    group.append('circle')
      .attr('cx', x1).attr('cy', centerY)
      .attr('r', 3)
      .attr('fill', theme.strokeColor);
      
    group.append('circle')
      .attr('cx', x2).attr('cy', centerY)
      .attr('r', 3)
      .attr('fill', theme.strokeColor);
    
    // Add measurement if enabled
    if (config.showMeasurements) {
      group.append('text')
        .attr('x', centerX)
        .attr('y', centerY - 20)
        .attr('text-anchor', 'middle')
        .attr('font-family', theme.fontFamily)
        .attr('font-size', theme.fontSize)
        .attr('font-weight', 'bold')
        .attr('fill', theme.strokeColor)
        .text(`${length} ${unit}`);
    }
    
    // Add ruler marks if enabled
    if (config.showRuler) {
      for (let i = 0; i <= length; i++) {
        const markX = x1 + (i * segmentLength) / length;
        group.append('line')
          .attr('x1', markX).attr('y1', centerY + 10)
          .attr('x2', markX).attr('y2', centerY + 15)
          .attr('stroke', theme.strokeColor)
          .attr('stroke-width', 1);
        
        group.append('text')
          .attr('x', markX)
          .attr('y', centerY + 30)
          .attr('text-anchor', 'middle')
          .attr('font-size', '10px')
          .attr('fill', theme.strokeColor)
          .text(i);
      }
    }
  }
  
  renderLineElement(renderer, element, theme, config) {
    const centerX = renderer.getContentWidth() / 2;
    const centerY = renderer.getContentHeight() / 2;
    const group = renderer.mainGroup.append('g').attr('class', 'line-element');
    
    const length = 150;
    
    switch (element) {
      case 'line':
        // Draw line extending beyond visible area
        group.append('line')
          .attr('x1', 0).attr('y1', centerY)
          .attr('x2', renderer.getContentWidth()).attr('y2', centerY)
          .attr('stroke', theme.strokeColor)
          .attr('stroke-width', theme.strokeWidth);
        
        // Add arrows to indicate infinite extension
        const arrowSize = 8;
        group.append('polygon')
          .attr('points', `10,${centerY} ${10 + arrowSize},${centerY - arrowSize/2} ${10 + arrowSize},${centerY + arrowSize/2}`)
          .attr('fill', theme.strokeColor);
        group.append('polygon')
          .attr('points', `${renderer.getContentWidth() - 10},${centerY} ${renderer.getContentWidth() - 10 - arrowSize},${centerY - arrowSize/2} ${renderer.getContentWidth() - 10 - arrowSize},${centerY + arrowSize/2}`)
          .attr('fill', theme.strokeColor);
        break;
        
      case 'line segment':
        // Draw line segment with endpoints
        const x1 = centerX - length / 2;
        const x2 = centerX + length / 2;
        
        group.append('line')
          .attr('x1', x1).attr('y1', centerY)
          .attr('x2', x2).attr('y2', centerY)
          .attr('stroke', theme.strokeColor)
          .attr('stroke-width', theme.strokeWidth);
        
        // Add endpoint circles
        group.append('circle')
          .attr('cx', x1).attr('cy', centerY)
          .attr('r', 4)
          .attr('fill', theme.strokeColor);
        group.append('circle')
          .attr('cx', x2).attr('cy', centerY)
          .attr('r', 4)
          .attr('fill', theme.strokeColor);
        break;
        
      case 'ray':
        // Draw ray with one endpoint and arrow
        const rayStart = centerX - length / 2;
        const rayEnd = centerX + length / 2;
        
        group.append('line')
          .attr('x1', rayStart).attr('y1', centerY)
          .attr('x2', rayEnd).attr('y2', centerY)
          .attr('stroke', theme.strokeColor)
          .attr('stroke-width', theme.strokeWidth);
        
        // Add starting point
        group.append('circle')
          .attr('cx', rayStart).attr('cy', centerY)
          .attr('r', 4)
          .attr('fill', theme.strokeColor);
        
        // Add arrow at end
        group.append('polygon')
          .attr('points', `${rayEnd},${centerY} ${rayEnd - arrowSize},${centerY - arrowSize/2} ${rayEnd - arrowSize},${centerY + arrowSize/2}`)
          .attr('fill', theme.strokeColor);
        break;
    }
  }
  
  renderParallelLines(renderer, pairCount, theme, config) {
    const centerX = renderer.getContentWidth() / 2;
    const centerY = renderer.getContentHeight() / 2;
    const group = renderer.mainGroup.append('g').attr('class', 'parallel-lines');
    
    const lineLength = 200;
    const availableHeight = renderer.getContentHeight() * 0.8; // 80% of height for content
    
    // Calculate spacing dynamically to fit all pairs
    const totalLinesNeeded = pairCount * 2;
    const spacing = Math.min(60, availableHeight / (totalLinesNeeded + 1));
    
    const startY = centerY - ((pairCount * 2 - 1) * spacing) / 2;
    
    // Draw parallel line pairs
    for (let i = 0; i < pairCount; i++) {
      const y1 = startY + i * spacing * 2;
      const y2 = y1 + spacing;
      
      // First line of the pair
      group.append('line')
        .attr('x1', centerX - lineLength / 2).attr('y1', y1)
        .attr('x2', centerX + lineLength / 2).attr('y2', y1)
        .attr('stroke', theme.primaryColor)
        .attr('stroke-width', theme.strokeWidth);
      
      // Second line of the pair
      group.append('line')
        .attr('x1', centerX - lineLength / 2).attr('y1', y2)
        .attr('x2', centerX + lineLength / 2).attr('y2', y2)
        .attr('stroke', theme.secondaryColor)
        .attr('stroke-width', theme.strokeWidth);
      
      // Add parallel marks if enabled
      if (config.showParallelMarks) {
        const markSize = 8;
        const markX = centerX + lineLength / 4;
        
        // Marks on first line
        group.append('line')
          .attr('x1', markX - markSize).attr('y1', y1 - markSize)
          .attr('x2', markX + markSize).attr('y2', y1 + markSize)
          .attr('stroke', theme.strokeColor)
          .attr('stroke-width', 2);
        
        // Marks on second line
        group.append('line')
          .attr('x1', markX - markSize).attr('y1', y2 - markSize)
          .attr('x2', markX + markSize).attr('y2', y2 + markSize)
          .attr('stroke', theme.strokeColor)
          .attr('stroke-width', 2);
      }
      
      // Add labels if enabled
      if (config.showLabels) {
        // Position labels at the left end of each line, but within diagram bounds
        const labelX = Math.max(15, centerX - lineLength / 2 - 15);
        
        group.append('text')
          .attr('x', labelX)
          .attr('y', y1 + 5)
          .attr('font-family', theme.fontFamily)
          .attr('font-size', theme.fontSize)
          .attr('font-weight', 'bold')
          .attr('fill', theme.strokeColor)
          .text(String.fromCharCode(65 + i * 2)); // A, C, E...
        
        group.append('text')
          .attr('x', labelX)
          .attr('y', y2 + 5)
          .attr('font-family', theme.fontFamily)
          .attr('font-size', theme.fontSize)
          .attr('font-weight', 'bold')
          .attr('fill', theme.strokeColor)
          .text(String.fromCharCode(66 + i * 2)); // B, D, F...
      }
    }
  }
  
  renderPerpendicularLines(renderer, theme, config) {
    const centerX = renderer.getContentWidth() / 2;
    const centerY = renderer.getContentHeight() / 2;
    const group = renderer.mainGroup.append('g').attr('class', 'perpendicular-lines');
    
    const lineLength = 160;
    
    // Draw horizontal line
    group.append('line')
      .attr('x1', centerX - lineLength / 2).attr('y1', centerY)
      .attr('x2', centerX + lineLength / 2).attr('y2', centerY)
      .attr('stroke', theme.primaryColor)
      .attr('stroke-width', theme.strokeWidth);
    
    // Draw vertical line
    group.append('line')
      .attr('x1', centerX).attr('y1', centerY - lineLength / 2)
      .attr('x2', centerX).attr('y2', centerY + lineLength / 2)
      .attr('stroke', theme.secondaryColor)
      .attr('stroke-width', theme.strokeWidth);
    
    // Add right angle mark if enabled
    if (config.showRightAngleMarks) {
      const markSize = 15;
      group.append('path')
        .attr('d', `M ${centerX - markSize} ${centerY} L ${centerX - markSize} ${centerY - markSize} L ${centerX} ${centerY - markSize}`)
        .attr('fill', 'none')
        .attr('stroke', theme.accentColor)
        .attr('stroke-width', 2);
    }
    
    // Add labels if enabled
    if (config.showLabels) {
      group.append('text')
        .attr('x', centerX - lineLength / 2 - 15)
        .attr('y', centerY + 5)
        .attr('font-family', theme.fontFamily)
        .attr('font-size', theme.fontSize)
        .attr('fill', theme.strokeColor)
        .text('E');
      
      group.append('text')
        .attr('x', centerX + lineLength / 2 + 10)
        .attr('y', centerY + 5)
        .attr('font-family', theme.fontFamily)
        .attr('font-size', theme.fontSize)
        .attr('fill', theme.strokeColor)
        .text('F');
      
      group.append('text')
        .attr('x', centerX + 5)
        .attr('y', centerY - lineLength / 2 - 5)
        .attr('font-family', theme.fontFamily)
        .attr('font-size', theme.fontSize)
        .attr('fill', theme.strokeColor)
        .text('G');
      
      group.append('text')
        .attr('x', centerX + 5)
        .attr('y', centerY + lineLength / 2 + 15)
        .attr('font-family', theme.fontFamily)
        .attr('font-size', theme.fontSize)
        .attr('fill', theme.strokeColor)
        .text('H');
    }
  }
  
  renderSymmetryFigure(renderer, subject, theme, config) {
    const centerX = renderer.getContentWidth() / 2;
    const centerY = renderer.getContentHeight() / 2;
    const group = renderer.mainGroup.append('g').attr('class', 'symmetry-figure');
    
    // Handle different subject types
    if (subject.type === 'shape') {
      this.renderSymmetryShape(group, subject.name, centerX, centerY, theme, config);
    } else if (subject.type === 'letter') {
      this.renderSymmetryLetter(group, subject.name, centerX, centerY, theme, config);
    } else if (subject.type === 'pattern') {
      this.renderSymmetryPattern(group, subject.name, centerX, centerY, theme, config);
    } else {
      // Fallback for simple string subjects
      this.renderSymmetryShape(group, subject, centerX, centerY, theme, config);
    }
    
    // Add lines of symmetry if enabled
    if (config.showSymmetryLines) {
      this.addSymmetryLines(group, subject, centerX, centerY, theme);
    }
  }
  
  renderSymmetryShape(group, shapeName, centerX, centerY, theme, config) {
    switch (shapeName) {
      case 'square':
        const squareSize = 80;
        group.append('rect')
          .attr('x', centerX - squareSize/2)
          .attr('y', centerY - squareSize/2)
          .attr('width', squareSize)
          .attr('height', squareSize)
          .attr('fill', theme.primaryColor)
          .attr('fill-opacity', theme.fillOpacity)
          .attr('stroke', theme.strokeColor)
          .attr('stroke-width', theme.strokeWidth);
        break;
        
      case 'rectangle':
        const rectWidth = 100;
        const rectHeight = 60;
        group.append('rect')
          .attr('x', centerX - rectWidth/2)
          .attr('y', centerY - rectHeight/2)
          .attr('width', rectWidth)
          .attr('height', rectHeight)
          .attr('fill', theme.primaryColor)
          .attr('fill-opacity', theme.fillOpacity)
          .attr('stroke', theme.strokeColor)
          .attr('stroke-width', theme.strokeWidth);
        break;
        
      case 'triangle':
        const triangleSize = 80;
        const height = triangleSize * Math.sqrt(3) / 2;
        const points = [
          `${centerX},${centerY - height * 2/3}`,
          `${centerX - triangleSize/2},${centerY + height/3}`,
          `${centerX + triangleSize/2},${centerY + height/3}`
        ].join(' ');
        group.append('polygon')
          .attr('points', points)
          .attr('fill', theme.primaryColor)
          .attr('fill-opacity', theme.fillOpacity)
          .attr('stroke', theme.strokeColor)
          .attr('stroke-width', theme.strokeWidth);
        break;
        
      case 'circle':
        const radius = 50;
        group.append('circle')
          .attr('cx', centerX)
          .attr('cy', centerY)
          .attr('r', radius)
          .attr('fill', theme.primaryColor)
          .attr('fill-opacity', theme.fillOpacity)
          .attr('stroke', theme.strokeColor)
          .attr('stroke-width', theme.strokeWidth);
        break;
        
      case 'hexagon':
        this.drawPolygon(group, centerX, centerY, 6, 50, theme);
        break;
        
      case 'pentagon':
        this.drawPolygon(group, centerX, centerY, 5, 50, theme);
        break;
        
      case 'diamond':
        const diamondSize = 60;
        const diamondPoints = [
          `${centerX},${centerY - diamondSize}`,
          `${centerX + diamondSize},${centerY}`,
          `${centerX},${centerY + diamondSize}`,
          `${centerX - diamondSize},${centerY}`
        ].join(' ');
        group.append('polygon')
          .attr('points', diamondPoints)
          .attr('fill', theme.primaryColor)
          .attr('fill-opacity', theme.fillOpacity)
          .attr('stroke', theme.strokeColor)
          .attr('stroke-width', theme.strokeWidth);
        break;
        
      default:
        // Default square
        const defaultSize = 60;
        group.append('rect')
          .attr('x', centerX - defaultSize/2)
          .attr('y', centerY - defaultSize/2)
          .attr('width', defaultSize)
          .attr('height', defaultSize)
          .attr('fill', theme.primaryColor)
          .attr('fill-opacity', theme.fillOpacity)
          .attr('stroke', theme.strokeColor)
          .attr('stroke-width', theme.strokeWidth);
    }
  }
  
  renderSymmetryLetter(group, letter, centerX, centerY, theme, config) {
    // Render letters as text
    group.append('text')
      .attr('x', centerX)
      .attr('y', centerY)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('font-family', 'Arial, sans-serif')
      .attr('font-size', '80px')
      .attr('font-weight', 'bold')
      .attr('fill', theme.primaryColor)
      .attr('stroke', theme.strokeColor)
      .attr('stroke-width', 2)
      .text(letter);
  }
  
  renderSymmetryPattern(group, pattern, centerX, centerY, theme, config) {
    switch (pattern) {
      case 'star':
        this.drawStar(group, centerX, centerY, 5, 30, 60, theme);
        break;
      case 'flower':
        this.drawFlower(group, centerX, centerY, 8, 40, theme);
        break;
      case 'snowflake':
        this.drawSnowflake(group, centerX, centerY, 50, theme);
        break;
      default:
        this.drawStar(group, centerX, centerY, 5, 30, 60, theme);
    }
  }
  
  drawStar(group, centerX, centerY, points, innerRadius, outerRadius, theme) {
    const starPoints = [];
    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / points - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      starPoints.push(`${x},${y}`);
    }
    
    group.append('polygon')
      .attr('points', starPoints.join(' '))
      .attr('fill', theme.primaryColor)
      .attr('fill-opacity', theme.fillOpacity)
      .attr('stroke', theme.strokeColor)
      .attr('stroke-width', theme.strokeWidth);
  }
  
  drawFlower(group, centerX, centerY, petals, radius, theme) {
    for (let i = 0; i < petals; i++) {
      const angle = (i * 2 * Math.PI) / petals;
      const petalX = centerX + radius * 0.7 * Math.cos(angle);
      const petalY = centerY + radius * 0.7 * Math.sin(angle);
      
      group.append('circle')
        .attr('cx', petalX)
        .attr('cy', petalY)
        .attr('r', radius / 3)
        .attr('fill', theme.primaryColor)
        .attr('fill-opacity', theme.fillOpacity)
        .attr('stroke', theme.strokeColor)
        .attr('stroke-width', theme.strokeWidth);
    }
    
    // Center circle
    group.append('circle')
      .attr('cx', centerX)
      .attr('cy', centerY)
      .attr('r', radius / 4)
      .attr('fill', theme.accentColor)
      .attr('stroke', theme.strokeColor)
      .attr('stroke-width', theme.strokeWidth);
  }
  
  drawSnowflake(group, centerX, centerY, size, theme) {
    const branches = 6;
    for (let i = 0; i < branches; i++) {
      const angle = (i * Math.PI) / 3;
      const endX = centerX + size * Math.cos(angle);
      const endY = centerY + size * Math.sin(angle);
      
      // Main branch
      group.append('line')
        .attr('x1', centerX).attr('y1', centerY)
        .attr('x2', endX).attr('y2', endY)
        .attr('stroke', theme.primaryColor)
        .attr('stroke-width', 3);
      
      // Side branches
      const midX = centerX + size * 0.7 * Math.cos(angle);
      const midY = centerY + size * 0.7 * Math.sin(angle);
      const sideSize = size * 0.3;
      
      group.append('line')
        .attr('x1', midX + sideSize * Math.cos(angle + Math.PI/4))
        .attr('y1', midY + sideSize * Math.sin(angle + Math.PI/4))
        .attr('x2', midX + sideSize * Math.cos(angle - Math.PI/4))
        .attr('y2', midY + sideSize * Math.sin(angle - Math.PI/4))
        .attr('stroke', theme.primaryColor)
        .attr('stroke-width', 2);
    }
  }
  
  addSymmetryLines(group, subject, centerX, centerY, theme) {
    // This would add the actual lines of symmetry based on the shape
    // For now, just add a vertical line as an example
    group.append('line')
      .attr('x1', centerX)
      .attr('y1', centerY - 100)
      .attr('x2', centerX)
      .attr('y2', centerY + 100)
      .attr('stroke', theme.accentColor)
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '5,5')
      .attr('class', 'symmetry-line');
  }
  
  renderReflection(renderer, diagramConfig, theme, config) {
    const centerX = renderer.getContentWidth() / 2;
    const centerY = renderer.getContentHeight() / 2;
    const group = renderer.mainGroup.append('g').attr('class', 'reflection-diagram');
    
    const { subject, reflectionDirection } = diagramConfig;
    
    // Draw the original shape on one side
    const shapeGroup = group.append('g').attr('class', 'original-shape');
    const offsetX = centerX - 80; // Position to the left
    
    if (subject.type === 'shape') {
      this.renderSymmetryShape(shapeGroup, subject.name, offsetX, centerY, theme, config);
    } else if (subject.type === 'letter') {
      this.renderSymmetryLetter(shapeGroup, subject.name, offsetX, centerY, theme, config);
    }
    
    // Draw reflection line
    if (config.showReflectionLine) {
      const lineX = centerX;
      group.append('line')
        .attr('x1', lineX)
        .attr('y1', centerY - 100)
        .attr('x2', lineX)
        .attr('y2', centerY + 100)
        .attr('stroke', theme.accentColor)
        .attr('stroke-width', 3)
        .attr('stroke-dasharray', '10,5')
        .attr('class', 'reflection-line');
    }
    
    // Draw reflected shape if enabled
    if (config.showReflected) {
      const reflectedGroup = group.append('g').attr('class', 'reflected-shape');
      const reflectedX = centerX + 80; // Position to the right
      
      if (subject.type === 'shape') {
        this.renderSymmetryShape(reflectedGroup, subject.name, reflectedX, centerY, theme, config);
      } else if (subject.type === 'letter') {
        this.renderSymmetryLetter(reflectedGroup, subject.name, reflectedX, centerY, theme, config);
      }
    }
  }
  
  renderCompletion(renderer, diagramConfig, theme, config) {
    const centerX = renderer.getContentWidth() / 2;
    const centerY = renderer.getContentHeight() / 2;
    const group = renderer.mainGroup.append('g').attr('class', 'completion-diagram');
    
    const { subject } = diagramConfig;
    
    // Draw symmetry line
    if (config.showSymmetryLine) {
      group.append('line')
        .attr('x1', centerX)
        .attr('y1', centerY - 100)
        .attr('x2', centerX)
        .attr('y2', centerY + 100)
        .attr('stroke', theme.accentColor)
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5,5')
        .attr('class', 'symmetry-line');
    }
    
    // Draw half of the shape (left side)
    if (config.showHalf) {
      const halfGroup = group.append('g').attr('class', 'half-shape');
      const clipPath = group.append('defs').append('clipPath').attr('id', 'left-half');
      clipPath.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', centerX)
        .attr('height', renderer.getContentHeight());
      
      halfGroup.attr('clip-path', 'url(#left-half)');
      
      if (subject.type === 'shape') {
        this.renderSymmetryShape(halfGroup, subject.name, centerX, centerY, theme, config);
      } else if (subject.type === 'letter') {
        this.renderSymmetryLetter(halfGroup, subject.name, centerX, centerY, theme, config);
      }
    }
    
    // Show completed shape if enabled
    if (config.showComplete) {
      const completeGroup = group.append('g').attr('class', 'complete-shape');
      
      if (subject.type === 'shape') {
        this.renderSymmetryShape(completeGroup, subject.name, centerX, centerY, theme, config);
      } else if (subject.type === 'letter') {
        this.renderSymmetryLetter(completeGroup, subject.name, centerX, centerY, theme, config);
      }
    }
  }
  
  renderSymmetryDrawing(renderer, diagramConfig, theme, config) {
    const centerX = renderer.getContentWidth() / 2;
    const centerY = renderer.getContentHeight() / 2;
    const group = renderer.mainGroup.append('g').attr('class', 'symmetry-drawing');
    
    const { subject } = diagramConfig;
    
    // Draw the shape without symmetry lines (student should draw them)
    if (subject.type === 'shape') {
      this.renderSymmetryShape(group, subject.name, centerX, centerY, theme, config);
    } else if (subject.type === 'letter') {
      this.renderSymmetryLetter(group, subject.name, centerX, centerY, theme, config);
    } else if (subject.type === 'pattern') {
      this.renderSymmetryPattern(group, subject.name, centerX, centerY, theme, config);
    }
  }
  
  renderPropertiesFigure(renderer, diagramConfig, theme, config) {
    const centerX = renderer.getContentWidth() / 2;
    const centerY = renderer.getContentHeight() / 2;
    const group = renderer.mainGroup.append('g').attr('class', 'properties-figure');
    
    const { shapeData } = diagramConfig;
    
    // Render the shape based on its name
    this.renderShapeByName(group, shapeData.name, centerX, centerY, theme, config);
    
    // Add property highlights if specified
    if (config.highlightProperty && config.showLabels) {
      this.addPropertyHighlights(group, shapeData, config.highlightProperty, centerX, centerY, theme);
    }
  }
  
  renderComparison(renderer, diagramConfig, theme, config) {
    const width = renderer.getContentWidth();
    const height = renderer.getContentHeight();
    const group = renderer.mainGroup.append('g').attr('class', 'comparison-diagram');
    
    const { shape1Data, shape2Data } = diagramConfig;
    
    // Position shapes side by side
    const leftX = width * 0.25;
    const rightX = width * 0.75;
    const centerY = height / 2;
    
    // Render first shape
    const shape1Group = group.append('g').attr('class', 'shape1');
    this.renderShapeByName(shape1Group, shape1Data.name, leftX, centerY, theme, config);
    
    // Add label for first shape
    if (config.showLabels) {
      shape1Group.append('text')
        .attr('x', leftX)
        .attr('y', centerY + 80)
        .attr('text-anchor', 'middle')
        .attr('font-family', 'Inter, sans-serif')
        .attr('font-size', '16')
        .attr('font-weight', 'bold')
        .attr('fill', theme.textColor)
        .text(shape1Data.name);
    }
    
    // Render second shape
    const shape2Group = group.append('g').attr('class', 'shape2');
    this.renderShapeByName(shape2Group, shape2Data.name, rightX, centerY, theme, config);
    
    // Add label for second shape
    if (config.showLabels) {
      shape2Group.append('text')
        .attr('x', rightX)
        .attr('y', centerY + 80)
        .attr('text-anchor', 'middle')
        .attr('font-family', 'Inter, sans-serif')
        .attr('font-size', '16')
        .attr('font-weight', 'bold')
        .attr('fill', theme.textColor)
        .text(shape2Data.name);
    }
  }
  
  renderShapeByName(group, shapeName, centerX, centerY, theme, config) {
    const size = 60; // Base size for shapes
    
    switch (shapeName) {
      case 'triangle':
        const triangleHeight = size * Math.sqrt(3) / 2;
        const trianglePoints = [
          `${centerX},${centerY - triangleHeight * 2/3}`,
          `${centerX - size/2},${centerY + triangleHeight/3}`,
          `${centerX + size/2},${centerY + triangleHeight/3}`
        ].join(' ');
        group.append('polygon')
          .attr('points', trianglePoints)
          .attr('fill', theme.primaryColor)
          .attr('fill-opacity', theme.fillOpacity)
          .attr('stroke', theme.strokeColor)
          .attr('stroke-width', theme.strokeWidth);
        break;
        
      case 'square':
        group.append('rect')
          .attr('x', centerX - size/2)
          .attr('y', centerY - size/2)
          .attr('width', size)
          .attr('height', size)
          .attr('fill', theme.primaryColor)
          .attr('fill-opacity', theme.fillOpacity)
          .attr('stroke', theme.strokeColor)
          .attr('stroke-width', theme.strokeWidth);
        break;
        
      case 'rectangle':
        const rectWidth = size * 1.4;
        const rectHeight = size * 0.8;
        group.append('rect')
          .attr('x', centerX - rectWidth/2)
          .attr('y', centerY - rectHeight/2)
          .attr('width', rectWidth)
          .attr('height', rectHeight)
          .attr('fill', theme.primaryColor)
          .attr('fill-opacity', theme.fillOpacity)
          .attr('stroke', theme.strokeColor)
          .attr('stroke-width', theme.strokeWidth);
        break;
        
      case 'circle':
        group.append('circle')
          .attr('cx', centerX)
          .attr('cy', centerY)
          .attr('r', size/2)
          .attr('fill', theme.primaryColor)
          .attr('fill-opacity', theme.fillOpacity)
          .attr('stroke', theme.strokeColor)
          .attr('stroke-width', theme.strokeWidth);
        break;
        
      case 'pentagon':
        this.drawPolygon(group, centerX, centerY, 5, size/2, theme);
        break;
        
      case 'hexagon':
        this.drawPolygon(group, centerX, centerY, 6, size/2, theme);
        break;
        
      case 'octagon':
        this.drawPolygon(group, centerX, centerY, 8, size/2, theme);
        break;
        
      case 'decagon':
        this.drawPolygon(group, centerX, centerY, 10, size/2, theme);
        break;
        
      case 'dodecagon':
        this.drawPolygon(group, centerX, centerY, 12, size/2, theme);
        break;
        
      case 'rhombus':
        const rhombusPoints = [
          `${centerX},${centerY - size}`,
          `${centerX + size * 0.8},${centerY}`,
          `${centerX},${centerY + size}`,
          `${centerX - size * 0.8},${centerY}`
        ].join(' ');
        group.append('polygon')
          .attr('points', rhombusPoints)
          .attr('fill', theme.primaryColor)
          .attr('fill-opacity', theme.fillOpacity)
          .attr('stroke', theme.strokeColor)
          .attr('stroke-width', theme.strokeWidth);
        break;
        
      case 'parallelogram':
        const paraPoints = [
          `${centerX - size/2},${centerY - size/3}`,
          `${centerX + size/2 + size/4},${centerY - size/3}`,
          `${centerX + size/2},${centerY + size/3}`,
          `${centerX - size/2 - size/4},${centerY + size/3}`
        ].join(' ');
        group.append('polygon')
          .attr('points', paraPoints)
          .attr('fill', theme.primaryColor)
          .attr('fill-opacity', theme.fillOpacity)
          .attr('stroke', theme.strokeColor)
          .attr('stroke-width', theme.strokeWidth);
        break;
        
      case 'trapezoid':
        const trapPoints = [
          `${centerX - size/3},${centerY - size/3}`,
          `${centerX + size/3},${centerY - size/3}`,
          `${centerX + size/2},${centerY + size/3}`,
          `${centerX - size/2},${centerY + size/3}`
        ].join(' ');
        group.append('polygon')
          .attr('points', trapPoints)
          .attr('fill', theme.primaryColor)
          .attr('fill-opacity', theme.fillOpacity)
          .attr('stroke', theme.strokeColor)
          .attr('stroke-width', theme.strokeWidth);
        break;
        
      case 'equilateral triangle':
      case 'isosceles triangle':
      case 'scalene triangle':
      case 'right triangle':
        // Use the same triangle rendering but with slight variations
        this.renderTriangleByType(group, shapeName, centerX, centerY, size, theme);
        break;
        
      default:
        // Default to square for unknown shapes
        group.append('rect')
          .attr('x', centerX - size/2)
          .attr('y', centerY - size/2)
          .attr('width', size)
          .attr('height', size)
          .attr('fill', theme.primaryColor)
          .attr('fill-opacity', theme.fillOpacity)
          .attr('stroke', theme.strokeColor)
          .attr('stroke-width', theme.strokeWidth);
    }
  }
  
  renderTriangleByType(group, triangleType, centerX, centerY, size, theme) {
    let points = [];
    
    switch (triangleType) {
      case 'equilateral triangle':
        const eqHeight = size * Math.sqrt(3) / 2;
        points = [
          `${centerX},${centerY - eqHeight * 2/3}`,
          `${centerX - size/2},${centerY + eqHeight/3}`,
          `${centerX + size/2},${centerY + eqHeight/3}`
        ];
        break;
        
      case 'right triangle':
        points = [
          `${centerX - size/2},${centerY - size/2}`,
          `${centerX + size/2},${centerY + size/2}`,
          `${centerX - size/2},${centerY + size/2}`
        ];
        break;
        
      case 'isosceles triangle':
        const isoHeight = size * 0.8;
        points = [
          `${centerX},${centerY - isoHeight/2}`,
          `${centerX - size/3},${centerY + isoHeight/2}`,
          `${centerX + size/3},${centerY + isoHeight/2}`
        ];
        break;
        
      case 'scalene triangle':
        points = [
          `${centerX - size/4},${centerY - size/2}`,
          `${centerX + size/2},${centerY + size/3}`,
          `${centerX - size/2},${centerY + size/2}`
        ];
        break;
        
      default:
        // Default equilateral
        const defHeight = size * Math.sqrt(3) / 2;
        points = [
          `${centerX},${centerY - defHeight * 2/3}`,
          `${centerX - size/2},${centerY + defHeight/3}`,
          `${centerX + size/2},${centerY + defHeight/3}`
        ];
    }
    
    group.append('polygon')
      .attr('points', points.join(' '))
      .attr('fill', theme.primaryColor)
      .attr('fill-opacity', theme.fillOpacity)
      .attr('stroke', theme.strokeColor)
      .attr('stroke-width', theme.strokeWidth);
  }
  
  addPropertyHighlights(group, shapeData, property, centerX, centerY, theme) {
    // Add visual highlights for specific properties
    // This could include highlighting sides, angles, etc.
    // For now, just add a subtle glow effect
    group.selectAll('polygon, rect, circle')
      .attr('filter', 'url(#glow)');
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