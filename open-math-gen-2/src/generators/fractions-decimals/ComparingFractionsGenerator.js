import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Comparing Fractions Generator
 * Generates problems involving comparing fractions using <, >, and = symbols
 */
export class ComparingFractionsGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
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
        questionLaTeX: '\\text{Compare: } \\frac{2}{3} \\; \\square \\; \\frac{3}{4}',
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
                description: 'How many fraction comparison problems to generate',
                min: 1,
                max: 50,
                required: true,
                slider: true,
                presets: [5, 8, 10, 15],
                order: 1
              })
            }
          }),
          
          comparisonTypes: schemaV2.createCategory({
            id: 'comparisonTypes',
            label: 'Comparison Types',
            description: 'Choose which types of comparison problems to include',
            icon: 'compare',
            color: 'green',
            order: 2,
            parameters: {
              includeTwoFractions: schemaV2.createParameter({
                type: 'boolean',
                label: 'Two Fractions',
                description: 'Compare two fractions using <, >, or =',
                helpText: 'Example: 2/3 ___ 3/4 (Answer: <)',
                order: 1
              }),
              includeThreeFractions: schemaV2.createParameter({
                type: 'boolean',
                label: 'Three Fractions',
                description: 'Order three fractions from smallest to largest',
                helpText: 'Example: Order 1/2, 2/3, 3/5 from least to greatest',
                order: 2
              }),
              includeFractionDecimal: schemaV2.createParameter({
                type: 'boolean',
                label: 'Fraction vs Decimal',
                description: 'Compare fractions with decimal numbers',
                helpText: 'Example: 3/4 ___ 0.8 (Answer: <)',
                order: 3
              })
            }
          }),
          
          denominatorTypes: schemaV2.createCategory({
            id: 'denominatorTypes',
            label: 'Denominator Types',
            description: 'Control the difficulty based on denominators',
            icon: 'pie_chart',
            color: 'purple',
            order: 3,
            parameters: {
              includeLikeDenominators: schemaV2.createParameter({
                type: 'boolean',
                label: 'Like Denominators',
                description: 'Include problems with same denominators (easier)',
                helpText: 'Examples: 2/5 vs 3/5, 1/8 vs 7/8',
                order: 1
              }),
              includeUnlikeDenominators: schemaV2.createParameter({
                type: 'boolean',
                label: 'Unlike Denominators',
                description: 'Include problems with different denominators (harder)',
                helpText: 'Examples: 1/3 vs 2/5, 3/4 vs 5/6',
                order: 2
              })
            }
          }),
          
          fractionProperties: schemaV2.createCategory({
            id: 'fractionProperties',
            label: 'Fraction Properties',
            description: 'Control the types of fractions included',
            icon: 'layers',
            color: 'orange',
            order: 4,
            parameters: {
              includeMixedNumbers: schemaV2.createParameter({
                type: 'boolean',
                label: 'Include Mixed Numbers',
                description: 'Include mixed numbers in comparison problems',
                helpText: 'Examples: 1 1/2 vs 2/3, 2 1/4 vs 2.5',
                order: 1
              })
            }
          }),
          
          numberRanges: schemaV2.createCategory({
            id: 'numberRanges',
            label: 'Number Ranges',
            description: 'Control the size of numerators and denominators',
            icon: 'tag',
            color: 'teal',
            order: 5,
            parameters: {
              maxNumerator: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Numerator',
                description: 'Largest numerator to use in fractions',
                min: 1,
                max: 20,
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
                max: 20,
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
            description: 'Control how solutions are presented',
            icon: 'visibility',
            color: 'pink',
            order: 6,
            parameters: {
              showWorkSteps: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Work Steps',
                description: 'Show steps for finding common denominators',
                helpText: 'Displays the process of converting to equivalent fractions',
                order: 1
              }),
              forceCommonDenominators: schemaV2.createParameter({
                type: 'boolean',
                label: 'Force Common Denominators',
                description: 'Always use common denominators in solution steps',
                helpText: 'Shows common denominator method even for like denominators',
                order: 2
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'like-denominators-only',
            label: 'Like Denominators Only',
            description: 'Simple comparisons with same denominators',
            icon: 'looks_one',
            category: 'difficulty',
            values: {
              problemCount: 10,
              includeTwoFractions: true,
              includeThreeFractions: false,
              includeFractionDecimal: false,
              maxNumerator: 10,
              maxDenominator: 12,
              includeLikeDenominators: true,
              includeUnlikeDenominators: false,
              includeMixedNumbers: false,
              showWorkSteps: false,
              forceCommonDenominators: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'unlike-denominators-practice',
            label: 'Unlike Denominators Practice',
            description: 'Practice with different denominators requiring common denominators',
            icon: 'compare_arrows',
            category: 'difficulty',
            values: {
              problemCount: 12,
              includeTwoFractions: true,
              includeThreeFractions: false,
              includeFractionDecimal: false,
              maxNumerator: 12,
              maxDenominator: 12,
              includeLikeDenominators: false,
              includeUnlikeDenominators: true,
              includeMixedNumbers: false,
              showWorkSteps: true,
              forceCommonDenominators: true
            }
          }),
          
          schemaV2.createPreset({
            id: 'ordering-practice',
            label: 'Ordering Practice',
            description: 'Practice ordering three fractions from least to greatest',
            icon: 'sort',
            category: 'scope',
            values: {
              problemCount: 8,
              includeTwoFractions: false,
              includeThreeFractions: true,
              includeFractionDecimal: false,
              maxNumerator: 10,
              maxDenominator: 10,
              includeLikeDenominators: true,
              includeUnlikeDenominators: true,
              includeMixedNumbers: false,
              showWorkSteps: true,
              forceCommonDenominators: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'mixed-numbers-comparisons',
            label: 'Mixed Numbers Comparisons',
            description: 'Compare fractions, mixed numbers, and decimals',
            icon: 'layers',
            category: 'scope',
            values: {
              problemCount: 10,
              includeTwoFractions: true,
              includeThreeFractions: false,
              includeFractionDecimal: true,
              maxNumerator: 8,
              maxDenominator: 8,
              includeLikeDenominators: true,
              includeUnlikeDenominators: true,
              includeMixedNumbers: true,
              showWorkSteps: true,
              forceCommonDenominators: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive-comparisons',
            label: 'Comprehensive Comparisons',
            description: 'Mixed practice with all comparison types',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 15,
              includeTwoFractions: true,
              includeThreeFractions: true,
              includeFractionDecimal: true,
              maxNumerator: 15,
              maxDenominator: 12,
              includeLikeDenominators: true,
              includeUnlikeDenominators: true,
              includeMixedNumbers: true,
              showWorkSteps: true,
              forceCommonDenominators: false
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
    if (!params.includeLikeDenominators && !params.includeUnlikeDenominators) {
      customErrors.push('At least one denominator type must be enabled')
    }
    if (!params.includeTwoFractions && !params.includeThreeFractions && !params.includeFractionDecimal) {
      customErrors.push('At least one comparison type must be enabled')
    }
    if (customErrors.length > 0) {
      throw new Error(`Invalid parameters: ${customErrors.join(', ')}`)
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
    const questionLaTeX = `\\text{Compare: } \\frac{${fraction1.numerator}}{${fraction1.denominator}} \\; \\square \\; \\frac{${fraction2.numerator}}{${fraction2.denominator}}`
    
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
    const questionLaTeX = `\\text{Compare: } \\frac{${fraction.numerator}}{${fraction.denominator}} \\; \\square \\; ${decimal}`
    
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