<script setup>
import { ref, computed, onMounted } from 'vue'
import { GENERATOR_CATEGORIES, getAllGenerators, getGeneratorsByCategory, getGenerator } from '../generators/index.js'
import GeneratorCard from './GeneratorCard.vue'
import ProblemSetConfig from './ProblemSetConfig.vue'
import WorksheetPreview from './WorksheetPreview.vue'
import MathExpression from './MathExpression.vue'

const selectedCategory = ref('basic-operations')
const searchQuery = ref('')
const currentView = ref('generators') // 'generators', 'configure', 'preview'
const selectedGenerator = ref(null)
const editingProblemSet = ref(null)
const problemSets = ref([])
const worksheetTitle = ref('Math Worksheet')

const categories = computed(() => GENERATOR_CATEGORIES)

const filteredGenerators = computed(() => {
  let generators = getGeneratorsByCategory(selectedCategory.value)
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    generators = generators.filter(gen => 
      gen.name.toLowerCase().includes(query) ||
      gen.description.toLowerCase().includes(query) ||
      gen.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }
  
  return generators
})

const totalProblems = computed(() => {
  return problemSets.value.reduce((total, set) => total + set.problemCount, 0)
})

onMounted(() => {
  // Load any saved worksheet data
  const saved = localStorage.getItem('worksheet-builder-state')
  if (saved) {
    try {
      const state = JSON.parse(saved)
      
      // Reconstruct problem sets with proper generator references
      problemSets.value = (state.problemSets || []).map(savedSet => {
        // Find the generator by category and name
        const generator = findGeneratorByInfo(savedSet.generatorInfo)
        if (generator) {
          return {
            ...savedSet,
            generator: generator
          }
        }
        return null
      }).filter(Boolean) // Remove any null entries
      
      worksheetTitle.value = state.worksheetTitle || 'Math Worksheet'
    } catch (error) {
      console.warn('Failed to load saved worksheet state:', error)
    }
  }
})

const findGeneratorByInfo = (generatorInfo) => {
  // Find generator by category and name
  for (const [categoryId, category] of Object.entries(GENERATOR_CATEGORIES)) {
    for (const [generatorId, generator] of Object.entries(category.generators)) {
      if (generator.name === generatorInfo.name && generator.category === generatorInfo.category) {
        return generator
      }
    }
  }
  return null
}

const selectGenerator = (generator) => {
  selectedGenerator.value = generator
  editingProblemSet.value = null // Clear editing state for new generator
  currentView.value = 'configure'
}

const addProblemSet = (generator, parameters) => {
  if (editingProblemSet.value) {
    // Update existing problem set
    const index = problemSets.value.findIndex(set => set.id === editingProblemSet.value.id)
    if (index !== -1) {
      problemSets.value[index] = {
        ...editingProblemSet.value,
        parameters: { ...parameters },
        problemCount: parameters.problemCount || 10
      }
    }
    editingProblemSet.value = null
  } else {
    // Create new problem set
    const problemSet = {
      id: Date.now(),
      generatorInfo: generator.getInfo(),
      generatorClass: generator.constructor.name,
      generator: generator, // Keep reference to actual generator
      parameters: { ...parameters },
      problemCount: parameters.problemCount || 10
    }
    problemSets.value.push(problemSet)
  }
  
  saveState()
  currentView.value = 'generators'
}

const removeProblemSet = (id) => {
  problemSets.value = problemSets.value.filter(set => set.id !== id)
  saveState()
}

const editProblemSet = (problemSet) => {
  selectedGenerator.value = problemSet.generator
  editingProblemSet.value = problemSet
  currentView.value = 'configure'
}

const previewWorksheet = () => {
  if (problemSets.value.length === 0) {
    alert('Please add at least one problem set to preview the worksheet.')
    return
  }
  currentView.value = 'preview'
}

const saveState = () => {
  // Save only serializable data (exclude generator functions)
  const serializableProblemSets = problemSets.value.map(set => ({
    id: set.id,
    generatorInfo: set.generatorInfo,
    generatorClass: set.generatorClass,
    parameters: set.parameters,
    problemCount: set.problemCount
  }))
  
  localStorage.setItem('worksheet-builder-state', JSON.stringify({
    problemSets: serializableProblemSets,
    worksheetTitle: worksheetTitle.value
  }))
}

const clearWorksheet = () => {
  if (confirm('Are you sure you want to clear the entire worksheet?')) {
    problemSets.value = []
    worksheetTitle.value = 'Math Worksheet'
    saveState()
  }
}

