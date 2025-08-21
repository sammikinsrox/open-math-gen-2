import * as d3 from 'd3';

/**
 * TransformationOverlay - Component for visualizing geometric transformations
 */
export class TransformationOverlay {
  constructor(options = {}) {
    this.options = {
      showOriginal: true,
      showTransformed: true,
      originalOpacity: 0.4,
      transformedOpacity: 0.8,
      originalColor: '#95a5a6',
      transformedColor: '#3498db',
      animationDuration: 1000,
      showTransformationPath: false,
      pathColor: '#e74c3c',
      pathWidth: 1,
      pathStyle: 'dashed',
      ...options
    };
  }
  
  /**
   * Render transformation of a shape
   */
  renderTransformation(layer, originalShape, transformation, options = {}) {
    const settings = { ...this.options, ...options };
    
    // Create transformation group
    const transformGroup = layer.append('g').attr('class', 'transformation-overlay');
    
    // Render original shape
    if (settings.showOriginal) {
      this.renderOriginalShape(transformGroup, originalShape, settings);
    }
    
    // Apply transformation and render transformed shape
    if (settings.showTransformed) {
      const transformedShape = this.applyTransformation(originalShape, transformation);
      this.renderTransformedShape(transformGroup, transformedShape, settings);
    }
    
    // Show transformation path if enabled
    if (settings.showTransformationPath) {
      this.renderTransformationPath(transformGroup, originalShape, transformation, settings);
    }
    
    return transformGroup;
  }
  
  /**
   * Render the original shape with reduced opacity
   */
  renderOriginalShape(group, shape, settings) {
    const originalGroup = group.append('g').attr('class', 'original-shape');
    
    // Clone and style the original shape
    const originalStyled = this.cloneShape(shape);
    originalStyled.setStyle({
      fill: settings.originalColor,
      fillOpacity: settings.originalOpacity,
      stroke: settings.originalColor,
      strokeWidth: 1
    });
    
    originalStyled.render(originalGroup);
    
    return originalGroup;
  }
  
  /**
   * Render the transformed shape
   */
  renderTransformedShape(group, transformedShape, settings) {
    const transformedGroup = group.append('g').attr('class', 'transformed-shape');
    
    transformedShape.setStyle({
      fill: settings.transformedColor,
      fillOpacity: settings.transformedOpacity,
      stroke: settings.transformedColor,
      strokeWidth: 2
    });
    
    transformedShape.render(transformedGroup);
    
    return transformedGroup;
  }
  
  /**
   * Apply transformation to a shape (returns new shape)
   */
  applyTransformation(shape, transformation) {
    const transformedShape = this.cloneShape(shape);
    
    switch (transformation.type) {
      case 'translation':
        return this.applyTranslation(transformedShape, transformation.dx, transformation.dy);
        
      case 'rotation':
        return this.applyRotation(transformedShape, transformation.angle, transformation.centerX, transformation.centerY);
        
      case 'reflection':
        return this.applyReflection(transformedShape, transformation.axis);
        
      case 'dilation':
        return this.applyDilation(transformedShape, transformation.scale, transformation.centerX, transformation.centerY);
        
      case 'composite':
        return this.applyCompositeTransformation(transformedShape, transformation.transformations);
        
      default:
        return transformedShape;
    }
  }
  
  /**
   * Clone a shape for transformation
   */
  cloneShape(originalShape) {
    // This would need to be implemented based on the specific shape type
    // For now, return a basic copy
    const cloned = Object.create(Object.getPrototypeOf(originalShape));
    Object.assign(cloned, originalShape);
    return cloned;
  }
  
  /**
   * Apply translation transformation
   */
  applyTranslation(shape, dx, dy) {
    const currentPos = shape.getPosition();
    shape.setPosition(currentPos.x + dx, currentPos.y + dy);
    return shape;
  }
  
  /**
   * Apply rotation transformation
   */
  applyRotation(shape, angle, centerX = 0, centerY = 0) {
    const currentPos = shape.getPosition();
    
    // Translate to origin relative to rotation center
    const relativeX = currentPos.x - centerX;
    const relativeY = currentPos.y - centerY;
    
    // Apply rotation
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const rotatedX = relativeX * cos - relativeY * sin;
    const rotatedY = relativeX * sin + relativeY * cos;
    
    // Translate back
    shape.setPosition(centerX + rotatedX, centerY + rotatedY);
    
    // Apply rotation to shape itself
    if (shape.rotate) {
      const currentRotation = shape.rotation || 0;
      shape.rotate(currentRotation + angle * 180 / Math.PI);
    }
    
    return shape;
  }
  
