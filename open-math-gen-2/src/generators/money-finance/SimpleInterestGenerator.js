import { BaseGenerator } from '../BaseGenerator.js'

/**
 * Simple Interest Generator
 * Generates problems involving simple interest calculations (I = PRT)
 */
export class SimpleInterestGenerator extends BaseGenerator {
  constructor() {
    super({
      name: 'Simple Interest',
      description: 'Generate problems involving simple interest calculations and financial scenarios',
      category: 'money-finance',
      difficulty: 'hard',
      icon: 'account_balance',
      tags: ['finance', 'interest', 'banking', 'loans', 'savings', 'investment'],
      gradeLevel: '6-12',
      estimatedTime: '120 seconds',
      exampleProblem: {
        question: 'Find the simple interest on $500 at 4% per year for 3 years',
        questionLaTeX: '\\text{Find the simple interest on } \\$500 \\text{ at } 4\\% \\text{ per year for } 3 \\text{ years}',
        answer: '$60',
        answerLaTeX: '\\$60'
      },
      
      defaultParameters: {
        problemCount: 10,
        includeFindInterest: true,
        includeFindPrincipal: false,
        includeFindRate: false,
        includeFindTime: false,
        includeFindTotal: true,
        includeWordProblems: true,
        principalMin: 100,
        principalMax: 10000,
        rateMin: 1,
        rateMax: 15,
        timeMin: 1,
        timeMax: 10,
        allowDecimals: true,
        usePercentages: true,
        showFormula: true,
        showSteps: true
      },
      
      parameterSchema: {
        problemCount: {
          type: 'number',
          label: 'Number of Problems',
          description: 'How many simple interest problems to generate',
          min: 1,
          max: 100,
          required: true
        },
        includeFindInterest: {
          type: 'boolean',
          label: 'Find Interest Amount',
          description: 'Include problems finding the interest earned/owed'
        },
        includeFindPrincipal: {
          type: 'boolean',
          label: 'Find Principal',
          description: 'Include problems finding the principal amount'
        },
        includeFindRate: {
          type: 'boolean',
          label: 'Find Interest Rate',
          description: 'Include problems finding the interest rate'
        },
        includeFindTime: {
          type: 'boolean',
          label: 'Find Time Period',
          description: 'Include problems finding the time period'
        },
        includeFindTotal: {
          type: 'boolean',
          label: 'Find Total Amount',
          description: 'Include problems finding principal + interest'
        },
        includeWordProblems: {
          type: 'boolean',
          label: 'Include Word Problems',
          description: 'Include real-world financial scenarios'
        },
        principalMin: {
          type: 'number',
          label: 'Minimum Principal',
          description: 'Smallest principal amount (in dollars)',
          min: 1,
          max: 100000,
          required: true
        },
        principalMax: {
          type: 'number',
          label: 'Maximum Principal',
          description: 'Largest principal amount (in dollars)',
          min: 1,
          max: 1000000,
          required: true
        },
        rateMin: {
          type: 'number',
          label: 'Minimum Interest Rate',
          description: 'Lowest interest rate (as percentage)',
          min: 0.1,
          max: 50,
          required: true
        },
        rateMax: {
          type: 'number',
          label: 'Maximum Interest Rate',
          description: 'Highest interest rate (as percentage)',
          min: 0.1,
          max: 100,
          required: true
        },
        timeMin: {
          type: 'number',
          label: 'Minimum Time Period',
          description: 'Shortest time period (in years)',
          min: 0.25,
          max: 20,
          required: true
        },
        timeMax: {
          type: 'number',
          label: 'Maximum Time Period',
          description: 'Longest time period (in years)',
          min: 0.25,
          max: 50,
          required: true
        },
        allowDecimals: {
          type: 'boolean',
          label: 'Allow Decimals',
          description: 'Allow decimal values in calculations'
        },
        usePercentages: {
          type: 'boolean',
          label: 'Use Percentages',
          description: 'Express rates as percentages (vs decimals)'
        },
        showFormula: {
          type: 'boolean',
          label: 'Show Formula',
          description: 'Display the simple interest formula'
        },
        showSteps: {
          type: 'boolean',
          label: 'Show Calculation Steps',
          description: 'Show step-by-step calculations'
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
    
    // Build array of enabled problem types
    const enabledTypes = []
    if (params.includeFindInterest) enabledTypes.push('find-interest')
    if (params.includeFindPrincipal) enabledTypes.push('find-principal')
    if (params.includeFindRate) enabledTypes.push('find-rate')
    if (params.includeFindTime) enabledTypes.push('find-time')
    if (params.includeFindTotal) enabledTypes.push('find-total')
    
    if (enabledTypes.length === 0) {
      throw new Error('At least one problem type must be enabled')
    }
    
    const problemType = this.getRandomElement(enabledTypes)
    
    if (params.includeWordProblems && Math.random() < 0.6) {
      return this.generateWordProblem(problemType, params)
    } else {
      return this.generateBasicProblem(problemType, params)
    }
  }

  generateBasicProblem(type, params) {
    const values = this.generateValues(params)
    
    switch (type) {
      case 'find-interest':
        return this.generateFindInterestProblem(values, params)
      case 'find-principal':
        return this.generateFindPrincipalProblem(values, params)
      case 'find-rate':
        return this.generateFindRateProblem(values, params)
      case 'find-time':
        return this.generateFindTimeProblem(values, params)
      case 'find-total':
        return this.generateFindTotalProblem(values, params)
      default:
        return this.generateFindInterestProblem(values, params)
    }
  }

  generateFindInterestProblem(values, params) {
    const { principal, rate, time } = values
    const interest = this.calculateInterest(principal, rate, time)
    
    const rateDisplay = params.usePercentages ? `${rate}%` : (rate / 100).toFixed(3)
    const rateDisplayLaTeX = params.usePercentages ? `${rate}\\%` : (rate / 100).toFixed(3)
    const yearText = time !== 1 ? 'years' : 'year'
    
    const questionText = `Find the simple interest on $${principal.toFixed(2)} at ${rateDisplay} per year for ${time} ${yearText}`
    const questionLaTeX = `\\text{Find the simple interest on } \\$${principal.toFixed(2)} \\\\\\\\ \\text{at } ${rateDisplayLaTeX} \\text{ per year for } ${time} \\text{ ${yearText}}`
    
    const steps = this.generateInterestSteps(principal, rate, time, interest, params)
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `$${interest.toFixed(2)}`,
      answerLaTeX: `\\$${interest.toFixed(2)}`,
      steps: steps,
      metadata: {
        operation: 'simple-interest-find-interest',
        principal: principal,
        rate: rate,
        time: time,
        interest: interest,
        difficulty: this.difficulty,
        estimatedTime: '90 seconds'
      }
    }
  }

  generateFindPrincipalProblem(values, params) {
    const { principal, rate, time } = values
    const interest = this.calculateInterest(principal, rate, time)
    
    const rateDisplay = params.usePercentages ? `${rate}%` : (rate / 100).toFixed(3)
    const rateDisplayLaTeX = params.usePercentages ? `${rate}\\%` : (rate / 100).toFixed(3)
    const yearText = time !== 1 ? 'years' : 'year'
    
    const questionText = `If the simple interest is $${interest.toFixed(2)} at ${rateDisplay} per year for ${time} ${yearText}, find the principal`
    const questionLaTeX = `\\text{If the simple interest is } \\$${interest.toFixed(2)} \\\\\\\\ \\text{at } ${rateDisplayLaTeX} \\text{ per year for } ${time} \\text{ ${yearText},} \\\\\\\\ \\text{find the principal}`
    
    const steps = this.generatePrincipalSteps(interest, rate, time, principal, params)
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `$${principal.toFixed(2)}`,
      answerLaTeX: `\\$${principal.toFixed(2)}`,
      steps: steps,
      metadata: {
        operation: 'simple-interest-find-principal',
        principal: principal,
        rate: rate,
        time: time,
        interest: interest,
        difficulty: this.difficulty,
        estimatedTime: '120 seconds'
      }
    }
  }

  generateFindRateProblem(values, params) {
    const { principal, rate, time } = values
    const interest = this.calculateInterest(principal, rate, time)
    
    const yearText = time !== 1 ? 'years' : 'year'
    
    const questionText = `If $${principal.toFixed(2)} earns $${interest.toFixed(2)} simple interest in ${time} ${yearText}, find the annual interest rate`
    const questionLaTeX = `\\text{If } \\$${principal.toFixed(2)} \\text{ earns } \\$${interest.toFixed(2)} \\\\\\\\ \\text{simple interest in } ${time} \\text{ ${yearText},} \\\\\\\\ \\text{find the annual interest rate}`
    
    const steps = this.generateRateSteps(principal, interest, time, rate, params)
    
    const answerText = params.usePercentages ? `${rate}%` : (rate / 100).toFixed(3)
    const answerLaTeX = params.usePercentages ? `${rate}\\%` : (rate / 100).toFixed(3)
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: answerText,
      answerLaTeX: answerLaTeX,
      steps: steps,
      metadata: {
        operation: 'simple-interest-find-rate',
        principal: principal,
        rate: rate,
        time: time,
        interest: interest,
        difficulty: this.difficulty,
        estimatedTime: '120 seconds'
      }
    }
  }

  generateFindTimeProblem(values, params) {
    const { principal, rate, time } = values
    const interest = this.calculateInterest(principal, rate, time)
    
    const rateDisplay = params.usePercentages ? `${rate}%` : (rate / 100).toFixed(3)
    const rateDisplayLaTeX = params.usePercentages ? `${rate}\\%` : (rate / 100).toFixed(3)
    
    const questionText = `How long will it take for $${principal.toFixed(2)} to earn $${interest.toFixed(2)} simple interest at ${rateDisplay} per year?`
    const questionLaTeX = `\\text{How long will it take for } \\$${principal.toFixed(2)} \\\\\\\\ \\text{to earn } \\$${interest.toFixed(2)} \\text{ simple interest} \\\\\\\\ \\text{at } ${rateDisplayLaTeX} \\text{ per year?}`
    
    const steps = this.generateTimeSteps(principal, rate, interest, time, params)
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `${time} ${time !== 1 ? 'years' : 'year'}`,
      answerLaTeX: `${time} \\text{ ${time !== 1 ? 'years' : 'year'}}`,
      steps: steps,
      metadata: {
        operation: 'simple-interest-find-time',
        principal: principal,
        rate: rate,
        time: time,
        interest: interest,
        difficulty: this.difficulty,
        estimatedTime: '120 seconds'
      }
    }
  }

