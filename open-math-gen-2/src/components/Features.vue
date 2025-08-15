<script setup>
import { ref } from 'vue'
import MathExpression from './MathExpression.vue'

const emit = defineEmits(['navigate'])

const categories = ref([
  {
    icon: 'calculate',
    title: 'Basic Operations',
    description: 'Addition, subtraction, multiplication, division, and order of operations',
    count: '6 generators',
    color: 'from-orange-400 to-red-500'
  },
  {
    icon: 'pin',
    title: 'Numbers & Place Value',
    description: 'Place value, rounding, comparisons, patterns, and prime numbers',
    count: '6 generators',
    color: 'from-blue-400 to-blue-600'
  },
  {
    icon: 'percent',
    title: 'Fractions & Decimals',
    description: 'Fraction operations, mixed numbers, decimal conversions, percentages',
    count: '8 generators',
    color: 'from-green-400 to-green-600'
  },
  {
    icon: 'straighten',
    title: 'Measurement & Units',
    description: 'Length, weight, volume, time, temperature, and unit conversions',
    count: '7 generators',
    color: 'from-purple-400 to-purple-600'
  },
  {
    icon: 'attach_money',
    title: 'Money & Finance',
    description: 'Money counting, change making, simple interest, and budgeting',
    count: '6 generators',
    color: 'from-yellow-400 to-orange-500'
  },
  {
    icon: 'square_foot',
    title: 'Basic Geometry',
    description: 'Shapes, perimeter, area, angles, lines, and coordinate basics',
    count: '8 generators',
    color: 'from-teal-400 to-cyan-500'
  },
  {
    icon: 'analytics',
    title: 'Advanced Geometry',
    description: 'Complex areas, circles, volume, Pythagorean theorem, transformations',
    count: '7 generators',
    color: 'from-indigo-400 to-purple-500'
  },
  {
    icon: 'functions',
    title: 'Pre-Algebra',
    description: 'Integers, expressions, equations, inequalities, ratios, proportions',
    count: '9 generators',
    color: 'from-pink-400 to-rose-500'
  },
  {
    icon: 'science',
    title: 'Algebra',
    description: 'Linear equations, systems, quadratics, polynomials, functions',
    count: '8 generators',
    color: 'from-emerald-400 to-green-500'
  },
  {
    icon: 'architecture',
    title: 'Trigonometry',
    description: 'Trig ratios, right triangles, unit circle, identities, equations',
    count: '6 generators',
    color: 'from-slate-400 to-slate-600'
  }
])

const features = ref([
  {
    icon: 'flash_on',
    title: 'Lightning Fast',
    description: 'Generate comprehensive worksheets in seconds with optimized algorithms'
  },
  {
    icon: 'palette',
    title: 'Beautiful Design',
    description: 'Professional layouts with LaTeX rendering for perfect mathematical notation'
  },
  {
    icon: 'devices',
    title: 'Responsive',
    description: 'Works perfectly on desktop, tablet, and mobile devices'
  },
  {
    icon: 'tune',
    title: 'Customizable',
    description: '100+ parameters to fine-tune every aspect of your worksheets'
  },
  {
    icon: 'assignment',
    title: 'Answer Keys',
    description: 'Automatic answer sheet generation with step-by-step solutions'
  },
  {
    icon: 'verified',
    title: 'Tested',
    description: 'Over 1000 test cases ensure mathematical accuracy and reliability'
  }
])
</script>

<template>
  <section id="features" class="py-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Features Section -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
          Everything You Need for 
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
            Math Education
          </span>
        </h2>
        <p class="text-xl text-slate-300 max-w-3xl mx-auto">
          Comprehensive tools designed for educators, parents, and students at every level
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        <div 
          v-for="(feature, index) in features" 
          :key="index"
          class="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800/50 transition-all duration-300 hover:transform hover:scale-105"
        >
          <div class="mb-4">
            <span class="material-icons text-3xl text-orange-400">{{ feature.icon }}</span>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">{{ feature.title }}</h3>
          <p class="text-slate-300">{{ feature.description }}</p>
        </div>
      </div>

      <!-- Categories Section -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
          <span class="text-orange-400">10</span> Mathematical Categories
        </h2>
        <p class="text-xl text-slate-300 max-w-3xl mx-auto">
          From elementary basics to advanced trigonometry - comprehensive coverage for all grade levels
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <div 
          v-for="(category, index) in categories" 
          :key="index"
          class="group bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/50 transition-all duration-300 cursor-pointer"
        >
          <div class="text-center">
            <div class="mb-4 group-hover:scale-110 transition-transform duration-300">
              <span class="material-icons text-4xl text-orange-400">{{ category.icon }}</span>
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">{{ category.title }}</h3>
            <p class="text-slate-300 text-sm mb-3">{{ category.description }}</p>
            <div class="inline-block px-3 py-1 rounded-full text-xs font-medium text-white"
                 :class="`bg-gradient-to-r ${category.color}`">
              {{ category.count }}
            </div>
          </div>
        </div>
      </div>

      <!-- Mathematical Examples Showcase -->
      <div class="mt-20 bg-slate-800/20 backdrop-blur-sm border border-slate-700/30 rounded-3xl p-12">
        <div class="text-center mb-12">
          <h3 class="text-3xl md:text-4xl font-bold text-white mb-6">
            Beautiful <span class="text-orange-400">LaTeX</span> Rendering
          </h3>
          <p class="text-xl text-slate-300 max-w-2xl mx-auto">
            Professional mathematical notation that rivals published textbooks
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Algebra Examples -->
          <div class="bg-white rounded-xl p-6 text-slate-800">
            <h4 class="font-semibold mb-4 text-orange-600">Algebra</h4>
            <div class="space-y-3 text-center">
              <MathExpression :expression="'x^2 + 5x - 6 = 0'" :display-mode="true" />
              <MathExpression :expression="'\\frac{x+3}{x-2} = \\frac{2x+1}{x+1}'" :display-mode="true" />
              <MathExpression :expression="'\\log_2(x) + \\log_2(x-3) = 2'" :display-mode="true" />
            </div>
          </div>
          
          <!-- Calculus Examples -->
          <div class="bg-white rounded-xl p-6 text-slate-800">
            <h4 class="font-semibold mb-4 text-orange-600">Calculus</h4>
            <div class="space-y-3 text-center">
              <MathExpression :expression="'\\frac{d}{dx}[x^3 \\sin(x)]'" :display-mode="true" />
              <MathExpression :expression="'\\int x^2 e^{-x} dx'" :display-mode="true" />
              <MathExpression :expression="'\\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}'" :display-mode="true" />
            </div>
          </div>
          
          <!-- Geometry Examples -->
          <div class="bg-white rounded-xl p-6 text-slate-800">
            <h4 class="font-semibold mb-4 text-orange-600">Geometry</h4>
            <div class="space-y-3 text-center">
              <MathExpression :expression="'A = \\pi r^2'" :display-mode="true" />
              <MathExpression :expression="'c^2 = a^2 + b^2'" :display-mode="true" />
              <MathExpression :expression="'V = \\frac{4}{3}\\pi r^3'" :display-mode="true" />
            </div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="text-center mt-20">
        <div class="bg-gradient-to-r from-slate-800/50 to-blue-900/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-12">
          <h3 class="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Create Amazing Worksheets?
          </h3>
          <p class="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of educators who trust Open Math Gen for their classroom needs
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button @click="emit('navigate', 'worksheet-builder')" class="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105">
              Start Creating Now
            </button>
            <button class="border border-slate-600 text-slate-200 hover:text-white hover:border-slate-500 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300">
              Browse Templates
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>