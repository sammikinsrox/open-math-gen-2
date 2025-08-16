import { BaseGenerator } from '../BaseGenerator.js'

/**
 * Fraction Operations Generator
 * Generates problems involving addition, subtraction, multiplication, and division of fractions
 */
export class FractionOperationsGenerator extends BaseGenerator {
  constructor() {
    super({
      name: 'Fraction Operations',
      description: 'Generate problems involving addition, subtraction, multiplication, and division of fractions',
      category: 'fractions-decimals',
      difficulty: 'medium',
      icon: 'calculate',
      tags: ['fractions', 'arithmetic', 'fraction-operations', 'common-denominators'],
      gradeLevel: '4-8',
      estimatedTime: '90 seconds',
      exampleProblem: {
        question: '1/4 + 2/3 = ?',
        questionLaTeX: '\\frac{1}{4} + \\frac{2}{3} = \\square',
        answer: '11/12',
        answerLaTeX: '\\frac{11}{12}'
      },
      
      defaultParameters: {
        problemCount: 10,
        includeAddition: true,
        includeSubtraction: true,
        includeMultiplication: false,
        includeDivision: false,
        maxNumerator: 12,
        maxDenominator: 12,
        allowImproperFractions: false,
        requireSimplifiedAnswers: true,
        allowMixedNumbers: false,
        useLikeDenonimators: false
      },
      
      parameterSchema: {
        problemCount: {
          type: 'number',
          label: 'Number of Problems',
          description: 'How many fraction operation problems to generate',
          min: 1,
          max: 100,
          required: true
        },
        includeAddition: {
          type: 'boolean',
          label: 'Include Addition',
          description: 'Include fraction addition problems'
        },
        includeSubtraction: {
          type: 'boolean',
          label: 'Include Subtraction',
          description: 'Include fraction subtraction problems'
        },
        includeMultiplication: {
          type: 'boolean',
          label: 'Include Multiplication',
          description: 'Include fraction multiplication problems'
        },
        includeDivision: {
          type: 'boolean',
          label: 'Include Division',
          description: 'Include fraction division problems'
        },
        maxNumerator: {
          type: 'number',
          label: 'Maximum Numerator',
          description: 'Largest numerator to use',
          min: 1,
          max: 20,
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
        allowImproperFractions: {
          type: 'boolean',
          label: 'Allow Improper Fractions',
          description: 'Allow fractions where numerator > denominator'
        },
        requireSimplifiedAnswers: {
          type: 'boolean',
          label: 'Require Simplified Answers',
          description: 'Answers should be in simplest form'
        },
        allowMixedNumbers: {
          type: 'boolean',
          label: 'Allow Mixed Numbers',
          description: 'Include mixed numbers in problems'
        },
        useLikeDenonimators: {
          type: 'boolean',
          label: 'Use Like Denominators',
          description: 'Use fractions with same denominators for easier problems'
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
    const fraction1 = this.generateRandomFraction(params)
    let fraction2 = this.generateRandomFraction(params)
    
    // Use like denominators if specified
    if (params.useLikeDenonimators) {
      fraction2.denominator = fraction1.denominator
      fraction2.latex = `\\frac{${fraction2.numerator}}{${fraction2.denominator}}`
    }
    
    // Calculate the result
    const result = this.addFractions(fraction1, fraction2)
    
    // Simplify if required
    const finalResult = params.requireSimplifiedAnswers ? 
      this.simplifyFraction(result.numerator, result.denominator) : result
    
    const questionText = `${fraction1.numerator}/${fraction1.denominator} + ${fraction2.numerator}/${fraction2.denominator} = ?`
    const questionLaTeX = `${fraction1.latex} + ${fraction2.latex} = \\square`
    
    const steps = this.getAdditionSteps(fraction1, fraction2, finalResult, params.useLikeDenonimators)
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `${finalResult.numerator}/${finalResult.denominator}`,
      answerLaTeX: `\\frac{${finalResult.numerator}}{${finalResult.denominator}}`,
      steps: steps,
      metadata: {
        operation: 'fraction-addition',
        fractions: [fraction1, fraction2],
        result: finalResult,
        difficulty: this.difficulty,
        estimatedTime: '90 seconds'
      }
    }
  }

  generateSubtractionProblem(params) {
    let fraction1 = this.generateRandomFraction(params)
    let fraction2 = this.generateRandomFraction(params)
    
    // Use like denominators if specified
    if (params.useLikeDenonimators) {
      fraction2.denominator = fraction1.denominator
      fraction2.latex = `\\frac{${fraction2.numerator}}{${fraction2.denominator}}`
    }
    
    // Ensure fraction1 > fraction2 to avoid negative results
    const decimal1 = fraction1.numerator / fraction1.denominator
    const decimal2 = fraction2.numerator / fraction2.denominator
    
    if (decimal1 < decimal2) {
      [fraction1, fraction2] = [fraction2, fraction1]
    }
    
    const result = this.subtractFractions(fraction1, fraction2)
    const finalResult = params.requireSimplifiedAnswers ? 
      this.simplifyFraction(result.numerator, result.denominator) : result
    
    const questionText = `${fraction1.numerator}/${fraction1.denominator} - ${fraction2.numerator}/${fraction2.denominator} = ?`
    const questionLaTeX = `${fraction1.latex} - ${fraction2.latex} = \\square`
    
    const steps = this.getSubtractionSteps(fraction1, fraction2, finalResult, params.useLikeDenonimators)
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `${finalResult.numerator}/${finalResult.denominator}`,
      answerLaTeX: `\\frac{${finalResult.numerator}}{${finalResult.denominator}}`,
      steps: steps,
      metadata: {
        operation: 'fraction-subtraction',
        fractions: [fraction1, fraction2],
        result: finalResult,
        difficulty: this.difficulty,
        estimatedTime: '90 seconds'
      }
    }
  }

  generateMultiplicationProblem(params) {
    const fraction1 = this.generateRandomFraction(params)
    const fraction2 = this.generateRandomFraction(params)
    
    const result = this.multiplyFractions(fraction1, fraction2)
    const finalResult = params.requireSimplifiedAnswers ? 
      this.simplifyFraction(result.numerator, result.denominator) : result
    
    const questionText = `${fraction1.numerator}/${fraction1.denominator} × ${fraction2.numerator}/${fraction2.denominator} = ?`
    const questionLaTeX = `${fraction1.latex} \\times ${fraction2.latex} = \\square`
    
    const steps = [
      `${fraction1.latex} \\times ${fraction2.latex}`,
      `= \\frac{${fraction1.numerator} \\times ${fraction2.numerator}}{${fraction1.denominator} \\times ${fraction2.denominator}}`,
      `= \\frac{${result.numerator}}{${result.denominator}}`
    ]
    
    if (params.requireSimplifiedAnswers && (result.numerator !== finalResult.numerator || result.denominator !== finalResult.denominator)) {
      steps.push(`= \\frac{${finalResult.numerator}}{${finalResult.denominator}}`)
    }
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `${finalResult.numerator}/${finalResult.denominator}`,
      answerLaTeX: `\\frac{${finalResult.numerator}}{${finalResult.denominator}}`,
      steps: steps,
      metadata: {
        operation: 'fraction-multiplication',
        fractions: [fraction1, fraction2],
        result: finalResult,
        difficulty: this.difficulty,
        estimatedTime: '75 seconds'
      }
    }
  }

  generateDivisionProblem(params) {
    const fraction1 = this.generateRandomFraction(params)
    const fraction2 = this.generateRandomFraction(params)
    
    const result = this.divideFractions(fraction1, fraction2)
    const finalResult = params.requireSimplifiedAnswers ? 
      this.simplifyFraction(result.numerator, result.denominator) : result
    
    const questionText = `${fraction1.numerator}/${fraction1.denominator} ÷ ${fraction2.numerator}/${fraction2.denominator} = ?`
    const questionLaTeX = `${fraction1.latex} \\div ${fraction2.latex} = \\square`
    
    const reciprocal = `\\frac{${fraction2.denominator}}{${fraction2.numerator}}`
    
    const steps = [
      `${fraction1.latex} \\div ${fraction2.latex}`,
      `= ${fraction1.latex} \\times ${reciprocal}`,
      `= \\frac{${fraction1.numerator} \\times ${fraction2.denominator}}{${fraction1.denominator} \\times ${fraction2.numerator}}`,
      `= \\frac{${result.numerator}}{${result.denominator}}`
    ]
    
    if (params.requireSimplifiedAnswers && (result.numerator !== finalResult.numerator || result.denominator !== finalResult.denominator)) {
      steps.push(`= \\frac{${finalResult.numerator}}{${finalResult.denominator}}`)
    }
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `${finalResult.numerator}/${finalResult.denominator}`,
      answerLaTeX: `\\frac{${finalResult.numerator}}{${finalResult.denominator}}`,
      steps: steps,
      metadata: {
        operation: 'fraction-division',
        fractions: [fraction1, fraction2],
        result: finalResult,
        difficulty: this.difficulty,
        estimatedTime: '100 seconds'
      }
    }
  }

  getAdditionSteps(fraction1, fraction2, finalResult, useLikeDenominators) {
    if (useLikeDenominators || fraction1.denominator === fraction2.denominator) {
      return [
        `${fraction1.latex} + ${fraction2.latex}`,
        `= \\frac{${fraction1.numerator} + ${fraction2.numerator}}{${fraction1.denominator}}`,
        `= \\frac{${fraction1.numerator + fraction2.numerator}}{${fraction1.denominator}}`,
        `= \\frac{${finalResult.numerator}}{${finalResult.denominator}}`
      ]
    } else {
      const lcm = this.lcm(fraction1.denominator, fraction2.denominator)
      const newNum1 = fraction1.numerator * (lcm / fraction1.denominator)
      const newNum2 = fraction2.numerator * (lcm / fraction2.denominator)
      
      return [
        `${fraction1.latex} + ${fraction2.latex}`,
        `= \\frac{${newNum1}}{${lcm}} + \\frac{${newNum2}}{${lcm}}`,
        `= \\frac{${newNum1} + ${newNum2}}{${lcm}}`,
        `= \\frac{${newNum1 + newNum2}}{${lcm}}`,
        `= \\frac{${finalResult.numerator}}{${finalResult.denominator}}`
      ]
    }
  }

  getSubtractionSteps(fraction1, fraction2, finalResult, useLikeDenominators) {
    if (useLikeDenominators || fraction1.denominator === fraction2.denominator) {
      return [
        `${fraction1.latex} - ${fraction2.latex}`,
        `= \\frac{${fraction1.numerator} - ${fraction2.numerator}}{${fraction1.denominator}}`,
        `= \\frac{${fraction1.numerator - fraction2.numerator}}{${fraction1.denominator}}`,
        `= \\frac{${finalResult.numerator}}{${finalResult.denominator}}`
      ]
    } else {
      const lcm = this.lcm(fraction1.denominator, fraction2.denominator)
      const newNum1 = fraction1.numerator * (lcm / fraction1.denominator)
      const newNum2 = fraction2.numerator * (lcm / fraction2.denominator)
      
      return [
        `${fraction1.latex} - ${fraction2.latex}`,
        `= \\frac{${newNum1}}{${lcm}} - \\frac{${newNum2}}{${lcm}}`,
        `= \\frac{${newNum1} - ${newNum2}}{${lcm}}`,
        `= \\frac{${newNum1 - newNum2}}{${lcm}}`,
        `= \\frac{${finalResult.numerator}}{${finalResult.denominator}}`
      ]
    }
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

  multiplyFractions(fraction1, fraction2) {
    return {
      numerator: fraction1.numerator * fraction2.numerator,
      denominator: fraction1.denominator * fraction2.denominator
    }
  }

  divideFractions(fraction1, fraction2) {
    return {
      numerator: fraction1.numerator * fraction2.denominator,
      denominator: fraction1.denominator * fraction2.numerator
    }
  }

  generateRandomFraction(params) {
    let numerator, denominator
    
    do {
      denominator = this.getRandomNumber(2, params.maxDenominator)
      
      if (params.allowImproperFractions) {
        numerator = this.getRandomNumber(1, params.maxNumerator)
      } else {
        numerator = this.getRandomNumber(1, Math.min(params.maxNumerator, denominator - 1))
      }
      
      break
    } while (true)
    
    return {
      numerator,
      denominator,
      decimal: numerator / denominator,
      latex: `\\frac{${numerator}}{${denominator}}`
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

export default FractionOperationsGenerator