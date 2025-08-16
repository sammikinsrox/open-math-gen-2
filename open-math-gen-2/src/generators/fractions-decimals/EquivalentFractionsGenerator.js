import { BaseGenerator } from '../BaseGenerator.js'

/**
 * Equivalent Fractions Generator
 * Generates problems involving finding equivalent fractions and simplifying fractions
 */
export class EquivalentFractionsGenerator extends BaseGenerator {
  constructor() {
    super({
      name: 'Equivalent Fractions',
      description: 'Generate problems involving finding equivalent fractions, simplifying fractions, and identifying equivalent forms',
      category: 'fractions-decimals',
      difficulty: 'easy',
      icon: 'compare_arrows',
      tags: ['fractions', 'equivalent-fractions', 'simplification', 'multiplication', 'common-factors'],
      gradeLevel: '3-7',
      estimatedTime: '60 seconds',
      exampleProblem: {
        question: 'Find an equivalent fraction: 2/3 = ?/12',
        questionLaTeX: '\\text{Find an equivalent fraction: } \\frac{2}{3} = \\frac{?}{12}',
        answer: '8',
        answerLaTeX: '8'
      },
      
      defaultParameters: {
        problemCount: 10,
        includeFindMissingNumerator: true,
        includeFindMissingDenominator: true,
        includeSimplifyFraction: true,
        includeIdentifyEquivalent: false,
        maxNumerator: 24,
        maxDenominator: 24,
        targetDenominatorMax: 48,
        includeImproperFractions: false,
        requireSimplestForm: true,
        showMultipleEquivalents: false
      },
      
      parameterSchema: {
        problemCount: {
          type: 'number',
          label: 'Number of Problems',
          description: 'How many equivalent fraction problems to generate',
          min: 1,
          max: 100,
          required: true
        },
        includeFindMissingNumerator: {
          type: 'boolean',
          label: 'Include Find Missing Numerator',
          description: 'Include problems like "2/3 = ?/12"'
        },
        includeFindMissingDenominator: {
          type: 'boolean',
          label: 'Include Find Missing Denominator',
          description: 'Include problems like "2/3 = 8/?"'
        },
        includeSimplifyFraction: {
          type: 'boolean',
          label: 'Include Simplify Fraction',
          description: 'Include problems like "8/12 = ?"'
        },
        includeIdentifyEquivalent: {
          type: 'boolean',
          label: 'Include Identify Equivalent',
          description: 'Include problems asking to identify equivalent fractions'
        },
        maxNumerator: {
          type: 'number',
          label: 'Maximum Original Numerator',
          description: 'Largest numerator for the original fraction',
          min: 1,
          max: 50,
          required: true
        },
        maxDenominator: {
          type: 'number',
          label: 'Maximum Original Denominator',
          description: 'Largest denominator for the original fraction',
          min: 2,
          max: 50,
          required: true
        },
        targetDenominatorMax: {
          type: 'number',
          label: 'Maximum Target Denominator',
          description: 'Largest denominator for equivalent fractions',
          min: 2,
          max: 100,
          required: true
        },
        includeImproperFractions: {
          type: 'boolean',
          label: 'Include Improper Fractions',
          description: 'Include fractions where numerator ≥ denominator'
        },
        requireSimplestForm: {
          type: 'boolean',
          label: 'Require Simplest Form',
          description: 'When simplifying, require the simplest possible form'
        },
        showMultipleEquivalents: {
          type: 'boolean',
          label: 'Show Multiple Equivalents',
          description: 'Show multiple equivalent forms in some problems'
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
    if (params.includeFindMissingNumerator) enabledTypes.push('find-missing-numerator')
    if (params.includeFindMissingDenominator) enabledTypes.push('find-missing-denominator')
    if (params.includeSimplifyFraction) enabledTypes.push('simplify-fraction')
    if (params.includeIdentifyEquivalent) enabledTypes.push('identify-equivalent')
    
    if (enabledTypes.length === 0) {
      throw new Error('At least one problem type must be enabled')
    }
    
    const problemType = this.getRandomElement(enabledTypes)
    
    switch (problemType) {
      case 'find-missing-numerator':
        return this.generateFindMissingNumeratorProblem(params)
      case 'find-missing-denominator':
        return this.generateFindMissingDenominatorProblem(params)
      case 'simplify-fraction':
        return this.generateSimplifyFractionProblem(params)
      case 'identify-equivalent':
        return this.generateIdentifyEquivalentProblem(params)
      default:
        return this.generateFindMissingNumeratorProblem(params)
    }
  }

  generateFindMissingNumeratorProblem(params) {
    // Start with a simple fraction
    const originalFraction = this.generateSimpleFraction(params)
    
    // Find a target denominator that is a multiple of the original denominator
    const multiplier = this.getRandomNumber(2, Math.floor(params.targetDenominatorMax / originalFraction.denominator))
    const targetDenominator = originalFraction.denominator * multiplier
    const targetNumerator = originalFraction.numerator * multiplier
    
    const questionText = `Find the missing numerator: ${originalFraction.numerator}/${originalFraction.denominator} = ?/${targetDenominator}`
    const questionLaTeX = `\\text{Find the missing numerator: } \\frac{${originalFraction.numerator}}{${originalFraction.denominator}} = \\frac{?}{${targetDenominator}}`
    
    const steps = [
      `\\frac{${originalFraction.numerator}}{${originalFraction.denominator}} = \\frac{?}{${targetDenominator}}`,
      `\\text{Multiply both numerator and denominator by } ${multiplier}`,
      `\\frac{${originalFraction.numerator} \\times ${multiplier}}{${originalFraction.denominator} \\times ${multiplier}} = \\frac{${targetNumerator}}{${targetDenominator}}`
    ]
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: targetNumerator.toString(),
      answerLaTeX: targetNumerator.toString(),
      steps: steps,
      metadata: {
        operation: 'find-missing-numerator',
        originalFraction: originalFraction,
        targetFraction: { numerator: targetNumerator, denominator: targetDenominator },
        multiplier: multiplier,
        difficulty: this.difficulty,
        estimatedTime: '45 seconds'
      }
    }
  }

  generateFindMissingDenominatorProblem(params) {
    // Start with a simple fraction
    const originalFraction = this.generateSimpleFraction(params)
    
    // Generate a multiplier and target numerator
    const multiplier = this.getRandomNumber(2, 8)
    const targetNumerator = originalFraction.numerator * multiplier
    const targetDenominator = originalFraction.denominator * multiplier
    
    const questionText = `Find the missing denominator: ${originalFraction.numerator}/${originalFraction.denominator} = ${targetNumerator}/?`
    const questionLaTeX = `\\text{Find the missing denominator: } \\frac{${originalFraction.numerator}}{${originalFraction.denominator}} = \\frac{${targetNumerator}}{?}`
    
    const steps = [
      `\\frac{${originalFraction.numerator}}{${originalFraction.denominator}} = \\frac{${targetNumerator}}{?}`,
      `\\text{The numerator was multiplied by } ${multiplier} \\text{ (since } ${originalFraction.numerator} \\times ${multiplier} = ${targetNumerator}\\text{)}`,
      `\\text{So the denominator must also be multiplied by } ${multiplier}`,
      `${originalFraction.denominator} \\times ${multiplier} = ${targetDenominator}`
    ]
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: targetDenominator.toString(),
      answerLaTeX: targetDenominator.toString(),
      steps: steps,
      metadata: {
        operation: 'find-missing-denominator',
        originalFraction: originalFraction,
        targetFraction: { numerator: targetNumerator, denominator: targetDenominator },
        multiplier: multiplier,
        difficulty: this.difficulty,
        estimatedTime: '50 seconds'
      }
    }
  }

  generateSimplifyFractionProblem(params) {
    // Generate a fraction that can be simplified
    const simplifiedFraction = this.generateSimpleFraction(params)
    const multiplier = this.getRandomNumber(2, 6)
    
    const originalNumerator = simplifiedFraction.numerator * multiplier
    const originalDenominator = simplifiedFraction.denominator * multiplier
    
    const questionText = `Simplify the fraction: ${originalNumerator}/${originalDenominator}`
    const questionLaTeX = `\\text{Simplify the fraction: } \\frac{${originalNumerator}}{${originalDenominator}}`
    
    const gcdValue = this.gcd(originalNumerator, originalDenominator)
    
    const steps = [
      `\\frac{${originalNumerator}}{${originalDenominator}}`,
      `\\text{Find the GCD of } ${originalNumerator} \\text{ and } ${originalDenominator}`,
      `\\text{GCD} = ${gcdValue}`,
      `\\frac{${originalNumerator} \\div ${gcdValue}}{${originalDenominator} \\div ${gcdValue}} = \\frac{${simplifiedFraction.numerator}}{${simplifiedFraction.denominator}}`
    ]
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `${simplifiedFraction.numerator}/${simplifiedFraction.denominator}`,
      answerLaTeX: `\\frac{${simplifiedFraction.numerator}}{${simplifiedFraction.denominator}}`,
      steps: steps,
      metadata: {
        operation: 'simplify-fraction',
        originalFraction: { numerator: originalNumerator, denominator: originalDenominator },
        simplifiedFraction: simplifiedFraction,
        gcd: gcdValue,
        difficulty: this.difficulty,
        estimatedTime: '75 seconds'
      }
    }
  }

  generateIdentifyEquivalentProblem(params) {
    // Generate a base fraction
    const baseFraction = this.generateSimpleFraction(params)
    
    // Generate several equivalent and non-equivalent fractions
    const options = []
    
    // Add correct equivalent fractions
    const multiplier1 = this.getRandomNumber(2, 4)
    const multiplier2 = this.getRandomNumber(5, 8)
    
    options.push({
      numerator: baseFraction.numerator * multiplier1,
      denominator: baseFraction.denominator * multiplier1,
      isEquivalent: true
    })
    
    options.push({
      numerator: baseFraction.numerator * multiplier2,
      denominator: baseFraction.denominator * multiplier2,
      isEquivalent: true
    })
    
    // Add incorrect fractions
    options.push({
      numerator: baseFraction.numerator + 1,
      denominator: baseFraction.denominator,
      isEquivalent: false
    })
    
    options.push({
      numerator: baseFraction.numerator,
      denominator: baseFraction.denominator + 1,
      isEquivalent: false
    })
    
    // Pick one correct answer
    const correctOptions = options.filter(opt => opt.isEquivalent)
    const correctAnswer = this.getRandomElement(correctOptions)
    
    const questionText = `Which fraction is equivalent to ${baseFraction.numerator}/${baseFraction.denominator}?`
    const questionLaTeX = `\\text{Which fraction is equivalent to } \\frac{${baseFraction.numerator}}{${baseFraction.denominator}}\\text{?}`
    
    const optionsText = options.map((opt, index) => 
      `${String.fromCharCode(65 + index)}) ${opt.numerator}/${opt.denominator}`
    ).join('  ')
    
    const steps = [
      `\\text{Check each option by cross-multiplying or simplifying}`,
      `\\frac{${correctAnswer.numerator}}{${correctAnswer.denominator}} = \\frac{${baseFraction.numerator}}{${baseFraction.denominator}}`,
      `\\text{Both can be simplified to the same form}`
    ]
    
    return {
      question: `${questionText}\n${optionsText}`,
      questionLaTeX: questionLaTeX,
      answer: `${correctAnswer.numerator}/${correctAnswer.denominator}`,
      answerLaTeX: `\\frac{${correctAnswer.numerator}}{${correctAnswer.denominator}}`,
      steps: steps,
      metadata: {
        operation: 'identify-equivalent',
        baseFraction: baseFraction,
        options: options,
        correctAnswer: correctAnswer,
        difficulty: this.difficulty,
        estimatedTime: '90 seconds'
      }
    }
  }

  generateSimpleFraction(params) {
    let numerator, denominator
    
    do {
      denominator = this.getRandomNumber(2, params.maxDenominator)
      
      if (params.includeImproperFractions) {
        numerator = this.getRandomNumber(1, params.maxNumerator)
      } else {
        numerator = this.getRandomNumber(1, Math.min(params.maxNumerator, denominator - 1))
      }
      
      // Ensure the fraction is in simplest form
    } while (this.gcd(numerator, denominator) !== 1)
    
    return {
      numerator,
      denominator,
      decimal: numerator / denominator,
      latex: `\\frac{${numerator}}{${denominator}}`
    }
  }

  generateEquivalentFraction(baseFraction, targetDenominator) {
    if (targetDenominator % baseFraction.denominator !== 0) {
      return null // Cannot create equivalent fraction with this denominator
    }
    
    const multiplier = targetDenominator / baseFraction.denominator
    return {
      numerator: baseFraction.numerator * multiplier,
      denominator: targetDenominator,
      multiplier: multiplier
    }
  }

  getMultiples(number, max, count = 5) {
    const multiples = []
    for (let i = 2; i <= count + 1 && number * i <= max; i++) {
      multiples.push(number * i)
    }
    return multiples
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

export default EquivalentFractionsGenerator