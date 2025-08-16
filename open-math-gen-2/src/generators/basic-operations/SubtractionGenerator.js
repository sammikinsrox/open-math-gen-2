import { BaseGenerator } from '../BaseGenerator.js'

/**
 * Subtraction Generator
 * Generates subtraction problems with customizable parameters
 */
export class SubtractionGenerator extends BaseGenerator {
  constructor() {
    super({
      name: 'Subtraction',
      description: 'Generate subtraction problems with whole numbers',
      category: 'basic-operations',
      difficulty: 'easy',
      icon: 'remove',
      
      defaultParameters: {
        problemCount: 10,
        minuendMin: 10,
        minuendMax: 100,
        subtrahendMin: 1,
        subtrahendMax: 50,
        allowNegativeResults: false,
        allowBorrowing: true
      },
      
      parameterSchema: {
        problemCount: {
          type: 'number',
          label: 'Number of Problems',
          description: 'How many subtraction problems to generate',
          min: 1,
          max: 100,
          required: true
        },
        minuendMin: {
          type: 'number',
          label: 'Minuend Minimum',
          description: 'Smallest number to subtract from',
          min: 1,
          max: 1000,
          required: true
        },
        minuendMax: {
          type: 'number',
          label: 'Minuend Maximum',
          description: 'Largest number to subtract from',
          min: 1,
          max: 10000,
          required: true
        },
        subtrahendMin: {
          type: 'number',
          label: 'Subtrahend Minimum',
          description: 'Smallest number to subtract',
          min: 0,
          max: 1000,
          required: true
        },
        subtrahendMax: {
          type: 'number',
          label: 'Subtrahend Maximum',
          description: 'Largest number to subtract',
          min: 1,
          max: 1000,
          required: true
        },
        allowNegativeResults: {
          type: 'boolean',
          label: 'Allow Negative Results',
          description: 'Allow problems with negative answers'
        },
        allowBorrowing: {
          type: 'boolean',
          label: 'Allow Borrowing',
          description: 'Allow problems that require borrowing'
        }
      }
    })
  }

  generateProblem(parameters = {}) {
    const params = { ...this.defaultParameters, ...parameters }
    
    // Validate parameters
    const validation = this.validateParameters(params)
    if (!validation.isValid) {
      throw new Error(`Invalid parameters: ${validation.errors.join(', ')}`)
    }
    
    // Generate problems with borrowing/negative result logic
    let minuend, subtrahend, answer
    let attempts = 0
    const maxAttempts = 100
    
    // When negative results are allowed, deliberately create some negative results
    const shouldForceNegative = params.allowNegativeResults && Math.random() < 0.4 // 40% chance of negative
    
    do {
      attempts++
      
      if (shouldForceNegative) {
        // Force a negative result by making subtrahend larger
        subtrahend = this.getRandomNumber(params.subtrahendMin, params.subtrahendMax)
        minuend = this.getRandomNumber(params.minuendMin, Math.min(subtrahend - 1, params.minuendMax))
      } else {
        // Normal generation
        minuend = this.getRandomNumber(params.minuendMin, params.minuendMax)
        subtrahend = this.getRandomNumber(params.subtrahendMin, params.subtrahendMax)
      }
      
      answer = minuend - subtrahend
      
      // Check constraints
      const hasNegativeResult = answer < 0
      const requiresBorrowing = this.checkRequiresBorrowing(minuend, subtrahend)
      
      // Accept based on constraints
      const meetsNegativeConstraint = params.allowNegativeResults || !hasNegativeResult
      const meetsBorrowingConstraint = params.allowBorrowing || !requiresBorrowing
      
      if (meetsNegativeConstraint && meetsBorrowingConstraint) {
        break
      }
      
    } while (attempts < maxAttempts)
    
    // Fallback: ensure we have a valid problem
    if (attempts >= maxAttempts) {
      if (params.allowNegativeResults) {
        // Generate any valid problem (positive or negative)
        minuend = this.getRandomNumber(params.minuendMin, params.minuendMax)
        subtrahend = this.getRandomNumber(params.subtrahendMin, params.subtrahendMax)
      } else {
        // Generate safe positive problem
        minuend = Math.max(params.minuendMin, 20)
        subtrahend = this.getRandomNumber(1, Math.min(minuend - 1, params.subtrahendMax))
      }
      answer = minuend - subtrahend
    }
    
    // Format question
    const questionText = `${minuend} - ${subtrahend} = ?`
    const questionLaTeX = `${minuend} - ${subtrahend} = \\square`
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: answer,
      answerLaTeX: `${answer}`,
      steps: [
        `${minuend} - ${subtrahend}`,
        `= ${answer}`
      ],
      metadata: {
        operation: 'subtraction',
        minuend: minuend,
        subtrahend: subtrahend,
        difficulty: this.difficulty,
        estimatedTime: '30 seconds'
      }
    }
  }

  /**
   * Check if subtraction requires borrowing/regrouping
   * @param {number} minuend - The number being subtracted from
   * @param {number} subtrahend - The number being subtracted
   * @returns {boolean} - True if borrowing is required
   */
  checkRequiresBorrowing(minuend, subtrahend) {
    // Convert to strings to check digit by digit
    const minuendStr = Math.abs(minuend).toString()
    const subtrahendStr = Math.abs(subtrahend).toString()
    
    // Pad with leading zeros for consistent length
    const maxLength = Math.max(minuendStr.length, subtrahendStr.length)
    const paddedMinuend = minuendStr.padStart(maxLength, '0')
    const paddedSubtrahend = subtrahendStr.padStart(maxLength, '0')
    
    // Check each column from right to left
    for (let position = maxLength - 1; position >= 0; position--) {
      const minuendDigit = parseInt(paddedMinuend[position])
      const subtrahendDigit = parseInt(paddedSubtrahend[position])
      
      // If any column needs borrowing (minuend digit < subtrahend digit)
      if (minuendDigit < subtrahendDigit) {
        return true
      }
    }
    
    return false
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}

export default SubtractionGenerator