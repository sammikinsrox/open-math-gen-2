import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Equivalent Fractions Generator
 * Generates problems involving finding equivalent fractions and simplifying fractions
 */
export class EquivalentFractionsGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
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
                description: 'How many equivalent fraction problems to generate',
                min: 1,
                max: 50,
                required: true,
                slider: true,
                presets: [5, 8, 10, 15],
                order: 1
              })
            }
          }),
          
          problemTypes: schemaV2.createCategory({
            id: 'problemTypes',
            label: 'Problem Types',
            description: 'Choose which types of equivalent fraction problems to include',
            icon: 'compare_arrows',
            color: 'green',
            order: 2,
            parameters: {
              includeFindMissingNumerator: schemaV2.createParameter({
                type: 'boolean',
                label: 'Find Missing Numerator',
                description: 'Find the missing top number in equivalent fractions',
                helpText: 'Example: 2/3 = ?/12 (Answer: 8)',
                order: 1
              }),
              includeFindMissingDenominator: schemaV2.createParameter({
                type: 'boolean',
                label: 'Find Missing Denominator',
                description: 'Find the missing bottom number in equivalent fractions',
                helpText: 'Example: 2/3 = 8/? (Answer: 12)',
                order: 2
              }),
              includeSimplifyFraction: schemaV2.createParameter({
                type: 'boolean',
                label: 'Simplify Fractions',
                description: 'Reduce fractions to their simplest form',
                helpText: 'Example: 8/12 = ? (Answer: 2/3)',
                order: 3
              }),
              includeIdentifyEquivalent: schemaV2.createParameter({
                type: 'boolean',
                label: 'Identify Equivalent',
                description: 'Identify which fractions are equivalent',
                helpText: 'Example: Which equals 1/2? a) 2/4 b) 3/5 c) 4/9',
                order: 4
              })
            }
          }),
          
          fractionProperties: schemaV2.createCategory({
            id: 'fractionProperties',
            label: 'Fraction Properties',
            description: 'Control the types and complexity of fractions',
            icon: 'pie_chart',
            color: 'purple',
            order: 3,
            parameters: {
              includeImproperFractions: schemaV2.createParameter({
                type: 'boolean',
                label: 'Include Improper Fractions',
                description: 'Include fractions where numerator ≥ denominator',
                helpText: 'Examples: 5/3, 7/4, 8/5',
                order: 1
              }),
              showMultipleEquivalents: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Multiple Equivalents',
                description: 'Show multiple equivalent forms in some problems',
                helpText: 'Example: 1/2 = 2/4 = 3/6 = 4/8',
                order: 2
              })
            }
          }),
          
          numberRanges: schemaV2.createCategory({
            id: 'numberRanges',
            label: 'Number Ranges',
            description: 'Control the size of numerators and denominators',
            icon: 'tag',
            color: 'orange',
            order: 4,
            parameters: {
              maxNumerator: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Original Numerator',
                description: 'Largest numerator for the starting fraction',
                min: 1,
                max: 30,
                required: true,
                slider: true,
                presets: [12, 18, 24, 30],
                helpText: 'Top number in the original fraction',
                order: 1
              }),
              maxDenominator: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Original Denominator',
                description: 'Largest denominator for the starting fraction',
                min: 2,
                max: 30,
                required: true,
                slider: true,
                presets: [12, 18, 24, 30],
                helpText: 'Bottom number in the original fraction',
                order: 2
              }),
              targetDenominatorMax: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Target Denominator',
                description: 'Largest denominator for equivalent fractions',
                min: 2,
                max: 60,
                required: true,
                slider: true,
                presets: [24, 36, 48, 60],
                helpText: 'Controls how large equivalent fractions can get',
                order: 3
              })
            }
          }),
          
          displayOptions: schemaV2.createCategory({
            id: 'displayOptions',
            label: 'Display Options',
            description: 'Control how answers are formatted',
            icon: 'visibility',
            color: 'pink',
            order: 5,
            parameters: {
              requireSimplestForm: schemaV2.createParameter({
                type: 'boolean',
                label: 'Require Simplest Form',
                description: 'When simplifying, require the most reduced form',
                helpText: 'Ensures answers are fully simplified (e.g., 2/3 not 4/6)',
                order: 1
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'basic-equivalents',
            label: 'Basic Equivalents',
            description: 'Simple equivalent fraction problems for beginners',
            icon: 'looks_one',
            category: 'difficulty',
            values: {
              problemCount: 10,
              includeFindMissingNumerator: true,
              includeFindMissingDenominator: true,
              includeSimplifyFraction: false,
              includeIdentifyEquivalent: false,
              maxNumerator: 12,
              maxDenominator: 12,
              targetDenominatorMax: 24,
              includeImproperFractions: false,
              requireSimplestForm: true,
              showMultipleEquivalents: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'simplification-focus',
            label: 'Simplification Focus',
            description: 'Practice reducing fractions to simplest form',
            icon: 'compress',
            category: 'scope',
            values: {
              problemCount: 12,
              includeFindMissingNumerator: false,
              includeFindMissingDenominator: false,
              includeSimplifyFraction: true,
              includeIdentifyEquivalent: false,
              maxNumerator: 20,
              maxDenominator: 16,
              targetDenominatorMax: 32,
              includeImproperFractions: false,
              requireSimplestForm: true,
              showMultipleEquivalents: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'missing-numbers-practice',
            label: 'Missing Numbers Practice',
            description: 'Find missing numerators and denominators',
            icon: 'help_outline',
            category: 'scope',
            values: {
              problemCount: 15,
              includeFindMissingNumerator: true,
              includeFindMissingDenominator: true,
              includeSimplifyFraction: false,
              includeIdentifyEquivalent: false,
              maxNumerator: 18,
              maxDenominator: 15,
              targetDenominatorMax: 45,
              includeImproperFractions: false,
              requireSimplestForm: true,
              showMultipleEquivalents: true
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive-equivalents',
            label: 'Comprehensive Equivalents',
            description: 'Mixed practice with all equivalent fraction concepts',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 16,
              includeFindMissingNumerator: true,
              includeFindMissingDenominator: true,
              includeSimplifyFraction: true,
              includeIdentifyEquivalent: true,
              maxNumerator: 24,
              maxDenominator: 20,
              targetDenominatorMax: 48,
              includeImproperFractions: true,
              requireSimplestForm: true,
              showMultipleEquivalents: true
            }
          })
        ]
      })
    })
  }

  generateProblem(parameters = {}) {
    const params = { ...this.defaultParameters, ...parameters }
    
    // Validate parameters using Parameter Schema V2
    const validation = this.parameterSchema.validate(params)
    if (!validation.isValid) {
      throw new Error(`Invalid parameters: ${validation.errors.join(', ')}`)
    }
    
    // Additional custom validation
    const customErrors = []
    if (params.targetDenominatorMax < params.maxDenominator) {
      customErrors.push('Maximum Target Denominator should be at least as large as Maximum Original Denominator')
    }
    if (customErrors.length > 0) {
      throw new Error(`Invalid parameters: ${customErrors.join(', ')}`)
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