const goBack = () => {
  if (currentView.value === 'configure') {
    editingProblemSet.value = null // Clear editing state when going back
    currentView.value = 'generators'
  } else if (currentView.value === 'preview') {
    currentView.value = 'generators'
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
          Worksheet <span class="text-orange-400">Builder</span>
        </h1>
        <p class="text-xl text-slate-300 max-w-3xl mx-auto">
          Create custom math worksheets by selecting and configuring problem generators
        </p>
      </div>

      <!-- Navigation Tabs -->
      <div class="flex justify-center mb-8">
        <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-2 border border-slate-700/50">
          <button 
            @click="currentView = 'generators'" 
            :class="currentView === 'generators' ? 'bg-orange-500 text-white' : 'text-slate-300 hover:text-white'"
            class="px-6 py-3 rounded-lg font-medium transition-all duration-200"
          >
            📚 Select Generators
          </button>
          <button 
            @click="currentView = 'configure'" 
            :class="currentView === 'configure' ? 'bg-orange-500 text-white' : 'text-slate-300 hover:text-white'"
            class="px-6 py-3 rounded-lg font-medium transition-all duration-200 ml-2"
            :disabled="!selectedGenerator"
          >
            ⚙️ Configure
          </button>
          <button 
            @click="previewWorksheet" 
            :class="currentView === 'preview' ? 'bg-orange-500 text-white' : 'text-slate-300 hover:text-white'"
            class="px-6 py-3 rounded-lg font-medium transition-all duration-200 ml-2"
          >
            👁️ Preview
          </button>
        </div>
      </div>

      <!-- Current Worksheet Panel - Always visible when sets exist -->
      <div v-if="problemSets.length > 0" class="mb-8">
        <div class="bg-gradient-to-r from-orange-500/20 to-blue-500/20 backdrop-blur-sm border-2 border-orange-400/50 rounded-2xl p-6 shadow-xl">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-3">
              <div class="bg-orange-500 text-white p-2 rounded-lg">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-bold text-white">Current Worksheet</h3>
                <p class="text-orange-200">{{ problemSets.length }} generator{{ problemSets.length !== 1 ? 's' : '' }} • {{ totalProblems }} total problems</p>
              </div>
            </div>
            <div class="flex space-x-2">
              <button 
                @click="previewWorksheet"
                class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                <span>Preview</span>
              </button>
              <button 
                @click="clearWorksheet"
                class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                title="Clear All"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Worksheet Title -->
          <div class="mb-4">
            <label class="block text-orange-200 text-sm font-medium mb-2">Worksheet Title</label>
            <input 
              v-model="worksheetTitle"
              @input="saveState"
              class="w-full bg-white/10 text-white border border-orange-300/30 rounded-lg px-4 py-3 font-semibold text-lg placeholder-orange-200/50 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/30"
              placeholder="Enter worksheet title..."
            />
          </div>

          <!-- Problem Sets List -->
          <div class="space-y-3">
            <div 
              v-for="(set, index) in problemSets" 
              :key="set.id"
              :class="[
                'backdrop-blur-sm rounded-xl p-4 transition-all duration-200',
                editingProblemSet?.id === set.id && currentView === 'configure'
                  ? 'bg-orange-500/30 border-2 border-orange-400 shadow-lg shadow-orange-500/20'
                  : 'bg-white/10 border border-white/20 hover:bg-white/15'
              ]"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <div class="text-2xl">{{ set.generatorInfo.icon }}</div>
                  <div>
                    <h4 class="text-white font-semibold">{{ set.generatorInfo.name }}</h4>
                    <div class="flex items-center space-x-3 text-sm text-orange-200">
                      <span>{{ set.problemCount }} problems</span>
                      <span>•</span>
                      <span>{{ set.generatorInfo.gradeLevel }}</span>
                      <span>•</span>
                      <span class="capitalize">{{ set.generatorInfo.difficulty }}</span>
                    </div>
                  </div>
                </div>
                <div class="flex space-x-2">
                  <button 
                    @click="editProblemSet(set)"
                    class="text-blue-300 hover:text-blue-200 px-3 py-1 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 transition-colors text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button 
                    @click="removeProblemSet(set.id)"
                    class="text-red-300 hover:text-red-200 px-3 py-1 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Generator Selection View -->
      <div v-if="currentView === 'generators'">
        <!-- Category Selector -->
        <div class="mb-8">
          <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
            <button
              v-for="(category, categoryId) in categories"
              :key="categoryId"
              @click="selectedCategory = categoryId"
              :class="selectedCategory === categoryId ? 'bg-orange-500 text-white' : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'"
              class="p-4 rounded-xl border border-slate-700/50 backdrop-blur-sm transition-all duration-200 text-center"
            >
              <div class="text-2xl mb-2">{{ category.icon }}</div>
              <div class="font-medium text-sm">{{ category.name }}</div>
            </button>
          </div>
        </div>

        <!-- Search Bar -->
        <div class="mb-8">
          <div class="max-w-md mx-auto">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search generators..."
              class="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:border-orange-500 focus:outline-none"
            />
          </div>
        </div>

        <!-- Generator Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <GeneratorCard
            v-for="generator in filteredGenerators"
            :key="generator.name"
            :generator="generator"
            @select="selectGenerator"
          />
        </div>

        <!-- Empty State -->
        <div v-if="filteredGenerators.length === 0" class="text-center py-12">
          <div class="text-6xl mb-4">🔍</div>
          <h3 class="text-xl font-semibold text-white mb-2">No generators found</h3>
          <p class="text-slate-300">Try adjusting your search or selecting a different category.</p>
        </div>
      </div>

      <!-- Configuration View -->
      <div v-if="currentView === 'configure' && selectedGenerator">
        <ProblemSetConfig
          :generator="selectedGenerator"
          :editing-problem-set="editingProblemSet"
          @add-problem-set="addProblemSet"
          @cancel="goBack"
        />
      </div>

      <!-- Preview View -->
      <div v-if="currentView === 'preview'">
        <WorksheetPreview
          :problem-sets="problemSets"
          :worksheet-title="worksheetTitle"
          @back="goBack"
          @edit-set="editProblemSet"
          @remove-set="removeProblemSet"
        />
      </div>


    </div>
  </div>
</template>