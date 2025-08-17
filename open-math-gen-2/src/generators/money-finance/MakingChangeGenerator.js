import { BaseGenerator } from '../BaseGenerator.js'

/**
 * Making Change Generator
 * Generates problems involving calculating change from purchases
 */
export class MakingChangeGenerator extends BaseGenerator {
  constructor() {
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
      
      parameterSchema: {
        problemCount: {
          type: 'number',
          label: 'Number of Problems',
          description: 'How many change-making problems to generate',
          min: 1,
          max: 100,
          required: true
        },
        includeBasicChange: {
          type: 'boolean',
          label: 'Include Basic Change',
          description: 'Include simple single-item change problems'
        },
        includeMultipleItems: {
          type: 'boolean',
          label: 'Include Multiple Items',
          description: 'Include problems with multiple items'
        },
        includeTaxCalculation: {
          type: 'boolean',
          label: 'Include Tax Calculation',
          description: 'Include problems with sales tax'
        },
        includeExactChange: {
          type: 'boolean',
          label: 'Include Exact Change',
          description: 'Include problems asking for exact change'
        },
        includeWordProblems: {
          type: 'boolean',
          label: 'Include Word Problems',
          description: 'Include real-world shopping scenarios'
        },
        itemPriceMin: {
          type: 'number',
          label: 'Minimum Item Price',
          description: 'Lowest price for items (in dollars)',
          min: 0.01,
          max: 100.00,
          required: true
        },
        itemPriceMax: {
          type: 'number',
          label: 'Maximum Item Price',
          description: 'Highest price for items (in dollars)',
          min: 0.01,
          max: 1000.00,
          required: true
        },
        allowCentsInPrice: {
          type: 'boolean',
          label: 'Allow Cents in Prices',
          description: 'Allow prices with cents (e.g., $3.47)'
        },
        paymentMin: {
          type: 'number',
          label: 'Minimum Payment',
          description: 'Smallest payment amount (in dollars)',
          min: 0.01,
          max: 100.00,
          required: true
        },
        paymentMax: {
          type: 'number',
          label: 'Maximum Payment',
          description: 'Largest payment amount (in dollars)',
          min: 1.00,
          max: 10000.00,
          required: true
        },
        useCommonPayments: {
          type: 'boolean',
          label: 'Use Common Payments',
          description: 'Use common payment amounts ($1, $5, $10, $20)'
        },
        showSteps: {
          type: 'boolean',
          label: 'Show Calculation Steps',
          description: 'Show step-by-step change calculation'
        },
        maxItems: {
          type: 'number',
          label: 'Maximum Items',
          description: 'Maximum number of items in multi-item problems',
          min: 2,
          max: 5,
          required: true
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
    const questionLaTeX = `\\text{An item costs } \\$${itemPrice.toFixed(2)}\\text{. You pay with } \\$${payment.toFixed(2)}\\text{. How much change do you receive?}`
    
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
    
    const questionText = `You buy items costing ${itemList}. You pay with $${payment.toFixed(2)}. How much change do you receive?`
    const questionLaTeX = `\\text{You buy items costing ${itemList}. You pay with } \\$${payment.toFixed(2)}\\text{. How much change do you receive?}`
    
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
    const questionLaTeX = `\\text{An item costs } \\$${itemPrice.toFixed(2)} \\text{ plus } ${(taxRate * 100)}\\% \\text{ tax. You pay with } \\$${payment.toFixed(2)}\\text{. How much change do you receive?}`
    
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
    const questionLaTeX = `\\text{An item costs } \\$${itemPrice.toFixed(2)}\\text{. What is the exact change needed?}`
    
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
        questionLaTeX: `\\text{Sarah buys a ${item} for } \\$${itemPrice.toFixed(2)}\\text{. She pays with } \\$${payment.toFixed(2)}\\text{.} \\\\\\\\ \\text{How much change should she receive?}`,
        type: 'shopping'
      },
      {
        question: `At the store, a ${item} costs $${itemPrice.toFixed(2)}. Mike gives the cashier $${payment.toFixed(2)}.\\n\\nWhat change does Mike get back?`,
        questionLaTeX: `\\text{At the store, a ${item} costs } \\$${itemPrice.toFixed(2)}\\text{. Mike gives the cashier } \\$${payment.toFixed(2)}\\text{.} \\\\\\\\ \\text{What change does Mike get back?}`,
        type: 'store'
      },
      {
        question: `Emma wants to buy a ${item} that costs $${itemPrice.toFixed(2)}. She hands the clerk $${payment.toFixed(2)}.\\n\\nHow much money will she receive in change?`,
        questionLaTeX: `\\text{Emma wants to buy a ${item} that costs } \\$${itemPrice.toFixed(2)}\\text{. She hands the clerk } \\$${payment.toFixed(2)}\\text{.} \\\\\\\\ \\text{How much money will she receive in change?}`,
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