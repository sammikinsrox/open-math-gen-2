/**
 * Generator Registry
 * 
 * Central registry for all mathematical problem generators.
 * This file exports all available generators organized by category.
 */

// Basic Operations Generators
import AdditionGenerator from './basic-operations/AdditionGenerator.js'
import SubtractionGenerator from './basic-operations/SubtractionGenerator.js'
import MultiplicationGenerator from './basic-operations/MultiplicationGenerator.js'
import DivisionGenerator from './basic-operations/DivisionGenerator.js'
import OrderOfOperationsGenerator from './basic-operations/OrderOfOperationsGenerator.js'

// Numbers & Place Value Generators
import PlaceValueGenerator from './numbers-place-value/PlaceValueGenerator.js'
import RoundingGenerator from './numbers-place-value/RoundingGenerator.js'
import NumberComparisonGenerator from './numbers-place-value/NumberComparisonGenerator.js'
import NumberPatternsGenerator from './numbers-place-value/NumberPatternsGenerator.js'
import PrimeCompositeGenerator from './numbers-place-value/PrimeCompositeGenerator.js'
import FactorsMultiplesGenerator from './numbers-place-value/FactorsMultiplesGenerator.js'

// Fractions & Decimals Generators
import BasicFractionsGenerator from './fractions-decimals/BasicFractionsGenerator.js'
import FractionOperationsGenerator from './fractions-decimals/FractionOperationsGenerator.js'
import MixedNumbersGenerator from './fractions-decimals/MixedNumbersGenerator.js'
import DecimalOperationsGenerator from './fractions-decimals/DecimalOperationsGenerator.js'
import FractionDecimalConversionGenerator from './fractions-decimals/FractionDecimalConversionGenerator.js'
import PercentagesGenerator from './fractions-decimals/PercentagesGenerator.js'
import EquivalentFractionsGenerator from './fractions-decimals/EquivalentFractionsGenerator.js'
import ComparingFractionsGenerator from './fractions-decimals/ComparingFractionsGenerator.js'

// Measurement & Units Generators
import LengthGenerator from './measurement-units/LengthGenerator.js'
import WeightMassGenerator from './measurement-units/WeightMassGenerator.js'
import VolumeCapacityGenerator from './measurement-units/VolumeCapacityGenerator.js'
import TimeGenerator from './measurement-units/TimeGenerator.js'
import TemperatureGenerator from './measurement-units/TemperatureGenerator.js'
import UnitConversionGenerator from './measurement-units/UnitConversionGenerator.js'
import MetricImperialGenerator from './measurement-units/MetricImperialGenerator.js'

// Money & Finance Generators
import MoneyCountingGenerator from './money-finance/MoneyCountingGenerator.js'
import MakingChangeGenerator from './money-finance/MakingChangeGenerator.js'
import MoneyOperationsGenerator from './money-finance/MoneyOperationsGenerator.js'
import SimpleInterestGenerator from './money-finance/SimpleInterestGenerator.js'
import ProfitLossGenerator from './money-finance/ProfitLossGenerator.js'
import BudgetingGenerator from './money-finance/BudgetingGenerator.js'

// Algebra Generators
import LinearEquationsGenerator from './algebra/LinearEquationsGenerator.js'

/**
 * Generator Categories
 * Organized by mathematical subject area
 */
