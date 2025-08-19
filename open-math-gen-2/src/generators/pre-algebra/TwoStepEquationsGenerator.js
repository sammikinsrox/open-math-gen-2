import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Two-Step Equations Generator
 * 
 * Generates problems involving solving two-step linear equations,
 * requiring both addition/subtraction and multiplication/division operations.
 */
export class TwoStepEquationsGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Two-Step Equations',
      description: 'Solve two-step linear equations using multiple inverse operations',
      category: 'pre-algebra',
      difficulty: 'medium',
      icon: 'stairs',
      tags: ['equations', 'two-step', 'inverse operations', 'algebra'],
      gradeLevel: '7-9',
      estimatedTime: '60 seconds',
      exampleProblem: {
        question: 'Solve: 3x + 7 = 22',
        questionLaTeX: '\\text{Solve: } 3x + 7 = 22',
        answer: 'x = 5',
        answerLaTeX: 'x = 5'
      },
      
      // Default parameter values
      defaultParameters: {
        problemCount: 10,
        includeAdditionFirst: true,
        includeSubtractionFirst: true,
        includeMultiplicationFirst: true,
        includeDivisionFirst: false,
        includeWordProblems: false,
        includeChecking: true,
        includeDistributive: false,
        allowNegatives: true,
        allowFractions: false,
        allowDecimals: false,
        maxCoefficient: 8,
        maxConstant: 15,
        maxSolution: 12,
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
                description: 'How many two-step equation problems to generate',
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
                description: 'Determines the difficulty of equations',
                variant: 'cards',
                options: [
                  { 
                    value: 'basic', 
                    label: 'Basic',
                    description: 'Simple coefficients and constants'
                  },
                  { 
                    value: 'intermediate', 
                    label: 'Intermediate',
                    description: 'Includes negatives and larger numbers'
                  },
                  { 
                    value: 'advanced', 
                    label: 'Advanced',
                    description: 'Includes fractions, decimals, and distribution'
                  }
                ],
                order: 2
              })
            }
          }),
          
          equationStructure: schemaV2.createCategory({
            id: 'equationStructure',
            label: 'Equation Structure',
            description: 'Choose the structure of two-step equations',
            icon: 'stairs',
            color: 'green',
            order: 2,
            parameters: {
              includeAdditionFirst: schemaV2.createParameter({
                type: 'boolean',
                label: 'Multiplication then Addition',
                description: 'Equations like 3x + 5 = 20',
                helpText: 'Solve by subtracting first, then dividing',
                order: 1
              }),
              includeSubtractionFirst: schemaV2.createParameter({
                type: 'boolean',
                label: 'Multiplication then Subtraction',
                description: 'Equations like 4x - 7 = 13',
                helpText: 'Solve by adding first, then dividing',
                order: 2
              }),
              includeMultiplicationFirst: schemaV2.createParameter({
                type: 'boolean',
                label: 'Addition then Multiplication',
                description: 'Equations like (x + 3) × 2 = 14',
                helpText: 'Solve by dividing first, then subtracting',
                order: 3
              }),
              includeDivisionFirst: schemaV2.createParameter({
                type: 'boolean',
                label: 'Division then Addition',
                description: 'Equations like x/2 + 4 = 9',
                helpText: 'Solve by subtracting first, then multiplying',
                order: 4
              })
            }
          }),
          
          advancedFeatures: schemaV2.createCategory({
            id: 'advancedFeatures',
            label: 'Advanced Features',
            description: 'Additional complexity options',
            icon: 'auto_awesome',
            color: 'purple',
            order: 3,
            parameters: {
              includeDistributive: schemaV2.createParameter({
                type: 'boolean',
                label: 'Distributive Property',
                description: 'Equations requiring distribution like 2(x + 3) = 14',
                helpText: 'Adds an extra step with distribution',
                order: 1
              }),
              includeChecking: schemaV2.createParameter({
                type: 'boolean',
                label: 'Include Solution Checking',
                description: 'Show how to verify the answer',
                helpText: 'Substitute solution back into original equation',
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
                description: 'Largest coefficient for variables (in 5x + 3 = 23)',
                min: 2,
                max: 15,
                required: true,
                slider: true,
                presets: [5, 6, 8, 10],
                helpText: 'The number multiplying the variable',
                order: 1
              }),
              maxConstant: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Constant',
                description: 'Largest constant term in equations',
                min: 5,
                max: 30,
                required: true,
                slider: true,
                presets: [10, 12, 15, 20],
                helpText: 'Numbers added or subtracted',
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
                helpText: 'The final answer (value of x)',
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
          
          advancedNumbers: schemaV2.createCategory({
            id: 'advancedNumbers',
            label: 'Advanced Numbers',
            description: 'Include more complex number types',
            icon: 'functions',
            color: 'red',
            order: 5,
            parameters: {
              allowFractions: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Fractions',
                description: 'Include fractional coefficients',
                helpText: 'Examples: (1/2)x + 3 = 7',
                order: 1
              }),
              allowDecimals: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Decimals',
                description: 'Include decimal coefficients',
                helpText: 'Examples: 2.5x - 1.5 = 8.5',
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
            order: 6,
            parameters: {
              includeWordProblems: schemaV2.createParameter({
                type: 'boolean',
                label: 'Include Word Problems',
                description: 'Include real-world two-step equation problems',
                helpText: 'Story problems requiring two-step equations',
                order: 1
              }),
              showSteps: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Solution Steps',
                description: 'Include step-by-step solving process',
                helpText: 'Shows both inverse operations used',
                order: 2
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'basic-two-step',
            label: 'Basic Two-Step',
            description: 'Simple two-step equations with whole numbers',
            icon: 'looks_one',
            category: 'difficulty',
            values: {
              problemCount: 10,
              includeAdditionFirst: true,
              includeSubtractionFirst: true,
              includeMultiplicationFirst: false,
              includeDivisionFirst: false,
              includeWordProblems: false,
              includeChecking: true,
              includeDistributive: false,
              allowNegatives: false,
              allowFractions: false,
              allowDecimals: false,
              maxCoefficient: 5,
              maxConstant: 10,
              maxSolution: 8,
              showSteps: true,
              complexityLevel: 'basic'
            }
          }),
          
          schemaV2.createPreset({
            id: 'all-structures',
            label: 'All Structures',
            description: 'Practice all types of two-step equations',
            icon: 'stairs',
            category: 'scope',
            values: {
              problemCount: 12,
              includeAdditionFirst: true,
              includeSubtractionFirst: true,
              includeMultiplicationFirst: true,
              includeDivisionFirst: true,
              includeWordProblems: false,
              includeChecking: true,
              includeDistributive: false,
              allowNegatives: true,
              allowFractions: false,
              allowDecimals: false,
              maxCoefficient: 8,
              maxConstant: 15,
              maxSolution: 12,
              showSteps: true,
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'with-distribution',
            label: 'With Distribution',
            description: 'Include distributive property problems',
            icon: 'open_in_full',
            category: 'scope',
            values: {
              problemCount: 10,
              includeAdditionFirst: true,
              includeSubtractionFirst: true,
              includeMultiplicationFirst: false,
              includeDivisionFirst: false,
              includeWordProblems: false,
              includeChecking: false,
              includeDistributive: true,
              allowNegatives: true,
              allowFractions: false,
              allowDecimals: false,
              maxCoefficient: 6,
              maxConstant: 12,
              maxSolution: 10,
              showSteps: true,
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'word-problems',
            label: 'Word Problems',
            description: 'Real-world problems with two-step equations',
            icon: 'menu_book',
            category: 'scope',
            values: {
              problemCount: 8,
              includeAdditionFirst: true,
              includeSubtractionFirst: true,
              includeMultiplicationFirst: false,
              includeDivisionFirst: false,
              includeWordProblems: true,
              includeChecking: false,
              includeDistributive: false,
              allowNegatives: false,
              allowFractions: false,
              allowDecimals: false,
              maxCoefficient: 6,
              maxConstant: 10,
              maxSolution: 10,
              showSteps: true,
              complexityLevel: 'basic'
            }
          }),
          
          schemaV2.createPreset({
            id: 'advanced-two-step',
            label: 'Advanced Two-Step',
            description: 'Complex equations with fractions and distribution',
            icon: 'trending_up',
            category: 'difficulty',
            values: {
              problemCount: 8,
              includeAdditionFirst: true,
              includeSubtractionFirst: true,
              includeMultiplicationFirst: true,
              includeDivisionFirst: true,
              includeWordProblems: false,
              includeChecking: false,
              includeDistributive: true,
              allowNegatives: true,
              allowFractions: true,
              allowDecimals: false,
              maxCoefficient: 10,
              maxConstant: 18,
              maxSolution: 15,
              showSteps: true,
              complexityLevel: 'advanced'
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive-two-step',
            label: 'Comprehensive Practice',
            description: 'Complete practice with all two-step concepts',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 15,
              includeAdditionFirst: true,
              includeSubtractionFirst: true,
              includeMultiplicationFirst: true,
              includeDivisionFirst: true,
              includeWordProblems: true,
              includeChecking: true,
              includeDistributive: true,
              allowNegatives: true,
              allowFractions: false,
              allowDecimals: false,
              maxCoefficient: 8,
              maxConstant: 15,
              maxSolution: 12,
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
    if (!params.includeAdditionFirst && !params.includeSubtractionFirst && 
        !params.includeMultiplicationFirst && !params.includeDivisionFirst && !params.includeDistributive) {
      customErrors.push('At least one equation type must be enabled')
    }
    if (customErrors.length > 0) {
      throw new Error(`Invalid parameters: ${customErrors.join(', ')}`)
    }
    
    // Build array of enabled equation types
    const equationTypes = []
    if (params.includeAdditionFirst) equationTypes.push('multiplicationAddition')
    if (params.includeSubtractionFirst) equationTypes.push('multiplicationSubtraction')
    if (params.includeMultiplicationFirst) equationTypes.push('additionMultiplication')
    if (params.includeDivisionFirst) equationTypes.push('divisionAddition')
    if (params.includeDistributive) equationTypes.push('distributive')
    
    if (equationTypes.length === 0) {
      throw new Error('At least one equation type must be enabled')
    }
    
    const equationType = this.getRandomElement(equationTypes)
    
    // Determine if this should be a word problem
    if (params.includeWordProblems && Math.random() < 0.4) {
      return this.generateWordProblem(equationType, params)
    } else {
      return this.generateTwoStepEquation(equationType, params)
    }
  }

  /**
   * Generate a two-step equation problem
   * @param {string} equationType - Type of equation
   * @param {Object} params - Generation parameters
   * @returns {Object} Problem object
   */
  generateTwoStepEquation(equationType, params) {
    switch (equationType) {
      case 'multiplicationAddition':
        return this.generateMultiplicationAdditionEquation(params)
      case 'multiplicationSubtraction':
        return this.generateMultiplicationSubtractionEquation(params)
      case 'additionMultiplication':
        return this.generateAdditionMultiplicationEquation(params)
      case 'divisionAddition':
        return this.generateDivisionAdditionEquation(params)
      case 'distributive':
        return this.generateDistributiveEquation(params)
      default:
        return this.generateMultiplicationAdditionEquation(params)
    }
  }
  
  generateMultiplicationAdditionEquation(params) {
    const solution = this.generateSolution(params)
    const coefficient = this.generateCoefficient(params)
    const constant = this.generateConstant(params)
    const result = coefficient * solution + constant
    
    const equation = `${coefficient}x + ${constant} = ${result}`
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{To solve } ${coefficient}x + ${constant} = ${result}`)
      steps.push(`\\text{Step 1: Subtract ${constant} from both sides}`)
      steps.push(`${coefficient}x + ${constant} - ${constant} = ${result} - ${constant}`)
      steps.push(`${coefficient}x = ${result - constant}`)
      steps.push(`\\text{Step 2: Divide both sides by } ${coefficient}`)
      steps.push(`\\frac{${coefficient}x}{${coefficient}} = \\frac{${result - constant}}{${coefficient}}`)
      steps.push(`x = ${solution}`)
    }
    
    if (params.includeChecking) {
      const check = coefficient * solution + constant
      steps.push(`\\text{Check: } ${coefficient}(${solution}) + ${constant} = ${check} \\checkmark`)
    }
    
    return {
      question: `Solve: ${equation}`,
      questionLaTeX: `\\text{Solve: } ${equation}`,
      answer: `x = ${solution}`,
      answerLaTeX: `x = ${solution}`,
      steps: steps,
      metadata: {
        problemType: 'multiplicationAddition',
        equation: equation,
        solution: solution,
        coefficient: coefficient,
        constant: constant,
        operations: ['subtraction', 'division'],
        difficulty: 'medium',
        estimatedTime: '50 seconds'
      }
    }
  }
  
  generateMultiplicationSubtractionEquation(params) {
    const solution = this.generateSolution(params)
    const coefficient = this.generateCoefficient(params)
    const constant = this.generateConstant(params)
    const result = coefficient * solution - constant
    
    const equation = `${coefficient}x - ${constant} = ${result}`
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{To solve } ${coefficient}x - ${constant} = ${result}`)
      steps.push(`\\text{Step 1: Add ${constant} to both sides}`)
      steps.push(`${coefficient}x - ${constant} + ${constant} = ${result} + ${constant}`)
      steps.push(`${coefficient}x = ${result + constant}`)
      steps.push(`\\text{Step 2: Divide both sides by } ${coefficient}`)
      steps.push(`\\frac{${coefficient}x}{${coefficient}} = \\frac{${result + constant}}{${coefficient}}`)
      steps.push(`x = ${solution}`)
    }
    
    if (params.includeChecking) {
      const check = coefficient * solution - constant
      steps.push(`\\text{Check: } ${coefficient}(${solution}) - ${constant} = ${check} \\checkmark`)
    }
    
    return {
      question: `Solve: ${equation}`,
      questionLaTeX: `\\text{Solve: } ${equation}`,
      answer: `x = ${solution}`,
      answerLaTeX: `x = ${solution}`,
      steps: steps,
      metadata: {
        problemType: 'multiplicationSubtraction',
        equation: equation,
        solution: solution,
        coefficient: coefficient,
        constant: constant,
        operations: ['addition', 'division'],
        difficulty: 'medium',
        estimatedTime: '50 seconds'
      }
    }
  }
  
  generateDivisionAdditionEquation(params) {
    const solution = this.generateSolution(params)
    const divisor = this.generateCoefficient(params)
    const constant = this.generateConstant(params)
    const result = solution / divisor + constant
    
    const equation = `\\frac{x}{${divisor}} + ${constant} = ${result}`
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{To solve } \\frac{x}{${divisor}} + ${constant} = ${result}`)
      steps.push(`\\text{Step 1: Subtract ${constant} from both sides}`)
      steps.push(`\\frac{x}{${divisor}} + ${constant} - ${constant} = ${result} - ${constant}`)
      steps.push(`\\frac{x}{${divisor}} = ${result - constant}`)
      steps.push(`\\text{Step 2: Multiply both sides by } ${divisor}`)
      steps.push(`\\frac{x}{${divisor}} \\times ${divisor} = ${result - constant} \\times ${divisor}`)
      steps.push(`x = ${solution}`)
    }
    
    if (params.includeChecking) {
      const check = solution / divisor + constant
      steps.push(`\\text{Check: } \\frac{${solution}}{${divisor}} + ${constant} = ${check} \\checkmark`)
    }
    
    return {
      question: `Solve: ${equation}`,
      questionLaTeX: `\\text{Solve: } ${equation}`,
      answer: `x = ${solution}`,
      answerLaTeX: `x = ${solution}`,
      steps: steps,
      metadata: {
        problemType: 'divisionAddition',
        equation: equation,
        solution: solution,
        divisor: divisor,
        constant: constant,
        operations: ['subtraction', 'multiplication'],
        difficulty: 'medium',
        estimatedTime: '55 seconds'
      }
    }
  }
  
  generateAdditionMultiplicationEquation(params) {
    const solution = this.generateSolution(params)
    const constant = this.generateConstant(params)
    const multiplier = this.generateCoefficient(params)
    const result = (solution + constant) * multiplier
    
    const equation = `${multiplier}(x + ${constant}) = ${result}`
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{To solve } ${multiplier}(x + ${constant}) = ${result}`)
      steps.push(`\\text{Step 1: Divide both sides by } ${multiplier}`)
      steps.push(`\\frac{${multiplier}(x + ${constant})}{${multiplier}} = \\frac{${result}}{${multiplier}}`)
      steps.push(`x + ${constant} = ${result / multiplier}`)
      steps.push(`\\text{Step 2: Subtract ${constant} from both sides}`)
      steps.push(`x + ${constant} - ${constant} = ${result / multiplier} - ${constant}`)
      steps.push(`x = ${solution}`)
    }
    
    if (params.includeChecking) {
      const check = (solution + constant) * multiplier
      steps.push(`\\text{Check: } ${multiplier}(${solution} + ${constant}) = ${multiplier} \\times ${solution + constant} = ${check} \\checkmark`)
    }
    
    return {
      question: `Solve: ${equation}`,
      questionLaTeX: `\\text{Solve: } ${equation}`,
      answer: `x = ${solution}`,
      answerLaTeX: `x = ${solution}`,
      steps: steps,
      metadata: {
        problemType: 'additionMultiplication',
        equation: equation,
        solution: solution,
        multiplier: multiplier,
        constant: constant,
        operations: ['division', 'subtraction'],
        difficulty: 'medium',
        estimatedTime: '55 seconds'
      }
    }
  }
  
  generateDistributiveEquation(params) {
    const solution = this.generateSolution(params)
    const coefficient = this.generateCoefficient(params)
    const constant1 = this.generateConstant(params)
    const constant2 = this.generateConstant(params)
    
    // Create equation: coefficient(x + constant1) + constant2 = result
    const distributedTerm = coefficient * solution + coefficient * constant1
    const result = distributedTerm + constant2
    
    const equation = `${coefficient}(x + ${constant1}) + ${constant2} = ${result}`
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{To solve } ${coefficient}(x + ${constant1}) + ${constant2} = ${result}`)
      steps.push(`\\text{Step 1: Apply distributive property}`)
      steps.push(`${coefficient}x + ${coefficient * constant1} + ${constant2} = ${result}`)
      steps.push(`${coefficient}x + ${coefficient * constant1 + constant2} = ${result}`)
      steps.push(`\\text{Step 2: Subtract ${coefficient * constant1 + constant2} from both sides}`)
      steps.push(`${coefficient}x = ${result - (coefficient * constant1 + constant2)}`)
      steps.push(`\\text{Step 3: Divide both sides by } ${coefficient}`)
      steps.push(`x = ${solution}`)
    }
    
    if (params.includeChecking) {
      const check = coefficient * (solution + constant1) + constant2
      steps.push(`\\text{Check: } ${coefficient}(${solution} + ${constant1}) + ${constant2} = ${check} \\checkmark`)
    }
    
    return {
      question: `Solve: ${equation}`,
      questionLaTeX: `\\text{Solve: } ${equation}`,
      answer: `x = ${solution}`,
      answerLaTeX: `x = ${solution}`,
      steps: steps,
      metadata: {
        problemType: 'distributive',
        equation: equation,
        solution: solution,
        coefficient: coefficient,
        constants: [constant1, constant2],
        operations: ['distributive', 'subtraction', 'division'],
        difficulty: 'hard',
        estimatedTime: '70 seconds'
      }
    }
  }

  /**
   * Generate word problems
   */
  generateWordProblem(equationType, params) {
    const scenarios = this.getWordProblemScenarios(equationType, params)
    const scenario = this.getRandomElement(scenarios)
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Let } x = \\text{${scenario.variableDescription}}`)
      steps.push(`\\text{Set up equation: } ${scenario.equation}`)
      steps.push(`\\text{Solve the equation:}`)
      steps.push(`\\text{Step 1: ${scenario.step1}}`)
      steps.push(`\\text{Step 2: ${scenario.step2}}`)
      steps.push(`\\text{Answer: } x = ${scenario.solution}`)
    }
    
    return {
      question: scenario.question,
      questionLaTeX: scenario.questionLaTeX,
      answer: scenario.answer,
      answerLaTeX: scenario.answerLaTeX,
      steps: steps,
      metadata: {
        problemType: `word-${equationType}`,
        scenario: scenario.type,
        equation: scenario.equation,
        solution: scenario.solution,
        difficulty: 'medium',
        estimatedTime: '80 seconds'
      }
    }
  }
  
  getWordProblemScenarios(equationType, params) {
    const scenarios = []
    
    if (equationType === 'multiplicationAddition') {
      const solution = this.generateSolution(params)
      const coefficient = this.generateCoefficient(params)
      const constant = this.generateConstant(params)
      const total = coefficient * solution + constant
      
      scenarios.push({
        type: 'rental',
        question: `A car rental company charges $${coefficient} per day plus a $${constant} fee. The total cost was $${total}. How many days was the car rented?`,
        questionLaTeX: `\\text{A car rental company charges $${coefficient} per day plus a $${constant} fee.} \\\\\\\\ \\text{The total cost was $${total}. How many days was the car rented?}`,
        answer: `${solution} days`,
        answerLaTeX: `${solution} \\text{ days}`,
        equation: `${coefficient}x + ${constant} = ${total}`,
        solution: solution,
        variableDescription: 'number of days',
        step1: `Subtract $${constant} from both sides`,
        step2: `Divide by $${coefficient}`
      })
    }
    
    if (equationType === 'multiplicationSubtraction') {
      const solution = this.generateSolution(params)
      const coefficient = this.generateCoefficient(params)
      const constant = this.generateConstant(params)
      const result = coefficient * solution - constant
      
      scenarios.push({
        type: 'savings',
        question: `Maria saves $${coefficient} each week. After spending $${constant} on a gift, she has $${result} left. For how many weeks has she been saving?`,
        questionLaTeX: `\\text{Maria saves $${coefficient} each week. After spending $${constant} on a gift,} \\\\\\\\ \\text{she has $${result} left. For how many weeks has she been saving?}`,
        answer: `${solution} weeks`,
        answerLaTeX: `${solution} \\text{ weeks}`,
        equation: `${coefficient}x - ${constant} = ${result}`,
        solution: solution,
        variableDescription: 'number of weeks',
        step1: `Add $${constant} to both sides`,
        step2: `Divide by $${coefficient}`
      })
    }
    
    return scenarios
  }

  /**
   * Helper methods to generate numbers
   */
  generateSolution(params) {
    let solution = Math.floor(Math.random() * params.maxSolution) + 1
    
    // Apply complexity level constraints
    if (params.complexityLevel === 'basic') {
      solution = Math.min(solution, 8)
      if (!params.allowNegatives) {
        solution = Math.abs(solution)
      }
    }
    
    if (params.allowNegatives && Math.random() < 0.3) {
      solution = -Math.abs(solution) // Ensure we get a negative
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
    let coefficient = Math.floor(Math.random() * (params.maxCoefficient - 1)) + 2 // At least 2
    
    if (params.allowNegatives && Math.random() < 0.2) {
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

export default TwoStepEquationsGenerator