import { BaseGenerator } from './BaseGenerator.js'

/**
 * Boilerplate Generator Template
 * 
 * This is a template generator that can be copied and customized
 * for each mathematical category and problem type.
 */
export class BoilerplateGenerator extends BaseGenerator {
  constructor() {
    super({
      name: 'Boilerplate Generator',
      description: 'A template generator for creating mathematical problems',
      category: 'general',
      difficulty: 'medium',
      icon: 'calculate',
      tags: ['template', 'boilerplate', 'example'],
      gradeLevel: 'K-12',
      estimatedTime: '30 seconds',
      exampleProblem: {
        question: '5 + 3 = ?',
        questionLaTeX: '5 + 3 = \\square',
        answer: '8',
        answerLaTeX: '8'
      },
      
      // Default parameter values
      defaultParameters: {
        problemCount: 10,
        minValue: 1,
        maxValue: 100,
        allowNegatives: false,
        includeWordProblems: false,
        allowDecimals: false,
        includeAddition: true,
        includeSubtraction: true,
        includeMultiplication: true,
        includeDivision: true,
        showSteps: true
      },
      
      // Parameter schema for validation and UI generation
      parameterSchema: {
        problemCount: {
          type: 'number',
          label: 'Number of Problems',
          description: 'How many problems to generate',
          min: 1,
          max: 100,
          required: true
        },
        minValue: {
          type: 'number',
          label: 'Minimum Value',
          description: 'Smallest number to use in problems',
          min: -1000,
          max: 1000,
          required: true
        },
        maxValue: {
          type: 'number',
          label: 'Maximum Value',
          description: 'Largest number to use in problems',
          min: -1000,
          max: 1000,
          required: true
        },
        allowNegatives: {
          type: 'boolean',
          label: 'Allow Negative Numbers',
          description: 'Include negative numbers in problems'
        },
        includeWordProblems: {
          type: 'boolean',
          label: 'Include Word Problems',
          description: 'Include real-world word problems'
        },
        allowDecimals: {
          type: 'boolean',
          label: 'Allow Decimals',
          description: 'Allow decimal values in problems'
        },
        includeAddition: {
          type: 'boolean',
          label: 'Include Addition',
          description: 'Include addition problems'
        },
        includeSubtraction: {
          type: 'boolean',
          label: 'Include Subtraction',
          description: 'Include subtraction problems'
        },
        includeMultiplication: {
          type: 'boolean',
          label: 'Include Multiplication',
          description: 'Include multiplication problems'
        },
        includeDivision: {
          type: 'boolean',
          label: 'Include Division',
          description: 'Include division problems'
        },
        showSteps: {
          type: 'boolean',
          label: 'Show Calculation Steps',
          description: 'Show step-by-step calculations'
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
    const enabledTypes = []
    if (params.includeAddition) enabledTypes.push('addition')
    if (params.includeSubtraction) enabledTypes.push('subtraction')
    if (params.includeMultiplication) enabledTypes.push('multiplication')
    if (params.includeDivision) enabledTypes.push('division')
    
    if (enabledTypes.length === 0) {
      throw new Error('At least one operation type must be enabled')
    }
    
    const problemType = this.getRandomElement(enabledTypes)
    
    // Determine problem type
    if (params.includeWordProblems && Math.random() < 0.3) {
      return this.generateWordProblem(problemType, params)
    } else {
      return this.generateBasicProblem(problemType, params)
    }
  }

  /**
   * Generate a basic arithmetic problem
   * @param {Object} params - Generation parameters
   * @returns {Object} Problem object
   */
  generateBasicProblem(type, params) {
    switch (type) {
      case 'addition':
        return this.generateAdditionProblem(params)
      case 'subtraction':
        return this.generateSubtractionProblem(params)
      case 'multiplication':
        return this.generateMultiplicationProblem(params)
      case 'division':
        return this.generateDivisionProblem(params)
      default:
        return this.generateAdditionProblem(params)
    }
  }
  
  generateAdditionProblem(params) {
    const num1 = this.generateValue(params)
    const num2 = this.generateValue(params)
    const answer = num1 + num2
    
    const steps = []
    if (params.showSteps) {
      steps.push(`${num1} + ${num2} = ${answer}`)
    }
    
    return {
      question: `${num1} + ${num2} = ?`,
      questionLaTeX: `${num1} + ${num2} = \\square`,
      answer: answer.toString(),
      answerLaTeX: answer.toString(),
      steps: steps,
      metadata: {
        operation: 'addition',
        operands: [num1, num2],
        result: answer,
        difficulty: this.difficulty,
        estimatedTime: '30 seconds'
      }
    }
  }
  
  generateSubtractionProblem(params) {
    let num1 = this.generateValue(params)
    let num2 = this.generateValue(params)
    
    // Ensure positive result unless negatives are allowed
    if (!params.allowNegatives && num2 > num1) {
      [num1, num2] = [num2, num1]
    }
    
    const answer = num1 - num2
    
    const steps = []
    if (params.showSteps) {
      steps.push(`${num1} - ${num2} = ${answer}`)
    }
    
    return {
      question: `${num1} - ${num2} = ?`,
      questionLaTeX: `${num1} - ${num2} = \\square`,
      answer: answer.toString(),
      answerLaTeX: answer.toString(),
      steps: steps,
      metadata: {
        operation: 'subtraction',
        operands: [num1, num2],
        result: answer,
        difficulty: this.difficulty,
        estimatedTime: '30 seconds'
      }
    }
  }
  
  generateMultiplicationProblem(params) {
    const num1 = this.generateValue(params)
    const num2 = this.generateValue(params)
    const answer = num1 * num2
    
    const steps = []
    if (params.showSteps) {
      steps.push(`${num1} \\times ${num2} = ${answer}`)
    }
    
    return {
      question: `${num1} × ${num2} = ?`,
      questionLaTeX: `${num1} \\times ${num2} = \\square`,
      answer: answer.toString(),
      answerLaTeX: answer.toString(),
      steps: steps,
      metadata: {
        operation: 'multiplication',
        operands: [num1, num2],
        result: answer,
        difficulty: this.difficulty,
        estimatedTime: '30 seconds'
      }
    }
  }
  
  generateDivisionProblem(params) {
    let num2 = this.generateValue(params)
    if (num2 === 0) num2 = 1 // Avoid division by zero
    
    const answer = this.generateValue(params)
    const num1 = answer * num2 // Ensure whole number result
    
    const steps = []
    if (params.showSteps) {
      steps.push(`${num1} \\div ${num2} = ${answer}`)
    }
    
    return {
      question: `${num1} ÷ ${num2} = ?`,
      questionLaTeX: `${num1} \\div ${num2} = \\square`,
      answer: answer.toString(),
      answerLaTeX: answer.toString(),
      steps: steps,
      metadata: {
        operation: 'division',
        operands: [num1, num2],
        result: answer,
        difficulty: this.difficulty,
        estimatedTime: '30 seconds'
      }
    }
  }

  /**
   * Generate a word problem
   * @param {Object} params - Generation parameters
   * @returns {Object} Problem object
   */
  generateWordProblem(type, params) {
    const value1 = this.generateValue(params)
    const value2 = this.generateValue(params)
    const names = ['Sarah', 'Mike', 'Emma', 'John', 'Lisa', 'Alex', 'Maria', 'David']
    const name = this.getRandomElement(names)
    
    const scenarios = this.getWordProblemScenarios(type, value1, value2, name, params)
    const scenario = this.getRandomElement(scenarios)
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Given information from the problem}`)
      steps.push(`\\text{Answer: } ${scenario.answer}`)
    }
    
    return {
      question: scenario.question,
      questionLaTeX: scenario.questionLaTeX,
      answer: scenario.answer.toString(),
      answerLaTeX: scenario.answer.toString(),
      steps: steps,
      metadata: {
        operation: `word-${type}`,
        scenario: scenario.type,
        name: name,
        values: [value1, value2],
        result: scenario.answer,
        difficulty: this.difficulty,
        estimatedTime: '60 seconds'
      }
    }
  }
  
  getWordProblemScenarios(type, value1, value2, name, params) {
    const scenarios = []
    
    switch (type) {
      case 'addition':
        scenarios.push({
          question: `${name} has ${value1} apples and buys ${value2} more apples.\\n\\nHow many apples does ${name} have in total?`,
          questionLaTeX: `\\text{${name} has ${value1} apples and buys ${value2} more apples.} \\\\\\\\ \\text{How many apples does ${name} have in total?}`,
          answer: value1 + value2,
          type: 'shopping'
        })
        scenarios.push({
          question: `There are ${value1} students in one classroom and ${value2} students in another.\\n\\nHow many students are there in total?`,
          questionLaTeX: `\\text{There are ${value1} students in one classroom} \\\\\\\\ \\text{and ${value2} students in another.} \\\\\\\\ \\text{How many students are there in total?}`,
          answer: value1 + value2,
          type: 'counting'
        })
        break
        
      case 'subtraction':
        const larger = Math.max(value1, value2)
        const smaller = Math.min(value1, value2)
        scenarios.push({
          question: `${name} had ${larger} stickers and gave away ${smaller} stickers.\\n\\nHow many stickers does ${name} have left?`,
          questionLaTeX: `\\text{${name} had ${larger} stickers and gave away ${smaller} stickers.} \\\\\\\\ \\text{How many stickers does ${name} have left?}`,
          answer: larger - smaller,
          type: 'giving-away'
        })
        break
        
      case 'multiplication':
        scenarios.push({
          question: `A box contains ${value1} items, and there are ${value2} such boxes.\\n\\nHow many items are there in total?`,
          questionLaTeX: `\\text{A box contains ${value1} items,} \\\\\\\\ \\text{and there are ${value2} such boxes.} \\\\\\\\ \\text{How many items are there in total?}`,
          answer: value1 * value2,
          type: 'grouping'
        })
        break
        
      case 'division':
        const total = value1 * value2
        scenarios.push({
          question: `${name} has ${total} candies and wants to share them equally among ${value2} friends.\\n\\nHow many candies will each friend get?`,
          questionLaTeX: `\\text{${name} has ${total} candies and wants to share them} \\\\\\\\ \\text{equally among ${value2} friends.} \\\\\\\\ \\text{How many candies will each friend get?}`,
          answer: value1,
          type: 'sharing'
        })
        break
    }
    
    return scenarios
  }

  /**
   * Generate a value respecting parameters
   * @param {Object} params - Generation parameters
   * @returns {number} Generated value
   */
  generateValue(params) {
    const min = params.allowNegatives ? params.minValue : Math.max(0, params.minValue)
    const max = params.maxValue
    
    if (params.allowDecimals) {
      const value = min + Math.random() * (max - min)
      return Math.round(value * 10) / 10
    } else {
      return Math.floor(Math.random() * (max - min + 1)) + min
    }
  }

  /**
   * Generate a random number within specified range
   * @param {number} min - Minimum value
   * @param {number} max - Maximum value
   * @param {boolean} allowNegatives - Allow negative numbers
   * @returns {number} Random number
   */
  getRandomNumber(min, max, allowNegatives = false) {
    if (!allowNegatives && min < 0) {
      min = 0
    }
    
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  /**
   * Get random element from array
   * @param {Array} array - Array to choose from
   * @returns {*} Random element
   */
  getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)]
  }

  /**
   * Generate random fraction
   * @param {number} maxNumerator - Maximum numerator
   * @param {number} maxDenominator - Maximum denominator
   * @returns {Object} Fraction object with numerator and denominator
   */
  getRandomFraction(maxNumerator = 10, maxDenominator = 10) {
    const numerator = Math.floor(Math.random() * maxNumerator) + 1
    let denominator = Math.floor(Math.random() * maxDenominator) + 1
    
    // Ensure denominator is not 1 for proper fractions
    if (denominator === 1 && maxDenominator > 1) {
      denominator = 2
    }
    
    return {
      numerator,
      denominator,
      decimal: numerator / denominator,
      latex: `\\frac{${numerator}}{${denominator}}`
    }
  }

  /**
   * Calculate Greatest Common Divisor
   * @param {number} a - First number
   * @param {number} b - Second number
   * @returns {number} GCD
   */
  gcd(a, b) {
    return b === 0 ? a : this.gcd(b, a % b)
  }

  /**
   * Calculate Least Common Multiple
   * @param {number} a - First number
   * @param {number} b - Second number
   * @returns {number} LCM
   */
  lcm(a, b) {
    return Math.abs(a * b) / this.gcd(a, b)
  }

  /**
   * Simplify a fraction
   * @param {number} numerator - Numerator
   * @param {number} denominator - Denominator
   * @returns {Object} Simplified fraction
   */
  simplifyFraction(numerator, denominator) {
    const divisor = this.gcd(numerator, denominator)
    return {
      numerator: numerator / divisor,
      denominator: denominator / divisor
    }
  }
}

export default BoilerplateGenerator