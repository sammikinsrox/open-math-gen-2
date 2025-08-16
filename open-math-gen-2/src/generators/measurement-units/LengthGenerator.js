import { BaseGenerator } from '../BaseGenerator.js'

/**
 * Length Generator
 * Generates problems involving length measurements and calculations
 */
export class LengthGenerator extends BaseGenerator {
  constructor() {
    super({
      name: 'Length',
      description: 'Generate problems involving length measurements, conversions, and calculations',
      category: 'measurement-units',
      difficulty: 'easy',
      icon: 'straighten',
      tags: ['measurement', 'length', 'units', 'conversion', 'metric', 'imperial'],
      gradeLevel: '2-8',
      estimatedTime: '60 seconds',
      exampleProblem: {
        question: 'Convert 3 feet to inches',
        questionLaTeX: '\\text{Convert } 3 \\text{ feet to inches}',
        answer: '36 inches',
        answerLaTeX: '36 \\text{ inches}'
      },
      
      defaultParameters: {
        problemCount: 10,
        includeBasicMeasurement: true,
        includeConversion: true,
        includeArithmetic: false,
        useMetricUnits: true,
        useImperialUnits: true,
        allowDecimals: false,
        maxValue: 100
      },
      
      parameterSchema: {
        problemCount: {
          type: 'number',
          label: 'Number of Problems',
          description: 'How many length problems to generate',
          min: 1,
          max: 100,
          required: true
        },
        includeBasicMeasurement: {
          type: 'boolean',
          label: 'Include Basic Measurement',
          description: 'Include problems asking to measure or identify lengths'
        },
        includeConversion: {
          type: 'boolean',
          label: 'Include Conversions',
          description: 'Include unit conversion problems'
        },
        includeArithmetic: {
          type: 'boolean',
          label: 'Include Arithmetic',
          description: 'Include addition/subtraction of lengths'
        },
        useMetricUnits: {
          type: 'boolean',
          label: 'Use Metric Units',
          description: 'Include metric units (mm, cm, m, km)'
        },
        useImperialUnits: {
          type: 'boolean',
          label: 'Use Imperial Units',
          description: 'Include imperial units (in, ft, yd, mi)'
        },
        allowDecimals: {
          type: 'boolean',
          label: 'Allow Decimals',
          description: 'Allow decimal values in problems'
        },
        maxValue: {
          type: 'number',
          label: 'Maximum Value',
          description: 'Largest measurement value to use',
          min: 1,
          max: 1000,
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
    if (params.includeBasicMeasurement) enabledTypes.push('basic')
    if (params.includeConversion) enabledTypes.push('conversion')
    if (params.includeArithmetic) enabledTypes.push('arithmetic')
    
    if (enabledTypes.length === 0) {
      throw new Error('At least one problem type must be enabled')
    }
    
    const problemType = this.getRandomElement(enabledTypes)
    
    switch (problemType) {
      case 'basic':
        return this.generateBasicMeasurementProblem(params)
      case 'conversion':
        return this.generateConversionProblem(params)
      case 'arithmetic':
        return this.generateArithmeticProblem(params)
      default:
        return this.generateConversionProblem(params)
    }
  }

  generateBasicMeasurementProblem(params) {
    const availableUnits = this.getAvailableUnits(params)
    const unit = this.getRandomElement(availableUnits)
    const value = this.generateValue(params)
    
    const questionText = `How long is an object that measures ${value} ${unit.name}?`
    const questionLaTeX = `\\text{How long is an object that measures } ${value} \\text{ ${unit.name}}\\text{?}`
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `${value} ${unit.name}`,
      answerLaTeX: `${value} \\text{ ${unit.name}}`,
      steps: [
        `\\text{The object measures } ${value} \\text{ ${unit.name}}`,
        `\\text{Answer: } ${value} \\text{ ${unit.name}}`
      ],
      metadata: {
        operation: 'basic-measurement',
        unit: unit.name,
        value: value,
        difficulty: this.difficulty,
        estimatedTime: '30 seconds'
      }
    }
  }

  generateConversionProblem(params) {
    const availableUnits = this.getAvailableUnits(params)
    const conversions = this.getConversions()
    
    // Find a valid conversion pair
    const validConversions = conversions.filter(conv => 
      availableUnits.some(u => u.symbol === conv.from) &&
      availableUnits.some(u => u.symbol === conv.to)
    )
    
    if (validConversions.length === 0) {
      throw new Error('No valid conversions available with selected units')
    }
    
    const conversion = this.getRandomElement(validConversions)
    const fromUnit = availableUnits.find(u => u.symbol === conversion.from)
    const toUnit = availableUnits.find(u => u.symbol === conversion.to)
    
    const fromValue = this.generateValue(params)
    const toValue = params.allowDecimals ? 
      Math.round(fromValue * conversion.factor * 100) / 100 :
      Math.round(fromValue * conversion.factor)
    
    const questionText = `Convert ${fromValue} ${fromUnit.name} to ${toUnit.name}`
    const questionLaTeX = `\\text{Convert } ${fromValue} \\text{ ${fromUnit.name} to ${toUnit.name}}`
    
    const steps = [
      `${fromValue} \\text{ ${fromUnit.name}} \\times ${conversion.factor} = ${toValue} \\text{ ${toUnit.name}}`,
      `\\text{Answer: } ${toValue} \\text{ ${toUnit.name}}`
    ]
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `${toValue} ${toUnit.name}`,
      answerLaTeX: `${toValue} \\text{ ${toUnit.name}}`,
      steps: steps,
      metadata: {
        operation: 'conversion',
        fromUnit: fromUnit.name,
        toUnit: toUnit.name,
        fromValue: fromValue,
        toValue: toValue,
        difficulty: this.difficulty,
        estimatedTime: '45 seconds'
      }
    }
  }

  generateArithmeticProblem(params) {
    const availableUnits = this.getAvailableUnits(params)
    const unit = this.getRandomElement(availableUnits)
    const value1 = this.generateValue(params)
    const value2 = this.generateValue(params)
    const operation = Math.random() < 0.6 ? 'addition' : 'subtraction'
    
    let result, operationSymbol, operationWord
    if (operation === 'addition') {
      result = value1 + value2
      operationSymbol = '+'
      operationWord = 'add'
    } else {
      // Ensure positive result for subtraction
      if (value1 < value2) [value1, value2] = [value2, value1]
      result = value1 - value2
      operationSymbol = '-'
      operationWord = 'subtract'
    }
    
    const questionText = `${value1} ${unit.name} ${operationSymbol} ${value2} ${unit.name} = ?`
    const questionLaTeX = `${value1} \\text{ ${unit.name}} ${operationSymbol} ${value2} \\text{ ${unit.name}} = \\square`
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `${result} ${unit.name}`,
      answerLaTeX: `${result} \\text{ ${unit.name}}`,
      steps: [
        `${value1} \\text{ ${unit.name}} ${operationSymbol} ${value2} \\text{ ${unit.name}}`,
        `= ${result} \\text{ ${unit.name}}`
      ],
      metadata: {
        operation: `length-${operation}`,
        unit: unit.name,
        operands: [value1, value2],
        result: result,
        difficulty: this.difficulty,
        estimatedTime: '45 seconds'
      }
    }
  }

  getAvailableUnits(params) {
    const units = []
    
    if (params.useMetricUnits) {
      units.push(
        { symbol: 'mm', name: 'millimeters', factor: 1 },
        { symbol: 'cm', name: 'centimeters', factor: 10 },
        { symbol: 'm', name: 'meters', factor: 1000 },
        { symbol: 'km', name: 'kilometers', factor: 1000000 }
      )
    }
    
    if (params.useImperialUnits) {
      units.push(
        { symbol: 'in', name: 'inches', factor: 1 },
        { symbol: 'ft', name: 'feet', factor: 12 },
        { symbol: 'yd', name: 'yards', factor: 36 },
        { symbol: 'mi', name: 'miles', factor: 63360 }
      )
    }
    
    return units
  }

  getConversions() {
    return [
      // Metric conversions
      { from: 'mm', to: 'cm', factor: 0.1 },
      { from: 'cm', to: 'mm', factor: 10 },
      { from: 'cm', to: 'm', factor: 0.01 },
      { from: 'm', to: 'cm', factor: 100 },
      { from: 'm', to: 'km', factor: 0.001 },
      { from: 'km', to: 'm', factor: 1000 },
      
      // Imperial conversions
      { from: 'in', to: 'ft', factor: 1/12 },
      { from: 'ft', to: 'in', factor: 12 },
      { from: 'ft', to: 'yd', factor: 1/3 },
      { from: 'yd', to: 'ft', factor: 3 },
      { from: 'yd', to: 'mi', factor: 1/1760 },
      { from: 'mi', to: 'yd', factor: 1760 },
      
      // Metric to Imperial (simplified)
      { from: 'cm', to: 'in', factor: 0.394 },
      { from: 'in', to: 'cm', factor: 2.54 },
      { from: 'm', to: 'ft', factor: 3.281 },
      { from: 'ft', to: 'm', factor: 0.305 }
    ]
  }

  generateValue(params) {
    const max = Math.min(params.maxValue, 100)
    const min = 1
    
    if (params.allowDecimals) {
      const value = min + Math.random() * (max - min)
      return Math.round(value * 10) / 10
    } else {
      return Math.floor(Math.random() * (max - min + 1)) + min
    }
  }

  getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)]
  }
}

export default LengthGenerator