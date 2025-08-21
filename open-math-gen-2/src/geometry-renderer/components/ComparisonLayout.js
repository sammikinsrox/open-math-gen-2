import * as d3 from 'd3';

/**
 * ComparisonLayout - Component for side-by-side shape comparisons
 * Used for similarity, congruence, and other comparative visualizations
 */
export class ComparisonLayout {
  constructor(options = {}) {
    this.options = {
      spacing: 180,
      showLabels: true,
      showMeasurements: true,
      showCorrespondingElements: false,
      labelOffset: { x: 0, y: -40 },
      shape1Color: '#3498db',
      shape2Color: '#e74c3c',
      correspondingColor: '#f39c12',
      correspondingStyle: 'dashed',
      scaleFactor: null, // Auto-calculate if not provided
      alignment: 'center', // 'top', 'center', 'bottom'
      ...options
    };
  }
  
  /**
   * Render two shapes for comparison
   */
  renderComparison(layer, shape1, shape2, comparisonType = 'similarity', options = {}) {
    const settings = { ...this.options, ...options };
    
    // Create comparison group
    const comparisonGroup = layer.append('g').attr('class', 'shape-comparison');
    
    // Calculate alignment positions
    const positions = this.calculatePositions(shape1, shape2, settings);
    
    // Render first shape
    const shape1Group = comparisonGroup.append('g')
      .attr('class', 'shape-1')
      .attr('transform', `translate(${positions.shape1.x}, ${positions.shape1.y})`);
    
    this.renderShapeWithStyle(shape1Group, shape1, settings.shape1Color, '1', settings);
    
    // Render second shape
    const shape2Group = comparisonGroup.append('g')
      .attr('class', 'shape-2')
      .attr('transform', `translate(${positions.shape2.x}, ${positions.shape2.y})`);
    
    this.renderShapeWithStyle(shape2Group, shape2, settings.shape2Color, '2', settings);
    
    // Show corresponding elements if enabled
    if (settings.showCorrespondingElements) {
      this.renderCorrespondingElements(comparisonGroup, shape1, shape2, positions, settings);
    }
    
    // Add comparison type label
    if (settings.showLabels) {
      this.addComparisonTypeLabel(comparisonGroup, comparisonType, settings);
    }
    
    // Add scale factor information for similarity
    if (comparisonType === 'similarity' && settings.scaleFactor) {
      this.addScaleFactorLabel(comparisonGroup, settings.scaleFactor, settings);
    }
    
    return comparisonGroup;
  }
  
  /**
   * Calculate positions for shape alignment
   */
  calculatePositions(shape1, shape2, settings) {
    const bounds1 = shape1.getBounds();
    const bounds2 = shape2.getBounds();
    
    let y1 = 0, y2 = 0;
    
    // Calculate vertical alignment
    switch (settings.alignment) {
      case 'top':
        y1 = 0;
        y2 = 0;
        break;
      case 'center':
        y1 = bounds1.height / 2;
        y2 = bounds2.height / 2;
        break;
      case 'bottom':
        y1 = bounds1.height;
        y2 = bounds2.height;
        break;
    }
    
    return {
      shape1: { x: 0, y: y1 },
      shape2: { x: settings.spacing, y: y2 }
    };
  }
  
  /**
   * Render a shape with specific styling
   */
  renderShapeWithStyle(group, shape, color, label, settings) {
    // Clone and style the shape
    const styledShape = this.cloneShape(shape);
    styledShape.setStyle({
      fill: this.hexToRgba(color, 0.3),
      stroke: color,
      strokeWidth: 2
    });
    
    styledShape.render(group);
    
    // Add shape label
    if (settings.showLabels) {
      group.append('text')
        .attr('x', settings.labelOffset.x)
        .attr('y', settings.labelOffset.y)
        .attr('text-anchor', 'middle')
        .attr('font-size', '16')
        .attr('font-weight', 'bold')
        .attr('fill', color)
        .text(`Shape ${label}`);
    }
    
    // Add measurements if enabled
    if (settings.showMeasurements) {
      this.addShapeMeasurements(group, styledShape, color);
    }
  }
  
  /**
   * Clone a shape for styling
   */
  cloneShape(originalShape) {
    const cloned = Object.create(Object.getPrototypeOf(originalShape));
    Object.assign(cloned, originalShape);
    return cloned;
  }
  
  /**
   * Convert hex color to rgba
   */
  hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  
  /**
   * Add measurements to a shape
   */
  addShapeMeasurements(group, shape, color) {
    // This would need to be implemented based on shape type
    // For now, add basic dimension labels
    const bounds = shape.getBounds();
    
    // Width measurement
    group.append('line')
      .attr('x1', bounds.x)
      .attr('y1', bounds.y + bounds.height + 20)
      .attr('x2', bounds.x + bounds.width)
      .attr('y2', bounds.y + bounds.height + 20)
      .attr('stroke', color)
      .attr('stroke-width', 1);
    
    group.append('text')
      .attr('x', bounds.x + bounds.width / 2)
      .attr('y', bounds.y + bounds.height + 35)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12')
      .attr('fill', color)
      .text(`${bounds.width.toFixed(0)}`);
    
    // Height measurement
    group.append('line')
      .attr('x1', bounds.x - 20)
      .attr('y1', bounds.y)
      .attr('x2', bounds.x - 20)
      .attr('y2', bounds.y + bounds.height)
      .attr('stroke', color)
      .attr('stroke-width', 1);
    
    group.append('text')
      .attr('x', bounds.x - 35)
      .attr('y', bounds.y + bounds.height / 2 + 5)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12')
      .attr('fill', color)
      .text(`${bounds.height.toFixed(0)}`);
  }
  
