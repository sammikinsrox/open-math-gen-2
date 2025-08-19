import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Basic Fractions Generator
 * Generates problems involving basic fraction concepts and visualization
 */
export class BasicFractionsGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
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
                description: 'How many fraction problems to generate',
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
            description: 'Choose which types of fraction problems to include',
            icon: 'quiz',
            color: 'green',
            order: 2,
            parameters: {
              includeIdentify: schemaV2.createParameter({
                type: 'boolean',
                label: 'Identify Fractions',
                description: 'Include problems asking to identify fractions from descriptions',
                helpText: 'Examples: "What fraction represents 3 out of 8 parts?"',
                order: 1
              }),
              includeShade: schemaV2.createParameter({
                type: 'boolean',
                label: 'Shade Fractions',
                description: 'Include problems asking to shade fractions',
                helpText: 'Examples: "Shade 3/4 of the shape"',
                order: 2
              }),
              includeWrite: schemaV2.createParameter({
                type: 'boolean',
                label: 'Write Fractions',
                description: 'Include problems asking to write fractions',
                helpText: 'Examples: "Write the fraction for 5 out of 12 parts"',
                order: 3
              }),
              includeCompare: schemaV2.createParameter({
                type: 'boolean',
                label: 'Compare Fractions',
                description: 'Include problems asking to compare two fractions',
                helpText: 'Examples: "Compare 2/3 and 3/4 using <, >, or ="',
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
              allowImproperFractions: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Improper Fractions',
                description: 'Include fractions where numerator > denominator',
                helpText: 'Examples: 5/3, 7/4, 9/5',
                order: 1
              }),
              allowWholeNumbers: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Whole Numbers',
                description: 'Include problems resulting in whole numbers',
                helpText: 'Examples: 4/4 = 1, 8/4 = 2',
                order: 2
              }),
              requireSimplified: schemaV2.createParameter({
                type: 'boolean',
                label: 'Require Simplified Form',
                description: 'Answers should be in simplest form',
                helpText: 'Convert fractions like 6/8 to 3/4',
                order: 3
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
                label: 'Maximum Numerator',
                description: 'Largest numerator to use in fractions',
                min: 1,
                max: 25,
                required: true,
                slider: true,
                presets: [5, 8, 12, 16],
                helpText: 'Top number in fractions',
                order: 1
              }),
              maxDenominator: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Denominator',
                description: 'Largest denominator to use in fractions',
                min: 2,
                max: 25,
                required: true,
                slider: true,
                presets: [6, 10, 12, 16],
                helpText: 'Bottom number in fractions',
                order: 2
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'elementary-basics',
            label: 'Elementary Basics',
            description: 'Simple fraction identification and writing for grades 3-4',
            icon: 'looks_one',
            category: 'difficulty',
            values: {
              problemCount: 10,
              maxNumerator: 6,
              maxDenominator: 8,
              includeIdentify: true,
              includeShade: true,
              includeWrite: true,
              includeCompare: false,
              allowImproperFractions: false,
              allowWholeNumbers: false,
              requireSimplified: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'visual-practice',
            label: 'Visual Practice',
            description: 'Focus on shading and visual fraction representation',
            icon: 'palette',
            category: 'scope',
            values: {
              problemCount: 8,
              maxNumerator: 8,
              maxDenominator: 10,
              includeIdentify: true,
              includeShade: true,
              includeWrite: false,
              includeCompare: false,
              allowImproperFractions: false,
              allowWholeNumbers: true,
              requireSimplified: true
            }
          }),
          
          schemaV2.createPreset({
            id: 'comparison-focus',
            label: 'Comparison Focus',
            description: 'Practice comparing and ordering fractions',
            icon: 'compare_arrows',
            category: 'scope',
            values: {
              problemCount: 10,
              maxNumerator: 10,
              maxDenominator: 12,
              includeIdentify: false,
              includeShade: false,
              includeWrite: true,
              includeCompare: true,
              allowImproperFractions: false,
              allowWholeNumbers: false,
              requireSimplified: true
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive-practice',
            label: 'Comprehensive Practice',
            description: 'Mixed practice with all fraction concepts',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 15,
              maxNumerator: 12,
              maxDenominator: 12,
              includeIdentify: true,
              includeShade: true,
              includeWrite: true,
              includeCompare: true,
              allowImproperFractions: true,
              allowWholeNumbers: true,
              requireSimplified: true
            }
          }),
          
          schemaV2.createPreset({
            id: 'advanced-challenge',
            label: 'Advanced Challenge',
            description: 'Complex fractions including improper fractions',
            icon: 'functions',
            category: 'difficulty',
            values: {
              problemCount: 12,
              maxNumerator: 20,
              maxDenominator: 16,
              includeIdentify: true,
              includeShade: false,
              includeWrite: true,
              includeCompare: true,
              allowImproperFractions: true,
              allowWholeNumbers: true,
              requireSimplified: true
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
    if (params.maxNumerator > params.maxDenominator && !params.allowImproperFractions) {
      customErrors.push('Maximum Numerator cannot exceed Maximum Denominator when improper fractions are not allowed')
    }
    if (customErrors.length > 0) {
      throw new Error(`Invalid parameters: ${customErrors.join(', ')}`)
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
    const questionLaTeX = `\\text{Compare: } ${fraction1.latex} \\square ${fraction2.latex}`
    
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