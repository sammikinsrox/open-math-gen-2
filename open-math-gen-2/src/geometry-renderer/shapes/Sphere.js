import { Shape3D } from './Shape3D.js';

/**
 * Sphere - 3D sphere shape
 */
export class Sphere extends Shape3D {
  constructor(x = 0, y = 0, z = 0, radius = 50) {
    super(x, y, z);
    this.radius = radius;
    this.latitudeSegments = 8;  // Number of horizontal segments
    this.longitudeSegments = 12; // Number of vertical segments
  }
  
  /**
   * Set radius of the sphere
   */
  setRadius(radius) {
    this.radius = radius;
    return this;
  }
  
  /**
   * Set segmentation for sphere approximation
   */
  setSegments(latitude, longitude) {
    this.latitudeSegments = Math.max(4, latitude);
    this.longitudeSegments = Math.max(6, longitude);
    return this;
  }
  
  /**
   * Get vertices for sphere using spherical coordinates
   */
  getVertices3D() {
    const vertices = [];
    
    // Add top pole
    vertices.push({ x: 0, y: this.radius, z: 0 });
    
    // Add intermediate latitude rings
    for (let lat = 1; lat < this.latitudeSegments; lat++) {
      const theta = (Math.PI * lat) / this.latitudeSegments;
      const y = this.radius * Math.cos(theta);
      const ringRadius = this.radius * Math.sin(theta);
      
      for (let lon = 0; lon < this.longitudeSegments; lon++) {
        const phi = (2 * Math.PI * lon) / this.longitudeSegments;
        const x = ringRadius * Math.cos(phi);
        const z = ringRadius * Math.sin(phi);
        
        vertices.push({ x, y, z });
      }
    }
    
    // Add bottom pole
    vertices.push({ x: 0, y: -this.radius, z: 0 });
    
    return vertices;
  }
  
  /**
   * Get face definitions for sphere
   */
  getFaces() {
    const faces = [];
    const topPole = 0;
    const bottomPole = 1 + (this.latitudeSegments - 1) * this.longitudeSegments;
    
    // Top cap faces (triangles from top pole to first ring)
    for (let lon = 0; lon < this.longitudeSegments; lon++) {
      const current = 1 + lon;
      const next = 1 + ((lon + 1) % this.longitudeSegments);
      faces.push([topPole, next, current]);
    }
    
    // Middle faces (quads between latitude rings)
    for (let lat = 0; lat < this.latitudeSegments - 2; lat++) {
      for (let lon = 0; lon < this.longitudeSegments; lon++) {
        const current = 1 + lat * this.longitudeSegments + lon;
        const next = 1 + lat * this.longitudeSegments + ((lon + 1) % this.longitudeSegments);
        const currentNext = current + this.longitudeSegments;
        const nextNext = next + this.longitudeSegments;
        
        // Split quad into two triangles
        faces.push([current, next, nextNext, currentNext]);
      }
    }
    
    // Bottom cap faces (triangles from last ring to bottom pole)
    const lastRingStart = 1 + (this.latitudeSegments - 2) * this.longitudeSegments;
    for (let lon = 0; lon < this.longitudeSegments; lon++) {
      const current = lastRingStart + lon;
      const next = lastRingStart + ((lon + 1) % this.longitudeSegments);
      faces.push([bottomPole, current, next]);
    }
    
    return faces;
  }
  
  /**
   * Get edge definitions for sphere
   */
  getEdges() {
    const edges = [];
    
    // For simplicity, only show latitude and longitude lines on visible hemisphere
    
    // Vertical longitude lines (visible ones)
    const visibleLongitudes = [0, this.longitudeSegments / 4, this.longitudeSegments / 2, 3 * this.longitudeSegments / 4];
    
    visibleLongitudes.forEach(lon => {
      if (lon >= this.longitudeSegments) return;
      
      // Connect top pole to first ring
      edges.push([0, 1 + lon]);
      
      // Connect rings
      for (let lat = 0; lat < this.latitudeSegments - 2; lat++) {
        const current = 1 + lat * this.longitudeSegments + lon;
        const next = current + this.longitudeSegments;
        edges.push([current, next]);
      }
      
      // Connect last ring to bottom pole
      const lastPoint = 1 + (this.latitudeSegments - 2) * this.longitudeSegments + lon;
      const bottomPole = 1 + (this.latitudeSegments - 1) * this.longitudeSegments;
      edges.push([lastPoint, bottomPole]);
    });
    
    // Horizontal latitude lines (visible ones)
    const visibleLatitudes = [1, Math.floor(this.latitudeSegments / 2)];
    
    visibleLatitudes.forEach(lat => {
      if (lat >= this.latitudeSegments - 1) return;
      
      for (let lon = 0; lon < this.longitudeSegments; lon++) {
        const current = 1 + (lat - 1) * this.longitudeSegments + lon;
        const next = 1 + (lat - 1) * this.longitudeSegments + ((lon + 1) % this.longitudeSegments);
        edges.push([current, next]);
      }
    });
    
    return edges;
  }
  
