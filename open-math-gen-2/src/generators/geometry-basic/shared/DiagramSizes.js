/**
 * Standardized diagram sizes for all geometry generators
 * This ensures consistent container sizes across all geometry generators,
 * preventing horizontal alignment issues on worksheets.
 */

// Standard rectangular diagrams (most shapes, area, perimeter problems)
export const STANDARD_SIZES = {
  small: { width: 200, height: 150 },
  medium: { width: 300, height: 200 },
  large: { width: 400, height: 250 }
}

// Square diagrams (coordinate planes, symmetry, some angle problems)
export const SQUARE_SIZES = {
  small: { width: 250, height: 250 },
  medium: { width: 350, height: 350 },
  large: { width: 450, height: 450 }
}

// Wide diagrams (line segments, parallel/perpendicular lines)
export const WIDE_SIZES = {
  small: { width: 300, height: 200 },
  medium: { width: 400, height: 250 },
  large: { width: 500, height: 300 }
}

/**
 * Get standardized sizes for a given diagram type
 * @param {string} type - Type of diagram: 'standard', 'square', or 'wide'
 * @param {string} size - Size: 'small', 'medium', or 'large'
 * @returns {Object} Size configuration with width and height
 */
export function getDiagramSize(type = 'standard', size = 'medium') {
  const sizeMap = {
    standard: STANDARD_SIZES,
    square: SQUARE_SIZES,
    wide: WIDE_SIZES
  }
  
  const sizes = sizeMap[type] || STANDARD_SIZES
  return sizes[size] || sizes.medium
}

export default {
  STANDARD_SIZES,
  SQUARE_SIZES,
  WIDE_SIZES,
  getDiagramSize
}