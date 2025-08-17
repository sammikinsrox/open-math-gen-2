import { BaseGenerator } from '../BaseGenerator.js'

/**
 * Profit/Loss Generator
 * Generates problems involving profit, loss, cost price, selling price calculations
 */
export class ProfitLossGenerator extends BaseGenerator {
  constructor() {
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
      
      parameterSchema: {
        problemCount: {
          type: 'number',
          label: 'Number of Problems',
          description: 'How many profit/loss problems to generate',
          min: 1,
          max: 100,
          required: true
        },
        includeFindProfit: {
          type: 'boolean',
          label: 'Find Profit Amount',
          description: 'Include problems finding profit amount'
        },
        includeFindLoss: {
          type: 'boolean',
          label: 'Find Loss Amount',
          description: 'Include problems finding loss amount'
        },
        includeFindProfitPercent: {
          type: 'boolean',
          label: 'Find Profit Percentage',
          description: 'Include problems finding profit percentage'
        },
        includeFindLossPercent: {
          type: 'boolean',
          label: 'Find Loss Percentage',
          description: 'Include problems finding loss percentage'
        },
        includeFindCostPrice: {
          type: 'boolean',
          label: 'Find Cost Price',
          description: 'Include problems finding cost price'
        },
        includeFindSellingPrice: {
          type: 'boolean',
          label: 'Find Selling Price',
          description: 'Include problems finding selling price'
        },
        includeWordProblems: {
          type: 'boolean',
          label: 'Include Word Problems',
          description: 'Include real-world business scenarios'
        },
        costPriceMin: {
          type: 'number',
          label: 'Minimum Cost Price',
          description: 'Lowest cost price (in dollars)',
          min: 1,
          max: 10000,
          required: true
        },
        costPriceMax: {
          type: 'number',
          label: 'Maximum Cost Price',
          description: 'Highest cost price (in dollars)',
          min: 1,
          max: 100000,
          required: true
        },
        profitPercentMin: {
          type: 'number',
          label: 'Minimum Profit Percentage',
          description: 'Smallest profit percentage',
          min: 1,
          max: 200,
          required: true
        },
        profitPercentMax: {
          type: 'number',
          label: 'Maximum Profit Percentage',
          description: 'Largest profit percentage',
          min: 1,
          max: 500,
          required: true
        },
        lossPercentMin: {
          type: 'number',
          label: 'Minimum Loss Percentage',
          description: 'Smallest loss percentage',
          min: 1,
          max: 100,
          required: true
        },
        lossPercentMax: {
          type: 'number',
          label: 'Maximum Loss Percentage',
          description: 'Largest loss percentage',
          min: 1,
          max: 100,
          required: true
        },
        allowDecimals: {
          type: 'boolean',
          label: 'Allow Decimals',
          description: 'Allow decimal values in calculations'
        },
        showSteps: {
          type: 'boolean',
          label: 'Show Calculation Steps',
          description: 'Show step-by-step calculations'
        },
        includeBreakEven: {
          type: 'boolean',
          label: 'Include Break-Even',
          description: 'Include break-even scenarios (no profit/loss)'
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