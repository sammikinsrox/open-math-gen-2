import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Graphing Basics Generator
 * 
 * Generates problems involving coordinate plane basics, plotting points,
 * finding distances, midpoints, and understanding linear relationships.
 */
export class GraphingBasicsGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Graphing Basics',
      description: 'Coordinate plane, plotting points, and basic graphing concepts',
      category: 'pre-algebra',
      difficulty: 'medium',
      icon: 'show_chart',
      tags: ['graphing', 'coordinates', 'plotting', 'linear'],
      gradeLevel: '6-8',
      estimatedTime: '60 seconds',
      exampleProblem: {
        question: 'Plot the point (3, -2) on the coordinate plane',
        questionLaTeX: '\\text{Plot the point } (3, -2) \\text{ on the coordinate plane}',
        answer: 'Point plotted at (3, -2)',
        answerLaTeX: '\\text{Point plotted at } (3, -2)'
      },
      
      // Default parameter values
      defaultParameters: {
        problemCount: 10,
        includePlottingPoints: true,
        includeIdentifyingPoints: true,
        includeQuadrants: true,
        includeDistance: false,
        includeMidpoint: false,
        includeLinearPatterns: true,
        includeTableToGraph: true,
        includeReadingGraphs: true,
        allowNegatives: true,
        coordinateRange: 8,
        includeOrigin: true,
        showSteps: true,
        complexityLevel: 'basic'
      },
      
      // Enhanced Parameter Schema V2 with beautiful categorization
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
                description: 'How many graphing problems to generate',
                min: 1,
                max: 50,
                required: true,
                slider: true,
                presets: [5, 8, 10, 15],
                order: 1
              }),
              complexityLevel: schemaV2.createParameter({
                type: 'select',
                label: 'Complexity Level',
                description: 'Determines the difficulty of graphing concepts',
                variant: 'cards',
                options: [
                  { 
                    value: 'basic', 
                    label: 'Basic',
                    description: 'Simple coordinate plotting and identification'
                  },
                  { 
                    value: 'intermediate', 
                    label: 'Intermediate',
                    description: 'Distance, midpoint, and linear patterns'
                  },
                  { 
                    value: 'advanced', 
                    label: 'Advanced',
                    description: 'Complex relationships and graph analysis'
                  }
                ],
                order: 2
              })
            }
          }),
          
          problemTypes: schemaV2.createCategory({
            id: 'problemTypes',
            label: 'Problem Types',
            description: 'Choose which types of graphing problems to include',
            icon: 'show_chart',
            color: 'green',
            order: 2,
            parameters: {
              includePlottingPoints: schemaV2.createParameter({
                type: 'boolean',
                label: 'Plotting Points',
                description: 'Plot given coordinate points on a graph',
                helpText: 'Examples: Plot (3, 4), (-2, 1)',
                order: 1
              }),
              includeIdentifyingPoints: schemaV2.createParameter({
                type: 'boolean',
                label: 'Identifying Points',
                description: 'Identify coordinates of plotted points',
                helpText: 'Read coordinates from graphs',
                order: 2
              }),
              includeQuadrants: schemaV2.createParameter({
                type: 'boolean',
                label: 'Quadrant Identification',
                description: 'Identify which quadrant contains points',
                helpText: 'Quadrant I, II, III, or IV',
                order: 3
              }),
              includeLinearPatterns: schemaV2.createParameter({
                type: 'boolean',
                label: 'Linear Patterns',
                description: 'Identify patterns in coordinate pairs',
                helpText: 'Find relationships between x and y values',
                order: 4
              }),
              includeTableToGraph: schemaV2.createParameter({
                type: 'boolean',
                label: 'Table to Graph',
                description: 'Plot points from data tables',
                helpText: 'Convert table data to coordinate points',
                order: 5
              }),
              includeReadingGraphs: schemaV2.createParameter({
                type: 'boolean',
                label: 'Reading Graphs',
                description: 'Answer questions about plotted data',
                helpText: 'Interpret information from graphs',
                order: 6
              })
            }
          }),
          
          advancedFeatures: schemaV2.createCategory({
            id: 'advancedFeatures',
            label: 'Advanced Features',
            description: 'More complex coordinate plane concepts',
            icon: 'auto_awesome',
            color: 'purple',
            order: 3,
            parameters: {
              includeDistance: schemaV2.createParameter({
                type: 'boolean',
                label: 'Distance Formula',
                description: 'Calculate distances between points',
                helpText: 'Use √[(x₂-x₁)² + (y₂-y₁)²]',
                order: 1
              }),
              includeMidpoint: schemaV2.createParameter({
                type: 'boolean',
                label: 'Midpoint Formula',
                description: 'Find midpoints between coordinate points',
                helpText: 'Use ((x₁+x₂)/2, (y₁+y₂)/2)',
                order: 2
              })
            }
          }),
          
          coordinateSettings: schemaV2.createCategory({
            id: 'coordinateSettings',
            label: 'Coordinate Settings',
            description: 'Configure the coordinate plane parameters',
            icon: 'grid_on',
            color: 'orange',
            order: 4,
            parameters: {
              coordinateRange: schemaV2.createParameter({
                type: 'number',
                label: 'Coordinate Range',
                description: 'Maximum coordinate value (both positive and negative)',
                min: 5,
                max: 20,
                required: true,
                slider: true,
                presets: [6, 8, 10, 12],
                helpText: 'Range of -n to +n for coordinates',
                order: 1
              }),
              allowNegatives: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Negative Coordinates',
                description: 'Include negative x and y values',
                helpText: 'Use all four quadrants',
                order: 2
              }),
              includeOrigin: schemaV2.createParameter({
                type: 'boolean',
                label: 'Include Origin',
                description: 'Allow points at (0,0)',
                helpText: 'Include the origin point in problems',
                order: 3
              })
            }
          }),
          
          presentation: schemaV2.createCategory({
            id: 'presentation',
            label: 'Presentation & Format',
            description: 'Control how problems are displayed',
            icon: 'palette',
            color: 'teal',
            order: 5,
            parameters: {
              showSteps: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Solution Steps',
                description: 'Include step-by-step explanations',
                helpText: 'Shows coordinate identification and plotting steps',
                order: 1
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'basic-plotting',
            label: 'Basic Plotting',
            description: 'Simple point plotting and identification',
            icon: 'looks_one',
            category: 'difficulty',
            values: {
              problemCount: 10,
              includePlottingPoints: true,
              includeIdentifyingPoints: true,
              includeQuadrants: true,
              includeDistance: false,
              includeMidpoint: false,
              includeLinearPatterns: false,
              includeTableToGraph: false,
              includeReadingGraphs: false,
              allowNegatives: false,
              coordinateRange: 6,
              includeOrigin: true,
              showSteps: true,
              complexityLevel: 'basic'
            }
          }),
          
          schemaV2.createPreset({
            id: 'four-quadrants',
            label: 'Four Quadrants',
            description: 'Work with all four quadrants of coordinate plane',
            icon: 'crop_square',
            category: 'scope',
            values: {
              problemCount: 12,
              includePlottingPoints: true,
              includeIdentifyingPoints: true,
              includeQuadrants: true,
              includeDistance: false,
              includeMidpoint: false,
              includeLinearPatterns: false,
              includeTableToGraph: true,
              includeReadingGraphs: false,
              allowNegatives: true,
              coordinateRange: 8,
              includeOrigin: true,
              showSteps: true,
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'linear-patterns',
            label: 'Linear Patterns',
            description: 'Focus on identifying linear relationships',
            icon: 'timeline',
            category: 'scope',
            values: {
              problemCount: 10,
              includePlottingPoints: false,
              includeIdentifyingPoints: false,
              includeQuadrants: false,
              includeDistance: false,
              includeMidpoint: false,
              includeLinearPatterns: true,
              includeTableToGraph: true,
              includeReadingGraphs: true,
              allowNegatives: true,
              coordinateRange: 10,
              includeOrigin: true,
              showSteps: true,
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'distance-midpoint',
            label: 'Distance & Midpoint',
            description: 'Advanced coordinate calculations',
            icon: 'straighten',
            category: 'difficulty',
            values: {
              problemCount: 8,
              includePlottingPoints: false,
              includeIdentifyingPoints: false,
              includeQuadrants: false,
              includeDistance: true,
              includeMidpoint: true,
              includeLinearPatterns: false,
              includeTableToGraph: false,
              includeReadingGraphs: false,
              allowNegatives: true,
              coordinateRange: 8,
              includeOrigin: false,
              showSteps: true,
              complexityLevel: 'advanced'
            }
          }),
          
          schemaV2.createPreset({
            id: 'graph-analysis',
            label: 'Graph Analysis',
            description: 'Reading and interpreting coordinate graphs',
            icon: 'analytics',
            category: 'scope',
            values: {
              problemCount: 10,
              includePlottingPoints: false,
              includeIdentifyingPoints: true,
              includeQuadrants: true,
              includeDistance: false,
              includeMidpoint: false,
              includeLinearPatterns: true,
              includeTableToGraph: false,
              includeReadingGraphs: true,
              allowNegatives: true,
              coordinateRange: 10,
              includeOrigin: true,
              showSteps: true,
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive-graphing',
            label: 'Comprehensive Graphing',
            description: 'Complete practice with all graphing concepts',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 15,
              includePlottingPoints: true,
              includeIdentifyingPoints: true,
              includeQuadrants: true,
              includeDistance: false,
              includeMidpoint: false,
              includeLinearPatterns: true,
              includeTableToGraph: true,
              includeReadingGraphs: true,
              allowNegatives: true,
              coordinateRange: 8,
              includeOrigin: true,
              showSteps: true,
              complexityLevel: 'intermediate'
            }
          })
        ]
      })
    })
  }

  /**
   * Generate a single problem
   * @param {Object} parameters - Generation parameters
   * @returns {Object} Problem object
   */
  generateProblem(parameters = {}) {
    const params = { ...this.defaultParameters, ...parameters }
    
    // Validate parameters using Parameter Schema V2
    const validation = this.parameterSchema.validate(params)
    if (!validation.isValid) {
      throw new Error(`Invalid parameters: ${validation.errors.join(', ')}`)
    }
    
    // Additional custom validation
    const customErrors = []
    if (!params.includePlottingPoints && !params.includeIdentifyingPoints && 
        !params.includeQuadrants && !params.includeDistance && !params.includeMidpoint &&
        !params.includeLinearPatterns && !params.includeTableToGraph && !params.includeReadingGraphs) {
      customErrors.push('At least one problem type must be enabled')
    }
    if (customErrors.length > 0) {
      throw new Error(`Invalid parameters: ${customErrors.join(', ')}`)
    }
    
    // Build array of enabled problem types
    const problemTypes = []
    if (params.includePlottingPoints) problemTypes.push('plottingPoints')
    if (params.includeIdentifyingPoints) problemTypes.push('identifyingPoints')
    if (params.includeQuadrants) problemTypes.push('quadrants')
    if (params.includeDistance) problemTypes.push('distance')
    if (params.includeMidpoint) problemTypes.push('midpoint')
    if (params.includeLinearPatterns) problemTypes.push('linearPatterns')
    if (params.includeTableToGraph) problemTypes.push('tableToGraph')
    if (params.includeReadingGraphs) problemTypes.push('readingGraphs')
    
    if (problemTypes.length === 0) {
      throw new Error('At least one problem type must be enabled')
    }
    
    const problemType = this.getRandomElement(problemTypes)
    
    return this.generateGraphingProblem(problemType, params)
  }

  /**
   * Generate a graphing problem
   * @param {string} problemType - Type of problem
   * @param {Object} params - Generation parameters
   * @returns {Object} Problem object
   */
  generateGraphingProblem(problemType, params) {
    switch (problemType) {
      case 'plottingPoints':
        return this.generatePlottingPointsProblem(params)
      case 'identifyingPoints':
        return this.generateIdentifyingPointsProblem(params)
      case 'quadrants':
        return this.generateQuadrantsProblem(params)
      case 'distance':
        return this.generateDistanceProblem(params)
      case 'midpoint':
        return this.generateMidpointProblem(params)
      case 'linearPatterns':
        return this.generateLinearPatternsProblem(params)
      case 'tableToGraph':
        return this.generateTableToGraphProblem(params)
      case 'readingGraphs':
        return this.generateReadingGraphsProblem(params)
      default:
        return this.generatePlottingPointsProblem(params)
    }
  }
  
  generatePlottingPointsProblem(params) {
    const point = this.generatePoint(params)
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{The point } (${point.x}, ${point.y}) \\text{ means:}`)
      steps.push(`\\text{x-coordinate: } ${point.x} \\text{ (horizontal position)}`)
      steps.push(`\\text{y-coordinate: } ${point.y} \\text{ (vertical position)}`)
      steps.push(`\\text{Start at origin, move ${Math.abs(point.x)} ${point.x >= 0 ? 'right' : 'left'}, then ${Math.abs(point.y)} ${point.y >= 0 ? 'up' : 'down'}}`)
    }
    
    return {
      question: `Plot the point (${point.x}, ${point.y}) on the coordinate plane.`,
      questionLaTeX: `\\text{Plot the point } (${point.x}, ${point.y}) \\text{ on the coordinate plane.}`,
      answer: `Point plotted at (${point.x}, ${point.y})`,
      answerLaTeX: `\\text{Point plotted at } (${point.x}, ${point.y})`,
      steps: steps,
      metadata: {
        problemType: 'plottingPoints',
        coordinates: [point.x, point.y],
        quadrant: this.getQuadrant(point.x, point.y),
        difficulty: 'easy',
        estimatedTime: '45 seconds'
      }
    }
  }
  
  generateIdentifyingPointsProblem(params) {
    const point = this.generatePoint(params)
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{To read coordinates from a plotted point:}`)
      steps.push(`\\text{1. Find the x-coordinate (horizontal distance from y-axis)}`)
      steps.push(`\\text{2. Find the y-coordinate (vertical distance from x-axis)}`)
      steps.push(`\\text{The point is at } (${point.x}, ${point.y})`)
    }
    
    return {
      question: `A point is plotted ${Math.abs(point.x)} units ${point.x >= 0 ? 'right' : 'left'} and ${Math.abs(point.y)} units ${point.y >= 0 ? 'up' : 'down'} from the origin. What are its coordinates?`,
      questionLaTeX: `\\text{A point is plotted ${Math.abs(point.x)} units ${point.x >= 0 ? 'right' : 'left'} and} \\\\\\\\ \\text{${Math.abs(point.y)} units ${point.y >= 0 ? 'up' : 'down'} from the origin.} \\\\\\\\ \\text{What are its coordinates?}`,
      answer: `(${point.x}, ${point.y})`,
      answerLaTeX: `(${point.x}, ${point.y})`,
      steps: steps,
      metadata: {
        problemType: 'identifyingPoints',
        coordinates: [point.x, point.y],
        quadrant: this.getQuadrant(point.x, point.y),
        difficulty: 'easy',
        estimatedTime: '40 seconds'
      }
    }
  }
  
  generateQuadrantsProblem(params) {
    const point = this.generatePoint(params)
    const quadrant = this.getQuadrant(point.x, point.y)
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Quadrant rules:}`)
      steps.push(`\\text{I: (+, +), II: (-, +), III: (-, -), IV: (+, -)}`)
      steps.push(`\\text{Point } (${point.x}, ${point.y}): \\text{ x is ${point.x >= 0 ? 'positive' : 'negative'}, y is ${point.y >= 0 ? 'positive' : 'negative'}}`)
      steps.push(`\\text{This point is in ${quadrant}}`)
    }
    
    return {
      question: `In which quadrant is the point (${point.x}, ${point.y}) located?`,
      questionLaTeX: `\\text{In which quadrant is the point } (${point.x}, ${point.y}) \\text{ located?}`,
      answer: quadrant,
      answerLaTeX: `\\text{${quadrant}}`,
      steps: steps,
      metadata: {
        problemType: 'quadrants',
        coordinates: [point.x, point.y],
        quadrant: quadrant,
        difficulty: 'easy',
        estimatedTime: '35 seconds'
      }
    }
  }
  
  generateDistanceProblem(params) {
    const point1 = this.generatePoint(params)
    const point2 = this.generatePoint(params)
    
    const distance = Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2))
    const roundedDistance = Math.round(distance * 100) / 100
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Distance formula: } d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}`)
      steps.push(`\\text{Substitute points: } (${point1.x}, ${point1.y}) \\text{ and } (${point2.x}, ${point2.y})`)
      steps.push(`d = \\sqrt{(${point2.x} - ${point1.x})^2 + (${point2.y} - ${point1.y})^2}`)
      steps.push(`d = \\sqrt{(${point2.x - point1.x})^2 + (${point2.y - point1.y})^2}`)
      steps.push(`d = \\sqrt{${Math.pow(point2.x - point1.x, 2)} + ${Math.pow(point2.y - point1.y, 2)}}`)
      steps.push(`d = \\sqrt{${Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)}} ≈ ${roundedDistance}`)
    }
    
    return {
      question: `Find the distance between points (${point1.x}, ${point1.y}) and (${point2.x}, ${point2.y}).`,
      questionLaTeX: `\\text{Find the distance between points } (${point1.x}, ${point1.y}) \\\\\\\\ \\text{and } (${point2.x}, ${point2.y}).`,
      answer: roundedDistance.toString(),
      answerLaTeX: roundedDistance.toString(),
      steps: steps,
      metadata: {
        problemType: 'distance',
        point1: [point1.x, point1.y],
        point2: [point2.x, point2.y],
        distance: roundedDistance,
        difficulty: 'hard',
        estimatedTime: '70 seconds'
      }
    }
  }
  
  generateMidpointProblem(params) {
    const point1 = this.generatePoint(params)
    const point2 = this.generatePoint(params)
    
    const midpointX = (point1.x + point2.x) / 2
    const midpointY = (point1.y + point2.y) / 2
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Midpoint formula: } M = \\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right)`)
      steps.push(`\\text{Substitute points: } (${point1.x}, ${point1.y}) \\text{ and } (${point2.x}, ${point2.y})`)
      steps.push(`M = \\left(\\frac{${point1.x} + ${point2.x}}{2}, \\frac{${point1.y} + ${point2.y}}{2}\\right)`)
      steps.push(`M = \\left(\\frac{${point1.x + point2.x}}{2}, \\frac{${point1.y + point2.y}}{2}\\right)`)
      steps.push(`M = (${midpointX}, ${midpointY})`)
    }
    
    return {
      question: `Find the midpoint between (${point1.x}, ${point1.y}) and (${point2.x}, ${point2.y}).`,
      questionLaTeX: `\\text{Find the midpoint between } (${point1.x}, ${point1.y}) \\\\\\\\ \\text{and } (${point2.x}, ${point2.y}).`,
      answer: `(${midpointX}, ${midpointY})`,
      answerLaTeX: `(${midpointX}, ${midpointY})`,
      steps: steps,
      metadata: {
        problemType: 'midpoint',
        point1: [point1.x, point1.y],
        point2: [point2.x, point2.y],
        midpoint: [midpointX, midpointY],
        difficulty: 'medium',
        estimatedTime: '50 seconds'
      }
    }
  }
  
  generateLinearPatternsProblem(params) {
    const slope = Math.floor(Math.random() * 4) + 1 // 1-4
    const yIntercept = Math.floor(Math.random() * 6) - 2 // -2 to 3
    
    // Generate points that follow y = mx + b
    const xValues = [0, 1, 2, 3]
    const points = xValues.map(x => ({
      x: x,
      y: slope * x + yIntercept
    }))
    
    const rule = yIntercept === 0 ? `${slope}x` : 
                 yIntercept > 0 ? `${slope}x + ${yIntercept}` : 
                 `${slope}x - ${Math.abs(yIntercept)}`
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Look for a pattern in the coordinates}`)
      steps.push(`\\text{As x increases by 1, y increases by } ${slope}`)
      steps.push(`\\text{When x = 0, y = } ${yIntercept}`)
      steps.push(`\\text{Pattern: } y = ${rule}`)
    }
    
    const pointsList = points.map(p => `(${p.x}, ${p.y})`).join(', ')
    
    return {
      question: `What is the pattern for these coordinate pairs: ${pointsList}?`,
      questionLaTeX: `\\text{What is the pattern for these coordinate pairs: } ${pointsList}\\text{?}`,
      answer: `y = ${rule}`,
      answerLaTeX: `y = ${rule}`,
      steps: steps,
      metadata: {
        problemType: 'linearPatterns',
        points: points.map(p => [p.x, p.y]),
        slope: slope,
        yIntercept: yIntercept,
        rule: `y = ${rule}`,
        difficulty: 'medium',
        estimatedTime: '60 seconds'
      }
    }
  }
  
  generateTableToGraphProblem(params) {
    const relationship = this.getRandomElement([
      { name: 'doubling', rule: x => 2 * x, description: 'y = 2x' },
      { name: 'adding 3', rule: x => x + 3, description: 'y = x + 3' },
      { name: 'times 3', rule: x => 3 * x, description: 'y = 3x' },
      { name: 'subtract 1', rule: x => x - 1, description: 'y = x - 1' }
    ])
    
    const xValues = [1, 2, 3, 4]
    const tableData = xValues.map(x => ({ x: x, y: relationship.rule(x) }))
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{From the table, identify coordinate pairs}`)
      tableData.forEach(data => {
        steps.push(`\\text{When x = } ${data.x}, \\text{ y = } ${data.y} \\text{ gives point } (${data.x}, ${data.y})`)
      })
      steps.push(`\\text{Plot each point on the coordinate plane}`)
    }
    
    const tableStr = tableData.map(d => `x=${d.x}, y=${d.y}`).join('; ')
    const pointsList = tableData.map(d => `(${d.x}, ${d.y})`).join(', ')
    
    return {
      question: `Given the table: ${tableStr}. What points should be plotted?`,
      questionLaTeX: `\\text{Given the table: } ${tableStr}. \\\\\\\\ \\text{What points should be plotted?}`,
      answer: pointsList,
      answerLaTeX: pointsList,
      steps: steps,
      metadata: {
        problemType: 'tableToGraph',
        tableData: tableData,
        points: tableData.map(d => [d.x, d.y]),
        relationship: relationship.description,
        difficulty: 'medium',
        estimatedTime: '55 seconds'
      }
    }
  }
  
  generateReadingGraphsProblem(params) {
    // Generate a simple linear relationship with a few points
    const points = [
      { x: 0, y: 2 },
      { x: 2, y: 6 },
      { x: 4, y: 10 },
      { x: 6, y: 14 }
    ]
    
    const questionPoint = this.getRandomElement(points)
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Locate the point on the graph}`)
      steps.push(`\\text{Find where x = } ${questionPoint.x}`)
      steps.push(`\\text{Read the corresponding y-value}`)
      steps.push(`\\text{At x = } ${questionPoint.x}, \\text{ y = } ${questionPoint.y}`)
    }
    
    const pointsList = points.map(p => `(${p.x}, ${p.y})`).join(', ')
    
    return {
      question: `A graph shows the points: ${pointsList}. What is the y-value when x = ${questionPoint.x}?`,
      questionLaTeX: `\\text{A graph shows the points: } ${pointsList}. \\\\\\\\ \\text{What is the y-value when x = } ${questionPoint.x}\\text{?}`,
      answer: questionPoint.y.toString(),
      answerLaTeX: questionPoint.y.toString(),
      steps: steps,
      metadata: {
        problemType: 'readingGraphs',
        points: points.map(p => [p.x, p.y]),
        queryX: questionPoint.x,
        answerY: questionPoint.y,
        difficulty: 'easy',
        estimatedTime: '40 seconds'
      }
    }
  }

  /**
   * Helper methods
   */
  generatePoint(params) {
    let x, y
    
    if (params.includeOrigin && Math.random() < 0.1) {
      return { x: 0, y: 0 }
    }
    
    do {
      x = params.allowNegatives ? 
        Math.floor(Math.random() * (2 * params.coordinateRange + 1)) - params.coordinateRange :
        Math.floor(Math.random() * params.coordinateRange) + 1
      
      y = params.allowNegatives ? 
        Math.floor(Math.random() * (2 * params.coordinateRange + 1)) - params.coordinateRange :
        Math.floor(Math.random() * params.coordinateRange) + 1
    } while (x === 0 && y === 0 && !params.includeOrigin)
    
    return { x, y }
  }
  
  getQuadrant(x, y) {
    if (x === 0 || y === 0) return 'on an axis'
    if (x > 0 && y > 0) return 'Quadrant I'
    if (x < 0 && y > 0) return 'Quadrant II'
    if (x < 0 && y < 0) return 'Quadrant III'
    if (x > 0 && y < 0) return 'Quadrant IV'
    return 'origin'
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

export default GraphingBasicsGenerator