import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Profit/Loss Generator
 * Generates problems involving profit, loss, cost price, selling price calculations
 */
export class ProfitLossGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Profit/Loss',
      description: 'Generate problems involving profit, loss, cost price, and selling price calculations',
      category: 'money-finance',
      difficulty: 'hard',
      icon: 'trending_up',
      tags: ['business', 'profit', 'loss', 'commerce', 'percentage', 'buying', 'selling'],
      gradeLevel: '6-12',
      estimatedTime: '90 seconds',
      exampleProblem: {
        question: 'An item is bought for $80 and sold for $100. Find the profit and profit percentage.',
        questionLaTeX: '\\text{An item is bought for } \\$80 \\text{ and sold for } \\$100\\text{. Find the profit and profit percentage.}',
        answer: 'Profit: $20, Profit%: 25%',
        answerLaTeX: '\\text{Profit: } \\$20\\text{, Profit\\%: } 25\\%'
      },
      
      defaultParameters: {
        problemCount: 10,
        includeFindProfit: true,
        includeFindLoss: true,
        includeFindProfitPercent: true,
        includeFindLossPercent: true,
        includeFindCostPrice: false,
        includeFindSellingPrice: false,
        includeWordProblems: true,
        costPriceMin: 10,
        costPriceMax: 500,
        profitPercentMin: 5,
        profitPercentMax: 50,
        lossPercentMin: 5,
        lossPercentMax: 30,
        allowDecimals: true,
        showSteps: true,
        includeBreakEven: false
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
                description: 'How many profit/loss problems to generate',
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
            description: 'Choose which profit/loss calculations to include',
            icon: 'trending_up',
            color: 'green',
            order: 2,
            parameters: {
              includeFindProfit: schemaV2.createParameter({
                type: 'boolean',
                label: 'Find Profit Amount',
                description: 'Calculate profit from cost and selling price',
                helpText: 'Examples: Cost $80, Sell $100 → Profit $20',
                order: 1
              }),
              includeFindLoss: schemaV2.createParameter({
                type: 'boolean',
                label: 'Find Loss Amount',
                description: 'Calculate loss from cost and selling price',
                helpText: 'Examples: Cost $100, Sell $80 → Loss $20',
                order: 2
              }),
              includeFindProfitPercent: schemaV2.createParameter({
                type: 'boolean',
                label: 'Find Profit Percentage',
                description: 'Calculate profit as percentage of cost price',
                helpText: 'Examples: Profit $20 on cost $80 → 25% profit',
                order: 3
              }),
              includeFindLossPercent: schemaV2.createParameter({
                type: 'boolean',
                label: 'Find Loss Percentage',
                description: 'Calculate loss as percentage of cost price',
                helpText: 'Examples: Loss $20 on cost $100 → 20% loss',
                order: 4
              }),
              includeFindCostPrice: schemaV2.createParameter({
                type: 'boolean',
                label: 'Find Cost Price',
                description: 'Find original cost given selling price and profit/loss%',
                helpText: 'Examples: Sold for $120 at 20% profit → Cost $100',
                order: 5
              }),
              includeFindSellingPrice: schemaV2.createParameter({
                type: 'boolean',
                label: 'Find Selling Price',
                description: 'Find selling price given cost and profit/loss%',
                helpText: 'Examples: Cost $100, 20% profit → Sell for $120',
                order: 6
              }),
              includeBreakEven: schemaV2.createParameter({
                type: 'boolean',
                label: 'Include Break-Even',
                description: 'Include scenarios with no profit or loss',
                helpText: 'Examples: Sell at cost price to break even',
                order: 7
              })
            }
          }),
          
          priceRanges: schemaV2.createCategory({
            id: 'priceRanges',
            label: 'Price Ranges',
            description: 'Control the range of cost prices used',
            icon: 'attach_money',
            color: 'purple',
            order: 3,
            parameters: {
              costPriceMin: schemaV2.createParameter({
                type: 'number',
                label: 'Minimum Cost Price',
                description: 'Lowest cost price in dollars',
                min: 1,
                max: 10000,
                required: true,
                slider: true,
                presets: [10, 25, 50, 100],
                helpText: 'Lower bound for item cost prices',
                order: 1
              }),
              costPriceMax: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Cost Price',
                description: 'Highest cost price in dollars',
                min: 1,
                max: 100000,
                required: true,
                slider: true,
                presets: [200, 500, 1000, 2000],
                helpText: 'Upper bound for item cost prices',
                order: 2
              }),
              allowDecimals: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Decimal Values',
                description: 'Allow decimal amounts in prices and calculations',
                helpText: 'Examples: $123.45, 12.5% vs $123, 12%',
                order: 3
              })
            }
          }),
          
          profitRanges: schemaV2.createCategory({
            id: 'profitRanges',
            label: 'Profit Ranges',
            description: 'Control profit percentage ranges',
            icon: 'trending_up',
            color: 'orange',
            order: 4,
            parameters: {
              profitPercentMin: schemaV2.createParameter({
                type: 'number',
                label: 'Minimum Profit Percentage',
                description: 'Smallest profit percentage to use',
                min: 1,
                max: 200,
                required: true,
                slider: true,
                presets: [5, 10, 15, 20],
                helpText: 'Lower bound for profit percentages',
                order: 1
              }),
              profitPercentMax: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Profit Percentage',
                description: 'Largest profit percentage to use',
                min: 1,
                max: 500,
                required: true,
                slider: true,
                presets: [30, 50, 75, 100],
                helpText: 'Upper bound for profit percentages',
                order: 2
              })
            }
          }),
          
          lossRanges: schemaV2.createCategory({
            id: 'lossRanges',
            label: 'Loss Ranges',
            description: 'Control loss percentage ranges',
            icon: 'trending_down',
            color: 'red',
            order: 5,
            parameters: {
              lossPercentMin: schemaV2.createParameter({
                type: 'number',
                label: 'Minimum Loss Percentage',
                description: 'Smallest loss percentage to use',
                min: 1,
                max: 100,
                required: true,
                slider: true,
                presets: [5, 10, 15, 20],
                helpText: 'Lower bound for loss percentages',
                order: 1
              }),
              lossPercentMax: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Loss Percentage',
                description: 'Largest loss percentage to use',
                min: 1,
                max: 100,
                required: true,
                slider: true,
                presets: [25, 35, 50, 75],
                helpText: 'Upper bound for loss percentages',
                order: 2
              })
            }
          }),
          
          problemStyle: schemaV2.createCategory({
            id: 'problemStyle',
            label: 'Problem Style',
            description: 'Control how problems are presented',
            icon: 'style',
            color: 'teal',
            order: 6,
            parameters: {
              includeWordProblems: schemaV2.createParameter({
                type: 'boolean',
                label: 'Include Word Problems',
                description: 'Include real-world business scenarios with context',
                helpText: 'Examples: store owner, investor, retailer scenarios',
                order: 1
              }),
              showSteps: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Calculation Steps',
                description: 'Display step-by-step profit/loss calculations',
                helpText: 'Shows formulas and intermediate calculation steps',
                order: 2
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'basic-profit-loss',
            label: 'Basic Profit & Loss',
            description: 'Simple profit and loss amount calculations',
            icon: 'looks_one',
            category: 'difficulty',
            values: {
              problemCount: 10,
              includeFindProfit: true,
              includeFindLoss: true,
              includeFindProfitPercent: false,
              includeFindLossPercent: false,
              includeFindCostPrice: false,
              includeFindSellingPrice: false,
              includeWordProblems: true,
              costPriceMin: 25,
              costPriceMax: 200,
              profitPercentMin: 10,
              profitPercentMax: 40,
              lossPercentMin: 10,
              lossPercentMax: 25,
              allowDecimals: false,
              showSteps: true,
              includeBreakEven: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'percentage-calculations',
            label: 'Percentage Calculations',
            description: 'Focus on profit and loss percentage problems',
            icon: 'percent',
            category: 'scope',
            values: {
              problemCount: 12,
              includeFindProfit: false,
              includeFindLoss: false,
              includeFindProfitPercent: true,
              includeFindLossPercent: true,
              includeFindCostPrice: false,
              includeFindSellingPrice: false,
              includeWordProblems: true,
              costPriceMin: 50,
              costPriceMax: 500,
              profitPercentMin: 5,
              profitPercentMax: 50,
              lossPercentMin: 5,
              lossPercentMax: 30,
              allowDecimals: true,
              showSteps: true,
              includeBreakEven: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'reverse-calculations',
            label: 'Reverse Calculations',
            description: 'Find cost or selling price from given information',
            icon: 'swap_horiz',
            category: 'difficulty',
            values: {
              problemCount: 8,
              includeFindProfit: false,
              includeFindLoss: false,
              includeFindProfitPercent: false,
              includeFindLossPercent: false,
              includeFindCostPrice: true,
              includeFindSellingPrice: true,
              includeWordProblems: true,
              costPriceMin: 100,
              costPriceMax: 800,
              profitPercentMin: 15,
              profitPercentMax: 60,
              lossPercentMin: 10,
              lossPercentMax: 40,
              allowDecimals: true,
              showSteps: true,
              includeBreakEven: true
            }
          }),
          
          schemaV2.createPreset({
            id: 'business-scenarios',
            label: 'Business Scenarios',
            description: 'Real-world business profit and loss problems',
            icon: 'business',
            category: 'scope',
            values: {
              problemCount: 12,
              includeFindProfit: true,
              includeFindLoss: true,
              includeFindProfitPercent: true,
              includeFindLossPercent: true,
              includeFindCostPrice: false,
              includeFindSellingPrice: false,
              includeWordProblems: true,
              costPriceMin: 20,
              costPriceMax: 300,
              profitPercentMin: 8,
              profitPercentMax: 45,
              lossPercentMin: 8,
              lossPercentMax: 35,
              allowDecimals: true,
              showSteps: false,
              includeBreakEven: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'advanced-commerce',
            label: 'Advanced Commerce',
            description: 'Complex profit/loss problems with higher values',
            icon: 'trending_up',
            category: 'difficulty',
            values: {
              problemCount: 10,
              includeFindProfit: true,
              includeFindLoss: true,
              includeFindProfitPercent: true,
              includeFindLossPercent: true,
              includeFindCostPrice: true,
              includeFindSellingPrice: true,
              includeWordProblems: true,
              costPriceMin: 200,
              costPriceMax: 2000,
              profitPercentMin: 5,
              profitPercentMax: 100,
              lossPercentMin: 5,
              lossPercentMax: 50,
              allowDecimals: true,
              showSteps: true,
              includeBreakEven: true
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive-profit-loss',
            label: 'Comprehensive Profit/Loss',
            description: 'Complete practice with all profit/loss concepts',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 15,
              includeFindProfit: true,
              includeFindLoss: true,
              includeFindProfitPercent: true,
              includeFindLossPercent: true,
              includeFindCostPrice: true,
              includeFindSellingPrice: true,
              includeWordProblems: true,
              costPriceMin: 10,
              costPriceMax: 1000,
              profitPercentMin: 5,
              profitPercentMax: 75,
              lossPercentMin: 5,
              lossPercentMax: 40,
              allowDecimals: true,
              showSteps: true,
              includeBreakEven: true
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
    if (!params.includeFindProfit && !params.includeFindLoss && !params.includeFindProfitPercent && !params.includeFindLossPercent && !params.includeFindCostPrice && !params.includeFindSellingPrice && !params.includeBreakEven) {
      customErrors.push('At least one problem type must be enabled')
    }
    if (params.costPriceMin > params.costPriceMax) {
      customErrors.push('Minimum Cost Price cannot be greater than Maximum Cost Price')
    }
    if (params.profitPercentMin > params.profitPercentMax) {
      customErrors.push('Minimum Profit Percentage cannot be greater than Maximum Profit Percentage')
    }
    if (params.lossPercentMin > params.lossPercentMax) {
      customErrors.push('Minimum Loss Percentage cannot be greater than Maximum Loss Percentage')
    }
    if (customErrors.length > 0) {
      throw new Error(`Invalid parameters: ${customErrors.join(', ')}`)
    }
    
    // Build array of enabled problem types
    const enabledTypes = []
    if (params.includeFindProfit) enabledTypes.push('find-profit')
    if (params.includeFindLoss) enabledTypes.push('find-loss')
    if (params.includeFindProfitPercent) enabledTypes.push('find-profit-percent')
    if (params.includeFindLossPercent) enabledTypes.push('find-loss-percent')
    if (params.includeFindCostPrice) enabledTypes.push('find-cost-price')
    if (params.includeFindSellingPrice) enabledTypes.push('find-selling-price')
    if (params.includeBreakEven) enabledTypes.push('break-even')
    
    if (enabledTypes.length === 0) {
      throw new Error('At least one problem type must be enabled')
    }
    
    const problemType = this.getRandomElement(enabledTypes)
    
    if (params.includeWordProblems && Math.random() < 0.7) {
      return this.generateWordProblem(problemType, params)
    } else {
      return this.generateBasicProblem(problemType, params)
    }
  }

  generateBasicProblem(type, params) {
    const values = this.generateValues(type, params)
    
    switch (type) {
      case 'find-profit':
        return this.generateFindProfitProblem(values, params)
      case 'find-loss':
        return this.generateFindLossProblem(values, params)
      case 'find-profit-percent':
        return this.generateFindProfitPercentProblem(values, params)
      case 'find-loss-percent':
        return this.generateFindLossPercentProblem(values, params)
      case 'find-cost-price':
        return this.generateFindCostPriceProblem(values, params)
      case 'find-selling-price':
        return this.generateFindSellingPriceProblem(values, params)
      case 'break-even':
        return this.generateBreakEvenProblem(values, params)
      default:
        return this.generateFindProfitProblem(values, params)
    }
  }

  generateFindProfitProblem(values, params) {
    const { costPrice, sellingPrice, profit } = values
    
    const questionText = `An item is bought for $${costPrice.toFixed(2)} and sold for $${sellingPrice.toFixed(2)}. Find the profit.`
    const questionLaTeX = `\\text{An item is bought for } \\$${costPrice.toFixed(2)} \\\\\\\\ \\text{and sold for } \\$${sellingPrice.toFixed(2)}\\text{.} \\\\\\\\ \\text{Find the profit.}`
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Cost Price (CP)} = \\$${costPrice.toFixed(2)}`)
      steps.push(`\\text{Selling Price (SP)} = \\$${sellingPrice.toFixed(2)}`)
      steps.push(`\\text{Profit} = \\text{SP} - \\text{CP}`)
      steps.push(`\\text{Profit} = \\$${sellingPrice.toFixed(2)} - \\$${costPrice.toFixed(2)} = \\$${profit.toFixed(2)}`)
    }
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `$${profit.toFixed(2)}`,
      answerLaTeX: `\\$${profit.toFixed(2)}`,
      steps: steps,
      metadata: {
        operation: 'profit-loss-find-profit',
        costPrice: costPrice,
        sellingPrice: sellingPrice,
        profit: profit,
        difficulty: this.difficulty,
        estimatedTime: '60 seconds'
      }
    }
  }

  generateFindLossProblem(values, params) {
    const { costPrice, sellingPrice, loss } = values
    
    const questionText = `An item is bought for $${costPrice.toFixed(2)} and sold for $${sellingPrice.toFixed(2)}. Find the loss.`
    const questionLaTeX = `\\text{An item is bought for } \\$${costPrice.toFixed(2)} \\\\\\\\ \\text{and sold for } \\$${sellingPrice.toFixed(2)}\\text{.} \\\\\\\\ \\text{Find the loss.}`
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Cost Price (CP)} = \\$${costPrice.toFixed(2)}`)
      steps.push(`\\text{Selling Price (SP)} = \\$${sellingPrice.toFixed(2)}`)
      steps.push(`\\text{Loss} = \\text{CP} - \\text{SP}`)
      steps.push(`\\text{Loss} = \\$${costPrice.toFixed(2)} - \\$${sellingPrice.toFixed(2)} = \\$${loss.toFixed(2)}`)
    }
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `$${loss.toFixed(2)}`,
      answerLaTeX: `\\$${loss.toFixed(2)}`,
      steps: steps,
      metadata: {
        operation: 'profit-loss-find-loss',
        costPrice: costPrice,
        sellingPrice: sellingPrice,
        loss: loss,
        difficulty: this.difficulty,
        estimatedTime: '60 seconds'
      }
    }
  }

  generateFindProfitPercentProblem(values, params) {
    const { costPrice, sellingPrice, profit, profitPercent } = values
    
    const questionText = `An item is bought for $${costPrice.toFixed(2)} and sold for $${sellingPrice.toFixed(2)}. Find the profit percentage.`
    const questionLaTeX = `\\text{An item is bought for } \\$${costPrice.toFixed(2)} \\\\\\\\ \\text{and sold for } \\$${sellingPrice.toFixed(2)}\\text{.} \\\\\\\\ \\text{Find the profit percentage.}`
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Cost Price (CP)} = \\$${costPrice.toFixed(2)}`)
      steps.push(`\\text{Selling Price (SP)} = \\$${sellingPrice.toFixed(2)}`)
      steps.push(`\\text{Profit} = \\$${sellingPrice.toFixed(2)} - \\$${costPrice.toFixed(2)} = \\$${profit.toFixed(2)}`)
      steps.push(`\\text{Profit\\%} = \\frac{\\text{Profit}}{\\text{CP}} \\times 100\\%`)
      steps.push(`\\text{Profit\\%} = \\frac{\\$${profit.toFixed(2)}}{\\$${costPrice.toFixed(2)}} \\times 100\\% = ${profitPercent.toFixed(1)}\\%`)
    }
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `${profitPercent.toFixed(1)}%`,
      answerLaTeX: `${profitPercent.toFixed(1)}\\%`,
      steps: steps,
      metadata: {
        operation: 'profit-loss-find-profit-percent',
        costPrice: costPrice,
        sellingPrice: sellingPrice,
        profit: profit,
        profitPercent: profitPercent,
        difficulty: this.difficulty,
        estimatedTime: '90 seconds'
      }
    }
  }

  generateFindLossPercentProblem(values, params) {
    const { costPrice, sellingPrice, loss, lossPercent } = values
    
    const questionText = `An item is bought for $${costPrice.toFixed(2)} and sold for $${sellingPrice.toFixed(2)}. Find the loss percentage.`
    const questionLaTeX = `\\text{An item is bought for } \\$${costPrice.toFixed(2)} \\\\\\\\ \\text{and sold for } \\$${sellingPrice.toFixed(2)}\\text{.} \\\\\\\\ \\text{Find the loss percentage.}`
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Cost Price (CP)} = \\$${costPrice.toFixed(2)}`)
      steps.push(`\\text{Selling Price (SP)} = \\$${sellingPrice.toFixed(2)}`)
      steps.push(`\\text{Loss} = \\$${costPrice.toFixed(2)} - \\$${sellingPrice.toFixed(2)} = \\$${loss.toFixed(2)}`)
      steps.push(`\\text{Loss\\%} = \\frac{\\text{Loss}}{\\text{CP}} \\times 100\\%`)
      steps.push(`\\text{Loss\\%} = \\frac{\\$${loss.toFixed(2)}}{\\$${costPrice.toFixed(2)}} \\times 100\\% = ${lossPercent.toFixed(1)}\\%`)
    }
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `${lossPercent.toFixed(1)}%`,
      answerLaTeX: `${lossPercent.toFixed(1)}\\%`,
      steps: steps,
      metadata: {
        operation: 'profit-loss-find-loss-percent',
        costPrice: costPrice,
        sellingPrice: sellingPrice,
        loss: loss,
        lossPercent: lossPercent,
        difficulty: this.difficulty,
        estimatedTime: '90 seconds'
      }
    }
  }

  generateFindCostPriceProblem(values, params) {
    const { costPrice, sellingPrice, profitPercent, isProfit } = values
    
    const type = isProfit ? 'profit' : 'loss'
    const percent = isProfit ? profitPercent : values.lossPercent
    
    const questionText = `An item is sold for $${sellingPrice.toFixed(2)} at a ${percent.toFixed(1)}% ${type}. Find the cost price.`
    const questionLaTeX = `\\text{An item is sold for } \\$${sellingPrice.toFixed(2)} \\\\\\\\ \\text{at a } ${percent.toFixed(1)}\\% \\text{ ${type}.} \\\\\\\\ \\text{Find the cost price.}`
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Selling Price (SP)} = \\$${sellingPrice.toFixed(2)}`)
      steps.push(`\\text{${type} \\%} = ${percent.toFixed(1)}\\%`)
      if (isProfit) {
        steps.push(`\\text{SP} = \\text{CP} + \\text{Profit} = \\text{CP} + \\frac{${percent.toFixed(1)}}{100} \\times \\text{CP}`)
        steps.push(`\\text{SP} = \\text{CP}(1 + \\frac{${percent.toFixed(1)}}{100}) = \\text{CP} \\times ${(1 + percent / 100).toFixed(3)}`)
        steps.push(`\\text{CP} = \\frac{\\text{SP}}{${(1 + percent / 100).toFixed(3)}} = \\frac{\\$${sellingPrice.toFixed(2)}}{${(1 + percent / 100).toFixed(3)}} = \\$${costPrice.toFixed(2)}`)
      } else {
        steps.push(`\\text{SP} = \\text{CP} - \\text{Loss} = \\text{CP} - \\frac{${percent.toFixed(1)}}{100} \\times \\text{CP}`)
        steps.push(`\\text{SP} = \\text{CP}(1 - \\frac{${percent.toFixed(1)}}{100}) = \\text{CP} \\times ${(1 - percent / 100).toFixed(3)}`)
        steps.push(`\\text{CP} = \\frac{\\text{SP}}{${(1 - percent / 100).toFixed(3)}} = \\frac{\\$${sellingPrice.toFixed(2)}}{${(1 - percent / 100).toFixed(3)}} = \\$${costPrice.toFixed(2)}`)
      }
    }
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `$${costPrice.toFixed(2)}`,
      answerLaTeX: `\\$${costPrice.toFixed(2)}`,
      steps: steps,
      metadata: {
        operation: 'profit-loss-find-cost-price',
        costPrice: costPrice,
        sellingPrice: sellingPrice,
        percent: percent,
        type: type,
        difficulty: this.difficulty,
        estimatedTime: '120 seconds'
      }
    }
  }

  generateFindSellingPriceProblem(values, params) {
    const { costPrice, sellingPrice, profitPercent, isProfit } = values
    
    const type = isProfit ? 'profit' : 'loss'
    const percent = isProfit ? profitPercent : values.lossPercent
    
    const questionText = `An item costs $${costPrice.toFixed(2)}. If it is sold at a ${percent.toFixed(1)}% ${type}, find the selling price.`
    const questionLaTeX = `\\text{An item costs } \\$${costPrice.toFixed(2)}\\text{.} \\\\\\\\ \\text{If it is sold at a } ${percent.toFixed(1)}\\% \\text{ ${type},} \\\\\\\\ \\text{find the selling price.}`
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Cost Price (CP)} = \\$${costPrice.toFixed(2)}`)
      steps.push(`\\text{${type} \\%} = ${percent.toFixed(1)}\\%`)
      if (isProfit) {
        steps.push(`\\text{Profit} = \\frac{${percent.toFixed(1)}}{100} \\times \\$${costPrice.toFixed(2)} = \\$${((percent / 100) * costPrice).toFixed(2)}`)
        steps.push(`\\text{SP} = \\text{CP} + \\text{Profit} = \\$${costPrice.toFixed(2)} + \\$${((percent / 100) * costPrice).toFixed(2)} = \\$${sellingPrice.toFixed(2)}`)
      } else {
        steps.push(`\\text{Loss} = \\frac{${percent.toFixed(1)}}{100} \\times \\$${costPrice.toFixed(2)} = \\$${((percent / 100) * costPrice).toFixed(2)}`)
        steps.push(`\\text{SP} = \\text{CP} - \\text{Loss} = \\$${costPrice.toFixed(2)} - \\$${((percent / 100) * costPrice).toFixed(2)} = \\$${sellingPrice.toFixed(2)}`)
      }
    }
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `$${sellingPrice.toFixed(2)}`,
      answerLaTeX: `\\$${sellingPrice.toFixed(2)}`,
      steps: steps,
      metadata: {
        operation: 'profit-loss-find-selling-price',
        costPrice: costPrice,
        sellingPrice: sellingPrice,
        percent: percent,
        type: type,
        difficulty: this.difficulty,
        estimatedTime: '90 seconds'
      }
    }
  }

  generateBreakEvenProblem(values, params) {
    const { costPrice } = values
    
    const questionText = `An item costs $${costPrice.toFixed(2)}. At what price should it be sold to break even?`
    const questionLaTeX = `\\text{An item costs } \\$${costPrice.toFixed(2)}\\text{.} \\\\\\\\ \\text{At what price should it be sold to break even?}`
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Cost Price (CP)} = \\$${costPrice.toFixed(2)}`)
      steps.push(`\\text{To break even: SP} = \\text{CP}`)
      steps.push(`\\text{Selling Price} = \\$${costPrice.toFixed(2)}`)
    }
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `$${costPrice.toFixed(2)}`,
      answerLaTeX: `\\$${costPrice.toFixed(2)}`,
      steps: steps,
      metadata: {
        operation: 'profit-loss-break-even',
        costPrice: costPrice,
        sellingPrice: costPrice,
        difficulty: this.difficulty,
        estimatedTime: '30 seconds'
      }
    }
  }

  generateWordProblem(type, params) {
    const values = this.generateValues(type, params)
    const items = ['bicycle', 'laptop', 'book', 'chair', 'phone', 'watch', 'camera', 'tablet', 'shoes', 'jacket']
    const item = this.getRandomElement(items)
    
    const scenarios = this.getWordProblemScenarios(type, values, item, params)
    const scenario = this.getRandomElement(scenarios)
    
    // Generate answer based on problem type
    let answer, answerLaTeX, steps
    
    switch (type) {
      case 'find-profit':
        answer = `$${values.profit.toFixed(2)}`
        answerLaTeX = `\\$${values.profit.toFixed(2)}`
        steps = this.generateProfitSteps(values, params)
        break
      case 'find-loss':
        answer = `$${values.loss.toFixed(2)}`
        answerLaTeX = `\\$${values.loss.toFixed(2)}`
        steps = this.generateLossSteps(values, params)
        break
      case 'find-profit-percent':
        answer = `${values.profitPercent.toFixed(1)}%`
        answerLaTeX = `${values.profitPercent.toFixed(1)}\\%`
        steps = this.generateProfitPercentSteps(values, params)
        break
      case 'find-loss-percent':
        answer = `${values.lossPercent.toFixed(1)}%`
        answerLaTeX = `${values.lossPercent.toFixed(1)}\\%`
        steps = this.generateLossPercentSteps(values, params)
        break
      case 'find-cost-price':
      case 'find-selling-price':
      case 'break-even':
        const targetPrice = type === 'find-cost-price' ? values.costPrice : values.sellingPrice
        answer = `$${targetPrice.toFixed(2)}`
        answerLaTeX = `\\$${targetPrice.toFixed(2)}`
        steps = [`\\text{Answer: } \\$${targetPrice.toFixed(2)}`]
        break
      default:
        answer = `$${values.profit.toFixed(2)}`
        answerLaTeX = `\\$${values.profit.toFixed(2)}`
        steps = this.generateProfitSteps(values, params)
    }
    
    return {
      question: scenario.question,
      questionLaTeX: scenario.questionLaTeX,
      answer: answer,
      answerLaTeX: answerLaTeX,
      steps: steps,
      metadata: {
        operation: `profit-loss-${type}-word`,
        scenario: scenario.type,
        item: item,
        ...values,
        difficulty: this.difficulty,
        estimatedTime: '120 seconds'
      }
    }
  }

  getWordProblemScenarios(type, values, item, params) {
    const scenarios = []
    const { costPrice, sellingPrice, profitPercent, lossPercent, isProfit } = values
    
    switch (type) {
      case 'find-profit':
        scenarios.push({
          question: `A store owner buys a ${item} for $${costPrice.toFixed(2)} and sells it for $${sellingPrice.toFixed(2)}.\\n\\nWhat is the profit?`,
          questionLaTeX: `\\text{A store owner buys a ${item} for } \\$${costPrice.toFixed(2)} \\text{ and sells it for } \\$${sellingPrice.toFixed(2)}\\text{.} \\\\\\\\ \\text{What is the profit?}`,
          type: 'store'
        })
        break
      case 'find-loss':
        scenarios.push({
          question: `Maria bought a ${item} for $${costPrice.toFixed(2)} but had to sell it for $${sellingPrice.toFixed(2)}.\\n\\nWhat is her loss?`,
          questionLaTeX: `\\text{Maria bought a ${item} for } \\$${costPrice.toFixed(2)} \\text{ but had to sell it for } \\$${sellingPrice.toFixed(2)}\\text{.} \\\\\\\\ \\text{What is her loss?}`,
          type: 'personal'
        })
        break
      case 'find-profit-percent':
        scenarios.push({
          question: `A business buys a ${item} for $${costPrice.toFixed(2)} and sells it for $${sellingPrice.toFixed(2)}.\\n\\nWhat is the profit percentage?`,
          questionLaTeX: `\\text{A business buys a ${item} for } \\$${costPrice.toFixed(2)} \\text{ and sells it for } \\$${sellingPrice.toFixed(2)}\\text{.} \\\\\\\\ \\text{What is the profit percentage?}`,
          type: 'business'
        })
        break
      case 'find-loss-percent':
        scenarios.push({
          question: `An investor bought a ${item} for $${costPrice.toFixed(2)} and sold it for $${sellingPrice.toFixed(2)}.\\n\\nWhat is the loss percentage?`,
          questionLaTeX: `\\text{An investor bought a ${item} for } \\$${costPrice.toFixed(2)} \\text{ and sold it for } \\$${sellingPrice.toFixed(2)}\\text{.} \\\\\\\\ \\text{What is the loss percentage?}`,
          type: 'investment'
        })
        break
      case 'find-cost-price':
        const percent = isProfit ? profitPercent : lossPercent
        const typeText = isProfit ? 'profit' : 'loss'
        scenarios.push({
          question: `A ${item} is sold for $${sellingPrice.toFixed(2)} at a ${percent.toFixed(1)}% ${typeText}.\\n\\nWhat was the cost price?`,
          questionLaTeX: `\\text{A ${item} is sold for } \\$${sellingPrice.toFixed(2)} \\text{ at a } ${percent.toFixed(1)}\\% \\text{ ${typeText}.} \\\\\\\\ \\text{What was the cost price?}`,
          type: 'reverse-calculation'
        })
        break
      case 'find-selling-price':
        const percent2 = isProfit ? profitPercent : lossPercent
        const typeText2 = isProfit ? 'profit' : 'loss'
        scenarios.push({
          question: `A ${item} costs $${costPrice.toFixed(2)}. If it is sold at a ${percent2.toFixed(1)}% ${typeText2}, what is the selling price?`,
          questionLaTeX: `\\text{A ${item} costs } \\$${costPrice.toFixed(2)}\\text{.} \\\\\\\\ \\text{If it is sold at a } ${percent2.toFixed(1)}\\% \\text{ ${typeText2},} \\\\\\\\ \\text{what is the selling price?}`,
          type: 'pricing'
        })
        break
      case 'break-even':
        scenarios.push({
          question: `A retailer bought a ${item} for $${costPrice.toFixed(2)}.\\n\\nAt what price should it be sold to break even?`,
          questionLaTeX: `\\text{A retailer bought a ${item} for } \\$${costPrice.toFixed(2)}\\text{.} \\\\\\\\ \\text{At what price should it be sold to break even?}`,
          type: 'break-even'
        })
        break
    }
    
    return scenarios
  }

  generateValues(type, params) {
    let costPrice = this.generateAmount(params.costPriceMin, params.costPriceMax, params.allowDecimals)
    let sellingPrice, profit, loss, profitPercent, lossPercent, isProfit
    
    if (type === 'break-even') {
      return { costPrice, sellingPrice: costPrice }
    }
    
    // Determine if this should be a profit or loss scenario
    if (type.includes('profit')) {
      isProfit = true
      profitPercent = this.generatePercent(params.profitPercentMin, params.profitPercentMax, params.allowDecimals)
      sellingPrice = costPrice * (1 + profitPercent / 100)
      profit = sellingPrice - costPrice
    } else if (type.includes('loss')) {
      isProfit = false
      lossPercent = this.generatePercent(params.lossPercentMin, params.lossPercentMax, params.allowDecimals)
      sellingPrice = costPrice * (1 - lossPercent / 100)
      loss = costPrice - sellingPrice
    } else {
      // For general problems, randomly choose profit or loss
      isProfit = Math.random() < 0.6 // 60% chance of profit
      if (isProfit) {
        profitPercent = this.generatePercent(params.profitPercentMin, params.profitPercentMax, params.allowDecimals)
        sellingPrice = costPrice * (1 + profitPercent / 100)
        profit = sellingPrice - costPrice
      } else {
        lossPercent = this.generatePercent(params.lossPercentMin, params.lossPercentMax, params.allowDecimals)
        sellingPrice = costPrice * (1 - lossPercent / 100)
        loss = costPrice - sellingPrice
      }
    }
    
    // Calculate missing values
    if (isProfit) {
      if (!profit) profit = sellingPrice - costPrice
      if (!profitPercent) profitPercent = (profit / costPrice) * 100
    } else {
      if (!loss) loss = costPrice - sellingPrice
      if (!lossPercent) lossPercent = (loss / costPrice) * 100
    }
    
    // Round values appropriately
    if (!params.allowDecimals) {
      costPrice = Math.round(costPrice)
      sellingPrice = Math.round(sellingPrice)
      if (profit) profit = Math.round(profit)
      if (loss) loss = Math.round(loss)
    }
    
    return {
      costPrice,
      sellingPrice,
      profit,
      loss,
      profitPercent,
      lossPercent,
      isProfit
    }
  }

  generateAmount(min, max, allowDecimals) {
    const amount = min + Math.random() * (max - min)
    return allowDecimals ? Math.round(amount * 100) / 100 : Math.round(amount)
  }

  generatePercent(min, max, allowDecimals) {
    const percent = min + Math.random() * (max - min)
    return allowDecimals ? Math.round(percent * 10) / 10 : Math.round(percent)
  }

  generateProfitSteps(values, params) {
    if (!params.showSteps) return [`\\text{Profit: } \\$${values.profit.toFixed(2)}`]
    
    return [
      `\\text{Cost Price: } \\$${values.costPrice.toFixed(2)}`,
      `\\text{Selling Price: } \\$${values.sellingPrice.toFixed(2)}`,
      `\\text{Profit: } \\$${values.sellingPrice.toFixed(2)} - \\$${values.costPrice.toFixed(2)} = \\$${values.profit.toFixed(2)}`
    ]
  }

  generateLossSteps(values, params) {
    if (!params.showSteps) return [`\\text{Loss: } \\$${values.loss.toFixed(2)}`]
    
    return [
      `\\text{Cost Price: } \\$${values.costPrice.toFixed(2)}`,
      `\\text{Selling Price: } \\$${values.sellingPrice.toFixed(2)}`,
      `\\text{Loss: } \\$${values.costPrice.toFixed(2)} - \\$${values.sellingPrice.toFixed(2)} = \\$${values.loss.toFixed(2)}`
    ]
  }

  generateProfitPercentSteps(values, params) {
    if (!params.showSteps) return [`\\text{Profit\\%: } ${values.profitPercent.toFixed(1)}\\%`]
    
    return [
      `\\text{Profit: } \\$${values.profit.toFixed(2)}`,
      `\\text{Cost Price: } \\$${values.costPrice.toFixed(2)}`,
      `\\text{Profit\\%: } \\frac{\\$${values.profit.toFixed(2)}}{\\$${values.costPrice.toFixed(2)}} \\times 100\\% = ${values.profitPercent.toFixed(1)}\\%`
    ]
  }

  generateLossPercentSteps(values, params) {
    if (!params.showSteps) return [`\\text{Loss\\%: } ${values.lossPercent.toFixed(1)}\\%`]
    
    return [
      `\\text{Loss: } \\$${values.loss.toFixed(2)}`,
      `\\text{Cost Price: } \\$${values.costPrice.toFixed(2)}`,
      `\\text{Loss\\%: } \\frac{\\$${values.loss.toFixed(2)}}{\\$${values.costPrice.toFixed(2)}} \\times 100\\% = ${values.lossPercent.toFixed(1)}\\%`
    ]
  }

  getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)]
  }
}

export default ProfitLossGenerator