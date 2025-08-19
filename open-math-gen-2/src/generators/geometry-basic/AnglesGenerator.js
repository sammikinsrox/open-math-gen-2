import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Angles Generator
 * 
 * Generates problems about angle measurement, types, and relationships
 * Integrates with GeometryRenderer for visual angle diagrams
 */
export class AnglesGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Angles',
      description: 'Angle measurement, types, relationships with visual diagrams',
      category: 'geometry-basic',
      difficulty: 'medium',
      icon: 'architecture',
      tags: ['angles', 'geometry', 'measurement', 'visual'],
      gradeLevel: '3-8',
      estimatedTime: '60 seconds',
      exampleProblem: {
        question: 'What type of angle measures 90°?',
        questionLaTeX: '\\text{What type of angle measures 90°?}',
        answer: 'right angle',
        answerLaTeX: '\\text{right angle}'
      },
      
      // Default parameter values
      defaultParameters: {
        problemCount: 10,
        includeAngleIdentification: true,
        includeAngleMeasurement: true,
        includeAngleClassification: true,
        includeComplementaryAngles: false,
        includeSupplementaryAngles: false,
        includeVerticalAngles: false,
        includeAngleAddition: false,
        includeAnglesInShapes: true,
        minAngle: 10,
        maxAngle: 170,
        allowReflex: false,
        // showAngleMarks: true,
        showMeasurements: true,
        // includeWordProblems: false,
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
                description: 'How many angle problems to generate',
                min: 1,
                max: 50,
                required: true,
                slider: true,
                presets: [5, 8, 10, 15],
                order: 1
              })
            }
          }),
          
          problemTypes: schemaV2.createCategory({
            id: 'problemTypes',
            label: 'Problem Types',
            description: 'Choose which types of angle problems to include',
            icon: 'category',
            color: 'green',
            order: 2,
            parameters: {
              includeAngleIdentification: schemaV2.createParameter({
                type: 'boolean',
                label: 'Angle Identification',
                description: 'Identify angle types from diagrams',
                helpText: 'Examples: acute, obtuse, right angle identification',
                order: 1
              }),
              includeAngleMeasurement: schemaV2.createParameter({
                type: 'boolean',
                label: 'Angle Measurement',
                description: 'Measure angles using protractor',
                helpText: 'Reading angle measurements from diagrams',
                order: 2
              }),
              includeAngleClassification: schemaV2.createParameter({
                type: 'boolean',
                label: 'Angle Classification',
                description: 'Classify angles by their measurements',
                helpText: 'Given angle measure, identify the type',
                order: 3
              }),
              includeAnglesInShapes: schemaV2.createParameter({
                type: 'boolean',
                label: 'Angles in Shapes',
                description: 'Interior angles of triangles and polygons',
                helpText: 'Finding missing angles in geometric shapes',
                order: 4
              })
            }
          }),
          
          angleRelationships: schemaV2.createCategory({
            id: 'angleRelationships',
            label: 'Angle Relationships',
            description: 'Problems involving angle relationships',
            icon: 'share',
            color: 'purple',
            order: 3,
            parameters: {
              includeComplementaryAngles: schemaV2.createParameter({
                type: 'boolean',
                label: 'Complementary Angles',
                description: 'Two angles that sum to 90°',
                helpText: 'Finding missing complementary angles',
                order: 1
              }),
              includeSupplementaryAngles: schemaV2.createParameter({
                type: 'boolean',
                label: 'Supplementary Angles',
                description: 'Two angles that sum to 180°',
                helpText: 'Finding missing supplementary angles',
                order: 2
              }),
              includeVerticalAngles: schemaV2.createParameter({
                type: 'boolean',
                label: 'Vertical Angles',
                description: 'Opposite angles formed by intersecting lines',
                helpText: 'Properties of vertical angles',
                order: 3
              }),
              includeAngleAddition: schemaV2.createParameter({
                type: 'boolean',
                label: 'Angle Addition',
                description: 'Adding and subtracting angle measures',
                helpText: 'Adjacent angles forming larger angles',
                order: 4
              })
            }
          }),
          
          angleRanges: schemaV2.createCategory({
            id: 'angleRanges',
            label: 'Angle Ranges',
            description: 'Control the range of angle measurements',
            icon: 'straighten',
            color: 'orange',
            order: 4,
            parameters: {
              minAngle: schemaV2.createParameter({
                type: 'number',
                label: 'Minimum Angle',
                description: 'Smallest angle measure in degrees',
                min: 1,
                max: 179,
                required: true,
                slider: true,
                presets: [5, 10, 15, 30],
                helpText: 'Lower bound for angle values',
                order: 1
              }),
              maxAngle: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Angle',
                description: 'Largest angle measure in degrees',
                min: 1,
                max: 359,
                required: true,
                slider: true,
                presets: [90, 120, 150, 179],
                helpText: 'Upper bound for angle values',
                order: 2
              }),
              allowReflex: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Reflex Angles',
                description: 'Include angles greater than 180°',
                helpText: 'Enable angles between 180° and 360°',
                order: 3
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
                description: 'Include geometric diagrams',
                helpText: 'Display angle diagrams with problems',
                order: 1
              }),
              showMeasurements: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Measurements',
                description: 'Display angle measurements in diagrams',
                helpText: 'Show degree values on diagrams',
                order: 2
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
                order: 3
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
                order: 4
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'basic-angle-types',
            label: 'Basic Angle Types',
            description: 'Fundamental angle identification and classification',
            icon: 'looks_one',
            category: 'difficulty',
            values: {
              problemCount: 10,
              includeAngleIdentification: true,
              includeAngleMeasurement: false,
              includeAngleClassification: true,
              includeComplementaryAngles: false,
              includeSupplementaryAngles: false,
              includeVerticalAngles: false,
              includeAngleAddition: false,
              includeAnglesInShapes: false,
              minAngle: 10,
              maxAngle: 170,
              allowReflex: false,
              showMeasurements: false,
              showVisualDiagrams: true,
              diagramSize: 'medium',
              diagramTheme: 'educational'
            }
          }),
          
          schemaV2.createPreset({
            id: 'angle-measurement',
            label: 'Angle Measurement',
            description: 'Practice measuring angles with protractors',
            icon: 'straighten',
            category: 'scope',
            values: {
              problemCount: 12,
              includeAngleIdentification: false,
              includeAngleMeasurement: true,
              includeAngleClassification: true,
              includeComplementaryAngles: false,
              includeSupplementaryAngles: false,
              includeVerticalAngles: false,
              includeAngleAddition: false,
              includeAnglesInShapes: false,
              minAngle: 15,
              maxAngle: 165,
              allowReflex: false,
              showMeasurements: false,
              showVisualDiagrams: true,
              diagramSize: 'large',
              diagramTheme: 'educational'
            }
          }),
          
          schemaV2.createPreset({
            id: 'angle-relationships',
            label: 'Angle Relationships',
            description: 'Complementary, supplementary, and vertical angles',
            icon: 'share',
            category: 'scope',
            values: {
              problemCount: 10,
              includeAngleIdentification: false,
              includeAngleMeasurement: false,
              includeAngleClassification: false,
              includeComplementaryAngles: true,
              includeSupplementaryAngles: true,
              includeVerticalAngles: true,
              includeAngleAddition: true,
              includeAnglesInShapes: false,
              minAngle: 20,
              maxAngle: 160,
              allowReflex: false,
              showMeasurements: true,
              showVisualDiagrams: true,
              diagramSize: 'medium',
              diagramTheme: 'educational'
            }
          }),
          
          schemaV2.createPreset({
            id: 'angles-in-shapes',
            label: 'Angles in Shapes',
            description: 'Finding angles in triangles and polygons',
            icon: 'change_history',
            category: 'scope',
            values: {
              problemCount: 8,
              includeAngleIdentification: false,
              includeAngleMeasurement: false,
              includeAngleClassification: false,
              includeComplementaryAngles: false,
              includeSupplementaryAngles: false,
              includeVerticalAngles: false,
              includeAngleAddition: false,
              includeAnglesInShapes: true,
              minAngle: 30,
              maxAngle: 120,
              allowReflex: false,
              showMeasurements: true,
              showVisualDiagrams: true,
              diagramSize: 'medium',
              diagramTheme: 'educational'
            }
          }),
          
          schemaV2.createPreset({
            id: 'advanced-angles',
            label: 'Advanced Angles',
            description: 'Complex problems with reflex angles and relationships',
            icon: 'trending_up',
            category: 'difficulty',
            values: {
              problemCount: 12,
              includeAngleIdentification: true,
              includeAngleMeasurement: true,
              includeAngleClassification: true,
              includeComplementaryAngles: true,
              includeSupplementaryAngles: true,
              includeVerticalAngles: true,
              includeAngleAddition: true,
              includeAnglesInShapes: false,
              minAngle: 5,
              maxAngle: 270,
              allowReflex: true,
              showMeasurements: false,
              showVisualDiagrams: true,
              diagramSize: 'medium',
              diagramTheme: 'educational'
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive-angles',
            label: 'Comprehensive Angles',
            description: 'Complete practice with all angle concepts',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 15,
              includeAngleIdentification: true,
              includeAngleMeasurement: true,
              includeAngleClassification: true,
              includeComplementaryAngles: true,
              includeSupplementaryAngles: true,
              includeVerticalAngles: true,
              includeAngleAddition: true,
              includeAnglesInShapes: true,
              minAngle: 10,
              maxAngle: 170,
              allowReflex: false,
              showMeasurements: true,
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
    if (!params.includeAngleIdentification && !params.includeAngleMeasurement && 
        !params.includeAngleClassification && !params.includeComplementaryAngles &&
        !params.includeSupplementaryAngles && !params.includeVerticalAngles &&
        !params.includeAngleAddition && !params.includeAnglesInShapes) {
      customErrors.push('At least one problem type must be enabled')
    }
    if (params.minAngle > params.maxAngle) {
      customErrors.push('Minimum Angle cannot be greater than Maximum Angle')
    }
    if (customErrors.length > 0) {
      throw new Error(`Invalid parameters: ${customErrors.join(', ')}`)
    }
    
    // Build array of enabled problem types
    const problemTypes = []
    if (params.includeAngleIdentification) problemTypes.push('identification')
    if (params.includeAngleMeasurement) problemTypes.push('measurement')
    if (params.includeAngleClassification) problemTypes.push('classification')
    if (params.includeComplementaryAngles) problemTypes.push('complementary')
    if (params.includeSupplementaryAngles) problemTypes.push('supplementary')
    if (params.includeVerticalAngles) problemTypes.push('vertical')
    if (params.includeAngleAddition) problemTypes.push('addition')
    if (params.includeAnglesInShapes) problemTypes.push('shapesAngles')
    
    if (problemTypes.length === 0) {
      throw new Error('At least one problem type must be enabled')
    }
    
    const problemType = this.getRandomElement(problemTypes)
    
    return this.generateAngleProblem(problemType, params)
  }

  /**
   * Generate an angle problem
   * @param {string} problemType - Type of problem
   * @param {Object} params - Generation parameters
   * @returns {Object} Problem object
   */
  generateAngleProblem(problemType, params) {
    switch (problemType) {
      case 'identification':
        return this.generateIdentificationProblem(params)
      case 'measurement':
        return this.generateMeasurementProblem(params)
      case 'classification':
        return this.generateClassificationProblem(params)
      case 'complementary':
        return this.generateComplementaryProblem(params)
      case 'supplementary':
        return this.generateSupplementaryProblem(params)
      case 'vertical':
        return this.generateVerticalAnglesProblem(params)
      case 'addition':
        return this.generateAngleAdditionProblem(params)
      case 'shapesAngles':
        return this.generateShapeAnglesProblem(params)
      default:
        return this.generateIdentificationProblem(params)
    }
  }
  
  generateIdentificationProblem(params) {
    const angle = this.generateAngle(params)
    const angleType = this.getAngleType(angle)
    
    const problem = {
      question: `What type of angle is shown in the diagram?`,
      questionLaTeX: `\\text{What type of angle is shown in the diagram?}`,
      answer: angleType,
      answerLaTeX: `\\text{${angleType}}`,
      steps: [
        `\\text{The angle measures ${angle}°}`,
        `\\text{${this.getAngleTypeExplanation(angle)}}`
      ],
      metadata: {
        problemType: 'identification',
        angle: angle,
        angleType: angleType,
        difficulty: 'easy',
        estimatedTime: '30 seconds'
      }
    }
    
    if (params.showVisualDiagrams) {
      problem.diagram = this.generateAngleDiagram(angle, params, false) // Don't show measurement for identification
    }
    
    return problem
  }
  
  generateMeasurementProblem(params) {
    const angle = this.generateAngle(params)
    
    const problem = {
      question: `What is the measure of the angle shown?`,
      questionLaTeX: `\\text{What is the measure of the angle shown?}`,
      answer: `${angle}°`,
      answerLaTeX: `${angle}°`,
      steps: [
        `\\text{Use a protractor to measure the angle}`,
        `\\text{The angle measures ${angle}°}`
      ],
      metadata: {
        problemType: 'measurement',
        angle: angle,
        angleType: this.getAngleType(angle),
        difficulty: 'medium',
        estimatedTime: '45 seconds'
      }
    }
    
    if (params.showVisualDiagrams) {
      problem.diagram = this.generateAngleDiagram(angle, params, false) // Don't show measurement in diagram
    }
    
    return problem
  }
  
  generateClassificationProblem(params) {
    const angle = this.generateAngle(params)
    const angleType = this.getAngleType(angle)
    
    const problem = {
      question: `An angle measures ${angle}°. What type of angle is this?`,
      questionLaTeX: `\\text{An angle measures ${angle}°. What type of angle is this?}`,
      answer: angleType,
      answerLaTeX: `\\text{${angleType}}`,
      steps: [
        `\\text{${this.getAngleTypeExplanation(angle)}}`
      ],
      metadata: {
        problemType: 'classification',
        angle: angle,
        angleType: angleType,
        difficulty: 'easy',
        estimatedTime: '20 seconds'
      }
    }
    
    return problem
  }
  
  generateComplementaryProblem(params) {
    const angle1 = this.generateAngle({ ...params, maxAngle: 80 }) // Ensure complement exists
    const angle2 = 90 - angle1
    
    const problem = {
      question: `Two angles are complementary. If one angle measures ${angle1}°, what is the measure of the other angle?`,
      questionLaTeX: `\\text{Two angles are complementary. If one angle measures ${angle1}°,} \\\\\\\\ \\text{what is the measure of the other angle?}`,
      answer: `${angle2}°`,
      answerLaTeX: `${angle2}°`,
      steps: [
        `\\text{Complementary angles sum to 90°}`,
        `\\text{Other angle = 90° - ${angle1}°}`,
        `\\text{Other angle = ${angle2}°}`
      ],
      metadata: {
        problemType: 'complementary',
        angle1: angle1,
        angle2: angle2,
        difficulty: 'medium',
        estimatedTime: '40 seconds'
      }
    }
    
    if (params.showVisualDiagrams) {
      problem.diagram = this.generateComplementaryDiagram(angle1, angle2, params)
    }
    
    return problem
  }
  
  generateSupplementaryProblem(params) {
    const angle1 = this.generateAngle({ ...params, maxAngle: 170 }) // Ensure supplement exists
    const angle2 = 180 - angle1
    
    const problem = {
      question: `Two angles are supplementary. If one angle measures ${angle1}°, what is the measure of the other angle?`,
      questionLaTeX: `\\text{Two angles are supplementary. If one angle measures ${angle1}°,} \\\\\\\\ \\text{what is the measure of the other angle?}`,
      answer: `${angle2}°`,
      answerLaTeX: `${angle2}°`,
      steps: [
        `\\text{Supplementary angles sum to 180°}`,
        `\\text{Other angle = 180° - ${angle1}°}`,
        `\\text{Other angle = ${angle2}°}`
      ],
      metadata: {
        problemType: 'supplementary',
        angle1: angle1,
        angle2: angle2,
        difficulty: 'medium',
        estimatedTime: '40 seconds'
      }
    }
    
    if (params.showVisualDiagrams) {
      problem.diagram = this.generateSupplementaryDiagram(angle1, angle2, params)
    }
    
    return problem
  }
  
  generateVerticalAnglesProblem(params) {
    const angle1 = this.generateAngle(params)
    const angle2 = angle1 // Vertical angles are equal
    const angle3 = this.generateAngle(params)
    const angle4 = angle3 // Vertical angles are equal
    
    const problem = {
      question: `Two lines intersect forming vertical angles. If one angle measures ${angle1}°, what is the measure of its vertical angle?`,
      questionLaTeX: `\\text{Two lines intersect forming vertical angles.} \\\\\\\\ \\text{If one angle measures ${angle1}°, what is the measure of its vertical angle?}`,
      answer: `${angle2}°`,
      answerLaTeX: `${angle2}°`,
      steps: [
        `\\text{Vertical angles are formed when two lines intersect}`,
        `\\text{Vertical angles are always equal}`,
        `\\text{Therefore, the vertical angle also measures ${angle2}°}`
      ],
      metadata: {
        problemType: 'vertical',
        angle1: angle1,
        angle2: angle2,
        angle3: angle3,
        angle4: angle4,
        difficulty: 'medium',
        estimatedTime: '40 seconds'
      }
    }
    
    if (params.showVisualDiagrams) {
      problem.diagram = this.generateVerticalAnglesDiagram(angle1, angle2, angle3, angle4, params)
    }
    
    return problem
  }
  
  generateAngleAdditionProblem(params) {
    // Generate two adjacent angles that form a larger angle
    const angle1 = this.generateAngle({ ...params, maxAngle: 80 })
    const angle2 = this.generateAngle({ ...params, maxAngle: 80 })
    const totalAngle = angle1 + angle2
    
    // Ensure the total angle is reasonable
    if (totalAngle > params.maxAngle) {
      return this.generateAngleAdditionProblem(params) // Regenerate
    }
    
    const problem = {
      question: `Two adjacent angles measure ${angle1}° and ${angle2}°. What is the measure of the angle they form together?`,
      questionLaTeX: `\\text{Two adjacent angles measure ${angle1}° and ${angle2}°.} \\\\\\\\ \\text{What is the measure of the angle they form together?}`,
      answer: `${totalAngle}°`,
      answerLaTeX: `${totalAngle}°`,
      steps: [
        `\\text{Adjacent angles can be added together}`,
        `\\text{Total angle = ${angle1}° + ${angle2}°}`,
        `\\text{Total angle = ${totalAngle}°}`
      ],
      metadata: {
        problemType: 'addition',
        angle1: angle1,
        angle2: angle2,
        totalAngle: totalAngle,
        difficulty: 'medium',
        estimatedTime: '35 seconds'
      }
    }
    
    if (params.showVisualDiagrams) {
      problem.diagram = this.generateAngleAdditionDiagram(angle1, angle2, totalAngle, params)
    }
    
    return problem
  }

  generateShapeAnglesProblem(params) {
    const shapes = ['triangle', 'quadrilateral']
    const shape = this.getRandomElement(shapes)
    
    if (shape === 'triangle') {
      const angle1 = this.generateAngle({ ...params, maxAngle: 120 })
      const angle2 = this.generateAngle({ ...params, maxAngle: 120 })
      const angle3 = 180 - angle1 - angle2
      
      // Ensure valid triangle
      if (angle3 <= 0 || angle3 >= 180) {
        return this.generateShapeAnglesProblem(params) // Regenerate
      }
      
      const problem = {
        question: `In a triangle, two angles measure ${angle1}° and ${angle2}°. What is the measure of the third angle?`,
        questionLaTeX: `\\text{In a triangle, two angles measure ${angle1}° and ${angle2}°.} \\\\\\\\ \\text{What is the measure of the third angle?}`,
        answer: `${angle3}°`,
        answerLaTeX: `${angle3}°`,
        steps: [
          `\\text{The sum of angles in a triangle is 180°}`,
          `\\text{Third angle = 180° - ${angle1}° - ${angle2}°}`,
          `\\text{Third angle = ${angle3}°}`
        ],
        metadata: {
          problemType: 'triangleAngles',
          angle1: angle1,
          angle2: angle2,
          angle3: angle3,
          difficulty: 'medium',
          estimatedTime: '50 seconds'
        }
      }
      
      if (params.showVisualDiagrams) {
        problem.diagram = this.generateTriangleDiagram([angle1, angle2, angle3], params)
      }
      
      return problem
    }
    
    // Default fallback - return a triangle problem if other shapes not implemented
    return this.generateShapeAnglesProblem({ ...params, shapes: ['triangle'] })
  }

  /**
   * Generate an angle measurement
   * @param {Object} params - Generation parameters
   * @returns {number} Angle in degrees
   */
  generateAngle(params) {
    const min = params.minAngle
    const max = params.allowReflex ? Math.min(params.maxAngle, 359) : Math.min(params.maxAngle, 179)
    
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  /**
   * Get angle type based on measurement
   * @param {number} angle - Angle in degrees
   * @returns {string} Angle type
   */
  getAngleType(angle) {
    if (angle === 90) return 'right angle'
    if (angle < 90) return 'acute angle'
    if (angle === 180) return 'straight angle'
    if (angle < 180) return 'obtuse angle'
    return 'reflex angle'
  }

  /**
   * Get explanation for angle type
   * @param {number} angle - Angle in degrees
   * @returns {string} Explanation
   */
  getAngleTypeExplanation(angle) {
    if (angle === 90) return 'An angle that measures exactly 90° is a right angle'
    if (angle < 90) return 'An angle that measures less than 90° is an acute angle'
    if (angle === 180) return 'An angle that measures exactly 180° is a straight angle'
    if (angle < 180) return 'An angle that measures more than 90° but less than 180° is an obtuse angle'
    return 'An angle that measures more than 180° is a reflex angle'
  }

  /**
   * Generate angle diagram using GeometryRenderer
   * @param {number} angle - Angle measurement
   * @param {Object} params - Generation parameters
   * @param {boolean} showMeasurement - Whether to show the measurement
   * @returns {Object} Diagram configuration
   */
  generateAngleDiagram(angle, params, showMeasurement = true) {
    const sizes = {
      small: { width: 200, height: 150 },
      medium: { width: 300, height: 200 },
      large: { width: 400, height: 250 }
    }
    
    const size = sizes[params.diagramSize] || sizes.medium
    
    return {
      type: 'geometry-renderer',
      shape: 'angle',
      measurements: { angle },
      config: {
        width: size.width,
        height: size.height,
        theme: params.diagramTheme,
        showMeasurements: showMeasurement && params.showMeasurements,
        showAngleMarks: params.showAngleMarks,
        center: true
      },
      svgId: `angle-${angle}-${Date.now()}`
    }
  }
  
  generateComplementaryDiagram(angle1, angle2, params) {
    const sizes = {
      small: { width: 200, height: 150 },
      medium: { width: 300, height: 200 },
      large: { width: 400, height: 250 }
    }
    
    const size = sizes[params.diagramSize] || sizes.medium
    
    // Show two angles that form a right angle (90°)
    return {
      type: 'geometry-renderer',
      shape: 'right-angle-pair',
      measurements: { 
        angle1, 
        angle2,
        totalAngle: 90
      },
      config: {
        width: size.width,
        height: size.height,
        theme: params.diagramTheme,
        showMeasurements: params.showMeasurements,
        showAngleMarks: true,
        center: true,
        showRightAngleSymbol: true,
        labelKnownAngle: true,
        knownAngle: angle1
      },
      svgId: `complementary-${angle1}-${angle2}-${Date.now()}`
    }
  }
  
  generateSupplementaryDiagram(angle1, angle2, params) {
    const sizes = {
      small: { width: 250, height: 150 },
      medium: { width: 350, height: 200 },
      large: { width: 450, height: 250 }
    }
    
    const size = sizes[params.diagramSize] || sizes.medium
    
    // Show two angles that form a straight line (180°)
    return {
      type: 'geometry-renderer',
      shape: 'straight-line-pair',
      measurements: { 
        angle1, 
        angle2,
        totalAngle: 180
      },
      config: {
        width: size.width,
        height: size.height,
        theme: params.diagramTheme,
        showMeasurements: params.showMeasurements,
        showAngleMarks: true,
        center: true,
        showStraightLine: true,
        labelKnownAngle: true,
        knownAngle: angle1
      },
      svgId: `supplementary-${angle1}-${angle2}-${Date.now()}`
    }
  }
  
  generateTriangleDiagram(angles, params) {
    const sizes = {
      small: { width: 200, height: 150 },
      medium: { width: 300, height: 200 },
      large: { width: 400, height: 250 }
    }
    
    const size = sizes[params.diagramSize] || sizes.medium
    
    // Show a triangle with two known angles labeled, third angle unlabeled
    return {
      type: 'geometry-renderer',
      shape: 'triangle',
      measurements: { 
        angle1: angles[0],
        angle2: angles[1], 
        angle3: angles[2]
      },
      config: {
        width: size.width,
        height: size.height,
        theme: params.diagramTheme,
        showMeasurements: params.showMeasurements,
        showAngleMarks: true,
        center: true,
        labelKnownAngles: true,
        knownAngles: [angles[0], angles[1]], // Show first two angles, hide third
        hideUnknownAngle: true
      },
      svgId: `triangle-angles-${angles.join('-')}-${Date.now()}`
    }
  }
  
  generateVerticalAnglesDiagram(angle1, angle2, angle3, angle4, params) {
    const sizes = {
      small: { width: 200, height: 150 },
      medium: { width: 300, height: 200 },
      large: { width: 400, height: 250 }
    }
    
    const size = sizes[params.diagramSize] || sizes.medium
    
    // Show two intersecting lines with vertical angles highlighted
    return {
      type: 'geometry-renderer',
      shape: 'crossed-lines',
      measurements: { 
        angle1, 
        angle2: angle1, // vertical angles are equal
        angle3, 
        angle4: angle3  // vertical angles are equal
      },
      config: {
        width: size.width,
        height: size.height,
        theme: params.diagramTheme,
        showMeasurements: params.showMeasurements,
        showAngleMarks: true,
        center: true,
        highlightVerticalPairs: true,
        labelKnownAngle: true,
        knownAngle: angle1
      },
      svgId: `vertical-angles-${angle1}-${angle3}-${Date.now()}`
    }
  }
  
  generateAngleAdditionDiagram(angle1, angle2, totalAngle, params) {
    const sizes = {
      small: { width: 250, height: 150 },
      medium: { width: 350, height: 200 },
      large: { width: 450, height: 250 }
    }
    
    const size = sizes[params.diagramSize] || sizes.medium
    
    // Show two adjacent angles that combine to form a larger angle
    return {
      type: 'geometry-renderer',
      shape: 'adjacent-angles',
      measurements: { 
        angle1, 
        angle2, 
        totalAngle
      },
      config: {
        width: size.width,
        height: size.height,
        theme: params.diagramTheme,
        showMeasurements: params.showMeasurements,
        showAngleMarks: true,
        center: true,
        showSharedRay: true,
        labelBothAngles: true,
        showTotalAngle: false // Don't show answer
      },
      svgId: `angle-addition-${angle1}-${angle2}-${Date.now()}`
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

export default AnglesGenerator