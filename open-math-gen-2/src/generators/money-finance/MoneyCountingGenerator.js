import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Money Counting Generator
 * Generates problems involving counting coins and bills, identifying money values
 */
export class MoneyCountingGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
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
                description: 'How many money counting problems to generate',
                min: 1,
                max: 50,
                required: true,
                slider: true,
                presets: [5, 8, 10, 15],
                order: 1
              })
            }
          }),
          
          moneyTypes: schemaV2.createCategory({
            id: 'moneyTypes',
            label: 'Money Types',
            description: 'Choose which types of money to include',
            icon: 'attach_money',
            color: 'green',
            order: 2,
            parameters: {
              includeCoins: schemaV2.createParameter({
                type: 'boolean',
                label: 'Include Coins',
                description: 'Include coin counting problems',
                helpText: 'Types: pennies, nickels, dimes, quarters, half dollars',
                order: 1
              }),
              includeBills: schemaV2.createParameter({
                type: 'boolean',
                label: 'Include Bills',
                description: 'Include bill counting problems',
                helpText: 'Types: $1, $5, $10, $20 bills',
                order: 2
              }),
              allowMixed: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Mixed Problems',
                description: 'Allow problems with both coins and bills',
                helpText: 'Examples: 2 quarters + 1 dollar bill = $1.50',
                order: 3
              })
            }
          }),
          
          coinTypes: schemaV2.createCategory({
            id: 'coinTypes',
            label: 'Coin Types',
            description: 'Select which coin denominations to include',
            icon: 'monetization_on',
            color: 'purple',
            order: 3,
            parameters: {
              includePennies: schemaV2.createParameter({
                type: 'boolean',
                label: 'Pennies (1¢)',
                description: 'Include pennies in coin counting problems',
                helpText: 'Value: 1 cent each',
                order: 1
              }),
              includeNickels: schemaV2.createParameter({
                type: 'boolean',
                label: 'Nickels (5¢)',
                description: 'Include nickels in coin counting problems',
                helpText: 'Value: 5 cents each',
                order: 2
              }),
              includeDimes: schemaV2.createParameter({
                type: 'boolean',
                label: 'Dimes (10¢)',
                description: 'Include dimes in coin counting problems',
                helpText: 'Value: 10 cents each',
                order: 3
              }),
              includeQuarters: schemaV2.createParameter({
                type: 'boolean',
                label: 'Quarters (25¢)',
                description: 'Include quarters in coin counting problems',
                helpText: 'Value: 25 cents each',
                order: 4
              }),
              includeHalfDollars: schemaV2.createParameter({
                type: 'boolean',
                label: 'Half Dollars (50¢)',
                description: 'Include half dollars in coin counting problems',
                helpText: 'Value: 50 cents each (advanced)',
                order: 5
              })
            }
          }),
          
          billTypes: schemaV2.createCategory({
            id: 'billTypes',
            label: 'Bill Types',
            description: 'Select which bill denominations to include',
            icon: 'receipt_long',
            color: 'orange',
            order: 4,
            parameters: {
              includeDollars: schemaV2.createParameter({
                type: 'boolean',
                label: 'One Dollar Bills ($1)',
                description: 'Include one dollar bills in problems',
                helpText: 'Value: $1.00 each',
                order: 1
              }),
              includeFives: schemaV2.createParameter({
                type: 'boolean',
                label: 'Five Dollar Bills ($5)',
                description: 'Include five dollar bills in problems',
                helpText: 'Value: $5.00 each',
                order: 2
              }),
              includeTens: schemaV2.createParameter({
                type: 'boolean',
                label: 'Ten Dollar Bills ($10)',
                description: 'Include ten dollar bills in problems',
                helpText: 'Value: $10.00 each',
                order: 3
              }),
              includeTwenties: schemaV2.createParameter({
                type: 'boolean',
                label: 'Twenty Dollar Bills ($20)',
                description: 'Include twenty dollar bills in problems',
                helpText: 'Value: $20.00 each (advanced)',
                order: 4
              })
            }
          }),
          
          quantityLimits: schemaV2.createCategory({
            id: 'quantityLimits',
            label: 'Quantity Limits',
            description: 'Control the number and value of money in problems',
            icon: 'tune',
            color: 'teal',
            order: 5,
            parameters: {
              maxCoinCount: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Coins Per Type',
                description: 'Maximum number of each coin type in problems',
                min: 1,
                max: 20,
                required: true,
                slider: true,
                presets: [5, 10, 15, 20],
                helpText: 'Controls complexity of coin counting',
                order: 1
              }),
              maxBillCount: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Bills Per Type',
                description: 'Maximum number of each bill type in problems',
                min: 1,
                max: 10,
                required: true,
                slider: true,
                presets: [3, 5, 7, 10],
                helpText: 'Controls complexity of bill counting',
                order: 2
              }),
              maxTotalValue: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Total Value',
                description: 'Maximum total value for each problem (in dollars)',
                min: 0.25,
                max: 100.00,
                required: true,
                slider: true,
                presets: [5.00, 10.00, 25.00, 50.00],
                helpText: 'Caps the total amount to count',
                order: 3
              })
            }
          }),
          
          problemStyle: schemaV2.createCategory({
            id: 'problemStyle',
            label: 'Problem Style',
            description: 'Control the presentation and context of problems',
            icon: 'style',
            color: 'pink',
            order: 6,
            parameters: {
              includeWordProblems: schemaV2.createParameter({
                type: 'boolean',
                label: 'Include Word Problems',
                description: 'Include real-world money counting scenarios',
                helpText: 'Examples: piggy bank, allowance, cashier scenarios',
                order: 1
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'basic-coins',
            label: 'Basic Coins',
            description: 'Simple coin counting with common denominations',
            icon: 'looks_one',
            category: 'difficulty',
            values: {
              problemCount: 10,
              includeCoins: true,
              includeBills: false,
              allowMixed: false,
              includePennies: true,
              includeNickels: true,
              includeDimes: true,
              includeQuarters: true,
              includeHalfDollars: false,
              includeDollars: false,
              includeFives: false,
              includeTens: false,
              includeTwenties: false,
              maxCoinCount: 10,
              maxBillCount: 5,
              maxTotalValue: 5.00,
              includeWordProblems: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'basic-bills',
            label: 'Basic Bills',
            description: 'Simple bill counting with small denominations',
            icon: 'receipt_long',
            category: 'difficulty',
            values: {
              problemCount: 10,
              includeCoins: false,
              includeBills: true,
              allowMixed: false,
              includePennies: false,
              includeNickels: false,
              includeDimes: false,
              includeQuarters: false,
              includeHalfDollars: false,
              includeDollars: true,
              includeFives: true,
              includeTens: false,
              includeTwenties: false,
              maxCoinCount: 10,
              maxBillCount: 5,
              maxTotalValue: 25.00,
              includeWordProblems: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'mixed-money',
            label: 'Mixed Money',
            description: 'Practice with both coins and bills together',
            icon: 'account_balance_wallet',
            category: 'scope',
            values: {
              problemCount: 12,
              includeCoins: true,
              includeBills: true,
              allowMixed: true,
              includePennies: true,
              includeNickels: true,
              includeDimes: true,
              includeQuarters: true,
              includeHalfDollars: false,
              includeDollars: true,
              includeFives: true,
              includeTens: false,
              includeTwenties: false,
              maxCoinCount: 8,
              maxBillCount: 3,
              maxTotalValue: 15.00,
              includeWordProblems: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'real-world-scenarios',
            label: 'Real-World Scenarios',
            description: 'Word problems with realistic money contexts',
            icon: 'business',
            category: 'scope',
            values: {
              problemCount: 10,
              includeCoins: true,
              includeBills: true,
              allowMixed: true,
              includePennies: true,
              includeNickels: true,
              includeDimes: true,
              includeQuarters: true,
              includeHalfDollars: false,
              includeDollars: true,
              includeFives: false,
              includeTens: false,
              includeTwenties: false,
              maxCoinCount: 6,
              maxBillCount: 4,
              maxTotalValue: 20.00,
              includeWordProblems: true
            }
          }),
          
          schemaV2.createPreset({
            id: 'advanced-counting',
            label: 'Advanced Counting',
            description: 'Complex problems with larger denominations',
            icon: 'trending_up',
            category: 'difficulty',
            values: {
              problemCount: 8,
              includeCoins: true,
              includeBills: true,
              allowMixed: true,
              includePennies: false,
              includeNickels: true,
              includeDimes: true,
              includeQuarters: true,
              includeHalfDollars: true,
              includeDollars: true,
              includeFives: true,
              includeTens: true,
              includeTwenties: false,
              maxCoinCount: 15,
              maxBillCount: 8,
              maxTotalValue: 75.00,
              includeWordProblems: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive-money',
            label: 'Comprehensive Money',
            description: 'Complete practice with all money types',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 15,
              includeCoins: true,
              includeBills: true,
              allowMixed: true,
              includePennies: true,
              includeNickels: true,
              includeDimes: true,
              includeQuarters: true,
              includeHalfDollars: true,
              includeDollars: true,
              includeFives: true,
              includeTens: true,
              includeTwenties: true,
              maxCoinCount: 12,
              maxBillCount: 6,
              maxTotalValue: 100.00,
              includeWordProblems: true
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
    if (!params.includeCoins && !params.includeBills) {
      customErrors.push('At least one money type (coins or bills) must be enabled')
    }
    if (params.includeCoins) {
      const hasCoins = params.includePennies || params.includeNickels || params.includeDimes || 
                      params.includeQuarters || params.includeHalfDollars
      if (!hasCoins) {
        customErrors.push('When includeCoins is enabled, at least one coin type must be selected')
      }
    }
    if (params.includeBills) {
      const hasBills = params.includeDollars || params.includeFives || 
                      params.includeTens || params.includeTwenties
      if (!hasBills) {
        customErrors.push('When includeBills is enabled, at least one bill type must be selected')
      }
    }
    if (customErrors.length > 0) {
      throw new Error(`Invalid parameters: ${customErrors.join(', ')}`)
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