/**
 * MeasurementSystem - Handles creation and rendering of measurement lines
 */
export class MeasurementSystem {
  constructor(themeManager) {
    this.themeManager = themeManager;
  }
  
  /**
   * Create a measurement line with arrows and label
   * @param {d3.Selection} layer - SVG layer to append to
   * @param {number} x1 - Start X coordinate
   * @param {number} y1 - Start Y coordinate
   * @param {number} x2 - End X coordinate
   * @param {number} y2 - End Y coordinate
   * @param {string} text - Label text
   * @param {number} offset - Perpendicular offset from the measured line
   * @param {Object} options - Additional options
   */
  createMeasurementLine(layer, x1, y1, x2, y2, text, offset = 20, options = {}) {
    const group = layer.append('g').attr('class', 'measurement-group');
    const theme = this.themeManager.getCurrentTheme();
    
    // Calculate perpendicular offset for dimension line
    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const unitX = (x2 - x1) / length;
    const unitY = (y2 - y1) / length;
    const perpX = -unitY * offset;
    const perpY = unitX * offset;
    
    // Dimension line endpoints
    const dx1 = x1 + perpX;
    const dy1 = y1 + perpY;
    const dx2 = x2 + perpX;
    const dy2 = y2 + perpY;
    
    // Extension lines
    group.append('line')
      .attr('x1', x1).attr('y1', y1)
      .attr('x2', dx1).attr('y2', dy1)
      .attr('class', 'dimension-line')
      .attr('stroke', theme.measurement.extensionLineColor)
      .attr('stroke-width', theme.measurement.extensionLineWidth);
        
    group.append('line')
      .attr('x1', x2).attr('y1', y2)
      .attr('x2', dx2).attr('y2', dy2)
      .attr('class', 'dimension-line')
      .attr('stroke', theme.measurement.extensionLineColor)
      .attr('stroke-width', theme.measurement.extensionLineWidth);
    
    // Main dimension line
    group.append('line')
      .attr('x1', dx1).attr('y1', dy1)
      .attr('x2', dx2).attr('y2', dy2)
      .attr('class', 'measurement-line')
      .attr('stroke', theme.measurement.lineColor)
      .attr('stroke-width', theme.measurement.lineWidth);
    
    // Arrow markers
    const arrowSize = theme.measurement.arrowSize;
    
    // Start arrow
    group.append('polygon')
      .attr('points', this.getArrowPoints(dx1, dy1, unitX, unitY, arrowSize, true))
      .attr('class', 'dimension-arrow')
      .attr('fill', theme.measurement.arrowColor)
      .attr('stroke', theme.measurement.arrowColor);
    
    // End arrow
    group.append('polygon')
      .attr('points', this.getArrowPoints(dx2, dy2, unitX, unitY, arrowSize, false))
      .attr('class', 'dimension-arrow')
      .attr('fill', theme.measurement.arrowColor)
      .attr('stroke', theme.measurement.arrowColor);
    
    // Text label with smart positioning
    this.addMeasurementLabel(group, dx1, dy1, dx2, dy2, text, offset, theme, options);
    
    return group;
  }
  
  /**
   * Calculate arrow points for measurement arrows
   */
  getArrowPoints(x, y, unitX, unitY, size, isStart) {
    const direction = isStart ? 1 : -1;
    const perpX = -unitY;
    const perpY = unitX;
    
    const tip = `${x},${y}`;
    const base1 = `${x + direction * size * unitX - size * perpX / 2},${y + direction * size * unitY - size * perpY / 2}`;
    const base2 = `${x + direction * size * unitX + size * perpX / 2},${y + direction * size * unitY + size * perpY / 2}`;
    
    return `${tip} ${base1} ${base2}`;
  }
  
