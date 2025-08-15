import { BaseGenerator } from '../BaseGenerator.js'

/**
 * Order of Operations Generator (PEMDAS)
 * Generates problems requiring proper order of operations
 */
export class OrderOfOperationsGenerator extends BaseGenerator {
  constructor() {
    super({
      name: 'Order of Operations (PEMDAS)',
      description: 'Generate problems requiring proper order of operations',
      category: 'basic-operations',
      difficulty: 'hard',
      icon: 'analytics',
      
      defaultParameters: {
        problemCount: 10,
        minNumber: 1,
        maxNumber: 20,
        includeParentheses: true,
        includeExponents: false,
        includeMultiplication: true,
        includeDivision: true,
        includeAddition: true,
        includeSubtraction: true,
        complexityLevel: 2,
        showWorkSpace: true,
        includeAnswerKey: true
      },
      
      parameterSchema: {
        problemCount: {
          type: 'number',
          label: 'Number of Problems',
          description: 'How many order of operations problems to generate',
          min: 1,
          max: 100,
          required: true
        },
        minNumber: {
          type: 'number',
          label: 'Minimum Number',
          description: 'Smallest number to use',
          min: 1,
          max: 50,
          required: true
        },
        maxNumber: {
          type: 'number',
          label: 'Maximum Number',
          description: 'Largest number to use',
          min: 1,
          max: 100,
          required: true
        },
        includeParentheses: {
          type: 'boolean',
          label: 'Include Parentheses',
          description: 'Include problems with parentheses'
        },
        includeExponents: {
          type: 'boolean',
          label: 'Include Exponents',
          description: 'Include problems with exponents'
        },
        includeMultiplication: {
          type: 'boolean',
          label: 'Include Multiplication',
          description: 'Include multiplication operations'
        },
        includeDivision: {
          type: 'boolean',
          label: 'Include Division',
          description: 'Include division operations'
        },
        includeAddition: {
          type: 'boolean',
          label: 'Include Addition',
          description: 'Include addition operations'
        },
        includeSubtraction: {
          type: 'boolean',
          label: 'Include Subtraction',
          description: 'Include subtraction operations'
        },
        complexityLevel: {
          type: 'number',
          label: 'Complexity Level',
          description: 'How complex the expressions should be',
          min: 1,
          max: 3,
          required: true
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
    
    // Generate a PEMDAS expression based on complexity level
    const expression = this.generatePEMDASExpression(params)
    const answer = this.evaluatePEMDAS(expression.expression)
    
    const questionText = `${expression.display} = ?`
    const questionLaTeX = `${expression.latex} = \\square`
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: answer,
      answerLaTeX: `${answer}`,
      workSpace: params.showWorkSpace,
      steps: expression.steps,
      metadata: {
        operation: 'order-of-operations',
        expression: expression.expression,
        difficulty: this.difficulty,
        estimatedTime: '120 seconds'
      }
    }
  }

  generatePEMDASExpression(params) {
    const num1 = this.getRandomNumber(params.minNumber, params.maxNumber)
    const num2 = this.getRandomNumber(params.minNumber, params.maxNumber)
    const num3 = this.getRandomNumber(params.minNumber, params.maxNumber)
    const num4 = this.getRandomNumber(params.minNumber, params.maxNumber)
    
    // Simple PEMDAS expression: a + b × c
    const expression = `${num1} + ${num2} × ${num3}`
    const steps = [
      expression,
      `${num1} + ${num2 * num3}`,
      `= ${num1 + (num2 * num3)}`
    ]
    
    return {
      expression: expression,
      display: expression,
      latex: `${num1} + ${num2} \\times ${num3}`,
      steps: steps
    }
  }

  evaluatePEMDAS(expression) {
    // Simple evaluation for basic PEMDAS
    // In a full implementation, this would parse the expression properly
    try {
      // For demo purposes, using eval (not recommended for production)
      return eval(expression.replace('×', '*').replace('÷', '/'))
    } catch (error) {
      return 0
    }
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}

export default OrderOfOperationsGenerator