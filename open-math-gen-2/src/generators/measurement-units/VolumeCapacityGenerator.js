import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Volume/Capacity Generator
 * Generates problems involving volume and capacity measurements and calculations
 */
export class VolumeCapacityGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Volume/Capacity',
      description: 'Generate problems involving volume and capacity measurements, conversions, and calculations',
      category: 'measurement-units',
      difficulty: 'medium',
      icon: 'local_drink',
      tags: ['measurement', 'volume', 'capacity', 'units', 'conversion', 'metric', 'imperial', 'liquid'],
      gradeLevel: '3-8',
      estimatedTime: '75 seconds',
      exampleProblem: {
        question: 'Convert 2 liters to milliliters',
        questionLaTeX: '\\text{Convert } 2 \\text{ liters to milliliters}',
        answer: '2000 milliliters',
        answerLaTeX: '2000 \\text{ milliliters}'
      },
      
      defaultParameters: {
        problemCount: 10,
        includeBasicMeasurement: true,
        includeConversion: true,
        includeArithmetic: false,
        includeComparison: false,
        includeWordProblems: false,
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
                description: 'How many volume/capacity problems to generate',
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
            description: 'Choose which types of volume/capacity problems to include',
            icon: 'local_drink',
            color: 'green',
            order: 2,
            parameters: {
              includeBasicMeasurement: schemaV2.createParameter({
                type: 'boolean',
                label: 'Basic Measurement',
                description: 'Problems about measuring and identifying volumes',
                helpText: 'Examples: "How much does this container hold?", "What is the capacity?"',
                order: 1
              }),
              includeConversion: schemaV2.createParameter({
                type: 'boolean',
                label: 'Unit Conversions',
                description: 'Convert between different volume/capacity units',
                helpText: 'Examples: Convert 2 liters to milliliters, 3 cups to fluid ounces',
                order: 2
              }),
              includeArithmetic: schemaV2.createParameter({
                type: 'boolean',
                label: 'Volume Arithmetic',
                description: 'Add and subtract volume measurements',
                helpText: 'Examples: 2 L + 500 mL = ?, 3 cups - 1 cup = ?',
                order: 3
              }),
              includeComparison: schemaV2.createParameter({
                type: 'boolean',
                label: 'Volume Comparisons',
                description: 'Compare different volumes using <, >, =',
                helpText: 'Examples: 1 L ___ 1000 mL, 2 cups ___ 1 pint',
                order: 4
              }),
              includeWordProblems: schemaV2.createParameter({
                type: 'boolean',
                label: 'Word Problems',
                description: 'Real-world volume/capacity scenarios',
                helpText: 'Examples: recipe ingredients, container capacity, liquid measurements',
                order: 5
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
                description: 'Include metric volume/capacity units',
                helpText: 'Units: milliliters (mL), liters (L), cubic meters (m³)',
                order: 1
              }),
              useImperialUnits: schemaV2.createParameter({
                type: 'boolean',
                label: 'Imperial Units',
                description: 'Include imperial/US customary volume units',
                helpText: 'Units: fluid ounces (fl oz), cups, pints (pt), quarts (qt), gallons (gal)',
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
                description: 'Largest volume value to use in problems',
                min: 10,
                max: 500,
                required: true,
                slider: true,
                presets: [50, 100, 200, 500],
                helpText: 'Controls the size of numbers in volume measurements',
                order: 1
              }),
              allowDecimals: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Decimals',
                description: 'Allow decimal values in volume measurements',
                helpText: 'Examples: 2.5 liters, 1.75 cups, 3.2 milliliters',
                order: 2
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'basic-volume',
            label: 'Basic Volume',
            description: 'Simple volume measurement problems for elementary students',
            icon: 'looks_one',
            category: 'difficulty',
            values: {
              problemCount: 10,
              includeBasicMeasurement: true,
              includeConversion: false,
              includeArithmetic: false,
              includeComparison: true,
              includeWordProblems: false,
              useMetricUnits: true,
              useImperialUnits: true,
              allowDecimals: false,
              maxValue: 50
            }
          }),
          
          schemaV2.createPreset({
            id: 'metric-conversions',
            label: 'Metric Conversions',
            description: 'Focus on metric system volume/capacity conversions',
            icon: 'swap_horiz',
            category: 'scope',
            values: {
              problemCount: 12,
              includeBasicMeasurement: false,
              includeConversion: true,
              includeArithmetic: false,
              includeComparison: false,
              includeWordProblems: false,
              useMetricUnits: true,
              useImperialUnits: false,
              allowDecimals: true,
              maxValue: 100
            }
          }),
          
          schemaV2.createPreset({
            id: 'imperial-conversions',
            label: 'Imperial Conversions',
            description: 'Focus on imperial system volume conversions',
            icon: 'swap_horiz',
            category: 'scope',
            values: {
              problemCount: 12,
              includeBasicMeasurement: false,
              includeConversion: true,
              includeArithmetic: false,
              includeComparison: false,
              includeWordProblems: false,
              useMetricUnits: false,
              useImperialUnits: true,
              allowDecimals: false,
              maxValue: 100
            }
          }),
          
          schemaV2.createPreset({
            id: 'volume-arithmetic',
            label: 'Volume Arithmetic',
            description: 'Practice adding and subtracting volumes',
            icon: 'calculate',
            category: 'scope',
            values: {
              problemCount: 10,
              includeBasicMeasurement: false,
              includeConversion: false,
              includeArithmetic: true,
              includeComparison: false,
              includeWordProblems: false,
              useMetricUnits: true,
              useImperialUnits: true,
              allowDecimals: true,
              maxValue: 100
            }
          }),
          
          schemaV2.createPreset({
            id: 'cooking-measurements',
            label: 'Cooking Measurements',
            description: 'Real-world cooking and recipe volume problems',
            icon: 'restaurant',
            category: 'scope',
            values: {
              problemCount: 12,
              includeBasicMeasurement: true,
              includeConversion: true,
              includeArithmetic: true,
              includeComparison: false,
              includeWordProblems: true,
              useMetricUnits: true,
              useImperialUnits: true,
              allowDecimals: true,
              maxValue: 50
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive-volume',
            label: 'Comprehensive Volume',
            description: 'Mixed practice with all volume/capacity concepts',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 15,
              includeBasicMeasurement: true,
              includeConversion: true,
              includeArithmetic: true,
              includeComparison: true,
              includeWordProblems: true,
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
    if (!params.includeBasicMeasurement && !params.includeConversion && !params.includeArithmetic && !params.includeComparison && !params.includeWordProblems) {
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
    if (params.includeWordProblems) enabledTypes.push('word')
    
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
      case 'word':
        return this.generateWordProblem(params)
      default:
        return this.generateConversionProblem(params)
    }
  }

  generateBasicMeasurementProblem(params) {
    const availableUnits = this.getAvailableUnits(params)
    const unit = this.getRandomElement(availableUnits)
    const value = this.generateValue(params)
    
    const containers = ['bottle', 'cup', 'jar', 'tank', 'bucket', 'glass', 'pitcher', 'container']
    const container = this.getRandomElement(containers)
    
    const questionText = `A ${container} holds ${value} ${unit.name}. What is its capacity?`
    const questionLaTeX = `\\text{A ${container} holds } ${value} \\text{ ${unit.name}}\\text{. What is its capacity?}`
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `${value} ${unit.name}`,
      answerLaTeX: `${value} \\text{ ${unit.name}}`,
      steps: [
        `\\text{The ${container} holds } ${value} \\text{ ${unit.name}}`,
        `\\text{Answer: } ${value} \\text{ ${unit.name}}`
      ],
      metadata: {
        operation: 'basic-volume-measurement',
        unit: unit.name,
        value: value,
        container: container,
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
        operation: 'volume-conversion',
        fromUnit: fromUnit.name,
        toUnit: toUnit.name,
        fromValue: fromValue,
        toValue: toValue,
        difficulty: this.difficulty,
        estimatedTime: '60 seconds'
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
      operationWord = 'remaining'
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
        operation: `volume-${operation}`,
        unit: unit.name,
        operands: [value1, value2],
        result: result,
        difficulty: this.difficulty,
        estimatedTime: '50 seconds'
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
      comparison = 'more'
      comparisonSymbol = '>'
    } else {
      comparison = 'less'
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
        operation: 'volume-comparison',
        unit: unit.name,
        values: [value1, value2],
        comparison: comparison,
        difficulty: this.difficulty,
        estimatedTime: '45 seconds'
      }
    }
  }

  generateWordProblem(params) {
    const availableUnits = this.getAvailableUnits(params)
    const unit = this.getRandomElement(availableUnits)
    const value1 = this.generateValue(params)
    const value2 = this.generateValue(params)
    
    const scenarios = [
      {
        question: `A recipe calls for ${value1} ${unit.name} of water and ${value2} ${unit.name} of milk.\n\nHow much liquid is needed in total?`,
        questionLaTeX: `\\text{A recipe calls for ${value1} ${unit.name} of water and ${value2} ${unit.name} of milk.} \\\\ \\text{How much liquid is needed in total?}`,
        answer: value1 + value2,
        operation: 'addition'
      },
      {
        question: `A tank holds ${Math.max(value1, value2)} ${unit.name} of water.\n\nIf ${Math.min(value1, value2)} ${unit.name} is used, how much remains?`,
        questionLaTeX: `\\text{A tank holds ${Math.max(value1, value2)} ${unit.name} of water.} \\\\ \\text{If ${Math.min(value1, value2)} ${unit.name} is used, how much remains?}`,
        answer: Math.max(value1, value2) - Math.min(value1, value2),
        operation: 'subtraction'
      },
      {
        question: `A container has a capacity of ${value1} ${unit.name}.\n\nIs this more or less than ${value2} ${unit.name}?`,
        questionLaTeX: `\\text{A container has a capacity of ${value1} ${unit.name}.} \\\\ \\text{Is this more or less than ${value2} ${unit.name}?}`,
        answer: value1 > value2 ? 'more' : 'less',
        operation: 'comparison'
      }
    ]
    
    const scenario = this.getRandomElement(scenarios)
    
    return {
      question: scenario.question,
      questionLaTeX: scenario.questionLaTeX,
      answer: scenario.answer.toString(),
      answerLaTeX: scenario.answer.toString(),
      steps: [
        `\\text{Given information: } ${value1} \\text{ ${unit.name}} \\text{ and } ${value2} \\text{ ${unit.name}}`,
        `\\text{Answer: } ${scenario.answer}`
      ],
      metadata: {
        operation: `volume-word-${scenario.operation}`,
        unit: unit.name,
        values: [value1, value2],
        scenario: 'word-problem',
        difficulty: this.difficulty,
        estimatedTime: '90 seconds'
      }
    }
  }

  getAvailableUnits(params) {
    const units = []
    
    if (params.useMetricUnits) {
      units.push(
        { symbol: 'ml', name: 'milliliters', factor: 1 },
        { symbol: 'L', name: 'liters', factor: 1000 },
        { symbol: 'm³', name: 'cubic meters', factor: 1000000 }
      )
    }
    
    if (params.useImperialUnits) {
      units.push(
        { symbol: 'fl oz', name: 'fluid ounces', factor: 1 },
        { symbol: 'cup', name: 'cups', factor: 8 },
        { symbol: 'pt', name: 'pints', factor: 16 },
        { symbol: 'qt', name: 'quarts', factor: 32 },
        { symbol: 'gal', name: 'gallons', factor: 128 }
      )
    }
    
    return units
  }

  getConversions() {
    return [
      // Metric conversions
      { from: 'ml', to: 'L', factor: 0.001 },
      { from: 'L', to: 'ml', factor: 1000 },
      { from: 'L', to: 'm³', factor: 0.001 },
      { from: 'm³', to: 'L', factor: 1000 },
      
      // Imperial conversions
      { from: 'fl oz', to: 'cup', factor: 1/8 },
      { from: 'cup', to: 'fl oz', factor: 8 },
      { from: 'cup', to: 'pt', factor: 1/2 },
      { from: 'pt', to: 'cup', factor: 2 },
      { from: 'pt', to: 'qt', factor: 1/2 },
      { from: 'qt', to: 'pt', factor: 2 },
      { from: 'qt', to: 'gal', factor: 1/4 },
      { from: 'gal', to: 'qt', factor: 4 },
      
      // Metric to Imperial (simplified)
      { from: 'ml', to: 'fl oz', factor: 0.034 },
      { from: 'fl oz', to: 'ml', factor: 29.57 },
      { from: 'L', to: 'qt', factor: 1.057 },
      { from: 'qt', to: 'L', factor: 0.946 }
    ]
  }

  generateValue(params) {
    const max = Math.min(params.maxValue, 50)
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

export default VolumeCapacityGenerator