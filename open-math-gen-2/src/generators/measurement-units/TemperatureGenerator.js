import { BaseGenerator } from '../BaseGenerator.js'

/**
 * Temperature Generator
 * Generates problems involving temperature measurements and conversions
 */
export class TemperatureGenerator extends BaseGenerator {
  constructor() {
    super({
      name: 'Temperature',
      description: 'Generate problems involving temperature measurements, conversions, and calculations',
      category: 'measurement-units',
      difficulty: 'medium',
      icon: 'thermostat',
      tags: ['measurement', 'temperature', 'units', 'conversion', 'celsius', 'fahrenheit', 'kelvin'],
      gradeLevel: '4-12',
      estimatedTime: '90 seconds',
      exampleProblem: {
        question: 'Convert 32°F to Celsius',
        questionLaTeX: '\\text{Convert } 32°\\text{F to Celsius}',
        answer: '0°C',
        answerLaTeX: '0°\\text{C}'
      },
      
      defaultParameters: {
        problemCount: 10,
        includeBasicTemperature: true,
        includeConversion: true,
        includeComparison: false,
        includeWordProblems: false,
        includeTemperatureChange: false,
        useCelsius: true,
        useFahrenheit: true,
        useKelvin: false,
        allowNegativeTemperatures: true,
        allowDecimals: false,
        maxTemperature: 100,
        minTemperature: -20
      },
      
      parameterSchema: {
        problemCount: {
          type: 'number',
          label: 'Number of Problems',
          description: 'How many temperature problems to generate',
          min: 1,
          max: 100,
          required: true
        },
        includeBasicTemperature: {
          type: 'boolean',
          label: 'Include Basic Temperature',
          description: 'Include problems asking about temperature values'
        },
        includeConversion: {
          type: 'boolean',
          label: 'Include Conversions',
          description: 'Include temperature conversion problems'
        },
        includeComparison: {
          type: 'boolean',
          label: 'Include Comparisons',
          description: 'Include problems comparing temperatures'
        },
        includeWordProblems: {
          type: 'boolean',
          label: 'Include Word Problems',
          description: 'Include real-world temperature word problems'
        },
        includeTemperatureChange: {
          type: 'boolean',
          label: 'Include Temperature Change',
          description: 'Include problems calculating temperature changes'
        },
        useCelsius: {
          type: 'boolean',
          label: 'Use Celsius',
          description: 'Include Celsius temperature scale'
        },
        useFahrenheit: {
          type: 'boolean',
          label: 'Use Fahrenheit',
          description: 'Include Fahrenheit temperature scale'
        },
        useKelvin: {
          type: 'boolean',
          label: 'Use Kelvin',
          description: 'Include Kelvin temperature scale'
        },
        allowNegativeTemperatures: {
          type: 'boolean',
          label: 'Allow Negative Temperatures',
          description: 'Allow negative temperature values'
        },
        allowDecimals: {
          type: 'boolean',
          label: 'Allow Decimals',
          description: 'Allow decimal values in temperatures'
        },
        maxTemperature: {
          type: 'number',
          label: 'Maximum Temperature',
          description: 'Highest temperature value to use',
          min: -50,
          max: 500,
          required: true
        },
        minTemperature: {
          type: 'number',
          label: 'Minimum Temperature',
          description: 'Lowest temperature value to use',
          min: -100,
          max: 100,
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
    if (params.includeBasicTemperature) enabledTypes.push('basic')
    if (params.includeConversion) enabledTypes.push('conversion')
    if (params.includeComparison) enabledTypes.push('comparison')
    if (params.includeWordProblems) enabledTypes.push('word')
    if (params.includeTemperatureChange) enabledTypes.push('change')
    
    if (enabledTypes.length === 0) {
      throw new Error('At least one problem type must be enabled')
    }
    
    const problemType = this.getRandomElement(enabledTypes)
    
    switch (problemType) {
      case 'basic':
        return this.generateBasicTemperatureProblem(params)
      case 'conversion':
        return this.generateConversionProblem(params)
      case 'comparison':
        return this.generateComparisonProblem(params)
      case 'word':
        return this.generateWordProblem(params)
      case 'change':
        return this.generateTemperatureChangeProblem(params)
      default:
        return this.generateConversionProblem(params)
    }
  }

  generateBasicTemperatureProblem(params) {
    const availableScales = this.getAvailableScales(params)
    const scale = this.getRandomElement(availableScales)
    const temperature = this.generateTemperature(params)
    
    const contexts = [
      'outside temperature',
      'body temperature', 
      'water temperature',
      'room temperature',
      'cooking temperature',
      'weather temperature'
    ]
    const context = this.getRandomElement(contexts)
    
    const questionText = `The ${context} is ${temperature}°${scale.symbol}. What is the temperature?`
    const questionLaTeX = `\\text{The ${context} is } ${temperature}°${scale.symbol}\\text{. What is the temperature?}`
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `${temperature}°${scale.symbol}`,
      answerLaTeX: `${temperature}°${scale.symbol}`,
      steps: [
        `\\text{The ${context} is } ${temperature}°${scale.symbol}`,
        `\\text{Answer: } ${temperature}°${scale.symbol}`
      ],
      metadata: {
        operation: 'basic-temperature',
        temperature: temperature,
        scale: scale.name,
        context: context,
        difficulty: this.difficulty,
        estimatedTime: '30 seconds'
      }
    }
  }

  generateConversionProblem(params) {
    const availableScales = this.getAvailableScales(params)
    
    if (availableScales.length < 2) {
      throw new Error('At least two temperature scales must be enabled for conversions')
    }
    
    const fromScale = this.getRandomElement(availableScales)
    const toScale = this.getRandomElement(availableScales.filter(s => s.symbol !== fromScale.symbol))
    
    const fromTemp = this.generateTemperature(params)
    const toTemp = this.convertTemperature(fromTemp, fromScale.symbol, toScale.symbol)
    
    const roundedToTemp = params.allowDecimals ? 
      Math.round(toTemp * 10) / 10 : 
      Math.round(toTemp)
    
    const questionText = `Convert ${fromTemp}°${fromScale.symbol} to ${toScale.name}`
    const questionLaTeX = `\\text{Convert } ${fromTemp}°${fromScale.symbol} \\text{ to ${toScale.name}}`
    
    const steps = this.getConversionSteps(fromTemp, fromScale.symbol, toScale.symbol, roundedToTemp)
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `${roundedToTemp}°${toScale.symbol}`,
      answerLaTeX: `${roundedToTemp}°${toScale.symbol}`,
      steps: steps,
      metadata: {
        operation: 'temperature-conversion',
        fromScale: fromScale.name,
        toScale: toScale.name,
        fromTemp: fromTemp,
        toTemp: roundedToTemp,
        difficulty: this.difficulty,
        estimatedTime: '90 seconds'
      }
    }
  }

  generateComparisonProblem(params) {
    const availableScales = this.getAvailableScales(params)
    const scale = this.getRandomElement(availableScales)
    
    const temp1 = this.generateTemperature(params)
    let temp2 = this.generateTemperature(params)
    
    // Ensure they're different
    while (temp1 === temp2) {
      temp2 = this.generateTemperature(params)
    }
    
    let comparison, comparisonSymbol
    if (temp1 > temp2) {
      comparison = 'warmer'
      comparisonSymbol = '>'
    } else {
      comparison = 'cooler'
      comparisonSymbol = '<'
    }
    
    const questionText = `Compare: ${temp1}°${scale.symbol} ___ ${temp2}°${scale.symbol}`
    const questionLaTeX = `\\text{Compare: } ${temp1}°${scale.symbol} \\; \\square \\; ${temp2}°${scale.symbol}`
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: comparisonSymbol,
      answerLaTeX: comparisonSymbol,
      steps: [
        `${temp1}°${scale.symbol} \\text{ and } ${temp2}°${scale.symbol}`,
        `${temp1} ${comparisonSymbol} ${temp2}`,
        `\\text{Therefore: } ${temp1}°${scale.symbol} ${comparisonSymbol} ${temp2}°${scale.symbol}`
      ],
      metadata: {
        operation: 'temperature-comparison',
        scale: scale.name,
        temperatures: [temp1, temp2],
        comparison: comparison,
        difficulty: this.difficulty,
        estimatedTime: '45 seconds'
      }
    }
  }

  generateTemperatureChangeProblem(params) {
    const availableScales = this.getAvailableScales(params)
    const scale = this.getRandomElement(availableScales)
    
    const startTemp = this.generateTemperature(params)
    const change = Math.floor(Math.random() * 20) + 1
    const operation = Math.random() < 0.5 ? 'increase' : 'decrease'
    
    let endTemp, operationSymbol, changeWord
    if (operation === 'increase') {
      endTemp = startTemp + change
      operationSymbol = '+'
      changeWord = 'rises'
    } else {
      endTemp = startTemp - change
      operationSymbol = '-'
      changeWord = 'falls'
    }
    
    const questionText = `The temperature starts at ${startTemp}°${scale.symbol} and ${changeWord} by ${change}°. What is the final temperature?`
    const questionLaTeX = `\\text{The temperature starts at } ${startTemp}°${scale.symbol} \\text{ and ${changeWord} by } ${change}°\\text{. What is the final temperature?}`
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `${endTemp}°${scale.symbol}`,
      answerLaTeX: `${endTemp}°${scale.symbol}`,
      steps: [
        `\\text{Start temperature: } ${startTemp}°${scale.symbol}`,
        `\\text{Change: } ${operationSymbol}${change}°`,
        `${startTemp} ${operationSymbol} ${change} = ${endTemp}°${scale.symbol}`
      ],
      metadata: {
        operation: `temperature-${operation}`,
        scale: scale.name,
        startTemp: startTemp,
        change: change,
        endTemp: endTemp,
        difficulty: this.difficulty,
        estimatedTime: '60 seconds'
      }
    }
  }

