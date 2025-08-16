import { BaseGenerator } from '../BaseGenerator.js'

/**
 * Unit Conversion Generator
 * Generates problems involving general unit conversions across different measurement types
 */
export class UnitConversionGenerator extends BaseGenerator {
  constructor() {
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
      
      parameterSchema: {
        problemCount: {
          type: 'number',
          label: 'Number of Problems',
          description: 'How many unit conversion problems to generate',
          min: 1,
          max: 100,
          required: true
        },
        includeLength: {
          type: 'boolean',
          label: 'Include Length',
          description: 'Include length unit conversions (m, cm, ft, in, etc.)'
        },
        includeWeight: {
          type: 'boolean',
          label: 'Include Weight',
          description: 'Include weight unit conversions (kg, g, lb, oz, etc.)'
        },
        includeVolume: {
          type: 'boolean',
          label: 'Include Volume',
          description: 'Include volume unit conversions (L, ml, gal, qt, etc.)'
        },
        includeTime: {
          type: 'boolean',
          label: 'Include Time',
          description: 'Include time unit conversions (hr, min, sec, etc.)'
        },
        includeTemperature: {
          type: 'boolean',
          label: 'Include Temperature',
          description: 'Include temperature conversions (°C, °F, K)'
        },
        includeMetricToMetric: {
          type: 'boolean',
          label: 'Metric to Metric',
          description: 'Include conversions within metric system'
        },
        includeImperialToImperial: {
          type: 'boolean',
          label: 'Imperial to Imperial',
          description: 'Include conversions within imperial system'
        },
        includeMetricToImperial: {
          type: 'boolean',
          label: 'Metric to Imperial',
          description: 'Include conversions from metric to imperial'
        },
        includeImperialToMetric: {
          type: 'boolean',
          label: 'Imperial to Metric',
          description: 'Include conversions from imperial to metric'
        },
        includeChainConversions: {
          type: 'boolean',
          label: 'Include Chain Conversions',
          description: 'Include multi-step conversions (e.g., km → m → cm)'
        },
        allowDecimals: {
          type: 'boolean',
          label: 'Allow Decimals',
          description: 'Allow decimal values in conversions'
        },
        maxValue: {
          type: 'number',
          label: 'Maximum Value',
          description: 'Largest value to use in conversions',
          min: 1,
          max: 1000,
          required: true
        },
        showFormulas: {
          type: 'boolean',
          label: 'Show Formulas',
          description: 'Show conversion formulas in solutions'
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