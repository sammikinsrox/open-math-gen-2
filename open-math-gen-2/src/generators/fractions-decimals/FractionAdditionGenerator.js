import { BaseGenerator } from '../BaseGenerator.js'

/**
 * Fraction Addition Generator
 * Generates fraction addition problems
 */
export class FractionAdditionGenerator extends BaseGenerator {
  constructor() {
    super({
      name: 'Fraction Addition',
      description: 'Generate fraction addition problems with common and uncommon denominators',
      category: 'fractions-decimals',
      difficulty: 'medium',
      icon: 'add',
      
      defaultParameters: {
        problemCount: 10,
        maxNumerator: 12,
        maxDenominator: 12,
        allowMixedNumbers: false,
        requireSimplification: true,
        commonDenominators: false
      },
      
      parameterSchema: {
        problemCount: {
          type: 'number',
          label: 'Number of Problems',
          description: 'How many fraction addition problems to generate',
          min: 1,
          max: 100,
          required: true
        },
        maxNumerator: {
          type: 'number',
          label: 'Maximum Numerator',
          description: 'Largest numerator to use',
          min: 1,
          max: 50,
          required: true
        },
        maxDenominator: {
          type: 'number',
          label: 'Maximum Denominator',
          description: 'Largest denominator to use',
          min: 2,
          max: 50,
          required: true
        },
        allowMixedNumbers: {
          type: 'boolean',
          label: 'Allow Mixed Numbers',
          description: 'Include mixed number fractions'
        },
        requireSimplification: {
          type: 'boolean',
          label: 'Require Simplification',
          description: 'Answers must be in simplest form'
        },
        commonDenominators: {
          type: 'boolean',
          label: 'Common Denominators Only',
          description: 'Only generate problems with same denominators'
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
    
    // Generate two fractions
    let frac1 = this.getRandomFraction(params.maxNumerator, params.maxDenominator)
    let frac2 = this.getRandomFraction(params.maxNumerator, params.maxDenominator)
    
    // If common denominators required, make them the same
    if (params.commonDenominators) {
      frac2.denominator = frac1.denominator
    }
    
    // Calculate answer
    const answer = this.addFractions(frac1, frac2, params.requireSimplification)
    
    // Format question
    const questionLaTeX = `\\frac{${frac1.numerator}}{${frac1.denominator}} + \\frac{${frac2.numerator}}{${frac2.denominator}} = \\square`
    const questionText = `${frac1.numerator}/${frac1.denominator} + ${frac2.numerator}/${frac2.denominator} = ?`
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `${answer.numerator}/${answer.denominator}`,
      answerLaTeX: `\\frac{${answer.numerator}}{${answer.denominator}}`,
      steps: this.generateSteps(frac1, frac2, answer),
      metadata: {
        operation: 'fraction-addition',
        fractions: [frac1, frac2],
        answer: answer,
        difficulty: this.difficulty,
        estimatedTime: '90 seconds'
      }
    }
  }

  getRandomFraction(maxNumerator, maxDenominator) {
    return {
      numerator: Math.floor(Math.random() * maxNumerator) + 1,
      denominator: Math.floor(Math.random() * (maxDenominator - 1)) + 2
    }
  }

  addFractions(frac1, frac2, simplify = true) {
    const lcm = this.lcm(frac1.denominator, frac2.denominator)
    const num1 = frac1.numerator * (lcm / frac1.denominator)
    const num2 = frac2.numerator * (lcm / frac2.denominator)
    
    let result = {
      numerator: num1 + num2,
      denominator: lcm
    }
    
    if (simplify) {
      result = this.simplifyFraction(result.numerator, result.denominator)
    }
    
    return result
  }

  generateSteps(frac1, frac2, answer) {
    return [
      `\\frac{${frac1.numerator}}{${frac1.denominator}} + \\frac{${frac2.numerator}}{${frac2.denominator}}`,
      `= \\frac{${answer.numerator}}{${answer.denominator}}`
    ]
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

export default FractionAdditionGenerator