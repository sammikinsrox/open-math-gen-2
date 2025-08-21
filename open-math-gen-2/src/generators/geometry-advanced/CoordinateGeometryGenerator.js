import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'
import { getDiagramSize } from '../geometry-basic/shared/DiagramSizes.js'

/**
 * Coordinate Geometry Generator
 * 
 * Generates coordinate geometry problems including distance between points,
 * midpoint calculations, slope, equation of lines, and coordinate plane geometry.
 */
export class CoordinateGeometryGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Coordinate Geometry',
      description: 'Coordinate plane problems including distance, midpoint, slope, line equations, and coordinate graphing',
      category: 'geometry-advanced',
      difficulty: 'medium',
      icon: 'grid_on',
      tags: ['coordinates', 'distance', 'midpoint', 'slope', 'graphing'],
      gradeLevel: '7-12',
      estimatedTime: '3-5 minutes',
      exampleProblem: {
        question: 'Find the distance between points A(2, 3) and B(6, 7).',
        questionLaTeX: '\\text{Find the distance between points A(2, 3) and B(6, 7).}',
        answer: '5.66',
        answerLaTeX: '5.66'
      },
      
      defaultParameters: {
        problemCount: 10,
        includeDistance: true,
        includeMidpoint: true,
        includeSlope: true,
        includeLineEquations: true,
        includePolygonArea: true,
        includeGraphing: false,
        includeTransformations: false,
        includeWordProblems: true,
        minCoordinate: -10,
        maxCoordinate: 10,
        allowDecimals: true,
        decimalPlaces: 2,
        slopeFormat: 'decimal',
        showWork: true,
        showVisualDiagrams: true,
        showCoordinateGrid: true,
        diagramSize: 'large',
        complexityLevel: 'intermediate'
      },
      
      parameterSchema: schemaV2.createSchema({
        categories: {
          general: schemaV2.createCategory({
            id: 'general',
            label: 'General Settings',
            description: 'Basic configuration options',
            icon: 'settings',
            color: 'blue',
            order: 1,
            parameters: {
              problemCount: schemaV2.createParameter({
                type: 'number',
                label: 'Number of Problems',
                description: 'How many coordinate geometry problems to generate',
                min: 1,
                max: 25,
                required: true,
                slider: true,
                presets: [8, 10, 12, 15],
                order: 1
              }),
              complexityLevel: schemaV2.createParameter({
                type: 'select',
                label: 'Complexity Level',
                description: 'Determines the difficulty of coordinate problems',
                variant: 'cards',
                options: [
                  { value: 'basic', label: 'Basic', description: 'Simple coordinates and basic calculations' },
                  { value: 'intermediate', label: 'Intermediate', description: 'Mixed problems with various coordinates' },
                  { value: 'advanced', label: 'Advanced', description: 'Complex coordinate geometry and applications' }
                ],
                order: 2
              })
            }
          }),
          
          problemTypes: schemaV2.createCategory({
            id: 'problemTypes',
            label: 'Problem Types',
            description: 'Choose which coordinate geometry concepts to include',
            icon: 'grid_on',
            color: 'green',
            order: 2,
            parameters: {
              includeDistance: schemaV2.createParameter({
                type: 'boolean',
                label: 'Distance Between Points',
                description: 'Calculate distance using distance formula',
                helpText: 'd = √[(x₂-x₁)² + (y₂-y₁)²]',
                order: 1
              }),
              includeMidpoint: schemaV2.createParameter({
                type: 'boolean',
                label: 'Midpoint',
                description: 'Find midpoint between two points',
                helpText: 'M = ((x₁+x₂)/2, (y₁+y₂)/2)',
                order: 2
              }),
              includeSlope: schemaV2.createParameter({
                type: 'boolean',
                label: 'Slope of Lines',
                description: 'Calculate slope between two points',
                helpText: 'm = (y₂-y₁)/(x₂-x₁)',
                order: 3
              }),
              includeLineEquations: schemaV2.createParameter({
                type: 'boolean',
                label: 'Line Equations',
                description: 'Find equations of lines',
                helpText: 'y = mx + b, point-slope form',
                order: 4
              }),
              includePolygonArea: schemaV2.createParameter({
                type: 'boolean',
                label: 'Polygon Area',
                description: 'Find area of polygons using coordinates',
                helpText: 'Shoelace formula for coordinate area',
                order: 5
              }),
              includeGraphing: schemaV2.createParameter({
                type: 'boolean',
                label: 'Graphing Problems',
                description: 'Plot points and graph lines',
                helpText: 'Visual coordinate plane problems',
                order: 6
              }),
              includeWordProblems: schemaV2.createParameter({
                type: 'boolean',
                label: 'Word Problems',
                description: 'Real-world coordinate geometry applications',
                helpText: 'Maps, navigation, design applications',
                order: 7
              })
            }
          }),
          
          coordinates: schemaV2.createCategory({
            id: 'coordinates',
            label: 'Coordinate Ranges',
            description: 'Configure coordinate values and precision',
            icon: 'place',
            color: 'purple',
            order: 3,
            parameters: {
              maxCoordinate: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Coordinate Value',
                description: 'Largest coordinate value to use',
                min: 5,
                max: 50,
                required: true,
                slider: true,
                presets: [10, 15, 20, 25],
                order: 1
              }),
              allowDecimals: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Decimal Coordinates',
                description: 'Include decimal coordinate values',
                helpText: 'Use coordinates like (2.5, 3.7)',
                order: 2
              }),
              decimalPlaces: schemaV2.createParameter({
                type: 'number',
                label: 'Decimal Places',
                description: 'Number of decimal places in coordinates',
                min: 1,
                max: 3,
                required: true,
                dependsOn: 'allowDecimals',
                order: 3
              }),
              slopeFormat: schemaV2.createParameter({
                type: 'select',
                label: 'Slope Format',
                description: 'How to express slope answers',
                options: [
                  { value: 'decimal', label: 'Decimal', description: '1.25, -0.75' },
                  { value: 'fraction', label: 'Fraction', description: '5/4, -3/4' },
                  { value: 'mixed', label: 'Mixed', description: 'Both formats' }
                ],
                order: 4
              })
            }
          }),
          
          visualization: schemaV2.createCategory({
            id: 'visualization',
            label: 'Visualization',
            description: 'Control coordinate plane diagrams and display',
            icon: 'visibility',
            color: 'orange',
            order: 4,
            parameters: {
              showVisualDiagrams: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Coordinate Diagrams',
                description: 'Include coordinate plane graphs',
                helpText: 'Visual representation on coordinate grid',
                order: 1
              }),
              showCoordinateGrid: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Grid Lines',
                description: 'Display grid lines on coordinate plane',
                helpText: 'Helpful for reading coordinates',
                dependsOn: 'showVisualDiagrams',
                order: 2
              }),
              showWork: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Work Steps',
                description: 'Include step-by-step solutions',
                helpText: 'Educational breakdown of calculations',
                order: 3
              }),
              diagramSize: schemaV2.createParameter({
                type: 'select',
                label: 'Diagram Size',
                description: 'Size of the coordinate plane diagrams',
                options: [
                  { value: 'small', label: 'Small', description: '300×300px' },
                  { value: 'medium', label: 'Medium', description: '400×400px' },
                  { value: 'large', label: 'Large', description: '500×500px' }
                ],
                dependsOn: 'showVisualDiagrams',
                order: 4
              })
            }
          })
        },
        
        presets: [
          schemaV2.createPreset({
            id: 'distance-midpoint',
            label: 'Distance & Midpoint',
            description: 'Focus on distance and midpoint calculations',
            icon: 'straighten',
            category: 'concept',
            values: {
              problemCount: 10,
              includeDistance: true,
              includeMidpoint: true,
              includeSlope: false,
              includeLineEquations: false,
              includePolygonArea: false,
              includeGraphing: false,
              includeWordProblems: true,
              maxCoordinate: 15,
              allowDecimals: false,
              slopeFormat: 'decimal',
              showWork: true,
              showVisualDiagrams: true,
              showCoordinateGrid: true,
              diagramSize: 'large',
              complexityLevel: 'basic'
            }
          }),
          
          schemaV2.createPreset({
            id: 'slope-equations',
            label: 'Slope & Line Equations',
            description: 'Practice with slope and linear equations',
            icon: 'trending_up',
            category: 'concept',
            values: {
              problemCount: 8,
              includeDistance: false,
              includeMidpoint: false,
              includeSlope: true,
              includeLineEquations: true,
              includePolygonArea: false,
              includeGraphing: true,
              includeWordProblems: false,
              maxCoordinate: 12,
              allowDecimals: true,
              decimalPlaces: 1,
              slopeFormat: 'fraction',
              showWork: true,
              showVisualDiagrams: true,
              showCoordinateGrid: true,
              diagramSize: 'large',
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'coordinate-area',
            label: 'Coordinate Area Problems',
            description: 'Find area using coordinate geometry',
            icon: 'crop_square',
            category: 'application',
            values: {
              problemCount: 6,
              includeDistance: false,
              includeMidpoint: false,
              includeSlope: false,
              includeLineEquations: false,
              includePolygonArea: true,
              includeGraphing: false,
              includeWordProblems: false,
              maxCoordinate: 20,
              allowDecimals: true,
              decimalPlaces: 2,
              slopeFormat: 'decimal',
              showWork: true,
              showVisualDiagrams: true,
              showCoordinateGrid: true,
              diagramSize: 'large',
              complexityLevel: 'advanced'
            }
          }),
          
          schemaV2.createPreset({
            id: 'real-world-coordinates',
            label: 'Real-World Applications',
            description: 'Practical coordinate geometry problems',
            icon: 'place',
            category: 'application',
            values: {
              problemCount: 8,
              includeDistance: true,
              includeMidpoint: true,
              includeSlope: true,
              includeLineEquations: false,
              includePolygonArea: false,
              includeGraphing: false,
              includeWordProblems: true,
              maxCoordinate: 25,
              allowDecimals: true,
              decimalPlaces: 1,
              slopeFormat: 'decimal',
              showWork: true,
              showVisualDiagrams: true,
              showCoordinateGrid: true,
              diagramSize: 'large',
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive-coordinate',
            label: 'Comprehensive Coordinate Geometry',
            description: 'All coordinate geometry concepts',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 15,
              includeDistance: true,
              includeMidpoint: true,
              includeSlope: true,
              includeLineEquations: true,
              includePolygonArea: true,
              includeGraphing: true,
              includeWordProblems: true,
              maxCoordinate: 20,
              allowDecimals: true,
              decimalPlaces: 2,
              slopeFormat: 'mixed',
              showWork: true,
              showVisualDiagrams: true,
              showCoordinateGrid: true,
              diagramSize: 'medium',
              complexityLevel: 'intermediate'
            }
          })
        ]
      })
    })
  }

  generateProblem(parameters = {}) {
    const params = { ...this.defaultParameters, ...parameters }
    
    const validation = this.parameterSchema.validate(params)
    if (!validation.isValid) {
      throw new Error(`Invalid parameters: ${validation.errors.join(', ')}`)
    }
    
    const problemTypes = []
    if (params.includeDistance) problemTypes.push('distance')
    if (params.includeMidpoint) problemTypes.push('midpoint')
    if (params.includeSlope) problemTypes.push('slope')
    if (params.includeLineEquations) problemTypes.push('lineEquation')
    if (params.includePolygonArea) problemTypes.push('polygonArea')
    if (params.includeGraphing) problemTypes.push('graphing')
    if (params.includeWordProblems) problemTypes.push('wordProblem')
    
    if (problemTypes.length === 0) problemTypes.push('distance')
    
    const problemType = this.getRandomElement(problemTypes)
    return this.generateCoordinateProblem(problemType, params)
  }

  generateCoordinateProblem(problemType, params) {
    switch (problemType) {
      case 'distance':
        return this.generateDistanceProblem(params)
      case 'midpoint':
        return this.generateMidpointProblem(params)
      case 'slope':
        return this.generateSlopeProblem(params)
      case 'lineEquation':
        return this.generateLineEquationProblem(params)
      case 'polygonArea':
        return this.generatePolygonAreaProblem(params)
      case 'graphing':
        return this.generateGraphingProblem(params)
      case 'wordProblem':
        return this.generateWordProblem(params)
      default:
        return this.generateDistanceProblem(params)
    }
  }
  
  generateDistanceProblem(params) {
    const point1 = this.generatePoint(params)
    const point2 = this.generatePoint(params)
    
    const dx = point2.x - point1.x
    const dy = point2.y - point1.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    
    const steps = []
    if (params.showWork) {
      steps.push(`\\text{Distance formula: } d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}`)
      steps.push(`\\text{Given: } A(${point1.x}, ${point1.y}), B(${point2.x}, ${point2.y})`)
      steps.push(`d = \\sqrt{(${point2.x}-${point1.x})^2 + (${point2.y}-${point1.y})^2}`)
      steps.push(`d = \\sqrt{(${dx})^2 + (${dy})^2}`)
      steps.push(`d = \\sqrt{${dx * dx} + ${dy * dy}}`)
      steps.push(`d = \\sqrt{${dx * dx + dy * dy}}`)
      steps.push(`d = ${this.formatNumber(distance, params)}`)
    }
    
    const diagram = this.createCoordinateDiagram([point1, point2], 'distance', params)
    
    return {
      question: `Find the distance between points A(${point1.x}, ${point1.y}) and B(${point2.x}, ${point2.y}).`,
      questionLaTeX: `\\text{Find the distance between points A(${point1.x}, ${point1.y}) and B(${point2.x}, ${point2.y}).}`,
      answer: this.formatNumber(distance, params),
      answerLaTeX: this.formatNumber(distance, params),
      steps: steps,
      diagram: diagram,
      metadata: {
        problemType: 'distance',
        points: [point1, point2],
        distance: distance,
        difficulty: 'medium',
        estimatedTime: '3 minutes'
      }
    }
  }
  
  generateMidpointProblem(params) {
    const point1 = this.generatePoint(params)
    const point2 = this.generatePoint(params)
    
    const midpointX = (point1.x + point2.x) / 2
    const midpointY = (point1.y + point2.y) / 2
    const midpoint = { x: midpointX, y: midpointY }
    
    const steps = []
    if (params.showWork) {
      steps.push(`\\text{Midpoint formula: } M = \\left(\\frac{x_1+x_2}{2}, \\frac{y_1+y_2}{2}\\right)`)
      steps.push(`\\text{Given: } A(${point1.x}, ${point1.y}), B(${point2.x}, ${point2.y})`)
      steps.push(`M = \\left(\\frac{${point1.x}+${point2.x}}{2}, \\frac{${point1.y}+${point2.y}}{2}\\right)`)
      steps.push(`M = \\left(\\frac{${point1.x + point2.x}}{2}, \\frac{${point1.y + point2.y}}{2}\\right)`)
      steps.push(`M = (${this.formatNumber(midpointX, params)}, ${this.formatNumber(midpointY, params)})`)
    }
    
    const diagram = this.createCoordinateDiagram([point1, point2, midpoint], 'midpoint', params)
    
    return {
      question: `Find the midpoint between points A(${point1.x}, ${point1.y}) and B(${point2.x}, ${point2.y}).`,
      questionLaTeX: `\\text{Find the midpoint between points A(${point1.x}, ${point1.y}) and B(${point2.x}, ${point2.y}).}`,
      answer: `(${this.formatNumber(midpointX, params)}, ${this.formatNumber(midpointY, params)})`,
      answerLaTeX: `(${this.formatNumber(midpointX, params)}, ${this.formatNumber(midpointY, params)})`,
      steps: steps,
      diagram: diagram,
      metadata: {
        problemType: 'midpoint',
        points: [point1, point2],
        midpoint: midpoint,
        difficulty: 'easy',
        estimatedTime: '2 minutes'
      }
    }
  }
  
  generateSlopeProblem(params) {
    const point1 = this.generatePoint(params)
    let point2 = this.generatePoint(params)
    
    // Ensure points are different and don't create vertical line
    while (point2.x === point1.x || (point2.x === point1.x && point2.y === point1.y)) {
      point2 = this.generatePoint(params)
    }
    
    const slope = (point2.y - point1.y) / (point2.x - point1.x)
    
    const steps = []
    if (params.showWork) {
      steps.push(`\\text{Slope formula: } m = \\frac{y_2-y_1}{x_2-x_1}`)
      steps.push(`\\text{Given: } A(${point1.x}, ${point1.y}), B(${point2.x}, ${point2.y})`)
      steps.push(`m = \\frac{${point2.y}-${point1.y}}{${point2.x}-${point1.x}}`)
      steps.push(`m = \\frac{${point2.y - point1.y}}{${point2.x - point1.x}}`)
      steps.push(`m = ${this.formatSlope(slope, params)}`)
    }
    
    const diagram = this.createCoordinateDiagram([point1, point2], 'slope', params)
    
    return {
      question: `Find the slope of the line passing through points A(${point1.x}, ${point1.y}) and B(${point2.x}, ${point2.y}).`,
      questionLaTeX: `\\text{Find the slope of the line passing through points A(${point1.x}, ${point1.y}) and B(${point2.x}, ${point2.y}).}`,
      answer: this.formatSlope(slope, params),
      answerLaTeX: this.formatSlope(slope, params),
      steps: steps,
      diagram: diagram,
      metadata: {
        problemType: 'slope',
        points: [point1, point2],
        slope: slope,
        difficulty: 'medium',
        estimatedTime: '3 minutes'
      }
    }
  }
  
  generateLineEquationProblem(params) {
    const point1 = this.generatePoint(params)
    let point2 = this.generatePoint(params)
    
    while (point2.x === point1.x) {
      point2 = this.generatePoint(params)
    }
    
    const slope = (point2.y - point1.y) / (point2.x - point1.x)
    const yIntercept = point1.y - slope * point1.x
    
    const steps = []
    if (params.showWork) {
      steps.push(`\\text{Using point-slope form: } y - y_1 = m(x - x_1)`)
      steps.push(`\\text{First find slope: } m = \\frac{${point2.y - point1.y}}{${point2.x - point1.x}} = ${this.formatSlope(slope, params)}`)
      steps.push(`\\text{Using point (${point1.x}, ${point1.y}):}`)
      steps.push(`y - ${point1.y} = ${this.formatSlope(slope, params)}(x - ${point1.x})`)
      steps.push(`y = ${this.formatSlope(slope, params)}x + ${this.formatNumber(yIntercept, params)}`)
    }
    
    const diagram = this.createCoordinateDiagram([point1, point2], 'line', params)
    
    return {
      question: `Find the equation of the line passing through points (${point1.x}, ${point1.y}) and (${point2.x}, ${point2.y}).`,
      questionLaTeX: `\\text{Find the equation of the line passing through points (${point1.x}, ${point1.y}) and (${point2.x}, ${point2.y}).}`,
      answer: `y = ${this.formatSlope(slope, params)}x + ${this.formatNumber(yIntercept, params)}`,
      answerLaTeX: `y = ${this.formatSlope(slope, params)}x + ${this.formatNumber(yIntercept, params)}`,
      steps: steps,
      diagram: diagram,
      metadata: {
        problemType: 'lineEquation',
        points: [point1, point2],
        slope: slope,
        yIntercept: yIntercept,
        difficulty: 'hard',
        estimatedTime: '4 minutes'
      }
    }
  }
  
  generatePolygonAreaProblem(params) {
    // Generate vertices for a triangle or quadrilateral
    const isTriangle = Math.random() < 0.6
    const vertices = []
    
    if (isTriangle) {
      // Generate 3 vertices for triangle
      for (let i = 0; i < 3; i++) {
        vertices.push(this.generatePoint(params))
      }
    } else {
      // Generate 4 vertices for quadrilateral (ensure they form a valid shape)
      for (let i = 0; i < 4; i++) {
        vertices.push(this.generatePoint(params))
      }
      // Sort vertices to form a proper polygon
      vertices.sort((a, b) => {
        const angleA = Math.atan2(a.y, a.x)
        const angleB = Math.atan2(b.y, b.x)
        return angleA - angleB
      })
    }
    
    const area = this.calculatePolygonArea(vertices)
    const shapeName = isTriangle ? 'triangle' : 'quadrilateral'
    
    const steps = []
    if (params.showWork) {
      steps.push(`\\text{Using shoelace formula for polygon area:}`)
      steps.push(`\\text{Area} = \\frac{1}{2}|\\sum_{i=0}^{n-1}(x_i y_{i+1} - x_{i+1} y_i)|`)
      
      let shoelaceSum = 0
      for (let i = 0; i < vertices.length; i++) {
        const j = (i + 1) % vertices.length
        const term = vertices[i].x * vertices[j].y - vertices[j].x * vertices[i].y
        shoelaceSum += term
        steps.push(`\\text{Term ${i + 1}: } ${vertices[i].x} \\times ${vertices[j].y} - ${vertices[j].x} \\times ${vertices[i].y} = ${term}`)
      }
      
      steps.push(`\\text{Sum: } ${shoelaceSum}`)
      steps.push(`\\text{Area} = \\frac{1}{2}|${shoelaceSum}| = ${this.formatNumber(area, params)}`)
    }
    
    const diagram = this.createCoordinateDiagram(vertices, 'polygon', params)
    
    return {
      question: `Find the area of the ${shapeName} with vertices ${this.formatVerticesList(vertices)}.`,
      questionLaTeX: `\\text{Find the area of the ${shapeName} with vertices ${this.formatVerticesList(vertices)}.}`,
      answer: this.formatNumber(area, params),
      answerLaTeX: this.formatNumber(area, params),
      steps: steps,
      diagram: diagram,
      metadata: {
        problemType: 'polygonArea',
        vertices: vertices,
        area: area,
        shapeName: shapeName,
        difficulty: 'hard',
        estimatedTime: '5 minutes'
      }
    }
  }
  
  generateGraphingProblem(params) {
    const problemTypes = ['plotPoints', 'graphLine', 'findIntersection']
    const type = this.getRandomElement(problemTypes)
    
    switch (type) {
      case 'plotPoints':
        return this.generatePlotPointsProblem(params)
      case 'graphLine':
        return this.generateGraphLineProblem(params)
      case 'findIntersection':
        return this.generateFindIntersectionProblem(params)
      default:
        return this.generatePlotPointsProblem(params)
    }
  }
  
  generatePlotPointsProblem(params) {
    const numPoints = this.getRandomNumber(3, 5)
    const points = []
    
    for (let i = 0; i < numPoints; i++) {
      points.push(this.generatePoint(params))
    }
    
    const steps = []
    if (params.showWork) {
      steps.push(`\\text{Plot each point on the coordinate plane:}`)
      points.forEach((point, i) => {
        const label = String.fromCharCode(65 + i) // A, B, C, etc.
        steps.push(`\\text{Point ${label}: } (${point.x}, ${point.y})`)
      })
    }
    
    const diagram = this.createCoordinateDiagram(points, 'plotPoints', params)
    
    return {
      question: `Plot the following points on a coordinate plane: ${this.formatVerticesList(points)}.`,
      questionLaTeX: `\\text{Plot the following points on a coordinate plane: ${this.formatVerticesList(points)}.}`,
      answer: 'See graph',
      answerLaTeX: '\\text{See graph}',
      steps: steps,
      diagram: diagram,
      metadata: {
        problemType: 'plotPoints',
        points: points,
        difficulty: 'easy',
        estimatedTime: '2 minutes'
      }
    }
  }
  
  generateGraphLineProblem(params) {
    const slope = this.getRandomNumber(-3, 3)
    const yIntercept = this.getRandomNumber(-5, 5)
    
    // Generate some points on the line for verification
    const points = []
    for (let x = -2; x <= 2; x++) {
      const y = slope * x + yIntercept
      if (y >= params.minCoordinate && y <= params.maxCoordinate) {
        points.push({ x, y })
      }
    }
    
    const steps = []
    if (params.showWork) {
      steps.push(`\\text{Equation: } y = ${slope}x + ${yIntercept}`)
      steps.push(`\\text{y-intercept: } (0, ${yIntercept})`)
      steps.push(`\\text{Slope: } ${slope} = \\frac{${slope}}{1}`)
      steps.push(`\\text{From y-intercept, move ${Math.abs(slope)} ${slope > 0 ? 'up' : 'down'} and 1 right}`)
    }
    
    const diagram = this.createCoordinateDiagram(points, 'graphLine', params)
    
    return {
      question: `Graph the line with equation y = ${slope}x + ${yIntercept}.`,
      questionLaTeX: `\\text{Graph the line with equation } y = ${slope}x + ${yIntercept}.`,
      answer: 'See graph',
      answerLaTeX: '\\text{See graph}',
      steps: steps,
      diagram: diagram,
      metadata: {
        problemType: 'graphLine',
        equation: `y = ${slope}x + ${yIntercept}`,
        slope: slope,
        yIntercept: yIntercept,
        points: points,
        difficulty: 'medium',
        estimatedTime: '3 minutes'
      }
    }
  }
  
  generateFindIntersectionProblem(params) {
    // Generate two different lines
    const slope1 = this.getRandomNumber(-2, 2)
    let slope2 = this.getRandomNumber(-2, 2)
    while (slope2 === slope1) {
      slope2 = this.getRandomNumber(-2, 2)
    }
    
    const yInt1 = this.getRandomNumber(-5, 5)
    const yInt2 = this.getRandomNumber(-5, 5)
    
    // Find intersection point
    // y = slope1*x + yInt1 = slope2*x + yInt2
    // (slope1 - slope2)*x = yInt2 - yInt1
    const intersectionX = (yInt2 - yInt1) / (slope1 - slope2)
    const intersectionY = slope1 * intersectionX + yInt1
    
    const steps = []
    if (params.showWork) {
      steps.push(`\\text{Line 1: } y = ${slope1}x + ${yInt1}`)
      steps.push(`\\text{Line 2: } y = ${slope2}x + ${yInt2}`)
      steps.push(`\\text{Set equations equal: } ${slope1}x + ${yInt1} = ${slope2}x + ${yInt2}`)
      steps.push(`${slope1 - slope2}x = ${yInt2 - yInt1}`)
      steps.push(`x = ${this.formatNumber(intersectionX, params)}`)
      steps.push(`y = ${slope1}(${this.formatNumber(intersectionX, params)}) + ${yInt1} = ${this.formatNumber(intersectionY, params)}`)
      steps.push(`\\text{Intersection: } (${this.formatNumber(intersectionX, params)}, ${this.formatNumber(intersectionY, params)})`)
    }
    
    const diagram = this.createCoordinateDiagram([{x: intersectionX, y: intersectionY}], 'intersection', params)
    
    return {
      question: `Find the intersection point of lines y = ${slope1}x + ${yInt1} and y = ${slope2}x + ${yInt2}.`,
      questionLaTeX: `\\text{Find the intersection point of lines } y = ${slope1}x + ${yInt1} \\text{ and } y = ${slope2}x + ${yInt2}.`,
      answer: `(${this.formatNumber(intersectionX, params)}, ${this.formatNumber(intersectionY, params)})`,
      answerLaTeX: `(${this.formatNumber(intersectionX, params)}, ${this.formatNumber(intersectionY, params)})`,
      steps: steps,
      diagram: diagram,
      metadata: {
        problemType: 'findIntersection',
        line1: `y = ${slope1}x + ${yInt1}`,
        line2: `y = ${slope2}x + ${yInt2}`,
        intersection: {x: intersectionX, y: intersectionY},
        difficulty: 'hard',
        estimatedTime: '4 minutes'
      }
    }
  }
  
  generateWordProblem(params) {
    const scenarios = [
      {
        type: 'map_distance',
        setup: () => {
          const city1 = this.generatePoint(params, 0, 20)
          const city2 = this.generatePoint(params, 0, 20)
          const distance = Math.sqrt((city2.x - city1.x) ** 2 + (city2.y - city1.y) ** 2)
          const realDistance = distance * 10 // Scale to km
          
          return {
            question: `On a coordinate map, City A is located at (${city1.x}, ${city1.y}) and City B is at (${city2.x}, ${city2.y}). If each unit represents 10 km, what is the straight-line distance between the cities?`,
            answer: realDistance,
            unit: 'km',
            steps: [
              `\\text{Distance formula: } d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}`,
              `d = \\sqrt{(${city2.x}-${city1.x})^2 + (${city2.y}-${city1.y})^2}`,
              `d = \\sqrt{${(city2.x - city1.x) ** 2 + (city2.y - city1.y) ** 2}} \\text{ units}`,
              `\\text{Real distance: } ${distance.toFixed(1)} \\\\times 10 = ${realDistance.toFixed(1)} \\text{ km}`
            ]
          }
        }
      },
      {
        type: 'playground',
        setup: () => {
          const swing = this.generatePoint(params, -5, 15)
          const slide = this.generatePoint(params, -5, 15)
          const midX = (swing.x + slide.x) / 2
          const midY = (swing.y + slide.y) / 2
          
          return {
            question: `A playground has swings at coordinate (${swing.x}, ${swing.y}) and a slide at (${slide.x}, ${slide.y}). Where should a water fountain be placed so it's exactly halfway between them?`,
            answer: `(${this.formatNumber(midX, params)}, ${this.formatNumber(midY, params)})`,
            steps: [
              `\\text{Midpoint formula: } M = \\left(\\frac{x_1+x_2}{2}, \\frac{y_1+y_2}{2}\\right)`,
              `M = \\left(\\frac{${swing.x}+${slide.x}}{2}, \\frac{${swing.y}+${slide.y}}{2}\\right)`,
              `M = (${this.formatNumber(midX, params)}, ${this.formatNumber(midY, params)})`
            ]
          }
        }
      }
    ]
    
    const scenario = this.getRandomElement(scenarios)
    const problem = scenario.setup()
    
    return {
      question: problem.question,
      questionLaTeX: `\\text{${problem.question.replace(/'/g, "'")}}`,
      answer: problem.answer,
      answerLaTeX: problem.answer.toString(),
      steps: problem.steps,
      metadata: {
        problemType: 'wordProblem',
        scenario: scenario.type,
        difficulty: 'medium',
        estimatedTime: '4 minutes'
      }
    }
  }
  
  // Helper methods for diagram creation
  createCoordinateDiagram(points, type, params) {
    if (!params.showVisualDiagrams) return null
    
    const size = getDiagramSize(params.diagramSize)
    return {
      type: 'geometry-renderer',
      shape: 'coordinate-plane',
      measurements: {},
      unit: 'units',
      data: { 
        points: points, 
        problemType: type,
        coordinateRange: params.maxCoordinate,
        showGridNumbers: true
      },
      config: {
        width: size.width,
        height: size.height,
        theme: 'educational',
        showMeasurements: false,
        showLabels: true,
        showGrid: params.showCoordinateGrid,
        showAxes: true,
        center: true,
        problemType: type,
        xRange: [-params.maxCoordinate, params.maxCoordinate],
        yRange: [-params.maxCoordinate, params.maxCoordinate]
      },
      svgId: `coordinate-${type}-${Date.now()}`
    }
  }
  
  // Polygon area calculation using shoelace formula
  calculatePolygonArea(vertices) {
    let area = 0
    const n = vertices.length
    
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n
      area += vertices[i].x * vertices[j].y
      area -= vertices[j].x * vertices[i].y
    }
    
    return Math.abs(area) / 2
  }
  
  formatVerticesList(vertices) {
    return vertices.map((vertex, i) => {
      const label = String.fromCharCode(65 + i) // A, B, C, etc.
      return `${label}(${vertex.x}, ${vertex.y})`
    }).join(', ')
  }
  
  // Helper methods
  generatePoint(params, minOverride = null, maxOverride = null) {
    const min = minOverride !== null ? minOverride : params.minCoordinate
    const max = maxOverride !== null ? maxOverride : params.maxCoordinate
    
    let x, y
    if (params.allowDecimals) {
      x = this.roundToDecimal(min + Math.random() * (max - min), params.decimalPlaces)
      y = this.roundToDecimal(min + Math.random() * (max - min), params.decimalPlaces)
    } else {
      x = this.getRandomNumber(min, max)
      y = this.getRandomNumber(min, max)
    }
    
    return { x, y }
  }
  
  formatNumber(value, params) {
    if (params.allowDecimals) {
      return value.toFixed(params.decimalPlaces).replace(/\.?0+$/, '')
    } else {
      return Math.round(value).toString()
    }
  }
  
  formatSlope(slope, params) {
    if (params.slopeFormat === 'fraction') {
      return this.decimalToFraction(slope)
    } else if (params.slopeFormat === 'mixed' && Math.random() < 0.5) {
      return this.decimalToFraction(slope)
    } else {
      return this.formatNumber(slope, params)
    }
  }
  
  decimalToFraction(decimal) {
    const tolerance = 1e-6
    let numerator = Math.round(decimal * 1000)
    let denominator = 1000
    
    // Simplify the fraction
    const gcd = this.gcd(Math.abs(numerator), denominator)
    numerator /= gcd
    denominator /= gcd
    
    if (denominator === 1) {
      return numerator.toString()
    }
    
    return `\\frac{${numerator}}{${denominator}}`
  }
  
  gcd(a, b) {
    return b === 0 ? a : this.gcd(b, a % b)
  }
  
  roundToDecimal(number, decimalPlaces) {
    return Math.round(number * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces)
  }
  
  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  
  getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)]
  }
}

export default CoordinateGeometryGenerator