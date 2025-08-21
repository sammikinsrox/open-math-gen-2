<script setup>
import { ref, computed, onMounted } from 'vue'
import { GENERATOR_CATEGORIES } from '../generators/index.js'
import TemplatePreview from './TemplatePreview.vue'
import { TEMPLATE_CONFIGURATIONS, TEMPLATE_CATEGORIES } from '../data/templateConfigurations.js'

const emit = defineEmits(['navigate'])

const searchQuery = ref('')
const selectedGrade = ref('all')
const selectedSubject = ref('all')
const selectedPurpose = ref('all')
const selectedCategory = ref('all')
const selectedDifficulty = ref('all')
const selectedSort = ref('name')

// Preview modal state
const previewModalOpen = ref(false)
const selectedTemplate = ref(null)

// Favorites functionality
const favorites = ref(JSON.parse(localStorage.getItem('templateFavorites') || '[]'))

const toggleFavorite = (templateId) => {
  const index = favorites.value.indexOf(templateId)
  if (index > -1) {
    favorites.value.splice(index, 1)
  } else {
    favorites.value.push(templateId)
  }
  localStorage.setItem('templateFavorites', JSON.stringify(favorites.value))
}

const isFavorite = (templateId) => {
  return favorites.value.includes(templateId)
}

// Analytics tracking
const trackTemplateView = (templateId) => {
  const views = JSON.parse(localStorage.getItem('templateViews') || '{}')
  views[templateId] = (views[templateId] || 0) + 1
  localStorage.setItem('templateViews', JSON.stringify(views))
}

const trackTemplateUsage = (templateId) => {
  const usage = JSON.parse(localStorage.getItem('templateUsage') || '{}')
  usage[templateId] = (usage[templateId] || 0) + 1
  localStorage.setItem('templateUsage', JSON.stringify(usage))
  
  // Also track last used timestamp
  const lastUsed = JSON.parse(localStorage.getItem('templateLastUsed') || '{}')
  lastUsed[templateId] = new Date().toISOString()
  localStorage.setItem('templateLastUsed', JSON.stringify(lastUsed))
}

const getTemplatePopularity = (templateId) => {
  const usage = JSON.parse(localStorage.getItem('templateUsage') || '{}')
  return usage[templateId] || 0
}

// Use the comprehensive template configurations
const templates = ref(TEMPLATE_CONFIGURATIONS)

const gradeOptions = [
  { value: 'all', label: 'All Grades' },
  { value: 'K', label: 'Kindergarten' },
  { value: '1', label: '1st Grade' },
  { value: '2', label: '2nd Grade' },
  { value: '3', label: '3rd Grade' },
  { value: '4', label: '4th Grade' },
  { value: '5', label: '5th Grade' },
  { value: '6', label: '6th Grade' },
  { value: '7', label: '7th Grade' },
  { value: '8', label: '8th Grade' },
  { value: '9', label: '9th Grade' },
  { value: '10', label: '10th Grade' },
  { value: '11', label: '11th Grade' },
  { value: '12', label: '12th Grade' }
]

const subjectOptions = [
  { value: 'all', label: 'All Subjects' },
  { value: 'basic-operations', label: 'Basic Operations' },
  { value: 'numbers-place-value', label: 'Numbers & Place Value' },
  { value: 'fractions-decimals', label: 'Fractions & Decimals' },
  { value: 'measurement-units', label: 'Measurement & Units' },
  { value: 'money-finance', label: 'Money & Finance' },
  { value: 'geometry-basic', label: 'Basic Geometry' },
  { value: 'geometry-advanced', label: 'Advanced Geometry' },
  { value: 'pre-algebra', label: 'Pre-Algebra' },
  { value: 'algebra', label: 'Algebra' },
  { value: 'mixed', label: 'Mixed Topics' }
]

const purposeOptions = [
  { value: 'all', label: 'All Purposes' },
  { value: 'practice', label: 'Practice Worksheets' },
  { value: 'assessment', label: 'Tests & Assessments' },
  { value: 'review', label: 'Review Worksheets' },
  { value: 'diagnostic', label: 'Diagnostic Tests' }
]

const categoryOptions = [
  { value: 'all', label: 'All Categories' },
  { value: 'elementary-practice', label: 'Elementary Practice' },
  { value: 'elementary-assessment', label: 'Elementary Assessment' },
  { value: 'middle-practice', label: 'Middle School Practice' },
  { value: 'middle-assessment', label: 'Middle School Assessment' },
  { value: 'high-practice', label: 'High School Practice' },
  { value: 'high-assessment', label: 'High School Assessment' },
  { value: 'special-purpose', label: 'Special Purpose' }
]

