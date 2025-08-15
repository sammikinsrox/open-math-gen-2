<script setup>
import { ref, computed } from 'vue'
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
    required: true
  },
  showAnswers: {
    type: Boolean,
    default: false
  }
})

const currentDate = new Date().toLocaleDateString()

// Computed properties for styling
const paperClasses = computed(() => {
  const baseClasses = 'bg-white shadow-lg mx-auto mb-1 print:shadow-none print:mb-0 overflow-hidden'
  
  // Use exact height constraints to match real paper sizes
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
  
  return `${baseClasses} ${sizeClasses[props.settings.paperSize]}`
})

const marginClasses = computed(() => {
  const margins = {
    narrow: 'p-4',
    normal: 'p-8',
    wide: 'p-12'
  }
  return margins[props.settings.margins]
})

const fontSizeClasses = computed(() => {
  const sizes = {
    small: 'text-xs',
    normal: 'text-sm',
    large: 'text-base'
  }
  return sizes[props.settings.fontSize]
})

// Problem organization with different logic for first page vs subsequent pages
const getProblemsForPage = (pageNumber) => {
  if (props.settings.problemsPerPage !== 'auto') {
    return parseInt(props.settings.problemsPerPage)
  }
  
  // Auto mode: Different calculations for first page vs subsequent pages
  const isFirstPage = pageNumber === 1
  
  if (isFirstPage && props.settings.includeHeader) {
    // First page with header and instructions: 2 problems (less space due to header)
    return 2
  } else {
    // Subsequent pages or first page without header: 3 problems (more space available)
    return 3
  }
}

const problemsPerPage = computed(() => {
  // For the computed property, return the default (which is used for calculations)
  // We'll use the getProblemsForPage function in the pages computation
  if (props.settings.problemsPerPage === 'auto') {
    return 3 // Default for calculations
  }
  return parseInt(props.settings.problemsPerPage)
})

const pages = computed(() => {
  const result = []
  let currentProblemIndex = 0
  let pageNumber = 1
  
  while (currentProblemIndex < props.problems.length) {
    const problemsForThisPage = getProblemsForPage(pageNumber)
    const endIndex = Math.min(currentProblemIndex + problemsForThisPage, props.problems.length)
    
    result.push({
      pageNumber: pageNumber,
      problems: props.problems.slice(currentProblemIndex, endIndex)
    })
    
    currentProblemIndex = endIndex
    pageNumber++
  }
  
  return result
})

// Answer key organization
const answerKeyPages = computed(() => {
  if (!props.settings.includeAnswerKey || props.settings.answerKeyLocation === 'inline') {
    return []
  }
  
  // Group answers by original page
  return pages.value.map(page => ({
    pageNumber: page.pageNumber,
    answers: page.problems.map(problem => ({
      problemNumber: problem.problemNumber,
      answer: problem.answer,
      answerLaTeX: problem.answerLaTeX
    }))
  }))
})
</script>

