<script setup>
import { computed } from 'vue'

const props = defineProps({
  template: {
    type: Object,
    required: true
  }
})

const algebraicThinkingLevel = computed(() => {
  return props.template.algebraicThinking || 'medium'
})

const realWorldLevel = computed(() => {
  return props.template.realWorldConnections || 'medium'
})

const getAlgebraicThinkingColor = (level) => {
  switch (level) {
    case 'low': return 'bg-green-500'
    case 'medium': return 'bg-yellow-500'
    case 'high': return 'bg-red-500'
    default: return 'bg-gray-500'
  }
}

const getRealWorldColor = (level) => {
  switch (level) {
    case 'low': return 'bg-blue-500'
    case 'medium': return 'bg-purple-500'
    case 'high': return 'bg-orange-500'
    default: return 'bg-gray-500'
  }
}

const getPrerequisiteSkills = () => {
  const prerequisites = []
  
  if (props.template.subject === 'pre-algebra') {
    prerequisites.push('Integer operations', 'Order of operations', 'Basic fraction skills')
  }
  
  if (props.template.gradeLevel.includes('6')) {
    prerequisites.push('Decimal operations', 'Fraction operations', 'Multi-digit arithmetic')
  }
  
  if (props.template.gradeLevel.includes('7')) {
    prerequisites.push('Ratios and proportions', 'Basic algebraic expressions', 'Integer operations')
  }
  
  if (props.template.gradeLevel.includes('8')) {
    prerequisites.push('Linear equations', 'Graphing on coordinate plane', 'Systems of equations')
  }
  
  return prerequisites.slice(0, 4)
}

const getInstructionalStrategies = () => {
  const strategies = []
  
  if (algebraicThinkingLevel.value === 'high') {
    strategies.push(
      'Use algebra tiles for visual representation',
      'Connect to real-world problem contexts',
      'Emphasize multiple solution methods',
      'Build on patterns and relationships'
    )
  } else if (algebraicThinkingLevel.value === 'medium') {
    strategies.push(
      'Bridge concrete and abstract thinking',
      'Use numerical examples before variables',
      'Show step-by-step solution processes',
      'Connect to familiar mathematical concepts'
    )
  } else {
    strategies.push(
      'Start with concrete examples',
      'Use visual models and manipulatives',
      'Focus on procedural fluency first',
      'Build conceptual understanding gradually'
    )
  }
  
  return strategies
}

const getTechnologyIntegration = () => {
  const tech = []
  
  if (props.template.subject === 'pre-algebra') {
    tech.push('Graphing calculators for linear functions')
    tech.push('Algebra software like Desmos or GeoGebra')
  }
  
  if (props.template.generators?.includes('graphing-basics')) {
    tech.push('Coordinate plane graphing tools')
    tech.push('Interactive graphing applications')
  }
  
  if (props.template.generators?.includes('systems-of-equations')) {
    tech.push('System solving applications')
    tech.push('Multiple representation tools')
  }
  
  tech.push('Online practice platforms')
  tech.push('Mathematical modeling software')
  
  return tech.slice(0, 4)
}

const getDifferentiationApproaches = () => {
  return [
    'Provide multiple entry points to problems',
    'Offer choice in solution methods and tools',
    'Use tiered assignments based on readiness',
    'Include extension problems for advanced learners',
    'Support struggling learners with scaffolded steps'
  ]
}

const getAssessmentStrategies = () => {
  const assessments = []
  
  if (props.template.purpose === 'assessment') {
    assessments.push('Use rubrics that value process and reasoning')
    assessments.push('Include both computational and conceptual questions')
  }
  
  assessments.push('Incorporate formative assessment throughout')
  assessments.push('Use exit tickets to gauge understanding')
  assessments.push('Encourage mathematical discourse and explanation')
  
  return assessments.slice(0, 4)
}

const getHomeworkSupport = () => {
  return [
    'Provide worked examples similar to homework problems',
    'Encourage use of online resources like Khan Academy',
    'Suggest study groups for collaborative problem-solving',
    'Offer optional practice problems for extra support',
    'Communicate with parents about supporting math anxiety'
  ]
}
</script>

