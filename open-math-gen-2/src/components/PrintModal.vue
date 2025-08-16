<script setup>
import { ref, computed, watch } from 'vue'
import PrintSettings from './PrintSettings.vue'
import PrintPreview from './PrintPreview.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  problemSets: {
    type: Array,
    required: true
  },
  generatedProblems: {
    type: Array,
    required: true
  },
  worksheetTitle: {
    type: String,
    required: true
  },
  showAnswers: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'print', 'save-pdf'])

// Print settings state
const printSettings = ref({
  paperSize: 'letter', // 'letter', 'a4', 'legal'
  orientation: 'portrait', // 'portrait', 'landscape'
  margins: 'normal', // 'normal', 'narrow', 'wide'
  includeAnswerKey: false,
  answerKeyLocation: 'separate', // 'separate', 'inline'
  problemsPerPage: 'auto', // 'auto', '5', '10', '15', '20'
  fontSize: 'normal', // 'small', 'normal', 'large'
  showWorkSpace: true,
  includeHeader: true,
  schoolName: '',
  teacherName: '',
  className: '',
  includeDate: true,
  includePageNumbers: true,
  includeFooter: true,
  footerText: 'Generated with Open Math Gen'
})

const isPrinting = ref(false)
const isGeneratingPDF = ref(false)
const zoomLevel = ref(100)

// Computed properties for dynamic styling
const paperDimensions = computed(() => {
  const sizes = {
    letter: { width: '8.5in', height: '11in' },
    a4: { width: '210mm', height: '297mm' },
    legal: { width: '8.5in', height: '14in' }
  }
  return sizes[printSettings.value.paperSize]
})

const marginSizes = computed(() => {
  const margins = {
    narrow: '0.5in',
    normal: '1in',
    wide: '1.5in'
  }
  return margins[printSettings.value.margins]
})

// Reference to PrintPreview component
const printPreviewRef = ref(null)

// Zoom control methods
const setZoom = (percentage) => {
  zoomLevel.value = percentage
  // Trigger page break detection after zoom change
  setTimeout(() => {
    if (printPreviewRef.value && printPreviewRef.value.detectPageBreaks) {
      printPreviewRef.value.detectPageBreaks()
    }
  }, 100)
}

const previewStyle = computed(() => {
  return {
    transform: `scale(${zoomLevel.value / 100})`,
    transformOrigin: 'top center'
  }
})

// Modal control methods
const closeModal = () => {
  emit('close')
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
    
    // Add print class to enable print styles
    document.documentElement.classList.add('printing')
    
    // Print the page
    window.print()
    
    // Restore original styles after printing
    setTimeout(() => {
      body.style.cssText = originalStyle
      allElements.forEach(el => {
        el.style.visibility = ''
      })
      document.documentElement.classList.remove('printing')
      
      isPrinting.value = false
      emit('close')
    }, 500)

  } catch (error) {
    console.error('Print error:', error)
    isPrinting.value = false
    alert('Print failed. Please try again.')
  }
}

const handleSavePDF = async () => {
  isGeneratingPDF.value = true
  
  try {
    // For PDF saving, we'll use the same print function
    // The user can choose "Save as PDF" in the print dialog
    window.print()
    
    setTimeout(() => {
      isGeneratingPDF.value = false
    }, 1500)
    
  } catch (error) {
    console.error('PDF generation error:', error)
    isGeneratingPDF.value = false
  }
}

// Keyboard shortcuts
const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    closeModal()
  } else if (event.ctrlKey && event.key === 'p') {
    event.preventDefault()
    handlePrint()
  }
}

// Watch for modal open/close to manage body scroll
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeydown)
  } else {
    document.body.style.overflow = ''
    document.removeEventListener('keydown', handleKeydown)
  }
})

// Cleanup on unmount
const cleanup = () => {
  document.body.style.overflow = ''
  document.removeEventListener('keydown', handleKeydown)
}

// Watch for component unmount
watch(() => props.isOpen, (isOpen) => {
  if (!isOpen) {
    cleanup()
  }
})
</script>

