import { BaseGenerator } from '../BaseGenerator.js'

/**
 * Linear Equations Generator
 * Generates linear equation problems to solve for x
 */
export class LinearEquationsGenerator extends BaseGenerator {
  constructor() {
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
        equationType: 'one-step',
        showWorkSpace: true,
        includeAnswerKey: true
      },
      
      parameterSchema: {
        problemCount: {
          type: 'number',
          label: 'Number of Problems',
          description: 'How many linear equation problems to generate',
          min: 1,
          max: 100,
          required: true
        },
        minCoefficient: {
          type: 'number',
          label: 'Minimum Coefficient',
          description: 'Smallest coefficient for x',
          min: 1,
          max: 20,
          required: true
        },
        maxCoefficient: {
          type: 'number',
          label: 'Maximum Coefficient',
          description: 'Largest coefficient for x',
          min: 1,
          max: 50,
          required: true
        },
        minConstant: {
          type: 'number',
          label: 'Minimum Constant',
          description: 'Smallest constant term',
          min: 1,
          max: 100,
          required: true
        },
        maxConstant: {
          type: 'number',
          label: 'Maximum Constant',
          description: 'Largest constant term',
          min: 1,
          max: 200,
          required: true
        },
        allowNegatives: {
          type: 'boolean',
          label: 'Allow Negative Numbers',
          description: 'Include negative coefficients and constants'
        },
        allowFractions: {
          type: 'boolean',
          label: 'Allow Fraction Solutions',
          description: 'Allow problems with fractional answers'
        },
        equationType: {
          type: 'string',
          label: 'Equation Type',
          description: 'Type of linear equation',
          options: ['one-step', 'two-step', 'multi-step']
        },
        showWorkSpace: {
          type: 'boolean',
          label: 'Show Work Space',
          description: 'Include space for student work'
        },
        includeAnswerKey: {
          type: 'boolean',
          label: 'Include Answer Key',
          description: 'Generate answer key with solutions'
        }
      }
    })
  }

  generateProblem(parameters = {}) {
    const params = { ...this.defaultParameters, ...parameters }
    
    const validation = this.validateParameters(params)
    if (!validation.isValid) {
      throw new Error(`Invalid parameters: ${validation.errors.join(', ')}`)
    }
    
    let equation, solution, steps
    
    switch (params.equationType) {
      case 'one-step':
        ({ equation, solution, steps } = this.generateOneStepEquation(params))
        break
      case 'two-step':
        ({ equation, solution, steps } = this.generateTwoStepEquation(params))
        break
      case 'multi-step':
        ({ equation, solution, steps } = this.generateMultiStepEquation(params))
        break
      default:
        ({ equation, solution, steps } = this.generateTwoStepEquation(params))
    }
    
    const questionText = `Solve for x: ${equation.display}`
    const questionLaTeX = `\\text{Solve for } x: ${equation.latex}`
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: solution.display,
      answerLaTeX: solution.latex,
      workSpace: params.showWorkSpace,
      steps: steps,
      metadata: {
        operation: 'linear-equations',
        equationType: params.equationType,
        solution: solution.value,
        difficulty: this.difficulty,
        estimatedTime: '120 seconds'
      }
    }
  }

  generateTwoStepEquation(params) {
    // Generate ax + b = c format
    const a = this.getRandomNumber(params.minCoefficient, params.maxCoefficient, params.allowNegatives)
    const x = this.getRandomNumber(1, 10) // Solution value
    const b = this.getRandomNumber(params.minConstant, params.maxConstant, params.allowNegatives)
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
    const a = this.getRandomNumber(params.minCoefficient, params.maxCoefficient, params.allowNegatives)
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
    // For now, same as two-step
    return this.generateTwoStepEquation(params)
  }

  getRandomNumber(min, max, allowNegative = false) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min
    return allowNegative && Math.random() > 0.5 ? -num : num
  }
}

export default LinearEquationsGenerator