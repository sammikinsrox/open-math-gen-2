import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Functions Generator
 * 
 * Generates problems involving function notation, evaluation,
 * domain/range, composition, and transformations.
 */
export class FunctionsGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Functions',
      description: 'Function notation, evaluation, domain/range, composition, and transformations',
      category: 'algebra',
      difficulty: 'medium',
      icon: 'functions',
      tags: ['algebra', 'functions', 'domain', 'range', 'composition'],
      gradeLevel: '9-12',
      estimatedTime: '2-4 minutes',
      exampleProblem: {
        question: 'If f(x) = 2x + 3, find f(4)',
        questionLaTeX: '\\text{If } f(x) = 2x + 3, \\text{ find } f(4)',
        answer: '11',
        answerLaTeX: '11'
      },
      
      defaultParameters: {
        problemCount: 10,
        includeEvaluation: true,
        includeDomainRange: true,
        includeComposition: false,
        includeTransformations: false,
        includeInverse: false,
        maxCoefficient: 8,
        maxConstant: 15,
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
                description: 'How many function problems to generate',
                min: 1,
                max: 25,
                required: true,
                slider: true,
                presets: [8, 10, 12, 15],
                order: 1
              }),
              complexityLevel: schemaV2.createParameter({
                type: 'select',
                label: 'Complexity Level',
                description: 'Determines the difficulty of function problems',
                variant: 'cards',
                options: [
                  { value: 'basic', label: 'Basic', description: 'Function evaluation and simple notation' },
                  { value: 'intermediate', label: 'Intermediate', description: 'Domain/range and composition' },
                  { value: 'advanced', label: 'Advanced', description: 'Transformations and inverse functions' }
                ],
                order: 2
              })
            }
          }),
          
          functionConcepts: schemaV2.createCategory({
            id: 'functionConcepts',
            label: 'Function Concepts',
            description: 'Choose which function concepts to practice',
            icon: 'functions',
            color: 'green',
            order: 2,
            parameters: {
              includeEvaluation: schemaV2.createParameter({
                type: 'boolean',
                label: 'Function Evaluation',
                description: 'Evaluate functions at given values',
                helpText: 'f(3) when f(x) = 2x + 1',
                order: 1
              }),
              includeDomainRange: schemaV2.createParameter({
                type: 'boolean',
                label: 'Domain & Range',
                description: 'Find domain and range of functions',
                helpText: 'Identify input and output restrictions',
                order: 2
              }),
              includeComposition: schemaV2.createParameter({
                type: 'boolean',
                label: 'Function Composition',
                description: 'Compose two functions',
                helpText: '(f ∘ g)(x) = f(g(x))',
                order: 3
              }),
              includeTransformations: schemaV2.createParameter({
                type: 'boolean',
                label: 'Transformations',
                description: 'Identify function transformations',
                helpText: 'f(x) → f(x-2) + 3',
                order: 4
              }),
              includeInverse: schemaV2.createParameter({
                type: 'boolean',
                label: 'Inverse Functions',
                description: 'Find inverse functions',
                helpText: 'Find f⁻¹(x) given f(x)',
                order: 5
              })
            }
          })
        },
        
        presets: [
          schemaV2.createPreset({
            id: 'evaluation-practice',
            label: 'Evaluation Practice',
            description: 'Focus on evaluating functions',
            icon: 'calculate',
            category: 'concept',
            values: {
              problemCount: 12,
              includeEvaluation: true,
              includeDomainRange: false,
              includeComposition: false,
              includeTransformations: false,
              includeInverse: false,
              maxCoefficient: 6,
              maxConstant: 10,
              complexityLevel: 'basic'
            }
          }),
          
          schemaV2.createPreset({
            id: 'composition-focus',
            label: 'Function Composition',
            description: 'Practice composing functions',
            icon: 'layers',
            category: 'concept',
            values: {
              problemCount: 8,
              includeEvaluation: false,
              includeDomainRange: false,
              includeComposition: true,
              includeTransformations: false,
              includeInverse: false,
              maxCoefficient: 5,
              maxConstant: 8,
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
    if (params.includeEvaluation) problemTypes.push('evaluation')
    if (params.includeDomainRange) problemTypes.push('domainRange')
    if (params.includeComposition) problemTypes.push('composition')
    if (params.includeTransformations) problemTypes.push('transformations')
    if (params.includeInverse) problemTypes.push('inverse')
    
    if (problemTypes.length === 0) problemTypes.push('evaluation')
    
    const problemType = this.getRandomElement(problemTypes)
    return this.generateFunctionProblem(problemType, params)
  }

  generateFunctionProblem(problemType, params) {
    switch (problemType) {
      case 'evaluation':
        return this.generateEvaluationProblem(params)
      case 'domainRange':
        return this.generateDomainRangeProblem(params)
      case 'composition':
        return this.generateCompositionProblem(params)
      default:
        return this.generateEvaluationProblem(params)
    }
  }
  
  generateEvaluationProblem(params) {
    const a = Math.floor(Math.random() * params.maxCoefficient) + 1
    const b = Math.floor(Math.random() * params.maxConstant) + 1
    const value = Math.floor(Math.random() * 6) + 1
    
    const functionDef = `f(x) = ${a}x + ${b}`
    const result = a * value + b
    
    const steps = [
      `\\text{Given: } f(x) = ${a}x + ${b}`,
      `\\text{Find: } f(${value})`,
      `\\text{Substitute } x = ${value}`,
      `f(${value}) = ${a}(${value}) + ${b}`,
      `f(${value}) = ${a * value} + ${b} = ${result}`
    ]
    
    return {
      question: `If ${functionDef}, find f(${value})`,
      questionLaTeX: `\\text{If } ${functionDef}, \\text{ find } f(${value})`,
      answer: result.toString(),
      answerLaTeX: result.toString(),
      steps: steps,
      metadata: {
        problemType: 'evaluation',
        function: { a, b },
        input: value,
        output: result,
        difficulty: 'easy',
        estimatedTime: '1 minute'
      }
    }
  }
  
  generateDomainRangeProblem(params) {
    const functionTypes = [
      { type: 'linear', func: 'f(x) = 2x + 3', domain: 'All real numbers', range: 'All real numbers' },
      { type: 'quadratic', func: 'f(x) = x²', domain: 'All real numbers', range: 'y ≥ 0' },
      { type: 'reciprocal', func: 'f(x) = 1/x', domain: 'x ≠ 0', range: 'y ≠ 0' }
    ]
    
    const selected = this.getRandomElement(functionTypes)
    
    const steps = [
      `\\text{Given: } ${selected.func}`,
      `\\text{Analyze the function type}`,
      `\\text{Identify any restrictions on x (domain)}`,
      `\\text{Identify possible y-values (range)}`
    ]
    
    return {
      question: `Find the domain and range of ${selected.func}`,
      questionLaTeX: `\\text{Find the domain and range of } ${selected.func}`,
      answer: `Domain: ${selected.domain}, Range: ${selected.range}`,
      answerLaTeX: `\\text{Domain: } ${selected.domain.replace(/≠/g, '\\neq ')}, \\text{ Range: } ${selected.range.replace(/≠/g, '\\neq ').replace(/≥/g, '\\geq ')}`,
      steps: steps,
      metadata: {
        problemType: 'domainRange',
        functionType: selected.type,
        difficulty: 'medium',
        estimatedTime: '3 minutes'
      }
    }
  }
  
  generateCompositionProblem(params) {
    // Create two simple functions for composition
    const a1 = Math.floor(Math.random() * 4) + 1
    const b1 = Math.floor(Math.random() * 6) + 1
    const a2 = Math.floor(Math.random() * 3) + 1
    const b2 = Math.floor(Math.random() * 5) + 1
    
    const f = `f(x) = ${a1}x + ${b1}`
    const g = `g(x) = ${a2}x + ${b2}`
    
    // Calculate (f ∘ g)(x) = f(g(x))
    // f(g(x)) = f(a2*x + b2) = a1*(a2*x + b2) + b1 = a1*a2*x + a1*b2 + b1
    const compositeCoeff = a1 * a2
    const compositeConstant = a1 * b2 + b1
    const composite = `${compositeCoeff}x + ${compositeConstant}`
    
    const steps = [
      `\\text{Given: } ${f} \\text{ and } ${g}`,
      `\\text{Find: } (f \\circ g)(x) = f(g(x))`,
      `\\text{Substitute } g(x) \\text{ into } f(x)`,
      `f(g(x)) = f(${a2}x + ${b2})`,
      `f(${a2}x + ${b2}) = ${a1}(${a2}x + ${b2}) + ${b1}`,
      `= ${a1 * a2}x + ${a1 * b2} + ${b1}`,
      `= ${composite}`
    ]
    
    return {
      question: `If ${f} and ${g}, find (f ∘ g)(x)`,
      questionLaTeX: `\\text{If } ${f} \\text{ and } ${g}, \\text{ find } (f \\circ g)(x)`,
      answer: composite,
      answerLaTeX: composite,
      steps: steps,
      metadata: {
        problemType: 'composition',
        functions: { f: { a: a1, b: b1 }, g: { a: a2, b: b2 } },
        composite: { a: compositeCoeff, b: compositeConstant },
        difficulty: 'hard',
        estimatedTime: '4 minutes'
      }
    }
  }

  getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)]
  }
}

export default FunctionsGenerator