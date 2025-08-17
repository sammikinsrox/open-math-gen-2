/**
 * ThemeManager - Manages visual themes for the geometry renderer
 */
export class ThemeManager {
  constructor(initialTheme = 'educational') {
    this.themes = this.createDefaultThemes();
    this.currentTheme = initialTheme;
  }
  
  /**
   * Create default theme configurations
   */
  createDefaultThemes() {
    return {
      educational: {
        name: 'Educational',
        description: 'Clean, professional theme for educational materials',
        shapes: {
          fill: 'rgba(52, 152, 219, 0.3)',
          stroke: '#2980b9',
          strokeWidth: 2,
          selectedFill: 'rgba(231, 76, 60, 0.3)',
          selectedStroke: '#e74c3c'
        },
        measurement: {
          lineColor: '#e74c3c',
          lineWidth: 2,
          extensionLineColor: '#e74c3c',
          extensionLineWidth: 1,
          arrowColor: '#e74c3c',
          arrowSize: 6,
          textColor: '#e74c3c',
          fontFamily: "'Courier New', monospace",
          fontSize: '14px',
          fontWeight: 'bold',
          labelOffset: 20,
          textBackground: false,
          textBackgroundColor: 'rgba(255, 255, 255, 0.8)'
        },
        grid: {
          gridColor: '#dee2e6',
          gridOpacity: 0.5,
          gridWidth: 0.5,
          axisColor: '#6c757d',
          axisWidth: 1
        },
        background: '#ffffff'
      },
      
      blueprint: {
        name: 'Blueprint',
        description: 'Technical blueprint style with white lines on blue background',
        shapes: {
          fill: 'rgba(255, 255, 255, 0.1)',
          stroke: '#ffffff',
          strokeWidth: 2,
          selectedFill: 'rgba(255, 255, 0, 0.2)',
          selectedStroke: '#ffff00'
        },
        measurement: {
          lineColor: '#ffffff',
          lineWidth: 1.5,
          extensionLineColor: '#ffffff',
          extensionLineWidth: 1,
          arrowColor: '#ffffff',
          arrowSize: 5,
          textColor: '#ffffff',
          fontFamily: "'Courier New', monospace",
          fontSize: '12px',
          fontWeight: 'normal',
          labelOffset: 18,
          textBackground: true,
          textBackgroundColor: 'rgba(0, 123, 191, 0.8)'
        },
        grid: {
          gridColor: 'rgba(255, 255, 255, 0.3)',
          gridOpacity: 1,
          gridWidth: 0.5,
          axisColor: 'rgba(255, 255, 255, 0.8)',
          axisWidth: 1
        },
        background: '#1e3a8a'
      },
      
      dark: {
        name: 'Dark Mode',
        description: 'Dark theme with bright accents',
        shapes: {
          fill: 'rgba(139, 69, 19, 0.3)',
          stroke: '#8b4513',
          strokeWidth: 2,
          selectedFill: 'rgba(255, 140, 0, 0.3)',
          selectedStroke: '#ff8c00'
        },
        measurement: {
          lineColor: '#ff6b6b',
          lineWidth: 2,
          extensionLineColor: '#ff6b6b',
          extensionLineWidth: 1,
          arrowColor: '#ff6b6b',
          arrowSize: 6,
          textColor: '#ff6b6b',
          fontFamily: "'Courier New', monospace",
          fontSize: '14px',
          fontWeight: 'bold',
          labelOffset: 20,
          textBackground: true,
          textBackgroundColor: 'rgba(0, 0, 0, 0.7)'
        },
        grid: {
          gridColor: '#444444',
          gridOpacity: 0.6,
          gridWidth: 0.5,
          axisColor: '#666666',
          axisWidth: 1
        },
        background: '#1a1a1a'
      },
      
      minimal: {
        name: 'Minimal',
        description: 'Clean, minimal design with subtle colors',
        shapes: {
          fill: 'none',
          stroke: '#333333',
          strokeWidth: 1.5,
          selectedFill: 'rgba(0, 0, 0, 0.1)',
          selectedStroke: '#000000'
        },
        measurement: {
          lineColor: '#666666',
          lineWidth: 1,
          extensionLineColor: '#999999',
          extensionLineWidth: 0.5,
          arrowColor: '#666666',
          arrowSize: 4,
          textColor: '#333333',
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          fontSize: '12px',
          fontWeight: '500',
          labelOffset: 15,
          textBackground: false,
          textBackgroundColor: 'rgba(255, 255, 255, 0.9)'
        },
        grid: {
          gridColor: '#f0f0f0',
          gridOpacity: 1,
          gridWidth: 0.25,
          axisColor: '#cccccc',
          axisWidth: 0.5
        },
        background: '#ffffff'
      },
      
      colorful: {
        name: 'Colorful',
        description: 'Vibrant, engaging colors for interactive presentations',
        shapes: {
          fill: 'rgba(75, 192, 192, 0.4)',
          stroke: '#4bc0c0',
          strokeWidth: 3,
          selectedFill: 'rgba(255, 99, 132, 0.4)',
          selectedStroke: '#ff6384'
        },
        measurement: {
          lineColor: '#ff6384',
          lineWidth: 2.5,
          extensionLineColor: '#ff6384',
          extensionLineWidth: 1.5,
          arrowColor: '#ff6384',
          arrowSize: 7,
          textColor: '#333333',
          fontFamily: "'Comic Sans MS', cursive",
          fontSize: '14px',
          fontWeight: 'bold',
          labelOffset: 22,
          textBackground: true,
          textBackgroundColor: 'rgba(255, 255, 255, 0.9)'
        },
        grid: {
          gridColor: '#e0e0e0',
          gridOpacity: 0.7,
          gridWidth: 0.5,
          axisColor: '#999999',
          axisWidth: 1.5
        },
        background: '#f8f9fa'
      }
    };
  }
  
