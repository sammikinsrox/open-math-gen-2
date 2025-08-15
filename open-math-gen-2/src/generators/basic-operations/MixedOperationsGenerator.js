import { BaseGenerator } from '../BaseGenerator.js'

/**
 * Mixed Operations Generator
 * Generates problems with multiple operations
 */
export class MixedOperationsGenerator extends BaseGenerator {
  constructor() {
    super({
      name: 'Mixed Operations',
      description: 'Generate problems with mixed mathematical operations',
      category: 'basic-operations',
      difficulty: 'medium',
      
      defaultParameters: {
        problemCount: 10,
        minNumber: 1,
        maxNumber: 50,
        operationCount: 2,
        includeAddition: true,
        includeSubtraction: true,
        includeMultiplication: true,
        includeDivision: false,
        showWorkSpace: true,
        includeAnswerKey: true
      },
      
      parameterSchema: {
        problemCount: {
          type: 'number',
          label: 'Number of Problems',
          description: 'How many mixed operation problems to generate',
          min: 1,
          max: 100,
          required: true
        },
        minNumber: {
          type: 'number',
          label: 'Minimum Number',
          description: 'Smallest number to use',
          min: 1,
          max: 100,
          required: true
        },
        maxNumber: {
          type: 'number',
          label: 'Maximum Number',
          description: 'Largest number to use',
          min: 1,
          max: 1000,
          required: true
        },
        operationCount: {
          type: 'number',
          label: 'Number of Operations',
          description: 'How many operations in each problem',
          min: 2,
          max: 4,
          required: true
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
    
    const operations = []
    if (params.includeAddition) operations.push('+')
    if (params.includeSubtraction) operations.push('-')
    if (params.includeMultiplication) operations.push('×')
    if (params.includeDivision) operations.push('÷')
    
    if (operations.length === 0) {
      throw new Error('At least one operation type must be selected')
    }
    
    // Generate expression
    const numbers = []
    const ops = []
    
    for (let i = 0; i <= params.operationCount; i++) {
      numbers.push(this.getRandomNumber(params.minNumber, params.maxNumber))
      if (i < params.operationCount) {
        ops.push(this.getRandomElement(operations))
      }
    }
    
    // Build expression string
    let expression = numbers[0].toString()
    for (let i = 0; i < ops.length; i++) {
      expression += ` ${ops[i]} ${numbers[i + 1]}`
    }
    
    // Calculate answer (simplified evaluation)
    const answer = this.evaluateExpression(numbers, ops)
    
    const questionText = `${expression} = ?`
    const questionLaTeX = `${expression} = \\square`
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: answer,
      answerLaTeX: `${answer}`,
      workSpace: params.showWorkSpace,
      steps: [
        expression,
        `= ${answer}`
      ],
      metadata: {
        operation: 'mixed',
        numbers: numbers,
        operations: ops,
        difficulty: this.difficulty,
        estimatedTime: '90 seconds'
      }
    }
  }

  evaluateExpression(numbers, operations) {
    // Simple left-to-right evaluation (not following order of operations for simplicity)
    let result = numbers[0]
    
    for (let i = 0; i < operations.length; i++) {
      const op = operations[i]
      const num = numbers[i + 1]
      
      switch (op) {
        case '+':
          result += num
          break
        case '-':
          result -= num
          break
        case '×':
          result *= num
          break
        case '÷':
          result = Math.floor(result / num)
          break
      }
    }
    
    return result
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)]
  }
}

export default MixedOperationsGenerator