  /**
   * Render corresponding elements between shapes
   */
  renderCorrespondingElements(group, shape1, shape2, positions, settings) {
    const correspondingGroup = group.append('g').attr('class', 'corresponding-elements');
    
    // Get key points from both shapes (this would be shape-specific)
    const points1 = this.getKeyPoints(shape1);
    const points2 = this.getKeyPoints(shape2);
    
    // Draw correspondence lines
    const minPoints = Math.min(points1.length, points2.length);
    for (let i = 0; i < minPoints; i++) {
      const p1 = {
        x: positions.shape1.x + points1[i].x,
        y: positions.shape1.y + points1[i].y
      };
      const p2 = {
        x: positions.shape2.x + points2[i].x,
        y: positions.shape2.y + points2[i].y
      };
      
      // Draw correspondence line
      const line = correspondingGroup.append('line')
        .attr('x1', p1.x)
        .attr('y1', p1.y)
        .attr('x2', p2.x)
        .attr('y2', p2.y)
        .attr('stroke', settings.correspondingColor)
        .attr('stroke-width', 1);
      
      if (settings.correspondingStyle === 'dashed') {
        line.attr('stroke-dasharray', '3,3');
      }
      
      // Add correspondence labels
      const midX = (p1.x + p2.x) / 2;
      const midY = (p1.y + p2.y) / 2;
      
      correspondingGroup.append('text')
        .attr('x', midX)
        .attr('y', midY - 8)
        .attr('text-anchor', 'middle')
        .attr('font-size', '10')
        .attr('font-weight', 'bold')
        .attr('fill', settings.correspondingColor)
        .text(`${String.fromCharCode(65 + i)}↔${String.fromCharCode(65 + i)}'`);
    }
  }
  
  /**
   * Get key points from a shape for correspondence
   */
  getKeyPoints(shape) {
    const bounds = shape.getBounds();
    
    // Default to corner points - would be overridden for specific shapes
    return [
      { x: bounds.x, y: bounds.y }, // Top-left
      { x: bounds.x + bounds.width, y: bounds.y }, // Top-right
      { x: bounds.x + bounds.width, y: bounds.y + bounds.height }, // Bottom-right
      { x: bounds.x, y: bounds.y + bounds.height } // Bottom-left
    ];
  }
  
  /**
   * Add comparison type label
   */
  addComparisonTypeLabel(group, comparisonType, settings) {
    const typeLabels = {
      similarity: 'Similar Shapes',
      congruence: 'Congruent Shapes',
      proportion: 'Proportional Shapes',
      comparison: 'Shape Comparison'
    };
    
    group.append('text')
      .attr('x', settings.spacing / 2)
      .attr('y', -60)
      .attr('text-anchor', 'middle')
      .attr('font-size', '18')
      .attr('font-weight', 'bold')
      .attr('fill', '#2c3e50')
      .text(typeLabels[comparisonType] || 'Shape Comparison');
  }
  
  /**
   * Add scale factor label for similarity problems
   */
  addScaleFactorLabel(group, scaleFactor, settings) {
    group.append('text')
      .attr('x', settings.spacing / 2)
      .attr('y', 200)
      .attr('text-anchor', 'middle')
      .attr('font-size', '14')
      .attr('font-weight', 'bold')
      .attr('fill', '#8e44ad')
      .text(`Scale Factor: ${scaleFactor}`);
  }
  
  /**
   * Create a ratio comparison layout
   */
  renderRatioComparison(layer, shape1, shape2, ratios, options = {}) {
    const settings = { ...this.options, ...options };
    
    // Render the basic comparison
    const comparisonGroup = this.renderComparison(layer, shape1, shape2, 'proportion', settings);
    
    // Add ratio information
    const ratioGroup = comparisonGroup.append('g').attr('class', 'ratio-info');
    
    let yOffset = 150;
    ratios.forEach((ratio, index) => {
      ratioGroup.append('text')
        .attr('x', settings.spacing / 2)
        .attr('y', yOffset + index * 20)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12')
        .attr('fill', '#7f8c8d')
        .text(`${ratio.label}: ${ratio.value1} : ${ratio.value2} = ${(ratio.value1 / ratio.value2).toFixed(2)}`);
    });
    
    return comparisonGroup;
  }
  
  /**
   * Create an overlay comparison (shapes on top of each other)
   */
  renderOverlayComparison(layer, shape1, shape2, options = {}) {
    const settings = {
      ...this.options,
      shape1Opacity: 0.6,
      shape2Opacity: 0.6,
      ...options
    };
    
    const overlayGroup = layer.append('g').attr('class', 'overlay-comparison');
    
    // Render first shape
    const styledShape1 = this.cloneShape(shape1);
    styledShape1.setStyle({
      fill: this.hexToRgba(settings.shape1Color, settings.shape1Opacity),
      stroke: settings.shape1Color,
      strokeWidth: 2
    });
    styledShape1.render(overlayGroup);
    
    // Render second shape on top
    const styledShape2 = this.cloneShape(shape2);
    styledShape2.setStyle({
      fill: this.hexToRgba(settings.shape2Color, settings.shape2Opacity),
      stroke: settings.shape2Color,
      strokeWidth: 2
    });
    styledShape2.render(overlayGroup);
    
    return overlayGroup;
  }
}

export default ComparisonLayout;