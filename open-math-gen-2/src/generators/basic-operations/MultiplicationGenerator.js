import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Multiplication Generator
 * Generates multiplication problems with customizable parameters
 */
export class MultiplicationGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Multiplication',
      description: 'Generate multiplication problems with whole numbers',
      category: 'basic-operations',
      difficulty: 'medium',
      icon: 'close',
      tags: ['arithmetic', 'whole-numbers', 'times-tables', 'multiplication'],
      gradeLevel: '2-6',
      estimatedTime: '45 seconds',
      exampleProblem: {
        question: '7 × 8 = ?',
        questionLaTeX: '7 \\times 8 = \\square',
        answer: '56',
        answerLaTeX: '56'
      },
      
      defaultParameters: {
        problemCount: 10,
        factor1Min: 1,
        factor1Max: 12,
        factor2Min: 1,
        factor2Max: 12,
        allowSingleDigit: true,
        allowDoubleDigit: true,
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
                description: 'How many multiplication problems to generate',
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
                description: 'Determines the difficulty and factor ranges',
                variant: 'cards',
                options: [
                  { 
                    value: 'basic', 
                    label: 'Basic',
                    description: 'Times tables 1-10 (single digit focus)'
                  },
                  { 
                    value: 'intermediate', 
                    label: 'Intermediate',
                    description: 'Extended times tables 1-12'
                  },
                  { 
                    value: 'advanced', 
                    label: 'Advanced',
                    description: 'Multi-digit multiplication (up to 100)'
                  }
                ],
                order: 2
              })
            }
          }),
          
          factorRanges: schemaV2.createCategory({
            id: 'factorRanges',
            label: 'Factor Ranges',
            description: 'Control the ranges for both multiplication factors',
            icon: 'tag',
            color: 'green',
            order: 2,
            parameters: {
              factor1Min: schemaV2.createParameter({
                type: 'number',
                label: 'First Factor Minimum',
                description: 'Smallest first factor in multiplication problems',
                min: 1,
                max: 100,
                required: true,
                presets: [1, 2, 5, 10],
                helpText: 'In "7 × 8", the first factor is 7',
                order: 1
              }),
              factor1Max: schemaV2.createParameter({
                type: 'number',
                label: 'First Factor Maximum',
                description: 'Largest first factor in multiplication problems',
                min: 1,
                max: 100,
                required: true,
                presets: [10, 12, 25, 50, 100],
                order: 2
              }),
              factor2Min: schemaV2.createParameter({
                type: 'number',
                label: 'Second Factor Minimum',
                description: 'Smallest second factor in multiplication problems',
                min: 1,
                max: 100,
                required: true,
                presets: [1, 2, 5, 10],
                helpText: 'In "7 × 8", the second factor is 8',
                order: 3
              }),
              factor2Max: schemaV2.createParameter({
                type: 'number',
                label: 'Second Factor Maximum',
                description: 'Largest second factor in multiplication problems',
                min: 1,
                max: 100,
                required: true,
                presets: [10, 12, 25, 50, 100],
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
              allowSingleDigit: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Single Digit Problems',
                description: 'Include multiplication with single-digit factors',
                helpText: 'Example: 6 × 7 (both factors are single digits)',
                order: 1
              }),
              allowDoubleDigit: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Multi-Digit Problems',
                description: 'Include multiplication with multi-digit factors',
                helpText: 'Example: 23 × 45 (factors with two or more digits)',
                order: 2
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'times-tables',
            label: 'Times Tables Practice',
            description: 'Focus on memorizing multiplication facts 1-10',
            icon: 'grid_on',
            category: 'difficulty',
            values: {
              problemCount: 15,
              complexityLevel: 'basic',
              factor1Min: 1,
              factor1Max: 10,
              factor2Min: 1,
              factor2Max: 10,
              allowSingleDigit: true,
              allowDoubleDigit: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'extended-tables',
            label: 'Extended Times Tables',
            description: 'Practice multiplication facts through 12',
            icon: 'apps',
            category: 'difficulty',
            values: {
              problemCount: 20,
              complexityLevel: 'intermediate',
              factor1Min: 1,
              factor1Max: 12,
              factor2Min: 1,
              factor2Max: 12,
              allowSingleDigit: true,
              allowDoubleDigit: true
            }
          }),
          
          schemaV2.createPreset({
            id: 'multi-digit',
            label: 'Multi-Digit Multiplication',
            description: 'Practice with larger numbers requiring algorithms',
            icon: 'calculate',
            category: 'difficulty',
            values: {
              problemCount: 12,
              complexityLevel: 'advanced',
              factor1Min: 10,
              factor1Max: 99,
              factor2Min: 2,
              factor2Max: 25,
              allowSingleDigit: false,
              allowDoubleDigit: true
            }
          }),
          
          schemaV2.createPreset({
            id: 'mixed-practice',
            label: 'Mixed Practice',
            description: 'Combination of single and multi-digit problems',
            icon: 'shuffle',
            category: 'scope',
            values: {
              problemCount: 15,
              complexityLevel: 'intermediate',
              factor1Min: 1,
              factor1Max: 25,
              factor2Min: 1,
              factor2Max: 15,
              allowSingleDigit: true,
              allowDoubleDigit: true
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
    
    // Generate factors with digit constraint logic
    let factor1, factor2, answer
    let attempts = 0
    const maxAttempts = 100
    
    do {
      attempts++
      
      factor1 = this.getRandomNumber(adjustedParams.factor1Min, adjustedParams.factor1Max)
      factor2 = this.getRandomNumber(adjustedParams.factor2Min, adjustedParams.factor2Max)
      
      // Check digit constraints
      const factor1Digits = factor1.toString().length
      const factor2Digits = factor2.toString().length
      
      const hasSingleDigit = factor1Digits === 1 || factor2Digits === 1
      const hasDoubleDigit = factor1Digits >= 2 || factor2Digits >= 2
      
      // Accept based on constraints
      const meetsSingleDigitConstraint = adjustedParams.allowSingleDigit || !hasSingleDigit
      const meetsDoubleDigitConstraint = adjustedParams.allowDoubleDigit || !hasDoubleDigit
      
      if (meetsSingleDigitConstraint && meetsDoubleDigitConstraint) {
        break
      }
      
    } while (attempts < maxAttempts)
    
    // Fallback: ensure we have a valid problem
    if (attempts >= maxAttempts) {
      // Generate simple valid problem
      factor1 = adjustedParams.allowSingleDigit ? 
        this.getRandomNumber(1, 9) : 
        this.getRandomNumber(10, Math.min(adjustedParams.factor1Max, 99))
      factor2 = adjustedParams.allowSingleDigit ? 
        this.getRandomNumber(1, 9) : 
        this.getRandomNumber(10, Math.min(adjustedParams.factor2Max, 99))
    }
    
    answer = factor1 * factor2
    
    const questionText = `${factor1} × ${factor2} = ?`
    const questionLaTeX = `${factor1} \\times ${factor2} = \\square`
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: answer,
      answerLaTeX: `${answer}`,
      steps: [
        `${factor1} × ${factor2}`,
        `= ${answer}`
      ],
      metadata: {
        operation: 'multiplication',
        factors: [factor1, factor2],
        complexityLevel: adjustedParams.complexityLevel,
        hasSingleDigitFactors: factor1 < 10 && factor2 < 10,
        hasMultiDigitFactors: factor1 >= 10 || factor2 >= 10,
        difficulty: this.difficulty,
        estimatedTime: '45 seconds'
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
      // Basic: times tables focus (1-10)
      adjusted.factor1Min = Math.max(1, Math.min(adjusted.factor1Min, 10))
      adjusted.factor1Max = Math.min(adjusted.factor1Max, 10)
      adjusted.factor2Min = Math.max(1, Math.min(adjusted.factor2Min, 10))
      adjusted.factor2Max = Math.min(adjusted.factor2Max, 10)
      // Prefer single digit problems for basic level
      if (!adjusted.hasOwnProperty('allowSingleDigit')) {
        adjusted.allowSingleDigit = true
      }
    } else if (params.complexityLevel === 'intermediate') {
      // Intermediate: extended times tables (1-12)
      adjusted.factor1Min = Math.max(1, Math.min(adjusted.factor1Min, 12))
      adjusted.factor1Max = Math.min(adjusted.factor1Max, 12)
      adjusted.factor2Min = Math.max(1, Math.min(adjusted.factor2Min, 12))
      adjusted.factor2Max = Math.min(adjusted.factor2Max, 12)
    } else if (params.complexityLevel === 'advanced') {
      // Advanced: multi-digit multiplication
      adjusted.factor1Max = Math.max(adjusted.factor1Max, 25)
      adjusted.factor2Max = Math.max(adjusted.factor2Max, 25)
      // Enable multi-digit problems for advanced level
      if (!adjusted.hasOwnProperty('allowDoubleDigit')) {
        adjusted.allowDoubleDigit = true
      }
    }
    
    return adjusted
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}

export default MultiplicationGenerator