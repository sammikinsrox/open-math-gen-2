<script setup>
import { computed } from 'vue'
import MathExpression from './MathExpression.vue'

const props = defineProps({
  generator: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['select'])

const generatorInfo = computed(() => props.generator.getInfo())
const exampleProblem = computed(() => props.generator.getExampleProblem())

const difficultyColor = computed(() => {
  switch (generatorInfo.value.difficulty) {
    case 'easy': return 'text-green-400'
    case 'medium': return 'text-yellow-400' 
    case 'hard': return 'text-red-400'
    default: return 'text-slate-400'
  }
})

const selectGenerator = () => {
  emit('select', props.generator)
}
</script>

<template>
  <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/50 transition-all duration-300 cursor-pointer group"
       @click="selectGenerator">
    
    <!-- Header -->
    <div class="flex items-start justify-between mb-4">
      <div class="flex items-center space-x-3">
        <div class="group-hover:scale-110 transition-transform duration-300">
          <span class="material-icons text-3xl text-orange-400">{{ generatorInfo.icon }}</span>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors">
            {{ generatorInfo.name }}
          </h3>
          <div class="flex items-center space-x-2 text-sm">
            <span :class="difficultyColor" class="font-medium capitalize">
              {{ generatorInfo.difficulty }}
            </span>
            <span class="text-slate-400">•</span>
            <span class="text-slate-400">{{ generatorInfo.gradeLevel }}</span>
          </div>
        </div>
      </div>
      
      <!-- Add Button -->
      <button class="opacity-0 group-hover:opacity-100 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg transition-all duration-300">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
      </button>
    </div>

    <!-- Description -->
    <p class="text-slate-300 text-sm mb-4 leading-relaxed">
      {{ generatorInfo.description }}
    </p>

    <!-- Example Problem -->
    <div class="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
      <div class="text-xs font-medium text-gray-500 mb-2">EXAMPLE PROBLEM</div>
      <div class="text-black font-medium">
        <MathExpression 
          v-if="exampleProblem.questionLaTeX" 
          :expression="exampleProblem.questionLaTeX" 
        />
        <span v-else>{{ exampleProblem.question }}</span>
      </div>
      <div class="mt-3 pt-2 border-t border-gray-200">
        <div class="text-xs text-gray-600 mb-1">Answer:</div>
        <div class="border-b-2 border-gray-300 w-24 h-5"></div>
      </div>
    </div>

    <!-- Tags -->
    <div class="flex flex-wrap gap-2 mb-4">
      <span 
        v-for="tag in generatorInfo.tags" 
        :key="tag"
        class="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-full"
      >
        {{ tag }}
      </span>
    </div>

    <!-- Footer Info -->
    <div class="flex items-center justify-between text-xs text-slate-400">
      <span>Est. {{ generatorInfo.estimatedTime }}</span>
      <span class="flex items-center space-x-1">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>{{ Object.keys(generatorInfo.parameters).length }} parameters</span>
      </span>
    </div>

    <!-- Hover Overlay -->
    <div class="absolute inset-0 bg-orange-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
  </div>
</template>

<style scoped>
.group {
  position: relative;
}
</style>