import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Time Generator
 * Generates problems involving time measurements and calculations
 */
export class TimeGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
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
                description: 'How many time problems to generate',
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
            description: 'Choose which types of time problems to include',
            icon: 'schedule',
            color: 'green',
            order: 2,
            parameters: {
              includeBasicTime: schemaV2.createParameter({
                type: 'boolean',
                label: 'Basic Time Reading',
                description: 'Problems about reading and identifying times',
                helpText: 'Examples: "What time is shown?", "Read the clock"',
                order: 1
              }),
              includeConversion: schemaV2.createParameter({
                type: 'boolean',
                label: 'Unit Conversions',
                description: 'Convert between different time units',
                helpText: 'Examples: Convert 2 hours to minutes, 120 seconds to minutes',
                order: 2
              }),
              includeElapsedTime: schemaV2.createParameter({
                type: 'boolean',
                label: 'Elapsed Time',
                description: 'Calculate time that has passed',
                helpText: 'Examples: From 2:30 PM to 4:15 PM = ? hours ? minutes',
                order: 3
              }),
              includeClockReading: schemaV2.createParameter({
                type: 'boolean',
                label: 'Analog Clock Reading',
                description: 'Read times from analog clock descriptions',
                helpText: 'Examples: Hour hand on 3, minute hand on 6 = what time?',
                order: 4
              }),
              includeTimeArithmetic: schemaV2.createParameter({
                type: 'boolean',
                label: 'Time Arithmetic',
                description: 'Add and subtract time values',
                helpText: 'Examples: 2h 30m + 1h 45m = ?, 5h 20m - 2h 35m = ?',
                order: 5
              }),
              includeWordProblems: schemaV2.createParameter({
                type: 'boolean',
                label: 'Word Problems',
                description: 'Real-world time scenarios',
                helpText: 'Examples: movie times, school schedules, travel duration',
                order: 6
              })
            }
          }),
          
          timeFormats: schemaV2.createCategory({
            id: 'timeFormats',
            label: 'Time Formats',
            description: 'Choose which time formats to use',
            icon: 'access_time',
            color: 'purple',
            order: 3,
            parameters: {
              use12HourFormat: schemaV2.createParameter({
                type: 'boolean',
                label: '12-Hour Format',
                description: 'Use 12-hour time format (1:00 - 12:59)',
                helpText: 'Examples: 1:30, 11:45, 12:00',
                order: 1
              }),
              use24HourFormat: schemaV2.createParameter({
                type: 'boolean',
                label: '24-Hour Format',
                description: 'Use 24-hour time format (00:00 - 23:59)',
                helpText: 'Examples: 13:30, 23:45, 00:15',
                order: 2
              }),
              includeAMPM: schemaV2.createParameter({
                type: 'boolean',
                label: 'Include AM/PM',
                description: 'Add AM/PM notation to 12-hour times',
                helpText: 'Examples: 2:30 PM, 8:15 AM',
                order: 3
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
              maxHours: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Hours',
                description: 'Largest hour value to use in problems',
                min: 1,
                max: 24,
                required: true,
                slider: true,
                presets: [12, 16, 20, 24],
                helpText: 'Controls the range of hours in time problems',
                order: 1
              }),
              allowDecimals: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Decimals',
                description: 'Allow decimal values in time conversions',
                helpText: 'Examples: 2.5 hours, 1.75 minutes',
                order: 2
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'basic-time-reading',
            label: 'Basic Time Reading',
            description: 'Simple time reading problems for elementary students',
            icon: 'looks_one',
            category: 'difficulty',
            values: {
              problemCount: 10,
              includeBasicTime: true,
              includeConversion: false,
              includeElapsedTime: false,
              includeClockReading: true,
              includeTimeArithmetic: false,
              includeWordProblems: false,
              use12HourFormat: true,
              use24HourFormat: false,
              includeAMPM: true,
              allowDecimals: false,
              maxHours: 12
            }
          }),
          
          schemaV2.createPreset({
            id: 'time-conversions',
            label: 'Time Conversions',
            description: 'Focus on converting between time units',
            icon: 'swap_horiz',
            category: 'scope',
            values: {
              problemCount: 12,
              includeBasicTime: false,
              includeConversion: true,
              includeElapsedTime: false,
              includeClockReading: false,
              includeTimeArithmetic: false,
              includeWordProblems: false,
              use12HourFormat: true,
              use24HourFormat: false,
              includeAMPM: false,
              allowDecimals: true,
              maxHours: 24
            }
          }),
          
          schemaV2.createPreset({
            id: 'elapsed-time-practice',
            label: 'Elapsed Time Practice',
            description: 'Practice calculating elapsed time',
            icon: 'timer',
            category: 'scope',
            values: {
              problemCount: 10,
              includeBasicTime: false,
              includeConversion: false,
              includeElapsedTime: true,
              includeClockReading: false,
              includeTimeArithmetic: true,
              includeWordProblems: false,
              use12HourFormat: true,
              use24HourFormat: false,
              includeAMPM: true,
              allowDecimals: false,
              maxHours: 12
            }
          }),
          
          schemaV2.createPreset({
            id: '24-hour-format',
            label: '24-Hour Format',
            description: 'Practice with 24-hour (military) time',
            icon: 'military_tech',
            category: 'scope',
            values: {
              problemCount: 12,
              includeBasicTime: true,
              includeConversion: true,
              includeElapsedTime: true,
              includeClockReading: false,
              includeTimeArithmetic: false,
              includeWordProblems: false,
              use12HourFormat: false,
              use24HourFormat: true,
              includeAMPM: false,
              allowDecimals: false,
              maxHours: 24
            }
          }),
          
          schemaV2.createPreset({
            id: 'real-world-time',
            label: 'Real-World Time',
            description: 'Word problems with real-world time scenarios',
            icon: 'public',
            category: 'scope',
            values: {
              problemCount: 10,
              includeBasicTime: false,
              includeConversion: false,
              includeElapsedTime: true,
              includeClockReading: false,
              includeTimeArithmetic: true,
              includeWordProblems: true,
              use12HourFormat: true,
              use24HourFormat: false,
              includeAMPM: true,
              allowDecimals: false,
              maxHours: 12
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive-time',
            label: 'Comprehensive Time',
            description: 'Mixed practice with all time concepts',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 15,
              includeBasicTime: true,
              includeConversion: true,
              includeElapsedTime: true,
              includeClockReading: true,
              includeTimeArithmetic: true,
              includeWordProblems: true,
              use12HourFormat: true,
              use24HourFormat: true,
              includeAMPM: true,
              allowDecimals: true,
              maxHours: 24
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
    if (!params.use12HourFormat && !params.use24HourFormat) {
      customErrors.push('At least one time format must be enabled')
    }
    if (!params.includeBasicTime && !params.includeConversion && !params.includeElapsedTime && !params.includeClockReading && !params.includeTimeArithmetic && !params.includeWordProblems) {
      customErrors.push('At least one problem type must be enabled')
    }
    if (customErrors.length > 0) {
      throw new Error(`Invalid parameters: ${customErrors.join(', ')}`)
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
    // Generate random times respecting parameter constraints
    const timeFormat = this.getTimeFormat(params)
    
    // Generate random start times, durations, etc.
    const movieStartHour = this.generateHour(params)
    const movieStartMinute = this.generateMinute()
    const movieDurationHours = Math.floor(Math.random() * 3) + 1 // 1-3 hours
    const movieDurationMinutes = Math.floor(Math.random() * 4) * 15 // 0, 15, 30, or 45 minutes
    const movieStartAmpm = params.includeAMPM ? this.getRandomElement(['AM', 'PM']) : ''
    const movieStartTime = this.formatTime(movieStartHour, movieStartMinute, timeFormat, movieStartAmpm)
    
    const schoolStartHour = Math.floor(Math.random() * 3) + 7 // 7-9 AM
    const schoolStartMinute = Math.floor(Math.random() * 4) * 15 // 0, 15, 30, 45
    const schoolEndHour = Math.floor(Math.random() * 4) + 14 // 2-5 PM (14-17 in 24h)
    const schoolEndMinute = Math.floor(Math.random() * 4) * 15
    const schoolStartAmpm = params.includeAMPM ? 'AM' : ''
    const schoolEndAmpm = params.includeAMPM ? 'PM' : ''
    const schoolStartTime = this.formatTime(schoolStartHour, schoolStartMinute, timeFormat, schoolStartAmpm)
    const schoolEndTime = this.formatTime(schoolEndHour, schoolEndMinute, timeFormat, schoolEndAmpm)
    
    const trainArrivalHour = this.generateHour(params)
    const trainArrivalMinute = this.generateMinute()
    const trainDurationHours = Math.floor(Math.random() * 6) + 2 // 2-7 hours
    const trainDurationMinutes = Math.floor(Math.random() * 4) * 15
    const trainArrivalAmpm = params.includeAMPM ? this.getRandomElement(['AM', 'PM']) : ''
    const trainArrivalTime = this.formatTime(trainArrivalHour, trainArrivalMinute, timeFormat, trainArrivalAmpm)
    
    const scenarios = [
      {
        question: `A movie starts at ${movieStartTime} and lasts ${movieDurationHours} hours and ${movieDurationMinutes} minutes. What time does it end?`,
        questionLaTeX: `\\text{A movie starts at ${movieStartTime} and lasts ${movieDurationHours} hours and ${movieDurationMinutes} minutes.} \\\\ \\text{What time does it end?}`,
        startHour: movieStartHour,
        startMinute: movieStartMinute,
        durationHours: movieDurationHours,
        durationMinutes: movieDurationMinutes,
        operation: 'addition'
      },
      {
        question: `School starts at ${schoolStartTime} and ends at ${schoolEndTime}. How long is the school day?`,
        questionLaTeX: `\\text{School starts at ${schoolStartTime} and ends at ${schoolEndTime}.} \\\\ \\text{How long is the school day?}`,
        startHour: schoolStartHour,
        startMinute: schoolStartMinute,
        endHour: schoolEndHour,
        endMinute: schoolEndMinute,
        operation: 'elapsed'
      },
      {
        question: `A train journey takes ${trainDurationHours} hours and ${trainDurationMinutes} minutes. If it arrives at ${trainArrivalTime}, what time did it depart?`,
        questionLaTeX: `\\text{A train journey takes ${trainDurationHours} hours and ${trainDurationMinutes} minutes.} \\\\ \\text{If it arrives at ${trainArrivalTime}, what time did it depart?}`,
        endHour: trainArrivalHour,
        endMinute: trainArrivalMinute,
        durationHours: trainDurationHours,
        durationMinutes: trainDurationMinutes,
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
      questionLaTeX: scenario.questionLaTeX,
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