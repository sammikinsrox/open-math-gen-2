import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Unit Conversion Generator
 * Generates problems involving general unit conversions across different measurement types
 */
export class UnitConversionGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Unit Conversion',
      description: 'Generate problems involving unit conversions across length, weight, volume, time, and temperature',
      category: 'measurement-units',
      difficulty: 'medium',
      icon: 'transform',
      tags: ['measurement', 'conversion', 'units', 'metric', 'imperial', 'mixed-units'],
      gradeLevel: '4-12',
      estimatedTime: '75 seconds',
      exampleProblem: {
        question: 'Convert 3.5 meters to centimeters',
        questionLaTeX: '\\text{Convert } 3.5 \\text{ meters to centimeters}',
        answer: '350 centimeters',
        answerLaTeX: '350 \\text{ centimeters}'
      },
      
      defaultParameters: {
        problemCount: 10,
        includeLength: true,
        includeWeight: true,
        includeVolume: true,
        includeTime: false,
        includeTemperature: false,
        includeMetricToMetric: true,
        includeImperialToImperial: true,
        includeMetricToImperial: false,
        includeImperialToMetric: false,
        includeChainConversions: false,
        allowDecimals: true,
        maxValue: 100,
        showFormulas: false
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
                description: 'How many unit conversion problems to generate',
                min: 1,
                max: 50,
                required: true,
                slider: true,
                presets: [5, 8, 10, 15],
                order: 1
              })
            }
          }),
          
          measurementTypes: schemaV2.createCategory({
            id: 'measurementTypes',
            label: 'Measurement Types',
            description: 'Choose which types of measurements to include',
            icon: 'transform',
            color: 'green',
            order: 2,
            parameters: {
              includeLength: schemaV2.createParameter({
                type: 'boolean',
                label: 'Length/Distance',
                description: 'Include length and distance unit conversions',
                helpText: 'Units: mm, cm, m, km, in, ft, yd, mi',
                order: 1
              }),
              includeWeight: schemaV2.createParameter({
                type: 'boolean',
                label: 'Weight/Mass',
                description: 'Include weight and mass unit conversions',
                helpText: 'Units: mg, g, kg, t, oz, lb, ton',
                order: 2
              }),
              includeVolume: schemaV2.createParameter({
                type: 'boolean',
                label: 'Volume/Capacity',
                description: 'Include volume and capacity unit conversions',
                helpText: 'Units: ml, L, fl oz, cup, pt, qt, gal',
                order: 3
              }),
              includeTime: schemaV2.createParameter({
                type: 'boolean',
                label: 'Time',
                description: 'Include time unit conversions',
                helpText: 'Units: sec, min, hr, day',
                order: 4
              }),
              includeTemperature: schemaV2.createParameter({
                type: 'boolean',
                label: 'Temperature',
                description: 'Include temperature scale conversions',
                helpText: 'Scales: Celsius (°C), Fahrenheit (°F), Kelvin (K)',
                order: 5
              })
            }
          }),
          
          conversionTypes: schemaV2.createCategory({
            id: 'conversionTypes',
            label: 'Conversion Types',
            description: 'Choose which types of conversions to include',
            icon: 'compare_arrows',
            color: 'purple',
            order: 3,
            parameters: {
              includeMetricToMetric: schemaV2.createParameter({
                type: 'boolean',
                label: 'Metric to Metric',
                description: 'Conversions within the metric system',
                helpText: 'Examples: meters to cm, kg to grams, L to mL',
                order: 1
              }),
              includeImperialToImperial: schemaV2.createParameter({
                type: 'boolean',
                label: 'Imperial to Imperial',
                description: 'Conversions within the imperial system',
                helpText: 'Examples: feet to inches, pounds to ounces, quarts to cups',
                order: 2
              }),
              includeMetricToImperial: schemaV2.createParameter({
                type: 'boolean',
                label: 'Metric to Imperial',
                description: 'Convert from metric to imperial units',
                helpText: 'Examples: cm to inches, kg to pounds, L to quarts',
                order: 3
              }),
              includeImperialToMetric: schemaV2.createParameter({
                type: 'boolean',
                label: 'Imperial to Metric',
                description: 'Convert from imperial to metric units',
                helpText: 'Examples: inches to cm, pounds to kg, quarts to L',
                order: 4
              })
            }
          }),
          
          complexity: schemaV2.createCategory({
            id: 'complexity',
            label: 'Problem Complexity',
            description: 'Control the difficulty and features of problems',
            icon: 'tune',
            color: 'orange',
            order: 4,
            parameters: {
              includeChainConversions: schemaV2.createParameter({
                type: 'boolean',
                label: 'Chain Conversions',
                description: 'Include multi-step conversions (advanced)',
                helpText: 'Examples: km → m → cm, or hours → min → sec',
                order: 1
              }),
              showFormulas: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Conversion Formulas',
                description: 'Display conversion formulas in solution steps',
                helpText: 'Shows the mathematical relationship between units',
                order: 2
              })
            }
          }),
          
          numberProperties: schemaV2.createCategory({
            id: 'numberProperties',
            label: 'Number Properties',
            description: 'Control the types and sizes of numbers used',
            icon: 'tag',
            color: 'teal',
            order: 5,
            parameters: {
              maxValue: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Value',
                description: 'Largest value to use in conversions',
                min: 1,
                max: 1000,
                required: true,
                slider: true,
                presets: [50, 100, 500, 1000],
                helpText: 'Controls the size of numbers in conversion problems',
                order: 1
              }),
              allowDecimals: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Decimal Values',
                description: 'Allow decimal numbers in conversions',
                helpText: 'Examples: 2.5 meters, 3.7 liters, 1.25 pounds',
                order: 2
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'basic-metric',
            label: 'Basic Metric',
            description: 'Simple metric system conversions',
            icon: 'looks_one',
            category: 'difficulty',
            values: {
              problemCount: 10,
              includeLength: true,
              includeWeight: true,
              includeVolume: true,
              includeTime: false,
              includeTemperature: false,
              includeMetricToMetric: true,
              includeImperialToImperial: false,
              includeMetricToImperial: false,
              includeImperialToMetric: false,
              includeChainConversions: false,
              allowDecimals: false,
              maxValue: 100,
              showFormulas: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'basic-imperial',
            label: 'Basic Imperial',
            description: 'Simple imperial system conversions',
            icon: 'looks_one',
            category: 'difficulty',
            values: {
              problemCount: 10,
              includeLength: true,
              includeWeight: true,
              includeVolume: true,
              includeTime: false,
              includeTemperature: false,
              includeMetricToMetric: false,
              includeImperialToImperial: true,
              includeMetricToImperial: false,
              includeImperialToMetric: false,
              includeChainConversions: false,
              allowDecimals: false,
              maxValue: 50,
              showFormulas: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'metric-imperial-mixed',
            label: 'Metric-Imperial Mixed',
            description: 'Practice converting between metric and imperial',
            icon: 'swap_horiz',
            category: 'scope',
            values: {
              problemCount: 12,
              includeLength: true,
              includeWeight: true,
              includeVolume: true,
              includeTime: false,
              includeTemperature: false,
              includeMetricToMetric: false,
              includeImperialToImperial: false,
              includeMetricToImperial: true,
              includeImperialToMetric: true,
              includeChainConversions: false,
              allowDecimals: true,
              maxValue: 100,
              showFormulas: true
            }
          }),
          
          schemaV2.createPreset({
            id: 'temperature-conversions',
            label: 'Temperature Conversions',
            description: 'Focus on temperature scale conversions',
            icon: 'thermostat',
            category: 'scope',
            values: {
              problemCount: 10,
              includeLength: false,
              includeWeight: false,
              includeVolume: false,
              includeTime: false,
              includeTemperature: true,
              includeMetricToMetric: true,
              includeImperialToImperial: false,
              includeMetricToImperial: true,
              includeImperialToMetric: true,
              includeChainConversions: false,
              allowDecimals: true,
              maxValue: 100,
              showFormulas: true
            }
          }),
          
          schemaV2.createPreset({
            id: 'advanced-chain-conversions',
            label: 'Advanced Chain Conversions',
            description: 'Multi-step conversions for advanced students',
            icon: 'link',
            category: 'difficulty',
            values: {
              problemCount: 8,
              includeLength: true,
              includeWeight: true,
              includeVolume: true,
              includeTime: true,
              includeTemperature: false,
              includeMetricToMetric: true,
              includeImperialToImperial: true,
              includeMetricToImperial: false,
              includeImperialToMetric: false,
              includeChainConversions: true,
              allowDecimals: true,
              maxValue: 100,
              showFormulas: true
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive-conversions',
            label: 'Comprehensive Conversions',
            description: 'Mixed practice with all conversion types',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 15,
              includeLength: true,
              includeWeight: true,
              includeVolume: true,
              includeTime: true,
              includeTemperature: true,
              includeMetricToMetric: true,
              includeImperialToImperial: true,
              includeMetricToImperial: true,
              includeImperialToMetric: true,
              includeChainConversions: true,
              allowDecimals: true,
              maxValue: 200,
              showFormulas: false
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
    if (!params.includeMetricToMetric && !params.includeImperialToImperial && !params.includeMetricToImperial && !params.includeImperialToMetric) {
      customErrors.push('At least one conversion type must be enabled')
    }
    if (!params.includeLength && !params.includeWeight && !params.includeVolume && !params.includeTime && !params.includeTemperature) {
      customErrors.push('At least one measurement type must be enabled')
    }
    if (customErrors.length > 0) {
      throw new Error(`Invalid parameters: ${customErrors.join(', ')}`)
    }
    
    // Build array of enabled measurement types
    const enabledTypes = []
    if (params.includeLength) enabledTypes.push('length')
    if (params.includeWeight) enabledTypes.push('weight')
    if (params.includeVolume) enabledTypes.push('volume')
    if (params.includeTime) enabledTypes.push('time')
    if (params.includeTemperature) enabledTypes.push('temperature')
    
    if (enabledTypes.length === 0) {
      throw new Error('At least one measurement type must be enabled')
    }
    
    const measurementType = this.getRandomElement(enabledTypes)
    
    if (params.includeChainConversions && Math.random() < 0.3) {
      return this.generateChainConversionProblem(measurementType, params)
    } else {
      return this.generateSimpleConversionProblem(measurementType, params)
    }
  }

  generateSimpleConversionProblem(measurementType, params) {
    const units = this.getUnitsForType(measurementType)
    const conversions = this.getConversionsForType(measurementType, params)
    
    if (conversions.length === 0) {
      throw new Error(`No valid conversions available for ${measurementType} with current settings`)
    }
    
    const conversion = this.getRandomElement(conversions)
    const fromUnit = units.find(u => u.symbol === conversion.from)
    const toUnit = units.find(u => u.symbol === conversion.to)
    
    const fromValue = this.generateValue(params)
    let toValue
    
    if (measurementType === 'temperature') {
      toValue = this.convertTemperature(fromValue, conversion.from, conversion.to)
    } else {
      toValue = fromValue * conversion.factor
    }
    
    if (!params.allowDecimals) {
      toValue = Math.round(toValue)
    } else {
      toValue = Math.round(toValue * 1000) / 1000
    }
    
    const questionText = `Convert ${fromValue} ${fromUnit.name} to ${toUnit.name}`
    const questionLaTeX = `\\text{Convert } ${fromValue} \\text{ ${fromUnit.name} to ${toUnit.name}}`
    
    const steps = this.generateConversionSteps(
      fromValue, fromUnit, toValue, toUnit, conversion, params, measurementType
    )
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `${toValue} ${toUnit.name}`,
      answerLaTeX: `${toValue} \\text{ ${toUnit.name}}`,
      steps: steps,
      metadata: {
        operation: 'unit-conversion',
        measurementType: measurementType,
        fromUnit: fromUnit.name,
        toUnit: toUnit.name,
        fromValue: fromValue,
        toValue: toValue,
        conversionType: this.getConversionType(fromUnit, toUnit),
        difficulty: this.difficulty,
        estimatedTime: '75 seconds'
      }
    }
  }

  generateChainConversionProblem(measurementType, params) {
    const units = this.getUnitsForType(measurementType)
    const conversions = this.getConversionsForType(measurementType, params)
    
    // Find a chain of 2-3 conversions
    const chainLength = Math.random() < 0.7 ? 2 : 3
    const chain = this.findConversionChain(units, conversions, chainLength)
    
    if (!chain) {
      // Fall back to simple conversion if chain not found
      return this.generateSimpleConversionProblem(measurementType, params)
    }
    
    const startValue = this.generateValue(params)
    let currentValue = startValue
    const steps = []
    
    if (params.showFormulas) {
      steps.push(`\\text{Chain conversion: } ${chain.units[0].name} \\rightarrow ${chain.units[chain.units.length - 1].name}`)
    }
    
    // Perform each step in the chain
    for (let i = 0; i < chain.conversions.length; i++) {
      const conversion = chain.conversions[i]
      const fromUnit = chain.units[i]
      const toUnit = chain.units[i + 1]
      
      let newValue
      if (measurementType === 'temperature') {
        newValue = this.convertTemperature(currentValue, conversion.from, conversion.to)
      } else {
        newValue = currentValue * conversion.factor
      }
      
      if (!params.allowDecimals) {
        newValue = Math.round(newValue)
      } else {
        newValue = Math.round(newValue * 1000) / 1000
      }
      
      if (measurementType === 'temperature') {
        steps.push(`\\text{Step ${i + 1}: } ${currentValue}°${conversion.from} \\rightarrow ${newValue}°${conversion.to}`)
      } else {
        steps.push(`\\text{Step ${i + 1}: } ${currentValue} \\text{ ${fromUnit.name}} \\times ${conversion.factor} = ${newValue} \\text{ ${toUnit.name}}`)
      }
      
      currentValue = newValue
    }
    
    const finalValue = currentValue
    const startUnit = chain.units[0]
    const endUnit = chain.units[chain.units.length - 1]
    
    const questionText = `Convert ${startValue} ${startUnit.name} to ${endUnit.name}`
    const questionLaTeX = `\\text{Convert } ${startValue} \\text{ ${startUnit.name} to ${endUnit.name}}`
    
    steps.push(`\\text{Answer: } ${finalValue} \\text{ ${endUnit.name}}`)
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `${finalValue} ${endUnit.name}`,
      answerLaTeX: `${finalValue} \\text{ ${endUnit.name}}`,
      steps: steps,
      metadata: {
        operation: 'chain-conversion',
        measurementType: measurementType,
        fromUnit: startUnit.name,
        toUnit: endUnit.name,
        fromValue: startValue,
        toValue: finalValue,
        chainLength: chainLength,
        difficulty: this.difficulty,
        estimatedTime: '120 seconds'
      }
    }
  }

  getUnitsForType(measurementType) {
    const allUnits = {
      length: [
        { symbol: 'mm', name: 'millimeters', system: 'metric' },
        { symbol: 'cm', name: 'centimeters', system: 'metric' },
        { symbol: 'm', name: 'meters', system: 'metric' },
        { symbol: 'km', name: 'kilometers', system: 'metric' },
        { symbol: 'in', name: 'inches', system: 'imperial' },
        { symbol: 'ft', name: 'feet', system: 'imperial' },
        { symbol: 'yd', name: 'yards', system: 'imperial' },
        { symbol: 'mi', name: 'miles', system: 'imperial' }
      ],
      weight: [
        { symbol: 'mg', name: 'milligrams', system: 'metric' },
        { symbol: 'g', name: 'grams', system: 'metric' },
        { symbol: 'kg', name: 'kilograms', system: 'metric' },
        { symbol: 't', name: 'tonnes', system: 'metric' },
        { symbol: 'oz', name: 'ounces', system: 'imperial' },
        { symbol: 'lb', name: 'pounds', system: 'imperial' },
        { symbol: 'ton', name: 'tons', system: 'imperial' }
      ],
      volume: [
        { symbol: 'ml', name: 'milliliters', system: 'metric' },
        { symbol: 'L', name: 'liters', system: 'metric' },
        { symbol: 'fl oz', name: 'fluid ounces', system: 'imperial' },
        { symbol: 'cup', name: 'cups', system: 'imperial' },
        { symbol: 'pt', name: 'pints', system: 'imperial' },
        { symbol: 'qt', name: 'quarts', system: 'imperial' },
        { symbol: 'gal', name: 'gallons', system: 'imperial' }
      ],
      time: [
        { symbol: 'sec', name: 'seconds', system: 'universal' },
        { symbol: 'min', name: 'minutes', system: 'universal' },
        { symbol: 'hr', name: 'hours', system: 'universal' },
        { symbol: 'day', name: 'days', system: 'universal' }
      ],
      temperature: [
        { symbol: 'C', name: 'Celsius', system: 'metric' },
        { symbol: 'F', name: 'Fahrenheit', system: 'imperial' },
        { symbol: 'K', name: 'Kelvin', system: 'scientific' }
      ]
    }
    
    return allUnits[measurementType] || []
  }

  getConversionsForType(measurementType, params) {
    const allConversions = {
      length: [
        // Metric conversions
        { from: 'mm', to: 'cm', factor: 0.1, type: 'metric-metric' },
        { from: 'cm', to: 'mm', factor: 10, type: 'metric-metric' },
        { from: 'cm', to: 'm', factor: 0.01, type: 'metric-metric' },
        { from: 'm', to: 'cm', factor: 100, type: 'metric-metric' },
        { from: 'm', to: 'km', factor: 0.001, type: 'metric-metric' },
        { from: 'km', to: 'm', factor: 1000, type: 'metric-metric' },
        
        // Imperial conversions
        { from: 'in', to: 'ft', factor: 1/12, type: 'imperial-imperial' },
        { from: 'ft', to: 'in', factor: 12, type: 'imperial-imperial' },
        { from: 'ft', to: 'yd', factor: 1/3, type: 'imperial-imperial' },
        { from: 'yd', to: 'ft', factor: 3, type: 'imperial-imperial' },
        { from: 'yd', to: 'mi', factor: 1/1760, type: 'imperial-imperial' },
        { from: 'mi', to: 'yd', factor: 1760, type: 'imperial-imperial' },
        
        // Cross-system conversions
        { from: 'cm', to: 'in', factor: 0.394, type: 'metric-imperial' },
        { from: 'in', to: 'cm', factor: 2.54, type: 'imperial-metric' },
        { from: 'm', to: 'ft', factor: 3.281, type: 'metric-imperial' },
        { from: 'ft', to: 'm', factor: 0.305, type: 'imperial-metric' }
      ],
      weight: [
        // Metric conversions
        { from: 'mg', to: 'g', factor: 0.001, type: 'metric-metric' },
        { from: 'g', to: 'mg', factor: 1000, type: 'metric-metric' },
        { from: 'g', to: 'kg', factor: 0.001, type: 'metric-metric' },
        { from: 'kg', to: 'g', factor: 1000, type: 'metric-metric' },
        { from: 'kg', to: 't', factor: 0.001, type: 'metric-metric' },
        { from: 't', to: 'kg', factor: 1000, type: 'metric-metric' },
        
        // Imperial conversions
        { from: 'oz', to: 'lb', factor: 1/16, type: 'imperial-imperial' },
        { from: 'lb', to: 'oz', factor: 16, type: 'imperial-imperial' },
        { from: 'lb', to: 'ton', factor: 1/2000, type: 'imperial-imperial' },
        { from: 'ton', to: 'lb', factor: 2000, type: 'imperial-imperial' },
        
        // Cross-system conversions
        { from: 'g', to: 'oz', factor: 0.035, type: 'metric-imperial' },
        { from: 'oz', to: 'g', factor: 28.35, type: 'imperial-metric' },
        { from: 'kg', to: 'lb', factor: 2.205, type: 'metric-imperial' },
        { from: 'lb', to: 'kg', factor: 0.454, type: 'imperial-metric' }
      ],
      volume: [
        // Metric conversions
        { from: 'ml', to: 'L', factor: 0.001, type: 'metric-metric' },
        { from: 'L', to: 'ml', factor: 1000, type: 'metric-metric' },
        
        // Imperial conversions
        { from: 'fl oz', to: 'cup', factor: 1/8, type: 'imperial-imperial' },
        { from: 'cup', to: 'fl oz', factor: 8, type: 'imperial-imperial' },
        { from: 'cup', to: 'pt', factor: 1/2, type: 'imperial-imperial' },
        { from: 'pt', to: 'cup', factor: 2, type: 'imperial-imperial' },
        { from: 'pt', to: 'qt', factor: 1/2, type: 'imperial-imperial' },
        { from: 'qt', to: 'pt', factor: 2, type: 'imperial-imperial' },
        { from: 'qt', to: 'gal', factor: 1/4, type: 'imperial-imperial' },
        { from: 'gal', to: 'qt', factor: 4, type: 'imperial-imperial' },
        
        // Cross-system conversions
        { from: 'ml', to: 'fl oz', factor: 0.034, type: 'metric-imperial' },
        { from: 'fl oz', to: 'ml', factor: 29.57, type: 'imperial-metric' },
        { from: 'L', to: 'qt', factor: 1.057, type: 'metric-imperial' },
        { from: 'qt', to: 'L', factor: 0.946, type: 'imperial-metric' }
      ],
      time: [
        { from: 'sec', to: 'min', factor: 1/60, type: 'universal' },
        { from: 'min', to: 'sec', factor: 60, type: 'universal' },
        { from: 'min', to: 'hr', factor: 1/60, type: 'universal' },
        { from: 'hr', to: 'min', factor: 60, type: 'universal' },
        { from: 'hr', to: 'day', factor: 1/24, type: 'universal' },
        { from: 'day', to: 'hr', factor: 24, type: 'universal' }
      ],
      temperature: [
        { from: 'C', to: 'F', type: 'metric-imperial' },
        { from: 'F', to: 'C', type: 'imperial-metric' },
        { from: 'C', to: 'K', type: 'metric-scientific' },
        { from: 'K', to: 'C', type: 'scientific-metric' },
        { from: 'F', to: 'K', type: 'imperial-scientific' },
        { from: 'K', to: 'F', type: 'scientific-imperial' }
      ]
    }
    
    const conversions = allConversions[measurementType] || []
    
    // Filter based on enabled conversion types
    return conversions.filter(conv => {
      if (conv.type === 'metric-metric' && params.includeMetricToMetric) return true
      if (conv.type === 'imperial-imperial' && params.includeImperialToImperial) return true
      if (conv.type === 'metric-imperial' && params.includeMetricToImperial) return true
      if (conv.type === 'imperial-metric' && params.includeImperialToMetric) return true
      if (conv.type === 'universal') return true
      if (conv.type.includes('scientific')) return true
      return false
    })
  }

  findConversionChain(units, conversions, length) {
    // Simple chain finding - could be more sophisticated
    for (let attempt = 0; attempt < 10; attempt++) {
      const startUnit = this.getRandomElement(units)
      let currentUnit = startUnit
      const chainUnits = [currentUnit]
      const chainConversions = []
      
      for (let step = 0; step < length - 1; step++) {
        const possibleConversions = conversions.filter(c => c.from === currentUnit.symbol)
        if (possibleConversions.length === 0) break
        
        const nextConversion = this.getRandomElement(possibleConversions)
        const nextUnit = units.find(u => u.symbol === nextConversion.to)
        
        chainConversions.push(nextConversion)
        chainUnits.push(nextUnit)
        currentUnit = nextUnit
      }
      
      if (chainConversions.length === length - 1) {
        return {
          units: chainUnits,
          conversions: chainConversions
        }
      }
    }
    
    return null
  }

  convertTemperature(temp, fromScale, toScale) {
    if (fromScale === toScale) return temp
    
    // Convert through Celsius as intermediate
    let celsius
    
    switch (fromScale) {
      case 'C': celsius = temp; break
      case 'F': celsius = (temp - 32) * 5/9; break
      case 'K': celsius = temp - 273.15; break
      default: throw new Error(`Unknown temperature scale: ${fromScale}`)
    }
    
    switch (toScale) {
      case 'C': return celsius
      case 'F': return celsius * 9/5 + 32
      case 'K': return celsius + 273.15
      default: throw new Error(`Unknown temperature scale: ${toScale}`)
    }
  }

  generateConversionSteps(fromValue, fromUnit, toValue, toUnit, conversion, params, measurementType) {
    const steps = []
    
    if (params.showFormulas && measurementType !== 'temperature') {
      steps.push(`\\text{Conversion factor: } 1 \\text{ ${fromUnit.name}} = ${conversion.factor} \\text{ ${toUnit.name}}`)
    }
    
    if (measurementType === 'temperature') {
      steps.push(...this.getTemperatureConversionSteps(fromValue, conversion.from, conversion.to, toValue))
    } else {
      steps.push(`${fromValue} \\text{ ${fromUnit.name}} \\times ${conversion.factor} = ${toValue} \\text{ ${toUnit.name}}`)
    }
    
    steps.push(`\\text{Answer: } ${toValue} \\text{ ${toUnit.name}}`)
    
    return steps
  }

  getTemperatureConversionSteps(fromTemp, fromScale, toScale, result) {
    const steps = []
    
    if (fromScale === 'C' && toScale === 'F') {
      steps.push(`°F = °C \\times \\frac{9}{5} + 32`)
      steps.push(`°F = ${fromTemp} \\times \\frac{9}{5} + 32 = ${result}`)
    } else if (fromScale === 'F' && toScale === 'C') {
      steps.push(`°C = (°F - 32) \\times \\frac{5}{9}`)
      steps.push(`°C = (${fromTemp} - 32) \\times \\frac{5}{9} = ${result}`)
    } else if (fromScale === 'C' && toScale === 'K') {
      steps.push(`K = °C + 273.15`)
      steps.push(`K = ${fromTemp} + 273.15 = ${result}`)
    } else if (fromScale === 'K' && toScale === 'C') {
      steps.push(`°C = K - 273.15`)
      steps.push(`°C = ${fromTemp} - 273.15 = ${result}`)
    }
    
    return steps
  }

  getConversionType(fromUnit, toUnit) {
    if (fromUnit.system === toUnit.system) {
      return `${fromUnit.system}-${toUnit.system}`
    } else {
      return `${fromUnit.system}-to-${toUnit.system}`
    }
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

export default UnitConversionGenerator