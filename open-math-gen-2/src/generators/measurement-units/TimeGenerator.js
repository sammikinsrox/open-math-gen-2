import { BaseGenerator } from '../BaseGenerator.js'

/**
 * Time Generator
 * Generates problems involving time measurements and calculations
 */
export class TimeGenerator extends BaseGenerator {
  constructor() {
    super({
      name: 'Time',
      description: 'Generate problems involving time measurements, conversions, and calculations',
      category: 'measurement-units',
      difficulty: 'medium',
      icon: 'schedule',
      tags: ['measurement', 'time', 'units', 'conversion', 'clock', 'duration', 'elapsed-time'],
      gradeLevel: '2-8',
      estimatedTime: '60 seconds',
      exampleProblem: {
        question: 'Convert 2 hours to minutes',
        questionLaTeX: '\\text{Convert } 2 \\text{ hours to minutes}',
        answer: '120 minutes',
        answerLaTeX: '120 \\text{ minutes}'
      },
      
      defaultParameters: {
        problemCount: 10,
        includeBasicTime: true,
        includeConversion: true,
        includeElapsedTime: false,
        includeClockReading: false,
        includeTimeArithmetic: false,
        includeWordProblems: false,
        use12HourFormat: true,
        use24HourFormat: false,
        includeAMPM: true,
        allowDecimals: false,
        maxHours: 12
      },
      
      parameterSchema: {
        problemCount: {
          type: 'number',
          label: 'Number of Problems',
          description: 'How many time problems to generate',
          min: 1,
          max: 100,
          required: true
        },
        includeBasicTime: {
          type: 'boolean',
          label: 'Include Basic Time',
          description: 'Include problems asking about time values'
        },
        includeConversion: {
          type: 'boolean',
          label: 'Include Conversions',
          description: 'Include time unit conversion problems'
        },
        includeElapsedTime: {
          type: 'boolean',
          label: 'Include Elapsed Time',
          description: 'Include problems calculating elapsed time'
        },
        includeClockReading: {
          type: 'boolean',
          label: 'Include Clock Reading',
          description: 'Include problems reading analog clock times'
        },
        includeTimeArithmetic: {
          type: 'boolean',
          label: 'Include Time Arithmetic',
          description: 'Include addition/subtraction of time values'
        },
        includeWordProblems: {
          type: 'boolean',
          label: 'Include Word Problems',
          description: 'Include real-world time word problems'
        },
        use12HourFormat: {
          type: 'boolean',
          label: 'Use 12-Hour Format',
          description: 'Include 12-hour time format (1-12)'
        },
        use24HourFormat: {
          type: 'boolean',
          label: 'Use 24-Hour Format',
          description: 'Include 24-hour time format (0-23)'
        },
        includeAMPM: {
          type: 'boolean',
          label: 'Include AM/PM',
          description: 'Include AM/PM notation in problems'
        },
        allowDecimals: {
          type: 'boolean',
          label: 'Allow Decimals',
          description: 'Allow decimal values in time problems'
        },
        maxHours: {
          type: 'number',
          label: 'Maximum Hours',
          description: 'Largest hour value to use',
          min: 1,
          max: 24,
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
    if (params.includeBasicTime) enabledTypes.push('basic')
    if (params.includeConversion) enabledTypes.push('conversion')
    if (params.includeElapsedTime) enabledTypes.push('elapsed')
    if (params.includeClockReading) enabledTypes.push('clock')
    if (params.includeTimeArithmetic) enabledTypes.push('arithmetic')
    if (params.includeWordProblems) enabledTypes.push('word')
    
    if (enabledTypes.length === 0) {
      throw new Error('At least one problem type must be enabled')
    }
    
    const problemType = this.getRandomElement(enabledTypes)
    
    switch (problemType) {
      case 'basic':
        return this.generateBasicTimeProblem(params)
      case 'conversion':
        return this.generateConversionProblem(params)
      case 'elapsed':
        return this.generateElapsedTimeProblem(params)
      case 'clock':
        return this.generateClockReadingProblem(params)
      case 'arithmetic':
        return this.generateTimeArithmeticProblem(params)
      case 'word':
        return this.generateWordProblem(params)
      default:
        return this.generateConversionProblem(params)
    }
  }

  generateBasicTimeProblem(params) {
    const hour = this.generateHour(params)
    const minute = this.generateMinute()
    const timeFormat = this.getTimeFormat(params)
    const ampm = params.includeAMPM ? this.getRandomElement(['AM', 'PM']) : ''
    
    const timeString = this.formatTime(hour, minute, timeFormat, ampm)
    
    const questionText = `What time is shown: ${timeString}?`
    const questionLaTeX = `\\text{What time is shown: } ${timeString}\\text{?}`
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: timeString,
      answerLaTeX: timeString,
      steps: [
        `\\text{The time shown is } ${timeString}`,
        `\\text{Answer: } ${timeString}`
      ],
      metadata: {
        operation: 'basic-time',
        hour: hour,
        minute: minute,
        format: timeFormat,
        ampm: ampm,
        difficulty: this.difficulty,
        estimatedTime: '30 seconds'
      }
    }
  }

  generateConversionProblem(params) {
    const availableUnits = this.getAvailableTimeUnits()
    const conversions = this.getTimeConversions()
    
    const conversion = this.getRandomElement(conversions)
    const fromUnit = availableUnits.find(u => u.symbol === conversion.from)
    const toUnit = availableUnits.find(u => u.symbol === conversion.to)
    
    const fromValue = this.generateTimeValue(params, fromUnit.symbol)
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
        operation: 'time-conversion',
        fromUnit: fromUnit.name,
        toUnit: toUnit.name,
        fromValue: fromValue,
        toValue: toValue,
        difficulty: this.difficulty,
        estimatedTime: '60 seconds'
      }
    }
  }

  generateElapsedTimeProblem(params) {
    const startHour = this.generateHour(params)
    const startMinute = this.generateMinute()
    const elapsedHours = Math.floor(Math.random() * 4) + 1
    const elapsedMinutes = Math.floor(Math.random() * 60)
    
    const endHour = (startHour + elapsedHours) % (params.use24HourFormat ? 24 : 12)
    const endMinute = (startMinute + elapsedMinutes) % 60
    
    const timeFormat = this.getTimeFormat(params)
    const startAmpm = params.includeAMPM ? 'AM' : ''
    const endAmpm = params.includeAMPM ? 'PM' : ''
    
    const startTime = this.formatTime(startHour, startMinute, timeFormat, startAmpm)
    const endTime = this.formatTime(endHour, endMinute, timeFormat, endAmpm)
    
    const questionText = `What is the elapsed time from ${startTime} to ${endTime}?`
    const questionLaTeX = `\\text{What is the elapsed time from ${startTime} to ${endTime}?}`
    
    const answer = `${elapsedHours} hours ${elapsedMinutes} minutes`
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: answer,
      answerLaTeX: `${elapsedHours} \\text{ hours } ${elapsedMinutes} \\text{ minutes}`,
      steps: [
        `\\text{Start time: } ${startTime}`,
        `\\text{End time: } ${endTime}`,
        `\\text{Elapsed time: } ${elapsedHours} \\text{ hours } ${elapsedMinutes} \\text{ minutes}`
      ],
      metadata: {
        operation: 'elapsed-time',
        startTime: startTime,
        endTime: endTime,
        elapsedHours: elapsedHours,
        elapsedMinutes: elapsedMinutes,
        difficulty: this.difficulty,
        estimatedTime: '90 seconds'
      }
    }
  }

