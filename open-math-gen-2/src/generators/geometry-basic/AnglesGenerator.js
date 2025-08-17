import { BaseGenerator } from '../BaseGenerator.js'

/**
 * Angles Generator
 * 
 * Generates problems about angle measurement, types, and relationships
 * Integrates with GeometryRenderer for visual angle diagrams
 */
export class AnglesGenerator extends BaseGenerator {
  constructor() {
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
        showAngleMarks: true,
        showMeasurements: true,
        includeWordProblems: false,
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
        includeAngleIdentification: {
          type: 'boolean',
          label: 'Angle Identification',
          description: 'Identify angle types (acute, obtuse, right)'
        },
        includeAngleMeasurement: {
          type: 'boolean',
          label: 'Angle Measurement',
          description: 'Measure angles using protractor'
        },
        includeAngleClassification: {
          type: 'boolean',
          label: 'Angle Classification',
          description: 'Classify angles by their measurements'
        },
        includeComplementaryAngles: {
          type: 'boolean',
          label: 'Complementary Angles',
          description: 'Two angles that sum to 90°'
        },
        includeSupplementaryAngles: {
          type: 'boolean',
          label: 'Supplementary Angles',
          description: 'Two angles that sum to 180°'
        },
        includeVerticalAngles: {
          type: 'boolean',
          label: 'Vertical Angles',
          description: 'Opposite angles formed by intersecting lines'
        },
        includeAngleAddition: {
          type: 'boolean',
          label: 'Angle Addition',
          description: 'Adding and subtracting angle measures'
        },
        includeAnglesInShapes: {
          type: 'boolean',
          label: 'Angles in Shapes',
          description: 'Interior angles of triangles and polygons'
        },
        minAngle: {
          type: 'number',
          label: 'Minimum Angle',
          description: 'Smallest angle measure in degrees',
          min: 1,
          max: 179
        },
        maxAngle: {
          type: 'number',
          label: 'Maximum Angle',
          description: 'Largest angle measure in degrees',
          min: 1,
          max: 359
        },
        allowReflex: {
          type: 'boolean',
          label: 'Allow Reflex Angles',
          description: 'Include angles greater than 180°'
        },
        showAngleMarks: {
          type: 'boolean',
          label: 'Show Angle Marks',
          description: 'Display angle arc marks in diagrams'
        },
        showMeasurements: {
          type: 'boolean',
          label: 'Show Measurements',
          description: 'Display angle measurements in diagrams'
        },
        includeWordProblems: {
          type: 'boolean',
          label: 'Include Word Problems',
          description: 'Include real-world angle problems'
        },
        showVisualDiagrams: {
          type: 'boolean',
          label: 'Show Visual Diagrams',
          description: 'Include geometric diagrams'
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
    
    return {
      type: 'geometry-renderer',
      shape: 'complementary-angles',
      measurements: { angle1, angle2 },
      config: {
        width: size.width,
        height: size.height,
        theme: params.diagramTheme,
        showMeasurements: params.showMeasurements,
        showAngleMarks: params.showAngleMarks,
        center: true
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
    
    return {
      type: 'geometry-renderer',
      shape: 'supplementary-angles',
      measurements: { angle1, angle2 },
      config: {
        width: size.width,
        height: size.height,
        theme: params.diagramTheme,
        showMeasurements: params.showMeasurements,
        showAngleMarks: params.showAngleMarks,
        center: true
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
    
    return {
      type: 'geometry-renderer',
      shape: 'triangle-angles',
      measurements: { angles },
      config: {
        width: size.width,
        height: size.height,
        theme: params.diagramTheme,
        showMeasurements: params.showMeasurements,
        showAngleMarks: params.showAngleMarks,
        center: true
      },
      svgId: `triangle-angles-${angles.join('-')}-${Date.now()}`
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