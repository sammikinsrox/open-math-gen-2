import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Weight/Mass Generator
 * Generates problems involving weight and mass measurements and calculations
 */
export class WeightMassGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Weight/Mass',
      description: 'Generate problems involving weight and mass measurements, conversions, and calculations',
      category: 'measurement-units',
      difficulty: 'easy',
      icon: 'fitness_center',
      tags: ['measurement', 'weight', 'mass', 'units', 'conversion', 'metric', 'imperial'],
      gradeLevel: '2-8',
      estimatedTime: '60 seconds',
      exampleProblem: {
        question: 'Convert 2 pounds to ounces',
        questionLaTeX: '\\text{Convert } 2 \\text{ pounds to ounces}',
        answer: '32 ounces',
        answerLaTeX: '32 \\text{ ounces}'
      },
      
      defaultParameters: {
        problemCount: 10,
        includeBasicMeasurement: true,
        includeConversion: true,
        includeArithmetic: false,
        includeComparison: false,
        useMetricUnits: true,
        useImperialUnits: true,
        allowDecimals: false,
        maxValue: 100
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
                description: 'How many weight/mass problems to generate',
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
            description: 'Choose which types of weight/mass problems to include',
            icon: 'fitness_center',
            color: 'green',
            order: 2,
            parameters: {
              includeBasicMeasurement: schemaV2.createParameter({
                type: 'boolean',
                label: 'Basic Measurement',
                description: 'Problems about measuring and identifying weights',
                helpText: 'Examples: "How much does this weigh?", "Choose the heavier object"',
                order: 1
              }),
              includeConversion: schemaV2.createParameter({
                type: 'boolean',
                label: 'Unit Conversions',
                description: 'Convert between different weight/mass units',
                helpText: 'Examples: Convert 2 pounds to ounces, 3 kg to grams',
                order: 2
              }),
              includeArithmetic: schemaV2.createParameter({
                type: 'boolean',
                label: 'Weight Arithmetic',
                description: 'Add and subtract weight measurements',
                helpText: 'Examples: 5 kg + 2 kg = ?, 3 lbs - 8 oz = ?',
                order: 3
              }),
              includeComparison: schemaV2.createParameter({
                type: 'boolean',
                label: 'Weight Comparisons',
                description: 'Compare different weights using <, >, =',
                helpText: 'Examples: 2 kg ___ 2000 g, 1 lb ___ 20 oz',
                order: 4
              })
            }
          }),
          
          unitSystems: schemaV2.createCategory({
            id: 'unitSystems',
            label: 'Unit Systems',
            description: 'Choose which measurement systems to use',
            icon: 'public',
            color: 'purple',
            order: 3,
            parameters: {
              useMetricUnits: schemaV2.createParameter({
                type: 'boolean',
                label: 'Metric Units',
                description: 'Include metric weight/mass units',
                helpText: 'Units: milligrams (mg), grams (g), kilograms (kg), tonnes (t)',
                order: 1
              }),
              useImperialUnits: schemaV2.createParameter({
                type: 'boolean',
                label: 'Imperial Units',
                description: 'Include imperial/US customary weight units',
                helpText: 'Units: ounces (oz), pounds (lb), tons (ton)',
                order: 2
              })
            }
          }),
          
          numberProperties: schemaV2.createCategory({
            id: 'numberProperties',
            label: 'Number Properties',
            description: 'Control the complexity of numbers used',
            icon: 'tag',
            color: 'orange',
            order: 4,
            parameters: {
              maxValue: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Value',
                description: 'Largest weight value to use in problems',
                min: 10,
                max: 500,
                required: true,
                slider: true,
                presets: [50, 100, 200, 500],
                helpText: 'Controls the size of numbers in weight measurements',
                order: 1
              }),
              allowDecimals: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Decimals',
                description: 'Allow decimal values in weight measurements',
                helpText: 'Examples: 2.5 kg, 1.75 pounds, 3.2 grams',
                order: 2
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'basic-weight',
            label: 'Basic Weight',
            description: 'Simple weight measurement problems for elementary students',
            icon: 'looks_one',
            category: 'difficulty',
            values: {
              problemCount: 10,
              includeBasicMeasurement: true,
              includeConversion: false,
              includeArithmetic: false,
              includeComparison: true,
              useMetricUnits: true,
              useImperialUnits: true,
              allowDecimals: false,
              maxValue: 50
            }
          }),
          
          schemaV2.createPreset({
            id: 'metric-conversions',
            label: 'Metric Conversions',
            description: 'Focus on metric system weight/mass conversions',
            icon: 'swap_horiz',
            category: 'scope',
            values: {
              problemCount: 12,
              includeBasicMeasurement: false,
              includeConversion: true,
              includeArithmetic: false,
              includeComparison: false,
              useMetricUnits: true,
              useImperialUnits: false,
              allowDecimals: true,
              maxValue: 100
            }
          }),
          
          schemaV2.createPreset({
            id: 'imperial-conversions',
            label: 'Imperial Conversions',
            description: 'Focus on imperial system weight conversions',
            icon: 'swap_horiz',
            category: 'scope',
            values: {
              problemCount: 12,
              includeBasicMeasurement: false,
              includeConversion: true,
              includeArithmetic: false,
              includeComparison: false,
              useMetricUnits: false,
              useImperialUnits: true,
              allowDecimals: false,
              maxValue: 100
            }
          }),
          
          schemaV2.createPreset({
            id: 'weight-arithmetic',
            label: 'Weight Arithmetic',
            description: 'Practice adding and subtracting weights',
            icon: 'calculate',
            category: 'scope',
            values: {
              problemCount: 10,
              includeBasicMeasurement: false,
              includeConversion: false,
              includeArithmetic: true,
              includeComparison: false,
              useMetricUnits: true,
              useImperialUnits: true,
              allowDecimals: true,
              maxValue: 100
            }
          }),
          
          schemaV2.createPreset({
            id: 'comparison-practice',
            label: 'Comparison Practice',
            description: 'Practice comparing weights across different units',
            icon: 'compare',
            category: 'scope',
            values: {
              problemCount: 10,
              includeBasicMeasurement: false,
              includeConversion: false,
              includeArithmetic: false,
              includeComparison: true,
              useMetricUnits: true,
              useImperialUnits: true,
              allowDecimals: true,
              maxValue: 100
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive-weight',
            label: 'Comprehensive Weight',
            description: 'Mixed practice with all weight/mass concepts',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 15,
              includeBasicMeasurement: true,
              includeConversion: true,
              includeArithmetic: true,
              includeComparison: true,
              useMetricUnits: true,
              useImperialUnits: true,
              allowDecimals: true,
              maxValue: 200
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
    if (!params.useMetricUnits && !params.useImperialUnits) {
      customErrors.push('At least one unit system must be enabled')
    }
    if (!params.includeBasicMeasurement && !params.includeConversion && !params.includeArithmetic && !params.includeComparison) {
      customErrors.push('At least one problem type must be enabled')
    }
    if (customErrors.length > 0) {
      throw new Error(`Invalid parameters: ${customErrors.join(', ')}`)
    }
    
    // Build array of enabled problem types
    const enabledTypes = []
    if (params.includeBasicMeasurement) enabledTypes.push('basic')
    if (params.includeConversion) enabledTypes.push('conversion')
    if (params.includeArithmetic) enabledTypes.push('arithmetic')
    if (params.includeComparison) enabledTypes.push('comparison')
    
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
      case 'comparison':
        return this.generateComparisonProblem(params)
      default:
        return this.generateConversionProblem(params)
    }
  }

  generateBasicMeasurementProblem(params) {
    const availableUnits = this.getAvailableUnits(params)
    const unit = this.getRandomElement(availableUnits)
    const value = this.generateValue(params)
    
    const objects = ['apple', 'book', 'pencil', 'bag', 'box', 'bottle', 'paper', 'phone']
    const object = this.getRandomElement(objects)
    
    const questionText = `An ${object} weighs ${value} ${unit.name}. What is its weight?`
    const questionLaTeX = `\\text{An ${object} weighs } ${value} \\text{ ${unit.name}}\\text{. What is its weight?}`
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `${value} ${unit.name}`,
      answerLaTeX: `${value} \\text{ ${unit.name}}`,
      steps: [
        `\\text{The ${object} weighs } ${value} \\text{ ${unit.name}}`,
        `\\text{Answer: } ${value} \\text{ ${unit.name}}`
      ],
      metadata: {
        operation: 'basic-weight-measurement',
        unit: unit.name,
        value: value,
        object: object,
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
        operation: 'weight-conversion',
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
      operationWord = 'total'
    } else {
      // Ensure positive result for subtraction
      if (value1 < value2) [value1, value2] = [value2, value1]
      result = value1 - value2
      operationSymbol = '-'
      operationWord = 'difference'
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
        operation: `weight-${operation}`,
        unit: unit.name,
        operands: [value1, value2],
        result: result,
        difficulty: this.difficulty,
        estimatedTime: '45 seconds'
      }
    }
  }

  generateComparisonProblem(params) {
    const availableUnits = this.getAvailableUnits(params)
    const unit = this.getRandomElement(availableUnits)
    const value1 = this.generateValue(params)
    let value2 = this.generateValue(params)
    
    // Ensure they're different
    while (value1 === value2) {
      value2 = this.generateValue(params)
    }
    
    let comparison, comparisonSymbol
    if (value1 > value2) {
      comparison = 'heavier'
      comparisonSymbol = '>'
    } else {
      comparison = 'lighter'
      comparisonSymbol = '<'
    }
    
    const questionText = `Compare: ${value1} ${unit.name} ___ ${value2} ${unit.name}`
    const questionLaTeX = `\\text{Compare: } ${value1} \\text{ ${unit.name}} \\; \\square \\; ${value2} \\text{ ${unit.name}}`
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: comparisonSymbol,
      answerLaTeX: comparisonSymbol,
      steps: [
        `${value1} \\text{ ${unit.name}} \\text{ and } ${value2} \\text{ ${unit.name}}`,
        `${value1} ${comparisonSymbol} ${value2}`,
        `\\text{Therefore: } ${value1} \\text{ ${unit.name}} ${comparisonSymbol} ${value2} \\text{ ${unit.name}}`
      ],
      metadata: {
        operation: 'weight-comparison',
        unit: unit.name,
        values: [value1, value2],
        comparison: comparison,
        difficulty: this.difficulty,
        estimatedTime: '40 seconds'
      }
    }
  }

  getAvailableUnits(params) {
    const units = []
    
    if (params.useMetricUnits) {
      units.push(
        { symbol: 'mg', name: 'milligrams', factor: 1 },
        { symbol: 'g', name: 'grams', factor: 1000 },
        { symbol: 'kg', name: 'kilograms', factor: 1000000 },
        { symbol: 't', name: 'tonnes', factor: 1000000000 }
      )
    }
    
    if (params.useImperialUnits) {
      units.push(
        { symbol: 'oz', name: 'ounces', factor: 1 },
        { symbol: 'lb', name: 'pounds', factor: 16 },
        { symbol: 'ton', name: 'tons', factor: 32000 }
      )
    }
    
    return units
  }

  getConversions() {
    return [
      // Metric conversions
      { from: 'mg', to: 'g', factor: 0.001 },
      { from: 'g', to: 'mg', factor: 1000 },
      { from: 'g', to: 'kg', factor: 0.001 },
      { from: 'kg', to: 'g', factor: 1000 },
      { from: 'kg', to: 't', factor: 0.001 },
      { from: 't', to: 'kg', factor: 1000 },
      
      // Imperial conversions
      { from: 'oz', to: 'lb', factor: 1/16 },
      { from: 'lb', to: 'oz', factor: 16 },
      { from: 'lb', to: 'ton', factor: 1/2000 },
      { from: 'ton', to: 'lb', factor: 2000 },
      
      // Metric to Imperial (simplified)
      { from: 'g', to: 'oz', factor: 0.035 },
      { from: 'oz', to: 'g', factor: 28.35 },
      { from: 'kg', to: 'lb', factor: 2.205 },
      { from: 'lb', to: 'kg', factor: 0.454 }
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

export default WeightMassGenerator