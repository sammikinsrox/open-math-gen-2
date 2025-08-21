import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Graphing Generator
 * 
 * Generates problems involving graphing linear and quadratic functions,
 * finding intercepts, slope, and analyzing function properties.
 */
export class GraphingGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Graphing',
      description: 'Graph functions, find intercepts, slope, and analyze function properties',
      category: 'algebra',
      difficulty: 'medium',
      icon: 'show_chart',
      tags: ['algebra', 'graphing', 'functions', 'slope', 'intercepts'],
      gradeLevel: '9-12',
      estimatedTime: '3-5 minutes',
      exampleProblem: {
        question: 'Find the slope and y-intercept of y = 2x + 3',
        questionLaTeX: '\\text{Find the slope and y-intercept of } y = 2x + 3',
        answer: 'Slope = 2, y-intercept = 3',
        answerLaTeX: '\\text{Slope} = 2, \\text{y-intercept} = 3'
      },
      
      defaultParameters: {
        problemCount: 10,
        includeLinearGraphing: true,
        includeQuadraticGraphing: false,
        includeIntercepts: true,
        includeSlope: true,
        includeTransformations: false,
        maxCoefficient: 8,
        maxConstant: 12,
        complexityLevel: 'basic'
      },
      
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
                description: 'How many graphing problems to generate',
                min: 1,
                max: 20,
                required: true,
                slider: true,
                presets: [6, 8, 10, 12],
                order: 1
              }),
              complexityLevel: schemaV2.createParameter({
                type: 'select',
                label: 'Complexity Level',
                description: 'Determines the difficulty of graphing problems',
                variant: 'cards',
                options: [
                  { value: 'basic', label: 'Basic', description: 'Linear functions and simple properties' },
                  { value: 'intermediate', label: 'Intermediate', description: 'Quadratic functions and transformations' },
                  { value: 'advanced', label: 'Advanced', description: 'Complex functions and analysis' }
                ],
                order: 2
              })
            }
          }),
          
          graphingConcepts: schemaV2.createCategory({
            id: 'graphingConcepts',
            label: 'Graphing Concepts',
            description: 'Choose which graphing concepts to practice',
            icon: 'show_chart',
            color: 'green',
            order: 2,
            parameters: {
              includeLinearGraphing: schemaV2.createParameter({
                type: 'boolean',
                label: 'Linear Functions',
                description: 'Graph linear functions and find properties',
                helpText: 'y = mx + b form and slope-intercept',
                order: 1
              }),
              includeQuadraticGraphing: schemaV2.createParameter({
                type: 'boolean',
                label: 'Quadratic Functions',
                description: 'Graph parabolas and find vertex',
                helpText: 'y = ax² + bx + c form',
                order: 2
              }),
              includeIntercepts: schemaV2.createParameter({
                type: 'boolean',
                label: 'Finding Intercepts',
                description: 'Find x and y intercepts',
                helpText: 'Where graph crosses axes',
                order: 3
              }),
              includeSlope: schemaV2.createParameter({
                type: 'boolean',
                label: 'Slope Calculations',
                description: 'Calculate slope from two points or equations',
                helpText: 'm = (y₂ - y₁)/(x₂ - x₁)',
                order: 4
              }),
              includeTransformations: schemaV2.createParameter({
                type: 'boolean',
                label: 'Function Transformations',
                description: 'Identify shifts, stretches, and reflections',
                helpText: 'f(x) → f(x-h) + k',
                order: 5
              })
            }
          })
        },
        
        presets: [
          schemaV2.createPreset({
            id: 'linear-basics',
            label: 'Linear Basics',
            description: 'Focus on linear function properties',
            icon: 'trending_up',
            category: 'concept',
            values: {
              problemCount: 10,
              includeLinearGraphing: true,
              includeQuadraticGraphing: false,
              includeIntercepts: true,
              includeSlope: true,
              includeTransformations: false,
              maxCoefficient: 6,
              maxConstant: 8,
              complexityLevel: 'basic'
            }
          }),
          
          schemaV2.createPreset({
            id: 'quadratic-graphing',
            label: 'Quadratic Graphing',
            description: 'Focus on parabolas and quadratic properties',
            icon: 'show_chart',
            category: 'concept',
            values: {
              problemCount: 8,
              includeLinearGraphing: false,
              includeQuadraticGraphing: true,
              includeIntercepts: true,
              includeSlope: false,
              includeTransformations: true,
              maxCoefficient: 5,
              maxConstant: 10,
              complexityLevel: 'intermediate'
            }
          })
        ]
      })
    })
  }

  generateProblem(parameters = {}) {
    const params = { ...this.defaultParameters, ...parameters }
    
    const validation = this.parameterSchema.validate(params)
    if (!validation.isValid) {
      throw new Error(`Invalid parameters: ${validation.errors.join(', ')}`)
    }
    
    const problemTypes = []
    if (params.includeLinearGraphing) problemTypes.push('linearGraphing')
    if (params.includeQuadraticGraphing) problemTypes.push('quadraticGraphing')
    if (params.includeIntercepts) problemTypes.push('intercepts')
    if (params.includeSlope) problemTypes.push('slope')
    if (params.includeTransformations) problemTypes.push('transformations')
    
    if (problemTypes.length === 0) problemTypes.push('linearGraphing')
    
    const problemType = this.getRandomElement(problemTypes)
    return this.generateGraphingProblem(problemType, params)
  }

  generateGraphingProblem(problemType, params) {
    switch (problemType) {
      case 'linearGraphing':
        return this.generateLinearGraphingProblem(params)
      case 'quadraticGraphing':
        return this.generateQuadraticGraphingProblem(params)
      case 'intercepts':
        return this.generateInterceptsProblem(params)
      case 'slope':
        return this.generateSlopeProblem(params)
      case 'transformations':
        return this.generateTransformationsProblem(params)
      default:
        return this.generateLinearGraphingProblem(params)
    }
  }
  
  generateLinearGraphingProblem(params) {
    let m = Math.floor(Math.random() * params.maxCoefficient) + 1
    let b = Math.floor(Math.random() * params.maxConstant) + 1
    
    if (Math.random() < 0.3) {
      m = -m
    }
    if (Math.random() < 0.3) {
      b = -b
    }
    
    const equation = `y = ${m}x ${b >= 0 ? '+' : ''} ${b}`
    
    const steps = [
      `\\text{Given: } ${equation}`,
      `\\text{This is in slope-intercept form: } y = mx + b`,
      `\\text{Slope } m = ${m}`,
      `\\text{Y-intercept } b = ${b}`,
      `\\text{Plot y-intercept at } (0, ${b})`,
      `\\text{Use slope to find another point}`,
      `\\text{Draw line through the points}`
    ]
    
    return {
      question: `Graph the linear function: ${equation}`,
      questionLaTeX: `\\text{Graph the linear function: } ${equation}`,
      answer: `Slope = ${m}, y-intercept = ${b}`,
      answerLaTeX: `\\text{Slope} = ${m}, \\text{y-intercept} = ${b}`,
      steps: steps,
      metadata: {
        problemType: 'linearGraphing',
        slope: m,
        yIntercept: b,
        equation: equation,
        difficulty: 'easy',
        estimatedTime: '3 minutes'
      }
    }
  }
  
  generateQuadraticGraphingProblem(params) {
    let a = Math.floor(Math.random() * Math.min(params.maxCoefficient, 5)) + 1
    let b = Math.floor(Math.random() * params.maxCoefficient) + 1
    let c = Math.floor(Math.random() * params.maxConstant) + 1
    
    if (Math.random() < 0.3) {
      a = -a
    }
    if (Math.random() < 0.3) {
      b = -b
    }
    if (Math.random() < 0.3) {
      c = -c
    }
    
    // Calculate vertex
    const h = -b / (2 * a)
    const k = a * h * h + b * h + c
    
    const equationDisplay = `y = ${a === 1 ? '' : a === -1 ? '-' : a}x^2 ${b >= 0 ? '+' : ''} ${b === 1 ? '' : b === -1 ? '-' : b}x ${c >= 0 ? '+' : ''} ${c}`
    const equationLaTeX = `y = ${a === 1 ? '' : a === -1 ? '-' : a}x^2 ${b >= 0 ? '+' : ''} ${b === 1 ? '' : b === -1 ? '-' : b}x ${c >= 0 ? '+' : ''} ${c}`
    
    const steps = [
      `\\text{Given: } ${equationLaTeX}`,
      `\\text{This is in standard form: } y = ax^2 + bx + c`,
      `\\text{where } a = ${a}, b = ${b}, c = ${c}`,
      `\\text{Vertex x-coordinate: } h = -\\frac{b}{2a} = -\\frac{${b}}{2(${a})} = ${h.toFixed(2)}`,
      `\\text{Vertex y-coordinate: } k = a(${h.toFixed(2)})^2 + b(${h.toFixed(2)}) + c = ${k.toFixed(2)}`,
      `\\text{Vertex: } (${h.toFixed(2)}, ${k.toFixed(2)})`,
      `\\text{Y-intercept: } (0, ${c})`,
      `\\text{Parabola opens } ${a > 0 ? '\\text{upward}' : '\\text{downward}'}`
    ]
    
    return {
      question: `Graph the quadratic function: ${equationDisplay}`,
      questionLaTeX: `\\text{Graph the quadratic function: } ${equationLaTeX}`,
      answer: `Vertex: (${h.toFixed(2)}, ${k.toFixed(2)}), y-intercept: ${c}, opens ${a > 0 ? 'upward' : 'downward'}`,
      answerLaTeX: `\\text{Vertex: } (${h.toFixed(2)}, ${k.toFixed(2)})\\text{, y-intercept: } ${c}\\text{, opens } ${a > 0 ? '\\text{upward}' : '\\text{downward}'}`,
      steps: steps,
      metadata: {
        problemType: 'quadraticGraphing',
        coefficients: { a, b, c },
        vertex: { h, k },
        yIntercept: c,
        equation: equationDisplay,
        difficulty: 'medium',
        estimatedTime: '4 minutes'
      }
    }
  }
  
  generateInterceptsProblem(params) {
    const a = Math.floor(Math.random() * Math.min(params.maxCoefficient, 6)) + 1
    const b = Math.floor(Math.random() * Math.min(params.maxCoefficient, 6)) + 2
    
    // Create equation ax + by = c where intercepts will be nice
    const c = a * b // This ensures x-intercept = b and y-intercept = c/b
    
    const equation = `${a}x + ${b}y = ${c}`
    const xIntercept = c / a
    const yIntercept = c / b
    
    const steps = [
      `\\text{Given: } ${equation}`,
      `\\text{Find x-intercept: set } y = 0`,
      `${a}x + ${b}(0) = ${c}`,
      `${a}x = ${c}`,
      `x = ${xIntercept}`,
      `\\text{Find y-intercept: set } x = 0`,
      `${a}(0) + ${b}y = ${c}`,
      `${b}y = ${c}`,
      `y = ${yIntercept}`
    ]
    
    return {
      question: `Find the x and y intercepts of: ${equation}`,
      questionLaTeX: `\\text{Find the x and y intercepts of: } ${equation}`,
      answer: `x-intercept: ${xIntercept}, y-intercept: ${yIntercept}`,
      answerLaTeX: `\\text{x-intercept: } ${xIntercept}, \\text{y-intercept: } ${yIntercept}`,
      steps: steps,
      metadata: {
        problemType: 'intercepts',
        equation: equation,
        xIntercept: xIntercept,
        yIntercept: yIntercept,
        difficulty: 'medium',
        estimatedTime: '3 minutes'
      }
    }
  }
  
  generateSlopeProblem(params) {
    const maxCoord = Math.min(params.maxConstant, 10)
    const x1 = Math.floor(Math.random() * maxCoord) + 1
    const y1 = Math.floor(Math.random() * maxCoord) + 1
    const x2 = x1 + Math.floor(Math.random() * Math.min(params.maxCoefficient, 6)) + 1
    const y2 = y1 + Math.floor(Math.random() * Math.min(params.maxCoefficient, 6)) + 1
    
    const slope = (y2 - y1) / (x2 - x1)
    
    const steps = [
      `\\text{Given points: } (${x1}, ${y1}) \\text{ and } (${x2}, ${y2})`,
      `\\text{Use slope formula: } m = \\frac{y_2 - y_1}{x_2 - x_1}`,
      `m = \\frac{${y2} - ${y1}}{${x2} - ${x1}}`,
      `m = \\frac{${y2 - y1}}{${x2 - x1}}`,
      `m = ${slope}`
    ]
    
    return {
      question: `Find the slope of the line through points (${x1}, ${y1}) and (${x2}, ${y2})`,
      questionLaTeX: `\\text{Find the slope of the line through points } (${x1}, ${y1}) \\text{ and } (${x2}, ${y2})`,
      answer: slope.toString(),
      answerLaTeX: slope.toString(),
      steps: steps,
      metadata: {
        problemType: 'slope',
        points: [[x1, y1], [x2, y2]],
        slope: slope,
        difficulty: 'easy',
        estimatedTime: '2 minutes'
      }
    }
  }
  
  generateTransformationsProblem(params) {
    const baseFunction = Math.random() < 0.5 ? 'linear' : 'quadratic'
    
    if (baseFunction === 'linear') {
      const m = Math.floor(Math.random() * 3) + 1
      const h = Math.floor(Math.random() * 6) - 3 // -3 to 2
      const k = Math.floor(Math.random() * 6) - 3 // -3 to 2
      
      const originalLaTeX = `y = ${m}x`
      const transformedLaTeX = `y = ${m}(x ${h >= 0 ? '-' : '+'} ${Math.abs(h)}) ${k >= 0 ? '+' : ''} ${k}`
      
      const steps = [
        `\\text{Original function: } ${originalLaTeX}`,
        `\\text{Transformed function: } ${transformedLaTeX}`,
        `\\text{This is in the form: } y = m(x - h) + k`,
        `\\text{where } h = ${h}, k = ${k}`,
        `\\text{Horizontal shift: } ${h === 0 ? '\\text{none}' : h > 0 ? `${h} \\text{ units right}` : `${Math.abs(h)} \\text{ units left}`}`,
        `\\text{Vertical shift: } ${k === 0 ? '\\text{none}' : k > 0 ? `${k} \\text{ units up}` : `${Math.abs(k)} \\text{ units down}`}`
      ]
      
      return {
        question: `Describe the transformation from ${originalLaTeX} to ${transformedLaTeX}`,
        questionLaTeX: `\\text{Describe the transformation from } ${originalLaTeX} \\text{ to } ${transformedLaTeX}`,
        answer: `Shift ${h > 0 ? `${h} right` : h < 0 ? `${Math.abs(h)} left` : 'no horizontal shift'}, ${k > 0 ? `${k} up` : k < 0 ? `${Math.abs(k)} down` : 'no vertical shift'}`,
        answerLaTeX: `\\text{Shift } ${h > 0 ? `${h} \\text{ right}` : h < 0 ? `${Math.abs(h)} \\text{ left}` : '\\text{no horizontal shift}'}\\text{, } ${k > 0 ? `${k} \\text{ up}` : k < 0 ? `${Math.abs(k)} \\text{ down}` : '\\text{no vertical shift}'}`,
        steps: steps,
        metadata: {
          problemType: 'transformations',
          baseFunction: 'linear',
          transformations: { h, k },
          original: originalLaTeX,
          transformed: transformedLaTeX,
          difficulty: 'medium',
          estimatedTime: '3 minutes'
        }
      }
    } else {
      const a = Math.random() < 0.5 ? 1 : -1
      const h = Math.floor(Math.random() * 6) - 3 // -3 to 2
      const k = Math.floor(Math.random() * 6) - 3 // -3 to 2
      
      const originalLaTeX = `y = x^2`
      const transformedLaTeX = `y = ${a === 1 ? '' : '-'}(x ${h >= 0 ? '-' : '+'} ${Math.abs(h)})^2 ${k >= 0 ? '+' : ''} ${k}`
      
      const steps = [
        `\\text{Original function: } ${originalLaTeX}`,
        `\\text{Transformed function: } ${transformedLaTeX}`,
        `\\text{This is in vertex form: } y = a(x - h)^2 + k`,
        `\\text{where } a = ${a}, h = ${h}, k = ${k}`,
        `\\text{Vertex: } (${h}, ${k})`,
        `\\text{Reflection: } ${a === 1 ? '\\text{none}' : '\\text{over x-axis}'}`,
        `\\text{Horizontal shift: } ${h === 0 ? '\\text{none}' : h > 0 ? `${h} \\text{ units right}` : `${Math.abs(h)} \\text{ units left}`}`,
        `\\text{Vertical shift: } ${k === 0 ? '\\text{none}' : k > 0 ? `${k} \\text{ units up}` : `${Math.abs(k)} \\text{ units down}`}`
      ]
      
      return {
        question: `Describe the transformation from ${originalLaTeX} to ${transformedLaTeX}`,
        questionLaTeX: `\\text{Describe the transformation from } ${originalLaTeX} \\text{ to } ${transformedLaTeX}`,
        answer: `Vertex at (${h}, ${k}), ${a === -1 ? 'reflected over x-axis, ' : ''}shift ${h > 0 ? `${h} right` : h < 0 ? `${Math.abs(h)} left` : 'no horizontal'}, ${k > 0 ? `${k} up` : k < 0 ? `${Math.abs(k)} down` : 'no vertical'}`,
        answerLaTeX: `\\text{Vertex at } (${h}, ${k})\\text{, } ${a === -1 ? '\\text{reflected over x-axis, }' : ''}\\text{shift } ${h > 0 ? `${h} \\text{ right}` : h < 0 ? `${Math.abs(h)} \\text{ left}` : '\\text{no horizontal}'}\\text{, } ${k > 0 ? `${k} \\text{ up}` : k < 0 ? `${Math.abs(k)} \\text{ down}` : '\\text{no vertical}'}`,
        steps: steps,
        metadata: {
          problemType: 'transformations',
          baseFunction: 'quadratic',
          transformations: { a, h, k },
          original: originalLaTeX,
          transformed: transformedLaTeX,
          difficulty: 'medium',
          estimatedTime: '4 minutes'
        }
      }
    }
  }

  getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)]
  }
}

export default GraphingGenerator