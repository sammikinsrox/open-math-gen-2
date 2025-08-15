<script setup>
import { ref, computed, watch, nextTick, onMounted } from 'vue'
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

// Dynamic problem fitting based on paper size, settings, and content
const calculateDynamicProblemsPerPage = (pageNumber) => {
  if (props.settings.problemsPerPage !== 'auto') {
    return parseInt(props.settings.problemsPerPage)
  }
  
  // Calculate available space based on paper size and settings
  const isFirstPage = pageNumber === 1
  const hasHeader = isFirstPage && props.settings.includeHeader
  const hasFooter = props.settings.includeFooter
  const hasWorkSpace = props.settings.showWorkSpace
  
  // Base dimensions in pixels (approximate conversion for calculation)
  const paperSizes = {
    letter: { width: 816, height: 1056 }, // 8.5" x 11" at 96 DPI
    a4: { width: 794, height: 1123 },     // 210mm x 297mm
    legal: { width: 816, height: 1344 }   // 8.5" x 14"
  }
  
  const margins = {
    narrow: 48,   // 0.5" = 48px
    normal: 96,   // 1" = 96px  
    wide: 144     // 1.5" = 144px
  }
  
  const paperSize = paperSizes[props.settings.paperSize] || paperSizes.letter
  const marginSize = margins[props.settings.margins] || margins.normal
  
  // Calculate available content height
  let availableHeight = paperSize.height - (marginSize * 2) // Top and bottom margins
  
  // Subtract header space (if present on this page)
  if (hasHeader) {
    availableHeight -= 180 // Header + instructions space
  }
  
  // Subtract footer space (if present)
  if (hasFooter) {
    availableHeight -= 40 // Footer space
  }
  
  // Calculate problem height based on settings
  let problemHeight = 60 // Base problem height (question + answer)
  
  // Add workspace height if enabled
  if (hasWorkSpace) {
    problemHeight += 100 // Workspace adds significant height
  }
  
  // Add spacing between problems
  problemHeight += 24 // Spacing between problems
  
  // Font size adjustments
  const fontSizeMultipliers = {
    small: 0.85,
    normal: 1.0,
    large: 1.2
  }
  problemHeight *= fontSizeMultipliers[props.settings.fontSize] || 1.0
  
  // Calculate how many problems fit
  const maxProblems = Math.floor(availableHeight / problemHeight)
  
  // Apply reasonable bounds
  const minProblems = 1
  const maxBounds = hasWorkSpace ? 8 : 15 // More problems when no workspace
  
  return Math.max(minProblems, Math.min(maxProblems, maxBounds))
}

// Legacy function for backwards compatibility
const getProblemsForPage = (pageNumber) => {
  return calculateDynamicProblemsPerPage(pageNumber)
}

const problemsPerPage = computed(() => {
  // For the computed property, return the default (which is used for calculations)
  // We'll use the getProblemsForPage function in the pages computation
  if (props.settings.problemsPerPage === 'auto') {
    return 3 // Default for calculations
  }
  return parseInt(props.settings.problemsPerPage)
})

// Calculate actual available content height for a page
const getAvailableContentHeight = (pageNumber, totalPages) => {
  const isFirstPage = pageNumber === 1
  const hasHeader = isFirstPage && props.settings.includeHeader
  // Footer only appears on the very last page of the document
  const hasFooter = props.settings.includeFooter && pageNumber === totalPages
  
  // Base dimensions in pixels (approximate conversion for calculation)
  const paperSizes = {
    letter: { width: 816, height: 1056 }, // 8.5" x 11" at 96 DPI
    a4: { width: 794, height: 1123 },     // 210mm x 297mm
    legal: { width: 816, height: 1344 }   // 8.5" x 14"
  }
  
  const margins = {
    narrow: 48,   // 0.5" = 48px
    normal: 96,   // 1" = 96px  
    wide: 144     // 1.5" = 144px
  }
  
  const paperSize = paperSizes[props.settings.paperSize] || paperSizes.letter
  const marginSize = margins[props.settings.margins] || margins.normal
  
  // Start with full page height minus margins
  let availableHeight = paperSize.height - (marginSize * 2)
  
  // Subtract header space (if present on this page)
  if (hasHeader) {
    availableHeight -= 180 // Header + instructions space
  }
  
  // Subtract footer space (if present)
  if (hasFooter) {
    availableHeight -= 40 // Footer space
  }
  
  return availableHeight
}

