import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'
import { getDiagramSize } from '../geometry-basic/shared/DiagramSizes.js'

/**
 * Complex Area Generator
 * 
 * Generates complex area problems involving composite shapes, irregular polygons,
 * area by decomposition, area by subtraction, and coordinate geometry.
 */
export class ComplexAreaGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Complex Area',
      description: 'Advanced area problems with composite shapes, decomposition, coordinate geometry, and irregular polygons',
      category: 'geometry-advanced',
      difficulty: 'hard',
      icon: 'dashboard',
      tags: ['area', 'complex', 'composite', 'coordinate', 'decomposition'],
      gradeLevel: '7-12',
      estimatedTime: '4-6 minutes',
      exampleProblem: {
        question: 'Find the area of the composite shape formed by a rectangle with a semicircle attached to one side.',
        questionLaTeX: '\\text{Find the area of the composite shape formed by a rectangle with a semicircle attached to one side.}',
        answer: '78.28 square units',
        answerLaTeX: '78.28 \\text{ square units}'
      },
      
      defaultParameters: {
        problemCount: 8,
        includeCompositeShapes: true,
        includeSubtractionMethod: true,
        includeIrregularPolygons: true,
        includeCoordinateArea: true,
        includeShadedRegions: true,
        includeWordProblems: false,
        minDimension: 4,
        maxDimension: 20,
        allowDecimals: true,
        decimalPlaces: 2,
        units: 'mixed',
        showDecomposition: true,
        showCoordinates: true,
        showVisualDiagrams: true,
        diagramSize: 'large',
        complexityLevel: 'intermediate'
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
                description: 'How many complex area problems to generate',
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
                description: 'Determines the difficulty of area problems',
                variant: 'cards',
                options: [
                  { value: 'basic', label: 'Basic', description: 'Simple composite shapes' },
                  { value: 'intermediate', label: 'Intermediate', description: 'Multiple shapes and decomposition' },
                  { value: 'advanced', label: 'Advanced', description: 'Complex coordinate geometry and irregular shapes' }
                ],
                order: 2
              })
            }
          }),
          
          problemTypes: schemaV2.createCategory({
            id: 'problemTypes',
            label: 'Problem Types',
            description: 'Choose which types of complex area problems to include',
            icon: 'category',
            color: 'green',
            order: 2,
            parameters: {
              includeCompositeShapes: schemaV2.createParameter({
                type: 'boolean',
                label: 'Composite Shapes',
                description: 'Shapes made from combining multiple basic shapes',
                helpText: 'Rectangle + semicircle, L-shapes, etc.',
                order: 1
              }),
              includeSubtractionMethod: schemaV2.createParameter({
                type: 'boolean',
                label: 'Subtraction Method',
                description: 'Find area by subtracting smaller shapes from larger ones',
                helpText: 'Large rectangle with cutouts',
                order: 2
              }),
              includeIrregularPolygons: schemaV2.createParameter({
                type: 'boolean',
                label: 'Irregular Polygons',
                description: 'Polygons that can be decomposed into triangles and rectangles',
                helpText: 'Break into simpler shapes',
                order: 3
              }),
              includeCoordinateArea: schemaV2.createParameter({
                type: 'boolean',
                label: 'Coordinate Geometry',
                description: 'Find area using coordinate plane methods',
                helpText: 'Shoelace formula, triangulation',
                order: 4
              }),
              includeShadedRegions: schemaV2.createParameter({
                type: 'boolean',
                label: 'Shaded Regions',
                description: 'Find area of shaded regions in complex figures',
                helpText: 'Visual interpretation required',
                order: 5
              }),
              includeWordProblems: schemaV2.createParameter({
                type: 'boolean',
                label: 'Word Problems',
                description: 'Real-world applications of complex area calculations',
                helpText: 'Landscaping, construction, design',
                order: 6
              })
            }
          }),
          
          dimensions: schemaV2.createCategory({
            id: 'dimensions',
            label: 'Dimensions & Values',
            description: 'Configure measurement ranges and precision',
            icon: 'straighten',
            color: 'purple',
            order: 3,
            parameters: {
              maxDimension: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Dimension',
                description: 'Largest side length or coordinate value',
                min: 10,
                max: 50,
                required: true,
                slider: true,
                presets: [15, 20, 25, 30],
                order: 1
              }),
              allowDecimals: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Decimal Values',
                description: 'Include decimal measurements and results',
                helpText: 'More realistic but harder calculations',
                order: 2
              }),
              decimalPlaces: schemaV2.createParameter({
                type: 'number',
                label: 'Decimal Places',
                description: 'Number of decimal places in results',
                min: 1,
                max: 3,
                required: true,
                dependsOn: 'allowDecimals',
                order: 3
              }),
              units: schemaV2.createParameter({
                type: 'select',
                label: 'Measurement Units',
                description: 'Units to use for measurements',
                options: [
                  { value: 'mixed', label: 'Mixed Units', description: 'cm, m, ft, in' },
                  { value: 'metric', label: 'Metric Only', description: 'cm, m, mm' },
                  { value: 'imperial', label: 'Imperial Only', description: 'ft, in, yd' },
                  { value: 'abstract', label: 'Abstract Units', description: 'Just "units"' }
                ],
                order: 4
              })
            }
          }),
          
          visualization: schemaV2.createCategory({
            id: 'visualization',
            label: 'Visualization',
            description: 'Control diagram appearance and information display',
            icon: 'visibility',
            color: 'orange',
            order: 4,
            parameters: {
              showVisualDiagrams: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Visual Diagrams',
                description: 'Include geometric diagrams with measurements',
                helpText: 'Helps students visualize the problem',
                order: 1
              }),
              showDecomposition: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Decomposition',
                description: 'Highlight how shapes can be broken down',
                helpText: 'Educational lines showing decomposition',
                dependsOn: 'showVisualDiagrams',
                order: 2
              }),
              showCoordinates: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Coordinates',
                description: 'Display coordinate values on coordinate geometry problems',
                helpText: 'Label vertices with coordinates',
                dependsOn: 'showVisualDiagrams',
                order: 3
              }),
              diagramSize: schemaV2.createParameter({
                type: 'select',
                label: 'Diagram Size',
                description: 'Size of the geometric diagrams',
                options: [
                  { value: 'small', label: 'Small', description: '200×150px' },
                  { value: 'medium', label: 'Medium', description: '300×225px' },
                  { value: 'large', label: 'Large', description: '400×300px' }
                ],
                dependsOn: 'showVisualDiagrams',
                order: 4
              })
            }
          })
        },
        
        presets: [
          schemaV2.createPreset({
            id: 'composite-shapes',
            label: 'Composite Shapes',
            description: 'Focus on shapes made from multiple basic shapes',
            icon: 'view_module',
            category: 'concept',
            values: {
              problemCount: 8,
              includeCompositeShapes: true,
              includeSubtractionMethod: false,
              includeIrregularPolygons: false,
              includeCoordinateArea: false,
              includeShadedRegions: true,
              includeWordProblems: false,
              maxDimension: 20,
              allowDecimals: true,
              decimalPlaces: 1,
              units: 'metric',
              showDecomposition: true,
              showVisualDiagrams: true,
              diagramSize: 'large',
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'coordinate-area',
            label: 'Coordinate Geometry',
            description: 'Area calculations using coordinate plane methods',
            icon: 'grid_on',
            category: 'concept',
            values: {
              problemCount: 6,
              includeCompositeShapes: false,
              includeSubtractionMethod: false,
              includeIrregularPolygons: true,
              includeCoordinateArea: true,
              includeShadedRegions: false,
              includeWordProblems: false,
              maxDimension: 15,
              allowDecimals: true,
              decimalPlaces: 2,
              units: 'abstract',
              showCoordinates: true,
              showVisualDiagrams: true,
              diagramSize: 'large',
              complexityLevel: 'advanced'
            }
          }),
          
          schemaV2.createPreset({
            id: 'decomposition-practice',
            label: 'Decomposition Practice',
            description: 'Break complex shapes into simpler parts',
            icon: 'call_split',
            category: 'method',
            values: {
              problemCount: 10,
              includeCompositeShapes: true,
              includeSubtractionMethod: true,
              includeIrregularPolygons: true,
              includeCoordinateArea: false,
              includeShadedRegions: true,
              includeWordProblems: false,
              maxDimension: 25,
              allowDecimals: false,
              units: 'mixed',
              showDecomposition: true,
              showVisualDiagrams: true,
              diagramSize: 'medium',
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'real-world-applications',
            label: 'Real-World Applications',
            description: 'Practical area problems from construction and design',
            icon: 'home_work',
            category: 'application',
            values: {
              problemCount: 6,
              includeCompositeShapes: true,
              includeSubtractionMethod: true,
              includeIrregularPolygons: false,
              includeCoordinateArea: false,
              includeShadedRegions: false,
              includeWordProblems: true,
              maxDimension: 30,
              allowDecimals: true,
              decimalPlaces: 1,
              units: 'imperial',
              showVisualDiagrams: true,
              diagramSize: 'large',
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive-practice',
            label: 'Comprehensive Practice',
            description: 'All types of complex area problems',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 12,
              includeCompositeShapes: true,
              includeSubtractionMethod: true,
              includeIrregularPolygons: true,
              includeCoordinateArea: true,
              includeShadedRegions: true,
              includeWordProblems: false,
              maxDimension: 25,
              allowDecimals: true,
              decimalPlaces: 2,
              units: 'mixed',
              showDecomposition: true,
              showCoordinates: true,
              showVisualDiagrams: true,
              diagramSize: 'large',
              complexityLevel: 'advanced'
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
    if (params.includeCompositeShapes) problemTypes.push('composite')
    if (params.includeSubtractionMethod) problemTypes.push('subtraction')
    if (params.includeIrregularPolygons) problemTypes.push('irregular')
    if (params.includeCoordinateArea) problemTypes.push('coordinate')
    if (params.includeShadedRegions) problemTypes.push('shaded')
    if (params.includeWordProblems) problemTypes.push('wordProblem')
    
    if (problemTypes.length === 0) problemTypes.push('composite')
    
    const problemType = this.getRandomElement(problemTypes)
    return this.generateComplexAreaProblem(problemType, params)
  }

  generateComplexAreaProblem(problemType, params) {
    switch (problemType) {
      case 'composite':
        return this.generateCompositeShapeProblem(params)
      case 'subtraction':
        return this.generateSubtractionProblem(params)
      case 'irregular':
        return this.generateIrregularPolygonProblem(params)
      case 'coordinate':
        return this.generateCoordinateAreaProblem(params)
      case 'shaded':
        return this.generateShadedRegionProblem(params)
      case 'wordProblem':
        return this.generateWordProblem(params)
      default:
        return this.generateCompositeShapeProblem(params)
    }
  }
  
  generateCompositeShapeProblem(params) {
    const compositeTypes = ['rectangle_semicircle', 'L_shape', 'rectangle_triangle', 'two_rectangles']
    const type = this.getRandomElement(compositeTypes)
    
    let width, height, radius, area, steps, diagram
    
    switch (type) {
      case 'rectangle_semicircle':
        width = this.getRandomNumber(8, params.maxDimension)
        height = this.getRandomNumber(6, Math.min(params.maxDimension, width))
        radius = width / 2
        
        const rectArea = width * height
        const semicircleArea = (Math.PI * radius * radius) / 2
        area = rectArea + semicircleArea
        
        steps = [
          `\\text{Composite shape: Rectangle + Semicircle}`,
          `\\text{Rectangle area: } ${width} \\times ${height} = ${rectArea}`,
          `\\text{Semicircle radius: } ${radius}`,
          `\\text{Semicircle area: } \\frac{1}{2}\\pi r^2 = \\frac{1}{2}\\pi (${radius})^2 = ${semicircleArea.toFixed(2)}`,
          `\\text{Total area: } ${rectArea} + ${semicircleArea.toFixed(2)} = ${area.toFixed(2)}`
        ]
        
        diagram = this.createCompositeShapeDiagram('rectangle_semicircle', { width, height, radius }, params)
        break
        
      case 'L_shape':
        const w1 = this.getRandomNumber(8, params.maxDimension)
        const h1 = this.getRandomNumber(6, params.maxDimension)
        const w2 = this.getRandomNumber(4, Math.floor(w1 * 0.7))
        const h2 = this.getRandomNumber(4, Math.floor(h1 * 0.7))
        
        const area1 = w1 * h1
        const area2 = w2 * h2
        area = area1 - area2
        
        steps = [
          `\\text{L-shape: Large rectangle - Small rectangle}`,
          `\\text{Large rectangle: } ${w1} \\times ${h1} = ${area1}`,
          `\\text{Small rectangle: } ${w2} \\times ${h2} = ${area2}`,
          `\\text{L-shape area: } ${area1} - ${area2} = ${area}`
        ]
        
        diagram = this.createCompositeShapeDiagram('L_shape', { w1, h1, w2, h2 }, params)
        break
        
      default:
        // Rectangle + triangle case
        width = this.getRandomNumber(8, params.maxDimension)
        height = this.getRandomNumber(6, params.maxDimension)
        const triBase = width
        const triHeight = this.getRandomNumber(4, 8)
        
        const rectArea2 = width * height
        const triArea = (triBase * triHeight) / 2
        area = rectArea2 + triArea
        
        steps = [
          `\\text{Composite shape: Rectangle + Triangle}`,
          `\\text{Rectangle area: } ${width} \\times ${height} = ${rectArea2}`,
          `\\text{Triangle area: } \\frac{1}{2} \\times ${triBase} \\times ${triHeight} = ${triArea}`,
          `\\text{Total area: } ${rectArea2} + ${triArea} = ${area}`
        ]
        
        diagram = this.createCompositeShapeDiagram('rectangle_triangle', { width, height, triBase, triHeight }, params)
    }
    
    const unit = this.getRandomUnit(params.units)
    const finalArea = params.allowDecimals ? area.toFixed(params.decimalPlaces) : Math.round(area)
    
    return {
      question: `Find the area of the composite shape shown in the diagram.`,
      questionLaTeX: `\\text{Find the area of the composite shape shown in the diagram.}`,
      answer: `${finalArea} ${unit}²`,
      answerLaTeX: `${finalArea} \\text{ ${unit}}^2`,
      steps: steps,
      diagram: diagram,
      metadata: {
        problemType: 'composite',
        shapeType: type,
        area: finalArea,
        unit: unit,
        difficulty: 'medium',
        estimatedTime: '4 minutes'
      }
    }
  }
  
  generateSubtractionProblem(params) {
    const outerWidth = this.getRandomNumber(12, params.maxDimension)
    const outerHeight = this.getRandomNumber(10, params.maxDimension)
    const innerWidth = this.getRandomNumber(4, Math.floor(outerWidth * 0.6))
    const innerHeight = this.getRandomNumber(4, Math.floor(outerHeight * 0.6))
    
    const outerArea = outerWidth * outerHeight
    const innerArea = innerWidth * innerHeight
    const area = outerArea - innerArea
    
    const steps = [
      `\\text{Method: Subtraction (Outer shape - Inner shape)}`,
      `\\text{Outer rectangle: } ${outerWidth} \\times ${outerHeight} = ${outerArea}`,
      `\\text{Inner rectangle: } ${innerWidth} \\times ${innerHeight} = ${innerArea}`,
      `\\text{Shaded area: } ${outerArea} - ${innerArea} = ${area}`
    ]
    
    const diagram = this.createSubtractionDiagram({ outerWidth, outerHeight, innerWidth, innerHeight }, params)
    const unit = this.getRandomUnit(params.units)
    const finalArea = params.allowDecimals ? area.toFixed(params.decimalPlaces) : area
    
    return {
      question: `Find the area of the shaded region.`,
      questionLaTeX: `\\text{Find the area of the shaded region.}`,
      answer: `${finalArea} ${unit}²`,
      answerLaTeX: `${finalArea} \\text{ ${unit}}^2`,
      steps: steps,
      diagram: diagram,
      metadata: {
        problemType: 'subtraction',
        area: finalArea,
        unit: unit,
        difficulty: 'medium',
        estimatedTime: '3 minutes'
      }
    }
  }
  
  generateCoordinateAreaProblem(params) {
    // Generate a quadrilateral with vertices
    const vertices = this.generateQuadrilateralVertices(params.maxDimension)
    const area = this.calculatePolygonArea(vertices)
    
    const steps = [
      `\\text{Vertices: } ${vertices.map(v => `(${v.x}, ${v.y})`).join(', ')}`,
      `\\text{Using Shoelace formula:}`,
      `\\text{Area} = \\frac{1}{2}|\\sum_{i=0}^{n-1}(x_i y_{i+1} - x_{i+1} y_i)|`,
      ...this.getShoelaceSteps(vertices),
      `\\text{Area} = ${area.toFixed(params.decimalPlaces)}`
    ]
    
    const diagram = this.createCoordinateDiagram(vertices, params)
    const unit = this.getRandomUnit(params.units)
    const finalArea = params.allowDecimals ? area.toFixed(params.decimalPlaces) : Math.round(area)
    
    return {
      question: `Find the area of the polygon with the given vertices.`,
      questionLaTeX: `\\text{Find the area of the polygon with the given vertices.}`,
      answer: `${finalArea} square ${unit}`,
      answerLaTeX: `${finalArea} \\text{ square ${unit}}`,
      steps: steps,
      diagram: diagram,
      metadata: {
        problemType: 'coordinate',
        vertices: vertices,
        area: finalArea,
        unit: unit,
        difficulty: 'hard',
        estimatedTime: '5 minutes'
      }
    }
  }
  
  generateWordProblem(params) {
    const scenarios = [
      {
        type: 'garden',
        setup: () => {
          const totalLength = this.getRandomNumber(20, 30)
          const totalWidth = this.getRandomNumber(15, 25)
          const pathWidth = this.getRandomNumber(2, 4)
          
          const totalArea = totalLength * totalWidth
          const gardenLength = totalLength - 2 * pathWidth
          const gardenWidth = totalWidth - 2 * pathWidth
          const gardenArea = gardenLength * gardenWidth
          
          return {
            question: `A rectangular garden is ${totalLength} ft by ${totalWidth} ft with a ${pathWidth} ft wide path around it. What is the area of just the garden (not including the path)?`,
            area: gardenArea,
            steps: [
              `\\text{Total dimensions: } ${totalLength} \\times ${totalWidth}`,
              `\\text{Path width: } ${pathWidth} \\text{ ft on all sides}`,
              `\\text{Garden length: } ${totalLength} - 2(${pathWidth}) = ${gardenLength}`,
              `\\text{Garden width: } ${totalWidth} - 2(${pathWidth}) = ${gardenWidth}`,
              `\\text{Garden area: } ${gardenLength} \\times ${gardenWidth} = ${gardenArea}`
            ]
          }
        }
      },
      {
        type: 'tile',
        setup: () => {
          const roomLength = this.getRandomNumber(12, 20)
          const roomWidth = this.getRandomNumber(10, 16)
          const closetLength = this.getRandomNumber(3, 6)
          const closetWidth = this.getRandomNumber(4, 7)
          
          const roomArea = roomLength * roomWidth
          const closetArea = closetLength * closetWidth
          const tileArea = roomArea - closetArea
          
          return {
            question: `A room is ${roomLength} ft by ${roomWidth} ft with a closet that is ${closetLength} ft by ${closetWidth} ft. How much floor area needs to be tiled?`,
            area: tileArea,
            steps: [
              `\\text{Room area: } ${roomLength} \\times ${roomWidth} = ${roomArea}`,
              `\\text{Closet area: } ${closetLength} \\times ${closetWidth} = ${closetArea}`,
              `\\text{Floor to tile: } ${roomArea} - ${closetArea} = ${tileArea}`
            ]
          }
        }
      }
    ]
    
    const scenario = this.getRandomElement(scenarios)
    const problem = scenario.setup()
    const unit = 'ft'
    
    return {
      question: problem.question,
      questionLaTeX: `\\text{${problem.question.replace(/ft/g, 'ft')}}`,
      answer: `${problem.area} ${unit}²`,
      answerLaTeX: `${problem.area} \\text{ ${unit}}^2`,
      steps: problem.steps,
      metadata: {
        problemType: 'wordProblem',
        scenario: scenario.type,
        area: problem.area,
        unit: unit,
        difficulty: 'medium',
        estimatedTime: '4 minutes'
      }
    }
  }
  
  generateIrregularPolygonProblem(params) {
    // Create an irregular polygon by decomposing it into rectangles and triangles
    const shapes = []
    const rect1 = { width: this.getRandomNumber(8, 15), height: this.getRandomNumber(6, 12) }
    const rect2 = { width: this.getRandomNumber(4, 8), height: this.getRandomNumber(4, 8) }
    const triangle = { base: this.getRandomNumber(6, 10), height: this.getRandomNumber(4, 8) }
    
    shapes.push({ type: 'rectangle', ...rect1 })
    shapes.push({ type: 'rectangle', ...rect2 })
    shapes.push({ type: 'triangle', ...triangle })
    
    const totalArea = (rect1.width * rect1.height) + (rect2.width * rect2.height) + (triangle.base * triangle.height / 2)
    const unit = this.getRandomUnit(params.units)
    
    const steps = []
    if (params.showWork) {
      steps.push(`\\text{Decompose irregular polygon into simple shapes}`)
      steps.push(`\\text{Rectangle 1: } ${rect1.width} \\times ${rect1.height} = ${rect1.width * rect1.height}`)
      steps.push(`\\text{Rectangle 2: } ${rect2.width} \\times ${rect2.height} = ${rect2.width * rect2.height}`)
      steps.push(`\\text{Triangle: } \\frac{1}{2} \\times ${triangle.base} \\times ${triangle.height} = ${triangle.base * triangle.height / 2}`)
      steps.push(`\\text{Total area: } ${rect1.width * rect1.height} + ${rect2.width * rect2.height} + ${triangle.base * triangle.height / 2} = ${totalArea}`)
    }
    
    const diagram = this.createIrregularPolygonDiagram(shapes, params)
    const finalArea = params.allowDecimals ? totalArea.toFixed(params.decimalPlaces) : Math.round(totalArea)
    
    return {
      question: `Find the area of the irregular polygon by breaking it into simpler shapes.`,
      questionLaTeX: `\\text{Find the area of the irregular polygon by breaking it into simpler shapes.}`,
      answer: `${finalArea} ${unit}²`,
      answerLaTeX: `${finalArea} \\text{ ${unit}}^2`,
      steps: steps,
      diagram: diagram,
      metadata: {
        problemType: 'irregular',
        shapes: shapes,
        area: finalArea,
        unit: unit,
        difficulty: 'hard',
        estimatedTime: '5 minutes'
      }
    }
  }
  
  generateShadedRegionProblem(params) {
    // Create a shaded region problem (large shape with cutout)
    const outerShape = { type: 'rectangle', width: this.getRandomNumber(12, 20), height: this.getRandomNumber(10, 16) }
    const innerShapes = []
    
    // Add 1-2 inner shapes to subtract
    const numInnerShapes = this.getRandomNumber(1, 2)
    for (let i = 0; i < numInnerShapes; i++) {
      if (Math.random() < 0.6) {
        // Rectangle cutout
        innerShapes.push({
          type: 'rectangle',
          width: this.getRandomNumber(3, Math.floor(outerShape.width * 0.4)),
          height: this.getRandomNumber(3, Math.floor(outerShape.height * 0.4))
        })
      } else {
        // Circular cutout
        innerShapes.push({
          type: 'circle',
          radius: this.getRandomNumber(2, Math.floor(Math.min(outerShape.width, outerShape.height) * 0.2))
        })
      }
    }
    
    let outerArea = outerShape.width * outerShape.height
    let innerArea = 0
    
    const steps = []
    if (params.showWork) {
      steps.push(`\\text{Method: Outer area - Inner area(s)}`)
      steps.push(`\\text{Outer rectangle: } ${outerShape.width} \\times ${outerShape.height} = ${outerArea}`)
      
      innerShapes.forEach((shape, i) => {
        let shapeArea
        if (shape.type === 'rectangle') {
          shapeArea = shape.width * shape.height
          steps.push(`\\text{Inner rectangle ${i + 1}: } ${shape.width} \\times ${shape.height} = ${shapeArea}`)
        } else if (shape.type === 'circle') {
          shapeArea = Math.PI * shape.radius * shape.radius
          steps.push(`\\text{Inner circle ${i + 1}: } \\pi \\times ${shape.radius}^2 = ${shapeArea.toFixed(2)}`)
        }
        innerArea += shapeArea
      })
      
      steps.push(`\\text{Shaded area: } ${outerArea} - ${innerArea.toFixed(2)} = ${(outerArea - innerArea).toFixed(2)}`)
    }
    
    const shadedArea = outerArea - innerArea
    const unit = this.getRandomUnit(params.units)
    const finalArea = params.allowDecimals ? shadedArea.toFixed(params.decimalPlaces) : Math.round(shadedArea)
    
    const diagram = this.createShadedRegionDiagram(outerShape, innerShapes, params)
    
    return {
      question: `Find the area of the shaded region.`,
      questionLaTeX: `\\text{Find the area of the shaded region.}`,
      answer: `${finalArea} ${unit}²`,
      answerLaTeX: `${finalArea} \\text{ ${unit}}^2`,
      steps: steps,
      diagram: diagram,
      metadata: {
        problemType: 'shaded',
        outerShape: outerShape,
        innerShapes: innerShapes,
        area: finalArea,
        unit: unit,
        difficulty: 'medium',
        estimatedTime: '4 minutes'
      }
    }
  }
  
  // Helper methods for diagram creation
  createCompositeShapeDiagram(type, dimensions, params) {
    if (!params.showVisualDiagrams) return null
    
    const size = getDiagramSize(params.diagramSize)
    return {
      type: 'geometry-renderer',
      shape: type,
      measurements: dimensions,
      unit: 'units',
      config: {
        width: size.width,
        height: size.height,
        theme: 'educational',
        showMeasurements: true,
        showLabels: false,
        showGrid: false,
        center: true,
        highlightArea: true
      },
      svgId: `complex-area-${type}-${Date.now()}`
    }
  }
  
  createSubtractionDiagram(dimensions, params) {
    if (!params.showVisualDiagrams) return null
    
    const size = getDiagramSize(params.diagramSize)
    return {
      type: 'geometry-renderer',
      shape: 'rectangle',
      measurements: { width: dimensions.outerWidth, height: dimensions.outerHeight },
      unit: 'units',
      config: {
        width: size.width,
        height: size.height,
        theme: 'educational',
        showMeasurements: true,
        showLabels: false,
        showGrid: false,
        center: true,
        highlightArea: true
      },
      svgId: `subtraction-${Date.now()}`
    }
  }
  
  createCoordinateDiagram(vertices, params) {
    if (!params.showVisualDiagrams) return null
    
    const size = getDiagramSize(params.diagramSize)
    return {
      type: 'geometry-renderer',
      shape: 'polygon',
      measurements: { vertices: vertices.length },
      unit: 'units',
      config: {
        width: size.width,
        height: size.height,
        theme: 'educational',
        showMeasurements: false,
        showLabels: true,
        showGrid: true,
        center: true,
        highlightArea: true
      },
      svgId: `coordinate-polygon-${Date.now()}`
    }
  }
  
  createIrregularPolygonDiagram(shapes, params) {
    if (!params.showVisualDiagrams) return null
    
    const size = getDiagramSize(params.diagramSize)
    return {
      type: 'geometry-renderer',
      shape: 'polygon',
      measurements: { shapes: shapes.length },
      unit: 'units',
      config: {
        width: size.width,
        height: size.height,
        theme: 'educational',
        showMeasurements: true,
        showLabels: false,
        showGrid: false,
        center: true,
        highlightArea: true
      },
      svgId: `irregular-polygon-${Date.now()}`
    }
  }
  
  createShadedRegionDiagram(outerShape, innerShapes, params) {
    if (!params.showVisualDiagrams) return null
    
    const size = getDiagramSize(params.diagramSize)
    return {
      type: 'geometry-renderer',
      shape: outerShape.type,
      measurements: outerShape,
      unit: 'units',
      config: {
        width: size.width,
        height: size.height,
        theme: 'educational',
        showMeasurements: true,
        showLabels: false,
        showGrid: false,
        center: true,
        highlightArea: true
      },
      svgId: `shaded-region-${Date.now()}`
    }
  }
  
  // Helper methods for calculations
  generateQuadrilateralVertices(maxDim) {
    const vertices = []
    const centerX = maxDim / 2
    const centerY = maxDim / 2
    
    // Generate 4 vertices for a convex quadrilateral
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2 + (Math.random() - 0.5) * 0.5
      const radius = this.getRandomNumber(3, maxDim / 3)
      const x = Math.round(centerX + radius * Math.cos(angle))
      const y = Math.round(centerY + radius * Math.sin(angle))
      vertices.push({ x, y })
    }
    
    return vertices
  }
  
  calculatePolygonArea(vertices) {
    let area = 0
    const n = vertices.length
    
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n
      area += vertices[i].x * vertices[j].y
      area -= vertices[j].x * vertices[i].y
    }
    
    return Math.abs(area) / 2
  }
  
  getShoelaceSteps(vertices) {
    const steps = []
    let sum1 = 0, sum2 = 0
    
    for (let i = 0; i < vertices.length; i++) {
      const j = (i + 1) % vertices.length
      const term1 = vertices[i].x * vertices[j].y
      const term2 = vertices[j].x * vertices[i].y
      sum1 += term1
      sum2 += term2
      steps.push(`\\text{} x_${i}y_${j} - x_${j}y_${i} = ${vertices[i].x}(${vertices[j].y}) - ${vertices[j].x}(${vertices[i].y}) = ${term1 - term2}`)
    }
    
    steps.push(`\\text{Sum: } ${Math.abs(sum1 - sum2)}`)
    steps.push(`\\text{Area: } \\frac{1}{2} \\times ${Math.abs(sum1 - sum2)} = ${Math.abs(sum1 - sum2) / 2}`)
    
    return steps
  }
  
  buildCompositeShapeElements(type, dimensions, params) {
    // This would return elements for the geometry renderer
    // Implementation would depend on the specific renderer API
    return []
  }
  
  buildSubtractionElements(dimensions, params) {
    // This would return elements for the geometry renderer
    return []
  }
  
  buildIrregularPolygonElements(shapes, params) {
    // This would return elements for the geometry renderer
    return []
  }
  
  buildShadedRegionElements(outerShape, innerShapes, params) {
    // This would return elements for the geometry renderer
    return []
  }
  
  getRandomUnit(unitType) {
    const units = {
      metric: ['cm', 'm', 'mm'],
      imperial: ['ft', 'in', 'yd'],
      mixed: ['cm', 'm', 'ft', 'in'],
      abstract: ['units']
    }
    
    return this.getRandomElement(units[unitType] || units.mixed)
  }
  
  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  
  getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)]
  }
}

export default ComplexAreaGenerator