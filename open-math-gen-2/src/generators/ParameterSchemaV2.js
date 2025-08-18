/**
 * Parameter Schema V2
 * 
 * Enhanced parameter schema system with better UX:
 * - Organized into logical categories
 * - Better descriptions and help text
 * - Visual indicators and icons
 * - Conditional parameter display
 * - Improved validation and error handling
 */

export class ParameterSchemaV2 {
  constructor() {
    this.version = 2;
  }

  /**
   * Create a new parameter schema with enhanced UX features
   * @param {Object} config - Schema configuration
   * @returns {Object} Enhanced parameter schema
   */
  createSchema(config) {
    return {
      version: 2,
      ...config,
      // Add schema validation
      validate: this.validateSchema.bind(this, config),
      // Add parameter dependencies
      getDependentParameters: this.getDependentParameters.bind(this, config),
      // Add category organization
      getCategorizedParameters: this.getCategorizedParameters.bind(this, config)
    };
  }

  /**
   * Create a parameter category
   * @param {Object} categoryConfig - Category configuration
   * @returns {Object} Parameter category
   */
  createCategory(categoryConfig) {
    return {
      id: categoryConfig.id,
      label: categoryConfig.label,
      description: categoryConfig.description,
      icon: categoryConfig.icon || 'settings',
      expanded: categoryConfig.expanded !== false, // Default to expanded
      order: categoryConfig.order || 0,
      parameters: categoryConfig.parameters || {},
      // Visual styling
      color: categoryConfig.color || 'blue',
      variant: categoryConfig.variant || 'default' // default, primary, secondary
    };
  }

  /**
   * Create an enhanced parameter with better UX
   * @param {Object} paramConfig - Parameter configuration
   * @returns {Object} Enhanced parameter
   */
  createParameter(paramConfig) {
    const baseParam = {
      type: paramConfig.type,
      label: paramConfig.label,
      description: paramConfig.description,
      required: paramConfig.required || false,
      order: paramConfig.order || 0
    };

    // Add type-specific enhancements
    switch (paramConfig.type) {
      case 'number':
        return {
          ...baseParam,
          min: paramConfig.min,
          max: paramConfig.max,
          step: paramConfig.step || 1,
          unit: paramConfig.unit,
          slider: paramConfig.slider || false,
          presets: paramConfig.presets // e.g., [5, 10, 20] for quick selection
        };

      case 'boolean':
        return {
          ...baseParam,
          variant: paramConfig.variant || 'switch', // switch, checkbox, toggle
          helpText: paramConfig.helpText,
          icon: paramConfig.icon
        };

      case 'select':
        return {
          ...baseParam,
          options: paramConfig.options,
          variant: paramConfig.variant || 'dropdown', // dropdown, radio, cards
          multiple: paramConfig.multiple || false,
          searchable: paramConfig.searchable || false
        };

      case 'multiselect':
        return {
          ...baseParam,
          options: paramConfig.options,
          variant: paramConfig.variant || 'checkboxes', // checkboxes, chips, list
          min: paramConfig.min,
          max: paramConfig.max,
          allowSelectAll: paramConfig.allowSelectAll !== false
        };

      case 'range':
        return {
          ...baseParam,
          min: paramConfig.min,
          max: paramConfig.max,
          step: paramConfig.step || 1,
          unit: paramConfig.unit,
          dual: paramConfig.dual || false // single or dual handle
        };

      case 'group':
        return {
          ...baseParam,
          variant: paramConfig.variant || 'toggle-group', // toggle-group, radio-cards
          options: paramConfig.options,
          exclusive: paramConfig.exclusive !== false
        };

      default:
        return baseParam;
    }
  }

  /**
   * Create conditional parameter logic
   * @param {Object} condition - Condition configuration
   * @returns {Object} Condition object
   */
  createCondition(condition) {
    return {
      type: condition.type || 'equals', // equals, not-equals, includes, excludes, greater-than, less-than
      parameter: condition.parameter,
      value: condition.value,
      operator: condition.operator || 'and' // and, or
    };
  }

  /**
   * Create a preset configuration
   * @param {Object} presetConfig - Preset configuration
   * @returns {Object} Preset object
   */
  createPreset(presetConfig) {
    return {
      id: presetConfig.id,
      label: presetConfig.label,
      description: presetConfig.description,
      icon: presetConfig.icon,
      values: presetConfig.values,
      tags: presetConfig.tags || [],
      category: presetConfig.category
    };
  }

