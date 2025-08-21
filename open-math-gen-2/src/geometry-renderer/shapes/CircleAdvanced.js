import { BaseShape } from './BaseShape.js';

/**
 * CircleAdvanced - Enhanced circle with support for arcs, sectors, chords, and tangents
 */
export class CircleAdvanced extends BaseShape {
  constructor(x = 0, y = 0, radius = 50) {
    super(x, y);
    this.radius = radius;
    this.showCenter = false;
    this.centerPointStyle = {
      radius: 2,
      fill: '#2c3e50',
      stroke: 'white',
      strokeWidth: 1
    };
  }
  
  /**
   * Set radius of the circle
   */
  setRadius(radius) {
    this.radius = radius;
    return this;
  }
  
  /**
   * Set whether to show center point
   */
  setShowCenter(show) {
    this.showCenter = show;
    return this;
  }
  
  /**
   * Render the circle
   */
  render(layer) {
    const circleGroup = layer.append('g')
      .attr('class', 'circle-advanced')
      .attr('transform', this.getTransform());
    
    // Render main circle
    const circle = circleGroup.append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', this.radius);
    
    this.applyStyle(circle);
    
    // Render center point if enabled
    if (this.showCenter) {
      circleGroup.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', this.centerPointStyle.radius)
        .attr('fill', this.centerPointStyle.fill)
        .attr('stroke', this.centerPointStyle.stroke)
        .attr('stroke-width', this.centerPointStyle.strokeWidth);
    }
    
    return this;
  }
  
  /**
   * Get bounding box
   */
  getBounds() {
    return {
      x: this.x - this.radius,
      y: this.y - this.radius,
      width: this.radius * 2,
      height: this.radius * 2
    };
  }
  
  /**
   * Get measurement points for circle
   */
  getMeasurementPoints(type, options) {
    switch (type) {
      case 'radius':
        return {
          x1: this.x,
          y1: this.y,
          x2: this.x + this.radius,
          y2: this.y,
          label: options.label || `r = ${this.radius}`
        };
        
      case 'diameter':
        return {
          x1: this.x - this.radius,
          y1: this.y + this.radius + 25,
          x2: this.x + this.radius,
          y2: this.y + this.radius + 25,
          label: options.label || `d = ${this.radius * 2}`
        };
        
      case 'circumference':
        return {
          x1: this.x - this.radius - 30,
          y1: this.y - this.radius,
          x2: this.x - this.radius - 30,
          y2: this.y + this.radius,
          label: options.label || `C = 2πr`
        };
        
      case 'area':
        return {
          x1: this.x,
          y1: this.y,
          x2: this.x,
          y2: this.y,
          label: options.label || `A = πr²`
        };
        
      default:
        return super.getMeasurementPoints(type, options);
    }
  }
  
  /**
   * Render measurement for circle
   */
  renderMeasurement(layer, measurement, measurementSystem) {
    const points = this.getMeasurementPoints(measurement.type, measurement.options);
    
    if (points) {
      measurementSystem.drawMeasurement(
        layer,
        points.x1, points.y1,
        points.x2, points.y2,
        points.label,
        measurement.options
      );
    }
  }
  
  /**
   * Calculate area
   */
  getArea() {
    return Math.PI * this.radius * this.radius;
  }
  
  /**
   * Calculate circumference
   */
  getCircumference() {
    return 2 * Math.PI * this.radius;
  }
}

/**
 * Arc - Portion of a circle's circumference
 */
export class Arc extends BaseShape {
  constructor(x = 0, y = 0, radius = 50, startAngle = 0, endAngle = Math.PI) {
    super(x, y);
    this.radius = radius;
    this.startAngle = startAngle; // in radians
    this.endAngle = endAngle;
    this.showEndpoints = true;
    this.endpointRadius = 3;
  }
  
  /**
   * Set arc parameters
   */
  setArc(radius, startAngle, endAngle) {
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    return this;
  }
  
  /**
   * Set arc angles in degrees
   */
  setArcDegrees(startDegrees, endDegrees) {
    this.startAngle = startDegrees * Math.PI / 180;
    this.endAngle = endDegrees * Math.PI / 180;
    return this;
  }
  
