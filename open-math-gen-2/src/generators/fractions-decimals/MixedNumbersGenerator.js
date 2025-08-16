import { BaseGenerator } from '../BaseGenerator.js'

/**
 * Mixed Numbers Generator
 * Generates problems involving mixed numbers and conversions between improper fractions and mixed numbers
 */
export class MixedNumbersGenerator extends BaseGenerator {
  constructor() {
    super({
      name: 'Mixed Numbers',
      description: 'Generate problems involving mixed numbers and conversions between improper fractions and mixed numbers',
      category: 'fractions-decimals',
      difficulty: 'medium',
      icon: 'layers',
      tags: ['fractions', 'mixed-numbers', 'improper-fractions', 'conversions'],
      gradeLevel: '4-7',
      estimatedTime: '75 seconds',
      exampleProblem: {
        question: 'Convert 7/3 to a mixed number',
        questionLaTeX: '\\text{Convert } \\frac{7}{3} \\text{ to a mixed number}',
        answer: '2 1/3',
        answerLaTeX: '2\\frac{1}{3}'
      },
      
      defaultParameters: {
        problemCount: 10,
        includeImproperToMixed: true,
        includeMixedToImproper: true,
        includeOperations: false,
        maxWholeNumber: 8,
        maxNumerator: 15,
        maxDenominator: 12,
        includeAddition: true,
        includeSubtraction: false,
        requireSimplified: true
      },
      
      parameterSchema: {
        problemCount: {
          type: 'number',
          label: 'Number of Problems',
          description: 'How many mixed number problems to generate',
          min: 1,
          max: 100,
          required: true
        },
        includeImproperToMixed: {
          type: 'boolean',
          label: 'Include Improper to Mixed',
          description: 'Include converting improper fractions to mixed numbers'
        },
        includeMixedToImproper: {
          type: 'boolean',
          label: 'Include Mixed to Improper',
          description: 'Include converting mixed numbers to improper fractions'
        },
        maxWholeNumber: {
          type: 'number',
          label: 'Maximum Whole Number',
          description: 'Largest whole number part in mixed numbers',
          min: 1,
          max: 20,
          required: true
        },
        maxNumerator: {
          type: 'number',
          label: 'Maximum Numerator',
          description: 'Largest numerator to use',
          min: 1,
          max: 25,
          required: true
        },
        maxDenominator: {
          type: 'number',
          label: 'Maximum Denominator',
          description: 'Largest denominator to use',
          min: 2,
          max: 20,
          required: true
        },
        includeOperations: {
          type: 'boolean',
          label: 'Include Operations',
          description: 'Include addition and subtraction of mixed numbers'
        },
        includeAddition: {
          type: 'boolean',
          label: 'Include Addition',
          description: 'Include mixed number addition when operations are enabled'
        },
        includeSubtraction: {
          type: 'boolean',
          label: 'Include Subtraction',
          description: 'Include mixed number subtraction when operations are enabled'
        },
        requireSimplified: {
          type: 'boolean',
          label: 'Require Simplified Form',
          description: 'Answers should be in simplest form'
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
    
    // Build array of enabled problem types
    const enabledTypes = []
    if (params.includeImproperToMixed) enabledTypes.push('improper-to-mixed')
    if (params.includeMixedToImproper) enabledTypes.push('mixed-to-improper')
    if (params.includeOperations) enabledTypes.push('operations')
    
    if (enabledTypes.length === 0) {
      throw new Error('At least one problem type must be enabled')
    }
    
    const problemType = this.getRandomElement(enabledTypes)
    
    // Handle operations if selected
    if (problemType === 'operations') {
      const operationTypes = []
      if (params.includeAddition) operationTypes.push('addition')
      if (params.includeSubtraction) operationTypes.push('subtraction')
      
      if (operationTypes.length === 0) {
        throw new Error('At least one operation type must be enabled when operations are included')
      }
      
      const operationType = this.getRandomElement(operationTypes)
      return this.generateOperationProblem(params, operationType)
    }
    
    switch (problemType) {
      case 'improper-to-mixed':
        return this.generateImproperToMixedProblem(params)
      case 'mixed-to-improper':
        return this.generateMixedToImproperProblem(params)
      default:
        return this.generateImproperToMixedProblem(params)
    }
  }

  generateImproperToMixedProblem(params) {
    // Generate an improper fraction
    const denominator = this.getRandomNumber(2, params.maxDenominator)
    const numerator = this.getRandomNumber(denominator + 1, params.maxNumerator)
    
    // Convert to mixed number
    const wholeNumber = Math.floor(numerator / denominator)
    const remainderNumerator = numerator % denominator
    
    // Simplify the fractional part if needed
    let finalNumerator = remainderNumerator
    let finalDenominator = denominator
    
    if (params.requireSimplified && remainderNumerator > 0) {
      const simplified = this.simplifyFraction(remainderNumerator, denominator)
      finalNumerator = simplified.numerator
      finalDenominator = simplified.denominator
    }
    
    const questionText = `Convert ${numerator}/${denominator} to a mixed number`
    const questionLaTeX = `\\text{Convert } \\frac{${numerator}}{${denominator}} \\text{ to a mixed number}`
    
    let answerText, answerLaTeX
    if (finalNumerator === 0) {
      answerText = `${wholeNumber}`
      answerLaTeX = `${wholeNumber}`
    } else {
      answerText = `${wholeNumber} ${finalNumerator}/${finalDenominator}`
      answerLaTeX = `${wholeNumber}\\frac{${finalNumerator}}{${finalDenominator}}`
    }
    
    const steps = [
      `\\frac{${numerator}}{${denominator}}`,
      `= \\frac{${wholeNumber} \\times ${denominator} + ${remainderNumerator}}{${denominator}}`,
      `= ${wholeNumber} + \\frac{${remainderNumerator}}{${denominator}}`,
      `= ${answerLaTeX}`
    ]
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: answerText,
      answerLaTeX: answerLaTeX,
      steps: steps,
      metadata: {
        operation: 'improper-to-mixed',
        improperFraction: { numerator, denominator },
        mixedNumber: { whole: wholeNumber, numerator: finalNumerator, denominator: finalDenominator },
        difficulty: this.difficulty,
        estimatedTime: '60 seconds'
      }
    }
  }

  generateMixedToImproperProblem(params) {
    // Generate a mixed number
    const wholeNumber = this.getRandomNumber(1, params.maxWholeNumber)
    const denominator = this.getRandomNumber(2, params.maxDenominator)
    const numerator = this.getRandomNumber(1, denominator - 1)
    
    // Convert to improper fraction
    const improperNumerator = wholeNumber * denominator + numerator
    
    const questionText = `Convert ${wholeNumber} ${numerator}/${denominator} to an improper fraction`
    const questionLaTeX = `\\text{Convert } ${wholeNumber}\\frac{${numerator}}{${denominator}} \\text{ to an improper fraction}`
    
    const steps = [
      `${wholeNumber}\\frac{${numerator}}{${denominator}}`,
      `= \\frac{${wholeNumber} \\times ${denominator}}{${denominator}} + \\frac{${numerator}}{${denominator}}`,
      `= \\frac{${wholeNumber * denominator}}{${denominator}} + \\frac{${numerator}}{${denominator}}`,
      `= \\frac{${wholeNumber * denominator} + ${numerator}}{${denominator}}`,
      `= \\frac{${improperNumerator}}{${denominator}}`
    ]
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `${improperNumerator}/${denominator}`,
      answerLaTeX: `\\frac{${improperNumerator}}{${denominator}}`,
      steps: steps,
      metadata: {
        operation: 'mixed-to-improper',
        mixedNumber: { whole: wholeNumber, numerator, denominator },
        improperFraction: { numerator: improperNumerator, denominator },
        difficulty: this.difficulty,
        estimatedTime: '60 seconds'
      }
    }
  }

  generateOperationProblem(params, operationType) {
    const mixedNum1 = this.generateRandomMixedNumber(params)
    const mixedNum2 = this.generateRandomMixedNumber(params)
    
    // Convert to improper fractions for calculation
    const improper1 = this.mixedToImproper(mixedNum1)
    const improper2 = this.mixedToImproper(mixedNum2)
    
    let result
    let operationSymbol
    
    if (operationType === 'addition') {
      result = this.addFractions(improper1, improper2)
      operationSymbol = '+'
    } else { // subtraction
      // Ensure positive result
      const decimal1 = improper1.numerator / improper1.denominator
      const decimal2 = improper2.numerator / improper2.denominator
      
      if (decimal1 < decimal2) {
        [mixedNum1, mixedNum2] = [mixedNum2, mixedNum1]
        result = this.subtractFractions(this.mixedToImproper(mixedNum1), this.mixedToImproper(mixedNum2))
      } else {
        result = this.subtractFractions(improper1, improper2)
      }
      operationSymbol = '-'
    }
    
    // Simplify and convert back to mixed number
    if (params.requireSimplified) {
      result = this.simplifyFraction(result.numerator, result.denominator)
    }
    
    const finalAnswer = this.improperToMixed(result.numerator, result.denominator)
    
    const questionText = `${this.formatMixedNumber(mixedNum1)} ${operationSymbol} ${this.formatMixedNumber(mixedNum2)} = ?`
    const questionLaTeX = `${this.formatMixedNumberLaTeX(mixedNum1)} ${operationSymbol} ${this.formatMixedNumberLaTeX(mixedNum2)} = \\square`
    
    const steps = this.getOperationSteps(mixedNum1, mixedNum2, finalAnswer, operationType)
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: this.formatMixedNumber(finalAnswer),
      answerLaTeX: this.formatMixedNumberLaTeX(finalAnswer),
      steps: steps,
      metadata: {
        operation: `mixed-number-${operationType}`,
        mixedNumbers: [mixedNum1, mixedNum2],
        result: finalAnswer,
        difficulty: this.difficulty,
        estimatedTime: '120 seconds'
      }
    }
  }

  getOperationSteps(mixedNum1, mixedNum2, result, operationType) {
    const improper1 = this.mixedToImproper(mixedNum1)
    const improper2 = this.mixedToImproper(mixedNum2)
    const operationSymbol = operationType === 'addition' ? '+' : '-'
    
    return [
      `${this.formatMixedNumberLaTeX(mixedNum1)} ${operationSymbol} ${this.formatMixedNumberLaTeX(mixedNum2)}`,
      `= \\frac{${improper1.numerator}}{${improper1.denominator}} ${operationSymbol} \\frac{${improper2.numerator}}{${improper2.denominator}}`,
      `= ${this.formatMixedNumberLaTeX(result)}`
    ]
  }

  generateRandomMixedNumber(params) {
    const whole = this.getRandomNumber(1, params.maxWholeNumber)
    const denominator = this.getRandomNumber(2, params.maxDenominator)
    const numerator = this.getRandomNumber(1, denominator - 1)
    
    return { whole, numerator, denominator }
  }

  mixedToImproper(mixedNumber) {
    return {
      numerator: mixedNumber.whole * mixedNumber.denominator + mixedNumber.numerator,
      denominator: mixedNumber.denominator
    }
  }

  improperToMixed(numerator, denominator) {
    const whole = Math.floor(numerator / denominator)
    const remainderNumerator = numerator % denominator
    
    return {
      whole,
      numerator: remainderNumerator,
      denominator
    }
  }

  formatMixedNumber(mixedNumber) {
    if (mixedNumber.numerator === 0) {
      return `${mixedNumber.whole}`
    }
    return `${mixedNumber.whole} ${mixedNumber.numerator}/${mixedNumber.denominator}`
  }

  formatMixedNumberLaTeX(mixedNumber) {
    if (mixedNumber.numerator === 0) {
      return `${mixedNumber.whole}`
    }
    return `${mixedNumber.whole}\\frac{${mixedNumber.numerator}}{${mixedNumber.denominator}}`
  }

  addFractions(fraction1, fraction2) {
    const lcm = this.lcm(fraction1.denominator, fraction2.denominator)
    const newNum1 = fraction1.numerator * (lcm / fraction1.denominator)
    const newNum2 = fraction2.numerator * (lcm / fraction2.denominator)
    
    return {
      numerator: newNum1 + newNum2,
      denominator: lcm
    }
  }

  subtractFractions(fraction1, fraction2) {
    const lcm = this.lcm(fraction1.denominator, fraction2.denominator)
    const newNum1 = fraction1.numerator * (lcm / fraction1.denominator)
    const newNum2 = fraction2.numerator * (lcm / fraction2.denominator)
    
    return {
      numerator: newNum1 - newNum2,
      denominator: lcm
    }
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

  lcm(a, b) {
    return Math.abs(a * b) / this.gcd(a, b)
  }

  simplifyFraction(numerator, denominator) {
    const divisor = this.gcd(numerator, denominator)
    return {
      numerator: numerator / divisor,
      denominator: denominator / divisor
    }
  }
}

export default MixedNumbersGenerator