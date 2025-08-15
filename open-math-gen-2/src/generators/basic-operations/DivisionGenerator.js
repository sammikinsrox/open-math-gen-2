import { BaseGenerator } from '../BaseGenerator.js'

/**
 * Division Generator
 * Generates division problems with customizable parameters
 */
export class DivisionGenerator extends BaseGenerator {
  constructor() {
    super({
      name: 'Division',
      description: 'Generate division problems with whole numbers',
      category: 'basic-operations',
      difficulty: 'medium',
      
      defaultParameters: {
        problemCount: 10,
        dividendMin: 10,
        dividendMax: 144,
        divisorMin: 2,
        divisorMax: 12,
        allowRemainders: false,
        showLongDivision: false,
        showWorkSpace: true,
        includeAnswerKey: true
      },
      
      parameterSchema: {
        problemCount: {
          type: 'number',
          label: 'Number of Problems',
          description: 'How many division problems to generate',
          min: 1,
          max: 100,
          required: true
        },
        dividendMin: {
          type: 'number',
          label: 'Dividend Minimum',
          description: 'Smallest dividend (number being divided)',
          min: 1,
          max: 1000,
          required: true
        },
        dividendMax: {
          type: 'number',
          label: 'Dividend Maximum',
          description: 'Largest dividend (number being divided)',
          min: 1,
          max: 10000,
          required: true
        },
        divisorMin: {
          type: 'number',
          label: 'Divisor Minimum',
          description: 'Smallest divisor (number dividing by)',
          min: 1,
          max: 100,
          required: true
        },
        divisorMax: {
          type: 'number',
          label: 'Divisor Maximum',
          description: 'Largest divisor (number dividing by)',
          min: 1,
          max: 100,
          required: true
        },
        allowRemainders: {
          type: 'boolean',
          label: 'Allow Remainders',
          description: 'Include problems with remainders'
        },
        showLongDivision: {
          type: 'boolean',
          label: 'Show Long Division Format',
          description: 'Format problems for long division'
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
    
    const validation = this.validateParameters(params)
    if (!validation.isValid) {
      throw new Error(`Invalid parameters: ${validation.errors.join(', ')}`)
    }
    
    let dividend, divisor, quotient, remainder
    
    if (!params.allowRemainders) {
      // Generate problems with no remainder
      quotient = this.getRandomNumber(1, Math.floor(params.dividendMax / params.divisorMax))
      divisor = this.getRandomNumber(params.divisorMin, params.divisorMax)
      dividend = quotient * divisor
      remainder = 0
    } else {
      dividend = this.getRandomNumber(params.dividendMin, params.dividendMax)
      divisor = this.getRandomNumber(params.divisorMin, params.divisorMax)
      quotient = Math.floor(dividend / divisor)
      remainder = dividend % divisor
    }
    
    const questionText = `${dividend} ÷ ${divisor} = ?`
    const questionLaTeX = `${dividend} \\div ${divisor} = \\square`
    
    let answerText = `${quotient}`
    let answerLaTeX = `${quotient}`
    
    if (remainder > 0) {
      answerText += ` R${remainder}`
      answerLaTeX += ` \\text{ R}${remainder}`
    }
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: answerText,
      answerLaTeX: answerLaTeX,
      workSpace: params.showWorkSpace,
      steps: [
        `${dividend} ÷ ${divisor}`,
        `= ${answerText}`
      ],
      metadata: {
        operation: 'division',
        dividend: dividend,
        divisor: divisor,
        quotient: quotient,
        remainder: remainder,
        difficulty: this.difficulty,
        estimatedTime: '60 seconds'
      }
    }
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}

export default DivisionGenerator