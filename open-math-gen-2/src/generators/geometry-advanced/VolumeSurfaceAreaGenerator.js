import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'
import { getDiagramSize } from '../geometry-basic/shared/DiagramSizes.js'

/**
 * Volume and Surface Area Generator
 * 
 * Generates 3D geometry problems involving volume and surface area calculations
 * for various 3D shapes including prisms, pyramids, cylinders, cones, and spheres.
 */
export class VolumeSurfaceAreaGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Volume & Surface Area',
      description: '3D geometry problems with volume and surface area calculations for prisms, pyramids, cylinders, cones, and spheres',
      category: 'geometry-advanced',
      difficulty: 'hard',
      icon: 'view_in_ar',
      tags: ['volume', 'surface area', '3D', 'prisms', 'cylinders', 'spheres'],
      gradeLevel: '7-12',
      estimatedTime: '4-6 minutes',
      exampleProblem: {
        question: 'Find the volume and surface area of a rectangular prism with length 8 cm, width 6 cm, and height 10 cm.',
        questionLaTeX: '\\text{Find the volume and surface area of a rectangular prism with length 8 cm, width 6 cm, and height 10 cm.}',
        answer: 'V = 480 cm³, SA = 376 cm²',
        answerLaTeX: 'V = 480 \\text{ cm}^3, SA = 376 \\text{ cm}^2'
      },
      
      defaultParameters: {
        problemCount: 8,
        includeRectangularPrisms: true,
        includeCubes: true,
        includeTriangularPrisms: true,
        includeCylinders: true,
        includeCones: true,
        includeSpheres: true,
        includePyramids: false,
        includeCompositeShapes: false,
        includeWordProblems: true,
        calculateVolume: true,
        calculateSurfaceArea: true,
        minDimension: 3,
        maxDimension: 20,
        allowDecimals: true,
        decimalPlaces: 2,
        units: 'mixed',
        showFormulas: true,
        showVisualDiagrams: true,
        show3DPerspective: true,
        showNetDiagrams: false,
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
                description: 'How many 3D geometry problems to generate',
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
                description: 'Determines the difficulty of 3D problems',
                variant: 'cards',
                options: [
                  { value: 'basic', label: 'Basic', description: 'Simple shapes with whole number dimensions' },
                  { value: 'intermediate', label: 'Intermediate', description: 'Mixed shapes and decimal dimensions' },
                  { value: 'advanced', label: 'Advanced', description: 'Composite shapes and complex calculations' }
                ],
                order: 2
              })
            }
          }),
          
          shapeTypes: schemaV2.createCategory({
            id: 'shapeTypes',
            label: '3D Shapes',
            description: 'Choose which 3D shapes to include',
            icon: 'view_in_ar',
            color: 'green',
            order: 2,
            parameters: {
              includeRectangularPrisms: schemaV2.createParameter({
                type: 'boolean',
                label: 'Rectangular Prisms',
                description: 'Boxes with rectangular bases',
                helpText: 'V = l×w×h, SA = 2(lw + lh + wh)',
                order: 1
              }),
              includeCubes: schemaV2.createParameter({
                type: 'boolean',
                label: 'Cubes',
                description: 'Special case of rectangular prism',
                helpText: 'V = s³, SA = 6s²',
                order: 2
              }),
              includeTriangularPrisms: schemaV2.createParameter({
                type: 'boolean',
                label: 'Triangular Prisms',
                description: 'Prisms with triangular bases',
                helpText: 'V = B×h where B is base area',
                order: 3
              }),
              includeCylinders: schemaV2.createParameter({
                type: 'boolean',
                label: 'Cylinders',
                description: 'Circular prisms',
                helpText: 'V = πr²h, SA = 2πr² + 2πrh',
                order: 4
              }),
              includeCones: schemaV2.createParameter({
                type: 'boolean',
                label: 'Cones',
                description: 'Circular pyramids',
                helpText: 'V = ⅓πr²h, SA = πr² + πrl',
                order: 5
              }),
              includeSpheres: schemaV2.createParameter({
                type: 'boolean',
                label: 'Spheres',
                description: 'Perfect 3D circles',
                helpText: 'V = ⁴⁄₃πr³, SA = 4πr²',
                order: 6
              }),
              includePyramids: schemaV2.createParameter({
                type: 'boolean',
                label: 'Pyramids',
                description: 'Shapes with polygonal base and triangular faces',
                helpText: 'V = ⅓Bh where B is base area',
                order: 7
              }),
              includeCompositeShapes: schemaV2.createParameter({
                type: 'boolean',
                label: 'Composite 3D Shapes',
                description: 'Combinations of basic 3D shapes',
                helpText: 'Cylinder + hemisphere, etc.',
                order: 8
              })
            }
          }),
          
          calculations: schemaV2.createCategory({
            id: 'calculations',
            label: 'Calculations',
            description: 'Choose which properties to calculate',
            icon: 'calculate',
            color: 'purple',
            order: 3,
            parameters: {
              calculateVolume: schemaV2.createParameter({
                type: 'boolean',
                label: 'Volume',
                description: 'Calculate volume (space inside)',
                helpText: 'Measured in cubic units',
                order: 1
              }),
              calculateSurfaceArea: schemaV2.createParameter({
                type: 'boolean',
                label: 'Surface Area',
                description: 'Calculate total surface area (outside area)',
                helpText: 'Measured in square units',
                order: 2
              }),
              includeWordProblems: schemaV2.createParameter({
                type: 'boolean',
                label: 'Word Problems',
                description: 'Real-world applications of 3D geometry',
                helpText: 'Tanks, packaging, construction',
                order: 3
              })
            }
          }),
          
          dimensions: schemaV2.createCategory({
            id: 'dimensions',
            label: 'Dimensions & Values',
            description: 'Configure measurement ranges and precision',
            icon: 'straighten',
            color: 'orange',
            order: 4,
            parameters: {
              maxDimension: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Dimension',
                description: 'Largest dimension value to use',
                min: 10,
                max: 50,
                required: true,
                slider: true,
                presets: [15, 20, 25, 30],
                order: 1
              }),
              allowDecimals: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Decimal Dimensions',
                description: 'Include decimal measurements',
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
            color: 'teal',
            order: 5,
            parameters: {
              showVisualDiagrams: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Visual Diagrams',
                description: 'Include 3D shape diagrams with measurements',
                helpText: 'Helps students visualize the shapes',
                order: 1
              }),
              show3DPerspective: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show 3D Perspective',
                description: 'Draw shapes in 3D perspective view',
                helpText: 'More realistic but may be complex',
                dependsOn: 'showVisualDiagrams',
                order: 2
              }),
              showNetDiagrams: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Net Diagrams',
                description: 'Include 2D nets (unfolded shapes) for surface area',
                helpText: 'Helpful for understanding surface area',
                dependsOn: 'showVisualDiagrams',
                order: 3
              }),
              showFormulas: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Formulas',
                description: 'Display relevant formulas in solutions',
                helpText: 'Educational reference for students',
                order: 4
              }),
              diagramSize: schemaV2.createParameter({
                type: 'select',
                label: 'Diagram Size',
                description: 'Size of the 3D diagrams',
                options: [
                  { value: 'small', label: 'Small', description: '250×200px' },
                  { value: 'medium', label: 'Medium', description: '350×280px' },
                  { value: 'large', label: 'Large', description: '450×360px' }
                ],
                dependsOn: 'showVisualDiagrams',
                order: 5
              })
            }
          })
        },
        
        presets: [
          schemaV2.createPreset({
            id: 'basic-prisms',
            label: 'Basic Prisms',
            description: 'Focus on rectangular and triangular prisms',
            icon: 'crop_din',
            category: 'shapes',
            values: {
              problemCount: 8,
              includeRectangularPrisms: true,
              includeCubes: true,
              includeTriangularPrisms: true,
              includeCylinders: false,
              includeCones: false,
              includeSpheres: false,
              includePyramids: false,
              includeCompositeShapes: false,
              includeWordProblems: true,
              calculateVolume: true,
              calculateSurfaceArea: true,
              maxDimension: 15,
              allowDecimals: false,
              units: 'mixed',
              showFormulas: true,
              showVisualDiagrams: true,
              show3DPerspective: true,
              showNetDiagrams: true,
              diagramSize: 'large',
              complexityLevel: 'basic'
            }
          }),
          
          schemaV2.createPreset({
            id: 'curved-shapes',
            label: 'Curved 3D Shapes',
            description: 'Cylinders, cones, and spheres',
            icon: 'radio_button_unchecked',
            category: 'shapes',
            values: {
              problemCount: 6,
              includeRectangularPrisms: false,
              includeCubes: false,
              includeTriangularPrisms: false,
              includeCylinders: true,
              includeCones: true,
              includeSpheres: true,
              includePyramids: false,
              includeCompositeShapes: false,
              includeWordProblems: false,
              calculateVolume: true,
              calculateSurfaceArea: true,
              maxDimension: 20,
              allowDecimals: true,
              decimalPlaces: 2,
              units: 'metric',
              showFormulas: true,
              showVisualDiagrams: true,
              show3DPerspective: true,
              showNetDiagrams: false,
              diagramSize: 'large',
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'volume-only',
            label: 'Volume Focus',
            description: 'Focus only on volume calculations',
            icon: 'inbox',
            category: 'calculation',
            values: {
              problemCount: 10,
              includeRectangularPrisms: true,
              includeCubes: true,
              includeTriangularPrisms: true,
              includeCylinders: true,
              includeCones: true,
              includeSpheres: true,
              includePyramids: true,
              includeCompositeShapes: false,
              includeWordProblems: true,
              calculateVolume: true,
              calculateSurfaceArea: false,
              maxDimension: 18,
              allowDecimals: true,
              decimalPlaces: 1,
              units: 'mixed',
              showFormulas: true,
              showVisualDiagrams: true,
              show3DPerspective: true,
              showNetDiagrams: false,
              diagramSize: 'medium',
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'surface-area-focus',
            label: 'Surface Area Focus',
            description: 'Focus only on surface area calculations',
            icon: 'texture',
            category: 'calculation',
            values: {
              problemCount: 8,
              includeRectangularPrisms: true,
              includeCubes: true,
              includeTriangularPrisms: true,
              includeCylinders: true,
              includeCones: false,
              includeSpheres: true,
              includePyramids: true,
              includeCompositeShapes: false,
              includeWordProblems: false,
              calculateVolume: false,
              calculateSurfaceArea: true,
              maxDimension: 16,
              allowDecimals: false,
              units: 'metric',
              showFormulas: true,
              showVisualDiagrams: true,
              show3DPerspective: false,
              showNetDiagrams: true,
              diagramSize: 'large',
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive-3d',
            label: 'Comprehensive 3D Geometry',
            description: 'All shapes with both volume and surface area',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 12,
              includeRectangularPrisms: true,
              includeCubes: true,
              includeTriangularPrisms: true,
              includeCylinders: true,
              includeCones: true,
              includeSpheres: true,
              includePyramids: true,
              includeCompositeShapes: true,
              includeWordProblems: true,
              calculateVolume: true,
              calculateSurfaceArea: true,
              maxDimension: 25,
              allowDecimals: true,
              decimalPlaces: 2,
              units: 'mixed',
              showFormulas: true,
              showVisualDiagrams: true,
              show3DPerspective: true,
              showNetDiagrams: false,
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
    
    // Validation: at least one calculation type must be enabled
    if (!params.calculateVolume && !params.calculateSurfaceArea) {
      throw new Error('At least one calculation type (volume or surface area) must be enabled')
    }
    
    const shapeTypes = []
    if (params.includeRectangularPrisms) shapeTypes.push('rectangularPrism')
    if (params.includeCubes) shapeTypes.push('cube')
    if (params.includeTriangularPrisms) shapeTypes.push('triangularPrism')
    if (params.includeCylinders) shapeTypes.push('cylinder')
    if (params.includeCones) shapeTypes.push('cone')
    if (params.includeSpheres) shapeTypes.push('sphere')
    if (params.includePyramids) shapeTypes.push('pyramid')
    if (params.includeCompositeShapes) shapeTypes.push('composite')
    if (params.includeWordProblems) shapeTypes.push('wordProblem')
    
    if (shapeTypes.length === 0) shapeTypes.push('rectangularPrism')
    
    const shapeType = this.getRandomElement(shapeTypes)
    return this.generate3DProblem(shapeType, params)
  }

  generate3DProblem(shapeType, params) {
    switch (shapeType) {
      case 'rectangularPrism':
        return this.generateRectangularPrismProblem(params)
      case 'cube':
        return this.generateCubeProblem(params)
      case 'triangularPrism':
        return this.generateTriangularPrismProblem(params)
      case 'cylinder':
        return this.generateCylinderProblem(params)
      case 'cone':
        return this.generateConeProblem(params)
      case 'sphere':
        return this.generateSphereProblem(params)
      case 'pyramid':
        return this.generatePyramidProblem(params)
      case 'composite':
        return this.generateCompositeShapeProblem(params)
      case 'wordProblem':
        return this.generateWordProblem(params)
      default:
        return this.generateRectangularPrismProblem(params)
    }
  }
  
  generateRectangularPrismProblem(params) {
    const length = this.generateDimension(params)
    const width = this.generateDimension(params)
    const height = this.generateDimension(params)
    const unit = this.getRandomUnit(params.units)
    
    const volume = length * width * height
    const surfaceArea = 2 * (length * width + length * height + width * height)
    
    const steps = []
    const calculations = []
    
    if (params.calculateVolume) {
      if (params.showFormulas) {
        steps.push(`\\text{Volume formula: } V = l \\times w \\times h`)
      }
      steps.push(`V = ${length} \\times ${width} \\times ${height}`)
      steps.push(`V = ${this.formatNumber(volume, params)} \\text{ ${unit}}^3`)
      calculations.push(`V = ${this.formatNumber(volume, params)} ${unit}³`)
    }
    
    if (params.calculateSurfaceArea) {
      if (params.showFormulas) {
        steps.push(`\\text{Surface area formula: } SA = 2(lw + lh + wh)`)
      }
      steps.push(`SA = 2(${length} \\times ${width} + ${length} \\times ${height} + ${width} \\times ${height})`)
      steps.push(`SA = 2(${length * width} + ${length * height} + ${width * height})`)
      steps.push(`SA = 2(${length * width + length * height + width * height})`)
      steps.push(`SA = ${this.formatNumber(surfaceArea, params)} \\text{ ${unit}}^2`)
      calculations.push(`SA = ${this.formatNumber(surfaceArea, params)} ${unit}²`)
    }
    
    const diagram = this.create3DDiagram('rectangularPrism', { length, width, height }, params)
    
    return {
      question: `Find the ${this.getCalculationText(params)} of a rectangular prism with length ${length} ${unit}, width ${width} ${unit}, and height ${height} ${unit}.`,
      questionLaTeX: `\\text{Find the ${this.getCalculationText(params)} of a rectangular prism with length ${length} ${unit}, width ${width} ${unit}, and height ${height} ${unit}.}`,
      answer: calculations.join(', '),
      answerLaTeX: calculations.join(', ').replace(/²/g, '^2').replace(/³/g, '^3'),
      steps: steps,
      diagram: diagram,
      metadata: {
        problemType: 'rectangularPrism',
        dimensions: { length, width, height },
        volume: volume,
        surfaceArea: surfaceArea,
        unit: unit,
        difficulty: 'medium',
        estimatedTime: '3 minutes'
      }
    }
  }
  
  generateCubeProblem(params) {
    const side = this.generateDimension(params)
    const unit = this.getRandomUnit(params.units)
    
    const volume = side * side * side
    const surfaceArea = 6 * side * side
    
    const steps = []
    const calculations = []
    
    if (params.calculateVolume) {
      if (params.showFormulas) {
        steps.push(`\\text{Volume formula: } V = s^3`)
      }
      steps.push(`V = ${side}^3`)
      steps.push(`V = ${this.formatNumber(volume, params)} \\text{ ${unit}}^3`)
      calculations.push(`V = ${this.formatNumber(volume, params)} ${unit}³`)
    }
    
    if (params.calculateSurfaceArea) {
      if (params.showFormulas) {
        steps.push(`\\text{Surface area formula: } SA = 6s^2`)
      }
      steps.push(`SA = 6 \\times ${side}^2`)
      steps.push(`SA = 6 \\times ${side * side}`)
      steps.push(`SA = ${this.formatNumber(surfaceArea, params)} \\text{ ${unit}}^2`)
      calculations.push(`SA = ${this.formatNumber(surfaceArea, params)} ${unit}²`)
    }
    
    const diagram = this.create3DDiagram('cube', { side }, params)
    
    return {
      question: `Find the ${this.getCalculationText(params)} of a cube with side length ${side} ${unit}.`,
      questionLaTeX: `\\text{Find the ${this.getCalculationText(params)} of a cube with side length ${side} ${unit}.}`,
      answer: calculations.join(', '),
      answerLaTeX: calculations.join(', ').replace(/²/g, '^2').replace(/³/g, '^3'),
      steps: steps,
      diagram: diagram,
      metadata: {
        problemType: 'cube',
        dimensions: { side },
        volume: volume,
        surfaceArea: surfaceArea,
        unit: unit,
        difficulty: 'easy',
        estimatedTime: '2 minutes'
      }
    }
  }
  
  generateCylinderProblem(params) {
    const radius = this.generateDimension(params, 2, Math.floor(params.maxDimension * 0.6))
    const height = this.generateDimension(params)
    const unit = this.getRandomUnit(params.units)
    
    const volume = Math.PI * radius * radius * height
    const surfaceArea = 2 * Math.PI * radius * radius + 2 * Math.PI * radius * height
    
    const steps = []
    const calculations = []
    
    if (params.calculateVolume) {
      if (params.showFormulas) {
        steps.push(`\\text{Volume formula: } V = \\pi r^2 h`)
      }
      steps.push(`V = \\pi \\times ${radius}^2 \\times ${height}`)
      steps.push(`V = \\pi \\times ${radius * radius} \\times ${height}`)
      steps.push(`V = ${radius * radius * height}\\pi`)
      steps.push(`V = ${this.formatNumber(volume, params)} \\text{ ${unit}}^3`)
      calculations.push(`V = ${this.formatNumber(volume, params)} ${unit}³`)
    }
    
    if (params.calculateSurfaceArea) {
      if (params.showFormulas) {
        steps.push(`\\text{Surface area formula: } SA = 2\\pi r^2 + 2\\pi rh`)
      }
      steps.push(`SA = 2\\pi \\times ${radius}^2 + 2\\pi \\times ${radius} \\times ${height}`)
      steps.push(`SA = 2\\pi \\times ${radius * radius} + 2\\pi \\times ${radius * height}`)
      steps.push(`SA = ${2 * radius * radius}\\pi + ${2 * radius * height}\\pi`)
      steps.push(`SA = ${2 * radius * radius + 2 * radius * height}\\pi`)
      steps.push(`SA = ${this.formatNumber(surfaceArea, params)} \\text{ ${unit}}^2`)
      calculations.push(`SA = ${this.formatNumber(surfaceArea, params)} ${unit}²`)
    }
    
    const diagram = this.create3DDiagram('cylinder', { radius, height }, params)
    
    return {
      question: `Find the ${this.getCalculationText(params)} of a cylinder with radius ${radius} ${unit} and height ${height} ${unit}.`,
      questionLaTeX: `\\text{Find the ${this.getCalculationText(params)} of a cylinder with radius ${radius} ${unit} and height ${height} ${unit}.}`,
      answer: calculations.join(', '),
      answerLaTeX: calculations.join(', ').replace(/²/g, '^2').replace(/³/g, '^3'),
      steps: steps,
      diagram: diagram,
      metadata: {
        problemType: 'cylinder',
        dimensions: { radius, height },
        volume: volume,
        surfaceArea: surfaceArea,
        unit: unit,
        difficulty: 'medium',
        estimatedTime: '4 minutes'
      }
    }
  }
  
  generateSphereProblem(params) {
    const radius = this.generateDimension(params, 2, Math.floor(params.maxDimension * 0.7))
    const unit = this.getRandomUnit(params.units)
    
    const volume = (4/3) * Math.PI * radius * radius * radius
    const surfaceArea = 4 * Math.PI * radius * radius
    
    const steps = []
    const calculations = []
    
    if (params.calculateVolume) {
      if (params.showFormulas) {
        steps.push(`\\text{Volume formula: } V = \\frac{4}{3}\\pi r^3`)
      }
      steps.push(`V = \\frac{4}{3}\\pi \\times ${radius}^3`)
      steps.push(`V = \\frac{4}{3}\\pi \\times ${radius * radius * radius}`)
      steps.push(`V = \\frac{${4 * radius * radius * radius}}{3}\\pi`)
      steps.push(`V = ${this.formatNumber(volume, params)} \\text{ ${unit}}^3`)
      calculations.push(`V = ${this.formatNumber(volume, params)} ${unit}³`)
    }
    
    if (params.calculateSurfaceArea) {
      if (params.showFormulas) {
        steps.push(`\\text{Surface area formula: } SA = 4\\pi r^2`)
      }
      steps.push(`SA = 4\\pi \\times ${radius}^2`)
      steps.push(`SA = 4\\pi \\times ${radius * radius}`)
      steps.push(`SA = ${4 * radius * radius}\\pi`)
      steps.push(`SA = ${this.formatNumber(surfaceArea, params)} \\text{ ${unit}}^2`)
      calculations.push(`SA = ${this.formatNumber(surfaceArea, params)} ${unit}²`)
    }
    
    const diagram = this.create3DDiagram('sphere', { radius }, params)
    
    return {
      question: `Find the ${this.getCalculationText(params)} of a sphere with radius ${radius} ${unit}.`,
      questionLaTeX: `\\text{Find the ${this.getCalculationText(params)} of a sphere with radius ${radius} ${unit}.}`,
      answer: calculations.join(', '),
      answerLaTeX: calculations.join(', ').replace(/²/g, '^2').replace(/³/g, '^3'),
      steps: steps,
      diagram: diagram,
      metadata: {
        problemType: 'sphere',
        dimensions: { radius },
        volume: volume,
        surfaceArea: surfaceArea,
        unit: unit,
        difficulty: 'medium',
        estimatedTime: '3 minutes'
      }
    }
  }
  
  generateWordProblem(params) {
    const scenarios = [
      {
        type: 'swimming_pool',
        setup: () => {
          const length = this.getRandomNumber(8, 15)
          const width = this.getRandomNumber(5, 10)
          const depth = this.getRandomNumber(1, 3)
          const volume = length * width * depth
          return {
            question: `A rectangular swimming pool is ${length} meters long, ${width} meters wide, and ${depth} meters deep. How many cubic meters of water does it hold when full?`,
            answer: volume,
            unit: 'm',
            calculation: 'volume',
            steps: [
              `\\text{Pool volume = length × width × depth}`,
              `V = ${length} \\times ${width} \\times ${depth}`,
              `V = ${volume} \\text{ cubic meters}`
            ]
          }
        }
      },
      {
        type: 'paint_can',
        setup: () => {
          const radius = this.getRandomNumber(4, 8)
          const height = this.getRandomNumber(10, 18)
          const volume = Math.PI * radius * radius * height
          return {
            question: `A cylindrical paint can has a radius of ${radius} cm and height of ${height} cm. What is its volume?`,
            answer: volume,
            unit: 'cm',
            calculation: 'volume',
            steps: [
              `\\text{Cylinder volume = } \\pi r^2 h`,
              `V = \\pi \\times ${radius}^2 \\times ${height}`,
              `V = ${radius * radius * height}\\pi \\text{ cubic cm}`
            ]
          }
        }
      },
      {
        type: 'gift_box',
        setup: () => {
          const side = this.getRandomNumber(6, 12)
          const surfaceArea = 6 * side * side
          return {
            question: `A cubic gift box has sides of ${side} inches. How much wrapping paper is needed to cover the entire box?`,
            answer: surfaceArea,
            unit: 'in',
            calculation: 'surfaceArea',
            steps: [
              `\\text{Cube surface area = } 6s^2`,
              `SA = 6 \\times ${side}^2`,
              `SA = 6 \\times ${side * side}`,
              `SA = ${surfaceArea} \\text{ square inches}`
            ]
          }
        }
      }
    ]
    
    const scenario = this.getRandomElement(scenarios)
    const problem = scenario.setup()
    
    const finalAnswer = `${this.formatNumber(problem.answer, params)} ${problem.unit}${problem.calculation === 'volume' ? '³' : '²'}`
    
    return {
      question: problem.question,
      questionLaTeX: `\\text{${problem.question}}`,
      answer: finalAnswer,
      answerLaTeX: finalAnswer.replace(/²/g, '^2').replace(/³/g, '^3'),
      steps: problem.steps,
      metadata: {
        problemType: 'wordProblem',
        scenario: scenario.type,
        calculation: problem.calculation,
        difficulty: 'medium',
        estimatedTime: '4 minutes'
      }
    }
  }
  
  generateTriangularPrismProblem(params) {
    const base = this.generateDimension(params)
    const height = this.generateDimension(params)
    const length = this.generateDimension(params)
    const unit = this.getRandomUnit(params.units)
    
    const baseArea = (base * height) / 2
    const volume = baseArea * length
    const surfaceArea = 2 * baseArea + base * length + height * length + Math.sqrt(base*base + height*height) * length
    
    const steps = []
    const calculations = []
    
    if (params.calculateVolume) {
      if (params.showFormulas) {
        steps.push(`\\text{Volume formula: } V = B \\times h \\text{ where B is base area}`)
      }
      steps.push(`\\text{Triangle base area: } B = \\frac{1}{2} \\times ${base} \\times ${height} = ${baseArea}`)
      steps.push(`V = ${baseArea} \\times ${length} = ${this.formatNumber(volume, params)}`)
      calculations.push(`V = ${this.formatNumber(volume, params)} ${unit}³`)
    }
    
    if (params.calculateSurfaceArea) {
      if (params.showFormulas) {
        steps.push(`\\text{Surface area: } SA = 2B + \\text{perimeter} \\times \\text{length}`)
      }
      calculations.push(`SA = ${this.formatNumber(surfaceArea, params)} ${unit}²`)
    }
    
    const diagram = this.create3DDiagram('triangularPrism', { base, height, length }, params)
    
    return {
      question: `Find the ${this.getCalculationText(params)} of a triangular prism with triangle base ${base} ${unit}, height ${height} ${unit}, and length ${length} ${unit}.`,
      questionLaTeX: `\\text{Find the ${this.getCalculationText(params)} of a triangular prism with triangle base ${base} ${unit}, height ${height} ${unit}, and length ${length} ${unit}.}`,
      answer: calculations.join(', '),
      answerLaTeX: calculations.join(', ').replace(/²/g, '^2').replace(/³/g, '^3'),
      steps: steps,
      diagram: diagram,
      metadata: {
        problemType: 'triangularPrism',
        dimensions: { base, height, length },
        volume: volume,
        surfaceArea: surfaceArea,
        unit: unit,
        difficulty: 'hard',
        estimatedTime: '5 minutes'
      }
    }
  }
  
  generateConeProblem(params) {
    const radius = this.generateDimension(params, 2, Math.floor(params.maxDimension * 0.6))
    const height = this.generateDimension(params)
    const unit = this.getRandomUnit(params.units)
    
    const slantHeight = Math.sqrt(radius * radius + height * height)
    const volume = (1/3) * Math.PI * radius * radius * height
    const surfaceArea = Math.PI * radius * radius + Math.PI * radius * slantHeight
    
    const steps = []
    const calculations = []
    
    if (params.calculateVolume) {
      if (params.showFormulas) {
        steps.push(`\\text{Volume formula: } V = \\frac{1}{3}\\pi r^2 h`)
      }
      steps.push(`V = \\frac{1}{3}\\pi \\times ${radius}^2 \\times ${height}`)
      steps.push(`V = \\frac{1}{3}\\pi \\times ${radius * radius} \\times ${height}`)
      steps.push(`V = ${this.formatNumber(volume, params)} \\text{ ${unit}}^3`)
      calculations.push(`V = ${this.formatNumber(volume, params)} ${unit}³`)
    }
    
    if (params.calculateSurfaceArea) {
      if (params.showFormulas) {
        steps.push(`\\text{Surface area: } SA = \\pi r^2 + \\pi r l \\text{ where l is slant height}`)
      }
      steps.push(`\\text{Slant height: } l = \\sqrt{r^2 + h^2} = \\sqrt{${radius}^2 + ${height}^2} = ${this.formatNumber(slantHeight, params)}`)
      steps.push(`SA = \\pi \\times ${radius}^2 + \\pi \\times ${radius} \\times ${this.formatNumber(slantHeight, params)}`)
      calculations.push(`SA = ${this.formatNumber(surfaceArea, params)} ${unit}²`)
    }
    
    const diagram = this.create3DDiagram('cone', { radius, height, slantHeight }, params)
    
    return {
      question: `Find the ${this.getCalculationText(params)} of a cone with radius ${radius} ${unit} and height ${height} ${unit}.`,
      questionLaTeX: `\\text{Find the ${this.getCalculationText(params)} of a cone with radius ${radius} ${unit} and height ${height} ${unit}.}`,
      answer: calculations.join(', '),
      answerLaTeX: calculations.join(', ').replace(/²/g, '^2').replace(/³/g, '^3'),
      steps: steps,
      diagram: diagram,
      metadata: {
        problemType: 'cone',
        dimensions: { radius, height, slantHeight },
        volume: volume,
        surfaceArea: surfaceArea,
        unit: unit,
        difficulty: 'hard',
        estimatedTime: '5 minutes'
      }
    }
  }
  
  generatePyramidProblem(params) {
    const baseLength = this.generateDimension(params)
    const baseWidth = this.generateDimension(params)
    const height = this.generateDimension(params)
    const unit = this.getRandomUnit(params.units)
    
    const baseArea = baseLength * baseWidth
    const volume = (1/3) * baseArea * height
    
    // Simplified surface area calculation for rectangular pyramid
    const slantHeight1 = Math.sqrt((baseWidth/2) * (baseWidth/2) + height * height)
    const slantHeight2 = Math.sqrt((baseLength/2) * (baseLength/2) + height * height)
    const surfaceArea = baseArea + 2 * (0.5 * baseLength * slantHeight1) + 2 * (0.5 * baseWidth * slantHeight2)
    
    const steps = []
    const calculations = []
    
    if (params.calculateVolume) {
      if (params.showFormulas) {
        steps.push(`\\text{Volume formula: } V = \\frac{1}{3}Bh \\text{ where B is base area}`)
      }
      steps.push(`\\text{Base area: } B = ${baseLength} \\times ${baseWidth} = ${baseArea}`)
      steps.push(`V = \\frac{1}{3} \\times ${baseArea} \\times ${height} = ${this.formatNumber(volume, params)}`)
      calculations.push(`V = ${this.formatNumber(volume, params)} ${unit}³`)
    }
    
    if (params.calculateSurfaceArea) {
      if (params.showFormulas) {
        steps.push(`\\text{Surface area: } SA = \\text{base area} + \\text{lateral area}`)
      }
      calculations.push(`SA = ${this.formatNumber(surfaceArea, params)} ${unit}²`)
    }
    
    const diagram = this.create3DDiagram('pyramid', { baseLength, baseWidth, height }, params)
    
    return {
      question: `Find the ${this.getCalculationText(params)} of a rectangular pyramid with base ${baseLength}×${baseWidth} ${unit} and height ${height} ${unit}.`,
      questionLaTeX: `\\text{Find the ${this.getCalculationText(params)} of a rectangular pyramid with base ${baseLength}×${baseWidth} ${unit} and height ${height} ${unit}.}`,
      answer: calculations.join(', '),
      answerLaTeX: calculations.join(', ').replace(/²/g, '^2').replace(/³/g, '^3'),
      steps: steps,
      diagram: diagram,
      metadata: {
        problemType: 'pyramid',
        dimensions: { baseLength, baseWidth, height },
        volume: volume,
        surfaceArea: surfaceArea,
        unit: unit,
        difficulty: 'hard',
        estimatedTime: '6 minutes'
      }
    }
  }
  
  generateCompositeShapeProblem(params) {
    // Create composite 3D shape: cylinder + hemisphere
    const radius = this.generateDimension(params, 3, Math.floor(params.maxDimension * 0.5))
    const cylinderHeight = this.generateDimension(params)
    const unit = this.getRandomUnit(params.units)
    
    const cylinderVolume = Math.PI * radius * radius * cylinderHeight
    const hemisphereVolume = (2/3) * Math.PI * radius * radius * radius
    const totalVolume = cylinderVolume + hemisphereVolume
    
    const cylinderSA = 2 * Math.PI * radius * radius + 2 * Math.PI * radius * cylinderHeight
    const hemisphereSA = 2 * Math.PI * radius * radius // half of sphere
    const totalSA = cylinderSA + hemisphereSA - Math.PI * radius * radius // subtract overlapping base
    
    const steps = []
    const calculations = []
    
    if (params.calculateVolume) {
      steps.push(`\\text{Composite: Cylinder + Hemisphere}`)
      steps.push(`\\text{Cylinder volume: } V_1 = \\pi r^2 h = \\pi \\times ${radius}^2 \\times ${cylinderHeight} = ${this.formatNumber(cylinderVolume, params)}`)
      steps.push(`\\text{Hemisphere volume: } V_2 = \\frac{2}{3}\\pi r^3 = \\frac{2}{3}\\pi \\times ${radius}^3 = ${this.formatNumber(hemisphereVolume, params)}`)
      steps.push(`\\text{Total volume: } ${this.formatNumber(cylinderVolume, params)} + ${this.formatNumber(hemisphereVolume, params)} = ${this.formatNumber(totalVolume, params)}`)
      calculations.push(`V = ${this.formatNumber(totalVolume, params)} ${unit}³`)
    }
    
    if (params.calculateSurfaceArea) {
      calculations.push(`SA = ${this.formatNumber(totalSA, params)} ${unit}²`)
    }
    
    const diagram = this.create3DDiagram('composite', { radius, cylinderHeight }, params)
    
    return {
      question: `Find the ${this.getCalculationText(params)} of a composite shape made of a cylinder (radius ${radius} ${unit}, height ${cylinderHeight} ${unit}) with a hemisphere on top.`,
      questionLaTeX: `\\text{Find the ${this.getCalculationText(params)} of a composite shape made of a cylinder (radius ${radius} ${unit}, height ${cylinderHeight} ${unit}) with a hemisphere on top.}`,
      answer: calculations.join(', '),
      answerLaTeX: calculations.join(', ').replace(/²/g, '^2').replace(/³/g, '^3'),
      steps: steps,
      diagram: diagram,
      metadata: {
        problemType: 'composite',
        dimensions: { radius, cylinderHeight },
        volume: totalVolume,
        surfaceArea: totalSA,
        unit: unit,
        difficulty: 'advanced',
        estimatedTime: '7 minutes'
      }
    }
  }
  
  // Helper methods for diagram creation
  create3DDiagram(shapeType, dimensions, params) {
    if (!params.showVisualDiagrams) return null
    
    const size = getDiagramSize(params.diagramSize)
    return {
      type: 'geometry-renderer',
      shape: shapeType,
      measurements: dimensions,
      unit: 'units',
      config: {
        width: size.width,
        height: size.height,
        theme: 'educational',
        showMeasurements: true,
        showLabels: true,
        showGrid: false,
        center: true,
        show3DPerspective: params.show3DPerspective,
        showNetDiagram: params.showNetDiagrams
      },
      svgId: `3d-${shapeType}-${Date.now()}`
    }
  }
  
  // Helper methods
  generateDimension(params, minOverride = null, maxOverride = null) {
    const min = minOverride || params.minDimension
    const max = maxOverride || params.maxDimension
    
    if (params.allowDecimals) {
      const dimension = min + Math.random() * (max - min)
      return Number(dimension.toFixed(1))
    } else {
      return this.getRandomNumber(min, max)
    }
  }
  
  formatNumber(value, params) {
    if (params.allowDecimals) {
      return value.toFixed(params.decimalPlaces)
    } else {
      return Math.round(value).toString()
    }
  }
  
  getCalculationText(params) {
    if (params.calculateVolume && params.calculateSurfaceArea) {
      return 'volume and surface area'
    } else if (params.calculateVolume) {
      return 'volume'
    } else {
      return 'surface area'
    }
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

export default VolumeSurfaceAreaGenerator