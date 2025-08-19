import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Fraction Operations Generator
 * Generates problems involving addition, subtraction, multiplication, and division of fractions
 */
export class FractionOperationsGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
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
                description: 'How many fraction operation problems to generate',
                min: 1,
                max: 50,
                required: true,
                slider: true,
                presets: [5, 8, 10, 15],
                order: 1
              })
            }
          }),
          
          operations: schemaV2.createCategory({
            id: 'operations',
            label: 'Operations',
            description: 'Choose which fraction operations to include',
            icon: 'calculate',
            color: 'green',
            order: 2,
            parameters: {
              includeAddition: schemaV2.createParameter({
                type: 'boolean',
                label: 'Addition',
                description: 'Include fraction addition problems',
                helpText: 'Example: 1/4 + 2/3 = 11/12',
                order: 1
              }),
              includeSubtraction: schemaV2.createParameter({
                type: 'boolean',
                label: 'Subtraction',
                description: 'Include fraction subtraction problems',
                helpText: 'Example: 3/4 - 1/3 = 5/12',
                order: 2
              }),
              includeMultiplication: schemaV2.createParameter({
                type: 'boolean',
                label: 'Multiplication',
                description: 'Include fraction multiplication problems',
                helpText: 'Example: 2/3 × 3/4 = 6/12 = 1/2',
                order: 3
              }),
              includeDivision: schemaV2.createParameter({
                type: 'boolean',
                label: 'Division',
                description: 'Include fraction division problems',
                helpText: 'Example: 2/3 ÷ 1/4 = 2/3 × 4/1 = 8/3',
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
                description: 'Allow fractions where numerator > denominator',
                helpText: 'Examples: 5/3, 7/4, 9/5',
                order: 1
              }),
              allowMixedNumbers: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Mixed Numbers',
                description: 'Include mixed numbers in problems',
                helpText: 'Examples: 1 1/2, 2 3/4, 3 2/5',
                order: 2
              }),
              useLikeDenonimators: schemaV2.createParameter({
                type: 'boolean',
                label: 'Use Like Denominators',
                description: 'Use fractions with same denominators for easier problems',
                helpText: 'Makes addition/subtraction easier by avoiding common denominator steps',
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
            color: 'pink',
            order: 5,
            parameters: {
              requireSimplifiedAnswers: schemaV2.createParameter({
                type: 'boolean',
                label: 'Require Simplified Answers',
                description: 'Answers should be in simplest form',
                helpText: 'Convert fractions like 6/8 to 3/4',
                order: 1
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'basic-addition-subtraction',
            label: 'Basic Addition & Subtraction',
            description: 'Simple addition and subtraction with like denominators',
            icon: 'add_circle',
            category: 'difficulty',
            values: {
              problemCount: 10,
              includeAddition: true,
              includeSubtraction: true,
              includeMultiplication: false,
              includeDivision: false,
              maxNumerator: 8,
              maxDenominator: 10,
              allowImproperFractions: false,
              requireSimplifiedAnswers: true,
              allowMixedNumbers: false,
              useLikeDenonimators: true
            }
          }),
          
          schemaV2.createPreset({
            id: 'addition-subtraction-practice',
            label: 'Addition & Subtraction Practice',
            description: 'Addition and subtraction with different denominators',
            icon: 'calculate',
            category: 'scope',
            values: {
              problemCount: 12,
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
            }
          }),
          
          schemaV2.createPreset({
            id: 'multiplication-division-focus',
            label: 'Multiplication & Division Focus',
            description: 'Practice multiplying and dividing fractions',
            icon: 'close',
            category: 'scope',
            values: {
              problemCount: 10,
              includeAddition: false,
              includeSubtraction: false,
              includeMultiplication: true,
              includeDivision: true,
              maxNumerator: 10,
              maxDenominator: 8,
              allowImproperFractions: true,
              requireSimplifiedAnswers: true,
              allowMixedNumbers: false,
              useLikeDenonimators: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive-operations',
            label: 'Comprehensive Operations',
            description: 'Mixed practice with all four operations',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 16,
              includeAddition: true,
              includeSubtraction: true,
              includeMultiplication: true,
              includeDivision: true,
              maxNumerator: 12,
              maxDenominator: 10,
              allowImproperFractions: true,
              requireSimplifiedAnswers: true,
              allowMixedNumbers: false,
              useLikeDenonimators: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'advanced-challenge',
            label: 'Advanced Challenge',
            description: 'Complex problems with larger numbers and mixed numbers',
            icon: 'functions',
            category: 'difficulty',
            values: {
              problemCount: 12,
              includeAddition: true,
              includeSubtraction: true,
              includeMultiplication: true,
              includeDivision: true,
              maxNumerator: 20,
              maxDenominator: 16,
              allowImproperFractions: true,
              requireSimplifiedAnswers: true,
              allowMixedNumbers: true,
              useLikeDenonimators: false
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