import { BaseGenerator } from '../BaseGenerator.js'

/**
 * Number Comparison Generator
 * Generates problems comparing numbers using <, >, =, ordering, and greatest/least
 */
export class NumberComparisonGenerator extends BaseGenerator {
  constructor() {
    super({
      name: 'Number Comparison',
      description: 'Generate number comparison problems with ordering and inequality symbols',
      category: 'numbers-place-value',
      difficulty: 'easy',
      icon: 'compare_arrows',
      tags: ['comparison', 'ordering', 'inequalities'],
      gradeLevel: '1-4',
      estimatedTime: '30 seconds',
      exampleProblem: {
        question: 'Compare: 45 ___ 52',
        questionLaTeX: '\\text{Compare: } 45 \\quad \\square \\quad 52',
        answer: '<',
        answerLaTeX: '<'
      },
      
      defaultParameters: {
        problemCount: 10,
        minNumber: 1,
        maxNumber: 1000,
        problemType: 'compare-two',
        includeDecimals: false,
        maxDecimalPlaces: 2,
        includeNegatives: false,
        orderingCount: 4
      },
      
      parameterSchema: {
        problemCount: {
          type: 'number',
          label: 'Number of Problems',
          description: 'How many comparison problems to generate',
          min: 1,
          max: 100,
          required: true
        },
        minNumber: {
          type: 'number',
          label: 'Minimum Number',
          description: 'Smallest number to use',
          min: -1000,
          max: 1000,
          required: true
        },
        maxNumber: {
          type: 'number',
          label: 'Maximum Number',
          description: 'Largest number to use',
          min: -1000,
          max: 10000,
          required: true
        },
        problemType: {
          type: 'string',
          label: 'Problem Type',
          description: 'Type of comparison problem',
          options: ['compare-two', 'order-ascending', 'order-descending', 'greatest-least', 'mixed']
        },
        includeDecimals: {
          type: 'boolean',
          label: 'Include Decimals',
          description: 'Include decimal numbers in comparisons'
        },
        maxDecimalPlaces: {
          type: 'number',
          label: 'Maximum Decimal Places',
          description: 'Maximum number of decimal places',
          min: 1,
          max: 3,
          required: true
        },
        includeNegatives: {
          type: 'boolean',
          label: 'Include Negative Numbers',
          description: 'Include negative numbers in comparisons'
        },
        orderingCount: {
          type: 'number',
          label: 'Numbers to Order',
          description: 'How many numbers to use in ordering problems',
          min: 3,
          max: 6,
          required: true
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
    
    // Choose problem type
    const problemType = params.problemType === 'mixed' ? 
      this.getRandomElement(['compare-two', 'order-ascending', 'order-descending', 'greatest-least']) :
      params.problemType
    
    return this.createProblemByType(problemType, params)
  }

  createProblemByType(problemType, params) {
    switch (problemType) {
      case 'compare-two':
        return this.createComparisonProblem(params)
      case 'order-ascending':
        return this.createOrderingProblem(params, 'ascending')
      case 'order-descending':
        return this.createOrderingProblem(params, 'descending')
      case 'greatest-least':
        return this.createGreatestLeastProblem(params)
      default:
        return this.createComparisonProblem(params)
    }
  }

  createComparisonProblem(params) {
    const num1 = this.generateNumber(params)
    const num2 = this.generateNumber(params)
    
    // Determine the correct comparison symbol
    let symbol, answer
    if (num1 > num2) {
      symbol = '>'
      answer = '>'
    } else if (num1 < num2) {
      symbol = '<'
      answer = '<'
    } else {
      symbol = '='
      answer = '='
    }

    const questionText = `Compare: ${num1} ___ ${num2}`
    const questionLaTeX = `\\text{Compare: } ${num1} \\quad \\square \\quad ${num2}`

    const steps = [
      `Compare ${num1} and ${num2}`,
      `${num1} ${symbol} ${num2}`
    ]

    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: answer,
      answerLaTeX: answer,
      steps: steps,
      metadata: {
        operation: 'number-comparison',
        numbers: [num1, num2],
        comparisonSymbol: symbol,
        difficulty: this.difficulty,
        estimatedTime: '30 seconds'
      }
    }
  }

  createOrderingProblem(params, direction) {
    const numbers = []
    for (let i = 0; i < params.orderingCount; i++) {
      numbers.push(this.generateNumber(params))
    }
    
    // Sort the numbers
    const sortedNumbers = [...numbers].sort((a, b) => direction === 'ascending' ? a - b : b - a)
    const answer = sortedNumbers.join(', ')

    const directionText = direction === 'ascending' ? 'least to greatest' : 'greatest to least'
    const questionText = `Order from ${directionText}: ${numbers.join(', ')}`
    const questionLaTeX = `\\text{Order from ${directionText}: } ${numbers.join(', ')}`

    const steps = [
      `Numbers to order: ${numbers.join(', ')}`,
      `Ordered from ${directionText}: ${answer}`
    ]

    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: answer,
      answerLaTeX: answer,
      steps: steps,
      metadata: {
        operation: 'number-ordering',
        originalNumbers: numbers,
        sortedNumbers: sortedNumbers,
        direction: direction,
        difficulty: this.difficulty,
        estimatedTime: '60 seconds'
      }
    }
  }

  createGreatestLeastProblem(params) {
    const numbers = []
    for (let i = 0; i < params.orderingCount; i++) {
      numbers.push(this.generateNumber(params))
    }
    
    const greatest = Math.max(...numbers)
    const least = Math.min(...numbers)
    
    const questionType = Math.random() < 0.5 ? 'greatest' : 'least'
    const answer = questionType === 'greatest' ? greatest : least

    const questionText = `Which is the ${questionType}: ${numbers.join(', ')}?`
    const questionLaTeX = `\\text{Which is the ${questionType}: } ${numbers.join(', ')}\\text{?}`

    const steps = [
      `Numbers: ${numbers.join(', ')}`,
      `The ${questionType} number is ${answer}`
    ]

    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: answer,
      answerLaTeX: answer.toString(),
      steps: steps,
      metadata: {
        operation: 'greatest-least',
        numbers: numbers,
        questionType: questionType,
        answer: answer,
        difficulty: this.difficulty,
        estimatedTime: '45 seconds'
      }
    }
  }

  generateNumber(params) {
    let min = params.minNumber
    let max = params.maxNumber
    
    // Adjust range for negatives
    if (!params.includeNegatives && min < 0) {
      min = 0
    }
    
    if (params.includeDecimals && Math.random() < 0.3) {
      // Generate decimal number
      const integerPart = this.getRandomNumber(min, max)
      let decimalPart = ''
      for (let i = 0; i < params.maxDecimalPlaces; i++) {
        decimalPart += this.getRandomNumber(0, 9).toString()
      }
      const number = parseFloat(`${integerPart}.${decimalPart}`)
      
      // Handle negative decimals
      if (params.includeNegatives && Math.random() < 0.3 && number > 0) {
        return -number
      }
      return number
    } else {
      // Generate whole number
      const number = this.getRandomNumber(min, max)
      
      // Handle negative numbers
      if (params.includeNegatives && Math.random() < 0.3 && number > 0) {
        return -number
      }
      return number
    }
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)]
  }
}

export default NumberComparisonGenerator