import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Exponents and Radicals Generator
 * 
 * Generates problems involving exponent rules, radical operations,
 * and simplifying expressions with powers and roots.
 */
export class ExponentsRadicalsGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Exponents & Radicals',
      description: 'Practice exponent rules, radical operations, and simplifying expressions with powers and roots',
      category: 'algebra',
      difficulty: 'medium',
      icon: 'functions',
      tags: ['algebra', 'exponents', 'radicals', 'powers', 'roots'],
      gradeLevel: '9-12',
      estimatedTime: '2-3 minutes',
      exampleProblem: {
        question: 'Simplify: x⁵ · x³',
        questionLaTeX: '\\text{Simplify: } x^5 \\cdot x^3',
        answer: 'x⁸',
        answerLaTeX: 'x^8'
      },
      
      // Default parameter values
      defaultParameters: {
        problemCount: 12,
        includeProductRule: true,
        includeQuotientRule: true,
        includePowerRule: true,
        includeNegativeExponents: false,
        includeRadicalSimplifying: true,
        includeRadicalOperations: true,
        includeRationalExponents: false,
        maxExponent: 10,
        maxCoefficient: 8,
        complexityLevel: 'basic'
      },
      
      // Parameter Schema V2
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
                description: 'How many exponent/radical problems to generate',
                min: 1,
                max: 30,
                required: true,
                slider: true,
                presets: [10, 12, 15, 20],
                order: 1
              }),
              complexityLevel: schemaV2.createParameter({
                type: 'select',
                label: 'Complexity Level',
                description: 'Determines the difficulty of problems',
                variant: 'cards',
                options: [
                  { value: 'basic', label: 'Basic', description: 'Simple exponent rules and basic radicals' },
                  { value: 'intermediate', label: 'Intermediate', description: 'Mixed operations and negative exponents' },
                  { value: 'advanced', label: 'Advanced', description: 'Rational exponents and complex expressions' }
                ],
                order: 2
              })
            }
          }),
          
          exponentRules: schemaV2.createCategory({
            id: 'exponentRules',
            label: 'Exponent Rules',
            description: 'Choose which exponent rules to practice',
            icon: 'trending_up',
            color: 'green',
            order: 2,
            parameters: {
              includeProductRule: schemaV2.createParameter({
                type: 'boolean',
                label: 'Product Rule',
                description: 'Multiply powers with same base',
                helpText: 'x^a · x^b = x^(a+b)',
                order: 1
              }),
              includeQuotientRule: schemaV2.createParameter({
                type: 'boolean',
                label: 'Quotient Rule',
                description: 'Divide powers with same base',
                helpText: 'x^a ÷ x^b = x^(a-b)',
                order: 2
              }),
              includePowerRule: schemaV2.createParameter({
                type: 'boolean',
                label: 'Power Rule',
                description: 'Raise a power to a power',
                helpText: '(x^a)^b = x^(ab)',
                order: 3
              }),
              includeNegativeExponents: schemaV2.createParameter({
                type: 'boolean',
                label: 'Negative Exponents',
                description: 'Work with negative exponents',
                helpText: 'x^(-a) = 1/x^a',
                order: 4
              })
            }
          }),
          
          radicals: schemaV2.createCategory({
            id: 'radicals',
            label: 'Radicals',
            description: 'Choose which radical operations to include',
            icon: 'filter_none',
            color: 'purple',
            order: 3,
            parameters: {
              includeRadicalSimplifying: schemaV2.createParameter({
                type: 'boolean',
                label: 'Simplifying Radicals',
                description: 'Simplify radical expressions',
                helpText: '√12 = 2√3',
                order: 1
              }),
              includeRadicalOperations: schemaV2.createParameter({
                type: 'boolean',
                label: 'Radical Operations',
                description: 'Add, subtract, multiply, divide radicals',
                helpText: '√8 + √18 = 5√2',
                order: 2
              }),
              includeRationalExponents: schemaV2.createParameter({
                type: 'boolean',
                label: 'Rational Exponents',
                description: 'Convert between radicals and rational exponents',
                helpText: '∛x = x^(1/3)',
                order: 3
              })
            }
          }),
          
          numberSettings: schemaV2.createCategory({
            id: 'numberSettings',
            label: 'Number Settings',
            description: 'Configure ranges for exponents and coefficients',
            icon: 'tag',
            color: 'orange',
            order: 4,
            parameters: {
              maxExponent: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Exponent',
                description: 'Largest exponent to use',
                min: 3,
                max: 15,
                required: true,
                slider: true,
                presets: [6, 8, 10, 12],
                order: 1
              }),
              maxCoefficient: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Coefficient',
                description: 'Largest coefficient to use',
                min: 3,
                max: 20,
                required: true,
                slider: true,
                presets: [6, 8, 10, 12],
                order: 2
              })
            }
          })
        },
        
        presets: [
          schemaV2.createPreset({
            id: 'exponent-rules',
            label: 'Exponent Rules',
            description: 'Focus on basic exponent rules',
            icon: 'trending_up',
            category: 'topic',
            values: {
              problemCount: 12,
              includeProductRule: true,
              includeQuotientRule: true,
              includePowerRule: true,
              includeNegativeExponents: false,
              includeRadicalSimplifying: false,
              includeRadicalOperations: false,
              includeRationalExponents: false,
              maxExponent: 8,
              maxCoefficient: 6,
              complexityLevel: 'basic'
            }
          }),
          
          schemaV2.createPreset({
            id: 'radical-practice',
            label: 'Radical Practice',
            description: 'Focus on radical operations',
            icon: 'functions',
            category: 'topic',
            values: {
              problemCount: 10,
              includeProductRule: false,
              includeQuotientRule: false,
              includePowerRule: false,
              includeNegativeExponents: false,
              includeRadicalSimplifying: true,
              includeRadicalOperations: true,
              includeRationalExponents: true,
              maxExponent: 6,
              maxCoefficient: 8,
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive',
            label: 'Comprehensive Practice',
            description: 'All exponent and radical concepts',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 15,
              includeProductRule: true,
              includeQuotientRule: true,
              includePowerRule: true,
              includeNegativeExponents: true,
              includeRadicalSimplifying: true,
              includeRadicalOperations: true,
              includeRationalExponents: true,
              maxExponent: 10,
              maxCoefficient: 8,
              complexityLevel: 'advanced'
            }
          })
        ]
      })
    })
  }

  generateProblem(parameters = {}) {
    const params = { ...this.defaultParameters, ...parameters }
    
    const validation = this.parameterSchema.validate(params)
    if (!validation.isValid) {
      throw new Error(`Invalid parameters: ${validation.errors.join(', ')}`)
    }
    
    const problemTypes = []
    if (params.includeProductRule) problemTypes.push('productRule')
    if (params.includeQuotientRule) problemTypes.push('quotientRule')
    if (params.includePowerRule) problemTypes.push('powerRule')
    if (params.includeNegativeExponents) problemTypes.push('negativeExponents')
    if (params.includeRadicalSimplifying) problemTypes.push('radicalSimplifying')
    if (params.includeRadicalOperations) problemTypes.push('radicalOperations')
    if (params.includeRationalExponents) problemTypes.push('rationalExponents')
    
    if (problemTypes.length === 0) problemTypes.push('productRule')
    
    const problemType = this.getRandomElement(problemTypes)
    return this.generateExponentRadicalProblem(problemType, params)
  }

  generateExponentRadicalProblem(problemType, params) {
    switch (problemType) {
      case 'productRule':
        return this.generateProductRuleProblem(params)
      case 'quotientRule':
        return this.generateQuotientRuleProblem(params)
      case 'powerRule':
        return this.generatePowerRuleProblem(params)
      case 'radicalSimplifying':
        return this.generateRadicalSimplifyingProblem(params)
      default:
        return this.generateProductRuleProblem(params)
    }
  }
  
  generateProductRuleProblem(params) {
    const exp1 = Math.floor(Math.random() * params.maxExponent) + 2
    const exp2 = Math.floor(Math.random() * params.maxExponent) + 2
    const result = exp1 + exp2
    
    const expression = `x^${exp1} \\cdot x^${exp2}`
    const answer = `x^${result}`
    
    const steps = [
      `\\text{Given: } ${expression}`,
      `\\text{Product rule: } x^a \\cdot x^b = x^{a+b}`,
      `\\text{Add exponents: } ${exp1} + ${exp2} = ${result}`,
      `\\text{Result: } ${answer}`
    ]
    
    return {
      question: `Simplify: ${expression}`,
      questionLaTeX: `\\text{Simplify: } ${expression}`,
      answer: answer,
      answerLaTeX: answer,
      steps: steps,
      metadata: {
        problemType: 'productRule',
        exponents: [exp1, exp2],
        result: result,
        difficulty: 'easy',
        estimatedTime: '1 minute'
      }
    }
  }
  
  generateQuotientRuleProblem(params) {
    let exp1 = Math.floor(Math.random() * params.maxExponent) + 3
    let exp2 = Math.floor(Math.random() * (exp1 - 1)) + 1
    const result = exp1 - exp2
    
    const expression = `\\frac{x^${exp1}}{x^${exp2}}`
    const answer = `x^${result}`
    
    const steps = [
      `\\text{Given: } ${expression}`,
      `\\text{Quotient rule: } \\frac{x^a}{x^b} = x^{a-b}`,
      `\\text{Subtract exponents: } ${exp1} - ${exp2} = ${result}`,
      `\\text{Result: } ${answer}`
    ]
    
    return {
      question: `Simplify: ${expression}`,
      questionLaTeX: `\\text{Simplify: } ${expression}`,
      answer: answer,
      answerLaTeX: answer,
      steps: steps,
      metadata: {
        problemType: 'quotientRule',
        exponents: [exp1, exp2],
        result: result,
        difficulty: 'easy',
        estimatedTime: '1 minute'
      }
    }
  }
  
  generatePowerRuleProblem(params) {
    const exp1 = Math.floor(Math.random() * 6) + 2
    const exp2 = Math.floor(Math.random() * 4) + 2
    const result = exp1 * exp2
    
    const expression = `(x^${exp1})^${exp2}`
    const answer = `x^${result}`
    
    const steps = [
      `\\text{Given: } ${expression}`,
      `\\text{Power rule: } (x^a)^b = x^{ab}`,
      `\\text{Multiply exponents: } ${exp1} \\times ${exp2} = ${result}`,
      `\\text{Result: } ${answer}`
    ]
    
    return {
      question: `Simplify: ${expression}`,
      questionLaTeX: `\\text{Simplify: } ${expression}`,
      answer: answer,
      answerLaTeX: answer,
      steps: steps,
      metadata: {
        problemType: 'powerRule',
        exponents: [exp1, exp2],
        result: result,
        difficulty: 'easy',
        estimatedTime: '1 minute'
      }
    }
  }
  
  generateRadicalSimplifyingProblem(params) {
    // Generate a perfect square factor times another number
    const perfectSquares = [4, 9, 16, 25, 36, 49]
    const otherFactors = [2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15]
    
    const perfectSquare = this.getRandomElement(perfectSquares)
    const otherFactor = this.getRandomElement(otherFactors)
    const radicand = perfectSquare * otherFactor
    const sqrtPerfect = Math.sqrt(perfectSquare)
    
    const expression = `\\sqrt{${radicand}}`
    const answer = `${sqrtPerfect}\\sqrt{${otherFactor}}`
    
    const steps = [
      `\\text{Given: } ${expression}`,
      `\\text{Factor the radicand: } ${radicand} = ${perfectSquare} \\times ${otherFactor}`,
      `\\text{Separate perfect square: } \\sqrt{${perfectSquare} \\times ${otherFactor}} = \\sqrt{${perfectSquare}} \\times \\sqrt{${otherFactor}}`,
      `\\text{Simplify: } \\sqrt{${perfectSquare}} = ${sqrtPerfect}`,
      `\\text{Result: } ${answer}`
    ]
    
    return {
      question: `Simplify: ${expression}`,
      questionLaTeX: `\\text{Simplify: } ${expression}`,
      answer: answer,
      answerLaTeX: answer,
      steps: steps,
      metadata: {
        problemType: 'radicalSimplifying',
        radicand: radicand,
        perfectSquare: perfectSquare,
        otherFactor: otherFactor,
        difficulty: 'medium',
        estimatedTime: '2 minutes'
      }
    }
  }

  getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)]
  }
}

export default ExponentsRadicalsGenerator