  generateWordProblem(params) {
    const availableScales = this.getAvailableScales(params)
    const scale = this.getRandomElement(availableScales)
    
    const scenarios = [
      {
        question: `Water freezes at 0°C. If the temperature is currently ${this.generateTemperature(params)}°C, is the water frozen?`,
        type: 'comparison',
        freezingPoint: 0
      },
      {
        question: `Normal body temperature is 98.6°F. If someone has a temperature of ${this.generateTemperature(params)}°F, do they have a fever?`,
        type: 'comparison',
        normalTemp: 98.6
      },
      {
        question: `The temperature was ${this.generateTemperature(params)}°${scale.symbol} in the morning and rose by ${Math.floor(Math.random() * 15) + 5}° during the day. What was the afternoon temperature?`,
        type: 'addition'
      }
    ]
    
    const scenario = this.getRandomElement(scenarios)
    
    // Generate appropriate answer based on scenario type
    let answer, answerLaTeX
    if (scenario.type === 'comparison') {
      if (scenario.freezingPoint !== undefined) {
        const temp = this.generateTemperature(params)
        answer = temp <= 0 ? 'Yes, frozen' : 'No, not frozen'
        answerLaTeX = answer
      } else {
        const temp = this.generateTemperature(params)
        answer = temp > 98.6 ? 'Yes, fever' : 'No, normal'
        answerLaTeX = answer
      }
    } else {
      // For addition type
      const morning = this.generateTemperature(params)
      const rise = Math.floor(Math.random() * 15) + 5
      const afternoon = morning + rise
      answer = `${afternoon}°${scale.symbol}`
      answerLaTeX = `${afternoon}°${scale.symbol}`
    }
    
    return {
      question: scenario.question,
      questionLaTeX: `\\text{${scenario.question}}`,
      answer: answer,
      answerLaTeX: answerLaTeX,
      steps: [
        `\\text{Given information from the problem}`,
        `\\text{Answer: } ${answerLaTeX}`
      ],
      metadata: {
        operation: `temperature-word-${scenario.type}`,
        scenario: 'word-problem',
        scale: scale.name,
        difficulty: this.difficulty,
        estimatedTime: '120 seconds'
      }
    }
  }

