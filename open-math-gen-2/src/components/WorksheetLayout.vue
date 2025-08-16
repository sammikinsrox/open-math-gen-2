<script setup>
import { computed } from 'vue'
import MathExpression from './MathExpression.vue'

const props = defineProps({
  problems: {
    type: Array,
    required: true
  },
  worksheetTitle: {
    type: String,
    required: true
  },
  settings: {
    type: Object,
    default: () => ({
      includeHeader: true,
      includeInstructions: true,
      includeFooter: true,
      includeDate: true,
      includePageNumbers: false,
      schoolName: '',
      teacherName: '',
      className: '',
      footerText: 'Generated with Open Math Gen',
      showWorkSpace: true,
      paperSize: 'letter',
      margins: 'normal',
      fontSize: 'normal',
      orientation: 'portrait'
    })
  },
  showAnswers: {
    type: Boolean,
    default: false
  },
  mode: {
    type: String,
    default: 'preview', // 'preview', 'print', 'screen'
    validator: (value) => ['preview', 'print', 'screen'].includes(value)
  },
  includeAnswerKey: {
    type: Boolean,
    default: false
  },
  answerKeyLocation: {
    type: String,
    default: 'separate' // 'separate', 'inline'
  }
})

const currentDate = new Date().toLocaleDateString()

// Paper dimensions and calculations
const paperDimensions = computed(() => {
  const dimensions = {
    letter: { width: 816, height: 1056 }, // 8.5" x 11" at 96 DPI
    a4: { width: 794, height: 1123 },     // 210mm x 297mm at 96 DPI
    legal: { width: 816, height: 1344 }   // 8.5" x 14" at 96 DPI
  }
  
  const paperSize = props.settings.paperSize || 'letter'
  let { width, height } = dimensions[paperSize] || dimensions.letter
  
  // Swap dimensions for landscape
  if (props.settings.orientation === 'landscape') {
    [width, height] = [height, width]
  }
  
  return { width, height }
})

const marginSizes = computed(() => {
  const margins = {
    narrow: 24,   // 0.25" = 24px
    normal: 48,   // 0.5" = 48px (updated default)
    wide: 64      // 0.67" = 64px
  }
  return margins[props.settings.margins] || margins.normal
})

// Calculate problem height based on settings
const getProblemHeight = () => {
  const hasWorkSpace = props.settings.showWorkSpace
  
  // Guaranteed minimum heights for different scenarios
  let problemHeight = hasWorkSpace ? 200 : 80 // Base heights to accommodate content
  
  // Font size adjustments
  const fontSizeMultipliers = {
    small: 0.85,
    normal: 1.0,
    large: 1.2
  }
  problemHeight *= fontSizeMultipliers[props.settings.fontSize] || 1.0
  
  return Math.ceil(problemHeight)
}

// Calculate available content height for a page
const getAvailableContentHeight = (pageNumber, totalPages) => {
  const { height } = paperDimensions.value
  const marginSize = marginSizes.value
  
  // Start with full page height minus margins
  let availableHeight = height - (marginSize * 2)
  
  // Subtract header space (only on first page)
  const isFirstPage = pageNumber === 1
  if (props.settings.includeHeader && isFirstPage) {
    availableHeight -= props.settings.includeInstructions ? 220 : 140 // Header + optional instructions
  }
  
  // Subtract footer space (only on last page)
  const isLastPage = pageNumber === totalPages
  if (props.settings.includeFooter && isLastPage) {
    availableHeight -= 40 // Footer space
  }
  
  return Math.floor(availableHeight)
}

// Calculate optimal answers per page for answer key
const getAnswersPerPage = () => {
  const { width, height } = paperDimensions.value
  const marginSize = marginSizes.value
  
  // Available space for answers (no header on answer pages)
  const availableWidth = width - (marginSize * 2)
  const availableHeight = height - (marginSize * 2) - (props.settings.includeFooter ? 40 : 0)
  
  // Compact answer box dimensions
  const answerBoxWidth = 90  // ~0.9 inches per answer
  const answerBoxHeight = 40 // ~0.4 inches per answer (increased height)
  
  const answersPerRow = Math.floor(availableWidth / answerBoxWidth)
  const maxRows = Math.floor(availableHeight / answerBoxHeight)
  
  const answersPerPage = answersPerRow * maxRows
  
  return Math.max(answersPerPage, 100) // Minimum 100 answers per page
}

