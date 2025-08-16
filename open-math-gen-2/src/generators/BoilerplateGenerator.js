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
        allowDecimals: false
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
    
    // Determine problem type
    if (params.includeWordProblems && Math.random() < 0.3) {
      return this.generateWordProblem(params)
    } else {
      return this.generateBasicProblem(params)
    }
  }

  /**
   * Generate a basic arithmetic problem
   * @param {Object} params - Generation parameters
   * @returns {Object} Problem object
   */
  generateBasicProblem(params) {
    const num1 = this.generateValue(params)
    const num2 = this.generateValue(params)
    const operations = ['+', '-', '×', '÷']
    const operation = this.getRandomElement(operations)
    
    let answer
    switch (operation) {
      case '+':
        answer = num1 + num2
        break
      case '-':
        // Ensure positive result
        answer = Math.abs(num1 - num2)
        break
      case '×':
        answer = num1 * num2
        break
      case '÷':
        // Ensure whole number result
        answer = Math.floor(num1 / num2)
        break
      default:
        answer = num1 + num2
    }
    
    const steps = [
      `${num1} ${operation} ${num2}`,
      `= ${answer}`
    ]
    
    return {
      question: `${num1} ${operation} ${num2} = ?`,
      questionLaTeX: `${num1} ${operation === '×' ? '\\times' : operation === '÷' ? '\\div' : operation} ${num2} = \\square`,
      answer: answer.toString(),
      answerLaTeX: answer.toString(),
      steps: steps,
      metadata: {
        operation: operation,
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
  generateWordProblem(params) {
    const value1 = this.generateValue(params)
    const value2 = this.generateValue(params)
    
    const scenarios = [
      {
        question: `Sarah has ${value1} apples and buys ${value2} more apples.\\n\\nHow many apples does she have in total?`,
        questionLaTeX: `\\text{Sarah has ${value1} apples and buys ${value2} more apples.} \\\\\\\\ \\text{How many apples does she have in total?}`,
        answer: value1 + value2,
        operation: 'addition'
      },
      {
        question: `There are ${value1} students in a class and ${value2} students leave.\\n\\nHow many students remain?`,
        questionLaTeX: `\\text{There are ${value1} students in a class and ${value2} students leave.} \\\\\\\\ \\text{How many students remain?}`,
        answer: Math.abs(value1 - value2),
        operation: 'subtraction'
      },
      {
        question: `A box contains ${value1} items, and there are ${value2} such boxes.\\n\\nHow many items are there in total?`,
        questionLaTeX: `\\text{A box contains ${value1} items, and there are ${value2} such boxes.} \\\\\\\\ \\text{How many items are there in total?}`,
        answer: value1 * value2,
        operation: 'multiplication'
      }
    ]
    
    const scenario = this.getRandomElement(scenarios)
    
    return {
      question: scenario.question,
      questionLaTeX: scenario.questionLaTeX,
      answer: scenario.answer.toString(),
      answerLaTeX: scenario.answer.toString(),
      steps: [
        `\\text{Given information from the problem}`,
        `\\text{Answer: } ${scenario.answer}`
      ],
      metadata: {
        operation: `word-${scenario.operation}`,
        scenario: 'word-problem',
        values: [value1, value2],
        result: scenario.answer,
        difficulty: this.difficulty,
        estimatedTime: '60 seconds'
      }
    }
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