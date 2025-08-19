import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Simple Interest Generator
 * Generates problems involving simple interest calculations (I = PRT)
 */
export class SimpleInterestGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
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
                description: 'How many simple interest problems to generate',
                min: 1,
                max: 50,
                required: true,
                slider: true,
                presets: [5, 8, 10, 15],
                order: 1
              })
            }
          }),
          
          calculationTypes: schemaV2.createCategory({
            id: 'calculationTypes',
            label: 'Calculation Types',
            description: 'Choose which simple interest calculations to include',
            icon: 'account_balance',
            color: 'green',
            order: 2,
            parameters: {
              includeFindInterest: schemaV2.createParameter({
                type: 'boolean',
                label: 'Find Interest Amount',
                description: 'Calculate interest earned or owed (I = PRT)',
                helpText: 'Examples: $1000 at 5% for 2 years → Interest = $100',
                order: 1
              }),
              includeFindPrincipal: schemaV2.createParameter({
                type: 'boolean',
                label: 'Find Principal Amount',
                description: 'Find original amount invested or borrowed',
                helpText: 'Examples: Interest $100, 5% for 2 years → Principal = $1000',
                order: 2
              }),
              includeFindRate: schemaV2.createParameter({
                type: 'boolean',
                label: 'Find Interest Rate',
                description: 'Calculate the annual interest rate',
                helpText: 'Examples: $1000 earns $100 in 2 years → Rate = 5%',
                order: 3
              }),
              includeFindTime: schemaV2.createParameter({
                type: 'boolean',
                label: 'Find Time Period',
                description: 'Calculate how long money is invested/borrowed',
                helpText: 'Examples: $1000 at 5% earns $100 → Time = 2 years',
                order: 4
              }),
              includeFindTotal: schemaV2.createParameter({
                type: 'boolean',
                label: 'Find Total Amount',
                description: 'Calculate principal plus interest',
                helpText: 'Examples: $1000 at 5% for 2 years → Total = $1100',
                order: 5
              })
            }
          }),
          
          principalRanges: schemaV2.createCategory({
            id: 'principalRanges',
            label: 'Principal Ranges',
            description: 'Control the range of principal amounts',
            icon: 'paid',
            color: 'purple',
            order: 3,
            parameters: {
              principalMin: schemaV2.createParameter({
                type: 'number',
                label: 'Minimum Principal',
                description: 'Smallest principal amount in dollars',
                min: 1,
                max: 100000,
                required: true,
                slider: true,
                presets: [100, 500, 1000, 2000],
                helpText: 'Lower bound for investment/loan amounts',
                order: 1
              }),
              principalMax: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Principal',
                description: 'Largest principal amount in dollars',
                min: 1,
                max: 1000000,
                required: true,
                slider: true,
                presets: [5000, 10000, 25000, 50000],
                helpText: 'Upper bound for investment/loan amounts',
                order: 2
              })
            }
          }),
          
          interestRates: schemaV2.createCategory({
            id: 'interestRates',
            label: 'Interest Rates',
            description: 'Control the range of interest rates',
            icon: 'percent',
            color: 'orange',
            order: 4,
            parameters: {
              rateMin: schemaV2.createParameter({
                type: 'number',
                label: 'Minimum Interest Rate',
                description: 'Lowest annual interest rate as percentage',
                min: 0.1,
                max: 50,
                required: true,
                slider: true,
                presets: [1, 2, 3, 5],
                helpText: 'Lower bound for annual interest rates',
                order: 1
              }),
              rateMax: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Interest Rate',
                description: 'Highest annual interest rate as percentage',
                min: 0.1,
                max: 100,
                required: true,
                slider: true,
                presets: [8, 12, 15, 20],
                helpText: 'Upper bound for annual interest rates',
                order: 2
              }),
              usePercentages: schemaV2.createParameter({
                type: 'boolean',
                label: 'Express Rates as Percentages',
                description: 'Show rates as percentages instead of decimals',
                helpText: 'Examples: 5% vs 0.05, 12% vs 0.12',
                order: 3
              })
            }
          }),
          
          timePeriods: schemaV2.createCategory({
            id: 'timePeriods',
            label: 'Time Periods',
            description: 'Control the range of time periods',
            icon: 'schedule',
            color: 'teal',
            order: 5,
            parameters: {
              timeMin: schemaV2.createParameter({
                type: 'number',
                label: 'Minimum Time Period',
                description: 'Shortest time period in years',
                min: 0.25,
                max: 20,
                required: true,
                slider: true,
                presets: [0.5, 1, 2, 3],
                helpText: 'Lower bound for investment/loan duration',
                order: 1
              }),
              timeMax: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Time Period',
                description: 'Longest time period in years',
                min: 0.25,
                max: 50,
                required: true,
                slider: true,
                presets: [5, 8, 10, 15],
                helpText: 'Upper bound for investment/loan duration',
                order: 2
              }),
              allowDecimals: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Decimal Values',
                description: 'Allow decimal amounts and time periods',
                helpText: 'Examples: $1250.50, 2.5 years, 4.25% vs round numbers',
                order: 3
              })
            }
          }),
          
          problemStyle: schemaV2.createCategory({
            id: 'problemStyle',
            label: 'Problem Style',
            description: 'Control how problems are presented',
            icon: 'style',
            color: 'pink',
            order: 6,
            parameters: {
              includeWordProblems: schemaV2.createParameter({
                type: 'boolean',
                label: 'Include Word Problems',
                description: 'Include real-world financial scenarios with context',
                helpText: 'Examples: bank accounts, loans, investments, savings',
                order: 1
              }),
              showFormula: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Simple Interest Formula',
                description: 'Display the formula I = PRT in solution steps',
                helpText: 'Educational feature showing mathematical formulas',
                order: 2
              }),
              showSteps: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Calculation Steps',
                description: 'Display detailed step-by-step calculations',
                helpText: 'Shows substitution and intermediate calculation steps',
                order: 3
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'basic-interest',
            label: 'Basic Interest',
            description: 'Simple interest calculation for beginners',
            icon: 'looks_one',
            category: 'difficulty',
            values: {
              problemCount: 10,
              includeFindInterest: true,
              includeFindPrincipal: false,
              includeFindRate: false,
              includeFindTime: false,
              includeFindTotal: true,
              includeWordProblems: true,
              principalMin: 500,
              principalMax: 5000,
              rateMin: 2,
              rateMax: 10,
              timeMin: 1,
              timeMax: 5,
              allowDecimals: false,
              usePercentages: true,
              showFormula: true,
              showSteps: true
            }
          }),
          
          schemaV2.createPreset({
            id: 'reverse-calculations',
            label: 'Reverse Calculations',
            description: 'Find principal, rate, or time from given information',
            icon: 'swap_horiz',
            category: 'difficulty',
            values: {
              problemCount: 10,
              includeFindInterest: false,
              includeFindPrincipal: true,
              includeFindRate: true,
              includeFindTime: true,
              includeFindTotal: false,
              includeWordProblems: true,
              principalMin: 1000,
              principalMax: 8000,
              rateMin: 3,
              rateMax: 12,
              timeMin: 1,
              timeMax: 8,
              allowDecimals: true,
              usePercentages: true,
              showFormula: true,
              showSteps: true
            }
          }),
          
          schemaV2.createPreset({
            id: 'banking-scenarios',
            label: 'Banking Scenarios',
            description: 'Real-world banking and savings problems',
            icon: 'account_balance',
            category: 'scope',
            values: {
              problemCount: 12,
              includeFindInterest: true,
              includeFindPrincipal: false,
              includeFindRate: false,
              includeFindTime: false,
              includeFindTotal: true,
              includeWordProblems: true,
              principalMin: 250,
              principalMax: 15000,
              rateMin: 1,
              rateMax: 8,
              timeMin: 0.5,
              timeMax: 10,
              allowDecimals: true,
              usePercentages: true,
              showFormula: false,
              showSteps: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'investment-planning',
            label: 'Investment Planning',
            description: 'Investment and loan calculation problems',
            icon: 'trending_up',
            category: 'scope',
            values: {
              problemCount: 10,
              includeFindInterest: true,
              includeFindPrincipal: true,
              includeFindRate: false,
              includeFindTime: true,
              includeFindTotal: true,
              includeWordProblems: true,
              principalMin: 2000,
              principalMax: 25000,
              rateMin: 4,
              rateMax: 15,
              timeMin: 1,
              timeMax: 15,
              allowDecimals: true,
              usePercentages: true,
              showFormula: true,
              showSteps: true
            }
          }),
          
          schemaV2.createPreset({
            id: 'advanced-finance',
            label: 'Advanced Finance',
            description: 'Complex problems with all calculation types',
            icon: 'account_balance_wallet',
            category: 'difficulty',
            values: {
              problemCount: 8,
              includeFindInterest: true,
              includeFindPrincipal: true,
              includeFindRate: true,
              includeFindTime: true,
              includeFindTotal: true,
              includeWordProblems: true,
              principalMin: 5000,
              principalMax: 50000,
              rateMin: 2,
              rateMax: 18,
              timeMin: 0.25,
              timeMax: 20,
              allowDecimals: true,
              usePercentages: true,
              showFormula: true,
              showSteps: true
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive-interest',
            label: 'Comprehensive Interest',
            description: 'Complete practice with all simple interest concepts',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 15,
              includeFindInterest: true,
              includeFindPrincipal: true,
              includeFindRate: true,
              includeFindTime: true,
              includeFindTotal: true,
              includeWordProblems: true,
              principalMin: 100,
              principalMax: 20000,
              rateMin: 1,
              rateMax: 15,
              timeMin: 0.5,
              timeMax: 12,
              allowDecimals: true,
              usePercentages: true,
              showFormula: true,
              showSteps: true
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
    
    // Additional custom validation
    const customErrors = []
    if (!params.includeFindInterest && !params.includeFindPrincipal && !params.includeFindRate && !params.includeFindTime && !params.includeFindTotal) {
      customErrors.push('At least one calculation type must be enabled')
    }
    if (params.principalMin > params.principalMax) {
      customErrors.push('Minimum Principal cannot be greater than Maximum Principal')
    }
    if (params.rateMin > params.rateMax) {
      customErrors.push('Minimum Interest Rate cannot be greater than Maximum Interest Rate')
    }
    if (params.timeMin > params.timeMax) {
      customErrors.push('Minimum Time Period cannot be greater than Maximum Time Period')
    }
    if (customErrors.length > 0) {
      throw new Error(`Invalid parameters: ${customErrors.join(', ')}`)
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