// Dynamic pagination - split problems across pages intelligently
const paginatedProblems = computed(() => {
  if (!props.problems.length) return []
  
  const problemHeight = getProblemHeight()
  let currentProblemIndex = 0
  let pageNumber = 1
  
  // First pass: calculate pages without considering footer
  const tempPages = []
  
  while (currentProblemIndex < props.problems.length) {
    const availableHeight = getAvailableContentHeight(pageNumber, 999) // Large number for first pass
    const pageProblems = []
    let usedHeight = 0
    
    // Pack as many problems as possible on this page
    while (currentProblemIndex < props.problems.length) {
      const heightNeeded = usedHeight + problemHeight
      
      // Check if this problem fits (always add at least one problem per page)
      if (heightNeeded <= availableHeight || pageProblems.length === 0) {
        pageProblems.push(props.problems[currentProblemIndex])
        currentProblemIndex++
        usedHeight = heightNeeded
      } else {
        // Problem doesn't fit, move to next page
        break
      }
    }
    
    if (pageProblems.length > 0) {
      tempPages.push({
        pageNumber: pageNumber,
        problems: pageProblems,
        usedHeight: usedHeight
      })
      pageNumber++
    }
  }
  
  // Calculate total pages including answer key
  const answerKeyPages = (props.includeAnswerKey && props.answerKeyLocation === 'separate') 
    ? Math.ceil(props.problems.length / getAnswersPerPage()) : 0
  const totalDocumentPages = tempPages.length + answerKeyPages
  
  // Second pass: recalculate with proper footer consideration
  return tempPages.map(page => ({
    ...page,
    availableHeight: getAvailableContentHeight(page.pageNumber, totalDocumentPages)
  }))
})

// Answer key pagination
const answerKeyPages = computed(() => {
  if (!props.includeAnswerKey || props.answerKeyLocation === 'inline') {
    return []
  }
  
  const answersPerPage = getAnswersPerPage()
  const allAnswers = props.problems.map(problem => ({
    problemNumber: problem.problemNumber,
    answer: problem.answer,
    answerLaTeX: problem.answerLaTeX
  }))
  
  const { width } = paperDimensions.value
  const marginSize = marginSizes.value
  const availableWidth = width - (marginSize * 2)
  const answerBoxWidth = 90
  const answersPerRow = Math.floor(availableWidth / answerBoxWidth)
  
  const pages = []
  for (let i = 0; i < allAnswers.length; i += answersPerPage) {
    const pageAnswers = allAnswers.slice(i, i + answersPerPage)
    pages.push({
      pageNumber: Math.floor(i / answersPerPage) + 1,
      answers: pageAnswers,
      answersPerRow: answersPerRow
    })
  }
  
  return pages
})

// Calculate total problems count
const totalProblems = computed(() => props.problems.length)

// Estimated time calculation
const estimatedTime = computed(() => {
  const minutes = Math.ceil(props.problems.length * 1.5) // 1.5 minutes per problem average
  return `${minutes} minute${minutes !== 1 ? 's' : ''}`
})

// CSS classes based on settings
const paperClasses = computed(() => {
  const baseClasses = 'bg-white mx-auto print:shadow-none overflow-hidden'
  
  if (props.mode === 'print') {
    const sizeClasses = {
      letter: props.settings.orientation === 'landscape' 
        ? 'w-[11in] h-[8.5in]' 
        : 'w-[8.5in] h-[11in]',
      a4: props.settings.orientation === 'landscape' 
        ? 'w-[297mm] h-[210mm]' 
        : 'w-[210mm] h-[297mm]',
      legal: props.settings.orientation === 'landscape' 
        ? 'w-[14in] h-[8.5in]' 
        : 'w-[8.5in] h-[14in]'
    }
    return `${baseClasses} ${sizeClasses[props.settings.paperSize]} shadow-lg mb-1`
  }
  
  return `${baseClasses} rounded-lg shadow-2xl print:rounded-none`
})

const marginClasses = computed(() => {
  // Use minimal padding since @page rules handle margins
  const margins = {
    narrow: 'p-2',   // Minimal padding
    normal: 'p-3',   // Small padding for readability
    wide: 'p-4'      // Slightly more padding
  }
  return margins[props.settings.margins] || margins.normal
})

