import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Fraction Addition Generator
 * Generates fraction addition problems
 */
export class FractionAdditionGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
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
                description: 'How many fraction addition problems to generate',
                min: 1,
                max: 50,
                required: true,
                slider: true,
                presets: [5, 8, 10, 15],
                order: 1
              })
            }
          }),
          
          fractionProperties: schemaV2.createCategory({
            id: 'fractionProperties',
            label: 'Fraction Properties',
            description: 'Control the types and complexity of fractions',
            icon: 'pie_chart',
            color: 'green',
            order: 2,
            parameters: {
              allowMixedNumbers: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Mixed Numbers',
                description: 'Include mixed number fractions in problems',
                helpText: 'Examples: 1 1/2, 2 3/4, 3 2/5',
                order: 1
              }),
              commonDenominators: schemaV2.createParameter({
                type: 'boolean',
                label: 'Common Denominators Only',
                description: 'Only generate problems with same denominators',
                helpText: 'Easier problems like 1/4 + 2/4 instead of 1/3 + 1/4',
                order: 2
              })
            }
          }),
          
          numberRanges: schemaV2.createCategory({
            id: 'numberRanges',
            label: 'Number Ranges',
            description: 'Control the size of numerators and denominators',
            icon: 'tag',
            color: 'purple',
            order: 3,
            parameters: {
              maxNumerator: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Numerator',
                description: 'Largest numerator to use in fractions',
                min: 1,
                max: 25,
                required: true,
                slider: true,
                presets: [8, 12, 15, 20],
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
                presets: [8, 10, 12, 16],
                helpText: 'Bottom number in fractions',
                order: 2
              })
            }
          }),
          
          displayOptions: schemaV2.createCategory({
            id: 'displayOptions',
            label: 'Display Options',
            description: 'Control how answers are formatted',
            icon: 'visibility',
            color: 'orange',
            order: 4,
            parameters: {
              requireSimplification: schemaV2.createParameter({
                type: 'boolean',
                label: 'Require Simplification',
                description: 'Answers must be in simplest form',
                helpText: 'Convert answers like 6/8 to 3/4',
                order: 1
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'like-denominators',
            label: 'Like Denominators',
            description: 'Simple addition with same denominators',
            icon: 'looks_one',
            category: 'difficulty',
            values: {
              problemCount: 10,
              maxNumerator: 8,
              maxDenominator: 10,
              allowMixedNumbers: false,
              requireSimplification: true,
              commonDenominators: true
            }
          }),
          
          schemaV2.createPreset({
            id: 'unlike-denominators',
            label: 'Unlike Denominators',
            description: 'Addition requiring common denominators',
            icon: 'add_circle',
            category: 'difficulty',
            values: {
              problemCount: 12,
              maxNumerator: 12,
              maxDenominator: 12,
              allowMixedNumbers: false,
              requireSimplification: true,
              commonDenominators: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'mixed-numbers-practice',
            label: 'Mixed Numbers Practice',
            description: 'Addition with mixed numbers included',
            icon: 'layers',
            category: 'scope',
            values: {
              problemCount: 10,
              maxNumerator: 10,
              maxDenominator: 8,
              allowMixedNumbers: true,
              requireSimplification: true,
              commonDenominators: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive-addition',
            label: 'Comprehensive Addition',
            description: 'Mixed practice with all fraction addition types',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 15,
              maxNumerator: 15,
              maxDenominator: 12,
              allowMixedNumbers: true,
              requireSimplification: true,
              commonDenominators: false
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
    if (params.maxNumerator > params.maxDenominator && !params.allowMixedNumbers) {
      customErrors.push('Maximum Numerator should not exceed Maximum Denominator when mixed numbers are not allowed')
    }
    if (customErrors.length > 0) {
      throw new Error(`Invalid parameters: ${customErrors.join(', ')}`)
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