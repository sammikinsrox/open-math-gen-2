import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Order of Operations Generator (PEMDAS/BODMAS)
 * Generates complex mathematical expressions requiring proper order of operations
 */
export class OrderOfOperationsGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Order of Operations (PEMDAS)',
      description: 'Generate problems requiring proper order of operations',
      category: 'basic-operations',
      difficulty: 'hard',
      icon: 'analytics',
      tags: ['arithmetic', 'pemdas', 'bodmas', 'order-of-operations', 'parentheses'],
      gradeLevel: '5-8',
      estimatedTime: '120 seconds',
      exampleProblem: {
        question: '2 + 3 × (4 - 1) = ?',
        questionLaTeX: '2 + 3 \\times (4 - 1) = \\square',
        answer: '11',
        answerLaTeX: '11'
      },
      
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
        complexityLevel: 'intermediate',
        maxExponent: 3,
        forceMultiStep: true,
        avoidNegativeResults: true,
        allowDecimals: false,
        nestingLevel: 1
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
                description: 'How many order of operations problems to generate',
                min: 1,
                max: 50,
                required: true,
                slider: true,
                presets: [5, 8, 10, 15],
                order: 1
              }),
              complexityLevel: schemaV2.createParameter({
                type: 'select',
                label: 'Complexity Level',
                description: 'Controls the overall difficulty and expression structure',
                variant: 'cards',
                options: [
                  { 
                    value: 'basic', 
                    label: 'Basic',
                    description: '3-term expressions with mixed operations (5-8th grade)'
                  },
                  { 
                    value: 'intermediate', 
                    label: 'Intermediate',
                    description: '4-term expressions with parentheses and exponents'
                  },
                  { 
                    value: 'advanced', 
                    label: 'Advanced',
                    description: 'Complex nested expressions with multiple levels'
                  }
                ],
                order: 2
              })
            }
          }),
          
          numberRanges: schemaV2.createCategory({
            id: 'numberRanges',
            label: 'Number Ranges',
            description: 'Control the range of numbers used in expressions',
            icon: 'tag',
            color: 'green',
            order: 2,
            parameters: {
              minNumber: schemaV2.createParameter({
                type: 'number',
                label: 'Minimum Number',
                description: 'Smallest number to use in expressions',
                min: 1,
                max: 50,
                required: true,
                presets: [1, 2, 5, 10],
                order: 1
              }),
              maxNumber: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Number',
                description: 'Largest number to use in expressions',
                min: 1,
                max: 100,
                required: true,
                presets: [12, 20, 50, 100],
                order: 2
              })
            }
          }),
          
          operations: schemaV2.createCategory({
            id: 'operations',
            label: 'Operations to Include',
            description: 'Select which mathematical operations to include',
            icon: 'calculate',
            color: 'orange',
            order: 3,
            parameters: {
              includeAddition: schemaV2.createParameter({
                type: 'boolean',
                label: 'Addition (+)',
                description: 'Include addition operations in expressions',
                helpText: 'Essential for most order of operations problems',
                order: 1
              }),
              includeSubtraction: schemaV2.createParameter({
                type: 'boolean',
                label: 'Subtraction (−)',
                description: 'Include subtraction operations in expressions',
                helpText: 'Can create negative intermediate results',
                order: 2
              }),
              includeMultiplication: schemaV2.createParameter({
                type: 'boolean',
                label: 'Multiplication (×)',
                description: 'Include multiplication operations in expressions',
                helpText: 'High priority operation essential for PEMDAS practice',
                order: 3
              }),
              includeDivision: schemaV2.createParameter({
                type: 'boolean',
                label: 'Division (÷)',
                description: 'Include division operations in expressions',
                helpText: 'High priority operation, may create decimal results',
                order: 4
              }),
              includeExponents: schemaV2.createParameter({
                type: 'boolean',
                label: 'Exponents (^)',
                description: 'Include exponents (powers) in expressions',
                helpText: 'Highest priority operation in PEMDAS hierarchy',
                order: 5
              })
            }
          }),
          
          structure: schemaV2.createCategory({
            id: 'structure',
            label: 'Expression Structure',
            description: 'Control parentheses, nesting, and expression complexity',
            icon: 'account_tree',
            color: 'purple',
            order: 4,
            parameters: {
              includeParentheses: schemaV2.createParameter({
                type: 'boolean',
                label: 'Include Parentheses',
                description: 'Add parentheses to change order of operations',
                helpText: 'Essential for practicing grouping and precedence rules',
                order: 1
              }),
              nestingLevel: schemaV2.createParameter({
                type: 'number',
                label: 'Parentheses Nesting Level',
                description: 'Maximum depth of nested parentheses',
                min: 1,
                max: 3,
                required: true,
                helpText: '1: (a+b)*c, 2: ((a+b)*c)+d, 3: (((a+b)*c)+d)*e',
                slider: true,
                order: 2
              }),
              maxExponent: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Exponent',
                description: 'Largest exponent value when exponents are enabled',
                min: 2,
                max: 4,
                required: true,
                presets: [2, 3, 4],
                helpText: 'Higher exponents create larger intermediate results',
                order: 3
              })
            }
          }),
          
          constraints: schemaV2.createCategory({
            id: 'constraints',
            label: 'Problem Constraints',
            description: 'Advanced options to control problem characteristics',
            icon: 'tune',
            color: 'red',
            order: 5,
            expanded: false,
            parameters: {
              forceMultiStep: schemaV2.createParameter({
                type: 'boolean',
                label: 'Force Multi-Step Solutions',
                description: 'Ensure all problems require multiple calculation steps',
                helpText: 'Eliminates simple expressions like "2 + 3"',
                order: 1
              }),
              avoidNegativeResults: schemaV2.createParameter({
                type: 'boolean',
                label: 'Avoid Negative Results',
                description: 'Try to generate problems with positive final answers',
                helpText: 'Useful for elementary-level practice',
                order: 2
              }),
              allowDecimals: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Decimal Results',
                description: 'Permit problems that result in decimal answers',
                helpText: 'Mainly affects division operations',
                order: 3
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'elementary-pemdas',
            label: 'Elementary PEMDAS',
            description: 'Introduction to order of operations (grades 5-6)',
            icon: 'school',
            category: 'difficulty',
            values: {
              problemCount: 8,
              complexityLevel: 'basic',
              minNumber: 1,
              maxNumber: 12,
              includeAddition: true,
              includeSubtraction: true,
              includeMultiplication: true,
              includeDivision: false,
              includeExponents: false,
              includeParentheses: true,
              nestingLevel: 1,
              maxExponent: 2,
              forceMultiStep: true,
              avoidNegativeResults: true,
              allowDecimals: false
            }
          }),
          
          schemaV2.createPreset({
            id: 'middle-school-standard',
            label: 'Middle School Standard',
            description: 'Comprehensive PEMDAS practice (grades 6-8)',
            icon: 'calculate',
            category: 'difficulty',
            values: {
              problemCount: 12,
              complexityLevel: 'intermediate',
              minNumber: 1,
              maxNumber: 15,
              includeAddition: true,
              includeSubtraction: true,
              includeMultiplication: true,
              includeDivision: true,
              includeExponents: true,
              includeParentheses: true,
              nestingLevel: 2,
              maxExponent: 3,
              forceMultiStep: true,
              avoidNegativeResults: false,
              allowDecimals: true
            }
          }),
          
          schemaV2.createPreset({
            id: 'advanced-expressions',
            label: 'Advanced Expressions',
            description: 'Complex nested expressions (grades 8+)',
            icon: 'functions',
            category: 'difficulty',
            values: {
              problemCount: 10,
              complexityLevel: 'advanced',
              minNumber: 1,
              maxNumber: 20,
              includeAddition: true,
              includeSubtraction: true,
              includeMultiplication: true,
              includeDivision: true,
              includeExponents: true,
              includeParentheses: true,
              nestingLevel: 3,
              maxExponent: 4,
              forceMultiStep: true,
              avoidNegativeResults: false,
              allowDecimals: true
            }
          }),
          
          schemaV2.createPreset({
            id: 'no-parentheses',
            label: 'No Parentheses Focus',
            description: 'Practice natural order of operations without grouping symbols',
            icon: 'remove',
            category: 'scope',
            values: {
              problemCount: 15,
              complexityLevel: 'intermediate',
              minNumber: 2,
              maxNumber: 12,
              includeAddition: true,
              includeSubtraction: true,
              includeMultiplication: true,
              includeDivision: true,
              includeExponents: true,
              includeParentheses: false,
              nestingLevel: 1,
              maxExponent: 3,
              forceMultiStep: true,
              avoidNegativeResults: true,
              allowDecimals: false
            }
          })
        ]
      })
    })
  }

  generateProblem(parameters = {}) {
    const params = { ...this.defaultParameters, ...parameters }
    
    // Apply complexity level overrides for better defaults
    const adjustedParams = this.applyComplexityLevelAdjustments(params)
    
    // Validate parameters
    const validation = this.validateParameters(adjustedParams)
    if (!validation.isValid) {
      throw new Error(`Invalid parameters: ${validation.errors.join(', ')}`)
    }

    // Validate that at least one operation is enabled
    const operations = [
      adjustedParams.includeAddition,
      adjustedParams.includeSubtraction,
      adjustedParams.includeMultiplication,
      adjustedParams.includeDivision
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
        const result = this.generatePEMDASExpression(adjustedParams)
        expression = result.expression
        answer = result.answer
        steps = result.steps

        // Validate result meets criteria
        if (adjustedParams.avoidNegativeResults && answer < 0) continue
        if (!adjustedParams.allowDecimals && !Number.isInteger(answer)) continue
        if (adjustedParams.forceMultiStep && steps.length < 3) continue

        break
      } catch (error) {
        // Continue trying if generation fails
        continue
      }
    } while (attempts < maxAttempts)

    // Fallback if no valid expression found
    if (attempts >= maxAttempts) {
      const fallback = this.generateSimpleFallback(adjustedParams)
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
        complexityLevel: adjustedParams.complexityLevel,
        hasParentheses: expression.hasParentheses,
        hasExponents: expression.hasExponents,
        operationsUsed: this.getOperationsUsed(adjustedParams),
        stepCount: steps.length,
        difficulty: this.difficulty,
        estimatedTime: '120 seconds'
      }
    }
  }

  generatePEMDASExpression(params) {
    const complexity = params.complexityLevel
    
    if (complexity === 'basic') {
      return this.generateSimpleExpression(params)
    } else if (complexity === 'intermediate') {
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

  /**
   * Apply complexity level adjustments to parameters
   * @param {Object} params - Original parameters
   * @returns {Object} - Adjusted parameters
   */
  applyComplexityLevelAdjustments(params) {
    const adjusted = { ...params }
    
    // Apply complexity level overrides for better defaults
    if (params.complexityLevel === 'basic') {
      // Basic: simpler numbers and operations
      adjusted.minNumber = Math.max(1, Math.min(adjusted.minNumber, 12))
      adjusted.maxNumber = Math.min(adjusted.maxNumber, 12)
      adjusted.nestingLevel = Math.min(adjusted.nestingLevel, 1)
      adjusted.maxExponent = Math.min(adjusted.maxExponent, 2)
      // Prefer avoiding decimals and negatives for basic level
      if (!adjusted.hasOwnProperty('allowDecimals')) {
        adjusted.allowDecimals = false
      }
      if (!adjusted.hasOwnProperty('avoidNegativeResults')) {
        adjusted.avoidNegativeResults = true
      }
    } else if (params.complexityLevel === 'intermediate') {
      // Intermediate: moderate complexity
      adjusted.minNumber = Math.max(1, Math.min(adjusted.minNumber, 15))
      adjusted.maxNumber = Math.min(adjusted.maxNumber, 20)
      adjusted.nestingLevel = Math.min(adjusted.nestingLevel, 2)
      adjusted.maxExponent = Math.min(adjusted.maxExponent, 3)
    } else if (params.complexityLevel === 'advanced') {
      // Advanced: full complexity
      adjusted.maxNumber = Math.max(adjusted.maxNumber, 15)
      adjusted.nestingLevel = Math.max(adjusted.nestingLevel, 2)
      adjusted.maxExponent = Math.max(adjusted.maxExponent, 3)
      // Enable more advanced features for advanced level
      if (!adjusted.hasOwnProperty('allowDecimals')) {
        adjusted.allowDecimals = true
      }
      if (!adjusted.hasOwnProperty('includeExponents')) {
        adjusted.includeExponents = true
      }
    }
    
    return adjusted
  }

  /**
   * Get list of operations used based on parameters
   * @param {Object} params - Parameters object
   * @returns {Array} - Array of operation symbols used
   */
  getOperationsUsed(params) {
    const operations = []
    if (params.includeAddition) operations.push('+')
    if (params.includeSubtraction) operations.push('−')
    if (params.includeMultiplication) operations.push('×')
    if (params.includeDivision) operations.push('÷')
    if (params.includeExponents) operations.push('^')
    if (params.includeParentheses) operations.push('()')
    return operations
  }
}

export default OrderOfOperationsGenerator