const fontSizeClasses = computed(() => {
  const sizes = {
    small: 'text-xs',
    normal: 'text-sm',
    large: 'text-base'
  }
  return sizes[props.settings.fontSize] || sizes.normal
})
</script>

<template>
  <div class="worksheet-layout">
    <!-- Main Worksheet Pages -->
    <div 
      v-for="page in paginatedProblems"
      :key="`page-${page.pageNumber}`"
      :class="[paperClasses, marginClasses, fontSizeClasses]"
      class="worksheet-page"
    >
      
      <!-- Worksheet Header (only on first page) -->
      <div v-if="settings.includeHeader && page.pageNumber === 1" class="border-b-2 border-slate-200 pb-6 mb-8 print:border-black">
        <div class="text-center">
          <div v-if="settings.schoolName" class="text-lg font-semibold text-slate-600 mb-1 print:text-black">
            {{ settings.schoolName }}
          </div>
          <h1 class="text-3xl font-bold text-slate-800 mb-2 print:text-black">{{ worksheetTitle }}</h1>
          
          <!-- Student Info Section -->
          <div class="flex justify-between items-center text-sm text-slate-600 print:text-black">
            <div class="text-left">
              <div class="mb-1">
                <span class="font-medium">Name: </span>
                <span class="inline-block border-b border-slate-300 print:border-black w-40 h-5"></span>
              </div>
              <div v-if="settings.className" class="text-sm">
                <span class="font-medium">Class: </span>
                <span>{{ settings.className }}</span>
              </div>
            </div>
            
            <div class="text-center">
              <div class="mb-1 text-sm">
                <span v-if="settings.includeDate" class="mr-4">
                  <span class="font-medium">Date: </span>
                  <span>{{ currentDate }}</span>
                </span>
                <span>
                  <span class="font-medium">Problems: </span>
                  <span>{{ totalProblems }}</span>
                </span>
              </div>
              <div class="text-sm">
                <span class="font-medium">Est. Time: </span>
                <span>{{ estimatedTime }}</span>
              </div>
            </div>
            
            <div class="text-right">
              <div class="mb-1">
                <span class="font-medium">Score: </span>
                <span class="inline-block border-b border-slate-300 print:border-black w-16 h-5"></span>
                <span class="mx-1">/</span>
                <span>{{ totalProblems }}</span>
              </div>
              <div v-if="settings.teacherName" class="text-sm">
                <span>{{ settings.teacherName }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Instructions (only on first page) -->
      <div v-if="settings.includeInstructions && page.pageNumber === 1" class="mb-8 p-4 bg-slate-50 print:bg-gray-100 rounded-lg print:rounded border border-slate-200 print:border-gray-300">
        <h3 class="font-semibold text-slate-800 print:text-black mb-2">Instructions:</h3>
        <ul class="text-sm text-slate-700 print:text-black list-disc list-inside space-y-1">
          <li>Show all your work in the space provided</li>
          <li>Write your final answer clearly</li>
          <li>Check your work when finished</li>
        </ul>
      </div>

      <!-- Problems for this page -->
      <div class="problems-container space-y-6">
        <div 
          v-for="(problem, index) in page.problems" 
          :key="problem.id"
          class="problem-item break-inside-avoid print-problem"
          :style="{ minHeight: settings.showWorkSpace ? '200px' : '80px' }"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <!-- Problem -->
            <div>
              <div class="flex items-start space-x-3">
                <span class="font-bold text-slate-800 print:text-black text-lg min-w-[2rem] pt-1">
                  {{ problem.problemNumber }}.
                </span>
                <div class="flex-1">
                  <div class="text-lg text-slate-800 print:text-black mb-4 leading-relaxed">
                    <MathExpression 
                      v-if="problem.questionLaTeX" 
                      :expression="problem.questionLaTeX" 
                    />
                    <span v-else>{{ problem.question }}</span>
                  </div>
                  
                  <!-- Work Space -->
                  <div v-if="settings.showWorkSpace" class="work-space mb-4">
                    <div class="text-xs text-slate-400 print:text-gray-700 mb-2">Work Space:</div>
                    <div class="border border-slate-200 print:border-gray-300 rounded p-3 min-h-[80px] bg-slate-50 print:bg-gray-100">
                      <div class="space-y-3">
                        <div class="border-b border-slate-100 print:border-gray-300 h-4"></div>
                        <div class="border-b border-slate-100 print:border-gray-300 h-4"></div>
                        <div class="border-b border-slate-100 print:border-gray-300 h-4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Answer Section -->
            <div class="flex flex-col justify-center">
              <div class="flex items-center space-x-4">
                <span class="text-sm font-medium text-slate-600 print:text-black">Answer:</span>
                
                <!-- Show answer if inline mode or preview with answers -->
                <div v-if="showAnswers && answerKeyLocation === 'inline'" 
                     class="px-3 py-2 bg-green-50 border border-green-300 rounded font-semibold text-green-800">
                  <MathExpression 
                    v-if="problem.answerLaTeX" 
                    :expression="problem.answerLaTeX" 
                  />
                  <span v-else>{{ problem.answer }}</span>
                </div>
                
                <!-- Answer blank for student -->
                <div v-else class="answer-blank border-b-2 border-slate-300 print:border-black w-32 h-8"></div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- Worksheet Footer (only on last worksheet page) -->
      <div v-if="settings.includeFooter && page.pageNumber === paginatedProblems.length && !includeAnswerKey" class="mt-auto pt-6 border-t border-slate-200 print:border-gray-300 text-center text-xs text-slate-500 print:text-gray-700">
        <div class="flex justify-between items-center">
          <div v-if="settings.schoolName">{{ settings.schoolName }}</div>
          <div class="text-center">{{ settings.footerText || 'Generated with Open Math Gen' }}</div>
          <div v-if="settings.includePageNumbers">
            Page {{ page.pageNumber }} of {{ paginatedProblems.length + answerKeyPages.length }}
          </div>
        </div>
      </div>

    </div>

    <!-- Answer Key Pages -->
    <div 
      v-for="answerPage in answerKeyPages"
      :key="`answer-page-${answerPage.pageNumber}`"
      :class="[paperClasses, marginClasses, fontSizeClasses]"
      class="answer-page mt-8 page-break-before"
    >
      
      <!-- Answer Key Header -->
      <div class="border-b-2 border-slate-200 print:border-black pb-6 mb-8">
        <div class="text-center">
          <div v-if="settings.schoolName" class="text-lg font-semibold text-slate-600 print:text-black mb-1">{{ settings.schoolName }}</div>
          <h1 class="text-3xl font-bold text-slate-800 print:text-black mb-2">{{ worksheetTitle }} - Answer Key</h1>
          <div class="flex justify-between items-center text-sm text-slate-600 print:text-black">
            <div>
              <p>Teacher Reference</p>
            </div>
            <div class="text-center">
              <p>Date: {{ currentDate }}</p>
              <p>{{ totalProblems }} Problems</p>
            </div>
            <div>
              <p>{{ settings.footerText || 'Open Math Gen' }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Answer Grid - Optimized for 150+ answers per page -->
      <div 
        class="answer-grid grid gap-1 p-2"
        :style="{ gridTemplateColumns: `repeat(${answerPage.answersPerRow}, 1fr)` }"
      >
        <div
          v-for="answer in answerPage.answers"
          :key="`answer-${answer.problemNumber}`"
          class="answer-item bg-slate-50 print:bg-gray-100 border border-slate-200 print:border-gray-300 rounded p-2 text-center break-inside-avoid flex flex-col justify-center"
          style="min-height: 40px; max-height: 50px;"
        >
          <div class="text-xs font-bold text-slate-800 print:text-black">{{ answer.problemNumber }}</div>
          <div class="text-xs text-slate-800 print:text-black leading-tight">
            <MathExpression 
              v-if="answer.answerLaTeX" 
              :expression="answer.answerLaTeX" 
            />
            <span v-else>{{ answer.answer }}</span>
          </div>
        </div>
      </div>

      <!-- Answer Key Footer (only on last answer page) -->
      <div v-if="settings.includeFooter && answerPage.pageNumber === answerKeyPages.length" class="mt-auto pt-6 border-t border-slate-200 print:border-gray-300 text-center text-xs text-slate-500 print:text-gray-700">
        <div class="flex justify-between items-center">
          <div v-if="settings.schoolName">{{ settings.schoolName }}</div>
          <div class="text-center">Answer Key - {{ settings.footerText || 'Generated with Open Math Gen' }}</div>
          <div v-if="settings.includePageNumbers">
            Page {{ paginatedProblems.length + answerPage.pageNumber }} of {{ paginatedProblems.length + answerKeyPages.length }}
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Page-specific styles */
.worksheet-page {
  break-after: page;
  page-break-after: always;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.worksheet-page:last-of-type {
  break-after: auto;
  page-break-after: auto;
}

.answer-page {
  break-after: page;
  page-break-after: always;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.answer-page:last-of-type {
  break-after: auto;
  page-break-after: auto;
}

.problem-item {
  break-inside: avoid;
  page-break-inside: avoid;
  margin-bottom: 1.5rem;
}

.problems-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.answer-grid {
  break-inside: auto;
  overflow: visible;
}

.answer-item {
  break-inside: avoid;
  page-break-inside: avoid;
  font-size: 11px;
  line-height: 1.2;
  min-height: 40px;
}

/* Print-specific styles */
@media print {
  /* Ensure only worksheet content is visible when printing */
  .worksheet-layout {
    visibility: visible !important;
    display: block !important;
    position: static !important;
    left: auto !important;
    top: auto !important;
    opacity: 1 !important;
  }
  
  .worksheet-layout,
  .worksheet-layout * {
    visibility: visible !important;
  }
  
  body {
    background: white !important;
    color: black !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  
  .worksheet-layout {
    background: white !important;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
  
  .worksheet-page {
    break-after: page !important;
    page-break-after: always !important;
    width: 100% !important;
    height: 100vh !important;
    min-height: 100vh !important;
    max-height: 100vh !important;
    overflow: hidden !important;
    margin: 0 !important;
    padding: 0 !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    display: flex !important;
    flex-direction: column !important;
  }
  
  .worksheet-page:last-of-type {
    break-after: auto !important;
    page-break-after: auto !important;
  }
  
  .answer-page {
    break-after: page !important;
    page-break-after: always !important;
    width: 100% !important;
    height: 100vh !important;
    min-height: 100vh !important;
    max-height: 100vh !important;
    overflow: hidden !important;
    margin: 0 !important;
    padding: 0 !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    display: flex !important;
    flex-direction: column !important;
  }
  
  .answer-page:last-of-type {
    break-after: auto !important;
    page-break-after: auto !important;
  }
  
  .problem-item {
    break-inside: avoid !important;
    page-break-inside: avoid !important;
    overflow: visible !important;
  }
  
  /* Ensure high contrast for B&W printing */
  .text-slate-800 {
    color: #000000 !important;
  }
  
  .text-slate-600 {
    color: #374151 !important;
  }
  
  .text-slate-700 {
    color: #374151 !important;
  }
  
  .border-slate-200 {
    border-color: #000000 !important;
  }
  
  .border-slate-300 {
    border-color: #000000 !important;
  }
  
  .bg-slate-50 {
    background-color: #f3f4f6 !important;
  }
  
  /* Remove transforms that interfere with print */
  * {
    transform: none !important;
    transition: none !important;
    animation: none !important;
  }
}

/* Force our margins - override print dialog settings */
@page {
  margin: 0.5in !important;
  size: auto;
}

/* Letter size pages */
@page letter {
  size: 8.5in 11in;
  margin: 0.5in !important;
}

/* A4 size pages */
@page a4 {
  size: 210mm 297mm;
  margin: 12.7mm !important;  /* 0.5 inches = 12.7mm */
}

/* Legal size pages */
@page legal {
  size: 8.5in 14in;
  margin: 0.5in !important;
}

/* Force specific margin settings */
@page narrow {
  margin: 0.25in !important;
}

@page normal {
  margin: 0.5in !important;
}

@page wide {
  margin: 0.67in !important;
}

/* Answer blank styling */
.answer-blank {
  border-bottom: 2px solid #cbd5e1;
  display: inline-block;
  min-width: 8rem;
  height: 2rem;
}

@media print {
  .answer-blank {
    border-bottom-color: #000000 !important;
  }
}

/* Work space styling */
.work-space .border-b {
  border-color: #e2e8f0;
  margin-bottom: 0.75rem;
}

@media print {
  .work-space .border-b {
    border-color: #d1d5db !important;
  }
}

/* Screen preview styles */
@media screen {
  .worksheet-page {
    border: 1px solid #e5e7eb;
    margin-bottom: 1rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  .answer-page {
    border: 1px solid #e5e7eb;
    margin-bottom: 1rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  .page-break-before {
    margin-top: 2rem;
    border-top: 2px dashed #f97316;
    padding-top: 1rem;
  }
}
</style>