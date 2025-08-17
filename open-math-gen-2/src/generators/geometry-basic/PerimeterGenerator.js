import { BaseGenerator } from '../BaseGenerator.js'
import { getDiagramSize } from './shared/DiagramSizes.js'

/**
 * Perimeter Generator
 * 
 * Generates problems about calculating perimeter of various shapes
 * Integrates with GeometryRenderer for visual diagrams with measurements
 */
export class PerimeterGenerator extends BaseGenerator {
  constructor() {
    super({
      name: 'Perimeter',
      description: 'Calculate perimeter of rectangles, squares, triangles, and polygons with visual diagrams',
      category: 'geometry-basic',
      difficulty: 'medium',
      icon: 'straighten',
      tags: ['perimeter', 'geometry', 'measurement', 'visual'],
      gradeLevel: '3-8',
      estimatedTime: '60 seconds',
      exampleProblem: {
        question: 'Find the perimeter of a rectangle with length 8 cm and width 5 cm.',
        questionLaTeX: '\\text{Find the perimeter of a rectangle with length 8 cm and width 5 cm.}',
        answer: '26 cm',
        answerLaTeX: '26 \\text{ cm}'
      },
      
      // Default parameter values
      defaultParameters: {
        problemCount: 10,
        includeRectangles: true,
        includeSquares: true,
        includeTriangles: true,
        includeRegularPolygons: false,
        includeIrregularPolygons: false,
        includeWordProblems: true,
        minSideLength: 2,
        maxSideLength: 20,
        allowDecimals: false,
        decimalPlaces: 1,
        units: 'mixed',
        showFormulas: true,
        showSteps: true,
        showVisualDiagrams: true,
        diagramSize: 'medium',
        diagramTheme: 'educational'
      },
      
      // Parameter schema for validation and UI generation
      parameterSchema: {
        problemCount: {
          type: 'number',
          label: 'Number of Problems',
          description: 'How many problems to generate',
          min: 1,
          max: 50,
          required: true
        },
        includeRectangles: {
          type: 'boolean',
          label: 'Include Rectangles',
          description: 'Include rectangle perimeter problems'
        },
        includeSquares: {
          type: 'boolean',
          label: 'Include Squares',
          description: 'Include square perimeter problems'
        },
        includeTriangles: {
          type: 'boolean',
          label: 'Include Triangles',
          description: 'Include triangle perimeter problems'
        },
        includeRegularPolygons: {
          type: 'boolean',
          label: 'Include Regular Polygons',
          description: 'Include regular polygon perimeter problems'
        },
        includeIrregularPolygons: {
          type: 'boolean',
          label: 'Include Irregular Polygons',
          description: 'Include irregular polygon perimeter problems'
        },
        includeWordProblems: {
          type: 'boolean',
          label: 'Include Word Problems',
          description: 'Include real-world perimeter problems'
        },
        minSideLength: {
          type: 'number',
          label: 'Minimum Side Length',
          description: 'Smallest side length to use',
          min: 1,
          max: 100
        },
        maxSideLength: {
          type: 'number',
          label: 'Maximum Side Length',
          description: 'Largest side length to use',
          min: 1,
          max: 100
        },
        allowDecimals: {
          type: 'boolean',
          label: 'Allow Decimals',
          description: 'Allow decimal measurements'
        },
        decimalPlaces: {
          type: 'number',
          label: 'Decimal Places',
          description: 'Number of decimal places for measurements',
          min: 1,
          max: 3
        },
        units: {
          type: 'select',
          label: 'Units',
          description: 'Measurement units to use',
          options: [
            { value: 'mixed', label: 'Mixed Units' },
            { value: 'cm', label: 'Centimeters' },
            { value: 'in', label: 'Inches' },
            { value: 'ft', label: 'Feet' },
            { value: 'm', label: 'Meters' },
            { value: 'units', label: 'Generic Units' }
          ]
        },
        showFormulas: {
          type: 'boolean',
          label: 'Show Formulas',
          description: 'Include perimeter formulas in problems'
        },
        showSteps: {
          type: 'boolean',
          label: 'Show Steps',
          description: 'Show step-by-step calculations'
        },
        showVisualDiagrams: {
          type: 'boolean',
          label: 'Show Visual Diagrams',
          description: 'Include geometric diagrams with measurements'
        },
        diagramSize: {
          type: 'select',
          label: 'Diagram Size',
          description: 'Size of the geometric diagrams',
          options: [
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'large', label: 'Large' }
          ]
        },
        diagramTheme: {
          type: 'select',
          label: 'Diagram Theme',
          description: 'Visual style for diagrams',
          options: [
            { value: 'educational', label: 'Educational' },
            { value: 'blueprint', label: 'Blueprint' },
            { value: 'minimal', label: 'Minimal' },
            { value: 'colorful', label: 'Colorful' }
          ]
        }
      }
    })
  }

  /**
   * Generate a single problem
   * @param {Object} parameters - Generation parameters
   * @returns {Object} Problem object
   */
  generateProblem(parameters = {}) {
    const params = { ...this.defaultParameters, ...parameters }
    
    // Validate parameters
    const validation = this.validateParameters(params)
    if (!validation.isValid) {
      throw new Error(`Invalid parameters: ${validation.errors.join(', ')}`)
    }
    
    // Build array of enabled shapes
    const enabledShapes = []
    if (params.includeRectangles) enabledShapes.push('rectangle')
    if (params.includeSquares) enabledShapes.push('square')
    if (params.includeTriangles) enabledShapes.push('triangle')
    if (params.includeRegularPolygons) enabledShapes.push('regularPolygon')
    if (params.includeIrregularPolygons) enabledShapes.push('irregularPolygon')
    
    if (enabledShapes.length === 0) {
      throw new Error('At least one shape type must be enabled')
    }
    
    const shape = this.getRandomElement(enabledShapes)
    const unit = this.getUnit(params)
    
    // Determine if this should be a word problem
    if (params.includeWordProblems && Math.random() < 0.4) {
      return this.generateWordProblem(shape, unit, params)
    } else {
      return this.generateBasicProblem(shape, unit, params)
    }
  }

  /**
   * Generate a basic perimeter problem
   * @param {string} shape - Shape type
   * @param {string} unit - Measurement unit
   * @param {Object} params - Generation parameters
   * @returns {Object} Problem object
   */
  generateBasicProblem(shape, unit, params) {
    switch (shape) {
      case 'rectangle':
        return this.generateRectangleProblem(unit, params)
      case 'square':
        return this.generateSquareProblem(unit, params)
      case 'triangle':
        return this.generateTriangleProblem(unit, params)
      case 'regularPolygon':
        return this.generateRegularPolygonProblem(unit, params)
      case 'irregularPolygon':
        return this.generateIrregularPolygonProblem(unit, params)
      default:
        return this.generateRectangleProblem(unit, params)
    }
  }
  
  generateRectangleProblem(unit, params) {
    const length = this.generateMeasurement(params)
    const width = this.generateMeasurement(params)
    const perimeter = 2 * (length + width)
    
    const steps = []
    if (params.showFormulas) {
      steps.push('\\text{Perimeter of rectangle: } P = 2l + 2w \\text{ or } P = 2(l + w)')
    }
    if (params.showSteps) {
      steps.push(`P = 2(${this.formatNumber(length)} + ${this.formatNumber(width)})`)
      steps.push(`P = 2(${this.formatNumber(length + width)})`)
      steps.push(`P = ${this.formatNumber(perimeter)} \\text{ ${unit}}`)
    }
    
    const problem = {
      question: `Find the perimeter of a rectangle with length ${this.formatNumber(length)} ${unit} and width ${this.formatNumber(width)} ${unit}.`,
      questionLaTeX: `\\text{Find the perimeter of a rectangle with length ${this.formatNumber(length)} ${unit} and width ${this.formatNumber(width)} ${unit}.}`,
      answer: `${this.formatNumber(perimeter)} ${unit}`,
      answerLaTeX: `${this.formatNumber(perimeter)} \\text{ ${unit}}`,
      steps: steps,
      metadata: {
        shape: 'rectangle',
        measurements: { length, width },
        unit: unit,
        perimeter: perimeter,
        difficulty: 'medium',
        estimatedTime: '45 seconds'
      }
    }
    
    // Add visual diagram
    if (params.showVisualDiagrams) {
      problem.diagram = this.generateDiagram('rectangle', { length, width }, unit, params)
    }
    
    return problem
  }
  
  generateSquareProblem(unit, params) {
    const side = this.generateMeasurement(params)
    const perimeter = 4 * side
    
    const steps = []
    if (params.showFormulas) {
      steps.push('\\text{Perimeter of square: } P = 4s')
    }
    if (params.showSteps) {
      steps.push(`P = 4 \\times ${this.formatNumber(side)}`)
      steps.push(`P = ${this.formatNumber(perimeter)} \\text{ ${unit}}`)
    }
    
    const problem = {
      question: `Find the perimeter of a square with side length ${this.formatNumber(side)} ${unit}.`,
      questionLaTeX: `\\text{Find the perimeter of a square with side length ${this.formatNumber(side)} ${unit}.}`,
      answer: `${this.formatNumber(perimeter)} ${unit}`,
      answerLaTeX: `${this.formatNumber(perimeter)} \\text{ ${unit}}`,
      steps: steps,
      metadata: {
        shape: 'square',
        measurements: { side },
        unit: unit,
        perimeter: perimeter,
        difficulty: 'easy',
        estimatedTime: '30 seconds'
      }
    }
    
    // Add visual diagram
    if (params.showVisualDiagrams) {
      problem.diagram = this.generateDiagram('square', { side }, unit, params)
    }
    
    return problem
  }
  
  generateTriangleProblem(unit, params) {
    const side1 = this.generateMeasurement(params)
    const side2 = this.generateMeasurement(params)
    const side3 = this.generateMeasurement(params)
    const perimeter = side1 + side2 + side3
    
    const steps = []
    if (params.showFormulas) {
      steps.push('\\text{Perimeter of triangle: } P = a + b + c')
    }
    if (params.showSteps) {
      steps.push(`P = ${this.formatNumber(side1)} + ${this.formatNumber(side2)} + ${this.formatNumber(side3)}`)
      steps.push(`P = ${this.formatNumber(perimeter)} \\text{ ${unit}}`)
    }
    
    const problem = {
      question: `Find the perimeter of a triangle with sides ${this.formatNumber(side1)} ${unit}, ${this.formatNumber(side2)} ${unit}, and ${this.formatNumber(side3)} ${unit}.`,
      questionLaTeX: `\\text{Find the perimeter of a triangle with sides ${this.formatNumber(side1)} ${unit}, ${this.formatNumber(side2)} ${unit}, and ${this.formatNumber(side3)} ${unit}.}`,
      answer: `${this.formatNumber(perimeter)} ${unit}`,
      answerLaTeX: `${this.formatNumber(perimeter)} \\text{ ${unit}}`,
      steps: steps,
      metadata: {
        shape: 'triangle',
        measurements: { side1, side2, side3 },
        unit: unit,
        perimeter: perimeter,
        difficulty: 'medium',
        estimatedTime: '40 seconds'
      }
    }
    
    // Add visual diagram
    if (params.showVisualDiagrams) {
      problem.diagram = this.generateDiagram('triangle', { side1, side2, side3 }, unit, params)
    }
    
    return problem
  }

  /**
   * Generate a word problem
   * @param {string} shape - Shape type
   * @param {string} unit - Measurement unit
   * @param {Object} params - Generation parameters
   * @returns {Object} Problem object
   */
  generateWordProblem(shape, unit, params) {
    const scenarios = this.getWordProblemScenarios(shape, unit, params)
    const scenario = this.getRandomElement(scenarios)
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Given information: ${scenario.given}}`)
      steps.push(`\\text{Formula: } ${scenario.formula}`)
      steps.push(`\\text{Solution: } ${scenario.solution}`)
    }
    
    const problem = {
      question: scenario.question,
      questionLaTeX: scenario.questionLaTeX,
      answer: scenario.answer,
      answerLaTeX: scenario.answerLaTeX,
      steps: steps,
      metadata: {
        questionType: 'word-problem',
        shape: shape,
        scenario: scenario.type,
        measurements: scenario.measurements,
        unit: unit,
        perimeter: scenario.perimeter,
        difficulty: 'medium',
        estimatedTime: '75 seconds'
      }
    }
    
    // Add visual diagram
    if (params.showVisualDiagrams) {
      problem.diagram = this.generateDiagram(shape, scenario.measurements, unit, params)
    }
    
    return problem
  }
  
  getWordProblemScenarios(shape, unit, params) {
    const scenarios = []
    
    if (shape === 'rectangle') {
      const length = this.generateMeasurement(params)
      const width = this.generateMeasurement(params)
      const perimeter = 2 * (length + width)
      
      scenarios.push({
        type: 'garden',
        question: `Sarah wants to put a fence around her rectangular garden. The garden is ${this.formatNumber(length)} ${unit} long and ${this.formatNumber(width)} ${unit} wide. How much fencing does she need?`,
        questionLaTeX: `\\text{Sarah wants to put a fence around her rectangular garden.} \\\\\\\\ \\text{The garden is ${this.formatNumber(length)} ${unit} long and ${this.formatNumber(width)} ${unit} wide.} \\\\\\\\ \\text{How much fencing does she need?}`,
        answer: `${this.formatNumber(perimeter)} ${unit}`,
        answerLaTeX: `${this.formatNumber(perimeter)} \\text{ ${unit}}`,
        measurements: { length, width },
        perimeter: perimeter,
        given: `Length = ${length} ${unit}, Width = ${width} ${unit}`,
        formula: 'P = 2(l + w)',
        solution: `P = 2(${length} + ${width}) = ${perimeter} ${unit}`
      })
    }
    
    if (shape === 'square') {
      const side = this.generateMeasurement(params)
      const perimeter = 4 * side
      
      scenarios.push({
        type: 'room',
        question: `A square room has sides of ${this.formatNumber(side)} ${unit}. If you want to put trim around the entire room, how much trim do you need?`,
        questionLaTeX: `\\text{A square room has sides of ${this.formatNumber(side)} ${unit}.} \\\\\\\\ \\text{If you want to put trim around the entire room,} \\\\\\\\ \\text{how much trim do you need?}`,
        answer: `${this.formatNumber(perimeter)} ${unit}`,
        answerLaTeX: `${this.formatNumber(perimeter)} \\text{ ${unit}}`,
        measurements: { side },
        perimeter: perimeter,
        given: `Side length = ${side} ${unit}`,
        formula: 'P = 4s',
        solution: `P = 4 × ${side} = ${perimeter} ${unit}`
      })
    }
    
    return scenarios
  }

  /**
   * Generate visual diagram using GeometryRenderer
   * @param {string} shape - Shape type
   * @param {Object} measurements - Shape measurements
   * @param {string} unit - Measurement unit
   * @param {Object} params - Generation parameters
   * @returns {Object} Diagram configuration
   */
  generateDiagram(shape, measurements, unit, params) {
    const size = getDiagramSize('standard', params.diagramSize)
    
    return {
      type: 'geometry-renderer',
      shape: shape,
      measurements: measurements,
      unit: unit,
      config: {
        width: size.width,
        height: size.height,
        theme: params.diagramTheme,
        showMeasurements: true,
        showLabels: false,
        center: true,
        uniformScale: true,
        measurementTypes: this.getMeasurementTypes(shape)
      },
      svgId: `perimeter-${shape}-${Date.now()}`
    }
  }
  
  getMeasurementTypes(shape) {
    switch (shape) {
      case 'rectangle':
        return ['width', 'height']
      case 'square':
        return ['side']
      case 'triangle':
        return ['side1', 'side2', 'side3']
      default:
        return ['perimeter']
    }
  }

  /**
   * Generate a measurement value
   * @param {Object} params - Generation parameters
   * @returns {number} Measurement value
   */
  generateMeasurement(params) {
    const min = params.minSideLength
    const max = params.maxSideLength
    
    if (params.allowDecimals) {
      const value = min + Math.random() * (max - min)
      return Math.round(value * Math.pow(10, params.decimalPlaces)) / Math.pow(10, params.decimalPlaces)
    } else {
      return Math.floor(Math.random() * (max - min + 1)) + min
    }
  }

  /**
   * Get measurement unit
   * @param {Object} params - Generation parameters
   * @returns {string} Unit
   */
  getUnit(params) {
    if (params.units === 'mixed') {
      const units = ['cm', 'in', 'ft', 'm', 'units']
      return this.getRandomElement(units)
    }
    return params.units
  }

  /**
   * Format number for display
   * @param {number} number - Number to format
   * @returns {string} Formatted number
   */
  formatNumber(number) {
    if (Number.isInteger(number)) {
      return number.toString()
    }
    return number.toFixed(1).replace(/\.0$/, '')
  }

  /**
   * Get random element from array
   * @param {Array} array - Array to choose from
   * @returns {*} Random element
   */
  getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)]
  }
}

export default PerimeterGenerator