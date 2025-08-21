import * as d3 from 'd3';

/**
 * CoordinateGrid - Component for rendering coordinate plane with axis labels and grid
 */
export class CoordinateGrid {
  constructor(options = {}) {
    this.options = {
      gridSize: 20,
      showAxis: true,
      showNumbers: true,
      showGrid: true,
      axisColor: '#2c3e50',
      gridColor: '#ecf0f1',
      numberColor: '#7f8c8d',
      axisWidth: 2,
      gridWidth: 1,
      fontSize: 11,
      origin: { x: 0, y: 0 },
      xMin: -10,
      xMax: 10,
      yMin: -10,
      yMax: 10,
      tickSize: 5,
      ...options
    };
  }
  
  /**
   * Set coordinate range
   */
  setRange(xMin, xMax, yMin, yMax) {
    this.options.xMin = xMin;
    this.options.xMax = xMax;
    this.options.yMin = yMin;
    this.options.yMax = yMax;
    return this;
  }
  
  /**
   * Set origin position in canvas coordinates
   */
  setOrigin(x, y) {
    this.options.origin = { x, y };
    return this;
  }
  
  /**
   * Render the coordinate grid
   */
  render(layer, canvasWidth, canvasHeight) {
    // Calculate scale and positioning
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    
    // Auto-position origin at center if not set
    if (this.options.origin.x === 0 && this.options.origin.y === 0) {
      this.options.origin = {
        x: canvasWidth / 2,
        y: canvasHeight / 2
      };
    }
    
    const xRange = this.options.xMax - this.options.xMin;
    const yRange = this.options.yMax - this.options.yMin;
    
    this.scaleX = canvasWidth / xRange;
    this.scaleY = canvasHeight / yRange;
    
    // Use uniform scale for proper proportions
    this.scale = Math.min(this.scaleX, this.scaleY) * 0.8;
    
    // Create grid group
    const gridGroup = layer.append('g').attr('class', 'coordinate-grid');
    
    // Render grid lines
    if (this.options.showGrid) {
      this.renderGridLines(gridGroup);
    }
    
    // Render axes
    if (this.options.showAxis) {
      this.renderAxes(gridGroup);
    }
    
    // Render axis labels
    if (this.options.showNumbers) {
      this.renderAxisLabels(gridGroup);
    }
    
    return this;
  }
  
  /**
   * Render grid lines
   */
  renderGridLines(group) {
    const gridLines = group.append('g').attr('class', 'grid-lines');
    
    // Vertical grid lines
    for (let x = this.options.xMin; x <= this.options.xMax; x++) {
      if (x === 0) continue; // Skip origin line
      
      const xPos = this.coordinateToCanvas(x, 0).x;
      
      gridLines.append('line')
        .attr('x1', xPos)
        .attr('y1', this.coordinateToCanvas(0, this.options.yMin).y)
        .attr('x2', xPos)
        .attr('y2', this.coordinateToCanvas(0, this.options.yMax).y)
        .attr('stroke', this.options.gridColor)
        .attr('stroke-width', this.options.gridWidth);
    }
    
    // Horizontal grid lines
    for (let y = this.options.yMin; y <= this.options.yMax; y++) {
      if (y === 0) continue; // Skip origin line
      
      const yPos = this.coordinateToCanvas(0, y).y;
      
      gridLines.append('line')
        .attr('x1', this.coordinateToCanvas(this.options.xMin, 0).x)
        .attr('y1', yPos)
        .attr('x2', this.coordinateToCanvas(this.options.xMax, 0).x)
        .attr('y2', yPos)
        .attr('stroke', this.options.gridColor)
        .attr('stroke-width', this.options.gridWidth);
    }
  }
  
  /**
   * Render coordinate axes
   */
  renderAxes(group) {
    const axes = group.append('g').attr('class', 'coordinate-axes');
    
    // X-axis
    axes.append('line')
      .attr('x1', this.coordinateToCanvas(this.options.xMin, 0).x)
      .attr('y1', this.options.origin.y)
      .attr('x2', this.coordinateToCanvas(this.options.xMax, 0).x)
      .attr('y2', this.options.origin.y)
      .attr('stroke', this.options.axisColor)
      .attr('stroke-width', this.options.axisWidth);
    
    // Y-axis  
    axes.append('line')
      .attr('x1', this.options.origin.x)
      .attr('y1', this.coordinateToCanvas(0, this.options.yMin).y)
      .attr('x2', this.options.origin.x)
      .attr('y2', this.coordinateToCanvas(0, this.options.yMax).y)
      .attr('stroke', this.options.axisColor)
      .attr('stroke-width', this.options.axisWidth);
    
    // X-axis arrow
    axes.append('polygon')
      .attr('points', `${this.coordinateToCanvas(this.options.xMax, 0).x},${this.options.origin.y} ${this.coordinateToCanvas(this.options.xMax, 0).x - 8},${this.options.origin.y - 4} ${this.coordinateToCanvas(this.options.xMax, 0).x - 8},${this.options.origin.y + 4}`)
      .attr('fill', this.options.axisColor);
    
    // Y-axis arrow
    axes.append('polygon')
      .attr('points', `${this.options.origin.x},${this.coordinateToCanvas(0, this.options.yMax).y} ${this.options.origin.x - 4},${this.coordinateToCanvas(0, this.options.yMax).y + 8} ${this.options.origin.x + 4},${this.coordinateToCanvas(0, this.options.yMax).y + 8}`)
      .attr('fill', this.options.axisColor);
    
    // Axis labels
    axes.append('text')
      .attr('x', this.coordinateToCanvas(this.options.xMax, 0).x - 15)
      .attr('y', this.options.origin.y - 10)
      .attr('font-size', this.options.fontSize + 2)
      .attr('font-style', 'italic')
      .attr('fill', this.options.axisColor)
      .text('x');
    
    axes.append('text')
      .attr('x', this.options.origin.x + 10)
      .attr('y', this.coordinateToCanvas(0, this.options.yMax).y + 15)
      .attr('font-size', this.options.fontSize + 2)
      .attr('font-style', 'italic')
      .attr('fill', this.options.axisColor)
      .text('y');
  }
  