<template>
  <!-- Modal Backdrop -->
  <transition
    enter-active-class="transition-opacity duration-300"
    leave-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 bg-gray-900/80 backdrop-blur-sm no-print"
      @click="closeModal"
    >
      <!-- Modal Container -->
      <transition
        enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-300 ease-in"
        enter-from-class="scale-95 opacity-0"
        leave-to-class="scale-95 opacity-0"
      >
        <div
          v-if="isOpen"
          class="fixed inset-4 bg-white shadow-2xl rounded-2xl overflow-hidden no-print"
          @click.stop
        >
          <!-- Modal Header -->
          <div class="flex items-center justify-between border-b border-gray-300 px-6 py-4">
            <div class="flex items-center space-x-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                <svg class="h-5 w-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
                </svg>
              </div>
              <div>
                <h2 class="text-xl font-semibold text-gray-900">Print Worksheet</h2>
                <p class="text-sm text-gray-700">{{ worksheetTitle }}</p>
              </div>
            </div>
            
            <div class="flex items-center space-x-3">
              <!-- Keyboard Shortcut Hint -->
              <div class="hidden md:flex items-center space-x-2 text-xs text-gray-500">
                <kbd class="px-2 py-1 bg-gray-200 rounded font-mono">Ctrl+P</kbd>
                <span>to print</span>
                <kbd class="px-2 py-1 bg-gray-200 rounded font-mono">Esc</kbd>
                <span>to close</span>
              </div>
              
              <!-- Close Button -->
              <button
                @click="closeModal"
                class="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-200 hover:text-gray-700 transition-colors"
              >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Modal Body -->
          <div class="flex h-[calc(100vh-160px)] overflow-hidden">
            
            <!-- Settings Panel -->
            <div class="w-80 flex-shrink-0 border-r border-gray-300 bg-gray-200">
              <div class="h-full overflow-y-auto p-6">
                <PrintSettings
                  v-model:settings="printSettings"
                  :problem-count="generatedProblems.length"
                />
              </div>
            </div>

            <!-- Preview Panel -->
            <div class="flex-1 flex flex-col bg-gray-200">
              <!-- Preview Header -->
              <div class="border-b border-gray-300 bg-white px-6 py-4">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4">
                    <h3 class="text-lg font-medium text-gray-900">Print Preview</h3>
                    <div class="flex items-center space-x-2 text-sm text-gray-700">
                      <span>{{ printSettings.paperSize.toUpperCase() }}</span>
                      <span>•</span>
                      <span>{{ generatedProblems.length }} problems</span>
                    </div>
                  </div>
                  
                  <div class="flex items-center space-x-2">
                    <!-- Zoom Controls -->
                    <div class="flex items-center space-x-1 rounded-lg border border-gray-300 bg-white">
                      <button 
                        @click="setZoom(50)" 
                        :class="zoomLevel === 50 ? 'bg-orange-100 text-orange-600 font-medium' : 'text-gray-700 hover:bg-gray-200'"
                        class="px-3 py-1 text-sm transition-colors"
                      >
                        50%
                      </button>
                      <button 
                        @click="setZoom(75)" 
                        :class="zoomLevel === 75 ? 'bg-orange-100 text-orange-600 font-medium' : 'text-gray-700 hover:bg-gray-200'"
                        class="px-3 py-1 text-sm transition-colors"
                      >
                        75%
                      </button>
                      <button 
                        @click="setZoom(100)" 
                        :class="zoomLevel === 100 ? 'bg-orange-100 text-orange-600 font-medium' : 'text-gray-700 hover:bg-gray-200'"
                        class="px-3 py-1 text-sm transition-colors"
                      >
                        100%
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Preview Content -->
              <div class="flex-1 overflow-auto p-6">
                <div class="flex justify-center">
                  <div :style="previewStyle" class="transition-transform duration-200">
                    <PrintPreview
                      ref="printPreviewRef"
                      :problems="generatedProblems"
                      :worksheet-title="worksheetTitle"
                      :settings="printSettings"
                      :show-answers="showAnswers || printSettings.includeAnswerKey"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="border-t border-gray-300 bg-white px-6 py-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4 text-sm text-gray-700">
                <div class="flex items-center space-x-2">
                  <div class="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>Ready to print</span>
                </div>
                <span>•</span>
                <span>{{ generatedProblems.length }} problems configured</span>
              </div>
              
              <div class="flex items-center space-x-3">
                <button
                  @click="closeModal"
                  class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Cancel
                </button>
                
                <button
                  @click="handleSavePDF"
                  :disabled="isGeneratingPDF"
                  class="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ isGeneratingPDF ? 'Generating...' : 'Save as PDF' }}
                </button>
                
                <button
                  @click="handlePrint"
                  :disabled="isPrinting"
                  class="px-6 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <svg v-if="!isPrinting" class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
                  </svg>
                  <div v-else class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  <span>{{ isPrinting ? 'Printing...' : 'Print' }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style scoped>
/* Custom scrollbar for settings panel */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f9fafb;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Keyboard shortcut styling */
kbd {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}
</style>