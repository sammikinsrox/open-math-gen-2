import { BaseGenerator } from '../BaseGenerator.js'

/**
 * Division Generator
 * Generates division problems with customizable parameters
 */
export class DivisionGenerator extends BaseGenerator {
  constructor() {
    super({
      name: 'Division',
      description: 'Generate division problems with whole numbers',
      category: 'basic-operations',
      difficulty: 'medium',
      icon: 'percent',
      
      defaultParameters: {
        problemCount: 10,
        dividendMin: 10,
        dividendMax: 144,
        divisorMin: 2,
        divisorMax: 12,
        allowRemainders: false,
        showLongDivision: false
      },
      
      parameterSchema: {
        problemCount: {
          type: 'number',
          label: 'Number of Problems',
          description: 'How many division problems to generate',
          min: 1,
          max: 100,
          required: true
        },
        dividendMin: {
          type: 'number',
          label: 'Dividend Minimum',
          description: 'Smallest dividend (number being divided)',
          min: 1,
          max: 1000,
          required: true
        },
        dividendMax: {
          type: 'number',
          label: 'Dividend Maximum',
          description: 'Largest dividend (number being divided)',
          min: 1,
          max: 10000,
          required: true
        },
        divisorMin: {
          type: 'number',
          label: 'Divisor Minimum',
          description: 'Smallest divisor (number dividing by)',
          min: 1,
          max: 100,
          required: true
        },
        divisorMax: {
          type: 'number',
          label: 'Divisor Maximum',
          description: 'Largest divisor (number dividing by)',
          min: 1,
          max: 100,
          required: true
        },
        allowRemainders: {
          type: 'boolean',
          label: 'Allow Remainders',
          description: 'Include problems with remainders'
        },
        showLongDivision: {
          type: 'boolean',
          label: 'Show Long Division Format',
          description: 'Format problems for long division'
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
    
    let dividend, divisor, quotient, remainder
    let attempts = 0
    const maxAttempts = 100
    
    do {
      attempts++
      
      if (!params.allowRemainders) {
        // Generate problems with no remainder, respecting dividend range
        divisor = this.getRandomNumber(params.divisorMin, params.divisorMax)
        
        // Calculate quotient range that keeps dividend within bounds
        const minQuotient = Math.ceil(params.dividendMin / divisor)
        const maxQuotient = Math.floor(params.dividendMax / divisor)
        
        if (minQuotient <= maxQuotient) {
          quotient = this.getRandomNumber(minQuotient, maxQuotient)
          dividend = quotient * divisor
          remainder = 0
          
          // Verify dividend is within range
          if (dividend >= params.dividendMin && dividend <= params.dividendMax) {
            break
          }
        }
      } else {
        // Generate any division problem within range
        dividend = this.getRandomNumber(params.dividendMin, params.dividendMax)
        divisor = this.getRandomNumber(params.divisorMin, params.divisorMax)
        quotient = Math.floor(dividend / divisor)
        remainder = dividend % divisor
        break
      }
      
    } while (attempts < maxAttempts)
    
    // Fallback: ensure we have a valid problem
    if (attempts >= maxAttempts) {
      // Generate simple valid problem
      divisor = params.divisorMin
      quotient = Math.floor(params.dividendMin / divisor)
      dividend = quotient * divisor
      remainder = params.allowRemainders ? (dividend % divisor) : 0
    }
    
    // Format question based on showLongDivision setting
    let questionText, questionLaTeX
    
    if (params.showLongDivision) {
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
    const steps = params.showLongDivision ? [
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
        longDivisionFormat: params.showLongDivision,
        difficulty: this.difficulty,
        estimatedTime: '60 seconds'
      }
    }
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}

export default DivisionGenerator