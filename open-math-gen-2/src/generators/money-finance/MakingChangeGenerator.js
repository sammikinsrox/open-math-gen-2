import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Making Change Generator
 * Generates problems involving calculating change from purchases
 */
export class MakingChangeGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Making Change',
      description: 'Generate problems involving calculating change from purchases and transactions',
      category: 'money-finance',
      difficulty: 'medium',
      icon: 'point_of_sale',
      tags: ['money', 'change', 'subtraction', 'purchases', 'transactions'],
      gradeLevel: '2-8',
      estimatedTime: '60 seconds',
      exampleProblem: {
        question: 'An item costs $3.75. You pay with $5.00. How much change do you receive?',
        questionLaTeX: '\\text{An item costs } \\$3.75\\text{. You pay with } \\$5.00\\text{. How much change do you receive?}',
        answer: '$1.25',
        answerLaTeX: '\\$1.25'
      },
      
      defaultParameters: {
        problemCount: 10,
        includeBasicChange: true,
        includeMultipleItems: false,
        includeTaxCalculation: false,
        includeExactChange: false,
        includeWordProblems: true,
        itemPriceMin: 0.25,
        itemPriceMax: 20.00,
        allowCentsInPrice: true,
        paymentMin: 1.00,
        paymentMax: 50.00,
        useCommonPayments: true,
        showSteps: true,
        maxItems: 3
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
                description: 'How many change-making problems to generate',
                min: 1,
                max: 50,
                required: true,
                slider: true,
                presets: [5, 8, 10, 15],
                order: 1
              })
            }
          }),
          
          problemTypes: schemaV2.createCategory({
            id: 'problemTypes',
            label: 'Problem Types',
            description: 'Choose which types of change problems to include',
            icon: 'point_of_sale',
            color: 'green',
            order: 2,
            parameters: {
              includeBasicChange: schemaV2.createParameter({
                type: 'boolean',
                label: 'Basic Change',
                description: 'Simple single-item change problems',
                helpText: 'Example: Item costs $3.75, pay with $5.00, get $1.25 change',
                order: 1
              }),
              includeMultipleItems: schemaV2.createParameter({
                type: 'boolean',
                label: 'Multiple Items',
                description: 'Problems with multiple items to purchase',
                helpText: 'Example: Buy 3 items totaling $12.50, pay with $20.00',
                order: 2
              }),
              includeTaxCalculation: schemaV2.createParameter({
                type: 'boolean',
                label: 'Tax Calculation',
                description: 'Include problems with sales tax',
                helpText: 'Example: Item costs $10.00 + 8% tax = $10.80 total',
                order: 3
              }),
              includeExactChange: schemaV2.createParameter({
                type: 'boolean',
                label: 'Exact Change',
                description: 'Problems asking for exact payment amount',
                helpText: 'Example: What exact amount is needed for a $4.37 item?',
                order: 4
              }),
              includeWordProblems: schemaV2.createParameter({
                type: 'boolean',
                label: 'Word Problems',
                description: 'Real-world shopping scenarios with context',
                helpText: 'Examples: Sarah buys a toy, Mike at the store, Emma shopping',
                order: 5
              })
            }
          }),
          
          priceRanges: schemaV2.createCategory({
            id: 'priceRanges',
            label: 'Price Ranges',
            description: 'Control the range of item prices',
            icon: 'attach_money',
            color: 'purple',
            order: 3,
            parameters: {
              itemPriceMin: schemaV2.createParameter({
                type: 'number',
                label: 'Minimum Item Price',
                description: 'Lowest price for items (in dollars)',
                min: 0.01,
                max: 100.00,
                required: true,
                slider: true,
                presets: [0.25, 0.50, 1.00, 2.00],
                helpText: 'Controls the cheapest items in problems',
                order: 1
              }),
              itemPriceMax: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Item Price',
                description: 'Highest price for items (in dollars)',
                min: 0.01,
                max: 1000.00,
                required: true,
                slider: true,
                presets: [5.00, 10.00, 20.00, 50.00],
                helpText: 'Controls the most expensive items in problems',
                order: 2
              }),
              allowCentsInPrice: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Cents in Prices',
                description: 'Allow prices with cents (not just whole dollars)',
                helpText: 'Examples: $3.47, $12.99 vs $3.00, $12.00',
                order: 3
              })
            }
          }),
          
          paymentOptions: schemaV2.createCategory({
            id: 'paymentOptions',
            label: 'Payment Options',
            description: 'Control how customers pay for items',
            icon: 'credit_card',
            color: 'orange',
            order: 4,
            parameters: {
              useCommonPayments: schemaV2.createParameter({
                type: 'boolean',
                label: 'Use Common Payment Amounts',
                description: 'Use realistic bill denominations',
                helpText: 'Uses $1, $5, $10, $20, $50, $100 bills instead of random amounts',
                order: 1
              }),
              paymentMin: schemaV2.createParameter({
                type: 'number',
                label: 'Minimum Payment',
                description: 'Smallest payment amount (in dollars)',
                min: 0.01,
                max: 100.00,
                required: true,
                slider: true,
                presets: [1.00, 5.00, 10.00, 20.00],
                helpText: 'Lower bound for payment amounts',
                order: 2
              }),
              paymentMax: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Payment',
                description: 'Largest payment amount (in dollars)',
                min: 1.00,
                max: 10000.00,
                required: true,
                slider: true,
                presets: [20.00, 50.00, 100.00, 200.00],
                helpText: 'Upper bound for payment amounts',
                order: 3
              })
            }
          }),
          
          displayOptions: schemaV2.createCategory({
            id: 'displayOptions',
            label: 'Display Options',
            description: 'Control how solutions are presented',
            icon: 'visibility',
            color: 'teal',
            order: 5,
            parameters: {
              showSteps: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Calculation Steps',
                description: 'Display step-by-step change calculation',
                helpText: 'Shows: Payment - Cost = Change with intermediate steps',
                order: 1
              }),
              maxItems: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Items per Problem',
                description: 'Maximum number of items in multi-item problems',
                min: 2,
                max: 5,
                required: true,
                slider: true,
                presets: [2, 3, 4, 5],
                helpText: 'Only applies to multiple item problems',
                order: 2
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'basic-change',
            label: 'Basic Change',
            description: 'Simple change problems for beginners',
            icon: 'looks_one',
            category: 'difficulty',
            values: {
              problemCount: 10,
              includeBasicChange: true,
              includeMultipleItems: false,
              includeTaxCalculation: false,
              includeExactChange: false,
              includeWordProblems: true,
              itemPriceMin: 0.25,
              itemPriceMax: 10.00,
              allowCentsInPrice: true,
              paymentMin: 1.00,
              paymentMax: 20.00,
              useCommonPayments: true,
              showSteps: true,
              maxItems: 3
            }
          }),
          
          schemaV2.createPreset({
            id: 'shopping-practice',
            label: 'Shopping Practice',
            description: 'Real-world shopping scenarios with multiple items',
            icon: 'shopping_cart',
            category: 'scope',
            values: {
              problemCount: 12,
              includeBasicChange: true,
              includeMultipleItems: true,
              includeTaxCalculation: false,
              includeExactChange: false,
              includeWordProblems: true,
              itemPriceMin: 0.50,
              itemPriceMax: 15.00,
              allowCentsInPrice: true,
              paymentMin: 5.00,
              paymentMax: 50.00,
              useCommonPayments: true,
              showSteps: true,
              maxItems: 4
            }
          }),
          
          schemaV2.createPreset({
            id: 'tax-included',
            label: 'Tax Included',
            description: 'Practice with sales tax calculations',
            icon: 'receipt',
            category: 'scope',
            values: {
              problemCount: 10,
              includeBasicChange: true,
              includeMultipleItems: false,
              includeTaxCalculation: true,
              includeExactChange: false,
              includeWordProblems: true,
              itemPriceMin: 1.00,
              itemPriceMax: 20.00,
              allowCentsInPrice: false,
              paymentMin: 5.00,
              paymentMax: 50.00,
              useCommonPayments: true,
              showSteps: true,
              maxItems: 3
            }
          }),
          
          schemaV2.createPreset({
            id: 'exact-change-practice',
            label: 'Exact Change Practice',
            description: 'Practice identifying exact payment amounts',
            icon: 'payments',
            category: 'scope',
            values: {
              problemCount: 8,
              includeBasicChange: false,
              includeMultipleItems: false,
              includeTaxCalculation: false,
              includeExactChange: true,
              includeWordProblems: false,
              itemPriceMin: 0.25,
              itemPriceMax: 25.00,
              allowCentsInPrice: true,
              paymentMin: 1.00,
              paymentMax: 50.00,
              useCommonPayments: false,
              showSteps: false,
              maxItems: 3
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive-change',
            label: 'Comprehensive Change',
            description: 'Mixed practice with all change problem types',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 15,
              includeBasicChange: true,
              includeMultipleItems: true,
              includeTaxCalculation: true,
              includeExactChange: true,
              includeWordProblems: true,
              itemPriceMin: 0.25,
              itemPriceMax: 30.00,
              allowCentsInPrice: true,
              paymentMin: 1.00,
              paymentMax: 100.00,
              useCommonPayments: true,
              showSteps: true,
              maxItems: 5
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
    if (params.itemPriceMin > params.itemPriceMax) {
      customErrors.push('Minimum Item Price cannot be greater than Maximum Item Price')
    }
    if (params.paymentMin > params.paymentMax) {
      customErrors.push('Minimum Payment cannot be greater than Maximum Payment')
    }
    if (!params.includeBasicChange && !params.includeMultipleItems && !params.includeTaxCalculation && !params.includeExactChange) {
      customErrors.push('At least one problem type must be enabled')
    }
    if (customErrors.length > 0) {
      throw new Error(`Invalid parameters: ${customErrors.join(', ')}`)
    }
    
    // Build array of enabled problem types
    const enabledTypes = []
    if (params.includeBasicChange) enabledTypes.push('basic')
    if (params.includeMultipleItems) enabledTypes.push('multiple')
    if (params.includeTaxCalculation) enabledTypes.push('tax')
    if (params.includeExactChange) enabledTypes.push('exact')
    
    if (enabledTypes.length === 0) {
      throw new Error('At least one problem type must be enabled')
    }
    
    const problemType = this.getRandomElement(enabledTypes)
    
    switch (problemType) {
      case 'basic':
        return this.generateBasicChangeProblem(params)
      case 'multiple':
        return this.generateMultipleItemsProblem(params)
      case 'tax':
        return this.generateTaxProblem(params)
      case 'exact':
        return this.generateExactChangeProblem(params)
      default:
        return this.generateBasicChangeProblem(params)
    }
  }

  generateBasicChangeProblem(params) {
    const itemPrice = this.generatePrice(params)
    const payment = this.generatePayment(itemPrice, params)
    const change = payment - itemPrice
    
    if (params.includeWordProblems && Math.random() < 0.7) {
      return this.generateWordProblem(itemPrice, payment, change, params)
    }
    
    const questionText = `An item costs $${itemPrice.toFixed(2)}. You pay with $${payment.toFixed(2)}. How much change do you receive?`
    const questionLaTeX = `\\text{An item costs } \\$${itemPrice.toFixed(2)}\\text{.} \\\\\\\\ \\text{You pay with } \\$${payment.toFixed(2)}\\text{.} \\\\\\\\ \\text{How much change do you receive?}`
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Payment: } \\$${payment.toFixed(2)}`)
      steps.push(`\\text{Cost: } \\$${itemPrice.toFixed(2)}`)
      steps.push(`\\text{Change: } \\$${payment.toFixed(2)} - \\$${itemPrice.toFixed(2)} = \\$${change.toFixed(2)}`)
    }
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `$${change.toFixed(2)}`,
      answerLaTeX: `\\$${change.toFixed(2)}`,
      steps: steps,
      metadata: {
        operation: 'making-change-basic',
        itemPrice: itemPrice,
        payment: payment,
        change: change,
        difficulty: this.difficulty,
        estimatedTime: '45 seconds'
      }
    }
  }

  generateMultipleItemsProblem(params) {
    const numItems = Math.floor(Math.random() * (params.maxItems - 1)) + 2 // 2 to maxItems
    const items = []
    let totalCost = 0
    
    for (let i = 0; i < numItems; i++) {
      const price = this.generatePrice(params)
      items.push(price)
      totalCost += price
    }
    
    const payment = this.generatePayment(totalCost, params)
    const change = payment - totalCost
    
    const itemList = items.map(price => `$${price.toFixed(2)}`).join(', ')
    const itemListLaTeX = items.map(price => `\\$${price.toFixed(2)}`).join(', ')
    
    const questionText = `You buy items costing ${itemList}. You pay with $${payment.toFixed(2)}. How much change do you receive?`
    const questionLaTeX = `\\text{You buy items costing ${itemListLaTeX}.} \\\\\\\\ \\text{You pay with } \\$${payment.toFixed(2)}\\text{.} \\\\\\\\ \\text{How much change do you receive?}`
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Item costs: } ${items.map(p => `\\$${p.toFixed(2)}`).join(' + ')}`)
      steps.push(`\\text{Total cost: } \\$${totalCost.toFixed(2)}`)
      steps.push(`\\text{Payment: } \\$${payment.toFixed(2)}`)
      steps.push(`\\text{Change: } \\$${payment.toFixed(2)} - \\$${totalCost.toFixed(2)} = \\$${change.toFixed(2)}`)
    }
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `$${change.toFixed(2)}`,
      answerLaTeX: `\\$${change.toFixed(2)}`,
      steps: steps,
      metadata: {
        operation: 'making-change-multiple',
        items: items,
        totalCost: totalCost,
        payment: payment,
        change: change,
        difficulty: this.difficulty,
        estimatedTime: '75 seconds'
      }
    }
  }

  generateTaxProblem(params) {
    const itemPrice = this.generatePrice(params)
    const taxRate = this.getRandomElement([0.05, 0.075, 0.08, 0.10]) // 5%, 7.5%, 8%, 10%
    const tax = itemPrice * taxRate
    const totalCost = itemPrice + tax
    const payment = this.generatePayment(totalCost, params)
    const change = payment - totalCost
    
    const questionText = `An item costs $${itemPrice.toFixed(2)} plus ${(taxRate * 100)}% tax. You pay with $${payment.toFixed(2)}. How much change do you receive?`
    const questionLaTeX = `\\text{An item costs } \\$${itemPrice.toFixed(2)} \\text{ plus } ${(taxRate * 100)}\\% \\text{ tax.} \\\\\\\\ \\text{You pay with } \\$${payment.toFixed(2)}\\text{.} \\\\\\\\ \\text{How much change do you receive?}`
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Item price: } \\$${itemPrice.toFixed(2)}`)
      steps.push(`\\text{Tax: } \\$${itemPrice.toFixed(2)} \\times ${(taxRate * 100)}\\% = \\$${tax.toFixed(2)}`)
      steps.push(`\\text{Total cost: } \\$${itemPrice.toFixed(2)} + \\$${tax.toFixed(2)} = \\$${totalCost.toFixed(2)}`)
      steps.push(`\\text{Change: } \\$${payment.toFixed(2)} - \\$${totalCost.toFixed(2)} = \\$${change.toFixed(2)}`)
    }
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `$${change.toFixed(2)}`,
      answerLaTeX: `\\$${change.toFixed(2)}`,
      steps: steps,
      metadata: {
        operation: 'making-change-tax',
        itemPrice: itemPrice,
        taxRate: taxRate,
        tax: tax,
        totalCost: totalCost,
        payment: payment,
        change: change,
        difficulty: this.difficulty,
        estimatedTime: '90 seconds'
      }
    }
  }

  generateExactChangeProblem(params) {
    const itemPrice = this.generatePrice(params)
    
    const questionText = `An item costs $${itemPrice.toFixed(2)}. What is the exact change needed?`
    const questionLaTeX = `\\text{An item costs } \\$${itemPrice.toFixed(2)}\\text{.} \\\\\\\\ \\text{What is the exact change needed?}`
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `$${itemPrice.toFixed(2)}`,
      answerLaTeX: `\\$${itemPrice.toFixed(2)}`,
      steps: [
        `\\text{Exact change means paying the exact amount}`,
        `\\text{Answer: } \\$${itemPrice.toFixed(2)}`
      ],
      metadata: {
        operation: 'exact-change',
        itemPrice: itemPrice,
        difficulty: this.difficulty,
        estimatedTime: '30 seconds'
      }
    }
  }

  generateWordProblem(itemPrice, payment, change, params) {
    const items = [
      'toy', 'book', 'candy bar', 'drink', 'notebook', 'pen', 'sticker pack',
      'magazine', 'snack', 'pencil', 'eraser', 'ruler', 'folder'
    ]
    const item = this.getRandomElement(items)
    
    const scenarios = [
      {
        question: `Sarah buys a ${item} for $${itemPrice.toFixed(2)}. She pays with $${payment.toFixed(2)}.\\n\\nHow much change should she receive?`,
        questionLaTeX: `\\text{Sarah buys a ${item} for } \\$${itemPrice.toFixed(2)}\\text{.} \\\\\\\\ \\text{She pays with } \\$${payment.toFixed(2)}\\text{.} \\\\\\\\ \\text{How much change should she receive?}`,
        type: 'shopping'
      },
      {
        question: `At the store, a ${item} costs $${itemPrice.toFixed(2)}. Mike gives the cashier $${payment.toFixed(2)}.\\n\\nWhat change does Mike get back?`,
        questionLaTeX: `\\text{At the store, a ${item} costs } \\$${itemPrice.toFixed(2)}\\text{.} \\\\\\\\ \\text{Mike gives the cashier } \\$${payment.toFixed(2)}\\text{.} \\\\\\\\ \\text{What change does Mike get back?}`,
        type: 'store'
      },
      {
        question: `Emma wants to buy a ${item} that costs $${itemPrice.toFixed(2)}. She hands the clerk $${payment.toFixed(2)}.\\n\\nHow much money will she receive in change?`,
        questionLaTeX: `\\text{Emma wants to buy a ${item}} \\\\\\\\ \\text{that costs } \\$${itemPrice.toFixed(2)}\\text{.} \\\\\\\\ \\text{She hands the clerk } \\$${payment.toFixed(2)}\\text{.} \\\\\\\\ \\text{How much money will she receive in change?}`,
        type: 'purchase'
      }
    ]
    
    const scenario = this.getRandomElement(scenarios)
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Amount paid: } \\$${payment.toFixed(2)}`)
      steps.push(`\\text{Cost of item: } \\$${itemPrice.toFixed(2)}`)
      steps.push(`\\text{Change: } \\$${payment.toFixed(2)} - \\$${itemPrice.toFixed(2)} = \\$${change.toFixed(2)}`)
    } else {
      steps.push(`\\text{Change: } \\$${change.toFixed(2)}`)
    }
    
    return {
      question: scenario.question,
      questionLaTeX: scenario.questionLaTeX,
      answer: `$${change.toFixed(2)}`,
      answerLaTeX: `\\$${change.toFixed(2)}`,
      steps: steps,
      metadata: {
        operation: 'making-change-word',
        scenario: scenario.type,
        item: item,
        itemPrice: itemPrice,
        payment: payment,
        change: change,
        difficulty: this.difficulty,
        estimatedTime: '60 seconds'
      }
    }
  }

  generatePrice(params) {
    const min = params.itemPriceMin
    const max = params.itemPriceMax
    
    if (params.allowCentsInPrice) {
      const price = min + Math.random() * (max - min)
      return Math.round(price * 100) / 100
    } else {
      const dollars = Math.floor(min) + Math.floor(Math.random() * (Math.floor(max) - Math.floor(min) + 1))
      return parseFloat(dollars.toFixed(2))
    }
  }

  generatePayment(itemPrice, params) {
    if (params.useCommonPayments) {
      const commonAmounts = [1, 5, 10, 20, 50, 100]
      const validAmounts = commonAmounts.filter(amount => 
        amount >= itemPrice && amount >= params.paymentMin && amount <= params.paymentMax
      )
      
      if (validAmounts.length > 0) {
        return this.getRandomElement(validAmounts)
      }
    }
    
    // Ensure payment is larger than item price
    const minPayment = Math.max(itemPrice + 0.01, params.paymentMin)
    const maxPayment = params.paymentMax
    
    const payment = minPayment + Math.random() * (maxPayment - minPayment)
    return Math.round(payment * 100) / 100
  }

  getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)]
  }
}

export default MakingChangeGenerator