  /**
   * Render the arc
   */
  render(layer) {
    const arcGroup = layer.append('g')
      .attr('class', 'arc')
      .attr('transform', this.getTransform());
    
    // Calculate arc path
    const startX = Math.cos(this.startAngle) * this.radius;
    const startY = Math.sin(this.startAngle) * this.radius;
    const endX = Math.cos(this.endAngle) * this.radius;
    const endY = Math.sin(this.endAngle) * this.radius;
    
    const largeArcFlag = (this.endAngle - this.startAngle) > Math.PI ? 1 : 0;
    
    const pathData = `M ${startX} ${startY} A ${this.radius} ${this.radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
    
    // Render arc
    arcGroup.append('path')
      .attr('d', pathData)
      .attr('fill', 'none')
      .attr('stroke', this.style.stroke)
      .attr('stroke-width', this.style.strokeWidth);
    
    // Render endpoints
    if (this.showEndpoints) {
      arcGroup.append('circle')
        .attr('cx', startX)
        .attr('cy', startY)
        .attr('r', this.endpointRadius)
        .attr('fill', this.style.stroke);
      
      arcGroup.append('circle')
        .attr('cx', endX)
        .attr('cy', endY)
        .attr('r', this.endpointRadius)
        .attr('fill', this.style.stroke);
    }
    
    return this;
  }
  
  /**
   * Get bounding box
   */
  getBounds() {
    return {
      x: this.x - this.radius,
      y: this.y - this.radius,
      width: this.radius * 2,
      height: this.radius * 2
    };
  }
  
  /**
   * Calculate arc length
   */
  getArcLength() {
    const angleSpan = Math.abs(this.endAngle - this.startAngle);
    return this.radius * angleSpan;
  }
  
  /**
   * Get measurement points for arc
   */
  getMeasurementPoints(type, options) {
    const midAngle = (this.startAngle + this.endAngle) / 2;
    const midX = this.x + Math.cos(midAngle) * (this.radius + 20);
    const midY = this.y + Math.sin(midAngle) * (this.radius + 20);
    
    switch (type) {
      case 'arc-length':
        return {
          x1: midX,
          y1: midY,
          x2: midX,
          y2: midY,
          label: options.label || `s = ${this.getArcLength().toFixed(1)}`
        };
        
      case 'central-angle':
        return {
          x1: this.x,
          y1: this.y,
          x2: this.x,
          y2: this.y,
          label: options.label || `θ = ${((this.endAngle - this.startAngle) * 180 / Math.PI).toFixed(1)}°`
        };
        
      default:
        return super.getMeasurementPoints(type, options);
    }
  }
}

/**
 * Sector - Portion of a circle enclosed by two radii and an arc
 */
export class Sector extends BaseShape {
  constructor(x = 0, y = 0, radius = 50, startAngle = 0, endAngle = Math.PI/2) {
    super(x, y);
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.showRadii = true;
  }
  
  /**
   * Set sector parameters
   */
  setSector(radius, startAngle, endAngle) {
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    return this;
  }
  
  /**
   * Render the sector
   */
  render(layer) {
    const sectorGroup = layer.append('g')
      .attr('class', 'sector')
      .attr('transform', this.getTransform());
    
    // Calculate sector path
    const startX = Math.cos(this.startAngle) * this.radius;
    const startY = Math.sin(this.startAngle) * this.radius;
    const endX = Math.cos(this.endAngle) * this.radius;
    const endY = Math.sin(this.endAngle) * this.radius;
    
    const largeArcFlag = (this.endAngle - this.startAngle) > Math.PI ? 1 : 0;
    
    const pathData = `M 0 0 L ${startX} ${startY} A ${this.radius} ${this.radius} 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;
    
    // Render sector
    const sector = sectorGroup.append('path')
      .attr('d', pathData);
    
    this.applyStyle(sector);
    
    return this;
  }
  
  /**
   * Get bounding box
   */
  getBounds() {
    return {
      x: this.x - this.radius,
      y: this.y - this.radius,
      width: this.radius * 2,
      height: this.radius * 2
    };
  }
  
  /**
   * Calculate sector area
   */
  getSectorArea() {
    const angleSpan = Math.abs(this.endAngle - this.startAngle);
    return 0.5 * this.radius * this.radius * angleSpan;
  }
  
  /**
   * Get measurement points for sector
   */
  getMeasurementPoints(type, options) {
    const midAngle = (this.startAngle + this.endAngle) / 2;
    const midRadius = this.radius * 0.7;
    const midX = this.x + Math.cos(midAngle) * midRadius;
    const midY = this.y + Math.sin(midAngle) * midRadius;
    
    switch (type) {
      case 'sector-area':
        return {
          x1: midX,
          y1: midY,
          x2: midX,
          y2: midY,
          label: options.label || `A = ${this.getSectorArea().toFixed(1)}`
        };
        
      default:
        return super.getMeasurementPoints(type, options);
    }
  }
}

/**
 * Chord - Line segment connecting two points on a circle
 */
export class Chord extends BaseShape {
  constructor(x = 0, y = 0, radius = 50, startAngle = 0, endAngle = Math.PI/3) {
    super(x, y);
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.showCircle = true;
    this.circleStyle = {
      fill: 'none',
      stroke: '#bdc3c7',
      strokeWidth: 1
    };
  }
  
