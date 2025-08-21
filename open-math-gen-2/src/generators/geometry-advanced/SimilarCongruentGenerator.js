import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'
import { getDiagramSize } from '../geometry-basic/shared/DiagramSizes.js'

/**
 * Similar and Congruent Figures Generator
 * 
 * Generates problems involving similar and congruent figures, including
 * scale factors, proportional relationships, congruence proofs, and applications.
 */
export class SimilarCongruentGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Similar & Congruent Figures',
      description: 'Problems with similar and congruent figures including scale factors, proportions, and geometric relationships',
      category: 'geometry-advanced',
      difficulty: 'medium',
      icon: 'compare',
      tags: ['similar', 'congruent', 'scale factor', 'proportions', 'triangles'],
      gradeLevel: '8-12',
      estimatedTime: '4-6 minutes',
      exampleProblem: {
        question: 'Two similar triangles have corresponding sides of 6 cm and 9 cm. If another side of the smaller triangle is 8 cm, what is the length of the corresponding side in the larger triangle?',
        questionLaTeX: '\\text{Two similar triangles have corresponding sides of 6 cm and 9 cm. If another side of the smaller triangle is 8 cm, what is the length of the corresponding side in the larger triangle?}',
        answer: '12 cm',
        answerLaTeX: '12 \\text{ cm}'
      },
      
      defaultParameters: {
        problemCount: 8,
        includeSimilarTriangles: true,
        includeCongruentTriangles: true,
        includeSimilarPolygons: true,
        includeScaleFactors: true,
        includeProportions: true,
        includePerimeterAreaRatios: true,
        includeWordProblems: true,
        minSideLength: 3,
        maxSideLength: 24,
        allowDecimals: true,
        decimalPlaces: 1,
        units: 'mixed',
        showWork: true,
        showVisualDiagrams: true,
        showCorrespondence: true,
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
                description: 'How many similarity/congruence problems to generate',
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
                description: 'Determines the difficulty of similarity problems',
                variant: 'cards',
                options: [
                  { value: 'basic', label: 'Basic', description: 'Simple similar triangles with whole number ratios' },
                  { value: 'intermediate', label: 'Intermediate', description: 'Mixed shapes with decimal ratios' },
                  { value: 'advanced', label: 'Advanced', description: 'Complex proportions and proofs' }
                ],
                order: 2
              })
            }
          }),
          
          problemTypes: schemaV2.createCategory({
            id: 'problemTypes',
            label: 'Problem Types',
            description: 'Choose which types of similarity/congruence problems to include',
            icon: 'compare',
            color: 'green',
            order: 2,
            parameters: {
              includeSimilarTriangles: schemaV2.createParameter({
                type: 'boolean',
                label: 'Similar Triangles',
                description: 'Problems with similar triangles and proportional sides',
                helpText: 'AA, SAS, SSS similarity',
                order: 1
              }),
              includeCongruentTriangles: schemaV2.createParameter({
                type: 'boolean',
                label: 'Congruent Triangles',
                description: 'Problems identifying congruent triangles',
                helpText: 'SSS, SAS, ASA, AAS congruence',
                order: 2
              }),
              includeSimilarPolygons: schemaV2.createParameter({
                type: 'boolean',
                label: 'Similar Polygons',
                description: 'Similar rectangles, pentagons, and other polygons',
                helpText: 'Proportional sides and equal angles',
                order: 3
              }),
              includeScaleFactors: schemaV2.createParameter({
                type: 'boolean',
                label: 'Scale Factors',
                description: 'Find and apply scale factors between similar figures',
                helpText: 'Ratio of corresponding sides',
                order: 4
              }),
              includeProportions: schemaV2.createParameter({
                type: 'boolean',
                label: 'Proportional Relationships',
                description: 'Solve proportions to find missing sides',
                helpText: 'Cross multiplication and ratios',
                order: 5
              }),
              includePerimeterAreaRatios: schemaV2.createParameter({
                type: 'boolean',
                label: 'Perimeter & Area Ratios',
                description: 'Relationships between perimeters and areas of similar figures',
                helpText: 'Linear vs. quadratic relationships',
                order: 6
              }),
              includeWordProblems: schemaV2.createParameter({
                type: 'boolean',
                label: 'Word Problems',
                description: 'Real-world applications of similarity and congruence',
                helpText: 'Architecture, scale models, photography',
                order: 7
              })
            }
          }),
          
          measurements: schemaV2.createCategory({
            id: 'measurements',
            label: 'Measurements',
            description: 'Configure measurement ranges and precision',
            icon: 'straighten',
            color: 'purple',
            order: 3,
            parameters: {
              maxSideLength: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Side Length',
                description: 'Largest side length to use in problems',
                min: 10,
                max: 50,
                required: true,
                slider: true,
                presets: [20, 24, 30, 36],
                order: 1
              }),
              allowDecimals: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Decimal Values',
                description: 'Include decimal measurements and ratios',
                helpText: 'More realistic but harder calculations',
                order: 2
              }),
              decimalPlaces: schemaV2.createParameter({
                type: 'number',
                label: 'Decimal Places',
                description: 'Number of decimal places in measurements',
                min: 1,
                max: 2,
                required: true,
                dependsOn: 'allowDecimals',
                order: 3
              }),
              units: schemaV2.createParameter({
                type: 'select',
                label: 'Measurement Units',
                description: 'Units to use for measurements',
                options: [
                  { value: 'mixed', label: 'Mixed Units', description: 'cm, m, ft, in' },
                  { value: 'metric', label: 'Metric Only', description: 'cm, m, mm' },
                  { value: 'imperial', label: 'Imperial Only', description: 'ft, in, yd' },
                  { value: 'abstract', label: 'Abstract Units', description: 'Just "units"' }
                ],
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
                description: 'Include geometric diagrams showing similar/congruent figures',
                helpText: 'Visual comparison of shapes',
                order: 1
              }),
              showCorrespondence: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Correspondence',
                description: 'Label corresponding parts of similar/congruent figures',
                helpText: 'Helps identify matching sides and angles',
                dependsOn: 'showVisualDiagrams',
                order: 2
              }),
              showWork: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Work Steps',
                description: 'Include step-by-step solutions',
                helpText: 'Educational breakdown of proportion solving',
                order: 3
              }),
              diagramSize: schemaV2.createParameter({
                type: 'select',
                label: 'Diagram Size',
                description: 'Size of the comparison diagrams',
                options: [
                  { value: 'small', label: 'Small', description: '300×200px' },
                  { value: 'medium', label: 'Medium', description: '400×300px' },
                  { value: 'large', label: 'Large', description: '500×400px' }
                ],
                dependsOn: 'showVisualDiagrams',
                order: 4
              })
            }
          })
        },
        
        presets: [
          schemaV2.createPreset({
            id: 'basic-similar-triangles',
            label: 'Basic Similar Triangles',
            description: 'Simple similar triangle problems with whole number ratios',
            icon: 'change_history',
            category: 'difficulty',
            values: {
              problemCount: 8,
              includeSimilarTriangles: true,
              includeCongruentTriangles: false,
              includeSimilarPolygons: false,
              includeScaleFactors: true,
              includeProportions: true,
              includePerimeterAreaRatios: false,
              includeWordProblems: false,
              maxSideLength: 20,
              allowDecimals: false,
              units: 'mixed',
              showWork: true,
              showVisualDiagrams: true,
              showCorrespondence: true,
              diagramSize: 'large',
              complexityLevel: 'basic'
            }
          }),
          
          schemaV2.createPreset({
            id: 'congruent-triangles',
            label: 'Congruent Triangles',
            description: 'Focus on triangle congruence postulates and theorems',
            icon: 'content_copy',
            category: 'concept',
            values: {
              problemCount: 6,
              includeSimilarTriangles: false,
              includeCongruentTriangles: true,
              includeSimilarPolygons: false,
              includeScaleFactors: false,
              includeProportions: false,
              includePerimeterAreaRatios: false,
              includeWordProblems: false,
              maxSideLength: 18,
              allowDecimals: false,
              units: 'metric',
              showWork: true,
              showVisualDiagrams: true,
              showCorrespondence: true,
              diagramSize: 'large',
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'scale-factors',
            label: 'Scale Factors & Ratios',
            description: 'Practice with scale factors and proportional relationships',
            icon: 'zoom_out_map',
            category: 'concept',
            values: {
              problemCount: 8,
              includeSimilarTriangles: true,
              includeCongruentTriangles: false,
              includeSimilarPolygons: true,
              includeScaleFactors: true,
              includeProportions: true,
              includePerimeterAreaRatios: true,
              includeWordProblems: false,
              maxSideLength: 24,
              allowDecimals: true,
              decimalPlaces: 1,
              units: 'mixed',
              showWork: true,
              showVisualDiagrams: true,
              showCorrespondence: true,
              diagramSize: 'large',
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'real-world-similarity',
            label: 'Real-World Applications',
            description: 'Practical applications of similarity and scale',
            icon: 'home_work',
            category: 'application',
            values: {
              problemCount: 6,
              includeSimilarTriangles: true,
              includeCongruentTriangles: false,
              includeSimilarPolygons: true,
              includeScaleFactors: true,
              includeProportions: true,
              includePerimeterAreaRatios: false,
              includeWordProblems: true,
              maxSideLength: 30,
              allowDecimals: true,
              decimalPlaces: 1,
              units: 'mixed',
              showWork: true,
              showVisualDiagrams: true,
              showCorrespondence: false,
              diagramSize: 'medium',
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive-similarity',
            label: 'Comprehensive Similarity',
            description: 'All aspects of similar and congruent figures',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 12,
              includeSimilarTriangles: true,
              includeCongruentTriangles: true,
              includeSimilarPolygons: true,
              includeScaleFactors: true,
              includeProportions: true,
              includePerimeterAreaRatios: true,
              includeWordProblems: true,
              maxSideLength: 24,
              allowDecimals: true,
              decimalPlaces: 1,
              units: 'mixed',
              showWork: true,
              showVisualDiagrams: true,
              showCorrespondence: true,
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
    if (params.includeSimilarTriangles) problemTypes.push('similarTriangles')
    if (params.includeCongruentTriangles) problemTypes.push('congruentTriangles')
    if (params.includeSimilarPolygons) problemTypes.push('similarPolygons')
    if (params.includeScaleFactors) problemTypes.push('scaleFactor')
    if (params.includeProportions) problemTypes.push('proportions')
    if (params.includePerimeterAreaRatios) problemTypes.push('perimeterAreaRatios')
    if (params.includeWordProblems) problemTypes.push('wordProblem')
    
    if (problemTypes.length === 0) problemTypes.push('similarTriangles')
    
    const problemType = this.getRandomElement(problemTypes)
    return this.generateSimilarityProblem(problemType, params)
  }

  generateSimilarityProblem(problemType, params) {
    switch (problemType) {
      case 'similarTriangles':
        return this.generateSimilarTrianglesProblem(params)
      case 'congruentTriangles':
        return this.generateCongruentTrianglesProblem(params)
      case 'similarPolygons':
        return this.generateSimilarPolygonsProblem(params)
      case 'scaleFactor':
        return this.generateScaleFactorProblem(params)
      case 'proportions':
        return this.generateProportionsProblem(params)
      case 'perimeterAreaRatios':
        return this.generatePerimeterAreaRatiosProblem(params)
      case 'wordProblem':
        return this.generateWordProblem(params)
      default:
        return this.generateSimilarTrianglesProblem(params)
    }
  }
  
  generateSimilarTrianglesProblem(params) {
    const smallTriangle = this.generateTriangle(params, 0.6)
    const scaleFactor = this.generateScaleFactor(params)
    const largeTriangle = this.scaleTriangle(smallTriangle, scaleFactor)
    
    // Pick a side to find
    const sideIndex = this.getRandomNumber(0, 2)
    const knownSmallSide = smallTriangle.sides[sideIndex]
    const knownLargeSide = largeTriangle.sides[sideIndex]
    const unknownSideIndex = (sideIndex + 1) % 3
    const unknownSmallSide = smallTriangle.sides[unknownSideIndex]
    const unknownLargeSide = largeTriangle.sides[unknownSideIndex]
    
    const unit = this.getRandomUnit(params.units)
    
    const steps = []
    if (params.showWork) {
      steps.push(`\\text{Similar triangles have proportional corresponding sides}`)
      steps.push(`\\text{Scale factor: } \\frac{${knownLargeSide}}{${knownSmallSide}} = ${this.formatNumber(scaleFactor, params)}`)
      steps.push(`\\text{Set up proportion: } \\frac{${knownLargeSide}}{${knownSmallSide}} = \\frac{x}{${unknownSmallSide}}`)
      steps.push(`${this.formatNumber(scaleFactor, params)} = \\frac{x}{${unknownSmallSide}}`)
      steps.push(`x = ${this.formatNumber(scaleFactor, params)} \\times ${unknownSmallSide} = ${this.formatNumber(unknownLargeSide, params)}`)
    }
    
    const diagram = this.createSimilarityDiagram(smallTriangle, largeTriangle, 'similar', params)
    
    return {
      question: `Two similar triangles have corresponding sides of ${knownSmallSide} ${unit} and ${knownLargeSide} ${unit}. If another side of the smaller triangle is ${unknownSmallSide} ${unit}, what is the length of the corresponding side in the larger triangle?`,
      questionLaTeX: `\\text{Two similar triangles have corresponding sides of ${knownSmallSide} ${unit} and ${knownLargeSide} ${unit}.} \\\\\\\\ \\text{If another side of the smaller triangle is ${unknownSmallSide} ${unit}, what is the length of the corresponding side in the larger triangle?}`,
      answer: `${this.formatNumber(unknownLargeSide, params)} ${unit}`,
      answerLaTeX: `${this.formatNumber(unknownLargeSide, params)} \\text{ ${unit}}`,
      steps: steps,
      diagram: diagram,
      metadata: {
        problemType: 'similarTriangles',
        smallTriangle: smallTriangle,
        largeTriangle: largeTriangle,
        scaleFactor: scaleFactor,
        unit: unit,
        difficulty: 'medium',
        estimatedTime: '4 minutes'
      }
    }
  }
  
  generateScaleFactorProblem(params) {
    const originalShape = this.generatePolygon(params, 0.7)
    const scaleFactor = this.generateScaleFactor(params)
    const scaledShape = this.scalePolygon(originalShape, scaleFactor)
    
    const unit = this.getRandomUnit(params.units)
    
    const steps = []
    if (params.showWork) {
      steps.push(`\\text{Scale factor = } \\frac{\\text{corresponding side of larger figure}}{\\text{corresponding side of smaller figure}}`)
      steps.push(`\\text{Scale factor = } \\frac{${scaledShape.sides[0]}}{${originalShape.sides[0]}} = ${this.formatNumber(scaleFactor, params)}`)
    }
    
    const diagram = this.createSimilarityDiagram(originalShape, scaledShape, 'scale', params)
    
    return {
      question: `A ${originalShape.name} with side length ${originalShape.sides[0]} ${unit} is scaled to create a similar ${originalShape.name} with side length ${scaledShape.sides[0]} ${unit}. What is the scale factor?`,
      questionLaTeX: `\\text{A ${originalShape.name} with side length ${originalShape.sides[0]} ${unit} is scaled to create a similar ${originalShape.name} with side length ${scaledShape.sides[0]} ${unit}.} \\\\\\\ \\text{What is the scale factor?}`,
      answer: this.formatNumber(scaleFactor, params),
      answerLaTeX: this.formatNumber(scaleFactor, params),
      steps: steps,
      diagram: diagram,
      metadata: {
        problemType: 'scaleFactor',
        originalShape: originalShape,
        scaledShape: scaledShape,
        scaleFactor: scaleFactor,
        unit: unit,
        difficulty: 'easy',
        estimatedTime: '3 minutes'
      }
    }
  }
  
  generatePerimeterAreaRatiosProblem(params) {
    const smallRectangle = this.generateRectangle(params, 0.6)
    const scaleFactor = this.generateScaleFactor(params)
    const largeRectangle = this.scaleRectangle(smallRectangle, scaleFactor)
    
    const smallPerimeter = 2 * (smallRectangle.length + smallRectangle.width)
    const largePerimeter = 2 * (largeRectangle.length + largeRectangle.width)
    const perimeterRatio = largePerimeter / smallPerimeter
    
    const smallArea = smallRectangle.length * smallRectangle.width
    const largeArea = largeRectangle.length * largeRectangle.width
    const areaRatio = largeArea / smallArea
    
    const unit = this.getRandomUnit(params.units)
    
    const steps = []
    if (params.showWork) {
      steps.push(`\\text{Small rectangle: } ${smallRectangle.length} \\times ${smallRectangle.width}`)
      steps.push(`\\text{Large rectangle: } ${largeRectangle.length} \\times ${largeRectangle.width}`)
      steps.push(`\\text{Scale factor: } ${this.formatNumber(scaleFactor, params)}`)
      steps.push(`\\text{Perimeter ratio = scale factor = } ${this.formatNumber(perimeterRatio, params)}`)
      steps.push(`\\text{Area ratio = (scale factor)}^2 = ${this.formatNumber(areaRatio, params)}`)
    }
    
    const diagram = this.createSimilarityDiagram(smallRectangle, largeRectangle, 'rectangle', params)
    
    return {
      question: `Two similar rectangles have dimensions ${smallRectangle.length}×${smallRectangle.width} ${unit} and ${largeRectangle.length}×${largeRectangle.width} ${unit}. What is the ratio of their areas?`,
      questionLaTeX: `\\text{Two similar rectangles have dimensions ${smallRectangle.length}×${smallRectangle.width} ${unit} and ${largeRectangle.length}×${largeRectangle.width} ${unit}.} \\\\\\\ \\text{What is the ratio of their areas?}`,
      answer: `${this.formatNumber(areaRatio, params)}:1`,
      answerLaTeX: `${this.formatNumber(areaRatio, params)}:1`,
      steps: steps,
      diagram: diagram,
      metadata: {
        problemType: 'perimeterAreaRatios',
        smallRectangle: smallRectangle,
        largeRectangle: largeRectangle,
        scaleFactor: scaleFactor,
        perimeterRatio: perimeterRatio,
        areaRatio: areaRatio,
        unit: unit,
        difficulty: 'hard',
        estimatedTime: '5 minutes'
      }
    }
  }
  
  generateCongruentTrianglesProblem(params) {
    const triangle1 = this.generateTriangle(params)
    const triangle2 = { ...triangle1 } // Congruent triangle with same side lengths
    
    // Randomly choose which congruence postulate to use
    const postulates = ['SSS', 'SAS', 'ASA', 'AAS']
    const postulate = this.getRandomElement(postulates)
    
    const unit = this.getRandomUnit(params.units)
    
    const steps = []
    if (params.showWork) {
      steps.push(`\\text{Given information shows triangles are congruent by ${postulate}}`)
      steps.push(`\\text{${postulate} Congruence Postulate: }`)
      
      switch (postulate) {
        case 'SSS':
          steps.push(`\\text{All three corresponding sides are equal}`)
          break
        case 'SAS':
          steps.push(`\\text{Two sides and the included angle are equal}`)
          break
        case 'ASA':
          steps.push(`\\text{Two angles and the included side are equal}`)
          break
        case 'AAS':
          steps.push(`\\text{Two angles and a non-included side are equal}`)
          break
      }
      
      steps.push(`\\text{Therefore: Triangle ABC ≅ Triangle DEF}`)
    }
    
    const diagram = this.createCongruenceDiagram(triangle1, triangle2, postulate, params)
    
    return {
      question: `Determine if triangles ABC and DEF are congruent. Triangle ABC has sides ${triangle1.sides[0]} ${unit}, ${triangle1.sides[1]} ${unit}, ${triangle1.sides[2]} ${unit}. Triangle DEF has sides ${triangle2.sides[0]} ${unit}, ${triangle2.sides[1]} ${unit}, ${triangle2.sides[2]} ${unit}. State the congruence postulate.`,
      questionLaTeX: `\\text{Determine if triangles ABC and DEF are congruent. Triangle ABC has sides ${triangle1.sides[0]} ${unit}, ${triangle1.sides[1]} ${unit}, ${triangle1.sides[2]} ${unit}.} \\\\\\\ \\text{Triangle DEF has sides ${triangle2.sides[0]} ${unit}, ${triangle2.sides[1]} ${unit}, ${triangle2.sides[2]} ${unit}. State the congruence postulate.}`,
      answer: `Yes, by ${postulate}`,
      answerLaTeX: `\\text{Yes, by ${postulate}}`,
      steps: steps,
      diagram: diagram,
      metadata: {
        problemType: 'congruentTriangles',
        triangle1: triangle1,
        triangle2: triangle2,
        postulate: postulate,
        unit: unit,
        difficulty: 'medium',
        estimatedTime: '4 minutes'
      }
    }
  }
  
  generateSimilarPolygonsProblem(params) {
    const polygon1 = this.generatePolygon(params, 0.6)
    const scaleFactor = this.generateScaleFactor(params)
    const polygon2 = this.scalePolygon(polygon1, scaleFactor)
    
    const unit = this.getRandomUnit(params.units)
    
    const steps = []
    if (params.showWork) {
      steps.push(`\\text{Similar polygons have proportional corresponding sides}`)
      steps.push(`\\text{Scale factor: } \\frac{\\text{larger side}}{\\text{smaller side}} = \\frac{${polygon2.sides[0]}}{${polygon1.sides[0]}} = ${this.formatNumber(scaleFactor, params)}`)
      steps.push(`\\text{All corresponding sides have the same ratio}`)
      polygon1.sides.forEach((side, i) => {
        steps.push(`\\frac{${polygon2.sides[i]}}{${side}} = ${this.formatNumber(scaleFactor, params)}`)
      })
    }
    
    const diagram = this.createSimilarityDiagram(polygon1, polygon2, 'similar', params)
    
    return {
      question: `Two similar ${polygon1.name}s have corresponding sides in the ratio ${this.formatNumber(scaleFactor, params)}:1. If the smaller ${polygon1.name} has a side of ${polygon1.sides[0]} ${unit}, what is the corresponding side of the larger ${polygon1.name}?`,
      questionLaTeX: `\\text{Two similar ${polygon1.name}s have corresponding sides in the ratio ${this.formatNumber(scaleFactor, params)}:1.} \\\\\\\ \\text{If the smaller ${polygon1.name} has a side of ${polygon1.sides[0]} ${unit}, what is the corresponding side of the larger ${polygon1.name}?}`,
      answer: `${this.formatNumber(polygon2.sides[0], params)} ${unit}`,
      answerLaTeX: `${this.formatNumber(polygon2.sides[0], params)} \\text{ ${unit}}`,
      steps: steps,
      diagram: diagram,
      metadata: {
        problemType: 'similarPolygons',
        polygon1: polygon1,
        polygon2: polygon2,
        scaleFactor: scaleFactor,
        unit: unit,
        difficulty: 'medium',
        estimatedTime: '4 minutes'
      }
    }
  }
  
  generateProportionsProblem(params) {
    const triangle1 = this.generateTriangle(params, 0.7)
    const scaleFactor = this.generateScaleFactor(params)
    const triangle2 = this.scaleTriangle(triangle1, scaleFactor)
    
    // Pick two sides to set up the proportion
    const knownSide1Index = 0
    const knownSide2Index = 1
    const unknownSideIndex = 2
    
    const knownSmall1 = triangle1.sides[knownSide1Index]
    const knownLarge1 = triangle2.sides[knownSide1Index]
    const knownSmall2 = triangle1.sides[knownSide2Index]
    const unknownLarge = triangle2.sides[unknownSideIndex]
    
    const unit = this.getRandomUnit(params.units)
    
    const steps = []
    if (params.showWork) {
      steps.push(`\\text{Set up proportion using corresponding sides}`)
      steps.push(`\\frac{\\text{side 1 large}}{\\text{side 1 small}} = \\frac{\\text{side 3 large}}{\\text{side 3 small}}`)
      steps.push(`\\frac{${knownLarge1}}{${knownSmall1}} = \\frac{x}{${knownSmall2}}`)
      steps.push(`\\text{Cross multiply: } ${knownLarge1} \\times ${knownSmall2} = ${knownSmall1} \\times x`)
      steps.push(`${knownLarge1 * knownSmall2} = ${knownSmall1}x`)
      steps.push(`x = \\frac{${knownLarge1 * knownSmall2}}{${knownSmall1}} = ${this.formatNumber(unknownLarge, params)}`)
    }
    
    const diagram = this.createSimilarityDiagram(triangle1, triangle2, 'proportion', params)
    
    return {
      question: `Two similar triangles have sides ${knownSmall1} ${unit} and ${knownLarge1} ${unit} as corresponding sides. If another side of the smaller triangle is ${knownSmall2} ${unit}, find the corresponding side of the larger triangle.`,
      questionLaTeX: `\\text{Two similar triangles have sides ${knownSmall1} ${unit} and ${knownLarge1} ${unit} as corresponding sides.} \\\\\\\\ \\text{If another side of the smaller triangle is ${knownSmall2} ${unit}, find the corresponding side of the larger triangle.}`,
      answer: `${this.formatNumber(unknownLarge, params)} ${unit}`,
      answerLaTeX: `${this.formatNumber(unknownLarge, params)} \\text{ ${unit}}`,
      steps: steps,
      diagram: diagram,
      metadata: {
        problemType: 'proportions',
        triangle1: triangle1,
        triangle2: triangle2,
        scaleFactor: scaleFactor,
        unit: unit,
        difficulty: 'medium',
        estimatedTime: '4 minutes'
      }
    }
  }
  
  generateWordProblem(params) {
    const scenarios = [
      {
        type: 'shadow',
        setup: () => {
          const personHeight = this.getRandomNumber(150, 180) // cm
          const personShadow = this.getRandomNumber(120, 200) // cm
          const treeHeight = this.getRandomNumber(800, 1200) // cm
          const treeShadow = (treeHeight * personShadow) / personHeight
          
          return {
            question: `A person who is ${personHeight} cm tall casts a ${personShadow} cm shadow. At the same time, a tree casts a ${this.formatNumber(treeShadow, params)} cm shadow. How tall is the tree?`,
            answer: treeHeight,
            unit: 'cm',
            steps: [
              `\\text{Similar triangles: person and shadow ~ tree and shadow}`,
              `\\frac{\\text{person height}}{\\text{person shadow}} = \\frac{\\text{tree height}}{\\text{tree shadow}}`,
              `\\frac{${personHeight}}{${personShadow}} = \\frac{x}{${this.formatNumber(treeShadow, params)}}`,
              `x = \\frac{${personHeight} \\times ${this.formatNumber(treeShadow, params)}}{${personShadow}} = ${treeHeight}`
            ]
          }
        }
      },
      {
        type: 'scale_model',
        setup: () => {
          const modelLength = this.getRandomNumber(15, 25)
          const scaleFactor = this.getRandomNumber(20, 40)
          const actualLength = modelLength * scaleFactor
          
          return {
            question: `A scale model of a building is ${modelLength} cm long. If the scale is 1:${scaleFactor}, what is the actual length of the building in meters?`,
            answer: actualLength / 100, // Convert to meters
            unit: 'm',
            steps: [
              `\\text{Scale: 1:${scaleFactor} means model : actual = 1 : ${scaleFactor}}`,
              `\\frac{\\text{model length}}{\\text{actual length}} = \\frac{1}{${scaleFactor}}`,
              `\\frac{${modelLength}}{x} = \\frac{1}{${scaleFactor}}`,
              `x = ${modelLength} \\times ${scaleFactor} = ${actualLength} \\text{ cm} = ${actualLength / 100} \\text{ m}`
            ]
          }
        }
      },
      {
        type: 'photo_enlargement',
        setup: () => {
          const originalWidth = this.getRandomNumber(4, 8)
          const originalHeight = this.getRandomNumber(6, 10)
          const newWidth = this.getRandomNumber(12, 20)
          const newHeight = (newWidth * originalHeight) / originalWidth
          
          return {
            question: `A photo is ${originalWidth} inches wide and ${originalHeight} inches tall. If it's enlarged so the width becomes ${newWidth} inches, what will the height be?`,
            answer: newHeight,
            unit: 'in',
            steps: [
              `\\text{Similar rectangles have proportional sides}`,
              `\\frac{\\text{new width}}{\\text{original width}} = \\frac{\\text{new height}}{\\text{original height}}`,
              `\\frac{${newWidth}}{${originalWidth}} = \\frac{h}{${originalHeight}}`,
              `h = \\frac{${newWidth} \\times ${originalHeight}}{${originalWidth}} = ${this.formatNumber(newHeight, params)}`
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
      answer: `${this.formatNumber(problem.answer, params)} ${problem.unit}`,
      answerLaTeX: `${this.formatNumber(problem.answer, params)} \\text{ ${problem.unit}}`,
      steps: problem.steps,
      metadata: {
        problemType: 'wordProblem',
        scenario: scenario.type,
        difficulty: 'medium',
        estimatedTime: '5 minutes'
      }
    }
  }
  
  // Helper methods for shape generation
  generateTriangle(params, sizeMultiplier = 1) {
    const maxSide = Math.floor(params.maxSideLength * sizeMultiplier)
    const minSide = Math.max(3, Math.floor(params.minSideLength * sizeMultiplier))
    
    return {
      name: 'triangle',
      sides: [
        this.generateSideLength(params, minSide, maxSide),
        this.generateSideLength(params, minSide, maxSide),
        this.generateSideLength(params, minSide, maxSide)
      ]
    }
  }
  
  generateRectangle(params, sizeMultiplier = 1) {
    const maxSide = Math.floor(params.maxSideLength * sizeMultiplier)
    const minSide = Math.max(3, Math.floor(params.minSideLength * sizeMultiplier))
    
    return {
      name: 'rectangle',
      length: this.generateSideLength(params, minSide, maxSide),
      width: this.generateSideLength(params, minSide, maxSide)
    }
  }
  
  generatePolygon(params, sizeMultiplier = 1) {
    const shapes = ['square', 'pentagon', 'hexagon']
    const shapeName = this.getRandomElement(shapes)
    const maxSide = Math.floor(params.maxSideLength * sizeMultiplier)
    const minSide = Math.max(3, Math.floor(params.minSideLength * sizeMultiplier))
    
    const numSides = shapeName === 'square' ? 4 : shapeName === 'pentagon' ? 5 : 6
    const sideLength = this.generateSideLength(params, minSide, maxSide)
    
    return {
      name: shapeName,
      sides: Array(numSides).fill(sideLength)
    }
  }
  
  generateSideLength(params, minOverride = null, maxOverride = null) {
    const min = minOverride || params.minSideLength
    const max = maxOverride || params.maxSideLength
    
    if (params.allowDecimals) {
      const value = min + Math.random() * (max - min)
      return this.roundToDecimal(value, params.decimalPlaces)
    } else {
      return this.getRandomNumber(min, max)
    }
  }
  
  generateScaleFactor(params) {
    const factors = params.allowDecimals ? 
      [1.5, 2, 2.5, 3, 3.5, 4] : 
      [2, 3, 4, 5]
    return this.getRandomElement(factors)
  }
  
  scaleTriangle(triangle, scaleFactor) {
    return {
      name: triangle.name,
      sides: triangle.sides.map(side => side * scaleFactor)
    }
  }
  
  scaleRectangle(rectangle, scaleFactor) {
    return {
      name: rectangle.name,
      length: rectangle.length * scaleFactor,
      width: rectangle.width * scaleFactor
    }
  }
  
  scalePolygon(polygon, scaleFactor) {
    return {
      name: polygon.name,
      sides: polygon.sides.map(side => side * scaleFactor)
    }
  }
  
  createSimilarityDiagram(shape1, shape2, type, params) {
    if (!params.showVisualDiagrams) return null
    
    const size = getDiagramSize(params.diagramSize)
    return {
      type: 'geometry-renderer',
      shape: 'similarity',
      measurements: { shape1, shape2 },
      unit: 'units',
      config: {
        width: size.width,
        height: size.height,
        theme: 'educational',
        showMeasurements: true,
        showLabels: true,
        showGrid: false,
        center: true,
        comparisonType: type,
        showCorrespondence: params.showCorrespondence
      },
      svgId: `similarity-${type}-${Date.now()}`
    }
  }
  
  createCongruenceDiagram(triangle1, triangle2, postulate, params) {
    if (!params.showVisualDiagrams) return null
    
    const size = getDiagramSize(params.diagramSize)
    return {
      type: 'geometry-renderer',
      shape: 'congruence',
      measurements: { triangle1, triangle2 },
      unit: 'units',
      config: {
        width: size.width,
        height: size.height,
        theme: 'educational',
        showMeasurements: true,
        showLabels: true,
        showGrid: false,
        center: true,
        postulate: postulate,
        showCorrespondence: params.showCorrespondence
      },
      svgId: `congruence-${postulate}-${Date.now()}`
    }
  }
  
  formatNumber(value, params) {
    if (params.allowDecimals) {
      return value.toFixed(params.decimalPlaces).replace(/\.?0+$/, '')
    } else {
      return Math.round(value).toString()
    }
  }
  
  getRandomUnit(unitType) {
    const units = {
      metric: ['cm', 'm', 'mm'],
      imperial: ['ft', 'in', 'yd'],
      mixed: ['cm', 'm', 'ft', 'in'],
      abstract: ['units']
    }
    
    return this.getRandomElement(units[unitType] || units.mixed)
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

export default SimilarCongruentGenerator