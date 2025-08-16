<script setup>
import { ref, onMounted, watch } from 'vue'
import katex from 'katex'

const props = defineProps({
  expression: {
    type: String,
    required: true
  },
  displayMode: {
    type: Boolean,
    default: false
  }
})

const mathRef = ref(null)

const renderMath = () => {
  if (mathRef.value && props.expression) {
    try {
      katex.render(props.expression, mathRef.value, {
        displayMode: props.displayMode,
        throwOnError: false,
        trust: true,
        maxSize: 20, // Limit font size to prevent excessive scaling
        maxExpand: 1000 // Limit macro expansion
      })
    } catch (error) {
      console.warn('KaTeX rendering error:', error)
      mathRef.value.textContent = props.expression
    }
  }
}

onMounted(() => {
  renderMath()
})

watch(() => props.expression, () => {
  renderMath()
})
</script>

<template>
  <span ref="mathRef" class="math-expression"></span>
</template>

<style scoped>
.math-expression {
  line-height: 1.4;
  display: inline-block;
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
}

/* Ensure KaTeX doesn't overflow */
.math-expression :deep(.katex) {
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
}

.math-expression :deep(.katex-display) {
  margin: 0.25em 0;
  overflow-x: auto;
  overflow-y: hidden;
}
</style>