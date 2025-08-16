import { BaseGenerator } from '../BaseGenerator.js'

/**
 * Percentages Generator
 * Generates problems involving percentages, conversions, and percentage calculations
 */
export class PercentagesGenerator extends BaseGenerator {
  constructor() {
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
      
      parameterSchema: {
        problemCount: {
          type: 'number',
          label: 'Number of Problems',
          description: 'How many percentage problems to generate',
          min: 1,
          max: 100,
          required: true
        },
        includePercentOfNumber: {
          type: 'boolean',
          label: 'Include Percent of Number',
          description: 'Include problems like "25% of 80 = ?"'
        },
        includeConversionToPercent: {
          type: 'boolean',
          label: 'Include Conversion to Percent',
          description: 'Include problems like "0.25 = ?%"'
        },
        includeConversionFromPercent: {
          type: 'boolean',
          label: 'Include Conversion from Percent',
          description: 'Include problems like "25% = ?"'
        },
        includeFindWhole: {
          type: 'boolean',
          label: 'Include Find the Whole',
          description: 'Include problems like "20 is 25% of ?"'
        },
        includeFindPercent: {
          type: 'boolean',
          label: 'Include Find the Percent',
          description: 'Include problems like "20 is ?% of 80"'
        },
        percentageMin: {
          type: 'number',
          label: 'Minimum Percentage',
          description: 'Smallest percentage to use',
          min: 1,
          max: 99,
          required: true
        },
        percentageMax: {
          type: 'number',
          label: 'Maximum Percentage',
          description: 'Largest percentage to use',
          min: 1,
          max: 99,
          required: true
        },
        numberMin: {
          type: 'number',
          label: 'Minimum Number',
          description: 'Smallest number to use in problems',
          min: 1,
          max: 1000,
          required: true
        },
        numberMax: {
          type: 'number',
          label: 'Maximum Number',
          description: 'Largest number to use in problems',
          min: 1,
          max: 1000,
          required: true
        },
        includeCommonPercentages: {
          type: 'boolean',
          label: 'Include Common Percentages',
          description: 'Include common percentages like 10%, 25%, 50%, 75%'
        },
        allowDecimals: {
          type: 'boolean',
          label: 'Allow Decimal Results',
          description: 'Allow problems with decimal answers'
        },
        includeWordProblems: {
          type: 'boolean',
          label: 'Include Word Problems',
          description: 'Include real-world percentage word problems'
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