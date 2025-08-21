import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'
import { getDiagramSize } from '../geometry-basic/shared/DiagramSizes.js'

/**
 * Pythagorean Theorem Generator
 * 
 * Generates right triangle problems using the Pythagorean theorem (a² + b² = c²)
 * including finding missing sides, distance problems, and real-world applications.
 */
export class PythagoreanTheoremGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Pythagorean Theorem',
      description: 'Right triangle problems using a² + b² = c² including missing sides, distance, and applications',
      category: 'geometry-advanced',
      difficulty: 'medium',
      icon: 'change_history',
      tags: ['pythagorean', 'right triangle', 'hypotenuse', 'distance'],
      gradeLevel: '8-12',
      estimatedTime: '3-4 minutes',
      exampleProblem: {
        question: 'Find the length of the hypotenuse in a right triangle with legs of 3 and 4.',
        questionLaTeX: '\\text{Find the length of the hypotenuse in a right triangle with legs of 3 and 4.}',
        answer: '5',
        answerLaTeX: '5'
      },
      
      defaultParameters: {
        problemCount: 10,
        includeFindHypotenuse: true,
        includeFindLeg: true,
        includeDistanceProblems: true,
        includeWordProblems: true,
        includePythagoreanTriples: false,
        minSideLength: 3,
        maxSideLength: 20,
        allowDecimals: true,
        decimalPlaces: 1,
        units: 'mixed',
        showSteps: true,
        showVisualDiagrams: true,
        diagramSize: 'medium',
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
                description: 'How many Pythagorean theorem problems to generate',
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
                description: 'Determines the difficulty of problems',
                variant: 'cards',
                options: [
                  { value: 'basic', label: 'Basic', description: 'Simple whole numbers and basic triangles' },
                  { value: 'intermediate', label: 'Intermediate', description: 'Mixed problems with decimals' },
                  { value: 'advanced', label: 'Advanced', description: 'Complex applications and coordinate geometry' }
                ],
                order: 2
              })
            }
          }),
          
          problemTypes: schemaV2.createCategory({
            id: 'problemTypes',
            label: 'Problem Types',
            description: 'Choose which types of Pythagorean problems to include',
            icon: 'category',
            color: 'green',
            order: 2,
            parameters: {
              includeFindHypotenuse: schemaV2.createParameter({
                type: 'boolean',
                label: 'Find Hypotenuse',
                description: 'Given two legs, find the hypotenuse',
                helpText: 'c = √(a² + b²)',
                order: 1
              }),
              includeFindLeg: schemaV2.createParameter({
                type: 'boolean',
                label: 'Find Missing Leg',
                description: 'Given hypotenuse and one leg, find the other leg',
                helpText: 'a = √(c² - b²)',
                order: 2
              }),
              includeDistanceProblems: schemaV2.createParameter({
                type: 'boolean',
                label: 'Distance Problems',
                description: 'Find distance between two points',
                helpText: 'Coordinate plane applications',
                order: 3
              }),
              includeWordProblems: schemaV2.createParameter({
                type: 'boolean',
                label: 'Word Problems',
                description: 'Real-world applications',
                helpText: 'Ladders, ramps, navigation, etc.',
                order: 4
              }),
              includePythagoreanTriples: schemaV2.createParameter({
                type: 'boolean',
                label: 'Pythagorean Triples',
                description: 'Use known integer solutions',
                helpText: '3-4-5, 5-12-13, 8-15-17, etc.',
                order: 5
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
                description: 'Largest side length to use',
                min: 10,
                max: 50,
                required: true,
                slider: true,
                presets: [15, 20, 25, 30],
                order: 1
              }),
              allowDecimals: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Decimal Results',
                description: 'Include problems with decimal answers',
                helpText: 'More realistic measurements',
                order: 2
              }),
              decimalPlaces: schemaV2.createParameter({
                type: 'number',
                label: 'Decimal Places',
                description: 'Number of decimal places in results',
                min: 1,
                max: 3,
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
            description: 'Control diagram appearance and solution display',
            icon: 'visibility',
            color: 'orange',
            order: 4,
            parameters: {
              showVisualDiagrams: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Triangle Diagrams',
                description: 'Include right triangle diagrams',
                helpText: 'Visual representation of the problem',
                order: 1
              }),
              showSteps: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Solution Steps',
                description: 'Include step-by-step solutions',
                helpText: 'Educational breakdown of the process',
                order: 2
              }),
              diagramSize: schemaV2.createParameter({
                type: 'select',
                label: 'Diagram Size',
                description: 'Size of the triangle diagrams',
                options: [
                  { value: 'small', label: 'Small', description: '200×150px' },
                  { value: 'medium', label: 'Medium', description: '300×225px' },
                  { value: 'large', label: 'Large', description: '400×300px' }
                ],
                dependsOn: 'showVisualDiagrams',
                order: 3
              })
            }
          })
        },
        
        presets: [
          schemaV2.createPreset({
            id: 'basic-triangles',
            label: 'Basic Right Triangles',
            description: 'Simple Pythagorean problems with whole numbers',
            icon: 'change_history',
            category: 'difficulty',
            values: {
              problemCount: 10,
              includeFindHypotenuse: true,
              includeFindLeg: true,
              includeDistanceProblems: false,
              includeWordProblems: false,
              includePythagoreanTriples: true,
              maxSideLength: 15,
              allowDecimals: false,
              units: 'abstract',
              showSteps: true,
              showVisualDiagrams: true,
              diagramSize: 'medium',
              complexityLevel: 'basic'
            }
          }),
          
          schemaV2.createPreset({
            id: 'distance-problems',
            label: 'Distance Problems',
            description: 'Coordinate plane and distance applications',
            icon: 'place',
            category: 'application',
            values: {
              problemCount: 8,
              includeFindHypotenuse: false,
              includeFindLeg: false,
              includeDistanceProblems: true,
              includeWordProblems: true,
              includePythagoreanTriples: false,
              maxSideLength: 20,
              allowDecimals: true,
              decimalPlaces: 1,
              units: 'mixed',
              showSteps: true,
              showVisualDiagrams: true,
              diagramSize: 'large',
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'real-world',
            label: 'Real-World Applications',
            description: 'Practical problems using Pythagorean theorem',
            icon: 'home_work',
            category: 'application',
            values: {
              problemCount: 6,
              includeFindHypotenuse: true,
              includeFindLeg: true,
              includeDistanceProblems: false,
              includeWordProblems: true,
              includePythagoreanTriples: false,
              maxSideLength: 25,
              allowDecimals: true,
              decimalPlaces: 1,
              units: 'imperial',
              showSteps: true,
              showVisualDiagrams: true,
              diagramSize: 'large',
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive',
            label: 'Comprehensive Practice',
            description: 'All types of Pythagorean problems',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 15,
              includeFindHypotenuse: true,
              includeFindLeg: true,
              includeDistanceProblems: true,
              includeWordProblems: true,
              includePythagoreanTriples: true,
              maxSideLength: 20,
              allowDecimals: true,
              decimalPlaces: 1,
              units: 'mixed',
              showSteps: true,
              showVisualDiagrams: true,
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
    if (params.includeFindHypotenuse) problemTypes.push('findHypotenuse')
    if (params.includeFindLeg) problemTypes.push('findLeg')
    if (params.includeDistanceProblems) problemTypes.push('distance')
    if (params.includeWordProblems) problemTypes.push('wordProblem')
    
    if (problemTypes.length === 0) problemTypes.push('findHypotenuse')
    
    const problemType = this.getRandomElement(problemTypes)
    return this.generatePythagoreanProblem(problemType, params)
  }

  generatePythagoreanProblem(problemType, params) {
    switch (problemType) {
      case 'findHypotenuse':
        return this.generateFindHypotenuseProblem(params)
      case 'findLeg':
        return this.generateFindLegProblem(params)
      case 'distance':
        return this.generateDistanceProblem(params)
      case 'wordProblem':
        return this.generateWordProblem(params)
      default:
        return this.generateFindHypotenuseProblem(params)
    }
  }
  
  generateFindHypotenuseProblem(params) {
    let a, b
    
    if (params.includePythagoreanTriples && Math.random() < 0.4) {
      // Use known Pythagorean triples
      const triples = [[3,4,5], [5,12,13], [8,15,17], [7,24,25], [9,40,41]]
      const triple = this.getRandomElement(triples)
      const scale = this.getRandomNumber(1, 3)
      a = triple[0] * scale
      b = triple[1] * scale
    } else {
      a = this.getRandomNumber(params.minSideLength, params.maxSideLength)
      b = this.getRandomNumber(params.minSideLength, params.maxSideLength)
    }
    
    const c = Math.sqrt(a * a + b * b)
    const unit = this.getRandomUnit(params.units)
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Given: } a = ${a}, b = ${b}`)
      steps.push(`\\text{Formula: } c^2 = a^2 + b^2`)
      steps.push(`c^2 = ${a}^2 + ${b}^2`)
      steps.push(`c^2 = ${a * a} + ${b * b}`)
      steps.push(`c^2 = ${a * a + b * b}`)
      steps.push(`c = \\sqrt{${a * a + b * b}}`)
      steps.push(`c = ${this.formatAnswer(c, params)}`)
    }
    
    const diagram = this.createRightTriangleDiagram({ a, b, c, missing: 'c' }, params)
    
    return {
      question: `Find the length of the hypotenuse in a right triangle with legs of ${a} ${unit} and ${b} ${unit}.`,
      questionLaTeX: `\\text{Find the length of the hypotenuse in a right triangle with legs of ${a} ${unit} and ${b} ${unit}.}`,
      answer: `${this.formatAnswer(c, params)} ${unit}`,
      answerLaTeX: `${this.formatAnswer(c, params)} \\text{ ${unit}}`,
      steps: steps,
      diagram: diagram,
      metadata: {
        problemType: 'findHypotenuse',
        sides: { a, b, c },
        unit: unit,
        difficulty: 'medium',
        estimatedTime: '3 minutes'
      }
    }
  }
  
  generateFindLegProblem(params) {
    let a, c
    
    if (params.includePythagoreanTriples && Math.random() < 0.4) {
      // Use known Pythagorean triples
      const triples = [[3,4,5], [5,12,13], [8,15,17], [7,24,25], [9,40,41]]
      const triple = this.getRandomElement(triples)
      const scale = this.getRandomNumber(1, 3)
      a = triple[0] * scale
      c = triple[2] * scale // hypotenuse
    } else {
      a = this.getRandomNumber(params.minSideLength, params.maxSideLength)
      // Ensure hypotenuse is larger than leg
      c = this.getRandomNumber(a + 2, params.maxSideLength + 5)
    }
    
    const b = Math.sqrt(c * c - a * a)
    const unit = this.getRandomUnit(params.units)
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Given: } a = ${a}, c = ${c}`)
      steps.push(`\\text{Formula: } a^2 + b^2 = c^2`)
      steps.push(`\\text{Solve for b: } b^2 = c^2 - a^2`)
      steps.push(`b^2 = ${c}^2 - ${a}^2`)
      steps.push(`b^2 = ${c * c} - ${a * a}`)
      steps.push(`b^2 = ${c * c - a * a}`)
      steps.push(`b = \\sqrt{${c * c - a * a}}`)
      steps.push(`b = ${this.formatAnswer(b, params)}`)
    }
    
    const diagram = this.createRightTriangleDiagram({ a, b, c, missing: 'b' }, params)
    
    return {
      question: `Find the length of the missing leg in a right triangle with hypotenuse ${c} ${unit} and one leg ${a} ${unit}.`,
      questionLaTeX: `\\text{Find the length of the missing leg in a right triangle with hypotenuse ${c} ${unit} and one leg ${a} ${unit}.}`,
      answer: `${this.formatAnswer(b, params)} ${unit}`,
      answerLaTeX: `${this.formatAnswer(b, params)} \\text{ ${unit}}`,
      steps: steps,
      diagram: diagram,
      metadata: {
        problemType: 'findLeg',
        sides: { a, b, c },
        unit: unit,
        difficulty: 'medium',
        estimatedTime: '3 minutes'
      }
    }
  }
  
  generateDistanceProblem(params) {
    // Generate two points
    const maxCoord = Math.min(params.maxSideLength, 15)
    const x1 = this.getRandomNumber(-maxCoord, maxCoord)
    const y1 = this.getRandomNumber(-maxCoord, maxCoord)
    const x2 = this.getRandomNumber(-maxCoord, maxCoord)
    const y2 = this.getRandomNumber(-maxCoord, maxCoord)
    
    // Ensure points are different
    if (x1 === x2 && y1 === y2) {
      return this.generateDistanceProblem(params) // Retry
    }
    
    const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
    const unit = this.getRandomUnit(params.units)
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Distance formula: } d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}`)
      steps.push(`\\text{Points: } (${x1}, ${y1}) \\text{ and } (${x2}, ${y2})`)
      steps.push(`d = \\sqrt{(${x2} - ${x1})^2 + (${y2} - ${y1})^2}`)
      steps.push(`d = \\sqrt{(${x2 - x1})^2 + (${y2 - y1})^2}`)
      steps.push(`d = \\sqrt{${(x2 - x1) ** 2} + ${(y2 - y1) ** 2}}`)
      steps.push(`d = \\sqrt{${(x2 - x1) ** 2 + (y2 - y1) ** 2}}`)
      steps.push(`d = ${this.formatAnswer(distance, params)}`)
    }
    
    const diagram = this.createDistanceDiagram({x1, y1, x2, y2, distance}, params)
    
    return {
      question: `Find the distance between points (${x1}, ${y1}) and (${x2}, ${y2}).`,
      questionLaTeX: `\\text{Find the distance between points (${x1}, ${y1}) and (${x2}, ${y2}).}`,
      answer: `${this.formatAnswer(distance, params)} ${unit}`,
      answerLaTeX: `${this.formatAnswer(distance, params)} \\text{ ${unit}}`,
      steps: steps,
      diagram: diagram,
      metadata: {
        problemType: 'distance',
        points: { x1, y1, x2, y2 },
        distance: distance,
        unit: unit,
        difficulty: 'medium',
        estimatedTime: '4 minutes'
      }
    }
  }
  
  generateWordProblem(params) {
    const scenarios = [
      {
        type: 'ladder',
        setup: () => {
          const height = this.getRandomNumber(8, 16)
          const distance = this.getRandomNumber(6, 12)
          const ladder = Math.sqrt(height * height + distance * distance)
          return {
            question: `A ladder leans against a wall. The bottom of the ladder is ${distance} feet from the wall and reaches ${height} feet up the wall. How long is the ladder?`,
            answer: ladder,
            unit: 'ft',
            steps: [
              `\\text{This forms a right triangle}`,
              `\\text{Height = ${height} ft, Base = ${distance} ft}`,
              `\\text{Ladder}^2 = ${height}^2 + ${distance}^2`,
              `\\text{Ladder}^2 = ${height * height} + ${distance * distance} = ${height * height + distance * distance}`,
              `\\text{Ladder} = \\sqrt{${height * height + distance * distance}} = ${this.formatAnswer(ladder, params)} \\text{ ft}`
            ]
          }
        }
      },
      {
        type: 'diagonal',
        setup: () => {
          const length = this.getRandomNumber(12, 20)
          const width = this.getRandomNumber(8, 15)
          const diagonal = Math.sqrt(length * length + width * width)
          return {
            question: `A rectangular field is ${length} meters long and ${width} meters wide. What is the length of the diagonal path across the field?`,
            answer: diagonal,
            unit: 'm',
            steps: [
              `\\text{Diagonal forms hypotenuse of right triangle}`,
              `\\text{Length = ${length} m, Width = ${width} m}`,
              `\\text{Diagonal}^2 = ${length}^2 + ${width}^2`,
              `\\text{Diagonal}^2 = ${length * length} + ${width * width} = ${length * length + width * width}`,
              `\\text{Diagonal} = \\sqrt{${length * length + width * width}} = ${this.formatAnswer(diagonal, params)} \\text{ m}`
            ]
          }
        }
      }
    ]
    
    const scenario = this.getRandomElement(scenarios)
    const problem = scenario.setup()
    
    return {
      question: problem.question,
      questionLaTeX: `\\text{${problem.question}}`,
      answer: `${this.formatAnswer(problem.answer, params)} ${problem.unit}`,
      answerLaTeX: `${this.formatAnswer(problem.answer, params)} \\text{ ${problem.unit}}`,
      steps: problem.steps,
      metadata: {
        problemType: 'wordProblem',
        scenario: scenario.type,
        difficulty: 'medium',
        estimatedTime: '4 minutes'
      }
    }
  }
  
  createRightTriangleDiagram(triangle, params) {
    if (!params.showVisualDiagrams) return null
    
    const size = getDiagramSize(params.diagramSize)
    return {
      type: 'geometry-renderer',
      shape: 'right-triangle',
      measurements: { sides: triangle },
      unit: 'units',
      config: {
        width: size.width,
        height: size.height,
        theme: 'educational',
        showMeasurements: true,
        showLabels: true,
        showGrid: false,
        center: true,
        missing: triangle.missing
      },
      svgId: `right-triangle-${Date.now()}`
    }
  }
  
  createDistanceDiagram(distanceData, params) {
    if (!params.showVisualDiagrams) return null
    
    const size = getDiagramSize(params.diagramSize)
    return {
      type: 'geometry-renderer',
      shape: 'distance-points',
      measurements: { points: distanceData },
      unit: 'units',
      config: {
        width: size.width,
        height: size.height,
        theme: 'educational',
        showMeasurements: true,
        showLabels: true,
        showGrid: true,
        center: true,
        coordinateMode: true
      },
      svgId: `distance-points-${Date.now()}`
    }
  }
  
  formatAnswer(value, params) {
    if (params.allowDecimals) {
      return value.toFixed(params.decimalPlaces)
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
  
  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  
  getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)]
  }
}

export default PythagoreanTheoremGenerator