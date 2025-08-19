import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Subtraction Generator
 * Generates subtraction problems with customizable parameters
 */
export class SubtractionGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Subtraction',
      description: 'Generate subtraction problems with whole numbers',
      category: 'basic-operations',
      difficulty: 'easy',
      icon: 'remove',
      tags: ['arithmetic', 'whole-numbers', 'basic-math', 'borrowing'],
      gradeLevel: 'K-5',
      estimatedTime: '30 seconds',
      exampleProblem: {
        question: '45 - 23 = ?',
        questionLaTeX: '45 - 23 = \\square',
        answer: '22',
        answerLaTeX: '22'
      },
      
      defaultParameters: {
        problemCount: 10,
        minuendMin: 10,
        minuendMax: 100,
        subtrahendMin: 1,
        subtrahendMax: 50,
        allowNegativeResults: false,
        allowBorrowing: true,
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
                description: 'How many subtraction problems to generate',
                min: 1,
                max: 50,
                required: true,
                slider: true,
                presets: [5, 10, 15, 20],
                order: 1
              }),
              complexityLevel: schemaV2.createParameter({
                type: 'select',
                label: 'Complexity Level',
                description: 'Determines the difficulty and number ranges',
                variant: 'cards',
                options: [
                  { 
                    value: 'basic', 
                    label: 'Basic',
                    description: 'Simple subtraction without borrowing (10-50)'
                  },
                  { 
                    value: 'intermediate', 
                    label: 'Intermediate',
                    description: 'Two-digit subtraction with borrowing (10-100)'
                  },
                  { 
                    value: 'advanced', 
                    label: 'Advanced',
                    description: 'Large numbers and negative results (1-1000)'
                  }
                ],
                order: 2
              })
            }
          }),
          
          numberRanges: schemaV2.createCategory({
            id: 'numberRanges',
            label: 'Number Ranges',
            description: 'Control the minuend and subtrahend ranges',
            icon: 'tag',
            color: 'green',
            order: 2,
            parameters: {
              minuendMin: schemaV2.createParameter({
                type: 'number',
                label: 'Minuend Minimum',
                description: 'Smallest number to subtract from (the first number)',
                min: 1,
                max: 1000,
                required: true,
                presets: [10, 20, 50, 100],
                helpText: 'In "45 - 23", the minuend is 45',
                order: 1
              }),
              minuendMax: schemaV2.createParameter({
                type: 'number',
                label: 'Minuend Maximum',
                description: 'Largest number to subtract from (the first number)',
                min: 1,
                max: 10000,
                required: true,
                presets: [50, 100, 500, 1000],
                order: 2
              }),
              subtrahendMin: schemaV2.createParameter({
                type: 'number',
                label: 'Subtrahend Minimum',
                description: 'Smallest number to subtract (the second number)',
                min: 0,
                max: 1000,
                required: true,
                presets: [1, 5, 10, 20],
                helpText: 'In "45 - 23", the subtrahend is 23',
                order: 3
              }),
              subtrahendMax: schemaV2.createParameter({
                type: 'number',
                label: 'Subtrahend Maximum',
                description: 'Largest number to subtract (the second number)',
                min: 1,
                max: 1000,
                required: true,
                presets: [25, 50, 100, 500],
                order: 4
              })
            }
          }),
          
          difficulty: schemaV2.createCategory({
            id: 'difficulty',
            label: 'Difficulty Options',
            description: 'Advanced options that affect problem complexity',
            icon: 'school',
            color: 'purple',
            order: 3,
            expanded: false,
            parameters: {
              allowBorrowing: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Borrowing',
                description: 'Include problems that require borrowing/regrouping',
                helpText: 'Example: 42 - 28 requires borrowing from the tens place',
                order: 1
              }),
              allowNegativeResults: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Negative Results',
                description: 'Include problems with negative answers',
                helpText: 'Example: 15 - 23 = -8 (introduces integer concepts)',
                order: 2
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'kindergarten',
            label: 'Kindergarten Level',
            description: 'Simple subtraction facts within 20',
            icon: 'child_care',
            category: 'difficulty',
            values: {
              problemCount: 10,
              complexityLevel: 'basic',
              minuendMin: 5,
              minuendMax: 20,
              subtrahendMin: 1,
              subtrahendMax: 10,
              allowBorrowing: false,
              allowNegativeResults: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'grade1-2',
            label: 'Grade 1-2 Practice',
            description: 'Two-digit subtraction with borrowing',
            icon: 'school',
            category: 'difficulty',
            values: {
              problemCount: 15,
              complexityLevel: 'intermediate',
              minuendMin: 20,
              minuendMax: 100,
              subtrahendMin: 5,
              subtrahendMax: 50,
              allowBorrowing: true,
              allowNegativeResults: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'no-borrowing',
            label: 'No Borrowing',
            description: 'Simple subtraction without regrouping',
            icon: 'trending_down',
            category: 'difficulty',
            values: {
              problemCount: 12,
              complexityLevel: 'basic',
              minuendMin: 25,
              minuendMax: 99,
              subtrahendMin: 1,
              subtrahendMax: 25,
              allowBorrowing: false,
              allowNegativeResults: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'integer-subtraction',
            label: 'Integer Subtraction',
            description: 'Subtraction with positive and negative results',
            icon: 'remove_circle',
            category: 'difficulty',
            values: {
              problemCount: 15,
              complexityLevel: 'advanced',
              minuendMin: 10,
              minuendMax: 200,
              subtrahendMin: 15,
              subtrahendMax: 250,
              allowBorrowing: true,
              allowNegativeResults: true
            }
          })
        ]
      })
    })
  }

  generateProblem(parameters = {}) {
    const params = { ...this.defaultParameters, ...parameters }
    
    // Apply complexity level overrides for better defaults
    const adjustedParams = this.applyComplexityLevelAdjustments(params)
    
    // Validate parameters
    const validation = this.validateParameters(adjustedParams)
    if (!validation.isValid) {
      throw new Error(`Invalid parameters: ${validation.errors.join(', ')}`)
    }
    
    // Generate problems with borrowing/negative result logic
    let minuend, subtrahend, answer
    let attempts = 0
    const maxAttempts = 100
    
    // When negative results are allowed, deliberately create some negative results
    const shouldForceNegative = adjustedParams.allowNegativeResults && Math.random() < 0.4 // 40% chance of negative
    
    do {
      attempts++
      
      if (shouldForceNegative) {
        // Force a negative result by making subtrahend larger
        subtrahend = this.getRandomNumber(adjustedParams.subtrahendMin, adjustedParams.subtrahendMax)
        minuend = this.getRandomNumber(adjustedParams.minuendMin, Math.min(subtrahend - 1, adjustedParams.minuendMax))
      } else {
        // Normal generation
        minuend = this.getRandomNumber(adjustedParams.minuendMin, adjustedParams.minuendMax)
        subtrahend = this.getRandomNumber(adjustedParams.subtrahendMin, adjustedParams.subtrahendMax)
      }
      
      answer = minuend - subtrahend
      
      // Check constraints
      const hasNegativeResult = answer < 0
      const requiresBorrowing = this.checkRequiresBorrowing(minuend, subtrahend)
      
      // Accept based on constraints
      const meetsNegativeConstraint = adjustedParams.allowNegativeResults || !hasNegativeResult
      const meetsBorrowingConstraint = adjustedParams.allowBorrowing || !requiresBorrowing
      
      if (meetsNegativeConstraint && meetsBorrowingConstraint) {
        break
      }
      
    } while (attempts < maxAttempts)
    
    // Fallback: ensure we have a valid problem
    if (attempts >= maxAttempts) {
      if (adjustedParams.allowNegativeResults) {
        // Generate any valid problem (positive or negative)
        minuend = this.getRandomNumber(adjustedParams.minuendMin, adjustedParams.minuendMax)
        subtrahend = this.getRandomNumber(adjustedParams.subtrahendMin, adjustedParams.subtrahendMax)
      } else {
        // Generate safe positive problem
        minuend = Math.max(adjustedParams.minuendMin, 20)
        subtrahend = this.getRandomNumber(1, Math.min(minuend - 1, adjustedParams.subtrahendMax))
      }
      answer = minuend - subtrahend
    }
    
    // Format question
    const questionText = `${minuend} - ${subtrahend} = ?`
    const questionLaTeX = `${minuend} - ${subtrahend} = \\square`
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: answer,
      answerLaTeX: `${answer}`,
      steps: [
        `${minuend} - ${subtrahend}`,
        `= ${answer}`
      ],
      metadata: {
        operation: 'subtraction',
        minuend: minuend,
        subtrahend: subtrahend,
        complexityLevel: adjustedParams.complexityLevel,
        requiresBorrowing: this.checkRequiresBorrowing(minuend, subtrahend),
        hasNegativeResult: answer < 0,
        difficulty: this.difficulty,
        estimatedTime: '30 seconds'
      }
    }
  }

  /**
   * Check if subtraction requires borrowing/regrouping
   * @param {number} minuend - The number being subtracted from
   * @param {number} subtrahend - The number being subtracted
   * @returns {boolean} - True if borrowing is required
   */
  checkRequiresBorrowing(minuend, subtrahend) {
    // Convert to strings to check digit by digit
    const minuendStr = Math.abs(minuend).toString()
    const subtrahendStr = Math.abs(subtrahend).toString()
    
    // Pad with leading zeros for consistent length
    const maxLength = Math.max(minuendStr.length, subtrahendStr.length)
    const paddedMinuend = minuendStr.padStart(maxLength, '0')
    const paddedSubtrahend = subtrahendStr.padStart(maxLength, '0')
    
    // Check each column from right to left
    for (let position = maxLength - 1; position >= 0; position--) {
      const minuendDigit = parseInt(paddedMinuend[position])
      const subtrahendDigit = parseInt(paddedSubtrahend[position])
      
      // If any column needs borrowing (minuend digit < subtrahend digit)
      if (minuendDigit < subtrahendDigit) {
        return true
      }
    }
    
    return false
  }

  /**
   * Apply complexity level adjustments to parameters
   * @param {Object} params - Original parameters
   * @returns {Object} - Adjusted parameters
   */
  applyComplexityLevelAdjustments(params) {
    const adjusted = { ...params }
    
    // Apply complexity level overrides for better defaults
    if (params.complexityLevel === 'basic') {
      // Basic: simple subtraction, smaller numbers
      adjusted.minuendMin = Math.max(10, Math.min(adjusted.minuendMin, 50))
      adjusted.minuendMax = Math.min(adjusted.minuendMax, 50)
      adjusted.subtrahendMin = Math.max(1, Math.min(adjusted.subtrahendMin, 25))
      adjusted.subtrahendMax = Math.min(adjusted.subtrahendMax, 25)
      // Don't override allowBorrowing - let user choose
    } else if (params.complexityLevel === 'intermediate') {
      // Intermediate: two-digit subtraction
      adjusted.minuendMin = Math.max(10, Math.min(adjusted.minuendMin, 100))
      adjusted.minuendMax = Math.min(adjusted.minuendMax, 100)
      adjusted.subtrahendMin = Math.max(1, Math.min(adjusted.subtrahendMin, 50))
      adjusted.subtrahendMax = Math.min(adjusted.subtrahendMax, 50)
    } else if (params.complexityLevel === 'advanced') {
      // Advanced: larger numbers and negative results allowed
      adjusted.minuendMax = Math.max(adjusted.minuendMax, 200)
      adjusted.subtrahendMax = Math.max(adjusted.subtrahendMax, 250)
      // Allow full range of numbers
    }
    
    return adjusted
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}

export default SubtractionGenerator