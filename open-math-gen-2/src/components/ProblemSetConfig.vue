<script setup>
import { ref, computed, watch } from 'vue'
import MathExpression from './MathExpression.vue'
import GeometryDiagram from './GeometryDiagram.vue'

const props = defineProps({
  generator: {
    type: Object,
    required: true
  },
  editingProblemSet: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['add-problem-set', 'cancel'])

const generatorInfo = computed(() => props.generator.getInfo())
const parameterOptions = computed(() => props.generator.getParameterOptions())
const parameters = ref(
  props.editingProblemSet 
    ? { ...props.editingProblemSet.parameters }
    : { ...generatorInfo.value.defaultParameters }
)
const previewProblems = ref([])
const isGeneratingPreview = ref(false)

// Generate preview problems when parameters change
watch(parameters, generatePreview, { deep: true, immediate: true })

async function generatePreview() {
  if (isGeneratingPreview.value) return
  
  isGeneratingPreview.value = true
  try {
    // Generate 3 preview problems
    const problems = props.generator.generateProblems(3, parameters.value)
    previewProblems.value = problems
  } catch (error) {
    console.error('Error generating preview:', error)
    previewProblems.value = []
  }
  isGeneratingPreview.value = false
}

const addProblemSet = () => {
  // Validate parameters
  const validation = props.generator.validateParameters(parameters.value)
  if (!validation.isValid) {
    alert(`Invalid parameters: ${validation.errors.join(', ')}`)
    return
  }
  
  emit('add-problem-set', props.generator, parameters.value)
}

const cancel = () => {
  emit('cancel')
}

const resetToDefaults = () => {
  parameters.value = { ...generatorInfo.value.defaultParameters }
}

// Helper functions for rendering form inputs
const getInputType = (param) => {
  switch (param.type) {
    case 'number': return 'number'
    case 'boolean': return 'checkbox'
    case 'string': return param.options ? 'select' : 'text'
    default: return 'text'
  }
}

const getStepValue = (param) => {
  if (param.type === 'number') {
    return 1
  }
  return undefined
}

const shouldShowParameter = (paramKey) => {
  // For Mixed Numbers generator, hide operation type parameters unless operations are enabled
  if (props.generator.name === 'Mixed Numbers') {
    if ((paramKey === 'includeAddition' || paramKey === 'includeSubtraction') && !parameters.value.includeOperations) {
      return false
    }
  }
  return true
}
</script>

<template>
  <div class="max-w-6xl mx-auto">
    
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <button 
            @click="cancel"
            class="text-slate-300 hover:text-white p-2 rounded-lg transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <div class="flex items-center space-x-3">
            <div>
              <span class="material-icons text-3xl text-orange-400">{{ generatorInfo.icon }}</span>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-white">
                {{ editingProblemSet ? 'Edit' : 'Configure' }} {{ generatorInfo.name }}
              </h2>
              <p class="text-slate-300">
                {{ editingProblemSet ? 'Modifying existing problem set parameters' : generatorInfo.description }}
              </p>
              <div v-if="editingProblemSet" class="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-orange-500/20 border border-orange-400/30">
                <svg class="w-4 h-4 text-orange-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                <span class="text-orange-300 text-sm font-medium">Editing Problem Set</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex space-x-3">
          <button 
            @click="resetToDefaults"
            class="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Reset to Defaults
          </button>
          <button 
            @click="addProblemSet"
            class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            {{ editingProblemSet ? 'Update Problem Set' : 'Add to Worksheet' }}
          </button>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      <!-- Configuration Panel -->
      <div class="space-y-6">
        <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
          <h3 class="text-xl font-semibold text-white mb-6">Parameters</h3>
          
          <div class="space-y-6">
            <div 
              v-for="(param, key) in parameterOptions" 
              :key="key"
              v-show="shouldShowParameter(key)"
              class="space-y-2"
            >
              <label class="block text-sm font-medium text-slate-200">
                {{ param.label }}
                <span v-if="param.required" class="text-red-400">*</span>
              </label>
              
              <p v-if="param.description" class="text-xs text-slate-400">
                {{ param.description }}
              </p>
              
              <!-- Number Input -->
              <input 
                v-if="param.type === 'number'"
                v-model.number="parameters[key]"
                type="number"
                :min="param.min"
                :max="param.max"
                :step="getStepValue(param)"
                class="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-orange-500 focus:outline-none"
              />
              
              <!-- Boolean Input -->
              <label v-else-if="param.type === 'boolean'" class="flex items-center space-x-2 cursor-pointer">
                <input 
                  v-model="parameters[key]"
                  type="checkbox"
                  class="w-4 h-4 text-orange-500 bg-slate-700 border-slate-600 rounded focus:ring-orange-500"
                />
                <span class="text-slate-300">{{ param.label }}</span>
              </label>
              
              <!-- Select Input -->
              <select 
                v-else-if="param.options"
                v-model="parameters[key]"
                class="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-orange-500 focus:outline-none"
              >
                <option 
                  v-for="option in param.options" 
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
              
              <!-- Text Input -->
              <input 
                v-else
                v-model="parameters[key]"
                type="text"
                class="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <!-- Generator Info -->
        <div class="bg-slate-800/20 backdrop-blur-sm border border-slate-700/30 rounded-xl p-4">
          <h4 class="text-lg font-semibold text-white mb-3">Generator Info</h4>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-slate-400">Difficulty:</span>
              <span class="text-white capitalize">{{ generatorInfo.difficulty }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-400">Grade Level:</span>
              <span class="text-white">{{ generatorInfo.gradeLevel }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-400">Est. Time per Problem:</span>
              <span class="text-white">{{ generatorInfo.estimatedTime }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-400">Category:</span>
              <span class="text-white capitalize">{{ generatorInfo.category.replace('-', ' ') }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Preview Panel -->
      <div class="space-y-6">
        <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-semibold text-white">Preview</h3>
            <button 
              @click="generatePreview"
              :disabled="isGeneratingPreview"
              class="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              {{ isGeneratingPreview ? 'Generating...' : 'Refresh Preview' }}
            </button>
          </div>
          
          <!-- Preview Problems -->
          <div v-if="previewProblems.length > 0" class="space-y-6">
            <div 
              v-for="(problem, index) in previewProblems" 
              :key="index"
              class="bg-white rounded-lg p-4 text-slate-800"
            >
              <div class="flex items-center justify-between mb-3">
                <span class="font-medium">Problem {{ index + 1 }}:</span>
                <span class="text-sm text-slate-600">{{ problem.metadata?.estimatedTime || generatorInfo.estimatedTime }}</span>
              </div>
              
              <div class="text-lg mb-4">
                <MathExpression 
                  v-if="problem.questionLaTeX" 
                  :expression="problem.questionLaTeX" 
                />
                <span v-else>{{ problem.question }}</span>
              </div>
              
              <!-- Geometry Diagram in Preview -->
              <div v-if="problem.diagram" class="preview-diagram mb-4">
                <GeometryDiagram 
                  :diagramConfig="problem.diagram"
                  className="preview-geometry-diagram"
                />
              </div>
              
              <!-- Answer (shown for preview) -->
              <div class="text-sm text-slate-600 border-t pt-2">
                <strong>Answer: </strong>
                <MathExpression 
                  v-if="problem.answerLaTeX" 
                  :expression="problem.answerLaTeX" 
                />
                <span v-else>{{ problem.answer }}</span>
              </div>
            </div>
          </div>
          
          <!-- Empty State -->
          <div v-else-if="!isGeneratingPreview" class="text-center py-8">
            <div class="w-16 h-16 border-2 border-dashed border-slate-400 rounded-lg mx-auto mb-3 flex items-center justify-center">
              <span class="material-icons text-slate-400 text-2xl">warning</span>
            </div>
            <p class="text-slate-300">Unable to generate preview with current parameters</p>
          </div>
          
          <!-- Loading State -->
          <div v-else class="text-center py-8">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-300 mx-auto mb-3"></div>
            <p class="text-slate-300">Generating preview...</p>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-slate-800/20 backdrop-blur-sm border border-slate-700/30 rounded-xl p-4">
          <h4 class="text-lg font-semibold text-white mb-3">Quick Actions</h4>
          <div class="space-y-2">
            <button 
              @click="parameters.problemCount = 5"
              class="w-full text-left text-sm text-slate-300 hover:text-white p-2 rounded hover:bg-slate-700/30 transition-colors"
            >
<span class="material-icons mr-2">edit</span>Quick Set: 5 problems
            </button>
            <button 
              @click="parameters.problemCount = 10"
              class="w-full text-left text-sm text-slate-300 hover:text-white p-2 rounded hover:bg-slate-700/30 transition-colors"
            >
<span class="material-icons mr-2">description</span>Standard Set: 10 problems
            </button>
            <button 
              @click="parameters.problemCount = 20"
              class="w-full text-left text-sm text-slate-300 hover:text-white p-2 rounded hover:bg-slate-700/30 transition-colors"
            >
<span class="material-icons mr-2">auto_stories</span>Extended Set: 20 problems
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>