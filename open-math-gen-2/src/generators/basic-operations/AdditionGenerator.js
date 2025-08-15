import { BaseGenerator } from '../BaseGenerator.js'

/**
 * Addition Generator
 * Generates addition problems with customizable parameters
 */
export class AdditionGenerator extends BaseGenerator {
  constructor() {
    super({
      name: 'Addition',
      description: 'Generate addition problems with whole numbers',
      category: 'basic-operations',
      difficulty: 'easy',
      icon: 'add',
      tags: ['arithmetic', 'whole-numbers', 'basic-math'],
      gradeLevel: 'K-5',
      estimatedTime: '30 seconds',
      exampleProblem: {
        question: '23 + 45 = ?',
        questionLaTeX: '23 + 45 = \\square',
        answer: '68',
        answerLaTeX: '68'
      },
      
      defaultParameters: {
        problemCount: 10,
        minAddend: 1,
        maxAddend: 100,
        addendCount: 2,
        allowNegatives: false,
        allowCarrying: true,
        showWorkSpace: true,
        includeAnswerKey: true
      },
      
      parameterSchema: {
        problemCount: {
          type: 'number',
          label: 'Number of Problems',
          description: 'How many addition problems to generate',
          min: 1,
          max: 100,
          required: true
        },
        minAddend: {
          type: 'number',
          label: 'Minimum Number',
          description: 'Smallest number to use in addition',
          min: 0,
          max: 1000,
          required: true
        },
        maxAddend: {
          type: 'number',
          label: 'Maximum Number',
          description: 'Largest number to use in addition',
          min: 1,
          max: 10000,
          required: true
        },
        addendCount: {
          type: 'number',
          label: 'Number of Addends',
          description: 'How many numbers to add together',
          min: 2,
          max: 5,
          required: true
        },
        allowNegatives: {
          type: 'boolean',
          label: 'Allow Negative Numbers',
          description: 'Include negative numbers in problems'
        },
        allowCarrying: {
          type: 'boolean',
          label: 'Allow Carrying',
          description: 'Allow problems that require carrying'
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
    
    // Validate parameters
    const validation = this.validateParameters(params)
    if (!validation.isValid) {
      throw new Error(`Invalid parameters: ${validation.errors.join(', ')}`)
    }
    
    // Generate addends
    const addends = []
    for (let i = 0; i < params.addendCount; i++) {
      addends.push(this.getRandomNumber(params.minAddend, params.maxAddend, params.allowNegatives))
    }
    
    // Calculate answer
    const answer = addends.reduce((sum, addend) => sum + addend, 0)
    
    // Format question
    const questionText = addends.join(' + ') + ' = ?'
    const questionLaTeX = addends.join(' + ') + ' = \\square'
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: answer,
      answerLaTeX: `${answer}`,
      workSpace: params.showWorkSpace,
      steps: [
        addends.join(' + '),
        `= ${answer}`
      ],
      metadata: {
        operation: 'addition',
        addends: addends,
        difficulty: this.difficulty,
        estimatedTime: '30 seconds'
      }
    }
  }

  getRandomNumber(min, max, allowNegatives = false) {
    if (!allowNegatives && min < 0) {
      min = 0
    }
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}

export default AdditionGenerator