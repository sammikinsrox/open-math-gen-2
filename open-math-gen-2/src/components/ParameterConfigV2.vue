<script setup>
import { ref, computed, watch } from 'vue'
import { ParameterSchemaV2 } from '../generators/ParameterSchemaV2.js'

const props = defineProps({
  schema: {
    type: Object,
    required: true
  },
  modelValue: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue', 'validation-change'])

const schemaV2 = new ParameterSchemaV2()
const expandedCategories = ref(new Set())
const values = ref({ ...props.modelValue })

// Initialize expanded categories
const categorizedParams = computed(() => {
  if (props.schema.version === 2) {
    return schemaV2.getCategorizedParameters(props.schema, values.value)
  }
  return []
})

// Initialize expanded state
categorizedParams.value.forEach(category => {
  if (category.expanded) {
    expandedCategories.value.add(category.id)
  }
})

// Watch for value changes and emit
watch(values, (newValues) => {
  emit('update:modelValue', newValues)
  
  // Validate and emit validation status
  if (props.schema.version === 2) {
    const validation = props.schema.validate(newValues)
    emit('validation-change', validation)
  }
}, { deep: true })

// Watch for external changes
watch(() => props.modelValue, (newValues) => {
  values.value = { ...newValues }
}, { deep: true })

const toggleCategory = (categoryId) => {
  if (expandedCategories.value.has(categoryId)) {
    expandedCategories.value.delete(categoryId)
  } else {
    expandedCategories.value.add(categoryId)
  }
}

const isCategoryExpanded = (categoryId) => {
  return expandedCategories.value.has(categoryId)
}

const getCategoryColor = (category) => {
  const colors = {
    blue: 'border-slate-600/50 bg-slate-800/30',
    green: 'border-slate-600/50 bg-slate-800/30',
    purple: 'border-slate-600/50 bg-slate-800/30',
    orange: 'border-orange-500/50 bg-orange-500/10',
    red: 'border-slate-600/50 bg-slate-800/30',
    gray: 'border-slate-600/50 bg-slate-800/30'
  }
  return colors[category.color] || colors.blue
}

const getCategoryIconColor = (category) => {
  const colors = {
    blue: 'text-blue-400',
    green: 'text-green-400', 
    purple: 'text-purple-400',
    orange: 'text-orange-400',
    red: 'text-red-400',
    gray: 'text-slate-400'
  }
  return colors[category.color] || colors.blue
}

const updateValue = (paramId, newValue) => {
  values.value[paramId] = newValue
}

const applyPreset = (preset) => {
  // Apply all preset values
  Object.entries(preset.values).forEach(([key, value]) => {
    values.value[key] = value
  })
}

const getParameterComponent = (param) => {
  switch (param.type) {
    case 'boolean':
      return param.variant === 'checkbox' ? 'ParameterCheckbox' : 'ParameterSwitch'
    case 'number':
      return param.slider ? 'ParameterSlider' : 'ParameterNumber'
    case 'select':
      return param.variant === 'radio' ? 'ParameterRadio' : 
             param.variant === 'cards' ? 'ParameterCards' : 'ParameterSelect'
    case 'multiselect':
      return param.variant === 'chips' ? 'ParameterChips' : 'ParameterMultiSelect'
    case 'range':
      return 'ParameterRange'
    case 'group':
      return 'ParameterGroup'
    default:
      return 'ParameterInput'
  }
}
</script>

<template>
  <div class="parameter-config-v2">
    <!-- Header -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold text-white mb-2">Configuration</h3>
      <p class="text-sm text-slate-400">Customize your problem generation settings</p>
    </div>

    <!-- Presets (if available) -->
    <div v-if="schema.presets && schema.presets.length > 0" class="mb-6">
      <h4 class="text-md font-medium text-white mb-3">Quick Presets</h4>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          v-for="preset in schema.presets"
          :key="preset.id"
          @click="applyPreset(preset)"
          class="text-left p-4 rounded-xl border-2 border-slate-700/50 bg-slate-800/30 hover:bg-orange-500/10 hover:border-orange-500/50 transition-all group backdrop-blur-sm"
        >
          <div class="flex items-start space-x-3">
            <span class="material-icons text-slate-400 group-hover:text-orange-400">
              {{ preset.icon }}
            </span>
            <div>
              <h5 class="font-medium text-white group-hover:text-orange-300">{{ preset.label }}</h5>
              <p class="text-xs text-slate-400 mt-1">{{ preset.description }}</p>
            </div>
          </div>
        </button>
      </div>
    </div>

    <!-- Categories -->
    <div class="space-y-4">
      <div 
        v-for="category in categorizedParams" 
        :key="category.id"
        class="parameter-category"
      >
        <!-- Category Header -->
        <button
          @click="toggleCategory(category.id)"
          class="w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 hover:border-orange-500/70 backdrop-blur-sm"
          :class="[
            getCategoryColor(category),
            isCategoryExpanded(category.id) ? 'rounded-b-none border-b-0' : ''
          ]"
        >
          <div class="flex items-center space-x-3">
            <span 
              class="material-icons text-xl"
              :class="getCategoryIconColor(category)"
            >
              {{ category.icon }}
            </span>
            <div class="text-left">
              <h4 class="font-semibold text-white">{{ category.label }}</h4>
              <p class="text-sm text-slate-300">{{ category.description }}</p>
            </div>
          </div>
          <span 
            class="material-icons text-slate-400 transition-transform duration-200"
            :class="{ 'rotate-180': isCategoryExpanded(category.id) }"
          >
            expand_more
          </span>
        </button>

        <!-- Category Content -->
        <div 
          v-show="isCategoryExpanded(category.id)"
          class="border-2 border-t-0 rounded-b-xl p-6 bg-slate-900/50 backdrop-blur-sm border-slate-600/50"
        >
          <div class="grid gap-6">
            <!-- Parameters -->
            <div
              v-for="param in category.parameters"
              :key="param.id"
              class="parameter-item"
            >
              <!-- Boolean/Switch Parameters -->
              <div v-if="param.type === 'boolean'" class="flex items-center justify-between">
                <div class="flex-1">
                  <label class="block text-sm font-medium text-white mb-1">
                    {{ param.label }}
                    <span v-if="param.required" class="text-orange-400 ml-1">*</span>
                  </label>
                  <p v-if="param.description" class="text-xs text-slate-300 mb-2">
                    {{ param.description }}
                  </p>
                </div>
                <div class="ml-4">
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      class="sr-only peer"
                      :checked="values[param.id]"
                      @change="updateValue(param.id, $event.target.checked)"
                    >
                    <div class="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-500/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                </div>
              </div>

              <!-- Number Parameters -->
              <div v-else-if="param.type === 'number'" class="space-y-2">
                <label class="block text-sm font-medium text-white">
                  {{ param.label }}
                  <span v-if="param.required" class="text-orange-400 ml-1">*</span>
                </label>
                <p v-if="param.description" class="text-xs text-slate-300">
                  {{ param.description }}
                </p>
                
                <!-- Presets if available -->
                <div v-if="param.presets" class="flex space-x-2 mb-2">
                  <button
                    v-for="preset in param.presets"
                    :key="preset"
                    @click="updateValue(param.id, preset)"
                    class="px-3 py-1 text-xs rounded-md border transition-colors"
                    :class="values[param.id] === preset 
                      ? 'bg-orange-500/20 border-orange-400 text-orange-300' 
                      : 'bg-slate-700/30 border-slate-600 text-slate-300 hover:bg-slate-700/50'"
                  >
                    {{ preset }}{{ param.unit ? ` ${param.unit}` : '' }}
                  </button>
                </div>

                <!-- Slider or Input -->
                <div v-if="param.slider" class="space-y-2">
                  <input
                    type="range"
                    :min="param.min"
                    :max="param.max"
                    :step="param.step || 1"
                    :value="values[param.id]"
                    @input="updateValue(param.id, Number($event.target.value))"
                    class="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                  >
                  <div class="flex justify-between text-xs text-slate-400">
                    <span>{{ param.min }}{{ param.unit ? ` ${param.unit}` : '' }}</span>
                    <span class="font-medium text-orange-400">
                      {{ values[param.id] }}{{ param.unit ? ` ${param.unit}` : '' }}
                    </span>
                    <span>{{ param.max }}{{ param.unit ? ` ${param.unit}` : '' }}</span>
                  </div>
                </div>
                <div v-else>
                  <input
                    type="number"
                    :min="param.min"
                    :max="param.max"
                    :step="param.step || 1"
                    :value="values[param.id]"
                    @input="updateValue(param.id, Number($event.target.value))"
                    class="w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-700/50 text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                </div>
              </div>

              <!-- Select Parameters -->
              <div v-else-if="param.type === 'select'" class="space-y-2">
                <label class="block text-sm font-medium text-white">
                  {{ param.label }}
                  <span v-if="param.required" class="text-orange-400 ml-1">*</span>
                </label>
                <p v-if="param.description" class="text-xs text-slate-300">
                  {{ param.description }}
                </p>

                <!-- Card variant -->
                <div v-if="param.variant === 'cards'" class="grid grid-cols-2 gap-3">
                  <button
                    v-for="option in param.options"
                    :key="option.value"
                    @click="updateValue(param.id, option.value)"
                    class="p-3 text-left border-2 rounded-lg transition-all backdrop-blur-sm"
                    :class="values[param.id] === option.value
                      ? 'border-orange-500 bg-orange-500/20 text-orange-200'
                      : 'border-slate-600 bg-slate-800/30 text-slate-200 hover:border-orange-400/50 hover:bg-slate-700/50'"
                  >
                    <div class="font-medium text-sm">{{ option.label }}</div>
                    <div v-if="option.description" class="text-xs text-slate-400 mt-1">
                      {{ option.description }}
                    </div>
                  </button>
                </div>

                <!-- Radio variant -->
                <div v-else-if="param.variant === 'radio'" class="space-y-2">
                  <label
                    v-for="option in param.options"
                    :key="option.value"
                    class="flex items-center space-x-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      :name="param.id"
                      :value="option.value"
                      :checked="values[param.id] === option.value"
                      @change="updateValue(param.id, option.value)"
                      class="w-4 h-4 text-orange-500 bg-slate-700 border-slate-600 focus:ring-orange-500"
                    >
                    <span class="text-sm text-slate-200">{{ option.label }}</span>
                  </label>
                </div>

                <!-- Default dropdown -->
                <select
                  v-else
                  :value="values[param.id]"
                  @change="updateValue(param.id, $event.target.value)"
                  class="w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-700/50 text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">Select {{ param.label.toLowerCase() }}</option>
                  <option
                    v-for="option in param.options"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
              </div>

              <!-- Multiselect Parameters -->
              <div v-else-if="param.type === 'multiselect'" class="space-y-2">
                <label class="block text-sm font-medium text-white">
                  {{ param.label }}
                  <span v-if="param.required" class="text-orange-400 ml-1">*</span>
                </label>
                <p v-if="param.description" class="text-xs text-slate-300">
                  {{ param.description }}
                </p>

                <!-- Quick controls -->
                <div v-if="param.allowSelectAll" class="flex space-x-2 mb-3">
                  <button
                    @click="updateValue(param.id, param.options.map(opt => opt.value))"
                    class="text-xs px-2 py-1 bg-orange-500/20 text-orange-300 rounded hover:bg-orange-500/30"
                  >
                    Select All
                  </button>
                  <button
                    @click="updateValue(param.id, [])"
                    class="text-xs px-2 py-1 bg-slate-700/50 text-slate-300 rounded hover:bg-slate-600/50"
                  >
                    Clear All
                  </button>
                </div>

                <!-- Checkboxes -->
                <div class="grid grid-cols-2 gap-2">
                  <label
                    v-for="option in param.options"
                    :key="option.value"
                    class="flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-slate-700/30"
                  >
                    <input
                      type="checkbox"
                      :checked="(values[param.id] || []).includes(option.value)"
                      @change="() => {
                        const currentValues = values[param.id] || [];
                        if ($event.target.checked) {
                          updateValue(param.id, [...currentValues, option.value]);
                        } else {
                          updateValue(param.id, currentValues.filter(v => v !== option.value));
                        }
                      }"
                      class="w-4 h-4 text-orange-500 bg-slate-700 border-slate-600 rounded focus:ring-orange-500"
                    >
                    <span class="text-sm text-slate-200">{{ option.label }}</span>
                  </label>
                </div>

                <!-- Selection count -->
                <div class="text-xs text-slate-400">
                  {{ (values[param.id] || []).length }} of {{ param.options.length }} selected
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.parameter-config-v2 {
  max-width: none;
}

.parameter-category {
  transition: all 0.2s;
}

.slider::-webkit-slider-thumb {
  appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  background-color: #f97316;
  border-radius: 9999px;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 1.25rem;
  height: 1.25rem;
  background-color: #f97316;
  border-radius: 9999px;
  cursor: pointer;
  border: 0;
}
</style>