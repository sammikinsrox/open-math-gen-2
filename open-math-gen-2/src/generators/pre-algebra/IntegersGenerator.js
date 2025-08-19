import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Integers Generator
 * 
 * Generates problems involving integer operations, including addition,
 * subtraction, multiplication, division, and ordering of positive and negative numbers.
 */
export class IntegersGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Integers',
      description: 'Integer operations including positive and negative numbers, ordering, and number line work',
      category: 'pre-algebra',
      difficulty: 'medium',
      icon: 'exposure',
      tags: ['integers', 'negative numbers', 'operations', 'number line'],
      gradeLevel: '6-8',
      estimatedTime: '45 seconds',
      exampleProblem: {
        question: '(-5) + 8 = ?',
        questionLaTeX: '(-5) + 8 = \\square',
        answer: '3',
        answerLaTeX: '3'
      },
      
      // Default parameter values
      defaultParameters: {
        problemCount: 10,
        includeAddition: true,
        includeSubtraction: true,
        includeMultiplication: true,
        includeDivision: false,
        includeOrdering: true,
        includeNumberLine: true,
        includeAbsoluteValue: false,
        includeWordProblems: false,
        minValue: -20,
        maxValue: 20,
        allowZero: true,
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
                description: 'How many integer problems to generate',
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
                description: 'Determines the difficulty and range of integers',
                variant: 'cards',
                options: [
                  { 
                    value: 'basic', 
                    label: 'Basic',
                    description: 'Simple operations with small integers (-10 to 10)'
                  },
                  { 
                    value: 'intermediate', 
                    label: 'Intermediate',
                    description: 'Medium operations with larger integers (-50 to 50)'
                  },
                  { 
                    value: 'advanced', 
                    label: 'Advanced',
                    description: 'Complex operations with large integers (-100 to 100)'
                  }
                ],
                order: 2
              })
            }
          }),
          
          operations: schemaV2.createCategory({
            id: 'operations',
            label: 'Operation Types',
            description: 'Choose which integer operations to include',
            icon: 'calculate',
            color: 'green',
            order: 2,
            parameters: {
              includeAddition: schemaV2.createParameter({
                type: 'boolean',
                label: 'Addition',
                description: 'Include integer addition problems',
                helpText: 'Examples: (-5) + 8, 3 + (-7)',
                order: 1
              }),
              includeSubtraction: schemaV2.createParameter({
                type: 'boolean',
                label: 'Subtraction',
                description: 'Include integer subtraction problems',
                helpText: 'Examples: 4 - (-3), (-2) - 5',
                order: 2
              }),
              includeMultiplication: schemaV2.createParameter({
                type: 'boolean',
                label: 'Multiplication',
                description: 'Include integer multiplication problems',
                helpText: 'Examples: (-3) × 4, (-2) × (-5)',
                order: 3
              }),
              includeDivision: schemaV2.createParameter({
                type: 'boolean',
                label: 'Division',
                description: 'Include integer division problems',
                helpText: 'Examples: (-12) ÷ 3, 20 ÷ (-4)',
                order: 4
              })
            }
          }),
          
          specialTypes: schemaV2.createCategory({
            id: 'specialTypes',
            label: 'Special Problem Types',
            description: 'Additional types of integer problems',
            icon: 'star',
            color: 'purple',
            order: 3,
            parameters: {
              includeOrdering: schemaV2.createParameter({
                type: 'boolean',
                label: 'Ordering Integers',
                description: 'Compare and order positive and negative integers',
                helpText: 'Examples: Order from least to greatest: -3, 5, -1, 0',
                order: 1
              }),
              includeNumberLine: schemaV2.createParameter({
                type: 'boolean',
                label: 'Number Line Problems',
                description: 'Problems involving number line representation',
                helpText: 'Locate integers on number line, find distances',
                order: 2
              }),
              includeAbsoluteValue: schemaV2.createParameter({
                type: 'boolean',
                label: 'Absolute Value',
                description: 'Problems involving absolute value of integers',
                helpText: 'Examples: |−5|, |3| + |−2|',
                order: 3
              }),
              includeWordProblems: schemaV2.createParameter({
                type: 'boolean',
                label: 'Word Problems',
                description: 'Real-world problems with integers',
                helpText: 'Temperature, elevation, financial contexts',
                order: 4
              })
            }
          }),
          
          numberSettings: schemaV2.createCategory({
            id: 'numberSettings',
            label: 'Number Settings',
            description: 'Configure the range and types of integers',
            icon: 'tag',
            color: 'orange',
            order: 4,
            parameters: {
              minValue: schemaV2.createParameter({
                type: 'number',
                label: 'Minimum Value',
                description: 'Smallest integer to use in problems',
                min: -100,
                max: 100,
                required: true,
                presets: [-20, -10, -5, -1],
                order: 1
              }),
              maxValue: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Value',
                description: 'Largest integer to use in problems',
                min: -100,
                max: 100,
                required: true,
                presets: [5, 10, 20, 50],
                order: 2
              }),
              allowZero: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Zero',
                description: 'Include zero in the integer problems',
                helpText: 'Zero is neither positive nor negative',
                order: 3
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
                description: 'Include step-by-step calculation process',
                helpText: 'Helps students understand integer rules',
                order: 1
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'basic-integers',
            label: 'Basic Integers',
            description: 'Simple integer addition and subtraction',
            icon: 'looks_one',
            category: 'difficulty',
            values: {
              problemCount: 10,
              includeAddition: true,
              includeSubtraction: true,
              includeMultiplication: false,
              includeDivision: false,
              includeOrdering: true,
              includeNumberLine: false,
              includeAbsoluteValue: false,
              includeWordProblems: false,
              minValue: -10,
              maxValue: 10,
              allowZero: true,
              showSteps: true,
              complexityLevel: 'basic'
            }
          }),
          
          schemaV2.createPreset({
            id: 'integer-operations',
            label: 'Integer Operations',
            description: 'All four operations with integers',
            icon: 'calculate',
            category: 'scope',
            values: {
              problemCount: 12,
              includeAddition: true,
              includeSubtraction: true,
              includeMultiplication: true,
              includeDivision: true,
              includeOrdering: false,
              includeNumberLine: false,
              includeAbsoluteValue: false,
              includeWordProblems: false,
              minValue: -20,
              maxValue: 20,
              allowZero: false,
              showSteps: true,
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'number-line-focus',
            label: 'Number Line Focus',
            description: 'Emphasis on number line and ordering',
            icon: 'timeline',
            category: 'scope',
            values: {
              problemCount: 8,
              includeAddition: false,
              includeSubtraction: false,
              includeMultiplication: false,
              includeDivision: false,
              includeOrdering: true,
              includeNumberLine: true,
              includeAbsoluteValue: true,
              includeWordProblems: false,
              minValue: -15,
              maxValue: 15,
              allowZero: true,
              showSteps: true,
              complexityLevel: 'basic'
            }
          }),
          
          schemaV2.createPreset({
            id: 'real-world-integers',
            label: 'Real-World Integers',
            description: 'Word problems with integer contexts',
            icon: 'business',
            category: 'scope',
            values: {
              problemCount: 10,
              includeAddition: true,
              includeSubtraction: true,
              includeMultiplication: false,
              includeDivision: false,
              includeOrdering: false,
              includeNumberLine: false,
              includeAbsoluteValue: false,
              includeWordProblems: true,
              minValue: -50,
              maxValue: 50,
              allowZero: true,
              showSteps: true,
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'advanced-integers',
            label: 'Advanced Integers',
            description: 'Complex integer problems with absolute value',
            icon: 'trending_up',
            category: 'difficulty',
            values: {
              problemCount: 15,
              includeAddition: true,
              includeSubtraction: true,
              includeMultiplication: true,
              includeDivision: true,
              includeOrdering: true,
              includeNumberLine: false,
              includeAbsoluteValue: true,
              includeWordProblems: false,
              minValue: -100,
              maxValue: 100,
              allowZero: true,
              showSteps: false,
              complexityLevel: 'advanced'
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive-integers',
            label: 'Comprehensive Integers',
            description: 'Complete practice with all integer concepts',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 20,
              includeAddition: true,
              includeSubtraction: true,
              includeMultiplication: true,
              includeDivision: true,
              includeOrdering: true,
              includeNumberLine: true,
              includeAbsoluteValue: true,
              includeWordProblems: true,
              minValue: -25,
              maxValue: 25,
              allowZero: true,
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
    if (!params.includeAddition && !params.includeSubtraction && !params.includeMultiplication &&
        !params.includeDivision && !params.includeOrdering && !params.includeNumberLine &&
        !params.includeAbsoluteValue) {
      customErrors.push('At least one problem type must be enabled')
    }
    if (params.minValue > params.maxValue) {
      customErrors.push('Minimum Value cannot be greater than Maximum Value')
    }
    if (customErrors.length > 0) {
      throw new Error(`Invalid parameters: ${customErrors.join(', ')}`)
    }
    
    // Build array of enabled problem types
    const problemTypes = []
    if (params.includeAddition) problemTypes.push('addition')
    if (params.includeSubtraction) problemTypes.push('subtraction')
    if (params.includeMultiplication) problemTypes.push('multiplication')
    if (params.includeDivision) problemTypes.push('division')
    if (params.includeOrdering) problemTypes.push('ordering')
    if (params.includeNumberLine) problemTypes.push('numberLine')
    if (params.includeAbsoluteValue) problemTypes.push('absoluteValue')
    
    if (problemTypes.length === 0) {
      throw new Error('At least one problem type must be enabled')
    }
    
    const problemType = this.getRandomElement(problemTypes)
    
    // Determine if this should be a word problem
    if (params.includeWordProblems && ['addition', 'subtraction'].includes(problemType) && Math.random() < 0.3) {
      return this.generateWordProblem(problemType, params)
    } else {
      return this.generateIntegerProblem(problemType, params)
    }
  }

  /**
   * Generate an integer problem
   * @param {string} problemType - Type of problem
   * @param {Object} params - Generation parameters
   * @returns {Object} Problem object
   */
  generateIntegerProblem(problemType, params) {
    switch (problemType) {
      case 'addition':
        return this.generateAdditionProblem(params)
      case 'subtraction':
        return this.generateSubtractionProblem(params)
      case 'multiplication':
        return this.generateMultiplicationProblem(params)
      case 'division':
        return this.generateDivisionProblem(params)
      case 'ordering':
        return this.generateOrderingProblem(params)
      case 'numberLine':
        return this.generateNumberLineProblem(params)
      case 'absoluteValue':
        return this.generateAbsoluteValueProblem(params)
      default:
        return this.generateAdditionProblem(params)
    }
  }
  
  generateAdditionProblem(params) {
    const num1 = this.generateInteger(params)
    const num2 = this.generateInteger(params)
    const answer = num1 + num2
    
    const steps = []
    if (params.showSteps) {
      if (num2 >= 0) {
        steps.push(`\\text{Adding a positive number: move right on number line}`)
      } else {
        steps.push(`\\text{Adding a negative number: move left on number line}`)
      }
      steps.push(`${this.formatInteger(num1)} + ${this.formatInteger(num2)} = ${this.formatInteger(answer)}`)
    }
    
    return {
      question: `${this.formatInteger(num1)} + ${this.formatInteger(num2)} = ?`,
      questionLaTeX: `${this.formatInteger(num1)} + ${this.formatInteger(num2)} = \\square`,
      answer: answer.toString(),
      answerLaTeX: this.formatInteger(answer),
      steps: steps,
      metadata: {
        problemType: 'addition',
        operands: [num1, num2],
        result: answer,
        difficulty: 'medium',
        estimatedTime: '30 seconds'
      }
    }
  }
  
  generateSubtractionProblem(params) {
    const num1 = this.generateInteger(params)
    const num2 = this.generateInteger(params)
    const answer = num1 - num2
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Subtracting: } ${this.formatInteger(num1)} - ${this.formatInteger(num2)}`)
      steps.push(`\\text{Change to addition: } ${this.formatInteger(num1)} + ${this.formatInteger(-num2)}`)
      steps.push(`\\text{Result: } ${this.formatInteger(answer)}`)
    }
    
    return {
      question: `${this.formatInteger(num1)} - ${this.formatInteger(num2)} = ?`,
      questionLaTeX: `${this.formatInteger(num1)} - ${this.formatInteger(num2)} = \\square`,
      answer: answer.toString(),
      answerLaTeX: this.formatInteger(answer),
      steps: steps,
      metadata: {
        problemType: 'subtraction',
        operands: [num1, num2],
        result: answer,
        difficulty: 'medium',
        estimatedTime: '35 seconds'
      }
    }
  }
  
  generateMultiplicationProblem(params) {
    const num1 = this.generateInteger(params)
    const num2 = this.generateInteger(params)
    const answer = num1 * num2
    
    const steps = []
    if (params.showSteps) {
      const sign1 = num1 >= 0 ? 'positive' : 'negative'
      const sign2 = num2 >= 0 ? 'positive' : 'negative'
      
      if ((num1 >= 0 && num2 >= 0) || (num1 < 0 && num2 < 0)) {
        steps.push(`\\text{Both numbers have same sign: result is positive}`)
      } else {
        steps.push(`\\text{Numbers have different signs: result is negative}`)
      }
      steps.push(`${this.formatInteger(num1)} \\times ${this.formatInteger(num2)} = ${this.formatInteger(answer)}`)
    }
    
    return {
      question: `${this.formatInteger(num1)} × ${this.formatInteger(num2)} = ?`,
      questionLaTeX: `${this.formatInteger(num1)} \\times ${this.formatInteger(num2)} = \\square`,
      answer: answer.toString(),
      answerLaTeX: this.formatInteger(answer),
      steps: steps,
      metadata: {
        problemType: 'multiplication',
        operands: [num1, num2],
        result: answer,
        difficulty: 'medium',
        estimatedTime: '40 seconds'
      }
    }
  }
  
  generateDivisionProblem(params) {
    // Generate quotient first, then multiply to get dividend
    const quotient = this.generateInteger(params)
    let divisor = this.generateInteger(params)
    
    // Ensure divisor is not zero
    if (divisor === 0) divisor = this.generateInteger({ ...params, allowZero: false }) || 1
    
    const dividend = quotient * divisor
    
    const steps = []
    if (params.showSteps) {
      if ((dividend >= 0 && divisor >= 0) || (dividend < 0 && divisor < 0)) {
        steps.push(`\\text{Same signs: result is positive}`)
      } else {
        steps.push(`\\text{Different signs: result is negative}`)
      }
      steps.push(`${this.formatInteger(dividend)} \\div ${this.formatInteger(divisor)} = ${this.formatInteger(quotient)}`)
    }
    
    return {
      question: `${this.formatInteger(dividend)} ÷ ${this.formatInteger(divisor)} = ?`,
      questionLaTeX: `${this.formatInteger(dividend)} \\div ${this.formatInteger(divisor)} = \\square`,
      answer: quotient.toString(),
      answerLaTeX: this.formatInteger(quotient),
      steps: steps,
      metadata: {
        problemType: 'division',
        operands: [dividend, divisor],
        result: quotient,
        difficulty: 'hard',
        estimatedTime: '45 seconds'
      }
    }
  }
  
  generateOrderingProblem(params) {
    // Generate 4-6 integers to order
    const count = Math.floor(Math.random() * 3) + 4 // 4-6 integers
    const integers = []
    
    for (let i = 0; i < count; i++) {
      let num = this.generateInteger(params)
      // Avoid duplicates
      while (integers.includes(num)) {
        num = this.generateInteger(params)
      }
      integers.push(num)
    }
    
    const sortedIntegers = [...integers].sort((a, b) => a - b)
    const formattedIntegers = integers.map(n => this.formatInteger(n))
    const formattedSorted = sortedIntegers.map(n => this.formatInteger(n))
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Remember: negative numbers are smaller than positive numbers}`)
      steps.push(`\\text{For negative numbers: closer to zero is greater}`)
      steps.push(`\\text{Ordered from least to greatest: } ${formattedSorted.join(', ')}`)
    }
    
    return {
      question: `Order these integers from least to greatest: ${formattedIntegers.join(', ')}`,
      questionLaTeX: `\\text{Order these integers from least to greatest: } ${formattedIntegers.join(', ')}`,
      answer: formattedSorted.join(', '),
      answerLaTeX: formattedSorted.join(', '),
      steps: steps,
      metadata: {
        problemType: 'ordering',
        integers: integers,
        sortedIntegers: sortedIntegers,
        difficulty: 'medium',
        estimatedTime: '40 seconds'
      }
    }
  }
  
  generateNumberLineProblem(params) {
    const start = this.generateInteger(params)
    const move = this.generateInteger(params)
    const end = start + move
    
    const direction = move >= 0 ? 'right' : 'left'
    const distance = Math.abs(move)
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Starting at: } ${this.formatInteger(start)}`)
      steps.push(`\\text{Move ${distance} units ${direction}}`)
      steps.push(`\\text{End at: } ${this.formatInteger(end)}`)
    }
    
    return {
      question: `Start at ${this.formatInteger(start)} on the number line. Move ${distance} units ${direction}. Where do you end up?`,
      questionLaTeX: `\\text{Start at ${this.formatInteger(start)} on the number line.} \\\\\\\\ \\text{Move ${distance} units ${direction}. Where do you end up?}`,
      answer: end.toString(),
      answerLaTeX: this.formatInteger(end),
      steps: steps,
      metadata: {
        problemType: 'numberLine',
        start: start,
        move: move,
        end: end,
        difficulty: 'medium',
        estimatedTime: '35 seconds'
      }
    }
  }
  
  generateAbsoluteValueProblem(params) {
    const problemTypes = ['simple', 'operation', 'comparison']
    const type = this.getRandomElement(problemTypes)
    
    if (type === 'simple') {
      const num = this.generateInteger(params)
      const answer = Math.abs(num)
      
      const steps = []
      if (params.showSteps) {
        steps.push(`\\text{Absolute value is the distance from zero}`)
        steps.push(`|${this.formatInteger(num)}| = ${answer}`)
      }
      
      return {
        question: `What is |${this.formatInteger(num)}|?`,
        questionLaTeX: `\\text{What is } |${this.formatInteger(num)}|?`,
        answer: answer.toString(),
        answerLaTeX: answer.toString(),
        steps: steps,
        metadata: {
          problemType: 'absoluteValue',
          subType: 'simple',
          number: num,
          result: answer,
          difficulty: 'easy',
          estimatedTime: '25 seconds'
        }
      }
    } else if (type === 'operation') {
      const num1 = this.generateInteger(params)
      const num2 = this.generateInteger(params)
      const abs1 = Math.abs(num1)
      const abs2 = Math.abs(num2)
      const answer = abs1 + abs2
      
      const steps = []
      if (params.showSteps) {
        steps.push(`|${this.formatInteger(num1)}| = ${abs1}`)
        steps.push(`|${this.formatInteger(num2)}| = ${abs2}`)
        steps.push(`${abs1} + ${abs2} = ${answer}`)
      }
      
      return {
        question: `|${this.formatInteger(num1)}| + |${this.formatInteger(num2)}| = ?`,
        questionLaTeX: `|${this.formatInteger(num1)}| + |${this.formatInteger(num2)}| = \\square`,
        answer: answer.toString(),
        answerLaTeX: answer.toString(),
        steps: steps,
        metadata: {
          problemType: 'absoluteValue',
          subType: 'operation',
          numbers: [num1, num2],
          result: answer,
          difficulty: 'medium',
          estimatedTime: '40 seconds'
        }
      }
    } else {
      // comparison
      const num1 = this.generateInteger(params)
      const num2 = this.generateInteger(params)
      const abs1 = Math.abs(num1)
      const abs2 = Math.abs(num2)
      
      let comparison, symbol
      if (abs1 > abs2) {
        comparison = 'greater than'
        symbol = '>'
      } else if (abs1 < abs2) {
        comparison = 'less than'
        symbol = '<'
      } else {
        comparison = 'equal to'
        symbol = '='
      }
      
      const steps = []
      if (params.showSteps) {
        steps.push(`|${this.formatInteger(num1)}| = ${abs1}`)
        steps.push(`|${this.formatInteger(num2)}| = ${abs2}`)
        steps.push(`${abs1} ${symbol} ${abs2}`)
      }
      
      return {
        question: `Compare: |${this.formatInteger(num1)}| ____ |${this.formatInteger(num2)}|`,
        questionLaTeX: `\\text{Compare: } |${this.formatInteger(num1)}| \\square |${this.formatInteger(num2)}|`,
        answer: symbol,
        answerLaTeX: symbol,
        steps: steps,
        metadata: {
          problemType: 'absoluteValue',
          subType: 'comparison',
          numbers: [num1, num2],
          comparison: symbol,
          difficulty: 'medium',
          estimatedTime: '35 seconds'
        }
      }
    }
  }

  /**
   * Generate word problems
   */
  generateWordProblem(problemType, params) {
    const scenarios = this.getWordProblemScenarios(problemType, params)
    const scenario = this.getRandomElement(scenarios)
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Identify the numbers and operation}`)
      steps.push(`\\text{Calculate: } ${scenario.calculation}`)
      steps.push(`\\text{Answer: } ${this.formatInteger(scenario.answer)}`)
    }
    
    return {
      question: scenario.question,
      questionLaTeX: scenario.questionLaTeX,
      answer: scenario.answer.toString(),
      answerLaTeX: this.formatInteger(scenario.answer),
      steps: steps,
      metadata: {
        problemType: `word-${problemType}`,
        scenario: scenario.type,
        operands: scenario.operands,
        result: scenario.answer,
        difficulty: 'medium',
        estimatedTime: '60 seconds'
      }
    }
  }
  
  getWordProblemScenarios(problemType, params) {
    const scenarios = []
    
    if (problemType === 'addition') {
      const temp1 = this.generateInteger(params)
      const temp2 = this.generateInteger(params)
      const answer = temp1 + temp2
      
      scenarios.push({
        type: 'temperature',
        question: `The temperature was ${this.formatInteger(temp1)}°C in the morning. It changed by ${this.formatInteger(temp2)}°C during the day. What was the final temperature?`,
        questionLaTeX: `\\text{The temperature was ${this.formatInteger(temp1)}°C in the morning.} \\\\\\\\ \\text{It changed by ${this.formatInteger(temp2)}°C during the day.} \\\\\\\\ \\text{What was the final temperature?}`,
        answer: answer,
        calculation: `${this.formatInteger(temp1)} + ${this.formatInteger(temp2)} = ${this.formatInteger(answer)}`,
        operands: [temp1, temp2]
      })
      
      const account1 = this.generateInteger(params)
      const account2 = this.generateInteger(params)
      const accountAnswer = account1 + account2
      
      scenarios.push({
        type: 'banking',
        question: `A bank account has a balance of ${this.formatInteger(account1)} dollars. A transaction of ${this.formatInteger(account2)} dollars occurs. What is the new balance?`,
        questionLaTeX: `\\text{A bank account has a balance of ${this.formatInteger(account1)} dollars.} \\\\\\\\ \\text{A transaction of ${this.formatInteger(account2)} dollars occurs.} \\\\\\\\ \\text{What is the new balance?}`,
        answer: accountAnswer,
        calculation: `${this.formatInteger(account1)} + ${this.formatInteger(account2)} = ${this.formatInteger(accountAnswer)}`,
        operands: [account1, account2]
      })
    }
    
    if (problemType === 'subtraction') {
      const elev1 = this.generateInteger(params)
      const elev2 = this.generateInteger(params)
      const elevAnswer = elev1 - elev2
      
      scenarios.push({
        type: 'elevation',
        question: `A location is at ${this.formatInteger(elev1)} meters elevation. Another location is ${this.formatInteger(elev2)} meters higher or lower. What is the elevation difference?`,
        questionLaTeX: `\\text{A location is at ${this.formatInteger(elev1)} meters elevation.} \\\\\\\\ \\text{The elevation changes by ${this.formatInteger(-elev2)} meters.} \\\\\\\\ \\text{What is the new elevation?}`,
        answer: elevAnswer,
        calculation: `${this.formatInteger(elev1)} - ${this.formatInteger(elev2)} = ${this.formatInteger(elevAnswer)}`,
        operands: [elev1, elev2]
      })
    }
    
    return scenarios
  }

  /**
   * Generate an integer within the specified range
   */
  generateInteger(params) {
    let min = params.minValue
    let max = params.maxValue
    
    // Apply complexity level overrides
    if (params.complexityLevel === 'basic') {
      min = Math.max(-10, min)
      max = Math.min(10, max)
    } else if (params.complexityLevel === 'intermediate') {
      min = Math.max(-50, min)
      max = Math.min(50, max)
    } else if (params.complexityLevel === 'advanced') {
      min = Math.max(-100, min)
      max = Math.min(100, max)
    }
    
    let value
    do {
      value = Math.floor(Math.random() * (max - min + 1)) + min
    } while (!params.allowZero && value === 0)
    
    return value
  }

  /**
   * Format integer for display with proper parentheses
   */
  formatInteger(num) {
    if (num < 0) {
      return `(${num})`
    }
    return num.toString()
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

export default IntegersGenerator