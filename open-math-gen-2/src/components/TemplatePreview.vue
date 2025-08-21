<script setup>
import { ref, computed } from 'vue'
import { GENERATOR_CATEGORIES } from '../generators/index.js'
import ElementaryGuidance from './ElementaryGuidance.vue'
import MiddleSchoolGuidance from './MiddleSchoolGuidance.vue'

const props = defineProps({
  template: {
    type: Object,
    default: null
  },
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'use-template'])

const closeModal = () => {
  emit('close')
}

const useTemplate = () => {
  emit('use-template', props.template)
  closeModal()
}

const exportTemplate = () => {
  const templateData = JSON.stringify(props.template, null, 2)
  const blob = new Blob([templateData], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${props.template.name.replace(/[^a-zA-Z0-9]/g, '_')}_template.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

const shareTemplate = async () => {
  const shareData = {
    title: props.template.name,
    text: `Check out this math worksheet template: ${props.template.description}`,
    url: window.location.href
  }
  
  if (navigator.share) {
    try {
      await navigator.share(shareData)
    } catch (err) {
      // Fallback to copying URL
      copyTemplateLink()
    }
  } else {
    copyTemplateLink()
  }
}

const copyTemplateLink = () => {
  const templateUrl = `${window.location.origin}${window.location.pathname}?template=${props.template.id}`
  navigator.clipboard.writeText(templateUrl).then(() => {
    // Could show a toast notification here
    console.log('Template URL copied to clipboard')
  })
}

const getSubjectLabel = (subjectKey) => {
  if (subjectKey === 'mixed') return 'Mixed Topics'
  const category = GENERATOR_CATEGORIES[subjectKey]
  return category ? category.name : subjectKey
}

const getGeneratorLabel = (generatorId, subject) => {
  // First try the template's subject category
  const category = GENERATOR_CATEGORIES[subject]
  if (category && category.generators[generatorId]) {
    return category.generators[generatorId].name
  }
  
  // Search all categories for the generator
  for (const [catId, cat] of Object.entries(GENERATOR_CATEGORIES)) {
    if (cat.generators[generatorId]) {
      return cat.generators[generatorId].name
    }
  }
  
  return generatorId.replace('-', ' ').replace(/^\w/, c => c.toUpperCase())
}

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'beginner': return 'bg-green-500'
    case 'standard': return 'bg-blue-500'
    case 'advanced': return 'bg-purple-500'
    default: return 'bg-gray-500'
  }
}

const formatParameters = (params) => {
  const formatted = []
  
  Object.entries(params).forEach(([key, value]) => {
    if (key === 'problemCount') return
    
    const formatKey = (k) => k.replace(/([A-Z])/g, ' $1').toLowerCase().replace(/^./, s => s.toUpperCase())
    const formatValue = (v) => {
      if (typeof v === 'boolean') return v ? 'Yes' : 'No'
      if (typeof v === 'string') return v.replace('-', ' ').replace(/^\w/, c => c.toUpperCase())
      if (Array.isArray(v)) return v.join(', ')
      return v
    }
    
    if (key.includes('min') || key.includes('max')) {
      const baseKey = key.replace(/(Min|Max)$/, '')
      const minKey = baseKey + 'Min'
      const maxKey = baseKey + 'Max'
      
      if (params[minKey] !== undefined && params[maxKey] !== undefined && key.includes('Max')) {
        formatted.push(`${formatKey(baseKey)}: ${params[minKey]}-${params[maxKey]}`)
      }
    } else if (!key.includes('Min') && !key.includes('Max')) {
      if (typeof value === 'boolean' && value) {
        formatted.push(formatKey(key))
      } else if (typeof value !== 'boolean') {
        formatted.push(`${formatKey(key)}: ${formatValue(value)}`)
      }
    }
  })
  
  return formatted.slice(0, 6)
}

const totalProblems = computed(() => {
  if (!props.template) return 0
  
  return Object.values(props.template.parameters).reduce((total, params) => {
    return total + (params.problemCount || 0)
  }, 0)
})

const isElementaryTemplate = computed(() => {
  if (!props.template) return false
  const grade = props.template.gradeLevel
  return ['K', '1', '2', '3', '4', '5'].some(g => grade.includes(g))
})

const isMiddleSchoolTemplate = computed(() => {
  if (!props.template) return false
  const grade = props.template.gradeLevel
  return ['6', '7', '8'].some(g => grade.includes(g)) || 
         props.template.category?.includes('middle') ||
         props.template.subject === 'pre-algebra'
})
</script>

