import { Shape3D } from './Shape3D.js';

/**
 * RectangularPrism - 3D rectangular prism/cuboid shape
 */
export class RectangularPrism extends Shape3D {
  constructor(x = 0, y = 0, z = 0, width = 100, height = 60, depth = 80) {
    super(x, y, z);
    this.width = width;
    this.height = height;
    this.depth = depth;
  }
  
  /**
   * Set dimensions of the rectangular prism
   */
  setDimensions(width, height, depth) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    return this;
  }
  
  /**
   * Get all 8 vertices of the rectangular prism in 3D space
   */
  getVertices3D() {
    const w = this.width / 2;
    const h = this.height / 2;
    const d = this.depth / 2;
    
    return [
      // Front face (z = +d)
      { x: -w, y: -h, z: d },  // 0: front-bottom-left
      { x: w, y: -h, z: d },   // 1: front-bottom-right
      { x: w, y: h, z: d },    // 2: front-top-right
      { x: -w, y: h, z: d },   // 3: front-top-left
      
      // Back face (z = -d)
      { x: -w, y: -h, z: -d }, // 4: back-bottom-left
      { x: w, y: -h, z: -d },  // 5: back-bottom-right
      { x: w, y: h, z: -d },   // 6: back-top-right
      { x: -w, y: h, z: -d }   // 7: back-top-left
    ];
  }
  
  /**
   * Get face definitions (each face is defined by vertex indices)
   */
  getFaces() {
    return [
      [0, 1, 2, 3], // Front face
      [5, 4, 7, 6], // Back face
      [4, 0, 3, 7], // Left face
      [1, 5, 6, 2], // Right face
      [3, 2, 6, 7], // Top face
      [4, 5, 1, 0]  // Bottom face
    ];
  }
  
  /**
   * Get edge definitions (each edge connects two vertices)
   */
  getEdges() {
    return [
      // Front face edges
      [0, 1], [1, 2], [2, 3], [3, 0],
      // Back face edges  
      [4, 5], [5, 6], [6, 7], [7, 4],
      // Connecting edges
      [0, 4], [1, 5], [2, 6], [3, 7]
    ];
  }
  
  /**
   * Override face color assignment for rectangular prism
   */
  getFaceColor(faceIndex) {
    const faceColors = [
      this.style.frontFace,  // Front
      this.style.frontFace,  // Back (slightly darker)
      this.style.rightFace,  // Left
      this.style.rightFace,  // Right  
      this.style.topFace,    // Top
      this.style.frontFace   // Bottom
    ];
    return faceColors[faceIndex];
  }
  
  /**
   * Get measurement points for rectangular prism
   */
  getMeasurementPoints(type, options) {
    const vertices = this.getVertices3D();
    const projected = vertices.map(v => this.project3DTo2D(v.x, v.y, v.z));
    
    switch (type) {
      case 'width':
        // Measure along the front bottom edge
        return {
          x1: projected[0].x,
          y1: projected[0].y + 25,
          x2: projected[1].x,
          y2: projected[1].y + 25,
          label: options.label || `${this.width}`
        };
        
      case 'height':
        // Measure along the front left edge
        return {
          x1: projected[0].x - 25,
          y1: projected[0].y,
          x2: projected[3].x - 25,
          y2: projected[3].y,
          label: options.label || `${this.height}`
        };
        
      case 'depth':
        // Measure along the right edge going back
        return {
          x1: projected[1].x + 15,
          y1: projected[1].y + 15,
          x2: projected[5].x + 15,
          y2: projected[5].y + 15,
          label: options.label || `${this.depth}`
        };
        
      case 'volume':
        // Place volume label in the center
        const center = this.project3DTo2D(0, 0, 0);
        return {
          x1: center.x,
          y1: center.y,
          x2: center.x,
          y2: center.y,
          label: options.label || `V = ${this.width * this.height * this.depth}`
        };
        
      default:
        return super.getMeasurementPoints(type, options);
    }
  }
  
  /**
   * Calculate surface area
   */
  getSurfaceArea() {
    return 2 * (this.width * this.height + this.width * this.depth + this.height * this.depth);
  }
  
  /**
   * Calculate volume
   */
  getVolume() {
    return this.width * this.height * this.depth;
  }
  
  /**
   * Create a cube (special case of rectangular prism)
   */
  static createCube(x = 0, y = 0, z = 0, size = 100) {
    return new RectangularPrism(x, y, z, size, size, size);
  }
}

export default RectangularPrism;