  generateFindTotalProblem(values, params) {
    const { principal, rate, time } = values
    const interest = this.calculateInterest(principal, rate, time)
    const total = principal + interest
    
    const rateDisplay = params.usePercentages ? `${rate}%` : (rate / 100).toFixed(3)
    const rateDisplayLaTeX = params.usePercentages ? `${rate}\\%` : (rate / 100).toFixed(3)
    const yearText = time !== 1 ? 'years' : 'year'
    
    const questionText = `Find the total amount after $${principal.toFixed(2)} is invested at ${rateDisplay} simple interest for ${time} ${yearText}`
    const questionLaTeX = `\\text{Find the total amount after } \\$${principal.toFixed(2)} \\\\\\\\ \\text{is invested at } ${rateDisplayLaTeX} \\text{ simple interest} \\\\\\\\ \\text{for } ${time} \\text{ ${yearText}}`
    
    const steps = this.generateTotalSteps(principal, rate, time, interest, total, params)
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `$${total.toFixed(2)}`,
      answerLaTeX: `\\$${total.toFixed(2)}`,
      steps: steps,
      metadata: {
        operation: 'simple-interest-find-total',
        principal: principal,
        rate: rate,
        time: time,
        interest: interest,
        total: total,
        difficulty: this.difficulty,
        estimatedTime: '90 seconds'
      }
    }
  }

  generateWordProblem(type, params) {
    const values = this.generateValues(params)
    const { principal, rate, time } = values
    const interest = this.calculateInterest(principal, rate, time)
    const total = principal + interest
    
    const scenarios = this.getScenarios(type, principal, rate, time, interest, total, params)
    const scenario = this.getRandomElement(scenarios)
    
    let answer, answerLaTeX
    switch (type) {
      case 'find-interest':
        answer = `$${interest.toFixed(2)}`
        answerLaTeX = `\\$${interest.toFixed(2)}`
        break
      case 'find-principal':
        answer = `$${principal.toFixed(2)}`
        answerLaTeX = `\\$${principal.toFixed(2)}`
        break
      case 'find-rate':
        answer = params.usePercentages ? `${rate}%` : (rate / 100).toFixed(3)
        answerLaTeX = params.usePercentages ? `${rate}\\%` : (rate / 100).toFixed(3)
        break
      case 'find-time':
        answer = `${time} year${time !== 1 ? 's' : ''}`
        answerLaTeX = `${time} \\text{ year${time !== 1 ? 's' : ''}}`
        break
      case 'find-total':
        answer = `$${total.toFixed(2)}`
        answerLaTeX = `\\$${total.toFixed(2)}`
        break
    }
    
    const steps = this.generateStepsForType(type, principal, rate, time, interest, total, params)
    
    return {
      question: scenario.question,
      questionLaTeX: scenario.questionLaTeX,
      answer: answer,
      answerLaTeX: answerLaTeX,
      steps: steps,
      metadata: {
        operation: `simple-interest-${type}-word`,
        scenario: scenario.type,
        principal: principal,
        rate: rate,
        time: time,
        interest: interest,
        total: total,
        difficulty: this.difficulty,
        estimatedTime: '120 seconds'
      }
    }
  }

  getScenarios(type, principal, rate, time, interest, total, params) {
    const rateDisplay = params.usePercentages ? `${rate}%` : (rate / 100).toFixed(3)
    const rateDisplayLaTeX = params.usePercentages ? `${rate}\\%` : (rate / 100).toFixed(3)
    const yearText = time !== 1 ? 'years' : 'year'
    
    const scenarios = {
      'find-interest': [
        {
          question: `Sarah deposits $${principal.toFixed(2)} in a savings account that pays ${rateDisplay} simple interest per year.\\n\\nHow much interest will she earn in ${time} ${yearText}?`,
          questionLaTeX: `\\text{Sarah deposits } \\$${principal.toFixed(2)} \\text{ in a savings account} \\\\\\\\ \\text{that pays } ${rateDisplayLaTeX} \\text{ simple interest per year.} \\\\\\\\ \\text{How much interest will she earn in } ${time} \\text{ ${yearText}?}`,
          type: 'savings'
        },
        {
          question: `Tom borrows $${principal.toFixed(2)} at ${rateDisplay} simple interest per year for ${time} ${yearText}.\\n\\nHow much interest will he pay?`,
          questionLaTeX: `\\text{Tom borrows } \\$${principal.toFixed(2)} \\text{ at } ${rateDisplayLaTeX} \\\\\\\\ \\text{simple interest per year for } ${time} \\text{ ${yearText}.} \\\\\\\\ \\text{How much interest will he pay?}`,
          type: 'loan'
        }
      ],
      'find-principal': [
        {
          question: `A bank account earns $${interest.toFixed(2)} in simple interest at ${rateDisplay} per year for ${time} ${yearText}.\\n\\nWhat was the principal amount?`,
          questionLaTeX: `\\text{A bank account earns } \\$${interest.toFixed(2)} \\text{ in simple interest} \\\\\\\\ \\text{at } ${rateDisplayLaTeX} \\text{ per year for } ${time} \\text{ ${yearText}.} \\\\\\\\ \\text{What was the principal amount?}`,
          type: 'savings'
        }
      ],
      'find-rate': [
        {
          question: `An investment of $${principal.toFixed(2)} grows by $${interest.toFixed(2)} in ${time} ${yearText} with simple interest.\\n\\nWhat was the annual interest rate?`,
          questionLaTeX: `\\text{An investment of } \\$${principal.toFixed(2)} \\text{ grows by } \\$${interest.toFixed(2)} \\\\\\\\ \\text{in } ${time} \\text{ ${yearText} with simple interest.} \\\\\\\\ \\text{What was the annual interest rate?}`,
          type: 'investment'
        }
      ],
      'find-time': [
        {
          question: `How long will it take for $${principal.toFixed(2)} to earn $${interest.toFixed(2)} in simple interest at ${rateDisplay} per year?`,
          questionLaTeX: `\\text{How long will it take for } \\$${principal.toFixed(2)} \\\\\\\\ \\text{to earn } \\$${interest.toFixed(2)} \\text{ in simple interest} \\\\\\\\ \\text{at } ${rateDisplayLaTeX} \\text{ per year?}`,
          type: 'time-calculation'
        }
      ],
      'find-total': [
        {
          question: `Lisa invests $${principal.toFixed(2)} at ${rateDisplay} simple interest for ${time} ${yearText}.\\n\\nWhat will be the total amount in her account?`,
          questionLaTeX: `\\text{Lisa invests } \\$${principal.toFixed(2)} \\text{ at } ${rateDisplayLaTeX} \\\\\\\\ \\text{simple interest for } ${time} \\text{ ${yearText}.} \\\\\\\\ \\text{What will be the total amount in her account?}`,
          type: 'investment'
        }
      ]
    }
    
    return scenarios[type] || scenarios['find-interest']
  }

  generateValues(params) {
    let principal = this.generateAmount(params.principalMin, params.principalMax, params.allowDecimals)
    let rate = this.generateRate(params.rateMin, params.rateMax, params.allowDecimals)
    let time = this.generateTime(params.timeMin, params.timeMax, params.allowDecimals)
    
    // Round to reasonable values
    if (!params.allowDecimals) {
      principal = Math.round(principal)
      rate = Math.round(rate)
      time = Math.round(time)
    }
    
    return { principal, rate, time }
  }

  generateAmount(min, max, allowDecimals) {
    const amount = min + Math.random() * (max - min)
    return allowDecimals ? Math.round(amount * 100) / 100 : Math.round(amount)
  }

  generateRate(min, max, allowDecimals) {
    const rate = min + Math.random() * (max - min)
    return allowDecimals ? Math.round(rate * 10) / 10 : Math.round(rate)
  }

  generateTime(min, max, allowDecimals) {
    const time = min + Math.random() * (max - min)
    if (allowDecimals) {
      return Math.round(time * 4) / 4 // Quarter years
    } else {
      return Math.round(time)
    }
  }

  calculateInterest(principal, rate, time) {
    const interest = (principal * rate * time) / 100
    return Math.round(interest * 100) / 100
  }

  generateInterestSteps(principal, rate, time, interest, params) {
    const steps = []
    
    if (params.showFormula) {
      steps.push('\\text{Formula: } I = P \\times R \\times T')
    }
    
    if (params.showSteps) {
      const rateDecimal = params.usePercentages ? `${rate}\\% = ${(rate / 100).toFixed(3)}` : (rate / 100).toFixed(3)
      steps.push(`P = \\$${principal.toFixed(2)}, \\; R = ${rateDecimal}, \\; T = ${time}`)
      steps.push(`I = \\$${principal.toFixed(2)} \\times ${(rate / 100).toFixed(3)} \\times ${time}`)
      steps.push(`I = \\$${interest.toFixed(2)}`)
    }
    
    return steps
  }

  generatePrincipalSteps(interest, rate, time, principal, params) {
    const steps = []
    
    if (params.showFormula) {
      steps.push('\\text{Formula: } P = \\frac{I}{R \\times T}')
    }
    
    if (params.showSteps) {
      const rateDecimal = params.usePercentages ? `${rate}\\% = ${(rate / 100).toFixed(3)}` : (rate / 100).toFixed(3)
      steps.push(`I = \\$${interest.toFixed(2)}, \\; R = ${rateDecimal}, \\; T = ${time}`)
      steps.push(`P = \\frac{\\$${interest.toFixed(2)}}{${(rate / 100).toFixed(3)} \\times ${time}}`)
      steps.push(`P = \\$${principal.toFixed(2)}`)
    }
    
    return steps
  }

  generateRateSteps(principal, interest, time, rate, params) {
    const steps = []
    
    if (params.showFormula) {
      steps.push('\\text{Formula: } R = \\frac{I}{P \\times T}')
    }
    
    if (params.showSteps) {
      steps.push(`I = \\$${interest.toFixed(2)}, \\; P = \\$${principal.toFixed(2)}, \\; T = ${time}`)
      steps.push(`R = \\frac{\\$${interest.toFixed(2)}}{\\$${principal.toFixed(2)} \\times ${time}}`)
      steps.push(`R = ${(rate / 100).toFixed(3)} = ${rate}\\%`)
    }
    
    return steps
  }

  generateTimeSteps(principal, rate, interest, time, params) {
    const steps = []
    
    if (params.showFormula) {
      steps.push('\\text{Formula: } T = \\frac{I}{P \\times R}')
    }
    
    if (params.showSteps) {
      const rateDecimal = params.usePercentages ? `${rate}\\% = ${(rate / 100).toFixed(3)}` : (rate / 100).toFixed(3)
      steps.push(`I = \\$${interest.toFixed(2)}, \\; P = \\$${principal.toFixed(2)}, \\; R = ${rateDecimal}`)
      steps.push(`T = \\frac{\\$${interest.toFixed(2)}}{\\$${principal.toFixed(2)} \\times ${(rate / 100).toFixed(3)}}`)
      steps.push(`T = ${time} \\text{ year${time !== 1 ? 's' : ''}}`)
    }
    
    return steps
  }

  generateTotalSteps(principal, rate, time, interest, total, params) {
    const steps = []
    
    if (params.showFormula) {
      steps.push('\\text{Formula: } \\text{Total} = P + I = P + (P \\times R \\times T)')
    }
    
    if (params.showSteps) {
      const rateDecimal = params.usePercentages ? `${rate}\\% = ${(rate / 100).toFixed(3)}` : (rate / 100).toFixed(3)
      steps.push(`P = \\$${principal.toFixed(2)}, \\; R = ${rateDecimal}, \\; T = ${time}`)
      steps.push(`I = \\$${principal.toFixed(2)} \\times ${(rate / 100).toFixed(3)} \\times ${time} = \\$${interest.toFixed(2)}`)
      steps.push(`\\text{Total} = \\$${principal.toFixed(2)} + \\$${interest.toFixed(2)} = \\$${total.toFixed(2)}`)
    }
    
    return steps
  }

  generateStepsForType(type, principal, rate, time, interest, total, params) {
    switch (type) {
      case 'find-interest':
        return this.generateInterestSteps(principal, rate, time, interest, params)
      case 'find-principal':
        return this.generatePrincipalSteps(interest, rate, time, principal, params)
      case 'find-rate':
        return this.generateRateSteps(principal, interest, time, rate, params)
      case 'find-time':
        return this.generateTimeSteps(principal, rate, interest, time, params)
      case 'find-total':
        return this.generateTotalSteps(principal, rate, time, interest, total, params)
      default:
        return this.generateInterestSteps(principal, rate, time, interest, params)
    }
  }

  getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)]
  }
}

export default SimpleInterestGenerator