<template>
  <div class="print-preview-container">
    <!-- Main Worksheet Pages -->
    <div
      v-for="page in pages"
      :key="`page-${page.pageNumber}`"
      :class="paperClasses"
      class="print-page"
    >
      <div :class="[marginClasses, fontSizeClasses]" class="print-content h-full flex flex-col">
        
        <!-- Page Header (only on first page) -->
        <div v-if="settings.includeHeader && page.pageNumber === 1" class="print-header border-b-2 border-black pb-4 mb-6">
          <div class="text-center">
            <div v-if="settings.schoolName" class="text-lg font-semibold text-black mb-1">{{ settings.schoolName }}</div>
            <h1 class="text-2xl font-bold text-black mb-2">{{ worksheetTitle }}</h1>
            
            <!-- Student Info Section -->
            <div class="flex justify-between items-center text-black">
              <div class="text-left">
                <div class="mb-1">
                  <span class="font-medium">Name: </span>
                  <span class="inline-block border-b border-black w-40 h-5"></span>
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
                    <span>{{ problems.length }}</span>
                  </span>
                </div>
              </div>
              
              <div class="text-right">
                <div class="mb-1">
                  <span class="font-medium">Score: </span>
                  <span class="inline-block border-b border-black w-16 h-5"></span>
                  <span class="mx-1">/</span>
                  <span>{{ problems.length }}</span>
                </div>
                <div v-if="settings.teacherName" class="text-sm">
                  <span>{{ settings.teacherName }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Instructions (only on first page) -->
        <div v-if="page.pageNumber === 1" class="print-instructions bg-gray-100 border border-gray-300 rounded p-3 mb-6">
          <h3 class="font-semibold text-black mb-2">Instructions:</h3>
          <ul class="text-sm text-black list-disc list-inside space-y-1">
            <li>Show all your work in the space provided</li>
            <li>Write your final answer clearly in the answer box</li>
            <li>Check your work when finished</li>
          </ul>
        </div>

        <!-- Problems -->
        <div class="print-problems space-y-6 flex-1 overflow-hidden">
          <div 
            v-for="(problem, index) in page.problems" 
            :key="problem.id"
            class="print-problem border-b border-gray-300 pb-4 last:border-b-0"
          >
            <div class="grid grid-cols-1 gap-4">
              
              <!-- Problem Statement -->
              <div class="problem-statement">
                <div class="flex items-start space-x-3">
                  <span class="font-bold text-black text-lg min-w-[2rem] pt-1">
                    {{ problem.problemNumber }}.
                  </span>
                  <div class="flex-1">
                    <div class="text-lg text-black mb-3 leading-relaxed">
                      <MathExpression 
                        v-if="problem.questionLaTeX" 
                        :expression="problem.questionLaTeX" 
                      />
                      <span v-else>{{ problem.question }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Work Space and Answer -->
              <div class="problem-workspace">
                <!-- Work Space -->
                <div v-if="settings.showWorkSpace" class="work-space mb-4">
                  <div class="text-xs text-gray-700 mb-2">Work Space:</div>
                  <div class="border border-gray-300 rounded p-3 min-h-[80px] bg-gray-100">
                    <div class="space-y-3">
                      <div class="border-b border-gray-300 h-4"></div>
                      <div class="border-b border-gray-300 h-4"></div>
                      <div class="border-b border-gray-300 h-4"></div>
                    </div>
                  </div>
                </div>

                <!-- Answer Section -->
                <div class="answer-section">
                  <div class="flex items-center space-x-4">
                    <span class="text-sm font-medium text-black">Answer:</span>
                    
                    <!-- Show answer if inline mode or preview with answers -->
                    <div v-if="showAnswers && settings.answerKeyLocation === 'inline'" 
                         class="px-3 py-2 bg-green-50 border border-green-300 rounded font-semibold text-green-800">
                      <MathExpression 
                        v-if="problem.answerLaTeX" 
                        :expression="problem.answerLaTeX" 
                      />
                      <span v-else>{{ problem.answer }}</span>
                    </div>
                    
                    <!-- Answer blank for student -->
                    <div v-else class="answer-blank border-b-2 border-black w-32 h-8"></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- Page Footer -->
        <div v-if="settings.includeFooter" class="print-footer border-t border-gray-300 pt-3 mt-auto">
          <div class="flex justify-between items-center text-xs text-gray-700">
            <div v-if="settings.schoolName">{{ settings.schoolName }}</div>
            <div class="text-center">{{ settings.footerText || 'Generated with Open Math Gen' }}</div>
            <div v-if="settings.includePageNumbers && settings.includeFooter">
              Page {{ page.pageNumber }} of {{ pages.length }}
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Answer Key Pages -->
    <div
      v-if="answerKeyPages.length > 0"
      v-for="answerPage in answerKeyPages"
      :key="`answer-${answerPage.pageNumber}`"
      :class="paperClasses"
      class="print-page page-break-before"
    >
      <div :class="[marginClasses, fontSizeClasses]" class="print-content h-full flex flex-col">
        
        <!-- Answer Key Header -->
        <div class="print-header border-b-2 border-black pb-4 mb-6">
          <div class="text-center">
            <div v-if="settings.schoolName" class="text-lg font-semibold text-black mb-1">{{ settings.schoolName }}</div>
            <h1 class="text-2xl font-bold text-black mb-2">{{ worksheetTitle }} - Answer Key</h1>
            <div class="text-sm text-gray-700">
              Page {{ answerPage.pageNumber }} Answers
            </div>
          </div>
        </div>

        <!-- Answer Grid -->
        <div class="answer-grid grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 flex-1 overflow-hidden">
          <div 
            v-for="answer in answerPage.answers" 
            :key="answer.problemNumber"
            class="answer-item border border-gray-300 rounded p-2 bg-gray-100"
          >
            <div class="flex items-center space-x-1">
              <span class="font-bold text-black text-xs">{{ answer.problemNumber }}.</span>
              <div class="flex-1 text-black text-xs">
                <MathExpression 
                  v-if="answer.answerLaTeX" 
                  :expression="answer.answerLaTeX" 
                />
                <span v-else>{{ answer.answer }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Answer Key Footer -->
        <div v-if="settings.includeFooter" class="print-footer border-t border-gray-300 pt-3 mt-auto">
          <div class="flex justify-between items-center text-xs text-gray-700">
            <div v-if="settings.schoolName">{{ settings.schoolName }}</div>
            <div class="text-center">Answer Key - {{ settings.footerText || 'Generated with Open Math Gen' }}</div>
            <div v-if="settings.includePageNumbers && settings.includeFooter">
              Answer Page {{ answerPage.pageNumber }}
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style>
/* Print-specific styles */
@media print {
  body {
    background: white !important;
    color: black !important;
  }
  
  .print-page {
    page-break-after: always;
    box-shadow: none !important;
    margin: 0 !important;
    height: 100vh !important;
    min-height: 100vh !important;
    max-height: 100vh !important;
    overflow: hidden !important;
    display: flex !important;
    flex-direction: column !important;
  }
  
  .print-page:last-child {
    page-break-after: auto;
  }
  
  .page-break-before {
    page-break-before: always;
  }
  
  .print-preview-container {
    margin: 0;
    padding: 0;
  }
  
  .print-content {
    height: 100% !important;
    flex: 1 !important;
    display: flex !important;
    flex-direction: column !important;
    overflow: hidden !important;
  }
  
  .print-problems {
    flex: 1 !important;
    overflow: hidden !important;
  }
  
  .print-footer {
    margin-top: auto !important;
    flex-shrink: 0 !important;
  }
  
  /* Ensure high contrast for B&W printing */
  .text-gray-700 {
    color: #374151 !important;
  }
  
  .text-gray-800 {
    color: #1f2937 !important;
  }
  
  .bg-gray-100 {
    background-color: #f3f4f6 !important;
  }
  
  /* Remove backgrounds that don't print well */
  .bg-green-50 {
    background-color: #f0fdf4 !important;
  }
  
  /* Ensure borders are visible */
  .border-black {
    border-color: #000000 !important;
  }
  
  .border-gray-300 {
    border-color: #d1d5db !important;
  }
}

/* Screen preview styles */
@media screen {
  .print-preview-container {
    background: #f3f4f6;
    padding: 1rem;
    min-height: 100vh;
  }
  
  .print-page {
    transform: scale(0.8);
    transform-origin: top center;
    transition: transform 0.2s ease;
  }
  
  .print-page:hover {
    transform: scale(0.82);
  }
}

/* KaTeX adjustments for print */
.katex {
  font-size: 1.1em !important;
}

.katex .mord, .katex .mrel, .katex .mbin, .katex .mop {
  color: black !important;
}

/* Answer blank styling */
.answer-blank {
  border-bottom: 2px solid #000;
  display: inline-block;
  min-width: 8rem;
  height: 2rem;
}

/* Work space styling */
.work-space .border-b {
  border-color: #d1d5db;
  margin-bottom: 0.75rem;
}

/* Ensure proper spacing for print */
.print-problem {
  min-height: 120px;
  break-inside: avoid;
}

/* Grid responsiveness for different paper sizes */
@page {
  margin: 0.5in;
  size: letter;
}

@page :first {
  margin-top: 1in;
}

/* Ensure pages maintain proper dimensions */
.print-page {
  display: flex;
  flex-direction: column;
}

.print-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Screen styles to show proper page dimensions */
@media screen {
  .print-page {
    border: 1px solid #e5e7eb;
    box-sizing: border-box;
  }
}

/* Answer grid responsiveness */
.answer-grid {
  gap: 0.25rem;
}

.answer-item {
  break-inside: avoid;
  min-height: 2rem;
}
</style>