const difficultyOptions = [
  { value: 'all', label: 'All Difficulties' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'standard', label: 'Standard' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'mixed', label: 'Mixed' }
]

const sortOptions = [
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'grade', label: 'Grade Level' },
  { value: 'difficulty', label: 'Difficulty' },
  { value: 'time', label: 'Estimated Time' },
  { value: 'problems', label: 'Problem Count' },
  { value: 'newest', label: 'Newest First' },
  { value: 'favorites', label: 'Favorites First' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'recent', label: 'Recently Used' }
]

const filteredTemplates = computed(() => {
  let filtered = templates.value.filter(template => {
    // Search filtering - check name, description, and tags
    const matchesSearch = !searchQuery.value || 
      template.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (template.tags && template.tags.some(tag => tag.toLowerCase().includes(searchQuery.value.toLowerCase())))
    
    // Grade filtering - more flexible matching
    const matchesGrade = selectedGrade.value === 'all' || 
      template.gradeLevel === selectedGrade.value ||
      template.gradeLevel.includes(selectedGrade.value) ||
      (template.gradeLevel.includes('-') && template.gradeLevel.split('-').includes(selectedGrade.value))
    
    const matchesSubject = selectedSubject.value === 'all' || template.subject === selectedSubject.value
    const matchesPurpose = selectedPurpose.value === 'all' || template.purpose === selectedPurpose.value
    const matchesCategory = selectedCategory.value === 'all' || template.category === selectedCategory.value
    const matchesDifficulty = selectedDifficulty.value === 'all' || template.difficulty === selectedDifficulty.value
    
    return matchesSearch && matchesGrade && matchesSubject && matchesPurpose && matchesCategory && matchesDifficulty
  })

  // Sort the filtered results
  return filtered.sort((a, b) => {
    switch (selectedSort.value) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'grade':
        const gradeOrder = ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
        const aGrade = a.gradeLevel.split('-')[0] || a.gradeLevel
        const bGrade = b.gradeLevel.split('-')[0] || b.gradeLevel
        return gradeOrder.indexOf(aGrade) - gradeOrder.indexOf(bGrade)
      case 'difficulty':
        const diffOrder = ['beginner', 'standard', 'advanced', 'mixed']
        return diffOrder.indexOf(a.difficulty) - diffOrder.indexOf(b.difficulty)
      case 'time':
        const aTime = parseInt(a.estimatedTime) || 0
        const bTime = parseInt(b.estimatedTime) || 0
        return aTime - bTime
      case 'problems':
        const aProblems = parseInt(a.problemCount) || 0
        const bProblems = parseInt(b.problemCount) || 0
        return aProblems - bProblems
      case 'newest':
        return b.id.localeCompare(a.id) // Reverse order for newest first
      case 'favorites':
        const aFav = isFavorite(a.id) ? 1 : 0
        const bFav = isFavorite(b.id) ? 1 : 0
        return bFav - aFav // Favorites first
      case 'popular':
        return getTemplatePopularity(b.id) - getTemplatePopularity(a.id)
      case 'recent':
        const lastUsed = JSON.parse(localStorage.getItem('templateLastUsed') || '{}')
        const aLastUsed = lastUsed[a.id] ? new Date(lastUsed[a.id]).getTime() : 0
        const bLastUsed = lastUsed[b.id] ? new Date(lastUsed[b.id]).getTime() : 0
        return bLastUsed - aLastUsed
      default:
        return 0
    }
  })
})

const useTemplate = (template) => {
  // Track template usage
  trackTemplateUsage(template.id)
  // Navigate to worksheet builder with template data
  console.log('Using template:', template)
  emit('navigate', 'worksheet-builder', template)
}

const previewTemplate = (template) => {
  // Track template view
  trackTemplateView(template.id)
  selectedTemplate.value = template
  previewModalOpen.value = true
}

const closePreview = () => {
  previewModalOpen.value = false
  selectedTemplate.value = null
}

const useTemplateFromPreview = (template) => {
  useTemplate(template)
  closePreview()
}

const getSubjectLabel = (subjectKey) => {
  if (subjectKey === 'mixed') return 'Mixed Topics'
  const category = GENERATOR_CATEGORIES[subjectKey]
  return category ? category.name : subjectKey
}

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'beginner': return 'bg-green-500'
    case 'standard': return 'bg-blue-500'
    case 'advanced': return 'bg-purple-500'
    default: return 'bg-gray-500'
  }
}

