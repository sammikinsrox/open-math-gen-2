import * as d3 from 'd3';

/**
 * ThreeDRenderer - Renders 3D geometric shapes
 * Handles cubes, rectangular prisms, cylinders, cones, spheres, pyramids, etc.
 */
export class ThreeDRenderer {
  /**
   * Render 3D shape based on type
   * @param {Object} renderer - GeometryRenderer instance
   * @param {string} shape - Shape type
   * @param {Object} measurements - Shape measurements
   * @param {string} unit - Unit of measurement
   * @param {Object} theme - Theme configuration
   * @param {Object} config - Additional configuration
   */
  render(renderer, shape, measurements, unit, theme, config) {
    switch (shape) {
      case 'rectangularPrism':
      case 'cube':
        this.renderRectangularPrism(renderer, measurements, unit, theme, config);
        break;
      case 'cylinder':
        this.renderCylinder(renderer, measurements, unit, theme, config);
        break;
      case 'cone':
        this.renderCone(renderer, measurements, unit, theme, config);
        break;
      case 'sphere':
        this.renderSphere(renderer, measurements, unit, theme, config);
        break;
      case 'triangularPrism':
        this.renderTriangularPrism(renderer, measurements, unit, theme, config);
        break;
      case 'pyramid':
        this.renderPyramid(renderer, measurements, unit, theme, config);
        break;
      case 'composite':
        this.renderComposite3D(renderer, measurements, unit, theme, config);
        break;
      case 'right-triangle':
        this.renderRightTriangle(renderer, measurements, unit, theme, config);
        break;
      default:
        console.warn(`Unknown 3D shape: ${shape}`);
    }
  }

  renderRectangularPrism(renderer, measurements, unit, theme, config) {
    const { length = 6, width = 4, height = 5 } = measurements;
    
    // Calculate scale and center position
    const availableSize = Math.min(renderer.getContentWidth(), renderer.getContentHeight()) * 0.8;
    const maxDimension = Math.max(length, width, height);
    const scale = Math.min(availableSize / (maxDimension * 1.5), 60);
    const centerX = renderer.getContentWidth() / 2;
    const centerY = renderer.getContentHeight() / 2;
    
    const group = renderer.mainGroup.append('g').attr('class', 'rectangular-prism-3d');
    
    // Scaled dimensions
    const scaledLength = length * scale;
    const scaledWidth = width * scale;
    const scaledHeight = height * scale;
    
    // Isometric offset for 3D effect
    const isoX = scaledWidth * 0.5;
    const isoY = scaledHeight * 0.3;
    
    // Draw the three visible faces
    // Front face
    group.append('rect')
      .attr('x', centerX - scaledLength/2)
      .attr('y', centerY - scaledHeight/2)
      .attr('width', scaledLength)
      .attr('height', scaledHeight)
      .attr('fill', theme.primaryColor)
      .attr('fill-opacity', theme.fillOpacity)
      .attr('stroke', theme.strokeColor)
      .attr('stroke-width', theme.strokeWidth);
    
    // Top face (parallelogram)
    const topPoints = [
      `${centerX - scaledLength/2},${centerY - scaledHeight/2}`,
      `${centerX + scaledLength/2},${centerY - scaledHeight/2}`,
      `${centerX + scaledLength/2 + isoX},${centerY - scaledHeight/2 - isoY}`,
      `${centerX - scaledLength/2 + isoX},${centerY - scaledHeight/2 - isoY}`
    ].join(' ');
    
    group.append('polygon')
      .attr('points', topPoints)
      .attr('fill', theme.accentColor)
      .attr('fill-opacity', theme.fillOpacity * 1.2)
      .attr('stroke', theme.strokeColor)
      .attr('stroke-width', theme.strokeWidth);
    
    // Right face (parallelogram)
    const rightPoints = [
      `${centerX + scaledLength/2},${centerY - scaledHeight/2}`,
      `${centerX + scaledLength/2 + isoX},${centerY - scaledHeight/2 - isoY}`,
      `${centerX + scaledLength/2 + isoX},${centerY + scaledHeight/2 - isoY}`,
      `${centerX + scaledLength/2},${centerY + scaledHeight/2}`
    ].join(' ');
    
    group.append('polygon')
      .attr('points', rightPoints)
      .attr('fill', theme.secondaryColor)
      .attr('fill-opacity', theme.fillOpacity * 0.8)
      .attr('stroke', theme.strokeColor)
      .attr('stroke-width', theme.strokeWidth);
    
    if (config.showMeasurements) {
      // Length measurement
      group.append('text')
        .attr('x', centerX)
        .attr('y', centerY + scaledHeight/2 + 25)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .attr('fill', theme.strokeColor)
        .text(`${length} ${unit}`);
      
      // Height measurement
      group.append('text')
        .attr('x', centerX - scaledLength/2 - 25)
        .attr('y', centerY)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .attr('fill', theme.strokeColor)
        .text(`${height} ${unit}`);
      
      // Width measurement (on the side face)
      group.append('text')
        .attr('x', centerX + scaledLength/2 + isoX/2 + 15)
        .attr('y', centerY - isoY/2)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .attr('fill', theme.strokeColor)
        .text(`${width} ${unit}`);
    }
  }

