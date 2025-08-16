import { BaseGenerator } from '../BaseGenerator.js'

/**
 * Decimal Operations Generator
 * Generates problems involving addition, subtraction, multiplication, and division of decimal numbers
 */
export class DecimalOperationsGenerator extends BaseGenerator {
  constructor() {
    super({
      name: 'Decimal Operations',
      description: 'Generate problems involving addition, subtraction, multiplication, and division of decimal numbers',
      category: 'fractions-decimals',
      difficulty: 'medium',
      icon: 'filter_9_plus',
      tags: ['decimals', 'arithmetic', 'decimal-operations', 'place-value'],
      gradeLevel: '4-8',
      estimatedTime: '75 seconds',
      exampleProblem: {
        question: '2.45 + 1.3 = ?',
        questionLaTeX: '2.45 + 1.3 = \\square',
        answer: '3.75',
        answerLaTeX: '3.75'
      },
      
      defaultParameters: {
        problemCount: 10,
        includeAddition: true,
        includeSubtraction: true,
        includeMultiplication: false,
        includeDivision: false,
        decimalPlaces: 2,
        maxWholeNumber: 50,
        includeWholeNumbers: true,
        alignDecimalPoints: true,
        allowNegativeResults: false
      },
      
      parameterSchema: {
        problemCount: {
          type: 'number',
          label: 'Number of Problems',
          description: 'How many decimal operation problems to generate',
          min: 1,
          max: 100,
          required: true
        },
        includeAddition: {
          type: 'boolean',
          label: 'Include Addition',
          description: 'Include decimal addition problems'
        },
        includeSubtraction: {
          type: 'boolean',
          label: 'Include Subtraction',
          description: 'Include decimal subtraction problems'
        },
        includeMultiplication: {
          type: 'boolean',
          label: 'Include Multiplication',
          description: 'Include decimal multiplication problems'
        },
        includeDivision: {
          type: 'boolean',
          label: 'Include Division',
          description: 'Include decimal division problems'
        },
        decimalPlaces: {
          type: 'number',
          label: 'Decimal Places',
          description: 'Maximum number of decimal places',
          min: 1,
          max: 4,
          required: true
        },
        maxWholeNumber: {
          type: 'number',
          label: 'Maximum Whole Number',
          description: 'Largest whole number part to use',
          min: 1,
          max: 1000,
          required: true
        },
        includeWholeNumbers: {
          type: 'boolean',
          label: 'Include Whole Numbers',
          description: 'Include problems with whole numbers (no decimal part)'
        },
        alignDecimalPoints: {
          type: 'boolean',
          label: 'Align Decimal Points',
          description: 'Show problems with aligned decimal points for easier solving'
        },
        allowNegativeResults: {
          type: 'boolean',
          label: 'Allow Negative Results',
          description: 'Allow problems with negative answers'
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
    
    // Build array of enabled operations
    const enabledOperations = []
    if (params.includeAddition) enabledOperations.push('addition')
    if (params.includeSubtraction) enabledOperations.push('subtraction')
    if (params.includeMultiplication) enabledOperations.push('multiplication')
    if (params.includeDivision) enabledOperations.push('division')
    
    if (enabledOperations.length === 0) {
      throw new Error('At least one operation must be enabled')
    }
    
    const operation = this.getRandomElement(enabledOperations)
    
    switch (operation) {
      case 'addition':
        return this.generateAdditionProblem(params)
      case 'subtraction':
        return this.generateSubtractionProblem(params)
      case 'multiplication':
        return this.generateMultiplicationProblem(params)
      case 'division':
        return this.generateDivisionProblem(params)
      default:
        return this.generateAdditionProblem(params)
    }
  }

  generateAdditionProblem(params) {
    const decimal1 = this.generateRandomDecimal(params)
    const decimal2 = this.generateRandomDecimal(params)
    
    const result = decimal1 + decimal2
    const roundedResult = Math.round(result * Math.pow(10, params.decimalPlaces)) / Math.pow(10, params.decimalPlaces)
    
    const questionText = `${decimal1} + ${decimal2} = ?`
    const questionLaTeX = `${decimal1} + ${decimal2} = \\square`
    
    const steps = params.alignDecimalPoints ? 
      this.getAlignedAdditionSteps(decimal1, decimal2, roundedResult) :
      [
        `${decimal1} + ${decimal2}`,
        `= ${roundedResult}`
      ]
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: roundedResult.toString(),
      answerLaTeX: roundedResult.toString(),
      steps: steps,
      metadata: {
        operation: 'decimal-addition',
        operands: [decimal1, decimal2],
        result: roundedResult,
        difficulty: this.difficulty,
        estimatedTime: '60 seconds'
      }
    }
  }

  generateSubtractionProblem(params) {
    let decimal1 = this.generateRandomDecimal(params)
    let decimal2 = this.generateRandomDecimal(params)
    
    // Ensure positive result if negative results not allowed
    if (!params.allowNegativeResults && decimal1 < decimal2) {
      [decimal1, decimal2] = [decimal2, decimal1]
    }
    
    const result = decimal1 - decimal2
    const roundedResult = Math.round(result * Math.pow(10, params.decimalPlaces)) / Math.pow(10, params.decimalPlaces)
    
    const questionText = `${decimal1} - ${decimal2} = ?`
    const questionLaTeX = `${decimal1} - ${decimal2} = \\square`
    
    const steps = params.alignDecimalPoints ? 
      this.getAlignedSubtractionSteps(decimal1, decimal2, roundedResult) :
      [
        `${decimal1} - ${decimal2}`,
        `= ${roundedResult}`
      ]
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: roundedResult.toString(),
      answerLaTeX: roundedResult.toString(),
      steps: steps,
      metadata: {
        operation: 'decimal-subtraction',
        operands: [decimal1, decimal2],
        result: roundedResult,
        difficulty: this.difficulty,
        estimatedTime: '60 seconds'
      }
    }
  }

  generateMultiplicationProblem(params) {
    // Use smaller numbers for multiplication to keep results manageable
    const maxNum = Math.min(params.maxWholeNumber, 20)
    const decimal1 = this.generateRandomDecimal({...params, maxWholeNumber: maxNum})
    const decimal2 = this.generateRandomDecimal({...params, maxWholeNumber: maxNum})
    
    const result = decimal1 * decimal2
    const roundedResult = Math.round(result * Math.pow(10, params.decimalPlaces)) / Math.pow(10, params.decimalPlaces)
    
    const questionText = `${decimal1} × ${decimal2} = ?`
    const questionLaTeX = `${decimal1} \\times ${decimal2} = \\square`
    
    const steps = [
      `${decimal1} \\times ${decimal2}`,
      `= ${roundedResult}`
    ]
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: roundedResult.toString(),
      answerLaTeX: roundedResult.toString(),
      steps: steps,
      metadata: {
        operation: 'decimal-multiplication',
        operands: [decimal1, decimal2],
        result: roundedResult,
        difficulty: this.difficulty,
        estimatedTime: '90 seconds'
      }
    }
  }

  generateDivisionProblem(params) {
    // Generate dividend and divisor, ensuring clean division when possible
    const divisor = this.generateRandomDecimal({...params, maxWholeNumber: Math.min(params.maxWholeNumber, 10)})
    
    // Generate a quotient first, then calculate dividend to avoid remainders
    const quotient = this.generateRandomDecimal({...params, maxWholeNumber: Math.min(params.maxWholeNumber, 20)})
    const dividend = Math.round((quotient * divisor) * Math.pow(10, params.decimalPlaces)) / Math.pow(10, params.decimalPlaces)
    
    const result = dividend / divisor
    const roundedResult = Math.round(result * Math.pow(10, params.decimalPlaces)) / Math.pow(10, params.decimalPlaces)
    
    const questionText = `${dividend} ÷ ${divisor} = ?`
    const questionLaTeX = `${dividend} \\div ${divisor} = \\square`
    
    const steps = [
      `${dividend} \\div ${divisor}`,
      `= ${roundedResult}`
    ]
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: roundedResult.toString(),
      answerLaTeX: roundedResult.toString(),
      steps: steps,
      metadata: {
        operation: 'decimal-division',
        operands: [dividend, divisor],
        result: roundedResult,
        difficulty: this.difficulty,
        estimatedTime: '100 seconds'
      }
    }
  }