  /**
   * Get current theme
   */
  getCurrentTheme() {
    return this.themes[this.currentTheme] || this.themes.educational;
  }
  
  /**
   * Set current theme
   */
  setTheme(themeName) {
    if (this.themes[themeName]) {
      this.currentTheme = themeName;
    } else {
      console.warn(`Theme '${themeName}' not found. Available themes: ${Object.keys(this.themes).join(', ')}`);
    }
    return this;
  }
  
  /**
   * Get all available themes
   */
  getAvailableThemes() {
    return Object.keys(this.themes).map(key => ({
      key,
      name: this.themes[key].name,
      description: this.themes[key].description
    }));
  }
  
  /**
   * Add custom theme
   */
  addTheme(name, theme) {
    this.themes[name] = {
      name: theme.name || name,
      description: theme.description || 'Custom theme',
      ...this.mergeWithDefaults(theme)
    };
    return this;
  }
  
  /**
   * Merge custom theme with defaults
   */
  mergeWithDefaults(customTheme) {
    const defaultTheme = this.themes.educational;
    return {
      shapes: { ...defaultTheme.shapes, ...customTheme.shapes },
      measurement: { ...defaultTheme.measurement, ...customTheme.measurement },
      grid: { ...defaultTheme.grid, ...customTheme.grid },
      background: customTheme.background || defaultTheme.background
    };
  }
  
  /**
   * Update current theme with custom properties
   */
  updateCurrentTheme(updates) {
    const currentTheme = this.getCurrentTheme();
    this.themes[this.currentTheme] = {
      ...currentTheme,
      shapes: { ...currentTheme.shapes, ...updates.shapes },
      measurement: { ...currentTheme.measurement, ...updates.measurement },
      grid: { ...currentTheme.grid, ...updates.grid },
      background: updates.background || currentTheme.background
    };
    return this;
  }
  
  /**
   * Get theme property
   */
  getThemeProperty(category, property) {
    const theme = this.getCurrentTheme();
    return theme[category] && theme[category][property];
  }
  
  /**
   * Apply theme to SVG container
   */
  applyThemeToContainer(svgElement) {
    const theme = this.getCurrentTheme();
    svgElement.style('background-color', theme.background);
    return this;
  }
  
  /**
   * Get CSS styles for theme
   */
  getThemeCSS() {
    const theme = this.getCurrentTheme();
    return `
      .geometry-renderer {
        background-color: ${theme.background};
      }
      
      .shape {
        fill: ${theme.shapes.fill};
        stroke: ${theme.shapes.stroke};
        stroke-width: ${theme.shapes.strokeWidth}px;
      }
      
      .shape.selected {
        fill: ${theme.shapes.selectedFill};
        stroke: ${theme.shapes.selectedStroke};
      }
      
      .measurement-line {
        stroke: ${theme.measurement.lineColor};
        stroke-width: ${theme.measurement.lineWidth}px;
        fill: none;
      }
      
      .dimension-line {
        stroke: ${theme.measurement.extensionLineColor};
        stroke-width: ${theme.measurement.extensionLineWidth}px;
        fill: none;
      }
      
      .dimension-arrow {
        fill: ${theme.measurement.arrowColor};
        stroke: ${theme.measurement.arrowColor};
      }
      
      .measurement-text {
        font-family: ${theme.measurement.fontFamily};
        font-size: ${theme.measurement.fontSize};
        font-weight: ${theme.measurement.fontWeight};
        fill: ${theme.measurement.textColor};
      }
      
      .grid-line {
        stroke: ${theme.grid.gridColor};
        stroke-width: ${theme.grid.gridWidth}px;
        opacity: ${theme.grid.gridOpacity};
      }
      
      .axis-line {
        stroke: ${theme.grid.axisColor};
        stroke-width: ${theme.grid.axisWidth}px;
      }
    `;
  }
  
  /**
   * Export theme configuration
   */
  exportTheme(themeName = this.currentTheme) {
    return JSON.stringify(this.themes[themeName], null, 2);
  }
  
  /**
   * Import theme configuration
   */
  importTheme(name, themeJSON) {
    try {
      const theme = JSON.parse(themeJSON);
      this.addTheme(name, theme);
      return true;
    } catch (error) {
      console.error('Failed to import theme:', error);
      return false;
    }
  }
}

export default ThemeManager;