import { BaseGenerator } from '../BaseGenerator.js'

/**
 * Symmetry Generator
 * 
 * Generates problems about line symmetry, rotational symmetry, and reflection
 * Integrates with GeometryRenderer for visual diagrams
 */
export class SymmetryGenerator extends BaseGenerator {
  constructor() {
    super({
      name: 'Symmetry',
      description: 'Line symmetry, rotational symmetry, and reflection problems with visual diagrams',
      category: 'geometry-basic',
      difficulty: 'medium',
      icon: 'balance',
      tags: ['symmetry', 'reflection', 'rotation', 'line symmetry', 'visual'],
      gradeLevel: '2-8',
      estimatedTime: '60 seconds',
      exampleProblem: {
        question: 'How many lines of symmetry does this shape have?',
        questionLaTeX: '\\text{How many lines of symmetry does this shape have?}',
        answer: '4',
        answerLaTeX: '4'
      },
      
      // Default parameter values
      defaultParameters: {
        problemCount: 10,
        includeLineSymmetry: true,
        includeRotationalSymmetry: false,
        includeReflection: true,
        includeCompletion: true,
        includeIdentification: true,
        includeDrawing: false,
        includeShapes: true,
        // includeLetters: true,
        // includePatterns: false,
        showVisualDiagrams: true,
        diagramSize: 'medium',
        diagramTheme: 'educational',
        symmetryComplexity: 'basic'
      },
      
      // Parameter schema for validation and UI generation
      parameterSchema: {
        problemCount: {
          type: 'number',
          label: 'Number of Problems',
          description: 'How many problems to generate',
          min: 1,
          max: 50,
          required: true
        },
        includeLineSymmetry: {
          type: 'boolean',
          label: 'Line Symmetry',
          description: 'Count lines of symmetry in shapes'
        },
        includeRotationalSymmetry: {
          type: 'boolean',
          label: 'Rotational Symmetry',
          description: 'Identify rotational symmetry'
        },
        includeReflection: {
          type: 'boolean',
          label: 'Reflection',
          description: 'Reflection across lines'
        },
        includeCompletion: {
          type: 'boolean',
          label: 'Complete Symmetrical Figures',
          description: 'Complete symmetrical shapes'
        },
        includeIdentification: {
          type: 'boolean',
          label: 'Symmetry Identification',
          description: 'Identify if shapes have symmetry'
        },
        includeDrawing: {
          type: 'boolean',
          label: 'Drawing Problems',
          description: 'Draw lines of symmetry'
        },
        includeShapes: {
          type: 'boolean',
          label: 'Include Geometric Shapes',
          description: 'Use geometric shapes for symmetry'
        },
        // includeLetters: {
        //   type: 'boolean',
        //   label: 'Include Letters',
        //   description: 'Use letters for symmetry identification'
        // },
        // includePatterns: {
        //   type: 'boolean',
        //   label: 'Include Patterns',
        //   description: 'Use patterns and designs'
        // },
        showVisualDiagrams: {
          type: 'boolean',
          label: 'Show Visual Diagrams',
          description: 'Include geometric diagrams'
        },
        diagramSize: {
          type: 'select',
          label: 'Diagram Size',
          description: 'Size of the geometric diagrams',
          options: [
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'large', label: 'Large' }
          ]
        },
        diagramTheme: {
          type: 'select',
          label: 'Diagram Theme',
          description: 'Visual style for diagrams',
          options: [
            { value: 'educational', label: 'Educational' },
            { value: 'blueprint', label: 'Blueprint' },
            { value: 'minimal', label: 'Minimal' },
            { value: 'colorful', label: 'Colorful' }
          ]
        },
        symmetryComplexity: {
          type: 'select',
          label: 'Complexity Level',
          description: 'Complexity of symmetry problems',
          options: [
            { value: 'basic', label: 'Basic (simple shapes)' },
            { value: 'intermediate', label: 'Intermediate (complex shapes)' },
            { value: 'advanced', label: 'Advanced (complex figures)' }
          ]
        }
      }
    })
  }

  /**
   * Generate a single problem
   * @param {Object} parameters - Generation parameters
   * @returns {Object} Problem object
   */
  generateProblem(parameters = {}) {
    const params = { ...this.defaultParameters, ...parameters }
    
    // Validate parameters
    const validation = this.validateParameters(params)
    if (!validation.isValid) {
      throw new Error(`Invalid parameters: ${validation.errors.join(', ')}`)
    }
    
    // Build array of enabled problem types
    const problemTypes = []
    if (params.includeLineSymmetry) problemTypes.push('lineSymmetry')
    if (params.includeRotationalSymmetry) problemTypes.push('rotationalSymmetry')
    if (params.includeReflection) problemTypes.push('reflection')
    if (params.includeCompletion) problemTypes.push('completion')
    if (params.includeIdentification) problemTypes.push('identification')
    if (params.includeDrawing) problemTypes.push('drawing')
    
    if (problemTypes.length === 0) {
      throw new Error('At least one problem type must be enabled')
    }
    
    const problemType = this.getRandomElement(problemTypes)
    
    return this.generateSymmetryProblem(problemType, params)
  }

  /**
   * Generate a symmetry problem
   * @param {string} problemType - Type of problem
   * @param {Object} params - Generation parameters
   * @returns {Object} Problem object
   */
  generateSymmetryProblem(problemType, params) {
    switch (problemType) {
      case 'lineSymmetry':
        return this.generateLineSymmetryProblem(params)
      case 'rotationalSymmetry':
        return this.generateRotationalSymmetryProblem(params)
      case 'reflection':
        return this.generateReflectionProblem(params)
      case 'completion':
        return this.generateCompletionProblem(params)
      case 'identification':
        return this.generateIdentificationProblem(params)
      case 'drawing':
        return this.generateDrawingProblem(params)
      default:
        return this.generateLineSymmetryProblem(params)
    }
  }
  
  generateLineSymmetryProblem(params) {
    const subject = this.getSymmetrySubject(params)
    const symmetryData = this.getSymmetryData(subject.type, subject.name)
    
    const isInfinite = symmetryData.lineSymmetry === 999
    const answer = isInfinite ? 'Infinite' : symmetryData.lineSymmetry.toString()
    const count = isInfinite ? 'infinite' : symmetryData.lineSymmetry
    
    const problem = {
      question: `How many lines of symmetry does this ${subject.type} have?`,
      questionLaTeX: `\\text{How many lines of symmetry does this ${subject.type} have?}`,
      answer: answer,
      answerLaTeX: isInfinite ? '\\text{Infinite}' : symmetryData.lineSymmetry.toString(),
      steps: [
        `\\text{A line of symmetry divides a shape into two identical halves}`,
        `\\text{Count each line that creates mirror images}`,
        `\\text{Total lines of symmetry: ${count}}`
      ],
      metadata: {
        problemType: 'lineSymmetry',
        subject: subject,
        symmetryCount: symmetryData.lineSymmetry,
        difficulty: 'medium',
        estimatedTime: '45 seconds'
      }
    }
    
    if (params.showVisualDiagrams) {
      problem.diagram = this.generateSymmetryDiagram(subject, 'lineSymmetry', symmetryData, params)
    }
    
    return problem
  }
  
  generateRotationalSymmetryProblem(params) {
    const subject = this.getSymmetrySubject(params)
    const symmetryData = this.getSymmetryData(subject.type, subject.name)
    
    const hasRotational = symmetryData.rotationalOrder > 1
    const isInfinite = symmetryData.rotationalOrder === 999
    
    const question = hasRotational ? 
      `What is the order of rotational symmetry for this ${subject.type}?` :
      `Does this ${subject.type} have rotational symmetry?`
    
    const answer = hasRotational ? 
      (isInfinite ? 'Infinite' : symmetryData.rotationalOrder.toString()) : 
      'No'
    
    const order = isInfinite ? 'infinite' : symmetryData.rotationalOrder
    
    const steps = hasRotational ? [
      `\\text{Rotational symmetry means the shape looks the same after rotation}`,
      `\\text{Count how many times it matches during a full 360° turn}`,
      `\\text{Order of rotational symmetry: ${order}}`
    ] : [
      `\\text{Rotational symmetry means the shape looks the same after rotation}`,
      `\\text{This shape does not have rotational symmetry}`
    ]
    
    const problem = {
      question: question,
      questionLaTeX: `\\text{${question}}`,
      answer: answer,
      answerLaTeX: isInfinite && hasRotational ? '\\text{Infinite}' : `\\text{${answer}}`,
      steps: steps,
      metadata: {
        problemType: 'rotationalSymmetry',
        subject: subject,
        rotationalOrder: symmetryData.rotationalOrder,
        difficulty: 'hard',
        estimatedTime: '60 seconds'
      }
    }
    
    if (params.showVisualDiagrams) {
      problem.diagram = this.generateSymmetryDiagram(subject, 'rotationalSymmetry', symmetryData, params)
    }
    
    return problem
  }
  
  generateReflectionProblem(params) {
    const subject = this.getSymmetrySubject(params)
    
    const directions = ['horizontal', 'vertical', 'diagonal']
    const direction = this.getRandomElement(directions)
    
    const problem = {
      question: `Draw the reflection of this shape across the ${direction} line.`,
      questionLaTeX: `\\text{Draw the reflection of this shape across the ${direction} line.}`,
      answer: 'See diagram',
      answerLaTeX: '\\text{See diagram}',
      steps: [
        `\\text{A reflection creates a mirror image across a line}`,
        `\\text{Each point reflects to the same distance on the opposite side}`,
        `\\text{The reflection line acts as a mirror}`
      ],
      metadata: {
        problemType: 'reflection',
        subject: subject,
        direction: direction,
        difficulty: 'medium',
        estimatedTime: '75 seconds'
      }
    }
    
    if (params.showVisualDiagrams) {
      problem.diagram = this.generateReflectionDiagram(subject, direction, params)
    }
    
    return problem
  }
  
  generateCompletionProblem(params) {
    const subject = this.getSymmetrySubject(params)
    
    const problem = {
      question: `Complete this symmetrical figure by drawing the missing part.`,
      questionLaTeX: `\\text{Complete this symmetrical figure by drawing the missing part.}`,
      answer: 'See completed diagram',
      answerLaTeX: '\\text{See completed diagram}',
      steps: [
        `\\text{Use the line of symmetry as a guide}`,
        `\\text{Each point on one side has a matching point on the other}`,
        `\\text{The completed shape should be symmetrical}`
      ],
      metadata: {
        problemType: 'completion',
        subject: subject,
        difficulty: 'medium',
        estimatedTime: '90 seconds'
      }
    }
    
    if (params.showVisualDiagrams) {
      problem.diagram = this.generateCompletionDiagram(subject, params)
    }
    
    return problem
  }
  
  generateIdentificationProblem(params) {
    const subject = this.getSymmetrySubject(params)
    const symmetryData = this.getSymmetryData(subject.type, subject.name)
    
    const hasSymmetry = symmetryData.lineSymmetry > 0 || symmetryData.rotationalOrder > 1
    
    const questions = [
      `Does this ${subject.type} have line symmetry?`,
      `Is this ${subject.type} symmetrical?`,
      `Does this figure have any symmetry?`
    ]
    
    const question = this.getRandomElement(questions)
    const answer = hasSymmetry ? 'Yes' : 'No'
    
    const explanation = hasSymmetry ? 
      `This ${subject.type} has ${symmetryData.lineSymmetry} line(s) of symmetry` :
      `This ${subject.type} has no lines of symmetry`
    
    const problem = {
      question: question,
      questionLaTeX: `\\text{${question}}`,
      answer: answer,
      answerLaTeX: `\\text{${answer}}`,
      steps: [
        `\\text{Look for lines that divide the shape into identical halves}`,
        `\\text{${explanation}}`
      ],
      metadata: {
        problemType: 'identification',
        subject: subject,
        hasSymmetry: hasSymmetry,
        difficulty: 'easy',
        estimatedTime: '30 seconds'
      }
    }
    
    if (params.showVisualDiagrams) {
      problem.diagram = this.generateSymmetryDiagram(subject, 'identification', symmetryData, params)
    }
    
    return problem
  }
  
  generateDrawingProblem(params) {
    // Get a subject that's not a circle (infinite symmetry lines)
    let subject = this.getSymmetrySubject(params)
    while (subject.name === 'circle') {
      subject = this.getSymmetrySubject(params)
    }
    const symmetryData = this.getSymmetryData(subject.type, subject.name)
    
    const problem = {
      question: `Draw all the lines of symmetry for this ${subject.type}.`,
      questionLaTeX: `\\text{Draw all the lines of symmetry for this ${subject.type}.}`,
      answer: `${symmetryData.lineSymmetry} lines`,
      answerLaTeX: `\\text{${symmetryData.lineSymmetry} lines}`,
      steps: [
        `\\text{A line of symmetry creates two identical halves}`,
        `\\text{Look for all possible lines}`,
        `\\text{This ${subject.type} has ${symmetryData.lineSymmetry} lines of symmetry}`
      ],
      metadata: {
        problemType: 'drawing',
        subject: subject,
        symmetryCount: symmetryData.lineSymmetry,
        difficulty: 'medium',
        estimatedTime: '60 seconds'
      }
    }
    
    if (params.showVisualDiagrams) {
      problem.diagram = this.generateDrawingDiagram(subject, symmetryData, params)
    }
    
    return problem
  }

  /**
   * Get a symmetry subject based on parameters
   */
  getSymmetrySubject(params) {
    const subjects = []
    
    if (params.includeShapes) {
      subjects.push(
        { type: 'shape', name: 'square' },
        { type: 'shape', name: 'rectangle' },
        { type: 'shape', name: 'triangle' },
        { type: 'shape', name: 'circle' },
        { type: 'shape', name: 'hexagon' },
        { type: 'shape', name: 'pentagon' },
        { type: 'shape', name: 'diamond' }
      )
    }
    
    // if (params.includeLetters) {
    //   subjects.push(
    //     { type: 'letter', name: 'A' },
    //     { type: 'letter', name: 'B' },
    //     { type: 'letter', name: 'C' },
    //     { type: 'letter', name: 'D' },
    //     { type: 'letter', name: 'E' },
    //     { type: 'letter', name: 'H' },
    //     { type: 'letter', name: 'I' },
    //     { type: 'letter', name: 'M' },
    //     { type: 'letter', name: 'O' },
    //     { type: 'letter', name: 'T' },
    //     { type: 'letter', name: 'U' },
    //     { type: 'letter', name: 'V' },
    //     { type: 'letter', name: 'W' },
    //     { type: 'letter', name: 'X' },
    //     { type: 'letter', name: 'Y' }
    //   )
    // }
    
    // if (params.includePatterns) {
    //   subjects.push(
    //     { type: 'pattern', name: 'star' },
    //     { type: 'pattern', name: 'flower' },
    //     { type: 'pattern', name: 'snowflake' }
    //   )
    // }
    
    return this.getRandomElement(subjects)
  }

  /**
   * Get symmetry data for a subject
   */
  getSymmetryData(type, name) {
    const symmetryDatabase = {
      shape: {
        'square': { lineSymmetry: 4, rotationalOrder: 4 },
        'rectangle': { lineSymmetry: 2, rotationalOrder: 2 },
        'triangle': { lineSymmetry: 3, rotationalOrder: 3 },
        'circle': { lineSymmetry: 999, rotationalOrder: 999 }, // Infinite symmetry
        'hexagon': { lineSymmetry: 6, rotationalOrder: 6 },
        'pentagon': { lineSymmetry: 5, rotationalOrder: 5 },
        'diamond': { lineSymmetry: 2, rotationalOrder: 2 }
      },
      letter: {
        'A': { lineSymmetry: 1, rotationalOrder: 1 },
        'B': { lineSymmetry: 1, rotationalOrder: 1 },
        'C': { lineSymmetry: 1, rotationalOrder: 1 },
        'D': { lineSymmetry: 1, rotationalOrder: 1 },
        'E': { lineSymmetry: 1, rotationalOrder: 1 },
        'H': { lineSymmetry: 2, rotationalOrder: 2 },
        'I': { lineSymmetry: 2, rotationalOrder: 2 },
        'M': { lineSymmetry: 1, rotationalOrder: 1 },
        'O': { lineSymmetry: 2, rotationalOrder: 2 },
        'T': { lineSymmetry: 1, rotationalOrder: 1 },
        'U': { lineSymmetry: 1, rotationalOrder: 1 },
        'V': { lineSymmetry: 1, rotationalOrder: 1 },
        'W': { lineSymmetry: 1, rotationalOrder: 1 },
        'X': { lineSymmetry: 4, rotationalOrder: 2 },
        'Y': { lineSymmetry: 1, rotationalOrder: 1 }
      },
      pattern: {
        'star': { lineSymmetry: 5, rotationalOrder: 5 },
        'flower': { lineSymmetry: 8, rotationalOrder: 8 },
        'snowflake': { lineSymmetry: 6, rotationalOrder: 6 }
      }
    }
    
    return symmetryDatabase[type][name] || { lineSymmetry: 0, rotationalOrder: 1 }
  }

  /**
   * Generate visual diagrams using GeometryRenderer
   */
  generateSymmetryDiagram(subject, problemType, symmetryData, params) {
    const sizes = {
      small: { width: 200, height: 200 },
      medium: { width: 300, height: 300 },
      large: { width: 400, height: 400 }
    }
    
    const size = sizes[params.diagramSize] || sizes.medium
    
    return {
      type: 'geometry-renderer',
      shape: 'symmetry-figure',
      subject: subject,
      problemType: problemType,
      symmetryData: symmetryData,
      config: {
        width: size.width,
        height: size.height,
        theme: params.diagramTheme,
        showSymmetryLines: problemType === 'drawing',
        showLabels: false,
        center: true,
        complexity: params.symmetryComplexity
      },
      svgId: `symmetry-${subject.type}-${subject.name}-${Date.now()}`
    }
  }
  
  generateReflectionDiagram(subject, direction, params) {
    const sizes = {
      small: { width: 300, height: 200 },
      medium: { width: 400, height: 250 },
      large: { width: 500, height: 300 }
    }
    
    const size = sizes[params.diagramSize] || sizes.medium
    
    return {
      type: 'geometry-renderer',
      shape: 'reflection',
      subject: subject,
      reflectionDirection: direction,
      config: {
        width: size.width,
        height: size.height,
        theme: params.diagramTheme,
        showReflectionLine: true,
        showOriginal: true,
        showReflected: false, // Student should draw this
        center: true
      },
      svgId: `reflection-${direction}-${Date.now()}`
    }
  }
  
  generateCompletionDiagram(subject, params) {
    const sizes = {
      small: { width: 250, height: 200 },
      medium: { width: 350, height: 250 },
      large: { width: 450, height: 300 }
    }
    
    const size = sizes[params.diagramSize] || sizes.medium
    
    return {
      type: 'geometry-renderer',
      shape: 'completion',
      subject: subject,
      config: {
        width: size.width,
        height: size.height,
        theme: params.diagramTheme,
        showHalf: true,
        showSymmetryLine: true,
        showComplete: false, // Student should complete
        center: true
      },
      svgId: `completion-${subject.name}-${Date.now()}`
    }
  }
  
  generateDrawingDiagram(subject, symmetryData, params) {
    const sizes = {
      small: { width: 200, height: 200 },
      medium: { width: 300, height: 300 },
      large: { width: 400, height: 400 }
    }
    
    const size = sizes[params.diagramSize] || sizes.medium
    
    return {
      type: 'geometry-renderer',
      shape: 'symmetry-drawing',
      subject: subject,
      symmetryData: symmetryData,
      config: {
        width: size.width,
        height: size.height,
        theme: params.diagramTheme,
        showSymmetryLines: false, // Student should draw these
        showLabels: false,
        center: true
      },
      svgId: `drawing-${subject.name}-${Date.now()}`
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

export default SymmetryGenerator