<script setup>
import { computed } from 'vue'
import WorksheetLayout from './WorksheetLayout.vue'

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

// Expose function for parent components to trigger re-detection (for compatibility)
defineExpose({
  detectPageBreaks: () => {
    // No-op since we're using the shared layout component
    console.log('Page break detection called - using CSS-only approach')
  }
})

// Since we're using the shared WorksheetLayout component, we just need to
// pass through the props and let the layout handle everything
</script>

<template>
  <div class="print-preview-container">
    <WorksheetLayout
      :problems="problems"
      :worksheet-title="worksheetTitle"
      :settings="settings"
      :show-answers="showAnswers"
      :include-answer-key="settings.includeAnswerKey"
      :answer-key-location="settings.answerKeyLocation"
      mode="print"
    />
  </div>
</template>

<style>
/* Print-specific styles */
@media print {
  body {
    background: white !important;
    color: black !important;
  }
  
  .print-preview-container {
    margin: 0;
    padding: 0;
  }
  
  /* Override any transform effects for print */
  * {
    transform: none !important;
  }
}

/* Screen preview styles */
@media screen {
  .print-preview-container {
    background: #f3f4f6;
    padding: 1rem;
    min-height: 100vh;
  }
}
</style>