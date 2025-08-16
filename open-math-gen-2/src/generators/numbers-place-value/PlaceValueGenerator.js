import { BaseGenerator } from '../BaseGenerator.js'

/**
 * Place Value Generator
 * Generates problems about identifying place values, expanded form, and standard form
 */
export class PlaceValueGenerator extends BaseGenerator {
  constructor() {
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
        questionStyle: 'standard'
      },
      
      parameterSchema: {
        problemCount: {
          type: 'number',
          label: 'Number of Problems',
          description: 'How many place value problems to generate',
          min: 1,
          max: 100,
          required: true
        },
        minDigits: {
          type: 'number',
          label: 'Minimum Digits',
          description: 'Minimum number of digits in the numbers',
          min: 1,
          max: 8,
          required: true
        },
        maxDigits: {
          type: 'number',
          label: 'Maximum Digits',
          description: 'Maximum number of digits in the numbers',
          min: 1,
          max: 10,
          required: true
        },
        problemType: {
          type: 'string',
          label: 'Problem Type',
          description: 'Type of place value problem',
          options: ['identify-place', 'write-expanded', 'write-standard', 'mixed']
        },
        includeDecimals: {
          type: 'boolean',
          label: 'Include Decimals',
          description: 'Include decimal numbers in problems'
        },
        maxDecimalPlaces: {
          type: 'number',
          label: 'Maximum Decimal Places',
          description: 'Maximum number of decimal places when decimals are included',
          min: 1,
          max: 4,
          required: true
        },
        questionStyle: {
          type: 'string',
          label: 'Question Style',
          description: 'How to present the questions',
          options: ['standard', 'word-form', 'mixed']
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
    
    // Generate a random number within the digit range
    const number = this.generateNumber(params)
    
    // Choose problem type
    const problemType = params.problemType === 'mixed' ? 
      this.getRandomElement(['identify-place', 'write-expanded', 'write-standard']) :
      params.problemType
    
    return this.createProblemByType(number, problemType, params)
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
}

export default PlaceValueGenerator