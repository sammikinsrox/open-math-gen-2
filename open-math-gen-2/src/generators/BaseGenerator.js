/**
 * Base Generator Class
 * 
 * This is the foundation class that all mathematical problem generators extend.
 * It provides common functionality and enforces a consistent interface.
 */
export class BaseGenerator {
  constructor(config = {}) {
    this.name = config.name || 'Unknown Generator'
    this.description = config.description || ''
    this.category = config.category || 'general'
    this.difficulty = config.difficulty || 'medium'
    this.icon = config.icon || 'calculate'
    this.tags = config.tags || []
    this.gradeLevel = config.gradeLevel || 'K-12'
    this.estimatedTime = config.estimatedTime || '60 seconds'
    this.exampleProblem = config.exampleProblem || null
    this.defaultParameters = config.defaultParameters || {}
    this.parameterSchema = config.parameterSchema || {}
  }

  /**
   * Generate a single problem
   * Must be implemented by each generator
   * @param {Object} parameters - Generation parameters
   * @returns {Object} Problem object with question, answer, and metadata
   */
  generateProblem(parameters = {}) {
    throw new Error('generateProblem method must be implemented by subclass')
  }

  /**
   * Generate multiple problems
   * @param {number} count - Number of problems to generate
   * @param {Object} parameters - Generation parameters
   * @returns {Array} Array of problem objects
   */
  generateProblems(count = 1, parameters = {}) {
    const problems = []
    const mergedParams = { ...this.defaultParameters, ...parameters }
    
    for (let i = 0; i < count; i++) {
      try {
        const problem = this.generateProblem(mergedParams)
        if (problem) {
          problems.push({
            ...problem,
            id: `${this.name.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
            generator: this.name,
            category: this.category,
            difficulty: this.difficulty
          })
        }
      } catch (error) {
        console.error(`Error generating problem ${i + 1}:`, error)
      }
    }
    
    return problems
  }

  /**
   * Validate parameters against schema
   * @param {Object} parameters - Parameters to validate
   * @returns {Object} Validation result with isValid and errors
   */
  validateParameters(parameters = {}) {
    const errors = []
    const mergedParams = { ...this.defaultParameters, ...parameters }
    
    // Basic validation - can be extended by subclasses
    for (const [key, schema] of Object.entries(this.parameterSchema)) {
      const value = mergedParams[key]
      
      if (schema.required && (value === undefined || value === null)) {
        errors.push(`Parameter '${key}' is required`)
        continue
      }
      
      // Handle different parameter types
      if (value !== undefined && schema.type) {
        if (schema.type === 'select') {
          // For select types, validate against available options
          if (schema.options && Array.isArray(schema.options)) {
            const validValues = schema.options.map(option => option.value)
            if (!validValues.includes(value)) {
              errors.push(`Parameter '${key}' must be one of: ${validValues.join(', ')}`)
            }
          }
        } else if (typeof value !== schema.type) {
          // For other types, use standard type checking
          errors.push(`Parameter '${key}' must be of type ${schema.type}`)
        }
      }
      
      if (value !== undefined && schema.min !== undefined && value < schema.min) {
        errors.push(`Parameter '${key}' must be at least ${schema.min}`)
      }
      
      if (value !== undefined && schema.max !== undefined && value > schema.max) {
        errors.push(`Parameter '${key}' must be at most ${schema.max}`)
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    }
  }

  /**
   * Get generator metadata
   * @returns {Object} Generator information
   */
  getInfo() {
    return {
      name: this.name,
      description: this.description,
      category: this.category,
      difficulty: this.difficulty,
      icon: this.icon,
      tags: this.tags,
      gradeLevel: this.gradeLevel,
      estimatedTime: this.estimatedTime,
      exampleProblem: this.exampleProblem,
      parameters: this.parameterSchema,
      defaultParameters: this.defaultParameters
    }
  }

  /**
   * Generate an example problem for preview
   * @returns {Object} Example problem
   */
  getExampleProblem() {
    if (this.exampleProblem) {
      return this.exampleProblem
    }
    
    try {
      return this.generateProblem(this.defaultParameters)
    } catch (error) {
      return {
        question: 'Example problem',
        questionLaTeX: 'Example problem',
        answer: 'Answer',
        answerLaTeX: 'Answer'
      }
    }
  }

  /**
   * Get available parameter options for UI
   * @returns {Object} Parameter options for form generation
   */
  getParameterOptions() {
    // Check if this is the new Schema V2 format
    if (this.parameterSchema && typeof this.parameterSchema === 'object' && this.parameterSchema.version === 2) {
      return this.parameterSchema
    }
    
    // Legacy Schema V1 format
    const options = {}
    
    for (const [key, schema] of Object.entries(this.parameterSchema || {})) {
      // Skip Schema V2 properties
      if (key === 'version' || key === 'categories' || typeof schema === 'function') {
        continue
      }
      
      options[key] = {
        label: schema.label || key,
        description: schema.description || '',
        type: schema.type || 'text',
        default: this.defaultParameters[key],
        min: schema.min,
        max: schema.max,
        options: schema.options,
        required: schema.required || false
      }
    }
    
    return options
  }
}

export default BaseGenerator