import { BaseGenerator } from '../BaseGenerator.js'

/**
 * Basic Fractions Generator
 * Generates problems involving basic fraction concepts and visualization
 */
export class BasicFractionsGenerator extends BaseGenerator {
  constructor() {
    super({
      name: 'Basic Fractions',
      description: 'Generate basic fraction problems including identification, shading, and simple concepts',
      category: 'fractions-decimals',
      difficulty: 'easy',
      icon: 'pie_chart',
      tags: ['fractions', 'basic-math', 'visual-fractions', 'parts-whole'],
      gradeLevel: '3-6',
      estimatedTime: '45 seconds',
      exampleProblem: {
        question: 'What fraction is shaded? [Visual: 3 out of 8 parts shaded]',
        questionLaTeX: '\\text{What fraction is shaded? } \\frac{3}{8}',
        answer: '3/8',
        answerLaTeX: '\\frac{3}{8}'
      },
      
      defaultParameters: {
        problemCount: 10,
        maxNumerator: 12,
        maxDenominator: 12,
        includeIdentify: true,
        includeShade: true,
        includeWrite: true,
        includeCompare: false,
        allowImproperFractions: false,
        allowWholeNumbers: false,
        requireSimplified: true
      },
      
      parameterSchema: {
        problemCount: {
          type: 'number',
          label: 'Number of Problems',
          description: 'How many fraction problems to generate',
          min: 1,
          max: 100,
          required: true
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
        includeIdentify: {
          type: 'boolean',
          label: 'Include Identify Problems',
          description: 'Include problems asking to identify fractions'
        },
        includeShade: {
          type: 'boolean',
          label: 'Include Shade Problems',
          description: 'Include problems asking to shade fractions'
        },
        includeWrite: {
          type: 'boolean',
          label: 'Include Write Problems',
          description: 'Include problems asking to write fractions'
        },
        includeCompare: {
          type: 'boolean',
          label: 'Include Compare Problems',
          description: 'Include problems asking to compare fractions'
        },
        allowImproperFractions: {
          type: 'boolean',
          label: 'Allow Improper Fractions',
          description: 'Include fractions where numerator > denominator'
        },
        allowWholeNumbers: {
          type: 'boolean',
          label: 'Allow Whole Numbers',
          description: 'Include problems resulting in whole numbers'
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
    if (params.includeIdentify) enabledTypes.push('identify')
    if (params.includeShade) enabledTypes.push('shade')
    if (params.includeWrite) enabledTypes.push('write')
    if (params.includeCompare) enabledTypes.push('compare')
    
    if (enabledTypes.length === 0) {
      throw new Error('At least one problem type must be enabled')
    }
    
    const problemType = this.getRandomElement(enabledTypes)
    
    switch (problemType) {
      case 'identify':
        return this.generateIdentifyProblem(params)
      case 'shade':
        return this.generateShadeProblem(params)
      case 'write':
        return this.generateWriteProblem(params)
      case 'compare':
        return this.generateCompareProblem(params)
      default:
        return this.generateIdentifyProblem(params)
    }
  }

  generateIdentifyProblem(params) {
    const fraction = this.generateRandomFraction(params)
    
    const questionText = `What fraction represents ${fraction.numerator} out of ${fraction.denominator} parts?`
    const questionLaTeX = `\\text{What fraction represents } ${fraction.numerator} \\text{ out of } ${fraction.denominator} \\text{ parts?}`
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `${fraction.numerator}/${fraction.denominator}`,
      answerLaTeX: fraction.latex,
      steps: [
        `Parts used: ${fraction.numerator}`,
        `Total parts: ${fraction.denominator}`,
        `Fraction: ${fraction.latex}`
      ],
      metadata: {
        operation: 'identify-fraction',
        fraction: fraction,
        problemType: 'identify',
        difficulty: this.difficulty,
        estimatedTime: '30 seconds'
      }
    }
  }

  generateShadeProblem(params) {
    const fraction = this.generateRandomFraction(params)
    
    const questionText = `Shade ${fraction.latex} of the shape`
    const questionLaTeX = `\\text{Shade } ${fraction.latex} \\text{ of the shape}`
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `${fraction.numerator} parts shaded out of ${fraction.denominator}`,
      answerLaTeX: `\\text{${fraction.numerator} parts shaded out of ${fraction.denominator}}`,
      steps: [
        `Total parts needed: ${fraction.denominator}`,
        `Parts to shade: ${fraction.numerator}`,
        `Shade ${fraction.numerator} out of ${fraction.denominator} parts`
      ],
      metadata: {
        operation: 'shade-fraction',
        fraction: fraction,
        problemType: 'shade',
        difficulty: this.difficulty,
        estimatedTime: '45 seconds'
      }
    }
  }

  generateWriteProblem(params) {
    const fraction = this.generateRandomFraction(params)
    
    const questionText = `Write the fraction for ${fraction.numerator} out of ${fraction.denominator} equal parts`
    const questionLaTeX = `\\text{Write the fraction for } ${fraction.numerator} \\text{ out of } ${fraction.denominator} \\text{ equal parts}`
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `${fraction.numerator}/${fraction.denominator}`,
      answerLaTeX: fraction.latex,
      steps: [
        `Numerator (top): ${fraction.numerator}`,
        `Denominator (bottom): ${fraction.denominator}`,
        `Fraction: ${fraction.latex}`
      ],
      metadata: {
        operation: 'write-fraction',
        fraction: fraction,
        problemType: 'write',
        difficulty: this.difficulty,
        estimatedTime: '30 seconds'
      }
    }
  }

  generateCompareProblem(params) {
    const fraction1 = this.generateRandomFraction(params)
    const fraction2 = this.generateRandomFraction(params)
    
    // Make sure they're different
    while (fraction1.numerator === fraction2.numerator && fraction1.denominator === fraction2.denominator) {
      fraction2 = this.generateRandomFraction(params)
    }
    
    const decimal1 = fraction1.numerator / fraction1.denominator
    const decimal2 = fraction2.numerator / fraction2.denominator
    
    let comparison, comparisonSymbol
    if (decimal1 > decimal2) {
      comparison = 'greater than'
      comparisonSymbol = '>'
    } else if (decimal1 < decimal2) {
      comparison = 'less than'
      comparisonSymbol = '<'
    } else {
      comparison = 'equal to'
      comparisonSymbol = '='
    }
    
    const questionText = `Compare: ${fraction1.latex} ___ ${fraction2.latex}`
    const questionLaTeX = `\\text{Compare: } ${fraction1.latex} \\text{ ___ } ${fraction2.latex}`
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: comparisonSymbol,
      answerLaTeX: comparisonSymbol,
      steps: [
        `${fraction1.latex} = ${decimal1.toFixed(3)}`,
        `${fraction2.latex} = ${decimal2.toFixed(3)}`,
        `${fraction1.latex} ${comparisonSymbol} ${fraction2.latex}`
      ],
      metadata: {
        operation: 'compare-fractions',
        fractions: [fraction1, fraction2],
        comparison: comparison,
        problemType: 'compare',
        difficulty: this.difficulty,
        estimatedTime: '60 seconds'
      }
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
      
      // Avoid whole numbers if not allowed
      if (!params.allowWholeNumbers && numerator === denominator) {
        continue
      }
      
      break
    } while (true)
    
    // Simplify if required
    if (params.requireSimplified) {
      const simplified = this.simplifyFraction(numerator, denominator)
      numerator = simplified.numerator
      denominator = simplified.denominator
    }
    
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

  simplifyFraction(numerator, denominator) {
    const divisor = this.gcd(numerator, denominator)
    return {
      numerator: numerator / divisor,
      denominator: denominator / divisor
    }
  }
}

export default BasicFractionsGenerator