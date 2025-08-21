import { Shape3D } from './Shape3D.js';

/**
 * Cylinder - 3D cylinder shape with circular base and top
 */
export class Cylinder extends Shape3D {
  constructor(x = 0, y = 0, z = 0, radius = 50, height = 100) {
    super(x, y, z);
    this.radius = radius;
    this.height = height;
    this.segments = 16; // Number of segments for circular approximation
  }
  
  /**
   * Set dimensions of the cylinder
   */
  setDimensions(radius, height) {
    this.radius = radius;
    this.height = height;
    return this;
  }
  
  /**
   * Set number of segments for circular approximation
   */
  setSegments(segments) {
    this.segments = Math.max(6, segments);
    return this;
  }
  
  /**
   * Get vertices for cylinder (circular approximation)
   */
  getVertices3D() {
    const vertices = [];
    const h = this.height / 2;
    
    // Generate vertices for top and bottom circles
    for (let i = 0; i < this.segments; i++) {
      const angle = (2 * Math.PI * i) / this.segments;
      const x = this.radius * Math.cos(angle);
      const z = this.radius * Math.sin(angle);
      
      // Bottom circle vertices
      vertices.push({ x, y: -h, z });
      // Top circle vertices  
      vertices.push({ x, y: h, z });
    }
    
    // Add center points for top and bottom
    vertices.push({ x: 0, y: -h, z: 0 }); // Bottom center
    vertices.push({ x: 0, y: h, z: 0 });  // Top center
    
    return vertices;
  }
  
  /**
   * Get face definitions for cylinder
   */
  getFaces() {
    const faces = [];
    const bottomCenter = this.segments * 2;
    const topCenter = this.segments * 2 + 1;
    
    // Side faces (rectangles between top and bottom circles)
    for (let i = 0; i < this.segments; i++) {
      const next = (i + 1) % this.segments;
      const bottomCurrent = i * 2;
      const topCurrent = i * 2 + 1;
      const bottomNext = next * 2;
      const topNext = next * 2 + 1;
      
      // Each side face is a quad
      faces.push([bottomCurrent, bottomNext, topNext, topCurrent]);
    }
    
    // Bottom face (triangular fans from center)
    for (let i = 0; i < this.segments; i++) {
      const next = (i + 1) % this.segments;
      faces.push([bottomCenter, i * 2, next * 2]);
    }
    
    // Top face (triangular fans from center)
    for (let i = 0; i < this.segments; i++) {
      const next = (i + 1) % this.segments;
      faces.push([topCenter, next * 2 + 1, i * 2 + 1]);
    }
    
    return faces;
  }
  
  /**
   * Get edge definitions for cylinder
   */
  getEdges() {
    const edges = [];
    
    // Bottom circle edges
    for (let i = 0; i < this.segments; i++) {
      const next = (i + 1) % this.segments;
      edges.push([i * 2, next * 2]);
    }
    
    // Top circle edges
    for (let i = 0; i < this.segments; i++) {
      const next = (i + 1) % this.segments;
      edges.push([i * 2 + 1, next * 2 + 1]);
    }
    
    // Vertical edges connecting top and bottom
    for (let i = 0; i < this.segments; i++) {
      edges.push([i * 2, i * 2 + 1]);
    }
    
    return edges;
  }
  
  /**
   * Override rendering for cylinder to handle curved surfaces
   */
  render(layer) {
    const vertices = this.getVertices3D();
    const projected = vertices.map(v => this.project3DTo2D(v.x, v.y, v.z));
    
    // Create group for cylinder
    const shapeGroup = layer.append('g')
      .attr('class', 'shape-3d cylinder')
      .attr('transform', this.getTransform());
    
    // Render bottom ellipse (always visible from isometric view)
    this.renderBottomEllipse(shapeGroup, projected);
    
    // Render side surface
    this.renderSideSurface(shapeGroup, projected);
    
    // Render top ellipse
    this.renderTopEllipse(shapeGroup, projected);
    
    return this;
  }
  
  /**
   * Render bottom ellipse of cylinder
   */
  renderBottomEllipse(group, projected) {
    const bottomCenter = projected[this.segments * 2];
    
    // Calculate ellipse parameters for isometric view
    const rx = this.radius * this.projection.scale;
    const ry = rx * Math.sin(this.projection.angle * Math.PI / 180);
    
    group.append('ellipse')
      .attr('cx', bottomCenter.x)
      .attr('cy', bottomCenter.y)
      .attr('rx', rx)
      .attr('ry', ry)
      .attr('fill', this.style.frontFace)
      .attr('stroke', this.style.edgeColor)
      .attr('stroke-width', this.style.edgeWidth);
  }
  
