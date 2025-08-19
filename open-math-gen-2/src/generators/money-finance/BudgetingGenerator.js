import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Budgeting Generator
 * Generates problems involving budgets, income, expenses, savings, and financial planning
 */
export class BudgetingGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Budgeting',
      description: 'Generate problems involving budgets, income, expenses, savings, and financial planning',
      category: 'money-finance',
      difficulty: 'medium',
      icon: 'account_balance_wallet',
      tags: ['budgeting', 'expenses', 'income', 'savings', 'financial-planning', 'money-management'],
      gradeLevel: '4-12',
      estimatedTime: '90 seconds',
      exampleProblem: {
        question: 'Sarah earns $500 per month. She spends $200 on rent, $100 on food, and $50 on utilities. How much can she save?',
        questionLaTeX: '\\text{Sarah earns } \\$500 \\text{ per month. She spends } \\$200 \\text{ on rent, } \\$100 \\text{ on food, and } \\$50 \\text{ on utilities. How much can she save?}',
        answer: '$150',
        answerLaTeX: '\\$150'
      },
      
      defaultParameters: {
        problemCount: 10,
        includeSavingsCalculation: true,
        includePercentageOfIncome: true,
        includeBudgetAllocation: true,
        includeCompareBudgets: false,
        includeDeficitSurplus: true,
        includeWordProblems: true,
        incomeMin: 500,
        incomeMax: 5000,
        expenseCategories: 4,
        allowDeficit: false,
        showSteps: true,
        usePercentages: true,
        includeMonthlyBudgets: true,
        includeWeeklyBudgets: false
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
                description: 'How many budgeting problems to generate',
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
            description: 'Choose which budgeting concepts to include',
            icon: 'account_balance_wallet',
            color: 'green',
            order: 2,
            parameters: {
              includeSavingsCalculation: schemaV2.createParameter({
                type: 'boolean',
                label: 'Savings Calculation',
                description: 'Calculate savings from income minus expenses',
                helpText: 'Examples: Income $3000, expenses $2200, savings = $800',
                order: 1
              }),
              includePercentageOfIncome: schemaV2.createParameter({
                type: 'boolean',
                label: 'Percentage of Income',
                description: 'Calculate what percentage expenses are of income',
                helpText: 'Examples: $400 rent on $2000 income = 20%',
                order: 2
              }),
              includeBudgetAllocation: schemaV2.createParameter({
                type: 'boolean',
                label: 'Budget Allocation',
                description: 'Allocate income to savings and expenses',
                helpText: 'Examples: Save 20% of income, how much left for expenses?',
                order: 3
              }),
              includeCompareBudgets: schemaV2.createParameter({
                type: 'boolean',
                label: 'Budget Comparison',
                description: 'Compare different budget scenarios',
                helpText: 'Examples: Which budget saves more money?',
                order: 4
              }),
              includeDeficitSurplus: schemaV2.createParameter({
                type: 'boolean',
                label: 'Deficit/Surplus Analysis',
                description: 'Identify budget surplus or deficit',
                helpText: 'Examples: Income $2000, expenses $2300 = $300 deficit',
                order: 5
              })
            }
          }),
          
          incomeRanges: schemaV2.createCategory({
            id: 'incomeRanges',
            label: 'Income Ranges',
            description: 'Control the range of income amounts',
            icon: 'paid',
            color: 'purple',
            order: 3,
            parameters: {
              incomeMin: schemaV2.createParameter({
                type: 'number',
                label: 'Minimum Income',
                description: 'Lowest income amount per period (monthly/weekly)',
                min: 100,
                max: 50000,
                required: true,
                slider: true,
                presets: [500, 1000, 2000, 3000],
                helpText: 'Lower bound for income in problems',
                order: 1
              }),
              incomeMax: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Income',
                description: 'Highest income amount per period (monthly/weekly)',
                min: 100,
                max: 100000,
                required: true,
                slider: true,
                presets: [3000, 5000, 8000, 10000],
                helpText: 'Upper bound for income in problems',
                order: 2
              })
            }
          }),
          
          budgetComplexity: schemaV2.createCategory({
            id: 'budgetComplexity',
            label: 'Budget Complexity',
            description: 'Control the complexity of budget scenarios',
            icon: 'tune',
            color: 'orange',
            order: 4,
            parameters: {
              expenseCategories: schemaV2.createParameter({
                type: 'number',
                label: 'Number of Expense Categories',
                description: 'How many expense categories to include in problems',
                min: 2,
                max: 8,
                required: true,
                slider: true,
                presets: [3, 4, 5, 6],
                helpText: 'Examples: rent, food, utilities, transportation',
                order: 1
              }),
              allowDeficit: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Budget Deficit',
                description: 'Allow scenarios where expenses exceed income',
                helpText: 'Creates problems with negative savings (overspending)',
                order: 2
              }),
              usePercentages: schemaV2.createParameter({
                type: 'boolean',
                label: 'Use Percentage Allocations',
                description: 'Include percentage-based budget allocations',
                helpText: 'Examples: Save 15% of income, spend 30% on rent',
                order: 3
              })
            }
          }),
          
          timePeriods: schemaV2.createCategory({
            id: 'timePeriods',
            label: 'Time Periods',
            description: 'Choose budget time periods to include',
            icon: 'calendar_month',
            color: 'teal',
            order: 5,
            parameters: {
              includeMonthlyBudgets: schemaV2.createParameter({
                type: 'boolean',
                label: 'Monthly Budgets',
                description: 'Include monthly budget problems',
                helpText: 'Monthly income and expense scenarios',
                order: 1
              }),
              includeWeeklyBudgets: schemaV2.createParameter({
                type: 'boolean',
                label: 'Weekly Budgets',
                description: 'Include weekly budget problems',
                helpText: 'Weekly income and expense scenarios',
                order: 2
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
                description: 'Include real-world budgeting scenarios with context',
                helpText: 'Examples: Sarah\'s monthly budget, Mike\'s savings plan',
                order: 1
              }),
              showSteps: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Calculation Steps',
                description: 'Display step-by-step budget calculations',
                helpText: 'Shows intermediate steps in problem solving',
                order: 2
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'basic-budgeting',
            label: 'Basic Budgeting',
            description: 'Simple income, expenses, and savings calculations',
            icon: 'looks_one',
            category: 'difficulty',
            values: {
              problemCount: 10,
              includeSavingsCalculation: true,
              includePercentageOfIncome: false,
              includeBudgetAllocation: true,
              includeCompareBudgets: false,
              includeDeficitSurplus: false,
              includeWordProblems: true,
              incomeMin: 1000,
              incomeMax: 3000,
              expenseCategories: 3,
              allowDeficit: false,
              showSteps: true,
              usePercentages: false,
              includeMonthlyBudgets: true,
              includeWeeklyBudgets: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'percentage-budgeting',
            label: 'Percentage Budgeting',
            description: 'Focus on percentage-based budget planning',
            icon: 'percent',
            category: 'scope',
            values: {
              problemCount: 12,
              includeSavingsCalculation: false,
              includePercentageOfIncome: true,
              includeBudgetAllocation: true,
              includeCompareBudgets: false,
              includeDeficitSurplus: false,
              includeWordProblems: true,
              incomeMin: 1500,
              incomeMax: 4000,
              expenseCategories: 4,
              allowDeficit: false,
              showSteps: true,
              usePercentages: true,
              includeMonthlyBudgets: true,
              includeWeeklyBudgets: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'budget-analysis',
            label: 'Budget Analysis',
            description: 'Analyze and compare different budget scenarios',
            icon: 'analytics',
            category: 'scope',
            values: {
              problemCount: 10,
              includeSavingsCalculation: true,
              includePercentageOfIncome: true,
              includeBudgetAllocation: false,
              includeCompareBudgets: true,
              includeDeficitSurplus: true,
              includeWordProblems: true,
              incomeMin: 2000,
              incomeMax: 6000,
              expenseCategories: 5,
              allowDeficit: true,
              showSteps: true,
              usePercentages: true,
              includeMonthlyBudgets: true,
              includeWeeklyBudgets: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'complex-budgeting',
            label: 'Complex Budgeting',
            description: 'Advanced budgeting with multiple categories and scenarios',
            icon: 'trending_up',
            category: 'difficulty',
            values: {
              problemCount: 8,
              includeSavingsCalculation: true,
              includePercentageOfIncome: true,
              includeBudgetAllocation: true,
              includeCompareBudgets: true,
              includeDeficitSurplus: true,
              includeWordProblems: true,
              incomeMin: 3000,
              incomeMax: 8000,
              expenseCategories: 7,
              allowDeficit: true,
              showSteps: true,
              usePercentages: true,
              includeMonthlyBudgets: true,
              includeWeeklyBudgets: true
            }
          }),
          
          schemaV2.createPreset({
            id: 'financial-planning',
            label: 'Financial Planning',
            description: 'Real-world financial planning scenarios',
            icon: 'business',
            category: 'scope',
            values: {
              problemCount: 12,
              includeSavingsCalculation: true,
              includePercentageOfIncome: true,
              includeBudgetAllocation: true,
              includeCompareBudgets: false,
              includeDeficitSurplus: true,
              includeWordProblems: true,
              incomeMin: 2500,
              incomeMax: 7000,
              expenseCategories: 6,
              allowDeficit: false,
              showSteps: false,
              usePercentages: true,
              includeMonthlyBudgets: true,
              includeWeeklyBudgets: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive-budgeting',
            label: 'Comprehensive Budgeting',
            description: 'Complete practice with all budgeting concepts',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 15,
              includeSavingsCalculation: true,
              includePercentageOfIncome: true,
              includeBudgetAllocation: true,
              includeCompareBudgets: true,
              includeDeficitSurplus: true,
              includeWordProblems: true,
              incomeMin: 1000,
              incomeMax: 10000,
              expenseCategories: 6,
              allowDeficit: true,
              showSteps: true,
              usePercentages: true,
              includeMonthlyBudgets: true,
              includeWeeklyBudgets: true
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
    if (!params.includeSavingsCalculation && !params.includePercentageOfIncome && !params.includeBudgetAllocation && !params.includeCompareBudgets && !params.includeDeficitSurplus) {
      customErrors.push('At least one problem type must be enabled')
    }
    if (params.incomeMin > params.incomeMax) {
      customErrors.push('Minimum Income cannot be greater than Maximum Income')
    }
    if (!params.includeMonthlyBudgets && !params.includeWeeklyBudgets) {
      customErrors.push('At least one time period (monthly or weekly) must be enabled')
    }
    if (customErrors.length > 0) {
      throw new Error(`Invalid parameters: ${customErrors.join(', ')}`)
    }
    
    // Build array of enabled problem types
    const enabledTypes = []
    if (params.includeSavingsCalculation) enabledTypes.push('savings-calculation')
    if (params.includePercentageOfIncome) enabledTypes.push('percentage-of-income')
    if (params.includeBudgetAllocation) enabledTypes.push('budget-allocation')
    if (params.includeCompareBudgets) enabledTypes.push('compare-budgets')
    if (params.includeDeficitSurplus) enabledTypes.push('deficit-surplus')
    
    if (enabledTypes.length === 0) {
      throw new Error('At least one problem type must be enabled')
    }
    
    const problemType = this.getRandomElement(enabledTypes)
    
    if (params.includeWordProblems && Math.random() < 0.8) {
      return this.generateWordProblem(problemType, params)
    } else {
      return this.generateBasicProblem(problemType, params)
    }
  }

  generateBasicProblem(type, params) {
    const budgetData = this.generateBudgetData(params)
    
    switch (type) {
      case 'savings-calculation':
        return this.generateSavingsCalculationProblem(budgetData, params)
      case 'percentage-of-income':
        return this.generatePercentageOfIncomeProblem(budgetData, params)
      case 'budget-allocation':
        return this.generateBudgetAllocationProblem(budgetData, params)
      case 'compare-budgets':
        return this.generateCompareBudgetsProblem(budgetData, params)
      case 'deficit-surplus':
        return this.generateDeficitSurplusProblem(budgetData, params)
      default:
        return this.generateSavingsCalculationProblem(budgetData, params)
    }
  }

  generateSavingsCalculationProblem(budgetData, params) {
    const { income, expenses, totalExpenses, savings, period } = budgetData
    
    const expenseList = expenses.map(e => `$${e.amount.toFixed(2)} on ${e.category}`).join(', ')
    
    const expenseListLaTeX = expenses.map((e, index) => {
      const expenseText = `\\$${e.amount.toFixed(2)} \\text{ on ${e.category}}`
      // Add line break after every second item (index 1, 3, 5, etc.)
      if ((index + 1) % 2 === 0 && index < expenses.length - 1) {
        return expenseText + ',} \\\\\\\\ \\text{'
      } else if (index < expenses.length - 1) {
        return expenseText + ', '
      } else {
        return expenseText
      }
    }).join('')
    
    const questionText = `Monthly income is $${income.toFixed(2)}. Expenses are: ${expenseList}. How much can be saved?`
    const questionLaTeX = `\\text{Monthly income is } \\$${income.toFixed(2)}\\text{.} \\\\\\\\ \\text{Expenses are: ${expenseListLaTeX}.} \\\\\\\\ \\text{How much can be saved?}`
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Income: } \\$${income.toFixed(2)}`)
      steps.push(`\\text{Total Expenses: } ${expenses.map(e => `\\$${e.amount.toFixed(2)}`).join(' + ')} = \\$${totalExpenses.toFixed(2)}`)
      steps.push(`\\text{Savings: } \\$${income.toFixed(2)} - \\$${totalExpenses.toFixed(2)} = \\$${savings.toFixed(2)}`)
    }
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `$${savings.toFixed(2)}`,
      answerLaTeX: `\\$${savings.toFixed(2)}`,
      steps: steps,
      metadata: {
        operation: 'budgeting-savings-calculation',
        income: income,
        totalExpenses: totalExpenses,
        savings: savings,
        period: period,
        difficulty: this.difficulty,
        estimatedTime: '60 seconds'
      }
    }
  }

  generatePercentageOfIncomeProblem(budgetData, params) {
    const { income, expenses } = budgetData
    const selectedExpense = this.getRandomElement(expenses)
    const percentage = (selectedExpense.amount / income) * 100
    
    const questionText = `If monthly income is $${income.toFixed(2)} and ${selectedExpense.category} costs $${selectedExpense.amount.toFixed(2)}, what percentage of income is spent on ${selectedExpense.category}?`
    const questionLaTeX = `\\text{If monthly income is } \\$${income.toFixed(2)} \\\\\\\\ \\text{and ${selectedExpense.category} costs } \\$${selectedExpense.amount.toFixed(2)} \\text{,} \\\\\\\\  \\text{what percentage of income is spent} \\\\\\\\ \\text{on ${selectedExpense.category}?}`
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Income: } \\$${income.toFixed(2)}`)
      steps.push(`\\text{${selectedExpense.category} expense: } \\$${selectedExpense.amount.toFixed(2)}`)
      steps.push(`\\text{Percentage: } \\frac{\\$${selectedExpense.amount.toFixed(2)}}{\\$${income.toFixed(2)}} \\times 100\\% = ${percentage.toFixed(1)}\\%`)
    }
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `${percentage.toFixed(1)}%`,
      answerLaTeX: `${percentage.toFixed(1)}\\%`,
      steps: steps,
      metadata: {
        operation: 'budgeting-percentage-of-income',
        income: income,
        expense: selectedExpense,
        percentage: percentage,
        difficulty: this.difficulty,
        estimatedTime: '75 seconds'
      }
    }
  }

  generateBudgetAllocationProblem(budgetData, params) {
    const { income } = budgetData
    const savingsPercent = Math.floor(Math.random() * 20) + 10 // 10-30% for savings
    const savingsAmount = (income * savingsPercent) / 100
    const remainingForExpenses = income - savingsAmount
    
    const questionText = `A person earns $${income.toFixed(2)} per month and wants to save ${savingsPercent}% of their income. How much money is left for expenses?`
    const questionLaTeX = `\\text{A person earns } \\$${income.toFixed(2)} \\text{ per month} \\\\\\\\ \\text{and wants to save } ${savingsPercent}\\% \\text{ of their income.} \\\\\\\\ \\text{How much money is left for expenses?}`
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Monthly income: } \\$${income.toFixed(2)}`)
      steps.push(`\\text{Savings: } ${savingsPercent}\\% \\times \\$${income.toFixed(2)} = \\$${savingsAmount.toFixed(2)}`)
      steps.push(`\\text{Left for expenses: } \\$${income.toFixed(2)} - \\$${savingsAmount.toFixed(2)} = \\$${remainingForExpenses.toFixed(2)}`)
    }
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `$${remainingForExpenses.toFixed(2)}`,
      answerLaTeX: `\\$${remainingForExpenses.toFixed(2)}`,
      steps: steps,
      metadata: {
        operation: 'budgeting-allocation',
        income: income,
        savingsPercent: savingsPercent,
        savingsAmount: savingsAmount,
        remainingForExpenses: remainingForExpenses,
        difficulty: this.difficulty,
        estimatedTime: '75 seconds'
      }
    }
  }

  generateCompareBudgetsProblem(budgetData, params) {
    const budget1 = budgetData
    const budget2 = this.generateBudgetData(params)
    
    const savings1 = budget1.savings
    const savings2 = budget2.savings
    const difference = Math.abs(savings1 - savings2)
    const betterBudget = savings1 > savings2 ? 'Budget 1' : 'Budget 2'
    
    const questionText = `Budget 1: Income $${budget1.income.toFixed(2)}, Expenses $${budget1.totalExpenses.toFixed(2)}. Budget 2: Income $${budget2.income.toFixed(2)}, Expenses $${budget2.totalExpenses.toFixed(2)}. Which budget saves more money and by how much?`
    const questionLaTeX = `\\text{Budget 1: Income } \\$${budget1.income.toFixed(2)}\\text{, Expenses } \\$${budget1.totalExpenses.toFixed(2)}\\text{. Budget 2: Income } \\$${budget2.income.toFixed(2)}\\text{, Expenses } \\$${budget2.totalExpenses.toFixed(2)}\\text{. Which budget saves more money and by how much?}`
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Budget 1 savings: } \\$${budget1.income.toFixed(2)} - \\$${budget1.totalExpenses.toFixed(2)} = \\$${savings1.toFixed(2)}`)
      steps.push(`\\text{Budget 2 savings: } \\$${budget2.income.toFixed(2)} - \\$${budget2.totalExpenses.toFixed(2)} = \\$${savings2.toFixed(2)}`)
      steps.push(`\\text{${betterBudget} saves more by: } \\$${difference.toFixed(2)}`)
    }
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `${betterBudget} saves $${difference.toFixed(2)} more`,
      answerLaTeX: `\\text{${betterBudget} saves } \\$${difference.toFixed(2)} \\text{ more}`,
      steps: steps,
      metadata: {
        operation: 'budgeting-comparison',
        budget1: budget1,
        budget2: budget2,
        betterBudget: betterBudget,
        difference: difference,
        difficulty: this.difficulty,
        estimatedTime: '120 seconds'
      }
    }
  }

  generateDeficitSurplusProblem(budgetData, params) {
    let { income, totalExpenses, savings } = budgetData
    
    // Force a deficit scenario if allowed and random choice
    if (params.allowDeficit && Math.random() < 0.4) {
      totalExpenses = income + Math.random() * 200 + 50 // Create deficit
      savings = income - totalExpenses // Will be negative
    }
    
    const isDeficit = savings < 0
    const amount = Math.abs(savings)
    const status = isDeficit ? 'deficit' : 'surplus'
    
    const questionText = `A budget has income of $${income.toFixed(2)} and expenses of $${totalExpenses.toFixed(2)}. Is this a surplus or deficit, and by how much?`
    const questionLaTeX = `\\text{A budget has income of } \\$${income.toFixed(2)} \\text{ and expenses of } \\$${totalExpenses.toFixed(2)}\\text{.} \\\\\\\\ \\text{Is this a surplus or deficit, and by how much?}`
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Income: } \\$${income.toFixed(2)}`)
      steps.push(`\\text{Expenses: } \\$${totalExpenses.toFixed(2)}`)
      steps.push(`\\text{Difference: } \\$${income.toFixed(2)} - \\$${totalExpenses.toFixed(2)} = \\$${savings.toFixed(2)}`)
      steps.push(`\\text{Result: } ${status} \\text{ of } \\$${amount.toFixed(2)}`)
    }
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `${status} of $${amount.toFixed(2)}`,
      answerLaTeX: `\\text{${status} of } \\$${amount.toFixed(2)}`,
      steps: steps,
      metadata: {
        operation: 'budgeting-deficit-surplus',
        income: income,
        totalExpenses: totalExpenses,
        status: status,
        amount: amount,
        difficulty: this.difficulty,
        estimatedTime: '60 seconds'
      }
    }
  }

  generateWordProblem(type, params) {
    const budgetData = this.generateBudgetData(params)
    const names = ['Sarah', 'Mike', 'Emma', 'John', 'Lisa', 'Alex', 'Maria', 'David']
    const name = this.getRandomElement(names)
    
    const scenarios = this.getWordProblemScenarios(type, budgetData, name, params)
    const scenario = this.getRandomElement(scenarios)
    
    // Generate answer and steps based on problem type
    let answer, answerLaTeX, steps
    
    switch (type) {
      case 'savings-calculation':
        answer = `$${budgetData.savings.toFixed(2)}`
        answerLaTeX = `\\$${budgetData.savings.toFixed(2)}`
        steps = this.generateSavingsSteps(budgetData, params)
        break
      case 'percentage-of-income':
        const selectedExpense = this.getRandomElement(budgetData.expenses)
        const percentage = (selectedExpense.amount / budgetData.income) * 100
        answer = `${percentage.toFixed(1)}%`
        answerLaTeX = `${percentage.toFixed(1)}\\%`
        steps = this.generatePercentageSteps(budgetData.income, selectedExpense, percentage, params)
        break
      case 'budget-allocation':
        const savingsPercent = Math.floor(Math.random() * 20) + 10
        const savingsAmount = (budgetData.income * savingsPercent) / 100
        const remaining = budgetData.income - savingsAmount
        answer = `$${remaining.toFixed(2)}`
        answerLaTeX = `\\$${remaining.toFixed(2)}`
        steps = this.generateAllocationSteps(budgetData.income, savingsPercent, savingsAmount, remaining, params)
        break
      case 'deficit-surplus':
        const isDeficit = budgetData.savings < 0
        const amount = Math.abs(budgetData.savings)
        const status = isDeficit ? 'deficit' : 'surplus'
        answer = `${status} of $${amount.toFixed(2)}`
        answerLaTeX = `\\text{${status} of } \\$${amount.toFixed(2)}`
        steps = this.generateDeficitSurplusSteps(budgetData, status, amount, params)
        break
      default:
        answer = `$${budgetData.savings.toFixed(2)}`
        answerLaTeX = `\\$${budgetData.savings.toFixed(2)}`
        steps = this.generateSavingsSteps(budgetData, params)
    }
    
    return {
      question: scenario.question,
      questionLaTeX: scenario.questionLaTeX,
      answer: answer,
      answerLaTeX: answerLaTeX,
      steps: steps,
      metadata: {
        operation: `budgeting-${type}-word`,
        scenario: scenario.type,
        name: name,
        budgetData: budgetData,
        difficulty: this.difficulty,
        estimatedTime: '120 seconds'
      }
    }
  }

  getWordProblemScenarios(type, budgetData, name, params) {
    const { income, expenses, totalExpenses } = budgetData
    const scenarios = []
    
    switch (type) {
      case 'savings-calculation':
        const expenseList = expenses.map(e => `$${e.amount.toFixed(2)} on ${e.category}`).join(', ')
        const expenseListLaTeX = expenses.map((e, index) => {
          const expenseText = `\\$${e.amount.toFixed(2)} \\text{ on ${e.category}}`
          // Add line break after every second item (index 1, 3, 5, etc.)
          if ((index + 1) % 2 === 0 && index < expenses.length - 1) {
            return expenseText + ',} \\\\\\\\ \\text{'
          } else if (index < expenses.length - 1) {
            return expenseText + ', '
          } else {
            return expenseText
          }
        }).join('')
        scenarios.push({
          question: `${name} earns $${income.toFixed(2)} per month. Their expenses are: ${expenseList}.\\n\\nHow much can ${name} save each month?`,
          questionLaTeX: `\\text{${name} earns } \\$${income.toFixed(2)} \\text{ per month.} \\\\\\\\ \\text{Their expenses are: ${expenseListLaTeX}.} \\\\\\\\ \\text{How much can ${name} save each month?}`,
          type: 'personal-budgeting'
        })
        break
        
      case 'percentage-of-income':
        const expense = this.getRandomElement(expenses)
        scenarios.push({
          question: `${name} has a monthly income of $${income.toFixed(2)} and spends $${expense.amount.toFixed(2)} on ${expense.category}.\\n\\nWhat percentage of their income goes to ${expense.category}?`,
          questionLaTeX: `\\text{${name} has a monthly income of } \\$${income.toFixed(2)} \\\\\\\\ \\text{and spends } \\$${expense.amount.toFixed(2)} \\text{ on ${expense.category}.} \\\\\\\\ \\text{What percentage of their income goes to ${expense.category}?}`,
          type: 'expense-analysis'
        })
        break
        
      case 'budget-allocation':
        const savingsPercent = Math.floor(Math.random() * 20) + 10
        scenarios.push({
          question: `${name} earns $${income.toFixed(2)} monthly and wants to save ${savingsPercent}% for emergencies.\\n\\nHow much money will be left for other expenses?`,
          questionLaTeX: `\\text{${name} earns } \\$${income.toFixed(2)} \\text{ monthly} \\\\\\\\ \\text{and wants to save } ${savingsPercent}\\% \\text{ for emergencies.} \\\\\\\\ \\text{How much money will be left for other expenses?}`,
          type: 'financial-planning'
        })
        break
        
      case 'deficit-surplus':
        scenarios.push({
          question: `${name}'s monthly income is $${income.toFixed(2)} and total expenses are $${totalExpenses.toFixed(2)}.\\n\\nDoes ${name} have a budget surplus or deficit, and by how much?`,
          questionLaTeX: `\\text{${name}'s monthly income is } \\$${income.toFixed(2)} \\\\\\\\ \\text{and total expenses are } \\$${totalExpenses.toFixed(2)}\\text{.} \\\\\\\\ \\text{Does ${name} have a budget surplus or deficit,} \\\\\\\\ \\text{and by how much?}`,
          type: 'budget-analysis'
        })
        break
        
      case 'compare-budgets':
        const budget2 = this.generateBudgetData(params)
        scenarios.push({
          question: `${name} has two budget options. Option A: Income $${income.toFixed(2)}, Expenses $${totalExpenses.toFixed(2)}. Option B: Income $${budget2.income.toFixed(2)}, Expenses $${budget2.totalExpenses.toFixed(2)}.\\n\\nWhich option allows more savings and by how much?`,
          questionLaTeX: `\\text{${name} has two budget options.} \\\\\\\\ \\text{Option A: Income } \\$${income.toFixed(2)}\\text{,} \\\\\\\\ \\text{Expenses } \\$${totalExpenses.toFixed(2)}\\text{.} \\\\\\\\ \\text{Option B: Income } \\$${budget2.income.toFixed(2)}\\text{,} \\\\\\\\ \\text{Expenses } \\$${budget2.totalExpenses.toFixed(2)}\\text{.} \\\\\\\\ \\text{Which option allows more savings} \\\\\\\\ \\text{and by how much?}`,
          type: 'budget-comparison'
        })
        break
    }
    
    return scenarios
  }

  generateBudgetData(params) {
    const period = this.getRandomElement(['monthly', 'weekly'])
    const income = this.generateIncome(params, period)
    
    const expenseCategories = this.getExpenseCategories()
    const selectedCategories = this.shuffleArray(expenseCategories).slice(0, params.expenseCategories)
    
    const expenses = selectedCategories.map(category => ({
      category: category,
      amount: this.generateExpenseAmount(income, category, params)
    }))
    
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
    
    // Ensure we don't create deficit unless allowed
    if (!params.allowDeficit && totalExpenses >= income) {
      const adjustment = (totalExpenses - income + 50) / expenses.length
      expenses.forEach(expense => {
        expense.amount = Math.max(expense.amount - adjustment, 20)
      })
      // Recalculate total expenses
      const newTotalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
      expenses.forEach(expense => {
        expense.amount = Math.round(expense.amount * 100) / 100
      })
    }
    
    const finalTotalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
    const savings = income - finalTotalExpenses
    
    return {
      income: Math.round(income * 100) / 100,
      expenses: expenses,
      totalExpenses: Math.round(finalTotalExpenses * 100) / 100,
      savings: Math.round(savings * 100) / 100,
      period: period
    }
  }

  generateIncome(params, period) {
    const base = params.incomeMin + Math.random() * (params.incomeMax - params.incomeMin)
    return period === 'weekly' ? base / 4 : base
  }

  getExpenseCategories() {
    return [
      'rent', 'food', 'utilities', 'transportation', 'healthcare', 
      'entertainment', 'clothing', 'insurance', 'savings', 'miscellaneous',
      'education', 'phone', 'internet', 'groceries'
    ]
  }

  generateExpenseAmount(income, category, params) {
    // Different categories have different typical percentages of income
    const categoryPercentages = {
      'rent': [25, 35],
      'food': [10, 15],
      'groceries': [8, 12],
      'utilities': [5, 10],
      'transportation': [10, 20],
      'healthcare': [5, 15],
      'entertainment': [5, 10],
      'clothing': [2, 8],
      'insurance': [3, 8],
      'savings': [10, 20],
      'miscellaneous': [3, 10],
      'education': [5, 15],
      'phone': [2, 5],
      'internet': [1, 3]
    }
    
    const range = categoryPercentages[category] || [5, 15]
    const percentage = range[0] + Math.random() * (range[1] - range[0])
    
    return (income * percentage) / 100
  }

  generateSavingsSteps(budgetData, params) {
    if (!params.showSteps) return [`\\text{Savings: } \\$${budgetData.savings.toFixed(2)}`]
    
    return [
      `\\text{Income: } \\$${budgetData.income.toFixed(2)}`,
      `\\text{Total Expenses: } \\$${budgetData.totalExpenses.toFixed(2)}`,
      `\\text{Savings: } \\$${budgetData.income.toFixed(2)} - \\$${budgetData.totalExpenses.toFixed(2)} = \\$${budgetData.savings.toFixed(2)}`
    ]
  }

  generatePercentageSteps(income, expense, percentage, params) {
    if (!params.showSteps) return [`\\text{Percentage: } ${percentage.toFixed(1)}\\%`]
    
    return [
      `\\text{Income: } \\$${income.toFixed(2)}`,
      `\\text{${expense.category} expense: } \\$${expense.amount.toFixed(2)}`,
      `\\text{Percentage: } \\frac{\\$${expense.amount.toFixed(2)}}{\\$${income.toFixed(2)}} \\times 100\\% = ${percentage.toFixed(1)}\\%`
    ]
  }

  generateAllocationSteps(income, savingsPercent, savingsAmount, remaining, params) {
    if (!params.showSteps) return [`\\text{Remaining for expenses: } \\$${remaining.toFixed(2)}`]
    
    return [
      `\\text{Income: } \\$${income.toFixed(2)}`,
      `\\text{Savings: } ${savingsPercent}\\% \\times \\$${income.toFixed(2)} = \\$${savingsAmount.toFixed(2)}`,
      `\\text{Remaining: } \\$${income.toFixed(2)} - \\$${savingsAmount.toFixed(2)} = \\$${remaining.toFixed(2)}`
    ]
  }

  generateDeficitSurplusSteps(budgetData, status, amount, params) {
    if (!params.showSteps) return [`\\text{${status}: } \\$${amount.toFixed(2)}`]
    
    return [
      `\\text{Income: } \\$${budgetData.income.toFixed(2)}`,
      `\\text{Expenses: } \\$${budgetData.totalExpenses.toFixed(2)}`,
      `\\text{Difference: } \\$${budgetData.income.toFixed(2)} - \\$${budgetData.totalExpenses.toFixed(2)} = \\$${budgetData.savings.toFixed(2)}`,
      `\\text{Result: } ${status} \\text{ of } \\$${amount.toFixed(2)}`
    ]
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

export default BudgetingGenerator