// Template recommendations based on usage patterns
const getRecommendedTemplates = computed(() => {
  const usage = JSON.parse(localStorage.getItem('templateUsage') || '{}')
  const favorites = JSON.parse(localStorage.getItem('templateFavorites') || '[]')
  
  // Get subjects and grades from frequently used templates
  const usedSubjects = new Set()
  const usedGrades = new Set()
  
  Object.keys(usage).forEach(templateId => {
    const template = templates.value.find(t => t.id === templateId)
    if (template) {
      usedSubjects.add(template.subject)
      if (template.gradeLevel.includes('-')) {
        template.gradeLevel.split('-').forEach(g => usedGrades.add(g))
      } else {
        usedGrades.add(template.gradeLevel)
      }
    }
  })
  
  // Find similar templates not yet used
  return templates.value
    .filter(template => 
      !usage[template.id] && 
      !favorites.includes(template.id) &&
      (usedSubjects.has(template.subject) || 
       Array.from(usedGrades).some(grade => template.gradeLevel.includes(grade)))
    )
    .slice(0, 6)
})

const totalTemplatesUsed = computed(() => {
  const usage = JSON.parse(localStorage.getItem('templateUsage') || '{}')
  return Object.keys(usage).length
})

// Import functionality
const fileInput = ref(null)
const showImportModal = ref(false)

const triggerImport = () => {
  fileInput.value?.click()
}

const importTemplate = (event) => {
  const file = event.target.files?.[0]
  if (!file) return
  
  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const templateData = JSON.parse(e.target.result)
      
      // Basic validation
      if (!templateData.id || !templateData.name || !templateData.generators) {
        throw new Error('Invalid template format')
      }
      
      // Add to custom templates (could be stored separately from the main configurations)
      const customTemplates = JSON.parse(localStorage.getItem('customTemplates') || '[]')
      
      // Ensure unique ID
      templateData.id = `custom-${Date.now()}-${templateData.id}`
      templateData.category = templateData.category || 'special-purpose'
      
      customTemplates.push(templateData)
      localStorage.setItem('customTemplates', JSON.stringify(customTemplates))
      
      // Add to main templates array
      templates.value.push(templateData)
      
      console.log('Template imported successfully:', templateData.name)
    } catch (error) {
      console.error('Error importing template:', error)
      alert('Error importing template. Please check the file format.')
    }
  }
  reader.readAsText(file)
  
  // Reset input
  event.target.value = ''
}

