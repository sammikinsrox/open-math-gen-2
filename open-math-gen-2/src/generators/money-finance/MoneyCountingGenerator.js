import { BaseGenerator } from '../BaseGenerator.js'

/**
 * Money Counting Generator
 * Generates problems involving counting coins and bills, identifying money values
 */
export class MoneyCountingGenerator extends BaseGenerator {
  constructor() {
    super({
      name: 'Money Counting',
      description: 'Generate problems involving counting coins and bills, and identifying money values',
      category: 'money-finance',
      difficulty: 'easy',
      icon: 'attach_money',
      tags: ['money', 'counting', 'coins', 'bills', 'currency', 'value'],
      gradeLevel: 'K-5',
      estimatedTime: '45 seconds',
      exampleProblem: {
        question: 'Count the money: 2 quarters, 3 dimes, 1 nickel',
        questionLaTeX: '\\text{Count the money: 2 quarters, 3 dimes, 1 nickel}',
        answer: '$0.85',
        answerLaTeX: '\\$0.85'
      },
      
      defaultParameters: {
        problemCount: 10,
        includeCoins: true,
        includeBills: true,
        includePennies: true,
        includeNickels: true,
        includeDimes: true,
        includeQuarters: true,
        includeHalfDollars: false,
        includeDollars: true,
        includeFives: false,
        includeTens: false,
        includeTwenties: false,
        maxCoinCount: 10,
        maxBillCount: 5,
        includeWordProblems: false,
        allowMixed: true,
        maxTotalValue: 25.00
      },
      
      parameterSchema: {
        // General Settings
        problemCount: {
          type: 'number',
          label: 'Number of Problems',
          description: 'How many money counting problems to generate',
          min: 1,
          max: 100,
          required: true,
          category: 'General'
        },
        
        // Money Types
        includeCoins: {
          type: 'boolean',
          label: 'Include Coins',
          description: 'Include coin counting problems',
          category: 'Money Types'
        },
        includeBills: {
          type: 'boolean',
          label: 'Include Bills',
          description: 'Include bill counting problems',
          category: 'Money Types'
        },
        allowMixed: {
          type: 'boolean',
          label: 'Allow Mixed Problems',
          description: 'Allow problems with both coins and bills',
          category: 'Money Types'
        },
        
        // Coin Types (conditional on includeCoins)
        includePennies: {
          type: 'boolean',
          label: 'Include Pennies (1¢)',
          description: 'Include pennies in problems',
          category: 'Coin Types',
          dependsOn: 'includeCoins'
        },
        includeNickels: {
          type: 'boolean',
          label: 'Include Nickels (5¢)',
          description: 'Include nickels in problems',
          category: 'Coin Types',
          dependsOn: 'includeCoins'
        },
        includeDimes: {
          type: 'boolean',
          label: 'Include Dimes (10¢)',
          description: 'Include dimes in problems',
          category: 'Coin Types',
          dependsOn: 'includeCoins'
        },
        includeQuarters: {
          type: 'boolean',
          label: 'Include Quarters (25¢)',
          description: 'Include quarters in problems',
          category: 'Coin Types',
          dependsOn: 'includeCoins'
        },
        includeHalfDollars: {
          type: 'boolean',
          label: 'Include Half Dollars (50¢)',
          description: 'Include half dollars in problems',
          category: 'Coin Types',
          dependsOn: 'includeCoins'
        },
        
        // Bill Types (conditional on includeBills)
        includeDollars: {
          type: 'boolean',
          label: 'Include $1 Bills',
          description: 'Include one dollar bills in problems',
          category: 'Bill Types',
          dependsOn: 'includeBills'
        },
        includeFives: {
          type: 'boolean',
          label: 'Include $5 Bills',
          description: 'Include five dollar bills in problems',
          category: 'Bill Types',
          dependsOn: 'includeBills'
        },
        includeTens: {
          type: 'boolean',
          label: 'Include $10 Bills',
          description: 'Include ten dollar bills in problems',
          category: 'Bill Types',
          dependsOn: 'includeBills'
        },
        includeTwenties: {
          type: 'boolean',
          label: 'Include $20 Bills',
          description: 'Include twenty dollar bills in problems',
          category: 'Bill Types',
          dependsOn: 'includeBills'
        },
        
        // Quantity Limits
        maxCoinCount: {
          type: 'number',
          label: 'Maximum Coins Per Type',
          description: 'Maximum number of each coin type',
          min: 1,
          max: 20,
          required: true,
          category: 'Quantity Limits',
          dependsOn: 'includeCoins'
        },
        maxBillCount: {
          type: 'number',
          label: 'Maximum Bills Per Type',
          description: 'Maximum number of each bill type',
          min: 1,
          max: 10,
          required: true,
          category: 'Quantity Limits',
          dependsOn: 'includeBills'
        },
        maxTotalValue: {
          type: 'number',
          label: 'Maximum Total Value',
          description: 'Maximum total value for each problem (in dollars)',
          min: 0.25,
          max: 100.00,
          required: true,
          category: 'Quantity Limits'
        },
        
        // Problem Style
        includeWordProblems: {
          type: 'boolean',
          label: 'Include Word Problems',
          description: 'Include real-world money counting scenarios',
          category: 'Problem Style'
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
    
    // Additional validation for money types
    if (params.includeCoins) {
      const hasCoins = params.includePennies || params.includeNickels || params.includeDimes || 
                      params.includeQuarters || params.includeHalfDollars
      if (!hasCoins) {
        throw new Error('When includeCoins is enabled, at least one coin type must be selected')
      }
    }
    
    if (params.includeBills) {
      const hasBills = params.includeDollars || params.includeFives || 
                      params.includeTens || params.includeTwenties
      if (!hasBills) {
        throw new Error('When includeBills is enabled, at least one bill type must be selected')
      }
    }
    
    // Build array of enabled problem types
    const enabledTypes = []
    if (params.includeCoins) {
      const availableCoins = this.getAvailableCoins(params)
      if (availableCoins.length > 0) enabledTypes.push('coins')
    }
    if (params.includeBills) {
      const availableBills = this.getAvailableBills(params)
      if (availableBills.length > 0) enabledTypes.push('bills')
    }
    if (params.allowMixed && params.includeCoins && params.includeBills) {
      const availableCoins = this.getAvailableCoins(params)
      const availableBills = this.getAvailableBills(params)
      if (availableCoins.length > 0 && availableBills.length > 0) enabledTypes.push('mixed')
    }
    
    if (enabledTypes.length === 0) {
      throw new Error('At least one money type must be enabled with valid denominations')
    }
    
    if (params.includeWordProblems && Math.random() < 0.3) {
      return this.generateWordProblem(params)
    } else {
      const problemType = this.getRandomElement(enabledTypes)
      return this.generateCountingProblem(problemType, params)
    }
  }

  generateCountingProblem(type, params) {
    const moneyItems = this.generateMoneyItems(type, params)
    const totalValue = this.calculateTotalValue(moneyItems)
    
    // Build question text
    const itemDescriptions = moneyItems.map(item => 
      `${item.count} ${item.count === 1 ? item.singular : item.plural}`
    )
    
    const questionText = `Count the money: ${itemDescriptions.join(', ')}`
    const questionLaTeX = `\\text{Count the money: ${itemDescriptions.join(', ')}}`
    
    // Generate steps showing the calculation
    const steps = []
    moneyItems.forEach(item => {
      if (item.count > 0) {
        const itemTotal = (item.value * item.count) / 100
        steps.push(`${item.count} \\text{ ${item.plural}} = ${item.count} \\times \\$${(item.value / 100).toFixed(2)} = \\$${itemTotal.toFixed(2)}`)
      }
    })
    
    if (moneyItems.length > 1) {
      const values = moneyItems.filter(item => item.count > 0).map(item => `\\$${((item.value * item.count) / 100).toFixed(2)}`)
      steps.push(`\\text{Total: } ${values.join(' + ')} = \\$${totalValue.toFixed(2)}`)
    }
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `$${totalValue.toFixed(2)}`,
      answerLaTeX: `\\$${totalValue.toFixed(2)}`,
      steps: steps,
      metadata: {
        operation: 'money-counting',
        type: type,
        moneyItems: moneyItems,
        totalValue: totalValue,
        difficulty: this.difficulty,
        estimatedTime: '45 seconds'
      }
    }
  }

  generateWordProblem(params) {
    // Determine the best problem type for word problems
    let problemType = 'mixed'
    
    const availableCoins = this.getAvailableCoins(params)
    const availableBills = this.getAvailableBills(params)
    
    // If only one type is available, use that type
    if (availableCoins.length > 0 && availableBills.length === 0) {
      problemType = 'coins'
    } else if (availableBills.length > 0 && availableCoins.length === 0) {
      problemType = 'bills'
    } else if (availableCoins.length > 0 && availableBills.length > 0) {
      // Both available, choose randomly or use mixed
      problemType = this.getRandomElement(['coins', 'bills', 'mixed'])
    }
    
    const moneyItems = this.generateMoneyItems(problemType, params)
    const totalValue = this.calculateTotalValue(moneyItems)
    
    const itemDescriptions = moneyItems.filter(item => item.count > 0).map(item => 
      `${item.count} ${item.count === 1 ? item.singular : item.plural}`
    ).join(', ')
    
    const scenarios = [
      {
        question: `Emma found ${itemDescriptions} in her piggy bank.\\n\\nHow much money does she have?`,
        questionLaTeX: `\\text{Emma found ${itemDescriptions} in her piggy bank.} \\\\\\\\ \\text{How much money does she have?}`,
        type: 'piggy-bank'
      },
      {
        question: `Jake's allowance this week is ${itemDescriptions}.\\n\\nWhat is the total value of his allowance?`,
        questionLaTeX: `\\text{Jake's allowance this week is ${itemDescriptions}.} \\\\\\\\ \\text{What is the total value of his allowance?}`,
        type: 'allowance'
      },
      {
        question: `The cashier counted ${itemDescriptions} from the register.\\n\\nWhat is the total amount?`,
        questionLaTeX: `\\text{The cashier counted ${itemDescriptions} from the register.} \\\\\\\\ \\text{What is the total amount?}`,
        type: 'register'
      },
      {
        question: `Sarah has ${itemDescriptions} in her wallet.\\n\\nHow much money does she have in total?`,
        questionLaTeX: `\\text{Sarah has ${itemDescriptions} in her wallet.} \\\\\\\\ \\text{How much money does she have in total?}`,
        type: 'wallet'
      }
    ]
    
    const scenario = this.getRandomElement(scenarios)
    
    return {
      question: scenario.question,
      questionLaTeX: scenario.questionLaTeX,
      answer: `$${totalValue.toFixed(2)}`,
      answerLaTeX: `\\$${totalValue.toFixed(2)}`,
      steps: [
        `\\text{Count all the money: } ${itemDescriptions}`,
        `\\text{Total value: } \\$${totalValue.toFixed(2)}`
      ],
      metadata: {
        operation: 'money-counting-word',
        scenario: scenario.type,
        moneyItems: moneyItems,
        totalValue: totalValue,
        difficulty: this.difficulty,
        estimatedTime: '60 seconds'
      }
    }
  }

  generateMoneyItems(type, params) {
    const availableCoins = this.getAvailableCoins(params)
    const availableBills = this.getAvailableBills(params)
    let selectedItems = []
    
    if (type === 'coins' || type === 'mixed') {
      selectedItems = selectedItems.concat(availableCoins)
    }
    
    if (type === 'bills' || type === 'mixed') {
      selectedItems = selectedItems.concat(availableBills)
    }
    
    if (selectedItems.length === 0) {
      throw new Error(`No available money items for type: ${type}`)
    }
    
    // Select 2-4 different money types, but not more than available
    const maxTypes = Math.min(selectedItems.length, 4)
    const minTypes = Math.min(2, selectedItems.length)
    const numTypes = Math.floor(Math.random() * (maxTypes - minTypes + 1)) + minTypes
    
    const shuffled = this.shuffleArray([...selectedItems])
    const chosenTypes = shuffled.slice(0, numTypes)
    
    // Generate counts for each chosen type
    const moneyItems = chosenTypes.map(item => {
      const maxCount = item.type === 'coin' ? params.maxCoinCount : params.maxBillCount
      const count = Math.floor(Math.random() * maxCount) + 1
      return {
        ...item,
        count: count
      }
    })
    
    // Ensure total value doesn't exceed maximum
    let totalValue = this.calculateTotalValue(moneyItems)
    if (totalValue > params.maxTotalValue) {
      // Reduce counts proportionally, but ensure at least 1 of each item
      const ratio = params.maxTotalValue / totalValue * 0.9 // Leave some buffer
      moneyItems.forEach(item => {
        item.count = Math.max(1, Math.floor(item.count * ratio))
      })
      
      // If still over limit, reduce highest value items first
      totalValue = this.calculateTotalValue(moneyItems)
      while (totalValue > params.maxTotalValue && moneyItems.some(item => item.count > 1)) {
        // Find the highest value item with count > 1
        const highestValueItem = moneyItems
          .filter(item => item.count > 1)
          .reduce((highest, current) => 
            current.value > highest.value ? current : highest
          )
        highestValueItem.count--
        totalValue = this.calculateTotalValue(moneyItems)
      }
    }
    
    return moneyItems
  }

  getAvailableCoins(params) {
    const coins = []
    
    if (params.includePennies) {
      coins.push({ name: 'penny', plural: 'pennies', singular: 'penny', value: 1, type: 'coin' })
    }
    if (params.includeNickels) {
      coins.push({ name: 'nickel', plural: 'nickels', singular: 'nickel', value: 5, type: 'coin' })
    }
    if (params.includeDimes) {
      coins.push({ name: 'dime', plural: 'dimes', singular: 'dime', value: 10, type: 'coin' })
    }
    if (params.includeQuarters) {
      coins.push({ name: 'quarter', plural: 'quarters', singular: 'quarter', value: 25, type: 'coin' })
    }
    if (params.includeHalfDollars) {
      coins.push({ name: 'half-dollar', plural: 'half dollars', singular: 'half dollar', value: 50, type: 'coin' })
    }
    
    return coins
  }

  getAvailableBills(params) {
    const bills = []
    
    if (params.includeDollars) {
      bills.push({ name: 'dollar', plural: 'dollar bills', singular: 'dollar bill', value: 100, type: 'bill' })
    }
    if (params.includeFives) {
      bills.push({ name: 'five', plural: 'five dollar bills', singular: 'five dollar bill', value: 500, type: 'bill' })
    }
    if (params.includeTens) {
      bills.push({ name: 'ten', plural: 'ten dollar bills', singular: 'ten dollar bill', value: 1000, type: 'bill' })
    }
    if (params.includeTwenties) {
      bills.push({ name: 'twenty', plural: 'twenty dollar bills', singular: 'twenty dollar bill', value: 2000, type: 'bill' })
    }
    
    return bills
  }

  calculateTotalValue(moneyItems) {
    return moneyItems.reduce((total, item) => {
      return total + (item.value * item.count) / 100
    }, 0)
  }

  shuffleArray(array) {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)]
  }
}

export default MoneyCountingGenerator