  /**
   * Validate parameter schema
   * @param {Object} schema - Schema to validate
   * @param {Object} values - Parameter values to validate
   * @returns {Object} Validation result
   */
  validateSchema(schema, values) {
    const errors = [];
    const warnings = [];

    // Validate each category and parameter
    Object.entries(schema.categories).forEach(([categoryId, category]) => {
      Object.entries(category.parameters).forEach(([paramId, param]) => {
        const value = values[paramId];
        
        // Required validation
        if (param.required && (value === undefined || value === null || value === '')) {
          errors.push(`${param.label} is required`);
        }

        // Type-specific validation
        const typeValidation = this.validateParameterType(param, value);
        if (!typeValidation.isValid) {
          errors.push(...typeValidation.errors);
        }
      });
    });

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Validate specific parameter type
   * @param {Object} param - Parameter definition
   * @param {*} value - Value to validate
   * @returns {Object} Validation result
   */
  validateParameterType(param, value) {
    const errors = [];

    if (value === undefined || value === null) {
      return { isValid: true, errors }; // Skip validation for empty optional params
    }

    switch (param.type) {
      case 'number':
        if (typeof value !== 'number' || isNaN(value)) {
          errors.push(`${param.label} must be a valid number`);
        } else {
          if (param.min !== undefined && value < param.min) {
            errors.push(`${param.label} must be at least ${param.min}`);
          }
          if (param.max !== undefined && value > param.max) {
            errors.push(`${param.label} must be at most ${param.max}`);
          }
        }
        break;

      case 'select':
        const validOptions = param.options.map(opt => opt.value);
        if (!validOptions.includes(value)) {
          errors.push(`${param.label} must be one of: ${validOptions.join(', ')}`);
        }
        break;

      case 'multiselect':
        if (!Array.isArray(value)) {
          errors.push(`${param.label} must be an array`);
        } else {
          const validOptions = param.options.map(opt => opt.value);
          const invalidValues = value.filter(v => !validOptions.includes(v));
          if (invalidValues.length > 0) {
            errors.push(`${param.label} contains invalid values: ${invalidValues.join(', ')}`);
          }
          if (param.min && value.length < param.min) {
            errors.push(`${param.label} must have at least ${param.min} selections`);
          }
          if (param.max && value.length > param.max) {
            errors.push(`${param.label} must have at most ${param.max} selections`);
          }
        }
        break;
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Get parameters that depend on other parameters
   * @param {Object} schema - Parameter schema
   * @param {Object} values - Current parameter values
   * @returns {Array} List of dependent parameters
   */
  getDependentParameters(schema, values) {
    const dependentParams = [];

    Object.entries(schema.categories).forEach(([categoryId, category]) => {
      Object.entries(category.parameters).forEach(([paramId, param]) => {
        if (param.dependsOn) {
          const shouldShow = this.evaluateConditions(param.dependsOn, values);
          if (!shouldShow) {
            dependentParams.push(paramId);
          }
        }
      });
    });

    return dependentParams;
  }

  /**
   * Get parameters organized by category
   * @param {Object} schema - Parameter schema
   * @param {Object} values - Current parameter values
   * @returns {Array} Categorized parameters
   */
  getCategorizedParameters(schema, values) {
    const hiddenParams = this.getDependentParameters(schema, values);

    return Object.entries(schema.categories)
      .map(([categoryId, category]) => ({
        ...category,
        id: categoryId,
        parameters: Object.entries(category.parameters)
          .filter(([paramId]) => !hiddenParams.includes(paramId))
          .sort(([, a], [, b]) => (a.order || 0) - (b.order || 0))
          .map(([paramId, param]) => ({ ...param, id: paramId }))
      }))
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  /**
   * Evaluate conditional logic
   * @param {Array} conditions - Array of conditions
   * @param {Object} values - Current parameter values
   * @returns {boolean} Whether conditions are met
   */
  evaluateConditions(conditions, values) {
    if (!Array.isArray(conditions)) {
      conditions = [conditions];
    }

    return conditions.every(condition => {
      const paramValue = values[condition.parameter];
      
      switch (condition.type) {
        case 'equals':
          return paramValue === condition.value;
        case 'not-equals':
          return paramValue !== condition.value;
        case 'includes':
          return Array.isArray(paramValue) && paramValue.includes(condition.value);
        case 'excludes':
          return !Array.isArray(paramValue) || !paramValue.includes(condition.value);
        case 'greater-than':
          return typeof paramValue === 'number' && paramValue > condition.value;
        case 'less-than':
          return typeof paramValue === 'number' && paramValue < condition.value;
        default:
          return true;
      }
    });
  }
}

export default ParameterSchemaV2;