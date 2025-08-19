import { BaseGenerator } from '../BaseGenerator.js'
import { ParameterSchemaV2 } from '../ParameterSchemaV2.js'

/**
 * Proportions Generator
 * 
 * Generates problems involving proportions, cross products, similar figures,
 * and real-world applications of proportional relationships.
 */
export class ProportionsGenerator extends BaseGenerator {
  constructor() {
    const schemaV2 = new ParameterSchemaV2()
    
    super({
      name: 'Proportions',
      description: 'Solve proportions using cross products and apply proportional reasoning',
      category: 'pre-algebra',
      difficulty: 'medium',
      icon: 'balance',
      tags: ['proportions', 'cross products', 'similar figures', 'ratios'],
      gradeLevel: '7-9',
      estimatedTime: '60 seconds',
      exampleProblem: {
        question: 'Solve the proportion: x/4 = 6/8',
        questionLaTeX: '\\text{Solve the proportion: } \\frac{x}{4} = \\frac{6}{8}',
        answer: 'x = 3',
        answerLaTeX: 'x = 3'
      },
      
      // Default parameter values
      defaultParameters: {
        problemCount: 10,
        includeSolvingProportions: true,
        includeSimilarFigures: true,
        includeWordProblems: true,
        includeScaling: true,
        includeMaps: false,
        includeUnitRates: true,
        allowDecimals: false,
        allowFractions: true,
        maxValue: 20,
        maxSolutionValue: 15,
        showSteps: true,
        showCrossProducts: true,
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
                description: 'How many proportion problems to generate',
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
                description: 'Determines the difficulty of proportions',
                variant: 'cards',
                options: [
                  { 
                    value: 'basic', 
                    label: 'Basic',
                    description: 'Simple whole number proportions'
                  },
                  { 
                    value: 'intermediate', 
                    label: 'Intermediate',
                    description: 'Mixed numbers and decimal proportions'
                  },
                  { 
                    value: 'advanced', 
                    label: 'Advanced',
                    description: 'Complex applications and multi-step problems'
                  }
                ],
                order: 2
              })
            }
          }),
          
          problemTypes: schemaV2.createCategory({
            id: 'problemTypes',
            label: 'Problem Types',
            description: 'Choose which types of proportion problems to include',
            icon: 'balance',
            color: 'green',
            order: 2,
            parameters: {
              includeSolvingProportions: schemaV2.createParameter({
                type: 'boolean',
                label: 'Solving Proportions',
                description: 'Basic proportion solving with cross products',
                helpText: 'Examples: x/3 = 4/6, solve for x',
                order: 1
              }),
              includeSimilarFigures: schemaV2.createParameter({
                type: 'boolean',
                label: 'Similar Figures',
                description: 'Use proportions to find missing sides',
                helpText: 'Triangle and rectangle similarity problems',
                order: 2
              }),
              includeScaling: schemaV2.createParameter({
                type: 'boolean',
                label: 'Scaling Problems',
                description: 'Scale drawings and model problems',
                helpText: 'Examples: blueprints, models, enlargements',
                order: 3
              }),
              includeMaps: schemaV2.createParameter({
                type: 'boolean',
                label: 'Map Scale Problems',
                description: 'Distance problems using map scales',
                helpText: 'Calculate real distances from map measurements',
                order: 4
              }),
              includeUnitRates: schemaV2.createParameter({
                type: 'boolean',
                label: 'Unit Rate Applications',
                description: 'Speed, pricing, and rate problems',
                helpText: 'Connect proportions to unit rates',
                order: 5
              })
            }
          }),
          
          numberSettings: schemaV2.createCategory({
            id: 'numberSettings',
            label: 'Number Settings',
            description: 'Configure the types and ranges of numbers used',
            icon: 'tag',
            color: 'orange',
            order: 3,
            parameters: {
              maxValue: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Value',
                description: 'Largest number to use in proportions',
                min: 10,
                max: 50,
                required: true,
                slider: true,
                presets: [15, 20, 25, 30],
                order: 1
              }),
              maxSolutionValue: schemaV2.createParameter({
                type: 'number',
                label: 'Maximum Solution Value',
                description: 'Largest possible solution value',
                min: 5,
                max: 30,
                required: true,
                slider: true,
                presets: [10, 12, 15, 20],
                order: 2
              }),
              allowFractions: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Fractions',
                description: 'Include fractional values in proportions',
                helpText: 'Examples: 1/2, 3/4, 5/6',
                order: 3
              }),
              allowDecimals: schemaV2.createParameter({
                type: 'boolean',
                label: 'Allow Decimals',
                description: 'Include decimal values in proportions',
                helpText: 'Examples: 2.5, 1.25, 0.75',
                order: 4
              })
            }
          }),
          
          presentation: schemaV2.createCategory({
            id: 'presentation',
            label: 'Presentation & Format',
            description: 'Control how problems are displayed',
            icon: 'palette',
            color: 'teal',
            order: 4,
            parameters: {
              includeWordProblems: schemaV2.createParameter({
                type: 'boolean',
                label: 'Include Word Problems',
                description: 'Include real-world proportion applications',
                helpText: 'Recipe scaling, similar triangles, etc.',
                order: 1
              }),
              showCrossProducts: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Cross Products',
                description: 'Show cross multiplication method',
                helpText: 'Display the cross multiplication step',
                order: 2
              }),
              showSteps: schemaV2.createParameter({
                type: 'boolean',
                label: 'Show Solution Steps',
                description: 'Include step-by-step solving process',
                helpText: 'Shows complete solution method',
                order: 3
              })
            }
          })
        },
        
        // Preset configurations for quick setup
        presets: [
          schemaV2.createPreset({
            id: 'basic-proportions',
            label: 'Basic Proportions',
            description: 'Simple proportion solving with whole numbers',
            icon: 'looks_one',
            category: 'difficulty',
            values: {
              problemCount: 10,
              includeSolvingProportions: true,
              includeSimilarFigures: false,
              includeWordProblems: false,
              includeScaling: false,
              includeMaps: false,
              includeUnitRates: false,
              allowDecimals: false,
              allowFractions: false,
              maxValue: 15,
              maxSolutionValue: 10,
              showSteps: true,
              showCrossProducts: true,
              complexityLevel: 'basic'
            }
          }),
          
          schemaV2.createPreset({
            id: 'similar-figures',
            label: 'Similar Figures',
            description: 'Focus on geometric similarity problems',
            icon: 'crop_free',
            category: 'scope',
            values: {
              problemCount: 8,
              includeSolvingProportions: false,
              includeSimilarFigures: true,
              includeWordProblems: true,
              includeScaling: true,
              includeMaps: false,
              includeUnitRates: false,
              allowDecimals: false,
              allowFractions: true,
              maxValue: 20,
              maxSolutionValue: 15,
              showSteps: true,
              showCrossProducts: true,
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'real-world-applications',
            label: 'Real-World Applications',
            description: 'Practical proportion problems',
            icon: 'business',
            category: 'scope',
            values: {
              problemCount: 10,
              includeSolvingProportions: false,
              includeSimilarFigures: false,
              includeWordProblems: true,
              includeScaling: true,
              includeMaps: true,
              includeUnitRates: true,
              allowDecimals: true,
              allowFractions: false,
              maxValue: 25,
              maxSolutionValue: 20,
              showSteps: true,
              showCrossProducts: false,
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'with-fractions',
            label: 'With Fractions',
            description: 'Proportion problems involving fractions',
            icon: 'call_split',
            category: 'difficulty',
            values: {
              problemCount: 8,
              includeSolvingProportions: true,
              includeSimilarFigures: true,
              includeWordProblems: false,
              includeScaling: false,
              includeMaps: false,
              includeUnitRates: false,
              allowDecimals: false,
              allowFractions: true,
              maxValue: 12,
              maxSolutionValue: 10,
              showSteps: true,
              showCrossProducts: true,
              complexityLevel: 'intermediate'
            }
          }),
          
          schemaV2.createPreset({
            id: 'comprehensive-proportions',
            label: 'Comprehensive Practice',
            description: 'Complete practice with all proportion concepts',
            icon: 'all_inclusive',
            category: 'scope',
            values: {
              problemCount: 15,
              includeSolvingProportions: true,
              includeSimilarFigures: true,
              includeWordProblems: true,
              includeScaling: true,
              includeMaps: false,
              includeUnitRates: true,
              allowDecimals: false,
              allowFractions: true,
              maxValue: 20,
              maxSolutionValue: 15,
              showSteps: true,
              showCrossProducts: true,
              complexityLevel: 'intermediate'
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
    if (!params.includeSolvingProportions && !params.includeSimilarFigures && 
        !params.includeScaling && !params.includeMaps && !params.includeUnitRates) {
      customErrors.push('At least one problem type must be enabled')
    }
    if (customErrors.length > 0) {
      throw new Error(`Invalid parameters: ${customErrors.join(', ')}`)
    }
    
    // Build array of enabled problem types
    const problemTypes = []
    if (params.includeSolvingProportions) problemTypes.push('solving')
    if (params.includeSimilarFigures) problemTypes.push('similarFigures')
    if (params.includeScaling) problemTypes.push('scaling')
    if (params.includeMaps) problemTypes.push('maps')
    if (params.includeUnitRates) problemTypes.push('unitRates')
    
    if (problemTypes.length === 0) {
      throw new Error('At least one problem type must be enabled')
    }
    
    const problemType = this.getRandomElement(problemTypes)
    
    // Determine if this should be a word problem
    if (params.includeWordProblems && ['similarFigures', 'scaling', 'maps', 'unitRates'].includes(problemType) && Math.random() < 0.7) {
      return this.generateWordProblem(problemType, params)
    } else {
      return this.generateProportionProblem(problemType, params)
    }
  }

  /**
   * Generate a proportion problem
   * @param {string} problemType - Type of problem
   * @param {Object} params - Generation parameters
   * @returns {Object} Problem object
   */
  generateProportionProblem(problemType, params) {
    switch (problemType) {
      case 'solving':
        return this.generateSolvingProportion(params)
      case 'similarFigures':
        return this.generateSimilarFiguresProblem(params)
      case 'scaling':
        return this.generateScalingProblem(params)
      case 'maps':
        return this.generateMapProblem(params)
      case 'unitRates':
        return this.generateUnitRateProportion(params)
      default:
        return this.generateSolvingProportion(params)
    }
  }
  
  generateSolvingProportion(params) {
    // Generate a proportion x/a = b/c where x is unknown
    const solution = Math.floor(Math.random() * params.maxSolutionValue) + 1
    const denominator1 = Math.floor(Math.random() * params.maxValue) + 2
    const numerator2 = Math.floor(Math.random() * params.maxValue) + 1
    const denominator2 = Math.floor(Math.random() * params.maxValue) + 2
    
    // Ensure the proportion works: x/denominator1 = numerator2/denominator2
    // So x = (numerator2 * denominator1) / denominator2
    const exactSolution = (numerator2 * denominator1) / denominator2
    
    // If we want integer solutions, adjust
    let actualSolution = exactSolution
    if (!params.allowFractions && !params.allowDecimals) {
      actualSolution = Math.round(exactSolution)
    }
    
    const proportion = `\\frac{x}{${denominator1}} = \\frac{${numerator2}}{${denominator2}}`
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Given proportion: } \\frac{x}{${denominator1}} = \\frac{${numerator2}}{${denominator2}}`)
      
      if (params.showCrossProducts) {
        steps.push(`\\text{Cross multiply: } x \\times ${denominator2} = ${numerator2} \\times ${denominator1}`)
        steps.push(`${denominator2}x = ${numerator2 * denominator1}`)
        steps.push(`\\text{Divide both sides by } ${denominator2}`)
        steps.push(`x = \\frac{${numerator2 * denominator1}}{${denominator2}}`)
      }
      steps.push(`x = ${actualSolution}`)
    }
    
    return {
      question: `Solve the proportion: ${proportion}`,
      questionLaTeX: `\\text{Solve the proportion: } ${proportion}`,
      answer: `x = ${actualSolution}`,
      answerLaTeX: `x = ${actualSolution}`,
      steps: steps,
      metadata: {
        problemType: 'solving',
        proportion: proportion,
        solution: actualSolution,
        values: [denominator1, numerator2, denominator2],
        difficulty: 'medium',
        estimatedTime: '50 seconds'
      }
    }
  }
  
  generateSimilarFiguresProblem(params) {
    // Create similar triangles problem
    const side1 = Math.floor(Math.random() * 8) + 3
    const side2 = Math.floor(Math.random() * 8) + 3
    const scale = Math.floor(Math.random() * 3) + 2
    const side3 = side1 * scale
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Set up proportion for similar triangles}`)
      steps.push(`\\frac{\\text{side 1}}{\\text{corresponding side 1}} = \\frac{\\text{side 2}}{\\text{corresponding side 2}}`)
      steps.push(`\\frac{${side1}}{${side3}} = \\frac{${side2}}{x}`)
      steps.push(`\\text{Cross multiply: } ${side1} \\times x = ${side2} \\times ${side3}`)
      steps.push(`${side1}x = ${side2 * side3}`)
      steps.push(`x = \\frac{${side2 * side3}}{${side1}} = ${(side2 * side3) / side1}`)
    }
    
    const solution = (side2 * side3) / side1
    
    return {
      question: `Two triangles are similar. If the first triangle has sides ${side1} and ${side2}, and the corresponding side to the ${side1} side in the second triangle is ${side3}, what is the length of the side corresponding to the ${side2} side?`,
      questionLaTeX: `\\text{Two triangles are similar. If the first triangle has sides ${side1} and ${side2},} \\\\\\\\ \\text{and the corresponding side to the ${side1} side in the second triangle is ${side3},} \\\\\\\\ \\text{what is the length of the side corresponding to the ${side2} side?}`,
      answer: solution.toString(),
      answerLaTeX: solution.toString(),
      steps: steps,
      metadata: {
        problemType: 'similarFigures',
        originalSides: [side1, side2],
        scaledSide: side3,
        solution: solution,
        difficulty: 'medium',
        estimatedTime: '60 seconds'
      }
    }
  }
  
  generateScalingProblem(params) {
    const originalLength = Math.floor(Math.random() * 10) + 5
    const originalWidth = Math.floor(Math.random() * 8) + 3
    const scaledLength = originalLength * 2
    
    const scaledWidth = originalWidth * 2
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Set up proportion: } \\frac{\\text{original length}}{\\text{scaled length}} = \\frac{\\text{original width}}{\\text{scaled width}}`)
      steps.push(`\\frac{${originalLength}}{${scaledLength}} = \\frac{${originalWidth}}{x}`)
      steps.push(`\\text{Cross multiply: } ${originalLength} \\times x = ${originalWidth} \\times ${scaledLength}`)
      steps.push(`${originalLength}x = ${originalWidth * scaledLength}`)
      steps.push(`x = \\frac{${originalWidth * scaledLength}}{${originalLength}} = ${scaledWidth}`)
    }
    
    return {
      question: `A rectangle has dimensions ${originalLength} by ${originalWidth}. If it's scaled so the length becomes ${scaledLength}, what is the new width?`,
      questionLaTeX: `\\text{A rectangle has dimensions ${originalLength} by ${originalWidth}.} \\\\\\\\ \\text{If it's scaled so the length becomes ${scaledLength}, what is the new width?}`,
      answer: scaledWidth.toString(),
      answerLaTeX: scaledWidth.toString(),
      steps: steps,
      metadata: {
        problemType: 'scaling',
        originalDimensions: [originalLength, originalWidth],
        scaledLength: scaledLength,
        scaledWidth: scaledWidth,
        difficulty: 'medium',
        estimatedTime: '55 seconds'
      }
    }
  }
  
  generateMapProblem(params) {
    const mapDistance = Math.floor(Math.random() * 8) + 2 // inches on map
    const realDistance1 = Math.floor(Math.random() * 20) + 10 // miles
    const mapDistance1 = 1 // 1 inch represents realDistance1 miles
    
    const realDistance = mapDistance * realDistance1
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Set up proportion: } \\frac{\\text{map distance}}{\\text{real distance}} = \\frac{\\text{map distance}}{\\text{real distance}}`)
      steps.push(`\\frac{${mapDistance1} \\text{ inch}}{${realDistance1} \\text{ miles}} = \\frac{${mapDistance} \\text{ inches}}{x \\text{ miles}}`)
      steps.push(`\\text{Cross multiply: } ${mapDistance1} \\times x = ${mapDistance} \\times ${realDistance1}`)
      steps.push(`x = ${mapDistance} \\times ${realDistance1} = ${realDistance}`)
    }
    
    return {
      question: `On a map, ${mapDistance1} inch represents ${realDistance1} miles. What real distance does ${mapDistance} inches represent?`,
      questionLaTeX: `\\text{On a map, ${mapDistance1} inch represents ${realDistance1} miles.} \\\\\\\\ \\text{What real distance does ${mapDistance} inches represent?}`,
      answer: `${realDistance} miles`,
      answerLaTeX: `${realDistance} \\text{ miles}`,
      steps: steps,
      metadata: {
        problemType: 'maps',
        mapScale: [mapDistance1, realDistance1],
        mapDistance: mapDistance,
        realDistance: realDistance,
        difficulty: 'medium',
        estimatedTime: '50 seconds'
      }
    }
  }
  
  generateUnitRateProportion(params) {
    const items = Math.floor(Math.random() * 8) + 3
    const cost = items * (Math.floor(Math.random() * 4) + 2)
    const newItems = Math.floor(Math.random() * 12) + 5
    const newCost = (cost / items) * newItems
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Set up proportion: } \\frac{\\text{items}}{\\text{cost}} = \\frac{\\text{items}}{\\text{cost}}`)
      steps.push(`\\frac{${items}}{${cost}} = \\frac{${newItems}}{x}`)
      steps.push(`\\text{Cross multiply: } ${items} \\times x = ${newItems} \\times ${cost}`)
      steps.push(`${items}x = ${newItems * cost}`)
      steps.push(`x = \\frac{${newItems * cost}}{${items}} = ${newCost}`)
    }
    
    return {
      question: `If ${items} items cost $${cost}, how much do ${newItems} items cost?`,
      questionLaTeX: `\\text{If ${items} items cost $${cost}, how much do ${newItems} items cost?}`,
      answer: `$${newCost}`,
      answerLaTeX: `\\$${newCost}`,
      steps: steps,
      metadata: {
        problemType: 'unitRates',
        originalRatio: [items, cost],
        newItems: newItems,
        newCost: newCost,
        difficulty: 'medium',
        estimatedTime: '45 seconds'
      }
    }
  }

  /**
   * Generate word problems
   */
  generateWordProblem(problemType, params) {
    const scenarios = this.getWordProblemScenarios(problemType, params)
    const scenario = this.getRandomElement(scenarios)
    
    const steps = []
    if (params.showSteps) {
      steps.push(`\\text{Identify the two ratios that should be equal}`)
      steps.push(`\\text{Set up proportion: } ${scenario.proportion}`)
      steps.push(`\\text{Cross multiply and solve}`)
      steps.push(`\\text{Answer: } ${scenario.answer}`)
    }
    
    return {
      question: scenario.question,
      questionLaTeX: scenario.questionLaTeX,
      answer: scenario.answer,
      answerLaTeX: scenario.answerLaTeX,
      steps: steps,
      metadata: {
        problemType: `word-${problemType}`,
        scenario: scenario.type,
        proportion: scenario.proportion,
        difficulty: 'medium',
        estimatedTime: '70 seconds'
      }
    }
  }
  
  getWordProblemScenarios(problemType, params) {
    const scenarios = []
    
    if (problemType === 'scaling') {
      const originalHeight = Math.floor(Math.random() * 6) + 4
      const photoWidth = Math.floor(Math.random() * 8) + 6
      const photoHeight = Math.floor(Math.random() * 6) + 4
      const newWidth = Math.floor(Math.random() * 12) + 8
      const newHeight = (photoHeight * newWidth) / photoWidth
      
      scenarios.push({
        type: 'photo',
        question: `A photo that is ${photoWidth} inches wide and ${photoHeight} inches tall is being enlarged. If the new width is ${newWidth} inches, what will be the new height?`,
        questionLaTeX: `\\text{A photo that is ${photoWidth} inches wide and ${photoHeight} inches tall is being enlarged.} \\\\\\\\ \\text{If the new width is ${newWidth} inches, what will be the new height?}`,
        answer: `${newHeight} inches`,
        answerLaTeX: `${newHeight} \\text{ inches}`,
        proportion: `\\frac{${photoWidth}}{${photoHeight}} = \\frac{${newWidth}}{h}`
      })
    }
    
    if (problemType === 'unitRates') {
      const pages = Math.floor(Math.random() * 20) + 10
      const minutes = Math.floor(Math.random() * 8) + 5
      const newPages = Math.floor(Math.random() * 30) + 15
      const newMinutes = (minutes * newPages) / pages
      
      scenarios.push({
        type: 'reading',
        question: `Sarah can read ${pages} pages in ${minutes} minutes. At this rate, how long will it take her to read ${newPages} pages?`,
        questionLaTeX: `\\text{Sarah can read ${pages} pages in ${minutes} minutes.} \\\\\\\\ \\text{At this rate, how long will it take her to read ${newPages} pages?}`,
        answer: `${newMinutes} minutes`,
        answerLaTeX: `${newMinutes} \\text{ minutes}`,
        proportion: `\\frac{${pages}}{${minutes}} = \\frac{${newPages}}{t}`
      })
    }
    
    if (problemType === 'similarFigures') {
      const shadow1 = Math.floor(Math.random() * 4) + 2
      const height1 = Math.floor(Math.random() * 4) + 3
      const shadow2 = Math.floor(Math.random() * 6) + 4
      const height2 = (height1 * shadow2) / shadow1
      
      scenarios.push({
        type: 'shadows',
        question: `A ${height1}-foot tall person casts a ${shadow1}-foot shadow. At the same time, a tree casts a ${shadow2}-foot shadow. How tall is the tree?`,
        questionLaTeX: `\\text{A ${height1}-foot tall person casts a ${shadow1}-foot shadow.} \\\\\\\\ \\text{At the same time, a tree casts a ${shadow2}-foot shadow. How tall is the tree?}`,
        answer: `${height2} feet`,
        answerLaTeX: `${height2} \\text{ feet}`,
        proportion: `\\frac{${height1}}{${shadow1}} = \\frac{h}{${shadow2}}`
      })
    }
    
    return scenarios
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

export default ProportionsGenerator