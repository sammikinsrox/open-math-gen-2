<script setup>
import { ref, onMounted } from 'vue'
import Hero from './components/Hero.vue'
import Features from './components/Features.vue'
import Navigation from './components/Navigation.vue'
import Statistics from './components/Statistics.vue'
import Footer from './components/Footer.vue'
import WorksheetBuilder from './components/WorksheetBuilder.vue'

const loaded = ref(false)
const currentPage = ref('home')

onMounted(() => {
  setTimeout(() => {
    loaded.value = true
  }, 100)
})

const navigateTo = (page) => {
  currentPage.value = page
  
  // If navigating to home from worksheet builder, scroll to features after a short delay
  if (page === 'home') {
    setTimeout(() => {
      const featuresElement = document.getElementById('features')
      if (featuresElement) {
        featuresElement.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
    <Navigation @navigate="navigateTo" :current-page="currentPage" />
    
    <!-- Home Page -->
    <main v-if="currentPage === 'home'" class="transition-all duration-1000" :class="loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'">
      <Hero @navigate="navigateTo" />
      <Statistics />
      <Features />
    </main>
    
    <!-- Worksheet Builder Page -->
    <div v-else-if="currentPage === 'worksheet-builder'">
      <WorksheetBuilder />
    </div>
    
    <Footer />
  </div>
</template>