  renderCylinder(renderer, measurements, unit, theme, config) {
    const { radius = 3, height = 6 } = measurements;
    
    // Calculate scale and center position
    const availableSize = Math.min(renderer.getContentWidth(), renderer.getContentHeight()) * 0.8;
    const maxDimension = Math.max(radius * 2, height);
    const scale = Math.min(availableSize / (maxDimension * 1.2), 60);
    const centerX = renderer.getContentWidth() / 2;
    const centerY = renderer.getContentHeight() / 2;
    
    const group = renderer.mainGroup.append('g').attr('class', 'cylinder-3d');
    
    const scaledRadius = radius * scale;
    const scaledHeight = height * scale;
    
    // Draw bottom ellipse (full)
    group.append('ellipse')
      .attr('cx', centerX)
      .attr('cy', centerY + scaledHeight/2)
      .attr('rx', scaledRadius)
      .attr('ry', scaledRadius * 0.3)
      .attr('fill', theme.primaryColor)
      .attr('fill-opacity', theme.fillOpacity)
      .attr('stroke', theme.strokeColor)
      .attr('stroke-width', theme.strokeWidth);
    
    // Draw sides (rectangle)
    group.append('rect')
      .attr('x', centerX - scaledRadius)
      .attr('y', centerY - scaledHeight/2)
      .attr('width', scaledRadius * 2)
      .attr('height', scaledHeight)
      .attr('fill', theme.secondaryColor)
      .attr('fill-opacity', theme.fillOpacity)
      .attr('stroke', theme.strokeColor)
      .attr('stroke-width', theme.strokeWidth);
    
    // Draw top ellipse (partial arc for 3D effect)
    const arcPath = `M ${centerX - scaledRadius} ${centerY - scaledHeight/2} 
                     A ${scaledRadius} ${scaledRadius * 0.3} 0 0 1 ${centerX + scaledRadius} ${centerY - scaledHeight/2}`;
    
    group.append('path')
      .attr('d', arcPath)
      .attr('fill', 'none')
      .attr('stroke', theme.strokeColor)
      .attr('stroke-width', theme.strokeWidth);
    
    if (config.showMeasurements) {
      // Radius measurement
      group.append('line')
        .attr('x1', centerX)
        .attr('y1', centerY + scaledHeight/2)
        .attr('x2', centerX + scaledRadius)
        .attr('y2', centerY + scaledHeight/2)
        .attr('stroke', theme.strokeColor)
        .attr('stroke-width', 1);
      
      group.append('text')
        .attr('x', centerX + scaledRadius/2)
        .attr('y', centerY + scaledHeight/2 + 15)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .attr('fill', theme.strokeColor)
        .text(`r = ${radius} ${unit}`);
      
      // Height measurement
      group.append('text')
        .attr('x', centerX - scaledRadius - 25)
        .attr('y', centerY)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .attr('fill', theme.strokeColor)
        .text(`h = ${height} ${unit}`);
    }
  }

