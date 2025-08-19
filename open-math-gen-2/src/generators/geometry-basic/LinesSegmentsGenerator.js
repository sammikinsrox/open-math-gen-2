import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Lines and Segments Generator
 * 
 * Generates problems about lines, line segments, rays, and their properties
 * Integrates with GeometryRenderer for visual diagrams
 */
export class LinesSegmentsGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Lines & Segments',
      description: 'Lines, line segments, rays, parallel and perpendicular lines with visual diagrams',
      category: 'geometry-basic',
      difficulty: 'medium',
      icon: 'timeline',
      tags: ['lines', 'segments', 'rays', 'parallel', 'perpendicular', 'visual'],
      gradeLevel: '2-7',
      estimatedTime: '45 seconds',
      exampleProblem: {
        question: 'How many line segments are shown in this figure?',
        questionLaTeX: '\\text{How many line segments are shown in this figure?}',
        answer: '3',
        answerLaTeX: '3'
      },
      
      // Default parameter values
      defaultParameters: {
        problemCount: 10,
        includeIdentification: true,
        includeCounting: true,
        includeParallelLines: true,
        includePerpendicularLines: true,
        includeIntersectingLines: true,
        includeRays: false,
        includeMeasurement: false,
        includeLineRelationships: true,
        // includeWordProblems: false,
        showVisualDiagrams: true,
        diagramSize: 'medium',
        diagramTheme: 'educational',
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
                description: 'How many line and segment problems to generate',
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
            description: 'Choose types of line and segment problems',
            icon: 'timeline',
            color: 'green',
            order: 2,
            parameters: {
              includeIdentification: schemaV2.createParameter({
                type: 'boolean',
                label: 'Line Identification',
                description: 'Identify lines, segments, and rays',
                helpText: 'Is this a line, segment, or ray?',
                order: 1
              }),
              includeCounting: schemaV2.createParameter({
                type: 'boolean',
                label: 'Counting Problems',
                description: 'Count lines and segments in figures',
                helpText: 'How many line segments are shown?',
                order: 2
              }),
              includeRays: schemaV2.createParameter({
                type: 'boolean',
                label: 'Include Rays',
                description: 'Include ray identification problems',
                helpText: 'Lines that extend infinitely in one direction',
                order: 3
              }),
              includeMeasurement: schemaV2.createParameter({
                type: 'boolean',
                label: 'Line Measurement',
                description: 'Measure line segments',
                helpText: 'Find the length of line segments',
                order: 4
              })
            }
          }),
          
          lineRelationships: schemaV2.createCategory({
            id: 'lineRelationships',
            label: 'Line Relationships',
            description: 'Different ways lines can relate to each other',
            icon: 'compare_arrows',
            color: 'purple',
            order: 3,
            parameters: {
              includeParallelLines: schemaV2.createParameter({
                type: 'boolean',
                label: 'Parallel Lines',
                description: 'Lines that never intersect',
                helpText: 'Lines that run in the same direction',
                order: 1
              }),
              includePerpendicularLines: schemaV2.createParameter({
                type: 'boolean',
                label: 'Perpendicular Lines',
                description: 'Lines that meet at right angles',
                helpText: 'Lines that form 90° angles',
                order: 2
              }),
              includeIntersectingLines: schemaV2.createParameter({
                type: 'boolean',
                label: 'Intersecting Lines',
                description: 'Lines that cross each other',
                helpText: 'Lines that meet at a point',
                order: 3
              }),
              includeLineRelationships: schemaV2.createParameter({
                type: 'boolean',
                label: 'Line Relationships',
                description: 'Identify relationships between lines',
                helpText: 'Analyze how lines relate to each other',
                order: 4
              })
            }
          }),
          
          complexity: schemaV2.createCategory({
            id: 'complexity',
            label: 'Complexity',
            description: 'Control the complexity of geometric figures',
            icon: 'tune',
            color: 'orange',
            order: 4,
            parameters: {
              complexityLevel: schemaV2.createParameter({
                type: 'select',
                label: 'Complexity Level',
                description: 'Complexity of the geometric figures',
                options: [
                  { value: 'basic', label: 'Basic (2-3 lines)' },
                  { value: 'medium', label: 'Medium (4-6 lines)' },
                  { value: 'complex', label: 'Complex (7+ lines)' }
                ],
                helpText: 'Number of lines in diagrams',
                order: 1
              })
            }
          }),
          
          visualization: schemaV2.createCategory({
            id: 'visualization',
            label: 'Visualization',
            description: 'Control diagram appearance and features',
            icon: 'visibility',
            color: 'teal',
            order: 5,
            parameters: {
              showVisualDiagrams: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Visual Diagrams',
                description: 'Include geometric diagrams',
                helpText: 'Display visual line diagrams with problems',
                order: 1
              }),
              diagramSize: schemaV2.createParameter({
                type: 'select',
                label: 'Diagram Size',
                description: 'Size of the geometric diagrams',
                options: [
                  { value: 'small', label: 'Small' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'large', label: 'Large' }
                ],
                helpText: 'Controls the size of line diagrams',
                order: 2
              }),
              diagramTheme: schemaV2.createParameter({
                type: 'select',
                label: 'Diagram Theme',
                description: 'Visual style for diagrams',
                options: [
                  { value: 'educational', label: 'Educational' },
                  { value: 'blueprint', label: 'Blueprint' },
                  { value: 'minimal', label: 'Minimal' },
                  { value: 'colorful', label: 'Colorful' }
                ],
                helpText: 'Appearance style for geometric diagrams',
                order: 3
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'basic-lines',
            label: 'Basic Lines',
            description: 'Simple line and segment identification',
            icon: 'looks_one',
            category: 'difficulty',
            values: {
              problemCount: 10,
              includeIdentification: true,
              includeCounting: true,
              includeParallelLines: false,
              includePerpendicularLines: false,
              includeIntersectingLines: false,
              includeRays: false,
              includeMeasurement: false,
              includeLineRelationships: false,
              showVisualDiagrams: true,
              diagramSize: 'medium',
              diagramTheme: 'educational',
              complexityLevel: 'basic'
            }
          }),
          
          schemaV2.createPreset({
            id: 'line-relationships',
            label: 'Line Relationships',
            description: 'Parallel, perpendicular, and intersecting lines',
            icon: 'compare_arrows',
            category: 'scope',
            values: {
              problemCount: 12,
              includeIdentification: false,
              includeCounting: false,
              includeParallelLines: true,
              includePerpendicularLines: true,
              includeIntersectingLines: true,
              includeRays: false,
              includeMeasurement: false,
              includeLineRelationships: true,
              showVisualDiagrams: true,
              diagramSize: 'medium',
              diagramTheme: 'educational',
              complexityLevel: 'medium'
            }
          }),
          
          schemaV2.createPreset({
            id: 'rays-and-lines',
            label: 'Rays & Lines',
            description: 'Practice with lines, segments, and rays',
            icon: 'trending_up',
            category: 'scope',
            values: {
              problemCount: 10,
              includeIdentification: true,
              includeCounting: true,
              includeParallelLines: false,
              includePerpendicularLines: false,
              includeIntersectingLines: true,
              includeRays: true,
              includeMeasurement: false,
              includeLineRelationships: false,
              showVisualDiagrams: true,
              diagramSize: 'medium',
              diagramTheme: 'educational',
              complexityLevel: 'medium'
            }
          }),
          
          schemaV2.createPreset({
            id: 'measurement-practice',
            label: 'Measurement Practice',
            description: 'Measuring line segments and distances',
            icon: 'straighten',
            category: 'scope',
            values: {
              problemCount: 8,
              includeIdentification: false,
              includeCounting: false,
              includeParallelLines: false,
              includePerpendicularLines: false,
              includeIntersectingLines: false,
              includeRays: false,
              includeMeasurement: true,
              includeLineRelationships: false,
              showVisualDiagrams: true,
              diagramSize: 'medium',
              diagramTheme: 'educational',
              complexityLevel: 'basic'
            }
          }),
          
          schemaV2.createPreset({
            id: 'complex-figures',
            label: 'Complex Figures',
            description: 'Advanced problems with multiple lines',
            icon: 'account_tree',
            category: 'difficulty',
            values: {
              problemCount: 8,
              includeIdentification: true,
              includeCounting: true,
              includeParallelLines: true,
              includePerpendicularLines: true,
              includeIntersectingLines: true,
              includeRays: false,
              includeMeasurement: false,
              includeLineRelationships: true,
              showVisualDiagrams: true,
              diagramSize: 'medium',
              diagramTheme: 'educational',
              complexityLevel: 'complex'
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive-lines',
            label: 'Comprehensive Lines',
            description: 'Complete practice with all line concepts',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 15,
              includeIdentification: true,
              includeCounting: true,
              includeParallelLines: true,
              includePerpendicularLines: true,
              includeIntersectingLines: true,
              includeRays: true,
              includeMeasurement: true,
              includeLineRelationships: true,
              showVisualDiagrams: true,
              diagramSize: 'medium',
              diagramTheme: 'educational',
              complexityLevel: 'medium'
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
    if (!params.includeIdentification && !params.includeCounting && !params.includeParallelLines &&
        !params.includePerpendicularLines && !params.includeIntersectingLines && !params.includeRays &&
        !params.includeMeasurement && !params.includeLineRelationships) {
      customErrors.push('At least one problem type must be enabled')
    }
    if (customErrors.length > 0) {
      throw new Error(`Invalid parameters: ${customErrors.join(', ')}`)
    }
    
    // Build array of enabled problem types
    const problemTypes = []
    if (params.includeIdentification) problemTypes.push('identification')
    if (params.includeCounting) problemTypes.push('counting')
    if (params.includeParallelLines) problemTypes.push('parallel')
    if (params.includePerpendicularLines) problemTypes.push('perpendicular')
    if (params.includeIntersectingLines) problemTypes.push('intersecting')
    if (params.includeRays) problemTypes.push('rays')
    if (params.includeMeasurement) problemTypes.push('measurement')
    if (params.includeLineRelationships) problemTypes.push('relationships')
    
    if (problemTypes.length === 0) {
      throw new Error('At least one problem type must be enabled')
    }
    
    const problemType = this.getRandomElement(problemTypes)
    
    return this.generateLineProblem(problemType, params)
  }

  /**
   * Generate a line problem
   * @param {string} problemType - Type of problem
   * @param {Object} params - Generation parameters
   * @returns {Object} Problem object
   */
  generateLineProblem(problemType, params) {
    switch (problemType) {
      case 'identification':
        return this.generateIdentificationProblem(params)
      case 'counting':
        return this.generateCountingProblem(params)
      case 'parallel':
        return this.generateParallelProblem(params)
      case 'perpendicular':
        return this.generatePerpendicularProblem(params)
      case 'intersecting':
        return this.generateIntersectingProblem(params)
      case 'rays':
        return this.generateRaysProblem(params)
      case 'measurement':
        return this.generateMeasurementProblem(params)
      case 'relationships':
        return this.generateRelationshipsProblem(params)
      default:
        return this.generateIdentificationProblem(params)
    }
  }
  
  generateIdentificationProblem(params) {
    const elements = ['line', 'line segment', 'ray']
    const element = this.getRandomElement(elements)
    
    const definitions = {
      'line': 'extends infinitely in both directions',
      'line segment': 'has two endpoints',
      'ray': 'has one endpoint and extends infinitely in one direction'
    }
    
    const symbols = {
      'line': '↔',
      'line segment': '—',
      'ray': '→'
    }
    
    const problem = {
      question: `What type of geometric figure ${definitions[element]}?`,
      questionLaTeX: `\\text{What type of geometric figure ${definitions[element]}?}`,
      answer: element,
      answerLaTeX: `\\text{${element}}`,
      steps: [
        `\\text{A ${element} ${definitions[element]}}`,
        `\\text{The symbol for a ${element} is: ${symbols[element]}}`
      ],
      metadata: {
        problemType: 'identification',
        element: element,
        difficulty: 'easy',
        estimatedTime: '30 seconds'
      }
    }
    
    if (params.showVisualDiagrams) {
      problem.diagram = this.generateElementDiagram(element, params)
    }
    
    return problem
  }
  
  generateCountingProblem(params) {
    const complexity = params.complexityLevel
    let elementCount = 0
    let intersectionCount = 0
    
    switch (complexity) {
      case 'basic':
        elementCount = Math.floor(Math.random() * 2) + 2 // 2-3
        intersectionCount = Math.floor(Math.random() * 2) + 1 // 1-2
        break
      case 'medium':
        elementCount = Math.floor(Math.random() * 3) + 4 // 4-6
        intersectionCount = Math.floor(Math.random() * 3) + 2 // 2-4
        break
      case 'complex':
        elementCount = Math.floor(Math.random() * 4) + 7 // 7-10
        intersectionCount = Math.floor(Math.random() * 5) + 3 // 3-7
        break
    }
    
    const countType = this.getRandomElement(['segments', 'lines', 'rays', 'intersections'])
    
    const problem = {
      question: `How many ${countType} are shown in this figure?`,
      questionLaTeX: `\\text{How many ${countType} are shown in this figure?}`,
      answer: elementCount.toString(),
      answerLaTeX: elementCount.toString(),
      steps: [
        `\\text{Count each ${countType.slice(0, -1)} in the figure}`,
        `\\text{Total ${countType}: ${elementCount}}`
      ],
      metadata: {
        problemType: 'counting',
        countType: countType,
        count: elementCount,
        complexity: complexity,
        difficulty: 'medium',
        estimatedTime: '45 seconds'
      }
    }
    
    if (params.showVisualDiagrams) {
      problem.diagram = this.generateCountingDiagram(countType, elementCount, intersectionCount, params)
    }
    
    return problem
  }
  
  generateParallelProblem(params) {
    const questions = [
      'Which lines appear to be parallel?',
      'How many pairs of parallel lines are shown?',
      'Are these lines parallel or not parallel?'
    ]
    
    const question = this.getRandomElement(questions)
    
    // Limit pair count based on diagram size to ensure all pairs are visible
    const maxPairs = params.diagramSize === 'small' ? 2 : 
                     params.diagramSize === 'large' ? 3 : 2; // medium = 2
    const pairCount = Math.floor(Math.random() * maxPairs) + 1
    
    let answer = ''
    let steps = []
    
    if (question.includes('pairs')) {
      answer = pairCount.toString()
      steps = [
        `\\text{Parallel lines never intersect}`,
        `\\text{Count the pairs of parallel lines}`,
        `\\text{Total pairs: ${pairCount}}`
      ]
    } else if (question.includes('Which')) {
      // Generate answer based on actual diagram labeling (A, B, C, D...)
      if (pairCount === 1) {
        answer = 'Lines A and B'
        steps = [
          `\\text{Parallel lines never intersect}`,
          `\\text{Lines A and B are parallel}`
        ]
      } else if (pairCount === 2) {
        answer = 'Lines A and B, Lines C and D'
        steps = [
          `\\text{Parallel lines never intersect}`,
          `\\text{Lines A and B are parallel}`,
          `\\text{Lines C and D are parallel}`
        ]
      } else {
        answer = 'Lines A and B, Lines C and D, Lines E and F'
        steps = [
          `\\text{Parallel lines never intersect}`,
          `\\text{Lines A and B are parallel}`,
          `\\text{Lines C and D are parallel}`,
          `\\text{Lines E and F are parallel}`
        ]
      }
    } else {
      answer = 'parallel'
      steps = [
        `\\text{Parallel lines never intersect}`,
        `\\text{These lines are parallel}`
      ]
    }
    
    const problem = {
      question: question,
      questionLaTeX: `\\text{${question}}`,
      answer: answer,
      answerLaTeX: `\\text{${answer}}`,
      steps: steps,
      metadata: {
        problemType: 'parallel',
        pairCount: pairCount,
        difficulty: 'medium',
        estimatedTime: '40 seconds'
      }
    }
    
    if (params.showVisualDiagrams) {
      problem.diagram = this.generateParallelDiagram(pairCount, params)
    }
    
    return problem
  }
  
  generatePerpendicularProblem(params) {
    const questions = [
      'Which lines appear to be perpendicular?',
      'How many right angles are formed by these intersecting lines?',
      'Are these lines perpendicular or not perpendicular?'
    ]
    
    const question = this.getRandomElement(questions)
    
    let answer = ''
    let steps = []
    
    if (question.includes('angles')) {
      answer = '4'
      steps = [
        `\\text{Perpendicular lines intersect at right angles}`,
        `\\text{They form 4 right angles (90°)}`,
        `\\text{Total right angles: 4}`
      ]
    } else if (question.includes('Which')) {
      answer = 'Lines EF and GH'
      steps = [
        `\\text{Perpendicular lines intersect at right angles}`,
        `\\text{Lines EF and GH are perpendicular}`
      ]
    } else {
      answer = 'perpendicular'
      steps = [
        `\\text{Perpendicular lines intersect at 90° angles}`,
        `\\text{These lines are perpendicular}`
      ]
    }
    
    const problem = {
      question: question,
      questionLaTeX: `\\text{${question}}`,
      answer: answer,
      answerLaTeX: `\\text{${answer}}`,
      steps: steps,
      metadata: {
        problemType: 'perpendicular',
        difficulty: 'medium',
        estimatedTime: '40 seconds'
      }
    }
    
    if (params.showVisualDiagrams) {
      problem.diagram = this.generatePerpendicularDiagram(params)
    }
    
    return problem
  }
  
  generateIntersectingProblem(params) {
    const lineCount = Math.floor(Math.random() * 3) + 2 // 2-4 lines
    const intersectionPoints = Math.floor(Math.random() * 3) + 1 // 1-3 points
    
    const questions = [
      'How many intersection points are shown?',
      'At how many points do these lines intersect?',
      'How many lines intersect at the same point?'
    ]
    
    const question = this.getRandomElement(questions)
    
    const problem = {
      question: question,
      questionLaTeX: `\\text{${question}}`,
      answer: intersectionPoints.toString(),
      answerLaTeX: intersectionPoints.toString(),
      steps: [
        `\\text{An intersection point is where lines meet}`,
        `\\text{Count each point where lines cross}`,
        `\\text{Total intersection points: ${intersectionPoints}}`
      ],
      metadata: {
        problemType: 'intersecting',
        lineCount: lineCount,
        intersectionPoints: intersectionPoints,
        difficulty: 'medium',
        estimatedTime: '35 seconds'
      }
    }
    
    if (params.showVisualDiagrams) {
      problem.diagram = this.generateIntersectingDiagram(lineCount, intersectionPoints, params)
    }
    
    return problem
  }
  
  generateRaysProblem(params) {
    const rayCount = Math.floor(Math.random() * 3) + 2 // 2-4 rays
    
    const problem = {
      question: `How many rays are shown in this figure?`,
      questionLaTeX: `\\text{How many rays are shown in this figure?}`,
      answer: rayCount.toString(),
      answerLaTeX: rayCount.toString(),
      steps: [
        `\\text{A ray has one endpoint and extends infinitely}`,
        `\\text{Count each ray in the figure}`,
        `\\text{Total rays: ${rayCount}}`
      ],
      metadata: {
        problemType: 'rays',
        rayCount: rayCount,
        difficulty: 'medium',
        estimatedTime: '40 seconds'
      }
    }
    
    if (params.showVisualDiagrams) {
      problem.diagram = this.generateRaysDiagram(rayCount, params)
    }
    
    return problem
  }
  
  generateMeasurementProblem(params) {
    const length = Math.floor(Math.random() * 15) + 5 // 5-20 units
    const unit = this.getRandomElement(['cm', 'in', 'units'])
    
    const problem = {
      question: `What is the length of this line segment?`,
      questionLaTeX: `\\text{What is the length of this line segment?}`,
      answer: `${length} ${unit}`,
      answerLaTeX: `${length} \\text{ ${unit}}`,
      steps: [
        `\\text{Use a ruler to measure the line segment}`,
        `\\text{The length is ${length} ${unit}}`
      ],
      metadata: {
        problemType: 'measurement',
        length: length,
        unit: unit,
        difficulty: 'easy',
        estimatedTime: '30 seconds'
      }
    }
    
    if (params.showVisualDiagrams) {
      problem.diagram = this.generateMeasurementDiagram(length, unit, params)
    }
    
    return problem
  }
  
  generateRelationshipsProblem(params) {
    const relationships = [
      { type: 'parallel', description: 'lines that never intersect' },
      { type: 'perpendicular', description: 'lines that intersect at right angles' },
      { type: 'intersecting', description: 'lines that cross each other' }
    ]
    
    const relationship = this.getRandomElement(relationships)
    
    const problem = {
      question: `What do we call ${relationship.description}?`,
      questionLaTeX: `\\text{What do we call ${relationship.description}?}`,
      answer: `${relationship.type} lines`,
      answerLaTeX: `\\text{${relationship.type} lines}`,
      steps: [
        `\\text{${relationship.description.charAt(0).toUpperCase() + relationship.description.slice(1)}}`,
        `\\text{These are called ${relationship.type} lines}`
      ],
      metadata: {
        problemType: 'relationships',
        relationship: relationship.type,
        difficulty: 'medium',
        estimatedTime: '35 seconds'
      }
    }
    
    return problem
  }

  /**
   * Generate visual diagram using GeometryRenderer
   */
  generateElementDiagram(element, params) {
    const sizes = {
      small: { width: 200, height: 150 },
      medium: { width: 300, height: 200 },
      large: { width: 400, height: 250 }
    }
    
    const size = sizes[params.diagramSize] || sizes.medium
    
    return {
      type: 'geometry-renderer',
      shape: 'line-element',
      element: element,
      config: {
        width: size.width,
        height: size.height,
        theme: params.diagramTheme,
        showLabels: true,
        showSymbols: true,
        center: true
      },
      svgId: `line-element-${element}-${Date.now()}`
    }
  }
  
  generateCountingDiagram(countType, count, intersections, params) {
    const sizes = {
      small: { width: 250, height: 200 },
      medium: { width: 350, height: 250 },
      large: { width: 450, height: 300 }
    }
    
    const size = sizes[params.diagramSize] || sizes.medium
    
    return {
      type: 'geometry-renderer',
      shape: 'line-figure',
      countType: countType,
      elementCount: count,
      intersectionCount: intersections,
      config: {
        width: size.width,
        height: size.height,
        theme: params.diagramTheme,
        showLabels: false,
        complexity: params.complexityLevel,
        center: true
      },
      svgId: `line-counting-${countType}-${Date.now()}`
    }
  }
  
  generateParallelDiagram(pairCount, params) {
    const sizes = {
      small: { width: 250, height: 200 },
      medium: { width: 350, height: 250 },
      large: { width: 450, height: 300 }
    }
    
    const size = sizes[params.diagramSize] || sizes.medium
    
    return {
      type: 'geometry-renderer',
      shape: 'parallel-lines',
      pairCount: pairCount,
      config: {
        width: size.width,
        height: size.height,
        theme: params.diagramTheme,
        showLabels: true,
        showParallelMarks: true,
        center: true
      },
      svgId: `parallel-lines-${pairCount}-${Date.now()}`
    }
  }
  
  generatePerpendicularDiagram(params) {
    const sizes = {
      small: { width: 200, height: 200 },
      medium: { width: 250, height: 250 },
      large: { width: 300, height: 300 }
    }
    
    const size = sizes[params.diagramSize] || sizes.medium
    
    return {
      type: 'geometry-renderer',
      shape: 'perpendicular-lines',
      config: {
        width: size.width,
        height: size.height,
        theme: params.diagramTheme,
        showLabels: true,
        showRightAngleMarks: true,
        center: true
      },
      svgId: `perpendicular-lines-${Date.now()}`
    }
  }
  
  generateIntersectingDiagram(lineCount, intersectionPoints, params) {
    const sizes = {
      small: { width: 250, height: 200 },
      medium: { width: 350, height: 250 },
      large: { width: 450, height: 300 }
    }
    
    const size = sizes[params.diagramSize] || sizes.medium
    
    return {
      type: 'geometry-renderer',
      shape: 'intersecting-lines',
      lineCount: lineCount,
      intersectionPoints: intersectionPoints,
      config: {
        width: size.width,
        height: size.height,
        theme: params.diagramTheme,
        showLabels: true,
        highlightIntersections: true,
        center: true
      },
      svgId: `intersecting-lines-${lineCount}-${Date.now()}`
    }
  }
  
  generateRaysDiagram(rayCount, params) {
    const sizes = {
      small: { width: 250, height: 200 },
      medium: { width: 350, height: 250 },
      large: { width: 450, height: 300 }
    }
    
    const size = sizes[params.diagramSize] || sizes.medium
    
    return {
      type: 'geometry-renderer',
      shape: 'rays-figure',
      rayCount: rayCount,
      config: {
        width: size.width,
        height: size.height,
        theme: params.diagramTheme,
        showLabels: true,
        showArrows: true,
        center: true
      },
      svgId: `rays-figure-${rayCount}-${Date.now()}`
    }
  }
  
  generateMeasurementDiagram(length, unit, params) {
    const sizes = {
      small: { width: 250, height: 150 },
      medium: { width: 350, height: 200 },
      large: { width: 450, height: 250 }
    }
    
    const size = sizes[params.diagramSize] || sizes.medium
    
    return {
      type: 'geometry-renderer',
      shape: 'line-segment',
      measurements: { length },
      unit: unit,
      config: {
        width: size.width,
        height: size.height,
        theme: params.diagramTheme,
        showMeasurements: true,
        showRuler: true,
        center: true
      },
      svgId: `line-segment-${length}-${Date.now()}`
    }
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

export default LinesSegmentsGenerator