import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Money Operations Generator
 * Generates problems involving arithmetic operations with money (addition, subtraction, multiplication, division)
 */
export class MoneyOperationsGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Money Operations',
      description: 'Generate problems involving arithmetic operations with money amounts',
      category: 'money-finance',
      difficulty: 'medium',
      icon: 'calculate',
      tags: ['money', 'addition', 'subtraction', 'multiplication', 'division', 'arithmetic'],
      gradeLevel: '3-8',
      estimatedTime: '60 seconds',
      exampleProblem: {
        question: '$15.50 + $23.75 = ?',
        questionLaTeX: '\\$15.50 + \\$23.75 = \\square',
        answer: '$39.25',
        answerLaTeX: '\\$39.25'
      },
      
      defaultParameters: {
        problemCount: 10,
        includeAddition: true,
        includeSubtraction: true,
        includeMultiplication: false,
        includeDivision: false,
        includeWordProblems: true,
        moneyMin: 0.50,
        moneyMax: 100.00,
        allowDecimals: true,
        ensurePositiveResults: true,
        multiplierMin: 2,
        multiplierMax: 10,
        showSteps: true,
        maxTerms: 3
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
                description: 'How many money operation problems to generate',
                min: 1,
                max: 50,
                required: true,
                slider: true,
                presets: [5, 8, 10, 15],
                order: 1
              })
            }
          }),
          
          operationTypes: schemaV2.createCategory({
            id: 'operationTypes',
            label: 'Operation Types',
            description: 'Choose which arithmetic operations to include',
            icon: 'calculate',
            color: 'green',
            order: 2,
            parameters: {
              includeAddition: schemaV2.createParameter({
                type: 'boolean',
                label: 'Addition',
                description: 'Include money addition problems',
                helpText: 'Examples: $15.50 + $23.75, $5.00 + $3.25 + $7.10',
                order: 1
              }),
              includeSubtraction: schemaV2.createParameter({
                type: 'boolean',
                label: 'Subtraction',
                description: 'Include money subtraction problems',
                helpText: 'Examples: $25.00 - $8.75, $50.00 - $12.50 - $5.25',
                order: 2
              }),
              includeMultiplication: schemaV2.createParameter({
                type: 'boolean',
                label: 'Multiplication',
                description: 'Include money multiplication problems',
                helpText: 'Examples: $12.50 × 3, $4.75 × 8',
                order: 3
              }),
              includeDivision: schemaV2.createParameter({
                type: 'boolean',
                label: 'Division',
                description: 'Include money division problems',
                helpText: 'Examples: $36.00 ÷ 4, $52.50 ÷ 5',
                order: 4
              })
            }
          }),
          
          moneyRanges: schemaV2.createCategory({
            id: 'moneyRanges',
            label: 'Money Ranges',
            description: 'Control the range of money amounts used',
            icon: 'attach_money',
            color: 'purple',
            order: 3,
            parameters: {
              moneyMin: schemaV2.createParameter({
                type: 'number',
                label: 'Minimum Money Amount',
                description: 'Smallest money amount to use (in dollars)',
                min: 0.01,
                max: 1000.00,
                required: true,
                slider: true,
                presets: [0.25, 1.00, 5.00, 10.00],
                helpText: 'Lower bound for money values in problems',
                order: 1
              }),
              moneyMax: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Money Amount',
                description: 'Largest money amount to use (in dollars)',
                min: 0.01,
                max: 10000.00,
                required: true,
                slider: true,
                presets: [25.00, 50.00, 100.00, 500.00],
                helpText: 'Upper bound for money values in problems',
                order: 2
              }),
              allowDecimals: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Decimal Amounts',
                description: 'Allow decimal amounts in money values',
                helpText: 'Examples: $12.75, $8.99 vs $12.00, $8.00',
                order: 3
              })
            }
          }),
          
          multiplicationDivision: schemaV2.createCategory({
            id: 'multiplicationDivision',
            label: 'Multiplication & Division',
            description: 'Settings for multiplication and division problems',
            icon: 'clear_all',
            color: 'orange',
            order: 4,
            parameters: {
              multiplierMin: schemaV2.createParameter({
                type: 'number',
                label: 'Minimum Multiplier',
                description: 'Smallest multiplier for multiplication problems',
                min: 1,
                max: 100,
                required: true,
                slider: true,
                presets: [2, 3, 5, 10],
                helpText: 'Lower bound for multiplication/division factors',
                order: 1
              }),
              multiplierMax: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Multiplier',
                description: 'Largest multiplier for multiplication problems',
                min: 1,
                max: 1000,
                required: true,
                slider: true,
                presets: [10, 20, 50, 100],
                helpText: 'Upper bound for multiplication/division factors',
                order: 2
              })
            }
          }),
          
          problemComplexity: schemaV2.createCategory({
            id: 'problemComplexity',
            label: 'Problem Complexity',
            description: 'Control the complexity and presentation of problems',
            icon: 'tune',
            color: 'teal',
            order: 5,
            parameters: {
              maxTerms: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Terms',
                description: 'Maximum number of terms in addition/subtraction',
                min: 2,
                max: 5,
                required: true,
                slider: true,
                presets: [2, 3, 4, 5],
                helpText: 'Controls complexity of multi-term operations',
                order: 1
              }),
              ensurePositiveResults: schemaV2.createParameter({
                type: 'boolean',
                label: 'Ensure Positive Results',
                description: 'Ensure all results are positive amounts',
                helpText: 'Prevents negative money amounts in answers',
                order: 2
              }),
              showSteps: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Calculation Steps',
                description: 'Display step-by-step calculation process',
                helpText: 'Shows intermediate steps in problem solving',
                order: 3
              }),
              includeWordProblems: schemaV2.createParameter({
                type: 'boolean',
                label: 'Include Word Problems',
                description: 'Include real-world money operation scenarios',
                helpText: 'Examples: shopping, earning, budgeting scenarios',
                order: 4
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'basic-addition-subtraction',
            label: 'Basic Addition & Subtraction',
            description: 'Simple addition and subtraction with small amounts',
            icon: 'looks_one',
            category: 'difficulty',
            values: {
              problemCount: 10,
              includeAddition: true,
              includeSubtraction: true,
              includeMultiplication: false,
              includeDivision: false,
              includeWordProblems: false,
              moneyMin: 0.50,
              moneyMax: 25.00,
              allowDecimals: true,
              ensurePositiveResults: true,
              multiplierMin: 2,
              multiplierMax: 10,
              showSteps: true,
              maxTerms: 2
            }
          }),
          
          schemaV2.createPreset({
            id: 'multiplication-division',
            label: 'Multiplication & Division',
            description: 'Focus on multiplication and division operations',
            icon: 'clear_all',
            category: 'scope',
            values: {
              problemCount: 10,
              includeAddition: false,
              includeSubtraction: false,
              includeMultiplication: true,
              includeDivision: true,
              includeWordProblems: true,
              moneyMin: 1.00,
              moneyMax: 50.00,
              allowDecimals: true,
              ensurePositiveResults: true,
              multiplierMin: 2,
              multiplierMax: 12,
              showSteps: true,
              maxTerms: 3
            }
          }),
          
          schemaV2.createPreset({
            id: 'multi-term-operations',
            label: 'Multi-Term Operations',
            description: 'Complex problems with multiple terms',
            icon: 'functions',
            category: 'difficulty',
            values: {
              problemCount: 8,
              includeAddition: true,
              includeSubtraction: true,
              includeMultiplication: false,
              includeDivision: false,
              includeWordProblems: false,
              moneyMin: 2.00,
              moneyMax: 30.00,
              allowDecimals: true,
              ensurePositiveResults: true,
              multiplierMin: 2,
              multiplierMax: 10,
              showSteps: true,
              maxTerms: 5
            }
          }),
          
          schemaV2.createPreset({
            id: 'real-world-scenarios',
            label: 'Real-World Scenarios',
            description: 'Word problems with practical money situations',
            icon: 'business',
            category: 'scope',
            values: {
              problemCount: 12,
              includeAddition: true,
              includeSubtraction: true,
              includeMultiplication: true,
              includeDivision: false,
              includeWordProblems: true,
              moneyMin: 1.00,
              moneyMax: 75.00,
              allowDecimals: true,
              ensurePositiveResults: true,
              multiplierMin: 2,
              multiplierMax: 15,
              showSteps: false,
              maxTerms: 3
            }
          }),
          
          schemaV2.createPreset({
            id: 'advanced-operations',
            label: 'Advanced Operations',
            description: 'Complex problems with larger amounts and all operations',
            icon: 'trending_up',
            category: 'difficulty',
            values: {
              problemCount: 10,
              includeAddition: true,
              includeSubtraction: true,
              includeMultiplication: true,
              includeDivision: true,
              includeWordProblems: false,
              moneyMin: 5.00,
              moneyMax: 200.00,
              allowDecimals: true,
              ensurePositiveResults: false,
              multiplierMin: 3,
              multiplierMax: 25,
              showSteps: true,
              maxTerms: 4
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive-money-operations',
            label: 'Comprehensive Money Operations',
            description: 'Complete practice with all operation types',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 15,
              includeAddition: true,
              includeSubtraction: true,
              includeMultiplication: true,
              includeDivision: true,
              includeWordProblems: true,
              moneyMin: 0.50,
              moneyMax: 100.00,
              allowDecimals: true,
              ensurePositiveResults: true,
              multiplierMin: 2,
              multiplierMax: 20,
              showSteps: true,
              maxTerms: 4
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
    if (!params.includeAddition && !params.includeSubtraction && !params.includeMultiplication && !params.includeDivision) {
      customErrors.push('At least one operation type must be enabled')
    }
    if (params.moneyMin > params.moneyMax) {
      customErrors.push('Minimum Money Amount cannot be greater than Maximum Money Amount')
    }
    if (params.multiplierMin > params.multiplierMax) {
      customErrors.push('Minimum Multiplier cannot be greater than Maximum Multiplier')
    }
    if (customErrors.length > 0) {
      throw new Error(`Invalid parameters: ${customErrors.join(', ')}`)
    }
    
    // Build array of enabled problem types
    const enabledTypes = []
    if (params.includeAddition) enabledTypes.push('addition')
    if (params.includeSubtraction) enabledTypes.push('subtraction')
    if (params.includeMultiplication) enabledTypes.push('multiplication')
    if (params.includeDivision) enabledTypes.push('division')
    
    if (enabledTypes.length === 0) {
      throw new Error('At least one operation type must be enabled')
    }
    
    const operationType = this.getRandomElement(enabledTypes)
    
    if (params.includeWordProblems && Math.random() < 0.4) {
      return this.generateWordProblem(operationType, params)
    } else {
      return this.generateBasicOperation(operationType, params)
    }
  }

  generateBasicOperation(operationType, params) {
    switch (operationType) {
      case 'addition':
        return this.generateAdditionProblem(params)
      case 'subtraction':
        return this.generateSubtractionProblem(params)
      case 'multiplication':
        return this.generateMultiplicationProblem(params)
      case 'division':
        return this.generateDivisionProblem(params)
      default:
        return this.generateAdditionProblem(params)
    }
  }

  generateAdditionProblem(params) {
    const numTerms = Math.floor(Math.random() * (params.maxTerms - 1)) + 2 // 2 to maxTerms
    const amounts = []
    
    for (let i = 0; i < numTerms; i++) {
      amounts.push(this.generateMoneyAmount(params))
    }
    
    const total = amounts.reduce((sum, amount) => sum + amount, 0)
    
    const questionText = amounts.map(a => `$${a.toFixed(2)}`).join(' + ') + ' = ?'
    const questionLaTeX = amounts.map(a => `\\$${a.toFixed(2)}`).join(' + ') + ' = \\square'
    
    const steps = []
    if (params.showSteps) {
      steps.push(amounts.map(a => `\\$${a.toFixed(2)}`).join(' + '))
      steps.push(`= \\$${total.toFixed(2)}`)
    }
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `$${total.toFixed(2)}`,
      answerLaTeX: `\\$${total.toFixed(2)}`,
      steps: steps,
      metadata: {
        operation: 'money-addition',
        amounts: amounts,
        result: total,
        difficulty: this.difficulty,
        estimatedTime: '45 seconds'
      }
    }
  }

  generateSubtractionProblem(params) {
    if (params.maxTerms === 2) {
      // Simple two-term subtraction
      let amount1 = this.generateMoneyAmount(params)
      let amount2 = this.generateMoneyAmount(params)
      
      // Ensure positive result if required
      if (params.ensurePositiveResults && amount1 < amount2) {
        [amount1, amount2] = [amount2, amount1]
      }
      
      const result = amount1 - amount2
      
      const questionText = `$${amount1.toFixed(2)} - $${amount2.toFixed(2)} = ?`
      const questionLaTeX = `\\$${amount1.toFixed(2)} - \\$${amount2.toFixed(2)} = \\square`
      
      const steps = []
      if (params.showSteps) {
        steps.push(`\\$${amount1.toFixed(2)} - \\$${amount2.toFixed(2)}`)
        steps.push(`= \\$${result.toFixed(2)}`)
      }
      
      return {
        question: questionText,
        questionLaTeX: questionLaTeX,
        answer: `$${result.toFixed(2)}`,
        answerLaTeX: `\\$${result.toFixed(2)}`,
        steps: steps,
        metadata: {
          operation: 'money-subtraction',
          minuend: amount1,
          subtrahend: amount2,
          result: result,
          difficulty: this.difficulty,
          estimatedTime: '45 seconds'
        }
      }
    } else {
      // Multi-term subtraction: start with a large amount and subtract multiple smaller amounts
      const numSubtractions = Math.floor(Math.random() * (params.maxTerms - 1)) + 1 // 1 to (maxTerms-1) subtractions
      const amounts = []
      
      // Generate subtraction amounts
      for (let i = 0; i < numSubtractions; i++) {
        amounts.push(this.generateMoneyAmount(params))
      }
      
      // Calculate total subtractions
      const totalSubtractions = amounts.reduce((sum, amount) => sum + amount, 0)
      
      // Generate starting amount that ensures positive result if required
      let startingAmount
      if (params.ensurePositiveResults) {
        startingAmount = totalSubtractions + this.generateMoneyAmount(params)
      } else {
        startingAmount = this.generateMoneyAmount(params)
      }
      
      const result = startingAmount - totalSubtractions
      
      const questionText = `$${startingAmount.toFixed(2)} - ${amounts.map(a => `$${a.toFixed(2)}`).join(' - ')} = ?`
      const questionLaTeX = `\\$${startingAmount.toFixed(2)} - ${amounts.map(a => `\\$${a.toFixed(2)}`).join(' - ')} = \\square`
      
      const steps = []
      if (params.showSteps) {
        steps.push(`\\$${startingAmount.toFixed(2)} - ${amounts.map(a => `\\$${a.toFixed(2)}`).join(' - ')}`)
        steps.push(`= \\$${startingAmount.toFixed(2)} - \\$${totalSubtractions.toFixed(2)}`)
        steps.push(`= \\$${result.toFixed(2)}`)
      }
      
      return {
        question: questionText,
        questionLaTeX: questionLaTeX,
        answer: `$${result.toFixed(2)}`,
        answerLaTeX: `\\$${result.toFixed(2)}`,
        steps: steps,
        metadata: {
          operation: 'money-subtraction-multiple',
          startingAmount: startingAmount,
          subtractions: amounts,
          result: result,
          difficulty: this.difficulty,
          estimatedTime: '60 seconds'
        }
      }
    }
  }

  generateMultiplicationProblem(params) {
    const amount = this.generateMoneyAmount(params)
    const multiplier = Math.floor(Math.random() * (params.multiplierMax - params.multiplierMin + 1)) + params.multiplierMin
    const result = amount * multiplier
    
    const questionText = `$${amount.toFixed(2)} × ${multiplier} = ?`
    const questionLaTeX = `\\$${amount.toFixed(2)} \\times ${multiplier} = \\square`
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\$${amount.toFixed(2)} \\times ${multiplier}`)
      steps.push(`= \\$${result.toFixed(2)}`)
    }
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `$${result.toFixed(2)}`,
      answerLaTeX: `\\$${result.toFixed(2)}`,
      steps: steps,
      metadata: {
        operation: 'money-multiplication',
        amount: amount,
        multiplier: multiplier,
        result: result,
        difficulty: this.difficulty,
        estimatedTime: '60 seconds'
      }
    }
  }

  generateDivisionProblem(params) {
    const divisor = Math.floor(Math.random() * (params.multiplierMax - params.multiplierMin + 1)) + params.multiplierMin
    const quotient = this.generateMoneyAmount(params)
    const dividend = quotient * divisor
    
    const questionText = `$${dividend.toFixed(2)} ÷ ${divisor} = ?`
    const questionLaTeX = `\\$${dividend.toFixed(2)} \\div ${divisor} = \\square`
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\$${dividend.toFixed(2)} \\div ${divisor}`)
      steps.push(`= \\$${quotient.toFixed(2)}`)
    }
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `$${quotient.toFixed(2)}`,
      answerLaTeX: `\\$${quotient.toFixed(2)}`,
      steps: steps,
      metadata: {
        operation: 'money-division',
        dividend: dividend,
        divisor: divisor,
        result: quotient,
        difficulty: this.difficulty,
        estimatedTime: '75 seconds'
      }
    }
  }

  generateWordProblem(operationType, params) {
    switch (operationType) {
      case 'addition':
        return this.generateAdditionWordProblem(params)
      case 'subtraction':
        return this.generateSubtractionWordProblem(params)
      case 'multiplication':
        return this.generateMultiplicationWordProblem(params)
      case 'division':
        return this.generateDivisionWordProblem(params)
      default:
        return this.generateAdditionWordProblem(params)
    }
  }

  generateAdditionWordProblem(params) {
    const numTerms = Math.floor(Math.random() * (params.maxTerms - 1)) + 2 // 2 to maxTerms
    const amounts = []
    
    for (let i = 0; i < numTerms; i++) {
      amounts.push(this.generateMoneyAmount(params))
    }
    
    const total = amounts.reduce((sum, amount) => sum + amount, 0)
    
    let scenario
    if (numTerms === 2) {
      const scenarios = [
        {
          question: `Sarah has $${amounts[0].toFixed(2)} and earns $${amounts[1].toFixed(2)} more.\\n\\nHow much money does she have now?`,
          questionLaTeX: `\\text{Sarah has } \\$${amounts[0].toFixed(2)} \\text{ and earns } \\$${amounts[1].toFixed(2)} \\text{ more.} \\\\\\\\ \\text{How much money does she have now?}`,
          type: 'earning'
        },
        {
          question: `Tom bought a book for $${amounts[0].toFixed(2)} and a pen for $${amounts[1].toFixed(2)}.\\n\\nHow much did he spend in total?`,
          questionLaTeX: `\\text{Tom bought a book for } \\$${amounts[0].toFixed(2)} \\text{ and a pen for } \\$${amounts[1].toFixed(2)}\\text{.} \\\\\\\\ \\text{How much did he spend in total?}`,
          type: 'spending'
        },
        {
          question: `A family budget includes $${amounts[0].toFixed(2)} for groceries and $${amounts[1].toFixed(2)} for utilities.\\n\\nWhat is the total for these expenses?`,
          questionLaTeX: `\\text{A family budget includes } \\$${amounts[0].toFixed(2)} \\text{ for groceries and } \\$${amounts[1].toFixed(2)} \\text{ for utilities.} \\\\\\\\ \\text{What is the total for these expenses?}`,
          type: 'budgeting'
        }
      ]
      scenario = this.getRandomElement(scenarios)
    } else {
      // Multi-term scenarios
      const items = ['groceries', 'utilities', 'rent', 'gas', 'entertainment', 'clothing', 'books', 'supplies']
      const selectedItems = items.slice(0, numTerms)
      const itemList = amounts.map((amount, i) => `$${amount.toFixed(2)} for ${selectedItems[i]}`).join(', ')
      const itemListLaTeX = amounts.map((amount, i) => `\\$${amount.toFixed(2)} \\text{ for ${selectedItems[i]}}`).join(', ')
      
      scenario = {
        question: `A family's monthly expenses include ${itemList}.\\n\\nWhat is the total for all these expenses?`,
        questionLaTeX: `\\text{A family's monthly expenses include } ${itemListLaTeX}\\text{.} \\\\\\\\ \\text{What is the total for all these expenses?}`,
        type: 'multiple-expenses'
      }
    }
    
    const steps = []
    if (params.showSteps) {
      steps.push(`${amounts.map(a => `\\$${a.toFixed(2)}`).join(' + ')}`)
      steps.push(`= \\$${total.toFixed(2)}`)
    } else {
      steps.push(`\\text{Total: } \\$${total.toFixed(2)}`)
    }
    
    return {
      question: scenario.question,
      questionLaTeX: scenario.questionLaTeX,
      answer: `$${total.toFixed(2)}`,
      answerLaTeX: `\\$${total.toFixed(2)}`,
      steps: steps,
      metadata: {
        operation: 'money-addition-word',
        scenario: scenario.type,
        amounts: amounts,
        result: total,
        difficulty: this.difficulty,
        estimatedTime: '60 seconds'
      }
    }
  }

  generateSubtractionWordProblem(params) {
    let amount1 = this.generateMoneyAmount(params)
    let amount2 = this.generateMoneyAmount(params)
    
    if (params.ensurePositiveResults && amount1 < amount2) {
      [amount1, amount2] = [amount2, amount1]
    }
    
    const result = amount1 - amount2
    
    const scenarios = [
      {
        question: `Jake had $${amount1.toFixed(2)} and spent $${amount2.toFixed(2)}.\\n\\nHow much money does he have left?`,
        questionLaTeX: `\\text{Jake had } \\$${amount1.toFixed(2)} \\text{ and spent } \\$${amount2.toFixed(2)}\\text{.} \\\\\\\\ \\text{How much money does he have left?}`,
        type: 'spending'
      },
      {
        question: `A store had $${amount1.toFixed(2)} in sales and gave $${amount2.toFixed(2)} in refunds.\\n\\nWhat is the net amount?`,
        questionLaTeX: `\\text{A store had } \\$${amount1.toFixed(2)} \\text{ in sales and gave } \\$${amount2.toFixed(2)} \\text{ in refunds.} \\\\\\\\ \\text{What is the net amount?}`,
        type: 'business'
      },
      {
        question: `Maria's bank account had $${amount1.toFixed(2)} and she withdrew $${amount2.toFixed(2)}.\\n\\nHow much is left in her account?`,
        questionLaTeX: `\\text{Maria's bank account had } \\$${amount1.toFixed(2)} \\text{ and she withdrew } \\$${amount2.toFixed(2)}\\text{.} \\\\\\\\ \\text{How much is left in her account?}`,
        type: 'banking'
      }
    ]
    
    const scenario = this.getRandomElement(scenarios)
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\$${amount1.toFixed(2)} - \\$${amount2.toFixed(2)}`)
      steps.push(`= \\$${result.toFixed(2)}`)
    } else {
      steps.push(`\\text{Remaining: } \\$${result.toFixed(2)}`)
    }
    
    return {
      question: scenario.question,
      questionLaTeX: scenario.questionLaTeX,
      answer: `$${result.toFixed(2)}`,
      answerLaTeX: `\\$${result.toFixed(2)}`,
      steps: steps,
      metadata: {
        operation: 'money-subtraction-word',
        scenario: scenario.type,
        minuend: amount1,
        subtrahend: amount2,
        result: result,
        difficulty: this.difficulty,
        estimatedTime: '60 seconds'
      }
    }
  }

  generateMultiplicationWordProblem(params) {
    const amount = this.generateMoneyAmount(params)
    const multiplier = Math.floor(Math.random() * (params.multiplierMax - params.multiplierMin + 1)) + params.multiplierMin
    const result = amount * multiplier
    
    const scenarios = [
      {
        question: `Each ticket costs $${amount.toFixed(2)}. How much do ${multiplier} tickets cost?`,
        questionLaTeX: `\\text{Each ticket costs } \\$${amount.toFixed(2)}\\text{. How much do ${multiplier} tickets cost?}`,
        type: 'tickets'
      },
      {
        question: `A worker earns $${amount.toFixed(2)} per hour. How much does she earn in ${multiplier} hours?`,
        questionLaTeX: `\\text{A worker earns } \\$${amount.toFixed(2)} \\text{ per hour. How much does she earn in ${multiplier} hours?}`,
        type: 'wages'
      },
      {
        question: `If one item costs $${amount.toFixed(2)}, what is the cost of ${multiplier} items?`,
        questionLaTeX: `\\text{If one item costs } \\$${amount.toFixed(2)}\\text{, what is the cost of ${multiplier} items?}`,
        type: 'shopping'
      }
    ]
    
    const scenario = this.getRandomElement(scenarios)
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\$${amount.toFixed(2)} \\times ${multiplier}`)
      steps.push(`= \\$${result.toFixed(2)}`)
    } else {
      steps.push(`\\text{Total cost: } \\$${result.toFixed(2)}`)
    }
    
    return {
      question: scenario.question,
      questionLaTeX: scenario.questionLaTeX,
      answer: `$${result.toFixed(2)}`,
      answerLaTeX: `\\$${result.toFixed(2)}`,
      steps: steps,
      metadata: {
        operation: 'money-multiplication-word',
        scenario: scenario.type,
        amount: amount,
        multiplier: multiplier,
        result: result,
        difficulty: this.difficulty,
        estimatedTime: '75 seconds'
      }
    }
  }

  generateDivisionWordProblem(params) {
    const divisor = Math.floor(Math.random() * (params.multiplierMax - params.multiplierMin + 1)) + params.multiplierMin
    const quotient = this.generateMoneyAmount(params)
    const dividend = quotient * divisor
    
    const scenarios = [
      {
        question: `$${dividend.toFixed(2)} is shared equally among ${divisor} people. How much does each person get?`,
        questionLaTeX: `\\text{} \\$${dividend.toFixed(2)} \\text{ is shared equally among ${divisor} people. How much does each person get?}`,
        type: 'sharing'
      },
      {
        question: `A total of $${dividend.toFixed(2)} was earned in ${divisor} days. What was the average daily earning?`,
        questionLaTeX: `\\text{A total of } \\$${dividend.toFixed(2)} \\text{ was earned in ${divisor} days. What was the average daily earning?}`,
        type: 'average'
      },
      {
        question: `If ${divisor} identical items cost $${dividend.toFixed(2)} total, how much does each item cost?`,
        questionLaTeX: `\\text{If ${divisor} identical items cost } \\$${dividend.toFixed(2)} \\text{ total, how much does each item cost?}`,
        type: 'unit-cost'
      }
    ]
    
    const scenario = this.getRandomElement(scenarios)
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\$${dividend.toFixed(2)} \\div ${divisor}`)
      steps.push(`= \\$${quotient.toFixed(2)}`)
    } else {
      steps.push(`\\text{Each amount: } \\$${quotient.toFixed(2)}`)
    }
    
    return {
      question: scenario.question,
      questionLaTeX: scenario.questionLaTeX,
      answer: `$${quotient.toFixed(2)}`,
      answerLaTeX: `\\$${quotient.toFixed(2)}`,
      steps: steps,
      metadata: {
        operation: 'money-division-word',
        scenario: scenario.type,
        dividend: dividend,
        divisor: divisor,
        result: quotient,
        difficulty: this.difficulty,
        estimatedTime: '75 seconds'
      }
    }
  }

  generateMoneyAmount(params) {
    const min = params.moneyMin
    const max = params.moneyMax
    
    if (params.allowDecimals) {
      const amount = min + Math.random() * (max - min)
      return Math.round(amount * 100) / 100
    } else {
      const dollars = Math.floor(min) + Math.floor(Math.random() * (Math.floor(max) - Math.floor(min) + 1))
      return parseFloat(dollars.toFixed(2))
    }
  }

  getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)]
  }
}

export default MoneyOperationsGenerator