  generateClockReadingProblem(params) {
    const hour = this.generateHour(params)
    const minute = this.generateMinute()
    const timeFormat = this.getTimeFormat(params)
    const ampm = params.includeAMPM ? this.getRandomElement(['AM', 'PM']) : ''
    
    const timeString = this.formatTime(hour, minute, timeFormat, ampm)
    
    const questionText = `What time does the clock show when the hour hand points to ${hour} and the minute hand points to ${minute}?`
    const questionLaTeX = `\\text{What time does the clock show when the hour hand points to } ${hour} \\text{ and the minute hand points to } ${minute}\\text{?}`
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: timeString,
      answerLaTeX: timeString,
      steps: [
        `\\text{Hour hand: } ${hour}`,
        `\\text{Minute hand: } ${minute}`,
        `\\text{Time: } ${timeString}`
      ],
      metadata: {
        operation: 'clock-reading',
        hour: hour,
        minute: minute,
        timeString: timeString,
        difficulty: this.difficulty,
        estimatedTime: '45 seconds'
      }
    }
  }

  generateTimeArithmeticProblem(params) {
    const hours1 = Math.floor(Math.random() * 12) + 1
    const minutes1 = Math.floor(Math.random() * 60)
    const hours2 = Math.floor(Math.random() * 6) + 1
    const minutes2 = Math.floor(Math.random() * 60)
    
    const operation = Math.random() < 0.6 ? 'addition' : 'subtraction'
    
    let resultHours, resultMinutes, operationSymbol
    if (operation === 'addition') {
      resultHours = hours1 + hours2
      resultMinutes = minutes1 + minutes2
      if (resultMinutes >= 60) {
        resultHours += 1
        resultMinutes -= 60
      }
      operationSymbol = '+'
    } else {
      // Ensure positive result
      if (hours1 < hours2 || (hours1 === hours2 && minutes1 < minutes2)) {
        [hours1, minutes1, hours2, minutes2] = [hours2, minutes2, hours1, minutes1]
      }
      resultHours = hours1 - hours2
      resultMinutes = minutes1 - minutes2
      if (resultMinutes < 0) {
        resultHours -= 1
        resultMinutes += 60
      }
      operationSymbol = '-'
    }
    
    const questionText = `${hours1}h ${minutes1}m ${operationSymbol} ${hours2}h ${minutes2}m = ?`
    const questionLaTeX = `${hours1}\\text{h } ${minutes1}\\text{m} ${operationSymbol} ${hours2}\\text{h } ${minutes2}\\text{m} = \\square`
    
    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: `${resultHours}h ${resultMinutes}m`,
      answerLaTeX: `${resultHours}\\text{h } ${resultMinutes}\\text{m}`,
      steps: [
        `${hours1}\\text{h } ${minutes1}\\text{m} ${operationSymbol} ${hours2}\\text{h } ${minutes2}\\text{m}`,
        `= ${resultHours}\\text{h } ${resultMinutes}\\text{m}`
      ],
      metadata: {
        operation: `time-${operation}`,
        operands: [[hours1, minutes1], [hours2, minutes2]],
        result: [resultHours, resultMinutes],
        difficulty: this.difficulty,
        estimatedTime: '75 seconds'
      }
    }
  }

  generateWordProblem(params) {
    const scenarios = [
      {
        question: 'A movie starts at 7:30 PM and lasts 2 hours and 15 minutes. What time does it end?',
        startHour: 7,
        startMinute: 30,
        durationHours: 2,
        durationMinutes: 15,
        operation: 'addition'
      },
      {
        question: 'School starts at 8:00 AM and ends at 3:15 PM. How long is the school day?',
        startHour: 8,
        startMinute: 0,
        endHour: 15,
        endMinute: 15,
        operation: 'elapsed'
      },
      {
        question: 'A train journey takes 4 hours and 30 minutes. If it arrives at 2:45 PM, what time did it depart?',
        endHour: 14,
        endMinute: 45,
        durationHours: 4,
        durationMinutes: 30,
        operation: 'subtraction'
      }
    ]
    
    const scenario = this.getRandomElement(scenarios)
    
    let answer, answerLaTeX
    if (scenario.operation === 'addition') {
      const endHour = scenario.startHour + scenario.durationHours
      const endMinute = scenario.startMinute + scenario.durationMinutes
      answer = this.formatTime(endHour, endMinute, '12-hour', 'PM')
      answerLaTeX = answer
    } else if (scenario.operation === 'elapsed') {
      const hours = scenario.endHour - scenario.startHour
      const minutes = scenario.endMinute - scenario.startMinute
      answer = `${hours} hours ${minutes} minutes`
      answerLaTeX = `${hours} \\text{ hours } ${minutes} \\text{ minutes}`
    } else {
      const startHour = scenario.endHour - scenario.durationHours
      const startMinute = scenario.endMinute - scenario.durationMinutes
      answer = this.formatTime(startHour, startMinute, '12-hour', 'AM')
      answerLaTeX = answer
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
        operation: `time-word-${scenario.operation}`,
        scenario: 'word-problem',
        difficulty: this.difficulty,
        estimatedTime: '120 seconds'
      }
    }
  }

  getAvailableTimeUnits() {
    return [
      { symbol: 'sec', name: 'seconds', factor: 1 },
      { symbol: 'min', name: 'minutes', factor: 60 },
      { symbol: 'hr', name: 'hours', factor: 3600 },
      { symbol: 'day', name: 'days', factor: 86400 },
      { symbol: 'wk', name: 'weeks', factor: 604800 }
    ]
  }

  getTimeConversions() {
    return [
      { from: 'sec', to: 'min', factor: 1/60 },
      { from: 'min', to: 'sec', factor: 60 },
      { from: 'min', to: 'hr', factor: 1/60 },
      { from: 'hr', to: 'min', factor: 60 },
      { from: 'hr', to: 'day', factor: 1/24 },
      { from: 'day', to: 'hr', factor: 24 },
      { from: 'day', to: 'wk', factor: 1/7 },
      { from: 'wk', to: 'day', factor: 7 }
    ]
  }

  generateHour(params) {
    if (params.use24HourFormat) {
      return Math.floor(Math.random() * 24)
    } else {
      return Math.floor(Math.random() * 12) + 1
    }
  }

  generateMinute() {
    return Math.floor(Math.random() * 60)
  }

  generateTimeValue(params, unit) {
    let max
    switch (unit) {
      case 'sec': max = 120; break
      case 'min': max = 60; break
      case 'hr': max = params.maxHours; break
      case 'day': max = 7; break
      case 'wk': max = 4; break
      default: max = 60
    }
    
    if (params.allowDecimals) {
      const value = 1 + Math.random() * (max - 1)
      return Math.round(value * 10) / 10
    } else {
      return Math.floor(Math.random() * max) + 1
    }
  }

  getTimeFormat(params) {
    if (params.use24HourFormat && params.use12HourFormat) {
      return this.getRandomElement(['12-hour', '24-hour'])
    } else if (params.use24HourFormat) {
      return '24-hour'
    } else {
      return '12-hour'
    }
  }

  formatTime(hour, minute, format, ampm = '') {
    const paddedMinute = minute.toString().padStart(2, '0')
    
    if (format === '24-hour') {
      const paddedHour = hour.toString().padStart(2, '0')
      return `${paddedHour}:${paddedMinute}`
    } else {
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
      return `${displayHour}:${paddedMinute}${ampm ? ' ' + ampm : ''}`
    }
  }

  getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)]
  }
}

export default TimeGenerator