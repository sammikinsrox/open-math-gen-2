import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Number Comparison Generator
 * Generates problems comparing numbers using <, >, =, ordering, and greatest/least
 */
export class NumberComparisonGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
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
        orderingCount: 4,
        complexityLevel: 'basic'
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
                description: 'How many comparison problems to generate',
                min: 1,
                max: 50,
                required: true,
                slider: true,
                presets: [5, 10, 15, 20],
                order: 1
              }),
              complexityLevel: schemaV2.createParameter({
                type: 'select',
                label: 'Complexity Level',
                description: 'Controls the difficulty and number types',
                variant: 'cards',
                options: [
                  { 
                    value: 'basic', 
                    label: 'Basic',
                    description: 'Simple whole number comparisons (1-100)'
                  },
                  { 
                    value: 'intermediate', 
                    label: 'Intermediate',
                    description: 'Larger numbers and simple ordering (1-1000)'
                  },
                  { 
                    value: 'advanced', 
                    label: 'Advanced',
                    description: 'Decimals, negatives, and complex ordering'
                  }
                ],
                order: 2
              })
            }
          }),
          
          numberRanges: schemaV2.createCategory({
            id: 'numberRanges',
            label: 'Number Configuration',
            description: 'Control the types and ranges of numbers used',
            icon: 'tag',
            color: 'green',
            order: 2,
            parameters: {
              minNumber: schemaV2.createParameter({
                type: 'number',
                label: 'Minimum Number',
                description: 'Smallest number to use in comparisons',
                min: -1000,
                max: 1000,
                required: true,
                presets: [1, 10, 50, 100],
                helpText: 'Can be negative if negative numbers are enabled',
                order: 1
              }),
              maxNumber: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Number',
                description: 'Largest number to use in comparisons',
                min: 1,
                max: 10000,
                required: true,
                presets: [100, 1000, 5000, 10000],
                helpText: 'Larger ranges create more diverse comparisons',
                order: 2
              }),
              includeDecimals: schemaV2.createParameter({
                type: 'boolean',
                label: 'Include Decimal Numbers',
                description: 'Include decimal numbers in comparison problems',
                helpText: 'Adds complexity by requiring decimal place understanding',
                order: 3
              }),
              maxDecimalPlaces: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Decimal Places',
                description: 'Maximum number of decimal places in numbers',
                min: 1,
                max: 3,
                required: true,
                presets: [1, 2, 3],
                helpText: 'More decimal places increase comparison difficulty',
                order: 4
              }),
              includeNegatives: schemaV2.createParameter({
                type: 'boolean',
                label: 'Include Negative Numbers',
                description: 'Include negative numbers in comparison problems',
                helpText: 'Introduces integer concepts and number line understanding',
                order: 5
              })
            }
          }),
          
          problemTypes: schemaV2.createCategory({
            id: 'problemTypes',
            label: 'Problem Types',
            description: 'Choose what types of comparison problems to generate',
            icon: 'compare_arrows',
            color: 'purple',
            order: 3,
            parameters: {
              problemType: schemaV2.createParameter({
                type: 'select',
                label: 'Problem Type Focus',
                description: 'Type of comparison problems to generate',
                variant: 'cards',
                options: [
                  {
                    value: 'compare-two',
                    label: 'Compare Two Numbers',
                    description: 'Use <, >, = to compare pairs of numbers (45 ___ 52)'
                  },
                  {
                    value: 'order-ascending',
                    label: 'Order Least to Greatest',
                    description: 'Order multiple numbers from smallest to largest'
                  },
                  {
                    value: 'order-descending',
                    label: 'Order Greatest to Least',
                    description: 'Order multiple numbers from largest to smallest'
                  },
                  {
                    value: 'greatest-least',
                    label: 'Find Greatest/Least',
                    description: 'Identify the greatest or least number in a group'
                  },
                  {
                    value: 'mixed',
                    label: 'Mixed Practice',
                    description: 'Random combination of all comparison types'
                  }
                ],
                order: 1
              }),
              orderingCount: schemaV2.createParameter({
                type: 'number',
                label: 'Numbers to Order',
                description: 'How many numbers to use in ordering and greatest/least problems',
                min: 3,
                max: 6,
                required: true,
                slider: true,
                presets: [3, 4, 5, 6],
                helpText: 'More numbers increase the difficulty of ordering problems',
                order: 2
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'basic-comparison',
            label: 'Basic Comparison',
            description: 'Simple two-number comparisons for early elementary',
            icon: 'compare_arrows',
            category: 'difficulty',
            values: {
              problemCount: 12,
              complexityLevel: 'basic',
              minNumber: 1,
              maxNumber: 100,
              problemType: 'compare-two',
              includeDecimals: false,
              maxDecimalPlaces: 1,
              includeNegatives: false,
              orderingCount: 3
            }
          }),
          
          schemaV2.createPreset({
            id: 'ordering-practice',
            label: 'Number Ordering',
            description: 'Focus on ordering multiple numbers from least to greatest',
            icon: 'sort',
            category: 'scope',
            values: {
              problemCount: 10,
              complexityLevel: 'intermediate',
              minNumber: 10,
              maxNumber: 1000,
              problemType: 'order-ascending',
              includeDecimals: false,
              maxDecimalPlaces: 2,
              includeNegatives: false,
              orderingCount: 5
            }
          }),
          
          schemaV2.createPreset({
            id: 'decimal-comparison',
            label: 'Decimal Comparisons',
            description: 'Advanced practice with decimal number comparisons',
            icon: 'more_horiz',
            category: 'difficulty',
            values: {
              problemCount: 8,
              complexityLevel: 'advanced',
              minNumber: 1,
              maxNumber: 100,
              problemType: 'compare-two',
              includeDecimals: true,
              maxDecimalPlaces: 2,
              includeNegatives: false,
              orderingCount: 4
            }
          }),
          
          schemaV2.createPreset({
            id: 'integer-comparison',
            label: 'Integer Comparison',
            description: 'Practice with positive and negative number comparisons',
            icon: 'add_circle_outline',
            category: 'difficulty',
            values: {
              problemCount: 10,
              complexityLevel: 'advanced',
              minNumber: -100,
              maxNumber: 100,
              problemType: 'mixed',
              includeDecimals: false,
              maxDecimalPlaces: 1,
              includeNegatives: true,
              orderingCount: 4
            }
          })
        ]
      })
    })
  }

  generateProblem(parameters = {}) {
    const params = { ...this.defaultParameters, ...parameters }
    
    // Apply complexity level overrides for better defaults
    const adjustedParams = this.applyComplexityLevelAdjustments(params)
    
    // Validate parameters
    const validation = this.validateParameters(adjustedParams)
    if (!validation.isValid) {
      throw new Error(`Invalid parameters: ${validation.errors.join(', ')}`)
    }
    
    // Choose problem type
    const problemType = adjustedParams.problemType === 'mixed' ? 
      this.getRandomElement(['compare-two', 'order-ascending', 'order-descending', 'greatest-least']) :
      adjustedParams.problemType
    
    return this.createProblemByType(problemType, adjustedParams)
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
        complexityLevel: params.complexityLevel,
        hasDecimals: [num1, num2].some(n => n.toString().includes('.')),
        hasNegatives: [num1, num2].some(n => n < 0),
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
        complexityLevel: params.complexityLevel,
        numberCount: numbers.length,
        hasDecimals: numbers.some(n => n.toString().includes('.')),
        hasNegatives: numbers.some(n => n < 0),
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
        complexityLevel: params.complexityLevel,
        numberCount: numbers.length,
        hasDecimals: numbers.some(n => n.toString().includes('.')),
        hasNegatives: numbers.some(n => n < 0),
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

  /**
   * Apply complexity level adjustments to parameters
   * @param {Object} params - Original parameters
   * @returns {Object} - Adjusted parameters
   */
  applyComplexityLevelAdjustments(params) {
    const adjusted = { ...params }
    
    // Apply complexity level overrides for better defaults
    if (params.complexityLevel === 'basic') {
      // Basic: simple comparisons, small positive numbers
      adjusted.minNumber = Math.max(1, Math.min(adjusted.minNumber, 100))
      adjusted.maxNumber = Math.min(adjusted.maxNumber, 100)
      adjusted.orderingCount = Math.min(adjusted.orderingCount, 4)
      adjusted.maxDecimalPlaces = Math.min(adjusted.maxDecimalPlaces, 1)
      // Prefer no decimals or negatives for basic level
      if (!adjusted.hasOwnProperty('includeDecimals')) {
        adjusted.includeDecimals = false
      }
      if (!adjusted.hasOwnProperty('includeNegatives')) {
        adjusted.includeNegatives = false
      }
    } else if (params.complexityLevel === 'intermediate') {
      // Intermediate: larger numbers, more ordering
      adjusted.minNumber = Math.max(1, Math.min(adjusted.minNumber, 1000))
      adjusted.maxNumber = Math.min(adjusted.maxNumber, 1000)
      adjusted.orderingCount = Math.min(adjusted.orderingCount, 5)
      adjusted.maxDecimalPlaces = Math.min(adjusted.maxDecimalPlaces, 2)
    } else if (params.complexityLevel === 'advanced') {
      // Advanced: all features enabled
      adjusted.maxNumber = Math.max(adjusted.maxNumber, 1000)
      adjusted.orderingCount = Math.max(adjusted.orderingCount, 4)
      adjusted.maxDecimalPlaces = Math.max(adjusted.maxDecimalPlaces, 2)
      // Enable advanced features for advanced level
      if (!adjusted.hasOwnProperty('includeDecimals')) {
        adjusted.includeDecimals = true
      }
      if (!adjusted.hasOwnProperty('includeNegatives')) {
        adjusted.includeNegatives = true
      }
    }
    
    return adjusted
  }
}

export default NumberComparisonGenerator