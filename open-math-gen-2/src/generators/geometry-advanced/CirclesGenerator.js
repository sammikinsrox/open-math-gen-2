import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'
import { getDiagramSize } from '../geometry-basic/shared/DiagramSizes.js'

/**
 * Circles Generator
 * 
 * Generates problems involving circles including circumference, area, arc length,
 * sector area, inscribed/circumscribed shapes, and circle equations.
 */
export class CirclesGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Circles',
      description: 'Comprehensive circle problems including circumference, area, arcs, sectors, and circle geometry',
      category: 'geometry-advanced',
      difficulty: 'medium',
      icon: 'radio_button_unchecked',
      tags: ['circles', 'circumference', 'area', 'arc', 'sector', 'pi'],
      gradeLevel: '6-12',
      estimatedTime: '3-5 minutes',
      exampleProblem: {
        question: 'Find the circumference and area of a circle with radius 8 cm.',
        questionLaTeX: '\\text{Find the circumference and area of a circle with radius 8 cm.}',
        answer: 'C = 50.27 cm, A = 201.06 cm²',
        answerLaTeX: 'C = 50.27 \\text{ cm}, A = 201.06 \\text{ cm}^2'
      },
      
      defaultParameters: {
        problemCount: 10,
        includeCircumference: true,
        includeArea: true,
        includeArcLength: true,
        includeSectorArea: true,
        includeInscribedShapes: false,
        includeCircumscribedShapes: false,
        includeCircleEquations: false,
        includeTangentProblems: false,
        includeWordProblems: true,
        minRadius: 2,
        maxRadius: 20,
        allowDecimals: true,
        decimalPlaces: 2,
        usePiExact: false,
        piApproximation: 3.14159,
        units: 'mixed',
        showFormulas: true,
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
                description: 'How many circle problems to generate',
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
                description: 'Determines the difficulty of circle problems',
                variant: 'cards',
                options: [
                  { value: 'basic', label: 'Basic', description: 'Circumference and area with simple radii' },
                  { value: 'intermediate', label: 'Intermediate', description: 'Arcs, sectors, and compound problems' },
                  { value: 'advanced', label: 'Advanced', description: 'Inscribed shapes, equations, and complex geometry' }
                ],
                order: 2
              })
            }
          }),
          
          circleProperties: schemaV2.createCategory({
            id: 'circleProperties',
            label: 'Circle Properties',
            description: 'Choose which circle properties to calculate',
            icon: 'radio_button_unchecked',
            color: 'green',
            order: 2,
            parameters: {
              includeCircumference: schemaV2.createParameter({
                type: 'boolean',
                label: 'Circumference',
                description: 'Calculate circumference using C = 2πr',
                helpText: 'Perimeter of the circle',
                order: 1
              }),
              includeArea: schemaV2.createParameter({
                type: 'boolean',
                label: 'Circle Area',
                description: 'Calculate area using A = πr²',
                helpText: 'Area enclosed by the circle',
                order: 2
              }),
              includeArcLength: schemaV2.createParameter({
                type: 'boolean',
                label: 'Arc Length',
                description: 'Calculate length of circular arcs',
                helpText: 's = rθ (radians) or s = (θ/360°) × 2πr',
                order: 3
              }),
              includeSectorArea: schemaV2.createParameter({
                type: 'boolean',
                label: 'Sector Area',
                description: 'Calculate area of circular sectors',
                helpText: 'A = (θ/360°) × πr²',
                order: 4
              })
            }
          }),
          
          advancedConcepts: schemaV2.createCategory({
            id: 'advancedConcepts',
            label: 'Advanced Concepts',
            description: 'More complex circle geometry problems',
            icon: 'psychology',
            color: 'purple',
            order: 3,
            parameters: {
              includeInscribedShapes: schemaV2.createParameter({
                type: 'boolean',
                label: 'Inscribed Shapes',
                description: 'Shapes drawn inside circles',
                helpText: 'Triangles, squares inscribed in circles',
                order: 1
              }),
              includeCircumscribedShapes: schemaV2.createParameter({
                type: 'boolean',
                label: 'Circumscribed Shapes',
                description: 'Circles drawn around shapes',
                helpText: 'Circles circumscribing polygons',
                order: 2
              }),
              includeCircleEquations: schemaV2.createParameter({
                type: 'boolean',
                label: 'Circle Equations',
                description: 'Coordinate geometry of circles',
                helpText: '(x-h)² + (y-k)² = r²',
                order: 3
              }),
              includeTangentProblems: schemaV2.createParameter({
                type: 'boolean',
                label: 'Tangent Lines',
                description: 'Problems involving tangent lines to circles',
                helpText: 'Tangent properties and calculations',
                order: 4
              }),
              includeWordProblems: schemaV2.createParameter({
                type: 'boolean',
                label: 'Word Problems',
                description: 'Real-world applications of circle concepts',
                helpText: 'Wheels, pizza, ponds, etc.',
                order: 5
              })
            }
          }),
          
          measurements: schemaV2.createCategory({
            id: 'measurements',
            label: 'Measurements & Precision',
            description: 'Configure radius ranges and calculation precision',
            icon: 'straighten',
            color: 'orange',
            order: 4,
            parameters: {
              maxRadius: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Radius',
                description: 'Largest radius value to use',
                min: 5,
                max: 50,
                required: true,
                slider: true,
                presets: [15, 20, 25, 30],
                order: 1
              }),
              allowDecimals: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Decimal Radii',
                description: 'Include decimal radius values',
                helpText: 'More realistic but harder calculations',
                order: 2
              }),
              decimalPlaces: schemaV2.createParameter({
                type: 'number',
                label: 'Decimal Places',
                description: 'Number of decimal places in results',
                min: 1,
                max: 4,
                required: true,
                dependsOn: 'allowDecimals',
                order: 3
              }),
              usePiExact: schemaV2.createParameter({
                type: 'boolean',
                label: 'Use Exact π Values',
                description: 'Leave answers in terms of π instead of decimal approximations',
                helpText: 'Answer as 16π instead of 50.27',
                order: 4
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
                order: 5
              })
            }
          }),
          
          visualization: schemaV2.createCategory({
            id: 'visualization',
            label: 'Visualization',
            description: 'Control diagram appearance and information display',
            icon: 'visibility',
            color: 'teal',
            order: 5,
            parameters: {
              showVisualDiagrams: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Visual Diagrams',
                description: 'Include circle diagrams with measurements',
                helpText: 'Helps students visualize the problem',
                order: 1
              }),
              showFormulas: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Formulas',
                description: 'Display relevant formulas in solutions',
                helpText: 'Educational reference for students',
                order: 2
              }),
              diagramSize: schemaV2.createParameter({
                type: 'select',
                label: 'Diagram Size',
                description: 'Size of the circle diagrams',
                options: [
                  { value: 'small', label: 'Small', description: '200×200px' },
                  { value: 'medium', label: 'Medium', description: '300×300px' },
                  { value: 'large', label: 'Large', description: '400×400px' }
                ],
                dependsOn: 'showVisualDiagrams',
                order: 3
              })
            }
          })
        },
        
        presets: [
          schemaV2.createPreset({
            id: 'basic-circles',
            label: 'Basic Circle Measurements',
            description: 'Focus on circumference and area calculations',
            icon: 'radio_button_unchecked',
            category: 'difficulty',
            values: {
              problemCount: 10,
              includeCircumference: true,
              includeArea: true,
              includeArcLength: false,
              includeSectorArea: false,
              includeInscribedShapes: false,
              includeCircumscribedShapes: false,
              includeCircleEquations: false,
              includeTangentProblems: false,
              includeWordProblems: true,
              maxRadius: 15,
              allowDecimals: false,
              usePiExact: false,
              units: 'mixed',
              showFormulas: true,
              showVisualDiagrams: true,
              diagramSize: 'medium',
              complexityLevel: 'basic'
            }
          }),
          
          schemaV2.createPreset({
            id: 'arcs-sectors',
            label: 'Arcs and Sectors',
            description: 'Practice with arc length and sector area',
            icon: 'pie_chart',
            category: 'concept',
            values: {
              problemCount: 8,
              includeCircumference: false,
              includeArea: false,
              includeArcLength: true,
              includeSectorArea: true,
              includeInscribedShapes: false,
              includeCircumscribedShapes: false,
              includeCircleEquations: false,
              includeTangentProblems: false,
              includeWordProblems: false,
              maxRadius: 20,
              allowDecimals: true,
              decimalPlaces: 2,
              usePiExact: false,
              units: 'metric',
              showFormulas: true,
              showVisualDiagrams: true,
              diagramSize: 'large',
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'exact-pi',
            label: 'Exact π Answers',
            description: 'Leave answers in terms of π',
            icon: 'functions',
            category: 'method',
            values: {
              problemCount: 12,
              includeCircumference: true,
              includeArea: true,
              includeArcLength: true,
              includeSectorArea: true,
              includeInscribedShapes: false,
              includeCircumscribedShapes: false,
              includeCircleEquations: false,
              includeTangentProblems: false,
              includeWordProblems: false,
              maxRadius: 12,
              allowDecimals: false,
              usePiExact: true,
              units: 'abstract',
              showFormulas: true,
              showVisualDiagrams: true,
              diagramSize: 'medium',
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'advanced-geometry',
            label: 'Advanced Circle Geometry',
            description: 'Inscribed shapes, equations, and complex problems',
            icon: 'psychology',
            category: 'difficulty',
            values: {
              problemCount: 8,
              includeCircumference: false,
              includeArea: false,
              includeArcLength: false,
              includeSectorArea: false,
              includeInscribedShapes: true,
              includeCircumscribedShapes: true,
              includeCircleEquations: true,
              includeTangentProblems: true,
              includeWordProblems: false,
              maxRadius: 25,
              allowDecimals: true,
              decimalPlaces: 2,
              usePiExact: false,
              units: 'mixed',
              showFormulas: true,
              showVisualDiagrams: true,
              diagramSize: 'large',
              complexityLevel: 'advanced'
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive',
            label: 'Comprehensive Circle Practice',
            description: 'All circle concepts with balanced difficulty',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 15,
              includeCircumference: true,
              includeArea: true,
              includeArcLength: true,
              includeSectorArea: true,
              includeInscribedShapes: true,
              includeCircumscribedShapes: false,
              includeCircleEquations: false,
              includeTangentProblems: false,
              includeWordProblems: true,
              maxRadius: 20,
              allowDecimals: true,
              decimalPlaces: 2,
              usePiExact: false,
              units: 'mixed',
              showFormulas: true,
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
    if (params.includeCircumference) problemTypes.push('circumference')
    if (params.includeArea) problemTypes.push('area')
    if (params.includeArcLength) problemTypes.push('arcLength')
    if (params.includeSectorArea) problemTypes.push('sectorArea')
    if (params.includeInscribedShapes) problemTypes.push('inscribed')
    if (params.includeCircumscribedShapes) problemTypes.push('circumscribed')
    if (params.includeCircleEquations) problemTypes.push('equation')
    if (params.includeTangentProblems) problemTypes.push('tangent')
    if (params.includeWordProblems) problemTypes.push('wordProblem')
    
    if (problemTypes.length === 0) problemTypes.push('circumference')
    
    const problemType = this.getRandomElement(problemTypes)
    return this.generateCircleProblem(problemType, params)
  }

  generateCircleProblem(problemType, params) {
    switch (problemType) {
      case 'circumference':
        return this.generateCircumferenceProblem(params)
      case 'area':
        return this.generateAreaProblem(params)
      case 'arcLength':
        return this.generateArcLengthProblem(params)
      case 'sectorArea':
        return this.generateSectorAreaProblem(params)
      case 'inscribed':
        return this.generateInscribedShapeProblem(params)
      case 'circumscribed':
        return this.generateCircumscribedShapeProblem(params)
      case 'equation':
        return this.generateCircleEquationProblem(params)
      case 'tangent':
        return this.generateTangentProblem(params)
      case 'wordProblem':
        return this.generateWordProblem(params)
      default:
        return this.generateCircumferenceProblem(params)
    }
  }
  
  generateCircumferenceProblem(params) {
    const radius = this.generateRadius(params)
    const circumference = 2 * Math.PI * radius
    const unit = this.getRandomUnit(params.units)
    
    const steps = []
    if (params.showFormulas) {
      steps.push(`\\text{Formula: } C = 2\\pi r`)
    }
    steps.push(`\\text{Given: } r = ${radius} \\text{ ${unit}}`)
    steps.push(`C = 2\\pi \\cdot ${radius}`)
    steps.push(`C = ${2 * radius}\\pi`)
    
    let answer, answerLaTeX
    if (params.usePiExact) {
      answer = `${2 * radius}π ${unit}`
      answerLaTeX = `${2 * radius}\\pi \\text{ ${unit}}`
    } else {
      const numericAnswer = params.allowDecimals ? 
        circumference.toFixed(params.decimalPlaces) : 
        Math.round(circumference)
      answer = `${numericAnswer} ${unit}`
      answerLaTeX = `${numericAnswer} \\text{ ${unit}}`
      steps.push(`C = ${numericAnswer} \\text{ ${unit}}`)
    }
    
    const diagram = this.createCircleDiagram({ radius, showRadius: true }, params)
    
    return {
      question: `Find the circumference of a circle with radius ${radius} ${unit}.`,
      questionLaTeX: `\\text{Find the circumference of a circle with radius ${radius} ${unit}.}`,
      answer: answer,
      answerLaTeX: answerLaTeX,
      steps: steps,
      diagram: diagram,
      metadata: {
        problemType: 'circumference',
        radius: radius,
        circumference: circumference,
        unit: unit,
        difficulty: 'easy',
        estimatedTime: '2 minutes'
      }
    }
  }
  
  generateAreaProblem(params) {
    const radius = this.generateRadius(params)
    const area = Math.PI * radius * radius
    const unit = this.getRandomUnit(params.units)
    
    const steps = []
    if (params.showFormulas) {
      steps.push(`\\text{Formula: } A = \\pi r^2`)
    }
    steps.push(`\\text{Given: } r = ${radius} \\text{ ${unit}}`)
    steps.push(`A = \\pi \\cdot ${radius}^2`)
    steps.push(`A = \\pi \\cdot ${radius * radius}`)
    steps.push(`A = ${radius * radius}\\pi`)
    
    let answer, answerLaTeX
    if (params.usePiExact) {
      answer = `${radius * radius}π ${unit}²`
      answerLaTeX = `${radius * radius}\\pi \\text{ ${unit}}^2`
    } else {
      const numericAnswer = params.allowDecimals ? 
        area.toFixed(params.decimalPlaces) : 
        Math.round(area)
      answer = `${numericAnswer} ${unit}²`
      answerLaTeX = `${numericAnswer} \\text{ ${unit}}^2`
      steps.push(`A = ${numericAnswer} \\text{ ${unit}}^2`)
    }
    
    const diagram = this.createCircleDiagram({ radius, showRadius: true, shaded: true }, params)
    
    return {
      question: `Find the area of a circle with radius ${radius} ${unit}.`,
      questionLaTeX: `\\text{Find the area of a circle with radius ${radius} ${unit}.}`,
      answer: answer,
      answerLaTeX: answerLaTeX,
      steps: steps,
      diagram: diagram,
      metadata: {
        problemType: 'area',
        radius: radius,
        area: area,
        unit: unit,
        difficulty: 'easy',
        estimatedTime: '2 minutes'
      }
    }
  }
  
  generateArcLengthProblem(params) {
    const radius = this.generateRadius(params)
    const angle = this.getRandomNumber(30, 270) // degrees
    const arcLength = (angle / 360) * 2 * Math.PI * radius
    const unit = this.getRandomUnit(params.units)
    
    const steps = []
    if (params.showFormulas) {
      steps.push(`\\text{Formula: } s = \\frac{\\\\theta}{360°} \\times 2\\pi r`)
    }
    steps.push(`\\text{Given: } r = ${radius} \\text{ ${unit}}, \\\\theta = ${angle}°`)
    steps.push(`s = \\frac{${angle}°}{360°} \\times 2\\pi \\cdot ${radius}`)
    steps.push(`s = \\frac{${angle}}{360} \\times ${2 * radius}\\pi`)
    
    let answer, answerLaTeX
    if (params.usePiExact) {
      const coefficient = (angle * 2 * radius) / 360
      const simplifiedCoeff = this.simplifyFraction(angle * 2 * radius, 360)
      answer = `${simplifiedCoeff.numerator}π/${simplifiedCoeff.denominator} ${unit}`
      answerLaTeX = `\\frac{${simplifiedCoeff.numerator}\\pi}{${simplifiedCoeff.denominator}} \\text{ ${unit}}`
    } else {
      const numericAnswer = params.allowDecimals ? 
        arcLength.toFixed(params.decimalPlaces) : 
        Math.round(arcLength)
      answer = `${numericAnswer} ${unit}`
      answerLaTeX = `${numericAnswer} \\text{ ${unit}}`
      steps.push(`s = ${numericAnswer} \\text{ ${unit}}`)
    }
    
    const diagram = this.createArcDiagram({ radius, angle }, params)
    
    return {
      question: `Find the arc length of a circle with radius ${radius} ${unit} and central angle ${angle}°.`,
      questionLaTeX: `\\text{Find the arc length of a circle with radius ${radius} ${unit} and central angle ${angle}°.}`,
      answer: answer,
      answerLaTeX: answerLaTeX,
      steps: steps,
      diagram: diagram,
      metadata: {
        problemType: 'arcLength',
        radius: radius,
        angle: angle,
        arcLength: arcLength,
        unit: unit,
        difficulty: 'medium',
        estimatedTime: '3 minutes'
      }
    }
  }
  
  generateSectorAreaProblem(params) {
    const radius = this.generateRadius(params)
    const angle = this.getRandomNumber(45, 270) // degrees
    const sectorArea = (angle / 360) * Math.PI * radius * radius
    const unit = this.getRandomUnit(params.units)
    
    const steps = []
    if (params.showFormulas) {
      steps.push(`\\text{Formula: } A = \\frac{\\\\theta}{360°} \\times \\pi r^2`)
    }
    steps.push(`\\text{Given: } r = ${radius} \\text{ ${unit}}, \\\\theta = ${angle}°`)
    steps.push(`A = \\frac{${angle}°}{360°} \\times \\pi \\cdot ${radius}^2`)
    steps.push(`A = \\frac{${angle}}{360} \\times \\pi \\cdot ${radius * radius}`)
    steps.push(`A = \\frac{${angle}}{360} \\times ${radius * radius}\\pi`)
    
    let answer, answerLaTeX
    if (params.usePiExact) {
      const coefficient = (angle * radius * radius) / 360
      const simplifiedCoeff = this.simplifyFraction(angle * radius * radius, 360)
      answer = `${simplifiedCoeff.numerator}π/${simplifiedCoeff.denominator} ${unit}²`
      answerLaTeX = `\\frac{${simplifiedCoeff.numerator}\\pi}{${simplifiedCoeff.denominator}} \\text{ ${unit}}^2`
    } else {
      const numericAnswer = params.allowDecimals ? 
        sectorArea.toFixed(params.decimalPlaces) : 
        Math.round(sectorArea)
      answer = `${numericAnswer} ${unit}²`
      answerLaTeX = `${numericAnswer} \\text{ ${unit}}^2`
      steps.push(`A = ${numericAnswer} \\text{ ${unit}}^2`)
    }
    
    const diagram = this.createSectorDiagram({ radius, angle }, params)
    
    return {
      question: `Find the area of a sector with radius ${radius} ${unit} and central angle ${angle}°.`,
      questionLaTeX: `\\text{Find the area of a sector with radius ${radius} ${unit} and central angle ${angle}°.}`,
      answer: answer,
      answerLaTeX: answerLaTeX,
      steps: steps,
      diagram: diagram,
      metadata: {
        problemType: 'sectorArea',
        radius: radius,
        angle: angle,
        sectorArea: sectorArea,
        unit: unit,
        difficulty: 'medium',
        estimatedTime: '3 minutes'
      }
    }
  }
  
  generateWordProblem(params) {
    const scenarios = [
      {
        type: 'wheel',
        setup: () => {
          const radius = this.getRandomNumber(12, 24) // inches for wheel
          const circumference = 2 * Math.PI * radius
          return {
            question: `A bicycle wheel has a radius of ${radius} inches. How far does the bicycle travel when the wheel makes one complete revolution?`,
            answer: circumference,
            unit: 'in',
            steps: [
              `\\text{One revolution = circumference}`,
              `C = 2\\pi r = 2\\pi \\cdot ${radius}`,
              `C = ${2 * radius}\\pi \\text{ inches}`
            ]
          }
        }
      },
      {
        type: 'pizza',
        setup: () => {
          const radius = this.getRandomNumber(6, 12) // inches for pizza
          const area = Math.PI * radius * radius
          return {
            question: `A pizza has a radius of ${radius} inches. What is the area of the pizza?`,
            answer: area,
            unit: 'in',
            steps: [
              `\\text{Pizza area = circle area}`,
              `A = \\pi r^2 = \\pi \\cdot ${radius}^2`,
              `A = ${radius * radius}\\pi \\text{ square inches}`
            ]
          }
        }
      },
      {
        type: 'pond',
        setup: () => {
          const radius = this.getRandomNumber(8, 20) // feet for pond
          const circumference = 2 * Math.PI * radius
          return {
            question: `A circular pond has a radius of ${radius} feet. How much fencing is needed to go around the pond?`,
            answer: circumference,
            unit: 'ft',
            steps: [
              `\\text{Fencing needed = circumference}`,
              `C = 2\\pi r = 2\\pi \\cdot ${radius}`,
              `C = ${2 * radius}\\pi \\text{ feet}`
            ]
          }
        }
      }
    ]
    
    const scenario = this.getRandomElement(scenarios)
    const problem = scenario.setup()
    
    let finalAnswer
    if (params.usePiExact) {
      if (scenario.type === 'pizza') {
        finalAnswer = `${problem.answer / Math.PI}π ${problem.unit}²`
      } else {
        finalAnswer = `${problem.answer / Math.PI}π ${problem.unit}`
      }
    } else {
      const numericAnswer = params.allowDecimals ? 
        problem.answer.toFixed(params.decimalPlaces) : 
        Math.round(problem.answer)
      finalAnswer = scenario.type === 'pizza' ? 
        `${numericAnswer} ${problem.unit}²` : 
        `${numericAnswer} ${problem.unit}`
    }
    
    return {
      question: problem.question,
      questionLaTeX: `\\text{${problem.question}}`,
      answer: finalAnswer,
      answerLaTeX: finalAnswer.replace(/²/g, '^2'),
      steps: problem.steps,
      metadata: {
        problemType: 'wordProblem',
        scenario: scenario.type,
        difficulty: 'medium',
        estimatedTime: '3 minutes'
      }
    }
  }
  
  generateInscribedShapeProblem(params) {
    const radius = this.generateRadius(params)
    const unit = this.getRandomUnit(params.units)
    
    // Generate inscribed square problem
    const sideLength = radius * Math.sqrt(2)
    const squareArea = sideLength * sideLength
    
    const steps = []
    if (params.showWork) {
      steps.push(`\\text{Inscribed square in circle}`)
      steps.push(`\\text{Circle radius: } r = ${radius} \\text{ ${unit}}`)
      steps.push(`\\text{Square diagonal = circle diameter = } 2r = ${2 * radius}`)
      steps.push(`\\text{Square side length: } s = \\frac{d}{\\sqrt{2}} = \\frac{${2 * radius}}{\\sqrt{2}} = ${this.formatNumber(sideLength, params)}`)
      steps.push(`\\text{Square area: } s^2 = ${this.formatNumber(squareArea, params)}`)
    }
    
    const diagram = this.createInscribedDiagram({ radius, sideLength }, params)
    
    return {
      question: `A square is inscribed in a circle with radius ${radius} ${unit}. Find the area of the square.`,
      questionLaTeX: `\\text{A square is inscribed in a circle with radius ${radius} ${unit}. Find the area of the square.}`,
      answer: `${this.formatNumber(squareArea, params)} ${unit}²`,
      answerLaTeX: `${this.formatNumber(squareArea, params)} \\text{ ${unit}}^2`,
      steps: steps,
      diagram: diagram,
      metadata: {
        problemType: 'inscribed',
        radius: radius,
        squareArea: squareArea,
        unit: unit,
        difficulty: 'hard',
        estimatedTime: '4 minutes'
      }
    }
  }
  
  generateCircumscribedShapeProblem(params) {
    const sideLength = this.getRandomNumber(6, 12)
    const unit = this.getRandomUnit(params.units)
    
    // Square circumscribing a circle
    const radius = sideLength / 2
    const circleArea = Math.PI * radius * radius
    
    const steps = []
    if (params.showWork) {
      steps.push(`\\text{Circle circumscribed by square}`)
      steps.push(`\\text{Square side length: } s = ${sideLength} \\text{ ${unit}}`)
      steps.push(`\\text{Circle radius: } r = \\frac{s}{2} = \\frac{${sideLength}}{2} = ${radius}`)
      steps.push(`\\text{Circle area: } A = \\pi r^2 = \\pi \\times ${radius}^2 = ${radius * radius}\\pi`)
    }
    
    const diagram = this.createCircumscribedDiagram({ sideLength, radius }, params)
    
    return {
      question: `A circle is circumscribed by a square with side length ${sideLength} ${unit}. Find the area of the circle.`,
      questionLaTeX: `\\text{A circle is circumscribed by a square with side length ${sideLength} ${unit}. Find the area of the circle.}`,
      answer: `${this.formatNumber(circleArea, params)} ${unit}²`,
      answerLaTeX: `${this.formatNumber(circleArea, params)} \\text{ ${unit}}^2`,
      steps: steps,
      diagram: diagram,
      metadata: {
        problemType: 'circumscribed',
        sideLength: sideLength,
        radius: radius,
        circleArea: circleArea,
        unit: unit,
        difficulty: 'hard',
        estimatedTime: '4 minutes'
      }
    }
  }
  
  generateCircleEquationProblem(params) {
    const centerX = this.getRandomNumber(-5, 5)
    const centerY = this.getRandomNumber(-5, 5)
    const radius = this.getRandomNumber(2, 8)
    
    const steps = []
    if (params.showWork) {
      steps.push(`\\text{Standard form: } (x - h)^2 + (y - k)^2 = r^2`)
      steps.push(`\\text{Center: } (${centerX}, ${centerY}), \\text{ radius: } ${radius}`)
      steps.push(`(x - ${centerX})^2 + (y - ${centerY})^2 = ${radius}^2`)
      steps.push(`(x - ${centerX})^2 + (y - ${centerY})^2 = ${radius * radius}`)
    }
    
    const diagram = this.createCircleEquationDiagram({ centerX, centerY, radius }, params)
    
    return {
      question: `Write the equation of a circle with center (${centerX}, ${centerY}) and radius ${radius}.`,
      questionLaTeX: `\\text{Write the equation of a circle with center (${centerX}, ${centerY}) and radius ${radius}.}`,
      answer: `(x - ${centerX})² + (y - ${centerY})² = ${radius * radius}`,
      answerLaTeX: `(x - ${centerX})^2 + (y - ${centerY})^2 = ${radius * radius}`,
      steps: steps,
      diagram: diagram,
      metadata: {
        problemType: 'equation',
        center: [centerX, centerY],
        radius: radius,
        difficulty: 'medium',
        estimatedTime: '3 minutes'
      }
    }
  }
  
  generateTangentProblem(params) {
    const radius = this.getRandomNumber(4, 10)
    const distance = this.getRandomNumber(radius + 2, radius + 8)
    
    // Find tangent length using Pythagorean theorem
    const tangentLength = Math.sqrt(distance * distance - radius * radius)
    
    const steps = []
    if (params.showWork) {
      steps.push(`\\text{Tangent from external point to circle}`)
      steps.push(`\\text{Circle radius: } r = ${radius}`)
      steps.push(`\\text{Distance from point to center: } d = ${distance}`)
      steps.push(`\\text{Tangent length: } t = \\sqrt{d^2 - r^2}`)
      steps.push(`t = \\sqrt{${distance}^2 - ${radius}^2} = \\sqrt{${distance * distance - radius * radius}}`)
      steps.push(`t = ${this.formatNumber(tangentLength, params)}`)
    }
    
    const diagram = this.createTangentDiagram({ radius, distance, tangentLength }, params)
    
    return {
      question: `Find the length of the tangent from a point ${distance} units away from the center of a circle with radius ${radius} units.`,
      questionLaTeX: `\\text{Find the length of the tangent from a point ${distance} units away from the center of a circle with radius ${radius} units.}`,
      answer: `${this.formatNumber(tangentLength, params)} units`,
      answerLaTeX: `${this.formatNumber(tangentLength, params)} \\text{ units}`,
      steps: steps,
      diagram: diagram,
      metadata: {
        problemType: 'tangent',
        radius: radius,
        distance: distance,
        tangentLength: tangentLength,
        difficulty: 'hard',
        estimatedTime: '5 minutes'
      }
    }
  }
  
  // Helper methods for diagram creation
  createCircleDiagram(config, params) {
    if (!params.showVisualDiagrams) return null
    
    const size = getDiagramSize(params.diagramSize)
    return {
      type: 'geometry-renderer',
      shape: 'circle',
      measurements: { radius: config.radius },
      unit: 'units',
      config: {
        width: size.width,
        height: size.height,
        theme: 'educational',
        showMeasurements: true,
        showLabels: config.showRadius || false,
        showGrid: false,
        center: true,
        highlightArea: config.shaded || false
      },
      svgId: `circle-${Date.now()}`
    }
  }
  
  createArcDiagram(config, params) {
    if (!params.showVisualDiagrams) return null
    
    const size = getDiagramSize(params.diagramSize)
    return {
      type: 'geometry-renderer',
      shape: 'arc',
      measurements: { radius: config.radius, angle: config.angle },
      unit: 'units',
      config: {
        width: size.width,
        height: size.height,
        theme: 'educational',
        showMeasurements: true,
        showLabels: false,
        showGrid: false,
        center: true
      },
      svgId: `arc-${Date.now()}`
    }
  }
  
  createSectorDiagram(config, params) {
    if (!params.showVisualDiagrams) return null
    
    const size = getDiagramSize(params.diagramSize)
    return {
      type: 'geometry-renderer',
      shape: 'sector',
      measurements: { radius: config.radius, angle: config.angle },
      unit: 'units',
      config: {
        width: size.width,
        height: size.height,
        theme: 'educational',
        showMeasurements: true,
        showLabels: false,
        showGrid: false,
        center: true,
        highlightArea: true
      },
      svgId: `sector-${Date.now()}`
    }
  }
  
  createInscribedDiagram(config, params) {
    if (!params.showVisualDiagrams) return null
    
    const size = getDiagramSize(params.diagramSize)
    return {
      type: 'geometry-renderer',
      shape: 'inscribed-square',
      measurements: { radius: config.radius, sideLength: config.sideLength },
      unit: 'units',
      config: {
        width: size.width,
        height: size.height,
        theme: 'educational',
        showMeasurements: true,
        showLabels: false,
        showGrid: false,
        center: true
      },
      svgId: `inscribed-${Date.now()}`
    }
  }
  
  createCircumscribedDiagram(config, params) {
    if (!params.showVisualDiagrams) return null
    
    const size = getDiagramSize(params.diagramSize)
    return {
      type: 'geometry-renderer',
      shape: 'circumscribed-circle',
      measurements: { radius: config.radius, sideLength: config.sideLength },
      unit: 'units',
      config: {
        width: size.width,
        height: size.height,
        theme: 'educational',
        showMeasurements: true,
        showLabels: false,
        showGrid: false,
        center: true
      },
      svgId: `circumscribed-${Date.now()}`
    }
  }
  
  createCircleEquationDiagram(config, params) {
    if (!params.showVisualDiagrams) return null
    
    const size = getDiagramSize(params.diagramSize)
    return {
      type: 'geometry-renderer',
      shape: 'circle',
      measurements: { radius: config.radius },
      unit: 'units',
      config: {
        width: size.width,
        height: size.height,
        theme: 'educational',
        showMeasurements: true,
        showLabels: false,
        showGrid: true,
        showAxes: true,
        center: true,
        coordinateMode: true,
        centerX: config.centerX,
        centerY: config.centerY
      },
      svgId: `coordinate-circle-${Date.now()}`
    }
  }
  
  createTangentDiagram(config, params) {
    if (!params.showVisualDiagrams) return null
    
    const size = getDiagramSize(params.diagramSize)
    return {
      type: 'geometry-renderer',
      shape: 'tangent',
      measurements: { radius: config.radius, distance: config.distance, tangentLength: config.tangentLength },
      unit: 'units',
      config: {
        width: size.width,
        height: size.height,
        theme: 'educational',
        showMeasurements: true,
        showLabels: false,
        showGrid: false,
        center: true
      },
      svgId: `tangent-${Date.now()}`
    }
  }
  
  // Helper methods
  generateRadius(params) {
    if (params.allowDecimals) {
      const radius = params.minRadius + Math.random() * (params.maxRadius - params.minRadius)
      return Number(radius.toFixed(1))
    } else {
      return this.getRandomNumber(params.minRadius, params.maxRadius)
    }
  }
  
  simplifyFraction(numerator, denominator) {
    const gcd = this.gcd(numerator, denominator)
    return {
      numerator: numerator / gcd,
      denominator: denominator / gcd
    }
  }
  
  gcd(a, b) {
    return b === 0 ? a : this.gcd(b, a % b)
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
  
  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  
  getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)]
  }
}

export default CirclesGenerator