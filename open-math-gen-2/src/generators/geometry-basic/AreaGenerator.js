import { BaseGenerator } from '../BaseGenerator.js'

/**
 * Area Generator
 * 
 * Generates problems about calculating area of various shapes
 * Integrates with GeometryRenderer for visual diagrams with measurements
 */
export class AreaGenerator extends BaseGenerator {
  constructor() {
    super({
      name: 'Area',
      description: 'Calculate area of rectangles, squares, triangles, and circles with visual diagrams',
      category: 'geometry-basic',
      difficulty: 'medium',
      icon: 'crop_square',
      tags: ['area', 'geometry', 'measurement', 'visual'],
      gradeLevel: '3-8',
      estimatedTime: '75 seconds',
      exampleProblem: {
        question: 'Find the area of a rectangle with length 12 cm and width 8 cm.',
        questionLaTeX: '\\text{Find the area of a rectangle with length 12 cm and width 8 cm.}',
        answer: '96 cm²',
        answerLaTeX: '96 \\text{ cm}^2'
      },
      
      // Default parameter values
      defaultParameters: {
        problemCount: 10,
        includeRectangles: true,
        includeSquares: true,
        includeTriangles: true,
        includeCircles: false,
        includeParallelograms: false,
        includeTrapezoids: false,
        includeWordProblems: true,
        minSideLength: 3,
        maxSideLength: 25,
        allowDecimals: false,
        decimalPlaces: 1,
        units: 'mixed',
        showFormulas: true,
        showSteps: true,
        showVisualDiagrams: true,
        includeGridDiagrams: false,
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
          description: 'Include rectangle area problems'
        },
        includeSquares: {
          type: 'boolean',
          label: 'Include Squares',
          description: 'Include square area problems'
        },
        includeTriangles: {
          type: 'boolean',
          label: 'Include Triangles',
          description: 'Include triangle area problems'
        },
        includeCircles: {
          type: 'boolean',
          label: 'Include Circles',
          description: 'Include circle area problems'
        },
        includeParallelograms: {
          type: 'boolean',
          label: 'Include Parallelograms',
          description: 'Include parallelogram area problems'
        },
        includeTrapezoids: {
          type: 'boolean',
          label: 'Include Trapezoids',
          description: 'Include trapezoid area problems'
        },
        includeWordProblems: {
          type: 'boolean',
          label: 'Include Word Problems',
          description: 'Include real-world area problems'
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
          description: 'Include area formulas in problems'
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
        includeGridDiagrams: {
          type: 'boolean',
          label: 'Include Grid Diagrams',
          description: 'Show unit square grids for visualization'
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
    if (params.includeCircles) enabledShapes.push('circle')
    if (params.includeParallelograms) enabledShapes.push('parallelogram')
    if (params.includeTrapezoids) enabledShapes.push('trapezoid')
    
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
   * Generate a basic area problem
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
      case 'circle':
        return this.generateCircleProblem(unit, params)
      case 'parallelogram':
        return this.generateParallelogramProblem(unit, params)
      case 'trapezoid':
        return this.generateTrapezoidProblem(unit, params)
      default:
        return this.generateRectangleProblem(unit, params)
    }
  }
  
  generateRectangleProblem(unit, params) {
    const length = this.generateMeasurement(params)
    const width = this.generateMeasurement(params)
    const area = length * width
    
    const steps = []
    if (params.showFormulas) {
      steps.push('\\text{Area of rectangle: } A = l \\times w')
    }
    if (params.showSteps) {
      steps.push(`A = ${this.formatNumber(length)} \\times ${this.formatNumber(width)}`)
      steps.push(`A = ${this.formatNumber(area)} \\text{ ${unit}}^2`)
    }
    
    const problem = {
      question: `Find the area of a rectangle with length ${this.formatNumber(length)} ${unit} and width ${this.formatNumber(width)} ${unit}.`,
      questionLaTeX: `\\text{Find the area of a rectangle with length ${this.formatNumber(length)} ${unit} and width ${this.formatNumber(width)} ${unit}.}`,
      answer: `${this.formatNumber(area)} ${unit}²`,
      answerLaTeX: `${this.formatNumber(area)} \\text{ ${unit}}^2`,
      steps: steps,
      metadata: {
        shape: 'rectangle',
        measurements: { length, width },
        unit: unit,
        area: area,
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
    const area = side * side
    
    const steps = []
    if (params.showFormulas) {
      steps.push('\\text{Area of square: } A = s^2')
    }
    if (params.showSteps) {
      steps.push(`A = ${this.formatNumber(side)}^2`)
      steps.push(`A = ${this.formatNumber(area)} \\text{ ${unit}}^2`)
    }
    
    const problem = {
      question: `Find the area of a square with side length ${this.formatNumber(side)} ${unit}.`,
      questionLaTeX: `\\text{Find the area of a square with side length ${this.formatNumber(side)} ${unit}.}`,
      answer: `${this.formatNumber(area)} ${unit}²`,
      answerLaTeX: `${this.formatNumber(area)} \\text{ ${unit}}^2`,
      steps: steps,
      metadata: {
        shape: 'square',
        measurements: { side },
        unit: unit,
        area: area,
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
    const base = this.generateMeasurement(params)
    const height = this.generateMeasurement(params)
    const area = 0.5 * base * height
    
    const steps = []
    if (params.showFormulas) {
      steps.push('\\text{Area of triangle: } A = \\frac{1}{2} \\times b \\times h')
    }
    if (params.showSteps) {
      steps.push(`A = \\frac{1}{2} \\times ${this.formatNumber(base)} \\times ${this.formatNumber(height)}`)
      steps.push(`A = \\frac{${this.formatNumber(base * height)}}{2}`)
      steps.push(`A = ${this.formatNumber(area)} \\text{ ${unit}}^2`)
    }
    
    const problem = {
      question: `Find the area of a triangle with base ${this.formatNumber(base)} ${unit} and height ${this.formatNumber(height)} ${unit}.`,
      questionLaTeX: `\\text{Find the area of a triangle with base ${this.formatNumber(base)} ${unit} and height ${this.formatNumber(height)} ${unit}.}`,
      answer: `${this.formatNumber(area)} ${unit}²`,
      answerLaTeX: `${this.formatNumber(area)} \\text{ ${unit}}^2`,
      steps: steps,
      metadata: {
        shape: 'triangle',
        measurements: { base, height },
        unit: unit,
        area: area,
        difficulty: 'medium',
        estimatedTime: '50 seconds'
      }
    }
    
    // Add visual diagram
    if (params.showVisualDiagrams) {
      problem.diagram = this.generateDiagram('triangle', { base, height }, unit, params)
    }
    
    return problem
  }
  
  generateCircleProblem(unit, params) {
    const radius = this.generateMeasurement(params)
    const area = Math.PI * radius * radius
    
    const steps = []
    if (params.showFormulas) {
      steps.push('\\text{Area of circle: } A = \\pi r^2')
    }
    if (params.showSteps) {
      steps.push(`A = \\pi \\times ${this.formatNumber(radius)}^2`)
      steps.push(`A = \\pi \\times ${this.formatNumber(radius * radius)}`)
      steps.push(`A = ${this.formatNumber(area)} \\text{ ${unit}}^2`)
    }
    
    const problem = {
      question: `Find the area of a circle with radius ${this.formatNumber(radius)} ${unit}. Use π ≈ 3.14.`,
      questionLaTeX: `\\text{Find the area of a circle with radius ${this.formatNumber(radius)} ${unit}. Use } \\pi \\approx 3.14.`,
      answer: `${this.formatNumber(area)} ${unit}²`,
      answerLaTeX: `${this.formatNumber(area)} \\text{ ${unit}}^2`,
      steps: steps,
      metadata: {
        shape: 'circle',
        measurements: { radius },
        unit: unit,
        area: area,
        difficulty: 'hard',
        estimatedTime: '75 seconds'
      }
    }
    
    // Add visual diagram
    if (params.showVisualDiagrams) {
      problem.diagram = this.generateDiagram('circle', { radius }, unit, params)
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
      steps.push(`\\text{Given: ${scenario.given}}`)
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
        area: scenario.area,
        difficulty: 'medium',
        estimatedTime: '90 seconds'
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
      const area = length * width
      
      scenarios.push({
        type: 'carpet',
        question: `A rectangular room is ${this.formatNumber(length)} ${unit} long and ${this.formatNumber(width)} ${unit} wide. How much carpet is needed to cover the floor?`,
        questionLaTeX: `\\text{A rectangular room is ${this.formatNumber(length)} ${unit} long and ${this.formatNumber(width)} ${unit} wide.} \\\\\\\\ \\text{How much carpet is needed to cover the floor?}`,
        answer: `${this.formatNumber(area)} ${unit}²`,
        answerLaTeX: `${this.formatNumber(area)} \\text{ ${unit}}^2`,
        measurements: { length, width },
        area: area,
        given: `Length = ${length} ${unit}, Width = ${width} ${unit}`,
        formula: 'A = l × w',
        solution: `A = ${length} × ${width} = ${area} ${unit}²`
      })
      
      scenarios.push({
        type: 'garden',
        question: `Maria wants to plant grass in her rectangular backyard. The yard measures ${this.formatNumber(length)} ${unit} by ${this.formatNumber(width)} ${unit}. What is the area she needs to cover with grass?`,
        questionLaTeX: `\\text{Maria wants to plant grass in her rectangular backyard.} \\\\\\\\ \\text{The yard measures ${this.formatNumber(length)} ${unit} by ${this.formatNumber(width)} ${unit}.} \\\\\\\\ \\text{What is the area she needs to cover with grass?}`,
        answer: `${this.formatNumber(area)} ${unit}²`,
        answerLaTeX: `${this.formatNumber(area)} \\text{ ${unit}}^2`,
        measurements: { length, width },
        area: area,
        given: `Length = ${length} ${unit}, Width = ${width} ${unit}`,
        formula: 'A = l × w',
        solution: `A = ${length} × ${width} = ${area} ${unit}²`
      })
    }
    
    if (shape === 'square') {
      const side = this.generateMeasurement(params)
      const area = side * side
      
      scenarios.push({
        type: 'tile',
        question: `A square tile has sides of ${this.formatNumber(side)} ${unit}. What is the area of the tile?`,
        questionLaTeX: `\\text{A square tile has sides of ${this.formatNumber(side)} ${unit}.} \\\\\\\\ \\text{What is the area of the tile?}`,
        answer: `${this.formatNumber(area)} ${unit}²`,
        answerLaTeX: `${this.formatNumber(area)} \\text{ ${unit}}^2`,
        measurements: { side },
        area: area,
        given: `Side length = ${side} ${unit}`,
        formula: 'A = s²',
        solution: `A = ${side}² = ${area} ${unit}²`
      })
    }
    
    if (shape === 'triangle') {
      const base = this.generateMeasurement(params)
      const height = this.generateMeasurement(params)
      const area = 0.5 * base * height
      
      scenarios.push({
        type: 'sail',
        question: `A triangular sail has a base of ${this.formatNumber(base)} ${unit} and a height of ${this.formatNumber(height)} ${unit}. What is the area of the sail?`,
        questionLaTeX: `\\text{A triangular sail has a base of ${this.formatNumber(base)} ${unit}} \\\\\\\\ \\text{and a height of ${this.formatNumber(height)} ${unit}.} \\\\\\\\ \\text{What is the area of the sail?}`,
        answer: `${this.formatNumber(area)} ${unit}²`,
        answerLaTeX: `${this.formatNumber(area)} \\text{ ${unit}}^2`,
        measurements: { base, height },
        area: area,
        given: `Base = ${base} ${unit}, Height = ${height} ${unit}`,
        formula: 'A = ½ × b × h',
        solution: `A = ½ × ${base} × ${height} = ${area} ${unit}²`
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
    const sizes = {
      small: { width: 250, height: 200 },
      medium: { width: 350, height: 250 },
      large: { width: 450, height: 300 }
    }
    
    const size = sizes[params.diagramSize] || sizes.medium
    
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
        showGrid: params.includeGridDiagrams,
        center: true,
        uniformScale: true,
        measurementTypes: this.getMeasurementTypes(shape),
        highlightArea: true
      },
      svgId: `area-${shape}-${Date.now()}`
    }
  }
  
  getMeasurementTypes(shape) {
    switch (shape) {
      case 'rectangle':
        return ['width', 'height']
      case 'square':
        return ['side']
      case 'triangle':
        return ['base', 'height']
      case 'circle':
        return ['radius']
      case 'parallelogram':
        return ['base', 'height']
      case 'trapezoid':
        return ['base1', 'base2', 'height']
      default:
        return ['area']
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

export default AreaGenerator