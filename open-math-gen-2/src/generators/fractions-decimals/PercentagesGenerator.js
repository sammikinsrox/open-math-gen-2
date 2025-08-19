import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Percentages Generator
 * Generates problems involving percentages, conversions, and percentage calculations
 */
export class PercentagesGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Percentages',
      description: 'Generate problems involving percentages, conversions between fractions/decimals/percentages, and percentage calculations',
      category: 'fractions-decimals',
      difficulty: 'medium',
      icon: 'percent',
      tags: ['percentages', 'fractions', 'decimals', 'conversions', 'percent-calculations'],
      gradeLevel: '5-9',
      estimatedTime: '90 seconds',
      exampleProblem: {
        question: 'What is 25% of 80?',
        questionLaTeX: '\\text{What is } 25\\% \\text{ of } 80\\text{?}',
        answer: '20',
        answerLaTeX: '20'
      },
      
      defaultParameters: {
        problemCount: 10,
        includePercentOfNumber: true,
        includeConversionToPercent: true,
        includeConversionFromPercent: false,
        includeFindWhole: false,
        includeFindPercent: false,
        percentageMin: 5,
        percentageMax: 95,
        numberMin: 10,
        numberMax: 200,
        includeCommonPercentages: true,
        allowDecimals: false,
        includeWordProblems: false
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
                description: 'How many percentage problems to generate',
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
            description: 'Choose which types of percentage problems to include',
            icon: 'percent',
            color: 'green',
            order: 2,
            parameters: {
              includePercentOfNumber: schemaV2.createParameter({
                type: 'boolean',
                label: 'Percent of Number',
                description: 'Find a percentage of a given number',
                helpText: 'Example: What is 25% of 80? (Answer: 20)',
                order: 1
              }),
              includeConversionToPercent: schemaV2.createParameter({
                type: 'boolean',
                label: 'Convert to Percent',
                description: 'Convert fractions/decimals to percentages',
                helpText: 'Example: 0.25 = ?% (Answer: 25%)',
                order: 2
              }),
              includeConversionFromPercent: schemaV2.createParameter({
                type: 'boolean',
                label: 'Convert from Percent',
                description: 'Convert percentages to fractions/decimals',
                helpText: 'Example: 25% = ? (Answer: 0.25 or 1/4)',
                order: 3
              }),
              includeFindWhole: schemaV2.createParameter({
                type: 'boolean',
                label: 'Find the Whole',
                description: 'Find the whole when given part and percentage',
                helpText: 'Example: 20 is 25% of ? (Answer: 80)',
                order: 4
              }),
              includeFindPercent: schemaV2.createParameter({
                type: 'boolean',
                label: 'Find the Percent',
                description: 'Find what percent one number is of another',
                helpText: 'Example: 20 is ?% of 80 (Answer: 25%)',
                order: 5
              })
            }
          }),
          
          percentageProperties: schemaV2.createCategory({
            id: 'percentageProperties',
            label: 'Percentage Properties',
            description: 'Control the types and complexity of percentages',
            icon: 'tune',
            color: 'purple',
            order: 3,
            parameters: {
              includeCommonPercentages: schemaV2.createParameter({
                type: 'boolean',
                label: 'Include Common Percentages',
                description: 'Include frequently used percentages',
                helpText: 'Examples: 10%, 25%, 50%, 75%, 20%, 40%, 60%, 80%',
                order: 1
              }),
              allowDecimals: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Decimal Results',
                description: 'Allow problems with decimal answers',
                helpText: 'Enables more complex percentages like 12.5%, 33.3%',
                order: 2
              }),
              includeWordProblems: schemaV2.createParameter({
                type: 'boolean',
                label: 'Include Word Problems',
                description: 'Include real-world percentage scenarios',
                helpText: 'Examples: sales tax, tips, discounts, test scores',
                order: 3
              })
            }
          }),
          
          numberRanges: schemaV2.createCategory({
            id: 'numberRanges',
            label: 'Number Ranges',
            description: 'Control the size of percentages and numbers used',
            icon: 'tag',
            color: 'orange',
            order: 4,
            parameters: {
              percentageMin: schemaV2.createParameter({
                type: 'number',
                label: 'Minimum Percentage',
                description: 'Smallest percentage to use in problems',
                min: 1,
                max: 99,
                required: true,
                slider: true,
                presets: [5, 10, 15, 20],
                helpText: 'Lower bound for percentage values',
                order: 1
              }),
              percentageMax: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Percentage',
                description: 'Largest percentage to use in problems',
                min: 1,
                max: 99,
                required: true,
                slider: true,
                presets: [75, 85, 95, 99],
                helpText: 'Upper bound for percentage values',
                order: 2
              }),
              numberMin: schemaV2.createParameter({
                type: 'number',
                label: 'Minimum Number',
                description: 'Smallest whole number to use in problems',
                min: 1,
                max: 500,
                required: true,
                slider: true,
                presets: [10, 20, 50, 100],
                helpText: 'Lower bound for numerical values',
                order: 3
              }),
              numberMax: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Number',
                description: 'Largest whole number to use in problems',
                min: 10,
                max: 1000,
                required: true,
                slider: true,
                presets: [100, 200, 500, 1000],
                helpText: 'Upper bound for numerical values',
                order: 4
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'basic-percentages',
            label: 'Basic Percentages',
            description: 'Simple percentage calculations with common percentages',
            icon: 'looks_one',
            category: 'difficulty',
            values: {
              problemCount: 10,
              includePercentOfNumber: true,
              includeConversionToPercent: true,
              includeConversionFromPercent: false,
              includeFindWhole: false,
              includeFindPercent: false,
              percentageMin: 10,
              percentageMax: 90,
              numberMin: 20,
              numberMax: 100,
              includeCommonPercentages: true,
              allowDecimals: false,
              includeWordProblems: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'percent-calculations',
            label: 'Percent Calculations',
            description: 'Focus on calculating percentages of numbers',
            icon: 'calculate',
            category: 'scope',
            values: {
              problemCount: 12,
              includePercentOfNumber: true,
              includeConversionToPercent: false,
              includeConversionFromPercent: false,
              includeFindWhole: false,
              includeFindPercent: false,
              percentageMin: 5,
              percentageMax: 95,
              numberMin: 25,
              numberMax: 200,
              includeCommonPercentages: true,
              allowDecimals: true,
              includeWordProblems: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'conversions-practice',
            label: 'Conversions Practice',
            description: 'Practice converting between percentages, decimals, and fractions',
            icon: 'swap_horiz',
            category: 'scope',
            values: {
              problemCount: 10,
              includePercentOfNumber: false,
              includeConversionToPercent: true,
              includeConversionFromPercent: true,
              includeFindWhole: false,
              includeFindPercent: false,
              percentageMin: 5,
              percentageMax: 95,
              numberMin: 10,
              numberMax: 100,
              includeCommonPercentages: true,
              allowDecimals: true,
              includeWordProblems: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'advanced-problems',
            label: 'Advanced Problems',
            description: 'Complex problems including finding whole and percent',
            icon: 'functions',
            category: 'difficulty',
            values: {
              problemCount: 8,
              includePercentOfNumber: true,
              includeConversionToPercent: false,
              includeConversionFromPercent: false,
              includeFindWhole: true,
              includeFindPercent: true,
              percentageMin: 10,
              percentageMax: 80,
              numberMin: 50,
              numberMax: 300,
              includeCommonPercentages: false,
              allowDecimals: true,
              includeWordProblems: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'real-world-applications',
            label: 'Real-World Applications',
            description: 'Word problems with real-world percentage scenarios',
            icon: 'public',
            category: 'scope',
            values: {
              problemCount: 10,
              includePercentOfNumber: true,
              includeConversionToPercent: false,
              includeConversionFromPercent: false,
              includeFindWhole: true,
              includeFindPercent: true,
              percentageMin: 5,
              percentageMax: 95,
              numberMin: 20,
              numberMax: 500,
              includeCommonPercentages: true,
              allowDecimals: true,
              includeWordProblems: true
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive-percentages',
            label: 'Comprehensive Percentages',
            description: 'Mixed practice with all percentage concepts',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 15,
              includePercentOfNumber: true,
              includeConversionToPercent: true,
              includeConversionFromPercent: true,
              includeFindWhole: true,
              includeFindPercent: true,
              percentageMin: 5,
              percentageMax: 95,
              numberMin: 25,
              numberMax: 400,
              includeCommonPercentages: true,
              allowDecimals: true,
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
    if (params.percentageMin > params.percentageMax) {
      customErrors.push('Minimum Percentage cannot be greater than Maximum Percentage')
    }
    if (params.numberMin > params.numberMax) {
      customErrors.push('Minimum Number cannot be greater than Maximum Number')
    }
    if (!params.includePercentOfNumber && !params.includeConversionToPercent && !params.includeConversionFromPercent && !params.includeFindWhole && !params.includeFindPercent) {
      customErrors.push('At least one problem type must be enabled')
    }
    if (customErrors.length > 0) {
      throw new Error(`Invalid parameters: ${customErrors.join(', ')}`)
    }
    
    // Build array of enabled problem types
    const enabledTypes = []
    if (params.includePercentOfNumber) enabledTypes.push('percent-of-number')
    if (params.includeConversionToPercent) enabledTypes.push('conversion-to-percent')
    if (params.includeConversionFromPercent) enabledTypes.push('conversion-from-percent')
    if (params.includeFindWhole) enabledTypes.push('find-whole')
    if (params.includeFindPercent) enabledTypes.push('find-percent')
    
    if (enabledTypes.length === 0) {
      throw new Error('At least one problem type must be enabled')
    }
    
    const problemType = this.getRandomElement(enabledTypes)
    
    switch (problemType) {
      case 'percent-of-number':
        return this.generatePercentOfNumberProblem(params)
      case 'conversion-to-percent':
        return this.generateConversionToPercentProblem(params)
      case 'conversion-from-percent':
        return this.generateConversionFromPercentProblem(params)
      case 'find-whole':
        return this.generateFindWholeProblem(params)
      case 'find-percent':
        return this.generateFindPercentProblem(params)
      default:
        return this.generatePercentOfNumberProblem(params)
    }
  }

  generatePercentOfNumberProblem(params) {
    const percentage = this.generatePercentage(params)
    const number = this.getRandomNumber(params.numberMin, params.numberMax)
    
    const result = (percentage / 100) * number
    const roundedResult = params.allowDecimals ? 
      Math.round(result * 100) / 100 : 
      Math.round(result)
    
    const wordProblem = params.includeWordProblems && Math.random() < 0.3 ?
      this.generateWordProblem('percent-of-number', percentage, number) :
      {
        question: `What is ${percentage}% of ${number}?`,
        questionLaTeX: `\\text{What is } ${percentage}\\% \\text{ of } ${number}\\text{?}`
      }
    
    const questionText = wordProblem.question
    const questionLaTeX = wordProblem.questionLaTeX
    
    const steps = [
      `${percentage}\\% \\text{ of } ${number}`,
      `= \\frac{${percentage}}{100} \\times ${number}`,
      `= ${percentage / 100} \\times ${number}`,
      `= ${roundedResult}`
    ]
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: roundedResult.toString(),
      answerLaTeX: roundedResult.toString(),
      steps: steps,
      metadata: {
        operation: 'percent-of-number',
        percentage: percentage,
        number: number,
        result: roundedResult,
        difficulty: this.difficulty,
        estimatedTime: '60 seconds'
      }
    }
  }

  generateConversionToPercentProblem(params) {
    const conversionType = Math.random() < 0.5 ? 'decimal' : 'fraction'
    
    if (conversionType === 'decimal') {
      const decimal = this.generateRandomDecimal(2)
      const percentage = decimal * 100
      
      const questionText = `Convert ${decimal} to a percentage`
      const questionLaTeX = `\\text{Convert } ${decimal} \\text{ to a percentage}`
      
      const steps = [
        `${decimal}`,
        `= ${decimal} \\times 100\\%`,
        `= ${percentage}\\%`
      ]
      
      return {
        question: questionText,
        questionLaTeX: questionLaTeX,
        answer: `${percentage}%`,
        answerLaTeX: `${percentage}\\%`,
        steps: steps,
        metadata: {
          operation: 'decimal-to-percent',
          decimal: decimal,
          percentage: percentage,
          difficulty: this.difficulty,
          estimatedTime: '45 seconds'
        }
      }
    } else {
      const fraction = this.generateRandomFraction(params)
      const percentage = (fraction.numerator / fraction.denominator) * 100
      const roundedPercentage = Math.round(percentage * 100) / 100
      
      const questionText = `Convert ${fraction.numerator}/${fraction.denominator} to a percentage`
      const questionLaTeX = `\\text{Convert } \\frac{${fraction.numerator}}{${fraction.denominator}} \\text{ to a percentage}`
      
      const steps = [
        `\\frac{${fraction.numerator}}{${fraction.denominator}}`,
        `= ${fraction.numerator} \\div ${fraction.denominator}`,
        `= ${fraction.numerator / fraction.denominator}`,
        `= ${fraction.numerator / fraction.denominator} \\times 100\\%`,
        `= ${roundedPercentage}\\%`
      ]
      
      return {
        question: questionText,
        questionLaTeX: questionLaTeX,
        answer: `${roundedPercentage}%`,
        answerLaTeX: `${roundedPercentage}\\%`,
        steps: steps,
        metadata: {
          operation: 'fraction-to-percent',
          fraction: fraction,
          percentage: roundedPercentage,
          difficulty: this.difficulty,
          estimatedTime: '75 seconds'
        }
      }
    }
  }

  generateConversionFromPercentProblem(params) {
    const percentage = this.generatePercentage(params)
    const conversionType = Math.random() < 0.5 ? 'decimal' : 'fraction'
    
    if (conversionType === 'decimal') {
      const decimal = percentage / 100
      
      const questionText = `Convert ${percentage}% to a decimal`
      const questionLaTeX = `\\text{Convert } ${percentage}\\% \\text{ to a decimal}`
      
      const steps = [
        `${percentage}\\%`,
        `= \\frac{${percentage}}{100}`,
        `= ${decimal}`
      ]
      
      return {
        question: questionText,
        questionLaTeX: questionLaTeX,
        answer: decimal.toString(),
        answerLaTeX: decimal.toString(),
        steps: steps,
        metadata: {
          operation: 'percent-to-decimal',
          percentage: percentage,
          decimal: decimal,
          difficulty: this.difficulty,
          estimatedTime: '45 seconds'
        }
      }
    } else {
      const fraction = this.simplifyFraction(percentage, 100)
      
      const questionText = `Convert ${percentage}% to a fraction`
      const questionLaTeX = `\\text{Convert } ${percentage}\\% \\text{ to a fraction}`
      
      const steps = [
        `${percentage}\\%`,
        `= \\frac{${percentage}}{100}`
      ]
      
      if (fraction.numerator !== percentage || fraction.denominator !== 100) {
        steps.push(`= \\frac{${fraction.numerator}}{${fraction.denominator}}`)
      }
      
      return {
        question: questionText,
        questionLaTeX: questionLaTeX,
        answer: `${fraction.numerator}/${fraction.denominator}`,
        answerLaTeX: `\\frac{${fraction.numerator}}{${fraction.denominator}}`,
        steps: steps,
        metadata: {
          operation: 'percent-to-fraction',
          percentage: percentage,
          fraction: fraction,
          difficulty: this.difficulty,
          estimatedTime: '60 seconds'
        }
      }
    }
  }

  generateFindWholeProblem(params) {
    const percentage = this.generatePercentage(params)
    const whole = this.getRandomNumber(params.numberMin, params.numberMax)
    const part = Math.round((percentage / 100) * whole)
    
    const questionText = `${part} is ${percentage}% of what number?`
    const questionLaTeX = `${part} \\text{ is } ${percentage}\\% \\text{ of what number?}`
    
    const steps = [
      `${part} = ${percentage}\\% \\times \\text{whole}`,
      `${part} = \\frac{${percentage}}{100} \\times \\text{whole}`,
      `\\text{whole} = ${part} \\div \\frac{${percentage}}{100}`,
      `\\text{whole} = ${part} \\times \\frac{100}{${percentage}}`,
      `\\text{whole} = ${whole}`
    ]
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: whole.toString(),
      answerLaTeX: whole.toString(),
      steps: steps,
      metadata: {
        operation: 'find-whole',
        part: part,
        percentage: percentage,
        whole: whole,
        difficulty: this.difficulty,
        estimatedTime: '90 seconds'
      }
    }
  }

  generateFindPercentProblem(params) {
    const whole = this.getRandomNumber(params.numberMin, params.numberMax)
    const part = this.getRandomNumber(1, whole)
    const percentage = Math.round((part / whole) * 100 * 100) / 100
    
    const questionText = `${part} is what percent of ${whole}?`
    const questionLaTeX = `${part} \\text{ is what percent of } ${whole}\\text{?}`
    
    const steps = [
      `\\text{percent} = \\frac{\\text{part}}{\\text{whole}} \\times 100\\%`,
      `\\text{percent} = \\frac{${part}}{${whole}} \\times 100\\%`,
      `\\text{percent} = ${part / whole} \\times 100\\%`,
      `\\text{percent} = ${percentage}\\%`
    ]
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `${percentage}%`,
      answerLaTeX: `${percentage}\\%`,
      steps: steps,
      metadata: {
        operation: 'find-percent',
        part: part,
        whole: whole,
        percentage: percentage,
        difficulty: this.difficulty,
        estimatedTime: '75 seconds'
      }
    }
  }

  generateWordProblem(type, percentage, number) {
    const scenarios = {
      'percent-of-number': [
        {
          question: `A store offers ${percentage}% off on a item that costs $${number}.\n\nHow much is the discount?`,
          questionLaTeX: `\\text{A store offers ${percentage}\\% off on a item that costs \\$${number}.} \\\\ \\text{How much is the discount?}`
        },
        {
          question: `In a class of ${number} students, ${percentage}% are boys.\n\nHow many boys are there?`,
          questionLaTeX: `\\text{In a class of ${number} students, ${percentage}\\% are boys.} \\\\ \\text{How many boys are there?}`
        },
        {
          question: `A tip of ${percentage}% is left on a bill of $${number}.\n\nHow much is the tip?`,
          questionLaTeX: `\\text{A tip of ${percentage}\\% is left on a bill of \\$${number}.} \\\\ \\text{How much is the tip?}`
        },
        {
          question: `${percentage}% of ${number} books in a library are fiction.\n\nHow many fiction books are there?`,
          questionLaTeX: `\\text{${percentage}\\% of ${number} books in a library are fiction.} \\\\ \\text{How many fiction books are there?}`
        }
      ]
    }
    
    const problemList = scenarios[type] || [
      {
        question: `What is ${percentage}% of ${number}?`,
        questionLaTeX: `\\text{What is ${percentage}\\% of ${number}?}`
      }
    ]
    return this.getRandomElement(problemList)
  }

  generatePercentage(params) {
    if (params.includeCommonPercentages && Math.random() < 0.4) {
      const commonPercentages = [10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90]
      return this.getRandomElement(commonPercentages)
    }
    
    return this.getRandomNumber(params.percentageMin, params.percentageMax)
  }

  generateRandomDecimal(places) {
    const factor = Math.pow(10, places)
    return Math.round(Math.random() * factor) / factor
  }

  generateRandomFraction(params) {
    const denominator = this.getRandomNumber(2, 20)
    const numerator = this.getRandomNumber(1, denominator - 1)
    
    return {
      numerator,
      denominator,
      decimal: numerator / denominator
    }
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)]
  }

  gcd(a, b) {
    return b === 0 ? a : this.gcd(b, a % b)
  }

  simplifyFraction(numerator, denominator) {
    const divisor = this.gcd(numerator, denominator)
    return {
      numerator: numerator / divisor,
      denominator: denominator / divisor
    }
  }
}

export default PercentagesGenerator