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
        allowBorrowing: true,
        showWorkSpace: true,
        includeAnswerKey: true
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

  generateProblem(parameters = {}) {
    const params = { ...this.defaultParameters, ...parameters }
    
    // Validate parameters
    const validation = this.validateParameters(params)
    if (!validation.isValid) {
      throw new Error(`Invalid parameters: ${validation.errors.join(', ')}`)
    }
    
    // Generate minuend and subtrahend
    let minuend = this.getRandomNumber(params.minuendMin, params.minuendMax)
    let subtrahend = this.getRandomNumber(params.subtrahendMin, params.subtrahendMax)
    
    // Ensure positive result if negative results not allowed
    if (!params.allowNegativeResults && subtrahend > minuend) {
      [minuend, subtrahend] = [subtrahend, minuend]
    }
    
    const answer = minuend - subtrahend
    
    // Format question
    const questionText = `${minuend} - ${subtrahend} = ?`
    const questionLaTeX = `${minuend} - ${subtrahend} = \\square`
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: answer,
      answerLaTeX: `${answer}`,
      workSpace: params.showWorkSpace,
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

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}

export default SubtractionGenerator