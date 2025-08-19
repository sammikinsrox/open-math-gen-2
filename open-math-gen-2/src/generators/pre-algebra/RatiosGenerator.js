import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Ratios Generator
 * 
 * Generates problems involving ratios, rates, unit rates, and ratio applications.
 * Includes simplifying ratios and real-world ratio problems.
 */
export class RatiosGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Ratios',
      description: 'Ratio relationships, unit rates, and ratio applications with real-world contexts',
      category: 'pre-algebra',
      difficulty: 'medium',
      icon: 'compare',
      tags: ['ratios', 'rates', 'unit rates', 'proportional reasoning'],
      gradeLevel: '6-8',
      estimatedTime: '50 seconds',
      exampleProblem: {
        question: 'Simplify the ratio 12:18',
        questionLaTeX: '\\text{Simplify the ratio } 12:18',
        answer: '2:3',
        answerLaTeX: '2:3'
      },
      
      // Default parameter values
      defaultParameters: {
        problemCount: 10,
        includeSimplifying: true,
        includeUnitRates: true,
        includeComparingRatios: true,
        includeWordProblems: true,
        includeRateTables: false,
        maxValue: 50,
        allowDecimals: false,
        showSteps: true,
        complexityLevel: 'basic'
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
                description: 'How many ratio problems to generate',
                min: 1,
                max: 50,
                required: true,
                slider: true,
                presets: [5, 8, 10, 15],
                order: 1
              }),
              complexityLevel: schemaV2.createParameter({
                type: 'select',
                label: 'Complexity Level',
                description: 'Determines the difficulty of ratios',
                variant: 'cards',
                options: [
                  { 
                    value: 'basic', 
                    label: 'Basic',
                    description: 'Simple whole number ratios'
                  },
                  { 
                    value: 'intermediate', 
                    label: 'Intermediate',
                    description: 'Larger numbers and more complex ratios'
                  },
                  { 
                    value: 'advanced', 
                    label: 'Advanced',
                    description: 'Includes decimals and complex applications'
                  }
                ],
                order: 2
              })
            }
          }),
          
          problemTypes: schemaV2.createCategory({
            id: 'problemTypes',
            label: 'Problem Types',
            description: 'Choose which types of ratio problems to include',
            icon: 'compare',
            color: 'green',
            order: 2,
            parameters: {
              includeSimplifying: schemaV2.createParameter({
                type: 'boolean',
                label: 'Simplifying Ratios',
                description: 'Reduce ratios to lowest terms',
                helpText: 'Examples: 12:18 = 2:3',
                order: 1
              }),
              includeUnitRates: schemaV2.createParameter({
                type: 'boolean',
                label: 'Unit Rates',
                description: 'Find rates per single unit',
                helpText: 'Examples: $15 for 3 items = $5 per item',
                order: 2
              }),
              includeComparingRatios: schemaV2.createParameter({
                type: 'boolean',
                label: 'Comparing Ratios',
                description: 'Compare two ratios to see which is greater',
                helpText: 'Examples: Is 3:4 or 5:7 greater?',
                order: 3
              }),
              includeRateTables: schemaV2.createParameter({
                type: 'boolean',
                label: 'Rate Tables',
                description: 'Complete tables showing equivalent ratios',
                helpText: 'Fill in missing values in ratio tables',
                order: 4
              })
            }
          }),
          
          numberSettings: schemaV2.createCategory({
            id: 'numberSettings',
            label: 'Number Settings',
            description: 'Configure the types and ranges of numbers used',
            icon: 'tag',
            color: 'orange',
            order: 3,
            parameters: {
              maxValue: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Value',
                description: 'Largest number to use in ratios',
                min: 10,
                max: 100,
                required: true,
                slider: true,
                presets: [20, 30, 50, 80],
                order: 1
              }),
              allowDecimals: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Decimals',
                description: 'Include decimal values in ratios',
                helpText: 'Examples: 2.5:4, 3:1.5',
                order: 2
              })
            }
          }),
          
          presentation: schemaV2.createCategory({
            id: 'presentation',
            label: 'Presentation & Format',
            description: 'Control how problems are displayed',
            icon: 'palette',
            color: 'teal',
            order: 4,
            parameters: {
              includeWordProblems: schemaV2.createParameter({
                type: 'boolean',
                label: 'Include Word Problems',
                description: 'Include real-world ratio applications',
                helpText: 'Recipe scaling, speed problems, etc.',
                order: 1
              }),
              showSteps: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Solution Steps',
                description: 'Include step-by-step solving process',
                helpText: 'Shows GCD calculation and simplification',
                order: 2
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'basic-ratios',
            label: 'Basic Ratios',
            description: 'Simple ratio simplification',
            icon: 'looks_one',
            category: 'difficulty',
            values: {
              problemCount: 10,
              includeSimplifying: true,
              includeUnitRates: false,
              includeComparingRatios: false,
              includeWordProblems: false,
              includeRateTables: false,
              maxValue: 30,
              allowDecimals: false,
              showSteps: true,
              complexityLevel: 'basic'
            }
          }),
          
          schemaV2.createPreset({
            id: 'unit-rates-focus',
            label: 'Unit Rates Focus',
            description: 'Emphasis on finding unit rates',
            icon: 'speed',
            category: 'scope',
            values: {
              problemCount: 12,
              includeSimplifying: false,
              includeUnitRates: true,
              includeComparingRatios: true,
              includeWordProblems: true,
              includeRateTables: false,
              maxValue: 50,
              allowDecimals: false,
              showSteps: true,
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'comparing-ratios',
            label: 'Comparing Ratios',
            description: 'Practice comparing and ordering ratios',
            icon: 'compare_arrows',
            category: 'scope',
            values: {
              problemCount: 10,
              includeSimplifying: true,
              includeUnitRates: false,
              includeComparingRatios: true,
              includeWordProblems: false,
              includeRateTables: true,
              maxValue: 40,
              allowDecimals: false,
              showSteps: true,
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'real-world-ratios',
            label: 'Real-World Applications',
            description: 'Focus on word problems and applications',
            icon: 'business',
            category: 'scope',
            values: {
              problemCount: 8,
              includeSimplifying: false,
              includeUnitRates: true,
              includeComparingRatios: false,
              includeWordProblems: true,
              includeRateTables: false,
              maxValue: 60,
              allowDecimals: true,
              showSteps: true,
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive-ratios',
            label: 'Comprehensive Practice',
            description: 'Complete practice with all ratio concepts',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 15,
              includeSimplifying: true,
              includeUnitRates: true,
              includeComparingRatios: true,
              includeWordProblems: true,
              includeRateTables: true,
              maxValue: 50,
              allowDecimals: false,
              showSteps: true,
              complexityLevel: 'intermediate'
            }
          })
        ]
      })
    })
  }

  /**
   * Generate a single problem
   * @param {Object} parameters - Generation parameters
   * @returns {Object} Problem object
   */
  generateProblem(parameters = {}) {
    const params = { ...this.defaultParameters, ...parameters }
    
    // Validate parameters using Parameter Schema V2
    const validation = this.parameterSchema.validate(params)
    if (!validation.isValid) {
      throw new Error(`Invalid parameters: ${validation.errors.join(', ')}`)
    }
    
    // Additional custom validation
    const customErrors = []
    if (!params.includeSimplifying && !params.includeUnitRates && 
        !params.includeComparingRatios && !params.includeRateTables) {
      customErrors.push('At least one problem type must be enabled')
    }
    if (customErrors.length > 0) {
      throw new Error(`Invalid parameters: ${customErrors.join(', ')}`)
    }
    
    // Build array of enabled problem types
    const problemTypes = []
    if (params.includeSimplifying) problemTypes.push('simplifying')
    if (params.includeUnitRates) problemTypes.push('unitRates')
    if (params.includeComparingRatios) problemTypes.push('comparing')
    if (params.includeRateTables) problemTypes.push('rateTables')
    
    if (problemTypes.length === 0) {
      throw new Error('At least one problem type must be enabled')
    }
    
    const problemType = this.getRandomElement(problemTypes)
    
    // Determine if this should be a word problem
    if (params.includeWordProblems && ['unitRates', 'comparing'].includes(problemType) && Math.random() < 0.6) {
      return this.generateWordProblem(problemType, params)
    } else {
      return this.generateRatioProblem(problemType, params)
    }
  }

  /**
   * Generate a ratio problem
   * @param {string} problemType - Type of problem
   * @param {Object} params - Generation parameters
   * @returns {Object} Problem object
   */
  generateRatioProblem(problemType, params) {
    switch (problemType) {
      case 'simplifying':
        return this.generateSimplifyingProblem(params)
      case 'unitRates':
        return this.generateUnitRateProblem(params)
      case 'comparing':
        return this.generateComparingProblem(params)
      case 'rateTables':
        return this.generateRateTableProblem(params)
      default:
        return this.generateSimplifyingProblem(params)
    }
  }
  
  generateSimplifyingProblem(params) {
    // Generate two numbers with a common factor
    const gcd = Math.floor(Math.random() * 6) + 2 // GCD between 2-7
    const a = gcd * (Math.floor(Math.random() * 8) + 2) // Ensure meaningful factors
    const b = gcd * (Math.floor(Math.random() * 8) + 2)
    
    const simplifiedA = a / gcd
    const simplifiedB = b / gcd
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Find the GCD of ${a} and ${b}}`)
      steps.push(`\\text{GCD(${a}, ${b}) = ${gcd}}`)
      steps.push(`\\text{Divide both terms by ${gcd}}`)
      steps.push(`\\frac{${a}}{${gcd}} : \\frac{${b}}{${gcd}} = ${simplifiedA}:${simplifiedB}`)
    }
    
    return {
      question: `Simplify the ratio ${a}:${b}`,
      questionLaTeX: `\\text{Simplify the ratio } ${a}:${b}`,
      answer: `${simplifiedA}:${simplifiedB}`,
      answerLaTeX: `${simplifiedA}:${simplifiedB}`,
      steps: steps,
      metadata: {
        problemType: 'simplifying',
        originalRatio: [a, b],
        simplifiedRatio: [simplifiedA, simplifiedB],
        gcd: gcd,
        difficulty: 'medium',
        estimatedTime: '40 seconds'
      }
    }
  }
  
  generateUnitRateProblem(params) {
    const quantity = Math.floor(Math.random() * 8) + 2 // 2-9 items
    const totalCost = quantity * (Math.floor(Math.random() * 10) + 2) // Ensure whole dollar unit rate
    const unitRate = totalCost / quantity
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{To find unit rate, divide total cost by quantity}`)
      steps.push(`\\text{Unit rate} = \\frac{\\$${totalCost}}{${quantity} \\text{ items}}`)
      steps.push(`\\text{Unit rate} = \\$${unitRate} \\text{ per item}`)
    }
    
    return {
      question: `Find the unit rate: $${totalCost} for ${quantity} items`,
      questionLaTeX: `\\text{Find the unit rate: $${totalCost} for ${quantity} items}`,
      answer: `$${unitRate} per item`,
      answerLaTeX: `\\$${unitRate} \\text{ per item}`,
      steps: steps,
      metadata: {
        problemType: 'unitRates',
        totalCost: totalCost,
        quantity: quantity,
        unitRate: unitRate,
        difficulty: 'medium',
        estimatedTime: '35 seconds'
      }
    }
  }
  
  generateComparingProblem(params) {
    // Generate two ratios to compare
    const ratio1A = Math.floor(Math.random() * 12) + 3
    const ratio1B = Math.floor(Math.random() * 12) + 3
    const ratio2A = Math.floor(Math.random() * 12) + 3
    const ratio2B = Math.floor(Math.random() * 12) + 3
    
    const decimal1 = ratio1A / ratio1B
    const decimal2 = ratio2A / ratio2B
    
    let comparison, symbol
    if (decimal1 > decimal2) {
      comparison = 'greater than'
      symbol = '>'
    } else if (decimal1 < decimal2) {
      comparison = 'less than'
      symbol = '<'
    } else {
      comparison = 'equal to'
      symbol = '='
    }
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Convert ratios to decimals for comparison}`)
      steps.push(`${ratio1A}:${ratio1B} = \\frac{${ratio1A}}{${ratio1B}} = ${decimal1.toFixed(3)}`)
      steps.push(`${ratio2A}:${ratio2B} = \\frac{${ratio2A}}{${ratio2B}} = ${decimal2.toFixed(3)}`)
      steps.push(`\\text{Since ${decimal1.toFixed(3)} ${symbol} ${decimal2.toFixed(3)}, we have ${ratio1A}:${ratio1B} ${symbol} ${ratio2A}:${ratio2B}}`)
    }
    
    return {
      question: `Compare the ratios: ${ratio1A}:${ratio1B} _____ ${ratio2A}:${ratio2B}`,
      questionLaTeX: `\\text{Compare the ratios: } ${ratio1A}:${ratio1B} \\square ${ratio2A}:${ratio2B}`,
      answer: symbol,
      answerLaTeX: symbol,
      steps: steps,
      metadata: {
        problemType: 'comparing',
        ratio1: [ratio1A, ratio1B],
        ratio2: [ratio2A, ratio2B],
        decimal1: decimal1,
        decimal2: decimal2,
        comparison: symbol,
        difficulty: 'medium',
        estimatedTime: '45 seconds'
      }
    }
  }
  
  generateRateTableProblem(params) {
    // Create a rate table with one missing value
    const unitRate = Math.floor(Math.random() * 8) + 2
    const quantities = [1, 2, 4, 5].map(q => Math.floor(Math.random() * 3) + q)
    quantities.sort((a, b) => a - b)
    
    const missingIndex = Math.floor(Math.random() * quantities.length)
    const missingQuantity = quantities[missingIndex]
    const missingValue = missingQuantity * unitRate
    
    const tableEntries = quantities.map((q, i) => {
      if (i === missingIndex) {
        return { quantity: q, value: '?', isMissing: true }
      }
      return { quantity: q, value: q * unitRate, isMissing: false }
    })
    
    const steps = []
    if (params.showSteps) {
      const knownEntry = tableEntries.find(e => !e.isMissing)
      const rate = knownEntry.value / knownEntry.quantity
      steps.push(`\\text{Find the rate using a known entry}`)
      steps.push(`\\text{Rate} = \\frac{${knownEntry.value}}{${knownEntry.quantity}} = ${rate}`)
      steps.push(`\\text{Missing value} = ${missingQuantity} \\times ${rate} = ${missingValue}`)
    }
    
    const tableStr = tableEntries.map(e => `${e.quantity} → ${e.value}`).join(', ')
    
    return {
      question: `Complete the rate table: ${tableStr}`,
      questionLaTeX: `\\text{Complete the rate table: } ${tableStr}`,
      answer: missingValue.toString(),
      answerLaTeX: missingValue.toString(),
      steps: steps,
      metadata: {
        problemType: 'rateTables',
        table: tableEntries,
        missingQuantity: missingQuantity,
        missingValue: missingValue,
        unitRate: unitRate,
        difficulty: 'medium',
        estimatedTime: '50 seconds'
      }
    }
  }

  /**
   * Generate word problems
   */
  generateWordProblem(problemType, params) {
    const scenarios = this.getWordProblemScenarios(problemType, params)
    const scenario = this.getRandomElement(scenarios)
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{${scenario.explanation}}`)
      steps.push(`\\text{Calculate: } ${scenario.calculation}`)
      steps.push(`\\text{Answer: } ${scenario.answer}`)
    }
    
    return {
      question: scenario.question,
      questionLaTeX: scenario.questionLaTeX,
      answer: scenario.answer,
      answerLaTeX: scenario.answerLaTeX,
      steps: steps,
      metadata: {
        problemType: `word-${problemType}`,
        scenario: scenario.type,
        difficulty: 'medium',
        estimatedTime: '60 seconds'
      }
    }
  }
  
  getWordProblemScenarios(problemType, params) {
    const scenarios = []
    
    if (problemType === 'unitRates') {
      const distance = Math.floor(Math.random() * 200) + 100
      const time = Math.floor(Math.random() * 4) + 2
      const speed = distance / time
      
      scenarios.push({
        type: 'speed',
        question: `A car travels ${distance} miles in ${time} hours. What is the car's speed in miles per hour?`,
        questionLaTeX: `\\text{A car travels ${distance} miles in ${time} hours.} \\\\\\\\ \\text{What is the car's speed in miles per hour?}`,
        answer: `${speed} mph`,
        answerLaTeX: `${speed} \\text{ mph}`,
        explanation: 'Speed is distance divided by time',
        calculation: `\\frac{${distance} \\text{ miles}}{${time} \\text{ hours}} = ${speed} \\text{ mph}`
      })
      
      const items = Math.floor(Math.random() * 12) + 6
      const cost = items * (Math.floor(Math.random() * 3) + 2)
      const unitCost = cost / items
      
      scenarios.push({
        type: 'shopping',
        question: `${items} apples cost $${cost}. What is the cost per apple?`,
        questionLaTeX: `\\text{${items} apples cost $${cost}. What is the cost per apple?}`,
        answer: `$${unitCost}`,
        answerLaTeX: `\\$${unitCost}`,
        explanation: 'Unit cost is total cost divided by quantity',
        calculation: `\\frac{\\$${cost}}{${items}} = \\$${unitCost}`
      })
    }
    
    if (problemType === 'comparing') {
      const brand1Oz = Math.floor(Math.random() * 8) + 8
      const brand1Cost = Math.floor(Math.random() * 4) + 3
      const brand2Oz = Math.floor(Math.random() * 8) + 8
      const brand2Cost = Math.floor(Math.random() * 4) + 3
      
      const rate1 = brand1Cost / brand1Oz
      const rate2 = brand2Cost / brand2Oz
      const better = rate1 < rate2 ? 'Brand A' : 'Brand B'
      
      scenarios.push({
        type: 'unit-price',
        question: `Brand A: ${brand1Oz} oz for $${brand1Cost}. Brand B: ${brand2Oz} oz for $${brand2Cost}. Which is the better deal?`,
        questionLaTeX: `\\text{Brand A: ${brand1Oz} oz for $${brand1Cost}. Brand B: ${brand2Oz} oz for $${brand2Cost}.} \\\\\\\\ \\text{Which is the better deal?}`,
        answer: better,
        answerLaTeX: `\\text{${better}}`,
        explanation: 'Compare unit prices (cost per ounce)',
        calculation: `\\text{Brand A: } \\$${rate1.toFixed(2)}/\\text{oz, Brand B: } \\$${rate2.toFixed(2)}/\\text{oz}`
      })
    }
    
    return scenarios
  }

  /**
   * Get random element from array
   * @param {Array} array - Array to choose from
   * @returns {*} Random element
   */
  getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)]
  }
}

export default RatiosGenerator