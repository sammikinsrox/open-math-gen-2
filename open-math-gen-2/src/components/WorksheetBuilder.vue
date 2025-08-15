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
  currentView.value = 'configure'
}

const addProblemSet = (generator, parameters) => {
  const problemSet = {
    id: Date.now(),
    generatorInfo: generator.getInfo(),
    generatorClass: generator.constructor.name,
    generator: generator, // Keep reference to actual generator
    parameters: { ...parameters },
    problemCount: parameters.problemCount || 10
  }
  
  problemSets.value.push(problemSet)
  saveState()
  currentView.value = 'generators'
}

const removeProblemSet = (id) => {
  problemSets.value = problemSets.value.filter(set => set.id !== id)
  saveState()
}

const editProblemSet = (problemSet) => {
  selectedGenerator.value = problemSet.generator
  currentView.value = 'configure'
  // TODO: Pre-fill with existing parameters
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

      <!-- Worksheet Status Bar -->
      <div v-if="problemSets.length > 0" class="mb-8">
        <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
          <div class="flex flex-col md:flex-row md:items-center justify-between">
            <div class="flex items-center space-x-4 mb-4 md:mb-0">
              <input 
                v-model="worksheetTitle"
                @input="saveState"
                class="bg-slate-700/50 text-white border border-slate-600 rounded-lg px-4 py-2 font-semibold text-lg"
                placeholder="Worksheet Title"
              />
              <span class="text-slate-300">
                {{ problemSets.length }} set{{ problemSets.length !== 1 ? 's' : '' }} • 
                {{ totalProblems }} problem{{ totalProblems !== 1 ? 's' : '' }}
              </span>
            </div>
            <div class="flex space-x-2">
              <button 
                @click="previewWorksheet"
                class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Preview Worksheet
              </button>
              <button 
                @click="clearWorksheet"
                class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Clear All
              </button>
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

      <!-- Problem Sets Summary (always visible when sets exist) -->
      <div v-if="problemSets.length > 0 && currentView === 'generators'" class="mt-12">
        <h3 class="text-2xl font-bold text-white mb-6">Current Worksheet</h3>
        <div class="space-y-4">
          <div 
            v-for="(set, index) in problemSets" 
            :key="set.id"
            class="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div class="text-2xl">{{ set.generatorInfo.icon }}</div>
                <div>
                  <h4 class="text-white font-semibold">{{ set.generatorInfo.name }}</h4>
                  <p class="text-slate-300 text-sm">{{ set.problemCount }} problems • {{ set.generatorInfo.gradeLevel }}</p>
                </div>
              </div>
              <div class="flex space-x-2">
                <button 
                  @click="editProblemSet(set)"
                  class="text-blue-400 hover:text-blue-300 px-3 py-1 rounded transition-colors"
                >
                  Edit
                </button>
                <button 
                  @click="removeProblemSet(set.id)"
                  class="text-red-400 hover:text-red-300 px-3 py-1 rounded transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>