export const GENERATOR_CATEGORIES = {
  'basic-operations': {
    name: 'Basic Operations',
    description: 'Addition, subtraction, multiplication, division, and order of operations',
    icon: 'calculate',
    generators: {
      'addition': new AdditionGenerator(),
      'subtraction': new SubtractionGenerator(),
      'multiplication': new MultiplicationGenerator(),
      'division': new DivisionGenerator(),
      'order-of-operations': new OrderOfOperationsGenerator()
    }
  },
  
  'numbers-place-value': {
    name: 'Numbers & Place Value',
    description: 'Place value, rounding, number comparison, patterns, and prime numbers',
    icon: 'pin',
    generators: {
      'place-value': new PlaceValueGenerator(),
      'rounding': new RoundingGenerator(),
      'number-comparison': new NumberComparisonGenerator(),
      'number-patterns': new NumberPatternsGenerator(),
      'prime-composite': new PrimeCompositeGenerator(),
      'factors-multiples': new FactorsMultiplesGenerator()
    }
  },
  
  'fractions-decimals': {
    name: 'Fractions & Decimals',
    description: 'Fraction operations, mixed numbers, decimal conversions, and percentages',
    icon: 'percent',
    generators: {
      'basic-fractions': new BasicFractionsGenerator(),
      'fraction-operations': new FractionOperationsGenerator(),
      'mixed-numbers': new MixedNumbersGenerator(),
      'decimal-operations': new DecimalOperationsGenerator(),
      'fraction-decimal-conversion': new FractionDecimalConversionGenerator(),
      'percentages': new PercentagesGenerator(),
      'equivalent-fractions': new EquivalentFractionsGenerator(),
      'comparing-fractions': new ComparingFractionsGenerator()
    }
  },
  
  'measurement-units': {
    name: 'Measurement & Units',
    description: 'Length, weight, volume, time, temperature, and unit conversions',
    icon: 'straighten',
    generators: {
      'length': new LengthGenerator(),
      'weight-mass': new WeightMassGenerator(),
      'volume-capacity': new VolumeCapacityGenerator(),
      'time': new TimeGenerator(),
      'temperature': new TemperatureGenerator(),
      'unit-conversion': new UnitConversionGenerator(),
      'metric-imperial': new MetricImperialGenerator()
    }
  },
  
  'money-finance': {
    name: 'Money & Finance',
    description: 'Money counting, change making, money operations, simple interest, profit/loss, and budgeting',
    icon: 'attach_money',
    generators: {
      'money-counting': new MoneyCountingGenerator(),
      'making-change': new MakingChangeGenerator(),
      'money-operations': new MoneyOperationsGenerator(),
      'simple-interest': new SimpleInterestGenerator(),
      'profit-loss': new ProfitLossGenerator(),
      'budgeting': new BudgetingGenerator()
    }
  },
  
  'geometry-basic': {
    name: 'Basic Geometry',
    description: 'Shapes, perimeter, area, angles, lines, and coordinate basics',
    icon: 'square_foot',
    generators: {
      // TODO: Add generators for this category
      // 'basic-shapes': new BasicShapesGenerator(),
      // 'perimeter': new PerimeterGenerator(),
      // 'area': new AreaGenerator(),
      // 'angles': new AnglesGenerator(),
      // 'lines-segments': new LinesSegmentsGenerator(),
      // 'symmetry': new SymmetryGenerator(),
      // 'coordinate-basics': new CoordinateBasicsGenerator()
    }
  },
  
  'geometry-advanced': {
    name: 'Advanced Geometry',
    description: 'Complex areas, circles, volume, Pythagorean theorem, and transformations',
    icon: 'analytics',
    generators: {
      // TODO: Add generators for this category
      // 'complex-area': new ComplexAreaGenerator(),
      // 'circles': new CirclesGenerator(),
      // 'volume-surface-area': new VolumeSurfaceAreaGenerator(),
      // 'pythagorean-theorem': new PythagoreanTheoremGenerator(),
      // 'coordinate-geometry': new CoordinateGeometryGenerator(),
      // 'transformations': new TransformationsGenerator(),
      // 'similar-congruent': new SimilarCongruentGenerator()
    }
  },
  
  'pre-algebra': {
    name: 'Pre-Algebra',
    description: 'Integers, expressions, equations, inequalities, ratios, and proportions',
    icon: 'functions',
    generators: {
      // TODO: Add generators for this category
      // 'integers': new IntegersGenerator(),
      // 'algebraic-expressions': new AlgebraicExpressionsGenerator(),
      // 'one-step-equations': new OneStepEquationsGenerator(),
      // 'two-step-equations': new TwoStepEquationsGenerator(),
      // 'inequalities': new InequalitiesGenerator(),
      // 'ratios': new RatiosGenerator(),
      // 'proportions': new ProportionsGenerator(),
      // 'variables': new VariablesGenerator(),
      // 'graphing-basics': new GraphingBasicsGenerator()
    }
  },
  
  'algebra': {
    name: 'Algebra',
    description: 'Linear equations, systems, quadratics, polynomials, and functions',
    icon: 'science',
    generators: {
      'linear-equations': new LinearEquationsGenerator()
      // TODO: Add more generators for this category
      // 'systems-of-equations': new SystemsOfEquationsGenerator(),
      // 'quadratic-equations': new QuadraticEquationsGenerator(),
      // 'polynomials': new PolynomialsGenerator(),
      // 'factoring': new FactoringGenerator(),
      // 'exponents-radicals': new ExponentsRadicalsGenerator(),
      // 'functions': new FunctionsGenerator(),
      // 'graphing': new GraphingGenerator()
    }
  },
  
  'trigonometry': {
    name: 'Trigonometry',
    description: 'Trig ratios, right triangles, unit circle, identities, and equations',
    icon: 'architecture',
    generators: {
      // TODO: Add generators for this category
      // 'trigonometric-ratios': new TrigonometricRatiosGenerator(),
      // 'right-triangles': new RightTrianglesGenerator(),
      // 'unit-circle': new UnitCircleGenerator(),
      // 'trigonometric-identities': new TrigonometricIdentitiesGenerator(),
      // 'trigonometric-equations': new TrigonometricEquationsGenerator(),
      // 'law-of-sines-cosines': new LawOfSinesCosinesGenerator()
    }
  }
}

