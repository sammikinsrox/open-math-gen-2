import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Prime and Composite Numbers Generator
 * Generates problems about identifying prime and composite numbers
 */
export class PrimeCompositeGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Prime & Composite Numbers',
      description: 'Generate problems about identifying prime and composite numbers',
      category: 'numbers-place-value',
      difficulty: 'medium',
      icon: 'filter_list',
      tags: ['prime-numbers', 'composite', 'number-theory'],
      gradeLevel: '4-8',
      estimatedTime: '60 seconds',
      exampleProblem: {
        question: 'Is 17 prime, composite, or neither?',
        questionLaTeX: '\\text{Is } 17 \\text{ prime, composite, or neither?}',
        answer: 'prime',
        answerLaTeX: 'prime'
      },
      
      defaultParameters: {
        problemCount: 10,
        minNumber: 2,
        maxNumber: 50,
        problemType: 'identify',
        includeOne: false,
        showFactors: false,
        mixedQuestions: true
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
                description: 'How many prime/composite problems to generate',
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
            description: 'Choose what type of prime/composite questions to generate',
            icon: 'quiz',
            color: 'green',
            order: 2,
            parameters: {
              problemType: schemaV2.createParameter({
                type: 'select',
                label: 'Question Type',
                description: 'Type of prime/composite problem to generate',
                variant: 'cards',
                options: [
                  {
                    value: 'identify',
                    label: 'Identify Classification',
                    description: 'Ask if a number is prime, composite, or neither'
                  },
                  {
                    value: 'list-factors',
                    label: 'List Factors',
                    description: 'Ask students to list all factors of a number'
                  },
                  {
                    value: 'find-primes',
                    label: 'Find Prime Numbers',
                    description: 'Find all prime numbers in a given range'
                  },
                  {
                    value: 'find-composites',
                    label: 'Find Composite Numbers',
                    description: 'Find all composite numbers in a given range'
                  },
                  {
                    value: 'mixed',
                    label: 'Mixed Question Types',
                    description: 'Random combination of all question types'
                  }
                ],
                order: 1
              }),
              mixedQuestions: schemaV2.createParameter({
                type: 'boolean',
                label: 'Mixed Prime/Composite',
                description: 'Include both prime and composite numbers in identification problems',
                helpText: 'When enabled, problems will include a mix of prime and composite numbers',
                order: 2
              }),
              includeOne: schemaV2.createParameter({
                type: 'boolean',
                label: 'Include Number 1',
                description: 'Include questions about the number 1 (neither prime nor composite)',
                helpText: 'Number 1 is a special case - it is neither prime nor composite',
                order: 3
              })
            }
          }),
          
          numberRanges: schemaV2.createCategory({
            id: 'numberRanges',
            label: 'Number Ranges',
            description: 'Control the range of numbers used in problems',
            icon: 'tag',
            color: 'purple',
            order: 3,
            parameters: {
              minNumber: schemaV2.createParameter({
                type: 'number',
                label: 'Minimum Number',
                description: 'Smallest number to use in problems',
                min: 1,
                max: 500,
                required: true,
                presets: [1, 2, 5, 10],
                helpText: 'Starting point for number range',
                order: 1
              }),
              maxNumber: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Number',
                description: 'Largest number to use in problems',
                min: 2,
                max: 1000,
                required: true,
                presets: [50, 100, 200, 500],
                helpText: 'Ending point for number range',
                order: 2
              })
            }
          }),
          
          displayOptions: schemaV2.createCategory({
            id: 'displayOptions',
            label: 'Display Options',
            description: 'Control how solutions and steps are shown',
            icon: 'visibility',
            color: 'orange',
            order: 4,
            parameters: {
              showFactors: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Factors in Steps',
                description: 'Include complete factor lists in solution steps',
                helpText: 'Helpful for understanding why a number is prime or composite',
                order: 1
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'elementary-basics',
            label: 'Elementary Basics',
            description: 'Simple prime/composite identification for grades 4-5',
            icon: 'looks_one',
            category: 'difficulty',
            values: {
              problemCount: 10,
              problemType: 'identify',
              minNumber: 2,
              maxNumber: 25,
              mixedQuestions: true,
              includeOne: true,
              showFactors: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'factor-practice',
            label: 'Factor Practice',
            description: 'Focus on finding factors and understanding prime/composite',
            icon: 'list',
            category: 'scope',
            values: {
              problemCount: 8,
              problemType: 'list-factors',
              minNumber: 6,
              maxNumber: 50,
              mixedQuestions: true,
              includeOne: false,
              showFactors: true
            }
          }),
          
          schemaV2.createPreset({
            id: 'range-finding',
            label: 'Range Finding',
            description: 'Find all primes or composites in number ranges',
            icon: 'search',
            category: 'scope',
            values: {
              problemCount: 6,
              problemType: 'mixed',
              minNumber: 10,
              maxNumber: 100,
              mixedQuestions: true,
              includeOne: false,
              showFactors: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'advanced-theory',
            label: 'Advanced Number Theory',
            description: 'Challenging problems with larger numbers',
            icon: 'functions',
            category: 'difficulty',
            values: {
              problemCount: 12,
              problemType: 'mixed',
              minNumber: 50,
              maxNumber: 200,
              mixedQuestions: true,
              includeOne: false,
              showFactors: true
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
    
    // Additional custom validation for min/max relationships
    const customErrors = []
    if (params.minNumber > params.maxNumber) {
      customErrors.push('Minimum Number cannot be greater than Maximum Number')
    }
    if (params.minNumber < 1) {
      customErrors.push('Minimum Number must be at least 1')
    }
    if (customErrors.length > 0) {
      throw new Error(`Invalid parameters: ${customErrors.join(', ')}`)
    }
    
    // Choose problem type
    const problemType = params.problemType === 'mixed' ? 
      this.getRandomElement(['identify', 'list-factors', 'find-primes', 'find-composites']) :
      params.problemType
    
    return this.createProblemByType(problemType, params)
  }

  createProblemByType(problemType, params) {
    switch (problemType) {
      case 'identify':
        return this.createIdentifyProblem(params)
      case 'list-factors':
        return this.createListFactorsProblem(params)
      case 'find-primes':
        return this.createFindPrimesProblem(params)
      case 'find-composites':
        return this.createFindCompositesProblem(params)
      default:
        return this.createIdentifyProblem(params)
    }
  }

  createIdentifyProblem(params) {
    const number = this.generateNumber(params)
    const classification = this.classifyNumber(number)
    
    const questionText = `Is ${number} prime, composite, or neither?`
    const questionLaTeX = `\\text{Is } ${number} \\text{ prime, composite, or neither?}`

    const steps = this.generateClassificationSteps(number, classification, params.showFactors)

    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: classification,
      answerLaTeX: classification,
      steps: steps,
      metadata: {
        operation: 'prime-composite-identify',
        number: number,
        classification: classification,
        factors: this.findFactors(number),
        difficulty: this.difficulty,
        estimatedTime: '60 seconds'
      }
    }
  }

  createListFactorsProblem(params) {
    const number = this.generateNumber(params)
    const factors = this.findFactors(number)
    const factorsList = factors.join(', ')
    
    const questionText = `List all factors of ${number}.`
    const questionLaTeX = `\\text{List all factors of } ${number}\\text{.}`

    const steps = [
      `Find all factors of ${number}`,
      `Factors are numbers that divide ${number} evenly`,
      `Factors of ${number}: ${factorsList}`
    ]

    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: factorsList,
      answerLaTeX: factorsList,
      steps: steps,
      metadata: {
        operation: 'list-factors',
        number: number,
        factors: factors,
        factorCount: factors.length,
        difficulty: this.difficulty,
        estimatedTime: '90 seconds'
      }
    }
  }

  createFindPrimesProblem(params) {
    // Generate a range of numbers and ask to find primes
    const rangeStart = this.getRandomNumber(params.minNumber, params.maxNumber - 10)
    const rangeEnd = Math.min(rangeStart + 10, params.maxNumber)
    
    const primes = []
    for (let i = rangeStart; i <= rangeEnd; i++) {
      if (this.isPrime(i)) {
        primes.push(i)
      }
    }
    
    const primesList = primes.join(', ')
    
    const questionText = `List all prime numbers between ${rangeStart} and ${rangeEnd} (inclusive).`
    const questionLaTeX = `\\text{List all prime numbers between } ${rangeStart} \\text{ and } ${rangeEnd} \\text{ (inclusive).}`

    const steps = [
      `Find prime numbers from ${rangeStart} to ${rangeEnd}`,
      `Prime numbers have exactly 2 factors: 1 and themselves`,
      `Prime numbers: ${primesList}`
    ]

    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: primesList,
      answerLaTeX: primesList,
      steps: steps,
      metadata: {
        operation: 'find-primes',
        rangeStart: rangeStart,
        rangeEnd: rangeEnd,
        primes: primes,
        difficulty: this.difficulty,
        estimatedTime: '120 seconds'
      }
    }
  }

  createFindCompositesProblem(params) {
    // Generate a range of numbers and ask to find composites
    const rangeStart = this.getRandomNumber(params.minNumber, params.maxNumber - 8)
    const rangeEnd = Math.min(rangeStart + 8, params.maxNumber)
    
    const composites = []
    for (let i = rangeStart; i <= rangeEnd; i++) {
      if (this.isComposite(i)) {
        composites.push(i)
      }
    }
    
    const compositesList = composites.join(', ')
    
    const questionText = `List all composite numbers between ${rangeStart} and ${rangeEnd} (inclusive).`
    const questionLaTeX = `\\text{List all composite numbers between } ${rangeStart} \\text{ and } ${rangeEnd} \\text{ (inclusive).}`

    const steps = [
      `Find composite numbers from ${rangeStart} to ${rangeEnd}`,
      `Composite numbers have more than 2 factors`,
      `Composite numbers: ${compositesList}`
    ]

    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: compositesList,
      answerLaTeX: compositesList,
      steps: steps,
      metadata: {
        operation: 'find-composites',
        rangeStart: rangeStart,
        rangeEnd: rangeEnd,
        composites: composites,
        difficulty: this.difficulty,
        estimatedTime: '120 seconds'
      }
    }
  }

  generateNumber(params) {
    let number
    
    if (params.mixedQuestions) {
      // Mix of prime and composite numbers
      number = this.getRandomNumber(params.minNumber, params.maxNumber)
    } else {
      // Favor one type or the other
      if (Math.random() < 0.5) {
        // Try to find a prime
        for (let i = 0; i < 20; i++) {
          number = this.getRandomNumber(params.minNumber, params.maxNumber)
          if (this.isPrime(number)) break
        }
      } else {
        // Try to find a composite
        for (let i = 0; i < 20; i++) {
          number = this.getRandomNumber(params.minNumber, params.maxNumber)
          if (this.isComposite(number)) break
        }
      }
    }
    
    // Handle special case of 1
    if (number === 1 && !params.includeOne) {
      number = this.getRandomNumber(2, params.maxNumber)
    }
    
    return number
  }

  classifyNumber(number) {
    if (number === 1) {
      return 'neither'
    } else if (this.isPrime(number)) {
      return 'prime'
    } else {
      return 'composite'
    }
  }

  isPrime(number) {
    if (number < 2) return false
    if (number === 2) return true
    if (number % 2 === 0) return false
    
    for (let i = 3; i <= Math.sqrt(number); i += 2) {
      if (number % i === 0) return false
    }
    return true
  }

  isComposite(number) {
    return number > 1 && !this.isPrime(number)
  }

  findFactors(number) {
    const factors = []
    for (let i = 1; i <= number; i++) {
      if (number % i === 0) {
        factors.push(i)
      }
    }
    return factors
  }

  generateClassificationSteps(number, classification, showFactors) {
    const steps = []
    steps.push(`Classify ${number}`)
    
    if (number === 1) {
      steps.push(`1 is neither prime nor composite`)
      steps.push(`Answer: neither`)
    } else {
      const factors = this.findFactors(number)
      
      if (showFactors) {
        steps.push(`Factors of ${number}: ${factors.join(', ')}`)
      }
      
      if (classification === 'prime') {
        steps.push(`${number} has exactly 2 factors: 1 and ${number}`)
        steps.push(`Answer: prime`)
      } else {
        steps.push(`${number} has ${factors.length} factors`)
        steps.push(`Answer: composite`)
      }
    }
    
    return steps
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)]
  }
}

export default PrimeCompositeGenerator