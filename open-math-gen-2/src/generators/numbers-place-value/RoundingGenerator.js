import { BaseGenerator } from '../BaseGenerator.js'

/**
 * Rounding Generator
 * Generates problems about rounding numbers to various place values
 */
export class RoundingGenerator extends BaseGenerator {
  constructor() {
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
        mixedPlaces: false
      },
      
      parameterSchema: {
        problemCount: {
          type: 'number',
          label: 'Number of Problems',
          description: 'How many rounding problems to generate',
          min: 1,
          max: 100,
          required: true
        },
        minNumber: {
          type: 'number',
          label: 'Minimum Number',
          description: 'Smallest number to use',
          min: 1,
          max: 999999,
          required: true
        },
        maxNumber: {
          type: 'number',
          label: 'Maximum Number',
          description: 'Largest number to use',
          min: 1,
          max: 999999,
          required: true
        },
        roundToPlace: {
          type: 'string',
          label: 'Round to Place',
          description: 'Which place value to round to',
          options: ['ones', 'tens', 'hundreds', 'thousands', 'ten-thousands', 'tenths', 'hundredths']
        },
        includeDecimals: {
          type: 'boolean',
          label: 'Include Decimals',
          description: 'Include decimal numbers in rounding problems'
        },
        maxDecimalPlaces: {
          type: 'number',
          label: 'Maximum Decimal Places',
          description: 'Maximum number of decimal places',
          min: 1,
          max: 4,
          required: true
        },
        mixedPlaces: {
          type: 'boolean',
          label: 'Mixed Place Values',
          description: 'Use different place values in same worksheet'
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
    
    // Generate number to round
    const number = this.generateNumber(params)
    
    // Determine rounding place
    const roundToPlace = params.mixedPlaces ? 
      this.getRandomRoundingPlace(params) : 
      params.roundToPlace
    
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
}

export default RoundingGenerator