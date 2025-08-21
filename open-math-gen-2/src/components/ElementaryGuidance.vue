<script setup>
import { computed } from 'vue'

const props = defineProps({
  template: {
    type: Object,
    required: true
  }
})

const guidanceLevel = computed(() => {
  const grade = props.template.gradeLevel
  if (grade === 'K' || grade === '1') return 'early'
  if (grade === '2' || grade === '3') return 'primary'
  if (grade === '4' || grade === '5') return 'intermediate'
  return 'general'
})

const visualSupportLevel = computed(() => {
  return props.template.visualSupport || 'medium'
})

const getManipulativeRecommendations = () => {
  const recommendations = []
  
  if (props.template.subject === 'basic-operations') {
    recommendations.push('Counting bears or cubes', 'Ten frames', 'Number lines')
  }
  
  if (props.template.subject === 'numbers-place-value') {
    recommendations.push('Base-ten blocks', 'Place value charts', 'Hundreds chart')
  }
  
  if (props.template.subject === 'fractions-decimals') {
    recommendations.push('Fraction circles', 'Fraction bars', 'Pizza/pie models')
  }
  
  if (props.template.subject === 'geometry-basic') {
    recommendations.push('Pattern blocks', 'Geometric solids', 'Geo boards')
  }
  
  if (props.template.subject === 'measurement-units') {
    recommendations.push('Rulers and measuring tools', 'Unit cubes', 'Balance scales')
  }
  
  return recommendations.slice(0, 4)
}

const getDifferentiationStrategies = () => {
  const strategies = []
  
  if (guidanceLevel.value === 'early') {
    strategies.push(
      'Allow extended time and breaks',
      'Use concrete manipulatives before abstract work',
      'Work in small groups or one-on-one',
      'Read problems aloud to students'
    )
  } else if (guidanceLevel.value === 'primary') {
    strategies.push(
      'Provide number lines and hundreds charts',
      'Use visual models alongside algorithms',
      'Encourage multiple solution strategies',
      'Connect to real-world examples'
    )
  } else {
    strategies.push(
      'Offer choice in problem-solving methods',
      'Include extension problems for advanced learners',
      'Use peer tutoring and collaboration',
      'Connect to cross-curricular themes'
    )
  }
  
  return strategies
}

const getParentSupportTips = () => {
  return [
    'Review problems together before independent work',
    'Focus on understanding, not just getting the right answer',
    'Use household items as manipulatives when needed',
    'Celebrate effort and problem-solving strategies',
    'Contact teacher if your child seems frustrated or confused'
  ]
}

const getImplementationTips = () => {
  const tips = []
  
  if (visualSupportLevel.value === 'high') {
    tips.push('Have manipulatives readily available')
    tips.push('Allow drawing and visual representations')
  }
  
  if (props.template.recommendedTime) {
    const timeMap = {
      'morning-math': 'Best used during morning warm-up time',
      'small-group-math': 'Perfect for guided math groups',
      'hands-on-math': 'Ideal for math centers or stations',
      'daily-fluency': 'Great for daily number sense practice'
    }
    tips.push(timeMap[props.template.recommendedTime] || 'Flexible timing')
  }
  
  if (props.template.theme) {
    tips.push(`Coordinates well with ${props.template.theme} themed units`)
  }
  
  return tips
}
</script>

<template>
  <div class="bg-slate-700/30 rounded-lg p-6 border border-slate-600">
    <h4 class="text-lg font-semibold text-white mb-4 flex items-center">
      <span class="material-icons text-orange-400 mr-2">school</span>
      Elementary Teaching Guide
    </h4>

    <!-- Teaching Notes -->
    <div v-if="template.teacherNotes" class="mb-4">
      <h5 class="font-medium text-orange-300 mb-2">Teaching Notes</h5>
      <p class="text-slate-300 text-sm bg-slate-800/50 p-3 rounded border-l-4 border-orange-400">
        {{ template.teacherNotes }}
      </p>
    </div>

    <!-- Standards Alignment -->
    <div v-if="template.standardsAlignment" class="mb-4">
      <h5 class="font-medium text-blue-300 mb-2">Standards Alignment</h5>
      <div class="flex flex-wrap gap-2">
        <span 
          v-for="standard in template.standardsAlignment" 
          :key="standard"
          class="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-500/20 text-blue-300 border border-blue-500/30"
        >
          {{ standard }}
        </span>
      </div>
    </div>

    <!-- Visual Support Level -->
    <div class="mb-4">
      <h5 class="font-medium text-green-300 mb-2">Visual Support</h5>
      <div class="flex items-center space-x-2">
        <div :class="{
          'bg-green-500': visualSupportLevel === 'high',
          'bg-yellow-500': visualSupportLevel === 'medium', 
          'bg-blue-500': visualSupportLevel === 'low'
        }" class="w-3 h-3 rounded-full"></div>
        <span class="text-slate-300 text-sm capitalize">{{ visualSupportLevel }} Visual Support</span>
      </div>
      <p class="text-xs text-slate-400 mt-1">
        <span v-if="visualSupportLevel === 'high'">Heavy use of manipulatives and pictures recommended</span>
        <span v-else-if="visualSupportLevel === 'medium'">Some visual aids and models helpful</span>
        <span v-else>Primarily abstract work with minimal visual support</span>
      </p>
    </div>

    <!-- Recommended Manipulatives -->
    <div class="mb-4">
      <h5 class="font-medium text-purple-300 mb-2">Recommended Manipulatives</h5>
      <div class="grid grid-cols-2 gap-1">
        <div 
          v-for="item in getManipulativeRecommendations()" 
          :key="item"
          class="text-xs text-slate-300 bg-slate-800/30 px-2 py-1 rounded"
        >
          • {{ item }}
        </div>
      </div>
    </div>

    <!-- Implementation Tips -->
    <div class="mb-4">
      <h5 class="font-medium text-yellow-300 mb-2">Implementation Tips</h5>
      <ul class="space-y-1">
        <li 
          v-for="tip in getImplementationTips()" 
          :key="tip"
          class="text-xs text-slate-300 flex items-start"
        >
          <span class="text-yellow-400 mr-1">•</span>
          {{ tip }}
        </li>
      </ul>
    </div>

    <!-- Differentiation Strategies -->
    <div class="mb-4">
      <h5 class="font-medium text-pink-300 mb-2">Differentiation Strategies</h5>
      <ul class="space-y-1">
        <li 
          v-for="strategy in getDifferentiationStrategies()" 
          :key="strategy"
          class="text-xs text-slate-300 flex items-start"
        >
          <span class="text-pink-400 mr-1">•</span>
          {{ strategy }}
        </li>
      </ul>
    </div>

    <!-- Parent Support -->
    <div>
      <h5 class="font-medium text-cyan-300 mb-2">Parent Support Tips</h5>
      <ul class="space-y-1">
        <li 
          v-for="tip in getParentSupportTips()" 
          :key="tip"
          class="text-xs text-slate-300 flex items-start"
        >
          <span class="text-cyan-400 mr-1">•</span>
          {{ tip }}
        </li>
      </ul>
    </div>
  </div>
</template>