  /**
   * Apply reflection transformation
   */
  applyReflection(shape, axis) {
    const currentPos = shape.getPosition();
    
    switch (axis.type) {
      case 'x-axis':
        shape.setPosition(currentPos.x, -currentPos.y);
        break;
        
      case 'y-axis':
        shape.setPosition(-currentPos.x, currentPos.y);
        break;
        
      case 'line':
        // Reflect across arbitrary line y = mx + b
        const { m, b } = axis;
        const { x, y } = currentPos;
        
        // Use reflection formula for line y = mx + b
        const denominator = 1 + m * m;
        const newX = ((1 - m * m) * x + 2 * m * (y - b)) / denominator;
        const newY = ((m * m - 1) * y + 2 * m * x + 2 * b) / denominator;
        
        shape.setPosition(newX, newY);
        break;
        
      case 'point':
        // Reflection across a point (180° rotation around point)
        const { centerX, centerY } = axis;
        shape.setPosition(2 * centerX - currentPos.x, 2 * centerY - currentPos.y);
        break;
    }
    
    return shape;
  }
  
  /**
   * Apply dilation transformation
   */
  applyDilation(shape, scale, centerX = 0, centerY = 0) {
    const currentPos = shape.getPosition();
    
    // Apply dilation from center point
    const newX = centerX + scale * (currentPos.x - centerX);
    const newY = centerY + scale * (currentPos.y - centerY);
    
    shape.setPosition(newX, newY);
    
    // Scale the shape itself
    if (shape.scale) {
      shape.scale(scale);
    }
    
    return shape;
  }
  
  /**
   * Apply composite transformation (multiple transformations in sequence)
   */
  applyCompositeTransformation(shape, transformations) {
    let result = shape;
    
    transformations.forEach(transformation => {
      result = this.applyTransformation(result, transformation);
    });
    
    return result;
  }
  
  /**
   * Render transformation path (arrows or lines showing movement)
   */
  renderTransformationPath(group, originalShape, transformation, settings) {
    const pathGroup = group.append('g').attr('class', 'transformation-path');
    
    if (transformation.type === 'translation') {
      this.renderTranslationPath(pathGroup, originalShape, transformation, settings);
    } else if (transformation.type === 'rotation') {
      this.renderRotationPath(pathGroup, originalShape, transformation, settings);
    }
    
    return pathGroup;
  }
  
  /**
   * Render translation path (arrow showing movement)
   */
  renderTranslationPath(group, shape, transformation, settings) {
    const pos = shape.getPosition();
    const startX = pos.x;
    const startY = pos.y;
    const endX = pos.x + transformation.dx;
    const endY = pos.y + transformation.dy;
    
    // Draw arrow
    this.drawArrow(group, startX, startY, endX, endY, settings);
  }
  
  /**
   * Render rotation path (arc showing rotation)
   */
  renderRotationPath(group, shape, transformation, settings) {
    const pos = shape.getPosition();
    const centerX = transformation.centerX || 0;
    const centerY = transformation.centerY || 0;
    
    // Calculate radius from center to shape
    const radius = Math.sqrt((pos.x - centerX) ** 2 + (pos.y - centerY) ** 2);
    
    // Calculate start and end angles
    const startAngle = Math.atan2(pos.y - centerY, pos.x - centerX);
    const endAngle = startAngle + transformation.angle;
    
    // Draw rotation arc
    this.drawRotationArc(group, centerX, centerY, radius, startAngle, endAngle, settings);
  }
  
  /**
   * Draw an arrow between two points
   */
  drawArrow(group, x1, y1, x2, y2, settings) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    
    if (length === 0) return;
    
    // Draw line
    const line = group.append('line')
      .attr('x1', x1)
      .attr('y1', y1)
      .attr('x2', x2)
      .attr('y2', y2)
      .attr('stroke', settings.pathColor)
      .attr('stroke-width', settings.pathWidth);
    
    if (settings.pathStyle === 'dashed') {
      line.attr('stroke-dasharray', '5,3');
    }
    
    // Draw arrowhead
    const angle = Math.atan2(dy, dx);
    const arrowLength = 8;
    const arrowAngle = Math.PI / 6;
    