  getAlignedAdditionSteps(decimal1, decimal2, result) {
    // Format numbers to have the same decimal places for alignment
    const maxPlaces = Math.max(this.getDecimalPlaces(decimal1), this.getDecimalPlaces(decimal2))
    const formatted1 = decimal1.toFixed(maxPlaces)
    const formatted2 = decimal2.toFixed(maxPlaces)
    const formattedResult = result.toFixed(maxPlaces)
    
    return [
      `\\begin{array}{r} ${formatted1} \\\\ + ${formatted2} \\\\ \\hline \\end{array}`,
      `= ${formattedResult}`
    ]
  }

  getAlignedSubtractionSteps(decimal1, decimal2, result) {
    const maxPlaces = Math.max(this.getDecimalPlaces(decimal1), this.getDecimalPlaces(decimal2))
    const formatted1 = decimal1.toFixed(maxPlaces)
    const formatted2 = decimal2.toFixed(maxPlaces)
    const formattedResult = result.toFixed(maxPlaces)
    
    return [
      `\\begin{array}{r} ${formatted1} \\\\ - ${formatted2} \\\\ \\hline \\end{array}`,
      `= ${formattedResult}`
    ]
  }

  generateRandomDecimal(params) {
    // Generate whole number part
    const wholeNumber = params.includeWholeNumbers && Math.random() < 0.3 ? 
      this.getRandomNumber(0, params.maxWholeNumber) : 
      this.getRandomNumber(1, params.maxWholeNumber)
    
    // Generate decimal part
    if (wholeNumber === 0 || Math.random() < 0.8) {
      const decimalPlaces = this.getRandomNumber(1, params.decimalPlaces)
      const decimalPart = this.getRandomNumber(1, Math.pow(10, decimalPlaces) - 1)
      const decimal = decimalPart / Math.pow(10, decimalPlaces)
      return Math.round((wholeNumber + decimal) * Math.pow(10, params.decimalPlaces)) / Math.pow(10, params.decimalPlaces)
    }
    
    return wholeNumber
  }

  getDecimalPlaces(num) {
    const str = num.toString()
    const decimalIndex = str.indexOf('.')
    return decimalIndex === -1 ? 0 : str.length - decimalIndex - 1
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)]
  }
}

export default DecimalOperationsGenerator