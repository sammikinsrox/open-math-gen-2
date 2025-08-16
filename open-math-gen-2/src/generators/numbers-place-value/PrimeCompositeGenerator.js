import { BaseGenerator } from '../BaseGenerator.js'

/**
 * Prime and Composite Numbers Generator
 * Generates problems about identifying prime and composite numbers
 */
export class PrimeCompositeGenerator extends BaseGenerator {
  constructor() {
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
      
      parameterSchema: {
        problemCount: {
          type: 'number',
          label: 'Number of Problems',
          description: 'How many prime/composite problems to generate',
          min: 1,
          max: 100,
          required: true
        },
        minNumber: {
          type: 'number',
          label: 'Minimum Number',
          description: 'Smallest number to use',
          min: 1,
          max: 100,
          required: true
        },
        maxNumber: {
          type: 'number',
          label: 'Maximum Number',
          description: 'Largest number to use',
          min: 2,
          max: 200,
          required: true
        },
        problemType: {
          type: 'string',
          label: 'Problem Type',
          description: 'Type of prime/composite problem',
          options: ['identify', 'list-factors', 'find-primes', 'find-composites', 'mixed']
        },
        includeOne: {
          type: 'boolean',
          label: 'Include Number 1',
          description: 'Include questions about the number 1 (neither prime nor composite)'
        },
        showFactors: {
          type: 'boolean',
          label: 'Show Factors in Steps',
          description: 'Include factor lists in solution steps'
        },
        mixedQuestions: {
          type: 'boolean',
          label: 'Mixed Prime/Composite',
          description: 'Include both prime and composite numbers in problems'
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