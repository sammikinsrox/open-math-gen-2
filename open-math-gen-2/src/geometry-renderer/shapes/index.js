// 2D Shapes
export { BaseShape } from './BaseShape.js';
export { Rectangle } from './Rectangle.js';
export { Triangle } from './Triangle.js';
export { Circle } from './Circle.js';
export { Polygon } from './Polygon.js';

// Advanced 2D Shapes
export { IrregularPolygon, CompositeShape } from './IrregularPolygon.js';
export { CircleAdvanced as default, Arc, Sector, Chord, Tangent } from './CircleAdvanced.js';

// 3D Shapes
export { Shape3D } from './Shape3D.js';
export { RectangularPrism } from './RectangularPrism.js';
export { Cylinder } from './Cylinder.js';
export { Cone } from './Cone.js';
export { Sphere } from './Sphere.js';
export { Pyramid, TriangularPyramid } from './Pyramid.js';

// Convenience exports for common shapes
export const Shapes2D = {
  Rectangle,
  Triangle, 
  Circle,
  Polygon,
  IrregularPolygon,
  CompositeShape,
  Arc,
  Sector,
  Chord,
  Tangent
};

export const Shapes3D = {
  RectangularPrism,
  Cylinder,
  Cone,
  Sphere,
  Pyramid,
  TriangularPyramid
};

export const Shapes = {
  ...Shapes2D,
  ...Shapes3D
};

export { Shapes as default };