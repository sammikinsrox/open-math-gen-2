import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Number Patterns Generator
 * Generates problems about identifying and continuing number patterns (sequences)
 */
export class NumberPatternsGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Number Patterns',
      description: 'Generate number pattern problems with sequences and missing numbers',
      category: 'numbers-place-value',
      difficulty: 'medium',
      icon: 'trending_up',
      tags: ['patterns', 'sequences', 'algebra-prep'],
      gradeLevel: '3-6',
      estimatedTime: '60 seconds',
      exampleProblem: {
        question: 'What comes next? 5, 8, 11, 14, ___',
        questionLaTeX: '\\text{What comes next? } 5, 8, 11, 14, \\square',
        answer: '17',
        answerLaTeX: '17'
      },
      
      defaultParameters: {
        problemCount: 10,
        patternType: 'arithmetic',
        sequenceLength: 5,
        minStartValue: 1,
        maxStartValue: 50,
        minStep: 1,
        maxStep: 10,
        includeNegatives: false,
        questionStyle: 'continue',
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
                description: 'How many pattern problems to generate',
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
                description: 'Controls the difficulty and pattern types',
                variant: 'cards',
                options: [
                  { 
                    value: 'basic', 
                    label: 'Basic',
                    description: 'Simple arithmetic patterns and skip counting'
                  },
                  { 
                    value: 'intermediate', 
                    label: 'Intermediate',
                    description: 'Mixed patterns with larger numbers and steps'
                  },
                  { 
                    value: 'advanced', 
                    label: 'Advanced',
                    description: 'Geometric patterns and complex sequences'
                  }
                ],
                order: 2
              })
            }
          }),
          
          patternConfiguration: schemaV2.createCategory({
            id: 'patternConfiguration',
            label: 'Pattern Configuration',
            description: 'Control pattern types and sequence properties',
            icon: 'trending_up',
            color: 'green',
            order: 2,
            parameters: {
              patternType: schemaV2.createParameter({
                type: 'select',
                label: 'Pattern Type',
                description: 'Type of number pattern to generate',
                variant: 'cards',
                options: [
                  {
                    value: 'arithmetic',
                    label: 'Arithmetic Sequences',
                    description: 'Add/subtract same amount each time (2, 5, 8, 11...)'
                  },
                  {
                    value: 'geometric',
                    label: 'Geometric Sequences',
                    description: 'Multiply by same amount each time (3, 6, 12, 24...)'
                  },
                  {
                    value: 'skip-counting',
                    label: 'Skip Counting',
                    description: 'Count by specific intervals (5, 10, 15, 20...)'
                  },
                  {
                    value: 'mixed',
                    label: 'Mixed Patterns',
                    description: 'Random combination of all pattern types'
                  }
                ],
                order: 1
              }),
              sequenceLength: schemaV2.createParameter({
                type: 'number',
                label: 'Sequence Length',
                description: 'How many numbers to show in each pattern',
                min: 3,
                max: 8,
                required: true,
                slider: true,
                presets: [4, 5, 6, 7],
                helpText: 'Longer sequences provide more context but increase difficulty',
                order: 2
              }),
              questionStyle: schemaV2.createParameter({
                type: 'select',
                label: 'Question Type',
                description: 'How to ask about the pattern',
                variant: 'cards',
                options: [
                  {
                    value: 'continue',
                    label: 'Continue Pattern',
                    description: 'Find the next number in the sequence'
                  },
                  {
                    value: 'find-missing',
                    label: 'Find Missing Number',
                    description: 'Fill in a missing number in the middle'
                  },
                  {
                    value: 'identify-rule',
                    label: 'Identify Rule',
                    description: 'Describe the pattern rule in words'
                  },
                  {
                    value: 'mixed',
                    label: 'Mixed Questions',
                    description: 'Random combination of all question types'
                  }
                ],
                order: 3
              })
            }
          }),
          
          numberRanges: schemaV2.createCategory({
            id: 'numberRanges',
            label: 'Number Ranges',
            description: 'Control the starting values and step sizes',
            icon: 'tag',
            color: 'purple',
            order: 3,
            parameters: {
              minStartValue: schemaV2.createParameter({
                type: 'number',
                label: 'Minimum Start Value',
                description: 'Smallest possible starting number for patterns',
                min: -100,
                max: 200,
                required: true,
                presets: [1, 5, 10, 20],
                helpText: 'Starting value affects the entire sequence difficulty',
                order: 1
              }),
              maxStartValue: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Start Value',
                description: 'Largest possible starting number for patterns',
                min: -100,
                max: 200,
                required: true,
                presets: [50, 100, 150, 200],
                order: 2
              }),
              minStep: schemaV2.createParameter({
                type: 'number',
                label: 'Minimum Step Size',
                description: 'Smallest step/difference between consecutive terms',
                min: 1,
                max: 50,
                required: true,
                presets: [1, 2, 3, 5],
                helpText: 'Step size determines pattern difficulty',
                order: 3
              }),
              maxStep: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Step Size',
                description: 'Largest step/difference between consecutive terms',
                min: 1,
                max: 50,
                required: true,
                presets: [10, 15, 20, 25],
                order: 4
              }),
              includeNegatives: schemaV2.createParameter({
                type: 'boolean',
                label: 'Include Negative Numbers',
                description: 'Allow negative numbers in patterns and sequences',
                helpText: 'Introduces integer concepts and negative step sizes',
                order: 5
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'basic-skip-counting',
            label: 'Basic Skip Counting',
            description: 'Simple skip counting patterns for elementary students',
            icon: 'looks_one',
            category: 'difficulty',
            values: {
              problemCount: 10,
              complexityLevel: 'basic',
              patternType: 'skip-counting',
              sequenceLength: 5,
              minStartValue: 1,
              maxStartValue: 20,
              minStep: 2,
              maxStep: 10,
              includeNegatives: false,
              questionStyle: 'continue'
            }
          }),
          
          schemaV2.createPreset({
            id: 'arithmetic-sequences',
            label: 'Arithmetic Sequences',
            description: 'Focus on arithmetic patterns with addition/subtraction',
            icon: 'add',
            category: 'scope',
            values: {
              problemCount: 12,
              complexityLevel: 'intermediate',
              patternType: 'arithmetic',
              sequenceLength: 6,
              minStartValue: 5,
              maxStartValue: 100,
              minStep: 1,
              maxStep: 15,
              includeNegatives: false,
              questionStyle: 'mixed'
            }
          }),
          
          schemaV2.createPreset({
            id: 'missing-numbers',
            label: 'Find Missing Numbers',
            description: 'Practice finding missing numbers in sequences',
            icon: 'help_outline',
            category: 'scope',
            values: {
              problemCount: 8,
              complexityLevel: 'intermediate',
              patternType: 'mixed',
              sequenceLength: 7,
              minStartValue: 1,
              maxStartValue: 50,
              minStep: 1,
              maxStep: 12,
              includeNegatives: false,
              questionStyle: 'find-missing'
            }
          }),
          
          schemaV2.createPreset({
            id: 'advanced-patterns',
            label: 'Advanced Patterns',
            description: 'Complex geometric and mixed patterns with negatives',
            icon: 'functions',
            category: 'difficulty',
            values: {
              problemCount: 10,
              complexityLevel: 'advanced',
              patternType: 'mixed',
              sequenceLength: 6,
              minStartValue: 1,
              maxStartValue: 100,
              minStep: 2,
              maxStep: 20,
              includeNegatives: true,
              questionStyle: 'mixed'
            }
          })
        ]
      })
    })
  }

  generateProblem(parameters = {}) {
    const params = { ...this.defaultParameters, ...parameters }
    
    // Validate parameters using Parameter Schema V2
    const validation = this.parameterSchema.validate(params)
    if (!validation.isValid) {
      throw new Error(`Invalid parameters: ${validation.errors.join(', ')}`)
    }
    
    // Additional custom validation for min/max relationships
    const customErrors = []
    if (params.minStartValue > params.maxStartValue) {
      customErrors.push('Minimum Start Value cannot be greater than Maximum Start Value')
    }
    if (params.minStep > params.maxStep) {
      customErrors.push('Minimum Step Size cannot be greater than Maximum Step Size')
    }
    if (customErrors.length > 0) {
      throw new Error(`Invalid parameters: ${customErrors.join(', ')}`)
    }
    
    // Choose pattern type
    const patternType = params.patternType === 'mixed' ? 
      this.getRandomElement(['arithmetic', 'geometric', 'skip-counting']) :
      params.patternType
    
    // Choose question style
    const questionStyle = params.questionStyle === 'mixed' ?
      this.getRandomElement(['continue', 'find-missing', 'identify-rule']) :
      params.questionStyle
    
    return this.createPattern(patternType, questionStyle, params)
  }

  createPattern(patternType, questionStyle, params) {
    switch (patternType) {
      case 'arithmetic':
        return this.createArithmeticPattern(questionStyle, params)
      case 'geometric':
        return this.createGeometricPattern(questionStyle, params)
      case 'skip-counting':
        return this.createSkipCountingPattern(questionStyle, params)
      default:
        return this.createArithmeticPattern(questionStyle, params)
    }
  }

  createArithmeticPattern(questionStyle, params) {
    const startValue = this.getRandomNumber(params.minStartValue, params.maxStartValue)
    let step = this.getRandomNumber(params.minStep, params.maxStep)
    
    // Randomly make it a decreasing pattern
    if (Math.random() < 0.3) {
      step = -step
    }
    
    // Generate the sequence
    const sequence = []
    for (let i = 0; i < params.sequenceLength + 2; i++) {
      sequence.push(startValue + (i * step))
    }
    
    return this.formatQuestion(sequence, step, 'arithmetic', questionStyle, params)
  }

  createGeometricPattern(questionStyle, params) {
    const startValue = this.getRandomNumber(Math.max(1, params.minStartValue), params.maxStartValue)
    const ratio = this.getRandomElement([2, 3, 4, 5, 10]) // Keep ratios simple
    
    // Generate the sequence
    const sequence = []
    for (let i = 0; i < params.sequenceLength + 2; i++) {
      sequence.push(startValue * Math.pow(ratio, i))
    }
    
    return this.formatQuestion(sequence, ratio, 'geometric', questionStyle, params)
  }

  createSkipCountingPattern(questionStyle, params) {
    const startValue = this.getRandomNumber(params.minStartValue, params.maxStartValue)
    const step = this.getRandomElement([2, 3, 4, 5, 10, 25]) // Common skip counting intervals
    
    // Generate the sequence
    const sequence = []
    for (let i = 0; i < params.sequenceLength + 2; i++) {
      sequence.push(startValue + (i * step))
    }
    
    return this.formatQuestion(sequence, step, 'skip-counting', questionStyle, params)
  }

  formatQuestion(fullSequence, rule, patternType, questionStyle, params) {
    switch (questionStyle) {
      case 'continue':
        return this.createContinueQuestion(fullSequence, rule, patternType, params)
      case 'find-missing':
        return this.createFindMissingQuestion(fullSequence, rule, patternType, params)
      case 'identify-rule':
        return this.createIdentifyRuleQuestion(fullSequence, rule, patternType, params)
      default:
        return this.createContinueQuestion(fullSequence, rule, patternType, params)
    }
  }

  createContinueQuestion(fullSequence, rule, patternType, params) {
    const showSequence = fullSequence.slice(0, params.sequenceLength)
    const nextNumber = fullSequence[params.sequenceLength]
    
    const questionText = `What comes next in the pattern? ${showSequence.join(', ')}, ___`
    const questionLaTeX = `\\text{What comes next in the pattern? } ${showSequence.join(', ')}, \\square`

    const steps = this.generateSteps(showSequence, rule, patternType, 'continue')
    steps.push(`Next number: ${nextNumber}`)

    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: nextNumber,
      answerLaTeX: nextNumber.toString(),
      steps: steps,
      metadata: {
        operation: 'number-pattern-continue',
        patternType: patternType,
        sequence: showSequence,
        rule: rule,
        nextNumber: nextNumber,
        difficulty: this.difficulty,
        estimatedTime: '60 seconds'
      }
    }
  }

  createFindMissingQuestion(fullSequence, rule, patternType, params) {
    const showSequence = fullSequence.slice(0, params.sequenceLength)
    
    // Choose a random position to make missing (not first or last)
    const missingIndex = this.getRandomNumber(1, showSequence.length - 2)
    const missingNumber = showSequence[missingIndex]
    showSequence[missingIndex] = '___'
    
    const questionText = `Find the missing number in the pattern: ${showSequence.join(', ')}`
    const questionLaTeX = `\\text{Find the missing number in the pattern: } ${showSequence.map(n => n === '___' ? '\\square' : n).join(', ')}`

    const steps = this.generateSteps(showSequence.map(n => n === '___' ? '?' : n), rule, patternType, 'find-missing')
    steps.push(`Missing number: ${missingNumber}`)

    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: missingNumber,
      answerLaTeX: missingNumber.toString(),
      steps: steps,
      metadata: {
        operation: 'number-pattern-missing',
        patternType: patternType,
        sequence: showSequence,
        rule: rule,
        missingNumber: missingNumber,
        missingIndex: missingIndex,
        difficulty: this.difficulty,
        estimatedTime: '75 seconds'
      }
    }
  }

  createIdentifyRuleQuestion(fullSequence, rule, patternType, params) {
    const showSequence = fullSequence.slice(0, params.sequenceLength)
    
    let ruleText
    if (patternType === 'arithmetic' || patternType === 'skip-counting') {
      if (rule > 0) {
        ruleText = `Add ${rule}`
      } else {
        ruleText = `Subtract ${Math.abs(rule)}`
      }
    } else if (patternType === 'geometric') {
      ruleText = `Multiply by ${rule}`
    }
    
    const questionText = `What is the rule for this pattern? ${showSequence.join(', ')}`
    const questionLaTeX = `\\text{What is the rule for this pattern? } ${showSequence.join(', ')}`

    const steps = [
      `Pattern: ${showSequence.join(', ')}`,
      `Look at the differences between consecutive terms`,
      `Rule: ${ruleText}`
    ]

    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: ruleText,
      answerLaTeX: ruleText,
      steps: steps,
      metadata: {
        operation: 'number-pattern-rule',
        patternType: patternType,
        sequence: showSequence,
        rule: rule,
        ruleText: ruleText,
        difficulty: this.difficulty,
        estimatedTime: '90 seconds'
      }
    }
  }

  generateSteps(sequence, rule, patternType, questionType) {
    const steps = []
    
    if (questionType === 'find-missing') {
      steps.push(`Pattern: ${sequence.join(', ')}`)
    } else {
      steps.push(`Pattern: ${sequence.filter(n => n !== '___').join(', ')}`)
    }
    
    if (patternType === 'arithmetic' || patternType === 'skip-counting') {
      if (rule > 0) {
        steps.push(`Rule: Add ${rule} each time`)
      } else {
        steps.push(`Rule: Subtract ${Math.abs(rule)} each time`)
      }
    } else if (patternType === 'geometric') {
      steps.push(`Rule: Multiply by ${rule} each time`)
    }
    
    return steps
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)]
  }
}

export default NumberPatternsGenerator