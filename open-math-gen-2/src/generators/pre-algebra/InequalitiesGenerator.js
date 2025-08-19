import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Inequalities Generator
 * 
 * Generates problems involving solving and graphing linear inequalities,
 * including one-step and two-step inequalities with proper inequality notation.
 */
export class InequalitiesGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Inequalities',
      description: 'Solve and graph linear inequalities with proper inequality symbols',
      category: 'pre-algebra',
      difficulty: 'medium',
      icon: 'compare_arrows',
      tags: ['inequalities', 'graphing', 'number line', 'algebra'],
      gradeLevel: '7-9',
      estimatedTime: '60 seconds',
      exampleProblem: {
        question: 'Solve: x + 3 > 7',
        questionLaTeX: '\\text{Solve: } x + 3 > 7',
        answer: 'x > 4',
        answerLaTeX: 'x > 4'
      },
      
      // Default parameter values
      defaultParameters: {
        problemCount: 10,
        includeOneStep: true,
        includeTwoStep: true,
        includeGraphing: true,
        includeWordProblems: false,
        includeCompoundInequalities: false,
        allowNegatives: true,
        maxCoefficient: 8,
        maxConstant: 15,
        maxSolution: 12,
        showSteps: true,
        includeAllSymbols: true,
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
                description: 'How many inequality problems to generate',
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
                description: 'Determines the difficulty of inequalities',
                variant: 'cards',
                options: [
                  { 
                    value: 'basic', 
                    label: 'Basic',
                    description: 'Simple one-step inequalities'
                  },
                  { 
                    value: 'intermediate', 
                    label: 'Intermediate',
                    description: 'Two-step inequalities and graphing'
                  },
                  { 
                    value: 'advanced', 
                    label: 'Advanced',
                    description: 'Complex inequalities and compound inequalities'
                  }
                ],
                order: 2
              })
            }
          }),
          
          inequalityTypes: schemaV2.createCategory({
            id: 'inequalityTypes',
            label: 'Inequality Types',
            description: 'Choose which types of inequalities to include',
            icon: 'compare_arrows',
            color: 'green',
            order: 2,
            parameters: {
              includeOneStep: schemaV2.createParameter({
                type: 'boolean',
                label: 'One-Step Inequalities',
                description: 'Simple inequalities like x + 5 > 8',
                helpText: 'Solve using one inverse operation',
                order: 1
              }),
              includeTwoStep: schemaV2.createParameter({
                type: 'boolean',
                label: 'Two-Step Inequalities',
                description: 'Inequalities like 3x + 2 ≤ 14',
                helpText: 'Require two inverse operations',
                order: 2
              }),
              includeGraphing: schemaV2.createParameter({
                type: 'boolean',
                label: 'Graphing on Number Line',
                description: 'Graph inequality solutions on number lines',
                helpText: 'Show solutions as intervals on number line',
                order: 3
              }),
              includeCompoundInequalities: schemaV2.createParameter({
                type: 'boolean',
                label: 'Compound Inequalities',
                description: 'Inequalities with "and" or "or" conditions',
                helpText: 'Examples: 2 < x < 8 or x < 3 or x > 7',
                order: 4
              })
            }
          }),
          
          symbols: schemaV2.createCategory({
            id: 'symbols',
            label: 'Inequality Symbols',
            description: 'Choose which inequality symbols to use',
            icon: 'code',
            color: 'purple',
            order: 3,
            parameters: {
              includeAllSymbols: schemaV2.createParameter({
                type: 'boolean',
                label: 'All Inequality Symbols',
                description: 'Use all symbols: <, >, ≤, ≥',
                helpText: 'When disabled, only uses < and >',
                order: 1
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
                max: 15,
                required: true,
                slider: true,
                presets: [5, 6, 8, 10],
                order: 1
              }),
              maxConstant: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Constant',
                description: 'Largest constant term in inequalities',
                min: 5,
                max: 30,
                required: true,
                slider: true,
                presets: [10, 12, 15, 20],
                order: 2
              }),
              maxSolution: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Solution',
                description: 'Largest possible solution value',
                min: 5,
                max: 25,
                required: true,
                slider: true,
                presets: [8, 10, 12, 15],
                order: 3
              }),
              allowNegatives: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Negative Numbers',
                description: 'Include negative coefficients and solutions',
                helpText: 'Adds complexity with negative values',
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
              includeWordProblems: schemaV2.createParameter({
                type: 'boolean',
                label: 'Include Word Problems',
                description: 'Include real-world inequality problems',
                helpText: 'Story problems that lead to inequalities',
                order: 1
              }),
              showSteps: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Solution Steps',
                description: 'Include step-by-step solving process',
                helpText: 'Shows inverse operations and inequality rules',
                order: 2
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'basic-inequalities',
            label: 'Basic Inequalities',
            description: 'Simple one-step inequalities',
            icon: 'looks_one',
            category: 'difficulty',
            values: {
              problemCount: 10,
              includeOneStep: true,
              includeTwoStep: false,
              includeGraphing: false,
              includeWordProblems: false,
              includeCompoundInequalities: false,
              allowNegatives: false,
              maxCoefficient: 5,
              maxConstant: 10,
              maxSolution: 8,
              showSteps: true,
              includeAllSymbols: true,
              complexityLevel: 'basic'
            }
          }),
          
          schemaV2.createPreset({
            id: 'two-step-inequalities',
            label: 'Two-Step Inequalities',
            description: 'Practice solving two-step inequalities',
            icon: 'stairs',
            category: 'scope',
            values: {
              problemCount: 12,
              includeOneStep: false,
              includeTwoStep: true,
              includeGraphing: false,
              includeWordProblems: false,
              includeCompoundInequalities: false,
              allowNegatives: true,
              maxCoefficient: 8,
              maxConstant: 15,
              maxSolution: 12,
              showSteps: true,
              includeAllSymbols: true,
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'graphing-inequalities',
            label: 'Graphing Inequalities',
            description: 'Focus on graphing solutions on number lines',
            icon: 'timeline',
            category: 'scope',
            values: {
              problemCount: 10,
              includeOneStep: true,
              includeTwoStep: true,
              includeGraphing: true,
              includeWordProblems: false,
              includeCompoundInequalities: false,
              allowNegatives: true,
              maxCoefficient: 6,
              maxConstant: 12,
              maxSolution: 10,
              showSteps: true,
              includeAllSymbols: true,
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'word-problems',
            label: 'Word Problems',
            description: 'Real-world problems with inequalities',
            icon: 'menu_book',
            category: 'scope',
            values: {
              problemCount: 8,
              includeOneStep: true,
              includeTwoStep: true,
              includeGraphing: false,
              includeWordProblems: true,
              includeCompoundInequalities: false,
              allowNegatives: false,
              maxCoefficient: 6,
              maxConstant: 10,
              maxSolution: 10,
              showSteps: true,
              includeAllSymbols: false,
              complexityLevel: 'basic'
            }
          }),
          
          schemaV2.createPreset({
            id: 'compound-inequalities',
            label: 'Compound Inequalities',
            description: 'Advanced compound inequalities',
            icon: 'compare',
            category: 'difficulty',
            values: {
              problemCount: 8,
              includeOneStep: false,
              includeTwoStep: false,
              includeGraphing: true,
              includeWordProblems: false,
              includeCompoundInequalities: true,
              allowNegatives: true,
              maxCoefficient: 8,
              maxConstant: 12,
              maxSolution: 10,
              showSteps: true,
              includeAllSymbols: true,
              complexityLevel: 'advanced'
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive-inequalities',
            label: 'Comprehensive Practice',
            description: 'Complete practice with all inequality concepts',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 15,
              includeOneStep: true,
              includeTwoStep: true,
              includeGraphing: true,
              includeWordProblems: true,
              includeCompoundInequalities: true,
              allowNegatives: true,
              maxCoefficient: 8,
              maxConstant: 15,
              maxSolution: 12,
              showSteps: true,
              includeAllSymbols: true,
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
    if (!params.includeOneStep && !params.includeTwoStep && !params.includeCompoundInequalities) {
      customErrors.push('At least one inequality type must be enabled')
    }
    if (customErrors.length > 0) {
      throw new Error(`Invalid parameters: ${customErrors.join(', ')}`)
    }
    
    // Build array of enabled inequality types
    const inequalityTypes = []
    if (params.includeOneStep) inequalityTypes.push('oneStep')
    if (params.includeTwoStep) inequalityTypes.push('twoStep')
    if (params.includeCompoundInequalities) inequalityTypes.push('compound')
    
    if (inequalityTypes.length === 0) {
      throw new Error('At least one inequality type must be enabled')
    }
    
    const inequalityType = this.getRandomElement(inequalityTypes)
    
    // Determine if this should be a word problem
    if (params.includeWordProblems && inequalityType !== 'compound' && Math.random() < 0.3) {
      return this.generateWordProblem(inequalityType, params)
    } else {
      return this.generateInequalityProblem(inequalityType, params)
    }
  }

  /**
   * Generate an inequality problem
   * @param {string} inequalityType - Type of inequality
   * @param {Object} params - Generation parameters
   * @returns {Object} Problem object
   */
  generateInequalityProblem(inequalityType, params) {
    switch (inequalityType) {
      case 'oneStep':
        return this.generateOneStepInequality(params)
      case 'twoStep':
        return this.generateTwoStepInequality(params)
      case 'compound':
        return this.generateCompoundInequality(params)
      default:
        return this.generateOneStepInequality(params)
    }
  }
  
  generateOneStepInequality(params) {
    const operations = ['addition', 'subtraction', 'multiplication', 'division']
    const operation = this.getRandomElement(operations)
    const symbol = this.getInequalitySymbol(params)
    
    const solution = this.generateSolution(params)
    let inequality, steps = []
    
    if (operation === 'addition') {
      const constant = this.generateConstant(params)
      const rightSide = solution + constant
      inequality = `x + ${constant} ${symbol} ${rightSide}`
      
      if (params.showSteps) {
        steps.push(`\\text{To solve } x + ${constant} ${symbol} ${rightSide}`)
        steps.push(`\\text{Subtract ${constant} from both sides}`)
        steps.push(`x + ${constant} - ${constant} ${symbol} ${rightSide} - ${constant}`)
        steps.push(`x ${symbol} ${solution}`)
      }
      
    } else if (operation === 'subtraction') {
      const constant = this.generateConstant(params)
      const rightSide = solution - constant
      inequality = `x - ${constant} ${symbol} ${rightSide}`
      
      if (params.showSteps) {
        steps.push(`\\text{To solve } x - ${constant} ${symbol} ${rightSide}`)
        steps.push(`\\text{Add ${constant} to both sides}`)
        steps.push(`x - ${constant} + ${constant} ${symbol} ${rightSide} + ${constant}`)
        steps.push(`x ${symbol} ${solution}`)
      }
      
    } else if (operation === 'multiplication') {
      const coefficient = this.generateCoefficient(params)
      const rightSide = coefficient * solution
      inequality = `${coefficient}x ${symbol} ${rightSide}`
      
      if (params.showSteps) {
        steps.push(`\\text{To solve } ${coefficient}x ${symbol} ${rightSide}`)
        if (coefficient > 0) {
          steps.push(`\\text{Divide both sides by ${coefficient}}`)
          steps.push(`\\frac{${coefficient}x}{${coefficient}} ${symbol} \\frac{${rightSide}}{${coefficient}}`)
        } else {
          const flippedSymbol = this.flipInequalitySymbol(symbol)
          steps.push(`\\text{Divide both sides by ${coefficient} (flip inequality)}`)
          steps.push(`\\frac{${coefficient}x}{${coefficient}} ${flippedSymbol} \\frac{${rightSide}}{${coefficient}}`)
        }
        steps.push(`x ${symbol} ${solution}`)
      }
      
    } else { // division
      const divisor = this.generateCoefficient(params)
      const rightSide = solution
      inequality = `\\frac{x}{${divisor}} ${symbol} ${rightSide}`
      
      if (params.showSteps) {
        steps.push(`\\text{To solve } \\frac{x}{${divisor}} ${symbol} ${rightSide}`)
        steps.push(`\\text{Multiply both sides by ${divisor}}`)
        steps.push(`\\frac{x}{${divisor}} \\times ${divisor} ${symbol} ${rightSide} \\times ${divisor}`)
        steps.push(`x ${symbol} ${solution}`)
      }
    }
    
    const answer = `x ${symbol} ${solution}`
    
    return {
      question: `Solve: ${inequality}`,
      questionLaTeX: `\\text{Solve: } ${inequality}`,
      answer: answer,
      answerLaTeX: answer,
      steps: steps,
      metadata: {
        problemType: 'oneStep',
        inequality: inequality,
        operation: operation,
        symbol: symbol,
        solution: solution,
        difficulty: 'medium',
        estimatedTime: '45 seconds'
      }
    }
  }
  
  generateTwoStepInequality(params) {
    const symbol = this.getInequalitySymbol(params)
    const solution = this.generateSolution(params)
    const coefficient = this.generateCoefficient(params)
    const constant = this.generateConstant(params)
    
    const operations = ['addConstant', 'subtractConstant']
    const operation = this.getRandomElement(operations)
    
    let inequality, steps = []
    
    if (operation === 'addConstant') {
      const rightSide = coefficient * solution + constant
      inequality = `${coefficient}x + ${constant} ${symbol} ${rightSide}`
      
      if (params.showSteps) {
        steps.push(`\\text{To solve } ${coefficient}x + ${constant} ${symbol} ${rightSide}`)
        steps.push(`\\text{Step 1: Subtract ${constant} from both sides}`)
        steps.push(`${coefficient}x + ${constant} - ${constant} ${symbol} ${rightSide} - ${constant}`)
        steps.push(`${coefficient}x ${symbol} ${rightSide - constant}`)
        steps.push(`\\text{Step 2: Divide both sides by ${coefficient}}`)
        if (coefficient > 0) {
          steps.push(`\\frac{${coefficient}x}{${coefficient}} ${symbol} \\frac{${rightSide - constant}}{${coefficient}}`)
        } else {
          const flippedSymbol = this.flipInequalitySymbol(symbol)
          steps.push(`\\text{Since coefficient is negative, flip inequality}`)
          steps.push(`\\frac{${coefficient}x}{${coefficient}} ${flippedSymbol} \\frac{${rightSide - constant}}{${coefficient}}`)
        }
        steps.push(`x ${symbol} ${solution}`)
      }
      
    } else { // subtractConstant
      const rightSide = coefficient * solution - constant
      inequality = `${coefficient}x - ${constant} ${symbol} ${rightSide}`
      
      if (params.showSteps) {
        steps.push(`\\text{To solve } ${coefficient}x - ${constant} ${symbol} ${rightSide}`)
        steps.push(`\\text{Step 1: Add ${constant} to both sides}`)
        steps.push(`${coefficient}x - ${constant} + ${constant} ${symbol} ${rightSide} + ${constant}`)
        steps.push(`${coefficient}x ${symbol} ${rightSide + constant}`)
        steps.push(`\\text{Step 2: Divide both sides by ${coefficient}}`)
        if (coefficient > 0) {
          steps.push(`\\frac{${coefficient}x}{${coefficient}} ${symbol} \\frac{${rightSide + constant}}{${coefficient}}`)
        } else {
          const flippedSymbol = this.flipInequalitySymbol(symbol)
          steps.push(`\\text{Since coefficient is negative, flip inequality}`)
          steps.push(`\\frac{${coefficient}x}{${coefficient}} ${flippedSymbol} \\frac{${rightSide + constant}}{${coefficient}}`)
        }
        steps.push(`x ${symbol} ${solution}`)
      }
    }
    
    const answer = `x ${symbol} ${solution}`
    
    return {
      question: `Solve: ${inequality}`,
      questionLaTeX: `\\text{Solve: } ${inequality}`,
      answer: answer,
      answerLaTeX: answer,
      steps: steps,
      metadata: {
        problemType: 'twoStep',
        inequality: inequality,
        operation: operation,
        symbol: symbol,
        solution: solution,
        coefficient: coefficient,
        constant: constant,
        difficulty: 'medium',
        estimatedTime: '60 seconds'
      }
    }
  }
  
  generateCompoundInequality(params) {
    const types = ['and', 'or']
    const type = this.getRandomElement(types)
    
    if (type === 'and') {
      // x > a AND x < b  =>  a < x < b
      const lowerBound = this.generateSolution(params)
      const upperBound = lowerBound + Math.floor(Math.random() * 8) + 3
      
      const inequality = `${lowerBound} < x < ${upperBound}`
      const answer = `${lowerBound} < x < ${upperBound}`
      
      const steps = []
      if (params.showSteps) {
        steps.push(`\\text{This is a compound inequality with AND}`)
        steps.push(`\\text{x must be greater than ${lowerBound} AND less than ${upperBound}}`)
        steps.push(`\\text{Solution: } ${lowerBound} < x < ${upperBound}`)
      }
      
      return {
        question: `Graph the compound inequality: ${inequality}`,
        questionLaTeX: `\\text{Graph the compound inequality: } ${inequality}`,
        answer: answer,
        answerLaTeX: answer,
        steps: steps,
        metadata: {
          problemType: 'compound',
          compoundType: 'and',
          lowerBound: lowerBound,
          upperBound: upperBound,
          difficulty: 'hard',
          estimatedTime: '50 seconds'
        }
      }
      
    } else {
      // x < a OR x > b
      const value1 = this.generateSolution(params)
      const value2 = value1 + Math.floor(Math.random() * 6) + 4
      
      const inequality = `x < ${value1} \\text{ or } x > ${value2}`
      const answer = `x < ${value1} \\text{ or } x > ${value2}`
      
      const steps = []
      if (params.showSteps) {
        steps.push(`\\text{This is a compound inequality with OR}`)
        steps.push(`\\text{x is less than ${value1} OR greater than ${value2}}`)
        steps.push(`\\text{Solution: } x < ${value1} \\text{ or } x > ${value2}`)
      }
      
      return {
        question: `Describe the solution: ${inequality}`,
        questionLaTeX: `\\text{Describe the solution: } ${inequality}`,
        answer: answer,
        answerLaTeX: answer,
        steps: steps,
        metadata: {
          problemType: 'compound',
          compoundType: 'or',
          value1: value1,
          value2: value2,
          difficulty: 'hard',
          estimatedTime: '50 seconds'
        }
      }
    }
  }

  /**
   * Generate word problems
   */
  generateWordProblem(inequalityType, params) {
    const scenarios = this.getWordProblemScenarios(inequalityType, params)
    const scenario = this.getRandomElement(scenarios)
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Let } x = \\text{${scenario.variableDescription}}`)
      steps.push(`\\text{Set up inequality: } ${scenario.inequality}`)
      steps.push(`\\text{Solve: } ${scenario.answer}`)
    }
    
    return {
      question: scenario.question,
      questionLaTeX: scenario.questionLaTeX,
      answer: scenario.answer,
      answerLaTeX: scenario.answerLaTeX,
      steps: steps,
      metadata: {
        problemType: `word-${inequalityType}`,
        scenario: scenario.type,
        inequality: scenario.inequality,
        difficulty: 'medium',
        estimatedTime: '70 seconds'
      }
    }
  }
  
  getWordProblemScenarios(inequalityType, params) {
    const scenarios = []
    
    if (inequalityType === 'oneStep') {
      const threshold = this.generateSolution(params)
      const amount = this.generateConstant(params)
      
      scenarios.push({
        type: 'budget',
        question: `Sarah wants to buy books that cost $${amount} each. She has $${threshold + amount * 2} to spend. What is the maximum number of books she can buy?`,
        questionLaTeX: `\\text{Sarah wants to buy books that cost $${amount} each.} \\\\\\\\ \\text{She has $${threshold + amount * 2} to spend.} \\\\\\\\ \\text{What is the maximum number of books she can buy?}`,
        answer: `x \\leq ${Math.floor((threshold + amount * 2) / amount)}`,
        answerLaTeX: `x \\leq ${Math.floor((threshold + amount * 2) / amount)}`,
        inequality: `${amount}x \\leq ${threshold + amount * 2}`,
        variableDescription: 'number of books'
      })
    }
    
    if (inequalityType === 'twoStep') {
      const setup = this.generateConstant(params)
      const rate = this.generateCoefficient(params)
      const budget = setup + rate * 5
      
      scenarios.push({
        type: 'service',
        question: `A plumber charges $${setup} for a service call plus $${rate} per hour. If you have $${budget} to spend, what is the maximum number of hours the plumber can work?`,
        questionLaTeX: `\\text{A plumber charges $${setup} for a service call plus $${rate} per hour.} \\\\\\\\ \\text{If you have $${budget} to spend, what is the maximum number of hours} \\\\\\\\ \\text{the plumber can work?}`,
        answer: `x \\leq ${(budget - setup) / rate}`,
        answerLaTeX: `x \\leq ${(budget - setup) / rate}`,
        inequality: `${setup} + ${rate}x \\leq ${budget}`,
        variableDescription: 'hours of work'
      })
    }
    
    return scenarios
  }

  /**
   * Helper methods
   */
  getInequalitySymbol(params) {
    if (params.includeAllSymbols) {
      const symbols = ['<', '>', '\\leq', '\\geq']
      return this.getRandomElement(symbols)
    } else {
      const symbols = ['<', '>']
      return this.getRandomElement(symbols)
    }
  }
  
  flipInequalitySymbol(symbol) {
    const flips = {
      '<': '>',
      '>': '<',
      '\\leq': '\\geq',
      '\\geq': '\\leq'
    }
    return flips[symbol] || symbol
  }
  
  generateSolution(params) {
    let solution = Math.floor(Math.random() * params.maxSolution) + 1
    
    if (params.allowNegatives && Math.random() < 0.3) {
      solution = -solution
    }
    
    return solution
  }
  
  generateConstant(params) {
    let constant = Math.floor(Math.random() * params.maxConstant) + 1
    
    if (params.allowNegatives && Math.random() < 0.3) {
      constant = -constant
    }
    
    return constant
  }
  
  generateCoefficient(params) {
    let coefficient = Math.floor(Math.random() * (params.maxCoefficient - 1)) + 2
    
    if (params.allowNegatives && Math.random() < 0.3) {
      coefficient = -coefficient
    }
    
    return coefficient
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

export default InequalitiesGenerator