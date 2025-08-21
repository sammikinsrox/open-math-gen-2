import { BaseShape } from './BaseShape.js';

/**
 * Shape3D - Base class for 3D geometric shapes with isometric projection
 */
export class Shape3D extends BaseShape {
  constructor(x = 0, y = 0, z = 0) {
    super(x, y);
    this.z = z;
    this.rotationX = 0;
    this.rotationY = 0;
    this.rotationZ = 0;
    this.depth = 100;
    
    // Isometric projection settings
    this.projection = {
      type: 'isometric',
      angle: 30, // degrees
      scale: 0.8
    };
    
    // 3D-specific styling
    this.style = {
      ...this.style,
      frontFace: 'rgba(52, 152, 219, 0.4)',
      topFace: 'rgba(52, 152, 219, 0.6)',
      rightFace: 'rgba(52, 152, 219, 0.3)',
      edgeColor: '#2980b9',
      edgeWidth: 1.5,
      showHiddenEdges: false,
      hiddenEdgeStyle: 'dashed',
      hiddenEdgeOpacity: 0.3
    };
  }
  
  /**
   * Set 3D position
   */
  setPosition3D(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }
  
  /**
   * Set 3D rotation in degrees
   */
  setRotation3D(rotX = 0, rotY = 0, rotZ = 0) {
    this.rotationX = rotX;
    this.rotationY = rotY;
    this.rotationZ = rotZ;
    return this;
  }
  
  /**
   * Set projection type and parameters
   */
  setProjection(type = 'isometric', options = {}) {
    this.projection = {
      type,
      angle: options.angle || 30,
      scale: options.scale || 0.8,
      ...options
    };
    return this;
  }
  
  /**
   * Project 3D point to 2D using isometric projection
   * @param {number} x - 3D x coordinate
   * @param {number} y - 3D y coordinate  
   * @param {number} z - 3D z coordinate
   * @returns {Object} {x, y} - 2D projected coordinates
   */
  project3DTo2D(x, y, z) {
    switch (this.projection.type) {
      case 'isometric':
        return this.isometricProjection(x, y, z);
      case 'perspective':
        return this.perspectiveProjection(x, y, z);
      case 'orthographic':
        return this.orthographicProjection(x, y, z);
      default:
        return this.isometricProjection(x, y, z);
    }
  }
  
  /**
   * Isometric projection (default for 3D shapes)
   */
  isometricProjection(x, y, z) {
    const angle = (this.projection.angle * Math.PI) / 180;
    const scale = this.projection.scale;
    
    // Standard isometric projection matrix
    const projectedX = (x - z) * Math.cos(angle) * scale;
    const projectedY = ((x + z) * Math.sin(angle) - y) * scale;
    
    return {
      x: this.x + projectedX,
      y: this.y + projectedY
    };
  }
  
  /**
   * Perspective projection for more realistic 3D appearance
   */
  perspectiveProjection(x, y, z) {
    const distance = this.projection.distance || 500;
    const scale = distance / (distance + z);
    
    return {
      x: this.x + (x * scale),
      y: this.y + (y * scale)
    };
  }
  
  /**
   * Orthographic projection (no perspective distortion)
   */
  orthographicProjection(x, y, z) {
    return {
      x: this.x + x + (z * 0.5),
      y: this.y + y - (z * 0.5)
    };
  }
  
  /**
   * Get all vertices of the 3D shape in 2D projected coordinates
   * Must be implemented by subclasses
   */
  getVertices3D() {
    throw new Error('getVertices3D() method must be implemented by subclass');
  }
  
  /**
   * Get face definitions for 3D shape
   * Returns array of faces, each face is an array of vertex indices
   */
  getFaces() {
    throw new Error('getFaces() method must be implemented by subclass');
  }
  
  /**
   * Get edges for 3D shape
   * Returns array of edges, each edge connects two vertices
   */
  getEdges() {
    throw new Error('getEdges() method must be implemented by subclass');
  }
  
  /**
   * Determine face visibility for depth sorting
   */
  getFaceVisibility() {
    const faces = this.getFaces();
    const vertices = this.getVertices3D();
    
    return faces.map((face, index) => {
      // Simple normal calculation for face visibility
      const v1 = vertices[face[0]];
      const v2 = vertices[face[1]];
      const v3 = vertices[face[2]];
      
      // Calculate normal vector (cross product)
      const u = { x: v2.x - v1.x, y: v2.y - v1.y };
      const v = { x: v3.x - v1.x, y: v3.y - v1.y };
      const normal = u.x * v.y - u.y * v.x;
      
      return {
        faceIndex: index,
        visible: normal > 0,
        depth: this.getFaceDepth(face, vertices)
      };
    });
  }
  
