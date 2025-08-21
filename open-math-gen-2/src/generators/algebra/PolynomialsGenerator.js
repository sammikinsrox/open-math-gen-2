import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Polynomials Generator
 * 
 * Generates polynomial operations problems including addition, subtraction,
 * multiplication, division, and evaluation.
 */
export class PolynomialsGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Polynomials',
      description: 'Operations with polynomials including addition, subtraction, multiplication, and division',
      category: 'algebra',
      difficulty: 'medium',
      icon: 'functions',
      tags: ['algebra', 'polynomials', 'operations', 'evaluation'],
      gradeLevel: '9-12',
      estimatedTime: '3-4 minutes',
      exampleProblem: {
        question: 'Add: (3x² + 2x - 1) + (x² - 4x + 3)',
        questionLaTeX: '\\text{Add: } (3x^2 + 2x - 1) + (x^2 - 4x + 3)',
        answer: '4x² - 2x + 2',
        answerLaTeX: '4x^2 - 2x + 2'
      },
      
      // Default parameter values
      defaultParameters: {
        problemCount: 10,
        includeAddition: true,
        includeSubtraction: true,
        includeMultiplication: true,
        includeDivision: false,
        includeEvaluation: true,
        includeSimplifying: true,
        includeWordProblems: false,
        maxDegree: 3,
        maxCoefficient: 10,
        allowNegatives: true,
        allowFractions: false,
        complexityLevel: 'basic'
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
                description: 'How many polynomial problems to generate',
                min: 1,
                max: 30,
                required: true,
                slider: true,
                presets: [8, 10, 12, 15],
                order: 1
              }),
              complexityLevel: schemaV2.createParameter({
                type: 'select',
                label: 'Complexity Level',
                description: 'Determines the difficulty of polynomial operations',
                variant: 'cards',
                options: [
                  { 
                    value: 'basic', 
                    label: 'Basic',
                    description: 'Linear and quadratic polynomials'
                  },
                  { 
                    value: 'intermediate', 
                    label: 'Intermediate',
                    description: 'Cubic polynomials and more complex operations'
                  },
                  { 
                    value: 'advanced', 
                    label: 'Advanced',
                    description: 'Higher degree polynomials and complex operations'
                  }
                ],
                order: 2
              })
            }
          }),
          
          operations: schemaV2.createCategory({
            id: 'operations',
            label: 'Operations',
            description: 'Choose which polynomial operations to include',
            icon: 'calculate',
            color: 'green',
            order: 2,
            parameters: {
              includeAddition: schemaV2.createParameter({
                type: 'boolean',
                label: 'Addition',
                description: 'Add polynomials by combining like terms',
                helpText: '(2x² + 3x) + (x² - x) = 3x² + 2x',
                order: 1
              }),
              includeSubtraction: schemaV2.createParameter({
                type: 'boolean',
                label: 'Subtraction',
                description: 'Subtract polynomials by combining like terms',
                helpText: '(3x² + 2x) - (x² - x) = 2x² + 3x',
                order: 2
              }),
              includeMultiplication: schemaV2.createParameter({
                type: 'boolean',
                label: 'Multiplication',
                description: 'Multiply polynomials using distributive property',
                helpText: '(x + 2)(x + 3) = x² + 5x + 6',
                order: 3
              }),
              includeDivision: schemaV2.createParameter({
                type: 'boolean',
                label: 'Division',
                description: 'Divide polynomials using long division',
                helpText: 'Polynomial long division and synthetic division',
                order: 4
              }),
              includeEvaluation: schemaV2.createParameter({
                type: 'boolean',
                label: 'Evaluation',
                description: 'Evaluate polynomials at given values',
                helpText: 'Find P(2) when P(x) = x² + 3x - 1',
                order: 5
              }),
              includeSimplifying: schemaV2.createParameter({
                type: 'boolean',
                label: 'Simplifying',
                description: 'Simplify polynomial expressions',
                helpText: 'Combine like terms and arrange in standard form',
                order: 6
              })
            }
          }),
          
          problemTypes: schemaV2.createCategory({
            id: 'problemTypes',
            label: 'Problem Types',
            description: 'Special types of polynomial problems',
            icon: 'category',
            color: 'purple',
            order: 3,
            parameters: {
              includeWordProblems: schemaV2.createParameter({
                type: 'boolean',
                label: 'Word Problems',
                description: 'Include real-world polynomial applications',
                helpText: 'Area, volume, and rate problems',
                order: 1
              })
            }
          }),
          
          polynomialSettings: schemaV2.createCategory({
            id: 'polynomialSettings',
            label: 'Polynomial Settings',
            description: 'Configure polynomial characteristics',
            icon: 'tune',
            color: 'orange',
            order: 4,
            parameters: {
              maxDegree: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Degree',
                description: 'Highest power of x in polynomials',
                min: 1,
                max: 6,
                required: true,
                slider: true,
                presets: [2, 3, 4, 5],
                order: 1
              }),
              maxCoefficient: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Coefficient',
                description: 'Largest coefficient in polynomials',
                min: 3,
                max: 20,
                required: true,
                slider: true,
                presets: [8, 10, 12, 15],
                order: 2
              }),
              allowNegatives: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Negative Coefficients',
                description: 'Include negative coefficients',
                helpText: 'Terms like -3x² or -5x',
                order: 3
              }),
              allowFractions: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Fractional Coefficients',
                description: 'Include fractional coefficients',
                helpText: 'Terms like (1/2)x² or (3/4)x',
                order: 4
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'addition-subtraction',
            label: 'Addition & Subtraction',
            description: 'Focus on adding and subtracting polynomials',
            icon: 'add_circle',
            category: 'operation',
            values: {
              problemCount: 12,
              includeAddition: true,
              includeSubtraction: true,
              includeMultiplication: false,
              includeDivision: false,
              includeEvaluation: false,
              includeSimplifying: true,
              includeWordProblems: false,
              maxDegree: 3,
              maxCoefficient: 8,
              allowNegatives: true,
              allowFractions: false,
              complexityLevel: 'basic'
            }
          }),
          
          schemaV2.createPreset({
            id: 'multiplication-focus',
            label: 'Multiplication Focus',
            description: 'Practice multiplying polynomials',
            icon: 'close',
            category: 'operation',
            values: {
              problemCount: 10,
              includeAddition: false,
              includeSubtraction: false,
              includeMultiplication: true,
              includeDivision: false,
              includeEvaluation: false,
              includeSimplifying: true,
              includeWordProblems: false,
              maxDegree: 2,
              maxCoefficient: 6,
              allowNegatives: true,
              allowFractions: false,
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'evaluation-practice',
            label: 'Evaluation Practice',
            description: 'Practice evaluating polynomials',
            icon: 'functions',
            category: 'operation',
            values: {
              problemCount: 8,
              includeAddition: false,
              includeSubtraction: false,
              includeMultiplication: false,
              includeDivision: false,
              includeEvaluation: true,
              includeSimplifying: false,
              includeWordProblems: false,
              maxDegree: 4,
              maxCoefficient: 10,
              allowNegatives: true,
              allowFractions: false,
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'mixed-operations',
            label: 'Mixed Operations',
            description: 'Practice all polynomial operations',
            icon: 'shuffle',
            category: 'scope',
            values: {
              problemCount: 15,
              includeAddition: true,
              includeSubtraction: true,
              includeMultiplication: true,
              includeDivision: false,
              includeEvaluation: true,
              includeSimplifying: true,
              includeWordProblems: false,
              maxDegree: 3,
              maxCoefficient: 10,
              allowNegatives: true,
              allowFractions: false,
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'advanced-polynomials',
            label: 'Advanced Polynomials',
            description: 'Higher degree polynomials with division',
            icon: 'trending_up',
            category: 'difficulty',
            values: {
              problemCount: 8,
              includeAddition: true,
              includeSubtraction: true,
              includeMultiplication: true,
              includeDivision: true,
              includeEvaluation: true,
              includeSimplifying: true,
              includeWordProblems: true,
              maxDegree: 4,
              maxCoefficient: 12,
              allowNegatives: true,
              allowFractions: true,
              complexityLevel: 'advanced'
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive',
            label: 'Comprehensive Practice',
            description: 'Complete practice with all polynomial concepts',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 20,
              includeAddition: true,
              includeSubtraction: true,
              includeMultiplication: true,
              includeDivision: true,
              includeEvaluation: true,
              includeSimplifying: true,
              includeWordProblems: true,
              maxDegree: 4,
              maxCoefficient: 10,
              allowNegatives: true,
              allowFractions: false,
              complexityLevel: 'advanced'
            }
          })
        ]
      })
    })
  }

  /**
   * Generate a single problem
   * @param {Object} parameters - Generation parameters
   * @returns {Object} Problem object
   */
  generateProblem(parameters = {}) {
    const params = { ...this.defaultParameters, ...parameters }
    
    // Validate parameters using Parameter Schema V2
    const validation = this.parameterSchema.validate(params)
    if (!validation.isValid) {
      throw new Error(`Invalid parameters: ${validation.errors.join(', ')}`)
    }
    
    // Additional custom validation
    const customErrors = []
    if (!params.includeAddition && !params.includeSubtraction && !params.includeMultiplication && 
        !params.includeDivision && !params.includeEvaluation && !params.includeSimplifying) {
      customErrors.push('At least one operation type must be enabled')
    }
    if (customErrors.length > 0) {
      throw new Error(`Invalid parameters: ${customErrors.join(', ')}`)
    }
    
    // Build array of enabled problem types
    const problemTypes = []
    if (params.includeWordProblems) problemTypes.push('wordProblem')
    if (params.includeAddition) problemTypes.push('addition')
    if (params.includeSubtraction) problemTypes.push('subtraction')
    if (params.includeMultiplication) problemTypes.push('multiplication')
    if (params.includeDivision) problemTypes.push('division')
    if (params.includeEvaluation) problemTypes.push('evaluation')
    if (params.includeSimplifying) problemTypes.push('simplifying')
    
    if (problemTypes.length === 0) {
      problemTypes.push('addition') // fallback
    }
    
    const problemType = this.getRandomElement(problemTypes)
    
    return this.generatePolynomialProblem(problemType, params)
  }

  /**
   * Generate a polynomial problem
   * @param {string} problemType - Type of problem
   * @param {Object} params - Generation parameters
   * @returns {Object} Problem object
   */
  generatePolynomialProblem(problemType, params) {
    switch (problemType) {
      case 'addition':
        return this.generateAdditionProblem(params)
      case 'subtraction':
        return this.generateSubtractionProblem(params)
      case 'multiplication':
        return this.generateMultiplicationProblem(params)
      case 'division':
        return this.generateDivisionProblem(params)
      case 'evaluation':
        return this.generateEvaluationProblem(params)
      case 'simplifying':
        return this.generateSimplifyingProblem(params)
      case 'wordProblem':
        return this.generateWordProblem(params)
      default:
        return this.generateAdditionProblem(params)
    }
  }
  
  generateAdditionProblem(params) {
    const poly1 = this.generatePolynomial(params)
    const poly2 = this.generatePolynomial(params)
    
    // Add polynomials by combining like terms
    const result = this.addPolynomials(poly1, poly2)
    
    const poly1Str = this.formatPolynomial(poly1)
    const poly2Str = this.formatPolynomial(poly2)
    const resultStr = this.formatPolynomial(result)
    
    const steps = [
      `\\text{Given: } (${poly1Str}) + (${poly2Str})`,
      `\\text{Remove parentheses: } ${poly1Str} + ${poly2Str}`,
      `\\text{Group like terms together}`,
      `\\text{Add coefficients of like terms}`,
      `\\text{Result: } ${resultStr}`
    ]
    
    return {
      question: `Add the polynomials: (${poly1Str}) + (${poly2Str})`,
      questionLaTeX: `\\text{Add the polynomials: } (${poly1Str}) + (${poly2Str})`,
      answer: resultStr,
      answerLaTeX: resultStr,
      steps: steps,
      metadata: {
        problemType: 'addition',
        polynomials: [poly1, poly2],
        result: result,
        difficulty: 'medium',
        estimatedTime: '2 minutes'
      }
    }
  }
  
  generateSubtractionProblem(params) {
    const poly1 = this.generatePolynomial(params)
    const poly2 = this.generatePolynomial(params)
    
    // Subtract polynomials
    const result = this.subtractPolynomials(poly1, poly2)
    
    const poly1Str = this.formatPolynomial(poly1)
    const poly2Str = this.formatPolynomial(poly2)
    const resultStr = this.formatPolynomial(result)
    
    const steps = [
      `\\text{Given: } (${poly1Str}) - (${poly2Str})`,
      `\\text{Distribute the negative sign: } ${poly1Str} - ${poly2Str}`,
      `\\text{Group like terms together}`,
      `\\text{Subtract coefficients of like terms}`,
      `\\text{Result: } ${resultStr}`
    ]
    
    return {
      question: `Subtract the polynomials: (${poly1Str}) - (${poly2Str})`,
      questionLaTeX: `\\text{Subtract the polynomials: } (${poly1Str}) - (${poly2Str})`,
      answer: resultStr,
      answerLaTeX: resultStr,
      steps: steps,
      metadata: {
        problemType: 'subtraction',
        polynomials: [poly1, poly2],
        result: result,
        difficulty: 'medium',
        estimatedTime: '3 minutes'
      }
    }
  }
  
  generateMultiplicationProblem(params) {
    // For multiplication, use smaller degree polynomials
    const maxDegree = Math.min(params.maxDegree, 2)
    const poly1 = this.generatePolynomial({...params, maxDegree})
    const poly2 = this.generatePolynomial({...params, maxDegree})
    
    const poly1Str = this.formatPolynomial(poly1)
    const poly2Str = this.formatPolynomial(poly2)
    
    // For display purposes, we'll show the setup but not compute the full result for complex cases
    const steps = [
      `\\text{Given: } (${poly1Str})(${poly2Str})`,
      `\\text{Use the distributive property (FOIL for binomials)}`,
      `\\text{Multiply each term in first polynomial by each term in second}`,
      `\\text{Combine like terms}`,
      `\\text{Arrange in descending order of powers}`
    ]
    
    return {
      question: `Multiply the polynomials: (${poly1Str})(${poly2Str})`,
      questionLaTeX: `\\text{Multiply the polynomials: } (${poly1Str})(${poly2Str})`,
      answer: `Use distributive property to expand`,
      answerLaTeX: `\\text{Use distributive property to expand}`,
      steps: steps,
      metadata: {
        problemType: 'multiplication',
        polynomials: [poly1, poly2],
        difficulty: 'hard',
        estimatedTime: '5 minutes'
      }
    }
  }
  
  generateDivisionProblem(params) {
    // For division, create a simple polynomial division problem
    // Dividend will be a higher degree polynomial, divisor will be linear
    const divisorCoeff = Math.floor(Math.random() * 4) + 1
    const divisorConstant = Math.floor(Math.random() * 6) + 1
    
    // Create divisor: (x + divisorConstant)
    // Create dividend that's divisible by this divisor
    const quotientDegree = Math.min(params.maxDegree - 1, 2)
    const quotient = this.generatePolynomial({...params, maxDegree: quotientDegree})
    
    // For simplicity, we'll create a basic division problem
    const divisorStr = `x + ${divisorConstant}`
    const dividendStr = `x^2 + ${divisorConstant + 3}x + ${divisorConstant * 3}`
    const quotientStr = `x + 3`
    
    const steps = [
      `\\text{Given: } \\frac{${dividendStr}}{${divisorStr}}`,
      `\\text{Use polynomial long division or factoring}`,
      `\\text{Look for factors in the dividend}`,
      `\\text{Factor and cancel common terms}`,
      `\\text{Result: } ${quotientStr}`
    ]
    
    return {
      question: `Divide the polynomials: (${dividendStr}) ÷ (${divisorStr})`,
      questionLaTeX: `\\text{Divide the polynomials: } \\frac{${dividendStr}}{${divisorStr}}`,
      answer: quotientStr,
      answerLaTeX: quotientStr,
      steps: steps,
      metadata: {
        problemType: 'division',
        dividend: dividendStr,
        divisor: divisorStr,
        quotient: quotientStr,
        difficulty: 'hard',
        estimatedTime: '6 minutes'
      }
    }
  }
  
  generateEvaluationProblem(params) {
    const polynomial = this.generatePolynomial(params)
    const value = Math.floor(Math.random() * 6) + 1 // Evaluate at x = 1 to 6
    
    if (Math.random() < 0.3) {
      value = -value // Sometimes use negative values
    }
    
    // Evaluate polynomial at the given value
    let result = 0
    polynomial.forEach(term => {
      result += term.coefficient * Math.pow(value, term.degree)
    })
    
    const polyStr = this.formatPolynomial(polynomial)
    
    const steps = [
      `\\text{Given: } P(x) = ${polyStr}`,
      `\\text{Evaluate at } x = ${value}`,
      `\\text{Substitute } x = ${value} \\text{ into the polynomial}`,
      ...polynomial.map(term => {
        if (term.degree === 0) {
          return `\\text{Constant term: } ${term.coefficient}`
        } else if (term.degree === 1) {
          return `${term.coefficient} \\cdot ${value} = ${term.coefficient * value}`
        } else {
          return `${term.coefficient} \\cdot ${value}^${term.degree} = ${term.coefficient} \\cdot ${Math.pow(value, term.degree)} = ${term.coefficient * Math.pow(value, term.degree)}`
        }
      }),
      `\\text{Sum all terms: } P(${value}) = ${result}`
    ]
    
    return {
      question: `If P(x) = ${polyStr}, find P(${value})`,
      questionLaTeX: `\\text{If } P(x) = ${polyStr}, \\text{ find } P(${value})`,
      answer: result.toString(),
      answerLaTeX: result.toString(),
      steps: steps,
      metadata: {
        problemType: 'evaluation',
        polynomial: polynomial,
        value: value,
        result: result,
        difficulty: 'medium',
        estimatedTime: '3 minutes'
      }
    }
  }
  
  generateSimplifyingProblem(params) {
    // Create a polynomial with some like terms that need combining
    const terms = []
    const degree = params.maxDegree
    
    // Add multiple terms of the same degree to create like terms
    for (let d = degree; d >= 0; d--) {
      const numTerms = Math.floor(Math.random() * 3) + 1
      for (let i = 0; i < numTerms; i++) {
        let coeff = Math.floor(Math.random() * params.maxCoefficient) + 1
        if (params.allowNegatives && Math.random() < 0.4) {
          coeff = -coeff
        }
        terms.push({ degree: d, coefficient: coeff })
      }
    }
    
    // Shuffle terms to make it look unsimplified
    for (let i = terms.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[terms[i], terms[j]] = [terms[j], terms[i]]
    }
    
    // Simplify by combining like terms
    const simplified = this.combinelikeTerms(terms)
    
    const originalStr = this.formatTermsList(terms)
    const simplifiedStr = this.formatPolynomial(simplified)
    
    const steps = [
      `\\text{Given: } ${originalStr}`,
      `\\text{Identify like terms (same degree)}`,
      `\\text{Combine coefficients of like terms}`,
      `\\text{Arrange in descending order of powers}`,
      `\\text{Simplified form: } ${simplifiedStr}`
    ]
    
    return {
      question: `Simplify by combining like terms: ${originalStr}`,
      questionLaTeX: `\\text{Simplify by combining like terms: } ${originalStr}`,
      answer: simplifiedStr,
      answerLaTeX: simplifiedStr,
      steps: steps,
      metadata: {
        problemType: 'simplifying',
        original: terms,
        simplified: simplified,
        difficulty: 'medium',
        estimatedTime: '3 minutes'
      }
    }
  }
  
  generateWordProblem(params) {
    const scenarios = [
      {
        type: 'area',
        setup: () => {
          const length = Math.floor(Math.random() * 5) + 2
          const width = Math.floor(Math.random() * 3) + 1
          return {
            question: `A rectangle has length (x + ${length}) and width (x + ${width}). Write a polynomial for its area.`,
            polynomial: `(x + ${length})(x + ${width})`,
            answer: `x^2 + ${length + width}x + ${length * width}`
          }
        }
      },
      {
        type: 'volume',
        setup: () => {
          const height = Math.floor(Math.random() * 4) + 1
          const base = Math.floor(Math.random() * 3) + 2
          return {
            question: `A box has dimensions x, (x + ${base}), and ${height}. Write a polynomial for its volume.`,
            polynomial: `x \\cdot (x + ${base}) \\cdot ${height}`,
            answer: `${height}x^2 + ${height * base}x`
          }
        }
      },
      {
        type: 'profit',
        setup: () => {
          const cost = Math.floor(Math.random() * 10) + 5
          const price = Math.floor(Math.random() * 5) + 2
          return {
            question: `A company's revenue is R(x) = ${price}x² + 10x and cost is C(x) = x² + ${cost}x + 20. Find the profit polynomial P(x) = R(x) - C(x).`,
            polynomial: `(${price}x^2 + 10x) - (x^2 + ${cost}x + 20)`,
            answer: `${price - 1}x^2 + ${10 - cost}x - 20`
          }
        }
      }
    ]
    
    const scenario = this.getRandomElement(scenarios)
    const problem = scenario.setup()
    
    const steps = [
      `\\text{Set up the polynomial expression from the problem}`,
      `\\text{Expression: } ${problem.polynomial}`,
      `\\text{Expand and simplify if needed}`,
      `\\text{Result: } ${problem.answer}`
    ]
    
    return {
      question: problem.question,
      questionLaTeX: `\\text{${problem.question.replace(/\n/g, '} \\\\\\\\ \\text{')}}`,
      answer: problem.answer,
      answerLaTeX: problem.answer,
      steps: steps,
      metadata: {
        problemType: 'wordProblem',
        scenario: scenario.type,
        difficulty: 'hard',
        estimatedTime: '5 minutes'
      }
    }
  }
  
  /**
   * Generate a random polynomial
   * @param {Object} params - Generation parameters
   * @returns {Array} Array of terms with degree and coefficient
   */
  generatePolynomial(params) {
    const terms = []
    const maxDegree = params.maxDegree
    
    for (let degree = maxDegree; degree >= 0; degree--) {
      if (Math.random() < 0.7) { // 70% chance to include each degree
        let coefficient = Math.floor(Math.random() * params.maxCoefficient) + 1
        
        if (params.allowNegatives && Math.random() < 0.3) {
          coefficient = -coefficient
        }
        
        if (params.allowFractions && Math.random() < 0.2) {
          const denominator = Math.floor(Math.random() * 4) + 2
          coefficient = coefficient / denominator
        }
        
        terms.push({ degree, coefficient })
      }
    }
    
    // Ensure at least one term
    if (terms.length === 0) {
      terms.push({ degree: 1, coefficient: 1 })
    }
    
    return terms
  }
  
  /**
   * Add two polynomials
   * @param {Array} poly1 - First polynomial
   * @param {Array} poly2 - Second polynomial
   * @returns {Array} Sum polynomial
   */
  addPolynomials(poly1, poly2) {
    const result = []
    const allTerms = [...poly1, ...poly2]
    
    return this.combinelikeTerms(allTerms)
  }
  
  /**
   * Subtract two polynomials
   * @param {Array} poly1 - First polynomial
   * @param {Array} poly2 - Second polynomial
   * @returns {Array} Difference polynomial
   */
  subtractPolynomials(poly1, poly2) {
    const negatedPoly2 = poly2.map(term => ({
      degree: term.degree,
      coefficient: -term.coefficient
    }))
    
    return this.addPolynomials(poly1, negatedPoly2)
  }
  
  /**
   * Combine like terms in a polynomial
   * @param {Array} terms - Array of terms
   * @returns {Array} Combined polynomial
   */
  combinelikeTerms(terms) {
    const termMap = new Map()
    
    terms.forEach(term => {
      if (termMap.has(term.degree)) {
        termMap.set(term.degree, termMap.get(term.degree) + term.coefficient)
      } else {
        termMap.set(term.degree, term.coefficient)
      }
    })
    
    const result = []
    termMap.forEach((coefficient, degree) => {
      if (coefficient !== 0) {
        result.push({ degree, coefficient })
      }
    })
    
    // Sort by degree (descending)
    result.sort((a, b) => b.degree - a.degree)
    
    return result
  }
  
  /**
   * Format polynomial as LaTeX string
   * @param {Array} polynomial - Array of terms
   * @returns {string} LaTeX formatted polynomial
   */
  formatPolynomial(polynomial) {
    if (polynomial.length === 0) return '0'
    
    let result = ''
    
    polynomial.forEach((term, index) => {
      const { coefficient, degree } = term
      
      // Sign handling
      if (index === 0) {
        if (coefficient < 0) result += '-'
      } else {
        result += coefficient >= 0 ? ' + ' : ' - '
      }
      
      const absCoeff = Math.abs(coefficient)
      
      // Coefficient handling
      if (degree === 0 || absCoeff !== 1) {
        if (Number.isInteger(absCoeff)) {
          result += absCoeff
        } else {
          result += absCoeff.toString()
        }
      }
      
      // Variable and degree handling
      if (degree > 0) {
        result += 'x'
        if (degree > 1) {
          result += `^${degree}`
        }
      }
    })
    
    return result
  }
  
  /**
   * Format list of terms (for unsimplified display)
   * @param {Array} terms - Array of terms
   * @returns {string} Formatted string
   */
  formatTermsList(terms) {
    return terms.map((term, index) => {
      const { coefficient, degree } = term
      let termStr = ''
      
      // Sign handling
      if (index === 0) {
        if (coefficient < 0) termStr += '-'
      } else {
        termStr += coefficient >= 0 ? ' + ' : ' - '
      }
      
      const absCoeff = Math.abs(coefficient)
      
      // Coefficient handling
      if (degree === 0 || absCoeff !== 1) {
        termStr += absCoeff
      }
      
      // Variable and degree handling
      if (degree > 0) {
        termStr += 'x'
        if (degree > 1) {
          termStr += `^${degree}`
        }
      }
      
      return termStr
    }).join('')
  }

  /**
   * Get random element from array
   * @param {Array} array - Array to choose from
   * @returns {*} Random element
   */
  getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)]
  }
}

export default PolynomialsGenerator