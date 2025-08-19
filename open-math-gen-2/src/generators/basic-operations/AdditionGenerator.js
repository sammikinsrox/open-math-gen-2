import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Addition Generator
 * Generates addition problems with customizable parameters
 */
export class AdditionGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
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
                description: 'How many addition problems to generate',
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
                    description: 'Simple single-digit addition (1-20)'
                  },
                  { 
                    value: 'intermediate', 
                    label: 'Intermediate',
                    description: 'Double-digit addition (1-100)'
                  },
                  { 
                    value: 'advanced', 
                    label: 'Advanced',
                    description: 'Large numbers and multiple addends (1-1000)'
                  }
                ],
                order: 2
              })
            }
          }),
          
          numberRanges: schemaV2.createCategory({
            id: 'numberRanges',
            label: 'Number Ranges',
            description: 'Control the range of numbers used',
            icon: 'tag',
            color: 'green',
            order: 2,
            parameters: {
              minAddend: schemaV2.createParameter({
                type: 'number',
                label: 'Minimum Number',
                description: 'Smallest number to use in addition problems',
                min: 0,
                max: 1000,
                required: true,
                presets: [1, 5, 10, 20],
                order: 1
              }),
              maxAddend: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Number',
                description: 'Largest number to use in addition problems',
                min: 1,
                max: 10000,
                required: true,
                presets: [20, 50, 100, 500, 1000],
                order: 2
              }),
              addendCount: schemaV2.createParameter({
                type: 'number',
                label: 'Number of Addends',
                description: 'How many numbers to add together',
                min: 2,
                max: 5,
                required: true,
                slider: true,
                helpText: '2 addends: a + b, 3 addends: a + b + c, etc.',
                order: 3
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
              allowCarrying: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Carrying',
                description: 'Include problems that require carrying/regrouping',
                helpText: 'Example: 27 + 35 requires carrying in the ones column',
                order: 1
              }),
              allowNegatives: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Negative Numbers',
                description: 'Include negative numbers in addition problems',
                helpText: 'Introduces integer addition concepts',
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
            description: 'Simple single-digit addition for young learners',
            icon: 'child_care',
            category: 'difficulty',
            values: {
              problemCount: 10,
              complexityLevel: 'basic',
              minAddend: 1,
              maxAddend: 10,
              addendCount: 2,
              allowCarrying: false,
              allowNegatives: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'grade1-2',
            label: 'Grade 1-2 Practice',
            description: 'Two-digit addition with some carrying',
            icon: 'school',
            category: 'difficulty',
            values: {
              problemCount: 15,
              complexityLevel: 'intermediate',
              minAddend: 1,
              maxAddend: 50,
              addendCount: 2,
              allowCarrying: true,
              allowNegatives: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'multi-addend',
            label: 'Multiple Addends',
            description: 'Practice adding 3+ numbers together',
            icon: 'add',
            category: 'scope',
            values: {
              problemCount: 12,
              complexityLevel: 'intermediate',
              minAddend: 1,
              maxAddend: 25,
              addendCount: 4,
              allowCarrying: true,
              allowNegatives: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'integer-addition',
            label: 'Integer Addition',
            description: 'Addition with positive and negative numbers',
            icon: 'add_circle',
            category: 'difficulty',
            values: {
              problemCount: 15,
              complexityLevel: 'advanced',
              minAddend: 1,
              maxAddend: 100,
              addendCount: 2,
              allowCarrying: true,
              allowNegatives: true
            }
          })
        ]
      })
    })
  }

  generateProblem(parameters = {}) {
    const params = { ...this.defaultParameters, ...parameters }
    
    // Apply complexity level overrides for better defaults
    let adjustedParams = this.applyComplexityLevelAdjustments(params)
    
    // Validate parameters
    const validation = this.validateParameters(adjustedParams)
    if (!validation.isValid) {
      throw new Error(`Invalid parameters: ${validation.errors.join(', ')}`)
    }
    
    // Generate addends with carrying logic
    const addends = []
    let attempts = 0
    const maxAttempts = 100
    
    while (addends.length < adjustedParams.addendCount && attempts < maxAttempts) {
      attempts++
      
      // Adjust range for negative numbers
      let minRange = adjustedParams.minAddend
      let maxRange = adjustedParams.maxAddend
      
      if (adjustedParams.allowNegatives) {
        // Allow negative numbers by expanding the range
        minRange = -Math.abs(adjustedParams.maxAddend)
        maxRange = Math.abs(adjustedParams.maxAddend)
      }
      
      const candidate = this.getRandomNumber(minRange, maxRange, adjustedParams.allowNegatives)
      
      // For the first addend, always accept
      if (addends.length === 0) {
        addends.push(candidate)
        continue
      }
      
      // Check if adding this candidate would create carrying
      const tempAddends = [...addends, candidate]
      const requiresCarrying = this.checkRequiresCarrying(tempAddends)
      
      // Accept or reject based on allowCarrying setting
      if (adjustedParams.allowCarrying || !requiresCarrying) {
        addends.push(candidate)
      }
    }
    
    // Fallback: if we couldn't generate enough addends, fill with simple numbers
    while (addends.length < adjustedParams.addendCount) {
      const simpleNumber = adjustedParams.allowNegatives ? 
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
        complexityLevel: adjustedParams.complexityLevel,
        requiresCarrying: this.checkRequiresCarrying(addends),
        hasNegatives: addends.some(n => n < 0),
        difficulty: this.difficulty,
        estimatedTime: '30 seconds'
      }
    }
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
      // Basic: single-digit addition, no carrying by default
      adjusted.minAddend = Math.max(1, Math.min(adjusted.minAddend, 20))
      adjusted.maxAddend = Math.min(adjusted.maxAddend, 20)
      adjusted.addendCount = Math.min(adjusted.addendCount, 3)
      // Don't override allowCarrying - let user choose
    } else if (params.complexityLevel === 'intermediate') {
      // Intermediate: double-digit numbers
      adjusted.minAddend = Math.max(1, Math.min(adjusted.minAddend, 100))
      adjusted.maxAddend = Math.min(adjusted.maxAddend, 100)
    } else if (params.complexityLevel === 'advanced') {
      // Advanced: larger numbers and more addends
      adjusted.maxAddend = Math.max(adjusted.maxAddend, 100)
      // Allow full range of addends
    }
    
    return adjusted
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