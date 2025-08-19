import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Factors and Multiples Generator
 * Generates problems about finding factors, multiples, GCD, and LCM
 */
export class FactorsMultiplesGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Factors & Multiples',
      description: 'Generate problems about factors, multiples, GCD, and LCM',
      category: 'numbers-place-value',
      difficulty: 'medium',
      icon: 'account_tree',
      tags: ['factors', 'multiples', 'gcd', 'lcm'],
      gradeLevel: '4-8',
      estimatedTime: '90 seconds',
      exampleProblem: {
        question: 'Find all factors of 12.',
        questionLaTeX: '\\text{Find all factors of } 12\\text{.}',
        answer: '1, 2, 3, 4, 6, 12',
        answerLaTeX: '1, 2, 3, 4, 6, 12'
      },
      
      defaultParameters: {
        problemCount: 10,
        minNumber: 2,
        maxNumber: 50,
        problemType: 'factors',
        multipleCount: 5,
        includeGCD: true,
        includeLCM: true,
        maxFactorRange: 100
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
                description: 'How many factor/multiple problems to generate',
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
            description: 'Choose what type of factors/multiples questions to generate',
            icon: 'account_tree',
            color: 'green',
            order: 2,
            parameters: {
              problemType: schemaV2.createParameter({
                type: 'select',
                label: 'Question Type',
                description: 'Type of factor/multiple problem to generate',
                variant: 'cards',
                options: [
                  {
                    value: 'factors',
                    label: 'Find Factors',
                    description: 'List all factors of a given number'
                  },
                  {
                    value: 'multiples',
                    label: 'Find Multiples',
                    description: 'List the first few multiples of a number'
                  },
                  {
                    value: 'factor-pairs',
                    label: 'Factor Pairs',
                    description: 'Find all factor pairs of a number'
                  },
                  {
                    value: 'gcd',
                    label: 'Greatest Common Divisor',
                    description: 'Find the GCD of two numbers'
                  },
                  {
                    value: 'lcm',
                    label: 'Least Common Multiple',
                    description: 'Find the LCM of two numbers'
                  },
                  {
                    value: 'mixed',
                    label: 'Mixed Question Types',
                    description: 'Random combination of all question types'
                  }
                ],
                order: 1
              }),
              includeGCD: schemaV2.createParameter({
                type: 'boolean',
                label: 'Include GCD in Mixed',
                description: 'Include GCD problems when using mixed question types',
                helpText: 'Only applies when Question Type is set to Mixed',
                order: 2
              }),
              includeLCM: schemaV2.createParameter({
                type: 'boolean',
                label: 'Include LCM in Mixed',
                description: 'Include LCM problems when using mixed question types',
                helpText: 'Only applies when Question Type is set to Mixed',
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
                max: 100,
                required: true,
                presets: [1, 2, 5, 10],
                helpText: 'Starting point for number range',
                order: 1
              }),
              maxNumber: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Number',
                description: 'Largest number to use in most problems',
                min: 2,
                max: 200,
                required: true,
                presets: [25, 50, 75, 100],
                helpText: 'Upper limit for most problem types',
                order: 2
              }),
              maxFactorRange: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum for Factor Finding',
                description: 'Upper limit specifically for factor-finding problems',
                min: 20,
                max: 500,
                required: true,
                presets: [50, 100, 150, 200],
                helpText: 'Separate limit for factor problems to control difficulty',
                order: 3
              })
            }
          }),
          
          displayOptions: schemaV2.createCategory({
            id: 'displayOptions',
            label: 'Display Options',
            description: 'Control how problems are presented',
            icon: 'visibility',
            color: 'orange',
            order: 4,
            parameters: {
              multipleCount: schemaV2.createParameter({
                type: 'number',
                label: 'Number of Multiples',
                description: 'How many multiples to list in multiple problems',
                min: 3,
                max: 15,
                required: true,
                slider: true,
                presets: [5, 7, 10, 12],
                helpText: 'Only applies to multiple-finding problems',
                order: 1
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'basic-factors',
            label: 'Basic Factors',
            description: 'Simple factor-finding for elementary students',
            icon: 'looks_one',
            category: 'difficulty',
            values: {
              problemCount: 8,
              problemType: 'factors',
              minNumber: 6,
              maxNumber: 30,
              maxFactorRange: 50,
              multipleCount: 5,
              includeGCD: false,
              includeLCM: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'multiples-practice',
            label: 'Multiples Practice',
            description: 'Focus on finding multiples and skip counting',
            icon: 'repeat',
            category: 'scope',
            values: {
              problemCount: 10,
              problemType: 'multiples',
              minNumber: 2,
              maxNumber: 15,
              maxFactorRange: 100,
              multipleCount: 8,
              includeGCD: false,
              includeLCM: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'gcd-lcm-focus',
            label: 'GCD & LCM Focus',
            description: 'Practice greatest common divisor and least common multiple',
            icon: 'merge_type',
            category: 'scope',
            values: {
              problemCount: 8,
              problemType: 'mixed',
              minNumber: 4,
              maxNumber: 24,
              maxFactorRange: 100,
              multipleCount: 6,
              includeGCD: true,
              includeLCM: true
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive-practice',
            label: 'Comprehensive Practice',
            description: 'Mixed practice with all types of factor/multiple problems',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 12,
              problemType: 'mixed',
              minNumber: 2,
              maxNumber: 50,
              maxFactorRange: 100,
              multipleCount: 7,
              includeGCD: true,
              includeLCM: true
            }
          }),
          
          schemaV2.createPreset({
            id: 'advanced-challenge',
            label: 'Advanced Challenge',
            description: 'Challenging problems with larger numbers',
            icon: 'functions',
            category: 'difficulty',
            values: {
              problemCount: 10,
              problemType: 'mixed',
              minNumber: 15,
              maxNumber: 100,
              maxFactorRange: 200,
              multipleCount: 6,
              includeGCD: true,
              includeLCM: true
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
    if (params.maxNumber > params.maxFactorRange) {
      customErrors.push('Maximum Number should not exceed Maximum Factor Range for optimal performance')
    }
    if (customErrors.length > 0) {
      throw new Error(`Invalid parameters: ${customErrors.join(', ')}`)
    }
    
    // Choose problem type
    let problemType = params.problemType
    if (problemType === 'mixed') {
      const types = ['factors', 'multiples', 'factor-pairs']
      if (params.includeGCD) types.push('gcd')
      if (params.includeLCM) types.push('lcm')
      problemType = this.getRandomElement(types)
    }
    
    return this.createProblemByType(problemType, params)
  }

  createProblemByType(problemType, params) {
    switch (problemType) {
      case 'factors':
        return this.createFactorsProblem(params)
      case 'multiples':
        return this.createMultiplesProblem(params)
      case 'gcd':
        return this.createGCDProblem(params)
      case 'lcm':
        return this.createLCMProblem(params)
      case 'factor-pairs':
        return this.createFactorPairsProblem(params)
      default:
        return this.createFactorsProblem(params)
    }
  }

  createFactorsProblem(params) {
    const number = this.getRandomNumber(params.minNumber, Math.min(params.maxNumber, params.maxFactorRange))
    const factors = this.findFactors(number)
    const factorsList = factors.join(', ')
    
    const questionText = `Find all factors of ${number}.`
    const questionLaTeX = `\\text{Find all factors of } ${number}\\text{.}`

    const steps = [
      `Find all factors of ${number}`,
      `Test each number from 1 to ${number} to see if it divides evenly`,
      `Factors of ${number}: ${factorsList}`
    ]

    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: factorsList,
      answerLaTeX: factorsList,
      steps: steps,
      metadata: {
        operation: 'factors',
        number: number,
        factors: factors,
        factorCount: factors.length,
        difficulty: this.difficulty,
        estimatedTime: '90 seconds'
      }
    }
  }

  createMultiplesProblem(params) {
    const number = this.getRandomNumber(params.minNumber, params.maxNumber)
    const multiples = []
    
    for (let i = 1; i <= params.multipleCount; i++) {
      multiples.push(number * i)
    }
    
    const multiplesList = multiples.join(', ')
    
    const questionText = `Find the first ${params.multipleCount} multiples of ${number}.`
    const questionLaTeX = `\\text{Find the first } ${params.multipleCount} \\text{ multiples of } ${number}\\text{.}`

    const steps = [
      `Find the first ${params.multipleCount} multiples of ${number}`,
      `Multiply ${number} by 1, 2, 3, 4, ...`,
      `Multiples of ${number}: ${multiplesList}`
    ]

    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: multiplesList,
      answerLaTeX: multiplesList,
      steps: steps,
      metadata: {
        operation: 'multiples',
        number: number,
        multiples: multiples,
        multipleCount: params.multipleCount,
        difficulty: this.difficulty,
        estimatedTime: '60 seconds'
      }
    }
  }

  createGCDProblem(params) {
    const num1 = this.getRandomNumber(params.minNumber, params.maxNumber)
    const num2 = this.getRandomNumber(params.minNumber, params.maxNumber)
    
    // Ensure numbers are different
    if (num1 === num2) {
      const num2_new = num1 + this.getRandomNumber(1, 5)
      const finalNum2 = num2_new <= params.maxNumber ? num2_new : num1 - this.getRandomNumber(1, Math.min(5, num1 - params.minNumber))
      const gcd = this.findGCD(num1, finalNum2)
      
      const questionText = `Find the GCD (Greatest Common Divisor) of ${num1} and ${finalNum2}.`
      const questionLaTeX = `\\text{Find the GCD of } ${num1} \\text{ and } ${finalNum2}\\text{.}`

      const steps = this.generateGCDSteps(num1, finalNum2, gcd)

      return {
        question: questionText,
        questionLaTeX: questionLaTeX,
        answer: gcd,
        answerLaTeX: gcd.toString(),
        steps: steps,
        metadata: {
          operation: 'gcd',
          numbers: [num1, finalNum2],
          gcd: gcd,
          difficulty: this.difficulty,
          estimatedTime: '120 seconds'
        }
      }
    }
    
    const gcd = this.findGCD(num1, num2)
    
    const questionText = `Find the GCD (Greatest Common Divisor) of ${num1} and ${num2}.`
    const questionLaTeX = `\\text{Find the GCD of } ${num1} \\text{ and } ${num2}\\text{.}`

    const steps = this.generateGCDSteps(num1, num2, gcd)

    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: gcd,
      answerLaTeX: gcd.toString(),
      steps: steps,
      metadata: {
        operation: 'gcd',
        numbers: [num1, num2],
        gcd: gcd,
        difficulty: this.difficulty,
        estimatedTime: '120 seconds'
      }
    }
  }

  createLCMProblem(params) {
    const num1 = this.getRandomNumber(params.minNumber, Math.min(params.maxNumber, 20)) // Keep smaller for LCM
    const num2 = this.getRandomNumber(params.minNumber, Math.min(params.maxNumber, 20))
    
    // Ensure numbers are different
    if (num1 === num2) {
      const num2_new = num1 + this.getRandomNumber(1, 3)
      const finalNum2 = num2_new <= 20 ? num2_new : num1 - this.getRandomNumber(1, Math.min(3, num1 - params.minNumber))
      const lcm = this.findLCM(num1, finalNum2)
      
      const questionText = `Find the LCM (Least Common Multiple) of ${num1} and ${finalNum2}.`
      const questionLaTeX = `\\text{Find the LCM of } ${num1} \\text{ and } ${finalNum2}\\text{.}`

      const steps = this.generateLCMSteps(num1, finalNum2, lcm)

      return {
        question: questionText,
        questionLaTeX: questionLaTeX,
        answer: lcm,
        answerLaTeX: lcm.toString(),
        steps: steps,
        metadata: {
          operation: 'lcm',
          numbers: [num1, finalNum2],
          lcm: lcm,
          difficulty: this.difficulty,
          estimatedTime: '120 seconds'
        }
      }
    }
    
    const lcm = this.findLCM(num1, num2)
    
    const questionText = `Find the LCM (Least Common Multiple) of ${num1} and ${num2}.`
    const questionLaTeX = `\\text{Find the LCM of } ${num1} \\text{ and } ${num2}\\text{.}`

    const steps = this.generateLCMSteps(num1, num2, lcm)

    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: lcm,
      answerLaTeX: lcm.toString(),
      steps: steps,
      metadata: {
        operation: 'lcm',
        numbers: [num1, num2],
        lcm: lcm,
        difficulty: this.difficulty,
        estimatedTime: '120 seconds'
      }
    }
  }

  createFactorPairsProblem(params) {
    const number = this.getRandomNumber(params.minNumber, Math.min(params.maxNumber, 50))
    const factorPairs = this.findFactorPairs(number)
    const pairsText = factorPairs.map(pair => `(${pair[0]}, ${pair[1]})`).join(', ')
    
    const questionText = `Find all factor pairs of ${number}.`
    const questionLaTeX = `\\text{Find all factor pairs of } ${number}\\text{.}`

    const steps = [
      `Find factor pairs of ${number}`,
      `Factor pairs are two numbers that multiply to give ${number}`,
      `Factor pairs: ${pairsText}`
    ]

    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: pairsText,
      answerLaTeX: pairsText,
      steps: steps,
      metadata: {
        operation: 'factor-pairs',
        number: number,
        factorPairs: factorPairs,
        pairCount: factorPairs.length,
        difficulty: this.difficulty,
        estimatedTime: '90 seconds'
      }
    }
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

  findFactorPairs(number) {
    const pairs = []
    for (let i = 1; i <= Math.sqrt(number); i++) {
      if (number % i === 0) {
        pairs.push([i, number / i])
      }
    }
    return pairs
  }

  findGCD(a, b) {
    while (b !== 0) {
      const temp = b
      b = a % b
      a = temp
    }
    return a
  }

  findLCM(a, b) {
    return Math.abs(a * b) / this.findGCD(a, b)
  }

  generateGCDSteps(num1, num2, gcd) {
    const factors1 = this.findFactors(num1)
    const factors2 = this.findFactors(num2)
    const commonFactors = factors1.filter(f => factors2.includes(f))
    
    return [
      `Find GCD of ${num1} and ${num2}`,
      `Factors of ${num1}: ${factors1.join(', ')}`,
      `Factors of ${num2}: ${factors2.join(', ')}`,
      `Common factors: ${commonFactors.join(', ')}`,
      `Greatest common factor: ${gcd}`
    ]
  }

  generateLCMSteps(num1, num2, lcm) {
    return [
      `Find LCM of ${num1} and ${num2}`,
      `List multiples until we find a common one`,
      `Multiples of ${num1}: ${num1}, ${num1*2}, ${num1*3}, ...`,
      `Multiples of ${num2}: ${num2}, ${num2*2}, ${num2*3}, ...`,
      `Least common multiple: ${lcm}`
    ]
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)]
  }
}

export default FactorsMultiplesGenerator