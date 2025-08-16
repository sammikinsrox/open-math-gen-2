import { BaseGenerator } from '../BaseGenerator.js'

/**
 * Fraction-Decimal Conversion Generator
 * Generates problems involving conversions between fractions and decimals
 */
export class FractionDecimalConversionGenerator extends BaseGenerator {
  constructor() {
    super({
      name: 'Fraction ↔ Decimal Conversion',
      description: 'Generate problems involving conversions between fractions and decimals',
      category: 'fractions-decimals',
      difficulty: 'medium',
      icon: 'swap_horiz',
      tags: ['fractions', 'decimals', 'conversions', 'equivalent-forms'],
      gradeLevel: '4-8',
      estimatedTime: '60 seconds',
      exampleProblem: {
        question: 'Convert 3/4 to a decimal',
        questionLaTeX: '\\text{Convert } \\frac{3}{4} \\text{ to a decimal}',
        answer: '0.75',
        answerLaTeX: '0.75'
      },
      
      defaultParameters: {
        problemCount: 10,
        includeFractionToDecimal: true,
        includeDecimalToFraction: true,
        maxNumerator: 25,
        maxDenominator: 20,
        decimalPlaces: 3,
        includeTerminatingDecimals: true,
        includeRepeatingDecimals: false,
        includeCommonFractions: true,
        requireSimplifiedFractions: true
      },
      
      parameterSchema: {
        problemCount: {
          type: 'number',
          label: 'Number of Problems',
          description: 'How many conversion problems to generate',
          min: 1,
          max: 100,
          required: true
        },
        includeFractionToDecimal: {
          type: 'boolean',
          label: 'Include Fraction to Decimal',
          description: 'Include converting fractions to decimals'
        },
        includeDecimalToFraction: {
          type: 'boolean',
          label: 'Include Decimal to Fraction',
          description: 'Include converting decimals to fractions'
        },
        maxNumerator: {
          type: 'number',
          label: 'Maximum Numerator',
          description: 'Largest numerator to use in fractions',
          min: 1,
          max: 50,
          required: true
        },
        maxDenominator: {
          type: 'number',
          label: 'Maximum Denominator',
          description: 'Largest denominator to use in fractions',
          min: 2,
          max: 30,
          required: true
        },
        decimalPlaces: {
          type: 'number',
          label: 'Maximum Decimal Places',
          description: 'Maximum number of decimal places for conversions',
          min: 1,
          max: 4,
          required: true
        },
        includeTerminatingDecimals: {
          type: 'boolean',
          label: 'Include Terminating Decimals',
          description: 'Include decimals that end (like 0.25, 0.5)'
        },
        includeRepeatingDecimals: {
          type: 'boolean',
          label: 'Include Repeating Decimals',
          description: 'Include decimals that repeat (like 0.333..., 0.666...)'
        },
        includeCommonFractions: {
          type: 'boolean',
          label: 'Include Common Fractions',
          description: 'Include common fractions like 1/2, 1/4, 3/4, etc.'
        },
        requireSimplifiedFractions: {
          type: 'boolean',
          label: 'Require Simplified Fractions',
          description: 'Fraction answers should be in simplest form'
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
    
    // Build array of enabled conversion types
    const enabledTypes = []
    if (params.includeFractionToDecimal) enabledTypes.push('fraction-to-decimal')
    if (params.includeDecimalToFraction) enabledTypes.push('decimal-to-fraction')
    
    if (enabledTypes.length === 0) {
      throw new Error('At least one conversion type must be enabled')
    }
    
    const conversionType = this.getRandomElement(enabledTypes)
    
    switch (conversionType) {
      case 'fraction-to-decimal':
        return this.generateFractionToDecimalProblem(params)
      case 'decimal-to-fraction':
        return this.generateDecimalToFractionProblem(params)
      default:
        return this.generateFractionToDecimalProblem(params)
    }
  }

  generateFractionToDecimalProblem(params) {
    let fraction
    
    if (params.includeCommonFractions && Math.random() < 0.4) {
      fraction = this.getCommonFraction()
    } else {
      fraction = this.generateRandomFraction(params)
    }
    
    const decimal = fraction.numerator / fraction.denominator
    const roundedDecimal = Math.round(decimal * Math.pow(10, params.decimalPlaces)) / Math.pow(10, params.decimalPlaces)
    
    // Check if it's terminating or repeating
    const isRepeating = this.isRepeatingDecimal(fraction.numerator, fraction.denominator)
    
    // Skip repeating decimals if not allowed
    if (isRepeating && !params.includeRepeatingDecimals) {
      return this.generateFractionToDecimalProblem(params)
    }
    
    // Skip terminating decimals if not allowed
    if (!isRepeating && !params.includeTerminatingDecimals) {
      return this.generateFractionToDecimalProblem(params)
    }
    
    const questionText = `Convert ${fraction.numerator}/${fraction.denominator} to a decimal`
    const questionLaTeX = `\\text{Convert } \\frac{${fraction.numerator}}{${fraction.denominator}} \\text{ to a decimal}`
    
    let answerText = roundedDecimal.toString()
    let steps = [
      `\\frac{${fraction.numerator}}{${fraction.denominator}}`,
      `= ${fraction.numerator} \\div ${fraction.denominator}`,
      `= ${roundedDecimal}`
    ]
    
    // Handle repeating decimals notation
    if (isRepeating && params.includeRepeatingDecimals) {
      const repeatingInfo = this.getRepeatingDecimalInfo(fraction.numerator, fraction.denominator)
      if (repeatingInfo) {
        answerText = repeatingInfo.notation
        steps[steps.length - 1] = `= ${repeatingInfo.notation}`
      }
    }
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: answerText,
      answerLaTeX: answerText,
      steps: steps,
      metadata: {
        operation: 'fraction-to-decimal',
        fraction: fraction,
        decimal: roundedDecimal,
        isRepeating: isRepeating,
        difficulty: this.difficulty,
        estimatedTime: '45 seconds'
      }
    }
  }

  generateDecimalToFractionProblem(params) {
    let decimal
    
    if (params.includeCommonFractions && Math.random() < 0.4) {
      const commonFraction = this.getCommonFraction()
      decimal = commonFraction.numerator / commonFraction.denominator
    } else {
      decimal = this.generateRandomDecimal(params)
    }
    
    // Convert decimal to fraction
    const fraction = this.decimalToFraction(decimal, params.decimalPlaces)
    
    // Simplify if required
    const finalFraction = params.requireSimplifiedFractions ? 
      this.simplifyFraction(fraction.numerator, fraction.denominator) : fraction
    
    const questionText = `Convert ${decimal} to a fraction`
    const questionLaTeX = `\\text{Convert } ${decimal} \\text{ to a fraction}`
    
    const steps = this.getDecimalToFractionSteps(decimal, finalFraction, params.requireSimplifiedFractions)
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `${finalFraction.numerator}/${finalFraction.denominator}`,
      answerLaTeX: `\\frac{${finalFraction.numerator}}{${finalFraction.denominator}}`,
      steps: steps,
      metadata: {
        operation: 'decimal-to-fraction',
        decimal: decimal,
        fraction: finalFraction,
        difficulty: this.difficulty,
        estimatedTime: '60 seconds'
      }
    }
  }

  getDecimalToFractionSteps(decimal, finalFraction, requireSimplified) {
    const decimalPlaces = this.getDecimalPlaces(decimal)
    const denominator = Math.pow(10, decimalPlaces)
    const numerator = decimal * denominator
    
    const steps = [
      `${decimal}`,
      `= \\frac{${numerator}}{${denominator}}`
    ]
    
    if (requireSimplified && (numerator !== finalFraction.numerator || denominator !== finalFraction.denominator)) {
      steps.push(`= \\frac{${finalFraction.numerator}}{${finalFraction.denominator}}`)
    }
    
    return steps
  }

  generateRandomDecimal(params) {
    const decimalPlaces = this.getRandomNumber(1, params.decimalPlaces)
    const maxValue = Math.pow(10, decimalPlaces) - 1
    const randomValue = this.getRandomNumber(1, maxValue)
    
    return Math.round((randomValue / Math.pow(10, decimalPlaces)) * Math.pow(10, params.decimalPlaces)) / Math.pow(10, params.decimalPlaces)
  }

  generateRandomFraction(params) {
    let numerator, denominator
    
    do {
      denominator = this.getRandomNumber(2, params.maxDenominator)
      numerator = this.getRandomNumber(1, Math.min(params.maxNumerator, denominator - 1))
    } while (numerator >= denominator)
    
    return {
      numerator,
      denominator,
      decimal: numerator / denominator,
      latex: `\\frac{${numerator}}{${denominator}}`
    }
  }

  getCommonFractions() {
    return [
      { numerator: 1, denominator: 2 },   // 0.5
      { numerator: 1, denominator: 4 },   // 0.25
      { numerator: 3, denominator: 4 },   // 0.75
      { numerator: 1, denominator: 8 },   // 0.125
      { numerator: 3, denominator: 8 },   // 0.375
      { numerator: 5, denominator: 8 },   // 0.625
      { numerator: 7, denominator: 8 },   // 0.875
      { numerator: 1, denominator: 5 },   // 0.2
      { numerator: 2, denominator: 5 },   // 0.4
      { numerator: 3, denominator: 5 },   // 0.6
      { numerator: 4, denominator: 5 },   // 0.8
      { numerator: 1, denominator: 10 },  // 0.1
      { numerator: 3, denominator: 10 },  // 0.3
      { numerator: 7, denominator: 10 },  // 0.7
      { numerator: 9, denominator: 10 }   // 0.9
    ]
  }

  getCommonFraction() {
    const commonFractions = this.getCommonFractions()
    return this.getRandomElement(commonFractions)
  }

  decimalToFraction(decimal, maxDecimalPlaces) {
    const decimalPlaces = this.getDecimalPlaces(decimal)
    const denominator = Math.pow(10, decimalPlaces)
    const numerator = Math.round(decimal * denominator)
    
    return { numerator, denominator }
  }

  isRepeatingDecimal(numerator, denominator) {
    // A fraction in lowest terms has a terminating decimal if and only if
    // the denominator has no prime factors other than 2 and 5
    const simplified = this.simplifyFraction(numerator, denominator)
    let den = simplified.denominator
    
    // Remove factors of 2 and 5
    while (den % 2 === 0) den /= 2
    while (den % 5 === 0) den /= 5
    
    // If anything remains, it's repeating
    return den > 1
  }

  getRepeatingDecimalInfo(numerator, denominator) {
    // For simple cases, return repeating notation
    if (numerator === 1 && denominator === 3) return { notation: '0.333...' }
    if (numerator === 2 && denominator === 3) return { notation: '0.666...' }
    if (numerator === 1 && denominator === 6) return { notation: '0.1666...' }
    if (numerator === 5 && denominator === 6) return { notation: '0.8333...' }
    if (numerator === 1 && denominator === 9) return { notation: '0.111...' }
    if (numerator === 2 && denominator === 9) return { notation: '0.222...' }
    
    // For other cases, just show decimal approximation
    const decimal = numerator / denominator
    return { notation: decimal.toFixed(3) + '...' }
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

  gcd(a, b) {
    return b === 0 ? a : this.gcd(b, a % b)
  }

  simplifyFraction(numerator, denominator) {
    const divisor = this.gcd(numerator, denominator)
    return {
      numerator: numerator / divisor,
      denominator: denominator / divisor
    }
  }
}

export default FractionDecimalConversionGenerator