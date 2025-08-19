import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Variables Generator
 * 
 * Generates problems involving understanding variables, variable expressions,
 * representing quantities with variables, and working with variable relationships.
 */
export class VariablesGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Variables',
      description: 'Understanding variables, expressions, and variable relationships in algebra',
      category: 'pre-algebra',
      difficulty: 'medium',
      icon: 'abc',
      tags: ['variables', 'expressions', 'algebra', 'representation'],
      gradeLevel: '6-8',
      estimatedTime: '50 seconds',
      exampleProblem: {
        question: 'If x represents a number, write an expression for "5 more than twice the number"',
        questionLaTeX: '\\text{If x represents a number, write an expression for "5 more than twice the number"}',
        answer: '2x + 5',
        answerLaTeX: '2x + 5'
      },
      
      // Default parameter values
      defaultParameters: {
        problemCount: 10,
        includeWritingExpressions: true,
        includeIdentifyingVariables: true,
        includeSubstitution: true,
        includeTablePatterns: true,
        includeWordToExpression: true,
        includeExpressionToWords: true,
        includeVariableProperties: false,
        includeMultipleVariables: false,
        allowNegatives: true,
        maxCoefficient: 10,
        maxConstant: 15,
        maxVariableValue: 8,
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
                description: 'How many variable problems to generate',
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
                description: 'Determines the difficulty of variable concepts',
                variant: 'cards',
                options: [
                  { 
                    value: 'basic', 
                    label: 'Basic',
                    description: 'Simple variable expressions and substitution'
                  },
                  { 
                    value: 'intermediate', 
                    label: 'Intermediate',
                    description: 'Multi-step expressions and patterns'
                  },
                  { 
                    value: 'advanced', 
                    label: 'Advanced',
                    description: 'Multiple variables and complex relationships'
                  }
                ],
                order: 2
              })
            }
          }),
          
          problemTypes: schemaV2.createCategory({
            id: 'problemTypes',
            label: 'Problem Types',
            description: 'Choose which types of variable problems to include',
            icon: 'abc',
            color: 'green',
            order: 2,
            parameters: {
              includeWritingExpressions: schemaV2.createParameter({
                type: 'boolean',
                label: 'Writing Expressions',
                description: 'Write algebraic expressions using variables',
                helpText: 'Examples: "3 more than x" = x + 3',
                order: 1
              }),
              includeWordToExpression: schemaV2.createParameter({
                type: 'boolean',
                label: 'Words to Expression',
                description: 'Convert word phrases to algebraic expressions',
                helpText: 'Translate verbal descriptions to algebra',
                order: 2
              }),
              includeExpressionToWords: schemaV2.createParameter({
                type: 'boolean',
                label: 'Expression to Words',
                description: 'Describe algebraic expressions in words',
                helpText: 'Translate algebra to verbal descriptions',
                order: 3
              }),
              includeSubstitution: schemaV2.createParameter({
                type: 'boolean',
                label: 'Variable Substitution',
                description: 'Substitute values for variables',
                helpText: 'Evaluate expressions by replacing variables',
                order: 4
              }),
              includeTablePatterns: schemaV2.createParameter({
                type: 'boolean',
                label: 'Table Patterns',
                description: 'Find patterns and write expressions from tables',
                helpText: 'Identify variable relationships in data',
                order: 5
              }),
              includeIdentifyingVariables: schemaV2.createParameter({
                type: 'boolean',
                label: 'Identifying Variables',
                description: 'Identify what variables represent',
                helpText: 'Understand the meaning of variables',
                order: 6
              })
            }
          }),
          
          advancedFeatures: schemaV2.createCategory({
            id: 'advancedFeatures',
            label: 'Advanced Features',
            description: 'More complex variable concepts',
            icon: 'auto_awesome',
            color: 'purple',
            order: 3,
            parameters: {
              includeMultipleVariables: schemaV2.createParameter({
                type: 'boolean',
                label: 'Multiple Variables',
                description: 'Use expressions with x, y, z, etc.',
                helpText: 'Examples: 3x + 2y, a + b + c',
                order: 1
              }),
              includeVariableProperties: schemaV2.createParameter({
                type: 'boolean',
                label: 'Variable Properties',
                description: 'Understand commutative, associative properties',
                helpText: 'x + y = y + x, 2(3x) = 6x',
                order: 2
              })
            }
          }),
          
          numberSettings: schemaV2.createCategory({
            id: 'numberSettings',
            label: 'Number Settings',
            description: 'Configure the ranges and types of numbers used',
            icon: 'tag',
            color: 'orange',
            order: 4,
            parameters: {
              maxCoefficient: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Coefficient',
                description: 'Largest coefficient for variables',
                min: 2,
                max: 20,
                required: true,
                slider: true,
                presets: [5, 8, 10, 12],
                order: 1
              }),
              maxConstant: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Constant',
                description: 'Largest constant term in expressions',
                min: 5,
                max: 30,
                required: true,
                slider: true,
                presets: [10, 12, 15, 20],
                order: 2
              }),
              maxVariableValue: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Variable Value',
                description: 'Largest value to substitute for variables',
                min: 3,
                max: 15,
                required: true,
                slider: true,
                presets: [5, 6, 8, 10],
                order: 3
              }),
              allowNegatives: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Negative Numbers',
                description: 'Include negative coefficients and values',
                helpText: 'Adds complexity with negative terms',
                order: 4
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
              showSteps: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Solution Steps',
                description: 'Include step-by-step explanations',
                helpText: 'Shows reasoning and translation steps',
                order: 1
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'basic-variables',
            label: 'Basic Variables',
            description: 'Introduction to variable concepts',
            icon: 'looks_one',
            category: 'difficulty',
            values: {
              problemCount: 10,
              includeWritingExpressions: true,
              includeIdentifyingVariables: true,
              includeSubstitution: true,
              includeTablePatterns: false,
              includeWordToExpression: true,
              includeExpressionToWords: false,
              includeVariableProperties: false,
              includeMultipleVariables: false,
              allowNegatives: false,
              maxCoefficient: 6,
              maxConstant: 10,
              maxVariableValue: 5,
              showSteps: true,
              complexityLevel: 'basic'
            }
          }),
          
          schemaV2.createPreset({
            id: 'expression-translation',
            label: 'Expression Translation',
            description: 'Focus on translating between words and expressions',
            icon: 'translate',
            category: 'scope',
            values: {
              problemCount: 12,
              includeWritingExpressions: true,
              includeIdentifyingVariables: false,
              includeSubstitution: false,
              includeTablePatterns: false,
              includeWordToExpression: true,
              includeExpressionToWords: true,
              includeVariableProperties: false,
              includeMultipleVariables: false,
              allowNegatives: true,
              maxCoefficient: 8,
              maxConstant: 12,
              maxVariableValue: 6,
              showSteps: true,
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'substitution-practice',
            label: 'Substitution Practice',
            description: 'Practice evaluating expressions with variables',
            icon: 'calculate',
            category: 'scope',
            values: {
              problemCount: 10,
              includeWritingExpressions: false,
              includeIdentifyingVariables: false,
              includeSubstitution: true,
              includeTablePatterns: true,
              includeWordToExpression: false,
              includeExpressionToWords: false,
              includeVariableProperties: false,
              includeMultipleVariables: true,
              allowNegatives: true,
              maxCoefficient: 8,
              maxConstant: 15,
              maxVariableValue: 8,
              showSteps: true,
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'pattern-analysis',
            label: 'Pattern Analysis',
            description: 'Find patterns and create expressions from tables',
            icon: 'timeline',
            category: 'scope',
            values: {
              problemCount: 8,
              includeWritingExpressions: true,
              includeIdentifyingVariables: true,
              includeSubstitution: false,
              includeTablePatterns: true,
              includeWordToExpression: false,
              includeExpressionToWords: false,
              includeVariableProperties: false,
              includeMultipleVariables: false,
              allowNegatives: false,
              maxCoefficient: 6,
              maxConstant: 10,
              maxVariableValue: 6,
              showSteps: true,
              complexityLevel: 'basic'
            }
          }),
          
          schemaV2.createPreset({
            id: 'advanced-variables',
            label: 'Advanced Variables',
            description: 'Multiple variables and properties',
            icon: 'trending_up',
            category: 'difficulty',
            values: {
              problemCount: 10,
              includeWritingExpressions: true,
              includeIdentifyingVariables: false,
              includeSubstitution: true,
              includeTablePatterns: false,
              includeWordToExpression: true,
              includeExpressionToWords: true,
              includeVariableProperties: true,
              includeMultipleVariables: true,
              allowNegatives: true,
              maxCoefficient: 12,
              maxConstant: 20,
              maxVariableValue: 10,
              showSteps: true,
              complexityLevel: 'advanced'
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive-variables',
            label: 'Comprehensive Variables',
            description: 'Complete practice with all variable concepts',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 15,
              includeWritingExpressions: true,
              includeIdentifyingVariables: true,
              includeSubstitution: true,
              includeTablePatterns: true,
              includeWordToExpression: true,
              includeExpressionToWords: true,
              includeVariableProperties: false,
              includeMultipleVariables: true,
              allowNegatives: true,
              maxCoefficient: 10,
              maxConstant: 15,
              maxVariableValue: 8,
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
    if (!params.includeWritingExpressions && !params.includeIdentifyingVariables && 
        !params.includeSubstitution && !params.includeTablePatterns && 
        !params.includeWordToExpression && !params.includeExpressionToWords) {
      customErrors.push('At least one problem type must be enabled')
    }
    if (customErrors.length > 0) {
      throw new Error(`Invalid parameters: ${customErrors.join(', ')}`)
    }
    
    // Build array of enabled problem types
    const problemTypes = []
    if (params.includeWritingExpressions) problemTypes.push('writingExpressions')
    if (params.includeIdentifyingVariables) problemTypes.push('identifyingVariables')
    if (params.includeSubstitution) problemTypes.push('substitution')
    if (params.includeTablePatterns) problemTypes.push('tablePatterns')
    if (params.includeWordToExpression) problemTypes.push('wordToExpression')
    if (params.includeExpressionToWords) problemTypes.push('expressionToWords')
    if (params.includeVariableProperties) problemTypes.push('variableProperties')
    
    if (problemTypes.length === 0) {
      throw new Error('At least one problem type must be enabled')
    }
    
    const problemType = this.getRandomElement(problemTypes)
    
    return this.generateVariableProblem(problemType, params)
  }

  /**
   * Generate a variable problem
   * @param {string} problemType - Type of problem
   * @param {Object} params - Generation parameters
   * @returns {Object} Problem object
   */
  generateVariableProblem(problemType, params) {
    switch (problemType) {
      case 'writingExpressions':
        return this.generateWritingExpressionsProblem(params)
      case 'identifyingVariables':
        return this.generateIdentifyingVariablesProblem(params)
      case 'substitution':
        return this.generateSubstitutionProblem(params)
      case 'tablePatterns':
        return this.generateTablePatternsProblem(params)
      case 'wordToExpression':
        return this.generateWordToExpressionProblem(params)
      case 'expressionToWords':
        return this.generateExpressionToWordsProblem(params)
      case 'variableProperties':
        return this.generateVariablePropertiesProblem(params)
      default:
        return this.generateWritingExpressionsProblem(params)
    }
  }
  
  generateWritingExpressionsProblem(params) {
    const variable = params.includeMultipleVariables ? this.getRandomElement(['x', 'y', 'n', 't', 'a']) : 'x'
    const coefficient = Math.floor(Math.random() * params.maxCoefficient) + 1
    const constant = Math.floor(Math.random() * params.maxConstant) + 1
    const operation = this.getRandomElement(['more than', 'less than', 'times', 'increased by', 'decreased by'])
    
    let description, expression
    
    switch (operation) {
      case 'more than':
        description = `${constant} more than ${coefficient} times a number`
        expression = `${coefficient}${variable} + ${constant}`
        break
      case 'less than':
        description = `${coefficient} times a number, decreased by ${constant}`
        expression = `${coefficient}${variable} - ${constant}`
        break
      case 'increased by':
        description = `A number increased by ${constant}`
        expression = `${variable} + ${constant}`
        break
      case 'decreased by':
        description = `A number decreased by ${constant}`
        expression = `${variable} - ${constant}`
        break
      default:
        description = `${coefficient} times a number`
        expression = `${coefficient}${variable}`
    }
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Let } ${variable} = \\text{the unknown number}`)
      steps.push(`\\text{Translate each part of the phrase}`)
      steps.push(`\\text{\"${operation}\" indicates the operation}`)
      steps.push(`\\text{Expression: } ${expression}`)
    }
    
    return {
      question: `Write an algebraic expression for: "${description}". Use ${variable} for the number.`,
      questionLaTeX: `\\text{Write an algebraic expression for: "${description}".} \\\\\\\\ \\text{Use } ${variable} \\text{ for the number.}`,
      answer: expression,
      answerLaTeX: expression,
      steps: steps,
      metadata: {
        problemType: 'writingExpressions',
        description: description,
        variable: variable,
        expression: expression,
        difficulty: 'medium',
        estimatedTime: '45 seconds'
      }
    }
  }
  
  generateIdentifyingVariablesProblem(params) {
    const scenarios = [
      {
        context: 'age',
        variable: 'a',
        description: 'Let a represent a person\'s age in years',
        expression: 'a + 5',
        meaning: 'the person\'s age in 5 years'
      },
      {
        context: 'money',
        variable: 'm',
        description: 'Let m represent the amount of money Sarah has',
        expression: '2m',
        meaning: 'twice the amount of money Sarah has'
      },
      {
        context: 'height',
        variable: 'h',
        description: 'Let h represent the height of a building',
        expression: 'h - 10',
        meaning: 'the height of a building that is 10 feet shorter'
      },
      {
        context: 'speed',
        variable: 's',
        description: 'Let s represent the speed of a car',
        expression: '3s',
        meaning: 'three times the speed of the car'
      }
    ]
    
    const scenario = this.getRandomElement(scenarios)
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{${scenario.description}}`)
      steps.push(`\\text{Analyze the expression } ${scenario.expression}`)
      steps.push(`\\text{This represents: ${scenario.meaning}}`)
    }
    
    return {
      question: `${scenario.description}. What does the expression ${scenario.expression} represent?`,
      questionLaTeX: `\\text{${scenario.description}. What does the expression } ${scenario.expression} \\text{ represent?}`,
      answer: scenario.meaning,
      answerLaTeX: `\\text{${scenario.meaning}}`,
      steps: steps,
      metadata: {
        problemType: 'identifyingVariables',
        context: scenario.context,
        variable: scenario.variable,
        expression: scenario.expression,
        meaning: scenario.meaning,
        difficulty: 'medium',
        estimatedTime: '40 seconds'
      }
    }
  }
  
  generateSubstitutionProblem(params) {
    const variables = params.includeMultipleVariables ? ['x', 'y'] : ['x']
    const numVars = Math.random() < 0.5 || !params.includeMultipleVariables ? 1 : 2
    
    if (numVars === 1) {
      const variable = variables[0]
      const coefficient = Math.floor(Math.random() * params.maxCoefficient) + 1
      const constant = params.allowNegatives && Math.random() < 0.4 ? 
        -(Math.floor(Math.random() * params.maxConstant) + 1) : 
        Math.floor(Math.random() * params.maxConstant) + 1
      const value = Math.floor(Math.random() * params.maxVariableValue) + 1
      
      const expression = constant >= 0 ? `${coefficient}${variable} + ${constant}` : `${coefficient}${variable} - ${Math.abs(constant)}`
      const result = coefficient * value + constant
      
      const steps = []
      if (params.showSteps) {
        steps.push(`\\text{Substitute } ${variable} = ${value} \\text{ into } ${expression}`)
        steps.push(`${coefficient}(${value}) ${constant >= 0 ? '+' : '-'} ${Math.abs(constant)}`)
        steps.push(`${coefficient * value} ${constant >= 0 ? '+' : '-'} ${Math.abs(constant)} = ${result}`)
      }
      
      return {
        question: `Evaluate ${expression} when ${variable} = ${value}`,
        questionLaTeX: `\\text{Evaluate } ${expression} \\text{ when } ${variable} = ${value}`,
        answer: result.toString(),
        answerLaTeX: result.toString(),
        steps: steps,
        metadata: {
          problemType: 'substitution',
          expression: expression,
          variable: variable,
          value: value,
          result: result,
          difficulty: 'medium',
          estimatedTime: '40 seconds'
        }
      }
    } else {
      // Two variables
      const var1 = 'x', var2 = 'y'
      const coeff1 = Math.floor(Math.random() * params.maxCoefficient) + 1
      const coeff2 = Math.floor(Math.random() * params.maxCoefficient) + 1
      const value1 = Math.floor(Math.random() * params.maxVariableValue) + 1
      const value2 = Math.floor(Math.random() * params.maxVariableValue) + 1
      
      const expression = `${coeff1}${var1} + ${coeff2}${var2}`
      const result = coeff1 * value1 + coeff2 * value2
      
      const steps = []
      if (params.showSteps) {
        steps.push(`\\text{Substitute } ${var1} = ${value1} \\text{ and } ${var2} = ${value2}`)
        steps.push(`${coeff1}(${value1}) + ${coeff2}(${value2})`)
        steps.push(`${coeff1 * value1} + ${coeff2 * value2} = ${result}`)
      }
      
      return {
        question: `Evaluate ${expression} when ${var1} = ${value1} and ${var2} = ${value2}`,
        questionLaTeX: `\\text{Evaluate } ${expression} \\text{ when } ${var1} = ${value1} \\text{ and } ${var2} = ${value2}`,
        answer: result.toString(),
        answerLaTeX: result.toString(),
        steps: steps,
        metadata: {
          problemType: 'substitution',
          expression: expression,
          variables: [var1, var2],
          values: [value1, value2],
          result: result,
          difficulty: 'medium',
          estimatedTime: '50 seconds'
        }
      }
    }
  }
  
  generateTablePatternsProblem(params) {
    const variable = 'n'
    const coefficient = Math.floor(Math.random() * 4) + 2 // 2-5
    const constant = Math.floor(Math.random() * 6) + 1 // 1-6
    
    // Generate table values
    const inputs = [1, 2, 3, 4]
    const outputs = inputs.map(n => coefficient * n + constant)
    
    const expression = `${coefficient}${variable} + ${constant}`
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Look for a pattern in the table}`)
      steps.push(`\\text{When } ${variable} \\text{ increases by 1, output increases by } ${coefficient}`)
      steps.push(`\\text{When } ${variable} = 1, \\text{output} = ${outputs[0]}`)
      steps.push(`\\text{Pattern: multiply by } ${coefficient}, \\text{then add } ${constant}`)
      steps.push(`\\text{Expression: } ${expression}`)
    }
    
    const tableStr = inputs.map((input, i) => `${input} → ${outputs[i]}`).join(', ')
    
    return {
      question: `Look at this pattern: ${tableStr}. Write an expression for the pattern using variable ${variable}.`,
      questionLaTeX: `\\text{Look at this pattern: } ${tableStr}. \\\\\\\\ \\text{Write an expression for the pattern using variable } ${variable}.`,
      answer: expression,
      answerLaTeX: expression,
      steps: steps,
      metadata: {
        problemType: 'tablePatterns',
        inputs: inputs,
        outputs: outputs,
        coefficient: coefficient,
        constant: constant,
        expression: expression,
        difficulty: 'medium',
        estimatedTime: '60 seconds'
      }
    }
  }
  
  generateWordToExpressionProblem(params) {
    const phrases = [
      {
        phrase: 'the sum of a number and 7',
        expression: 'x + 7',
        explanation: '"sum" means addition'
      },
      {
        phrase: 'twice a number minus 4',
        expression: '2x - 4',
        explanation: '"twice" means multiply by 2, "minus" means subtract'
      },
      {
        phrase: '5 less than a number',
        expression: 'x - 5',
        explanation: '"less than" means subtract from the number'
      },
      {
        phrase: 'the product of 3 and a number',
        expression: '3x',
        explanation: '"product" means multiplication'
      },
      {
        phrase: 'a number divided by 4',
        expression: 'x/4',
        explanation: '"divided by" indicates division'
      },
      {
        phrase: '8 more than half a number',
        expression: 'x/2 + 8',
        explanation: '"half" means divide by 2, "more than" means add'
      }
    ]
    
    const selected = this.getRandomElement(phrases)
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Let } x = \\text{the unknown number}`)
      steps.push(`\\text{Key phrase: "${selected.phrase}"}`)
      steps.push(`\\text{Translation: } ${selected.explanation}`)
      steps.push(`\\text{Expression: } ${selected.expression}`)
    }
    
    return {
      question: `Write an algebraic expression for "${selected.phrase}". Use x for the number.`,
      questionLaTeX: `\\text{Write an algebraic expression for "${selected.phrase}".} \\\\\\\\ \\text{Use x for the number.}`,
      answer: selected.expression,
      answerLaTeX: selected.expression,
      steps: steps,
      metadata: {
        problemType: 'wordToExpression',
        phrase: selected.phrase,
        expression: selected.expression,
        explanation: selected.explanation,
        difficulty: 'medium',
        estimatedTime: '45 seconds'
      }
    }
  }
  
  generateExpressionToWordsProblem(params) {
    const expressions = [
      {
        expression: 'x + 9',
        description: '9 more than a number',
        alternative: 'a number increased by 9'
      },
      {
        expression: '5x',
        description: '5 times a number',
        alternative: 'the product of 5 and a number'
      },
      {
        expression: 'x - 6',
        description: 'a number decreased by 6',
        alternative: '6 less than a number'
      },
      {
        expression: '2x + 3',
        description: '3 more than twice a number',
        alternative: 'twice a number, increased by 3'
      },
      {
        expression: 'x/4',
        description: 'a number divided by 4',
        alternative: 'one-fourth of a number'
      }
    ]
    
    const selected = this.getRandomElement(expressions)
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Analyze the expression: } ${selected.expression}`)
      steps.push(`\\text{Identify the operations and their order}`)
      steps.push(`\\text{Translate to words: ${selected.description}}`)
    }
    
    return {
      question: `Describe the expression ${selected.expression} in words.`,
      questionLaTeX: `\\text{Describe the expression } ${selected.expression} \\text{ in words.}`,
      answer: selected.description,
      answerLaTeX: `\\text{${selected.description}}`,
      steps: steps,
      metadata: {
        problemType: 'expressionToWords',
        expression: selected.expression,
        description: selected.description,
        alternative: selected.alternative,
        difficulty: 'medium',
        estimatedTime: '40 seconds'
      }
    }
  }
  
  generateVariablePropertiesProblem(params) {
    const properties = [
      {
        property: 'Commutative Property of Addition',
        example1: 'x + 5',
        example2: '5 + x',
        explanation: 'Addition is commutative: order doesn\'t matter'
      },
      {
        property: 'Commutative Property of Multiplication',
        example1: '3x',
        example2: 'x × 3',
        explanation: 'Multiplication is commutative: order doesn\'t matter'
      },
      {
        property: 'Distributive Property',
        example1: '2(x + 3)',
        example2: '2x + 6',
        explanation: 'Distribute the 2 to both terms inside parentheses'
      }
    ]
    
    const selected = this.getRandomElement(properties)
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{This demonstrates the } ${selected.property}`)
      steps.push(`\\text{${selected.explanation}}`)
      steps.push(`\\text{${selected.example1} = ${selected.example2}}`)
    }
    
    return {
      question: `Which property shows that ${selected.example1} = ${selected.example2}?`,
      questionLaTeX: `\\text{Which property shows that } ${selected.example1} = ${selected.example2}\\text{?}`,
      answer: selected.property,
      answerLaTeX: `\\text{${selected.property}}`,
      steps: steps,
      metadata: {
        problemType: 'variableProperties',
        property: selected.property,
        examples: [selected.example1, selected.example2],
        explanation: selected.explanation,
        difficulty: 'medium',
        estimatedTime: '45 seconds'
      }
    }
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

export default VariablesGenerator