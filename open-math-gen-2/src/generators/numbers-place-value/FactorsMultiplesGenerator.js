import { BaseGenerator } from '../BaseGenerator.js'

/**
 * Factors and Multiples Generator
 * Generates problems about finding factors, multiples, GCD, and LCM
 */
export class FactorsMultiplesGenerator extends BaseGenerator {
  constructor() {
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
      
      parameterSchema: {
        problemCount: {
          type: 'number',
          label: 'Number of Problems',
          description: 'How many factor/multiple problems to generate',
          min: 1,
          max: 100,
          required: true
        },
        minNumber: {
          type: 'number',
          label: 'Minimum Number',
          description: 'Smallest number to use',
          min: 1,
          max: 50,
          required: true
        },
        maxNumber: {
          type: 'number',
          label: 'Maximum Number',
          description: 'Largest number to use',
          min: 2,
          max: 100,
          required: true
        },
        problemType: {
          type: 'string',
          label: 'Problem Type',
          description: 'Type of factor/multiple problem',
          options: ['factors', 'multiples', 'gcd', 'lcm', 'factor-pairs', 'mixed']
        },
        multipleCount: {
          type: 'number',
          label: 'Number of Multiples',
          description: 'How many multiples to list',
          min: 3,
          max: 10,
          required: true
        },
        includeGCD: {
          type: 'boolean',
          label: 'Include GCD Problems',
          description: 'Include greatest common divisor problems'
        },
        includeLCM: {
          type: 'boolean',
          label: 'Include LCM Problems',
          description: 'Include least common multiple problems'
        },
        maxFactorRange: {
          type: 'number',
          label: 'Maximum for Factor Finding',
          description: 'Upper limit when finding factors of a number',
          min: 50,
          max: 200,
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