/**
 * Get all available generators as a flat array
 * @returns {Array} Array of all generator instances
 */
export function getAllGenerators() {
  const generators = []
  
  for (const category of Object.values(GENERATOR_CATEGORIES)) {
    for (const generator of Object.values(category.generators)) {
      generators.push(generator)
    }
  }
  
  return generators
}

/**
 * Get generator by category and name
 * @param {string} categoryId - Category identifier
 * @param {string} generatorId - Generator identifier
 * @returns {Object|null} Generator instance or null if not found
 */
export function getGenerator(categoryId, generatorId) {
  const category = GENERATOR_CATEGORIES[categoryId]
  if (!category) {
    return null
  }
  
  return category.generators[generatorId] || null
}

/**
 * Get all generators in a category
 * @param {string} categoryId - Category identifier
 * @returns {Array} Array of generator instances in the category
 */
export function getGeneratorsByCategory(categoryId) {
  const category = GENERATOR_CATEGORIES[categoryId]
  if (!category) {
    return []
  }
  
  return Object.values(category.generators)
}

/**
 * Search generators by name or description
 * @param {string} query - Search query
 * @returns {Array} Array of matching generators
 */
export function searchGenerators(query) {
  const searchTerm = query.toLowerCase()
  const results = []
  
  for (const [categoryId, category] of Object.entries(GENERATOR_CATEGORIES)) {
    for (const [generatorId, generator] of Object.entries(category.generators)) {
      const name = generator.name.toLowerCase()
      const description = generator.description.toLowerCase()
      
      if (name.includes(searchTerm) || description.includes(searchTerm)) {
        results.push({
          generator,
          categoryId,
          generatorId,
          category: category.name
        })
      }
    }
  }
  
  return results
}

/**
 * Get generator statistics
 * @returns {Object} Statistics about available generators
 */
export function getGeneratorStats() {
  const categories = Object.keys(GENERATOR_CATEGORIES)
  const totalGenerators = getAllGenerators().length
  
  const statsByCategory = {}
  for (const [categoryId, category] of Object.entries(GENERATOR_CATEGORIES)) {
    statsByCategory[categoryId] = {
      name: category.name,
      count: Object.keys(category.generators).length,
      implemented: Object.keys(category.generators).length,
      planned: 0 // This would be calculated based on TODO comments
    }
  }
  
  return {
    totalCategories: categories.length,
    totalGenerators,
    implementedGenerators: totalGenerators,
    categories: statsByCategory
  }
}

export default GENERATOR_CATEGORIES