  renderCone(renderer, measurements, unit, theme, config) {
    const { radius = 3, height = 6 } = measurements;
    
    // Calculate scale and center position
    const availableSize = Math.min(renderer.getContentWidth(), renderer.getContentHeight()) * 0.8;
    const maxDimension = Math.max(radius * 2, height);
    const scale = Math.min(availableSize / (maxDimension * 1.2), 60);
    const centerX = renderer.getContentWidth() / 2;
    const centerY = renderer.getContentHeight() / 2;
    
    const group = renderer.mainGroup.append('g').attr('class', 'cone-3d');
    
    const scaledRadius = radius * scale;
    const scaledHeight = height * scale;
    
    // Draw base ellipse
    group.append('ellipse')
      .attr('cx', centerX)
      .attr('cy', centerY + scaledHeight/2)
      .attr('rx', scaledRadius)
      .attr('ry', scaledRadius * 0.3)
      .attr('fill', theme.primaryColor)
      .attr('fill-opacity', theme.fillOpacity)
      .attr('stroke', theme.strokeColor)
      .attr('stroke-width', theme.strokeWidth);
    
    // Draw visible part of side (triangle sectors)
    const leftEdgeX = centerX - scaledRadius;
    const rightEdgeX = centerX + scaledRadius;
    const baseY = centerY + scaledHeight/2;
    const apexX = centerX;
    const apexY = centerY - scaledHeight/2;
    
    // Left side
    const leftPath = `M ${leftEdgeX} ${baseY} L ${apexX} ${apexY} L ${rightEdgeX} ${baseY}`;
    group.append('path')
      .attr('d', leftPath)
      .attr('fill', theme.secondaryColor)
      .attr('fill-opacity', theme.fillOpacity)
      .attr('stroke', theme.strokeColor)
      .attr('stroke-width', theme.strokeWidth);
    
    if (config.showMeasurements) {
      // Radius measurement
      group.append('line')
        .attr('x1', centerX)
        .attr('y1', baseY)
        .attr('x2', rightEdgeX)
        .attr('y2', baseY)
        .attr('stroke', theme.strokeColor)
        .attr('stroke-width', 1);
      
      group.append('text')
        .attr('x', centerX + scaledRadius/2)
        .attr('y', baseY + 15)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .attr('fill', theme.strokeColor)
        .text(`r = ${radius} ${unit}`);
      
      // Height measurement
      group.append('text')
        .attr('x', centerX - scaledRadius - 25)
        .attr('y', centerY)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .attr('fill', theme.strokeColor)
        .text(`h = ${height} ${unit}`);
    }
  }

  renderSphere(renderer, measurements, unit, theme, config) {
    const { radius = 4 } = measurements;
    
    // Calculate scale and center position
    const availableSize = Math.min(renderer.getContentWidth(), renderer.getContentHeight()) * 0.8;
    const scale = Math.min(availableSize / (radius * 2), 80);
    const centerX = renderer.getContentWidth() / 2;
    const centerY = renderer.getContentHeight() / 2;
    
    const group = renderer.mainGroup.append('g').attr('class', 'sphere-3d');
    
    const scaledRadius = radius * scale;
    
    // Create gradient for 3D effect
    const gradientId = `sphere-gradient-${Date.now()}`;
    const defs = group.append('defs');
    const gradient = defs.append('radialGradient')
      .attr('id', gradientId)
      .attr('cx', '30%')
      .attr('cy', '30%');
    
    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#ffffff')
      .attr('stop-opacity', 0.8);
    
    gradient.append('stop')
      .attr('offset', '70%')
      .attr('stop-color', theme.primaryColor)
      .attr('stop-opacity', 0.6);
    
    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', theme.strokeColor)
      .attr('stop-opacity', 0.9);
    
    // Draw main sphere
    group.append('circle')
      .attr('cx', centerX)
      .attr('cy', centerY)
      .attr('r', scaledRadius)
      .attr('fill', `url(#${gradientId})`)
      .attr('stroke', theme.strokeColor)
      .attr('stroke-width', theme.strokeWidth);
    
    // Add great circle for 3D effect
    group.append('ellipse')
      .attr('cx', centerX)
      .attr('cy', centerY)
      .attr('rx', scaledRadius)
      .attr('ry', scaledRadius * 0.3)
      .attr('fill', 'none')
      .attr('stroke', theme.strokeColor)
      .attr('stroke-width', 1)
      .attr('opacity', 0.4);
    
    if (config.showMeasurements) {
      // Radius measurement
      group.append('line')
        .attr('x1', centerX)
        .attr('y1', centerY)
        .attr('x2', centerX + scaledRadius)
        .attr('y2', centerY)
        .attr('stroke', theme.strokeColor)
        .attr('stroke-width', 1);
      
      group.append('text')
        .attr('x', centerX + scaledRadius/2)
        .attr('y', centerY - 10)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .attr('fill', theme.strokeColor)
        .text(`r = ${radius} ${unit}`);
    }
  }

