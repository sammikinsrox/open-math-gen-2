import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * One-Step Equations Generator
 * 
 * Generates problems involving solving one-step linear equations,
 * including addition, subtraction, multiplication, and division equations.
 */
export class OneStepEquationsGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'One-Step Equations',
      description: 'Solve one-step linear equations using inverse operations',
      category: 'pre-algebra',
      difficulty: 'medium',
      icon: 'balance',
      tags: ['equations', 'solving', 'inverse operations', 'algebra'],
      gradeLevel: '6-9',
      estimatedTime: '45 seconds',
      exampleProblem: {
        question: 'Solve: x + 7 = 12',
        questionLaTeX: '\\text{Solve: } x + 7 = 12',
        answer: 'x = 5',
        answerLaTeX: 'x = 5'
      },
      
      // Default parameter values
      defaultParameters: {
        problemCount: 10,
        includeAddition: true,
        includeSubtraction: true,
        includeMultiplication: true,
        includeDivision: true,
        includeWordProblems: false,
        includeChecking: true,
        allowNegatives: true,
        allowFractions: false,
        allowDecimals: false,
        maxCoefficient: 10,
        maxConstant: 20,
        maxSolution: 15,
        showSteps: true,
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
                description: 'How many one-step equation problems to generate',
                min: 1,
                max: 50,
                required: true,
                slider: true,
                presets: [5, 8, 10, 15],
                order: 1
              }),
              complexityLevel: schemaV2.createParameter({
                type: 'select',
                label: 'Complexity Level',
                description: 'Determines the difficulty of equations',
                variant: 'cards',
                options: [
                  { 
                    value: 'basic', 
                    label: 'Basic',
                    description: 'Simple whole numbers, positive solutions'
                  },
                  { 
                    value: 'intermediate', 
                    label: 'Intermediate',
                    description: 'Includes negatives and larger numbers'
                  },
                  { 
                    value: 'advanced', 
                    label: 'Advanced',
                    description: 'Includes fractions and decimals'
                  }
                ],
                order: 2
              })
            }
          }),
          
          equationTypes: schemaV2.createCategory({
            id: 'equationTypes',
            label: 'Equation Types',
            description: 'Choose which types of one-step equations to include',
            icon: 'balance',
            color: 'green',
            order: 2,
            parameters: {
              includeAddition: schemaV2.createParameter({
                type: 'boolean',
                label: 'Addition Equations',
                description: 'Solve equations like x + 5 = 8',
                helpText: 'Use subtraction to solve',
                order: 1
              }),
              includeSubtraction: schemaV2.createParameter({
                type: 'boolean',
                label: 'Subtraction Equations',
                description: 'Solve equations like x - 3 = 7',
                helpText: 'Use addition to solve',
                order: 2
              }),
              includeMultiplication: schemaV2.createParameter({
                type: 'boolean',
                label: 'Multiplication Equations',
                description: 'Solve equations like 4x = 20',
                helpText: 'Use division to solve',
                order: 3
              }),
              includeDivision: schemaV2.createParameter({
                type: 'boolean',
                label: 'Division Equations',
                description: 'Solve equations like x/3 = 5',
                helpText: 'Use multiplication to solve',
                order: 4
              })
            }
          }),
          
          numberSettings: schemaV2.createCategory({
            id: 'numberSettings',
            label: 'Number Settings',
            description: 'Configure the ranges and types of numbers used',
            icon: 'tag',
            color: 'purple',
            order: 3,
            parameters: {
              maxCoefficient: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Coefficient',
                description: 'Largest coefficient for variables (in 5x = 20)',
                min: 2,
                max: 20,
                required: true,
                slider: true,
                presets: [5, 8, 10, 12],
                helpText: 'The number multiplying the variable',
                order: 1
              }),
              maxConstant: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Constant',
                description: 'Largest constant term in equations',
                min: 5,
                max: 50,
                required: true,
                slider: true,
                presets: [10, 15, 20, 30],
                helpText: 'Numbers added or subtracted',
                order: 2
              }),
              maxSolution: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Solution',
                description: 'Largest possible solution value',
                min: 5,
                max: 30,
                required: true,
                slider: true,
                presets: [10, 15, 20, 25],
                helpText: 'The answer (value of x)',
                order: 3
              }),
              allowNegatives: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Negative Numbers',
                description: 'Include negative coefficients and solutions',
                helpText: 'Adds complexity with negative values',
                order: 4
              })
            }
          }),
          
          advancedNumbers: schemaV2.createCategory({
            id: 'advancedNumbers',
            label: 'Advanced Numbers',
            description: 'Include more complex number types',
            icon: 'functions',
            color: 'orange',
            order: 4,
            parameters: {
              allowFractions: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Fractions',
                description: 'Include fractional coefficients and solutions',
                helpText: 'Examples: (1/2)x = 3, x/4 = 2',
                order: 1
              }),
              allowDecimals: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Decimals',
                description: 'Include decimal coefficients and solutions',
                helpText: 'Examples: 2.5x = 10, x - 1.5 = 3.7',
                order: 2
              })
            }
          }),
          
          presentation: schemaV2.createCategory({
            id: 'presentation',
            label: 'Presentation & Format',
            description: 'Control how problems are displayed',
            icon: 'palette',
            color: 'teal',
            order: 5,
            parameters: {
              includeWordProblems: schemaV2.createParameter({
                type: 'boolean',
                label: 'Include Word Problems',
                description: 'Include real-world equation problems',
                helpText: 'Story problems that lead to one-step equations',
                order: 1
              }),
              includeChecking: schemaV2.createParameter({
                type: 'boolean',
                label: 'Include Solution Checking',
                description: 'Show how to check the answer',
                helpText: 'Substitute solution back into original equation',
                order: 2
              }),
              showSteps: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Solution Steps',
                description: 'Include step-by-step solving process',
                helpText: 'Shows inverse operation used',
                order: 3
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'basic-equations',
            label: 'Basic Equations',
            description: 'Simple one-step equations with whole numbers',
            icon: 'looks_one',
            category: 'difficulty',
            values: {
              problemCount: 10,
              includeAddition: true,
              includeSubtraction: true,
              includeMultiplication: true,
              includeDivision: false,
              includeWordProblems: false,
              includeChecking: true,
              allowNegatives: false,
              allowFractions: false,
              allowDecimals: false,
              maxCoefficient: 6,
              maxConstant: 15,
              maxSolution: 10,
              showSteps: true,
              complexityLevel: 'basic'
            }
          }),
          
          schemaV2.createPreset({
            id: 'all-operations',
            label: 'All Operations',
            description: 'Practice all four operation types',
            icon: 'calculate',
            category: 'scope',
            values: {
              problemCount: 12,
              includeAddition: true,
              includeSubtraction: true,
              includeMultiplication: true,
              includeDivision: true,
              includeWordProblems: false,
              includeChecking: true,
              allowNegatives: true,
              allowFractions: false,
              allowDecimals: false,
              maxCoefficient: 8,
              maxConstant: 20,
              maxSolution: 15,
              showSteps: true,
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'word-problems',
            label: 'Word Problems',
            description: 'Real-world problems leading to one-step equations',
            icon: 'menu_book',
            category: 'scope',
            values: {
              problemCount: 8,
              includeAddition: true,
              includeSubtraction: true,
              includeMultiplication: true,
              includeDivision: false,
              includeWordProblems: true,
              includeChecking: false,
              allowNegatives: false,
              allowFractions: false,
              allowDecimals: false,
              maxCoefficient: 5,
              maxConstant: 12,
              maxSolution: 10,
              showSteps: true,
              complexityLevel: 'basic'
            }
          }),
          
          schemaV2.createPreset({
            id: 'with-negatives',
            label: 'Including Negatives',
            description: 'Practice with negative numbers',
            icon: 'exposure',
            category: 'scope',
            values: {
              problemCount: 10,
              includeAddition: true,
              includeSubtraction: true,
              includeMultiplication: true,
              includeDivision: true,
              includeWordProblems: false,
              includeChecking: true,
              allowNegatives: true,
              allowFractions: false,
              allowDecimals: false,
              maxCoefficient: 10,
              maxConstant: 15,
              maxSolution: 12,
              showSteps: true,
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'advanced-numbers',
            label: 'Advanced Numbers',
            description: 'Include fractions and decimals',
            icon: 'trending_up',
            category: 'difficulty',
            values: {
              problemCount: 8,
              includeAddition: true,
              includeSubtraction: true,
              includeMultiplication: true,
              includeDivision: true,
              includeWordProblems: false,
              includeChecking: false,
              allowNegatives: true,
              allowFractions: true,
              allowDecimals: true,
              maxCoefficient: 8,
              maxConstant: 12,
              maxSolution: 10,
              showSteps: true,
              complexityLevel: 'advanced'
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive-equations',
            label: 'Comprehensive Practice',
            description: 'Complete practice with all equation types',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 15,
              includeAddition: true,
              includeSubtraction: true,
              includeMultiplication: true,
              includeDivision: true,
              includeWordProblems: true,
              includeChecking: true,
              allowNegatives: true,
              allowFractions: false,
              allowDecimals: false,
              maxCoefficient: 10,
              maxConstant: 20,
              maxSolution: 15,
              showSteps: true,
              complexityLevel: 'intermediate'
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
    if (!params.includeAddition && !params.includeSubtraction && 
        !params.includeMultiplication && !params.includeDivision) {
      customErrors.push('At least one equation type must be enabled')
    }
    if (customErrors.length > 0) {
      throw new Error(`Invalid parameters: ${customErrors.join(', ')}`)
    }
    
    // Build array of enabled equation types
    const equationTypes = []
    if (params.includeAddition) equationTypes.push('addition')
    if (params.includeSubtraction) equationTypes.push('subtraction')
    if (params.includeMultiplication) equationTypes.push('multiplication')
    if (params.includeDivision) equationTypes.push('division')
    
    if (equationTypes.length === 0) {
      throw new Error('At least one equation type must be enabled')
    }
    
    const equationType = this.getRandomElement(equationTypes)
    
    // Determine if this should be a word problem
    if (params.includeWordProblems && Math.random() < 0.4) {
      return this.generateWordProblem(equationType, params)
    } else {
      return this.generateEquationProblem(equationType, params)
    }
  }

  /**
   * Generate an equation problem
   * @param {string} equationType - Type of equation
   * @param {Object} params - Generation parameters
   * @returns {Object} Problem object
   */
  generateEquationProblem(equationType, params) {
    switch (equationType) {
      case 'addition':
        return this.generateAdditionEquation(params)
      case 'subtraction':
        return this.generateSubtractionEquation(params)
      case 'multiplication':
        return this.generateMultiplicationEquation(params)
      case 'division':
        return this.generateDivisionEquation(params)
      default:
        return this.generateAdditionEquation(params)
    }
  }
  
  generateAdditionEquation(params) {
    const solution = this.generateSolution(params)
    const constant = this.generateConstant(params)
    const result = solution + constant
    
    const equation = `x + ${constant} = ${result}`
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{To solve } x + ${constant} = ${result}`)
      steps.push(`\\text{Subtract ${constant} from both sides}`)
      steps.push(`x + ${constant} - ${constant} = ${result} - ${constant}`)
      steps.push(`x = ${solution}`)
    }
    
    if (params.includeChecking) {
      steps.push(`\\text{Check: } ${solution} + ${constant} = ${solution + constant} \\checkmark`)
    }
    
    return {
      question: `Solve: ${equation}`,
      questionLaTeX: `\\text{Solve: } ${equation}`,
      answer: `x = ${solution}`,
      answerLaTeX: `x = ${solution}`,
      steps: steps,
      metadata: {
        problemType: 'addition',
        equation: equation,
        solution: solution,
        constant: constant,
        inverseOperation: 'subtraction',
        difficulty: 'medium',
        estimatedTime: '40 seconds'
      }
    }
  }
  
  generateSubtractionEquation(params) {
    const solution = this.generateSolution(params)
    const constant = this.generateConstant(params)
    const result = solution - constant
    
    const equation = `x - ${constant} = ${result}`
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{To solve } x - ${constant} = ${result}`)
      steps.push(`\\text{Add ${constant} to both sides}`)
      steps.push(`x - ${constant} + ${constant} = ${result} + ${constant}`)
      steps.push(`x = ${solution}`)
    }
    
    if (params.includeChecking) {
      steps.push(`\\text{Check: } ${solution} - ${constant} = ${solution - constant} \\checkmark`)
    }
    
    return {
      question: `Solve: ${equation}`,
      questionLaTeX: `\\text{Solve: } ${equation}`,
      answer: `x = ${solution}`,
      answerLaTeX: `x = ${solution}`,
      steps: steps,
      metadata: {
        problemType: 'subtraction',
        equation: equation,
        solution: solution,
        constant: constant,
        inverseOperation: 'addition',
        difficulty: 'medium',
        estimatedTime: '40 seconds'
      }
    }
  }
  
  generateMultiplicationEquation(params) {
    const solution = this.generateSolution(params)
    const coefficient = this.generateCoefficient(params)
    const result = coefficient * solution
    
    const equation = `${coefficient}x = ${result}`
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{To solve } ${coefficient}x = ${result}`)
      steps.push(`\\text{Divide both sides by } ${coefficient}`)
      steps.push(`\\frac{${coefficient}x}{${coefficient}} = \\frac{${result}}{${coefficient}}`)
      steps.push(`x = ${solution}`)
    }
    
    if (params.includeChecking) {
      steps.push(`\\text{Check: } ${coefficient} \\times ${solution} = ${coefficient * solution} \\checkmark`)
    }
    
    return {
      question: `Solve: ${equation}`,
      questionLaTeX: `\\text{Solve: } ${equation}`,
      answer: `x = ${solution}`,
      answerLaTeX: `x = ${solution}`,
      steps: steps,
      metadata: {
        problemType: 'multiplication',
        equation: equation,
        solution: solution,
        coefficient: coefficient,
        inverseOperation: 'division',
        difficulty: 'medium',
        estimatedTime: '45 seconds'
      }
    }
  }
  
  generateDivisionEquation(params) {
    const solution = this.generateSolution(params)
    const divisor = this.generateCoefficient(params)
    
    const equation = `\\frac{x}{${divisor}} = ${solution}`
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{To solve } \\frac{x}{${divisor}} = ${solution}`)
      steps.push(`\\text{Multiply both sides by } ${divisor}`)
      steps.push(`\\frac{x}{${divisor}} \\times ${divisor} = ${solution} \\times ${divisor}`)
      steps.push(`x = ${solution * divisor}`)
    }
    
    const finalSolution = solution * divisor
    if (params.includeChecking) {
      steps.push(`\\text{Check: } \\frac{${finalSolution}}{${divisor}} = ${finalSolution / divisor} \\checkmark`)
    }
    
    return {
      question: `Solve: ${equation}`,
      questionLaTeX: `\\text{Solve: } ${equation}`,
      answer: `x = ${finalSolution}`,
      answerLaTeX: `x = ${finalSolution}`,
      steps: steps,
      metadata: {
        problemType: 'division',
        equation: equation,
        solution: finalSolution,
        divisor: divisor,
        inverseOperation: 'multiplication',
        difficulty: 'medium',
        estimatedTime: '45 seconds'
      }
    }
  }

  /**
   * Generate word problems
   */
  generateWordProblem(equationType, params) {
    const scenarios = this.getWordProblemScenarios(equationType, params)
    const scenario = this.getRandomElement(scenarios)
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Let } x = \\text{${scenario.variableDescription}}`)
      steps.push(`\\text{Set up equation: } ${scenario.equation}`)
      steps.push(`\\text{Solve: } x = ${scenario.solution}`)
    }
    
    return {
      question: scenario.question,
      questionLaTeX: scenario.questionLaTeX,
      answer: scenario.answer,
      answerLaTeX: scenario.answerLaTeX,
      steps: steps,
      metadata: {
        problemType: `word-${equationType}`,
        scenario: scenario.type,
        equation: scenario.equation,
        solution: scenario.solution,
        difficulty: 'medium',
        estimatedTime: '60 seconds'
      }
    }
  }
  
  getWordProblemScenarios(equationType, params) {
    const scenarios = []
    
    if (equationType === 'addition') {
      const solution = this.generateSolution(params)
      const constant = this.generateConstant(params)
      const total = solution + constant
      
      scenarios.push({
        type: 'shopping',
        question: `Sarah bought a book and spent $${constant} on lunch. She spent a total of $${total}. How much did the book cost?`,
        questionLaTeX: `\\text{Sarah bought a book and spent $${constant} on lunch.} \\\\\\\\ \\text{She spent a total of $${total}. How much did the book cost?}`,
        answer: `$${solution}`,
        answerLaTeX: `\\$${solution}`,
        equation: `x + ${constant} = ${total}`,
        solution: solution,
        variableDescription: 'cost of the book'
      })
    }
    
    if (equationType === 'subtraction') {
      const solution = this.generateSolution(params)
      const constant = this.generateConstant(params)
      const start = solution + constant
      
      scenarios.push({
        type: 'remaining',
        question: `John had $${start}. After buying lunch, he has $${solution} left. How much did lunch cost?`,
        questionLaTeX: `\\text{John had $${start}. After buying lunch, he has $${solution} left.} \\\\\\\\ \\text{How much did lunch cost?}`,
        answer: `$${constant}`,
        answerLaTeX: `\\$${constant}`,
        equation: `${start} - x = ${solution}`,
        solution: constant,
        variableDescription: 'cost of lunch'
      })
    }
    
    if (equationType === 'multiplication') {
      const solution = this.generateSolution(params)
      const coefficient = this.generateCoefficient(params)
      const total = coefficient * solution
      
      scenarios.push({
        type: 'groups',
        question: `There are ${coefficient} boxes, each containing the same number of items. There are ${total} items total. How many items are in each box?`,
        questionLaTeX: `\\text{There are ${coefficient} boxes, each containing the same number of items.} \\\\\\\\ \\text{There are ${total} items total. How many items are in each box?}`,
        answer: `${solution} items`,
        answerLaTeX: `${solution} \\text{ items}`,
        equation: `${coefficient}x = ${total}`,
        solution: solution,
        variableDescription: 'items per box'
      })
    }
    
    if (equationType === 'division') {
      const solution = this.generateSolution(params)
      const divisor = this.generateCoefficient(params)
      const total = solution * divisor
      
      scenarios.push({
        type: 'sharing',
        question: `${total} students are divided equally into ${divisor} groups. How many students are in each group?`,
        questionLaTeX: `\\text{${total} students are divided equally into ${divisor} groups.} \\\\\\\\ \\text{How many students are in each group?}`,
        answer: `${solution} students`,
        answerLaTeX: `${solution} \\text{ students}`,
        equation: `\\frac{x}{${divisor}} = ${solution}`,
        solution: total,
        variableDescription: 'total students'
      })
    }
    
    return scenarios
  }

  /**
   * Helper methods to generate numbers
   */
  generateSolution(params) {
    let solution = Math.floor(Math.random() * params.maxSolution) + 1
    
    // Apply complexity level constraints
    if (params.complexityLevel === 'basic') {
      solution = Math.min(solution, 10)
      if (!params.allowNegatives) {
        solution = Math.abs(solution)
      }
    }
    
    if (params.allowNegatives && Math.random() < 0.3) {
      solution = -solution
    }
    
    if (params.allowFractions && Math.random() < 0.2) {
      const denominator = this.getRandomElement([2, 3, 4, 5])
      return solution + 1/denominator
    }
    
    if (params.allowDecimals && Math.random() < 0.2) {
      return solution + Math.round(Math.random() * 9) / 10
    }
    
    return solution
  }
  
  generateConstant(params) {
    let constant = Math.floor(Math.random() * params.maxConstant) + 1
    
    if (params.allowNegatives && Math.random() < 0.3) {
      constant = -constant
    }
    
    return constant
  }
  
  generateCoefficient(params) {
    let coefficient = Math.floor(Math.random() * params.maxCoefficient) + 2
    
    if (params.allowNegatives && Math.random() < 0.2) {
      coefficient = -coefficient
    }
    
    return coefficient
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

export default OneStepEquationsGenerator