// Load custom templates on mount
onMounted(() => {
  const customTemplates = JSON.parse(localStorage.getItem('customTemplates') || '[]')
  templates.value.push(...customTemplates)
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-16">
    <!-- Header Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">
          Worksheet <span class="text-orange-400">Templates</span>
        </h1>
        <p class="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
          Ready-to-use worksheet templates for every grade level and subject. 
          Professionally designed for practice, assessment, and review.
        </p>
      </div>

      <!-- Search and Filters -->
      <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 mb-8">
        <!-- Search Bar -->
        <div class="mb-6">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search templates..." 
              class="block w-full pl-10 pr-3 py-3 border border-slate-600 rounded-lg bg-slate-700/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
          </div>
        </div>

        <!-- Filter Controls -->
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Grade Level</label>
            <select 
              v-model="selectedGrade"
              class="w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-700/50 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option v-for="option in gradeOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Subject</label>
            <select 
              v-model="selectedSubject"
              class="w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-700/50 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option v-for="option in subjectOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Purpose</label>
            <select 
              v-model="selectedPurpose"
              class="w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-700/50 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option v-for="option in purposeOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Category</label>
            <select 
              v-model="selectedCategory"
              class="w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-700/50 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option v-for="option in categoryOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Difficulty</label>
            <select 
              v-model="selectedDifficulty"
              class="w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-700/50 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option v-for="option in difficultyOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Sort By</label>
            <select 
              v-model="selectedSort"
              class="w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-700/50 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option v-for="option in sortOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Results Count & Stats -->
      <div class="mb-6 flex justify-between items-center">
        <p class="text-slate-300">
          Showing <span class="font-semibold text-white">{{ filteredTemplates.length }}</span> templates
        </p>
        <div class="flex items-center space-x-4">
          <div v-if="totalTemplatesUsed > 0" class="text-slate-400 text-sm">
            You've used {{ totalTemplatesUsed }} template{{ totalTemplatesUsed !== 1 ? 's' : '' }}
          </div>
          <button 
            @click="triggerImport"
            class="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
            </svg>
            <span>Import Template</span>
          </button>
          <input 
            ref="fileInput"
            type="file" 
            accept=".json"
            @change="importTemplate"
            class="hidden"
          />
        </div>
      </div>

      <!-- Recommendations -->
      <div v-if="getRecommendedTemplates.length > 0 && !searchQuery && selectedGrade === 'all' && selectedSubject === 'all'" class="mb-8">
        <div class="bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-2xl border border-orange-500/20 p-6">
          <h2 class="text-lg font-semibold text-white mb-4 flex items-center">
            <svg class="w-5 h-5 text-orange-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
            Recommended for You
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div 
              v-for="template in getRecommendedTemplates.slice(0, 3)" 
              :key="template.id"
              @click="previewTemplate(template)"
              class="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50 hover:border-orange-500/50 cursor-pointer transition-all duration-200 hover:transform hover:scale-105"
            >
              <h3 class="font-medium text-white text-sm mb-2">{{ template.name }}</h3>
              <p class="text-slate-400 text-xs mb-3">{{ template.description.slice(0, 80) }}...</p>
              <div class="flex items-center justify-between">
                <span class="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded">{{ template.gradeLevel }}</span>
                <button 
                  @click.stop="useTemplate(template)"
                  class="text-xs bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded transition-colors"
                >
                  Use
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Templates Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="template in filteredTemplates" 
          :key="template.id"
          class="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-105"
        >
          <!-- Template Thumbnail -->
          <div class="h-48 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
            <div class="text-6xl text-slate-400">📊</div>
          </div>

          <!-- Template Content -->
          <div class="p-6">
            <!-- Header -->
            <div class="flex items-start justify-between mb-3">
              <h3 class="text-lg font-semibold text-white leading-tight">{{ template.name }}</h3>
              <div class="flex items-center space-x-2 ml-2">
                <button 
                  @click="toggleFavorite(template.id)"
                  class="p-1 rounded-lg hover:bg-slate-700 transition-colors"
                  :class="isFavorite(template.id) ? 'text-yellow-400' : 'text-slate-400 hover:text-yellow-400'"
                >
                  <svg class="w-5 h-5" :fill="isFavorite(template.id) ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                  </svg>
                </button>
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-700 text-slate-300">
                  {{ template.gradeLevel }}
                </span>
              </div>
            </div>

            <!-- Description -->
            <p class="text-slate-300 text-sm mb-4 leading-relaxed">{{ template.description }}</p>

            <!-- Metadata -->
            <div class="space-y-2 mb-4">
              <div class="flex items-center text-xs text-slate-400">
                <span class="material-icons text-sm mr-1">subject</span>
                {{ getSubjectLabel(template.subject) }}
              </div>
              <div class="flex items-center text-xs text-slate-400">
                <span class="material-icons text-sm mr-1">quiz</span>
                {{ template.problemCount }}
              </div>
              <div class="flex items-center text-xs text-slate-400">
                <span class="material-icons text-sm mr-1">schedule</span>
                {{ template.estimatedTime }}
              </div>
            </div>

            <!-- Tags -->
            <div v-if="template.tags && template.tags.length > 0" class="mb-4">
              <div class="flex flex-wrap gap-1">
                <span 
                  v-for="tag in template.tags.slice(0, 3)" 
                  :key="tag"
                  class="inline-flex items-center px-2 py-1 rounded text-xs bg-slate-700/50 text-slate-300 border border-slate-600"
                >
                  {{ tag }}
                </span>
                <span v-if="template.tags.length > 3" class="text-xs text-slate-400">
                  +{{ template.tags.length - 3 }} more
                </span>
              </div>
            </div>

            <!-- Badges -->
            <div class="flex items-center space-x-2 mb-4">
              <span :class="getDifficultyColor(template.difficulty)" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white">
                {{ template.difficulty }}
              </span>
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-300">
                {{ template.purpose }}
              </span>
            </div>

            <!-- Action Buttons -->
            <div class="flex space-x-2">
              <button 
                @click="useTemplate(template)"
                class="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
              >
                Use Template
              </button>
              <button 
                @click="previewTemplate(template)"
                class="px-4 py-2 border border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 rounded-lg transition-colors text-sm"
              >
                Preview
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredTemplates.length === 0" class="text-center py-12">
        <div class="text-6xl text-slate-600 mb-4">🔍</div>
        <h3 class="text-xl font-semibold text-white mb-2">No templates found</h3>
        <p class="text-slate-400">Try adjusting your search criteria or filters</p>
      </div>
    </div>

    <!-- Template Preview Modal -->
    <TemplatePreview 
      :template="selectedTemplate"
      :is-open="previewModalOpen"
      @close="closePreview"
      @use-template="useTemplateFromPreview"
    />
  </div>
</template>