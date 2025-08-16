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
        allowCarrying: true
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
    
    // Generate addends with carrying logic
    const addends = []
    let attempts = 0
    const maxAttempts = 100
    
    while (addends.length < params.addendCount && attempts < maxAttempts) {
      attempts++
      
      // Adjust range for negative numbers
      let minRange = params.minAddend
      let maxRange = params.maxAddend
      
      if (params.allowNegatives) {
        // Allow negative numbers by expanding the range
        minRange = -Math.abs(params.maxAddend)
        maxRange = Math.abs(params.maxAddend)
      }
      
      const candidate = this.getRandomNumber(minRange, maxRange, params.allowNegatives)
      
      // For the first addend, always accept
      if (addends.length === 0) {
        addends.push(candidate)
        continue
      }
      
      // Check if adding this candidate would create carrying
      const tempAddends = [...addends, candidate]
      const requiresCarrying = this.checkRequiresCarrying(tempAddends)
      
      // Accept or reject based on allowCarrying setting
      if (params.allowCarrying || !requiresCarrying) {
        addends.push(candidate)
      }
    }
    
    // Fallback: if we couldn't generate enough addends, fill with simple numbers
    while (addends.length < params.addendCount) {
      const simpleNumber = params.allowNegatives ? 
        this.getRandomNumber(-9, 9, true) : 
        this.getRandomNumber(1, 9, false)
      addends.push(simpleNumber)
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

  /**
   * Check if adding a set of numbers requires carrying
   * @param {number[]} addends - Array of numbers to add
   * @returns {boolean} - True if carrying is required
   */
  checkRequiresCarrying(addends) {
    // Convert to positive numbers for carrying check (negative numbers complicate this)
    const positiveAddends = addends.map(n => Math.abs(n))
    
    // Convert each number to string to check digit by digit
    const stringNumbers = positiveAddends.map(n => n.toString())
    const maxLength = Math.max(...stringNumbers.map(s => s.length))
    
    // Pad with leading zeros for consistent length
    const paddedNumbers = stringNumbers.map(s => s.padStart(maxLength, '0'))
    
    // Check each column from right to left
    for (let position = maxLength - 1; position >= 0; position--) {
      let columnSum = 0
      
      // Add all digits in this column
      for (let numIndex = 0; numIndex < paddedNumbers.length; numIndex++) {
        columnSum += parseInt(paddedNumbers[numIndex][position])
      }
      
      // If any column sum is >= 10, carrying is required
      if (columnSum >= 10) {
        return true
      }
    }
    
    return false
  }

  getRandomNumber(min, max, allowNegatives = false) {
    // Only force min to 0 if negatives are not allowed AND min is negative
    if (!allowNegatives && min < 0) {
      min = 0
    }
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}

export default AdditionGenerator