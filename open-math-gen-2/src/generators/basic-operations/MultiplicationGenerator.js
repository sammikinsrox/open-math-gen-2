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
      tags: ['arithmetic', 'whole-numbers', 'times-tables', 'multiplication'],
      gradeLevel: '2-6',
      estimatedTime: '45 seconds',
      exampleProblem: {
        question: '7 × 8 = ?',
        questionLaTeX: '7 \\times 8 = \\square',
        answer: '56',
        answerLaTeX: '56'
      },
      
      defaultParameters: {
        problemCount: 10,
        factor1Min: 1,
        factor1Max: 12,
        factor2Min: 1,
        factor2Max: 12,
        allowSingleDigit: true,
        allowDoubleDigit: true
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
    
    // Generate factors with digit constraint logic
    let factor1, factor2, answer
    let attempts = 0
    const maxAttempts = 100
    
    do {
      attempts++
      
      factor1 = this.getRandomNumber(params.factor1Min, params.factor1Max)
      factor2 = this.getRandomNumber(params.factor2Min, params.factor2Max)
      
      // Check digit constraints
      const factor1Digits = factor1.toString().length
      const factor2Digits = factor2.toString().length
      
      const hasSingleDigit = factor1Digits === 1 || factor2Digits === 1
      const hasDoubleDigit = factor1Digits >= 2 || factor2Digits >= 2
      
      // Accept based on constraints
      const meetsSingleDigitConstraint = params.allowSingleDigit || !hasSingleDigit
      const meetsDoubleDigitConstraint = params.allowDoubleDigit || !hasDoubleDigit
      
      if (meetsSingleDigitConstraint && meetsDoubleDigitConstraint) {
        break
      }
      
    } while (attempts < maxAttempts)
    
    // Fallback: ensure we have a valid problem
    if (attempts >= maxAttempts) {
      // Generate simple valid problem
      factor1 = params.allowSingleDigit ? 
        this.getRandomNumber(1, 9) : 
        this.getRandomNumber(10, Math.min(params.factor1Max, 99))
      factor2 = params.allowSingleDigit ? 
        this.getRandomNumber(1, 9) : 
        this.getRandomNumber(10, Math.min(params.factor2Max, 99))
    }
    
    answer = factor1 * factor2
    
    const questionText = `${factor1} × ${factor2} = ?`
    const questionLaTeX = `${factor1} \\times ${factor2} = \\square`
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: answer,
      answerLaTeX: `${answer}`,
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