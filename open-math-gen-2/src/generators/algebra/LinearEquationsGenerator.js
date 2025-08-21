import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Linear Equations Generator
 * Generates linear equation problems to solve for x
 */
export class LinearEquationsGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Linear Equations',
      description: 'Generate linear equations to solve for x (ax + b = c format)',
      category: 'algebra',
      difficulty: 'medium',
      icon: 'functions',
      tags: ['algebra', 'equations', 'solving', 'variables'],
      gradeLevel: '8-12',
      estimatedTime: '120 seconds',
      exampleProblem: {
        question: 'Solve for x: 3x + 7 = 22',
        questionLaTeX: '\\text{Solve for } x: 3x + 7 = 22',
        answer: 'x = 5',
        answerLaTeX: 'x = 5'
      },
      
      defaultParameters: {
        problemCount: 10,
        minCoefficient: 1,
        maxCoefficient: 10,
        minConstant: 1,
        maxConstant: 50,
        allowNegatives: true,
        allowFractions: false,
        equationType: 'two-step',
        includeOneStep: true,
        includeTwoStep: true,
        includeMultiStep: false,
        includeWordProblems: false,
        complexityLevel: 'basic'
      },
      
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
                description: 'How many linear equation problems to generate',
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
                description: 'Determines the difficulty of linear equations',
                variant: 'cards',
                options: [
                  { value: 'basic', label: 'Basic', description: 'Simple coefficients and constants' },
                  { value: 'intermediate', label: 'Intermediate', description: 'Larger numbers and negatives' },
                  { value: 'advanced', label: 'Advanced', description: 'Fractions and complex equations' }
                ],
                order: 2
              })
            }
          }),
          
          equationTypes: schemaV2.createCategory({
            id: 'equationTypes',
            label: 'Equation Types',
            description: 'Choose which types of linear equations to include',
            icon: 'functions',
            color: 'green',
            order: 2,
            parameters: {
              includeOneStep: schemaV2.createParameter({
                type: 'boolean',
                label: 'One-Step Equations',
                description: 'Include equations like 3x = 15',
                helpText: 'ax = c format',
                order: 1
              }),
              includeTwoStep: schemaV2.createParameter({
                type: 'boolean',
                label: 'Two-Step Equations',
                description: 'Include equations like 2x + 5 = 11',
                helpText: 'ax + b = c format',
                order: 2
              }),
              includeMultiStep: schemaV2.createParameter({
                type: 'boolean',
                label: 'Multi-Step Equations',
                description: 'Include equations with variables on both sides',
                helpText: 'ax + b = cx + d format',
                order: 3
              }),
              includeWordProblems: schemaV2.createParameter({
                type: 'boolean',
                label: 'Word Problems',
                description: 'Include real-world application problems',
                helpText: 'Age, money, distance problems',
                order: 4
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
                presets: [8, 10, 12, 15],
                order: 1
              }),
              maxConstant: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Constant',
                description: 'Largest constant term',
                min: 5,
                max: 100,
                required: true,
                slider: true,
                presets: [20, 30, 50, 75],
                order: 2
              }),
              allowNegatives: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Negative Numbers',
                description: 'Include negative coefficients and constants',
                helpText: 'Equations like -2x + 3 = 7',
                order: 3
              }),
              allowFractions: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Fraction Solutions',
                description: 'Allow problems with fractional answers',
                helpText: 'Solutions like x = 2/3',
                order: 4
              })
            }
          })
        },
        
        presets: [
          schemaV2.createPreset({
            id: 'one-step-practice',
            label: 'One-Step Practice',
            description: 'Focus on one-step linear equations',
            icon: 'looks_one',
            category: 'difficulty',
            values: {
              problemCount: 10,
              includeOneStep: true,
              includeTwoStep: false,
              includeMultiStep: false,
              includeWordProblems: false,
              maxCoefficient: 8,
              maxConstant: 30,
              allowNegatives: false,
              allowFractions: false,
              complexityLevel: 'basic'
            }
          }),
          
          schemaV2.createPreset({
            id: 'two-step-practice',
            label: 'Two-Step Practice',
            description: 'Focus on two-step linear equations',
            icon: 'looks_two',
            category: 'difficulty',
            values: {
              problemCount: 12,
              includeOneStep: false,
              includeTwoStep: true,
              includeMultiStep: false,
              includeWordProblems: false,
              maxCoefficient: 10,
              maxConstant: 50,
              allowNegatives: true,
              allowFractions: false,
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'mixed-equations',
            label: 'Mixed Equations',
            description: 'Practice all types of linear equations',
            icon: 'shuffle',
            category: 'scope',
            values: {
              problemCount: 15,
              includeOneStep: true,
              includeTwoStep: true,
              includeMultiStep: true,
              includeWordProblems: false,
              maxCoefficient: 12,
              maxConstant: 60,
              allowNegatives: true,
              allowFractions: false,
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'word-problems',
            label: 'Word Problems',
            description: 'Real-world linear equation applications',
            icon: 'description',
            category: 'scope',
            values: {
              problemCount: 8,
              includeOneStep: false,
              includeTwoStep: true,
              includeMultiStep: false,
              includeWordProblems: true,
              maxCoefficient: 8,
              maxConstant: 40,
              allowNegatives: false,
              allowFractions: false,
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'advanced-equations',
            label: 'Advanced Equations',
            description: 'Complex linear equations with fractions',
            icon: 'trending_up',
            category: 'difficulty',
            values: {
              problemCount: 10,
              includeOneStep: false,
              includeTwoStep: true,
              includeMultiStep: true,
              includeWordProblems: true,
              maxCoefficient: 15,
              maxConstant: 75,
              allowNegatives: true,
              allowFractions: true,
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
    
    // Build array of enabled problem types
    const problemTypes = []
    if (params.includeWordProblems) problemTypes.push('wordProblem')
    if (params.includeOneStep) problemTypes.push('oneStep')
    if (params.includeTwoStep) problemTypes.push('twoStep')
    if (params.includeMultiStep) problemTypes.push('multiStep')
    
    if (problemTypes.length === 0) {
      problemTypes.push('twoStep') // fallback
    }
    
    const problemType = this.getRandomElement(problemTypes)
    
    let equation, solution, steps, wordQuestion
    
    switch (problemType) {
      case 'oneStep':
        ({ equation, solution, steps } = this.generateOneStepEquation(params))
        break
      case 'twoStep':
        ({ equation, solution, steps } = this.generateTwoStepEquation(params))
        break
      case 'multiStep':
        ({ equation, solution, steps } = this.generateMultiStepEquation(params))
        break
      case 'wordProblem':
        ({ equation, solution, steps, question: wordQuestion } = this.generateWordProblem(params))
        break
      default:
        ({ equation, solution, steps } = this.generateTwoStepEquation(params))
    }
    
    // Handle word problems differently
    let questionText, questionLaTeX
    if (problemType === 'wordProblem' && wordQuestion) {
      questionText = wordQuestion
      questionLaTeX = `\\text{${wordQuestion.replace(/\$/g, '\\$')}}`
    } else {
      questionText = `Solve for x: ${equation.display}`
      questionLaTeX = `\\text{Solve for } x: ${equation.latex}`
    }
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: solution.display,
      answerLaTeX: solution.latex,
      steps: steps,
      metadata: {
        problemType: problemType,
        solution: solution.value,
        difficulty: 'medium',
        estimatedTime: '2 minutes'
      }
    }
  }

  generateTwoStepEquation(params) {
    // Generate ax + b = c format
    const a = this.getRandomNumber(1, params.maxCoefficient, params.allowNegatives)
    const x = this.getRandomNumber(1, 10) // Solution value
    const b = this.getRandomNumber(1, params.maxConstant, params.allowNegatives)
    const c = a * x + b
    
    const equation = {
      display: `${a}x + ${b} = ${c}`,
      latex: `${a}x + ${b} = ${c}`
    }
    
    const solution = {
      value: x,
      display: `x = ${x}`,
      latex: `x = ${x}`
    }
    
    const steps = [
      `${a}x + ${b} = ${c}`,
      `${a}x = ${c} - ${b}`,
      `${a}x = ${c - b}`,
      `x = \\frac{${c - b}}{${a}}`,
      `x = ${x}`
    ]
    
    return { equation, solution, steps }
  }

  generateOneStepEquation(params) {
    const a = this.getRandomNumber(1, params.maxCoefficient, params.allowNegatives)
    const x = this.getRandomNumber(1, 10)
    const c = a * x
    
    const equation = {
      display: `${a}x = ${c}`,
      latex: `${a}x = ${c}`
    }
    
    const solution = {
      value: x,
      display: `x = ${x}`,
      latex: `x = ${x}`
    }
    
    const steps = [
      `${a}x = ${c}`,
      `x = \\frac{${c}}{${a}}`,
      `x = ${x}`
    ]
    
    return { equation, solution, steps }
  }

  generateMultiStepEquation(params) {
    // Generate ax + b = cx + d format (variables on both sides)
    const a = this.getRandomNumber(2, params.maxCoefficient, false)
    const c = this.getRandomNumber(1, a - 1, false) // Ensure a > c for positive solution
    const x = this.getRandomNumber(1, 8) // Solution value
    const b = this.getRandomNumber(1, params.maxConstant, params.allowNegatives)
    const d = c * x + b - a * x // Calculate d so that solution is x
    
    const equation = {
      display: `${a}x + ${b} = ${c}x + ${d}`,
      latex: `${a}x + ${b} = ${c}x + ${d}`
    }
    
    const solution = {
      value: x,
      display: `x = ${x}`,
      latex: `x = ${x}`
    }
    
    const steps = [
      `${a}x + ${b} = ${c}x + ${d}`,
      `${a}x - ${c}x = ${d} - ${b}`,
      `${a - c}x = ${d - b}`,
      `x = \\frac{${d - b}}{${a - c}}`,
      `x = ${x}`
    ]
    
    return { equation, solution, steps }
  }
  
  generateWordProblem(params) {
    const scenarios = [
      {
        type: 'age_future',
        setup: (x) => {
          const yearsLater = Math.floor(Math.random() * 8) + 3
          const futureAge = x + yearsLater
          return {
            question: `In ${yearsLater} years, Maria will be ${futureAge} years old. How old is Maria now?`,
            equation: `x + ${yearsLater} = ${futureAge}`,
            solution: x
          }
        }
      },
      {
        type: 'age_difference',
        setup: (x) => {
          const ageDiff = Math.floor(Math.random() * 10) + 5
          const siblingAge = x + ageDiff
          return {
            question: `Tom is ${ageDiff} years older than his sister. If Tom is ${siblingAge} years old, how old is his sister?`,
            equation: `x + ${ageDiff} = ${siblingAge}`,
            solution: x
          }
        }
      },
      {
        type: 'shopping_total',
        setup: (x) => {
          const itemCost = Math.floor(Math.random() * 8) + 3
          const totalCost = x * itemCost
          return {
            question: `Books cost $${itemCost} each. If you spend $${totalCost} on books, how many books did you buy?`,
            equation: `${itemCost}x = ${totalCost}`,
            solution: x
          }
        }
      },
      {
        type: 'savings_weekly',
        setup: (x) => {
          const weeklySavings = Math.floor(Math.random() * 15) + 5
          const startAmount = Math.floor(Math.random() * 30) + 10
          const totalAfterWeeks = weeklySavings * x + startAmount
          return {
            question: `Lisa starts with $${startAmount} and saves $${weeklySavings} each week. After how many weeks will she have $${totalAfterWeeks}?`,
            equation: `${weeklySavings}x + ${startAmount} = ${totalAfterWeeks}`,
            solution: x
          }
        }
      },
      {
        type: 'geometry_perimeter',
        setup: (x) => {
          const width = Math.floor(Math.random() * 8) + 4
          const perimeter = 2 * (x + width)
          return {
            question: `A rectangle has a width of ${width} cm and a perimeter of ${perimeter} cm. What is the length of the rectangle?`,
            equation: `2(x + ${width}) = ${perimeter}`,
            solution: x
          }
        }
      },
      {
        type: 'distance_speed',
        setup: (x) => {
          const speed = Math.floor(Math.random() * 20) + 30
          const time = Math.floor(Math.random() * 4) + 2
          const distance = speed * time
          return {
            question: `A car travels ${distance} miles in ${time} hours. What is the speed of the car in miles per hour?`,
            equation: `${time}x = ${distance}`,
            solution: x
          }
        }
      },
      {
        type: 'temperature_conversion',
        setup: (x) => {
          const celsius = x
          const fahrenheit = Math.floor(celsius * 9/5 + 32)
          return {
            question: `The temperature is ${fahrenheit}°F. What is the temperature in Celsius? (Use F = 9C/5 + 32)`,
            equation: `\\frac{9x}{5} + 32 = ${fahrenheit}`,
            solution: x
          }
        }
      },
      {
        type: 'ticket_sales',
        setup: (x) => {
          const adultPrice = Math.floor(Math.random() * 10) + 8
          const childPrice = Math.floor(Math.random() * 5) + 3
          const childTickets = Math.floor(Math.random() * 15) + 5
          const totalRevenue = adultPrice * x + childPrice * childTickets
          return {
            question: `Movie tickets cost $${adultPrice} for adults and $${childPrice} for children. If ${childTickets} child tickets and some adult tickets were sold for a total of $${totalRevenue}, how many adult tickets were sold?`,
            equation: `${adultPrice}x + ${childPrice * childTickets} = ${totalRevenue}`,
            solution: x
          }
        }
      },
      {
        type: 'number_consecutive',
        setup: (x) => {
          const firstNumber = x
          const secondNumber = x + 1
          const sum = firstNumber + secondNumber
          return {
            question: `The sum of two consecutive integers is ${sum}. What is the smaller integer?`,
            equation: `x + (x + 1) = ${sum}`,
            solution: x
          }
        }
      },
      {
        type: 'pizza_slices',
        setup: (x) => {
          const slicesPerPizza = 8
          const extraSlices = Math.floor(Math.random() * 6) + 2
          const totalSlices = slicesPerPizza * x + extraSlices
          return {
            question: `A party ordered pizzas cut into ${slicesPerPizza} slices each, plus ${extraSlices} extra slices from leftover pizza. If there were ${totalSlices} slices total, how many whole pizzas were ordered?`,
            equation: `${slicesPerPizza}x + ${extraSlices} = ${totalSlices}`,
            solution: x
          }
        }
      }
    ]
    
    const x = this.getRandomNumber(3, 12)
    const scenario = this.getRandomElement(scenarios)
    const problem = scenario.setup(x)
    
    const steps = [
      `\\text{Let x be the unknown value}`,
      `\\text{Set up equation: } ${problem.equation}`,
      `\\text{Solve for x}`,
      `x = ${problem.solution}`
    ]
    
    return {
      equation: {
        display: problem.equation,
        latex: problem.equation
      },
      solution: {
        value: problem.solution,
        display: `x = ${problem.solution}`,
        latex: `x = ${problem.solution}`
      },
      steps: steps,
      question: problem.question
    }
  }

  getRandomNumber(min, max, allowNegative = false) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min
    return allowNegative && Math.random() > 0.5 ? -num : num
  }
  
  getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)]
  }
}

export default LinearEquationsGenerator