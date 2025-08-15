import { BaseGenerator } from '../BaseGenerator.js'

/**
 * Multiplication Generator
 * Generates multiplication problems with customizable parameters
 */
export class MultiplicationGenerator extends BaseGenerator {
  constructor() {
    super({
      name: 'Multiplication',
      description: 'Generate multiplication problems with whole numbers',
      category: 'basic-operations',
      difficulty: 'medium',
      icon: 'close',
      
      defaultParameters: {
        problemCount: 10,
        factor1Min: 1,
        factor1Max: 12,
        factor2Min: 1,
        factor2Max: 12,
        allowSingleDigit: true,
        allowDoubleDigit: true,
        showWorkSpace: true,
        includeAnswerKey: true
      },
      
      parameterSchema: {
        problemCount: {
          type: 'number',
          label: 'Number of Problems',
          description: 'How many multiplication problems to generate',
          min: 1,
          max: 100,
          required: true
        },
        factor1Min: {
          type: 'number',
          label: 'First Factor Minimum',
          description: 'Smallest first factor',
          min: 1,
          max: 100,
          required: true
        },
        factor1Max: {
          type: 'number',
          label: 'First Factor Maximum',
          description: 'Largest first factor',
          min: 1,
          max: 100,
          required: true
        },
        factor2Min: {
          type: 'number',
          label: 'Second Factor Minimum',
          description: 'Smallest second factor',
          min: 1,
          max: 100,
          required: true
        },
        factor2Max: {
          type: 'number',
          label: 'Second Factor Maximum',
          description: 'Largest second factor',
          min: 1,
          max: 100,
          required: true
        },
        allowSingleDigit: {
          type: 'boolean',
          label: 'Allow Single Digit',
          description: 'Include single digit multiplication'
        },
        allowDoubleDigit: {
          type: 'boolean',
          label: 'Allow Double Digit',
          description: 'Include double digit multiplication'
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
    
    const factor1 = this.getRandomNumber(params.factor1Min, params.factor1Max)
    const factor2 = this.getRandomNumber(params.factor2Min, params.factor2Max)
    const answer = factor1 * factor2
    
    const questionText = `${factor1} × ${factor2} = ?`
    const questionLaTeX = `${factor1} \\times ${factor2} = \\square`
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: answer,
      answerLaTeX: `${answer}`,
      workSpace: params.showWorkSpace,
      steps: [
        `${factor1} × ${factor2}`,
        `= ${answer}`
      ],
      metadata: {
        operation: 'multiplication',
        factors: [factor1, factor2],
        difficulty: this.difficulty,
        estimatedTime: '45 seconds'
      }
    }
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}

export default MultiplicationGenerator