  /**
   * Add measurement label with smart positioning and rotation
   */
  addMeasurementLabel(group, dx1, dy1, dx2, dy2, text, offset, theme, options = {}) {
    const textX = (dx1 + dx2) / 2;
    const textY = (dy1 + dy2) / 2;
    const labelOffset = options.labelOffset || theme.measurement.labelOffset;
    
    // Calculate the angle of the dimension line in degrees
    let lineAngle = Math.atan2(dy2 - dy1, dx2 - dx1) * 180 / Math.PI;
    
    // Determine text positioning based on line orientation
    let textOffsetDirection;
    let textRotation = lineAngle;
    
    // For horizontal or nearly horizontal lines, position text above the line
    if (Math.abs(lineAngle) < 30 || Math.abs(lineAngle) > 150) {
      textOffsetDirection = -90; // Above the line for horizontal measurements
    } else {
      textOffsetDirection = offset > 0 ? 90 : -90; // Standard positioning for non-horizontal
    }
    
    // Keep text right-side-up by flipping if it would be upside down
    if (lineAngle > 90 || lineAngle < -90) {
      textRotation = lineAngle + 180;
      // Don't flip the offset direction for horizontal lines to keep them above
      if (!(Math.abs(lineAngle) < 30 || Math.abs(lineAngle) > 150)) {
        textOffsetDirection = -textOffsetDirection;
      }
    }
    
    // Calculate perpendicular direction for text offset
    const perpAngle = (lineAngle + textOffsetDirection) * Math.PI / 180;
    const offsetX = labelOffset * Math.cos(perpAngle);
    const offsetY = labelOffset * Math.sin(perpAngle);
    
    // Position label offset from the dimension line
    const finalTextX = textX + offsetX;
    const finalTextY = textY + offsetY;
    
    // Create text element
    const textElement = group.append('text')
      .attr('x', finalTextX)
      .attr('y', finalTextY)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('class', 'measurement-text')
      .attr('font-family', theme.measurement.fontFamily)
      .attr('font-size', theme.measurement.fontSize)
      .attr('font-weight', theme.measurement.fontWeight)
      .attr('fill', theme.measurement.textColor)
      .attr('transform', `rotate(${textRotation}, ${finalTextX}, ${finalTextY})`)
      .text(text);
    
    // Add text background if specified in theme
    if (theme.measurement.textBackground) {
      const bbox = textElement.node().getBBox();
      const padding = 2;
      
      group.insert('rect', '.measurement-text')
        .attr('x', bbox.x - padding)
        .attr('y', bbox.y - padding)
        .attr('width', bbox.width + padding * 2)
        .attr('height', bbox.height + padding * 2)
        .attr('fill', theme.measurement.textBackgroundColor)
        .attr('rx', 2)
        .attr('transform', textElement.attr('transform'));
    }
    
    return textElement;
  }
  
  /**
   * Create a radius measurement for circles
   */
  createRadiusMeasurement(layer, cx, cy, radius, angle = 0, options = {}) {
    const endX = cx + radius * Math.cos(angle);
    const endY = cy + radius * Math.sin(angle);
    
    return this.createMeasurementLine(
      layer, cx, cy, endX, endY, 
      options.label || `r = ${radius}`, 
      options.offset || 15, 
      options
    );
  }
  
  /**
   * Create a diameter measurement for circles
   */
  createDiameterMeasurement(layer, cx, cy, radius, angle = 0, options = {}) {
    const x1 = cx - radius * Math.cos(angle);
    const y1 = cy - radius * Math.sin(angle);
    const x2 = cx + radius * Math.cos(angle);
    const y2 = cy + radius * Math.sin(angle);
    
    return this.createMeasurementLine(
      layer, x1, y1, x2, y2,
      options.label || `d = ${radius * 2}`,
      options.offset || 25,
      options
    );
  }
  
  /**
   * Create an angle measurement arc
   */
  createAngleMeasurement(layer, cx, cy, radius, startAngle, endAngle, options = {}) {
    const theme = this.themeManager.getCurrentTheme();
    const group = layer.append('g').attr('class', 'angle-measurement');
    
    // Create arc path
    const arc = group.append('path')
      .attr('d', this.createArcPath(cx, cy, radius, startAngle, endAngle))
      .attr('fill', 'none')
      .attr('stroke', theme.measurement.lineColor)
      .attr('stroke-width', theme.measurement.lineWidth);
    
    // Add angle label
    const midAngle = (startAngle + endAngle) / 2;
    const labelRadius = radius + (options.labelOffset || theme.measurement.labelOffset);
    const labelX = cx + labelRadius * Math.cos(midAngle);
    const labelY = cy + labelRadius * Math.sin(midAngle);
    
    group.append('text')
      .attr('x', labelX)
      .attr('y', labelY)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('font-family', theme.measurement.fontFamily)
      .attr('font-size', theme.measurement.fontSize)
      .attr('fill', theme.measurement.textColor)
      .text(options.label || `${Math.abs(endAngle - startAngle).toFixed(1)}°`);
    
    return group;
  }
  
  /**
   * Create SVG arc path
   */
  createArcPath(cx, cy, radius, startAngle, endAngle) {
    const startX = cx + radius * Math.cos(startAngle);
    const startY = cy + radius * Math.sin(startAngle);
    const endX = cx + radius * Math.cos(endAngle);
    const endY = cy + radius * Math.sin(endAngle);
    
    const largeArcFlag = Math.abs(endAngle - startAngle) > Math.PI ? 1 : 0;
    
    return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
  }
}

export default MeasurementSystem;