  /**
   * Render axis number labels
   */
  renderAxisLabels(group) {
    const labels = group.append('g').attr('class', 'axis-labels');
    
    // X-axis numbers
    for (let x = this.options.xMin; x <= this.options.xMax; x++) {
      if (x === 0) continue; // Skip origin
      
      const pos = this.coordinateToCanvas(x, 0);
      
      labels.append('text')
        .attr('x', pos.x)
        .attr('y', pos.y + 20)
        .attr('text-anchor', 'middle')
        .attr('font-size', this.options.fontSize)
        .attr('fill', this.options.numberColor)
        .text(x);
      
      // Tick mark
      labels.append('line')
        .attr('x1', pos.x)
        .attr('y1', pos.y - this.options.tickSize/2)
        .attr('x2', pos.x)
        .attr('y2', pos.y + this.options.tickSize/2)
        .attr('stroke', this.options.axisColor)
        .attr('stroke-width', 1);
    }
    
    // Y-axis numbers
    for (let y = this.options.yMin; y <= this.options.yMax; y++) {
      if (y === 0) continue; // Skip origin
      
      const pos = this.coordinateToCanvas(0, y);
      
      labels.append('text')
        .attr('x', pos.x - 15)
        .attr('y', pos.y + 5)
        .attr('text-anchor', 'middle')
        .attr('font-size', this.options.fontSize)
        .attr('fill', this.options.numberColor)
        .text(y);
      
      // Tick mark
      labels.append('line')
        .attr('x1', pos.x - this.options.tickSize/2)
        .attr('y1', pos.y)
        .attr('x2', pos.x + this.options.tickSize/2)
        .attr('y2', pos.y)
        .attr('stroke', this.options.axisColor)
        .attr('stroke-width', 1);
    }
    
    // Origin label
    labels.append('text')
      .attr('x', this.options.origin.x - 15)
      .attr('y', this.options.origin.y + 20)
      .attr('text-anchor', 'middle')
      .attr('font-size', this.options.fontSize)
      .attr('fill', this.options.numberColor)
      .text('0');
  }
  
  /**
   * Convert coordinate system point to canvas coordinates
   */
  coordinateToCanvas(x, y) {
    return {
      x: this.options.origin.x + x * this.scale,
      y: this.options.origin.y - y * this.scale // Flip Y-axis
    };
  }
  
  /**
   * Convert canvas coordinates to coordinate system point
   */
  canvasToCoordinate(canvasX, canvasY) {
    return {
      x: (canvasX - this.options.origin.x) / this.scale,
      y: (this.options.origin.y - canvasY) / this.scale // Flip Y-axis
    };
  }
  
  /**
   * Plot a point on the coordinate grid
   */
  plotPoint(layer, x, y, options = {}) {
    const settings = {
      radius: 4,
      color: '#e74c3c',
      label: null,
      labelOffset: { x: 10, y: -10 },
      ...options
    };
    
    const pos = this.coordinateToCanvas(x, y);
    
    const point = layer.append('circle')
      .attr('cx', pos.x)
      .attr('cy', pos.y)
      .attr('r', settings.radius)
      .attr('fill', settings.color)
      .attr('stroke', 'white')
      .attr('stroke-width', 1);
    
    // Add label if provided
    if (settings.label) {
      layer.append('text')
        .attr('x', pos.x + settings.labelOffset.x)
        .attr('y', pos.y + settings.labelOffset.y)
        .attr('font-size', this.options.fontSize)
        .attr('font-weight', 'bold')
        .attr('fill', settings.color)
        .text(settings.label);
    }
    
    return point;
  }
  
  /**
   * Draw a line between two coordinate points
   */
  drawLine(layer, x1, y1, x2, y2, options = {}) {
    const settings = {
      color: '#3498db',
      width: 2,
      style: 'solid',
      ...options
    };
    
    const pos1 = this.coordinateToCanvas(x1, y1);
    const pos2 = this.coordinateToCanvas(x2, y2);
    
    const line = layer.append('line')
      .attr('x1', pos1.x)
      .attr('y1', pos1.y)
      .attr('x2', pos2.x)
      .attr('y2', pos2.y)
      .attr('stroke', settings.color)
      .attr('stroke-width', settings.width);
    
    if (settings.style === 'dashed') {
      line.attr('stroke-dasharray', '5,5');
    }
    
    return line;
  }
  
  /**
   * Draw a polygon from coordinate points
   */
  drawPolygon(layer, points, options = {}) {
    const settings = {
      fill: 'rgba(52, 152, 219, 0.3)',
      stroke: '#2980b9',
      strokeWidth: 2,
      ...options
    };
    
    const canvasPoints = points.map(p => {
      const pos = this.coordinateToCanvas(p.x, p.y);
      return `${pos.x},${pos.y}`;
    }).join(' ');
    
    return layer.append('polygon')
      .attr('points', canvasPoints)
      .attr('fill', settings.fill)
      .attr('stroke', settings.stroke)
      .attr('stroke-width', settings.strokeWidth);
  }
  
  /**
   * Get coordinate bounds that are currently visible
   */
  getVisibleBounds() {
    return {
      xMin: this.options.xMin,
      xMax: this.options.xMax,
      yMin: this.options.yMin,
      yMax: this.options.yMax
    };
  }
}

export default CoordinateGrid;