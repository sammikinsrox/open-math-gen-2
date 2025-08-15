<script setup>
import { ref, onMounted } from 'vue'

const stats = ref([
  { number: 70, label: 'Problem Types', suffix: '+', animated: 0 },
  { number: 10, label: 'Math Categories', suffix: '', animated: 0 },
  { number: 30, label: 'Worksheet Templates', suffix: '+', animated: 0 },
  { number: 1000, label: 'Test Cases', suffix: '+', animated: 0 }
])

const isVisible = ref(false)

const animateNumber = (stat) => {
  const increment = stat.number / 50
  const timer = setInterval(() => {
    stat.animated += increment
    if (stat.animated >= stat.number) {
      stat.animated = stat.number
      clearInterval(timer)
    }
  }, 30)
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !isVisible.value) {
      isVisible.value = true
      stats.value.forEach((stat, index) => {
        setTimeout(() => animateNumber(stat), index * 200)
      })
    }
  })
  
  observer.observe(document.querySelector('#stats'))
})
</script>

<template>
  <section id="stats" class="py-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          Trusted by <span class="text-orange-400">Educators</span> Worldwide
        </h2>
        <p class="text-xl text-slate-300">Comprehensive math education tools backed by rigorous testing</p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div 
          v-for="(stat, index) in stats" 
          :key="index"
          class="text-center transform transition-all duration-700"
          :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
          :style="{ transitionDelay: `${index * 100}ms` }"
        >
          <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/50 transition-all duration-300">
            <div class="text-3xl md:text-4xl font-bold text-orange-400 mb-2">
              {{ Math.floor(stat.animated) }}{{ stat.suffix }}
            </div>
            <div class="text-slate-300 font-medium">{{ stat.label }}</div>
          </div>
        </div>
      </div>

      <!-- Additional highlights -->
      <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center bg-slate-800/20 backdrop-blur-sm border border-slate-700/30 rounded-xl p-6">
          <div class="text-orange-400 text-2xl mb-3">🎓</div>
          <h3 class="text-lg font-semibold text-white mb-2">K-12 Coverage</h3>
          <p class="text-slate-300 text-sm">From kindergarten through advanced high school mathematics</p>
        </div>
        
        <div class="text-center bg-slate-800/20 backdrop-blur-sm border border-slate-700/30 rounded-xl p-6">
          <div class="text-orange-400 text-2xl mb-3">⚡</div>
          <h3 class="text-lg font-semibold text-white mb-2">Instant Generation</h3>
          <p class="text-slate-300 text-sm">Create professional worksheets in seconds, not hours</p>
        </div>
        
        <div class="text-center bg-slate-800/20 backdrop-blur-sm border border-slate-700/30 rounded-xl p-6">
          <div class="text-orange-400 text-2xl mb-3">🎯</div>
          <h3 class="text-lg font-semibold text-white mb-2">100% Accurate</h3>
          <p class="text-slate-300 text-sm">Verified calculations with comprehensive testing</p>
        </div>
      </div>
    </div>
  </section>
</template>