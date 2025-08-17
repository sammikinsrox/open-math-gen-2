import { BaseGenerator } from '../BaseGenerator.js'

/**
 * Coordinate Basics Generator
 * 
 * Generates problems about basic coordinate geometry, plotting points, and the coordinate plane
 * Integrates with GeometryRenderer for visual coordinate grids
 */
export class CoordinateBasicsGenerator extends BaseGenerator {
  constructor() {
    super({
      name: 'Coordinate Basics',
      description: 'Coordinate plane, plotting points, reading coordinates with visual grids',
      category: 'geometry-basic',
      difficulty: 'medium',
      icon: 'grid_on',
      tags: ['coordinates', 'coordinate plane', 'plotting', 'grid', 'visual'],
      gradeLevel: '4-8',
      estimatedTime: '45 seconds',
      exampleProblem: {
        question: 'What are the coordinates of point A?',
        questionLaTeX: '\\text{What are the coordinates of point A?}',
        answer: '(3, 4)',
        answerLaTeX: '(3, 4)'
      },
      
      // Default parameter values
      defaultParameters: {
        problemCount: 10,
        includePlotting: true,
        includeReading: true,
        includeDistance: false,
        includeQuadrants: true,
        includeMidpoint: false,
        includePatterns: false,
        includeWordProblems: false,
        coordinateRange: 10,
        allowNegatives: false,
        allowDecimals: false,
        includeOrigin: true,
        showAxesLabels: true,
        showGridNumbers: true,
        gridSize: 1,
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
        includePlotting: {
          type: 'boolean',
          label: 'Plotting Points',
          description: 'Plot points on coordinate plane'
        },
        includeReading: {
          type: 'boolean',
          label: 'Reading Coordinates',
          description: 'Read coordinates of plotted points'
        },
        includeDistance: {
          type: 'boolean',
          label: 'Distance Between Points',
          description: 'Find distance between two points'
        },
        includeQuadrants: {
          type: 'boolean',
          label: 'Quadrant Identification',
          description: 'Identify which quadrant points are in'
        },
        includeMidpoint: {
          type: 'boolean',
          label: 'Midpoint',
          description: 'Find midpoint between two points'
        },
        includePatterns: {
          type: 'boolean',
          label: 'Coordinate Patterns',
          description: 'Find patterns in coordinate sequences'
        },
        includeWordProblems: {
          type: 'boolean',
          label: 'Include Word Problems',
          description: 'Include real-world coordinate problems'
        },
        coordinateRange: {
          type: 'number',
          label: 'Coordinate Range',
          description: 'Maximum coordinate value (both positive and negative)',
          min: 5,
          max: 20
        },
        allowNegatives: {
          type: 'boolean',
          label: 'Allow Negative Coordinates',
          description: 'Include negative coordinates'
        },
        allowDecimals: {
          type: 'boolean',
          label: 'Allow Decimal Coordinates',
          description: 'Include decimal coordinate values'
        },
        includeOrigin: {
          type: 'boolean',
          label: 'Include Origin',
          description: 'Include problems involving the origin (0,0)'
        },
        showAxesLabels: {
          type: 'boolean',
          label: 'Show Axes Labels',
          description: 'Show x and y axis labels'
        },
        showGridNumbers: {
          type: 'boolean',
          label: 'Show Grid Numbers',
          description: 'Show numbers on grid lines'
        },
        gridSize: {
          type: 'select',
          label: 'Grid Size',
          description: 'Spacing between grid lines',
          options: [
            { value: 1, label: '1 unit' },
            { value: 2, label: '2 units' },
            { value: 5, label: '5 units' }
          ]
        },
        showVisualDiagrams: {
          type: 'boolean',
          label: 'Show Visual Diagrams',
          description: 'Include coordinate grid diagrams'
        },
        diagramSize: {
          type: 'select',
          label: 'Diagram Size',
          description: 'Size of the coordinate grid diagrams',
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
    
    // Build array of enabled problem types
    const problemTypes = []
    if (params.includePlotting) problemTypes.push('plotting')
    if (params.includeReading) problemTypes.push('reading')
    if (params.includeDistance) problemTypes.push('distance')
    if (params.includeQuadrants) problemTypes.push('quadrants')
    if (params.includeMidpoint) problemTypes.push('midpoint')
    if (params.includePatterns) problemTypes.push('patterns')
    
    if (problemTypes.length === 0) {
      throw new Error('At least one problem type must be enabled')
    }
    
    const problemType = this.getRandomElement(problemTypes)
    
    if (params.includeWordProblems && Math.random() < 0.3) {
      return this.generateWordProblem(problemType, params)
    } else {
      return this.generateCoordinateProblem(problemType, params)
    }
  }

  /**
   * Generate a coordinate problem
   * @param {string} problemType - Type of problem
   * @param {Object} params - Generation parameters
   * @returns {Object} Problem object
   */
  generateCoordinateProblem(problemType, params) {
    switch (problemType) {
      case 'plotting':
        return this.generatePlottingProblem(params)
      case 'reading':
        return this.generateReadingProblem(params)
      case 'distance':
        return this.generateDistanceProblem(params)
      case 'quadrants':
        return this.generateQuadrantProblem(params)
      case 'midpoint':
        return this.generateMidpointProblem(params)
      case 'patterns':
        return this.generatePatternsProblem(params)
      default:
        return this.generatePlottingProblem(params)
    }
  }
  
  generatePlottingProblem(params) {
    const point = this.generateCoordinate(params)
    const pointLabel = this.getRandomElement(['A', 'B', 'C', 'D', 'P', 'Q', 'R', 'S'])
    
    const problem = {
      question: `Plot point ${pointLabel} at coordinates ${this.formatCoordinate(point)}.`,
      questionLaTeX: `\\text{Plot point ${pointLabel} at coordinates ${this.formatCoordinate(point)}.}`,
      answer: `Point plotted at ${this.formatCoordinate(point)}`,
      answerLaTeX: `\\text{Point plotted at ${this.formatCoordinate(point)}}`,
      steps: [
        `\\text{Start at the origin (0,0)}`,
        `\\text{Move ${Math.abs(point.x)} units ${point.x >= 0 ? 'right' : 'left'} along the x-axis}`,
        `\\text{Move ${Math.abs(point.y)} units ${point.y >= 0 ? 'up' : 'down'} along the y-axis}`,
        `\\text{Place point ${pointLabel} at ${this.formatCoordinate(point)}}`
      ],
      metadata: {
        problemType: 'plotting',
        point: point,
        pointLabel: pointLabel,
        difficulty: 'medium',
        estimatedTime: '45 seconds'
      }
    }
    
    if (params.showVisualDiagrams) {
      problem.diagram = this.generateCoordinateDiagram('plotting', { point, pointLabel }, params)
    }
    
    return problem
  }
  
  generateReadingProblem(params) {
    const point = this.generateCoordinate(params)
    const pointLabel = this.getRandomElement(['A', 'B', 'C', 'D', 'P', 'Q', 'R', 'S'])
    
    const problem = {
      question: `What are the coordinates of point ${pointLabel}?`,
      questionLaTeX: `\\text{What are the coordinates of point ${pointLabel}?}`,
      answer: this.formatCoordinate(point),
      answerLaTeX: this.formatCoordinate(point),
      steps: [
        `\\text{Find the x-coordinate: how far right/left from the origin}`,
        `\\text{Find the y-coordinate: how far up/down from the origin}`,
        `\\text{Write as (x, y): ${this.formatCoordinate(point)}}`
      ],
      metadata: {
        problemType: 'reading',
        point: point,
        pointLabel: pointLabel,
        difficulty: 'easy',
        estimatedTime: '30 seconds'
      }
    }
    
    if (params.showVisualDiagrams) {
      problem.diagram = this.generateCoordinateDiagram('reading', { point, pointLabel }, params)
    }
    
    return problem
  }
  
  generateDistanceProblem(params) {
    const point1 = this.generateCoordinate(params)
    const point2 = this.generateCoordinate(params)
    
    // For basic level, prefer horizontal or vertical distances
    if (params.coordinateRange <= 10) {
      if (Math.random() < 0.7) {
        if (Math.random() < 0.5) {
          point2.y = point1.y // Same y-coordinate (horizontal)
        } else {
          point2.x = point1.x // Same x-coordinate (vertical)
        }
      }
    }
    
    const distance = this.calculateDistance(point1, point2)
    const isHorizontalOrVertical = point1.x === point2.x || point1.y === point2.y
    
    let steps = []
    if (isHorizontalOrVertical) {
      if (point1.x === point2.x) {
        steps = [
          `\\text{Points have same x-coordinate (vertical line)}`,
          `\\text{Distance = |${point2.y} - ${point1.y}| = ${distance}}`
        ]
      } else {
        steps = [
          `\\text{Points have same y-coordinate (horizontal line)}`,
          `\\text{Distance = |${point2.x} - ${point1.x}| = ${distance}}`
        ]
      }
    } else {
      steps = [
        `\\text{Use distance formula: } d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}`,
        `\\text{} d = \\sqrt{(${point2.x}-${point1.x})^2 + (${point2.y}-${point1.y})^2}`,
        `\\text{} d = \\sqrt{${Math.pow(point2.x - point1.x, 2)} + ${Math.pow(point2.y - point1.y, 2)}}`,
        `\\text{} d = ${this.formatNumber(distance)}`
      ]
    }
    
    const problem = {
      question: `Find the distance between points ${this.formatCoordinate(point1)} and ${this.formatCoordinate(point2)}.`,
      questionLaTeX: `\\text{Find the distance between points ${this.formatCoordinate(point1)} and ${this.formatCoordinate(point2)}.}`,
      answer: this.formatNumber(distance),
      answerLaTeX: this.formatNumber(distance),
      steps: steps,
      metadata: {
        problemType: 'distance',
        point1: point1,
        point2: point2,
        distance: distance,
        difficulty: isHorizontalOrVertical ? 'medium' : 'hard',
        estimatedTime: isHorizontalOrVertical ? '45 seconds' : '75 seconds'
      }
    }
    
    if (params.showVisualDiagrams) {
      problem.diagram = this.generateCoordinateDiagram('distance', { point1, point2 }, params)
    }
    
    return problem
  }
  
  generateQuadrantProblem(params) {
    let point = this.generateCoordinate(params)
    
    // Ensure we have negative coordinates if not allowed yet still want quadrants
    if (!params.allowNegatives) {
      params.allowNegatives = true
      point = this.generateCoordinate(params)
    }
    
    const quadrant = this.getQuadrant(point)
    const pointLabel = this.getRandomElement(['A', 'B', 'C', 'D', 'P', 'Q'])
    
    let quadrantName = ''
    let explanation = ''
    
    if (quadrant === 0) {
      quadrantName = 'on an axis'
      if (point.x === 0 && point.y === 0) {
        explanation = 'The point is at the origin'
      } else if (point.x === 0) {
        explanation = 'The point is on the y-axis'
      } else {
        explanation = 'The point is on the x-axis'
      }
    } else {
      quadrantName = `Quadrant ${this.numberToRoman(quadrant)}`
      const signs = this.getQuadrantSigns(quadrant)
      explanation = `Quadrant ${this.numberToRoman(quadrant)} has ${signs} coordinates`
    }
    
    const problem = {
      question: `In which quadrant is point ${pointLabel} ${this.formatCoordinate(point)} located?`,
      questionLaTeX: `\\text{In which quadrant is point ${pointLabel} ${this.formatCoordinate(point)} located?}`,
      answer: quadrantName,
      answerLaTeX: `\\text{${quadrantName}}`,
      steps: [
        `\\text{Look at the signs of the coordinates}`,
        `\\text{${explanation}}`,
        `\\text{Point ${pointLabel} is in ${quadrantName}}`
      ],
      metadata: {
        problemType: 'quadrants',
        point: point,
        pointLabel: pointLabel,
        quadrant: quadrant,
        difficulty: 'medium',
        estimatedTime: '35 seconds'
      }
    }
    
    if (params.showVisualDiagrams) {
      problem.diagram = this.generateCoordinateDiagram('quadrants', { point, pointLabel }, params)
    }
    
    return problem
  }
  
  generateMidpointProblem(params) {
    const point1 = this.generateCoordinate(params)
    const point2 = this.generateCoordinate(params)
    const midpoint = this.calculateMidpoint(point1, point2)
    
    const problem = {
      question: `Find the midpoint between ${this.formatCoordinate(point1)} and ${this.formatCoordinate(point2)}.`,
      questionLaTeX: `\\text{Find the midpoint between ${this.formatCoordinate(point1)} and ${this.formatCoordinate(point2)}.}`,
      answer: this.formatCoordinate(midpoint),
      answerLaTeX: this.formatCoordinate(midpoint),
      steps: [
        `\\text{Midpoint formula: } M = \\left(\\frac{x_1+x_2}{2}, \\frac{y_1+y_2}{2}\\right)`,
        `\\text{} M = \\left(\\frac{${point1.x}+${point2.x}}{2}, \\frac{${point1.y}+${point2.y}}{2}\\right)`,
        `\\text{} M = \\left(\\frac{${point1.x + point2.x}}{2}, \\frac{${point1.y + point2.y}}{2}\\right)`,
        `\\text{} M = ${this.formatCoordinate(midpoint)}`
      ],
      metadata: {
        problemType: 'midpoint',
        point1: point1,
        point2: point2,
        midpoint: midpoint,
        difficulty: 'hard',
        estimatedTime: '60 seconds'
      }
    }
    
    if (params.showVisualDiagrams) {
      problem.diagram = this.generateCoordinateDiagram('midpoint', { point1, point2, midpoint }, params)
    }
    
    return problem
  }

  /**
   * Generate word problems
   */
  generateWordProblem(problemType, params) {
    const scenarios = this.getWordProblemScenarios(problemType, params)
    const scenario = this.getRandomElement(scenarios)
    
    const problem = {
      question: scenario.question,
      questionLaTeX: scenario.questionLaTeX,
      answer: scenario.answer,
      answerLaTeX: scenario.answerLaTeX,
      steps: scenario.steps,
      metadata: {
        problemType: `word-${problemType}`,
        scenario: scenario.type,
        difficulty: 'medium',
        estimatedTime: '75 seconds'
      }
    }
    
    if (params.showVisualDiagrams && scenario.diagramData) {
      problem.diagram = this.generateCoordinateDiagram('word-problem', scenario.diagramData, params)
    }
    
    return problem
  }
  
  getWordProblemScenarios(problemType, params) {
    const scenarios = []
    
    if (problemType === 'plotting' || problemType === 'reading') {
      const point = this.generateCoordinate(params)
      scenarios.push({
        type: 'treasure-map',
        question: `On a treasure map, the treasure is located ${Math.abs(point.x)} steps ${point.x >= 0 ? 'east' : 'west'} and ${Math.abs(point.y)} steps ${point.y >= 0 ? 'north' : 'south'} from the starting point. What are the coordinates of the treasure?`,
        questionLaTeX: `\\text{On a treasure map, the treasure is located ${Math.abs(point.x)} steps ${point.x >= 0 ? 'east' : 'west'}} \\\\ \\text{and ${Math.abs(point.y)} steps ${point.y >= 0 ? 'north' : 'south'} from the starting point.} \\\\ \\text{What are the coordinates of the treasure?}`,
        answer: this.formatCoordinate(point),
        answerLaTeX: this.formatCoordinate(point),
        steps: [
          `\\text{Starting point is the origin (0,0)}`,
          `\\text{East/West movement affects x-coordinate}`,
          `\\text{North/South movement affects y-coordinate}`,
          `\\text{Treasure location: ${this.formatCoordinate(point)}}`
        ],
        diagramData: { point, pointLabel: 'T' }
      })
    }
    
    return scenarios
  }

  /**
   * Helper methods
   */
  generateCoordinate(params) {
    const range = params.coordinateRange
    const min = params.allowNegatives ? -range : 0
    const max = range
    
    let x, y
    
    if (params.allowDecimals) {
      x = Math.round((min + Math.random() * (max - min)) * 2) / 2
      y = Math.round((min + Math.random() * (max - min)) * 2) / 2
    } else {
      x = Math.floor(Math.random() * (max - min + 1)) + min
      y = Math.floor(Math.random() * (max - min + 1)) + min
    }
    
    // Include origin sometimes if enabled
    if (params.includeOrigin && Math.random() < 0.1) {
      return { x: 0, y: 0 }
    }
    
    return { x, y }
  }
  
  formatCoordinate(point) {
    return `(${this.formatNumber(point.x)}, ${this.formatNumber(point.y)})`
  }
  
  formatNumber(num) {
    return Number.isInteger(num) ? num.toString() : num.toFixed(1).replace(/\.0$/, '')
  }
  
  calculateDistance(point1, point2) {
    const dx = point2.x - point1.x
    const dy = point2.y - point1.y
    return Math.sqrt(dx * dx + dy * dy)
  }
  
  calculateMidpoint(point1, point2) {
    return {
      x: (point1.x + point2.x) / 2,
      y: (point1.y + point2.y) / 2
    }
  }
  
  getQuadrant(point) {
    if (point.x === 0 || point.y === 0) return 0 // On axis
    if (point.x > 0 && point.y > 0) return 1
    if (point.x < 0 && point.y > 0) return 2
    if (point.x < 0 && point.y < 0) return 3
    if (point.x > 0 && point.y < 0) return 4
    return 0
  }
  
  getQuadrantSigns(quadrant) {
    const signs = {
      1: '(+, +)',
      2: '(-, +)',
      3: '(-, -)',
      4: '(+, -)'
    }
    return signs[quadrant] || ''
  }
  
  numberToRoman(num) {
    const romans = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV' }
    return romans[num] || num.toString()
  }

  /**
   * Generate visual diagrams using GeometryRenderer
   */
  generateCoordinateDiagram(problemType, data, params) {
    const sizes = {
      small: { width: 300, height: 300 },
      medium: { width: 400, height: 400 },
      large: { width: 500, height: 500 }
    }
    
    const size = sizes[params.diagramSize] || sizes.medium
    
    return {
      type: 'geometry-renderer',
      shape: 'coordinate-plane',
      problemType: problemType,
      data: data,
      config: {
        width: size.width,
        height: size.height,
        theme: params.diagramTheme,
        coordinateRange: params.coordinateRange,
        allowNegatives: params.allowNegatives,
        showAxesLabels: params.showAxesLabels,
        showGridNumbers: params.showGridNumbers,
        gridSize: params.gridSize,
        center: true
      },
      svgId: `coordinate-${problemType}-${Date.now()}`
    }
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

export default CoordinateBasicsGenerator