  getAvailableScales(params) {
    const scales = []
    
    if (params.useCelsius) {
      scales.push({ symbol: 'C', name: 'Celsius' })
    }
    
    if (params.useFahrenheit) {
      scales.push({ symbol: 'F', name: 'Fahrenheit' })
    }
    
    if (params.useKelvin) {
      scales.push({ symbol: 'K', name: 'Kelvin' })
    }
    
    return scales
  }

  convertTemperature(temp, fromScale, toScale) {
    if (fromScale === toScale) return temp
    
    // Convert everything through Celsius as intermediate
    let celsius
    
    // Convert to Celsius first
    switch (fromScale) {
      case 'C':
        celsius = temp
        break
      case 'F':
        celsius = (temp - 32) * 5/9
        break
      case 'K':
        celsius = temp - 273.15
        break
      default:
        throw new Error(`Unknown temperature scale: ${fromScale}`)
    }
    
    // Convert from Celsius to target scale
    switch (toScale) {
      case 'C':
        return celsius
      case 'F':
        return celsius * 9/5 + 32
      case 'K':
        return celsius + 273.15
      default:
        throw new Error(`Unknown temperature scale: ${toScale}`)
    }
  }

  getConversionSteps(fromTemp, fromScale, toScale, result) {
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
    } else if (fromScale === 'C' && toScale === 'K') {
      steps.push(`K = °C + 273.15`)
      steps.push(`K = ${fromTemp} + 273.15`)
      steps.push(`K = ${result}`)
    } else if (fromScale === 'K' && toScale === 'C') {
      steps.push(`°C = K - 273.15`)
      steps.push(`°C = ${fromTemp} - 273.15`)
      steps.push(`°C = ${result}`)
    } else {
      // For more complex conversions, show intermediate step through Celsius
      const intermediate = this.convertTemperature(fromTemp, fromScale, 'C')
      steps.push(`\\text{First convert to Celsius: } ${Math.round(intermediate * 10) / 10}°C`)
      steps.push(`\\text{Then convert to ${toScale}: } ${result}°${toScale}`)
    }
    
    steps.push(`\\text{Answer: } ${result}°${toScale}`)
    return steps
  }

  generateTemperature(params) {
    const min = params.allowNegativeTemperatures ? params.minTemperature : Math.max(0, params.minTemperature)
    const max = params.maxTemperature
    
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

export default TemperatureGenerator