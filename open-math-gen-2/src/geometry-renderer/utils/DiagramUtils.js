/**
 * Diagram Utilities
 * Common utility functions used across diagram renderers
 */

/**
 * Convert Vue reactive proxy to plain object
 * @param {*} obj - Object to convert
 * @returns {*} Plain object without Vue proxies
 */
export function toPlainObject(obj) {
  if (obj && typeof obj === 'object') {
    const plain = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (Array.isArray(value)) {
          plain[key] = value.map(item => toPlainObject(item));
        } else if (value && typeof value === 'object') {
          plain[key] = toPlainObject(value);
        } else {
          plain[key] = value;
        }
      }
    }
    return plain;
  }
  return obj;
}

/**
 * Create error SVG when rendering fails
 * @param {number} width - SVG width
 * @param {number} height - SVG height
 * @returns {string} Error SVG string
 */
export function createErrorSVG(width, height) {
  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="100%" height="100%" fill="#f3f4f6" stroke="#d1d5db"/>
      <text x="50%" y="50%" text-anchor="middle" dy="0.3em" 
            font-family="Inter, sans-serif" font-size="14" fill="#6b7280">
        Diagram Error
      </text>
    </svg>
  `;
}

/**
 * Calculate distance between two points
 * @param {Object} point1 - First point {x, y}
 * @param {Object} point2 - Second point {x, y}
 * @returns {number} Distance between points
 */
export function calculateDistance(point1, point2) {
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Calculate angle between two points in radians
 * @param {Object} point1 - First point {x, y}
 * @param {Object} point2 - Second point {x, y}
 * @returns {number} Angle in radians
 */
export function calculateAngle(point1, point2) {
  return Math.atan2(point2.y - point1.y, point2.x - point1.x);
}

/**
 * Convert degrees to radians
 * @param {number} degrees - Angle in degrees
 * @returns {number} Angle in radians
 */
export function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

/**
 * Convert radians to degrees
 * @param {number} radians - Angle in radians
 * @returns {number} Angle in degrees
 */
export function radiansToDegrees(radians) {
  return radians * (180 / Math.PI);
}

/**
 * Format number to specified decimal places
 * @param {number} num - Number to format
 * @param {number} decimals - Number of decimal places (default 1)
 * @returns {string} Formatted number string
 */
export function formatNumber(num, decimals = 1) {
  return num.toFixed(decimals);
}

export default {
  toPlainObject,
  createErrorSVG,
  calculateDistance,
  calculateAngle,
  degreesToRadians,
  radiansToDegrees,
  formatNumber
};