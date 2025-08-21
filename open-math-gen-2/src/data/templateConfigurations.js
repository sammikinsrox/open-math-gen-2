/**
 * Template Configuration System
 * 
 * This file contains all worksheet template configurations.
 * Each template defines generators, parameters, and metadata.
 */

export const TEMPLATE_CATEGORIES = {
  'elementary-practice': {
    name: 'Elementary Practice',
    description: 'Daily practice worksheets for K-5 students',
    icon: '🎯',
    gradeRange: 'K-5'
  },
  'elementary-assessment': {
    name: 'Elementary Assessment',
    description: 'Tests and evaluations for K-5 students',
    icon: '📝',
    gradeRange: 'K-5'
  },
  'middle-practice': {
    name: 'Middle School Practice',
    description: 'Practice worksheets for grades 6-8',
    icon: '📚',
    gradeRange: '6-8'
  },
  'middle-assessment': {
    name: 'Middle School Assessment',
    description: 'Tests and evaluations for grades 6-8',
    icon: '📋',
    gradeRange: '6-8'
  },
  'high-practice': {
    name: 'High School Practice',
    description: 'Practice worksheets for grades 9-12',
    icon: '🎓',
    gradeRange: '9-12'
  },
  'high-assessment': {
    name: 'High School Assessment',
    description: 'Tests and evaluations for grades 9-12',
    icon: '📊',
    gradeRange: '9-12'
  },
  'special-purpose': {
    name: 'Special Purpose',
    description: 'Diagnostic, review, and prep worksheets',
    icon: '⭐',
    gradeRange: 'All'
  }
}