  renderTriangularPrism(renderer, measurements, unit, theme, config) {
    const { base = 6, height = 4, length = 8 } = measurements;
    
    // Calculate scale and center position
    const availableSize = Math.min(renderer.getContentWidth(), renderer.getContentHeight()) * 0.8;
    const maxDimension = Math.max(base, height, length);
    const scale = Math.min(availableSize / (maxDimension * 1.5), 50);
    const centerX = renderer.getContentWidth() / 2;
    const centerY = renderer.getContentHeight() / 2;
    
    const group = renderer.mainGroup.append('g').attr('class', 'triangular-prism-3d');
    
    const scaledBase = base * scale;
    const scaledHeight = height * scale;
    const scaledLength = length * scale;
    
    // Isometric offset
    const isoX = scaledLength * 0.5;
    const isoY = scaledLength * 0.3;
    
    // Draw front triangular face
    const frontTrianglePoints = [
      `${centerX},${centerY - scaledHeight/2}`,
      `${centerX - scaledBase/2},${centerY + scaledHeight/2}`,
      `${centerX + scaledBase/2},${centerY + scaledHeight/2}`
    ].join(' ');
    
    group.append('polygon')
      .attr('points', frontTrianglePoints)
      .attr('fill', theme.primaryColor)
      .attr('fill-opacity', theme.fillOpacity)
      .attr('stroke', theme.strokeColor)
      .attr('stroke-width', theme.strokeWidth);
    
    // Draw back triangular face (offset)
    const backTrianglePoints = [
      `${centerX + isoX},${centerY - scaledHeight/2 - isoY}`,
      `${centerX - scaledBase/2 + isoX},${centerY + scaledHeight/2 - isoY}`,
      `${centerX + scaledBase/2 + isoX},${centerY + scaledHeight/2 - isoY}`
    ].join(' ');
    
    group.append('polygon')
      .attr('points', backTrianglePoints)
      .attr('fill', theme.accentColor)
      .attr('fill-opacity', theme.fillOpacity)
      .attr('stroke', theme.strokeColor)
      .attr('stroke-width', theme.strokeWidth);
    
    // Draw connecting edges
    group.append('line')
      .attr('x1', centerX).attr('y1', centerY - scaledHeight/2)
      .attr('x2', centerX + isoX).attr('y2', centerY - scaledHeight/2 - isoY)
      .attr('stroke', theme.strokeColor).attr('stroke-width', theme.strokeWidth);
    
    group.append('line')
      .attr('x1', centerX - scaledBase/2).attr('y1', centerY + scaledHeight/2)
      .attr('x2', centerX - scaledBase/2 + isoX).attr('y2', centerY + scaledHeight/2 - isoY)
      .attr('stroke', theme.strokeColor).attr('stroke-width', theme.strokeWidth);
    
    group.append('line')
      .attr('x1', centerX + scaledBase/2).attr('y1', centerY + scaledHeight/2)
      .attr('x2', centerX + scaledBase/2 + isoX).attr('y2', centerY + scaledHeight/2 - isoY)
      .attr('stroke', theme.strokeColor).attr('stroke-width', theme.strokeWidth);
    
    if (config.showMeasurements) {
      group.append('text')
        .attr('x', centerX)
        .attr('y', centerY + scaledHeight/2 + 25)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .attr('fill', theme.strokeColor)
        .text(`${base} ${unit}`);
    }
  }

