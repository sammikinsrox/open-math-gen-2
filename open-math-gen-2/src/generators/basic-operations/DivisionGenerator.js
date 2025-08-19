import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Division Generator
 * Generates division problems with customizable parameters
 */
export class DivisionGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Division',
      description: 'Generate division problems with whole numbers',
      category: 'basic-operations',
      difficulty: 'medium',
      icon: 'percent',
      tags: ['arithmetic', 'whole-numbers', 'division', 'long-division'],
      gradeLevel: '3-6',
      estimatedTime: '60 seconds',
      exampleProblem: {
        question: '72 ÷ 8 = ?',
        questionLaTeX: '72 \\div 8 = \\square',
        answer: '9',
        answerLaTeX: '9'
      },
      
      defaultParameters: {
        problemCount: 10,
        dividendMin: 10,
        dividendMax: 144,
        divisorMin: 2,
        divisorMax: 12,
        allowRemainders: false,
        showLongDivision: false,
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
                description: 'How many division problems to generate',
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
                    description: 'Simple division facts (dividends up to 144)'
                  },
                  { 
                    value: 'intermediate', 
                    label: 'Intermediate',
                    description: 'Larger dividends with some remainders'
                  },
                  { 
                    value: 'advanced', 
                    label: 'Advanced',
                    description: 'Multi-digit division with long division format'
                  }
                ],
                order: 2
              })
            }
          }),
          
          numberRanges: schemaV2.createCategory({
            id: 'numberRanges',
            label: 'Number Ranges',
            description: 'Control the dividend and divisor ranges',
            icon: 'tag',
            color: 'green',
            order: 2,
            parameters: {
              dividendMin: schemaV2.createParameter({
                type: 'number',
                label: 'Dividend Minimum',
                description: 'Smallest dividend (number being divided)',
                min: 1,
                max: 1000,
                required: true,
                presets: [10, 20, 50, 100],
                helpText: 'In "72 ÷ 8", the dividend is 72',
                order: 1
              }),
              dividendMax: schemaV2.createParameter({
                type: 'number',
                label: 'Dividend Maximum',
                description: 'Largest dividend (number being divided)',
                min: 1,
                max: 10000,
                required: true,
                presets: [100, 144, 500, 1000],
                order: 2
              }),
              divisorMin: schemaV2.createParameter({
                type: 'number',
                label: 'Divisor Minimum',
                description: 'Smallest divisor (number dividing by)',
                min: 1,
                max: 100,
                required: true,
                presets: [2, 3, 5, 10],
                helpText: 'In "72 ÷ 8", the divisor is 8',
                order: 3
              }),
              divisorMax: schemaV2.createParameter({
                type: 'number',
                label: 'Divisor Maximum',
                description: 'Largest divisor (number dividing by)',
                min: 1,
                max: 100,
                required: true,
                presets: [10, 12, 25, 50],
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
              allowRemainders: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Remainders',
                description: 'Include problems with remainders',
                helpText: 'Example: 17 ÷ 3 = 5 R2 (introduces remainder concepts)',
                order: 1
              }),
              showLongDivision: schemaV2.createParameter({
                type: 'boolean',
                label: 'Long Division Format',
                description: 'Format problems for long division practice',
                helpText: 'Shows divisor)dividend format for algorithm practice',
                order: 2
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'basic-facts',
            label: 'Division Facts',
            description: 'Simple division facts without remainders',
            icon: 'apps',
            category: 'difficulty',
            values: {
              problemCount: 15,
              complexityLevel: 'basic',
              dividendMin: 10,
              dividendMax: 144,
              divisorMin: 2,
              divisorMax: 12,
              allowRemainders: false,
              showLongDivision: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'with-remainders',
            label: 'Division with Remainders',
            description: 'Practice problems that include remainders',
            icon: 'more_horiz',
            category: 'difficulty',
            values: {
              problemCount: 12,
              complexityLevel: 'intermediate',
              dividendMin: 20,
              dividendMax: 200,
              divisorMin: 3,
              divisorMax: 15,
              allowRemainders: true,
              showLongDivision: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'long-division',
            label: 'Long Division Practice',
            description: 'Multi-digit division using long division algorithm',
            icon: 'format_align_left',
            category: 'difficulty',
            values: {
              problemCount: 8,
              complexityLevel: 'advanced',
              dividendMin: 100,
              dividendMax: 999,
              divisorMin: 10,
              divisorMax: 50,
              allowRemainders: true,
              showLongDivision: true
            }
          }),
          
          schemaV2.createPreset({
            id: 'mixed-practice',
            label: 'Mixed Division Practice',
            description: 'Combination of exact division and remainders',
            icon: 'shuffle',
            category: 'scope',
            values: {
              problemCount: 15,
              complexityLevel: 'intermediate',
              dividendMin: 25,
              dividendMax: 300,
              divisorMin: 2,
              divisorMax: 20,
              allowRemainders: true,
              showLongDivision: false
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
    
    let dividend, divisor, quotient, remainder
    let attempts = 0
    const maxAttempts = 100
    
    do {
      attempts++
      
      if (!adjustedParams.allowRemainders) {
        // Generate problems with no remainder, respecting dividend range
        divisor = this.getRandomNumber(adjustedParams.divisorMin, adjustedParams.divisorMax)
        
        // Calculate quotient range that keeps dividend within bounds
        const minQuotient = Math.ceil(adjustedParams.dividendMin / divisor)
        const maxQuotient = Math.floor(adjustedParams.dividendMax / divisor)
        
        if (minQuotient <= maxQuotient) {
          quotient = this.getRandomNumber(minQuotient, maxQuotient)
          dividend = quotient * divisor
          remainder = 0
          
          // Verify dividend is within range
          if (dividend >= adjustedParams.dividendMin && dividend <= adjustedParams.dividendMax) {
            break
          }
        }
      } else {
        // Generate any division problem within range
        dividend = this.getRandomNumber(adjustedParams.dividendMin, adjustedParams.dividendMax)
        divisor = this.getRandomNumber(adjustedParams.divisorMin, adjustedParams.divisorMax)
        quotient = Math.floor(dividend / divisor)
        remainder = dividend % divisor
        break
      }
      
    } while (attempts < maxAttempts)
    
    // Fallback: ensure we have a valid problem
    if (attempts >= maxAttempts) {
      // Generate simple valid problem
      divisor = adjustedParams.divisorMin
      quotient = Math.floor(adjustedParams.dividendMin / divisor)
      dividend = quotient * divisor
      remainder = adjustedParams.allowRemainders ? (dividend % divisor) : 0
    }
    
    // Format question based on showLongDivision setting
    let questionText, questionLaTeX
    
    if (adjustedParams.showLongDivision) {
      // Long division format: divisor)dividend
      questionText = `${divisor})${dividend}`
      questionLaTeX = `${divisor}\\overline{)${dividend}}`
    } else {
      // Standard format: dividend ÷ divisor = ?
      questionText = `${dividend} ÷ ${divisor} = ?`
      questionLaTeX = `${dividend} \\div ${divisor} = \\square`
    }
    
    let answerText = `${quotient}`
    let answerLaTeX = `${quotient}`
    
    if (remainder > 0) {
      answerText += ` R${remainder}`
      answerLaTeX += ` \\text{ R}${remainder}`
    }
    
    // Generate appropriate steps based on format
    const steps = adjustedParams.showLongDivision ? [
      `${divisor}\\overline{)${dividend}}`,
      `= ${answerText}`
    ] : [
      `${dividend} ÷ ${divisor}`,
      `= ${answerText}`
    ]
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: answerText,
      answerLaTeX: answerLaTeX,
      steps: steps,
      metadata: {
        operation: 'division',
        dividend: dividend,
        divisor: divisor,
        quotient: quotient,
        remainder: remainder,
        complexityLevel: adjustedParams.complexityLevel,
        hasRemainder: remainder > 0,
        longDivisionFormat: adjustedParams.showLongDivision,
        difficulty: this.difficulty,
        estimatedTime: '60 seconds'
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
      // Basic: simple division facts (up to 144)
      adjusted.dividendMin = Math.max(10, Math.min(adjusted.dividendMin, 144))
      adjusted.dividendMax = Math.min(adjusted.dividendMax, 144)
      adjusted.divisorMin = Math.max(2, Math.min(adjusted.divisorMin, 12))
      adjusted.divisorMax = Math.min(adjusted.divisorMax, 12)
      // Prefer no remainders for basic level
      if (!adjusted.hasOwnProperty('allowRemainders')) {
        adjusted.allowRemainders = false
      }
    } else if (params.complexityLevel === 'intermediate') {
      // Intermediate: larger dividends with some remainders
      adjusted.dividendMin = Math.max(20, Math.min(adjusted.dividendMin, 500))
      adjusted.dividendMax = Math.min(adjusted.dividendMax, 500)
      adjusted.divisorMin = Math.max(2, Math.min(adjusted.divisorMin, 20))
      adjusted.divisorMax = Math.min(adjusted.divisorMax, 20)
    } else if (params.complexityLevel === 'advanced') {
      // Advanced: multi-digit division
      adjusted.dividendMin = Math.max(100, Math.min(adjusted.dividendMin, 1000))
      adjusted.dividendMax = Math.max(adjusted.dividendMax, 500)
      adjusted.divisorMin = Math.max(10, Math.min(adjusted.divisorMin, 50))
      adjusted.divisorMax = Math.max(adjusted.divisorMax, 25)
      // Enable long division format for advanced level
      if (!adjusted.hasOwnProperty('showLongDivision')) {
        adjusted.showLongDivision = true
      }
    }
    
    return adjusted
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}

export default DivisionGenerator