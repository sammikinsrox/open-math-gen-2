<script setup>
import { ref } from 'vue'

const props = defineProps({
  currentPage: {
    type: String,
    default: 'home'
  }
})

const emit = defineEmits(['navigate'])

const mobileMenuOpen = ref(false)

const navigateTo = (page) => {
  emit('navigate', page)
  mobileMenuOpen.value = false
}

const goToFeatures = () => {
  if (props.currentPage === 'home') {
    // Already on home page, just scroll to features
    const featuresElement = document.getElementById('features')
    if (featuresElement) {
      featuresElement.scrollIntoView({ behavior: 'smooth' })
    }
  } else {
    // Navigate to home page (which will auto-scroll to features)
    navigateTo('home')
  }
  mobileMenuOpen.value = false
}
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <div class="flex-shrink-0 cursor-pointer" @click="navigateTo('home')">
            <h1 class="text-xl font-bold text-white">
              <span class="text-orange-400">Open</span> Math Gen
            </h1>
          </div>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-8">
            <button @click="goToFeatures" class="text-slate-300 hover:text-orange-400 px-3 py-2 text-sm font-medium transition-colors">Features</button>
            <button @click="navigateTo('worksheet-builder')" :class="currentPage === 'worksheet-builder' ? 'text-orange-400' : 'text-slate-300 hover:text-orange-400'" class="px-3 py-2 text-sm font-medium transition-colors">Worksheet Builder</button>
            <button @click="navigateTo('templates')" :class="currentPage === 'templates' ? 'text-orange-400' : 'text-slate-300 hover:text-orange-400'" class="px-3 py-2 text-sm font-medium transition-colors">Templates</button>
            <a href="#docs" class="text-slate-300 hover:text-orange-400 px-3 py-2 text-sm font-medium transition-colors">Docs</a>
          </div>
        </div>

        <!-- CTA Button -->
        <div class="hidden md:block">
          <button @click="navigateTo('worksheet-builder')" class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-lg hover:shadow-orange-500/25">
            Get Started
          </button>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="text-slate-300 hover:text-white p-2"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="mobileMenuOpen" class="md:hidden bg-slate-800/95 backdrop-blur-md border-t border-slate-700/50">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <button @click="goToFeatures" class="text-slate-300 hover:text-orange-400 block px-3 py-2 text-base font-medium text-left w-full">Features</button>
        <button @click="navigateTo('worksheet-builder')" :class="currentPage === 'worksheet-builder' ? 'text-orange-400' : 'text-slate-300 hover:text-orange-400'" class="block px-3 py-2 text-base font-medium text-left w-full">Worksheet Builder</button>
        <button @click="navigateTo('templates')" :class="currentPage === 'templates' ? 'text-orange-400' : 'text-slate-300 hover:text-orange-400'" class="block px-3 py-2 text-base font-medium text-left w-full">Templates</button>
        <a href="#docs" class="text-slate-300 hover:text-orange-400 block px-3 py-2 text-base font-medium">Docs</a>
        <button @click="navigateTo('worksheet-builder')" class="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
          Get Started
        </button>
      </div>
    </div>
  </nav>
</template>