<template>
  <!-- Modal Backdrop -->
  <div 
    v-if="isOpen && template" 
    class="fixed inset-0 z-50 overflow-y-auto"
    @click="closeModal"
  >
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background overlay -->
      <div class="fixed inset-0 transition-opacity bg-slate-900/75 backdrop-blur-sm"></div>

      <!-- Modal content -->
      <div 
        class="relative inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-slate-800 shadow-xl rounded-2xl border border-slate-700"
        @click.stop
      >
        <!-- Header -->
        <div class="flex items-start justify-between mb-6">
          <div class="flex-1">
            <h3 class="text-2xl font-bold text-white mb-2">{{ template.name }}</h3>
            <p class="text-slate-300 text-sm">{{ template.description }}</p>
          </div>
          <button 
            @click="closeModal"
            class="ml-4 p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-700"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Template Info Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <!-- Basic Info -->
          <div class="space-y-4">
            <div>
              <h4 class="text-lg font-semibold text-white mb-3">Template Details</h4>
              <div class="space-y-3">
                <div class="flex items-center justify-between py-2 border-b border-slate-700">
                  <span class="text-slate-400">Grade Level</span>
                  <span class="text-white font-medium">{{ template.gradeLevel }}</span>
                </div>
                <div class="flex items-center justify-between py-2 border-b border-slate-700">
                  <span class="text-slate-400">Subject</span>
                  <span class="text-white font-medium">{{ getSubjectLabel(template.subject) }}</span>
                </div>
                <div class="flex items-center justify-between py-2 border-b border-slate-700">
                  <span class="text-slate-400">Purpose</span>
                  <span class="text-orange-400 font-medium capitalize">{{ template.purpose }}</span>
                </div>
                <div class="flex items-center justify-between py-2 border-b border-slate-700">
                  <span class="text-slate-400">Difficulty</span>
                  <span :class="getDifficultyColor(template.difficulty)" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white capitalize">
                    {{ template.difficulty }}
                  </span>
                </div>
                <div class="flex items-center justify-between py-2 border-b border-slate-700">
                  <span class="text-slate-400">Estimated Time</span>
                  <span class="text-white font-medium">{{ template.estimatedTime }}</span>
                </div>
                <div class="flex items-center justify-between py-2">
                  <span class="text-slate-400">Total Problems</span>
                  <span class="text-orange-400 font-bold">{{ totalProblems }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Generators & Parameters -->
          <div>
            <h4 class="text-lg font-semibold text-white mb-3">Problem Types & Settings</h4>
            <div class="space-y-3">
              <div 
                v-for="(generatorId, index) in template.generators" 
                :key="generatorId"
                class="bg-slate-700/50 rounded-lg p-3 border border-slate-600"
              >
                <div class="flex items-center justify-between mb-2">
                  <h5 class="font-medium text-white">{{ getGeneratorLabel(generatorId, template.subject) }}</h5>
                  <span class="text-xs bg-orange-500 text-white px-2 py-1 rounded-full">
                    {{ template.parameters[generatorId]?.problemCount || 0 }} problems
                  </span>
                </div>
                
                <!-- Parameters -->
                <div class="text-xs text-slate-300 space-y-1">
                  <div 
                    v-for="param in formatParameters(template.parameters[generatorId] || {})"
                    :key="param"
                    class="bg-slate-800/50 px-2 py-1 rounded text-xs"
                  >
                    {{ param }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Preview Section -->
        <div class="mb-6">
          <h4 class="text-lg font-semibold text-white mb-3">Worksheet Preview</h4>
          <div class="bg-slate-700/30 rounded-lg p-6 border border-slate-600">
            <div class="bg-white rounded-lg p-6 text-black min-h-96">
              <!-- Mock worksheet preview -->
              <div class="text-center mb-6">
                <h1 class="text-2xl font-bold mb-2">{{ template.name }}</h1>
                <div class="text-sm text-gray-600 space-x-4">
                  <span>Name: _________________</span>
                  <span>Date: _________________</span>
                </div>
              </div>
              
              <div class="space-y-4">
                <div v-for="(generatorId, index) in template.generators.slice(0, 2)" :key="generatorId">
                  <h3 class="text-lg font-semibold mb-2">{{ getGeneratorLabel(generatorId, template.subject) }}</h3>
                  <div class="grid grid-cols-2 gap-4">
                    <div v-for="i in Math.min(4, template.parameters[generatorId]?.problemCount || 4)" :key="i" class="text-sm">
                      {{ i }}. _________________
                    </div>
                  </div>
                </div>
                
                <div v-if="template.generators.length > 2" class="text-center text-gray-500 italic">
                  ... and {{ template.generators.length - 2 }} more problem type(s)
                </div>
              </div>
            </div>
            <p class="text-xs text-slate-400 text-center mt-3">
              This is a simplified preview. The actual worksheet will have complete problems and formatting.
            </p>
          </div>
        </div>

        <!-- Elementary Teaching Guidance -->
        <div v-if="isElementaryTemplate" class="mb-6">
          <ElementaryGuidance :template="template" />
        </div>

        <!-- Middle School Teaching Guidance -->
        <div v-if="isMiddleSchoolTemplate && !isElementaryTemplate" class="mb-6">
          <MiddleSchoolGuidance :template="template" />
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-between">
          <div class="flex space-x-3">
            <button 
              @click="exportTemplate"
              class="px-4 py-2 border border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 rounded-lg transition-colors flex items-center space-x-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <span>Export</span>
            </button>
            <button 
              @click="shareTemplate"
              class="px-4 py-2 border border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 rounded-lg transition-colors flex items-center space-x-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
              </svg>
              <span>Share</span>
            </button>
          </div>
          
          <div class="flex space-x-3">
            <button 
              @click="closeModal"
              class="px-6 py-2 border border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 rounded-lg transition-colors"
            >
              Close
            </button>
            <button 
              @click="useTemplate"
              class="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors shadow-lg hover:shadow-orange-500/25"
            >
              Use This Template
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>