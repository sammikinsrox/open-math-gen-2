<script setup>
import { ref, onMounted, watch } from 'vue'
import { DiagramRenderer } from '../geometry-renderer/DiagramRenderer.js'

const props = defineProps({
  diagramConfig: {
    type: Object,
    required: true
  },
  className: {
    type: String,
    default: 'geometry-diagram'
  }
})

const diagramContainer = ref(null)
const svgContent = ref('')
const isLoading = ref(true)
const hasError = ref(false)

const renderer = new DiagramRenderer()

const renderDiagram = async () => {
  if (!props.diagramConfig || !diagramContainer.value) return
  
  isLoading.value = true
  hasError.value = false
  
  try {
    // Small delay to ensure container is ready
    await new Promise(resolve => setTimeout(resolve, 10))
    
    const svg = renderer.renderDiagram(props.diagramConfig, diagramContainer.value)
    svgContent.value = svg
    
    // Insert the SVG into the container
    if (diagramContainer.value) {
      diagramContainer.value.innerHTML = svg
      
      // Apply beautiful styling to the SVG
      const svgElement = diagramContainer.value.querySelector('svg')
      if (svgElement) {
        svgElement.style.maxWidth = '100%'
        svgElement.style.height = 'auto'
        svgElement.style.borderRadius = '8px'
        svgElement.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        svgElement.style.background = 'white'
        
        // Add CSS classes for styling
        svgElement.classList.add('geometry-svg')
        
        // Apply theme-specific enhancements
        applyThemeEnhancements(svgElement, props.diagramConfig.config?.theme || 'educational')
      }
    }
  } catch (error) {
    console.error('Error rendering geometry diagram:', error)
    hasError.value = true
    
    // Show error state
    if (diagramContainer.value) {
      diagramContainer.value.innerHTML = createErrorHTML()
    }
  } finally {
    isLoading.value = false
  }
}

const applyThemeEnhancements = (svgElement, theme) => {
  // Add theme-specific CSS classes and enhancements
  svgElement.classList.add(`theme-${theme}`)
  
  // Add accessibility attributes
  svgElement.setAttribute('role', 'img')
  svgElement.setAttribute('aria-label', `Geometry diagram showing ${props.diagramConfig.shape || 'geometric figure'}`)
}

const createErrorHTML = () => {
  const width = props.diagramConfig.config?.width || 300
  const height = props.diagramConfig.config?.height || 200
  
  return `
    <div class="geometry-error" style="
      width: ${width}px; 
      height: ${height}px; 
      display: flex; 
      align-items: center; 
      justify-content: center;
      background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
      border: 2px dashed #d1d5db;
      border-radius: 8px;
      color: #6b7280;
      font-family: Inter, system-ui, sans-serif;
      font-size: 14px;
      text-align: center;
    ">
      <div>
        <div style="font-size: 24px; margin-bottom: 8px;">⚠️</div>
        <div>Diagram Error</div>
        <div style="font-size: 12px; opacity: 0.7;">Unable to render diagram</div>
      </div>
    </div>
  `
}

const createLoadingHTML = () => {
  const width = props.diagramConfig.config?.width || 300
  const height = props.diagramConfig.config?.height || 200
  
  return `
    <div class="geometry-loading" style="
      width: ${width}px; 
      height: ${height}px; 
      display: flex; 
      align-items: center; 
      justify-content: center;
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      color: #64748b;
      font-family: Inter, system-ui, sans-serif;
      font-size: 14px;
    ">
      <div style="text-align: center;">
        <div class="loading-spinner" style="
          width: 24px; 
          height: 24px; 
          border: 2px solid #e2e8f0; 
          border-top: 2px solid #3b82f6; 
          border-radius: 50%; 
          animation: spin 1s linear infinite;
          margin: 0 auto 8px;
        "></div>
        <div>Rendering diagram...</div>
      </div>
    </div>
  `
}

// Watch for changes in diagram config
watch(() => props.diagramConfig, renderDiagram, { deep: true })

// Render when component mounts
onMounted(() => {
  if (diagramContainer.value) {
    diagramContainer.value.innerHTML = createLoadingHTML()
  }
  renderDiagram()
})
</script>

<template>
  <div :class="className">
    <div 
      ref="diagramContainer" 
      class="diagram-container"
      :style="{
        minHeight: (diagramConfig.config?.height || 200) + 'px',
        minWidth: (diagramConfig.config?.width || 300) + 'px'
      }"
    ></div>
  </div>
</template>

<style scoped>
.geometry-diagram {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1.5rem 0;
  padding: 1rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.diagram-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Global styles for geometry SVGs */
:deep(.geometry-svg) {
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

:deep(.geometry-svg.theme-educational) {
  border: 1px solid #e5e7eb;
}

:deep(.geometry-svg.theme-blueprint) {
  border: 1px solid #3b82f6;
  filter: drop-shadow(0 0 4px rgba(59, 130, 246, 0.3));
}

:deep(.geometry-svg.theme-minimal) {
  border: 1px solid #f3f4f6;
}

:deep(.geometry-svg.theme-colorful) {
  border: 2px solid #f59e0b;
  filter: drop-shadow(0 2px 4px rgba(245, 158, 11, 0.2));
}

/* Loading animation */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Print styles */
@media print {
  .geometry-diagram {
    background: white !important;
    border: 1px solid #000 !important;
    box-shadow: none !important;
    page-break-inside: avoid;
  }
  
  :deep(.geometry-svg) {
    filter: none !important;
    border: 1px solid #000 !important;
  }
}
</style>