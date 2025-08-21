import { Shape3D } from './Shape3D.js';

/**
 * Pyramid - 3D pyramid shape with square base and apex
 */
export class Pyramid extends Shape3D {
  constructor(x = 0, y = 0, z = 0, baseSize = 80, height = 100) {
    super(x, y, z);
    this.baseSize = baseSize;
    this.height = height;
  }
  
  /**
   * Set dimensions of the pyramid
   */
  setDimensions(baseSize, height) {
    this.baseSize = baseSize;
    this.height = height;
    return this;
  }
  
  /**
   * Get all 5 vertices of the pyramid (4 base corners + 1 apex)
   */
  getVertices3D() {
    const half = this.baseSize / 2;
    const h = this.height / 2;
    
    return [
      // Base vertices (square)
      { x: -half, y: -h, z: -half }, // 0: base-back-left
      { x: half, y: -h, z: -half },  // 1: base-back-right
      { x: half, y: -h, z: half },   // 2: base-front-right
      { x: -half, y: -h, z: half },  // 3: base-front-left
      
      // Apex
      { x: 0, y: h, z: 0 }           // 4: apex
    ];
  }
  
  /**
   * Get face definitions for pyramid
   */
  getFaces() {
    return [
      [0, 1, 2, 3], // Base (square)
      [0, 4, 1],    // Back face (triangle)
      [1, 4, 2],    // Right face (triangle)
      [2, 4, 3],    // Front face (triangle)
      [3, 4, 0]     // Left face (triangle)
    ];
  }
  
  /**
   * Get edge definitions for pyramid
   */
  getEdges() {
    return [
      // Base edges
      [0, 1], [1, 2], [2, 3], [3, 0],
      // Edges to apex
      [0, 4], [1, 4], [2, 4], [3, 4]
    ];
  }
  
  /**
   * Override face color assignment for pyramid
   */
  getFaceColor(faceIndex) {
    const faceColors = [
      this.style.frontFace,  // Base
      this.style.rightFace,  // Back face
      this.style.rightFace,  // Right face
      this.style.topFace,    // Front face (lighter)
      this.style.rightFace   // Left face
    ];
    return faceColors[faceIndex];
  }
  
  /**
   * Get measurement points for pyramid
   */
  getMeasurementPoints(type, options) {
    const vertices = this.getVertices3D();
    const projected = vertices.map(v => this.project3DTo2D(v.x, v.y, v.z));
    
    switch (type) {
      case 'base':
        // Measure base edge
        return {
          x1: projected[3].x,
          y1: projected[3].y + 25,
          x2: projected[2].x,
          y2: projected[2].y + 25,
          label: options.label || `${this.baseSize}`
        };
        
      case 'height':
        // Measure from base center to apex
        const baseCenter = this.project3DTo2D(0, -this.height/2, 0);
        const apex = projected[4];
        return {
          x1: baseCenter.x - 30,
          y1: baseCenter.y,
          x2: apex.x - 30,
          y2: apex.y,
          label: options.label || `h = ${this.height}`
        };
        
      case 'slant-height':
        // Measure from base edge midpoint to apex
        const baseMid = this.project3DTo2D(0, -this.height/2, this.baseSize/2);
        const apexPoint = projected[4];
        return {
          x1: baseMid.x + 15,
          y1: baseMid.y + 15,
          x2: apexPoint.x + 15,
          y2: apexPoint.y + 15,
          label: options.label || `s = ${Math.sqrt(this.height * this.height + (this.baseSize/2) * (this.baseSize/2))}`
        };
        
      case 'base-area':
        // Label base area
        const baseCenterPoint = this.project3DTo2D(0, -this.height/2, 0);
        return {
          x1: baseCenterPoint.x,
          y1: baseCenterPoint.y,
          x2: baseCenterPoint.x,
          y2: baseCenterPoint.y,
          label: options.label || `A = ${this.baseSize * this.baseSize}`
        };
        
      case 'volume':
        // Place volume label in center
        const center = this.project3DTo2D(0, -this.height/4, 0);
        return {
          x1: center.x,
          y1: center.y,
          x2: center.x,
          y2: center.y,
          label: options.label || `V = ⅓Bh`
        };
        
      default:
        return super.getMeasurementPoints(type, options);
    }
  }
  
  /**
   * Calculate surface area
   */
  getSurfaceArea() {
    const baseArea = this.baseSize * this.baseSize;
    const slantHeight = this.getSlantHeight();
    const triangularFaceArea = 0.5 * this.baseSize * slantHeight;
    return baseArea + 4 * triangularFaceArea;
  }
  
  /**
   * Calculate volume
   */
  getVolume() {
    const baseArea = this.baseSize * this.baseSize;
    return (1/3) * baseArea * this.height;
  }
  
  /**
   * Get slant height
   */
  getSlantHeight() {
    return Math.sqrt(this.height * this.height + (this.baseSize/2) * (this.baseSize/2));
  }
  
  /**
   * Create a triangular pyramid (tetrahedron)
   */
  static createTetrahedron(x = 0, y = 0, z = 0, size = 80) {
    const pyramid = new TriangularPyramid(x, y, z, size);
    return pyramid;
  }
}

/**
 * TriangularPyramid - Pyramid with triangular base (tetrahedron)
 */
export class TriangularPyramid extends Shape3D {
  constructor(x = 0, y = 0, z = 0, size = 80) {
    super(x, y, z);
    this.size = size;
    this.height = size * Math.sqrt(2/3); // Regular tetrahedron height
  }
  
  /**
   * Get all 4 vertices of the tetrahedron
   */
  getVertices3D() {
    const h = this.height / 2;
    const r = this.size / Math.sqrt(3); // Circumradius of base triangle
    
    return [
      // Base triangle vertices
      { x: 0, y: -h, z: r },                    // 0: front vertex
      { x: -r * Math.sqrt(3)/2, y: -h, z: -r/2 }, // 1: back-left vertex
      { x: r * Math.sqrt(3)/2, y: -h, z: -r/2 },  // 2: back-right vertex
      
      // Apex
      { x: 0, y: h, z: 0 }                      // 3: apex
    ];
  }
  
  /**
   * Get face definitions for tetrahedron
   */
  getFaces() {
    return [
      [0, 2, 1], // Base triangle
      [0, 1, 3], // Left face
      [1, 2, 3], // Back face  
      [2, 0, 3]  // Right face
    ];
  }
  
  /**
   * Get edge definitions for tetrahedron
   */
  getEdges() {
    return [
      // Base edges
      [0, 1], [1, 2], [2, 0],
      // Edges to apex
      [0, 3], [1, 3], [2, 3]
    ];
  }
  
  /**
   * Calculate surface area
   */
  getSurfaceArea() {
    // 4 equilateral triangular faces
    const faceArea = (Math.sqrt(3) / 4) * this.size * this.size;
    return 4 * faceArea;
  }
  
  /**
   * Calculate volume
   */
  getVolume() {
    return (this.size * this.size * this.size) / (6 * Math.sqrt(2));
  }
}

export default Pyramid;