  renderPyramid(renderer, measurements, unit, theme, config) {
    const { baseLength = 6, baseWidth = 6, height = 8 } = measurements;
    
    // Calculate scale and center position
    const availableSize = Math.min(renderer.getContentWidth(), renderer.getContentHeight()) * 0.8;
    const maxDimension = Math.max(baseLength, baseWidth, height);
    const scale = Math.min(availableSize / (maxDimension * 1.5), 50);
    const centerX = renderer.getContentWidth() / 2;
    const centerY = renderer.getContentHeight() / 2;
    
    const group = renderer.mainGroup.append('g').attr('class', 'pyramid-3d');
    
    const scaledBase = baseLength * scale;
    const scaledHeight = height * scale;
    
    // Draw base
    group.append('rect')
      .attr('x', centerX - scaledBase/2)
      .attr('y', centerY + scaledHeight/4)
      .attr('width', scaledBase)
      .attr('height', scaledBase)
      .attr('fill', theme.primaryColor)
      .attr('fill-opacity', theme.fillOpacity)
      .attr('stroke', theme.strokeColor)
      .attr('stroke-width', theme.strokeWidth);
    
    // Draw triangular faces
    const apex = `${centerX},${centerY - scaledHeight/2}`;
    const corners = [
      `${centerX - scaledBase/2},${centerY + scaledHeight/4}`,
      `${centerX + scaledBase/2},${centerY + scaledHeight/4}`,
      `${centerX + scaledBase/2},${centerY + scaledHeight/4 + scaledBase}`,
      `${centerX - scaledBase/2},${centerY + scaledHeight/4 + scaledBase}`
    ];
    
    // Visible faces
    group.append('polygon')
      .attr('points', `${apex} ${corners[0]} ${corners[1]}`)
      .attr('fill', theme.secondaryColor)
      .attr('fill-opacity', theme.fillOpacity)
      .attr('stroke', theme.strokeColor)
      .attr('stroke-width', theme.strokeWidth);
    
    group.append('polygon')
      .attr('points', `${apex} ${corners[1]} ${corners[2]}`)
      .attr('fill', theme.accentColor)
      .attr('fill-opacity', theme.fillOpacity)
      .attr('stroke', theme.strokeColor)
      .attr('stroke-width', theme.strokeWidth);
  }

  renderComposite3D(renderer, measurements, unit, theme, config) {
    // Simple composite 3D shape - combine two basic shapes
    const centerX = renderer.getContentWidth() / 2;
    const centerY = renderer.getContentHeight() / 2;
    const group = renderer.mainGroup.append('g').attr('class', 'composite-3d');
    
    // Draw a cylinder base
    this.renderCylinder(renderer, { radius: 40, height: 60 }, unit, theme, config);
    
    // Add a smaller shape on top (visual composite effect)
    group.append('rect')
      .attr('x', centerX - 20)
      .attr('y', centerY - 60)
      .attr('width', 40)
      .attr('height', 40)
      .attr('fill', theme.accentColor)
      .attr('fill-opacity', theme.fillOpacity)
      .attr('stroke', theme.strokeColor)
      .attr('stroke-width', theme.strokeWidth);
  }

  renderRightTriangle(renderer, measurements, unit, theme, config) {
    const { base = 6, height = 4 } = measurements;
    
    // Calculate scale and center position
    const availableSize = Math.min(renderer.getContentWidth(), renderer.getContentHeight()) * 0.8;
    const maxDimension = Math.max(base, height);
    const scale = Math.min(availableSize / maxDimension, 80);
    const centerX = renderer.getContentWidth() / 2;
    const centerY = renderer.getContentHeight() / 2;
    
    const group = renderer.mainGroup.append('g').attr('class', 'right-triangle-3d');
    
    const scaledBase = base * scale;
    const scaledHeight = height * scale;
    
    // Draw right triangle
    const points = [
      `${centerX - scaledBase/2},${centerY + scaledHeight/2}`, // bottom left
      `${centerX + scaledBase/2},${centerY + scaledHeight/2}`, // bottom right  
      `${centerX - scaledBase/2},${centerY - scaledHeight/2}`  // top left (right angle)
    ];
    
    group.append('polygon')
      .attr('points', points.join(' '))
      .attr('fill', theme.primaryColor)
      .attr('fill-opacity', theme.fillOpacity)
      .attr('stroke', theme.strokeColor)
      .attr('stroke-width', theme.strokeWidth);
    
    // Add right angle indicator
    const cornerSize = 15;
    group.append('rect')
      .attr('x', centerX - scaledBase/2)
      .attr('y', centerY - scaledHeight/2)
      .attr('width', cornerSize)
      .attr('height', cornerSize)
      .attr('fill', 'none')
      .attr('stroke', theme.accentColor)
      .attr('stroke-width', 2);
  }
}

export default ThreeDRenderer;