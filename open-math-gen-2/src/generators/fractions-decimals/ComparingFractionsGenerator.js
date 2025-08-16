import { BaseGenerator } from '../BaseGenerator.js'

/**
 * Comparing Fractions Generator
 * Generates problems involving comparing fractions using <, >, and = symbols
 */
export class ComparingFractionsGenerator extends BaseGenerator {
  constructor() {
    super({
      name: 'Comparing Fractions',
      description: 'Generate problems involving comparing fractions using greater than, less than, and equal to symbols',
      category: 'fractions-decimals',
      difficulty: 'medium',
      icon: 'compare',
      tags: ['fractions', 'comparing', 'inequalities', 'common-denominators', 'ordering'],
      gradeLevel: '3-7',
      estimatedTime: '75 seconds',
      exampleProblem: {
        question: 'Compare: 2/3 ___ 3/4',
        questionLaTeX: '\\text{Compare: } \\frac{2}{3} \\text{ ___ } \\frac{3}{4}',
        answer: '<',
        answerLaTeX: '<'
      },
      
      defaultParameters: {
        problemCount: 10,
        includeTwoFractions: true,
        includeThreeFractions: true,
        includeFractionDecimal: false,
        maxNumerator: 15,
        maxDenominator: 15,
        includeLikeDenominators: true,
        includeUnlikeDenominators: true,
        includeMixedNumbers: false,
        showWorkSteps: true,
        forceCommonDenominators: false
      },
      
      parameterSchema: {
        problemCount: {
          type: 'number',
          label: 'Number of Problems',
          description: 'How many fraction comparison problems to generate',
          min: 1,
          max: 100,
          required: true
        },
        includeTwoFractions: {
          type: 'boolean',
          label: 'Include Two Fractions',
          description: 'Include comparing two fractions (2/3 vs 3/4)'
        },
        includeThreeFractions: {
          type: 'boolean',
          label: 'Include Three Fractions',
          description: 'Include ordering three fractions'
        },
        includeFractionDecimal: {
          type: 'boolean',
          label: 'Include Fraction vs Decimal',
          description: 'Include comparing fractions and decimals'
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
          max: 25,
          required: true
        },
        includeLikeDenominators: {
          type: 'boolean',
          label: 'Include Like Denominators',
          description: 'Include problems with same denominators (easier)'
        },
        includeUnlikeDenominators: {
          type: 'boolean',
          label: 'Include Unlike Denominators',
          description: 'Include problems with different denominators (harder)'
        },
        includeMixedNumbers: {
          type: 'boolean',
          label: 'Include Mixed Numbers',
          description: 'Include mixed numbers in comparison problems'
        },
        showWorkSteps: {
          type: 'boolean',
          label: 'Show Work Steps',
          description: 'Show steps for finding common denominators'
        },
        forceCommonDenominators: {
          type: 'boolean',
          label: 'Force Common Denominators',
          description: 'Always use common denominators in solution steps'
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
    
    // Build array of enabled comparison types
    const enabledTypes = []
    if (params.includeTwoFractions) enabledTypes.push('two-fractions')
    if (params.includeThreeFractions) enabledTypes.push('three-fractions')
    if (params.includeFractionDecimal) enabledTypes.push('fraction-decimal')
    
    if (enabledTypes.length === 0) {
      throw new Error('At least one comparison type must be enabled')
    }
    
    const comparisonType = this.getRandomElement(enabledTypes)
    
    switch (comparisonType) {
      case 'two-fractions':
        return this.generateTwoFractionsComparison(params)
      case 'three-fractions':
        return this.generateThreeFractionsOrdering(params)
      case 'fraction-decimal':
        return this.generateFractionDecimalComparison(params)
      default:
        return this.generateTwoFractionsComparison(params)
    }
  }

  generateTwoFractionsComparison(params) {
    let fraction1, fraction2
    let useLikeDenominators = false
    
    // Determine if using like or unlike denominators
    if (params.includeLikeDenominators && params.includeUnlikeDenominators) {
      useLikeDenominators = Math.random() < 0.4
    } else if (params.includeLikeDenominators) {
      useLikeDenominators = true
    }
    
    if (useLikeDenominators) {
      const commonDenominator = this.getRandomNumber(2, params.maxDenominator)
      fraction1 = this.generateFractionWithDenominator(params, commonDenominator)
      fraction2 = this.generateFractionWithDenominator(params, commonDenominator)
      
      // Ensure they're different
      while (fraction1.numerator === fraction2.numerator) {
        fraction2 = this.generateFractionWithDenominator(params, commonDenominator)
      }
    } else {
      fraction1 = this.generateRandomFraction(params)
      fraction2 = this.generateRandomFraction(params)
      
      // Ensure they're not equivalent
      let attempts = 0
      while (this.areEquivalent(fraction1, fraction2) && attempts < 10) {
        fraction2 = this.generateRandomFraction(params)
        attempts++
      }
    }
    
    // Calculate comparison
    const decimal1 = fraction1.numerator / fraction1.denominator
    const decimal2 = fraction2.numerator / fraction2.denominator
    
    let comparisonSymbol, comparisonWord
    if (decimal1 > decimal2) {
      comparisonSymbol = '>'
      comparisonWord = 'greater than'
    } else if (decimal1 < decimal2) {
      comparisonSymbol = '<'
      comparisonWord = 'less than'
    } else {
      comparisonSymbol = '='
      comparisonWord = 'equal to'
    }
    
    const questionText = `Compare: ${fraction1.numerator}/${fraction1.denominator} ___ ${fraction2.numerator}/${fraction2.denominator}`
    const questionLaTeX = `\\text{Compare: } \\frac{${fraction1.numerator}}{${fraction1.denominator}} \\text{ ___ } \\frac{${fraction2.numerator}}{${fraction2.denominator}}`
    
    const steps = this.getComparisonSteps(fraction1, fraction2, comparisonSymbol, params)
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: comparisonSymbol,
      answerLaTeX: comparisonSymbol,
      steps: steps,
      metadata: {
        operation: 'compare-two-fractions',
        fractions: [fraction1, fraction2],
        comparison: comparisonWord,
        useLikeDenominators: useLikeDenominators,
        difficulty: this.difficulty,
        estimatedTime: '60 seconds'
      }
    }
  }

  generateThreeFractionsOrdering(params) {
    // Generate three different fractions
    const fractions = []
    
    for (let i = 0; i < 3; i++) {
      let newFraction
      let attempts = 0
      
      do {
        newFraction = this.generateRandomFraction(params)
        attempts++
      } while (attempts < 20 && fractions.some(f => this.areEquivalent(f, newFraction)))
      
      fractions.push(newFraction)
    }
    
    // Calculate decimal values and sort
    const fractionsWithDecimals = fractions.map(f => ({
      ...f,
      decimal: f.numerator / f.denominator
    }))
    
    const sortedFractions = [...fractionsWithDecimals].sort((a, b) => a.decimal - b.decimal)
    
    const questionText = `Order from least to greatest: ${fractions.map(f => `${f.numerator}/${f.denominator}`).join(', ')}`
    const questionLaTeX = `\\text{Order from least to greatest: } ${fractions.map(f => `\\frac{${f.numerator}}{${f.denominator}}`).join(', ')}`
    
    const answerText = sortedFractions.map(f => `${f.numerator}/${f.denominator}`).join(', ')
    const answerLaTeX = sortedFractions.map(f => `\\frac{${f.numerator}}{${f.denominator}}`).join(', ')
    
    const steps = [
      `\\text{Convert each fraction to decimal form:}`,
      ...fractions.map(f => `\\frac{${f.numerator}}{${f.denominator}} = ${(f.numerator / f.denominator).toFixed(3)}`),
      `\\text{Order: } ${answerLaTeX}`
    ]
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: answerText,
      answerLaTeX: answerLaTeX,
      steps: steps,
      metadata: {
        operation: 'order-three-fractions',
        originalFractions: fractions,
        sortedFractions: sortedFractions,
        difficulty: this.difficulty,
        estimatedTime: '120 seconds'
      }
    }
  }

  generateFractionDecimalComparison(params) {
    const fraction = this.generateRandomFraction(params)
    const decimal = this.generateRandomDecimal(2)
    
    const fractionDecimal = fraction.numerator / fraction.denominator
    
    let comparisonSymbol
    if (fractionDecimal > decimal) {
      comparisonSymbol = '>'
    } else if (fractionDecimal < decimal) {
      comparisonSymbol = '<'
    } else {
      comparisonSymbol = '='
    }
    
    const questionText = `Compare: ${fraction.numerator}/${fraction.denominator} ___ ${decimal}`
    const questionLaTeX = `\\text{Compare: } \\frac{${fraction.numerator}}{${fraction.denominator}} \\text{ ___ } ${decimal}`
    
    const steps = [
      `\\text{Convert fraction to decimal:}`,
      `\\frac{${fraction.numerator}}{${fraction.denominator}} = ${fractionDecimal.toFixed(3)}`,
      `${fractionDecimal.toFixed(3)} ${comparisonSymbol} ${decimal}`,
      `\\text{Therefore: } \\frac{${fraction.numerator}}{${fraction.denominator}} ${comparisonSymbol} ${decimal}`
    ]
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: comparisonSymbol,
      answerLaTeX: comparisonSymbol,
      steps: steps,
      metadata: {
        operation: 'compare-fraction-decimal',
        fraction: fraction,
        decimal: decimal,
        comparison: comparisonSymbol,
        difficulty: this.difficulty,
        estimatedTime: '75 seconds'
      }
    }
  }

  getComparisonSteps(fraction1, fraction2, comparisonSymbol, params) {
    if (fraction1.denominator === fraction2.denominator) {
      // Like denominators - simple comparison
      return [
        `\\frac{${fraction1.numerator}}{${fraction1.denominator}} \\text{ and } \\frac{${fraction2.numerator}}{${fraction2.denominator}}`,
        `\\text{Same denominators, compare numerators:}`,
        `${fraction1.numerator} ${comparisonSymbol} ${fraction2.numerator}`,
        `\\text{Therefore: } \\frac{${fraction1.numerator}}{${fraction1.denominator}} ${comparisonSymbol} \\frac{${fraction2.numerator}}{${fraction2.denominator}}`
      ]
    } else if (params.showWorkSteps || params.forceCommonDenominators) {
      // Unlike denominators - show common denominator method
      const lcm = this.lcm(fraction1.denominator, fraction2.denominator)
      const newNum1 = fraction1.numerator * (lcm / fraction1.denominator)
      const newNum2 = fraction2.numerator * (lcm / fraction2.denominator)
      
      return [
        `\\frac{${fraction1.numerator}}{${fraction1.denominator}} \\text{ and } \\frac{${fraction2.numerator}}{${fraction2.denominator}}`,
        `\\text{Find common denominator: LCM of } ${fraction1.denominator} \\text{ and } ${fraction2.denominator} \\text{ is } ${lcm}`,
        `\\frac{${fraction1.numerator}}{${fraction1.denominator}} = \\frac{${newNum1}}{${lcm}}, \\quad \\frac{${fraction2.numerator}}{${fraction2.denominator}} = \\frac{${newNum2}}{${lcm}}`,
        `\\text{Compare numerators: } ${newNum1} ${comparisonSymbol} ${newNum2}`,
        `\\text{Therefore: } \\frac{${fraction1.numerator}}{${fraction1.denominator}} ${comparisonSymbol} \\frac{${fraction2.numerator}}{${fraction2.denominator}}`
      ]
    } else {
      // Convert to decimals for comparison
      const decimal1 = (fraction1.numerator / fraction1.denominator).toFixed(3)
      const decimal2 = (fraction2.numerator / fraction2.denominator).toFixed(3)
      
      return [
        `\\frac{${fraction1.numerator}}{${fraction1.denominator}} \\text{ and } \\frac{${fraction2.numerator}}{${fraction2.denominator}}`,
        `\\text{Convert to decimals:}`,
        `\\frac{${fraction1.numerator}}{${fraction1.denominator}} = ${decimal1}, \\quad \\frac{${fraction2.numerator}}{${fraction2.denominator}} = ${decimal2}`,
        `${decimal1} ${comparisonSymbol} ${decimal2}`,
        `\\text{Therefore: } \\frac{${fraction1.numerator}}{${fraction1.denominator}} ${comparisonSymbol} \\frac{${fraction2.numerator}}{${fraction2.denominator}}`
      ]
    }
  }

  generateFractionWithDenominator(params, denominator) {
    const numerator = this.getRandomNumber(1, Math.min(params.maxNumerator, denominator - 1))
    
    return {
      numerator,
      denominator,
      decimal: numerator / denominator,
      latex: `\\frac{${numerator}}{${denominator}}`
    }
  }

  generateRandomFraction(params) {
    const denominator = this.getRandomNumber(2, params.maxDenominator)
    const numerator = this.getRandomNumber(1, Math.min(params.maxNumerator, denominator - 1))
    
    return {
      numerator,
      denominator,
      decimal: numerator / denominator,
      latex: `\\frac{${numerator}}{${denominator}}`
    }
  }

  generateRandomDecimal(places) {
    const factor = Math.pow(10, places)
    const randomValue = this.getRandomNumber(1, factor - 1)
    return randomValue / factor
  }

  areEquivalent(fraction1, fraction2) {
    const decimal1 = fraction1.numerator / fraction1.denominator
    const decimal2 = fraction2.numerator / fraction2.denominator
    return Math.abs(decimal1 - decimal2) < 0.0001
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
}

export default ComparingFractionsGenerator