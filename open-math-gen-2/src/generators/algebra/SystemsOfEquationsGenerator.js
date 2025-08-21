import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Systems of Equations Generator
 * 
 * Generates systems of linear equations with various solution methods
 * including substitution, elimination, and graphing methods.
 */
export class SystemsOfEquationsGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Systems of Equations',
      description: 'Solve systems of linear equations using substitution, elimination, and graphing',
      category: 'algebra',
      difficulty: 'medium',
      icon: 'linear_scale',
      tags: ['algebra', 'systems', 'equations', 'substitution', 'elimination'],
      gradeLevel: '9-12',
      estimatedTime: '3-5 minutes',
      exampleProblem: {
        question: 'Solve the system: x + y = 5, 2x - y = 1',
        questionLaTeX: '\\text{Solve the system: } \\begin{cases} x + y = 5 \\\\\\\\ 2x - y = 1 \\end{cases}',
        answer: 'x = 2, y = 3',
        answerLaTeX: 'x = 2, y = 3'
      },
      
      // Default parameter values
      defaultParameters: {
        problemCount: 8,
        includeSubstitution: true,
        includeElimination: true,
        includeGraphing: false,
        includeWordProblems: false,
        includeNoSolution: false,
        includeInfiniteSolutions: false,
        allowFractions: false,
        allowNegatives: true,
        maxCoefficient: 10,
        maxConstant: 20,
        solutionMethod: 'any',
        complexityLevel: 'basic'
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
                description: 'How many systems of equations to generate',
                min: 1,
                max: 30,
                required: true,
                slider: true,
                presets: [5, 8, 10, 15],
                order: 1
              }),
              complexityLevel: schemaV2.createParameter({
                type: 'select',
                label: 'Complexity Level',
                description: 'Determines the difficulty of the systems',
                variant: 'cards',
                options: [
                  { 
                    value: 'basic', 
                    label: 'Basic',
                    description: 'Simple integer solutions'
                  },
                  { 
                    value: 'intermediate', 
                    label: 'Intermediate',
                    description: 'Larger numbers and some fractions'
                  },
                  { 
                    value: 'advanced', 
                    label: 'Advanced',
                    description: 'Complex coefficients and special cases'
                  }
                ],
                order: 2
              })
            }
          }),
          
          solutionMethods: schemaV2.createCategory({
            id: 'solutionMethods',
            label: 'Solution Methods',
            description: 'Choose which solution methods to practice',
            icon: 'calculate',
            color: 'green',
            order: 2,
            parameters: {
              solutionMethod: schemaV2.createParameter({
                type: 'select',
                label: 'Preferred Method',
                description: 'Which solution method to emphasize',
                options: [
                  { value: 'any', label: 'Any Method', description: 'Let students choose' },
                  { value: 'substitution', label: 'Substitution', description: 'Focus on substitution method' },
                  { value: 'elimination', label: 'Elimination', description: 'Focus on elimination method' },
                  { value: 'graphing', label: 'Graphing', description: 'Focus on graphing method' }
                ],
                order: 1
              }),
              includeSubstitution: schemaV2.createParameter({
                type: 'boolean',
                label: 'Substitution Method',
                description: 'Include problems suitable for substitution',
                helpText: 'One equation easily solved for a variable',
                order: 2
              }),
              includeElimination: schemaV2.createParameter({
                type: 'boolean',
                label: 'Elimination Method',
                description: 'Include problems suitable for elimination',
                helpText: 'Coefficients designed for easy elimination',
                order: 3
              }),
              includeGraphing: schemaV2.createParameter({
                type: 'boolean',
                label: 'Graphing Method',
                description: 'Include problems with simple graphing',
                helpText: 'Equations in slope-intercept form',
                order: 4
              })
            }
          }),
          
          problemTypes: schemaV2.createCategory({
            id: 'problemTypes',
            label: 'Problem Types',
            description: 'Special types of systems to include',
            icon: 'category',
            color: 'purple',
            order: 3,
            parameters: {
              includeWordProblems: schemaV2.createParameter({
                type: 'boolean',
                label: 'Word Problems',
                description: 'Include real-world application problems',
                helpText: 'Age, money, distance problems',
                order: 1
              }),
              includeNoSolution: schemaV2.createParameter({
                type: 'boolean',
                label: 'No Solution Systems',
                description: 'Include inconsistent systems',
                helpText: 'Parallel lines that never intersect',
                order: 2
              }),
              includeInfiniteSolutions: schemaV2.createParameter({
                type: 'boolean',
                label: 'Infinite Solutions',
                description: 'Include dependent systems',
                helpText: 'Same line represented differently',
                order: 3
              })
            }
          }),
          
          numberSettings: schemaV2.createCategory({
            id: 'numberSettings',
            label: 'Number Settings',
            description: 'Configure the ranges and types of numbers',
            icon: 'tag',
            color: 'orange',
            order: 4,
            parameters: {
              maxCoefficient: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Coefficient',
                description: 'Largest coefficient for variables',
                min: 2,
                max: 20,
                required: true,
                slider: true,
                presets: [5, 8, 10, 15],
                order: 1
              }),
              maxConstant: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Constant',
                description: 'Largest constant term',
                min: 5,
                max: 50,
                required: true,
                slider: true,
                presets: [10, 15, 20, 30],
                order: 2
              }),
              allowNegatives: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Negative Numbers',
                description: 'Include negative coefficients and solutions',
                helpText: 'Adds complexity with negative values',
                order: 3
              }),
              allowFractions: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Fractions',
                description: 'Allow fractional solutions',
                helpText: 'Solutions like x = 1/2, y = 3/4',
                order: 4
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'substitution-practice',
            label: 'Substitution Practice',
            description: 'Focus on substitution method with simple equations',
            icon: 'swap_horiz',
            category: 'method',
            values: {
              problemCount: 8,
              includeSubstitution: true,
              includeElimination: false,
              includeGraphing: false,
              includeWordProblems: false,
              includeNoSolution: false,
              includeInfiniteSolutions: false,
              allowFractions: false,
              allowNegatives: true,
              maxCoefficient: 8,
              maxConstant: 15,
              solutionMethod: 'substitution',
              complexityLevel: 'basic'
            }
          }),
          
          schemaV2.createPreset({
            id: 'elimination-practice',
            label: 'Elimination Practice',
            description: 'Focus on elimination method with strategic coefficients',
            icon: 'remove_circle',
            category: 'method',
            values: {
              problemCount: 8,
              includeSubstitution: false,
              includeElimination: true,
              includeGraphing: false,
              includeWordProblems: false,
              includeNoSolution: false,
              includeInfiniteSolutions: false,
              allowFractions: false,
              allowNegatives: true,
              maxCoefficient: 10,
              maxConstant: 20,
              solutionMethod: 'elimination',
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'mixed-methods',
            label: 'Mixed Methods',
            description: 'Practice all solution methods',
            icon: 'shuffle',
            category: 'scope',
            values: {
              problemCount: 12,
              includeSubstitution: true,
              includeElimination: true,
              includeGraphing: true,
              includeWordProblems: false,
              includeNoSolution: false,
              includeInfiniteSolutions: false,
              allowFractions: false,
              allowNegatives: true,
              maxCoefficient: 8,
              maxConstant: 15,
              solutionMethod: 'any',
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'word-problems',
            label: 'Word Problems',
            description: 'Real-world applications of systems',
            icon: 'description',
            category: 'scope',
            values: {
              problemCount: 6,
              includeSubstitution: true,
              includeElimination: true,
              includeGraphing: false,
              includeWordProblems: true,
              includeNoSolution: false,
              includeInfiniteSolutions: false,
              allowFractions: false,
              allowNegatives: false,
              maxCoefficient: 6,
              maxConstant: 12,
              solutionMethod: 'any',
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'special-cases',
            label: 'Special Cases',
            description: 'No solution and infinite solutions',
            icon: 'priority_high',
            category: 'difficulty',
            values: {
              problemCount: 6,
              includeSubstitution: false,
              includeElimination: true,
              includeGraphing: false,
              includeWordProblems: false,
              includeNoSolution: true,
              includeInfiniteSolutions: true,
              allowFractions: false,
              allowNegatives: true,
              maxCoefficient: 8,
              maxConstant: 15,
              solutionMethod: 'any',
              complexityLevel: 'advanced'
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive',
            label: 'Comprehensive Practice',
            description: 'Complete practice with all types',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 15,
              includeSubstitution: true,
              includeElimination: true,
              includeGraphing: true,
              includeWordProblems: true,
              includeNoSolution: true,
              includeInfiniteSolutions: true,
              allowFractions: true,
              allowNegatives: true,
              maxCoefficient: 10,
              maxConstant: 20,
              solutionMethod: 'any',
              complexityLevel: 'advanced'
            }
          })
        ]
      })
    })
  }

  /**
   * Generate a single problem
   * @param {Object} parameters - Generation parameters
   * @returns {Object} Problem object
   */
  generateProblem(parameters = {}) {
    const params = { ...this.defaultParameters, ...parameters }
    
    // Validate parameters using Parameter Schema V2
    const validation = this.parameterSchema.validate(params)
    if (!validation.isValid) {
      throw new Error(`Invalid parameters: ${validation.errors.join(', ')}`)
    }
    
    // Additional custom validation
    const customErrors = []
    if (!params.includeSubstitution && !params.includeElimination && !params.includeGraphing && !params.includeWordProblems) {
      customErrors.push('At least one problem type must be enabled')
    }
    if (customErrors.length > 0) {
      throw new Error(`Invalid parameters: ${customErrors.join(', ')}`)
    }
    
    // Build array of enabled problem types
    const problemTypes = []
    if (params.includeWordProblems) problemTypes.push('wordProblem')
    if (params.includeNoSolution) problemTypes.push('noSolution')
    if (params.includeInfiniteSolutions) problemTypes.push('infiniteSolutions')
    if (params.includeSubstitution) problemTypes.push('substitution')
    if (params.includeElimination) problemTypes.push('elimination')
    if (params.includeGraphing) problemTypes.push('graphing')
    
    if (problemTypes.length === 0) {
      problemTypes.push('substitution') // fallback
    }
    
    const problemType = this.getRandomElement(problemTypes)
    
    return this.generateSystemProblem(problemType, params)
  }

  /**
   * Generate a system of equations problem
   * @param {string} problemType - Type of problem
   * @param {Object} params - Generation parameters
   * @returns {Object} Problem object
   */
  generateSystemProblem(problemType, params) {
    switch (problemType) {
      case 'wordProblem':
        return this.generateWordProblem(params)
      case 'noSolution':
        return this.generateNoSolutionProblem(params)
      case 'infiniteSolutions':
        return this.generateInfiniteSolutionsProblem(params)
      case 'substitution':
        return this.generateSubstitutionProblem(params)
      case 'elimination':
        return this.generateEliminationProblem(params)
      case 'graphing':
        return this.generateGraphingProblem(params)
      default:
        return this.generateSubstitutionProblem(params)
    }
  }
  
  generateSubstitutionProblem(params) {
    // Generate a system that's easy to solve by substitution
    // Make one equation have a coefficient of 1 for easy substitution
    
    let x, y
    if (params.allowFractions) {
      x = Math.floor(Math.random() * params.maxConstant) + 1
      y = Math.floor(Math.random() * params.maxConstant) + 1
    } else {
      x = Math.floor(Math.random() * 10) + 1
      y = Math.floor(Math.random() * 10) + 1
    }
    
    if (params.allowNegatives) {
      if (Math.random() < 0.3) x = -x
      if (Math.random() < 0.3) y = -y
    }
    
    // First equation: y = mx + b or x = my + b
    const substituteForY = Math.random() < 0.5
    let eq1, eq2
    
    if (substituteForY) {
      const m = Math.floor(Math.random() * 4) + 1
      const b = Math.floor(Math.random() * 6) + 1
      eq1 = { a: 1, b: m, c: m * x + b + y }  // y + mx = c
      
      // Second equation
      const a2 = Math.floor(Math.random() * params.maxCoefficient) + 1
      const b2 = Math.floor(Math.random() * params.maxCoefficient) + 1
      eq2 = { a: a2, b: b2, c: a2 * x + b2 * y }
    } else {
      const m = Math.floor(Math.random() * 4) + 1
      const b = Math.floor(Math.random() * 6) + 1
      eq1 = { a: 1, b: m, c: x + m * y }  // x + my = c
      
      // Second equation
      const a2 = Math.floor(Math.random() * params.maxCoefficient) + 1
      const b2 = Math.floor(Math.random() * params.maxCoefficient) + 1
      eq2 = { a: a2, b: b2, c: a2 * x + b2 * y }
    }
    
    const steps = [
      `\\text{System of equations:}`,
      `\\begin{cases} ${this.formatEquation(eq1)} \\\\\\\\ ${this.formatEquation(eq2)} \\end{cases}`,
      `\\text{Solve the first equation for one variable}`,
      `\\text{Substitute into the second equation}`,
      `\\text{Solve for the remaining variable}`,
      `\\text{Back-substitute to find the other variable}`,
      `\\text{Solution: } x = ${x}, y = ${y}`
    ]
    
    return {
      question: `Solve the system of equations using substitution:\\n${this.formatEquation(eq1)}\\n${this.formatEquation(eq2)}`,
      questionLaTeX: `\\text{Solve the system of equations using substitution:} \\\\\\\\ \\begin{cases} ${this.formatEquation(eq1)} \\\\\\\\ ${this.formatEquation(eq2)} \\end{cases}`,
      answer: `x = ${x}, y = ${y}`,
      answerLaTeX: `x = ${x}, y = ${y}`,
      steps: steps,
      metadata: {
        problemType: 'substitution',
        solution: [x, y],
        equations: [eq1, eq2],
        method: 'substitution',
        difficulty: 'medium',
        estimatedTime: '4 minutes'
      }
    }
  }
  
  generateEliminationProblem(params) {
    // Generate a system designed for elimination
    let x = Math.floor(Math.random() * 8) + 1
    let y = Math.floor(Math.random() * 8) + 1
    
    if (params.allowNegatives) {
      if (Math.random() < 0.3) x = -x
      if (Math.random() < 0.3) y = -y
    }
    
    // Make coefficients that will eliminate nicely
    const a1 = Math.floor(Math.random() * 4) + 2
    const b1 = Math.floor(Math.random() * 4) + 2
    
    // Second equation coefficients - make one coefficient opposite or equal for elimination
    let a2, b2
    if (Math.random() < 0.5) {
      // Same coefficient for x, eliminate x
      a2 = Math.random() < 0.5 ? a1 : -a1
      b2 = Math.floor(Math.random() * 4) + 2
    } else {
      // Same coefficient for y, eliminate y
      a2 = Math.floor(Math.random() * 4) + 2
      b2 = Math.random() < 0.5 ? b1 : -b1
    }
    
    const eq1 = { a: a1, b: b1, c: a1 * x + b1 * y }
    const eq2 = { a: a2, b: b2, c: a2 * x + b2 * y }
    
    const steps = [
      `\\text{System of equations:}`,
      `\\begin{cases} ${this.formatEquation(eq1)} \\\\\\\\ ${this.formatEquation(eq2)} \\end{cases}`,
      `\\text{Look for coefficients to eliminate}`,
      `\\text{Add or subtract equations to eliminate one variable}`,
      `\\text{Solve for the remaining variable}`,
      `\\text{Substitute back to find the other variable}`,
      `\\text{Solution: } x = ${x}, y = ${y}`
    ]
    
    return {
      question: `Solve the system of equations using elimination:\\n${this.formatEquation(eq1)}\\n${this.formatEquation(eq2)}`,
      questionLaTeX: `\\text{Solve the system of equations using elimination:} \\\\\\\\ \\begin{cases} ${this.formatEquation(eq1)} \\\\\\\\ ${this.formatEquation(eq2)} \\end{cases}`,
      answer: `x = ${x}, y = ${y}`,
      answerLaTeX: `x = ${x}, y = ${y}`,
      steps: steps,
      metadata: {
        problemType: 'elimination',
        solution: [x, y],
        equations: [eq1, eq2],
        method: 'elimination',
        difficulty: 'medium',
        estimatedTime: '4 minutes'
      }
    }
  }
  
  generateGraphingProblem(params) {
    // Generate simple slopes and y-intercepts for easy graphing
    let x = Math.floor(Math.random() * 6) + 1
    let y = Math.floor(Math.random() * 6) + 1
    
    // Create equations in slope-intercept form: y = mx + b
    const m1 = Math.floor(Math.random() * 4) + 1
    const b1 = Math.floor(Math.random() * 6) + 1
    
    const m2 = Math.floor(Math.random() * 4) + 1
    const b2 = Math.floor(Math.random() * 6) + 1
    
    // Ensure different slopes so lines intersect
    if (m1 === m2) {
      m2 = m1 + 1
    }
    
    // Calculate intersection point
    x = (b2 - b1) / (m1 - m2)
    y = m1 * x + b1
    
    // Round to avoid complex fractions if not allowed
    if (!params.allowFractions) {
      x = Math.round(x)
      y = Math.round(y)
    }
    
    const steps = [
      `\\text{Convert to slope-intercept form: } y = mx + b`,
      `\\text{Equation 1: } y = ${m1}x + ${b1}`,
      `\\text{Equation 2: } y = ${m2}x + ${b2}`,
      `\\text{Graph both lines and find intersection}`,
      `\\text{Solution: } (${x}, ${y})`
    ]
    
    return {
      question: `Solve the system by graphing:\\ny = ${m1}x + ${b1}\\ny = ${m2}x + ${b2}`,
      questionLaTeX: `\\text{Solve the system by graphing:} \\\\\\\\ \\begin{cases} y = ${m1}x + ${b1} \\\\\\\\ y = ${m2}x + ${b2} \\end{cases}`,
      answer: `(${x}, ${y})`,
      answerLaTeX: `(${x}, ${y})`,
      steps: steps,
      metadata: {
        problemType: 'graphing',
        solution: [x, y],
        equations: [
          { slope: m1, yIntercept: b1 },
          { slope: m2, yIntercept: b2 }
        ],
        method: 'graphing',
        difficulty: 'medium',
        estimatedTime: '5 minutes'
      }
    }
  }
  
  generateWordProblem(params) {
    const scenarios = [
      {
        type: 'age',
        setup: (x, y) => ({
          question: `John is ${x} years old and Mary is ${y} years old. In 5 years, John will be twice as old as Mary is now. How old are they now?`,
          eq1: `x + 5 = 2y`,
          eq2: `\\text{Given: John is } x \\text{ and Mary is } y`
        })
      },
      {
        type: 'money',
        setup: (x, y) => ({
          question: `Sarah has ${x + y} dollars in nickels and dimes. She has ${x} nickels and ${y} dimes. The total value is $${(5 * x + 10 * y) / 100}. How many of each coin does she have?`,
          eq1: `x + y = ${x + y}`,
          eq2: `5x + 10y = ${5 * x + 10 * y}`
        })
      },
      {
        type: 'mixture',
        setup: (x, y) => ({
          question: `A store sells coffee beans. Type A costs $${x}/lb and Type B costs $${y}/lb. How many pounds of each type should be mixed to make 10 pounds of blend costing $${(x + y) / 2}/lb?`,
          eq1: `x + y = 10`,
          eq2: `${x}x + ${y}y = ${10 * (x + y) / 2}`
        })
      }
    ]
    
    let x = Math.floor(Math.random() * 8) + 2
    let y = Math.floor(Math.random() * 8) + 2
    
    const scenario = this.getRandomElement(scenarios)
    const problem = scenario.setup(x, y)
    
    const steps = [
      `\\text{Define variables: let } x \\text{ and } y \\text{ represent the unknowns}`,
      `\\text{Set up equations from the problem}`,
      `\\text{Solve the system using substitution or elimination}`,
      `\\text{Check the solution in the original problem}`,
      `\\text{Solution: } x = ${x}, y = ${y}`
    ]
    
    return {
      question: problem.question,
      questionLaTeX: `\\text{${problem.question.replace(/\$/g, '\\$').replace(/\n/g, '} \\\\\\\\ \\text{')}}`,
      answer: `x = ${x}, y = ${y}`,
      answerLaTeX: `x = ${x}, y = ${y}`,
      steps: steps,
      metadata: {
        problemType: 'wordProblem',
        scenario: scenario.type,
        solution: [x, y],
        difficulty: 'medium',
        estimatedTime: '6 minutes'
      }
    }
  }
  
  generateNoSolutionProblem(params) {
    // Create inconsistent system (parallel lines)
    const a = Math.floor(Math.random() * 4) + 2
    const b = Math.floor(Math.random() * 4) + 2
    const c1 = Math.floor(Math.random() * 10) + 5
    const c2 = c1 + Math.floor(Math.random() * 5) + 1 // Different constant
    
    const eq1 = { a: a, b: b, c: c1 }
    const eq2 = { a: a, b: b, c: c2 } // Same coefficients, different constant
    
    const steps = [
      `\\text{System of equations:}`,
      `\\begin{cases} ${this.formatEquation(eq1)} \\\\\\\\ ${this.formatEquation(eq2)} \\end{cases}`,
      `\\text{Notice the coefficients are the same but constants differ}`,
      `\\text{This represents parallel lines}`,
      `\\text{Parallel lines never intersect}`,
      `\\text{Therefore: No solution}`
    ]
    
    return {
      question: `Solve the system of equations:\\n${this.formatEquation(eq1)}\\n${this.formatEquation(eq2)}`,
      questionLaTeX: `\\text{Solve the system of equations:} \\\\\\\\ \\begin{cases} ${this.formatEquation(eq1)} \\\\\\\\ ${this.formatEquation(eq2)} \\end{cases}`,
      answer: 'No solution',
      answerLaTeX: '\\text{No solution}',
      steps: steps,
      metadata: {
        problemType: 'noSolution',
        equations: [eq1, eq2],
        solutionType: 'inconsistent',
        difficulty: 'medium',
        estimatedTime: '3 minutes'
      }
    }
  }
  
  generateInfiniteSolutionsProblem(params) {
    // Create dependent system (same line)
    const a = Math.floor(Math.random() * 4) + 2
    const b = Math.floor(Math.random() * 4) + 2
    const c = Math.floor(Math.random() * 10) + 5
    
    const multiplier = Math.floor(Math.random() * 3) + 2
    
    const eq1 = { a: a, b: b, c: c }
    const eq2 = { a: a * multiplier, b: b * multiplier, c: c * multiplier }
    
    const steps = [
      `\\text{System of equations:}`,
      `\\begin{cases} ${this.formatEquation(eq1)} \\\\\\\\ ${this.formatEquation(eq2)} \\end{cases}`,
      `\\text{Notice the second equation is a multiple of the first}`,
      `\\text{This represents the same line}`,
      `\\text{Every point on the line is a solution}`,
      `\\text{Therefore: Infinitely many solutions}`
    ]
    
    return {
      question: `Solve the system of equations:\\n${this.formatEquation(eq1)}\\n${this.formatEquation(eq2)}`,
      questionLaTeX: `\\text{Solve the system of equations:} \\\\\\\\ \\begin{cases} ${this.formatEquation(eq1)} \\\\\\\\ ${this.formatEquation(eq2)} \\end{cases}`,
      answer: 'Infinitely many solutions',
      answerLaTeX: '\\text{Infinitely many solutions}',
      steps: steps,
      metadata: {
        problemType: 'infiniteSolutions',
        equations: [eq1, eq2],
        solutionType: 'dependent',
        difficulty: 'medium',
        estimatedTime: '3 minutes'
      }
    }
  }
  
  /**
   * Format equation as LaTeX string
   * @param {Object} eq - Equation with a, b, c coefficients
   * @returns {string} LaTeX formatted equation
   */
  formatEquation(eq) {
    let result = ''
    
    // x term
    if (eq.a === 1) {
      result += 'x'
    } else if (eq.a === -1) {
      result += '-x'
    } else {
      result += `${eq.a}x`
    }
    
    // y term
    if (eq.b > 0) {
      if (eq.b === 1) {
        result += ' + y'
      } else {
        result += ` + ${eq.b}y`
      }
    } else if (eq.b < 0) {
      if (eq.b === -1) {
        result += ' - y'
      } else {
        result += ` - ${Math.abs(eq.b)}y`
      }
    }
    
    result += ` = ${eq.c}`
    
    return result
  }

  /**
   * Get random element from array
   * @param {Array} array - Array to choose from
   * @returns {*} Random element
   */
  getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)]
  }
}

export default SystemsOfEquationsGenerator