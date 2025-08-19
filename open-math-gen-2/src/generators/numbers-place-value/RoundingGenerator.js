import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Rounding Generator
 * Generates problems about rounding numbers to various place values
 */
export class RoundingGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Rounding',
      description: 'Generate rounding problems to nearest tens, hundreds, thousands, etc.',
      category: 'numbers-place-value',
      difficulty: 'easy',
      icon: 'adjust',
      tags: ['rounding', 'estimation', 'place-value'],
      gradeLevel: '3-6',
      estimatedTime: '45 seconds',
      exampleProblem: {
        question: 'Round 347 to the nearest ten.',
        questionLaTeX: '\\text{Round } 347 \\text{ to the nearest ten.}',
        answer: '350',
        answerLaTeX: '350'
      },
      
      defaultParameters: {
        problemCount: 10,
        minNumber: 10,
        maxNumber: 9999,
        roundToPlace: 'tens',
        includeDecimals: false,
        maxDecimalPlaces: 2,
        mixedPlaces: false,
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
                description: 'How many rounding problems to generate',
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
                    description: 'Simple rounding to tens and hundreds'
                  },
                  { 
                    value: 'intermediate', 
                    label: 'Intermediate',
                    description: 'Rounding to thousands with larger numbers'
                  },
                  { 
                    value: 'advanced', 
                    label: 'Advanced',
                    description: 'Decimal rounding and mixed place values'
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
              minNumber: schemaV2.createParameter({
                type: 'number',
                label: 'Minimum Number',
                description: 'Smallest number to use in rounding problems',
                min: 1,
                max: 999999,
                required: true,
                presets: [10, 50, 100, 1000],
                helpText: 'Should be appropriate for the rounding place value chosen',
                order: 1
              }),
              maxNumber: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Number',
                description: 'Largest number to use in rounding problems',
                min: 1,
                max: 999999,
                required: true,
                presets: [999, 9999, 99999, 999999],
                helpText: 'Higher numbers work better with larger place values',
                order: 2
              }),
              includeDecimals: schemaV2.createParameter({
                type: 'boolean',
                label: 'Include Decimal Numbers',
                description: 'Include decimal numbers in rounding problems',
                helpText: 'Enables rounding to tenths, hundredths, etc.',
                order: 3
              }),
              maxDecimalPlaces: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Decimal Places',
                description: 'Maximum number of decimal places in numbers',
                min: 1,
                max: 4,
                required: true,
                presets: [1, 2, 3, 4],
                helpText: 'More decimal places create more complex rounding problems',
                order: 4
              })
            }
          }),
          
          roundingOptions: schemaV2.createCategory({
            id: 'roundingOptions',
            label: 'Rounding Configuration',
            description: 'Choose what place values to round to',
            icon: 'adjust',
            color: 'purple',
            order: 3,
            parameters: {
              roundToPlace: schemaV2.createParameter({
                type: 'select',
                label: 'Round to Place Value',
                description: 'Which place value to round numbers to',
                variant: 'cards',
                options: [
                  { value: 'ones', label: 'Ones', description: 'Round to nearest whole number (23.7 → 24)' },
                  { value: 'tens', label: 'Tens', description: 'Round to nearest ten (347 → 350)' },
                  { value: 'hundreds', label: 'Hundreds', description: 'Round to nearest hundred (1,247 → 1,200)' },
                  { value: 'thousands', label: 'Thousands', description: 'Round to nearest thousand (12,847 → 13,000)' },
                  { value: 'ten-thousands', label: 'Ten Thousands', description: 'Round to nearest ten thousand (123,456 → 120,000)' },
                  { value: 'tenths', label: 'Tenths', description: 'Round to nearest tenth (12.347 → 12.3)' },
                  { value: 'hundredths', label: 'Hundredths', description: 'Round to nearest hundredth (12.347 → 12.35)' }
                ],
                order: 1
              }),
              mixedPlaces: schemaV2.createParameter({
                type: 'boolean',
                label: 'Mixed Place Values',
                description: 'Use different rounding place values in the same worksheet',
                helpText: 'Creates variety but may be confusing for beginners',
                order: 2
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'tens-rounding',
            label: 'Rounding to Tens',
            description: 'Basic rounding to the nearest ten for elementary practice',
            icon: 'looks_one',
            category: 'difficulty',
            values: {
              problemCount: 12,
              complexityLevel: 'basic',
              minNumber: 20,
              maxNumber: 999,
              roundToPlace: 'tens',
              includeDecimals: false,
              maxDecimalPlaces: 1,
              mixedPlaces: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'hundreds-thousands',
            label: 'Hundreds & Thousands',
            description: 'Intermediate rounding to hundreds and thousands',
            icon: 'looks_two',
            category: 'difficulty',
            values: {
              problemCount: 10,
              complexityLevel: 'intermediate',
              minNumber: 500,
              maxNumber: 99999,
              roundToPlace: 'hundreds',
              includeDecimals: false,
              maxDecimalPlaces: 2,
              mixedPlaces: true
            }
          }),
          
          schemaV2.createPreset({
            id: 'decimal-rounding',
            label: 'Decimal Rounding',
            description: 'Advanced practice with rounding decimal numbers',
            icon: 'more_horiz',
            category: 'difficulty',
            values: {
              problemCount: 8,
              complexityLevel: 'advanced',
              minNumber: 1,
              maxNumber: 1000,
              roundToPlace: 'tenths',
              includeDecimals: true,
              maxDecimalPlaces: 3,
              mixedPlaces: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'mixed-practice',
            label: 'Mixed Rounding Practice',
            description: 'Comprehensive practice with various place values and decimals',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 15,
              complexityLevel: 'advanced',
              minNumber: 10,
              maxNumber: 50000,
              roundToPlace: 'tens',
              includeDecimals: true,
              maxDecimalPlaces: 2,
              mixedPlaces: true
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
    
    // Generate number to round
    const number = this.generateNumber(adjustedParams)
    
    // Determine rounding place
    const roundToPlace = adjustedParams.mixedPlaces ? 
      this.getRandomRoundingPlace(adjustedParams) : 
      adjustedParams.roundToPlace
    
    // Calculate rounded result
    const roundedNumber = this.roundToPlace(number, roundToPlace)
    
    // Create question
    const questionText = `Round ${number} to the nearest ${this.getPlaceDisplayName(roundToPlace)}.`
    const questionLaTeX = `\\text{Round } ${number} \\text{ to the nearest ${this.getPlaceDisplayName(roundToPlace)}.}`

    // Generate steps
    const steps = this.generateRoundingSteps(number, roundToPlace, roundedNumber)

    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: roundedNumber,
      answerLaTeX: roundedNumber.toString(),
      steps: steps,
      metadata: {
        operation: 'rounding',
        originalNumber: number,
        roundToPlace: roundToPlace,
        roundedNumber: roundedNumber,
        complexityLevel: adjustedParams.complexityLevel,
        hasDecimals: number.toString().includes('.'),
        numberRange: adjustedParams.maxNumber - adjustedParams.minNumber,
        difficulty: this.difficulty,
        estimatedTime: '45 seconds'
      }
    }
  }

  generateNumber(params) {
    if (params.includeDecimals && Math.random() < 0.4) {
      // Generate decimal number
      const integerPart = this.getRandomNumber(params.minNumber, params.maxNumber)
      const decimalPlaces = this.getRandomNumber(1, params.maxDecimalPlaces)
      let decimalPart = ''
      for (let i = 0; i < decimalPlaces; i++) {
        decimalPart += this.getRandomNumber(0, 9).toString()
      }
      return parseFloat(`${integerPart}.${decimalPart}`)
    } else {
      return this.getRandomNumber(params.minNumber, params.maxNumber)
    }
  }

  getRandomRoundingPlace(params) {
    const places = ['tens', 'hundreds', 'thousands']
    if (params.includeDecimals) {
      places.push('ones', 'tenths')
    }
    return this.getRandomElement(places)
  }

  roundToPlace(number, place) {
    const placeValues = {
      'ones': 1,
      'tens': 10,
      'hundreds': 100,
      'thousands': 1000,
      'ten-thousands': 10000,
      'tenths': 0.1,
      'hundredths': 0.01,
      'thousandths': 0.001
    }

    const placeValue = placeValues[place]
    if (!placeValue) {
      throw new Error(`Unknown place value: ${place}`)
    }

    if (placeValue >= 1) {
      // Rounding to whole number places
      return Math.round(number / placeValue) * placeValue
    } else {
      // Rounding to decimal places
      const decimalPlaces = Math.abs(Math.log10(placeValue))
      return parseFloat(number.toFixed(decimalPlaces))
    }
  }

  generateRoundingSteps(originalNumber, roundToPlace, roundedNumber) {
    const steps = []
    steps.push(`Original number: ${originalNumber}`)
    
    // Identify the digit that determines rounding
    const lookAtDigit = this.getDigitToCheck(originalNumber, roundToPlace)
    const lookAtPlace = this.getCheckPlace(roundToPlace)
    
    if (lookAtDigit !== null) {
      steps.push(`Look at the ${lookAtPlace} place: ${lookAtDigit}`)
      
      if (lookAtDigit >= 5) {
        steps.push(`Since ${lookAtDigit} ≥ 5, round up`)
      } else {
        steps.push(`Since ${lookAtDigit} < 5, round down`)
      }
    }
    
    steps.push(`Rounded to nearest ${this.getPlaceDisplayName(roundToPlace)}: ${roundedNumber}`)
    
    return steps
  }

  getDigitToCheck(number, roundToPlace) {
    const numberStr = number.toString()
    const isDecimal = numberStr.includes('.')
    
    const placePositions = {
      'ten-thousands': 4,
      'thousands': 3,
      'hundreds': 2,
      'tens': 1,
      'ones': 0,
      'tenths': -1,
      'hundredths': -2,
      'thousandths': -3
    }

    const targetPosition = placePositions[roundToPlace]
    const checkPosition = targetPosition - 1 // Check one place to the right
    
    if (isDecimal) {
      const [integerPart, decimalPart] = numberStr.split('.')
      
      if (checkPosition >= 0) {
        // Check digit in integer part
        const index = integerPart.length - 1 - checkPosition
        return index >= 0 && index < integerPart.length ? parseInt(integerPart[index]) : null
      } else {
        // Check digit in decimal part
        const decimalIndex = Math.abs(checkPosition) - 1
        return decimalIndex < decimalPart.length ? parseInt(decimalPart[decimalIndex]) : null
      }
    } else {
      // Whole number only
      if (checkPosition >= 0) {
        const index = numberStr.length - 1 - checkPosition
        return index >= 0 && index < numberStr.length ? parseInt(numberStr[index]) : null
      }
      return null
    }
  }

  getCheckPlace(roundToPlace) {
    const checkPlaces = {
      'ten-thousands': 'thousands',
      'thousands': 'hundreds',
      'hundreds': 'tens',
      'tens': 'ones',
      'ones': 'tenths',
      'tenths': 'hundredths',
      'hundredths': 'thousandths'
    }
    return checkPlaces[roundToPlace] || 'next'
  }

  getPlaceDisplayName(place) {
    const displayNames = {
      'ones': 'one',
      'tens': 'ten',
      'hundreds': 'hundred',
      'thousands': 'thousand',
      'ten-thousands': 'ten thousand',
      'tenths': 'tenth',
      'hundredths': 'hundredth',
      'thousandths': 'thousandth'
    }
    return displayNames[place] || place
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
      // Basic: simple rounding to tens/hundreds, smaller numbers
      adjusted.minNumber = Math.max(10, Math.min(adjusted.minNumber, 999))
      adjusted.maxNumber = Math.min(adjusted.maxNumber, 9999)
      adjusted.maxDecimalPlaces = Math.min(adjusted.maxDecimalPlaces, 1)
      // Prefer no decimals and simple place values for basic level
      if (!adjusted.hasOwnProperty('includeDecimals')) {
        adjusted.includeDecimals = false
      }
      if (!adjusted.hasOwnProperty('mixedPlaces')) {
        adjusted.mixedPlaces = false
      }
      // Focus on tens and hundreds for basic
      if (!['tens', 'hundreds'].includes(adjusted.roundToPlace)) {
        adjusted.roundToPlace = 'tens'
      }
    } else if (params.complexityLevel === 'intermediate') {
      // Intermediate: larger numbers, thousands place
      adjusted.minNumber = Math.max(100, Math.min(adjusted.minNumber, 9999))
      adjusted.maxNumber = Math.min(adjusted.maxNumber, 99999)
      adjusted.maxDecimalPlaces = Math.min(adjusted.maxDecimalPlaces, 2)
      // Allow mixed places for variety
      if (!adjusted.hasOwnProperty('mixedPlaces')) {
        adjusted.mixedPlaces = true
      }
    } else if (params.complexityLevel === 'advanced') {
      // Advanced: all features enabled, decimals, mixed places
      adjusted.maxNumber = Math.max(adjusted.maxNumber, 10000)
      adjusted.maxDecimalPlaces = Math.max(adjusted.maxDecimalPlaces, 2)
      // Enable advanced features for advanced level
      if (!adjusted.hasOwnProperty('includeDecimals')) {
        adjusted.includeDecimals = true
      }
      if (!adjusted.hasOwnProperty('mixedPlaces')) {
        adjusted.mixedPlaces = true
      }
    }
    
    return adjusted
  }
}

export default RoundingGenerator