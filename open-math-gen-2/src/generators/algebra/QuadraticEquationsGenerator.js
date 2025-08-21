import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Quadratic Equations Generator
 * 
 * Generates quadratic equation problems with various solution methods
 * including factoring, completing the square, and quadratic formula.
 */
export class QuadraticEquationsGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Quadratic Equations',
      description: 'Solve quadratic equations using factoring, completing the square, and quadratic formula',
      category: 'algebra',
      difficulty: 'hard',
      icon: 'functions',
      tags: ['algebra', 'quadratic', 'equations', 'factoring', 'formula'],
      gradeLevel: '9-12',
      estimatedTime: '4-6 minutes',
      exampleProblem: {
        question: 'Solve: x² + 5x + 6 = 0',
        questionLaTeX: '\\text{Solve: } x^2 + 5x + 6 = 0',
        answer: 'x = -2, x = -3',
        answerLaTeX: 'x = -2, x = -3'
      },
      
      // Default parameter values
      defaultParameters: {
        problemCount: 8,
        includeFactoring: true,
        includeCompletingSquare: false,
        includeQuadraticFormula: false,
        includeWordProblems: false,
        includeGraphingForm: false,
        allowNoRealSolutions: false,
        allowIrrationalSolutions: false,
        maxCoefficient: 10,
        maxConstant: 20,
        solutionMethod: 'any',
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
                description: 'How many quadratic equations to generate',
                min: 1,
                max: 25,
                required: true,
                slider: true,
                presets: [5, 8, 10, 15],
                order: 1
              }),
              complexityLevel: schemaV2.createParameter({
                type: 'select',
                label: 'Complexity Level',
                description: 'Determines the difficulty of the quadratics',
                variant: 'cards',
                options: [
                  { 
                    value: 'basic', 
                    label: 'Basic',
                    description: 'Simple factoring with integer solutions'
                  },
                  { 
                    value: 'intermediate', 
                    label: 'Intermediate',
                    description: 'Mixed methods and some irrational solutions'
                  },
                  { 
                    value: 'advanced', 
                    label: 'Advanced',
                    description: 'Complex coefficients and special cases'
                  }
                ],
                order: 2
              })
            }
          }),
          
          solutionMethods: schemaV2.createCategory({
            id: 'solutionMethods',
            label: 'Solution Methods',
            description: 'Choose which solution methods to practice',
            icon: 'calculate',
            color: 'green',
            order: 2,
            parameters: {
              solutionMethod: schemaV2.createParameter({
                type: 'select',
                label: 'Preferred Method',
                description: 'Which solution method to emphasize',
                options: [
                  { value: 'any', label: 'Any Method', description: 'Let students choose' },
                  { value: 'factoring', label: 'Factoring', description: 'Focus on factoring method' },
                  { value: 'completing-square', label: 'Completing Square', description: 'Focus on completing the square' },
                  { value: 'quadratic-formula', label: 'Quadratic Formula', description: 'Focus on quadratic formula' }
                ],
                order: 1
              }),
              includeFactoring: schemaV2.createParameter({
                type: 'boolean',
                label: 'Factoring Method',
                description: 'Include problems that factor nicely',
                helpText: 'Quadratics with integer solutions',
                order: 2
              }),
              includeCompletingSquare: schemaV2.createParameter({
                type: 'boolean',
                label: 'Completing the Square',
                description: 'Include completing the square problems',
                helpText: 'Convert to vertex form',
                order: 3
              }),
              includeQuadraticFormula: schemaV2.createParameter({
                type: 'boolean',
                label: 'Quadratic Formula',
                description: 'Include quadratic formula problems',
                helpText: 'Use x = (-b ± √(b²-4ac))/(2a)',
                order: 4
              })
            }
          }),
          
          problemTypes: schemaV2.createCategory({
            id: 'problemTypes',
            label: 'Problem Types',
            description: 'Special types of quadratic problems',
            icon: 'category',
            color: 'purple',
            order: 3,
            parameters: {
              includeWordProblems: schemaV2.createParameter({
                type: 'boolean',
                label: 'Word Problems',
                description: 'Include real-world application problems',
                helpText: 'Projectile motion, area problems',
                order: 1
              }),
              includeGraphingForm: schemaV2.createParameter({
                type: 'boolean',
                label: 'Graphing Form',
                description: 'Convert to vertex form for graphing',
                helpText: 'y = a(x-h)² + k format',
                order: 2
              }),
              allowNoRealSolutions: schemaV2.createParameter({
                type: 'boolean',
                label: 'No Real Solutions',
                description: 'Include equations with complex solutions',
                helpText: 'Negative discriminant',
                order: 3
              }),
              allowIrrationalSolutions: schemaV2.createParameter({
                type: 'boolean',
                label: 'Irrational Solutions',
                description: 'Include equations with radical solutions',
                helpText: 'Solutions involving square roots',
                order: 4
              })
            }
          }),
          
          numberSettings: schemaV2.createCategory({
            id: 'numberSettings',
            label: 'Number Settings',
            description: 'Configure the ranges and types of numbers',
            icon: 'tag',
            color: 'orange',
            order: 4,
            parameters: {
              maxCoefficient: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Coefficient',
                description: 'Largest coefficient for x² and x terms',
                min: 1,
                max: 20,
                required: true,
                slider: true,
                presets: [5, 8, 10, 15],
                order: 1
              }),
              maxConstant: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Constant',
                description: 'Largest constant term',
                min: 5,
                max: 50,
                required: true,
                slider: true,
                presets: [10, 15, 20, 30],
                order: 2
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'factoring-practice',
            label: 'Factoring Practice',
            description: 'Focus on quadratics that factor nicely',
            icon: 'scatter_plot',
            category: 'method',
            values: {
              problemCount: 10,
              includeFactoring: true,
              includeCompletingSquare: false,
              includeQuadraticFormula: false,
              includeWordProblems: false,
              includeGraphingForm: false,
              allowNoRealSolutions: false,
              allowIrrationalSolutions: false,
              maxCoefficient: 8,
              maxConstant: 20,
              solutionMethod: 'factoring',
              complexityLevel: 'basic'
            }
          }),
          
          schemaV2.createPreset({
            id: 'quadratic-formula',
            label: 'Quadratic Formula',
            description: 'Practice using the quadratic formula',
            icon: 'functions',
            category: 'method',
            values: {
              problemCount: 8,
              includeFactoring: false,
              includeCompletingSquare: false,
              includeQuadraticFormula: true,
              includeWordProblems: false,
              includeGraphingForm: false,
              allowNoRealSolutions: true,
              allowIrrationalSolutions: true,
              maxCoefficient: 10,
              maxConstant: 25,
              solutionMethod: 'quadratic-formula',
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'completing-square',
            label: 'Completing the Square',
            description: 'Practice completing the square method',
            icon: 'crop_square',
            category: 'method',
            values: {
              problemCount: 6,
              includeFactoring: false,
              includeCompletingSquare: true,
              includeQuadraticFormula: false,
              includeWordProblems: false,
              includeGraphingForm: true,
              allowNoRealSolutions: false,
              allowIrrationalSolutions: true,
              maxCoefficient: 6,
              maxConstant: 15,
              solutionMethod: 'completing-square',
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'mixed-methods',
            label: 'Mixed Methods',
            description: 'Practice all solution methods',
            icon: 'shuffle',
            category: 'scope',
            values: {
              problemCount: 12,
              includeFactoring: true,
              includeCompletingSquare: true,
              includeQuadraticFormula: true,
              includeWordProblems: false,
              includeGraphingForm: false,
              allowNoRealSolutions: false,
              allowIrrationalSolutions: true,
              maxCoefficient: 8,
              maxConstant: 20,
              solutionMethod: 'any',
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'word-problems',
            label: 'Word Problems',
            description: 'Real-world quadratic applications',
            icon: 'description',
            category: 'scope',
            values: {
              problemCount: 6,
              includeFactoring: true,
              includeCompletingSquare: false,
              includeQuadraticFormula: true,
              includeWordProblems: true,
              includeGraphingForm: false,
              allowNoRealSolutions: false,
              allowIrrationalSolutions: false,
              maxCoefficient: 5,
              maxConstant: 15,
              solutionMethod: 'any',
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive',
            label: 'Comprehensive Practice',
            description: 'Complete practice with all types',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 15,
              includeFactoring: true,
              includeCompletingSquare: true,
              includeQuadraticFormula: true,
              includeWordProblems: true,
              includeGraphingForm: true,
              allowNoRealSolutions: true,
              allowIrrationalSolutions: true,
              maxCoefficient: 10,
              maxConstant: 25,
              solutionMethod: 'any',
              complexityLevel: 'advanced'
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
    if (!params.includeFactoring && !params.includeCompletingSquare && !params.includeQuadraticFormula && !params.includeWordProblems) {
      customErrors.push('At least one problem type must be enabled')
    }
    if (customErrors.length > 0) {
      throw new Error(`Invalid parameters: ${customErrors.join(', ')}`)
    }
    
    // Build array of enabled problem types
    const problemTypes = []
    if (params.includeWordProblems) problemTypes.push('wordProblem')
    if (params.includeFactoring) problemTypes.push('factoring')
    if (params.includeCompletingSquare) problemTypes.push('completingSquare')
    if (params.includeQuadraticFormula) problemTypes.push('quadraticFormula')
    if (params.includeGraphingForm) problemTypes.push('graphingForm')
    
    if (problemTypes.length === 0) {
      problemTypes.push('factoring') // fallback
    }
    
    const problemType = this.getRandomElement(problemTypes)
    
    return this.generateQuadraticProblem(problemType, params)
  }

  /**
   * Generate a quadratic equation problem
   * @param {string} problemType - Type of problem
   * @param {Object} params - Generation parameters
   * @returns {Object} Problem object
   */
  generateQuadraticProblem(problemType, params) {
    switch (problemType) {
      case 'wordProblem':
        return this.generateWordProblem(params)
      case 'factoring':
        return this.generateFactoringProblem(params)
      case 'completingSquare':
        return this.generateCompletingSquareProblem(params)
      case 'quadraticFormula':
        return this.generateQuadraticFormulaProblem(params)
      case 'graphingForm':
        return this.generateGraphingFormProblem(params)
      default:
        return this.generateFactoringProblem(params)
    }
  }
  
  generateFactoringProblem(params) {
    // Generate two factors that will create nice integer solutions
    let p = Math.floor(Math.random() * 8) + 1  // First solution
    let q = Math.floor(Math.random() * 8) + 1  // Second solution
    
    // Sometimes make them negative
    if (Math.random() < 0.3) p = -p
    if (Math.random() < 0.3) q = -q
    
    // Create quadratic from factors (x - p)(x - q) = x² - (p+q)x + pq
    const a = 1
    const b = -(p + q)
    const c = p * q
    
    const equation = this.formatQuadratic(a, b, c)
    
    const steps = [
      `\\text{Given: } ${equation} = 0`,
      `\\text{Look for two numbers that multiply to } ${c} \\text{ and add to } ${-b}`,
      `\\text{The numbers are } ${p} \\text{ and } ${q}`,
      `\\text{Factor: } (x - ${p})(x - ${q}) = 0`,
      `\\text{Set each factor equal to zero:}`,
      `x - ${p} = 0 \\text{ or } x - ${q} = 0`,
      `\\text{Solutions: } x = ${p}, x = ${q}`
    ]
    
    const solutions = [p, q].sort((a, b) => a - b)
    
    return {
      question: `Solve by factoring: ${equation} = 0`,
      questionLaTeX: `\\text{Solve by factoring: } ${equation} = 0`,
      answer: `x = ${solutions[0]}, x = ${solutions[1]}`,
      answerLaTeX: `x = ${solutions[0]}, x = ${solutions[1]}`,
      steps: steps,
      metadata: {
        problemType: 'factoring',
        coefficients: [a, b, c],
        solutions: solutions,
        method: 'factoring',
        difficulty: 'medium',
        estimatedTime: '3 minutes'
      }
    }
  }
  
  generateQuadraticFormulaProblem(params) {
    const a = Math.floor(Math.random() * params.maxCoefficient) + 1
    const b = Math.floor(Math.random() * params.maxCoefficient) + 1
    const c = Math.floor(Math.random() * params.maxConstant) + 1
    
    // Calculate discriminant
    const discriminant = b * b - 4 * a * c
    
    let solutions = []
    let solutionText = ''
    
    if (discriminant > 0) {
      const sqrt = Math.sqrt(discriminant)
      const x1 = (-b + sqrt) / (2 * a)
      const x2 = (-b - sqrt) / (2 * a)
      
      if (Number.isInteger(sqrt)) {
        solutions = [x1, x2]
        solutionText = `x = ${x1}, x = ${x2}`
      } else {
        solutionText = `x = \\frac{${-b} + \\sqrt{${discriminant}}}{${2 * a}}, x = \\frac{${-b} - \\sqrt{${discriminant}}}{${2 * a}}`
      }
    } else if (discriminant === 0) {
      const x = -b / (2 * a)
      solutions = [x]
      solutionText = `x = ${x}`
    } else {
      solutionText = 'No real solutions'
    }
    
    const equation = this.formatQuadratic(a, b, c)
    
    const steps = [
      `\\text{Given: } ${equation} = 0`,
      `\\text{Use quadratic formula: } x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}`,
      `\\text{Identify: } a = ${a}, b = ${b}, c = ${c}`,
      `\\text{Calculate discriminant: } b^2 - 4ac = ${b}^2 - 4(${a})(${c}) = ${discriminant}`,
      discriminant >= 0 ? 
        `\\text{Substitute: } x = \\frac{-${b} \\pm \\sqrt{${discriminant}}}{2(${a})}` :
        `\\text{Since discriminant < 0, no real solutions}`,
      `\\text{Solutions: } ${solutionText}`
    ]
    
    return {
      question: `Solve using the quadratic formula: ${equation} = 0`,
      questionLaTeX: `\\text{Solve using the quadratic formula: } ${equation} = 0`,
      answer: solutionText,
      answerLaTeX: solutionText,
      steps: steps,
      metadata: {
        problemType: 'quadraticFormula',
        coefficients: [a, b, c],
        discriminant: discriminant,
        solutions: solutions,
        method: 'quadratic-formula',
        difficulty: 'hard',
        estimatedTime: '5 minutes'
      }
    }
  }
  
  generateCompletingSquareProblem(params) {
    const a = 1 // Keep coefficient of x² as 1 for simplicity
    const b = Math.floor(Math.random() * 8) + 2
    const c = Math.floor(Math.random() * params.maxConstant) + 1
    
    const equation = this.formatQuadratic(a, b, c)
    
    // Complete the square: x² + bx + c = (x + b/2)² - (b/2)² + c
    const h = b / 2
    const k = c - (h * h)
    
    const steps = [
      `\\text{Given: } ${equation} = 0`,
      `\\text{Move constant to right side: } x^2 + ${b}x = ${-c}`,
      `\\text{Complete the square: take half of } ${b}, \\text{ square it: } (${h})^2 = ${h * h}`,
      `\\text{Add to both sides: } x^2 + ${b}x + ${h * h} = ${-c} + ${h * h}`,
      `\\text{Factor left side: } (x + ${h})^2 = ${-k}`,
      k > 0 ? `\\text{Take square root: } x + ${h} = \\pm\\sqrt{${-k}}` : `\\text{Since ${-k} < 0, no real solutions}`,
      k > 0 ? `\\text{Solve: } x = ${-h} \\pm \\sqrt{${-k}}` : `\\text{No real solutions}`
    ]
    
    let solutionText = ''
    if (k < 0) {
      const sqrt = Math.sqrt(-k)
      if (Number.isInteger(sqrt)) {
        const x1 = -h + sqrt
        const x2 = -h - sqrt
        solutionText = `x = ${x1}, x = ${x2}`
      } else {
        solutionText = `x = ${-h} + \\sqrt{${-k}}, x = ${-h} - \\sqrt{${-k}}`
      }
    } else if (k === 0) {
      solutionText = `x = ${-h}`
    } else {
      solutionText = 'No real solutions'
    }
    
    return {
      question: `Solve by completing the square: ${equation} = 0`,
      questionLaTeX: `\\text{Solve by completing the square: } ${equation} = 0`,
      answer: solutionText,
      answerLaTeX: solutionText,
      steps: steps,
      metadata: {
        problemType: 'completingSquare',
        coefficients: [a, b, c],
        vertexForm: { h: h, k: k },
        method: 'completing-square',
        difficulty: 'hard',
        estimatedTime: '6 minutes'
      }
    }
  }
  
  generateGraphingFormProblem(params) {
    // Generate a quadratic and ask to convert to vertex form
    const a = 1
    const b = Math.floor(Math.random() * 8) + 2
    const c = Math.floor(Math.random() * 10) + 1
    
    const equation = this.formatQuadratic(a, b, c)
    
    // Convert to vertex form: y = a(x - h)² + k
    const h = -b / (2 * a)
    const k = c - (b * b) / (4 * a)
    
    const steps = [
      `\\text{Given: } y = ${equation}`,
      `\\text{Complete the square to find vertex form}`,
      `\\text{Group x terms: } y = x^2 + ${b}x + ${c}`,
      `\\text{Complete the square: } (\\frac{${b}}{2})^2 = ${(b/2)**2}`,
      `\\text{Add and subtract: } y = (x^2 + ${b}x + ${(b/2)**2}) - ${(b/2)**2} + ${c}`,
      `\\text{Factor: } y = (x + ${b/2})^2 + ${k}`,
      `\\text{Vertex form: } y = (x - ${-b/2})^2 + ${k}`,
      `\\text{Vertex: } (${-b/2}, ${k})`
    ]
    
    return {
      question: `Convert to vertex form and find the vertex: y = ${equation}`,
      questionLaTeX: `\\text{Convert to vertex form and find the vertex: } y = ${equation}`,
      answer: `y = (x - ${-b/2})² + ${k}, vertex: (${-b/2}, ${k})`,
      answerLaTeX: `y = (x - ${-b/2})^2 + ${k}, \\text{ vertex: } (${-b/2}, ${k})`,
      steps: steps,
      metadata: {
        problemType: 'graphingForm',
        coefficients: [a, b, c],
        vertex: [-b/2, k],
        method: 'completing-square',
        difficulty: 'medium',
        estimatedTime: '4 minutes'
      }
    }
  }
  
  generateWordProblem(params) {
    const scenarios = [
      {
        type: 'projectile',
        setup: () => {
          const h0 = Math.floor(Math.random() * 50) + 50 // Initial height
          const v0 = Math.floor(Math.random() * 30) + 20 // Initial velocity
          return {
            question: `A ball is thrown upward from a height of ${h0} feet with an initial velocity of ${v0} ft/s. The height equation is h = -16t² + ${v0}t + ${h0}. When will the ball hit the ground?`,
            equation: `-16t^2 + ${v0}t + ${h0}`,
            variable: 't',
            condition: 'h = 0'
          }
        }
      },
      {
        type: 'area',
        setup: () => {
          const area = Math.floor(Math.random() * 50) + 30
          const extra = Math.floor(Math.random() * 10) + 5
          return {
            question: `A rectangle has length ${extra} feet more than its width. If the area is ${area} square feet, find the dimensions.`,
            equation: `x(x + ${extra})`,
            variable: 'x',
            condition: `= ${area}`
          }
        }
      },
      {
        type: 'number',
        setup: () => {
          const sum = Math.floor(Math.random() * 20) + 30
          return {
            question: `The sum of a number and its square is ${sum}. Find the number.`,
            equation: `x + x^2`,
            variable: 'x',
            condition: `= ${sum}`
          }
        }
      }
    ]
    
    const scenario = this.getRandomElement(scenarios)
    const problem = scenario.setup()
    
    const steps = [
      `\\text{Set up the equation from the problem}`,
      `\\text{Equation: } ${problem.equation} ${problem.condition}`,
      `\\text{Rearrange to standard form}`,
      `\\text{Solve using factoring or quadratic formula}`,
      `\\text{Check solutions in context of the problem}`
    ]
    
    return {
      question: problem.question,
      questionLaTeX: `\\text{${problem.question.replace(/\n/g, '} \\\\\\\\ \\text{')}}`,
      answer: `Solve: ${problem.equation} ${problem.condition}`,
      answerLaTeX: `\\text{Solve: } ${problem.equation} ${problem.condition}`,
      steps: steps,
      metadata: {
        problemType: 'wordProblem',
        scenario: scenario.type,
        equation: problem.equation,
        difficulty: 'hard',
        estimatedTime: '7 minutes'
      }
    }
  }
  
  /**
   * Format quadratic as LaTeX string
   * @param {number} a - Coefficient of x²
   * @param {number} b - Coefficient of x
   * @param {number} c - Constant term
   * @returns {string} LaTeX formatted quadratic
   */
  formatQuadratic(a, b, c) {
    let result = ''
    
    // x² term
    if (a === 1) {
      result += 'x^2'
    } else if (a === -1) {
      result += '-x^2'
    } else {
      result += `${a}x^2`
    }
    
    // x term
    if (b > 0) {
      if (b === 1) {
        result += ' + x'
      } else {
        result += ` + ${b}x`
      }
    } else if (b < 0) {
      if (b === -1) {
        result += ' - x'
      } else {
        result += ` - ${Math.abs(b)}x`
      }
    }
    
    // constant term
    if (c > 0) {
      result += ` + ${c}`
    } else if (c < 0) {
      result += ` - ${Math.abs(c)}`
    }
    
    return result
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

export default QuadraticEquationsGenerator