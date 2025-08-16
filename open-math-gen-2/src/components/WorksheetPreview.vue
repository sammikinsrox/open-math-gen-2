<script setup>
import { ref, computed, onMounted } from 'vue'
import WorksheetLayout from './WorksheetLayout.vue'

const props = defineProps({
  problemSets: {
    type: Array,
    required: true
  },
  worksheetTitle: {
    type: String,
    required: true
  },
  printSettings: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['back', 'edit-set', 'remove-set'])

const generatedProblems = ref([])
const isGenerating = ref(false)
const showAnswers = ref(false)
const currentDate = ref(new Date().toLocaleDateString())
const isPrinting = ref(false)

const totalProblems = computed(() => {
  return props.problemSets.reduce((total, set) => total + set.problemCount, 0)
})

const estimatedTime = computed(() => {
  let totalSeconds = 0
  props.problemSets.forEach(set => {
    const timeStr = set.generator.estimatedTime || '60 seconds'
    const seconds = parseInt(timeStr.match(/\d+/)?.[0] || '60')
    totalSeconds += seconds * set.problemCount
  })
  
  const minutes = Math.ceil(totalSeconds / 60)
  return `${minutes} minute${minutes !== 1 ? 's' : ''}`
})

onMounted(() => {
  generateAllProblems()
})

const generateAllProblems = async () => {
  if (props.problemSets.length === 0) return
  
  isGenerating.value = true
  const allProblems = []
  
  try {
    for (const [setIndex, problemSet] of props.problemSets.entries()) {
      if (!problemSet.generator || typeof problemSet.generator.generateProblems !== 'function') {
        console.error('Invalid generator for problem set:', problemSet)
        continue
      }
      
      const problems = problemSet.generator.generateProblems(
        problemSet.problemCount, 
        problemSet.parameters
      )
      
      problems.forEach((problem, problemIndex) => {
        allProblems.push({
          ...problem,
          setIndex,
          problemNumber: allProblems.length + 1,
          setInfo: {
            name: problemSet.generatorInfo?.name || problemSet.generator.name,
            icon: problemSet.generatorInfo?.icon || problemSet.generator.icon
          }
        })
      })
    }
    
    generatedProblems.value = allProblems
  } catch (error) {
    console.error('Error generating problems:', error)
    alert('Error generating some problems. Please check your configurations.')
  }
  
  isGenerating.value = false
}

const goBack = () => {
  emit('back')
}

const editSet = (setIndex) => {
  const problemSet = props.problemSets[setIndex]
  emit('edit-set', problemSet)
}

const removeSet = (setIndex) => {
  const problemSet = props.problemSets[setIndex]
  emit('remove-set', problemSet.id)
}

const handlePrint = async () => {
  isPrinting.value = true
  try {
    // Hide everything on the current page except the worksheet layout
    const body = document.body
    const originalStyle = body.style.cssText
    const allElements = document.querySelectorAll('*:not(.worksheet-layout):not(.worksheet-layout *)')
    
    // Hide all elements except worksheet
    allElements.forEach(el => {
      if (!el.closest('.worksheet-layout')) {
        el.style.visibility = 'hidden'
      }
    })
    
    // Set print-friendly body styles
    body.style.cssText = 'margin: 0; padding: 0; background: white !important;'
    
    // Print the page
    window.print()
    
    // Restore original styles after printing
    setTimeout(() => {
      body.style.cssText = originalStyle
      allElements.forEach(el => {
        el.style.visibility = ''
      })
      
      isPrinting.value = false
    }, 500)

  } catch (error) {
    console.error('Print error:', error)
    isPrinting.value = false
    alert('Print failed. Please try again.')
  }
}

const regenerateProblems = () => {
  generateAllProblems()
}

const toggleAnswers = () => {
  showAnswers.value = !showAnswers.value
}
</script>

<template>
  <div class="max-w-5xl mx-auto">
    
    <!-- Header Controls -->
    <div class="flex items-center justify-between mb-8 no-print">
      <div class="flex items-center space-x-4">
        <button 
          @click="goBack"
          class="text-slate-300 hover:text-white p-2 rounded-lg transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <div>
          <h2 class="text-2xl font-bold text-white">Worksheet Preview</h2>
          <p class="text-slate-300">{{ totalProblems }} problems • Est. {{ estimatedTime }}</p>
        </div>
      </div>
      
      <div class="flex space-x-3">
        <button 
          @click="toggleAnswers"
          :class="showAnswers ? 'bg-orange-500 text-white' : 'bg-slate-700 text-slate-300'"
          class="px-4 py-2 rounded-lg font-medium transition-colors hover:bg-opacity-80"
        >
          {{ showAnswers ? 'Hide' : 'Show' }} Answers
        </button>
        <button 
          @click="regenerateProblems"
          :disabled="isGenerating"
          class="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          {{ isGenerating ? 'Generating...' : 'Regenerate' }}
        </button>
        <button 
          @click="handlePrint"
          :disabled="isPrinting"
          class="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
        >
          <span class="material-icons mr-2">print</span>
          {{ isPrinting ? 'Printing...' : 'Print' }}
        </button>
      </div>
    </div>


    <!-- Loading State -->
    <div v-if="isGenerating" class="bg-white rounded-lg shadow-2xl p-8 print:shadow-none print:rounded-none">
      <div class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600 mx-auto mb-4"></div>
        <p class="text-slate-600">Generating worksheet problems...</p>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="generatedProblems.length === 0" class="bg-white rounded-lg shadow-2xl p-8 print:shadow-none print:rounded-none">
      <div class="text-center py-12">
        <div class="w-16 h-16 border-2 border-dashed border-slate-400 rounded-lg mx-auto mb-4 flex items-center justify-center">
          <span class="material-icons text-slate-400 text-2xl">description</span>
        </div>
        <p class="text-slate-600">No problems generated. Please check your configurations.</p>
      </div>
    </div>

    <!-- Worksheet Content using shared layout -->
    <WorksheetLayout
      v-else
      :problems="generatedProblems"
      :worksheet-title="worksheetTitle"
      :settings="printSettings"
      :show-answers="showAnswers || (printSettings.includeAnswerKey && printSettings.answerKeyLocation === 'inline')"
      :include-answer-key="printSettings.includeAnswerKey"
      :answer-key-location="printSettings.answerKeyLocation"
      mode="preview"
    />

  </div>
</template>

<style>
@media print {
  .no-print {
    display: none !important;
  }
  
  body {
    background: white !important;
  }
  
  .bg-gradient-to-br {
    background: white !important;
  }
  
  .page-break-before {
    page-break-before: always;
  }
}

.page-break-before {
  break-before: page;
}
</style>