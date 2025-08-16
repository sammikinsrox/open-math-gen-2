import { BaseGenerator } from '../BaseGenerator.js'

/**
 * Number Patterns Generator
 * Generates problems about identifying and continuing number patterns (sequences)
 */
export class NumberPatternsGenerator extends BaseGenerator {
  constructor() {
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
        questionStyle: 'continue'
      },
      
      parameterSchema: {
        problemCount: {
          type: 'number',
          label: 'Number of Problems',
          description: 'How many pattern problems to generate',
          min: 1,
          max: 100,
          required: true
        },
        patternType: {
          type: 'string',
          label: 'Pattern Type',
          description: 'Type of number pattern to generate',
          options: ['arithmetic', 'geometric', 'mixed', 'skip-counting']
        },
        sequenceLength: {
          type: 'number',
          label: 'Sequence Length',
          description: 'How many numbers to show in the pattern',
          min: 3,
          max: 8,
          required: true
        },
        minStartValue: {
          type: 'number',
          label: 'Minimum Start Value',
          description: 'Smallest starting number for patterns',
          min: -100,
          max: 100,
          required: true
        },
        maxStartValue: {
          type: 'number',
          label: 'Maximum Start Value',
          description: 'Largest starting number for patterns',
          min: -100,
          max: 200,
          required: true
        },
        minStep: {
          type: 'number',
          label: 'Minimum Step/Difference',
          description: 'Smallest step size or difference between terms',
          min: 1,
          max: 20,
          required: true
        },
        maxStep: {
          type: 'number',
          label: 'Maximum Step/Difference',
          description: 'Largest step size or difference between terms',
          min: 1,
          max: 25,
          required: true
        },
        includeNegatives: {
          type: 'boolean',
          label: 'Include Negative Numbers',
          description: 'Allow negative numbers in patterns'
        },
        questionStyle: {
          type: 'string',
          label: 'Question Style',
          description: 'How to ask about the pattern',
          options: ['continue', 'find-missing', 'identify-rule', 'mixed']
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
    const questionLaTeX = `\\text{Find the missing number in the pattern: } ${showSequence.join(', ')}`

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