  /**
   * Calculate average depth of a face for sorting
   */
  getFaceDepth(face, vertices) {
    let totalZ = 0;
    face.forEach(vertexIndex => {
      totalZ += vertices[vertexIndex].z || 0;
    });
    return totalZ / face.length;
  }
  
  /**
   * Render the 3D shape using face-by-face rendering
   */
  render(layer) {
    const vertices = this.getVertices3D();
    const faces = this.getFaces();
    const edges = this.getEdges();
    const visibility = this.getFaceVisibility();
    
    // Sort faces by depth (back to front)
    const sortedFaces = visibility.sort((a, b) => a.depth - b.depth);
    
    // Create group for this 3D shape
    const shapeGroup = layer.append('g')
      .attr('class', 'shape-3d')
      .attr('transform', this.getTransform());
    
    // Render faces
    sortedFaces.forEach(({ faceIndex, visible }) => {
      if (visible || !this.style.showHiddenEdges) {
        this.renderFace(shapeGroup, faces[faceIndex], vertices, faceIndex);
      }
    });
    
    // Render edges
    edges.forEach(edge => {
      this.renderEdge(shapeGroup, edge, vertices);
    });
    
    return this;
  }
  
  /**
   * Render a single face of the 3D shape
   */
  renderFace(group, face, vertices, faceIndex) {
    const points = face.map(vertexIndex => {
      const vertex = this.project3DTo2D(
        vertices[vertexIndex].x,
        vertices[vertexIndex].y, 
        vertices[vertexIndex].z
      );
      return `${vertex.x},${vertex.y}`;
    }).join(' ');
    
    const faceColor = this.getFaceColor(faceIndex);
    
    group.append('polygon')
      .attr('points', points)
      .attr('fill', faceColor)
      .attr('stroke', this.style.edgeColor)
      .attr('stroke-width', this.style.edgeWidth)
      .attr('opacity', 0.8);
  }
  
  /**
   * Render a single edge of the 3D shape
   */
  renderEdge(group, edge, vertices) {
    const start = this.project3DTo2D(
      vertices[edge[0]].x,
      vertices[edge[0]].y,
      vertices[edge[0]].z
    );
    const end = this.project3DTo2D(
      vertices[edge[1]].x,
      vertices[edge[1]].y,
      vertices[edge[1]].z
    );
    
    group.append('line')
      .attr('x1', start.x)
      .attr('y1', start.y)
      .attr('x2', end.x)
      .attr('y2', end.y)
      .attr('stroke', this.style.edgeColor)
      .attr('stroke-width', this.style.edgeWidth);
  }
  
  /**
   * Get color for a specific face (can be overridden for custom coloring)
   */
  getFaceColor(faceIndex) {
    // Default: different shades for different faces
    const faceColors = [
      this.style.frontFace,
      this.style.rightFace,
      this.style.topFace,
      this.style.frontFace,
      this.style.rightFace,
      this.style.topFace
    ];
    return faceColors[faceIndex % faceColors.length];
  }
  
  /**
   * Get bounding box of projected 2D shape
   */
  getBounds() {
    const vertices = this.getVertices3D();
    const projected = vertices.map(v => this.project3DTo2D(v.x, v.y, v.z));
    
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    
    projected.forEach(point => {
      minX = Math.min(minX, point.x);
      minY = Math.min(minY, point.y);
      maxX = Math.max(maxX, point.x);
      maxY = Math.max(maxY, point.y);
    });
    
    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    };
  }
  
  /**
   * Render measurements for 3D shapes
   */
  renderMeasurement(layer, measurement, measurementSystem) {
    // 3D measurements need special handling
    const vertices = this.getVertices3D();
    const projectedVertices = vertices.map(v => this.project3DTo2D(v.x, v.y, v.z));
    
    // Get measurement points based on 3D shape geometry
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
   * Get measurement points for 3D shapes
   */
  getMeasurementPoints(type, options) {
    // Default implementation - should be overridden by subclasses
    const bounds = this.getBounds();
    
    switch (type) {
      case 'width':
        return {
          x1: bounds.x,
          y1: bounds.y + bounds.height + 30,
          x2: bounds.x + bounds.width,
          y2: bounds.y + bounds.height + 30,
          label: options.label || `${this.depth}`
        };
      case 'height':
        return {
          x1: bounds.x - 30,
          y1: bounds.y,
          x2: bounds.x - 30,
          y2: bounds.y + bounds.height,
          label: options.label || `${this.depth}`
        };
      case 'depth':
        return {
          x1: bounds.x + bounds.width + 15,
          y1: bounds.y + 15,
          x2: bounds.x + bounds.width + 30,
          y2: bounds.y,
          label: options.label || `${this.depth}`
        };
      default:
        return null;
    }
  }
}

export default Shape3D;