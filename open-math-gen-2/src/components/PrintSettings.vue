<script setup>
import { computed } from 'vue'

const props = defineProps({
  settings: {
    type: Object,
    required: true
  },
  problemCount: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['update:settings'])

const updateSetting = (key, value) => {
  emit('update:settings', { ...props.settings, [key]: value })
}

// Computed for estimated pages
const estimatedPages = computed(() => {
  const problemsPerPage = props.settings.problemsPerPage === 'auto' 
    ? (props.settings.paperSize === 'legal' ? 20 : 15)
    : parseInt(props.settings.problemsPerPage)
  
  const worksheetPages = Math.ceil(props.problemCount / problemsPerPage)
  const answerKeyPages = props.settings.includeAnswerKey && props.settings.answerKeyLocation === 'separate' 
    ? Math.ceil(props.problemCount / 36) // 36 answers per page
    : 0
  
  return worksheetPages + answerKeyPages
})

// Settings groups
const paperSizeOptions = [
  { value: 'letter', label: 'Letter (8.5" × 11")', icon: 'description' },
  { value: 'a4', label: 'A4 (210mm × 297mm)', icon: 'description' },
  { value: 'legal', label: 'Legal (8.5" × 14")', icon: 'description' }
]


const marginOptions = [
  { value: 'narrow', label: 'Narrow (0.5")', description: 'More content per page' },
  { value: 'normal', label: 'Normal (1")', description: 'Balanced layout' },
  { value: 'wide', label: 'Wide (1.5")', description: 'Extra white space' }
]

const fontSizeOptions = [
  { value: 'small', label: 'Small', description: 'More problems per page' },
  { value: 'normal', label: 'Normal', description: 'Standard size' },
  { value: 'large', label: 'Large', description: 'Easier to read' }
]

const problemsPerPageOptions = [
  { value: 'auto', label: 'Auto', description: 'Optimal spacing' },
  { value: '5', label: '5 problems', description: 'Lots of work space' },
  { value: '10', label: '10 problems', description: 'Standard amount' },
  { value: '15', label: '15 problems', description: 'Compact layout' },
  { value: '20', label: '20 problems', description: 'Very compact' }
]
</script>

<template>
  <div class="print-settings space-y-6">
    
    <!-- Page Setup Section -->
    <div class="setting-section">
      <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <svg class="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        Page Setup
      </h3>
      
      <!-- Paper Size -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-800 mb-2">Paper Size</label>
        <div class="space-y-2">
          <label 
            v-for="option in paperSizeOptions" 
            :key="option.value"
            class="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
            :class="settings.paperSize === option.value ? 'bg-orange-50 border-orange-300' : ''"
          >
            <input 
              :value="option.value"
              :checked="settings.paperSize === option.value"
              @change="updateSetting('paperSize', option.value)"
              type="radio" 
              name="paperSize"
              class="text-orange-600 focus:ring-orange-500"
            />
            <span class="material-icons ml-3 text-lg text-orange-600">{{ option.icon }}</span>
            <span class="ml-2 text-sm font-medium text-gray-900">{{ option.label }}</span>
          </label>
        </div>
      </div>


      <!-- Margins -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-800 mb-2">Margins</label>
        <div class="space-y-2">
          <label 
            v-for="option in marginOptions" 
            :key="option.value"
            class="flex items-center justify-between p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
            :class="settings.margins === option.value ? 'bg-orange-50 border-orange-300' : ''"
          >
            <div class="flex items-center">
              <input 
                :value="option.value"
                :checked="settings.margins === option.value"
                @change="updateSetting('margins', option.value)"
                type="radio" 
                name="margins"
                class="text-orange-600 focus:ring-orange-500"
              />
              <div class="ml-3">
                <div class="text-sm font-medium text-gray-900">{{ option.label }}</div>
                <div class="text-xs text-gray-700">{{ option.description }}</div>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>

    <!-- Content Settings Section -->
    <div class="setting-section">
      <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <svg class="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
        </svg>
        Content Settings
      </h3>

      <!-- Font Size -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-800 mb-2">Font Size</label>
        <div class="space-y-2">
          <label 
            v-for="option in fontSizeOptions" 
            :key="option.value"
            class="flex items-center justify-between p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
            :class="settings.fontSize === option.value ? 'bg-orange-50 border-orange-300' : ''"
          >
            <div class="flex items-center">
              <input 
                :value="option.value"
                :checked="settings.fontSize === option.value"
                @change="updateSetting('fontSize', option.value)"
                type="radio" 
                name="fontSize"
                class="text-orange-600 focus:ring-orange-500"
              />
              <div class="ml-3">
                <div class="text-sm font-medium text-gray-900">{{ option.label }}</div>
                <div class="text-xs text-gray-700">{{ option.description }}</div>
              </div>
            </div>
          </label>
        </div>
      </div>

      <!-- Problems Per Page -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-800 mb-2">Problems Per Page</label>
        <div class="space-y-2">
          <label 
            v-for="option in problemsPerPageOptions" 
            :key="option.value"
            class="flex items-center justify-between p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
            :class="settings.problemsPerPage === option.value ? 'bg-orange-50 border-orange-300' : ''"
          >
            <div class="flex items-center">
              <input 
                :value="option.value"
                :checked="settings.problemsPerPage === option.value"
                @change="updateSetting('problemsPerPage', option.value)"
                type="radio" 
                name="problemsPerPage"
                class="text-orange-600 focus:ring-orange-500"
              />
              <div class="ml-3">
                <div class="text-sm font-medium text-gray-900">{{ option.label }}</div>
                <div class="text-xs text-gray-700">{{ option.description }}</div>
              </div>
            </div>
          </label>
        </div>
      </div>

      <!-- Work Space Toggle -->
      <div class="mb-4">
        <label class="flex items-center justify-between p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
          <div>
            <div class="text-sm font-medium text-gray-900">Include Work Space</div>
            <div class="text-xs text-gray-700">Add space for students to show their work</div>
          </div>
          <input 
            :checked="settings.showWorkSpace"
            @change="updateSetting('showWorkSpace', $event.target.checked)"
            type="checkbox"
            class="text-orange-600 focus:ring-orange-500 rounded"
          />
        </label>
      </div>
    </div>

    <!-- Answer Key Section -->
    <div class="setting-section">
      <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <svg class="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        Answer Key
      </h3>

      <!-- Include Answer Key -->
      <div class="mb-4">
        <label class="flex items-center justify-between p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
          <div>
            <div class="text-sm font-medium text-gray-900">Include Answer Key</div>
            <div class="text-xs text-gray-700">Generate answers with the worksheet</div>
          </div>
          <input 
            :checked="settings.includeAnswerKey"
            @change="updateSetting('includeAnswerKey', $event.target.checked)"
            type="checkbox"
            class="text-orange-600 focus:ring-orange-500 rounded"
          />
        </label>
      </div>

      <!-- Answer Key Location -->
      <div v-if="settings.includeAnswerKey" class="mb-4">
        <label class="block text-sm font-medium text-gray-800 mb-2">Answer Key Location</label>
        <div class="space-y-2">
          <label class="flex items-center justify-between p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                 :class="settings.answerKeyLocation === 'separate' ? 'bg-orange-50 border-orange-300' : ''">
            <div class="flex items-center">
              <input 
                value="separate"
                :checked="settings.answerKeyLocation === 'separate'"
                @change="updateSetting('answerKeyLocation', 'separate')"
                type="radio" 
                name="answerKeyLocation"
                class="text-orange-600 focus:ring-orange-500"
              />
              <div class="ml-3">
                <div class="text-sm font-medium text-gray-900">Separate Pages</div>
                <div class="text-xs text-gray-700">Answer key on separate pages at the end</div>
              </div>
            </div>
          </label>
          
          <label class="flex items-center justify-between p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                 :class="settings.answerKeyLocation === 'inline' ? 'bg-orange-50 border-orange-300' : ''">
            <div class="flex items-center">
              <input 
                value="inline"
                :checked="settings.answerKeyLocation === 'inline'"
                @change="updateSetting('answerKeyLocation', 'inline')"
                type="radio" 
                name="answerKeyLocation"
                class="text-orange-600 focus:ring-orange-500"
              />
              <div class="ml-3">
                <div class="text-sm font-medium text-gray-900">Inline with Problems</div>
                <div class="text-xs text-gray-700">Answers shown next to each problem</div>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>

    <!-- Header & Footer Section -->
    <div class="setting-section">
      <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <svg class="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
        </svg>
        Header & Footer
      </h3>

      <!-- Header Options -->
      <div class="mb-4">
        <label class="flex items-center justify-between p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
          <div>
            <div class="text-sm font-medium text-gray-900">Include Header</div>
            <div class="text-xs text-gray-700">Student name, date, and title section</div>
          </div>
          <input 
            :checked="settings.includeHeader"
            @change="updateSetting('includeHeader', $event.target.checked)"
            type="checkbox"
            class="text-orange-600 focus:ring-orange-500 rounded"
          />
        </label>
      </div>

      <!-- Custom Fields -->
      <div v-if="settings.includeHeader" class="space-y-3">
        <div>
          <label class="block text-xs font-medium text-gray-900 mb-1">School Name (optional)</label>
          <input 
            :value="settings.schoolName"
            @input="updateSetting('schoolName', $event.target.value)"
            type="text"
            placeholder="Enter school name"
            class="w-full px-3 py-2 border border-gray-400 rounded-md text-sm text-gray-900 bg-white focus:ring-orange-500 focus:border-orange-500 focus:bg-white"
          />
        </div>
        
        <div>
          <label class="block text-xs font-medium text-gray-900 mb-1">Teacher Name (optional)</label>
          <input 
            :value="settings.teacherName"
            @input="updateSetting('teacherName', $event.target.value)"
            type="text"
            placeholder="Enter teacher name"
            class="w-full px-3 py-2 border border-gray-400 rounded-md text-sm text-gray-900 bg-white focus:ring-orange-500 focus:border-orange-500 focus:bg-white"
          />
        </div>
        
        <div>
          <label class="block text-xs font-medium text-gray-900 mb-1">Class Name (optional)</label>
          <input 
            :value="settings.className"
            @input="updateSetting('className', $event.target.value)"
            type="text"
            placeholder="Enter class name"
            class="w-full px-3 py-2 border border-gray-400 rounded-md text-sm text-gray-900 bg-white focus:ring-orange-500 focus:border-orange-500 focus:bg-white"
          />
        </div>
      </div>

      <!-- Date Option -->
      <div class="mt-4 space-y-3">
        <label class="flex items-center justify-between p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
          <div>
            <div class="text-sm font-medium text-gray-900">Include Date</div>
            <div class="text-xs text-gray-700">Show current date on worksheet</div>
          </div>
          <input 
            :checked="settings.includeDate"
            @change="updateSetting('includeDate', $event.target.checked)"
            type="checkbox"
            class="text-orange-600 focus:ring-orange-500 rounded"
          />
        </label>
      </div>

      <!-- Footer Section -->
      <div class="mt-4 space-y-3">
        <label class="flex items-center justify-between p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
          <div>
            <div class="text-sm font-medium text-gray-900">Include Footer</div>
            <div class="text-xs text-gray-700">Show footer with branding and page numbers</div>
          </div>
          <input 
            :checked="settings.includeFooter"
            @change="updateSetting('includeFooter', $event.target.checked)"
            type="checkbox"
            class="text-orange-600 focus:ring-orange-500 rounded"
          />
        </label>

        <!-- Footer Sub-options (only show when footer is enabled) -->
        <div v-if="settings.includeFooter" class="ml-4 space-y-3 border-l-2 border-orange-200 pl-4">
          <label class="flex items-center justify-between p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
            <div>
              <div class="text-sm font-medium text-gray-900">Include Page Numbers</div>
              <div class="text-xs text-gray-700">Show page numbers in footer</div>
            </div>
            <input 
              :checked="settings.includePageNumbers"
              @change="updateSetting('includePageNumbers', $event.target.checked)"
              type="checkbox"
              class="text-orange-600 focus:ring-orange-500 rounded"
            />
          </label>

          <div>
            <label class="block text-xs font-medium text-gray-900 mb-1">Footer Text</label>
            <input 
              :value="settings.footerText"
              @input="updateSetting('footerText', $event.target.value)"
              type="text"
              placeholder="Generated with Open Math Gen"
              class="w-full px-3 py-2 border border-gray-400 rounded-md text-sm text-gray-900 bg-white focus:ring-orange-500 focus:border-orange-500 focus:bg-white"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Summary Card -->
    <div class="setting-section">
      <div class="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-4">
        <h4 class="text-sm font-semibold text-orange-800 mb-2">Print Summary</h4>
        <div class="text-xs text-orange-700 space-y-1">
          <div>Paper: {{ settings.paperSize.toUpperCase() }} {{ settings.orientation }}</div>
          <div>Problems: {{ problemCount }} total</div>
          <div>Pages: ~{{ estimatedPages }} page{{ estimatedPages !== 1 ? 's' : '' }}</div>
          <div v-if="settings.includeAnswerKey">Answer key: {{ settings.answerKeyLocation }}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.setting-section {
  border-bottom: 1px solid #d1d5db;
  padding-bottom: 1.5rem;
}

.setting-section:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.setting-section:not(:first-child) {
  padding-top: 1.5rem;
}

/* Custom radio button styling */
input[type="radio"]:checked {
  background-color: #ea580c;
  border-color: #ea580c;
}

input[type="radio"]:focus {
  box-shadow: 0 0 0 2px #fff, 0 0 0 4px #f97316;
}

/* Custom checkbox styling */
input[type="checkbox"]:checked {
  background-color: #ea580c;
  border-color: #ea580c;
}

input[type="checkbox"]:focus {
  box-shadow: 0 0 0 2px #fff, 0 0 0 4px #f97316;
}
</style>