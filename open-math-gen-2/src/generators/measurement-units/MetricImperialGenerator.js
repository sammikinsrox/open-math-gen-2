import { BaseGenerator } from '../BaseGenerator.js'

/**
 * Metric-Imperial Generator
 * Generates problems specifically focused on conversions between metric and imperial systems
 */
export class MetricImperialGenerator extends BaseGenerator {
  constructor() {
    super({
      name: 'Metric-Imperial',
      description: 'Generate problems involving conversions between metric and imperial measurement systems',
      category: 'measurement-units',
      difficulty: 'hard',
      icon: 'swap_horiz',
      tags: ['measurement', 'conversion', 'metric', 'imperial', 'systems', 'cross-conversion'],
      gradeLevel: '5-12',
      estimatedTime: '90 seconds',
      exampleProblem: {
        question: 'Convert 5 kilometers to miles',
        questionLaTeX: '\\text{Convert } 5 \\text{ kilometers to miles}',
        answer: '3.11 miles',
        answerLaTeX: '3.11 \\text{ miles}'
      },
      
      defaultParameters: {
        problemCount: 10,
        includeLength: true,
        includeWeight: true,
        includeVolume: true,
        includeTemperature: false,
        includeMetricToImperial: true,
        includeImperialToMetric: true,
        includeCommonConversions: true,
        includePreciseConversions: false,
        includeApproximations: true,
        includeWordProblems: false,
        allowDecimals: true,
        decimalPlaces: 2,
        maxValue: 100,
        showApproximateVsExact: false
      },
      
      parameterSchema: {
        problemCount: {
          type: 'number',
          label: 'Number of Problems',
          description: 'How many metric-imperial conversion problems to generate',
          min: 1,
          max: 100,
          required: true
        },
        includeLength: {
          type: 'boolean',
          label: 'Include Length',
          description: 'Include length conversions (km↔mi, m↔ft, cm↔in)'
        },
        includeWeight: {
          type: 'boolean',
          label: 'Include Weight',
          description: 'Include weight conversions (kg↔lb, g↔oz)'
        },
        includeVolume: {
          type: 'boolean',
          label: 'Include Volume',
          description: 'Include volume conversions (L↔gal, ml↔fl oz)'
        },
        includeTemperature: {
          type: 'boolean',
          label: 'Include Temperature',
          description: 'Include temperature conversions (°C↔°F)'
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
        includeCommonConversions: {
          type: 'boolean',
          label: 'Common Conversions',
          description: 'Focus on commonly used conversions'
        },
        includePreciseConversions: {
          type: 'boolean',
          label: 'Precise Conversions',
          description: 'Include exact conversion factors'
        },
        includeApproximations: {
          type: 'boolean',
          label: 'Approximations',
          description: 'Include rounded/approximate conversion factors'
        },
        includeWordProblems: {
          type: 'boolean',
          label: 'Include Word Problems',
          description: 'Include real-world conversion scenarios'
        },
        allowDecimals: {
          type: 'boolean',
          label: 'Allow Decimals',
          description: 'Allow decimal values in conversions'
        },
        decimalPlaces: {
          type: 'number',
          label: 'Decimal Places',
          description: 'Number of decimal places in results',
          min: 0,
          max: 4,
          required: true
        },
        maxValue: {
          type: 'number',
          label: 'Maximum Value',
          description: 'Largest value to use in conversions',
          min: 1,
          max: 1000,
          required: true
        },
        showApproximateVsExact: {
          type: 'boolean',
          label: 'Show Approximate vs Exact',
          description: 'Show both approximate and exact values'
        }
      }
    })
  }

  generateProblem(parameters = {}) {
    const params = { ...this.defaultParameters, ...parameters }
    
    const validation = this.validateParameters(params)
    if (!validation.isValid) {
      throw new Error(`Invalid parameters: ${validation.errors.join(', ')}`);
    }
    
    // Build array of enabled measurement types
    const enabledTypes = []
    if (params.includeLength) enabledTypes.push('length')
    if (params.includeWeight) enabledTypes.push('weight')
    if (params.includeVolume) enabledTypes.push('volume')
    if (params.includeTemperature) enabledTypes.push('temperature')
    
    if (enabledTypes.length === 0) {
      throw new Error('At least one measurement type must be enabled')
    }
    
    const measurementType = this.getRandomElement(enabledTypes)
    
    if (params.includeWordProblems && Math.random() < 0.3) {
      return this.generateWordProblem(measurementType, params)
    } else {
      return this.generateDirectConversionProblem(measurementType, params)
    }
  }

  generateDirectConversionProblem(measurementType, params) {
    const conversions = this.getMetricImperialConversions(measurementType, params)
    
    if (conversions.length === 0) {
      throw new Error(`No valid conversions available for ${measurementType} with current settings`)
    }
    
    const conversion = this.getRandomElement(conversions)
    const fromValue = this.generateValue(params)
    
    let toValue
    if (measurementType === 'temperature') {
      toValue = this.convertTemperature(fromValue, conversion.from, conversion.to)
    } else {
      toValue = fromValue * conversion.factor
    }
    
    // Round to specified decimal places
    if (params.allowDecimals) {
      toValue = Math.round(toValue * Math.pow(10, params.decimalPlaces)) / Math.pow(10, params.decimalPlaces)
    } else {
      toValue = Math.round(toValue)
    }
    
    const questionText = `Convert ${fromValue} ${conversion.fromUnit} to ${conversion.toUnit}`
    const questionLaTeX = `\\text{Convert } ${fromValue} \\text{ ${conversion.fromUnit} to ${conversion.toUnit}}`
    
    const steps = this.generateConversionSteps(conversion, fromValue, toValue, params, measurementType)
    
    let answerDisplay = `${toValue} ${conversion.toUnit}`
    let answerLaTeX = `${toValue} \\text{ ${conversion.toUnit}}`
    
    // Show approximate vs exact if enabled
    if (params.showApproximateVsExact && conversion.isApproximate) {
      const exactValue = fromValue * conversion.exactFactor
      const roundedExact = Math.round(exactValue * Math.pow(10, params.decimalPlaces + 1)) / Math.pow(10, params.decimalPlaces + 1)
      answerDisplay += ` (≈${roundedExact} exact)`
      answerLaTeX += ` \\text{ (≈}${roundedExact}\\text{ exact)}`
    }
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: answerDisplay,
      answerLaTeX: answerLaTeX,
      steps: steps,
      metadata: {
        operation: 'metric-imperial-conversion',
        measurementType: measurementType,
        fromSystem: conversion.fromSystem,
        toSystem: conversion.toSystem,
        fromUnit: conversion.fromUnit,
        toUnit: conversion.toUnit,
        fromValue: fromValue,
        toValue: toValue,
        conversionFactor: conversion.factor,
        isApproximate: conversion.isApproximate,
        difficulty: this.difficulty,
        estimatedTime: '90 seconds'
      }
    }
  }

