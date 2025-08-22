import * as d3 from 'd3';

/**
 * CoordinateRenderer - Renders coordinate plane and coordinate-based geometry
 * Handles coordinate planes, distance calculations, point plotting, etc.
 */
export class CoordinateRenderer {
  /**
   * Render coordinate geometry based on type
   * @param {Object} renderer - GeometryRenderer instance
   * @param {string} shape - Shape type
   * @param {Object} config - Shape configuration
   * @param {Object} theme - Theme configuration
   * @param {Object} renderConfig - Additional render configuration
   */
  render(renderer, shape, config, theme, renderConfig) {
    switch (shape) {
      case 'coordinate-plane':
        this.renderCoordinatePlane(renderer, config.data || {}, theme, renderConfig);
        break;
      case 'distance-points':
        this.renderDistancePoints(renderer, config.measurements, config.unit, theme, renderConfig);
        break;
      default:
        console.warn(`Unknown coordinate geometry shape: ${shape}`);
    }
  }

  renderCoordinatePlane(renderer, data, theme, config) {
    const { points = [], problemType = 'empty', coordinateRange = 10, allowNegatives = true, showGridNumbers = true, point = null, pointLabel = 'P' } = data || {};
    
    // Calculate grid parameters
    const contentWidth = renderer.getContentWidth();
    const contentHeight = renderer.getContentHeight();
    const centerX = contentWidth / 2;
    const centerY = contentHeight / 2;
    
    // Determine coordinate range - expand to include all points if necessary
    let xRange = config.xRange || [-coordinateRange, coordinateRange];
    let yRange = config.yRange || [-coordinateRange, coordinateRange];
    
    // Check if we need to expand range to include all points
    const allPoints = points.concat(point ? [point] : []);
    if (allPoints.length > 0) {
      const pointXs = allPoints.map(p => p.x);
      const pointYs = allPoints.map(p => p.y);
      const minPointX = Math.min(...pointXs);
      const maxPointX = Math.max(...pointXs);
      const minPointY = Math.min(...pointYs);
      const maxPointY = Math.max(...pointYs);
      
      // Expand range by 1 unit on each side to provide padding
      const paddedMinX = Math.min(xRange[0], minPointX - 1);
      const paddedMaxX = Math.max(xRange[1], maxPointX + 1);
      const paddedMinY = Math.min(yRange[0], minPointY - 1);
      const paddedMaxY = Math.max(yRange[1], maxPointY + 1);
      
      xRange = [paddedMinX, paddedMaxX];
      yRange = [paddedMinY, paddedMaxY];
    }
    
    const rangeX = Math.max(Math.abs(xRange[0]), Math.abs(xRange[1]));
    const rangeY = Math.max(Math.abs(yRange[0]), Math.abs(yRange[1]));
    const maxRange = Math.max(rangeX, rangeY);
    
    // Calculate grid spacing based on coordinate range and available space
    const gridSpacing = Math.min(
      (contentWidth * 0.8) / (maxRange * 2), 
      (contentHeight * 0.8) / (maxRange * 2)
    );
    
    // Ensure minimum grid spacing for readability but allow it to be smaller for large ranges
    const finalGridSpacing = Math.max(gridSpacing, Math.min(15, contentWidth / (maxRange * 3)));
    
    const group = renderer.mainGroup.append('g').attr('class', 'coordinate-grid');
    
    // Draw grid lines aligned with coordinate system
    const minX = xRange[0];
    const maxX = xRange[1];
    const minY = yRange[0];
    const maxY = yRange[1];
    
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
      
      // Points should now be within bounds due to range expansion, but add safety check
      const margin = 20; // Allow some margin for labels
      if (pointX >= -margin && pointX <= contentWidth + margin && pointY >= -margin && pointY <= contentHeight + margin) {
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

    // Add problem-type specific rendering
    this.renderCoordinateProblemType(group, problemType, points, config, centerX, centerY, finalGridSpacing, theme);
  }

  renderCoordinateProblemType(group, problemType, points, config, centerX, centerY, gridSpacing, theme) {
    if (!points || points.length === 0) return;

    // Helper function to convert coordinate to screen position with bounds checking
    const toScreen = (point) => {
      const screenX = centerX + (point.x * gridSpacing);
      const screenY = centerY - (point.y * gridSpacing);  // Flip Y axis
      return { x: screenX, y: screenY, isVisible: true }; // All points should be visible now due to range expansion
    };

    // For now, just render basic points for all problem types
    // More specific rendering can be added later
    points.forEach((point, index) => {
      const screenPos = toScreen(point);
      if (screenPos.isVisible) {
        group.append('circle')
          .attr('cx', screenPos.x)
          .attr('cy', screenPos.y)
          .attr('r', 4)
          .attr('fill', theme.primaryColor)
          .attr('stroke', '#ffffff')
          .attr('stroke-width', 1)
          .attr('class', 'coordinate-point');
      }
    });
  }

  renderDistancePoints(renderer, measurements, unit, theme, config) {
    // Simple distance between points rendering
    const centerX = renderer.getContentWidth() / 2;
    const centerY = renderer.getContentHeight() / 2;
    const group = renderer.mainGroup.append('g').attr('class', 'distance-points');
    
    // Default points if not provided
    const point1 = {x: centerX - 60, y: centerY - 30};
    const point2 = {x: centerX + 60, y: centerY + 30};
    
    // Draw coordinate grid (simplified)
    for (let i = -3; i <= 3; i++) {
      // Vertical lines
      group.append('line')
        .attr('x1', centerX + i * 40)
        .attr('y1', centerY - 120)
        .attr('x2', centerX + i * 40)
        .attr('y2', centerY + 120)
        .attr('stroke', theme.strokeColor)
        .attr('stroke-width', i === 0 ? 2 : 0.5)
        .attr('opacity', i === 0 ? 1 : 0.3);
      
      // Horizontal lines
      group.append('line')
        .attr('x1', centerX - 120)
        .attr('y1', centerY + i * 40)
        .attr('x2', centerX + 120)
        .attr('y2', centerY + i * 40)
        .attr('stroke', theme.strokeColor)
        .attr('stroke-width', i === 0 ? 2 : 0.5)
        .attr('opacity', i === 0 ? 1 : 0.3);
    }
    
    // Draw points
    group.append('circle')
      .attr('cx', point1.x)
      .attr('cy', point1.y)
      .attr('r', 5)
      .attr('fill', theme.primaryColor)
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2);
    
    group.append('circle')
      .attr('cx', point2.x)
      .attr('cy', point2.y)
      .attr('r', 5)
      .attr('fill', theme.secondaryColor)
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2);
    
    // Draw distance line
    group.append('line')
      .attr('x1', point1.x)
      .attr('y1', point1.y)
      .attr('x2', point2.x)
      .attr('y2', point2.y)
      .attr('stroke', theme.accentColor)
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '5,5');
    
    // Add labels
    group.append('text')
      .attr('x', point1.x - 10)
      .attr('y', point1.y - 10)
      .attr('font-size', '12px')
      .attr('fill', theme.strokeColor)
      .text('A');
    
    group.append('text')
      .attr('x', point2.x + 10)
      .attr('y', point2.y - 10)
      .attr('font-size', '12px')
      .attr('fill', theme.strokeColor)
      .text('B');
  }
}

export default CoordinateRenderer;