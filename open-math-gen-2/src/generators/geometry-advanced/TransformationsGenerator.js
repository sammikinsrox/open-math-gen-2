import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'
import { getDiagramSize } from '../geometry-basic/shared/DiagramSizes.js'

/**
 * Transformations Generator
 * 
 * Generates geometric transformation problems including translations, rotations,
 * reflections, dilations, and composite transformations with coordinate geometry.
 */
export class TransformationsGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Transformations',
      description: 'Geometric transformations including translations, rotations, reflections, dilations, and composite transformations',
      category: 'geometry-advanced',
      difficulty: 'medium',
      icon: 'transform',
      tags: ['transformations', 'translation', 'rotation', 'reflection', 'dilation'],
      gradeLevel: '8-12',
      estimatedTime: '4-6 minutes',
      exampleProblem: {
        question: 'Translate triangle ABC with vertices A(2,3), B(5,1), C(1,6) by the vector (3,-2).',
        questionLaTeX: '\\text{Translate triangle ABC with vertices A(2,3), B(5,1), C(1,6) by the vector (3,-2).}',
        answer: "A'(5,1), B'(8,-1), C'(4,4)",
        answerLaTeX: "A'(5,1), B'(8,-1), C'(4,4)"
      },
      
      defaultParameters: {
        problemCount: 8,
        includeTranslations: true,
        includeRotations: true,
        includeReflections: true,
        includeDilations: true,
        includeCompositeTransformations: false,
        includeWordProblems: true,
        coordinateRange: 10,
        useSimpleShapes: true,
        showPreImage: true,
        showBothImages: true,
        allowDecimals: false,
        decimalPlaces: 1,
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
                description: 'How many transformation problems to generate',
                min: 1,
                max: 20,
                required: true,
                slider: true,
                presets: [6, 8, 10, 12],
                order: 1
              }),
              complexityLevel: schemaV2.createParameter({
                type: 'select',
                label: 'Complexity Level',
                description: 'Determines the difficulty of transformation problems',
                variant: 'cards',
                options: [
                  { value: 'basic', label: 'Basic', description: 'Simple transformations with easy coordinates' },
                  { value: 'intermediate', label: 'Intermediate', description: 'Mixed transformations and moderate coordinates' },
                  { value: 'advanced', label: 'Advanced', description: 'Complex transformations and composite operations' }
                ],
                order: 2
              })
            }
          }),
          
          transformationTypes: schemaV2.createCategory({
            id: 'transformationTypes',
            label: 'Transformation Types',
            description: 'Choose which types of transformations to include',
            icon: 'transform',
            color: 'green',
            order: 2,
            parameters: {
              includeTranslations: schemaV2.createParameter({
                type: 'boolean',
                label: 'Translations',
                description: 'Sliding shapes without changing size or orientation',
                helpText: '(x,y) → (x+a, y+b)',
                order: 1
              }),
              includeRotations: schemaV2.createParameter({
                type: 'boolean',
                label: 'Rotations',
                description: 'Turning shapes around a point',
                helpText: '90°, 180°, 270° rotations around origin',
                order: 2
              }),
              includeReflections: schemaV2.createParameter({
                type: 'boolean',
                label: 'Reflections',
                description: 'Flipping shapes across a line',
                helpText: 'Across x-axis, y-axis, or y = x',
                order: 3
              }),
              includeDilations: schemaV2.createParameter({
                type: 'boolean',
                label: 'Dilations',
                description: 'Scaling shapes larger or smaller',
                helpText: 'Scale factor from center point',
                order: 4
              }),
              includeCompositeTransformations: schemaV2.createParameter({
                type: 'boolean',
                label: 'Composite Transformations',
                description: 'Multiple transformations in sequence',
                helpText: 'Two or more transformations combined',
                order: 5
              }),
              includeWordProblems: schemaV2.createParameter({
                type: 'boolean',
                label: 'Word Problems',
                description: 'Real-world transformation applications',
                helpText: 'Design, animation, engineering contexts',
                order: 6
              })
            }
          }),
          
          coordinatesAndShapes: schemaV2.createCategory({
            id: 'coordinatesAndShapes',
            label: 'Coordinates & Shapes',
            description: 'Configure coordinate ranges and shape complexity',
            icon: 'crop_square',
            color: 'purple',
            order: 3,
            parameters: {
              coordinateRange: schemaV2.createParameter({
                type: 'number',
                label: 'Coordinate Range',
                description: 'Maximum coordinate value (±range)',
                min: 5,
                max: 20,
                required: true,
                slider: true,
                presets: [8, 10, 12, 15],
                order: 1
              }),
              useSimpleShapes: schemaV2.createParameter({
                type: 'boolean',
                label: 'Use Simple Shapes',
                description: 'Use triangles and quadrilaterals vs complex polygons',
                helpText: 'Simpler shapes are easier to work with',
                order: 2
              }),
              allowDecimals: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Decimal Coordinates',
                description: 'Include decimal coordinate values',
                helpText: 'More realistic but harder calculations',
                order: 3
              }),
              decimalPlaces: schemaV2.createParameter({
                type: 'number',
                label: 'Decimal Places',
                description: 'Number of decimal places in coordinates',
                min: 1,
                max: 2,
                required: true,
                dependsOn: 'allowDecimals',
                order: 4
              })
            }
          }),
          
          visualization: schemaV2.createCategory({
            id: 'visualization',
            label: 'Visualization',
            description: 'Control diagram appearance and information display',
            icon: 'visibility',
            color: 'orange',
            order: 4,
            parameters: {
              showVisualDiagrams: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Visual Diagrams',
                description: 'Include coordinate plane diagrams',
                helpText: 'Visual representation of transformations',
                order: 1
              }),
              showPreImage: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Original Shape',
                description: 'Display the original shape before transformation',
                helpText: 'Shows both before and after',
                dependsOn: 'showVisualDiagrams',
                order: 2
              }),
              showBothImages: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Both Images',
                description: 'Display original and transformed shapes together',
                helpText: 'Helpful for comparing transformations',
                dependsOn: 'showVisualDiagrams',
                order: 3
              }),
              showCoordinateGrid: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Grid Lines',
                description: 'Display grid lines on coordinate plane',
                helpText: 'Helps with reading coordinates',
                dependsOn: 'showVisualDiagrams',
                order: 4
              }),
              showWork: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Work Steps',
                description: 'Include step-by-step transformation process',
                helpText: 'Educational breakdown of each step',
                order: 5
              }),
              diagramSize: schemaV2.createParameter({
                type: 'select',
                label: 'Diagram Size',
                description: 'Size of the transformation diagrams',
                options: [
                  { value: 'small', label: 'Small', description: '400×400px' },
                  { value: 'medium', label: 'Medium', description: '500×500px' },
                  { value: 'large', label: 'Large', description: '600×600px' }
                ],
                dependsOn: 'showVisualDiagrams',
                order: 6
              })
            }
          })
        },
        
        presets: [
          schemaV2.createPreset({
            id: 'basic-transformations',
            label: 'Basic Transformations',
            description: 'Simple translations and reflections',
            icon: 'open_with',
            category: 'difficulty',
            values: {
              problemCount: 8,
              includeTranslations: true,
              includeRotations: false,
              includeReflections: true,
              includeDilations: false,
              includeCompositeTransformations: false,
              includeWordProblems: false,
              coordinateRange: 8,
              useSimpleShapes: true,
              allowDecimals: false,
              showWork: true,
              showVisualDiagrams: true,
              showPreImage: true,
              showBothImages: true,
              showCoordinateGrid: true,
              diagramSize: 'large',
              complexityLevel: 'basic'
            }
          }),
          
          schemaV2.createPreset({
            id: 'rotations-practice',
            label: 'Rotations Practice',
            description: 'Focus on rotational transformations',
            icon: 'rotate_right',
            category: 'concept',
            values: {
              problemCount: 6,
              includeTranslations: false,
              includeRotations: true,
              includeReflections: false,
              includeDilations: false,
              includeCompositeTransformations: false,
              includeWordProblems: false,
              coordinateRange: 10,
              useSimpleShapes: true,
              allowDecimals: false,
              showWork: true,
              showVisualDiagrams: true,
              showPreImage: true,
              showBothImages: true,
              showCoordinateGrid: true,
              diagramSize: 'large',
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'dilations-scaling',
            label: 'Dilations & Scaling',
            description: 'Practice with dilations and scale factors',
            icon: 'zoom_out_map',
            category: 'concept',
            values: {
              problemCount: 6,
              includeTranslations: false,
              includeRotations: false,
              includeReflections: false,
              includeDilations: true,
              includeCompositeTransformations: false,
              includeWordProblems: true,
              coordinateRange: 12,
              useSimpleShapes: true,
              allowDecimals: true,
              decimalPlaces: 1,
              showWork: true,
              showVisualDiagrams: true,
              showPreImage: true,
              showBothImages: true,
              showCoordinateGrid: true,
              diagramSize: 'large',
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'composite-transformations',
            label: 'Composite Transformations',
            description: 'Multiple transformations in sequence',
            icon: 'layers',
            category: 'difficulty',
            values: {
              problemCount: 6,
              includeTranslations: true,
              includeRotations: true,
              includeReflections: true,
              includeDilations: false,
              includeCompositeTransformations: true,
              includeWordProblems: false,
              coordinateRange: 15,
              useSimpleShapes: true,
              allowDecimals: false,
              showWork: true,
              showVisualDiagrams: true,
              showPreImage: true,
              showBothImages: false,
              showCoordinateGrid: true,
              diagramSize: 'large',
              complexityLevel: 'advanced'
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive-transformations',
            label: 'Comprehensive Transformations',
            description: 'All types of geometric transformations',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 12,
              includeTranslations: true,
              includeRotations: true,
              includeReflections: true,
              includeDilations: true,
              includeCompositeTransformations: true,
              includeWordProblems: true,
              coordinateRange: 12,
              useSimpleShapes: true,
              allowDecimals: true,
              decimalPlaces: 1,
              showWork: true,
              showVisualDiagrams: true,
              showPreImage: true,
              showBothImages: true,
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
    if (params.includeTranslations) problemTypes.push('translation')
    if (params.includeRotations) problemTypes.push('rotation')
    if (params.includeReflections) problemTypes.push('reflection')
    if (params.includeDilations) problemTypes.push('dilation')
    if (params.includeCompositeTransformations) problemTypes.push('composite')
    if (params.includeWordProblems) problemTypes.push('wordProblem')
    
    if (problemTypes.length === 0) problemTypes.push('translation')
    
    const problemType = this.getRandomElement(problemTypes)
    return this.generateTransformationProblem(problemType, params)
  }

  generateTransformationProblem(problemType, params) {
    switch (problemType) {
      case 'translation':
        return this.generateTranslationProblem(params)
      case 'rotation':
        return this.generateRotationProblem(params)
      case 'reflection':
        return this.generateReflectionProblem(params)
      case 'dilation':
        return this.generateDilationProblem(params)
      case 'composite':
        return this.generateCompositeTransformationProblem(params)
      case 'wordProblem':
        return this.generateWordProblem(params)
      default:
        return this.generateTranslationProblem(params)
    }
  }
  
  generateTranslationProblem(params) {
    const shape = this.generateShape(params)
    const translation = this.generateTranslationVector(params)
    const transformedShape = this.applyTranslation(shape, translation)
    
    const steps = []
    if (params.showWork) {
      steps.push(`\\text{Translation rule: } (x, y) \\rightarrow (x + ${translation.x}, y + ${translation.y})`)
      shape.vertices.forEach((vertex, i) => {
        const label = String.fromCharCode(65 + i) // A, B, C, etc.
        steps.push(`${label}(${vertex.x}, ${vertex.y}) \\rightarrow ${label}'(${vertex.x + translation.x}, ${vertex.y + translation.y})`)
      })
    }
    
    const diagram = this.createTransformationDiagram(shape, transformedShape, 'translation', params)
    
    return {
      question: `Translate ${shape.name} with vertices ${this.formatVertices(shape.vertices)} by the vector (${translation.x}, ${translation.y}).`,
      questionLaTeX: `\\text{Translate ${shape.name} with vertices ${this.formatVertices(shape.vertices)} by the vector (${translation.x}, ${translation.y}).}`,
      answer: this.formatVertices(transformedShape.vertices, true),
      answerLaTeX: this.formatVertices(transformedShape.vertices, true),
      steps: steps,
      diagram: diagram,
      metadata: {
        problemType: 'translation',
        originalShape: shape,
        transformedShape: transformedShape,
        translation: translation,
        difficulty: 'easy',
        estimatedTime: '3 minutes'
      }
    }
  }
  
  generateRotationProblem(params) {
    const shape = this.generateShape(params)
    const angles = [90, 180, 270]
    const angle = this.getRandomElement(angles)
    const transformedShape = this.applyRotation(shape, angle)
    
    const steps = []
    if (params.showWork) {
      steps.push(`\\text{Rotation: ${angle}° counterclockwise around origin}`)
      const rule = this.getRotationRule(angle)
      steps.push(`\\text{Rule: } ${rule}`)
      shape.vertices.forEach((vertex, i) => {
        const label = String.fromCharCode(65 + i)
        const rotated = this.rotatePoint(vertex, angle)
        steps.push(`${label}(${vertex.x}, ${vertex.y}) \\rightarrow ${label}'(${rotated.x}, ${rotated.y})`)
      })
    }
    
    const diagram = this.createTransformationDiagram(shape, transformedShape, 'rotation', params)
    
    return {
      question: `Rotate ${shape.name} with vertices ${this.formatVertices(shape.vertices)} by ${angle}° counterclockwise around the origin.`,
      questionLaTeX: `\\text{Rotate ${shape.name} with vertices ${this.formatVertices(shape.vertices)} by ${angle}° counterclockwise around the origin.}`,
      answer: this.formatVertices(transformedShape.vertices, true),
      answerLaTeX: this.formatVertices(transformedShape.vertices, true),
      steps: steps,
      diagram: diagram,
      metadata: {
        problemType: 'rotation',
        originalShape: shape,
        transformedShape: transformedShape,
        angle: angle,
        difficulty: 'medium',
        estimatedTime: '4 minutes'
      }
    }
  }
  
  generateReflectionProblem(params) {
    const shape = this.generateShape(params)
    const reflectionLines = ['x-axis', 'y-axis', 'y = x']
    const reflectionLine = this.getRandomElement(reflectionLines)
    const transformedShape = this.applyReflection(shape, reflectionLine)
    
    const steps = []
    if (params.showWork) {
      steps.push(`\\text{Reflection across: } ${reflectionLine}`)
      const rule = this.getReflectionRule(reflectionLine)
      steps.push(`\\text{Rule: } ${rule}`)
      shape.vertices.forEach((vertex, i) => {
        const label = String.fromCharCode(65 + i)
        const reflected = this.reflectPoint(vertex, reflectionLine)
        steps.push(`${label}(${vertex.x}, ${vertex.y}) \\rightarrow ${label}'(${reflected.x}, ${reflected.y})`)
      })
    }
    
    const diagram = this.createTransformationDiagram(shape, transformedShape, 'reflection', params)
    
    return {
      question: `Reflect ${shape.name} with vertices ${this.formatVertices(shape.vertices)} across the ${reflectionLine}.`,
      questionLaTeX: `\\text{Reflect ${shape.name} with vertices ${this.formatVertices(shape.vertices)} across the ${reflectionLine}.}`,
      answer: this.formatVertices(transformedShape.vertices, true),
      answerLaTeX: this.formatVertices(transformedShape.vertices, true),
      steps: steps,
      diagram: diagram,
      metadata: {
        problemType: 'reflection',
        originalShape: shape,
        transformedShape: transformedShape,
        reflectionLine: reflectionLine,
        difficulty: 'medium',
        estimatedTime: '3 minutes'
      }
    }
  }
  
  generateDilationProblem(params) {
    const shape = this.generateShape(params, 0.5) // Smaller initial shape for dilation
    const scaleFactors = [0.5, 1.5, 2, 2.5, 3]
    const scaleFactor = this.getRandomElement(scaleFactors)
    const center = { x: 0, y: 0 } // Center of dilation at origin
    const transformedShape = this.applyDilation(shape, scaleFactor, center)
    
    const steps = []
    if (params.showWork) {
      steps.push(`\\text{Dilation: scale factor ${scaleFactor}, center (${center.x}, ${center.y})}`)
      steps.push(`\\text{Rule: } (x, y) \\rightarrow (${scaleFactor}x, ${scaleFactor}y)`)
      shape.vertices.forEach((vertex, i) => {
        const label = String.fromCharCode(65 + i)
        const dilated = this.dilatePoint(vertex, scaleFactor, center)
        steps.push(`${label}(${vertex.x}, ${vertex.y}) \\rightarrow ${label}'(${dilated.x}, ${dilated.y})`)
      })
    }
    
    const diagram = this.createTransformationDiagram(shape, transformedShape, 'dilation', params)
    
    return {
      question: `Dilate ${shape.name} with vertices ${this.formatVertices(shape.vertices)} by a scale factor of ${scaleFactor} centered at the origin.`,
      questionLaTeX: `\\text{Dilate ${shape.name} with vertices ${this.formatVertices(shape.vertices)} by a scale factor of ${scaleFactor} centered at the origin.}`,
      answer: this.formatVertices(transformedShape.vertices, true),
      answerLaTeX: this.formatVertices(transformedShape.vertices, true),
      steps: steps,
      diagram: diagram,
      metadata: {
        problemType: 'dilation',
        originalShape: shape,
        transformedShape: transformedShape,
        scaleFactor: scaleFactor,
        center: center,
        difficulty: 'medium',
        estimatedTime: '4 minutes'
      }
    }
  }
  
  generateCompositeTransformationProblem(params) {
    const shape = this.generateShape(params, 0.7)
    
    // Choose 2 transformations to combine
    const transformations = ['translation', 'rotation', 'reflection']
    const transformation1 = this.getRandomElement(transformations)
    let transformation2 = this.getRandomElement(transformations)
    
    // Ensure different transformations
    while (transformation2 === transformation1) {
      transformation2 = this.getRandomElement(transformations)
    }
    
    let intermediateShape = { ...shape }
    let finalShape = { ...shape }
    const steps = []
    
    if (params.showWork) {
      steps.push(`\\text{Apply transformations in sequence:}`)
    }
    
    // Apply first transformation
    switch (transformation1) {
      case 'translation':
        const translation1 = this.generateTranslationVector(params)
        intermediateShape = this.applyTranslation(shape, translation1)
        if (params.showWork) {
          steps.push(`\\text{1. Translation by } (${translation1.x}, ${translation1.y})`)
          shape.vertices.forEach((vertex, i) => {
            const label = String.fromCharCode(65 + i)
            steps.push(`${label}(${vertex.x}, ${vertex.y}) \\rightarrow ${label}'(${vertex.x + translation1.x}, ${vertex.y + translation1.y})`)
          })
        }
        break
      case 'rotation':
        const angle1 = this.getRandomElement([90, 180, 270])
        intermediateShape = this.applyRotation(shape, angle1)
        if (params.showWork) {
          steps.push(`\\text{1. Rotation by } ${angle1}° \\text{ around origin}`)
          const rule1 = this.getRotationRule(angle1)
          steps.push(`\\text{Rule: } ${rule1}`)
        }
        break
      case 'reflection':
        const line1 = this.getRandomElement(['x-axis', 'y-axis', 'y = x'])
        intermediateShape = this.applyReflection(shape, line1)
        if (params.showWork) {
          steps.push(`\\text{1. Reflection across } ${line1}`)
          const rule1 = this.getReflectionRule(line1)
          steps.push(`\\text{Rule: } ${rule1}`)
        }
        break
    }
    
    // Apply second transformation to intermediate shape
    switch (transformation2) {
      case 'translation':
        const translation2 = this.generateTranslationVector(params)
        finalShape = this.applyTranslation(intermediateShape, translation2)
        if (params.showWork) {
          steps.push(`\\text{2. Translation by } (${translation2.x}, ${translation2.y})`)
          intermediateShape.vertices.forEach((vertex, i) => {
            const label = String.fromCharCode(65 + i) + "''"
            steps.push(`${label.slice(0, -1)}'(${vertex.x}, ${vertex.y}) \\rightarrow ${label}(${vertex.x + translation2.x}, ${vertex.y + translation2.y})`)
          })
        }
        break
      case 'rotation':
        const angle2 = this.getRandomElement([90, 180, 270])
        finalShape = this.applyRotation(intermediateShape, angle2)
        if (params.showWork) {
          steps.push(`\\text{2. Rotation by } ${angle2}° \\text{ around origin}`)
          const rule2 = this.getRotationRule(angle2)
          steps.push(`\\text{Rule: } ${rule2}`)
        }
        break
      case 'reflection':
        const line2 = this.getRandomElement(['x-axis', 'y-axis', 'y = x'])
        finalShape = this.applyReflection(intermediateShape, line2)
        if (params.showWork) {
          steps.push(`\\text{2. Reflection across } ${line2}`)
          const rule2 = this.getReflectionRule(line2)
          steps.push(`\\text{Rule: } ${rule2}`)
        }
        break
    }
    
    const diagram = this.createCompositeTransformationDiagram(shape, intermediateShape, finalShape, [transformation1, transformation2], params)
    
    return {
      question: `Apply the following transformations in sequence to ${shape.name} with vertices ${this.formatVertices(shape.vertices)}: first ${transformation1}, then ${transformation2}. Find the final coordinates.`,
      questionLaTeX: `\\text{Apply the following transformations in sequence to ${shape.name} with vertices ${this.formatVertices(shape.vertices)}:} \\\\\\\\ \\text{first ${transformation1}, then ${transformation2}. Find the final coordinates.}`,
      answer: this.formatVertices(finalShape.vertices, true),
      answerLaTeX: this.formatVertices(finalShape.vertices, true),
      steps: steps,
      diagram: diagram,
      metadata: {
        problemType: 'composite',
        originalShape: shape,
        intermediateShape: intermediateShape,
        finalShape: finalShape,
        transformations: [transformation1, transformation2],
        difficulty: 'hard',
        estimatedTime: '6 minutes'
      }
    }
  }
  
  generateWordProblem(params) {
    const scenarios = [
      {
        type: 'animation',
        setup: () => {
          const character = this.generateShape(params, 0.7)
          const translation = { x: 5, y: 3 }
          const final = this.applyTranslation(character, translation)
          
          return {
            question: `In a video game, a character starts at position ${this.formatVertices(character.vertices)}. The character moves 5 units right and 3 units up. Where does the character end up?`,
            answer: this.formatVertices(final.vertices, true),
            steps: [
              `\\text{Translation: } (x, y) \\rightarrow (x + 5, y + 3)`,
              ...character.vertices.map((v, i) => {
                const label = String.fromCharCode(65 + i)
                return `${label}(${v.x}, ${v.y}) \\rightarrow ${label}'(${v.x + 5}, ${v.y + 3})`
              })
            ]
          }
        }
      },
      {
        type: 'design',
        setup: () => {
          const logo = this.generateShape(params, 0.8)
          const scaleFactor = 2
          const enlarged = this.applyDilation(logo, scaleFactor, { x: 0, y: 0 })
          
          return {
            question: `A company logo has vertices at ${this.formatVertices(logo.vertices)}. If the logo needs to be enlarged by a factor of ${scaleFactor} for a billboard, what are the new coordinates?`,
            answer: this.formatVertices(enlarged.vertices, true),
            steps: [
              `\\text{Dilation: scale factor ${scaleFactor}, center origin}`,
              `\\text{Rule: } (x, y) \\rightarrow (${scaleFactor}x, ${scaleFactor}y)`,
              ...logo.vertices.map((v, i) => {
                const label = String.fromCharCode(65 + i)
                return `${label}(${v.x}, ${v.y}) \\rightarrow ${label}'(${v.x * scaleFactor}, ${v.y * scaleFactor})`
              })
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
      answerLaTeX: problem.answer,
      steps: problem.steps,
      metadata: {
        problemType: 'wordProblem',
        scenario: scenario.type,
        difficulty: 'medium',
        estimatedTime: '4 minutes'
      }
    }
  }
  
  // Helper methods for transformations
  generateShape(params, sizeMultiplier = 1) {
    const range = Math.floor(params.coordinateRange * sizeMultiplier)
    const shapeTypes = params.useSimpleShapes ? ['triangle', 'quadrilateral'] : ['triangle', 'quadrilateral', 'pentagon']
    const shapeType = this.getRandomElement(shapeTypes)
    
    let vertices = []
    if (shapeType === 'triangle') {
      vertices = [
        this.generatePoint(params, range),
        this.generatePoint(params, range),
        this.generatePoint(params, range)
      ]
    } else if (shapeType === 'quadrilateral') {
      vertices = [
        this.generatePoint(params, range),
        this.generatePoint(params, range),
        this.generatePoint(params, range),
        this.generatePoint(params, range)
      ]
    }
    
    return {
      name: shapeType,
      vertices: vertices
    }
  }
  
  generatePoint(params, range = null) {
    const maxRange = range || params.coordinateRange
    const minRange = -maxRange
    
    let x, y
    if (params.allowDecimals) {
      x = this.roundToDecimal(minRange + Math.random() * (maxRange - minRange), params.decimalPlaces)
      y = this.roundToDecimal(minRange + Math.random() * (maxRange - minRange), params.decimalPlaces)
    } else {
      x = this.getRandomNumber(minRange, maxRange)
      y = this.getRandomNumber(minRange, maxRange)
    }
    
    return { x, y }
  }
  
  generateTranslationVector(params) {
    const max = Math.floor(params.coordinateRange / 2)
    return {
      x: this.getRandomNumber(-max, max),
      y: this.getRandomNumber(-max, max)
    }
  }
  
  applyTranslation(shape, translation) {
    return {
      name: shape.name,
      vertices: shape.vertices.map(vertex => ({
        x: vertex.x + translation.x,
        y: vertex.y + translation.y
      }))
    }
  }
  
  applyRotation(shape, angle) {
    return {
      name: shape.name,
      vertices: shape.vertices.map(vertex => this.rotatePoint(vertex, angle))
    }
  }
  
  rotatePoint(point, angle) {
    const rad = (angle * Math.PI) / 180
    const cos = Math.cos(rad)
    const sin = Math.sin(rad)
    
    return {
      x: Math.round(point.x * cos - point.y * sin),
      y: Math.round(point.x * sin + point.y * cos)
    }
  }
  
  applyReflection(shape, reflectionLine) {
    return {
      name: shape.name,
      vertices: shape.vertices.map(vertex => this.reflectPoint(vertex, reflectionLine))
    }
  }
  
  reflectPoint(point, reflectionLine) {
    switch (reflectionLine) {
      case 'x-axis':
        return { x: point.x, y: -point.y }
      case 'y-axis':
        return { x: -point.x, y: point.y }
      case 'y = x':
        return { x: point.y, y: point.x }
      default:
        return point
    }
  }
  
  applyDilation(shape, scaleFactor, center) {
    return {
      name: shape.name,
      vertices: shape.vertices.map(vertex => this.dilatePoint(vertex, scaleFactor, center))
    }
  }
  
  dilatePoint(point, scaleFactor, center) {
    return {
      x: center.x + scaleFactor * (point.x - center.x),
      y: center.y + scaleFactor * (point.y - center.y)
    }
  }
  
  getRotationRule(angle) {
    switch (angle) {
      case 90:
        return '(x, y) \\rightarrow (-y, x)'
      case 180:
        return '(x, y) \\rightarrow (-x, -y)'
      case 270:
        return '(x, y) \\rightarrow (y, -x)'
      default:
        return '(x, y) \\rightarrow (x, y)'
    }
  }
  
  getReflectionRule(reflectionLine) {
    switch (reflectionLine) {
      case 'x-axis':
        return '(x, y) \\rightarrow (x, -y)'
      case 'y-axis':
        return '(x, y) \\rightarrow (-x, y)'
      case 'y = x':
        return '(x, y) \\rightarrow (y, x)'
      default:
        return '(x, y) \\rightarrow (x, y)'
    }
  }
  
  formatVertices(vertices, isPrime = false) {
    const suffix = isPrime ? "'" : ''
    return vertices.map((vertex, i) => {
      const label = String.fromCharCode(65 + i) + suffix
      return `${label}(${vertex.x}, ${vertex.y})`
    }).join(', ')
  }
  
  createTransformationDiagram(originalShape, transformedShape, transformationType, params) {
    if (!params.showVisualDiagrams) return null
    
    const size = getDiagramSize(params.diagramSize)
    return {
      type: 'geometry-renderer',
      shape: 'transformation',
      measurements: { originalShape, transformedShape },
      unit: 'units',
      config: {
        width: size.width,
        height: size.height,
        theme: 'educational',
        showMeasurements: false,
        showLabels: true,
        showGrid: params.showCoordinateGrid,
        center: true,
        transformationType: transformationType,
        showPreImage: params.showPreImage,
        showBothImages: params.showBothImages,
        coordinateRange: params.coordinateRange
      },
      svgId: `transformation-${transformationType}-${Date.now()}`
    }
  }
  
  createCompositeTransformationDiagram(originalShape, intermediateShape, finalShape, transformations, params) {
    if (!params.showVisualDiagrams) return null
    
    const size = getDiagramSize(params.diagramSize)
    return {
      type: 'geometry-renderer',
      shape: 'composite-transformation',
      measurements: { originalShape, intermediateShape, finalShape },
      unit: 'units',
      config: {
        width: size.width,
        height: size.height,
        theme: 'educational',
        showMeasurements: false,
        showLabels: true,
        showGrid: params.showCoordinateGrid,
        center: true,
        transformations: transformations,
        showPreImage: params.showPreImage,
        showBothImages: params.showBothImages,
        coordinateRange: params.coordinateRange
      },
      svgId: `composite-transformation-${Date.now()}`
    }
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

export default TransformationsGenerator