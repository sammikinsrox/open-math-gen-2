import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'
import { getDiagramSize } from './shared/DiagramSizes.js'

/**
 * Perimeter Generator
 * 
 * Generates problems about calculating perimeter of various shapes
 * Integrates with GeometryRenderer for visual diagrams with measurements
 */
export class PerimeterGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
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
                description: 'How many perimeter problems to generate',
                min: 1,
                max: 50,
                required: true,
                slider: true,
                presets: [5, 8, 10, 15],
                order: 1
              })
            }
          }),
          
          shapes: schemaV2.createCategory({
            id: 'shapes',
            label: 'Shape Types',
            description: 'Choose which shapes to include in perimeter calculations',
            icon: 'straighten',
            color: 'green',
            order: 2,
            parameters: {
              includeRectangles: schemaV2.createParameter({
                type: 'boolean',
                label: 'Rectangles',
                description: 'Include rectangle perimeter problems',
                helpText: 'Formula: P = 2(l + w)',
                order: 1
              }),
              includeSquares: schemaV2.createParameter({
                type: 'boolean',
                label: 'Squares',
                description: 'Include square perimeter problems',
                helpText: 'Formula: P = 4s',
                order: 2
              }),
              includeTriangles: schemaV2.createParameter({
                type: 'boolean',
                label: 'Triangles',
                description: 'Include triangle perimeter problems',
                helpText: 'Formula: P = a + b + c',
                order: 3
              }),
              includeRegularPolygons: schemaV2.createParameter({
                type: 'boolean',
                label: 'Regular Polygons',
                description: 'Include regular polygon perimeter problems',
                helpText: 'Formula: P = n × s (n sides, side length s)',
                order: 4
              }),
              includeIrregularPolygons: schemaV2.createParameter({
                type: 'boolean',
                label: 'Irregular Polygons',
                description: 'Include irregular polygon perimeter problems',
                helpText: 'Add all side lengths together',
                order: 5
              })
            }
          }),
          
          measurements: schemaV2.createCategory({
            id: 'measurements',
            label: 'Measurements',
            description: 'Control measurement ranges and precision',
            icon: 'straighten',
            color: 'purple',
            order: 3,
            parameters: {
              minSideLength: schemaV2.createParameter({
                type: 'number',
                label: 'Minimum Side Length',
                description: 'Smallest side length to use',
                min: 1,
                max: 100,
                required: true,
                slider: true,
                presets: [1, 2, 3, 5],
                helpText: 'Lower bound for all measurements',
                order: 1
              }),
              maxSideLength: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Side Length',
                description: 'Largest side length to use',
                min: 1,
                max: 100,
                required: true,
                slider: true,
                presets: [10, 15, 20, 30],
                helpText: 'Upper bound for all measurements',
                order: 2
              }),
              allowDecimals: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Decimals',
                description: 'Allow decimal measurements',
                helpText: 'Use decimal values like 5.5 cm instead of integers',
                order: 3
              }),
              decimalPlaces: schemaV2.createParameter({
                type: 'number',
                label: 'Decimal Places',
                description: 'Number of decimal places for measurements',
                min: 1,
                max: 3,
                required: true,
                slider: true,
                presets: [1, 2],
                helpText: 'Precision for decimal measurements',
                order: 4
              })
            }
          }),
          
          unitsAndDisplay: schemaV2.createCategory({
            id: 'unitsAndDisplay',
            label: 'Units & Display',
            description: 'Control units and formula display options',
            icon: 'format_textdirection_l_to_r',
            color: 'orange',
            order: 4,
            parameters: {
              units: schemaV2.createParameter({
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
                ],
                helpText: 'Unit type for measurements',
                order: 1
              }),
              showFormulas: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Formulas',
                description: 'Include perimeter formulas in problems',
                helpText: 'Display the formula used for each shape',
                order: 2
              }),
              showSteps: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Steps',
                description: 'Show step-by-step calculations',
                helpText: 'Display intermediate calculation steps',
                order: 3
              }),
              includeWordProblems: schemaV2.createParameter({
                type: 'boolean',
                label: 'Include Word Problems',
                description: 'Include real-world perimeter problems',
                helpText: 'Fencing, borders, frames, etc.',
                order: 4
              })
            }
          }),
          
          visualization: schemaV2.createCategory({
            id: 'visualization',
            label: 'Visualization',
            description: 'Control diagram appearance and features',
            icon: 'visibility',
            color: 'teal',
            order: 5,
            parameters: {
              showVisualDiagrams: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Visual Diagrams',
                description: 'Include geometric diagrams with measurements',
                helpText: 'Display shape diagrams with labeled dimensions',
                order: 1
              }),
              diagramSize: schemaV2.createParameter({
                type: 'select',
                label: 'Diagram Size',
                description: 'Size of the geometric diagrams',
                options: [
                  { value: 'small', label: 'Small' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'large', label: 'Large' }
                ],
                helpText: 'Controls the size of visual diagrams',
                order: 2
              }),
              diagramTheme: schemaV2.createParameter({
                type: 'select',
                label: 'Diagram Theme',
                description: 'Visual style for diagrams',
                options: [
                  { value: 'educational', label: 'Educational' },
                  { value: 'blueprint', label: 'Blueprint' },
                  { value: 'minimal', label: 'Minimal' },
                  { value: 'colorful', label: 'Colorful' }
                ],
                helpText: 'Appearance style for geometry diagrams',
                order: 3
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'basic-rectangles-squares',
            label: 'Basic Rectangles & Squares',
            description: 'Simple perimeter problems with rectangles and squares',
            icon: 'looks_one',
            category: 'difficulty',
            values: {
              problemCount: 10,
              includeRectangles: true,
              includeSquares: true,
              includeTriangles: false,
              includeRegularPolygons: false,
              includeIrregularPolygons: false,
              includeWordProblems: false,
              minSideLength: 2,
              maxSideLength: 15,
              allowDecimals: false,
              decimalPlaces: 1,
              units: 'mixed',
              showFormulas: true,
              showSteps: true,
              showVisualDiagrams: true,
              diagramSize: 'medium',
              diagramTheme: 'educational'
            }
          }),
          
          schemaV2.createPreset({
            id: 'triangles-included',
            label: 'Triangles Included',
            description: 'Include triangles with basic shapes',
            icon: 'change_history',
            category: 'scope',
            values: {
              problemCount: 12,
              includeRectangles: true,
              includeSquares: true,
              includeTriangles: true,
              includeRegularPolygons: false,
              includeIrregularPolygons: false,
              includeWordProblems: true,
              minSideLength: 3,
              maxSideLength: 18,
              allowDecimals: false,
              decimalPlaces: 1,
              units: 'mixed',
              showFormulas: true,
              showSteps: true,
              showVisualDiagrams: true,
              diagramSize: 'medium',
              diagramTheme: 'educational'
            }
          }),
          
          schemaV2.createPreset({
            id: 'regular-polygons',
            label: 'Regular Polygons',
            description: 'Practice with regular polygons (pentagon, hexagon, etc.)',
            icon: 'hexagon',
            category: 'scope',
            values: {
              problemCount: 10,
              includeRectangles: false,
              includeSquares: true,
              includeTriangles: false,
              includeRegularPolygons: true,
              includeIrregularPolygons: false,
              includeWordProblems: false,
              minSideLength: 2,
              maxSideLength: 12,
              allowDecimals: false,
              decimalPlaces: 1,
              units: 'mixed',
              showFormulas: true,
              showSteps: true,
              showVisualDiagrams: true,
              diagramSize: 'medium',
              diagramTheme: 'educational'
            }
          }),
          
          schemaV2.createPreset({
            id: 'decimal-measurements',
            label: 'Decimal Measurements',
            description: 'Practice with decimal side lengths',
            icon: 'looks_two',
            category: 'difficulty',
            values: {
              problemCount: 8,
              includeRectangles: true,
              includeSquares: true,
              includeTriangles: true,
              includeRegularPolygons: false,
              includeIrregularPolygons: false,
              includeWordProblems: false,
              minSideLength: 1,
              maxSideLength: 10,
              allowDecimals: true,
              decimalPlaces: 1,
              units: 'cm',
              showFormulas: true,
              showSteps: true,
              showVisualDiagrams: true,
              diagramSize: 'medium',
              diagramTheme: 'educational'
            }
          }),
          
          schemaV2.createPreset({
            id: 'real-world-problems',
            label: 'Real-World Problems',
            description: 'Word problems with practical perimeter applications',
            icon: 'business',
            category: 'scope',
            values: {
              problemCount: 10,
              includeRectangles: true,
              includeSquares: true,
              includeTriangles: true,
              includeRegularPolygons: false,
              includeIrregularPolygons: true,
              includeWordProblems: true,
              minSideLength: 3,
              maxSideLength: 25,
              allowDecimals: false,
              decimalPlaces: 1,
              units: 'mixed',
              showFormulas: false,
              showSteps: true,
              showVisualDiagrams: true,
              diagramSize: 'medium',
              diagramTheme: 'colorful'
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive-perimeter',
            label: 'Comprehensive Perimeter',
            description: 'Complete practice with all available shapes',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 15,
              includeRectangles: true,
              includeSquares: true,
              includeTriangles: true,
              includeRegularPolygons: true,
              includeIrregularPolygons: true,
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
    if (!params.includeRectangles && !params.includeSquares && !params.includeTriangles &&
        !params.includeRegularPolygons && !params.includeIrregularPolygons) {
      customErrors.push('At least one shape type must be enabled')
    }
    if (params.minSideLength > params.maxSideLength) {
      customErrors.push('Minimum Side Length cannot be greater than Maximum Side Length')
    }
    if (customErrors.length > 0) {
      throw new Error(`Invalid parameters: ${customErrors.join(', ')}`)
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
    
    // Safety check: if no scenarios available for this shape, fall back to basic problem
    if (!scenarios || scenarios.length === 0) {
      console.warn(`No word problem scenarios available for shape: ${shape}. Falling back to basic problem.`)
      return this.generateBasicProblem(shape, unit, params)
    }
    
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
    
    if (shape === 'triangle') {
      const side1 = this.generateMeasurement(params)
      const side2 = this.generateMeasurement(params)
      const side3 = this.generateMeasurement(params)
      const perimeter = side1 + side2 + side3
      
      scenarios.push({
        type: 'field',
        question: `A triangular field has sides of ${this.formatNumber(side1)} ${unit}, ${this.formatNumber(side2)} ${unit}, and ${this.formatNumber(side3)} ${unit}. What is the perimeter of the field?`,
        questionLaTeX: `\\text{A triangular field has sides of ${this.formatNumber(side1)} ${unit}, ${this.formatNumber(side2)} ${unit}, and ${this.formatNumber(side3)} ${unit}.} \\\\\\\\ \\text{What is the perimeter of the field?}`,
        answer: `${this.formatNumber(perimeter)} ${unit}`,
        answerLaTeX: `${this.formatNumber(perimeter)} \\text{ ${unit}}`,
        measurements: { side1, side2, side3 },
        perimeter: perimeter,
        given: `Side 1 = ${side1} ${unit}, Side 2 = ${side2} ${unit}, Side 3 = ${side3} ${unit}`,
        formula: 'P = a + b + c',
        solution: `P = ${side1} + ${side2} + ${side3} = ${perimeter} ${unit}`
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
    // Use wider dimensions for perimeter diagrams since they include measurements
    const size = getDiagramSize('wide', params.diagramSize)
    
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