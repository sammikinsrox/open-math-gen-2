import * as d3 from 'd3';
import { Rectangle } from '../shapes/Rectangle.js';
import { Triangle } from '../shapes/Triangle.js';
import { Circle } from '../shapes/Circle.js';
import { Polygon } from '../shapes/Polygon.js';

/**
 * BasicShapeRenderer - Renders basic 2D geometric shapes
 * Handles rectangle, square, triangle, circle, parallelogram, trapezoid
 */
export class BasicShapeRenderer {
  /**
   * Render basic shape based on type
   * @param {Object} renderer - GeometryRenderer instance
   * @param {string} shape - Shape type
   * @param {Object} measurements - Shape measurements
   * @param {string} unit - Unit of measurement
   * @param {Object} theme - Theme configuration
   * @param {Object} config - Additional configuration
   */
  render(renderer, shape, measurements, unit, theme, config) {
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
      default:
        console.warn(`Unknown basic shape: ${shape}`);
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
}

export default BasicShapeRenderer;