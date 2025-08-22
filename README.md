# Open Math Gen 2

# [Use it here](https://sammikinsrox.github.io/open-math-gen/)


A modern, web-based mathematics worksheet generator built with Vue 3 and Vite. Create professional, customizable math worksheets with 60+ problem types across 9 mathematical categories.

## ✨ Features

- **60+ Problem Generators** across 9 mathematical categories
- **Interactive Worksheet Builder** with drag-and-drop functionality
- **Beautiful LaTeX Rendering** using KaTeX for mathematical expressions
- **Professional Print Layouts** optimized for classroom use
- **Template System** with pre-built worksheet configurations
- **Responsive Design** works on desktop, tablet, and mobile
- **Real-time Preview** see your worksheet as you build it
- **Geometry Diagrams** with smart measurements and multiple themes

## 🔢 Mathematical Categories

### Basic Operations
- Addition, Subtraction, Multiplication, Division
- Order of Operations (PEMDAS)

### Numbers & Place Value
- Place Value, Rounding, Number Comparison
- Number Patterns, Prime/Composite Numbers, Factors/Multiples

### Fractions & Decimals
- Basic Fractions, Fraction Operations, Mixed Numbers
- Decimal Operations, Fraction/Decimal Conversion, Percentages
- Equivalent Fractions, Comparing Fractions

### Measurement & Units
- Length, Weight/Mass, Volume/Capacity, Time
- Temperature, Unit Conversion, Metric/Imperial Conversion

### Money & Finance
- Money Counting, Making Change, Money Operations
- Simple Interest, Profit/Loss, Budgeting

### Basic Geometry
- Basic Shapes, Perimeter, Area, Angles
- Lines/Segments, Symmetry, Coordinate Basics, Properties

### Advanced Geometry
- Complex Area, Circles, Volume/Surface Area
- Pythagorean Theorem, Coordinate Geometry, Similar/Congruent Figures

### Pre-Algebra
- Integers, Algebraic Expressions, One-Step/Two-Step Equations
- Inequalities, Ratios, Proportions, Variables, Graphing Basics

### Algebra
- Linear Equations, Systems of Equations, Quadratic Equations
- Polynomials, Factoring, Exponents/Radicals, Functions, Graphing

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd open-math-gen-2
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## 🏗️ Project Structure

```
src/
├── components/           # Vue components
│   ├── Hero.vue         # Landing page hero section
│   ├── WorksheetBuilder.vue  # Main worksheet builder interface
│   ├── Navigation.vue   # Site navigation
│   ├── Features.vue     # Features showcase
│   ├── Statistics.vue   # Usage statistics
│   ├── Templates.vue    # Worksheet templates
│   ├── GeometryDiagram.vue  # Geometry diagram renderer
│   ├── MathExpression.vue   # LaTeX math rendering
│   └── ...             # Other UI components
├── generators/          # Problem generators by category
│   ├── basic-operations/
│   ├── numbers-place-value/
│   ├── fractions-decimals/
│   ├── measurement-units/
│   ├── money-finance/
│   ├── geometry-basic/
│   ├── geometry-advanced/
│   ├── pre-algebra/
│   ├── algebra/
│   └── index.js        # Generator registry
├── geometry-renderer/   # Advanced geometry rendering system
│   ├── DiagramRenderer.js
│   ├── renderers/      # Specialized renderers
│   ├── shapes/         # Shape definitions
│   └── utils/          # Rendering utilities
├── data/               # Configuration and template data
└── main.js            # Application entry point
```

## 🎨 Technology Stack

- **Frontend**: Vue 3 (Composition API), Vite
- **Styling**: Tailwind CSS v4
- **Math Rendering**: KaTeX for LaTeX expressions
- **Geometry**: D3.js for diagram generation
- **Build Tool**: Vite with Vue and Tailwind plugins

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Adding New Generators

1. Create a new generator class in the appropriate category folder:
```javascript
import { BaseGenerator } from '../BaseGenerator.js'

export default class MyNewGenerator extends BaseGenerator {
  constructor() {
    super({
      name: 'My New Problem Type',
      description: 'Description of what this generates',
      // ... other configuration
    })
  }
  
  generateProblem(params) {
    // Implementation
  }
}
```

2. Register it in `src/generators/index.js`:
```javascript
import MyNewGenerator from './category/MyNewGenerator.js'

// Add to appropriate category generators object
'my-new-generator': new MyNewGenerator()
```

## 📐 Geometry System

The geometry rendering system supports:
- **Multiple Shape Types**: Polygons, circles, 3D shapes
- **Smart Measurements**: Automatic positioning and collision avoidance
- **Visual Themes**: Educational, blueprint, dark mode, minimal, colorful
- **SVG Export**: High-quality vector graphics
- **Responsive Scaling**: Uniform sizing across different shapes

## 🎯 Use Cases

- **Teachers**: Create custom worksheets for specific learning objectives
- **Homeschool Parents**: Generate practice materials tailored to their child's level
- **Students**: Generate unlimited practice problems for self-study
- **Tutors**: Quickly create targeted exercises for individual students

## 📱 Browser Support

- Chrome/Edge 88+
- Firefox 78+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Mathematical notation powered by [KaTeX](https://katex.org/)
- Geometry rendering using [D3.js](https://d3js.org/)
- Icons from [Material Design Icons](https://fonts.google.com/icons)
- Built with [Vue 3](https://vuejs.org/) and [Vite](https://vitejs.dev/)
