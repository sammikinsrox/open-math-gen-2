import { Shape3D } from './Shape3D.js';

/**
 * Cone - 3D cone shape with circular base and apex
 */
export class Cone extends Shape3D {
  constructor(x = 0, y = 0, z = 0, radius = 50, height = 100) {
    super(x, y, z);
    this.radius = radius;
    this.height = height;
    this.segments = 16; // Number of segments for circular approximation
  }
  
  /**
   * Set dimensions of the cone
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
   * Get vertices for cone
   */
  getVertices3D() {
    const vertices = [];
    const h = this.height / 2;
    
    // Generate vertices for base circle
    for (let i = 0; i < this.segments; i++) {
      const angle = (2 * Math.PI * i) / this.segments;
      const x = this.radius * Math.cos(angle);
      const z = this.radius * Math.sin(angle);
      
      // Base circle vertices
      vertices.push({ x, y: -h, z });
    }
    
    // Add center point for base and apex
    vertices.push({ x: 0, y: -h, z: 0 }); // Base center
    vertices.push({ x: 0, y: h, z: 0 });  // Apex
    
    return vertices;
  }
  
  /**
   * Get face definitions for cone
   */
  getFaces() {
    const faces = [];
    const baseCenter = this.segments;
    const apex = this.segments + 1;
    
    // Side faces (triangles from base edge to apex)
    for (let i = 0; i < this.segments; i++) {
      const next = (i + 1) % this.segments;
      faces.push([i, next, apex]);
    }
    
    // Base face (triangular fans from center)
    for (let i = 0; i < this.segments; i++) {
      const next = (i + 1) % this.segments;
      faces.push([baseCenter, next, i]);
    }
    
    return faces;
  }
  
  /**
   * Get edge definitions for cone
   */
  getEdges() {
    const edges = [];
    const apex = this.segments + 1;
    
    // Base circle edges
    for (let i = 0; i < this.segments; i++) {
      const next = (i + 1) % this.segments;
      edges.push([i, next]);
    }
    
    // Edges from base to apex
    for (let i = 0; i < this.segments; i++) {
      edges.push([i, apex]);
    }
    
    return edges;
  }
  
  /**
   * Override rendering for cone to handle curved base
   */
  render(layer) {
    const vertices = this.getVertices3D();
    const projected = vertices.map(v => this.project3DTo2D(v.x, v.y, v.z));
    
    // Create group for cone
    const shapeGroup = layer.append('g')
      .attr('class', 'shape-3d cone')
      .attr('transform', this.getTransform());
    
    // Render base ellipse
    this.renderBaseEllipse(shapeGroup, projected);
    
    // Render side surface
    this.renderSideSurface(shapeGroup, projected);
    
    return this;
  }
  
  /**
   * Render base ellipse of cone
   */
  renderBaseEllipse(group, projected) {
    const baseCenter = projected[this.segments];
    
    // Calculate ellipse parameters for isometric view
    const rx = this.radius * this.projection.scale;
    const ry = rx * Math.sin(this.projection.angle * Math.PI / 180);
    
    group.append('ellipse')
      .attr('cx', baseCenter.x)
      .attr('cy', baseCenter.y)
      .attr('rx', rx)
      .attr('ry', ry)
      .attr('fill', this.style.frontFace)
      .attr('stroke', this.style.edgeColor)
      .attr('stroke-width', this.style.edgeWidth);
  }
  
  /**
   * Render side surface of cone
   */
  renderSideSurface(group, projected) {
    const apex = projected[this.segments + 1];
    const visibleSegments = this.getVisibleSegments();
    
    visibleSegments.forEach(segmentIndex => {
      const current = segmentIndex;
      const next = (segmentIndex + 1) % this.segments;
      
      const points = [
        projected[current],
        projected[next],
        apex
      ].map(p => `${p.x},${p.y}`).join(' ');
      
      group.append('polygon')
        .attr('points', points)
        .attr('fill', this.style.rightFace)
        .attr('stroke', this.style.edgeColor)
        .attr('stroke-width', this.style.edgeWidth);
    });
    
    // Add outline for the visible edge of the base
    const visibleEdgeStart = Math.floor(this.segments * 0.25);
    const visibleEdgeEnd = Math.ceil(this.segments * 0.75);
    
    const pathData = [];
    for (let i = visibleEdgeStart; i <= visibleEdgeEnd; i++) {
      const index = i % this.segments;
      const point = projected[index];
      pathData.push(i === visibleEdgeStart ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`);
    }
    
    group.append('path')
      .attr('d', pathData.join(' '))
      .attr('fill', 'none')
      .attr('stroke', this.style.edgeColor)
      .attr('stroke-width', this.style.edgeWidth);
  }
  
  /**
   * Determine which segments of the cone are visible
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
   * Get measurement points for cone
   */
  getMeasurementPoints(type, options) {
    const vertices = this.getVertices3D();
    const projected = vertices.map(v => this.project3DTo2D(v.x, v.y, v.z));
    const baseCenter = projected[this.segments];
    const apex = projected[this.segments + 1];
    
    switch (type) {
      case 'radius':
        // Measure from center to edge of base
        const radiusEnd = projected[0]; // First vertex on base circle
        return {
          x1: baseCenter.x,
          y1: baseCenter.y,
          x2: radiusEnd.x,
          y2: radiusEnd.y,
          label: options.label || `r = ${this.radius}`
        };
        
      case 'diameter':
        // Measure across base
        const leftPoint = projected[this.segments / 2]; // Opposite side
        const rightPoint = projected[0];
        return {
          x1: leftPoint.x,
          y1: leftPoint.y + 25,
          x2: rightPoint.x,
          y2: rightPoint.y + 25,
          label: options.label || `d = ${this.radius * 2}`
        };
        
      case 'height':
        // Measure from base center to apex
        return {
          x1: baseCenter.x - 30,
          y1: baseCenter.y,
          x2: apex.x - 30,
          y2: apex.y,
          label: options.label || `h = ${this.height}`
        };
        
      case 'slant-height':
        // Measure from base edge to apex
        const baseEdge = projected[this.segments / 4]; // Side point
        return {
          x1: baseEdge.x + 15,
          y1: baseEdge.y + 15,
          x2: apex.x + 15,
          y2: apex.y + 15,
          label: options.label || `s = ${Math.sqrt(this.radius * this.radius + this.height * this.height)}`
        };
        
      case 'volume':
        // Place volume label in center
        const center = this.project3DTo2D(0, -this.height/4, 0);
        return {
          x1: center.x,
          y1: center.y,
          x2: center.x,
          y2: center.y,
          label: options.label || `V = ⅓πr²h`
        };
        
      default:
        return super.getMeasurementPoints(type, options);
    }
  }
  
  /**
   * Calculate surface area
   */
  getSurfaceArea() {
    const slantHeight = Math.sqrt(this.radius * this.radius + this.height * this.height);
    return Math.PI * this.radius * (this.radius + slantHeight);
  }
  
  /**
   * Calculate volume
   */
  getVolume() {
    return (1/3) * Math.PI * this.radius * this.radius * this.height;
  }
  
  /**
   * Get slant height
   */
  getSlantHeight() {
    return Math.sqrt(this.radius * this.radius + this.height * this.height);
  }
}

export default Cone;