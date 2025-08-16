import { BaseGenerator } from '../BaseGenerator.js'

/**
 * Order of Operations Generator (PEMDAS/BODMAS)
 * Generates complex mathematical expressions requiring proper order of operations
 */
export class OrderOfOperationsGenerator extends BaseGenerator {
  constructor() {
    super({
      name: 'Order of Operations (PEMDAS)',
      description: 'Generate problems requiring proper order of operations',
      category: 'basic-operations',
      difficulty: 'hard',
      icon: 'analytics',
      
      defaultParameters: {
        problemCount: 10,
        minNumber: 1,
        maxNumber: 12,
        includeParentheses: true,
        includeExponents: false,
        includeMultiplication: true,
        includeDivision: true,
        includeAddition: true,
        includeSubtraction: true,
        complexityLevel: 2,
        maxExponent: 3,
        forceMultiStep: true,
        avoidNegativeResults: true,
        allowDecimals: false,
        nestingLevel: 1
      },
      
      parameterSchema: {
        problemCount: {
          type: 'number',
          label: 'Number of Problems',
          description: 'How many order of operations problems to generate',
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
          min: 1,
          max: 100,
          required: true
        },
        includeParentheses: {
          type: 'boolean',
          label: 'Include Parentheses',
          description: 'Include problems with parentheses'
        },
        includeExponents: {
          type: 'boolean',
          label: 'Include Exponents',
          description: 'Include problems with exponents (powers)'
        },
        includeMultiplication: {
          type: 'boolean',
          label: 'Include Multiplication',
          description: 'Include multiplication operations'
        },
        includeDivision: {
          type: 'boolean',
          label: 'Include Division',
          description: 'Include division operations'
        },
        includeAddition: {
          type: 'boolean',
          label: 'Include Addition',
          description: 'Include addition operations'
        },
        includeSubtraction: {
          type: 'boolean',
          label: 'Include Subtraction',
          description: 'Include subtraction operations'
        },
        complexityLevel: {
          type: 'number',
          label: 'Complexity Level',
          description: 'How complex the expressions should be (1=simple, 3=very complex)',
          min: 1,
          max: 3,
          required: true
        },
        maxExponent: {
          type: 'number',
          label: 'Maximum Exponent',
          description: 'Largest exponent to use when exponents are enabled',
          min: 2,
          max: 4,
          required: true
        },
        forceMultiStep: {
          type: 'boolean',
          label: 'Force Multi-Step',
          description: 'Ensure problems require multiple steps to solve'
        },
        avoidNegativeResults: {
          type: 'boolean',
          label: 'Avoid Negative Results',
          description: 'Try to avoid problems with negative answers'
        },
        allowDecimals: {
          type: 'boolean',
          label: 'Allow Decimal Results',
          description: 'Allow problems that result in decimal answers'
        },
        nestingLevel: {
          type: 'number',
          label: 'Parentheses Nesting Level',
          description: 'How deeply nested parentheses can be',
          min: 1,
          max: 3,
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

    // Validate that at least one operation is enabled
    const operations = [
      params.includeAddition,
      params.includeSubtraction,
      params.includeMultiplication,
      params.includeDivision
    ]
    if (!operations.some(op => op)) {
      throw new Error('At least one basic operation must be enabled')
    }

    let expression, answer, steps
    let attempts = 0
    const maxAttempts = 50

    do {
      attempts++
      try {
        const result = this.generatePEMDASExpression(params)
        expression = result.expression
        answer = result.answer
        steps = result.steps

        // Validate result meets criteria
        if (params.avoidNegativeResults && answer < 0) continue
        if (!params.allowDecimals && !Number.isInteger(answer)) continue
        if (params.forceMultiStep && steps.length < 3) continue

        break
      } catch (error) {
        // Continue trying if generation fails
        continue
      }
    } while (attempts < maxAttempts)

    // Fallback if no valid expression found
    if (attempts >= maxAttempts) {
      const fallback = this.generateSimpleFallback(params)
      expression = fallback.expression
      answer = fallback.answer
      steps = fallback.steps
    }

    const questionText = `${expression.display} = ?`
    const questionLaTeX = `${expression.latex} = \\square`

    return {
      question: questionText,
      questionLaTeX: questionLaTeX,
      answer: Number.isInteger(answer) ? answer : parseFloat(answer.toFixed(2)),
      answerLaTeX: Number.isInteger(answer) ? `${answer}` : `${parseFloat(answer.toFixed(2))}`,
      steps: steps,
      metadata: {
        operation: 'order-of-operations',
        expression: expression.raw,
        complexity: params.complexityLevel,
        hasParentheses: expression.hasParentheses,
        hasExponents: expression.hasExponents,
        difficulty: this.difficulty,
        estimatedTime: '120 seconds'
      }
    }
  }

  generatePEMDASExpression(params) {
    const complexity = params.complexityLevel
    
    if (complexity === 1) {
      return this.generateSimpleExpression(params)
    } else if (complexity === 2) {
      return this.generateMediumExpression(params)
    } else {
      return this.generateComplexExpression(params)
    }
  }

  generateSimpleExpression(params) {
    // Generate expressions like: a + b × c, a × b + c, (a + b) × c
    const operations = this.getAvailableOperations(params)
    const highPriorityOps = operations.filter(op => op === '×' || op === '÷')
    const lowPriorityOps = operations.filter(op => op === '+' || op === '-')

    if (highPriorityOps.length === 0 || lowPriorityOps.length === 0) {
      // Fall back to same priority operations
      return this.generateSamePriorityExpression(params)
    }

    const a = this.getRandomNumber(params.minNumber, params.maxNumber)
    const b = this.getRandomNumber(params.minNumber, params.maxNumber)
    const c = this.getRandomNumber(params.minNumber, params.maxNumber)

    const highOp = this.getRandomElement(highPriorityOps)
    const lowOp = this.getRandomElement(lowPriorityOps)

    // Choose pattern: either low + high or high + low
    let expression, steps

    if (Math.random() < 0.5 && params.includeParentheses && Math.random() < 0.3) {
      // Pattern: (a lowOp b) highOp c
      const innerResult = this.evaluateOperation(a, lowOp, b)
      const finalResult = this.evaluateOperation(innerResult, highOp, c)
      
      expression = {
        raw: `(${a} ${lowOp} ${b}) ${highOp} ${c}`,
        display: `(${a} ${lowOp} ${b}) ${highOp} ${c}`,
        latex: `(${a} ${this.operatorToLatex(lowOp)} ${b}) ${this.operatorToLatex(highOp)} ${c}`,
        hasParentheses: true,
        hasExponents: false
      }

      steps = [
        `(${a} ${lowOp} ${b}) ${highOp} ${c}`,
        `${innerResult} ${highOp} ${c}`,
        `= ${finalResult}`
      ]

      return { expression, answer: finalResult, steps }
    } else {
      // Pattern: a lowOp b highOp c (high priority evaluated first)
      const highResult = this.evaluateOperation(b, highOp, c)
      const finalResult = this.evaluateOperation(a, lowOp, highResult)

      expression = {
        raw: `${a} ${lowOp} ${b} ${highOp} ${c}`,
        display: `${a} ${lowOp} ${b} ${highOp} ${c}`,
        latex: `${a} ${this.operatorToLatex(lowOp)} ${b} ${this.operatorToLatex(highOp)} ${c}`,
        hasParentheses: false,
        hasExponents: false
      }

      steps = [
        `${a} ${lowOp} ${b} ${highOp} ${c}`,
        `${a} ${lowOp} ${highResult}`,
        `= ${finalResult}`
      ]

      return { expression, answer: finalResult, steps }
    }
  }

  generateMediumExpression(params) {
    // Generate 4-term expressions with mixed operations
    const operations = this.getAvailableOperations(params)
    const a = this.getRandomNumber(params.minNumber, params.maxNumber)
    const b = this.getRandomNumber(params.minNumber, params.maxNumber)
    const c = this.getRandomNumber(params.minNumber, params.maxNumber)
    const d = this.getRandomNumber(params.minNumber, params.maxNumber)

    const op1 = this.getRandomElement(operations)
    const op2 = this.getRandomElement(operations)
    const op3 = this.getRandomElement(operations)

    // Add exponents if enabled
    let baseExpression = `${a} ${op1} ${b} ${op2} ${c} ${op3} ${d}`
    
    if (params.includeExponents && Math.random() < 0.4) {
      const expPos = Math.floor(Math.random() * 4) // Which number gets the exponent
      const exp = this.getRandomNumber(2, params.maxExponent)
      const positions = [a, b, c, d]
      positions[expPos] = `${positions[expPos]}^${exp}`
      baseExpression = `${positions[0]} ${op1} ${positions[1]} ${op2} ${positions[2]} ${op3} ${positions[3]}`
    }

    // Add parentheses if enabled
    if (params.includeParentheses && Math.random() < 0.5) {
      const parenType = Math.random()
      if (parenType < 0.33) {
        baseExpression = `(${a} ${op1} ${b}) ${op2} ${c} ${op3} ${d}`
      } else if (parenType < 0.66) {
        baseExpression = `${a} ${op1} (${b} ${op2} ${c}) ${op3} ${d}`
      } else {
        baseExpression = `${a} ${op1} ${b} ${op2} (${c} ${op3} ${d})`
      }
    }

    const { answer, steps } = this.evaluateExpressionWithSteps(baseExpression)

    const expression = {
      raw: baseExpression,
      display: baseExpression,
      latex: this.convertToLatex(baseExpression),
      hasParentheses: baseExpression.includes('('),
      hasExponents: baseExpression.includes('^')
    }

    return { expression, answer, steps }
  }

  generateComplexExpression(params) {
    // Generate nested expressions with multiple parentheses and operations
    const operations = this.getAvailableOperations(params)
    const numbers = Array.from({ length: 6 }, () => this.getRandomNumber(params.minNumber, params.maxNumber))
    
    // Build complex nested expression
    let baseExpression = this.buildNestedExpression(numbers, operations, params)
    
    const { answer, steps } = this.evaluateExpressionWithSteps(baseExpression)

    const expression = {
      raw: baseExpression,
      display: baseExpression,
      latex: this.convertToLatex(baseExpression),
      hasParentheses: baseExpression.includes('('),
      hasExponents: baseExpression.includes('^')
    }

    return { expression, answer, steps }
  }

  buildNestedExpression(numbers, operations, params) {
    // Create expressions with multiple levels of nesting
    const [a, b, c, d, e, f] = numbers
    const op1 = this.getRandomElement(operations)
    const op2 = this.getRandomElement(operations)
    const op3 = this.getRandomElement(operations)
    const op4 = this.getRandomElement(operations)

    const patterns = []

    // Basic nested patterns
    if (params.includeParentheses) {
      patterns.push(`(${a} ${op1} ${b}) ${op2} (${c} ${op3} ${d})`)
      patterns.push(`${a} ${op1} (${b} ${op2} ${c} ${op3} ${d})`)
      patterns.push(`(${a} ${op1} ${b} ${op2} ${c}) ${op3} ${d}`)
      
      if (params.nestingLevel >= 2) {
        patterns.push(`((${a} ${op1} ${b}) ${op2} ${c}) ${op3} ${d}`)
        patterns.push(`${a} ${op1} ((${b} ${op2} ${c}) ${op3} ${d})`)
        patterns.push(`(${a} ${op1} (${b} ${op2} ${c})) ${op3} ${d}`)
      }

      if (params.nestingLevel >= 3) {
        patterns.push(`(${a} ${op1} (${b} ${op2} (${c} ${op3} ${d})))`)
        patterns.push(`((${a} ${op1} ${b}) ${op2} (${c} ${op3} ${d})) ${op4} ${e}`)
      }
    }

    // Add non-parentheses patterns for fallback
    patterns.push(`${a} ${op1} ${b} ${op2} ${c} ${op3} ${d}`)
    patterns.push(`${a} ${op1} ${b} ${op2} ${c} ${op3} ${d} ${op4} ${e}`)

    let expression = this.getRandomElement(patterns)

    // Add exponents if enabled
    if (params.includeExponents && Math.random() < 0.3) {
      expression = this.addRandomExponent(expression, params.maxExponent)
    }

    return expression
  }

  addRandomExponent(expression, maxExp) {
    // Find numbers in the expression and randomly add exponents
    const numberRegex = /\b\d+\b/g
    const matches = [...expression.matchAll(numberRegex)]
    
    if (matches.length === 0) return expression

    const randomMatch = matches[Math.floor(Math.random() * matches.length)]
    const number = randomMatch[0]
    const exp = this.getRandomNumber(2, maxExp)
    
    return expression.replace(new RegExp(`\\b${number}\\b`), `${number}^${exp}`)
  }

  evaluateExpressionWithSteps(expression) {
    // Comprehensive expression evaluator with step-by-step breakdown
    const steps = [expression]
    let current = expression

    try {
      // Handle exponents first
      while (current.includes('^')) {
        const expMatch = current.match(/(\d+)\^(\d+)/)
        if (expMatch) {
          const base = parseInt(expMatch[1])
          const exp = parseInt(expMatch[2])
          const result = Math.pow(base, exp)
          current = current.replace(expMatch[0], result.toString())
          steps.push(current)
        } else {
          break
        }
      }

      // Handle parentheses from innermost to outermost
      while (current.includes('(')) {
        const innermost = this.findInnermostParentheses(current)
        if (!innermost) break

        const innerExpression = innermost.content
        const innerResult = this.evaluateSimpleExpression(innerExpression)
        current = current.replace(innermost.full, innerResult.toString())
        steps.push(current)
      }

      // Handle remaining operations by order of precedence
      current = this.evaluateByPrecedence(current, steps)

      const answer = parseFloat(current)
      return { answer, steps: [...steps, `= ${answer}`] }

    } catch (error) {
      // Fallback evaluation
      const cleanExpression = expression
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/\^/g, '**')
      
      try {
        const answer = eval(cleanExpression)
        return { answer, steps: [expression, `= ${answer}`] }
      } catch {
        return { answer: 0, steps: [expression, '= 0'] }
      }
    }
  }

  findInnermostParentheses(expression) {
    // Find the innermost parentheses in an expression
    let deepest = -1
    let start = -1
    let depth = 0

    for (let i = 0; i < expression.length; i++) {
      if (expression[i] === '(') {
        if (depth > deepest) {
          deepest = depth
          start = i
        }
        depth++
      } else if (expression[i] === ')') {
        if (depth - 1 === deepest) {
          const content = expression.substring(start + 1, i)
          const full = expression.substring(start, i + 1)
          return { content, full, start, end: i }
        }
        depth--
      }
    }
    return null
  }

  evaluateByPrecedence(expression, steps) {
    let current = expression.trim()

    // First pass: handle multiplication and division (left to right)
    while (/\d+\s*[×÷]\s*\d+/.test(current)) {
      current = current.replace(/(\d+(?:\.\d+)?)\s*([×÷])\s*(\d+(?:\.\d+)?)/, (match, a, op, b) => {
        const numA = parseFloat(a)
        const numB = parseFloat(b)
        let result
        
        if (op === '×') {
          result = numA * numB
        } else {
          result = numA / numB
        }
        
        return Number.isInteger(result) ? result.toString() : result.toFixed(2)
      })
      steps.push(current)
    }

    // Second pass: handle addition and subtraction (left to right)
    while (/\d+\s*[+\-]\s*\d+/.test(current)) {
      current = current.replace(/(\d+(?:\.\d+)?)\s*([+\-])\s*(\d+(?:\.\d+)?)/, (match, a, op, b) => {
        const numA = parseFloat(a)
        const numB = parseFloat(b)
        let result
        
        if (op === '+') {
          result = numA + numB
        } else {
          result = numA - numB
        }
        
        return Number.isInteger(result) ? result.toString() : result.toFixed(2)
      })
      steps.push(current)
    }

    return current
  }

  evaluateSimpleExpression(expression) {
    // Evaluate a simple expression without parentheses
    const tokens = expression.trim().split(/\s+/)
    if (tokens.length === 1) return parseFloat(tokens[0])

    // Convert to numbers and operators
    const numbers = []
    const operators = []
    
    for (let i = 0; i < tokens.length; i++) {
      if (i % 2 === 0) {
        numbers.push(parseFloat(tokens[i]))
      } else {
        operators.push(tokens[i])
      }
    }

    // Handle multiplication and division first
    for (let i = operators.length - 1; i >= 0; i--) {
      if (operators[i] === '×' || operators[i] === '÷') {
        let result
        if (operators[i] === '×') {
          result = numbers[i] * numbers[i + 1]
        } else {
          result = numbers[i] / numbers[i + 1]
        }
        
        numbers.splice(i, 2, result)
        operators.splice(i, 1)
      }
    }

    // Handle addition and subtraction
    let result = numbers[0]
    for (let i = 0; i < operators.length; i++) {
      if (operators[i] === '+') {
        result += numbers[i + 1]
      } else if (operators[i] === '-') {
        result -= numbers[i + 1]
      }
    }

    return result
  }

  generateSamePriorityExpression(params) {
    // Fallback for when we can't create mixed priority expressions
    const operations = this.getAvailableOperations(params)
    const a = this.getRandomNumber(params.minNumber, params.maxNumber)
    const b = this.getRandomNumber(params.minNumber, params.maxNumber)
    const c = this.getRandomNumber(params.minNumber, params.maxNumber)

    const op1 = this.getRandomElement(operations)
    const op2 = this.getRandomElement(operations)

    const expression = {
      raw: `${a} ${op1} ${b} ${op2} ${c}`,
      display: `${a} ${op1} ${b} ${op2} ${c}`,
      latex: `${a} ${this.operatorToLatex(op1)} ${b} ${this.operatorToLatex(op2)} ${c}`,
      hasParentheses: false,
      hasExponents: false
    }

    const step1 = this.evaluateOperation(a, op1, b)
    const answer = this.evaluateOperation(step1, op2, c)

    const steps = [
      `${a} ${op1} ${b} ${op2} ${c}`,
      `${step1} ${op2} ${c}`,
      `= ${answer}`
    ]

    return { expression, answer, steps }
  }

  generateSimpleFallback(params) {
    // Simple fallback expression
    const a = this.getRandomNumber(params.minNumber, params.maxNumber)
    const b = this.getRandomNumber(params.minNumber, params.maxNumber)
    const c = this.getRandomNumber(params.minNumber, params.maxNumber)

    const expression = {
      raw: `${a} + ${b} × ${c}`,
      display: `${a} + ${b} × ${c}`,
      latex: `${a} + ${b} \\times ${c}`,
      hasParentheses: false,
      hasExponents: false
    }

    const step1 = b * c
    const answer = a + step1

    const steps = [
      `${a} + ${b} × ${c}`,
      `${a} + ${step1}`,
      `= ${answer}`
    ]

    return { expression, answer, steps }
  }

  getAvailableOperations(params) {
    const ops = []
    if (params.includeAddition) ops.push('+')
    if (params.includeSubtraction) ops.push('-')
    if (params.includeMultiplication) ops.push('×')
    if (params.includeDivision) ops.push('÷')
    return ops
  }

  evaluateOperation(a, operator, b) {
    switch (operator) {
      case '+': return a + b
      case '-': return a - b
      case '×': return a * b
      case '÷': return a / b
      default: return 0
    }
  }

  operatorToLatex(operator) {
    switch (operator) {
      case '×': return '\\times'
      case '÷': return '\\div'
      case '^': return '^'
      default: return operator
    }
  }

  convertToLatex(expression) {
    return expression
      .replace(/×/g, '\\times')
      .replace(/÷/g, '\\div')
      .replace(/\^(\d+)/g, '^{$1}')
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)]
  }
}

export default OrderOfOperationsGenerator