  generateWordProblem(measurementType, params) {
    const scenarios = this.getWordProblemScenarios(measurementType)
    const scenario = this.getRandomElement(scenarios)
    const conversions = this.getMetricImperialConversions(measurementType, params)
    
    const relevantConversions = conversions.filter(c => 
      scenario.units.includes(c.fromUnit) || scenario.units.includes(c.toUnit)
    )
    
    if (relevantConversions.length === 0) {
      // Fall back to direct conversion
      return this.generateDirectConversionProblem(measurementType, params)
    }
    
    const conversion = this.getRandomElement(relevantConversions)
    const value = this.generateValue(params)
    
    let convertedValue
    if (measurementType === 'temperature') {
      convertedValue = this.convertTemperature(value, conversion.from, conversion.to)
    } else {
      convertedValue = value * conversion.factor
    }
    
    convertedValue = Math.round(convertedValue * Math.pow(10, params.decimalPlaces)) / Math.pow(10, params.decimalPlaces)
    
    const questionText = scenario.question
      .replace('{value}', value)
      .replace('{fromUnit}', conversion.fromUnit)
      .replace('{toUnit}', conversion.toUnit)
    
    const questionLaTeX = scenario.questionLaTeX
      .replace('{value}', value)
      .replace('{fromUnit}', conversion.fromUnit)
      .replace('{toUnit}', conversion.toUnit)
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `${convertedValue} ${conversion.toUnit}`,
      answerLaTeX: `${convertedValue} \\text{ ${conversion.toUnit}}`,
      steps: [
        `\\text{Given: } ${value} \\text{ ${conversion.fromUnit}}`,
        `\\text{Convert to ${conversion.toUnit}}`,
        `${value} \\times ${conversion.factor} = ${convertedValue} \\text{ ${conversion.toUnit}}`
      ],
      metadata: {
        operation: 'metric-imperial-word-problem',
        measurementType: measurementType,
        scenario: scenario.type,
        fromValue: value,
        toValue: convertedValue,
        difficulty: this.difficulty,
        estimatedTime: '120 seconds'
      }
    }
  }

  getMetricImperialConversions(measurementType, params) {
    const allConversions = {
      length: [
        // Metric to Imperial
        { from: 'mm', to: 'in', fromUnit: 'millimeters', toUnit: 'inches', factor: 0.0394, exactFactor: 1/25.4, fromSystem: 'metric', toSystem: 'imperial', isApproximate: false },
        { from: 'cm', to: 'in', fromUnit: 'centimeters', toUnit: 'inches', factor: 0.394, exactFactor: 1/2.54, fromSystem: 'metric', toSystem: 'imperial', isApproximate: true },
        { from: 'm', to: 'ft', fromUnit: 'meters', toUnit: 'feet', factor: 3.281, exactFactor: 3.28084, fromSystem: 'metric', toSystem: 'imperial', isApproximate: true },
        { from: 'm', to: 'yd', fromUnit: 'meters', toUnit: 'yards', factor: 1.094, exactFactor: 1.09361, fromSystem: 'metric', toSystem: 'imperial', isApproximate: true },
        { from: 'km', to: 'mi', fromUnit: 'kilometers', toUnit: 'miles', factor: 0.621, exactFactor: 0.621371, fromSystem: 'metric', toSystem: 'imperial', isApproximate: true },
        
        // Imperial to Metric
        { from: 'in', to: 'mm', fromUnit: 'inches', toUnit: 'millimeters', factor: 25.4, exactFactor: 25.4, fromSystem: 'imperial', toSystem: 'metric', isApproximate: false },
        { from: 'in', to: 'cm', fromUnit: 'inches', toUnit: 'centimeters', factor: 2.54, exactFactor: 2.54, fromSystem: 'imperial', toSystem: 'metric', isApproximate: false },
        { from: 'ft', to: 'm', fromUnit: 'feet', toUnit: 'meters', factor: 0.305, exactFactor: 0.3048, fromSystem: 'imperial', toSystem: 'metric', isApproximate: true },
        { from: 'yd', to: 'm', fromUnit: 'yards', toUnit: 'meters', factor: 0.914, exactFactor: 0.9144, fromSystem: 'imperial', toSystem: 'metric', isApproximate: true },
        { from: 'mi', to: 'km', fromUnit: 'miles', toUnit: 'kilometers', factor: 1.609, exactFactor: 1.60934, fromSystem: 'imperial', toSystem: 'metric', isApproximate: true }
      ],
      
      weight: [
        // Metric to Imperial
        { from: 'g', to: 'oz', fromUnit: 'grams', toUnit: 'ounces', factor: 0.035, exactFactor: 0.035274, fromSystem: 'metric', toSystem: 'imperial', isApproximate: true },
        { from: 'kg', to: 'lb', fromUnit: 'kilograms', toUnit: 'pounds', factor: 2.205, exactFactor: 2.20462, fromSystem: 'metric', toSystem: 'imperial', isApproximate: true },
        { from: 't', to: 'ton', fromUnit: 'tonnes', toUnit: 'tons', factor: 1.102, exactFactor: 1.10231, fromSystem: 'metric', toSystem: 'imperial', isApproximate: true },
        
        // Imperial to Metric
        { from: 'oz', to: 'g', fromUnit: 'ounces', toUnit: 'grams', factor: 28.35, exactFactor: 28.3495, fromSystem: 'imperial', toSystem: 'metric', isApproximate: true },
        { from: 'lb', to: 'kg', fromUnit: 'pounds', toUnit: 'kilograms', factor: 0.454, exactFactor: 0.453592, fromSystem: 'imperial', toSystem: 'metric', isApproximate: true },
        { from: 'ton', to: 't', fromUnit: 'tons', toUnit: 'tonnes', factor: 0.907, exactFactor: 0.907185, fromSystem: 'imperial', toSystem: 'metric', isApproximate: true }
      ],
      
      volume: [
        // Metric to Imperial
        { from: 'ml', to: 'fl oz', fromUnit: 'milliliters', toUnit: 'fluid ounces', factor: 0.034, exactFactor: 0.033814, fromSystem: 'metric', toSystem: 'imperial', isApproximate: true },
        { from: 'L', to: 'qt', fromUnit: 'liters', toUnit: 'quarts', factor: 1.057, exactFactor: 1.05669, fromSystem: 'metric', toSystem: 'imperial', isApproximate: true },
        { from: 'L', to: 'gal', fromUnit: 'liters', toUnit: 'gallons', factor: 0.264, exactFactor: 0.264172, fromSystem: 'metric', toSystem: 'imperial', isApproximate: true },
        
        // Imperial to Metric
        { from: 'fl oz', to: 'ml', fromUnit: 'fluid ounces', toUnit: 'milliliters', factor: 29.57, exactFactor: 29.5735, fromSystem: 'imperial', toSystem: 'metric', isApproximate: true },
        { from: 'qt', to: 'L', fromUnit: 'quarts', toUnit: 'liters', factor: 0.946, exactFactor: 0.946353, fromSystem: 'imperial', toSystem: 'metric', isApproximate: true },
        { from: 'gal', to: 'L', fromUnit: 'gallons', toUnit: 'liters', factor: 3.785, exactFactor: 3.78541, fromSystem: 'imperial', toSystem: 'metric', isApproximate: true }
      ],
      
      temperature: [
        { from: 'C', to: 'F', fromUnit: 'Celsius', toUnit: 'Fahrenheit', fromSystem: 'metric', toSystem: 'imperial' },
        { from: 'F', to: 'C', fromUnit: 'Fahrenheit', toUnit: 'Celsius', fromSystem: 'imperial', toSystem: 'metric' }
      ]
    }
    
    const conversions = allConversions[measurementType] || []
    
    return conversions.filter(conv => {
      if (!params.includeMetricToImperial && conv.fromSystem === 'metric') return false
      if (!params.includeImperialToMetric && conv.fromSystem === 'imperial') return false
      if (!params.includeCommonConversions && conv.isApproximate) return false
      if (!params.includePreciseConversions && !conv.isApproximate) return false
      if (!params.includeApproximations && conv.isApproximate) return false
      return true
    })
  }

  getWordProblemScenarios(measurementType) {
    const scenarios = {
      length: [
        {
          question: 'A running track is {value} {fromUnit} long.\n\nHow many {toUnit} is that?',
          questionLaTeX: '\\text{A running track is {value} {fromUnit} long.} \\\\ \\text{How many {toUnit} is that?}',
          type: 'sports',
          units: ['meters', 'feet', 'yards']
        },
        {
          question: 'The height of a building is {value} {fromUnit}.\n\nConvert this to {toUnit}.',
          questionLaTeX: '\\text{The height of a building is {value} {fromUnit}.} \\\\ \\text{Convert this to {toUnit}.}',
          type: 'architecture',
          units: ['meters', 'feet']
        },
        {
          question: 'A road trip covers {value} {fromUnit}.\n\nHow many {toUnit} is this?',
          questionLaTeX: '\\text{A road trip covers {value} {fromUnit}.} \\\\ \\text{How many {toUnit} is this?}',
          type: 'travel',
          units: ['kilometers', 'miles']
        }
      ],
      
      weight: [
        {
          question: 'A package weighs {value} {fromUnit}.\n\nWhat is its weight in {toUnit}?',
          questionLaTeX: '\\text{A package weighs {value} {fromUnit}.} \\\\ \\text{What is its weight in {toUnit}?}',
          type: 'shipping',
          units: ['kilograms', 'pounds']
        },
        {
          question: 'A recipe calls for {value} {fromUnit} of flour.\n\nHow many {toUnit} is that?',
          questionLaTeX: '\\text{A recipe calls for {value} {fromUnit} of flour.} \\\\ \\text{How many {toUnit} is that?}',
          type: 'cooking',
          units: ['grams', 'ounces']
        },
        {
          question: 'An athlete weighs {value} {fromUnit}.\n\nConvert this to {toUnit}.',
          questionLaTeX: '\\text{An athlete weighs {value} {fromUnit}.} \\\\ \\text{Convert this to {toUnit}.}',
          type: 'sports',
          units: ['kilograms', 'pounds']
        }
      ],
      
      volume: [
        {
          question: 'A car\'s fuel tank holds {value} {fromUnit}.\n\nHow many {toUnit} is that?',
          questionLaTeX: '\\text{A car\'s fuel tank holds {value} {fromUnit}.} \\\\ \\text{How many {toUnit} is that?}',
          type: 'automotive',
          units: ['liters', 'gallons']
        },
        {
          question: 'A recipe requires {value} {fromUnit} of milk.\n\nConvert to {toUnit}.',
          questionLaTeX: '\\text{A recipe requires {value} {fromUnit} of milk.} \\\\ \\text{Convert to {toUnit}.}',
          type: 'cooking',
          units: ['milliliters', 'fluid ounces']
        },
        {
          question: 'A swimming pool contains {value} {fromUnit} of water.\n\nHow many {toUnit}?',
          questionLaTeX: '\\text{A swimming pool contains {value} {fromUnit} of water.} \\\\ \\text{How many {toUnit}?}',
          type: 'recreation',
          units: ['liters', 'gallons']
        }
      ],
      
      temperature: [
        {
          question: 'The weather forecast shows {value}°{fromUnit}.\n\nWhat is this in °{toUnit}?',
          questionLaTeX: '\\text{The weather forecast shows {value}°{fromUnit}.} \\\\ \\text{What is this in °{toUnit}?}',
          type: 'weather',
          units: ['Celsius', 'Fahrenheit']
        },
        {
          question: 'A recipe calls for baking at {value}°{fromUnit}.\n\nConvert to °{toUnit}.',
          questionLaTeX: '\\text{A recipe calls for baking at {value}°{fromUnit}.} \\\\ \\text{Convert to °{toUnit}.}',
          type: 'cooking',
          units: ['Celsius', 'Fahrenheit']
        },
        {
          question: 'Body temperature is {value}°{fromUnit}.\n\nWhat is this in °{toUnit}?',
          questionLaTeX: '\\text{Body temperature is {value}°{fromUnit}.} \\\\ \\text{What is this in °{toUnit}?}',
          type: 'medical',
          units: ['Celsius', 'Fahrenheit']
        }
      ]
    }
    
    return scenarios[measurementType] || []
  }

  generateConversionSteps(conversion, fromValue, toValue, params, measurementType) {
    const steps = []
    
    if (measurementType === 'temperature') {
      return this.getTemperatureConversionSteps(fromValue, conversion.from, conversion.to, toValue)
    }
    
    if (conversion.isApproximate && params.showApproximateVsExact) {
      steps.push(`\\text{Approximate factor: } 1 \\text{ ${conversion.fromUnit}} ≈ ${conversion.factor} \\text{ ${conversion.toUnit}}`)
      if (conversion.exactFactor) {
        steps.push(`\\text{Exact factor: } 1 \\text{ ${conversion.fromUnit}} = ${conversion.exactFactor} \\text{ ${conversion.toUnit}}`)
      }
    } else {
      steps.push(`\\text{Conversion factor: } 1 \\text{ ${conversion.fromUnit}} = ${conversion.factor} \\text{ ${conversion.toUnit}}`)
    }
    
    steps.push(`${fromValue} \\text{ ${conversion.fromUnit}} \\times ${conversion.factor} = ${toValue} \\text{ ${conversion.toUnit}}`)
    
    steps.push(`\\text{Answer: } ${toValue} \\text{ ${conversion.toUnit}}`)
    
    return steps
  }

  getTemperatureConversionSteps(fromTemp, fromScale, toScale, result) {
    const steps = []
    
    if (fromScale === 'C' && toScale === 'F') {
      steps.push(`°F = °C \\times \\frac{9}{5} + 32`)
      steps.push(`°F = ${fromTemp} \\times \\frac{9}{5} + 32`)
      steps.push(`°F = ${fromTemp * 9/5} + 32`)
      steps.push(`°F = ${result}`)
    } else if (fromScale === 'F' && toScale === 'C') {
      steps.push(`°C = (°F - 32) \\times \\frac{5}{9}`)
      steps.push(`°C = (${fromTemp} - 32) \\times \\frac{5}{9}`)
      steps.push(`°C = ${fromTemp - 32} \\times \\frac{5}{9}`)
      steps.push(`°C = ${result}`)
    }
    
    return steps
  }

  convertTemperature(temp, fromScale, toScale) {
    if (fromScale === toScale) return temp
    
    if (fromScale === 'C' && toScale === 'F') {
      return temp * 9/5 + 32
    } else if (fromScale === 'F' && toScale === 'C') {
      return (temp - 32) * 5/9
    }
    
    throw new Error(`Unsupported temperature conversion: ${fromScale} to ${toScale}`)
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

export default MetricImperialGenerator