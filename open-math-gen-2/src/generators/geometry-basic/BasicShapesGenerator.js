import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'
import { getDiagramSize } from './shared/DiagramSizes.js'

/**
 * Basic Shapes Generator
 * 
 * Generates problems about shape identification, properties, and classification
 * Integrates with GeometryRenderer for visual diagrams
 */
export class BasicShapesGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Basic Shapes',
      description: 'Shape identification, properties, and classification problems with visual diagrams',
      category: 'geometry-basic',
      difficulty: 'easy',
      icon: 'category',
      tags: ['shapes', 'geometry', 'visual', 'identification'],
      gradeLevel: 'K-5',
      estimatedTime: '45 seconds',
      exampleProblem: {
        question: 'How many sides does this triangle have?',
        questionLaTeX: '\\text{How many sides does this triangle have?}',
        answer: '3',
        answerLaTeX: '3'
      },
      
      // Default parameter values
      defaultParameters: {
        problemCount: 10,
        includeTriangles: true,
        includeRectangles: true,
        includeSquares: true,
        includeCircles: true,
        includePentagons: false,
        includeHexagons: false,
        includeIdentification: true,
        includeSideCounting: true,
        includeVertexCounting: true,
        includeProperties: true,
        includeClassification: false,
        showVisualDiagrams: true,
        diagramSize: 'medium',
        diagramTheme: 'minimal'
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
                description: 'How many shape problems to generate',
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
            description: 'Choose which shapes to include in problems',
            icon: 'category',
            color: 'green',
            order: 2,
            parameters: {
              includeTriangles: schemaV2.createParameter({
                type: 'boolean',
                label: 'Triangles',
                description: 'Include triangle problems',
                helpText: '3 sides, 3 vertices',
                order: 1
              }),
              includeRectangles: schemaV2.createParameter({
                type: 'boolean',
                label: 'Rectangles',
                description: 'Include rectangle problems',
                helpText: '4 sides, 4 right angles',
                order: 2
              }),
              includeSquares: schemaV2.createParameter({
                type: 'boolean',
                label: 'Squares',
                description: 'Include square problems',
                helpText: '4 equal sides, 4 right angles',
                order: 3
              }),
              includeCircles: schemaV2.createParameter({
                type: 'boolean',
                label: 'Circles',
                description: 'Include circle problems',
                helpText: 'Round shape, no sides or vertices',
                order: 4
              }),
              includePentagons: schemaV2.createParameter({
                type: 'boolean',
                label: 'Pentagons',
                description: 'Include pentagon problems',
                helpText: '5 sides, 5 vertices',
                order: 5
              }),
              includeHexagons: schemaV2.createParameter({
                type: 'boolean',
                label: 'Hexagons',
                description: 'Include hexagon problems',
                helpText: '6 sides, 6 vertices',
                order: 6
              })
            }
          }),
          
          questionTypes: schemaV2.createCategory({
            id: 'questionTypes',
            label: 'Question Types',
            description: 'Choose types of questions about shapes',
            icon: 'quiz',
            color: 'purple',
            order: 3,
            parameters: {
              includeIdentification: schemaV2.createParameter({
                type: 'boolean',
                label: 'Shape Identification',
                description: 'Ask students to identify shape names',
                helpText: 'What shape is this?',
                order: 1
              }),
              includeSideCounting: schemaV2.createParameter({
                type: 'boolean',
                label: 'Side Counting',
                description: 'Ask students to count sides',
                helpText: 'How many sides does this shape have?',
                order: 2
              }),
              includeVertexCounting: schemaV2.createParameter({
                type: 'boolean',
                label: 'Vertex Counting',
                description: 'Ask students to count vertices/corners',
                helpText: 'How many corners does this shape have?',
                order: 3
              }),
              includeProperties: schemaV2.createParameter({
                type: 'boolean',
                label: 'Shape Properties',
                description: 'Ask about shape properties',
                helpText: 'Right angles, parallel sides, symmetry',
                order: 4
              }),
              includeClassification: schemaV2.createParameter({
                type: 'boolean',
                label: 'Shape Classification',
                description: 'Advanced classification questions',
                helpText: 'Polygon/not polygon, regular/irregular',
                order: 5
              })
            }
          }),
          
          visualization: schemaV2.createCategory({
            id: 'visualization',
            label: 'Visualization',
            description: 'Control diagram appearance and features',
            icon: 'visibility',
            color: 'orange',
            order: 4,
            parameters: {
              showVisualDiagrams: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Visual Diagrams',
                description: 'Include shape diagrams with problems',
                helpText: 'Display visual shapes for students to analyze',
                order: 1
              }),
              diagramSize: schemaV2.createParameter({
                type: 'select',
                label: 'Diagram Size',
                description: 'Size of the shape diagrams',
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
                  { value: 'minimal', label: 'Minimal' },
                  { value: 'blueprint', label: 'Blueprint' },
                  { value: 'colorful', label: 'Colorful' }
                ],
                helpText: 'Appearance style for shape diagrams',
                order: 3
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'basic-shapes',
            label: 'Basic Shapes',
            description: 'Simple shape identification with common shapes',
            icon: 'looks_one',
            category: 'difficulty',
            values: {
              problemCount: 10,
              includeTriangles: true,
              includeRectangles: true,
              includeSquares: true,
              includeCircles: true,
              includePentagons: false,
              includeHexagons: false,
              includeIdentification: true,
              includeSideCounting: true,
              includeVertexCounting: false,
              includeProperties: false,
              includeClassification: false,
              showVisualDiagrams: true,
              diagramSize: 'medium',
              diagramTheme: 'minimal'
            }
          }),
          
          schemaV2.createPreset({
            id: 'counting-practice',
            label: 'Counting Practice',
            description: 'Focus on counting sides and vertices',
            icon: 'format_list_numbered',
            category: 'scope',
            values: {
              problemCount: 12,
              includeTriangles: true,
              includeRectangles: true,
              includeSquares: true,
              includeCircles: false,
              includePentagons: true,
              includeHexagons: true,
              includeIdentification: false,
              includeSideCounting: true,
              includeVertexCounting: true,
              includeProperties: false,
              includeClassification: false,
              showVisualDiagrams: true,
              diagramSize: 'medium',
              diagramTheme: 'educational'
            }
          }),
          
          schemaV2.createPreset({
            id: 'shape-properties',
            label: 'Shape Properties',
            description: 'Explore shape properties and characteristics',
            icon: 'rule',
            category: 'scope',
            values: {
              problemCount: 10,
              includeTriangles: true,
              includeRectangles: true,
              includeSquares: true,
              includeCircles: true,
              includePentagons: false,
              includeHexagons: false,
              includeIdentification: false,
              includeSideCounting: false,
              includeVertexCounting: false,
              includeProperties: true,
              includeClassification: false,
              showVisualDiagrams: true,
              diagramSize: 'medium',
              diagramTheme: 'educational'
            }
          }),
          
          schemaV2.createPreset({
            id: 'all-polygons',
            label: 'All Polygons',
            description: 'Practice with all available polygon shapes',
            icon: 'hexagon',
            category: 'scope',
            values: {
              problemCount: 15,
              includeTriangles: true,
              includeRectangles: true,
              includeSquares: true,
              includeCircles: false,
              includePentagons: true,
              includeHexagons: true,
              includeIdentification: true,
              includeSideCounting: true,
              includeVertexCounting: true,
              includeProperties: false,
              includeClassification: false,
              showVisualDiagrams: true,
              diagramSize: 'medium',
              diagramTheme: 'colorful'
            }
          }),
          
          schemaV2.createPreset({
            id: 'advanced-classification',
            label: 'Advanced Classification',
            description: 'Complex shape classification and properties',
            icon: 'trending_up',
            category: 'difficulty',
            values: {
              problemCount: 10,
              includeTriangles: true,
              includeRectangles: true,
              includeSquares: true,
              includeCircles: true,
              includePentagons: true,
              includeHexagons: true,
              includeIdentification: false,
              includeSideCounting: false,
              includeVertexCounting: false,
              includeProperties: true,
              includeClassification: true,
              showVisualDiagrams: true,
              diagramSize: 'medium',
              diagramTheme: 'educational'
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive-shapes',
            label: 'Comprehensive Shapes',
            description: 'Complete practice with all shapes and question types',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 20,
              includeTriangles: true,
              includeRectangles: true,
              includeSquares: true,
              includeCircles: true,
              includePentagons: true,
              includeHexagons: true,
              includeIdentification: true,
              includeSideCounting: true,
              includeVertexCounting: true,
              includeProperties: true,
              includeClassification: false,
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
    if (!params.includeTriangles && !params.includeRectangles && !params.includeSquares && 
        !params.includeCircles && !params.includePentagons && !params.includeHexagons) {
      customErrors.push('At least one shape type must be enabled')
    }
    if (!params.includeIdentification && !params.includeSideCounting && !params.includeVertexCounting &&
        !params.includeProperties && !params.includeClassification) {
      customErrors.push('At least one question type must be enabled')
    }
    if (customErrors.length > 0) {
      throw new Error(`Invalid parameters: ${customErrors.join(', ')}`)
    }
    
    // Build array of enabled shapes
    const enabledShapes = []
    if (params.includeTriangles) enabledShapes.push('triangle')
    if (params.includeRectangles) enabledShapes.push('rectangle')
    if (params.includeSquares) enabledShapes.push('square')
    if (params.includeCircles) enabledShapes.push('circle')
    if (params.includePentagons) enabledShapes.push('pentagon')
    if (params.includeHexagons) enabledShapes.push('hexagon')
    
    if (enabledShapes.length === 0) {
      throw new Error('At least one shape type must be enabled')
    }
    
    // Build array of enabled question types
    const questionTypes = []
    if (params.includeIdentification) questionTypes.push('identification')
    if (params.includeSideCounting) questionTypes.push('sideCounting')
    if (params.includeVertexCounting) questionTypes.push('vertexCounting')
    if (params.includeProperties) questionTypes.push('properties')
    if (params.includeClassification) questionTypes.push('classification')
    
    if (questionTypes.length === 0) {
      throw new Error('At least one question type must be enabled')
    }
    
    const shape = this.getRandomElement(enabledShapes)
    const questionType = this.getRandomElement(questionTypes)
    
    return this.generateShapeProblem(shape, questionType, params)
  }

  /**
   * Generate a shape problem
   * @param {string} shape - Shape type
   * @param {string} questionType - Type of question
   * @param {Object} params - Generation parameters
   * @returns {Object} Problem object
   */
  generateShapeProblem(shape, questionType, params) {
    const shapeData = this.getShapeData(shape)
    let problem = {}
    
    switch (questionType) {
      case 'identification':
        problem = this.generateIdentificationProblem(shapeData, params)
        break
      case 'sideCounting':
        problem = this.generateSideCountingProblem(shapeData, params)
        break
      case 'vertexCounting':
        problem = this.generateVertexCountingProblem(shapeData, params)
        break
      case 'properties':
        problem = this.generatePropertiesProblem(shapeData, params)
        break
      case 'classification':
        problem = this.generateClassificationProblem(shapeData, params)
        break
      default:
        problem = this.generateIdentificationProblem(shapeData, params)
    }
    
    // Add visual diagram if enabled
    if (params.showVisualDiagrams) {
      problem.diagram = this.generateDiagram(shapeData, params)
    }
    
    return problem
  }
  
  generateIdentificationProblem(shapeData, params) {
    return {
      question: `What is the name of this shape?`,
      questionLaTeX: `\\text{What is the name of this shape?}`,
      answer: shapeData.name,
      answerLaTeX: `\\text{${shapeData.name}}`,
      steps: [`\\text{This shape has ${shapeData.sides} sides and ${shapeData.vertices} vertices.}`, `\\text{This makes it a ${shapeData.name}.}`],
      metadata: {
        questionType: 'identification',
        shape: shapeData.type,
        difficulty: 'easy',
        estimatedTime: '30 seconds'
      }
    }
  }
  
  generateSideCountingProblem(shapeData, params) {
    return {
      question: `How many sides does this ${shapeData.name} have?`,
      questionLaTeX: `\\text{How many sides does this ${shapeData.name} have?}`,
      answer: shapeData.sides.toString(),
      answerLaTeX: shapeData.sides.toString(),
      steps: [`\\text{Count each side of the ${shapeData.name}.}`, `\\text{Total sides: ${shapeData.sides}}`],
      metadata: {
        questionType: 'sideCounting',
        shape: shapeData.type,
        difficulty: 'easy',
        estimatedTime: '20 seconds'
      }
    }
  }
  
  generateVertexCountingProblem(shapeData, params) {
    const vertexWord = shapeData.vertices === 1 ? 'vertex' : 'vertices'
    const cornerWord = shapeData.vertices === 1 ? 'corner' : 'corners'
    
    return {
      question: `How many ${this.getRandomElement(['vertices', 'corners'])} does this ${shapeData.name} have?`,
      questionLaTeX: `\\text{How many ${this.getRandomElement(['vertices', 'corners'])} does this ${shapeData.name} have?}`,
      answer: shapeData.vertices.toString(),
      answerLaTeX: shapeData.vertices.toString(),
      steps: [`\\text{Count each ${vertexWord} (corner) of the ${shapeData.name}.}`, `\\text{Total ${vertexWord}: ${shapeData.vertices}}`],
      metadata: {
        questionType: 'vertexCounting',
        shape: shapeData.type,
        difficulty: 'easy',
        estimatedTime: '25 seconds'
      }
    }
  }
  
  generatePropertiesProblem(shapeData, params) {
    const properties = shapeData.properties
    const property = this.getRandomElement(Object.keys(properties))
    const propertyValue = properties[property]
    
    const propertyQuestions = {
      hasRightAngles: `Does this ${shapeData.name} have right angles?`,
      hasParallelSides: `Does this ${shapeData.name} have parallel sides?`,
      isRegular: `Is this ${shapeData.name} regular (all sides equal)?`,
      hasEqualSides: `Does this ${shapeData.name} have all equal sides?`
    }
    
    const question = propertyQuestions[property] || `What is a property of this ${shapeData.name}?`
    const answer = propertyValue ? 'Yes' : 'No'
    
    return {
      question: question,
      questionLaTeX: `\\text{${question}}`,
      answer: answer,
      answerLaTeX: `\\text{${answer}}`,
      steps: [`\\text{Examine the properties of the ${shapeData.name}.}`, `\\text{Answer: ${answer}}`],
      metadata: {
        questionType: 'properties',
        shape: shapeData.type,
        property: property,
        difficulty: 'medium',
        estimatedTime: '45 seconds'
      }
    }
  }
  
  generateClassificationProblem(shapeData, params) {
    const classifications = [
      { question: 'Is this shape a polygon?', answer: shapeData.isPolygon },
      { question: 'Is this shape regular?', answer: shapeData.properties.isRegular },
      { question: 'Is this shape a quadrilateral?', answer: shapeData.sides === 4 }
    ]
    
    const classification = this.getRandomElement(classifications)
    const answer = classification.answer ? 'Yes' : 'No'
    
    return {
      question: classification.question,
      questionLaTeX: `\\text{${classification.question}}`,
      answer: answer,
      answerLaTeX: `\\text{${answer}}`,
      steps: [`\\text{Consider the definition and properties.}`, `\\text{Answer: ${answer}}`],
      metadata: {
        questionType: 'classification',
        shape: shapeData.type,
        difficulty: 'hard',
        estimatedTime: '60 seconds'
      }
    }
  }

  /**
   * Get shape data
   * @param {string} shapeType - Type of shape
   * @returns {Object} Shape properties
   */
  getShapeData(shapeType) {
    const shapes = {
      triangle: {
        type: 'triangle',
        name: 'triangle',
        sides: 3,
        vertices: 3,
        isPolygon: true,
        properties: {
          hasRightAngles: false,
          hasParallelSides: false,
          isRegular: false,
          hasEqualSides: false
        }
      },
      rectangle: {
        type: 'rectangle',
        name: 'rectangle',
        sides: 4,
        vertices: 4,
        isPolygon: true,
        properties: {
          hasRightAngles: true,
          hasParallelSides: true,
          isRegular: false,
          hasEqualSides: false
        }
      },
      square: {
        type: 'square',
        name: 'square',
        sides: 4,
        vertices: 4,
        isPolygon: true,
        properties: {
          hasRightAngles: true,
          hasParallelSides: true,
          isRegular: true,
          hasEqualSides: true
        }
      },
      circle: {
        type: 'circle',
        name: 'circle',
        sides: 0,
        vertices: 0,
        isPolygon: false,
        properties: {
          hasRightAngles: false,
          hasParallelSides: false,
          isRegular: true,
          hasEqualSides: false
        }
      },
      pentagon: {
        type: 'pentagon',
        name: 'pentagon',
        sides: 5,
        vertices: 5,
        isPolygon: true,
        properties: {
          hasRightAngles: false,
          hasParallelSides: false,
          isRegular: false,
          hasEqualSides: false
        }
      },
      hexagon: {
        type: 'hexagon',
        name: 'hexagon',
        sides: 6,
        vertices: 6,
        isPolygon: true,
        properties: {
          hasRightAngles: false,
          hasParallelSides: true,
          isRegular: false,
          hasEqualSides: false
        }
      }
    }
    
    return shapes[shapeType] || shapes.triangle
  }

  /**
   * Generate visual diagram using GeometryRenderer
   * @param {Object} shapeData - Shape data
   * @param {Object} params - Generation parameters
   * @returns {Object} Diagram configuration
   */
  generateDiagram(shapeData, params) {
    const size = getDiagramSize('standard', params.diagramSize)
    
    // Provide default measurements for shapes (used for proper scaling)
    const measurements = this.getDefaultMeasurements(shapeData.type)
    
    return {
      type: 'geometry-renderer',
      shape: shapeData.type,
      measurements: measurements,
      unit: '', // No unit display for basic identification
      config: {
        width: size.width,
        height: size.height,
        theme: params.diagramTheme,
        showMeasurements: false, // Basic shapes don't need measurements for identification
        showLabels: false,
        center: true,
        uniformScale: true
      },
      // SVG will be generated by GeometryRenderer at render time
      svgId: `shape-${shapeData.type}-${Date.now()}`
    }
  }

  /**
   * Get default measurements for shapes (for proper scaling)
   */
  getDefaultMeasurements(shapeType) {
    const measurements = {
      triangle: { base: 6, height: 5 },
      rectangle: { length: 6, width: 4 },
      square: { side: 5 },
      circle: { radius: 3 },
      pentagon: { radius: 3 },
      hexagon: { radius: 3 },
      octagon: { radius: 3 }
    }
    
    return measurements[shapeType] || measurements.rectangle
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

export default BasicShapesGenerator