// Calculate height of a single problem
const getProblemHeight = () => {
  const hasWorkSpace = props.settings.showWorkSpace
  
  // Base problem height (question + answer section)
  let problemHeight = 60
  
  // Add workspace height if enabled
  if (hasWorkSpace) {
    problemHeight += 100 // Workspace adds significant height
  }
  
  // Add spacing between problems
  problemHeight += 24 // Spacing between problems
  
  // Font size adjustments
  const fontSizeMultipliers = {
    small: 0.85,
    normal: 1.0,
    large: 1.2
  }
  problemHeight *= fontSizeMultipliers[props.settings.fontSize] || 1.0
  
  return problemHeight
}

const pages = computed(() => {
  // First pass: calculate pages without considering footer space
  let firstPassResult = []
  let currentProblemIndex = 0
  let pageNumber = 1
  
  while (currentProblemIndex < props.problems.length) {
    // Use a large total for first pass (footer won't appear)
    const availableHeight = getAvailableContentHeight(pageNumber, 9999)
    const problemHeight = getProblemHeight()
    const pageProblems = []
    let usedHeight = 0
    
    // Add problems to this page while they fit within the available height
    while (currentProblemIndex < props.problems.length) {
      const heightNeeded = usedHeight + problemHeight
      
      // Check if this problem fits on the current page
      if (heightNeeded <= availableHeight || pageProblems.length === 0) {
        // Add the problem (always add at least one problem per page)
        pageProblems.push(props.problems[currentProblemIndex])
        currentProblemIndex++
        usedHeight = heightNeeded
      } else {
        // Problem doesn't fit, move to next page
        break
      }
    }
    
    // Create the page with the problems that fit
    if (pageProblems.length > 0) {
      firstPassResult.push({
        pageNumber: pageNumber,
        problems: pageProblems,
        usedHeight: usedHeight
      })
      pageNumber++
    } else {
      // Safety break to prevent infinite loop
      break
    }
  }
  
  // Calculate total pages (including answer key)
  const answerKeyPageCount = (props.settings.includeAnswerKey && props.settings.answerKeyLocation === 'separate') 
    ? Math.ceil(props.problems.length / 36) : 0
  const totalDocumentPages = firstPassResult.length + answerKeyPageCount
  
  // Second pass: recalculate the last page with proper footer space consideration
  const result = firstPassResult.map((page, index) => ({
    ...page,
    availableHeight: getAvailableContentHeight(page.pageNumber, totalDocumentPages)
  }))
  
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

// Helper functions for footer positioning
const getTotalPages = () => {
  return pages.value.length + answerKeyPages.value.length
}

const isLastPageOfDocument = (pageNumber) => {
  // If there are answer key pages, this is not the last page
  if (answerKeyPages.value.length > 0) {
    return false
  }
  // If no answer key, check if this is the last worksheet page
  return pageNumber === pages.value.length
}

const isLastAnswerPage = (answerPageNumber) => {
  // This is only called for answer pages, so check if it's the last answer page
  return answerPageNumber === answerKeyPages.value.length
}

// JavaScript-based page break detection
const detectAndFixPageBreaks = () => {
  // Wait for next tick to ensure DOM is fully rendered
  nextTick(() => {
    const printPages = document.querySelectorAll('.print-page')
    
    printPages.forEach((page) => {
      const pageRect = page.getBoundingClientRect()
      const problems = page.querySelectorAll('.print-problem')
      const tolerance = 10 // Allow small overlap before forcing page break
      
      problems.forEach((problem, index) => {
        const problemRect = problem.getBoundingClientRect()
        
        // Check if problem extends significantly beyond the page boundary
        const overflowAmount = problemRect.bottom - pageRect.bottom
        const isSignificantOverflow = overflowAmount > tolerance
        
        // Only apply page break if there's significant overflow AND this isn't the first problem
        if (isSignificantOverflow && index > 0) {
          // Add CSS class to force page break before this problem
          problem.classList.add('force-page-break')
          console.log(`Applied page break to problem ${index + 1} (overflow: ${overflowAmount}px)`)
        } else {
          // Remove the class if it was previously added
          problem.classList.remove('force-page-break')
        }
      })
    })
  })
}

// Watch for changes that require re-detection
watch(() => props.settings, detectAndFixPageBreaks, { deep: true })
watch(() => props.problems, detectAndFixPageBreaks, { deep: true })

// Run detection after component mounts and pages are rendered
onMounted(() => {
  // Run after a short delay to ensure all content is rendered
  setTimeout(detectAndFixPageBreaks, 100)
})

// Expose function for parent components to trigger re-detection
defineExpose({
  detectPageBreaks: detectAndFixPageBreaks
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
        <div 
          class="print-problems space-y-6 flex-1 overflow-hidden"
          :style="{ maxHeight: page.availableHeight + 'px' }"
        >
          <div 
            v-for="(problem, index) in page.problems" 
            :key="problem.id"
            class="print-problem border-b border-gray-300 pb-4 last:border-b-0"
            :style="{ minHeight: settings.showWorkSpace ? '160px' : '80px' }"
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

        <!-- Page Footer (only on last page of entire document) -->
        <div v-if="settings.includeFooter && isLastPageOfDocument(page.pageNumber)" class="print-footer border-t border-gray-300 pt-3 mt-auto">
          <div class="flex justify-between items-center text-xs text-gray-700">
            <div v-if="settings.schoolName">{{ settings.schoolName }}</div>
            <div class="text-center">{{ settings.footerText || 'Generated with Open Math Gen' }}</div>
            <div v-if="settings.includePageNumbers">
              Page {{ page.pageNumber }} of {{ getTotalPages() }}
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

        <!-- Answer Key Footer (only on last answer page) -->
        <div v-if="settings.includeFooter && isLastAnswerPage(answerPage.pageNumber)" class="print-footer border-t border-gray-300 pt-3 mt-auto">
          <div class="flex justify-between items-center text-xs text-gray-700">
            <div v-if="settings.schoolName">{{ settings.schoolName }}</div>
            <div class="text-center">Answer Key - {{ settings.footerText || 'Generated with Open Math Gen' }}</div>
            <div v-if="settings.includePageNumbers">
              Answer Page {{ answerPage.pageNumber }} of {{ answerKeyPages.length }}
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
    display: flex !important;
    flex-direction: column !important;
    max-height: inherit !important;
  }
  
  .print-problem {
    flex-shrink: 0 !important;
    break-inside: avoid !important;
    page-break-inside: avoid !important;
    overflow: visible !important;
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
    display: flex;
    flex-direction: column;
  }
  
  .print-page:hover {
    transform: scale(0.82);
  }
  
  .print-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  
  .print-problems {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    max-height: inherit;
  }
  
  .print-problem {
    flex-shrink: 0;
    break-inside: avoid;
    page-break-inside: avoid;
  }
  
  /* Simulate page break in screen preview */
  .force-page-break {
    margin-top: 2rem;
    border-top: 2px dashed #f97316;
    padding-top: 1rem;
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

/* Ensure proper spacing for print and prevent page breaks within problems */
.print-problem {
  break-inside: avoid; /* Prevent splitting problems across pages */
  page-break-inside: avoid; /* Fallback for older browsers */
  flex-shrink: 0; /* Prevent compression in flex container */
  overflow: visible; /* Allow content to be visible */
}

/* Dynamic min-height based on workspace setting */
.print-problem {
  min-height: var(--problem-min-height, 80px);
}

/* Force page break when problem is detected as overflowing */
.force-page-break {
  page-break-before: always !important;
  break-before: page !important;
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