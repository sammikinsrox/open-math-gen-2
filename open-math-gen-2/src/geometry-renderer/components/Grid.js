/**
 * Grid component for drawing background grids and coordinate systems
 */
export class Grid {
  constructor(options = {}) {
    this.options = {
      gridSize: 20,
      showGrid: true,
      showAxes: false,
      gridColor: '#dee2e6',
      gridOpacity: 0.5,
      gridWidth: 0.5,
      axisColor: '#6c757d',
      axisWidth: 1,
      ...options
    };
  }
  
  /**
   * Render grid to the specified layer
   */
  render(layer, width, height) {
    if (!this.options.showGrid && !this.options.showAxes) return;
    
    const gridGroup = layer.append('g').attr('class', 'grid-layer');
    
    if (this.options.showGrid) {
      this.renderGrid(gridGroup, width, height);
    }
    
    if (this.options.showAxes) {
      this.renderAxes(gridGroup, width, height);
    }
    
    return gridGroup;
  }
  
  /**
   * Render grid lines
   */
  renderGrid(group, width, height) {
    const gridSize = this.options.gridSize;
    
    // Vertical grid lines
    for (let x = 0; x <= width; x += gridSize) {
      group.append('line')
        .attr('x1', x)
        .attr('y1', 0)
        .attr('x2', x)
        .attr('y2', height)
        .attr('class', 'grid-line')
        .attr('stroke', this.options.gridColor)
        .attr('stroke-width', this.options.gridWidth)
        .attr('opacity', this.options.gridOpacity);
    }
    
    // Horizontal grid lines
    for (let y = 0; y <= height; y += gridSize) {
      group.append('line')
        .attr('x1', 0)
        .attr('y1', y)
        .attr('x2', width)
        .attr('y2', y)
        .attr('class', 'grid-line')
        .attr('stroke', this.options.gridColor)
        .attr('stroke-width', this.options.gridWidth)
        .attr('opacity', this.options.gridOpacity);
    }
  }
  
  /**
   * Render coordinate axes
   */
  renderAxes(group, width, height) {
    const centerX = width / 2;
    const centerY = height / 2;
    
    // X-axis
    group.append('line')
      .attr('x1', 0)
      .attr('y1', centerY)
      .attr('x2', width)
      .attr('y2', centerY)
      .attr('class', 'axis-line x-axis')
      .attr('stroke', this.options.axisColor)
      .attr('stroke-width', this.options.axisWidth);
    
    // Y-axis
    group.append('line')
      .attr('x1', centerX)
      .attr('y1', 0)
      .attr('x2', centerX)
      .attr('y2', height)
      .attr('class', 'axis-line y-axis')
      .attr('stroke', this.options.axisColor)
      .attr('stroke-width', this.options.axisWidth);
    
    // Add axis labels if enabled
    if (this.options.showAxisLabels) {
      this.renderAxisLabels(group, width, height, centerX, centerY);
    }
    
    // Add tick marks if enabled
    if (this.options.showTicks) {
      this.renderTicks(group, width, height, centerX, centerY);
    }
  }
  
  /**
   * Render axis labels
   */
  renderAxisLabels(group, width, height, centerX, centerY) {
    const labelOffset = 15;
    
    // X-axis label
    group.append('text')
      .attr('x', width - 10)
      .attr('y', centerY - 5)
      .attr('text-anchor', 'end')
      .attr('class', 'axis-label x-label')
      .style('font-size', '12px')
      .style('fill', this.options.axisColor)
      .text('x');
    
    // Y-axis label
    group.append('text')
      .attr('x', centerX + 5)
      .attr('y', 15)
      .attr('text-anchor', 'start')
      .attr('class', 'axis-label y-label')
      .style('font-size', '12px')
      .style('fill', this.options.axisColor)
      .text('y');
    
    // Origin label
    group.append('text')
      .attr('x', centerX - 10)
      .attr('y', centerY + 15)
      .attr('text-anchor', 'end')
      .attr('class', 'axis-label origin-label')
      .style('font-size', '12px')
      .style('fill', this.options.axisColor)
      .text('0');
  }
  
  /**
   * Render tick marks on axes
   */
  renderTicks(group, width, height, centerX, centerY) {
    const tickSize = 5;
    const tickSpacing = this.options.gridSize || 20;
    
    // X-axis ticks
    for (let x = tickSpacing; x < width; x += tickSpacing) {
      if (Math.abs(x - centerX) < tickSpacing / 2) continue; // Skip origin
      
      group.append('line')
        .attr('x1', x)
        .attr('y1', centerY - tickSize)
        .attr('x2', x)
        .attr('y2', centerY + tickSize)
        .attr('class', 'tick-mark x-tick')
        .attr('stroke', this.options.axisColor)
        .attr('stroke-width', 1);
      
      // Tick labels
      if (this.options.showTickLabels) {
        const value = Math.round((x - centerX) / tickSpacing);
        if (value !== 0) {
          group.append('text')
            .attr('x', x)
            .attr('y', centerY + 15)
            .attr('text-anchor', 'middle')
            .attr('class', 'tick-label')
            .style('font-size', '10px')
            .style('fill', this.options.axisColor)
            .text(value);
        }
      }
    }
    
    // Y-axis ticks
    for (let y = tickSpacing; y < height; y += tickSpacing) {
      if (Math.abs(y - centerY) < tickSpacing / 2) continue; // Skip origin
      
      group.append('line')
        .attr('x1', centerX - tickSize)
        .attr('y1', y)
        .attr('x2', centerX + tickSize)
        .attr('y2', y)
        .attr('class', 'tick-mark y-tick')
        .attr('stroke', this.options.axisColor)
        .attr('stroke-width', 1);
      
      // Tick labels
      if (this.options.showTickLabels) {
        const value = Math.round((centerY - y) / tickSpacing);
        if (value !== 0) {
          group.append('text')
            .attr('x', centerX - 10)
            .attr('y', y + 3)
            .attr('text-anchor', 'end')
            .attr('class', 'tick-label')
            .style('font-size', '10px')
            .style('fill', this.options.axisColor)
            .text(value);
        }
      }
    }
  }
  
  /**
   * Update grid options
   */
  updateOptions(newOptions) {
    this.options = { ...this.options, ...newOptions };
    return this;
  }
  
  /**
   * Convert grid coordinates to pixel coordinates
   */
  gridToPixel(gridX, gridY, width, height) {
    const centerX = width / 2;
    const centerY = height / 2;
    const gridSize = this.options.gridSize;
    
    return {
      x: centerX + gridX * gridSize,
      y: centerY - gridY * gridSize
    };
  }
  
  /**
   * Convert pixel coordinates to grid coordinates
   */
  pixelToGrid(pixelX, pixelY, width, height) {
    const centerX = width / 2;
    const centerY = height / 2;
    const gridSize = this.options.gridSize;
    
    return {
      x: (pixelX - centerX) / gridSize,
      y: (centerY - pixelY) / gridSize
    };
  }
  
  /**
   * Snap coordinates to grid
   */
  snapToGrid(x, y) {
    const gridSize = this.options.gridSize;
    return {
      x: Math.round(x / gridSize) * gridSize,
      y: Math.round(y / gridSize) * gridSize
    };
  }
}

export default Grid;