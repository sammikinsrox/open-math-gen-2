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
  const baseClasses = 'bg-white shadow-lg mx-auto mb-6 print:shadow-none print:mb-0'
  const sizeClasses = {
    letter: 'w-[8.5in] min-h-[11in]',
    a4: 'w-[210mm] min-h-[297mm]', 
    legal: 'w-[8.5in] min-h-[14in]'
  }
  const orientationClasses = {
    portrait: '',
    landscape: 'transform rotate-90 origin-center'
  }
  
  return `${baseClasses} ${sizeClasses[props.settings.paperSize]} ${orientationClasses[props.settings.orientation]}`
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

// Problem organization
const problemsPerPage = computed(() => {
  if (props.settings.problemsPerPage === 'auto') {
    // Calculate based on page size and problem complexity
    const baseSize = props.settings.paperSize === 'legal' ? 20 : 15
    return props.settings.fontSize === 'large' ? Math.floor(baseSize * 0.8) : baseSize
  }
  return parseInt(props.settings.problemsPerPage)
})

const pages = computed(() => {
  const pageSize = problemsPerPage.value
  const pageCount = Math.ceil(props.problems.length / pageSize)
  const result = []
  
  for (let i = 0; i < pageCount; i++) {
    const startIndex = i * pageSize
    const endIndex = Math.min(startIndex + pageSize, props.problems.length)
    result.push({
      pageNumber: i + 1,
      problems: props.problems.slice(startIndex, endIndex)
    })
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
      <div :class="[marginClasses, fontSizeClasses]" class="print-content">
        
        <!-- Page Header -->
        <div v-if="settings.includeHeader" class="print-header border-b-2 border-black pb-4 mb-6">
          <div class="text-center">
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
                <div v-if="settings.includeDate" class="mb-1">
                  <span class="font-medium">Date: </span>
                  <span>{{ currentDate }}</span>
                </div>
                <div class="text-sm text-gray-800">
                  {{ page.problems.length }} Problems
                </div>
              </div>
              
              <div class="text-right">
                <div class="mb-1">
                  <span class="font-medium">Score: </span>
                  <span class="inline-block border-b border-black w-16 h-5"></span>
                  <span class="mx-1">/</span>
                  <span>{{ page.problems.length }}</span>
                </div>
                <div v-if="settings.teacherName" class="text-sm">
                  <span>{{ settings.teacherName }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Instructions -->
        <div class="print-instructions bg-gray-100 border border-gray-300 rounded p-3 mb-6">
          <h3 class="font-semibold text-black mb-2">Instructions:</h3>
          <ul class="text-sm text-black list-disc list-inside space-y-1">
            <li>Show all your work in the space provided</li>
            <li>Write your final answer clearly in the answer box</li>
            <li>Check your work when finished</li>
          </ul>
        </div>

        <!-- Problems -->
        <div class="print-problems space-y-6">
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
        <div v-if="settings.includeFooter" class="print-footer border-t border-gray-300 pt-3 mt-6">
          <div class="flex justify-between items-center text-xs text-gray-700">
            <div v-if="settings.schoolName">{{ settings.schoolName }}</div>
            <div class="text-center">Generated with Open Math Gen</div>
            <div v-if="settings.includePageNumbers">
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
      <div :class="[marginClasses, fontSizeClasses]" class="print-content">
        
        <!-- Answer Key Header -->
        <div class="print-header border-b-2 border-black pb-4 mb-6">
          <div class="text-center">
            <h1 class="text-2xl font-bold text-black mb-2">{{ worksheetTitle }} - Answer Key</h1>
            <div class="text-sm text-gray-700">
              Page {{ answerPage.pageNumber }} Answers
            </div>
          </div>
        </div>

        <!-- Answer Grid -->
        <div class="answer-grid grid grid-cols-2 md:grid-cols-3 gap-4">
          <div 
            v-for="answer in answerPage.answers" 
            :key="answer.problemNumber"
            class="answer-item border border-gray-300 rounded p-3 bg-gray-100"
          >
            <div class="flex items-center space-x-2">
              <span class="font-bold text-black">{{ answer.problemNumber }}.</span>
              <div class="flex-1 text-black">
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
        <div class="print-footer border-t border-gray-300 pt-3 mt-6">
          <div class="flex justify-between items-center text-xs text-gray-700">
            <div v-if="settings.schoolName">{{ settings.schoolName }}</div>
            <div class="text-center">Answer Key - Generated with Open Math Gen</div>
            <div v-if="settings.includePageNumbers">
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
    padding: 2rem;
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

/* Answer grid responsiveness */
.answer-grid {
  gap: 0.75rem;
}

.answer-item {
  break-inside: avoid;
  min-height: 3rem;
}
</style>