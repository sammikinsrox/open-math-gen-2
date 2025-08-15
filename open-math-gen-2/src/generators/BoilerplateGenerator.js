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
      
      // Default parameter values
      defaultParameters: {
        problemCount: 10,
        minValue: 1,
        maxValue: 100,
        allowNegatives: false,
        showWorkSpace: true,
        includeAnswerKey: true
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
        showWorkSpace: {
          type: 'boolean',
          label: 'Show Work Space',
          description: 'Include space for student work'
        },
        includeAnswerKey: {
          type: 'boolean',
          label: 'Include Answer Key',
          description: 'Generate answer key with solutions'
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
    
    // TODO: Implement actual problem generation logic
    // This is where the specific mathematical problem would be created
    
    // For now, return a placeholder problem
    const num1 = this.getRandomNumber(params.minValue, params.maxValue, params.allowNegatives)
    const num2 = this.getRandomNumber(params.minValue, params.maxValue, params.allowNegatives)
    const operation = '+'
    const answer = num1 + num2
    
    return {
      question: `${num1} ${operation} ${num2} = ?`,
      questionLaTeX: `${num1} ${operation} ${num2} = \\square`,
      answer: answer,
      answerLaTeX: `${answer}`,
      workSpace: params.showWorkSpace,
      steps: [
        `${num1} ${operation} ${num2}`,
        `= ${answer}`
      ],
      metadata: {
        operation: operation,
        operands: [num1, num2],
        difficulty: this.difficulty,
        estimatedTime: '30 seconds'
      }
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