  /**
   * Render top ellipse of cylinder
   */
  renderTopEllipse(group, projected) {
    const topCenter = projected[this.segments * 2 + 1];
    
    // Calculate ellipse parameters for isometric view
    const rx = this.radius * this.projection.scale;
    const ry = rx * Math.sin(this.projection.angle * Math.PI / 180);
    
    group.append('ellipse')
      .attr('cx', topCenter.x)
      .attr('cy', topCenter.y)
      .attr('rx', rx)
      .attr('ry', ry)
      .attr('fill', this.style.topFace)
      .attr('stroke', this.style.edgeColor)
      .attr('stroke-width', this.style.edgeWidth);
  }
  
  /**
   * Render side surface of cylinder
   */
  renderSideSurface(group, projected) {
    // Create curved side surface using path
    const visibleSegments = this.getVisibleSegments();
    
    visibleSegments.forEach(segmentIndex => {
      const bottomIndex = segmentIndex * 2;
      const topIndex = segmentIndex * 2 + 1;
      const nextBottom = ((segmentIndex + 1) % this.segments) * 2;
      const nextTop = ((segmentIndex + 1) % this.segments) * 2 + 1;
      
      const points = [
        projected[bottomIndex],
        projected[nextBottom], 
        projected[nextTop],
        projected[topIndex]
      ].map(p => `${p.x},${p.y}`).join(' ');
      
      group.append('polygon')
        .attr('points', points)
        .attr('fill', this.style.rightFace)
        .attr('stroke', this.style.edgeColor)
        .attr('stroke-width', this.style.edgeWidth);
    });
  }
  
  /**
   * Determine which segments of the cylinder are visible
   */
  getVisibleSegments() {
    // For isometric view, show roughly the front half
    const visible = [];
    const startAngle = this.segments * 0.25;
    const endAngle = this.segments * 0.75;
    
    for (let i = Math.floor(startAngle); i < Math.ceil(endAngle); i++) {
      visible.push(i % this.segments);
    }
    
    return visible;
  }
  
  /**
   * Get measurement points for cylinder
   */
  getMeasurementPoints(type, options) {
    const vertices = this.getVertices3D();
    const projected = vertices.map(v => this.project3DTo2D(v.x, v.y, v.z));
    const bottomCenter = projected[this.segments * 2];
    const topCenter = projected[this.segments * 2 + 1];
    
    switch (type) {
      case 'radius':
        // Measure from center to edge of bottom circle
        const radiusEnd = projected[0]; // First vertex on bottom circle
        return {
          x1: bottomCenter.x,
          y1: bottomCenter.y,
          x2: radiusEnd.x,
          y2: radiusEnd.y,
          label: options.label || `r = ${this.radius}`
        };
        
      case 'diameter':
        // Measure across bottom circle
        const leftPoint = projected[this.segments / 2 * 2]; // Opposite side
        const rightPoint = projected[0];
        return {
          x1: leftPoint.x,
          y1: leftPoint.y + 25,
          x2: rightPoint.x,
          y2: rightPoint.y + 25,
          label: options.label || `d = ${this.radius * 2}`
        };
        
      case 'height':
        // Measure from bottom to top
        return {
          x1: bottomCenter.x - 30,
          y1: bottomCenter.y,
          x2: topCenter.x - 30,
          y2: topCenter.y,
          label: options.label || `h = ${this.height}`
        };
        
      case 'volume':
        // Place volume label in center
        const center = this.project3DTo2D(0, 0, 0);
        return {
          x1: center.x,
          y1: center.y,
          x2: center.x,
          y2: center.y,
          label: options.label || `V = πr²h`
        };
        
      default:
        return super.getMeasurementPoints(type, options);
    }
  }
  
  /**
   * Calculate surface area
   */
  getSurfaceArea() {
    return 2 * Math.PI * this.radius * (this.radius + this.height);
  }
  
  /**
   * Calculate volume
   */
  getVolume() {
    return Math.PI * this.radius * this.radius * this.height;
  }
}

export default Cylinder;