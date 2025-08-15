<script setup>
import { ref, onMounted } from 'vue'
import Hero from './components/Hero.vue'
import Features from './components/Features.vue'
import Navigation from './components/Navigation.vue'
import Statistics from './components/Statistics.vue'
import Footer from './components/Footer.vue'

const loaded = ref(false)

onMounted(() => {
  setTimeout(() => {
    loaded.value = true
  }, 100)
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
    <Navigation />
    
    <main class="transition-all duration-1000" :class="loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'">
      <Hero />
      <Statistics />
      <Features />
    </main>
    
    <Footer />
  </div>
</template>