<template>
  <div class="bg-slate-700/30 rounded-lg p-6 border border-slate-600">
    <h4 class="text-lg font-semibold text-white mb-4 flex items-center">
      <span class="material-icons text-orange-400 mr-2">functions</span>
      Middle School Teaching Guide
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

    <!-- Algebraic Thinking & Real-World Connections -->
    <div class="grid grid-cols-2 gap-4 mb-4">
      <div>
        <h5 class="font-medium text-green-300 mb-2">Algebraic Thinking</h5>
        <div class="flex items-center space-x-2">
          <div :class="getAlgebraicThinkingColor(algebraicThinkingLevel)" class="w-3 h-3 rounded-full"></div>
          <span class="text-slate-300 text-sm capitalize">{{ algebraicThinkingLevel }} Level</span>
        </div>
      </div>
      
      <div>
        <h5 class="font-medium text-purple-300 mb-2">Real-World Connections</h5>
        <div class="flex items-center space-x-2">
          <div :class="getRealWorldColor(realWorldLevel)" class="w-3 h-3 rounded-full"></div>
          <span class="text-slate-300 text-sm capitalize">{{ realWorldLevel }} Level</span>
        </div>
      </div>
    </div>

    <!-- Prerequisite Skills -->
    <div class="mb-4">
      <h5 class="font-medium text-yellow-300 mb-2">Prerequisite Skills</h5>
      <div class="grid grid-cols-1 gap-1">
        <div 
          v-for="skill in getPrerequisiteSkills()" 
          :key="skill"
          class="text-xs text-slate-300 bg-slate-800/30 px-2 py-1 rounded"
        >
          • {{ skill }}
        </div>
      </div>
    </div>

    <!-- Instructional Strategies -->
    <div class="mb-4">
      <h5 class="font-medium text-pink-300 mb-2">Instructional Strategies</h5>
      <ul class="space-y-1">
        <li 
          v-for="strategy in getInstructionalStrategies()" 
          :key="strategy"
          class="text-xs text-slate-300 flex items-start"
        >
          <span class="text-pink-400 mr-1">•</span>
          {{ strategy }}
        </li>
      </ul>
    </div>

    <!-- Technology Integration -->
    <div class="mb-4">
      <h5 class="font-medium text-cyan-300 mb-2">Technology Integration</h5>
      <ul class="space-y-1">
        <li 
          v-for="tech in getTechnologyIntegration()" 
          :key="tech"
          class="text-xs text-slate-300 flex items-start"
        >
          <span class="text-cyan-400 mr-1">•</span>
          {{ tech }}
        </li>
      </ul>
    </div>

    <!-- Differentiation -->
    <div class="mb-4">
      <h5 class="font-medium text-indigo-300 mb-2">Differentiation Approaches</h5>
      <ul class="space-y-1">
        <li 
          v-for="approach in getDifferentiationApproaches()" 
          :key="approach"
          class="text-xs text-slate-300 flex items-start"
        >
          <span class="text-indigo-400 mr-1">•</span>
          {{ approach }}
        </li>
      </ul>
    </div>

    <!-- Assessment Strategies -->
    <div class="mb-4">
      <h5 class="font-medium text-red-300 mb-2">Assessment Strategies</h5>
      <ul class="space-y-1">
        <li 
          v-for="assessment in getAssessmentStrategies()" 
          :key="assessment"
          class="text-xs text-slate-300 flex items-start"
        >
          <span class="text-red-400 mr-1">•</span>
          {{ assessment }}
        </li>
      </ul>
    </div>

    <!-- Homework & Family Support -->
    <div>
      <h5 class="font-medium text-teal-300 mb-2">Homework & Family Support</h5>
      <ul class="space-y-1">
        <li 
          v-for="support in getHomeworkSupport()" 
          :key="support"
          class="text-xs text-slate-300 flex items-start"
        >
          <span class="text-teal-400 mr-1">•</span>
          {{ support }}
        </li>
      </ul>
    </div>
  </div>
</template>