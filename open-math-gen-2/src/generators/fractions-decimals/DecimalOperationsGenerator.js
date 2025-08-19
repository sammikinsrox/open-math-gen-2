import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Decimal Operations Generator
 * Generates problems involving addition, subtraction, multiplication, and division of decimal numbers
 */
export class DecimalOperationsGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
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
      
      // Enhanced Parameter Schema V2 with beautiful categorization
      parameterSchema: schemaV2.createSchema({
        categories: {
          general: schemaV2.createCategory({
            id: 'general',
            label: 'General Settings',
            description: 'Basic configuration options',
            icon: 'settings',
            color: 'blue',
            order: 1,
            parameters: {
              problemCount: schemaV2.createParameter({
                type: 'number',
                label: 'Number of Problems',
                description: 'How many decimal operation problems to generate',
                min: 1,
                max: 50,
                required: true,
                slider: true,
                presets: [5, 8, 10, 15],
                order: 1
              })
            }
          }),
          
          operations: schemaV2.createCategory({
            id: 'operations',
            label: 'Operations',
            description: 'Choose which decimal operations to include',
            icon: 'calculate',
            color: 'green',
            order: 2,
            parameters: {
              includeAddition: schemaV2.createParameter({
                type: 'boolean',
                label: 'Addition',
                description: 'Include decimal addition problems',
                helpText: 'Example: 2.45 + 1.3 = 3.75',
                order: 1
              }),
              includeSubtraction: schemaV2.createParameter({
                type: 'boolean',
                label: 'Subtraction',
                description: 'Include decimal subtraction problems',
                helpText: 'Example: 5.67 - 2.34 = 3.33',
                order: 2
              }),
              includeMultiplication: schemaV2.createParameter({
                type: 'boolean',
                label: 'Multiplication',
                description: 'Include decimal multiplication problems',
                helpText: 'Example: 1.5 × 2.4 = 3.6',
                order: 3
              }),
              includeDivision: schemaV2.createParameter({
                type: 'boolean',
                label: 'Division',
                description: 'Include decimal division problems',
                helpText: 'Example: 8.4 ÷ 2.1 = 4.0',
                order: 4
              })
            }
          }),
          
          decimalProperties: schemaV2.createCategory({
            id: 'decimalProperties',
            label: 'Decimal Properties',
            description: 'Control the complexity and formatting of decimal numbers',
            icon: 'filter_9_plus',
            color: 'purple',
            order: 3,
            parameters: {
              decimalPlaces: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Decimal Places',
                description: 'Maximum number of digits after the decimal point',
                min: 1,
                max: 4,
                required: true,
                slider: true,
                presets: [1, 2, 3, 4],
                helpText: 'Controls precision: 1 = tenths, 2 = hundredths, 3 = thousandths',
                order: 1
              }),
              includeWholeNumbers: schemaV2.createParameter({
                type: 'boolean',
                label: 'Include Whole Numbers',
                description: 'Include problems with whole numbers (no decimal part)',
                helpText: 'Examples: 5, 12, 25 (numbers without decimal points)',
                order: 2
              }),
              allowNegativeResults: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Negative Results',
                description: 'Allow problems with negative answers',
                helpText: 'When disabled, ensures all answers are positive',
                order: 3
              })
            }
          }),
          
          numberRanges: schemaV2.createCategory({
            id: 'numberRanges',
            label: 'Number Ranges',
            description: 'Control the size of numbers used in problems',
            icon: 'tag',
            color: 'orange',
            order: 4,
            parameters: {
              maxWholeNumber: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Whole Number',
                description: 'Largest whole number part to use in decimals',
                min: 1,
                max: 500,
                required: true,
                slider: true,
                presets: [10, 25, 50, 100],
                helpText: 'Controls the whole number part (e.g., the "25" in 25.75)',
                order: 1
              })
            }
          }),
          
          displayOptions: schemaV2.createCategory({
            id: 'displayOptions',
            label: 'Display Options',
            description: 'Control how problems are presented',
            icon: 'visibility',
            color: 'pink',
            order: 5,
            parameters: {
              alignDecimalPoints: schemaV2.createParameter({
                type: 'boolean',
                label: 'Align Decimal Points',
                description: 'Show problems with aligned decimal points for easier solving',
                helpText: 'Creates vertical alignment in addition/subtraction steps',
                order: 1
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'basic-addition-subtraction',
            label: 'Basic Addition & Subtraction',
            description: 'Simple decimal addition and subtraction with 1-2 decimal places',
            icon: 'add_circle',
            category: 'difficulty',
            values: {
              problemCount: 10,
              includeAddition: true,
              includeSubtraction: true,
              includeMultiplication: false,
              includeDivision: false,
              decimalPlaces: 2,
              maxWholeNumber: 20,
              includeWholeNumbers: true,
              alignDecimalPoints: true,
              allowNegativeResults: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'tenths-practice',
            label: 'Tenths Practice',
            description: 'Focus on decimals with one decimal place (tenths)',
            icon: 'looks_one',
            category: 'scope',
            values: {
              problemCount: 12,
              includeAddition: true,
              includeSubtraction: true,
              includeMultiplication: false,
              includeDivision: false,
              decimalPlaces: 1,
              maxWholeNumber: 25,
              includeWholeNumbers: false,
              alignDecimalPoints: true,
              allowNegativeResults: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'hundredths-practice',
            label: 'Hundredths Practice',
            description: 'Focus on decimals with two decimal places (hundredths)',
            icon: 'looks_two',
            category: 'scope',
            values: {
              problemCount: 12,
              includeAddition: true,
              includeSubtraction: true,
              includeMultiplication: false,
              includeDivision: false,
              decimalPlaces: 2,
              maxWholeNumber: 50,
              includeWholeNumbers: false,
              alignDecimalPoints: true,
              allowNegativeResults: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'multiplication-division-focus',
            label: 'Multiplication & Division Focus',
            description: 'Practice multiplying and dividing decimals',
            icon: 'close',
            category: 'scope',
            values: {
              problemCount: 10,
              includeAddition: false,
              includeSubtraction: false,
              includeMultiplication: true,
              includeDivision: true,
              decimalPlaces: 2,
              maxWholeNumber: 15,
              includeWholeNumbers: true,
              alignDecimalPoints: false,
              allowNegativeResults: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive-practice',
            label: 'Comprehensive Practice',
            description: 'Mixed practice with all four decimal operations',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 16,
              includeAddition: true,
              includeSubtraction: true,
              includeMultiplication: true,
              includeDivision: true,
              decimalPlaces: 2,
              maxWholeNumber: 30,
              includeWholeNumbers: true,
              alignDecimalPoints: true,
              allowNegativeResults: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'advanced-challenge',
            label: 'Advanced Challenge',
            description: 'Complex problems with more decimal places and larger numbers',
            icon: 'functions',
            category: 'difficulty',
            values: {
              problemCount: 12,
              includeAddition: true,
              includeSubtraction: true,
              includeMultiplication: true,
              includeDivision: true,
              decimalPlaces: 3,
              maxWholeNumber: 100,
              includeWholeNumbers: true,
              alignDecimalPoints: false,
              allowNegativeResults: true
            }
          })
        ]
      })
    })
  }

  generateProblem(parameters = {}) {
    const params = { ...this.defaultParameters, ...parameters }
    
    // Validate parameters using Parameter Schema V2
    const validation = this.parameterSchema.validate(params)
    if (!validation.isValid) {
      throw new Error(`Invalid parameters: ${validation.errors.join(', ')}`)
    }
    
    // Additional custom validation
    const customErrors = []
    if (params.decimalPlaces > 3 && params.maxWholeNumber > 100) {
      customErrors.push('High precision decimals (>3 places) should use smaller whole numbers for manageable results')
    }
    if (customErrors.length > 0) {
      throw new Error(`Invalid parameters: ${customErrors.join(', ')}`)
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