  /**
   * Override rendering for sphere to use simpler circle representation
   */
  render(layer) {
    // Create group for sphere
    const shapeGroup = layer.append('g')
      .attr('class', 'shape-3d sphere')
      .attr('transform', this.getTransform());
    
    // Render main sphere as circle with shading
    this.renderSphereCircle(shapeGroup);
    
    // Render latitude/longitude grid lines for 3D effect
    this.renderGridLines(shapeGroup);
    
    return this;
  }
  
  /**
   * Render sphere as a circle with gradient shading
   */
  renderSphereCircle(group) {
    const center = this.project3DTo2D(0, 0, 0);
    const radius = this.radius * this.projection.scale;
    
    // Create gradient for 3D effect
    const gradientId = `sphere-gradient-${Date.now()}`;
    const defs = group.append('defs');
    const gradient = defs.append('radialGradient')
      .attr('id', gradientId)
      .attr('cx', '30%')
      .attr('cy', '30%')
      .attr('r', '70%');
    
    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#87CEEB')
      .attr('stop-opacity', 0.8);
    
    gradient.append('stop')
      .attr('offset', '70%')
      .attr('stop-color', this.style.frontFace)
      .attr('stop-opacity', 0.6);
    
    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', this.style.rightFace)
      .attr('stop-opacity', 0.9);
    
    // Render main sphere circle
    group.append('circle')
      .attr('cx', center.x)
      .attr('cy', center.y)
      .attr('r', radius)
      .attr('fill', `url(#${gradientId})`)
      .attr('stroke', this.style.edgeColor)
      .attr('stroke-width', this.style.edgeWidth);
  }
  
  /**
   * Render grid lines for 3D effect
   */
  renderGridLines(group) {
    const center = this.project3DTo2D(0, 0, 0);
    const radius = this.radius * this.projection.scale;
    
    // Great circle (equator)
    group.append('ellipse')
      .attr('cx', center.x)
      .attr('cy', center.y)
      .attr('rx', radius)
      .attr('ry', radius * 0.3) // Flattened for 3D perspective
      .attr('fill', 'none')
      .attr('stroke', this.style.edgeColor)
      .attr('stroke-width', 1)
      .attr('opacity', 0.5);
    
    // Meridian (vertical great circle)
    group.append('path')
      .attr('d', `M ${center.x - radius} ${center.y} 
                  Q ${center.x} ${center.y - radius * 0.8} 
                    ${center.x + radius} ${center.y}
                  Q ${center.x} ${center.y + radius * 0.8} 
                    ${center.x - radius} ${center.y}`)
      .attr('fill', 'none')
      .attr('stroke', this.style.edgeColor)
      .attr('stroke-width', 1)
      .attr('opacity', 0.5);
  }
  
  /**
   * Get measurement points for sphere
   */
  getMeasurementPoints(type, options) {
    const center = this.project3DTo2D(0, 0, 0);
    const radius = this.radius * this.projection.scale;
    
    switch (type) {
      case 'radius':
        // Measure from center to edge
        return {
          x1: center.x,
          y1: center.y,
          x2: center.x + radius,
          y2: center.y,
          label: options.label || `r = ${this.radius}`
        };
        
      case 'diameter':
        // Measure across sphere
        return {
          x1: center.x - radius,
          y1: center.y + radius + 25,
          x2: center.x + radius,
          y2: center.y + radius + 25,
          label: options.label || `d = ${this.radius * 2}`
        };
        
      case 'circumference':
        // Arc measurement around the sphere
        return {
          x1: center.x - radius - 30,
          y1: center.y - radius,
          x2: center.x - radius - 30,
          y2: center.y + radius,
          label: options.label || `C = 2πr`
        };
        
      case 'volume':
        // Place volume label in center
        return {
          x1: center.x,
          y1: center.y,
          x2: center.x,
          y2: center.y,
          label: options.label || `V = ⁴⁄₃πr³`
        };
        
      default:
        return super.getMeasurementPoints(type, options);
    }
  }
  
  /**
   * Calculate surface area
   */
  getSurfaceArea() {
    return 4 * Math.PI * this.radius * this.radius;
  }
  
  /**
   * Calculate volume
   */
  getVolume() {
    return (4/3) * Math.PI * this.radius * this.radius * this.radius;
  }
}

export default Sphere;