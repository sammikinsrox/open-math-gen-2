<script setup>
import { ref, computed, onMounted } from 'vue'
import MathExpression from './MathExpression.vue'
import PrintModal from './PrintModal.vue'

const props = defineProps({
  problemSets: {
    type: Array,
    required: true
  },
  worksheetTitle: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['back', 'edit-set', 'remove-set'])

const generatedProblems = ref([])
const isGenerating = ref(false)
const showAnswers = ref(false)
const currentDate = ref(new Date().toLocaleDateString())
const showPrintModal = ref(false)

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

// Group generated problems by their problem set
const groupedProblems = computed(() => {
  const groups = []
  let currentSetIndex = -1
  let currentGroup = null
  
  generatedProblems.value.forEach(problem => {
    if (problem.setIndex !== currentSetIndex) {
      // New problem set, create new group
      currentSetIndex = problem.setIndex
      const problemSet = props.problemSets[currentSetIndex]
      currentGroup = {
        setInfo: problemSet.generatorInfo,
        problems: []
      }
      groups.push(currentGroup)
    }
    currentGroup.problems.push(problem)
  })
  
  return groups
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

const exportToPDF = () => {
  showPrintModal.value = true
}

const closePrintModal = () => {
  showPrintModal.value = false
}

const handlePrint = async (printSettings) => {
  // Print will be handled by the PrintModal component
  // This is just a fallback/placeholder
  console.log('Print settings:', printSettings)
}

const handleSavePDF = async (printSettings) => {
  // PDF generation will be handled by the PrintModal component
  // This is just a fallback/placeholder
  console.log('PDF settings:', printSettings)
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
          @click="exportToPDF"
          class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
<span class="material-icons mr-2">print</span>Print/Export
        </button>
      </div>
    </div>

    <!-- Problem Set Summary -->
    <div class="mb-8 no-print">
      <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
        <h3 class="text-lg font-semibold text-white mb-4">Problem Sets</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            v-for="(set, index) in problemSets" 
            :key="set.id"
            class="bg-slate-700/30 rounded-lg p-4"
          >
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center space-x-2">
<span class="material-icons text-lg text-orange-400">{{ set.generator.icon }}</span>
                <span class="font-medium text-white">{{ set.generator.name }}</span>
              </div>
              <div class="flex space-x-1">
                <button 
                  @click="editSet(index)"
                  class="text-blue-400 hover:text-blue-300 p-1 rounded transition-colors"
                  title="Edit"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                </button>
                <button 
                  @click="removeSet(index)"
                  class="text-red-400 hover:text-red-300 p-1 rounded transition-colors"
                  title="Remove"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>
            <p class="text-slate-300 text-sm">{{ set.problemCount }} problems</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Worksheet Content -->
    <div class="bg-white rounded-lg shadow-2xl p-8 print:shadow-none print:rounded-none">
      
      <!-- Worksheet Header -->
      <div class="border-b-2 border-slate-200 pb-6 mb-8">
        <div class="text-center">
          <h1 class="text-3xl font-bold text-slate-800 mb-2">{{ worksheetTitle }}</h1>
          <div class="flex justify-between items-center text-sm text-slate-600">
            <div>
              <p>Name: ________________________</p>
            </div>
            <div class="text-center">
              <p>Date: {{ currentDate }}</p>
              <p>{{ totalProblems }} Problems • Est. Time: {{ estimatedTime }}</p>
            </div>
            <div>
              <p>Score: ______ / {{ totalProblems }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Instructions -->
      <div class="mb-8 p-4 bg-slate-50 rounded-lg">
        <h3 class="font-semibold text-slate-800 mb-2">Instructions:</h3>
        <ul class="text-sm text-slate-700 list-disc list-inside space-y-1">
          <li>Show all your work in the space provided</li>
          <li>Write your final answer clearly</li>
          <li>Check your work when finished</li>
        </ul>
      </div>

      <!-- Loading State -->
      <div v-if="isGenerating" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600 mx-auto mb-4"></div>
        <p class="text-slate-600">Generating worksheet problems...</p>
      </div>

      <!-- Problems grouped by problem set -->
      <div v-else-if="groupedProblems.length > 0" class="space-y-10">
        <div 
          v-for="(group, groupIndex) in groupedProblems" 
          :key="`group-${groupIndex}`"
          class="problem-set-section"
        >
          <!-- Section Header -->
          <div class="mb-6 pb-3 border-b-2 border-slate-300">
            <h3 class="text-xl font-bold text-slate-800">{{ group.setInfo.name }}</h3>
            <p class="text-sm text-slate-600">{{ group.problems.length }} problem{{ group.problems.length !== 1 ? 's' : '' }}</p>
          </div>

          <!-- Problems in this set -->
          <div class="space-y-8">
            <div 
              v-for="(problem, index) in group.problems" 
              :key="problem.id"
              class="border-b border-slate-100 pb-6 last:border-b-0"
            >
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                <!-- Problem -->
                <div>
                  <div class="flex items-start space-x-3">
                    <span class="font-bold text-slate-800 text-lg min-w-[2rem]">
                      {{ problem.problemNumber }}.
                    </span>
                    <div class="flex-1">
                      <div class="text-lg text-slate-800 mb-4">
                        <MathExpression 
                          v-if="problem.questionLaTeX" 
                          :expression="problem.questionLaTeX" 
                        />
                        <span v-else>{{ problem.question }}</span>
                      </div>
                      
                      <!-- Work Space -->
                      <div v-if="problem.workSpace" class="min-h-[100px] border border-slate-200 rounded p-3">
                        <div class="text-xs text-slate-400 mb-2">Work Space:</div>
                        <div class="space-y-3">
                          <div class="border-b border-slate-100"></div>
                          <div class="border-b border-slate-100"></div>
                          <div class="border-b border-slate-100"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Answer Section -->
                <div class="flex flex-col justify-center">
                  <!-- Answer Blank (always show blank for student worksheet) -->
                  <div class="mb-4">
                    <div class="text-sm text-slate-600 mb-2">Answer:</div>
                    <div class="border-b-2 border-slate-300 min-h-[2rem] w-full"></div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <div class="w-16 h-16 border-2 border-dashed border-slate-400 rounded-lg mx-auto mb-4 flex items-center justify-center">
          <span class="material-icons text-slate-400 text-2xl">description</span>
        </div>
        <p class="text-slate-600">No problems generated. Please check your configurations.</p>
      </div>

      <!-- Worksheet Footer -->
      <div class="mt-12 pt-6 border-t border-slate-200 text-center text-xs text-slate-500">
        <p>Generated with Open Math Gen • {{ new Date().toLocaleDateString() }}</p>
      </div>

    </div>

    <!-- Answer Key Page (separate page when answers are shown) -->
    <div v-if="showAnswers" class="bg-white rounded-lg shadow-2xl p-8 print:shadow-none print:rounded-none mt-8 page-break-before">
      
      <!-- Answer Key Header -->
      <div class="border-b-2 border-slate-200 pb-6 mb-8">
        <div class="text-center">
          <h1 class="text-3xl font-bold text-slate-800 mb-2">{{ worksheetTitle }} - Answer Key</h1>
          <div class="flex justify-between items-center text-sm text-slate-600">
            <div>
              <p>Teacher Reference</p>
            </div>
            <div class="text-center">
              <p>Date: {{ currentDate }}</p>
              <p>{{ totalProblems }} Problems</p>
            </div>
            <div>
              <p>Open Math Gen</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Answer Grid grouped by problem set -->
      <div class="space-y-8">
        <div 
          v-for="(group, groupIndex) in groupedProblems" 
          :key="`answer-group-${groupIndex}`"
        >
          <!-- Answer Section Header -->
          <div class="mb-4 pb-2 border-b border-slate-300">
            <h4 class="text-lg font-semibold text-slate-800">{{ group.setInfo.name }} Answers</h4>
          </div>

          <!-- Answers for this set -->
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div 
              v-for="(problem, index) in group.problems" 
              :key="`answer-${problem.id}`"
              class="bg-slate-50 border border-slate-200 rounded-lg p-4"
            >
              <div class="flex items-start space-x-2">
                <span class="font-bold text-slate-800 text-sm min-w-[1.5rem]">
                  {{ problem.problemNumber }}.
                </span>
                <div class="flex-1">
                  <div class="text-lg font-semibold text-slate-800">
                    <MathExpression 
                      v-if="problem.answerLaTeX" 
                      :expression="problem.answerLaTeX" 
                    />
                    <span v-else>{{ problem.answer }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Answer Key Footer -->
      <div class="mt-12 pt-6 border-t border-slate-200 text-center text-xs text-slate-500">
        <p>Answer Key - Generated with Open Math Gen • {{ new Date().toLocaleDateString() }}</p>
      </div>

    </div>

    <!-- Print Modal -->
    <PrintModal
      :is-open="showPrintModal"
      :problem-sets="problemSets"
      :generated-problems="generatedProblems"
      :worksheet-title="worksheetTitle"
      :show-answers="showAnswers"
      @close="closePrintModal"
      @print="handlePrint"
      @save-pdf="handleSavePDF"
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