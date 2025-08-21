import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Factoring Generator
 * 
 * Generates factoring problems including GCF, difference of squares,
 * trinomials, and special factoring patterns.
 */
export class FactoringGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Factoring',
      description: 'Factor polynomials using various methods including GCF, trinomials, and special patterns',
      category: 'algebra',
      difficulty: 'medium',
      icon: 'account_tree',
      tags: ['algebra', 'factoring', 'polynomials', 'trinomials'],
      gradeLevel: '9-12',
      estimatedTime: '3-4 minutes',
      exampleProblem: {
        question: 'Factor: x² + 7x + 12',
        questionLaTeX: '\\text{Factor: } x^2 + 7x + 12',
        answer: '(x + 3)(x + 4)',
        answerLaTeX: '(x + 3)(x + 4)'
      },
      
      // Default parameter values
      defaultParameters: {
        problemCount: 10,
        includeGCF: true,
        includeTrinomials: true,
        includeDifferenceSquares: true,
        includeGrouping: false,
        includeSpecialPatterns: false,
        allowNegatives: true,
        maxCoefficient: 10,
        maxConstant: 20,
        complexityLevel: 'basic'
      },
      
      // Enhanced Parameter Schema V2
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
                description: 'How many factoring problems to generate',
                min: 1,
                max: 25,
                required: true,
                slider: true,
                presets: [8, 10, 12, 15],
                order: 1
              }),
              complexityLevel: schemaV2.createParameter({
                type: 'select',
                label: 'Complexity Level',
                description: 'Determines the difficulty of factoring problems',
                variant: 'cards',
                options: [
                  { value: 'basic', label: 'Basic', description: 'Simple GCF and basic trinomials' },
                  { value: 'intermediate', label: 'Intermediate', description: 'Mixed factoring methods' },
                  { value: 'advanced', label: 'Advanced', description: 'Complex patterns and grouping' }
                ],
                order: 2
              })
            }
          }),
          
          factoringMethods: schemaV2.createCategory({
            id: 'factoringMethods',
            label: 'Factoring Methods',
            description: 'Choose which factoring methods to include',
            icon: 'account_tree',
            color: 'green',
            order: 2,
            parameters: {
              includeGCF: schemaV2.createParameter({
                type: 'boolean',
                label: 'Greatest Common Factor',
                description: 'Factor out the GCF from polynomials',
                helpText: '6x² + 9x = 3x(2x + 3)',
                order: 1
              }),
              includeTrinomials: schemaV2.createParameter({
                type: 'boolean',
                label: 'Trinomial Factoring',
                description: 'Factor quadratic trinomials',
                helpText: 'x² + 5x + 6 = (x + 2)(x + 3)',
                order: 2
              }),
              includeDifferenceSquares: schemaV2.createParameter({
                type: 'boolean',
                label: 'Difference of Squares',
                description: 'Factor difference of perfect squares',
                helpText: 'x² - 16 = (x + 4)(x - 4)',
                order: 3
              }),
              includeGrouping: schemaV2.createParameter({
                type: 'boolean',
                label: 'Factoring by Grouping',
                description: 'Factor four-term polynomials by grouping',
                helpText: 'ax + ay + bx + by = (a + b)(x + y)',
                order: 4
              }),
              includeSpecialPatterns: schemaV2.createParameter({
                type: 'boolean',
                label: 'Special Patterns',
                description: 'Perfect square trinomials and sum/difference of cubes',
                helpText: 'x² + 6x + 9 = (x + 3)²',
                order: 5
              })
            }
          }),
          
          numberSettings: schemaV2.createCategory({
            id: 'numberSettings',
            label: 'Number Settings',
            description: 'Configure coefficient and constant ranges',
            icon: 'tag',
            color: 'orange',
            order: 3,
            parameters: {
              maxCoefficient: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Coefficient',
                description: 'Largest coefficient for variables',
                min: 2,
                max: 20,
                required: true,
                slider: true,
                presets: [6, 8, 10, 12],
                order: 1
              }),
              maxConstant: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Constant',
                description: 'Largest constant term',
                min: 5,
                max: 50,
                required: true,
                slider: true,
                presets: [12, 15, 20, 25],
                order: 2
              }),
              allowNegatives: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Negative Terms',
                description: 'Include negative coefficients and constants',
                helpText: 'x² - 5x + 6 or -3x² + 12x',
                order: 3
              })
            }
          })
        },
        
        // Preset configurations
        presets: [
          schemaV2.createPreset({
            id: 'gcf-practice',
            label: 'GCF Practice',
            description: 'Focus on factoring out greatest common factor',
            icon: 'call_split',
            category: 'method',
            values: {
              problemCount: 10,
              includeGCF: true,
              includeTrinomials: false,
              includeDifferenceSquares: false,
              includeGrouping: false,
              includeSpecialPatterns: false,
              allowNegatives: true,
              maxCoefficient: 8,
              maxConstant: 15,
              complexityLevel: 'basic'
            }
          }),
          
          schemaV2.createPreset({
            id: 'trinomial-factoring',
            label: 'Trinomial Factoring',
            description: 'Practice factoring quadratic trinomials',
            icon: 'functions',
            category: 'method',
            values: {
              problemCount: 12,
              includeGCF: false,
              includeTrinomials: true,
              includeDifferenceSquares: false,
              includeGrouping: false,
              includeSpecialPatterns: false,
              allowNegatives: true,
              maxCoefficient: 6,
              maxConstant: 20,
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'special-patterns',
            label: 'Special Patterns',
            description: 'Difference of squares and perfect square trinomials',
            icon: 'auto_awesome',
            category: 'method',
            values: {
              problemCount: 8,
              includeGCF: false,
              includeTrinomials: false,
              includeDifferenceSquares: true,
              includeGrouping: false,
              includeSpecialPatterns: true,
              allowNegatives: false,
              maxCoefficient: 8,
              maxConstant: 16,
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'mixed-factoring',
            label: 'Mixed Factoring',
            description: 'Practice all factoring methods',
            icon: 'shuffle',
            category: 'scope',
            values: {
              problemCount: 15,
              includeGCF: true,
              includeTrinomials: true,
              includeDifferenceSquares: true,
              includeGrouping: true,
              includeSpecialPatterns: true,
              allowNegatives: true,
              maxCoefficient: 10,
              maxConstant: 20,
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
    if (params.includeGCF) problemTypes.push('gcf')
    if (params.includeTrinomials) problemTypes.push('trinomial')
    if (params.includeDifferenceSquares) problemTypes.push('differenceSquares')
    if (params.includeGrouping) problemTypes.push('grouping')
    if (params.includeSpecialPatterns) problemTypes.push('specialPatterns')
    
    if (problemTypes.length === 0) problemTypes.push('trinomial')
    
    const problemType = this.getRandomElement(problemTypes)
    return this.generateFactoringProblem(problemType, params)
  }

  generateFactoringProblem(problemType, params) {
    switch (problemType) {
      case 'gcf':
        return this.generateGCFProblem(params)
      case 'trinomial':
        return this.generateTrinomialProblem(params)
      case 'differenceSquares':
        return this.generateDifferenceSquaresProblem(params)
      case 'grouping':
        return this.generateGroupingProblem(params)
      case 'specialPatterns':
        return this.generateSpecialPatternsProblem(params)
      default:
        return this.generateTrinomialProblem(params)
    }
  }
  
  generateGCFProblem(params) {
    const gcf = Math.floor(Math.random() * 6) + 2
    const terms = Math.floor(Math.random() * 2) + 2 // 2-3 terms
    
    const expression = []
    for (let i = 0; i < terms; i++) {
      const coeff = gcf * (Math.floor(Math.random() * 4) + 1)
      const degree = Math.floor(Math.random() * 3) + 1
      expression.push(`${coeff}x^${degree}`)
    }
    
    const originalStr = expression.join(' + ')
    const factoredStr = `${gcf}x(...)` // Simplified for display
    
    const steps = [
      `\\text{Given: } ${originalStr}`,
      `\\text{Find the GCF of all terms}`,
      `\\text{GCF = } ${gcf}x`,
      `\\text{Factor out the GCF}`,
      `\\text{Result: } ${factoredStr}`
    ]
    
    return {
      question: `Factor out the GCF: ${originalStr}`,
      questionLaTeX: `\\text{Factor out the GCF: } ${originalStr}`,
      answer: factoredStr,
      answerLaTeX: factoredStr,
      steps: steps,
      metadata: {
        problemType: 'gcf',
        gcf: gcf,
        difficulty: 'medium',
        estimatedTime: '2 minutes'
      }
    }
  }
  
  generateTrinomialProblem(params) {
    // Generate factors that will create nice trinomial
    const p = Math.floor(Math.random() * 8) + 1
    const q = Math.floor(Math.random() * 8) + 1
    
    if (params.allowNegatives && Math.random() < 0.3) {
      p = -p
    }
    if (params.allowNegatives && Math.random() < 0.3) {
      q = -q
    }
    
    // Create trinomial (x + p)(x + q) = x² + (p+q)x + pq
    const b = p + q
    const c = p * q
    
    const trinomial = `x^2 ${b >= 0 ? '+' : '-'} ${Math.abs(b)}x ${c >= 0 ? '+' : '-'} ${Math.abs(c)}`
    const factored = `(x ${p >= 0 ? '+' : '-'} ${Math.abs(p)})(x ${q >= 0 ? '+' : '-'} ${Math.abs(q)})`
    
    const steps = [
      `\\text{Given: } ${trinomial}`,
      `\\text{Look for two numbers that multiply to } ${c} \\text{ and add to } ${b}`,
      `\\text{The numbers are } ${p} \\text{ and } ${q}`,
      `\\text{Factor: } ${factored}`
    ]
    
    return {
      question: `Factor the trinomial: ${trinomial}`,
      questionLaTeX: `\\text{Factor the trinomial: } ${trinomial}`,
      answer: factored,
      answerLaTeX: factored,
      steps: steps,
      metadata: {
        problemType: 'trinomial',
        coefficients: [1, b, c],
        factors: [p, q],
        difficulty: 'medium',
        estimatedTime: '3 minutes'
      }
    }
  }
  
  generateDifferenceSquaresProblem(params) {
    const a = Math.floor(Math.random() * 6) + 2
    const b = Math.floor(Math.random() * 6) + 2
    
    const expression = `${a*a}x^2 - ${b*b}`
    const factored = `(${a}x + ${b})(${a}x - ${b})`
    
    const steps = [
      `\\text{Given: } ${expression}`,
      `\\text{Recognize as difference of squares: } a^2 - b^2`,
      `\\text{Identify: } a = ${a}x, b = ${b}`,
      `\\text{Factor: } (a + b)(a - b) = ${factored}`
    ]
    
    return {
      question: `Factor: ${expression}`,
      questionLaTeX: `\\text{Factor: } ${expression}`,
      answer: factored,
      answerLaTeX: factored,
      steps: steps,
      metadata: {
        problemType: 'differenceSquares',
        a: a,
        b: b,
        difficulty: 'medium',
        estimatedTime: '2 minutes'
      }
    }
  }
  
  generateGroupingProblem(params) {
    // Create a four-term polynomial that can be factored by grouping
    const a = Math.floor(Math.random() * 4) + 1
    const b = Math.floor(Math.random() * 4) + 1
    const c = Math.floor(Math.random() * 4) + 1
    const d = Math.floor(Math.random() * 4) + 1
    
    // Create expression of the form ax + ay + bx + by = (x + y)(a + b)
    const expression = `${a}x^2 + ${b}x + ${c}x + ${d}`
    const factored = `(x + ${Math.floor(c/a)})(${a}x + ${b})`
    
    const steps = [
      `\\text{Given: } ${expression}`,
      `\\text{Group terms in pairs: } (${a}x^2 + ${b}x) + (${c}x + ${d})`,
      `\\text{Factor out common factor from each group}`,
      `\\text{Look for a common binomial factor}`,
      `\\text{Result: } ${factored}`
    ]
    
    return {
      question: `Factor by grouping: ${expression}`,
      questionLaTeX: `\\text{Factor by grouping: } ${expression}`,
      answer: factored,
      answerLaTeX: factored,
      steps: steps,
      metadata: {
        problemType: 'grouping',
        difficulty: 'hard',
        estimatedTime: '4 minutes'
      }
    }
  }
  
  generateSpecialPatternsProblem(params) {
    const patterns = ['perfectSquare', 'sumOfCubes', 'differenceOfCubes']
    const pattern = this.getRandomElement(patterns)
    
    switch (pattern) {
      case 'perfectSquare':
        return this.generatePerfectSquareProblem(params)
      case 'sumOfCubes':
        return this.generateSumOfCubesProblem(params)
      case 'differenceOfCubes':
        return this.generateDifferenceOfCubesProblem(params)
      default:
        return this.generatePerfectSquareProblem(params)
    }
  }
  
  generatePerfectSquareProblem(params) {
    const a = Math.floor(Math.random() * 6) + 2
    const expression = `x^2 + ${2 * a}x + ${a * a}`
    const factored = `(x + ${a})^2`
    
    const steps = [
      `\\text{Given: } ${expression}`,
      `\\text{Recognize as perfect square trinomial: } a^2 + 2ab + b^2`,
      `\\text{Identify: } a = x, b = ${a}`,
      `\\text{Factor: } (a + b)^2 = ${factored}`
    ]
    
    return {
      question: `Factor the perfect square trinomial: ${expression}`,
      questionLaTeX: `\\text{Factor the perfect square trinomial: } ${expression}`,
      answer: factored,
      answerLaTeX: factored,
      steps: steps,
      metadata: {
        problemType: 'perfectSquare',
        difficulty: 'medium',
        estimatedTime: '3 minutes'
      }
    }
  }
  
  generateSumOfCubesProblem(params) {
    const a = Math.floor(Math.random() * 4) + 2
    const expression = `x^3 + ${a * a * a}`
    const factored = `(x + ${a})(x^2 - ${a}x + ${a * a})`
    
    const steps = [
      `\\text{Given: } ${expression}`,
      `\\text{Recognize as sum of cubes: } a^3 + b^3`,
      `\\text{Identify: } a = x, b = ${a}`,
      `\\text{Factor: } a^3 + b^3 = (a + b)(a^2 - ab + b^2)`,
      `\\text{Result: } ${factored}`
    ]
    
    return {
      question: `Factor the sum of cubes: ${expression}`,
      questionLaTeX: `\\text{Factor the sum of cubes: } ${expression}`,
      answer: factored,
      answerLaTeX: factored,
      steps: steps,
      metadata: {
        problemType: 'sumOfCubes',
        difficulty: 'hard',
        estimatedTime: '4 minutes'
      }
    }
  }
  
  generateDifferenceOfCubesProblem(params) {
    const a = Math.floor(Math.random() * 4) + 2
    const expression = `x^3 - ${a * a * a}`
    const factored = `(x - ${a})(x^2 + ${a}x + ${a * a})`
    
    const steps = [
      `\\text{Given: } ${expression}`,
      `\\text{Recognize as difference of cubes: } a^3 - b^3`,
      `\\text{Identify: } a = x, b = ${a}`,
      `\\text{Factor: } a^3 - b^3 = (a - b)(a^2 + ab + b^2)`,
      `\\text{Result: } ${factored}`
    ]
    
    return {
      question: `Factor the difference of cubes: ${expression}`,
      questionLaTeX: `\\text{Factor the difference of cubes: } ${expression}`,
      answer: factored,
      answerLaTeX: factored,
      steps: steps,
      metadata: {
        problemType: 'differenceOfCubes',
        difficulty: 'hard',
        estimatedTime: '4 minutes'
      }
    }
  }

  getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)]
  }
}

export default FactoringGenerator