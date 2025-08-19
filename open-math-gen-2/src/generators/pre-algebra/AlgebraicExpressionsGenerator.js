import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Algebraic Expressions Generator
 * 
 * Generates problems involving algebraic expressions, including simplifying,
 * evaluating, writing expressions from word problems, and combining like terms.
 */
export class AlgebraicExpressionsGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Algebraic Expressions',
      description: 'Simplifying, evaluating, and writing algebraic expressions with variables',
      category: 'pre-algebra',
      difficulty: 'medium',
      icon: 'functions',
      tags: ['algebra', 'expressions', 'variables', 'like terms'],
      gradeLevel: '6-9',
      estimatedTime: '60 seconds',
      exampleProblem: {
        question: 'Simplify: 3x + 5x - 2',
        questionLaTeX: '\\text{Simplify: } 3x + 5x - 2',
        answer: '8x - 2',
        answerLaTeX: '8x - 2'
      },
      
      // Default parameter values
      defaultParameters: {
        problemCount: 10,
        includeSimplifying: true,
        includeEvaluating: true,
        includeWritingExpressions: true,
        includeCombiningLikeTerms: true,
        includeDistributive: false,
        includeSubstitution: true,
        includeWordProblems: true,
        maxCoefficient: 10,
        maxConstant: 20,
        maxVariableValue: 5,
        allowNegatives: true,
        allowFractions: false,
        maxTerms: 4,
        showSteps: true,
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
                description: 'How many algebraic expression problems to generate',
                min: 1,
                max: 50,
                required: true,
                slider: true,
                presets: [5, 8, 10, 15],
                order: 1
              }),
              complexityLevel: schemaV2.createParameter({
                type: 'select',
                label: 'Complexity Level',
                description: 'Determines the difficulty of expressions',
                variant: 'cards',
                options: [
                  { 
                    value: 'basic', 
                    label: 'Basic',
                    description: 'Simple expressions with small coefficients'
                  },
                  { 
                    value: 'intermediate', 
                    label: 'Intermediate',
                    description: 'Multi-variable expressions with mixed operations'
                  },
                  { 
                    value: 'advanced', 
                    label: 'Advanced',
                    description: 'Complex expressions with fractions and distribution'
                  }
                ],
                order: 2
              })
            }
          }),
          
          problemTypes: schemaV2.createCategory({
            id: 'problemTypes',
            label: 'Problem Types',
            description: 'Choose which types of expression problems to include',
            icon: 'functions',
            color: 'green',
            order: 2,
            parameters: {
              includeCombiningLikeTerms: schemaV2.createParameter({
                type: 'boolean',
                label: 'Combining Like Terms',
                description: 'Simplify expressions by combining like terms',
                helpText: 'Examples: 3x + 5x = 8x, 2y - 7y = -5y',
                order: 1
              }),
              includeSimplifying: schemaV2.createParameter({
                type: 'boolean',
                label: 'Simplifying Expressions',
                description: 'General simplification of algebraic expressions',
                helpText: 'Examples: 2(x + 3) + 4x = 6x + 6',
                order: 2
              }),
              includeEvaluating: schemaV2.createParameter({
                type: 'boolean',
                label: 'Evaluating Expressions',
                description: 'Find the value of expressions for given variable values',
                helpText: 'Examples: If x = 3, find 2x + 5',
                order: 3
              }),
              includeSubstitution: schemaV2.createParameter({
                type: 'boolean',
                label: 'Substitution',
                description: 'Substitute values into expressions',
                helpText: 'Replace variables with given numbers',
                order: 4
              }),
              includeWritingExpressions: schemaV2.createParameter({
                type: 'boolean',
                label: 'Writing Expressions',
                description: 'Write algebraic expressions from word descriptions',
                helpText: 'Examples: "5 more than twice a number"',
                order: 5
              }),
              includeDistributive: schemaV2.createParameter({
                type: 'boolean',
                label: 'Distributive Property',
                description: 'Apply distributive property to simplify',
                helpText: 'Examples: 3(x + 4) = 3x + 12',
                order: 6
              })
            }
          }),
          
          expressionSettings: schemaV2.createCategory({
            id: 'expressionSettings',
            label: 'Expression Settings',
            description: 'Control the complexity and structure of expressions',
            icon: 'tune',
            color: 'purple',
            order: 3,
            parameters: {
              maxTerms: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Terms',
                description: 'Maximum number of terms in an expression',
                min: 2,
                max: 8,
                required: true,
                slider: true,
                presets: [2, 3, 4, 5],
                helpText: 'Number of terms like: 3x + 2y - 5 (3 terms)',
                order: 1
              }),
              maxCoefficient: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Coefficient',
                description: 'Largest coefficient for variables',
                min: 2,
                max: 20,
                required: true,
                slider: true,
                presets: [5, 8, 10, 15],
                helpText: 'The number in front of variables (e.g., 3 in 3x)',
                order: 2
              }),
              maxConstant: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Constant',
                description: 'Largest constant term value',
                min: 1,
                max: 50,
                required: true,
                slider: true,
                presets: [10, 15, 20, 30],
                helpText: 'Standalone numbers in expressions',
                order: 3
              }),
              maxVariableValue: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Variable Value',
                description: 'Largest value to substitute for variables',
                min: 1,
                max: 10,
                required: true,
                slider: true,
                presets: [3, 5, 7, 10],
                helpText: 'Used when evaluating expressions',
                order: 4
              })
            }
          }),
          
          numberSettings: schemaV2.createCategory({
            id: 'numberSettings',
            label: 'Number Settings',
            description: 'Configure number types and ranges',
            icon: 'tag',
            color: 'orange',
            order: 4,
            parameters: {
              allowNegatives: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Negative Numbers',
                description: 'Include negative coefficients and constants',
                helpText: 'Adds complexity with negative terms',
                order: 1
              }),
              allowFractions: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Fractions',
                description: 'Include fractional coefficients',
                helpText: 'Examples: (1/2)x + 3, (3/4)y - 1',
                order: 2
              })
            }
          }),
          
          presentation: schemaV2.createCategory({
            id: 'presentation',
            label: 'Presentation & Format',
            description: 'Control how problems are displayed',
            icon: 'palette',
            color: 'teal',
            order: 5,
            parameters: {
              includeWordProblems: schemaV2.createParameter({
                type: 'boolean',
                label: 'Include Word Problems',
                description: 'Include real-world algebraic expression problems',
                helpText: 'Writing expressions from word descriptions',
                order: 1
              }),
              showSteps: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Solution Steps',
                description: 'Include step-by-step simplification process',
                helpText: 'Shows intermediate steps in simplification',
                order: 2
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'basic-expressions',
            label: 'Basic Expressions',
            description: 'Simple combining like terms and evaluation',
            icon: 'looks_one',
            category: 'difficulty',
            values: {
              problemCount: 10,
              includeSimplifying: false,
              includeEvaluating: true,
              includeWritingExpressions: false,
              includeCombiningLikeTerms: true,
              includeDistributive: false,
              includeSubstitution: true,
              includeWordProblems: false,
              maxCoefficient: 5,
              maxConstant: 10,
              maxVariableValue: 5,
              allowNegatives: false,
              allowFractions: false,
              maxTerms: 3,
              showSteps: true,
              complexityLevel: 'basic'
            }
          }),
          
          schemaV2.createPreset({
            id: 'simplifying-focus',
            label: 'Simplifying Focus',
            description: 'Emphasize simplification and combining terms',
            icon: 'compress',
            category: 'scope',
            values: {
              problemCount: 12,
              includeSimplifying: true,
              includeEvaluating: false,
              includeWritingExpressions: false,
              includeCombiningLikeTerms: true,
              includeDistributive: true,
              includeSubstitution: false,
              includeWordProblems: false,
              maxCoefficient: 8,
              maxConstant: 15,
              maxVariableValue: 5,
              allowNegatives: true,
              allowFractions: false,
              maxTerms: 4,
              showSteps: true,
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'word-expressions',
            label: 'Word Problems',
            description: 'Writing expressions from word problems',
            icon: 'menu_book',
            category: 'scope',
            values: {
              problemCount: 8,
              includeSimplifying: false,
              includeEvaluating: false,
              includeWritingExpressions: true,
              includeCombiningLikeTerms: false,
              includeDistributive: false,
              includeSubstitution: false,
              includeWordProblems: true,
              maxCoefficient: 6,
              maxConstant: 12,
              maxVariableValue: 5,
              allowNegatives: false,
              allowFractions: false,
              maxTerms: 3,
              showSteps: true,
              complexityLevel: 'basic'
            }
          }),
          
          schemaV2.createPreset({
            id: 'evaluation-practice',
            label: 'Evaluation Practice',
            description: 'Focus on evaluating expressions with substitution',
            icon: 'calculate',
            category: 'scope',
            values: {
              problemCount: 12,
              includeSimplifying: false,
              includeEvaluating: true,
              includeWritingExpressions: false,
              includeCombiningLikeTerms: false,
              includeDistributive: false,
              includeSubstitution: true,
              includeWordProblems: false,
              maxCoefficient: 7,
              maxConstant: 15,
              maxVariableValue: 8,
              allowNegatives: true,
              allowFractions: false,
              maxTerms: 4,
              showSteps: true,
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'advanced-expressions',
            label: 'Advanced Expressions',
            description: 'Complex expressions with distributive property',
            icon: 'trending_up',
            category: 'difficulty',
            values: {
              problemCount: 10,
              includeSimplifying: true,
              includeEvaluating: true,
              includeWritingExpressions: false,
              includeCombiningLikeTerms: true,
              includeDistributive: true,
              includeSubstitution: true,
              includeWordProblems: false,
              maxCoefficient: 12,
              maxConstant: 25,
              maxVariableValue: 10,
              allowNegatives: true,
              allowFractions: true,
              maxTerms: 6,
              showSteps: false,
              complexityLevel: 'advanced'
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive-expressions',
            label: 'Comprehensive Expressions',
            description: 'Complete practice with all expression concepts',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 15,
              includeSimplifying: true,
              includeEvaluating: true,
              includeWritingExpressions: true,
              includeCombiningLikeTerms: true,
              includeDistributive: true,
              includeSubstitution: true,
              includeWordProblems: true,
              maxCoefficient: 10,
              maxConstant: 20,
              maxVariableValue: 6,
              allowNegatives: true,
              allowFractions: false,
              maxTerms: 5,
              showSteps: true,
              complexityLevel: 'intermediate'
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
    if (!params.includeSimplifying && !params.includeEvaluating && !params.includeWritingExpressions &&
        !params.includeCombiningLikeTerms && !params.includeDistributive && !params.includeSubstitution) {
      customErrors.push('At least one problem type must be enabled')
    }
    if (customErrors.length > 0) {
      throw new Error(`Invalid parameters: ${customErrors.join(', ')}`)
    }
    
    // Build array of enabled problem types
    const problemTypes = []
    if (params.includeCombiningLikeTerms) problemTypes.push('combiningLikeTerms')
    if (params.includeSimplifying) problemTypes.push('simplifying')
    if (params.includeEvaluating) problemTypes.push('evaluating')
    if (params.includeSubstitution) problemTypes.push('substitution')
    if (params.includeWritingExpressions) problemTypes.push('writingExpressions')
    if (params.includeDistributive) problemTypes.push('distributive')
    
    if (problemTypes.length === 0) {
      throw new Error('At least one problem type must be enabled')
    }
    
    const problemType = this.getRandomElement(problemTypes)
    
    // Determine if this should be a word problem
    if (params.includeWordProblems && problemType === 'writingExpressions' && Math.random() < 0.8) {
      return this.generateWordProblem(params)
    } else {
      return this.generateExpressionProblem(problemType, params)
    }
  }

  /**
   * Generate an expression problem
   * @param {string} problemType - Type of problem
   * @param {Object} params - Generation parameters
   * @returns {Object} Problem object
   */
  generateExpressionProblem(problemType, params) {
    switch (problemType) {
      case 'combiningLikeTerms':
        return this.generateCombiningLikeTermsProblem(params)
      case 'simplifying':
        return this.generateSimplifyingProblem(params)
      case 'evaluating':
        return this.generateEvaluatingProblem(params)
      case 'substitution':
        return this.generateSubstitutionProblem(params)
      case 'writingExpressions':
        return this.generateWritingExpressionsProblem(params)
      case 'distributive':
        return this.generateDistributiveProblem(params)
      default:
        return this.generateCombiningLikeTermsProblem(params)
    }
  }
  
  generateCombiningLikeTermsProblem(params) {
    const variables = ['x', 'y', 'z']
    const variable = this.getRandomElement(variables)
    const termCount = Math.floor(Math.random() * (params.maxTerms - 2)) + 2 // At least 2 like terms
    
    const terms = []
    let totalCoefficient = 0
    let constantTerm = 0
    
    // Generate like terms
    for (let i = 0; i < termCount; i++) {
      const coeff = this.generateCoefficient(params)
      totalCoefficient += coeff
      terms.push({ coefficient: coeff, variable: variable, isConstant: false })
    }
    
    // Maybe add a constant term
    if (Math.random() < 0.6) {
      constantTerm = this.generateConstant(params)
      terms.push({ coefficient: constantTerm, variable: '', isConstant: true })
    }
    
    // Shuffle terms
    const shuffledTerms = this.shuffleArray([...terms])
    const expression = this.formatExpression(shuffledTerms)
    const answer = this.formatSimplifiedExpression(totalCoefficient, variable, constantTerm)
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Identify like terms with variable } ${variable}`)
      steps.push(`\\text{Combine coefficients: } ${terms.filter(t => !t.isConstant).map(t => t.coefficient).join(' + ')} = ${totalCoefficient}`)
      if (constantTerm !== 0) {
        steps.push(`\\text{Keep constant term: } ${constantTerm}`)
      }
      steps.push(`\\text{Simplified: } ${answer}`)
    }
    
    return {
      question: `Simplify: ${expression}`,
      questionLaTeX: `\\text{Simplify: } ${expression}`,
      answer: answer,
      answerLaTeX: answer,
      steps: steps,
      metadata: {
        problemType: 'combiningLikeTerms',
        variable: variable,
        originalTerms: terms,
        combinedCoefficient: totalCoefficient,
        constantTerm: constantTerm,
        difficulty: 'medium',
        estimatedTime: '45 seconds'
      }
    }
  }
  
  generateEvaluatingProblem(params) {
    const variables = ['x', 'y', 'n', 't']
    const variable = this.getRandomElement(variables)
    const value = Math.floor(Math.random() * params.maxVariableValue) + 1
    
    // Generate a simple expression
    const coefficient = this.generateCoefficient(params)
    const constant = Math.random() < 0.7 ? this.generateConstant(params) : 0
    
    let expression, answer
    if (constant === 0) {
      expression = `${this.formatCoefficient(coefficient)}${variable}`
      answer = coefficient * value
    } else {
      const operation = constant >= 0 ? '+' : '-'
      const absConstant = Math.abs(constant)
      expression = `${this.formatCoefficient(coefficient)}${variable} ${operation} ${absConstant}`
      answer = coefficient * value + constant
    }
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Substitute } ${variable} = ${value} \\text{ into the expression}`)
      if (constant === 0) {
        steps.push(`${this.formatCoefficient(coefficient)}(${value}) = ${answer}`)
      } else {
        const operation = constant >= 0 ? '+' : '-'
        const absConstant = Math.abs(constant)
        steps.push(`${this.formatCoefficient(coefficient)}(${value}) ${operation} ${absConstant}`)
        steps.push(`${coefficient * value} ${operation} ${absConstant} = ${answer}`)
      }
    }
    
    return {
      question: `Evaluate ${expression} when ${variable} = ${value}`,
      questionLaTeX: `\\text{Evaluate } ${expression} \\text{ when } ${variable} = ${value}`,
      answer: answer.toString(),
      answerLaTeX: answer.toString(),
      steps: steps,
      metadata: {
        problemType: 'evaluating',
        expression: expression,
        variable: variable,
        value: value,
        result: answer,
        difficulty: 'medium',
        estimatedTime: '40 seconds'
      }
    }
  }
  
  generateSubstitutionProblem(params) {
    const variables = ['a', 'b', 'x', 'y']
    const variable1 = this.getRandomElement(variables)
    let variable2 = this.getRandomElement(variables)
    while (variable2 === variable1) {
      variable2 = this.getRandomElement(variables)
    }
    
    const value1 = Math.floor(Math.random() * params.maxVariableValue) + 1
    const value2 = Math.floor(Math.random() * params.maxVariableValue) + 1
    
    const coeff1 = this.generateCoefficient(params)
    const coeff2 = this.generateCoefficient(params)
    const constant = Math.random() < 0.5 ? this.generateConstant(params) : 0
    
    let expression = `${this.formatCoefficient(coeff1)}${variable1}`
    if (coeff2 >= 0) {
      expression += ` + ${this.formatCoefficient(coeff2)}${variable2}`
    } else {
      expression += ` - ${this.formatCoefficient(Math.abs(coeff2))}${variable2}`
    }
    
    if (constant !== 0) {
      if (constant >= 0) {
        expression += ` + ${constant}`
      } else {
        expression += ` - ${Math.abs(constant)}`
      }
    }
    
    const answer = coeff1 * value1 + coeff2 * value2 + constant
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Substitute } ${variable1} = ${value1} \\text{ and } ${variable2} = ${value2}`)
      steps.push(`${this.formatCoefficient(coeff1)}(${value1}) + ${this.formatCoefficient(coeff2)}(${value2})${constant !== 0 ? (constant >= 0 ? ' + ' + constant : ' - ' + Math.abs(constant)) : ''}`)
      steps.push(`${coeff1 * value1} + ${coeff2 * value2}${constant !== 0 ? (constant >= 0 ? ' + ' + constant : ' - ' + Math.abs(constant)) : ''} = ${answer}`)
    }
    
    return {
      question: `Find the value of ${expression} when ${variable1} = ${value1} and ${variable2} = ${value2}`,
      questionLaTeX: `\\text{Find the value of } ${expression} \\text{ when } ${variable1} = ${value1} \\text{ and } ${variable2} = ${value2}`,
      answer: answer.toString(),
      answerLaTeX: answer.toString(),
      steps: steps,
      metadata: {
        problemType: 'substitution',
        expression: expression,
        variables: [variable1, variable2],
        values: [value1, value2],
        result: answer,
        difficulty: 'medium',
        estimatedTime: '50 seconds'
      }
    }
  }
  
  generateWritingExpressionsProblem(params) {
    const scenarios = [
      {
        description: 'Five more than twice a number',
        expression: '2x + 5',
        variable: 'x'
      },
      {
        description: 'Three less than four times a number',
        expression: '4n - 3',
        variable: 'n'
      },
      {
        description: 'The sum of a number and seven',
        expression: 'y + 7',
        variable: 'y'
      },
      {
        description: 'Half of a number decreased by two',
        expression: '\\frac{x}{2} - 2',
        variable: 'x'
      },
      {
        description: 'Six times a number plus one',
        expression: '6t + 1',
        variable: 't'
      }
    ]
    
    const scenario = this.getRandomElement(scenarios)
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Identify the variable (let's call it } ${scenario.variable}\\text{)}`)
      steps.push(`\\text{Translate each part of the phrase}`)
      steps.push(`\\text{Write the algebraic expression: } ${scenario.expression}`)
    }
    
    return {
      question: `Write an algebraic expression for: "${scenario.description}"`,
      questionLaTeX: `\\text{Write an algebraic expression for: "${scenario.description}"}`,
      answer: scenario.expression,
      answerLaTeX: scenario.expression,
      steps: steps,
      metadata: {
        problemType: 'writingExpressions',
        description: scenario.description,
        expression: scenario.expression,
        variable: scenario.variable,
        difficulty: 'medium',
        estimatedTime: '50 seconds'
      }
    }
  }
  
  generateDistributiveProblem(params) {
    const variable = this.getRandomElement(['x', 'y', 'a', 'b'])
    const factor = Math.floor(Math.random() * params.maxCoefficient) + 2
    const term1Coeff = Math.floor(Math.random() * 5) + 1
    const term2 = this.generateConstant(params)
    
    const expression = `${factor}(${this.formatCoefficient(term1Coeff)}${variable} + ${term2})`
    const distributedTerm1 = factor * term1Coeff
    const distributedTerm2 = factor * term2
    
    let answer = `${this.formatCoefficient(distributedTerm1)}${variable}`
    if (distributedTerm2 >= 0) {
      answer += ` + ${distributedTerm2}`
    } else {
      answer += ` - ${Math.abs(distributedTerm2)}`
    }
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Apply distributive property: } a(b + c) = ab + ac`)
      steps.push(`${factor} \\times ${this.formatCoefficient(term1Coeff)}${variable} + ${factor} \\times ${term2}`)
      steps.push(`${distributedTerm1}${variable} + ${distributedTerm2}`)
      steps.push(`\\text{Simplified: } ${answer}`)
    }
    
    return {
      question: `Simplify: ${expression}`,
      questionLaTeX: `\\text{Simplify: } ${expression}`,
      answer: answer,
      answerLaTeX: answer,
      steps: steps,
      metadata: {
        problemType: 'distributive',
        originalExpression: expression,
        factor: factor,
        variable: variable,
        distributedCoefficient: distributedTerm1,
        distributedConstant: distributedTerm2,
        difficulty: 'medium',
        estimatedTime: '45 seconds'
      }
    }
  }
  
  generateSimplifyingProblem(params) {
    // This combines multiple concepts for more complex simplification
    const variable = this.getRandomElement(['x', 'y', 'z'])
    const termCount = Math.floor(Math.random() * 2) + 3 // 3-4 terms
    
    const terms = []
    let totalCoefficient = 0
    let constantTotal = 0
    
    // Generate mixed terms
    for (let i = 0; i < termCount; i++) {
      if (i < 2 || Math.random() < 0.6) {
        // Variable term
        const coeff = this.generateCoefficient(params)
        totalCoefficient += coeff
        terms.push({ coefficient: coeff, variable: variable, isConstant: false })
      } else {
        // Constant term
        const constant = this.generateConstant(params)
        constantTotal += constant
        terms.push({ coefficient: constant, variable: '', isConstant: true })
      }
    }
    
    const shuffledTerms = this.shuffleArray([...terms])
    const expression = this.formatExpression(shuffledTerms)
    const answer = this.formatSimplifiedExpression(totalCoefficient, variable, constantTotal)
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Group like terms together}`)
      steps.push(`\\text{Combine variable terms: } ${totalCoefficient}${variable}`)
      if (constantTotal !== 0) {
        steps.push(`\\text{Combine constants: } ${constantTotal}`)
      }
      steps.push(`\\text{Final answer: } ${answer}`)
    }
    
    return {
      question: `Simplify: ${expression}`,
      questionLaTeX: `\\text{Simplify: } ${expression}`,
      answer: answer,
      answerLaTeX: answer,
      steps: steps,
      metadata: {
        problemType: 'simplifying',
        originalExpression: expression,
        variable: variable,
        combinedCoefficient: totalCoefficient,
        combinedConstant: constantTotal,
        difficulty: 'medium',
        estimatedTime: '50 seconds'
      }
    }
  }

  /**
   * Generate word problems
   */
  generateWordProblem(params) {
    const scenarios = [
      {
        situation: 'store pricing',
        description: 'A store charges $3 for each item plus a $5 handling fee',
        expression: '3n + 5',
        variable: 'n',
        variableDescription: 'number of items'
      },
      {
        situation: 'car rental',
        description: 'A car rental costs $25 per day plus $0.15 per mile',
        expression: '25d + 0.15m',
        variable: 'd',
        variableDescription: 'number of days'
      },
      {
        situation: 'phone plan',
        description: 'A phone plan costs $30 per month plus $2 for each gigabyte of data',
        expression: '30 + 2g',
        variable: 'g',
        variableDescription: 'gigabytes of data'
      }
    ]
    
    const scenario = this.getRandomElement(scenarios)
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Identify what varies (the variable)}`)
      steps.push(`\\text{Identify fixed costs and variable costs}`)
      steps.push(`\\text{Expression: } ${scenario.expression}`)
    }
    
    return {
      question: `Write an algebraic expression for: ${scenario.description}. Use ${scenario.variable} for ${scenario.variableDescription}.`,
      questionLaTeX: `\\text{Write an algebraic expression for: ${scenario.description}.} \\\\\\\\ \\text{Use } ${scenario.variable} \\text{ for ${scenario.variableDescription}.}`,
      answer: scenario.expression,
      answerLaTeX: scenario.expression,
      steps: steps,
      metadata: {
        problemType: 'wordProblem',
        situation: scenario.situation,
        expression: scenario.expression,
        variable: scenario.variable,
        difficulty: 'medium',
        estimatedTime: '60 seconds'
      }
    }
  }

  /**
   * Helper methods
   */
  generateCoefficient(params) {
    let coeff = Math.floor(Math.random() * params.maxCoefficient) + 1
    if (params.allowNegatives && Math.random() < 0.3) {
      coeff = -coeff
    }
    return coeff
  }
  
  generateConstant(params) {
    let constant = Math.floor(Math.random() * params.maxConstant) + 1
    if (params.allowNegatives && Math.random() < 0.4) {
      constant = -constant
    }
    return constant
  }
  
  formatCoefficient(coeff) {
    if (coeff === 1) return ''
    if (coeff === -1) return '-'
    return coeff.toString()
  }
  
  formatExpression(terms) {
    if (terms.length === 0) return '0'
    
    let expression = ''
    for (let i = 0; i < terms.length; i++) {
      const term = terms[i]
      let termStr = ''
      
      if (term.isConstant) {
        termStr = Math.abs(term.coefficient).toString()
      } else {
        const coeffStr = this.formatCoefficient(Math.abs(term.coefficient))
        termStr = coeffStr + term.variable
      }
      
      if (i === 0) {
        if (term.coefficient < 0) {
          expression += '-' + termStr
        } else {
          expression += termStr
        }
      } else {
        if (term.coefficient >= 0) {
          expression += ' + ' + termStr
        } else {
          expression += ' - ' + termStr
        }
      }
    }
    
    return expression
  }
  
  formatSimplifiedExpression(coefficient, variable, constant) {
    let result = ''
    
    if (coefficient !== 0) {
      result += this.formatCoefficient(coefficient) + variable
    }
    
    if (constant !== 0) {
      if (result === '') {
        result = constant.toString()
      } else {
        if (constant > 0) {
          result += ' + ' + constant
        } else {
          result += ' - ' + Math.abs(constant)
        }
      }
    }
    
    if (result === '') result = '0'
    return result
  }
  
  shuffleArray(array) {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
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

export default AlgebraicExpressionsGenerator