<script setup>
import { ref, onMounted } from 'vue'
import MathExpression from './MathExpression.vue'

const emit = defineEmits(['navigate'])

const animateNumbers = ref(false)

const sampleProblems = ref([
  { expression: '3x + 7 = 22', solution: 'x = 5' },
  { expression: '2y - 5 = 13', solution: 'y = 9' },
  { expression: '4a + 3 = 19', solution: 'a = 4' },
  { expression: '5b - 8 = 27', solution: 'b = 7' },
  { expression: '\\frac{2x}{3} + 4 = 10', solution: 'x = 9' },
  { expression: '\\sqrt{x + 9} = 5', solution: 'x = 16' }
])

onMounted(() => {
  setTimeout(() => {
    animateNumbers.value = true
  }, 500)
})
</script>

<template>
  <section class="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="text-center">
        <!-- Main heading -->
        <h1 class="text-5xl md:text-7xl font-bold text-white mb-6">
          Generate 
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
            Perfect
          </span>
          <br>
          Math Worksheets
        </h1>
        
        <!-- Subtitle -->
        <p class="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Create customizable mathematics worksheets with 
          <span class="text-orange-400 font-semibold">70+ problem types</span> 
          across 10 categories. Professional, beautiful, and ready to print.
        </p>

        <!-- Feature highlights -->
        <div class="flex flex-wrap justify-center gap-4 mb-12">
          <div class="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full px-4 py-2">
<span class="material-icons text-orange-400 text-lg">auto_awesome</span>
            <span class="text-slate-200 ml-2">70+ Problem Types</span>
          </div>
          <div class="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full px-4 py-2">
<span class="material-icons text-orange-400 text-lg">gps_fixed</span>
            <span class="text-slate-200 ml-2">LaTeX Rendering</span>
          </div>
          <div class="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full px-4 py-2">
<span class="material-icons text-orange-400 text-lg">smartphone</span>
            <span class="text-slate-200 ml-2">Mobile Responsive</span>
          </div>
        </div>

        <!-- Action buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button @click="emit('navigate', 'worksheet-builder')" class="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105">
            Start Generating
          </button>
          <button @click="emit('navigate', 'worksheet-builder')" class="border border-slate-600 text-slate-200 hover:text-white hover:border-slate-500 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 backdrop-blur-sm">
            View Examples
          </button>
        </div>

        <!-- Demo preview -->
        <div class="mt-16">
          <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 max-w-4xl mx-auto">
            <div class="text-left">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-white">Sample Worksheet Preview</h3>
                <div class="flex space-x-2">
                  <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
              
              <div class="bg-white rounded-lg p-6 text-slate-800 worksheet-preview">
                <div class="border-b border-slate-200 pb-4 mb-6">
                  <h4 class="text-xl font-bold text-center">Algebra Practice Worksheet</h4>
                  <p class="text-center text-slate-600">Grade 9 • Linear Equations & Radicals</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div class="space-y-6">
                    <div>
                      <div class="flex items-center mb-10">
                        <span class="mr-2">1. Solve for x:</span>
                        <MathExpression :expression="sampleProblems[0].expression" />
                      </div>
                      <div class="w-full border-b-2 border-slate-300"></div>
                    </div>
                    <div>
                      <div class="flex items-center mb-10">
                        <span class="mr-2">2. Solve for y:</span>
                        <MathExpression :expression="sampleProblems[1].expression" />
                      </div>
                      <div class="w-full border-b-2 border-slate-300"></div>
                    </div>
                    <div>
                      <div class="flex items-center mb-10">
                        <span class="mr-2">3. Solve for a:</span>
                        <MathExpression :expression="sampleProblems[2].expression" />
                      </div>
                      <div class="w-full border-b-2 border-slate-300"></div>
                    </div>
                  </div>
                  <div class="space-y-6">
                    <div>
                      <div class="flex items-center mb-10">
                        <span class="mr-2">4. Solve for b:</span>
                        <MathExpression :expression="sampleProblems[3].expression" />
                      </div>
                      <div class="w-full border-b-2 border-slate-300"></div>
                    </div>
                    <div>
                      <div class="flex items-center mb-10">
                        <span class="mr-2">5. Solve for x:</span>
                        <MathExpression :expression="sampleProblems[4].expression" />
                      </div>
                      <div class="w-full border-b-2 border-slate-300"></div>
                    </div>
                    <div>
                      <div class="flex items-center mb-10">
                        <span class="mr-2">6. Solve for x:</span>
                        <MathExpression :expression="sampleProblems[5].expression" />
                      </div>
                      <div class="w-full border-b-2 border-slate-300"></div>
                    </div>
                  </div>
                </div>
                
                <!-- Mathematical formulas showcase -->
                <div class="mt-8 pt-6 border-t border-slate-200">
                  <h5 class="text-lg font-semibold mb-4 text-center">Advanced Mathematical Notation</h5>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                    <div class="p-3 bg-slate-50 rounded">
                      <MathExpression :expression="'\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}'" :display-mode="true" />
                    </div>
                    <div class="p-3 bg-slate-50 rounded">
                      <MathExpression :expression="'\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}'" :display-mode="true" />
                    </div>
                    <div class="p-3 bg-slate-50 rounded">
                      <MathExpression :expression="'\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1'" :display-mode="true" />
                    </div>
                    <div class="p-3 bg-slate-50 rounded">
                      <MathExpression :expression="'x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}'" :display-mode="true" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>