  /**
   * Render the chord
   */
  render(layer) {
    const chordGroup = layer.append('g')
      .attr('class', 'chord')
      .attr('transform', this.getTransform());
    
    // Render circle outline if enabled
    if (this.showCircle) {
      chordGroup.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', this.radius)
        .attr('fill', this.circleStyle.fill)
        .attr('stroke', this.circleStyle.stroke)
        .attr('stroke-width', this.circleStyle.strokeWidth);
    }
    
    // Calculate chord endpoints
    const startX = Math.cos(this.startAngle) * this.radius;
    const startY = Math.sin(this.startAngle) * this.radius;
    const endX = Math.cos(this.endAngle) * this.radius;
    const endY = Math.sin(this.endAngle) * this.radius;
    
    // Render chord line
    const chord = chordGroup.append('line')
      .attr('x1', startX)
      .attr('y1', startY)
      .attr('x2', endX)
      .attr('y2', endY);
    
    this.applyStyle(chord);
    
    // Render endpoints
    chordGroup.append('circle')
      .attr('cx', startX)
      .attr('cy', startY)
      .attr('r', 3)
      .attr('fill', this.style.stroke);
    
    chordGroup.append('circle')
      .attr('cx', endX)
      .attr('cy', endY)
      .attr('r', 3)
      .attr('fill', this.style.stroke);
    
    return this;
  }
  
  /**
   * Get chord length
   */
  getChordLength() {
    const startX = Math.cos(this.startAngle) * this.radius;
    const startY = Math.sin(this.startAngle) * this.radius;
    const endX = Math.cos(this.endAngle) * this.radius;
    const endY = Math.sin(this.endAngle) * this.radius;
    
    const dx = endX - startX;
    const dy = endY - startY;
    
    return Math.sqrt(dx * dx + dy * dy);
  }
  
  /**
   * Get bounding box
   */
  getBounds() {
    return {
      x: this.x - this.radius,
      y: this.y - this.radius,
      width: this.radius * 2,
      height: this.radius * 2
    };
  }
  
  /**
   * Get measurement points for chord
   */
  getMeasurementPoints(type, options) {
    const midAngle = (this.startAngle + this.endAngle) / 2;
    const midX = this.x + Math.cos(midAngle) * (this.radius + 20);
    const midY = this.y + Math.sin(midAngle) * (this.radius + 20);
    
    switch (type) {
      case 'chord-length':
        return {
          x1: midX,
          y1: midY,
          x2: midX,
          y2: midY,
          label: options.label || `c = ${this.getChordLength().toFixed(1)}`
        };
        
      default:
        return super.getMeasurementPoints(type, options);
    }
  }
}

/**
 * Tangent - Line that touches a circle at exactly one point
 */
export class Tangent extends BaseShape {
  constructor(x = 0, y = 0, radius = 50, angle = 0, length = 100) {
    super(x, y);
    this.radius = radius;
    this.angle = angle; // Angle where tangent touches circle
    this.length = length; // Length of tangent line to draw
    this.showCircle = true;
    this.showTouchPoint = true;
    this.circleStyle = {
      fill: 'none',
      stroke: '#bdc3c7',
      strokeWidth: 1
    };
  }
  
  /**
   * Render the tangent
   */
  render(layer) {
    const tangentGroup = layer.append('g')
      .attr('class', 'tangent')
      .attr('transform', this.getTransform());
    
    // Render circle outline if enabled
    if (this.showCircle) {
      tangentGroup.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', this.radius)
        .attr('fill', this.circleStyle.fill)
        .attr('stroke', this.circleStyle.stroke)
        .attr('stroke-width', this.circleStyle.strokeWidth);
    }
    
    // Calculate touch point
    const touchX = Math.cos(this.angle) * this.radius;
    const touchY = Math.sin(this.angle) * this.radius;
    
    // Calculate tangent direction (perpendicular to radius)
    const tangentAngle = this.angle + Math.PI / 2;
    const dx = Math.cos(tangentAngle) * this.length / 2;
    const dy = Math.sin(tangentAngle) * this.length / 2;
    
    // Render tangent line
    const tangent = tangentGroup.append('line')
      .attr('x1', touchX - dx)
      .attr('y1', touchY - dy)
      .attr('x2', touchX + dx)
      .attr('y2', touchY + dy);
    
    this.applyStyle(tangent);
    
    // Render touch point
    if (this.showTouchPoint) {
      tangentGroup.append('circle')
        .attr('cx', touchX)
        .attr('cy', touchY)
        .attr('r', 3)
        .attr('fill', '#e74c3c')
        .attr('stroke', 'white')
        .attr('stroke-width', 1);
    }
    
    // Render radius to touch point (to show perpendicular relationship)
    tangentGroup.append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', touchX)
      .attr('y2', touchY)
      .attr('stroke', '#95a5a6')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '3,3');
    
    return this;
  }
  
  /**
   * Get bounding box
   */
  getBounds() {
    const maxRadius = this.radius + this.length / 2;
    return {
      x: this.x - maxRadius,
      y: this.y - maxRadius,
      width: maxRadius * 2,
      height: maxRadius * 2
    };
  }
}

export { CircleAdvanced as default, Arc, Sector, Chord, Tangent };