    const arrowX1 = x2 - arrowLength * Math.cos(angle - arrowAngle);
    const arrowY1 = y2 - arrowLength * Math.sin(angle - arrowAngle);
    const arrowX2 = x2 - arrowLength * Math.cos(angle + arrowAngle);
    const arrowY2 = y2 - arrowLength * Math.sin(angle + arrowAngle);
    
    group.append('polygon')
      .attr('points', `${x2},${y2} ${arrowX1},${arrowY1} ${arrowX2},${arrowY2}`)
      .attr('fill', settings.pathColor);
  }
  
  /**
   * Draw rotation arc with arrow
   */
  drawRotationArc(group, centerX, centerY, radius, startAngle, endAngle, settings) {
    const startX = centerX + radius * Math.cos(startAngle);
    const startY = centerY + radius * Math.sin(startAngle);
    const endX = centerX + radius * Math.cos(endAngle);
    const endY = centerY + radius * Math.sin(endAngle);
    
    const largeArcFlag = Math.abs(endAngle - startAngle) > Math.PI ? 1 : 0;
    const sweepFlag = endAngle > startAngle ? 1 : 0;
    
    const pathData = `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY}`;
    
    // Draw arc
    const arc = group.append('path')
      .attr('d', pathData)
      .attr('fill', 'none')
      .attr('stroke', settings.pathColor)
      .attr('stroke-width', settings.pathWidth);
    
    if (settings.pathStyle === 'dashed') {
      arc.attr('stroke-dasharray', '5,3');
    }
    
    // Draw arrowhead at end
    const arrowAngle = endAngle + Math.PI / 2 * (sweepFlag ? 1 : -1);
    const arrowLength = 6;
    const arrowWidth = Math.PI / 8;
    
    const arrowX1 = endX - arrowLength * Math.cos(arrowAngle - arrowWidth);
    const arrowY1 = endY - arrowLength * Math.sin(arrowAngle - arrowWidth);
    const arrowX2 = endX - arrowLength * Math.cos(arrowAngle + arrowWidth);
    const arrowY2 = endY - arrowLength * Math.sin(arrowAngle + arrowWidth);
    
    group.append('polygon')
      .attr('points', `${endX},${endY} ${arrowX1},${arrowY1} ${arrowX2},${arrowY2}`)
      .attr('fill', settings.pathColor);
  }
  
  /**
   * Create side-by-side transformation comparison
   */
  renderSideBySide(layer, originalShape, transformation, options = {}) {
    const settings = {
      spacing: 200,
      showLabels: true,
      labelOffset: { x: 0, y: -30 },
      ...this.options,
      ...options
    };
    
    const comparisonGroup = layer.append('g').attr('class', 'transformation-comparison');
    
    // Original shape on left
    const originalGroup = comparisonGroup.append('g').attr('class', 'original-side');
    const originalStyled = this.cloneShape(originalShape);
    originalStyled.setStyle({
      fill: settings.originalColor,
      stroke: settings.originalColor,
      strokeWidth: 2
    });
    originalStyled.render(originalGroup);
    
    if (settings.showLabels) {
      originalGroup.append('text')
        .attr('x', settings.labelOffset.x)
        .attr('y', settings.labelOffset.y)
        .attr('text-anchor', 'middle')
        .attr('font-size', '14')
        .attr('font-weight', 'bold')
        .attr('fill', settings.originalColor)
        .text('Original');
    }
    
    // Transformed shape on right
    const transformedGroup = comparisonGroup.append('g')
      .attr('class', 'transformed-side')
      .attr('transform', `translate(${settings.spacing}, 0)`);
    
    const transformedShape = this.applyTransformation(originalShape, transformation);
    transformedShape.setStyle({
      fill: settings.transformedColor,
      stroke: settings.transformedColor,
      strokeWidth: 2
    });
    transformedShape.render(transformedGroup);
    
    if (settings.showLabels) {
      transformedGroup.append('text')
        .attr('x', settings.labelOffset.x)
        .attr('y', settings.labelOffset.y)
        .attr('text-anchor', 'middle')
        .attr('font-size', '14')
        .attr('font-weight', 'bold')
        .attr('fill', settings.transformedColor)
        .text('Transformed');
    }
    
    return comparisonGroup;
  }
}

export default TransformationOverlay;