export const TEMPLATE_CONFIGURATIONS = [
  // KINDERGARTEN TEMPLATES - Visual & Concrete Learning
  {
    id: 'k-numbers-0-10',
    name: 'Kindergarten: Numbers 0-10 Recognition',
    description: 'Number recognition, counting, and one-to-one correspondence with pictures and dots.',
    category: 'elementary-practice',
    gradeLevel: 'K',
    subject: 'numbers-place-value',
    purpose: 'practice',
    difficulty: 'beginner',
    estimatedTime: '15 minutes',
    problemCount: '12 problems',
    generators: ['number-patterns', 'number-comparison'],
    parameters: {
      'number-patterns': { min: 0, max: 10, includeZero: true, visualMode: 'dots', problemCount: 8 },
      'number-comparison': { min: 0, max: 10, compareMode: 'visual', problemCount: 4 }
    },
    tags: ['kindergarten', 'number-recognition', 'counting', 'visual', 'concrete'],
    standardsAlignment: ['K.CC.A.1', 'K.CC.A.2', 'K.CC.B.4'],
    teacherNotes: 'Use manipulatives like counting bears or blocks. Encourage finger counting.',
    visualSupport: 'high',
    recommendedTime: 'morning-math'
  },

  {
    id: 'k-shapes-colors',
    name: 'Kindergarten: Shapes & Basic Geometry',
    description: 'Identifying basic shapes, counting sides and corners with colorful visual aids.',
    category: 'elementary-practice',
    gradeLevel: 'K',
    subject: 'geometry-basic',
    purpose: 'practice',
    difficulty: 'beginner',
    estimatedTime: '20 minutes',
    problemCount: '15 problems',
    generators: ['basic-shapes', 'properties'],
    parameters: {
      'basic-shapes': { shapes: ['circle', 'triangle', 'square', 'rectangle'], includeColors: true, problemCount: 10 },
      'properties': { focus: 'sides-corners', visualMode: true, problemCount: 5 }
    },
    tags: ['kindergarten', 'shapes', 'geometry', 'visual', 'colors'],
    standardsAlignment: ['K.G.A.1', 'K.G.A.2', 'K.G.B.4'],
    teacherNotes: 'Have physical shape blocks available. Discuss real-world shape examples.',
    visualSupport: 'high',
    recommendedTime: 'afternoon-centers'
  },

  {
    id: 'k-addition-pictures',
    name: 'Kindergarten: Addition with Pictures (Sums to 5)',
    description: 'Visual addition using pictures, objects, and manipulatives with sums up to 5.',
    category: 'elementary-practice',
    gradeLevel: 'K',
    subject: 'basic-operations',
    purpose: 'practice',
    difficulty: 'beginner',
    estimatedTime: '15 minutes',
    problemCount: '10 problems',
    generators: ['addition'],
    parameters: {
      'addition': { minAddend: 1, maxAddend: 4, maxSum: 5, visualMode: 'pictures', showManipulatives: true, problemCount: 10 }
    },
    tags: ['kindergarten', 'addition', 'visual', 'manipulatives', 'concrete'],
    standardsAlignment: ['K.OA.A.1', 'K.OA.A.2'],
    teacherNotes: 'Start with physical objects before moving to pictures. Use "counting on" strategy.',
    visualSupport: 'high',
    recommendedTime: 'small-group-math'
  },

  // GRADE 1 TEMPLATES - Bridge to Abstract
  {
    id: 'grade1-number-bonds-10',
    name: '1st Grade: Number Bonds to 10',
    description: 'Understanding part-whole relationships and number combinations that make 10.',
    category: 'elementary-practice',
    gradeLevel: '1',
    subject: 'basic-operations',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '20 minutes',
    problemCount: '15 problems',
    generators: ['addition', 'subtraction'],
    parameters: {
      'addition': { focus: 'bonds-to-10', showNumberLine: true, visualSupport: true, problemCount: 10 },
      'subtraction': { maxMinuend: 10, showNumberLine: true, visualSupport: true, problemCount: 5 }
    },
    tags: ['grade-1', 'number-bonds', 'addition', 'subtraction', 'number-line'],
    standardsAlignment: ['1.OA.A.1', '1.OA.B.3', '1.OA.C.6'],
    teacherNotes: 'Emphasize the relationship between addition and subtraction. Use ten frames.',
    visualSupport: 'medium',
    recommendedTime: 'daily-fluency'
  },

  {
    id: 'grade1-counting-by-tens',
    name: '1st Grade: Skip Counting & Patterns',
    description: 'Skip counting by 2s, 5s, and 10s with number patterns and hundreds chart.',
    category: 'elementary-practice',
    gradeLevel: '1',
    subject: 'numbers-place-value',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '15 minutes',
    problemCount: '12 problems',
    generators: ['number-patterns'],
    parameters: {
      'number-patterns': { skipCounting: [2, 5, 10], maxNumber: 100, showHundredsChart: true, problemCount: 12 }
    },
    tags: ['grade-1', 'skip-counting', 'patterns', 'hundreds-chart'],
    standardsAlignment: ['1.NBT.A.1', '1.OA.A.1'],
    teacherNotes: 'Use hundreds chart and highlight patterns. Connect to coin counting.',
    visualSupport: 'medium',
    recommendedTime: 'number-talk'
  },

  {
    id: 'grade1-time-money-intro',
    name: '1st Grade: Time & Money Introduction',
    description: 'Telling time to the hour and identifying coins with their values.',
    category: 'elementary-practice',
    gradeLevel: '1',
    subject: 'measurement-units',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '25 minutes',
    problemCount: '16 problems',
    generators: ['time', 'money-counting'],
    parameters: {
      'time': { timeUnits: ['hour'], showClockFace: true, digitalAndAnalog: true, problemCount: 8 },
      'money-counting': { coins: ['penny', 'nickel', 'dime', 'quarter'], showImages: true, problemCount: 8 }
    },
    tags: ['grade-1', 'time', 'money', 'coins', 'clock'],
    standardsAlignment: ['1.MD.B.3', '1.MD.C.4'],
    teacherNotes: 'Use real coins and clocks. Practice daily time routines.',
    visualSupport: 'high',
    recommendedTime: 'life-skills-math'
  },

  // GRADE 2 TEMPLATES - Building Place Value Understanding
  {
    id: 'grade2-place-value-hundreds',
    name: '2nd Grade: Place Value to 1000',
    description: 'Understanding hundreds, tens, and ones with base-ten blocks and expanded form.',
    category: 'elementary-practice',
    gradeLevel: '2',
    subject: 'numbers-place-value',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '25 minutes',
    problemCount: '20 problems',
    generators: ['place-value', 'number-comparison'],
    parameters: {
      'place-value': { maxNumber: 1000, showBaseTenBlocks: true, includeExpanded: true, includeWordForm: true, problemCount: 12 },
      'number-comparison': { min: 100, max: 1000, showNumberLine: true, problemCount: 8 }
    },
    tags: ['grade-2', 'place-value', 'base-ten-blocks', 'expanded-form', 'word-form'],
    standardsAlignment: ['2.NBT.A.1', '2.NBT.A.2', '2.NBT.A.3'],
    teacherNotes: 'Use base-ten blocks extensively. Connect to real-world examples like money.',
    visualSupport: 'medium',
    recommendedTime: 'concept-development'
  },

  {
    id: 'grade2-addition-regrouping',
    name: '2nd Grade: Addition with Regrouping',
    description: 'Two-digit addition with regrouping using multiple strategies and visual models.',
    category: 'elementary-practice',
    gradeLevel: '2',
    subject: 'basic-operations',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '30 minutes',
    problemCount: '18 problems',
    generators: ['addition'],
    parameters: {
      'addition': { 
        minAddend: 15, maxAddend: 89, requireRegrouping: 'mixed', 
        showMultipleStrategies: true, showBaseTenBlocks: true, 
        showNumberLine: true, problemCount: 18 
      }
    },
    tags: ['grade-2', 'addition', 'regrouping', 'carrying', 'strategies', 'base-ten'],
    standardsAlignment: ['2.NBT.B.5', '2.NBT.B.6'],
    teacherNotes: 'Show multiple strategies: blocks, number line, algorithm. Let students choose preferred method.',
    visualSupport: 'medium',
    recommendedTime: 'strategy-practice'
  },

  {
    id: 'grade2-measurement-length',
    name: '2nd Grade: Measuring Length',
    description: 'Measuring objects using inches, feet, centimeters with real-world applications.',
    category: 'elementary-practice',
    gradeLevel: '2',
    subject: 'measurement-units',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '20 minutes',
    problemCount: '15 problems',
    generators: ['length'],
    parameters: {
      'length': { 
        units: ['inch', 'foot', 'centimeter'], showRuler: true, 
        realWorldObjects: true, estimationProblems: true, problemCount: 15 
      }
    },
    tags: ['grade-2', 'measurement', 'length', 'ruler', 'estimation', 'real-world'],
    standardsAlignment: ['2.MD.A.1', '2.MD.A.2', '2.MD.A.3'],
    teacherNotes: 'Have rulers and measuring tools available. Measure classroom objects.',
    visualSupport: 'high',
    recommendedTime: 'hands-on-math'
  },

  // GRADE 3 TEMPLATES - Multiplication & Fractions Introduction
  {
    id: 'grade3-multiplication-strategies',
    name: '3rd Grade: Multiplication Strategies & Concepts',
    description: 'Understanding multiplication through arrays, groups, repeated addition, and skip counting.',
    category: 'elementary-practice',
    gradeLevel: '3',
    subject: 'basic-operations',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '30 minutes',
    problemCount: '20 problems',
    generators: ['multiplication'],
    parameters: {
      'multiplication': { 
        minFactor: 2, maxFactor: 6, tables: [2,3,4,5,6], 
        showArrays: true, showGroups: true, showRepeatedAddition: true,
        includeWordProblems: true, problemCount: 20 
      }
    },
    tags: ['grade-3', 'multiplication', 'arrays', 'groups', 'repeated-addition', 'strategies'],
    standardsAlignment: ['3.OA.A.1', '3.OA.A.3', '3.OA.C.7'],
    teacherNotes: 'Use manipulatives and visual models. Connect to real-world scenarios like egg cartons.',
    visualSupport: 'medium',
    recommendedTime: 'concept-introduction'
  },

  {
    id: 'grade3-fractions-introduction',
    name: '3rd Grade: Understanding Fractions',
    description: 'Introduction to fractions as parts of a whole using visual models and real-world examples.',
    category: 'elementary-practice',
    gradeLevel: '3',
    subject: 'fractions-decimals',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '25 minutes',
    problemCount: '18 problems',
    generators: ['basic-fractions', 'equivalent-fractions'],
    parameters: {
      'basic-fractions': { 
        maxDenominator: 8, includeVisual: true, showPizza: true, 
        showNumberLine: true, unitFractionsFirst: true, problemCount: 12 
      },
      'equivalent-fractions': { maxDenominator: 8, useVisualModels: true, problemCount: 6 }
    },
    tags: ['grade-3', 'fractions', 'parts-whole', 'visual-models', 'pizza-model', 'number-line'],
    standardsAlignment: ['3.NF.A.1', '3.NF.A.2', '3.NF.A.3'],
    teacherNotes: 'Use fraction circles, bars, and real food examples. Focus on equal parts concept.',
    visualSupport: 'high',
    recommendedTime: 'hands-on-exploration'
  },

  {
    id: 'grade3-area-perimeter',
    name: '3rd Grade: Area & Perimeter Basics',
    description: 'Finding area and perimeter of rectangles using unit squares and counting.',
    category: 'elementary-practice',
    gradeLevel: '3',
    subject: 'geometry-basic',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '25 minutes',
    problemCount: '16 problems',
    generators: ['area', 'perimeter'],
    parameters: {
      'area': { shapes: ['rectangle', 'square'], useUnitSquares: true, maxDimensions: 10, problemCount: 10 },
      'perimeter': { shapes: ['rectangle', 'square'], showGrid: true, maxDimensions: 10, problemCount: 6 }
    },
    tags: ['grade-3', 'area', 'perimeter', 'rectangles', 'unit-squares', 'counting'],
    standardsAlignment: ['3.MD.C.5', '3.MD.C.6', '3.MD.D.8'],
    teacherNotes: 'Use grid paper and unit squares. Connect to covering and surrounding concepts.',
    visualSupport: 'high',
    recommendedTime: 'geometric-measurement'
  },

  // GRADE 4 TEMPLATES - Multi-digit Operations & Advanced Fractions
  {
    id: 'grade4-multi-digit-multiplication',
    name: '4th Grade: Multi-Digit Multiplication',
    description: 'Multiplying multi-digit numbers using area models, partial products, and standard algorithm.',
    category: 'elementary-practice',
    gradeLevel: '4',
    subject: 'basic-operations',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '35 minutes',
    problemCount: '15 problems',
    generators: ['multiplication'],
    parameters: {
      'multiplication': { 
        multiDigit: true, maxDigits: 3, showAreaModel: true,
        showPartialProducts: true, showStandardAlgorithm: true,
        includeWordProblems: true, problemCount: 15
      }
    },
    tags: ['grade-4', 'multiplication', 'multi-digit', 'area-model', 'partial-products', 'algorithm'],
    standardsAlignment: ['4.NBT.B.5', '4.OA.A.3'],
    teacherNotes: 'Show multiple strategies. Let students choose their preferred method for solving.',
    visualSupport: 'medium',
    recommendedTime: 'strategy-comparison'
  },

  {
    id: 'grade4-fraction-operations',
    name: '4th Grade: Adding & Subtracting Fractions',
    description: 'Adding and subtracting fractions with like denominators and mixed numbers.',
    category: 'elementary-practice',
    gradeLevel: '4',
    subject: 'fractions-decimals',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '30 minutes',
    problemCount: '20 problems',
    generators: ['fraction-operations', 'mixed-numbers'],
    parameters: {
      'fraction-operations': { 
        operations: ['add', 'subtract'], likeDenominators: true,
        maxDenominator: 12, showVisualModels: true, problemCount: 14
      },
      'mixed-numbers': { operations: ['add', 'subtract'], maxWhole: 3, showVisualModels: true, problemCount: 6 }
    },
    tags: ['grade-4', 'fractions', 'addition', 'subtraction', 'mixed-numbers', 'like-denominators'],
    standardsAlignment: ['4.NF.B.3', '4.NF.B.4'],
    teacherNotes: 'Use fraction strips and number lines. Emphasize common denominators.',
    visualSupport: 'medium',
    recommendedTime: 'fraction-operations'
  },

  {
    id: 'grade4-decimals-introduction',
    name: '4th Grade: Decimal Place Value',
    description: 'Understanding decimal place value to hundredths with money connections.',
    category: 'elementary-practice',
    gradeLevel: '4',
    subject: 'fractions-decimals',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '25 minutes',
    problemCount: '18 problems',
    generators: ['decimal-operations', 'fraction-decimal-conversion'],
    parameters: {
      'decimal-operations': { 
        decimalPlaces: 2, maxValue: 10, operations: ['read', 'write', 'compare'],
        showPlaceValueChart: true, connectToMoney: true, problemCount: 12
      },
      'fraction-decimal-conversion': { 
        denominators: [10, 100], includeMoneyExamples: true, problemCount: 6
      }
    },
    tags: ['grade-4', 'decimals', 'place-value', 'money', 'tenths', 'hundredths'],
    standardsAlignment: ['4.NF.C.5', '4.NF.C.6', '4.NF.C.7'],
    teacherNotes: 'Connect to money heavily. Use place value charts and base-ten blocks.',
    visualSupport: 'medium',
    recommendedTime: 'decimal-exploration'
  },

  // GRADE 5 TEMPLATES - Advanced Operations & Coordinate Geometry
  {
    id: 'grade5-decimal-operations',
    name: '5th Grade: Decimal Operations',
    description: 'Adding, subtracting, multiplying, and dividing decimals with real-world applications.',
    category: 'elementary-practice',
    gradeLevel: '5',
    subject: 'fractions-decimals',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '35 minutes',
    problemCount: '24 problems',
    generators: ['decimal-operations'],
    parameters: {
      'decimal-operations': { 
        decimalPlaces: 3, operations: ['add', 'subtract', 'multiply', 'divide'],
        includeWordProblems: true, realWorldContext: true,
        showEstimation: true, problemCount: 24
      }
    },
    tags: ['grade-5', 'decimals', 'operations', 'word-problems', 'estimation', 'real-world'],
    standardsAlignment: ['5.NBT.B.7'],
    teacherNotes: 'Emphasize estimation and place value understanding. Use money and measurement contexts.',
    visualSupport: 'low',
    recommendedTime: 'application-practice'
  },

  {
    id: 'grade5-volume-geometry',
    name: '5th Grade: Volume & 3D Geometry',
    description: 'Finding volume of rectangular prisms using unit cubes and formulas.',
    category: 'elementary-practice',
    gradeLevel: '5',
    subject: 'geometry-basic',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '30 minutes',
    problemCount: '16 problems',
    generators: ['volume-surface-area'],
    parameters: {
      'volume-surface-area': { 
        shapes: ['rectangular-prism'], useUnitCubes: true,
        showFormula: true, maxDimensions: 8, includeWordProblems: true,
        problemCount: 16
      }
    },
    tags: ['grade-5', 'volume', 'rectangular-prism', 'unit-cubes', 'formula', '3d-geometry'],
    standardsAlignment: ['5.MD.C.3', '5.MD.C.4', '5.MD.C.5'],
    teacherNotes: 'Use physical unit cubes when possible. Connect volume to real-world containers.',
    visualSupport: 'medium',
    recommendedTime: 'spatial-reasoning'
  },

  {
    id: 'grade5-coordinate-grid',
    name: '5th Grade: Coordinate Grid & Graphing',
    description: 'Plotting points and understanding coordinate relationships on a grid.',
    category: 'elementary-practice',
    gradeLevel: '5',
    subject: 'geometry-basic',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '25 minutes',
    problemCount: '20 problems',
    generators: ['coordinate-basics'],
    parameters: {
      'coordinate-basics': { 
        maxCoordinate: 10, includeOrdered: true,
        plotPoints: true, readCoordinates: true,
        includePatterns: true, firstQuadrant: true,
        problemCount: 20
      }
    },
    tags: ['grade-5', 'coordinates', 'graphing', 'ordered-pairs', 'grid', 'patterns'],
    standardsAlignment: ['5.G.A.1', '5.G.A.2'],
    teacherNotes: 'Start with first quadrant only. Use coordinate grid paper.',
    visualSupport: 'high',
    recommendedTime: 'coordinate-introduction'
  },

  // ELEMENTARY ASSESSMENT TEMPLATES - Comprehensive Grade-Level Evaluations
  {
    id: 'kindergarten-comprehensive-assessment',
    name: 'Kindergarten: End-of-Year Math Assessment',
    description: 'Comprehensive assessment covering counting, number recognition, basic shapes, and simple addition.',
    category: 'elementary-assessment',
    gradeLevel: 'K',
    subject: 'mixed',
    purpose: 'assessment',
    difficulty: 'standard',
    estimatedTime: '30 minutes',
    problemCount: '20 problems',
    generators: ['number-patterns', 'basic-shapes', 'addition'],
    parameters: {
      'number-patterns': { min: 0, max: 20, includeZero: true, visualMode: 'dots', problemCount: 8 },
      'basic-shapes': { shapes: ['circle', 'triangle', 'square', 'rectangle'], includeColors: true, problemCount: 6 },
      'addition': { minAddend: 1, maxAddend: 4, maxSum: 5, visualMode: 'pictures', problemCount: 6 }
    },
    tags: ['kindergarten', 'assessment', 'comprehensive', 'end-of-year'],
    standardsAlignment: ['K.CC.A.1', 'K.G.A.1', 'K.OA.A.1'],
    teacherNotes: 'Administer in small groups. Allow manipulatives and extra time as needed.',
    visualSupport: 'high',
    recommendedTime: 'assessment-week'
  },

  {
    id: 'grade2-quarterly-assessment',
    name: '2nd Grade: Quarterly Math Assessment',
    description: 'Mid-year assessment covering place value, two-digit operations, and basic measurement.',
    category: 'elementary-assessment',
    gradeLevel: '2',
    subject: 'mixed',
    purpose: 'assessment',
    difficulty: 'standard',
    estimatedTime: '45 minutes',
    problemCount: '25 problems',
    generators: ['place-value', 'addition', 'subtraction', 'length'],
    parameters: {
      'place-value': { maxNumber: 1000, includeExpanded: true, problemCount: 6 },
      'addition': { minAddend: 15, maxAddend: 89, requireRegrouping: 'mixed', problemCount: 7 },
      'subtraction': { minMinuend: 20, maxMinuend: 99, requireRegrouping: 'mixed', problemCount: 7 },
      'length': { units: ['inch', 'foot'], showRuler: true, problemCount: 5 }
    },
    tags: ['grade-2', 'assessment', 'quarterly', 'mixed-topics'],
    standardsAlignment: ['2.NBT.A.1', '2.NBT.B.5', '2.MD.A.1'],
    teacherNotes: 'Review assessment format beforehand. Provide reference materials for measurement.',
    visualSupport: 'medium',
    recommendedTime: 'quarterly-testing'
  },

  {
    id: 'grade4-state-prep-assessment',
    name: '4th Grade: State Test Preparation',
    description: 'Practice assessment mimicking state standardized test format and rigor.',
    category: 'elementary-assessment',
    gradeLevel: '4',
    subject: 'mixed',
    purpose: 'assessment',
    difficulty: 'standard',
    estimatedTime: '60 minutes',
    problemCount: '30 problems',
    generators: ['multiplication', 'fraction-operations', 'area', 'decimal-operations'],
    parameters: {
      'multiplication': { multiDigit: true, maxDigits: 2, includeWordProblems: true, problemCount: 8 },
      'fraction-operations': { operations: ['add', 'subtract'], likeDenominators: true, problemCount: 8 },
      'area': { shapes: ['rectangle', 'square'], includeWordProblems: true, problemCount: 7 },
      'decimal-operations': { decimalPlaces: 2, operations: ['add', 'subtract', 'compare'], problemCount: 7 }
    },
    tags: ['grade-4', 'assessment', 'state-test', 'standardized', 'preparation'],
    standardsAlignment: ['4.NBT.B.5', '4.NF.B.3', '4.MD.A.3', '4.NF.C.6'],
    teacherNotes: 'Practice test-taking strategies. Review answer formats before testing.',
    visualSupport: 'low',
    recommendedTime: 'test-preparation'
  },

  // SEASONAL & THEMED ELEMENTARY WORKSHEETS
  {
    id: 'fall-counting-harvest',
    name: 'Fall Theme: Counting & Harvest Math',
    description: 'Autumn-themed counting, addition, and measurement using pumpkins, leaves, and apples.',
    category: 'elementary-practice',
    gradeLevel: '1-2',
    subject: 'mixed',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '20 minutes',
    problemCount: '16 problems',
    generators: ['addition', 'subtraction', 'number-patterns'],
    parameters: {
      'addition': { minAddend: 1, maxAddend: 15, theme: 'harvest', visualMode: 'themed', problemCount: 6 },
      'subtraction': { maxMinuend: 20, theme: 'harvest', visualMode: 'themed', problemCount: 6 },
      'number-patterns': { max: 50, theme: 'autumn-leaves', skipCounting: [2,5,10], problemCount: 4 }
    },
    tags: ['fall', 'autumn', 'seasonal', 'themed', 'harvest', 'pumpkins'],
    standardsAlignment: ['1.OA.A.1', '2.OA.A.1'],
    teacherNotes: 'Perfect for October lessons. Connect to harvest festivals and autumn activities.',
    visualSupport: 'high',
    recommendedTime: 'seasonal-math',
    theme: 'fall'
  },

  {
    id: 'winter-holiday-math',
    name: 'Winter Holidays: Geometry & Patterns',
    description: 'Holiday-themed shapes, patterns, and symmetry with snowflakes and presents.',
    category: 'elementary-practice',
    gradeLevel: '2-3',
    subject: 'geometry-basic',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '25 minutes',
    problemCount: '18 problems',
    generators: ['basic-shapes', 'symmetry', 'properties'],
    parameters: {
      'basic-shapes': { shapes: ['triangle', 'square', 'hexagon'], theme: 'snowflakes', problemCount: 8 },
      'symmetry': { shapes: ['snowflake', 'tree', 'present'], showLines: true, problemCount: 6 },
      'properties': { focus: 'sides-corners', theme: 'holiday', problemCount: 4 }
    },
    tags: ['winter', 'holiday', 'seasonal', 'snowflakes', 'symmetry', 'geometry'],
    standardsAlignment: ['2.G.A.1', '3.G.A.2'],
    teacherNotes: 'Great for December lessons. Use real snowflake images to show natural symmetry.',
    visualSupport: 'high',
    recommendedTime: 'holiday-math',
    theme: 'winter'
  },

  {
    id: 'spring-garden-measurement',
    name: 'Spring Garden: Measurement & Data',
    description: 'Spring-themed measurement, graphing, and data collection with flowers and gardens.',
    category: 'elementary-practice',
    gradeLevel: '3-4',
    subject: 'measurement-units',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '30 minutes',
    problemCount: '20 problems',
    generators: ['length', 'time', 'money-operations'],
    parameters: {
      'length': { units: ['inch', 'foot'], theme: 'garden', includeFlowers: true, problemCount: 8 },
      'time': { timeUnits: ['hour', 'half-hour'], theme: 'gardening-schedule', problemCount: 6 },
      'money-operations': { maxAmount: 20, theme: 'flower-shop', includeWordProblems: true, problemCount: 6 }
    },
    tags: ['spring', 'garden', 'seasonal', 'measurement', 'flowers', 'growth'],
    standardsAlignment: ['3.MD.B.4', '3.MD.A.1', '3.OA.D.8'],
    teacherNotes: 'Connect to science units on plant growth. Use real gardening contexts.',
    visualSupport: 'medium',
    recommendedTime: 'spring-integration',
    theme: 'spring'
  },

  // Elementary Practice Templates (K-5) - LEGACY (keeping for compatibility)
  {
    id: 'k-counting-numbers-LEGACY',
    name: 'Kindergarten: Counting & Numbers (Legacy)',
    description: 'Basic counting, number recognition, and simple number writing for kindergarten students.',
    category: 'elementary-practice',
    gradeLevel: 'K',
    subject: 'numbers-place-value',
    purpose: 'practice',
    difficulty: 'beginner',
    estimatedTime: '15 minutes',
    problemCount: '15 problems',
    generators: ['number-patterns', 'number-comparison'],
    parameters: {
      'number-patterns': { min: 1, max: 10, patternType: 'counting', problemCount: 8 },
      'number-comparison': { min: 1, max: 10, operation: 'compare', problemCount: 7 }
    },
    tags: ['counting', 'number-recognition', 'kindergarten'],
    standardsAlignment: ['K.CC.A.1', 'K.CC.A.2', 'K.CC.A.3']
  },

  {
    id: 'k1-addition-pictures',
    name: 'K-1: Addition with Pictures',
    description: 'Visual addition problems using pictures and manipulatives, sums up to 10.',
    category: 'elementary-practice',
    gradeLevel: 'K-1',
    subject: 'basic-operations',
    purpose: 'practice',
    difficulty: 'beginner',
    estimatedTime: '20 minutes',
    problemCount: '20 problems',
    generators: ['addition'],
    parameters: {
      'addition': { minAddend: 1, maxAddend: 5, maxSum: 10, showPictures: true, problemCount: 20 }
    },
    tags: ['addition', 'visual', 'manipulatives'],
    standardsAlignment: ['K.OA.A.1', '1.OA.A.1']
  },

  {
    id: 'grade1-addition-subtraction',
    name: '1st Grade: Addition & Subtraction Facts',
    description: 'Basic addition and subtraction facts within 20, building fluency with number bonds.',
    category: 'elementary-practice',
    gradeLevel: '1',
    subject: 'basic-operations',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '25 minutes',
    problemCount: '30 problems',
    generators: ['addition', 'subtraction'],
    parameters: {
      'addition': { minAddend: 1, maxAddend: 10, maxSum: 20, problemCount: 15 },
      'subtraction': { minMinuend: 1, maxMinuend: 20, allowNegative: false, problemCount: 15 }
    },
    tags: ['addition', 'subtraction', 'number-facts', 'fluency'],
    standardsAlignment: ['1.OA.A.1', '1.OA.B.3', '1.OA.C.6']
  },

  {
    id: 'grade2-place-value',
    name: '2nd Grade: Place Value & Number Sense',
    description: 'Understanding place value, expanded form, and number comparisons up to 1000.',
    category: 'elementary-practice',
    gradeLevel: '2',
    subject: 'numbers-place-value',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '25 minutes',
    problemCount: '25 problems',
    generators: ['place-value', 'number-comparison', 'rounding'],
    parameters: {
      'place-value': { maxNumber: 1000, includeExpanded: true, problemCount: 10 },
      'number-comparison': { min: 1, max: 1000, problemCount: 10 },
      'rounding': { maxNumber: 100, roundTo: 'tens', problemCount: 5 }
    },
    tags: ['place-value', 'number-sense', 'comparing'],
    standardsAlignment: ['2.NBT.A.1', '2.NBT.A.2', '2.NBT.A.3']
  },

  {
    id: 'grade2-3-regrouping',
    name: '2nd-3rd Grade: Addition & Subtraction with Regrouping',
    description: 'Two-digit addition and subtraction with and without regrouping.',
    category: 'elementary-practice',
    gradeLevel: '2-3',
    subject: 'basic-operations',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '30 minutes',
    problemCount: '24 problems',
    generators: ['addition', 'subtraction'],
    parameters: {
      'addition': { minAddend: 10, maxAddend: 99, regrouping: 'mixed', problemCount: 12 },
      'subtraction': { minMinuend: 10, maxMinuend: 99, regrouping: 'mixed', problemCount: 12 }
    },
    tags: ['regrouping', 'two-digit', 'carrying', 'borrowing'],
    standardsAlignment: ['2.NBT.B.5', '2.NBT.B.7', '3.NBT.A.2']
  },

  {
    id: 'grade3-multiplication-intro',
    name: '3rd Grade: Introduction to Multiplication',
    description: 'Understanding multiplication concepts with arrays, groups, and basic facts 2-5.',
    category: 'elementary-practice',
    gradeLevel: '3',
    subject: 'basic-operations',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '25 minutes',
    problemCount: '30 problems',
    generators: ['multiplication'],
    parameters: {
      'multiplication': { minFactor: 2, maxFactor: 5, tables: [2,3,4,5], showArrays: true, problemCount: 30 }
    },
    tags: ['multiplication', 'arrays', 'groups', 'introduction'],
    standardsAlignment: ['3.OA.A.1', '3.OA.A.3', '3.OA.C.7']
  },

  {
    id: 'grade3-4-fractions-intro',
    name: '3rd-4th Grade: Introduction to Fractions',
    description: 'Understanding fractions as parts of a whole, comparing simple fractions.',
    category: 'elementary-practice',
    gradeLevel: '3-4',
    subject: 'fractions-decimals',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '25 minutes',
    problemCount: '20 problems',
    generators: ['basic-fractions', 'comparing-fractions'],
    parameters: {
      'basic-fractions': { maxDenominator: 8, includeVisual: true, problemCount: 12 },
      'comparing-fractions': { maxDenominator: 8, sameNumerator: false, problemCount: 8 }
    },
    tags: ['fractions', 'parts-whole', 'comparing', 'visual'],
    standardsAlignment: ['3.NF.A.1', '3.NF.A.3', '4.NF.A.2']
  },

  {
    id: 'grade4-multiplication-division',
    name: '4th Grade: Multiplication & Division Mastery',
    description: 'Fluency with multiplication tables and related division facts.',
    category: 'elementary-practice',
    gradeLevel: '4',
    subject: 'basic-operations',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '30 minutes',
    problemCount: '40 problems',
    generators: ['multiplication', 'division'],
    parameters: {
      'multiplication': { minFactor: 2, maxFactor: 12, tables: [2,3,4,5,6,7,8,9,10,11,12], problemCount: 25 },
      'division': { maxDividend: 144, basicFacts: true, problemCount: 15 }
    },
    tags: ['multiplication', 'division', 'facts', 'fluency'],
    standardsAlignment: ['4.NBT.B.5', '4.NBT.B.6', '4.OA.A.3']
  },

  {
    id: 'grade4-5-decimals',
    name: '4th-5th Grade: Introduction to Decimals',
    description: 'Understanding decimal place value, comparing decimals, and basic operations.',
    category: 'elementary-practice',
    gradeLevel: '4-5',
    subject: 'fractions-decimals',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '25 minutes',
    problemCount: '25 problems',
    generators: ['decimal-operations', 'fraction-decimal-conversion'],
    parameters: {
      'decimal-operations': { decimalPlaces: 2, operations: ['add', 'subtract'], maxValue: 10, problemCount: 15 },
      'fraction-decimal-conversion': { maxDenominator: 10, includeDecimalToFraction: true, problemCount: 10 }
    },
    tags: ['decimals', 'place-value', 'conversion'],
    standardsAlignment: ['4.NF.C.6', '5.NBT.A.3', '5.NBT.B.7']
  },

  {
    id: 'grade5-fractions-operations',
    name: '5th Grade: Fraction Operations',
    description: 'Adding, subtracting, and multiplying fractions with like and unlike denominators.',
    category: 'elementary-practice',
    gradeLevel: '5',
    subject: 'fractions-decimals',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '35 minutes',
    problemCount: '30 problems',
    generators: ['fraction-operations', 'mixed-numbers'],
    parameters: {
      'fraction-operations': { operations: ['add', 'subtract', 'multiply'], maxDenominator: 12, problemCount: 20 },
      'mixed-numbers': { operations: ['add', 'subtract'], maxWhole: 5, problemCount: 10 }
    },
    tags: ['fractions', 'operations', 'mixed-numbers'],
    standardsAlignment: ['5.NF.A.1', '5.NF.A.2', '5.NF.B.4']
  },

  // MIDDLE SCHOOL TEMPLATES (6-8) - Bridging to Algebra

  // GRADE 6 TEMPLATES - Ratios, Rates, and Proportional Reasoning
  {
    id: 'grade6-ratios-rates-intro',
    name: '6th Grade: Understanding Ratios & Rates',
    description: 'Introduction to ratios, rates, and unit rates with real-world applications and visual models.',
    category: 'middle-practice',
    gradeLevel: '6',
    subject: 'pre-algebra',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '35 minutes',
    problemCount: '24 problems',
    generators: ['ratios'],
    parameters: {
      'ratios': { 
        includeWordProblems: true, maxValue: 24, showVisualModels: true,
        includeUnitRates: true, realWorldContexts: ['recipes', 'sports', 'shopping'],
        problemCount: 24
      }
    },
    tags: ['grade-6', 'ratios', 'rates', 'unit-rates', 'proportional-reasoning', 'real-world'],
    standardsAlignment: ['6.RP.A.1', '6.RP.A.2', '6.RP.A.3'],
    teacherNotes: 'Use double number lines and ratio tables. Connect to cooking and sports statistics.',
    algebraicThinking: 'medium',
    realWorldConnections: 'high',
    recommendedTime: 'concept-introduction'
  },

  {
    id: 'grade6-proportional-relationships',
    name: '6th Grade: Solving Proportions',
    description: 'Setting up and solving proportions using cross multiplication and equivalent ratios.',
    category: 'middle-practice',
    gradeLevel: '6',
    subject: 'pre-algebra',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '30 minutes',
    problemCount: '20 problems',
    generators: ['proportions'],
    parameters: {
      'proportions': { 
        includeUnits: true, realWorld: true, showMultipleMethods: true,
        contexts: ['scale-factor', 'unit-conversion', 'similar-figures'],
        maxValue: 50, problemCount: 20
      }
    },
    tags: ['grade-6', 'proportions', 'cross-multiplication', 'scale-factor', 'similar-figures'],
    standardsAlignment: ['6.RP.A.3', '6.RP.A.3.A', '6.RP.A.3.B'],
    teacherNotes: 'Teach multiple solving methods: equivalent ratios, cross products, unit rates.',
    algebraicThinking: 'medium',
    realWorldConnections: 'high',
    recommendedTime: 'skill-development'
  },

  {
    id: 'grade6-percent-applications-advanced',
    name: '6th Grade: Advanced Percent Applications',
    description: 'Complex percent problems including percent increase/decrease, tax, tips, and markups.',
    category: 'middle-practice',
    gradeLevel: '6',
    subject: 'fractions-decimals',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '40 minutes',
    problemCount: '25 problems',
    generators: ['percentages'],
    parameters: {
      'percentages': { 
        type: 'applications', includeWordProblems: true, includeVisual: false,
        contexts: ['shopping', 'finance', 'statistics', 'science'],
        includePercentChange: true, includeMultiStep: true,
        problemCount: 25
      }
    },
    tags: ['grade-6', 'percentages', 'percent-change', 'applications', 'finance', 'multi-step'],
    standardsAlignment: ['6.RP.A.3.C', '6.RP.A.3.D'],
    teacherNotes: 'Connect to financial literacy. Use real store advertisements and receipts.',
    algebraicThinking: 'low',
    realWorldConnections: 'high',
    recommendedTime: 'application-practice'
  },

  {
    id: 'grade6-integers-introduction',
    name: '6th Grade: Introduction to Integers',
    description: 'Understanding positive and negative numbers, ordering, and basic operations.',
    category: 'middle-practice',
    gradeLevel: '6',
    subject: 'pre-algebra',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '30 minutes',
    problemCount: '28 problems',
    generators: ['integers'],
    parameters: {
      'integers': { 
        min: -20, max: 20, operations: ['compare', 'order', 'add', 'subtract'],
        showNumberLine: true, includeWordProblems: true,
        contexts: ['temperature', 'elevation', 'bank-account'],
        problemCount: 28
      }
    },
    tags: ['grade-6', 'integers', 'negative-numbers', 'number-line', 'real-world-contexts'],
    standardsAlignment: ['6.NS.C.5', '6.NS.C.6', '6.NS.C.7'],
    teacherNotes: 'Use number line extensively. Connect to real-world contexts like temperature.',
    algebraicThinking: 'medium',
    realWorldConnections: 'medium',
    recommendedTime: 'number-sense-building'
  },

  {
    id: 'grade6-algebraic-expressions-intro',
    name: '6th Grade: Writing Algebraic Expressions',
    description: 'Translating word phrases into algebraic expressions and evaluating expressions.',
    category: 'middle-practice',
    gradeLevel: '6',
    subject: 'pre-algebra',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '35 minutes',
    problemCount: '22 problems',
    generators: ['algebraic-expressions', 'variables'],
    parameters: {
      'algebraic-expressions': { 
        includeTranslation: true, maxTerms: 3, includeDistributive: false,
        variableTypes: ['x', 'n', 't'], realWorldContexts: true,
        problemCount: 14
      },
      'variables': { 
        includeEvaluation: true, maxCoefficient: 8, maxValue: 20,
        substituteValues: [1, 2, 3, 4, 5], problemCount: 8
      }
    },
    tags: ['grade-6', 'algebraic-expressions', 'variables', 'evaluation', 'translation'],
    standardsAlignment: ['6.EE.A.2', '6.EE.A.2.A', '6.EE.A.2.C'],
    teacherNotes: 'Focus on translating verbal phrases. Use concrete examples before abstract.',
    algebraicThinking: 'high',
    realWorldConnections: 'medium',
    recommendedTime: 'algebraic-introduction'
  },

  // GRADE 7 TEMPLATES - Integer Operations and Algebraic Thinking
  {
    id: 'grade7-integer-operations-mastery',
    name: '7th Grade: Integer Operations Mastery',
    description: 'Comprehensive practice with all four operations on integers, including order of operations.',
    category: 'middle-practice',
    gradeLevel: '7',
    subject: 'pre-algebra',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '40 minutes',
    problemCount: '32 problems',
    generators: ['integers'],
    parameters: {
      'integers': { 
        min: -50, max: 50, operations: ['add', 'subtract', 'multiply', 'divide'],
        includeOrderOfOperations: true, includeWordProblems: true,
        showStrategies: true, mixedOperations: true,
        problemCount: 32
      }
    },
    tags: ['grade-7', 'integers', 'four-operations', 'order-of-operations', 'strategies'],
    standardsAlignment: ['7.NS.A.1', '7.NS.A.2', '7.NS.A.3'],
    teacherNotes: 'Emphasize integer rules and patterns. Use real-world problem contexts.',
    algebraicThinking: 'medium',
    realWorldConnections: 'medium',
    recommendedTime: 'skill-mastery'
  },

  {
    id: 'grade7-algebraic-expressions-advanced',
    name: '7th Grade: Simplifying Algebraic Expressions',
    description: 'Combining like terms, using distributive property, and factoring expressions.',
    category: 'middle-practice',
    gradeLevel: '7',
    subject: 'pre-algebra',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '35 minutes',
    problemCount: '24 problems',
    generators: ['algebraic-expressions'],
    parameters: {
      'algebraic-expressions': { 
        includeDistributive: true, maxTerms: 5, includeNegativeCoefficients: true,
        combineLikeTerms: true, factorOut: true, 
        difficultyProgression: true, problemCount: 24
      }
    },
    tags: ['grade-7', 'algebraic-expressions', 'like-terms', 'distributive-property', 'factoring'],
    standardsAlignment: ['7.EE.A.1', '7.EE.A.2'],
    teacherNotes: 'Build on prior knowledge systematically. Show multiple equivalent forms.',
    algebraicThinking: 'high',
    realWorldConnections: 'low',
    recommendedTime: 'algebraic-skill-building'
  },

  {
    id: 'grade7-equations-introduction',
    name: '7th Grade: Solving One & Two-Step Equations',
    description: 'Introduction to solving linear equations with inverse operations and checking solutions.',
    category: 'middle-practice',
    gradeLevel: '7',
    subject: 'pre-algebra',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '40 minutes',
    problemCount: '26 problems',
    generators: ['one-step-equations', 'two-step-equations'],
    parameters: {
      'one-step-equations': { 
        coefficientRange: [-12, 12], includeNegatives: true, 
        showChecking: true, includeWordProblems: true, problemCount: 12
      },
      'two-step-equations': { 
        coefficientRange: [-10, 10], includeNegatives: true,
        showSteps: true, includeWordProblems: true, problemCount: 14
      }
    },
    tags: ['grade-7', 'equations', 'one-step', 'two-step', 'inverse-operations', 'checking'],
    standardsAlignment: ['7.EE.B.4', '7.EE.B.4.A'],
    teacherNotes: 'Emphasize inverse operations and checking solutions. Use balance model.',
    algebraicThinking: 'high',
    realWorldConnections: 'medium',
    recommendedTime: 'equation-solving'
  },

  {
    id: 'grade7-proportional-relationships-graphs',
    name: '7th Grade: Proportional Relationships & Graphs',
    description: 'Identifying and graphing proportional relationships, finding unit rates from graphs.',
    category: 'middle-practice',
    gradeLevel: '7',
    subject: 'pre-algebra',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '35 minutes',
    problemCount: '20 problems',
    generators: ['graphing-basics', 'proportions'],
    parameters: {
      'graphing-basics': { 
        includeProportional: true, showUnitRate: true, 
        coordinateMax: 12, includeNonProportional: true, problemCount: 12
      },
      'proportions': { 
        graphicalRepresentation: true, findMissingValue: true,
        includeConstantOfProportionality: true, problemCount: 8
      }
    },
    tags: ['grade-7', 'proportional-relationships', 'graphing', 'unit-rate', 'constant-proportionality'],
    standardsAlignment: ['7.RP.A.2', '7.RP.A.2.A', '7.RP.A.2.D'],
    teacherNotes: 'Connect tables, graphs, and equations. Emphasize y = kx form.',
    algebraicThinking: 'high',
    realWorldConnections: 'medium',
    recommendedTime: 'relationship-analysis'
  },

  {
    id: 'grade7-probability-statistics',
    name: '7th Grade: Probability & Statistics',
    description: 'Basic probability concepts, experimental vs theoretical probability, and simple statistics.',
    category: 'middle-practice',
    gradeLevel: '7',
    subject: 'mixed',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '30 minutes',
    problemCount: '22 problems',
    generators: ['statistics', 'probability'],
    parameters: {
      'statistics': { 
        measures: ['mean', 'median', 'mode', 'range'], 
        dataTypes: ['list', 'frequency'], maxDataSize: 12, problemCount: 12
      },
      'probability': { 
        types: ['simple', 'compound'], includeExperimental: true,
        contexts: ['coins', 'dice', 'spinners', 'cards'], problemCount: 10
      }
    },
    tags: ['grade-7', 'probability', 'statistics', 'mean', 'median', 'experimental'],
    standardsAlignment: ['7.SP.C.5', '7.SP.C.6', '7.SP.C.7'],
    teacherNotes: 'Use hands-on experiments. Connect theoretical and experimental probability.',
    algebraicThinking: 'low',
    realWorldConnections: 'high',
    recommendedTime: 'data-analysis'
  },

  // GRADE 8 TEMPLATES - Linear Functions and Systems
  {
    id: 'grade8-linear-functions',
    name: '8th Grade: Linear Functions & Slope',
    description: 'Understanding linear functions, calculating slope, and writing equations in slope-intercept form.',
    category: 'middle-practice',
    gradeLevel: '8',
    subject: 'pre-algebra',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '45 minutes',
    problemCount: '28 problems',
    generators: ['linear-equations', 'graphing-basics'],
    parameters: {
      'linear-equations': { 
        forms: ['slope-intercept', 'point-slope'], includeSlope: true,
        includeIntercepts: true, graphFromEquation: true, problemCount: 16
      },
      'graphing-basics': { 
        includeSlope: true, includeIntercept: true, 
        findEquationFromGraph: true, coordinateMax: 8, problemCount: 12
      }
    },
    tags: ['grade-8', 'linear-functions', 'slope', 'y-intercept', 'slope-intercept', 'graphing'],
    standardsAlignment: ['8.F.A.3', '8.F.B.4', '8.EE.B.5'],
    teacherNotes: 'Connect slope to rate of change. Use real-world linear relationships.',
    algebraicThinking: 'high',
    realWorldConnections: 'medium',
    recommendedTime: 'function-concepts'
  },

  {
    id: 'grade8-systems-equations',
    name: '8th Grade: Systems of Linear Equations',
    description: 'Solving systems of linear equations by graphing, substitution, and elimination methods.',
    category: 'middle-practice',
    gradeLevel: '8',
    subject: 'pre-algebra',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '40 minutes',
    problemCount: '18 problems',
    generators: ['systems-of-equations'],
    parameters: {
      'systems-of-equations': { 
        methods: ['graphing', 'substitution', 'elimination'],
        solutionTypes: ['one-solution', 'no-solution', 'infinite-solutions'],
        includeWordProblems: true, maxCoefficient: 6, problemCount: 18
      }
    },
    tags: ['grade-8', 'systems-equations', 'substitution', 'elimination', 'graphing-systems'],
    standardsAlignment: ['8.EE.C.8', '8.EE.C.8.A', '8.EE.C.8.B'],
    teacherNotes: 'Show multiple solution methods. Discuss when each method is most efficient.',
    algebraicThinking: 'high',
    realWorldConnections: 'medium',
    recommendedTime: 'advanced-algebra'
  },

  {
    id: 'grade8-exponents-scientific-notation',
    name: '8th Grade: Exponents & Scientific Notation',
    description: 'Laws of exponents, scientific notation, and operations with numbers in scientific notation.',
    category: 'middle-practice',
    gradeLevel: '8',
    subject: 'pre-algebra',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '35 minutes',
    problemCount: '26 problems',
    generators: ['exponents-radicals'],
    parameters: {
      'exponents-radicals': { 
        includeScientificNotation: true, exponentsOnly: true,
        lawsOfExponents: ['product', 'quotient', 'power'],
        realWorldApplications: true, maxExponent: 8, problemCount: 26
      }
    },
    tags: ['grade-8', 'exponents', 'scientific-notation', 'laws-of-exponents', 'applications'],
    standardsAlignment: ['8.EE.A.1', '8.EE.A.3', '8.EE.A.4'],
    teacherNotes: 'Connect to science applications. Use very large and very small numbers.',
    algebraicThinking: 'medium',
    realWorldConnections: 'high',
    recommendedTime: 'number-operations'
  },

  // MIDDLE SCHOOL ASSESSMENT TEMPLATES - Comprehensive Evaluations
  {
    id: 'grade6-comprehensive-assessment',
    name: '6th Grade: Comprehensive Math Assessment',
    description: 'End-of-year assessment covering ratios, percents, integers, and algebraic expressions.',
    category: 'middle-assessment',
    gradeLevel: '6',
    subject: 'mixed',
    purpose: 'assessment',
    difficulty: 'standard',
    estimatedTime: '60 minutes',
    problemCount: '35 problems',
    generators: ['ratios', 'percentages', 'integers', 'algebraic-expressions'],
    parameters: {
      'ratios': { includeWordProblems: true, maxValue: 20, includeUnitRates: true, problemCount: 10 },
      'percentages': { type: 'applications', includeWordProblems: true, problemCount: 8 },
      'integers': { min: -20, max: 20, operations: ['add', 'subtract', 'compare'], problemCount: 10 },
      'algebraic-expressions': { includeTranslation: true, includeEvaluation: true, maxTerms: 3, problemCount: 7 }
    },
    tags: ['grade-6', 'assessment', 'comprehensive', 'end-of-year', 'mixed-topics'],
    standardsAlignment: ['6.RP.A.1', '6.RP.A.3', '6.NS.C.6', '6.EE.A.2'],
    teacherNotes: 'Allow reference sheet for formulas. Review assessment format beforehand.',
    algebraicThinking: 'medium',
    realWorldConnections: 'high',
    recommendedTime: 'summative-assessment'
  },

  {
    id: 'grade7-mid-year-assessment',
    name: '7th Grade: Mid-Year Math Assessment',
    description: 'Comprehensive mid-year evaluation covering integers, expressions, equations, and proportions.',
    category: 'middle-assessment',
    gradeLevel: '7',
    subject: 'mixed',
    purpose: 'assessment',
    difficulty: 'standard',
    estimatedTime: '75 minutes',
    problemCount: '40 problems',
    generators: ['integers', 'algebraic-expressions', 'one-step-equations', 'two-step-equations', 'proportions'],
    parameters: {
      'integers': { min: -50, max: 50, operations: ['add', 'subtract', 'multiply', 'divide'], problemCount: 12 },
      'algebraic-expressions': { includeDistributive: true, combineLikeTerms: true, problemCount: 8 },
      'one-step-equations': { coefficientRange: [-10, 10], includeNegatives: true, problemCount: 8 },
      'two-step-equations': { coefficientRange: [-8, 8], includeNegatives: true, problemCount: 8 },
      'proportions': { realWorld: true, includeWordProblems: true, problemCount: 4 }
    },
    tags: ['grade-7', 'assessment', 'mid-year', 'comprehensive', 'pre-algebra'],
    standardsAlignment: ['7.NS.A.1', '7.EE.A.1', '7.EE.B.4', '7.RP.A.2'],
    teacherNotes: 'Focus on algebraic reasoning and integer operations. Allow calculator for computation.',
    algebraicThinking: 'high',
    realWorldConnections: 'medium',
    recommendedTime: 'mid-year-evaluation'
  },

  {
    id: 'grade8-algebra-readiness',
    name: '8th Grade: Algebra I Readiness Assessment',
    description: 'Pre-algebra skills assessment to determine readiness for Algebra I coursework.',
    category: 'middle-assessment',
    gradeLevel: '8',
    subject: 'pre-algebra',
    purpose: 'diagnostic',
    difficulty: 'standard',
    estimatedTime: '90 minutes',
    problemCount: '45 problems',
    generators: ['linear-equations', 'systems-of-equations', 'algebraic-expressions', 'graphing-basics', 'exponents-radicals'],
    parameters: {
      'linear-equations': { forms: ['slope-intercept'], includeSlope: true, problemCount: 12 },
      'systems-of-equations': { methods: ['substitution', 'elimination'], problemCount: 8 },
      'algebraic-expressions': { includeDistributive: true, combineLikeTerms: true, problemCount: 10 },
      'graphing-basics': { includeSlope: true, includeIntercept: true, problemCount: 8 },
      'exponents-radicals': { exponentsOnly: true, lawsOfExponents: ['product', 'quotient'], problemCount: 7 }
    },
    tags: ['grade-8', 'assessment', 'algebra-readiness', 'placement', 'comprehensive'],
    standardsAlignment: ['8.F.A.3', '8.EE.C.8', '8.EE.A.1', '8.F.B.4'],
    teacherNotes: 'Use for high school course placement decisions. Provide graphing paper.',
    algebraicThinking: 'high',
    realWorldConnections: 'low',
    recommendedTime: 'placement-testing'
  },

  // PRE-ALGEBRA DIAGNOSTIC AND PLACEMENT TESTS
  {
    id: 'pre-algebra-diagnostic',
    name: 'Pre-Algebra: Diagnostic Assessment',
    description: 'Comprehensive diagnostic to identify strengths and gaps in pre-algebraic concepts.',
    category: 'middle-assessment',
    gradeLevel: '7-8',
    subject: 'pre-algebra',
    purpose: 'diagnostic',
    difficulty: 'mixed',
    estimatedTime: '60 minutes',
    problemCount: '36 problems',
    generators: ['integers', 'algebraic-expressions', 'one-step-equations', 'two-step-equations', 'ratios', 'percentages'],
    parameters: {
      'integers': { min: -25, max: 25, operations: ['add', 'subtract', 'multiply'], problemCount: 8 },
      'algebraic-expressions': { includeTranslation: true, includeEvaluation: true, maxTerms: 4, problemCount: 6 },
      'one-step-equations': { coefficientRange: [-8, 8], problemCount: 6 },
      'two-step-equations': { coefficientRange: [-6, 6], problemCount: 6 },
      'ratios': { includeUnitRates: true, includeWordProblems: true, problemCount: 5 },
      'percentages': { type: 'basic', includeWordProblems: true, problemCount: 5 }
    },
    tags: ['diagnostic', 'pre-algebra', 'skills-assessment', 'gaps-analysis', 'mixed-levels'],
    standardsAlignment: ['7.NS.A.1', '7.EE.A.1', '7.EE.B.4', '6.RP.A.3'],
    teacherNotes: 'Use results to plan differentiated instruction. Identify specific skill gaps.',
    algebraicThinking: 'medium',
    realWorldConnections: 'medium',
    recommendedTime: 'beginning-of-year'
  },

  {
    id: 'algebra1-placement-test',
    name: 'Algebra I: Placement Test',
    description: 'Comprehensive placement test to determine student readiness for Algebra I concepts.',
    category: 'middle-assessment',
    gradeLevel: '8-9',
    subject: 'pre-algebra',
    purpose: 'diagnostic',
    difficulty: 'advanced',
    estimatedTime: '90 minutes',
    problemCount: '50 problems',
    generators: ['linear-equations', 'systems-of-equations', 'algebraic-expressions', 'polynomials', 'factoring'],
    parameters: {
      'linear-equations': { forms: ['slope-intercept', 'standard'], includeWordProblems: true, problemCount: 15 },
      'systems-of-equations': { methods: ['graphing', 'substitution', 'elimination'], problemCount: 10 },
      'algebraic-expressions': { includeDistributive: true, combineLikeTerms: true, problemCount: 10 },
      'polynomials': { operations: ['add', 'subtract', 'multiply'], maxDegree: 2, problemCount: 10 },
      'factoring': { types: ['gcf', 'trinomials'], problemCount: 5 }
    },
    tags: ['placement', 'algebra-1', 'readiness', 'comprehensive', 'high-school-prep'],
    standardsAlignment: ['A-SSE.A.1', 'A-REI.B.3', 'A-APR.A.1'],
    teacherNotes: 'High-stakes placement decision. Ensure quiet testing environment.',
    algebraicThinking: 'high',
    realWorldConnections: 'low',
    recommendedTime: 'placement-testing'
  },

  // TRANSITION TEMPLATES - Elementary to Middle School Bridge
  {
    id: 'elementary-to-middle-bridge',
    name: 'Elementary to Middle School: Math Bridge',
    description: 'Transition worksheet bridging 5th grade concepts to 6th grade readiness.',
    category: 'special-purpose',
    gradeLevel: '5-6',
    subject: 'mixed',
    purpose: 'review',
    difficulty: 'standard',
    estimatedTime: '45 minutes',
    problemCount: '30 problems',
    generators: ['fraction-operations', 'decimal-operations', 'ratios', 'basic-geometry'],
    parameters: {
      'fraction-operations': { operations: ['add', 'subtract'], mixedNumbers: true, problemCount: 8 },
      'decimal-operations': { decimalPlaces: 2, operations: ['add', 'subtract', 'multiply'], problemCount: 8 },
      'ratios': { simple: true, includeWordProblems: true, maxValue: 12, problemCount: 8 },
      'basic-geometry': { includeArea: true, includePerimeter: true, basicShapes: true, problemCount: 6 }
    },
    tags: ['transition', 'bridge', 'elementary-to-middle', 'readiness', 'summer-prep'],
    standardsAlignment: ['5.NF.A.1', '5.NBT.B.7', '6.RP.A.1'],
    teacherNotes: 'Perfect for summer bridge programs or beginning of 6th grade review.',
    algebraicThinking: 'low',
    realWorldConnections: 'medium',
    recommendedTime: 'transition-period'
  },

  {
    id: 'integers-introduction-bridge',
    name: 'Introduction to Negative Numbers: Bridge Worksheet',
    description: 'Gentle introduction to negative numbers and integer operations for transitioning students.',
    category: 'special-purpose',
    gradeLevel: '6',
    subject: 'pre-algebra',
    purpose: 'practice',
    difficulty: 'beginner',
    estimatedTime: '30 minutes',
    problemCount: '24 problems',
    generators: ['integers'],
    parameters: {
      'integers': { 
        min: -10, max: 10, operations: ['compare', 'order', 'add'],
        showNumberLine: true, includeWordProblems: true,
        contexts: ['temperature', 'elevation'], scaffolded: true,
        problemCount: 24
      }
    },
    tags: ['integers', 'negative-numbers', 'introduction', 'scaffolded', 'transition'],
    standardsAlignment: ['6.NS.C.5', '6.NS.C.6'],
    teacherNotes: 'Use concrete examples and number line extensively. Start with familiar contexts.',
    algebraicThinking: 'low',
    realWorldConnections: 'high',
    recommendedTime: 'concept-introduction'
  },

  // Middle School Practice Templates (6-8) - LEGACY
  {
    id: 'grade6-ratios-proportions-LEGACY',
    name: '6th Grade: Ratios & Proportions',
    description: 'Understanding ratios, rates, and solving proportion problems.',
    category: 'middle-practice',
    gradeLevel: '6',
    subject: 'pre-algebra',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '30 minutes',
    problemCount: '25 problems',
    generators: ['ratios', 'proportions'],
    parameters: {
      'ratios': { includeWordProblems: true, maxValue: 20, problemCount: 15 },
      'proportions': { includeUnits: true, realWorld: true, problemCount: 10 }
    },
    tags: ['ratios', 'proportions', 'rates', 'word-problems'],
    standardsAlignment: ['6.RP.A.1', '6.RP.A.2', '6.RP.A.3']
  },

  {
    id: 'grade6-percent-applications',
    name: '6th Grade: Percent Applications',
    description: 'Real-world percent problems including tax, tips, discounts, and markups.',
    category: 'middle-practice',
    gradeLevel: '6',
    subject: 'fractions-decimals',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '30 minutes',
    problemCount: '20 problems',
    generators: ['percentages'],
    parameters: {
      'percentages': { type: 'applications', includeWordProblems: true, includeVisual: false, problemCount: 20 }
    },
    tags: ['percentages', 'real-world', 'applications'],
    standardsAlignment: ['6.RP.A.3c', '6.RP.A.3d']
  },

  {
    id: 'grade7-integer-operations',
    name: '7th Grade: Integer Operations',
    description: 'Adding, subtracting, multiplying, and dividing positive and negative integers.',
    category: 'middle-practice',
    gradeLevel: '7',
    subject: 'pre-algebra',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '30 minutes',
    problemCount: '32 problems',
    generators: ['integers'],
    parameters: {
      'integers': { min: -25, max: 25, operations: ['add', 'subtract', 'multiply', 'divide'], problemCount: 32 }
    },
    tags: ['integers', 'negative-numbers', 'operations'],
    standardsAlignment: ['7.NS.A.1', '7.NS.A.2', '7.NS.A.3']
  },

  {
    id: 'grade7-algebraic-expressions',
    name: '7th Grade: Algebraic Expressions',
    description: 'Simplifying expressions, combining like terms, and evaluating expressions.',
    category: 'middle-practice',
    gradeLevel: '7',
    subject: 'pre-algebra',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '25 minutes',
    problemCount: '20 problems',
    generators: ['algebraic-expressions', 'variables'],
    parameters: {
      'algebraic-expressions': { includeDistributive: true, maxTerms: 4, problemCount: 12 },
      'variables': { includeEvaluation: true, maxCoefficient: 10, problemCount: 8 }
    },
    tags: ['algebra', 'expressions', 'variables', 'like-terms'],
    standardsAlignment: ['7.EE.A.1', '7.EE.A.2']
  },

  {
    id: 'grade8-linear-equations',
    name: '8th Grade: Linear Equations',
    description: 'Solving multi-step linear equations and graphing linear functions.',
    category: 'middle-practice',
    gradeLevel: '8',
    subject: 'pre-algebra',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '35 minutes',
    problemCount: '20 problems',
    generators: ['one-step-equations', 'two-step-equations', 'graphing-basics'],
    parameters: {
      'one-step-equations': { coefficientRange: [-10, 10], problemCount: 6 },
      'two-step-equations': { coefficientRange: [-15, 15], problemCount: 8 },
      'graphing-basics': { includeSlope: true, includeIntercept: true, problemCount: 6 }
    },
    tags: ['equations', 'graphing', 'linear-functions'],
    standardsAlignment: ['8.EE.C.7', '8.F.A.3', '8.F.B.4']
  },

  // HIGH SCHOOL TEMPLATES (9-12) - College Preparation

  // ALGEBRA I TEMPLATES (9-10) - Foundation for Advanced Mathematics
  {
    id: 'algebra1-linear-equations-comprehensive',
    name: 'Algebra I: Linear Equations & Inequalities',
    description: 'Comprehensive practice with linear equations, inequalities, and graphing in multiple forms.',
    category: 'high-practice',
    gradeLevel: '9-10',
    subject: 'algebra',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '50 minutes',
    problemCount: '30 problems',
    generators: ['linear-equations', 'inequalities', 'graphing'],
    parameters: {
      'linear-equations': { 
        forms: ['slope-intercept', 'standard', 'point-slope'], 
        includeWordProblems: true, includeParallel: true, 
        includePerpendicular: true, problemCount: 12
      },
      'inequalities': { 
        types: ['linear', 'compound'], includeGraphing: true,
        includeWordProblems: true, problemCount: 10
      },
      'graphing': { 
        includeSlope: true, includeIntercepts: true,
        includeTransformations: true, problemCount: 8
      }
    },
    tags: ['algebra-1', 'linear-equations', 'inequalities', 'graphing', 'slope-intercept'],
    standardsAlignment: ['A-REI.B.3', 'A-CED.A.2', 'F-IF.B.4'],
    teacherNotes: 'Connect multiple representations: table, graph, equation. Emphasize real-world modeling.',
    mathematicalPractices: ['MP1', 'MP2', 'MP4', 'MP6'],
    collegeReadiness: 'foundational',
    recommendedTime: 'unit-practice'
  },

  {
    id: 'algebra1-quadratic-functions',
    name: 'Algebra I: Quadratic Functions & Equations',
    description: 'Quadratic functions, factoring, completing the square, and quadratic formula applications.',
    category: 'high-practice',
    gradeLevel: '9-10',
    subject: 'algebra',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '55 minutes',
    problemCount: '28 problems',
    generators: ['quadratic-equations', 'factoring', 'graphing'],
    parameters: {
      'quadratic-equations': { 
        methods: ['factoring', 'quadratic-formula', 'completing-square'],
        includeWordProblems: true, includeDiscriminant: true, problemCount: 12
      },
      'factoring': { 
        types: ['gcf', 'trinomials', 'difference-squares', 'sum-difference-cubes'],
        difficultyProgression: true, problemCount: 10
      },
      'graphing': { 
        quadraticFunctions: true, includeVertex: true, 
        includeAxisSymmetry: true, includeTransformations: true, problemCount: 6
      }
    },
    tags: ['algebra-1', 'quadratics', 'factoring', 'quadratic-formula', 'parabolas'],
    standardsAlignment: ['A-SSE.B.3', 'A-REI.B.4', 'F-IF.C.8'],
    teacherNotes: 'Show connections between factored, vertex, and standard forms. Use graphing technology.',
    mathematicalPractices: ['MP1', 'MP2', 'MP3', 'MP7'],
    collegeReadiness: 'foundational',
    recommendedTime: 'major-unit'
  },

  {
    id: 'algebra1-systems-modeling',
    name: 'Algebra I: Systems of Equations & Modeling',
    description: 'Solving systems of linear equations and using them to model real-world situations.',
    category: 'high-practice',
    gradeLevel: '9-10',
    subject: 'algebra',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '45 minutes',
    problemCount: '20 problems',
    generators: ['systems-of-equations', 'linear-equations'],
    parameters: {
      'systems-of-equations': { 
        methods: ['graphing', 'substitution', 'elimination'],
        solutionTypes: ['one-solution', 'no-solution', 'infinite-solutions'],
        includeWordProblems: true, realWorldModeling: true, problemCount: 15
      },
      'linear-equations': { 
        systemsContext: true, modelingFocus: true,
        includeConstraints: true, problemCount: 5
      }
    },
    tags: ['algebra-1', 'systems-equations', 'modeling', 'real-world', 'linear-programming'],
    standardsAlignment: ['A-REI.C.6', 'A-CED.A.3', 'A-REI.D.12'],
    teacherNotes: 'Emphasize choosing appropriate methods. Connect to optimization problems.',
    mathematicalPractices: ['MP1', 'MP4', 'MP5', 'MP6'],
    collegeReadiness: 'foundational',
    recommendedTime: 'modeling-unit'
  },

  {
    id: 'algebra1-exponential-functions',
    name: 'Algebra I: Exponential Functions & Growth',
    description: 'Exponential functions, growth and decay models, and logarithmic introduction.',
    category: 'high-practice',
    gradeLevel: '9-10',
    subject: 'algebra',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '40 minutes',
    problemCount: '24 problems',
    generators: ['exponents-radicals', 'functions'],
    parameters: {
      'exponents-radicals': { 
        exponentialFunctions: true, includeGrowthDecay: true,
        realWorldApplications: true, includeCompoundInterest: true, problemCount: 16
      },
      'functions': { 
        exponentialFocus: true, includeTransformations: true,
        includeGraphing: true, problemCount: 8
      }
    },
    tags: ['algebra-1', 'exponential-functions', 'growth-decay', 'compound-interest', 'modeling'],
    standardsAlignment: ['F-LE.A.2', 'F-LE.B.5', 'A-SSE.B.3'],
    teacherNotes: 'Connect to compound interest, population growth, and radioactive decay.',
    mathematicalPractices: ['MP2', 'MP4', 'MP6'],
    collegeReadiness: 'foundational',
    recommendedTime: 'functions-unit'
  },

  // ALGEBRA II TEMPLATES (10-11) - Advanced Algebraic Concepts
  {
    id: 'algebra2-polynomial-functions',
    name: 'Algebra II: Polynomial Functions & Operations',
    description: 'Higher-degree polynomials, operations, factoring, and graphing polynomial functions.',
    category: 'high-practice',
    gradeLevel: '10-11',
    subject: 'algebra',
    purpose: 'practice',
    difficulty: 'advanced',
    estimatedTime: '60 minutes',
    problemCount: '32 problems',
    generators: ['polynomials', 'factoring', 'functions'],
    parameters: {
      'polynomials': { 
        operations: ['add', 'subtract', 'multiply', 'divide'], 
        maxDegree: 4, includeRemainder: true, syntheticDivision: true, problemCount: 14
      },
      'factoring': { 
        types: ['gcf', 'grouping', 'trinomials', 'sum-difference-cubes'],
        higherDegree: true, complexFactoring: true, problemCount: 10
      },
      'functions': { 
        polynomialFunctions: true, includeEndBehavior: true,
        includeZeros: true, includeGraphing: true, problemCount: 8
      }
    },
    tags: ['algebra-2', 'polynomials', 'factoring', 'synthetic-division', 'end-behavior'],
    standardsAlignment: ['A-APR.B.2', 'A-APR.B.3', 'F-IF.C.7'],
    teacherNotes: 'Use graphing technology to verify algebraic work. Connect zeros to factors.',
    mathematicalPractices: ['MP1', 'MP3', 'MP7', 'MP8'],
    collegeReadiness: 'proficient',
    recommendedTime: 'advanced-algebra'
  },

  {
    id: 'algebra2-rational-functions',
    name: 'Algebra II: Rational Functions & Equations',
    description: 'Rational functions, asymptotes, operations with rational expressions, and solving equations.',
    category: 'high-practice',
    gradeLevel: '10-11',
    subject: 'algebra',
    purpose: 'practice',
    difficulty: 'advanced',
    estimatedTime: '55 minutes',
    problemCount: '26 problems',
    generators: ['rational-functions', 'algebraic-expressions'],
    parameters: {
      'rational-functions': { 
        includeAsymptotes: true, includeHoles: true,
        includeGraphing: true, includeTransformations: true, problemCount: 14
      },
      'algebraic-expressions': { 
        rationalExpressions: true, operations: ['add', 'subtract', 'multiply', 'divide'],
        complexFractions: true, simplification: true, problemCount: 12
      }
    },
    tags: ['algebra-2', 'rational-functions', 'asymptotes', 'rational-expressions', 'complex-fractions'],
    standardsAlignment: ['A-APR.D.6', 'F-IF.C.7', 'A-REI.A.2'],
    teacherNotes: 'Emphasize domain restrictions and asymptote behavior. Use technology for verification.',
    mathematicalPractices: ['MP2', 'MP3', 'MP6', 'MP7'],
    collegeReadiness: 'proficient',
    recommendedTime: 'advanced-functions'
  },

  {
    id: 'algebra2-logarithmic-functions',
    name: 'Algebra II: Logarithmic & Exponential Functions',
    description: 'Logarithmic functions, properties of logarithms, and exponential-logarithmic equations.',
    category: 'high-practice',
    gradeLevel: '10-11',
    subject: 'algebra',
    purpose: 'practice',
    difficulty: 'advanced',
    estimatedTime: '50 minutes',
    problemCount: '28 problems',
    generators: ['logarithms', 'exponential-functions'],
    parameters: {
      'logarithms': { 
        properties: ['product', 'quotient', 'power'], changeOfBase: true,
        solvingEquations: true, includeApplications: true, problemCount: 16
      },
      'exponential-functions': { 
        exponentialEquations: true, logarithmicForm: true,
        realWorldModeling: true, problemCount: 12
      }
    },
    tags: ['algebra-2', 'logarithms', 'exponential', 'change-of-base', 'modeling'],
    standardsAlignment: ['F-LE.A.4', 'A-SSE.B.3', 'F-BF.B.5'],
    teacherNotes: 'Connect to scientific applications and compound interest. Use calculator appropriately.',
    mathematicalPractices: ['MP1', 'MP4', 'MP5', 'MP6'],
    collegeReadiness: 'proficient',
    recommendedTime: 'logarithmic-unit'
  },

  // GEOMETRY TEMPLATES (9-11) - Spatial Reasoning and Proof
  {
    id: 'geometry-proofs-reasoning',
    name: 'Geometry: Logical Reasoning & Proofs',
    description: 'Introduction to geometric proofs, logical reasoning, and proof techniques.',
    category: 'high-practice',
    gradeLevel: '9-11',
    subject: 'geometry-advanced',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '60 minutes',
    problemCount: '20 problems',
    generators: ['geometric-proofs', 'logical-reasoning'],
    parameters: {
      'geometric-proofs': { 
        proofTypes: ['two-column', 'paragraph', 'flow-chart'],
        topics: ['congruence', 'parallel-lines', 'triangles'], problemCount: 12
      },
      'logical-reasoning': { 
        conditionals: true, biconditionals: true,
        logicalConnectives: true, counterexamples: true, problemCount: 8
      }
    },
    tags: ['geometry', 'proofs', 'logical-reasoning', 'congruence', 'parallel-lines'],
    standardsAlignment: ['G-CO.A.1', 'G-CO.C.9', 'G-CO.C.10'],
    teacherNotes: 'Start with simple proofs. Emphasize logical structure and mathematical language.',
    mathematicalPractices: ['MP1', 'MP3', 'MP6'],
    collegeReadiness: 'foundational',
    recommendedTime: 'proof-introduction'
  },

  {
    id: 'geometry-coordinate-applications',
    name: 'Geometry: Coordinate Geometry & Applications',
    description: 'Distance, midpoint, slope applications, and coordinate proofs in the plane.',
    category: 'high-practice',
    gradeLevel: '9-11',
    subject: 'geometry-advanced',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '45 minutes',
    problemCount: '24 problems',
    generators: ['coordinate-geometry', 'distance-midpoint'],
    parameters: {
      'coordinate-geometry': { 
        includeSlope: true, includeDistance: true, includeMidpoint: true,
        coordinateProofs: true, realWorldApplications: true, problemCount: 16
      },
      'distance-midpoint': { 
        threedimensional: false, includeApplications: true,
        geometricShapes: true, problemCount: 8
      }
    },
    tags: ['geometry', 'coordinate-geometry', 'distance', 'midpoint', 'coordinate-proofs'],
    standardsAlignment: ['G-GPE.B.4', 'G-GPE.B.5', 'G-GPE.B.7'],
    teacherNotes: 'Connect algebra and geometry. Use coordinate plane for verification of theorems.',
    mathematicalPractices: ['MP2', 'MP4', 'MP5'],
    collegeReadiness: 'foundational',
    recommendedTime: 'coordinate-unit'
  },

  {
    id: 'geometry-circles-trigonometry',
    name: 'Geometry: Circles & Introduction to Trigonometry',
    description: 'Circle theorems, arc length, sector area, and basic trigonometric ratios.',
    category: 'high-practice',
    gradeLevel: '9-11',
    subject: 'geometry-advanced',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '50 minutes',
    problemCount: '26 problems',
    generators: ['circles', 'trigonometry-basics'],
    parameters: {
      'circles': { 
        includeChords: true, includeTangents: true, includeArcs: true,
        includeSectors: true, includeInscribed: true, problemCount: 16
      },
      'trigonometry-basics': { 
        rightTriangles: true, basicRatios: true,
        complementaryAngles: true, realWorldApplications: true, problemCount: 10
      }
    },
    tags: ['geometry', 'circles', 'trigonometry', 'right-triangles', 'sectors'],
    standardsAlignment: ['G-C.A.2', 'G-SRT.C.6', 'G-SRT.C.8'],
    teacherNotes: 'Connect circle properties to coordinate geometry. Introduce trigonometry through right triangles.',
    mathematicalPractices: ['MP1', 'MP4', 'MP6'],
    collegeReadiness: 'foundational',
    recommendedTime: 'circles-trigonometry'
  },

  // PRE-CALCULUS TEMPLATES (11-12) - Advanced Functions and Trigonometry
  {
    id: 'precalculus-trigonometric-functions',
    name: 'Pre-Calculus: Trigonometric Functions & Identities',
    description: 'Unit circle, trigonometric functions, graphs, and fundamental identities.',
    category: 'high-practice',
    gradeLevel: '11-12',
    subject: 'algebra',
    purpose: 'practice',
    difficulty: 'advanced',
    estimatedTime: '65 minutes',
    problemCount: '30 problems',
    generators: ['trigonometry', 'functions'],
    parameters: {
      'trigonometry': { 
        unitCircle: true, trigFunctions: true, identities: true,
        graphing: true, transformations: true, problemCount: 20
      },
      'functions': { 
        trigonometricFunctions: true, periodicBehavior: true,
        amplitudePhase: true, problemCount: 10
      }
    },
    tags: ['pre-calculus', 'trigonometry', 'unit-circle', 'identities', 'transformations'],
    standardsAlignment: ['F-TF.A.1', 'F-TF.B.5', 'F-TF.C.8'],
    teacherNotes: 'Use unit circle extensively. Connect to periodic phenomena and wave motion.',
    mathematicalPractices: ['MP2', 'MP7', 'MP8'],
    collegeReadiness: 'advanced',
    recommendedTime: 'trigonometry-unit'
  },

  {
    id: 'precalculus-advanced-functions',
    name: 'Pre-Calculus: Advanced Functions & Transformations',
    description: 'Composition, inverse functions, advanced transformations, and function behavior.',
    category: 'high-practice',
    gradeLevel: '11-12',
    subject: 'algebra',
    purpose: 'practice',
    difficulty: 'advanced',
    estimatedTime: '55 minutes',
    problemCount: '26 problems',
    generators: ['functions', 'inverse-functions'],
    parameters: {
      'functions': { 
        composition: true, inverses: true, transformations: true,
        advancedGraphing: true, behaviorAnalysis: true, problemCount: 18
      },
      'inverse-functions': { 
        algebraicInverses: true, graphicalInverses: true,
        verifyInverses: true, problemCount: 8
      }
    },
    tags: ['pre-calculus', 'function-composition', 'inverse-functions', 'transformations'],
    standardsAlignment: ['F-BF.A.1', 'F-BF.B.4', 'F-IF.C.9'],
    teacherNotes: 'Emphasize function notation and operations. Connect to calculus preparation.',
    mathematicalPractices: ['MP1', 'MP2', 'MP7'],
    collegeReadiness: 'advanced',
    recommendedTime: 'advanced-functions'
  },

  // HIGH SCHOOL ASSESSMENT TEMPLATES - College Preparation
  {
    id: 'algebra1-comprehensive-final',
    name: 'Algebra I: Comprehensive Final Exam',
    description: 'Cumulative final exam covering all major Algebra I topics for end-of-course assessment.',
    category: 'high-assessment',
    gradeLevel: '9-10',
    subject: 'algebra',
    purpose: 'assessment',
    difficulty: 'standard',
    estimatedTime: '120 minutes',
    problemCount: '50 problems',
    generators: ['linear-equations', 'quadratic-equations', 'systems-of-equations', 'exponents-radicals', 'functions'],
    parameters: {
      'linear-equations': { forms: ['slope-intercept', 'standard'], includeWordProblems: true, problemCount: 12 },
      'quadratic-equations': { methods: ['factoring', 'quadratic-formula'], includeWordProblems: true, problemCount: 12 },
      'systems-of-equations': { methods: ['substitution', 'elimination'], problemCount: 8 },
      'exponents-radicals': { exponentialFunctions: true, includeGrowthDecay: true, problemCount: 8 },
      'functions': { includeGraphing: true, includeTransformations: true, problemCount: 10 }
    },
    tags: ['algebra-1', 'comprehensive', 'final-exam', 'cumulative', 'end-of-course'],
    standardsAlignment: ['A-REI.B.3', 'A-REI.B.4', 'A-REI.C.6', 'F-LE.A.2'],
    teacherNotes: 'Comprehensive assessment covering full year curriculum. Allow graphing calculator.',
    mathematicalPractices: ['MP1', 'MP2', 'MP4', 'MP6'],
    collegeReadiness: 'foundational',
    recommendedTime: 'final-assessment'
  },

  {
    id: 'geometry-comprehensive-assessment',
    name: 'Geometry: Comprehensive Assessment',
    description: 'End-of-course geometry assessment covering proofs, coordinate geometry, and trigonometry.',
    category: 'high-assessment',
    gradeLevel: '9-11',
    subject: 'geometry-advanced',
    purpose: 'assessment',
    difficulty: 'standard',
    estimatedTime: '100 minutes',
    problemCount: '40 problems',
    generators: ['geometric-proofs', 'coordinate-geometry', 'circles', 'trigonometry-basics'],
    parameters: {
      'geometric-proofs': { proofTypes: ['two-column', 'paragraph'], topics: ['congruence', 'similarity'], problemCount: 10 },
      'coordinate-geometry': { includeProofs: true, includeDistance: true, problemCount: 12 },
      'circles': { includeArcs: true, includeSectors: true, includeInscribed: true, problemCount: 10 },
      'trigonometry-basics': { rightTriangles: true, includeApplications: true, problemCount: 8 }
    },
    tags: ['geometry', 'comprehensive', 'assessment', 'proofs', 'coordinate-geometry'],
    standardsAlignment: ['G-CO.C.10', 'G-GPE.B.4', 'G-C.A.2', 'G-SRT.C.8'],
    teacherNotes: 'Balance computational and proof-based problems. Provide reference sheet for formulas.',
    mathematicalPractices: ['MP1', 'MP3', 'MP5', 'MP6'],
    collegeReadiness: 'foundational',
    recommendedTime: 'end-of-course'
  },

  {
    id: 'sat-math-preparation',
    name: 'SAT Math: Comprehensive Preparation',
    description: 'SAT Math test preparation covering algebra, geometry, trigonometry, and data analysis.',
    category: 'high-assessment',
    gradeLevel: '11-12',
    subject: 'mixed',
    purpose: 'review',
    difficulty: 'standard',
    estimatedTime: '80 minutes',
    problemCount: '58 problems',
    generators: ['linear-equations', 'quadratic-equations', 'coordinate-geometry', 'trigonometry', 'statistics'],
    parameters: {
      'linear-equations': { satFormat: true, includeWordProblems: true, noCalculator: true, problemCount: 15 },
      'quadratic-equations': { satFormat: true, includeWordProblems: true, problemCount: 12 },
      'coordinate-geometry': { satFormat: true, includeCircles: true, problemCount: 10 },
      'trigonometry': { satFormat: true, unitCircle: true, basicIdentities: true, problemCount: 8 },
      'statistics': { satFormat: true, dataAnalysis: true, probability: true, problemCount: 13 }
    },
    tags: ['SAT', 'test-prep', 'standardized-test', 'college-prep', 'comprehensive'],
    standardsAlignment: ['A-REI.B.3', 'F-TF.A.1', 'S-ID.B.6'],
    teacherNotes: 'Mix calculator and no-calculator problems. Time students for realistic practice.',
    mathematicalPractices: ['MP1', 'MP2', 'MP4'],
    collegeReadiness: 'proficient',
    recommendedTime: 'test-preparation'
  },

  {
    id: 'ap-calculus-ab-preparation',
    name: 'AP Calculus AB: Preparation Workshop',
    description: 'Pre-calculus review and introduction to AP Calculus AB concepts and problem types.',
    category: 'high-assessment',
    gradeLevel: '11-12',
    subject: 'algebra',
    purpose: 'review',
    difficulty: 'advanced',
    estimatedTime: '90 minutes',
    problemCount: '35 problems',
    generators: ['functions', 'trigonometry', 'limits-intro', 'derivatives-intro'],
    parameters: {
      'functions': { composition: true, inverses: true, continuity: true, problemCount: 12 },
      'trigonometry': { unitCircle: true, identities: true, derivatives: true, problemCount: 8 },
      'limits-intro': { graphical: true, algebraic: true, infinity: true, problemCount: 8 },
      'derivatives-intro': { powerRule: true, productRule: true, chainRule: true, problemCount: 7 }
    },
    tags: ['AP-Calculus', 'pre-calculus-review', 'limits', 'derivatives', 'college-level'],
    standardsAlignment: ['F-TF.B.5', 'F-IF.C.9'],
    teacherNotes: 'Bridge between pre-calculus and calculus. Emphasize algebraic manipulation skills.',
    mathematicalPractices: ['MP1', 'MP2', 'MP7', 'MP8'],
    collegeReadiness: 'advanced',
    recommendedTime: 'ap-preparation'
  },

  // COLLEGE READINESS AND PLACEMENT TESTS
  {
    id: 'college-algebra-placement',
    name: 'College Algebra: Placement Test',
    description: 'Comprehensive placement test for college algebra course placement and credit.',
    category: 'high-assessment',
    gradeLevel: '12',
    subject: 'algebra',
    purpose: 'diagnostic',
    difficulty: 'advanced',
    estimatedTime: '120 minutes',
    problemCount: '60 problems',
    generators: ['polynomials', 'rational-functions', 'exponential-functions', 'logarithms', 'systems-of-equations'],
    parameters: {
      'polynomials': { operations: ['add', 'subtract', 'multiply', 'divide'], maxDegree: 3, problemCount: 15 },
      'rational-functions': { includeAsymptotes: true, operations: true, problemCount: 12 },
      'exponential-functions': { exponentialEquations: true, applications: true, problemCount: 10 },
      'logarithms': { properties: true, equations: true, applications: true, problemCount: 10 },
      'systems-of-equations': { linear: true, nonlinear: true, applications: true, problemCount: 13 }
    },
    tags: ['college-placement', 'algebra', 'comprehensive', 'credit-by-exam'],
    standardsAlignment: ['A-APR.B.2', 'F-LE.A.4', 'A-REI.C.7'],
    teacherNotes: 'High-stakes placement exam. Covers full college algebra curriculum.',
    mathematicalPractices: ['MP1', 'MP2', 'MP6'],
    collegeReadiness: 'advanced',
    recommendedTime: 'placement-testing'
  },

  {
    id: 'precalculus-readiness-assessment',
    name: 'Pre-Calculus: Readiness Assessment',
    description: 'Assessment to determine student readiness for pre-calculus and calculus courses.',
    category: 'high-assessment',
    gradeLevel: '11-12',
    subject: 'algebra',
    purpose: 'diagnostic',
    difficulty: 'advanced',
    estimatedTime: '90 minutes',
    problemCount: '45 problems',
    generators: ['functions', 'trigonometry', 'polynomials', 'exponential-functions'],
    parameters: {
      'functions': { composition: true, inverses: true, transformations: true, problemCount: 15 },
      'trigonometry': { unitCircle: true, graphing: true, identities: true, problemCount: 12 },
      'polynomials': { higherDegree: true, rationalFunctions: true, problemCount: 10 },
      'exponential-functions': { logarithms: true, modeling: true, problemCount: 8 }
    },
    tags: ['pre-calculus', 'readiness', 'diagnostic', 'calculus-prep'],
    standardsAlignment: ['F-TF.A.1', 'F-BF.A.1', 'A-APR.B.3'],
    teacherNotes: 'Identifies gaps before advanced coursework. Use for course recommendation.',
    mathematicalPractices: ['MP1', 'MP7', 'MP8'],
    collegeReadiness: 'advanced',
    recommendedTime: 'readiness-testing'
  },

  {
    id: 'mathematical-modeling-capstone',
    name: 'Mathematical Modeling: Capstone Project',
    description: 'Real-world mathematical modeling problems integrating multiple high school topics.',
    category: 'high-assessment',
    gradeLevel: '11-12',
    subject: 'mixed',
    purpose: 'assessment',
    difficulty: 'advanced',
    estimatedTime: '100 minutes',
    problemCount: '15 problems',
    generators: ['mathematical-modeling', 'statistics', 'functions', 'optimization'],
    parameters: {
      'mathematical-modeling': { realWorld: true, multiStep: true, openEnded: true, problemCount: 6 },
      'statistics': { dataAnalysis: true, regression: true, correlation: true, problemCount: 4 },
      'functions': { modeling: true, optimization: true, rates: true, problemCount: 3 },
      'optimization': { linearProgramming: true, constraints: true, problemCount: 2 }
    },
    tags: ['mathematical-modeling', 'capstone', 'real-world', 'interdisciplinary', 'project-based'],
    standardsAlignment: ['A-CED.A.3', 'F-LE.B.5', 'S-ID.B.6'],
    teacherNotes: 'Culminating assessment integrating multiple mathematical domains. Allow extended time.',
    mathematicalPractices: ['MP1', 'MP2', 'MP3', 'MP4', 'MP5', 'MP6'],
    collegeReadiness: 'advanced',
    recommendedTime: 'capstone-assessment'
  },

  // High School Practice Templates (9-12) - LEGACY
  {
    id: 'algebra1-polynomials-LEGACY',
    name: 'Algebra I: Polynomial Operations',
    description: 'Adding, subtracting, multiplying polynomials and factoring techniques.',
    category: 'high-practice',
    gradeLevel: '9-10',
    subject: 'algebra',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '40 minutes',
    problemCount: '25 problems',
    generators: ['polynomials', 'factoring'],
    parameters: {
      'polynomials': { operations: ['add', 'subtract', 'multiply'], maxDegree: 3, problemCount: 15 },
      'factoring': { types: ['gcf', 'trinomials', 'difference-squares'], problemCount: 10 }
    },
    tags: ['polynomials', 'factoring', 'algebra'],
    standardsAlignment: ['A-APR.A.1', 'A-SSE.A.2']
  },

  {
    id: 'algebra1-quadratics',
    name: 'Algebra I: Quadratic Equations',
    description: 'Solving quadratic equations by factoring, completing the square, and quadratic formula.',
    category: 'high-practice',
    gradeLevel: '9-10',
    subject: 'algebra',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '35 minutes',
    problemCount: '18 problems',
    generators: ['quadratic-equations'],
    parameters: {
      'quadratic-equations': { methods: ['factoring', 'quadratic-formula'], includeWordProblems: true, problemCount: 18 }
    },
    tags: ['quadratics', 'factoring', 'quadratic-formula'],
    standardsAlignment: ['A-REI.B.4', 'A-CED.A.1']
  },

  {
    id: 'geometry-area-perimeter',
    name: 'Geometry: Area & Perimeter',
    description: 'Calculating area and perimeter of various shapes including composite figures.',
    category: 'high-practice',
    gradeLevel: '9-10',
    subject: 'geometry-basic',
    purpose: 'practice',
    difficulty: 'standard',
    estimatedTime: '30 minutes',
    problemCount: '20 problems',
    generators: ['area', 'perimeter'],
    parameters: {
      'area': { shapes: ['rectangle', 'triangle', 'circle', 'composite'], problemCount: 12 },
      'perimeter': { shapes: ['rectangle', 'triangle', 'polygon'], problemCount: 8 }
    },
    tags: ['geometry', 'area', 'perimeter'],
    standardsAlignment: ['G-MG.A.1', 'G-MG.A.3']
  },

  // Assessment Templates
  {
    id: 'grade1-math-assessment',
    name: 'Grade 1 Math Assessment',
    description: 'Comprehensive assessment covering counting, addition, subtraction, and basic geometry.',
    category: 'elementary-assessment',
    gradeLevel: '1',
    subject: 'mixed',
    purpose: 'assessment',
    difficulty: 'standard',
    estimatedTime: '45 minutes',
    problemCount: '25 problems',
    generators: ['addition', 'subtraction', 'number-comparison', 'basic-shapes'],
    parameters: {
      'addition': { minAddend: 1, maxAddend: 10, maxSum: 20, problemCount: 8 },
      'subtraction': { minMinuend: 1, maxMinuend: 20, allowNegative: false, problemCount: 7 },
      'number-comparison': { min: 1, max: 100, problemCount: 5 },
      'basic-shapes': { includeIdentification: true, problemCount: 5 }
    },
    tags: ['assessment', 'comprehensive', 'grade-1'],
    standardsAlignment: ['1.OA.A.1', '1.OA.B.3', '1.NBT.B.3', '1.G.A.1']
  },

  {
    id: 'grade5-math-assessment',
    name: 'Grade 5 Math Assessment',
    description: 'End-of-year assessment covering fractions, decimals, geometry, and multi-digit operations.',
    category: 'elementary-assessment',
    gradeLevel: '5',
    subject: 'mixed',
    purpose: 'assessment',
    difficulty: 'standard',
    estimatedTime: '60 minutes',
    problemCount: '30 problems',
    generators: ['fraction-operations', 'decimal-operations', 'multiplication', 'area'],
    parameters: {
      'fraction-operations': { operations: ['add', 'subtract', 'multiply'], maxDenominator: 12, problemCount: 8 },
      'decimal-operations': { decimalPlaces: 2, operations: ['add', 'subtract', 'multiply'], problemCount: 8 },
      'multiplication': { minFactor: 10, maxFactor: 999, multiDigit: true, problemCount: 7 },
      'area': { shapes: ['rectangle', 'triangle'], includeWordProblems: true, problemCount: 7 }
    },
    tags: ['assessment', 'comprehensive', 'grade-5'],
    standardsAlignment: ['5.NF.A.1', '5.NBT.B.5', '5.MD.C.3']
  },

  {
    id: 'algebra1-final-review',
    name: 'Algebra I Final Exam Review',
    description: 'Comprehensive review covering all major Algebra I topics for final exam preparation.',
    category: 'high-assessment',
    gradeLevel: '9-10',
    subject: 'algebra',
    purpose: 'review',
    difficulty: 'standard',
    estimatedTime: '90 minutes',
    problemCount: '40 problems',
    generators: ['linear-equations', 'systems-of-equations', 'quadratic-equations', 'polynomials', 'factoring'],
    parameters: {
      'linear-equations': { complexity: 'multi-step', includeWordProblems: true, problemCount: 8 },
      'systems-of-equations': { methods: ['substitution', 'elimination'], problemCount: 6 },
      'quadratic-equations': { methods: ['factoring', 'quadratic-formula'], problemCount: 8 },
      'polynomials': { operations: ['add', 'subtract', 'multiply'], maxDegree: 3, problemCount: 10 },
      'factoring': { types: ['gcf', 'trinomials', 'difference-squares'], problemCount: 8 }
    },
    tags: ['review', 'final-exam', 'comprehensive', 'algebra'],
    standardsAlignment: ['A-REI.A.1', 'A-APR.A.1', 'A-SSE.A.2']
  },

  // Special Purpose Templates
  {
    id: 'summer-review-grade3',
    name: 'Summer Review: Grade 3',
    description: 'Keep skills sharp over summer break with mixed practice for incoming 3rd graders.',
    category: 'special-purpose',
    gradeLevel: '3',
    subject: 'mixed',
    purpose: 'review',
    difficulty: 'standard',
    estimatedTime: '25 minutes',
    problemCount: '20 problems',
    generators: ['addition', 'subtraction', 'multiplication', 'basic-fractions'],
    parameters: {
      'addition': { minAddend: 10, maxAddend: 99, regrouping: 'sometimes', problemCount: 6 },
      'subtraction': { minMinuend: 10, maxMinuend: 99, regrouping: 'sometimes', problemCount: 6 },
      'multiplication': { minFactor: 2, maxFactor: 5, tables: [2,3,4,5], problemCount: 5 },
      'basic-fractions': { maxDenominator: 4, includeVisual: true, problemCount: 3 }
    },
    tags: ['summer', 'review', 'mixed-practice'],
    standardsAlignment: ['2.NBT.B.5', '3.OA.A.3', '3.NF.A.1']
  },

  {
    id: 'diagnostic-number-sense',
    name: 'Diagnostic: Number Sense (Grades 2-4)',
    description: 'Assess student understanding of place value, rounding, and number relationships.',
    category: 'special-purpose',
    gradeLevel: '2-4',
    subject: 'numbers-place-value',
    purpose: 'diagnostic',
    difficulty: 'mixed',
    estimatedTime: '30 minutes',
    problemCount: '25 problems',
    generators: ['place-value', 'rounding', 'number-comparison', 'number-patterns'],
    parameters: {
      'place-value': { maxNumber: 1000, includeExpanded: true, problemCount: 8 },
      'rounding': { maxNumber: 1000, roundTo: 'mixed', problemCount: 6 },
      'number-comparison': { min: 1, max: 1000, problemCount: 6 },
      'number-patterns': { patternTypes: ['skip-counting', 'sequences'], problemCount: 5 }
    },
    tags: ['diagnostic', 'number-sense', 'assessment'],
    standardsAlignment: ['2.NBT.A.1', '3.NBT.A.1', '4.NBT.A.2']
  },

  // COLLEGE READINESS & PLACEMENT TESTS
  {
    id: 'college-placement-algebra',
    name: 'College Placement: Algebra Skills Assessment',
    description: 'Comprehensive algebra assessment for college placement covering linear equations, systems, and polynomials.',
    category: 'high-assessment',
    gradeLevel: '11-12',
    subject: 'algebra',
    purpose: 'assessment',
    difficulty: 'standard',
    estimatedTime: '90 minutes',
    problemCount: '45 problems',
    generators: ['linear-equations', 'systems-of-equations', 'polynomials'],
    parameters: {
      'linear-equations': { 
        includeWordProblems: true, maxSteps: 4, includeDistributive: true,
        fractionalCoefficients: true, realWorldContexts: true,
        problemCount: 15
      },
      'systems-of-equations': { 
        methods: ['substitution', 'elimination'], includeWordProblems: true,
        solution_types: ['unique', 'infinite', 'no-solution'], 
        maxCoefficient: 8, problemCount: 15
      },
      'polynomials': { 
        operations: ['add', 'subtract', 'multiply'], maxDegree: 3,
        includeFactoring: true, includeSpecialProducts: true,
        problemCount: 15
      }
    },
    tags: ['college-placement', 'algebra-skills', 'comprehensive-assessment', 'college-prep'],
    standardsAlignment: ['A-REI.A.1', 'A-REI.C.6', 'A-APR.A.1'],
    teacherNotes: 'Timed assessment for college placement. Covers essential algebra skills for college success.'
  },

  {
    id: 'college-readiness-functions',
    name: 'College Readiness: Functions & Analysis',
    description: 'Advanced function concepts including transformations, composition, and inverse functions for college preparation.',
    category: 'high-assessment',
    gradeLevel: '12',
    subject: 'pre-algebra',
    purpose: 'assessment',
    difficulty: 'advanced',
    estimatedTime: '75 minutes',
    problemCount: '30 problems',
    generators: ['functions', 'transformations'],
    parameters: {
      'functions': { 
        includeComposition: true, includeInverse: true, includeDomain: true,
        includeRange: true, includeGraphing: true, 
        functionTypes: ['linear', 'quadratic', 'polynomial', 'rational'],
        problemCount: 20
      },
      'transformations': { 
        includeTranslations: true, includeReflections: true, includeStretching: true,
        combinedTransformations: true, graphicalAnalysis: true,
        problemCount: 10
      }
    },
    tags: ['college-readiness', 'functions', 'transformations', 'advanced-algebra'],
    standardsAlignment: ['F-BF.B.3', 'F-IF.C.7', 'F-BF.A.1'],
    teacherNotes: 'Assesses readiness for college-level mathematics. Focus on conceptual understanding.'
  },

  {
    id: 'sat-math-practice-full',
    name: 'SAT Math Practice Test (Full Length)',
    description: 'Complete SAT-style mathematics practice test covering all tested topics with calculator and no-calculator sections.',
    category: 'high-assessment',
    gradeLevel: '11-12',
    subject: 'mixed',
    purpose: 'assessment',
    difficulty: 'advanced',
    estimatedTime: '80 minutes',
    problemCount: '58 problems',
    generators: ['linear-equations', 'quadratics', 'functions', 'statistics'],
    parameters: {
      'linear-equations': { 
        includeWordProblems: true, includeSystemsGraphically: true,
        realWorldContexts: true, problemCount: 14
      },
      'quadratics': { 
        includeWordProblems: true, includeGraphing: true, includeVertex: true,
        includeFactoring: true, includeQuadraticFormula: true,
        problemCount: 16
      },
      'functions': { 
        includeInterpretation: true, includeGraphAnalysis: true,
        includeModelingProblems: true, problemCount: 18
      },
      'statistics': { 
        includeDataAnalysis: true, includeScatterPlots: true,
        includeCorrelation: true, problemCount: 10
      }
    },
    tags: ['SAT-prep', 'standardized-test', 'college-entrance', 'comprehensive'],
    standardsAlignment: ['A-REI.A.1', 'A-CED.A.3', 'F-IF.B.4', 'S-ID.B.6'],
    teacherNotes: 'Full-length SAT practice. Use official timing: 25 min no-calculator, 55 min calculator sections.'
  },

  {
    id: 'mathematical-modeling-capstone',
    name: 'Mathematical Modeling Capstone Project',
    description: 'Real-world mathematical modeling project integrating multiple mathematical concepts and analytical reasoning.',
    category: 'special-purpose',
    gradeLevel: '11-12',
    subject: 'mixed',
    purpose: 'assessment',
    difficulty: 'advanced',
    estimatedTime: '3-5 class periods',
    problemCount: '5 major scenarios',
    generators: ['word-problems', 'functions', 'statistics'],
    parameters: {
      'word-problems': { 
        includeMultiStep: true, realWorldContexts: true,
        requireModelSelection: true, openEnded: true,
        problemCount: 2
      },
      'functions': { 
        includeModeling: true, includeOptimization: true,
        includeDataFitting: true, includeExponential: true,
        problemCount: 2
      },
      'statistics': { 
        includeDataCollection: true, includeAnalysis: true,
        includePrediction: true, includeJustification: true,
        problemCount: 1
      }
    },
    tags: ['mathematical-modeling', 'capstone', 'real-world-applications', 'project-based'],
    standardsAlignment: ['A-CED.A.3', 'F-LE.A.2', 'S-ID.B.6', 'MP.1', 'MP.4'],
    teacherNotes: 'Extended project requiring research, mathematical analysis, and presentation of findings. Assess process and communication.'
  }
]

/**
 * Get templates by category
 */
export function getTemplatesByCategory(categoryId) {
  return TEMPLATE_CONFIGURATIONS.filter(template => template.category === categoryId)
}

/**
 * Get templates by grade level
 */
export function getTemplatesByGrade(gradeLevel) {
  return TEMPLATE_CONFIGURATIONS.filter(template => 
    template.gradeLevel === gradeLevel || 
    template.gradeLevel.includes(gradeLevel)
  )
}

/**
 * Get templates by subject
 */
export function getTemplatesBySubject(subject) {
  return TEMPLATE_CONFIGURATIONS.filter(template => template.subject === subject)
}

/**
 * Search templates
 */
export function searchTemplates(query) {
  const searchTerm = query.toLowerCase()
  return TEMPLATE_CONFIGURATIONS.filter(template => 
    template.name.toLowerCase().includes(searchTerm) ||
    template.description.toLowerCase().includes(searchTerm) ||
    template.tags.some(tag => tag.includes(searchTerm))
  )
}

export default TEMPLATE_CONFIGURATIONS