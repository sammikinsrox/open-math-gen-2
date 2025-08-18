import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Properties Generator
 * 
 * Generates problems about geometric properties, shape classification, and attribute identification
 * Integrates with GeometryRenderer for visual diagrams
 */
export class PropertiesGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Properties & Classification',
      description: 'Geometric properties, shape classification, and attribute identification with visual diagrams',
      category: 'geometry-basic',
      difficulty: 'medium',
      icon: 'category',
      tags: ['properties', 'classification', 'attributes', 'polygons', 'visual'],
      gradeLevel: '3-8',
      estimatedTime: '50 seconds',
      exampleProblem: {
        question: 'Which shape has exactly 4 equal sides and 4 right angles?',
        questionLaTeX: '\\text{Which shape has exactly 4 equal sides and 4 right angles?}',
        answer: 'square',
        answerLaTeX: '\\text{square}'
      },
      
      // Default parameter values
      defaultParameters: {
        problemCount: 10,
        includeShapeClassification: true,
        includePropertyIdentification: true,
        includeComparison: true,
        includePolygonTypes: true,
        includeAngleProperties: true,
        includeSideProperties: true,
        includeRegularIrregular: false,
        includeConvexConcave: false,
        includeQuadrilaterals: true,
        includeTriangleTypes: true,
        includeMultipleChoice: false,
        showVisualDiagrams: true,
        diagramSize: 'medium',
        diagramTheme: 'educational',
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
                description: 'How many problems to generate for this problem set',
                min: 1,
                max: 50,
                required: true,
                slider: true,
                presets: [5, 10, 15, 20],
                order: 1
              }),
              complexityLevel: schemaV2.createParameter({
                type: 'select',
                label: 'Complexity Level',
                description: 'Determines which shapes and properties are included',
                variant: 'cards',
                options: [
                  { 
                    value: 'basic', 
                    label: 'Basic',
                    description: 'Common shapes (triangle, square, circle, etc.)'
                  },
                  { 
                    value: 'intermediate', 
                    label: 'Intermediate',
                    description: 'Includes rhombus, parallelogram, octagon'
                  },
                  { 
                    value: 'advanced', 
                    label: 'Advanced',
                    description: 'Complex polygons (decagon, dodecagon)'
                  }
                ],
                order: 2
              })
            }
          }),
          
          problemTypes: schemaV2.createCategory({
            id: 'problemTypes',
            label: 'Problem Types',
            description: 'Choose which types of problems to include',
            icon: 'quiz',
            color: 'green',
            order: 2,
            parameters: {
              includeShapeClassification: schemaV2.createParameter({
                type: 'boolean',
                label: 'Shape Classification',
                description: 'Identify and classify geometric shapes',
                helpText: 'What type of shape is this?',
                order: 1
              }),
              includePropertyIdentification: schemaV2.createParameter({
                type: 'boolean',
                label: 'Property Identification',
                description: 'Count specific properties of shapes',
                helpText: 'How many sides/angles/vertices does this shape have?',
                order: 2
              }),
              includeComparison: schemaV2.createParameter({
                type: 'boolean',
                label: 'Shape Comparison',
                description: 'Compare properties between different shapes',
                helpText: 'Which shape has more sides?',
                order: 3
              }),
              includePolygonTypes: schemaV2.createParameter({
                type: 'boolean',
                label: 'Polygon Naming',
                description: 'Name polygons by their number of sides',
                helpText: 'What is a 5-sided polygon called?',
                order: 4
              }),
              includeAngleProperties: schemaV2.createParameter({
                type: 'boolean',
                label: 'Angle Properties',
                description: 'Questions about angles in shapes',
                helpText: 'Sum of interior angles, angle counting',
                order: 5
              }),
              includeSideProperties: schemaV2.createParameter({
                type: 'boolean',
                label: 'Side Properties',
                description: 'Questions about sides of shapes',
                helpText: 'Side counting and relationships',
                order: 6
              })
            }
          }),
          
          advancedTypes: schemaV2.createCategory({
            id: 'advancedTypes',
            label: 'Advanced Problem Types',
            description: 'More challenging classification problems',
            icon: 'school',
            color: 'purple',
            order: 3,
            expanded: false,
            parameters: {
              includeQuadrilaterals: schemaV2.createParameter({
                type: 'boolean',
                label: 'Quadrilateral Classification',
                description: 'Classify specific types of quadrilaterals',
                helpText: 'Square, rectangle, rhombus, parallelogram, trapezoid',
                order: 1
              }),
              includeTriangleTypes: schemaV2.createParameter({
                type: 'boolean',
                label: 'Triangle Classification',
                description: 'Classify triangles by sides and angles',
                helpText: 'Equilateral, isosceles, scalene, right triangles',
                order: 2
              }),
              includeRegularIrregular: schemaV2.createParameter({
                type: 'boolean',
                label: 'Regular vs Irregular',
                description: 'Distinguish between regular and irregular polygons',
                helpText: 'All sides and angles equal vs. not equal',
                order: 3
              }),
              includeConvexConcave: schemaV2.createParameter({
                type: 'boolean',
                label: 'Convex vs Concave',
                description: 'Identify convex and concave polygons',
                helpText: 'All interior angles < 180° vs. some > 180°',
                order: 4
              })
            }
          }),
          
          presentation: schemaV2.createCategory({
            id: 'presentation',
            label: 'Presentation & Format',
            description: 'Control how problems are displayed',
            icon: 'palette',
            color: 'orange',
            order: 4,
            parameters: {
              showVisualDiagrams: schemaV2.createParameter({
                type: 'boolean',
                label: 'Visual Diagrams',
                description: 'Include geometric diagrams with problems',
                helpText: 'Highly recommended for better understanding',
                order: 1
              }),
              includeMultipleChoice: schemaV2.createParameter({
                type: 'boolean',
                label: 'Multiple Choice Format',
                description: 'Present some problems as multiple choice',
                helpText: 'Easier for younger students',
                order: 2
              })
            }
          }),
          
          diagrams: schemaV2.createCategory({
            id: 'diagrams',
            label: 'Diagram Settings',
            description: 'Customize the appearance of diagrams',
            icon: 'image',
            color: 'gray',
            order: 5,
            expanded: false,
            parameters: {
              diagramSize: schemaV2.createParameter({
                type: 'select',
                label: 'Diagram Size',
                description: 'Size of the geometric diagrams',
                variant: 'radio',
                options: [
                  { value: 'small', label: 'Small (200px)' },
                  { value: 'medium', label: 'Medium (300px)' },
                  { value: 'large', label: 'Large (400px)' }
                ],
                dependsOn: [{
                  parameter: 'showVisualDiagrams',
                  type: 'equals',
                  value: true
                }],
                order: 1
              }),
              diagramTheme: schemaV2.createParameter({
                type: 'select',
                label: 'Diagram Theme',
                description: 'Visual style for diagrams',
                variant: 'cards',
                options: [
                  { 
                    value: 'educational', 
                    label: 'Educational',
                    description: 'Clean and clear for learning'
                  },
                  { 
                    value: 'colorful', 
                    label: 'Colorful',
                    description: 'Bright and engaging colors'
                  },
                  { 
                    value: 'minimal', 
                    label: 'Minimal',
                    description: 'Simple black and white'
                  },
                  { 
                    value: 'blueprint', 
                    label: 'Blueprint',
                    description: 'Technical blueprint style'
                  }
                ],
                dependsOn: [{
                  parameter: 'showVisualDiagrams',
                  type: 'equals',
                  value: true
                }],
                order: 2
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'beginner',
            label: 'Beginner Friendly',
            description: 'Simple shape identification for younger students',
            icon: 'child_care',
            category: 'difficulty',
            values: {
              problemCount: 10,
              complexityLevel: 'basic',
              includeShapeClassification: true,
              includePropertyIdentification: true,
              includeComparison: false,
              includePolygonTypes: true,
              includeAngleProperties: false,
              includeSideProperties: true,
              includeQuadrilaterals: false,
              includeTriangleTypes: false,
              includeRegularIrregular: false,
              includeConvexConcave: false,
              showVisualDiagrams: true,
              includeMultipleChoice: false,
              diagramSize: 'large',
              diagramTheme: 'colorful'
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive',
            label: 'Comprehensive Review',
            description: 'All problem types for thorough practice',
            icon: 'quiz',
            category: 'scope',
            values: {
              problemCount: 20,
              complexityLevel: 'intermediate',
              includeShapeClassification: true,
              includePropertyIdentification: true,
              includeComparison: true,
              includePolygonTypes: true,
              includeAngleProperties: true,
              includeSideProperties: true,
              includeQuadrilaterals: true,
              includeTriangleTypes: true,
              includeRegularIrregular: false,
              includeConvexConcave: false,
              showVisualDiagrams: true,
              includeMultipleChoice: false,
              diagramSize: 'medium',
              diagramTheme: 'educational'
            }
          }),
          
          schemaV2.createPreset({
            id: 'advanced',
            label: 'Advanced Challenge',
            description: 'Complex shapes and properties for advanced students',
            icon: 'school',
            category: 'difficulty',
            values: {
              problemCount: 15,
              complexityLevel: 'advanced',
              includeShapeClassification: true,
              includePropertyIdentification: true,
              includeComparison: true,
              includePolygonTypes: true,
              includeAngleProperties: true,
              includeSideProperties: true,
              includeQuadrilaterals: true,
              includeTriangleTypes: true,
              includeRegularIrregular: true,
              includeConvexConcave: true,
              showVisualDiagrams: true,
              includeMultipleChoice: false,
              diagramSize: 'medium',
              diagramTheme: 'minimal'
            }
          }),
          
          schemaV2.createPreset({
            id: 'visual-focus',
            label: 'Visual Learning',
            description: 'Emphasis on diagrams and visual identification',
            icon: 'visibility',
            category: 'style',
            values: {
              problemCount: 12,
              complexityLevel: 'basic',
              includeShapeClassification: true,
              includePropertyIdentification: false,
              includeComparison: true,
              includePolygonTypes: true,
              includeAngleProperties: false,
              includeSideProperties: false,
              includeQuadrilaterals: true,
              includeTriangleTypes: true,
              includeRegularIrregular: false,
              includeConvexConcave: false,
              showVisualDiagrams: true,
              includeMultipleChoice: false,
              diagramSize: 'large',
              diagramTheme: 'colorful'
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
    
    // Validate parameters
    const validation = this.validateParameters(params)
    if (!validation.isValid) {
      throw new Error(`Invalid parameters: ${validation.errors.join(', ')}`)
    }
    
    // Build array of enabled problem types
    const problemTypes = []
    if (params.includeShapeClassification) problemTypes.push('classification')
    if (params.includePropertyIdentification) problemTypes.push('propertyId')
    if (params.includeComparison) problemTypes.push('comparison')
    if (params.includePolygonTypes) problemTypes.push('polygonTypes')
    if (params.includeAngleProperties) problemTypes.push('angleProperties')
    if (params.includeSideProperties) problemTypes.push('sideProperties')
    if (params.includeRegularIrregular) problemTypes.push('regularIrregular')
    if (params.includeConvexConcave) problemTypes.push('convexConcave')
    if (params.includeQuadrilaterals) problemTypes.push('quadrilaterals')
    if (params.includeTriangleTypes) problemTypes.push('triangleTypes')
    
    if (problemTypes.length === 0) {
      throw new Error('At least one problem type must be enabled')
    }
    
    const problemType = this.getRandomElement(problemTypes)
    
    return this.generatePropertiesProblem(problemType, params)
  }

  /**
   * Generate a properties problem
   * @param {string} problemType - Type of problem
   * @param {Object} params - Generation parameters
   * @returns {Object} Problem object
   */
  generatePropertiesProblem(problemType, params) {
    switch (problemType) {
      case 'classification':
        return this.generateClassificationProblem(params)
      case 'propertyId':
        return this.generatePropertyIdProblem(params)
      case 'comparison':
        return this.generateComparisonProblem(params)
      case 'polygonTypes':
        return this.generatePolygonTypesProblem(params)
      case 'angleProperties':
        return this.generateAnglePropertiesProblem(params)
      case 'sideProperties':
        return this.generateSidePropertiesProblem(params)
      case 'regularIrregular':
        return this.generateRegularIrregularProblem(params)
      case 'convexConcave':
        return this.generateConvexConcaveProblem(params)
      case 'quadrilaterals':
        return this.generateQuadrilateralsProblem(params)
      case 'triangleTypes':
        return this.generateTriangleTypesProblem(params)
      default:
        return this.generateClassificationProblem(params)
    }
  }
  
  generateClassificationProblem(params) {
    const shapeData = this.getRandomShapeData(params.complexityLevel)
    
    const questions = [
      `What type of shape is this?`,
      `Classify this geometric figure.`,
      `What is the name of this polygon?`
    ]
    
    const question = this.getRandomElement(questions)
    
    const problem = {
      question: question,
      questionLaTeX: `\\text{${question}}`,
      answer: shapeData.name,
      answerLaTeX: `\\text{${shapeData.name}}`,
      steps: [
        `\\text{Count the number of sides: ${shapeData.sides}}`,
        `\\text{Look at the shape's properties}`,
        `\\text{This is a ${shapeData.name}}`
      ],
      metadata: {
        problemType: 'classification',
        shape: shapeData,
        difficulty: 'easy',
        estimatedTime: '30 seconds'
      }
    }
    
    if (params.showVisualDiagrams) {
      problem.diagram = this.generatePropertiesDiagram('classification', shapeData, params)
    }
    
    return problem
  }
  
  generatePropertyIdProblem(params) {
    const shapeData = this.getRandomShapeData(params.complexityLevel)
    const properties = this.getShapeProperties(shapeData)
    
    // For circles, only ask about sides and vertices
    let validProperties = Object.keys(properties)
    if (shapeData.name === 'circle') {
      validProperties = ['sides', 'vertices']
    }
    
    const propertyKey = this.getRandomElement(validProperties)
    const propertyValue = properties[propertyKey]
    
    const propertyQuestions = {
      sides: `How many sides does this ${shapeData.name} have?`,
      vertices: `How many vertices does this ${shapeData.name} have?`,
      rightAngles: `How many right angles does this ${shapeData.name} have?`,
      parallelSides: `How many pairs of parallel sides does this ${shapeData.name} have?`,
      equalSides: `How many equal sides does this ${shapeData.name} have?`
    }
    
    const question = propertyQuestions[propertyKey]
    const answer = propertyValue.toString()
    
    const problem = {
      question: question,
      questionLaTeX: `\\text{${question}}`,
      answer: answer,
      answerLaTeX: answer,
      steps: [
        `\\text{Examine the ${shapeData.name} carefully}`,
        `\\text{Count the ${propertyKey}}`,
        `\\text{Answer: ${answer}}`
      ],
      metadata: {
        problemType: 'propertyId',
        shape: shapeData,
        property: propertyKey,
        propertyValue: propertyValue,
        difficulty: 'medium',
        estimatedTime: '40 seconds'
      }
    }
    
    if (params.showVisualDiagrams) {
      problem.diagram = this.generatePropertiesDiagram('propertyId', shapeData, params, propertyKey)
    }
    
    return problem
  }
  
  generateComparisonProblem(params) {
    const shape1Data = this.getRandomShapeData(params.complexityLevel)
    let shape2Data = this.getRandomShapeData(params.complexityLevel)
    
    // Ensure shapes are different
    while (shape2Data.name === shape1Data.name) {
      shape2Data = this.getRandomShapeData(params.complexityLevel)
    }
    
    const properties1 = this.getShapeProperties(shape1Data)
    const properties2 = this.getShapeProperties(shape2Data)
    
    const comparisonTypes = [
      { property: 'sides', question: 'Which shape has more sides?' },
      { property: 'vertices', question: 'Which shape has more vertices?' },
      { property: 'rightAngles', question: 'Which shape has more right angles?' }
    ]
    
    const comparison = this.getRandomElement(comparisonTypes)
    const prop1 = properties1[comparison.property]
    const prop2 = properties2[comparison.property]
    
    let answer = ''
    if (prop1 > prop2) {
      answer = shape1Data.name
    } else if (prop2 > prop1) {
      answer = shape2Data.name
    } else {
      answer = 'They are equal'
    }
    
    const problem = {
      question: comparison.question,
      questionLaTeX: `\\text{${comparison.question}}`,
      answer: answer,
      answerLaTeX: `\\text{${answer}}`,
      steps: [
        `\\text{${shape1Data.name}: ${prop1} ${comparison.property}}`,
        `\\text{${shape2Data.name}: ${prop2} ${comparison.property}}`,
        `\\text{Answer: ${answer}}`
      ],
      metadata: {
        problemType: 'comparison',
        shape1: shape1Data,
        shape2: shape2Data,
        property: comparison.property,
        difficulty: 'medium',
        estimatedTime: '50 seconds'
      }
    }
    
    if (params.showVisualDiagrams) {
      problem.diagram = this.generateComparisonDiagram(shape1Data, shape2Data, params)
    }
    
    return problem
  }
  
  generateQuadrilateralsProblem(params) {
    const quadrilaterals = [
      { name: 'square', properties: 'all sides equal, all angles 90°' },
      { name: 'rectangle', properties: 'opposite sides equal, all angles 90°' },
      { name: 'parallelogram', properties: 'opposite sides parallel and equal' },
      { name: 'rhombus', properties: 'all sides equal, opposite sides parallel' },
      { name: 'trapezoid', properties: 'one pair of parallel sides' }
    ]
    
    const quad = this.getRandomElement(quadrilaterals)
    
    const questions = [
      `Which quadrilateral has ${quad.properties}?`,
      `What type of quadrilateral is described: ${quad.properties}?`
    ]
    
    const question = this.getRandomElement(questions)
    
    const problem = {
      question: question,
      questionLaTeX: `\\text{${question}}`,
      answer: quad.name,
      answerLaTeX: `\\text{${quad.name}}`,
      steps: [
        `\\text{A quadrilateral has 4 sides}`,
        `\\text{Properties given: ${quad.properties}}`,
        `\\text{This describes a ${quad.name}}`
      ],
      metadata: {
        problemType: 'quadrilaterals',
        quadrilateral: quad,
        difficulty: 'medium',
        estimatedTime: '45 seconds'
      }
    }
    
    if (params.showVisualDiagrams) {
      const shapeData = this.getShapeDataByName(quad.name)
      problem.diagram = this.generatePropertiesDiagram('quadrilaterals', shapeData, params)
    }
    
    return problem
  }
  
  generateTriangleTypesProblem(params) {
    const triangleTypes = [
      { name: 'equilateral triangle', angleProperty: 'all angles equal (60°)', sideProperty: 'all sides equal' },
      { name: 'isosceles triangle', angleProperty: 'two angles equal', sideProperty: 'two sides equal' },
      { name: 'scalene triangle', angleProperty: 'no angles equal', sideProperty: 'no sides equal' },
      { name: 'right triangle', angleProperty: 'one 90° angle', sideProperty: 'sides form right angle' }
    ]
    
    const triangle = this.getRandomElement(triangleTypes)
    const useAngle = Math.random() < 0.5
    const property = useAngle ? triangle.angleProperty : triangle.sideProperty
    
    const question = `What type of triangle has ${property}?`
    
    const problem = {
      question: question,
      questionLaTeX: `\\text{${question}}`,
      answer: triangle.name,
      answerLaTeX: `\\text{${triangle.name}}`,
      steps: [
        `\\text{A triangle has 3 sides and 3 angles}`,
        `\\text{Property given: ${property}}`,
        `\\text{This describes a ${triangle.name}}`
      ],
      metadata: {
        problemType: 'triangleTypes',
        triangle: triangle,
        property: property,
        difficulty: 'medium',
        estimatedTime: '40 seconds'
      }
    }
    
    if (params.showVisualDiagrams) {
      const shapeData = this.getTriangleShapeData(triangle.name)
      problem.diagram = this.generatePropertiesDiagram('triangleTypes', shapeData, params)
    }
    
    return problem
  }
  
  generatePolygonTypesProblem(params) {
    const polygons = [
      { name: 'triangle', sides: 3 },
      { name: 'quadrilateral', sides: 4 },
      { name: 'pentagon', sides: 5 },
      { name: 'hexagon', sides: 6 },
      { name: 'octagon', sides: 8 }
    ]
    
    const polygon = this.getRandomElement(polygons)
    
    const problem = {
      question: `What is a polygon with ${polygon.sides} sides called?`,
      questionLaTeX: `\\text{What is a polygon with ${polygon.sides} sides called?}`,
      answer: polygon.name,
      answerLaTeX: `\\text{${polygon.name}}`,
      steps: [
        `\\text{A polygon is a closed figure with straight sides}`,
        `\\text{A polygon with ${polygon.sides} sides is called a ${polygon.name}}`
      ],
      metadata: {
        problemType: 'polygonTypes',
        polygon: polygon,
        difficulty: 'easy',
        estimatedTime: '20 seconds'
      }
    }
    
    return problem
  }
  
  generateAnglePropertiesProblem(params) {
    let shapeData = this.getRandomShapeData(params.complexityLevel)
    // Exclude circles from angle properties
    while (shapeData.name === 'circle') {
      shapeData = this.getRandomShapeData(params.complexityLevel)
    }
    
    const angleQuestions = [
      { question: `How many angles does a ${shapeData.name} have?`, answer: shapeData.vertices },
      { question: `What is the sum of interior angles in a ${shapeData.name}?`, answer: (shapeData.sides - 2) * 180 }
    ]
    
    const selected = this.getRandomElement(angleQuestions)
    
    const problem = {
      question: selected.question,
      questionLaTeX: `\\text{${selected.question}}`,
      answer: selected.answer.toString(),
      answerLaTeX: selected.answer.toString(),
      steps: [
        `\\text{A ${shapeData.name} has ${shapeData.sides} sides}`,
        `\\text{Answer: ${selected.answer}}`
      ],
      metadata: {
        problemType: 'angleProperties',
        shape: shapeData,
        difficulty: 'medium',
        estimatedTime: '30 seconds'
      }
    }
    
    return problem
  }
  
  generateSidePropertiesProblem(params) {
    const shapeData = this.getRandomShapeData(params.complexityLevel)
    
    const problem = {
      question: `How many sides does a ${shapeData.name} have?`,
      questionLaTeX: `\\text{How many sides does a ${shapeData.name} have?}`,
      answer: shapeData.sides.toString(),
      answerLaTeX: shapeData.sides.toString(),
      steps: [
        `\\text{Count the sides of the ${shapeData.name}}`,
        `\\text{A ${shapeData.name} has ${shapeData.sides} sides}`
      ],
      metadata: {
        problemType: 'sideProperties',
        shape: shapeData,
        difficulty: 'easy',
        estimatedTime: '20 seconds'
      }
    }
    
    return problem
  }
  
  generateRegularIrregularProblem(params) {
    const shapes = [
      { name: 'square', isRegular: true },
      { name: 'rectangle', isRegular: false },
      { name: 'equilateral triangle', isRegular: true },
      { name: 'scalene triangle', isRegular: false }
    ]
    
    const shape = this.getRandomElement(shapes)
    const answer = shape.isRegular ? 'regular' : 'irregular'
    
    const problem = {
      question: `Is a ${shape.name} regular or irregular?`,
      questionLaTeX: `\\text{Is a ${shape.name} regular or irregular?}`,
      answer: answer,
      answerLaTeX: `\\text{${answer}}`,
      steps: [
        `\\text{A regular polygon has all sides and angles equal}`,
        `\\text{A ${shape.name} is ${answer}}`
      ],
      metadata: {
        problemType: 'regularIrregular',
        shape: shape,
        difficulty: 'medium',
        estimatedTime: '35 seconds'
      }
    }
    
    return problem
  }
  
  generateConvexConcaveProblem(params) {
    // For basic level, all shapes are convex
    const answer = 'convex'
    
    const problem = {
      question: `Is this polygon convex or concave?`,
      questionLaTeX: `\\text{Is this polygon convex or concave?}`,
      answer: answer,
      answerLaTeX: `\\text{${answer}}`,
      steps: [
        `\\text{A convex polygon has all interior angles less than 180°}`,
        `\\text{This polygon is ${answer}}`
      ],
      metadata: {
        problemType: 'convexConcave',
        difficulty: 'hard',
        estimatedTime: '45 seconds'
      }
    }
    
    return problem
  }

  /**
   * Helper methods for shape data
   */
  getRandomShapeData(complexityLevel) {
    const shapes = {
      basic: [
        { name: 'triangle', sides: 3, vertices: 3, type: 'polygon' },
        { name: 'square', sides: 4, vertices: 4, type: 'polygon' },
        { name: 'rectangle', sides: 4, vertices: 4, type: 'polygon' },
        { name: 'pentagon', sides: 5, vertices: 5, type: 'polygon' },
        { name: 'hexagon', sides: 6, vertices: 6, type: 'polygon' },
        { name: 'circle', sides: 0, vertices: 0, type: 'circle' }
      ],
      intermediate: [
        { name: 'rhombus', sides: 4, vertices: 4, type: 'polygon' },
        { name: 'parallelogram', sides: 4, vertices: 4, type: 'polygon' },
        { name: 'trapezoid', sides: 4, vertices: 4, type: 'polygon' },
        { name: 'octagon', sides: 8, vertices: 8, type: 'polygon' }
      ],
      advanced: [
        { name: 'decagon', sides: 10, vertices: 10, type: 'polygon' },
        { name: 'dodecagon', sides: 12, vertices: 12, type: 'polygon' }
      ]
    }
    
    const availableShapes = shapes[complexityLevel] || shapes.basic
    return this.getRandomElement(availableShapes)
  }
  
  getShapeProperties(shapeData) {
    const properties = {
      sides: shapeData.sides,
      vertices: shapeData.vertices,
      rightAngles: 0,
      parallelSides: 0,
      equalSides: 0
    }
    
    // Set specific properties based on shape
    switch (shapeData.name) {
      case 'square':
        properties.rightAngles = 4
        properties.parallelSides = 2
        properties.equalSides = 4
        break
      case 'rectangle':
        properties.rightAngles = 4
        properties.parallelSides = 2
        properties.equalSides = 2 // 2 pairs of equal sides
        break
      case 'rhombus':
        properties.rightAngles = 0
        properties.parallelSides = 2
        properties.equalSides = 4
        break
      case 'parallelogram':
        properties.rightAngles = 0
        properties.parallelSides = 2
        properties.equalSides = 2 // 2 pairs of equal sides
        break
      case 'trapezoid':
        properties.rightAngles = 0
        properties.parallelSides = 1
        properties.equalSides = 0
        break
      case 'triangle':
        properties.rightAngles = 0
        properties.parallelSides = 0
        properties.equalSides = 0
        break
      case 'pentagon':
      case 'hexagon':
      case 'octagon':
        properties.rightAngles = 0
        properties.parallelSides = 0
        properties.equalSides = shapeData.sides // Regular polygons have all equal sides
        break
    }
    
    return properties
  }
  
  getShapeDataByName(name) {
    const shapeDatabase = {
      'square': { name: 'square', sides: 4, vertices: 4, type: 'polygon' },
      'rectangle': { name: 'rectangle', sides: 4, vertices: 4, type: 'polygon' },
      'triangle': { name: 'triangle', sides: 3, vertices: 3, type: 'polygon' },
      'rhombus': { name: 'rhombus', sides: 4, vertices: 4, type: 'polygon' },
      'parallelogram': { name: 'parallelogram', sides: 4, vertices: 4, type: 'polygon' },
      'trapezoid': { name: 'trapezoid', sides: 4, vertices: 4, type: 'polygon' }
    }
    
    return shapeDatabase[name] || { name: name, sides: 4, vertices: 4, type: 'polygon' }
  }
  
  getTriangleShapeData(triangleType) {
    return {
      name: triangleType,
      sides: 3,
      vertices: 3,
      type: 'triangle',
      triangleType: triangleType
    }
  }

  /**
   * Generate visual diagrams using GeometryRenderer
   */
  generatePropertiesDiagram(problemType, shapeData, params, highlightProperty = null) {
    const sizes = {
      small: { width: 200, height: 200 },
      medium: { width: 300, height: 250 },
      large: { width: 400, height: 300 }
    }
    
    const size = sizes[params.diagramSize] || sizes.medium
    
    return {
      type: 'geometry-renderer',
      shape: 'properties-figure',
      shapeData: shapeData,
      problemType: problemType,
      config: {
        width: size.width,
        height: size.height,
        theme: params.diagramTheme,
        showLabels: problemType === 'propertyId',
        highlightProperty: highlightProperty,
        showMeasurements: false,
        center: true,
        complexity: params.complexityLevel
      },
      svgId: `properties-${shapeData.name}-${Date.now()}`
    }
  }
  
  generateComparisonDiagram(shape1Data, shape2Data, params) {
    const sizes = {
      small: { width: 300, height: 200 },
      medium: { width: 400, height: 250 },
      large: { width: 500, height: 300 }
    }
    
    const size = sizes[params.diagramSize] || sizes.medium
    
    return {
      type: 'geometry-renderer',
      shape: 'comparison',
      shape1Data: shape1Data,
      shape2Data: shape2Data,
      config: {
        width: size.width,
        height: size.height,
        theme: params.diagramTheme,
        showLabels: true,
        center: true,
        sideBySide: true
      },
      svgId: `comparison-${shape1Data.name}-${shape2Data.name}-${Date.now()}`
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

export default PropertiesGenerator