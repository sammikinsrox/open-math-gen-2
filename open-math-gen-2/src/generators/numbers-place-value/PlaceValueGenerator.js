import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Place Value Generator
 * Generates problems about identifying place values, expanded form, and standard form
 */
export class PlaceValueGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Place Value',
      description: 'Generate place value problems with digit identification and number forms',
      category: 'numbers-place-value',
      difficulty: 'easy',
      icon: 'pin',
      tags: ['place-value', 'digits', 'expanded-form'],
      gradeLevel: '2-5',
      estimatedTime: '45 seconds',
      exampleProblem: {
        question: 'What digit is in the tens place in 345?',
        questionLaTeX: '\\text{What digit is in the tens place in } 345\\text{?}',
        answer: '4',
        answerLaTeX: '4'
      },
      
      defaultParameters: {
        problemCount: 10,
        minDigits: 2,
        maxDigits: 5,
        problemType: 'identify-place',
        includeDecimals: false,
        maxDecimalPlaces: 2,
        questionStyle: 'standard',
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
                description: 'How many place value problems to generate',
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
                description: 'Controls the difficulty and number ranges',
                variant: 'cards',
                options: [
                  { 
                    value: 'basic', 
                    label: 'Basic',
                    description: '2-3 digit numbers, whole numbers only'
                  },
                  { 
                    value: 'intermediate', 
                    label: 'Intermediate',
                    description: '3-5 digit numbers, optional decimals'
                  },
                  { 
                    value: 'advanced', 
                    label: 'Advanced',
                    description: 'Large numbers with decimals up to millions'
                  }
                ],
                order: 2
              })
            }
          }),
          
          numberRanges: schemaV2.createCategory({
            id: 'numberRanges',
            label: 'Number Configuration',
            description: 'Control the size and type of numbers used',
            icon: 'tag',
            color: 'green',
            order: 2,
            parameters: {
              minDigits: schemaV2.createParameter({
                type: 'number',
                label: 'Minimum Digits',
                description: 'Minimum number of digits in whole number part',
                min: 1,
                max: 8,
                required: true,
                presets: [1, 2, 3, 4],
                helpText: 'Controls the smallest numbers used (1 digit = 1-9, 2 digits = 10-99, etc.)',
                order: 1
              }),
              maxDigits: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Digits',
                description: 'Maximum number of digits in whole number part',
                min: 1,
                max: 10,
                required: true,
                presets: [3, 5, 6, 8, 10],
                helpText: 'Controls the largest numbers used (5 digits = up to 99,999)',
                order: 2
              }),
              includeDecimals: schemaV2.createParameter({
                type: 'boolean',
                label: 'Include Decimal Numbers',
                description: 'Include decimal numbers in place value problems',
                helpText: 'Adds tenths, hundredths, thousandths places',
                order: 3
              }),
              maxDecimalPlaces: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Decimal Places',
                description: 'Maximum number of decimal places when decimals are included',
                min: 1,
                max: 4,
                required: true,
                presets: [1, 2, 3, 4],
                helpText: '2 places = hundredths, 3 places = thousandths, etc.',
                order: 4
              })
            }
          }),
          
          problemTypes: schemaV2.createCategory({
            id: 'problemTypes',
            label: 'Problem Types',
            description: 'Choose what types of place value problems to generate',
            icon: 'quiz',
            color: 'purple',
            order: 3,
            parameters: {
              problemType: schemaV2.createParameter({
                type: 'select',
                label: 'Problem Type Focus',
                description: 'Type of place value problems to generate',
                variant: 'cards',
                options: [
                  {
                    value: 'identify-place',
                    label: 'Identify Digit',
                    description: 'What digit is in the tens place in 345?'
                  },
                  {
                    value: 'write-expanded',
                    label: 'Write Expanded Form',
                    description: 'Write 345 in expanded form (300 + 40 + 5)'
                  },
                  {
                    value: 'write-standard',
                    label: 'Write Standard Form',
                    description: 'Convert expanded form back to standard number'
                  },
                  {
                    value: 'mixed',
                    label: 'Mixed Practice',
                    description: 'Random combination of all problem types'
                  }
                ],
                order: 1
              }),
              questionStyle: schemaV2.createParameter({
                type: 'select',
                label: 'Question Style',
                description: 'How to present the questions and numbers',
                options: [
                  { value: 'standard', label: 'Standard Notation', description: 'Use regular number format (345)' },
                  { value: 'word-form', label: 'Word Form', description: 'Use written numbers (three hundred forty-five)' },
                  { value: 'mixed', label: 'Mixed Styles', description: 'Randomly use both formats' }
                ],
                order: 2
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'elementary-basics',
            label: 'Elementary Basics',
            description: 'Simple 2-3 digit place value for grades 2-3',
            icon: 'school',
            category: 'difficulty',
            values: {
              problemCount: 10,
              complexityLevel: 'basic',
              minDigits: 2,
              maxDigits: 3,
              problemType: 'identify-place',
              includeDecimals: false,
              maxDecimalPlaces: 1,
              questionStyle: 'standard'
            }
          }),
          
          schemaV2.createPreset({
            id: 'expanded-form-practice',
            label: 'Expanded Form Practice',
            description: 'Focus on writing numbers in expanded form',
            icon: 'expand_more',
            category: 'scope',
            values: {
              problemCount: 12,
              complexityLevel: 'intermediate',
              minDigits: 3,
              maxDigits: 5,
              problemType: 'write-expanded',
              includeDecimals: false,
              maxDecimalPlaces: 2,
              questionStyle: 'standard'
            }
          }),
          
          schemaV2.createPreset({
            id: 'decimal-place-value',
            label: 'Decimal Place Value',
            description: 'Practice with decimal numbers and places',
            icon: 'more_horiz',
            category: 'difficulty',
            values: {
              problemCount: 8,
              complexityLevel: 'intermediate',
              minDigits: 2,
              maxDigits: 4,
              problemType: 'identify-place',
              includeDecimals: true,
              maxDecimalPlaces: 3,
              questionStyle: 'standard'
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive-practice',
            label: 'Comprehensive Practice',
            description: 'Mixed problems with large numbers and decimals',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 15,
              complexityLevel: 'advanced',
              minDigits: 4,
              maxDigits: 7,
              problemType: 'mixed',
              includeDecimals: true,
              maxDecimalPlaces: 3,
              questionStyle: 'mixed'
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
    
    // Generate a random number within the digit range
    const number = this.generateNumber(adjustedParams)
    
    // Choose problem type
    const problemType = adjustedParams.problemType === 'mixed' ? 
      this.getRandomElement(['identify-place', 'write-expanded', 'write-standard']) :
      adjustedParams.problemType
    
    return this.createProblemByType(number, problemType, adjustedParams)
  }

  generateNumber(params) {
    const digitCount = this.getRandomNumber(params.minDigits, params.maxDigits)
    
    if (params.includeDecimals && Math.random() < 0.4) {
      // Generate decimal number
      const integerPart = this.generateIntegerWithDigits(digitCount)
      const decimalPlaces = this.getRandomNumber(1, params.maxDecimalPlaces)
      const decimalPart = this.generateIntegerWithDigits(decimalPlaces)
      return parseFloat(`${integerPart}.${decimalPart}`)
    } else {
      // Generate whole number
      return this.generateIntegerWithDigits(digitCount)
    }
  }

  generateIntegerWithDigits(digitCount) {
    if (digitCount === 1) {
      return this.getRandomNumber(1, 9)
    }
    
    // Ensure first digit is not 0
    const firstDigit = this.getRandomNumber(1, 9)
    let number = firstDigit.toString()
    
    // Add remaining digits
    for (let i = 1; i < digitCount; i++) {
      number += this.getRandomNumber(0, 9).toString()
    }
    
    return parseInt(number)
  }

  createProblemByType(number, problemType, params) {
    switch (problemType) {
      case 'identify-place':
        return this.createIdentifyPlaceProblem(number, params)
      case 'write-expanded':
        return this.createExpandedFormProblem(number, params)
      case 'write-standard':
        return this.createStandardFormProblem(number, params)
      default:
        return this.createIdentifyPlaceProblem(number, params)
    }
  }

  createIdentifyPlaceProblem(number, params) {
    const numberStr = number.toString()
    const isDecimal = numberStr.includes('.')
    
    let digitIndex, place, digit
    
    if (isDecimal) {
      // Handle decimal numbers
      const [integerPart, decimalPart] = numberStr.split('.')
      const allDigits = integerPart + decimalPart
      digitIndex = this.getRandomNumber(0, allDigits.length - 1)
      
      if (digitIndex < integerPart.length) {
        // Integer part
        const position = integerPart.length - 1 - digitIndex
        place = this.getPlaceName(position, false)
        digit = integerPart[digitIndex]
      } else {
        // Decimal part
        const decimalPosition = digitIndex - integerPart.length
        place = this.getPlaceName(decimalPosition, true)
        digit = decimalPart[decimalPosition]
      }
    } else {
      // Handle whole numbers
      digitIndex = this.getRandomNumber(0, numberStr.length - 1)
      const position = numberStr.length - 1 - digitIndex
      place = this.getPlaceName(position, false)
      digit = numberStr[digitIndex]
    }

    const questionText = `What digit is in the ${place} place in ${number}?`
    const questionLaTeX = `\\text{What digit is in the ${place} place in } ${number}\\text{?}`

    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: digit,
      answerLaTeX: digit,
      steps: [
        `Number: ${number}`,
        `The digit in the ${place} place is ${digit}`
      ],
      metadata: {
        operation: 'place-value-identify',
        number: number,
        place: place,
        digit: digit,
        complexityLevel: params.complexityLevel,
        hasDecimals: number.toString().includes('.'),
        digitCount: number.toString().replace('.', '').length,
        difficulty: this.difficulty,
        estimatedTime: '45 seconds'
      }
    }
  }

  createExpandedFormProblem(number, params) {
    const expanded = this.numberToExpandedForm(number)
    
    const questionText = `Write ${number} in expanded form.`
    const questionLaTeX = `\\text{Write } ${number} \\text{ in expanded form.}`

    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: expanded,
      answerLaTeX: expanded,
      steps: [
        `Number: ${number}`,
        `Expanded form: ${expanded}`
      ],
      metadata: {
        operation: 'place-value-expanded',
        number: number,
        expanded: expanded,
        complexityLevel: params.complexityLevel,
        hasDecimals: number.toString().includes('.'),
        digitCount: number.toString().replace('.', '').length,
        difficulty: this.difficulty,
        estimatedTime: '60 seconds'
      }
    }
  }

  createStandardFormProblem(number, params) {
    const expanded = this.numberToExpandedForm(number)
    
    const questionText = `Write ${expanded} in standard form.`
    const questionLaTeX = `\\text{Write } ${expanded} \\text{ in standard form.}`

    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: number.toString(),
      answerLaTeX: number.toString(),
      steps: [
        `Expanded form: ${expanded}`,
        `Standard form: ${number}`
      ],
      metadata: {
        operation: 'place-value-standard',
        number: number,
        expanded: expanded,
        complexityLevel: params.complexityLevel,
        hasDecimals: number.toString().includes('.'),
        digitCount: number.toString().replace('.', '').length,
        difficulty: this.difficulty,
        estimatedTime: '60 seconds'
      }
    }
  }

  numberToExpandedForm(number) {
    const numberStr = number.toString()
    const isDecimal = numberStr.includes('.')
    
    if (isDecimal) {
      const [integerPart, decimalPart] = numberStr.split('.')
      const integerExpanded = this.integerToExpandedForm(parseInt(integerPart))
      const decimalExpanded = this.decimalToExpandedForm(decimalPart)
      
      if (integerExpanded && decimalExpanded) {
        return `${integerExpanded} + ${decimalExpanded}`
      } else if (integerExpanded) {
        return integerExpanded
      } else {
        return decimalExpanded
      }
    } else {
      return this.integerToExpandedForm(number)
    }
  }

  integerToExpandedForm(number) {
    const numberStr = number.toString()
    const parts = []
    
    for (let i = 0; i < numberStr.length; i++) {
      const digit = parseInt(numberStr[i])
      if (digit !== 0) {
        const placeValue = Math.pow(10, numberStr.length - 1 - i)
        parts.push(`${digit * placeValue}`)
      }
    }
    
    return parts.join(' + ')
  }

  decimalToExpandedForm(decimalPart) {
    const parts = []
    
    for (let i = 0; i < decimalPart.length; i++) {
      const digit = parseInt(decimalPart[i])
      if (digit !== 0) {
        const placeValue = Math.pow(10, -(i + 1))
        parts.push(`${digit * placeValue}`)
      }
    }
    
    return parts.join(' + ')
  }

  getPlaceName(position, isDecimal = false) {
    if (isDecimal) {
      const decimalPlaces = ['tenths', 'hundredths', 'thousandths', 'ten-thousandths']
      return decimalPlaces[position] || `10^{-${position + 1}} place`
    } else {
      const places = ['ones', 'tens', 'hundreds', 'thousands', 'ten-thousands', 'hundred-thousands', 'millions', 'ten-millions', 'hundred-millions', 'billions']
      return places[position] || `10^${position} place`
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
      // Basic: simple 2-3 digit numbers, no decimals
      adjusted.minDigits = Math.max(1, Math.min(adjusted.minDigits, 3))
      adjusted.maxDigits = Math.min(adjusted.maxDigits, 3)
      adjusted.maxDecimalPlaces = Math.min(adjusted.maxDecimalPlaces, 1)
      // Prefer no decimals for basic level
      if (!adjusted.hasOwnProperty('includeDecimals')) {
        adjusted.includeDecimals = false
      }
    } else if (params.complexityLevel === 'intermediate') {
      // Intermediate: 3-5 digit numbers, optional decimals
      adjusted.minDigits = Math.max(2, Math.min(adjusted.minDigits, 5))
      adjusted.maxDigits = Math.min(adjusted.maxDigits, 5)
      adjusted.maxDecimalPlaces = Math.min(adjusted.maxDecimalPlaces, 3)
    } else if (params.complexityLevel === 'advanced') {
      // Advanced: large numbers with decimals
      adjusted.maxDigits = Math.max(adjusted.maxDigits, 5)
      adjusted.maxDecimalPlaces = Math.max(adjusted.maxDecimalPlaces, 2)
      // Enable decimals for advanced level
      if (!adjusted.hasOwnProperty('includeDecimals')) {
        adjusted.includeDecimals = true
      }
    }
    
    return adjusted
  }
}

export default PlaceValueGenerator