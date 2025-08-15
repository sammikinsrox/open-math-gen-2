<script setup>
import { ref } from 'vue'

const emit = defineEmits(['navigate'])

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)

const submitForm = async () => {
  isSubmitting.value = true
  
  // Simulate form submission
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  isSubmitting.value = false
  isSubmitted.value = true
  
  // Reset form after 3 seconds
  setTimeout(() => {
    isSubmitted.value = false
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  }, 3000)
}

const contactMethods = [
  {
    icon: '📧',
    title: 'Email Support',
    description: 'Get help with technical issues and questions',
    contact: 'support@openmathgen.com',
    response: 'Usually responds within 24 hours'
  },
  {
    icon: '🐛',
    title: 'Bug Reports',
    description: 'Report bugs and technical issues',
    contact: 'bugs@openmathgen.com',
    response: 'We take bugs seriously and respond quickly'
  },
  {
    icon: '💡',
    title: 'Feature Requests',
    description: 'Suggest new features and improvements',
    contact: 'features@openmathgen.com',
    response: 'We love hearing your ideas'
  },
  {
    icon: '🏫',
    title: 'Educational Partnerships',
    description: 'Bulk licensing and educational discounts',
    contact: 'partnerships@openmathgen.com',
    response: 'Custom solutions for schools and districts'
  }
]
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <!-- Header -->
    <div class="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50 py-6 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <button 
          @click="emit('navigate', 'home')"
          class="flex items-center space-x-3 text-white hover:text-orange-400 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          <div>
            <h1 class="text-xl font-bold">
              <span class="text-orange-400">Open</span> Math Gen
            </h1>
          </div>
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        
        <!-- Page Header -->
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">
            Get in <span class="text-orange-400">Touch</span>
          </h1>
          <p class="text-xl text-slate-300 max-w-3xl mx-auto">
            Have questions, feedback, or need support? We're here to help make your math education experience better.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <!-- Contact Form -->
          <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-white mb-6">Send us a Message</h2>
            
            <form @submit.prevent="submitForm" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="name" class="block text-sm font-medium text-slate-300 mb-2">Name</label>
                  <input 
                    id="name"
                    v-model="form.name"
                    type="text" 
                    required
                    class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30 focus:outline-none transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label for="email" class="block text-sm font-medium text-slate-300 mb-2">Email</label>
                  <input 
                    id="email"
                    v-model="form.email"
                    type="email" 
                    required
                    class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30 focus:outline-none transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label for="subject" class="block text-sm font-medium text-slate-300 mb-2">Subject</label>
                <input 
                  id="subject"
                  v-model="form.subject"
                  type="text" 
                  required
                  class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30 focus:outline-none transition-all"
                  placeholder="What's this about?"
                />
              </div>
              
              <div>
                <label for="message" class="block text-sm font-medium text-slate-300 mb-2">Message</label>
                <textarea 
                  id="message"
                  v-model="form.message"
                  rows="6"
                  required
                  class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30 focus:outline-none transition-all resize-none"
                  placeholder="Tell us how we can help..."
                ></textarea>
              </div>
              
              <button 
                type="submit"
                :disabled="isSubmitting || isSubmitted"
                class="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-green-500 disabled:to-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
              >
                <span v-if="isSubmitting" class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
                <span v-else-if="isSubmitted" class="flex items-center justify-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Message Sent!
                </span>
                <span v-else>Send Message</span>
              </button>
            </form>
          </div>

          <!-- Contact Methods -->
          <div class="space-y-6">
            <h2 class="text-2xl font-bold text-white mb-6">Other Ways to Reach Us</h2>
            
            <div 
              v-for="method in contactMethods" 
              :key="method.title"
              class="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/50 transition-all duration-300"
            >
              <div class="flex items-start space-x-4">
                <div class="text-3xl">{{ method.icon }}</div>
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-white mb-2">{{ method.title }}</h3>
                  <p class="text-slate-300 text-sm mb-3">{{ method.description }}</p>
                  <div class="bg-slate-700/50 rounded-lg p-3 mb-2">
                    <a 
                      :href="`mailto:${method.contact}`"
                      class="text-orange-400 hover:text-orange-300 font-medium text-sm transition-colors"
                    >
                      {{ method.contact }}
                    </a>
                  </div>
                  <p class="text-slate-400 text-xs">{{ method.response }}</p>
                </div>
              </div>
            </div>

            <!-- Quick FAQ -->
            <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 mt-8">
              <h3 class="text-lg font-semibold text-white mb-4">Quick Questions?</h3>
              <div class="space-y-3 text-sm">
                <div class="flex items-start space-x-3">
                  <span class="text-orange-400 font-bold">Q:</span>
                  <div>
                    <span class="text-slate-300">Is Open Math Gen free to use?</span>
                    <p class="text-slate-400 text-xs mt-1">A: Yes! We offer a generous free tier with unlimited basic worksheets.</p>
                  </div>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-orange-400 font-bold">Q:</span>
                  <div>
                    <span class="text-slate-300">Can I use this in my classroom?</span>
                    <p class="text-slate-400 text-xs mt-1">A: Absolutely! We're designed for educators and offer special features for schools.</p>
                  </div>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-orange-400 font-bold">Q:</span>
                  <div>
                    <span class="text-slate-300">How do I report a bug?</span>
                    <p class="text-slate-400 text-xs mt-1">A: Use our bug report email above or the contact form - we respond quickly!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom CTA -->
        <div class="text-center mt-16">
          <div class="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-400/20 rounded-2xl p-8">
            <h3 class="text-2xl font-bold text-white mb-4">Ready to get started?</h3>
            <p class="text-slate-300 mb-6">Create beautiful math worksheets in seconds with our easy-to-use builder.</p>
            <button 
              @click="emit('navigate', 'worksheet-builder')"
              class="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Try Worksheet Builder
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbar for textarea */
textarea::-webkit-scrollbar {
  width: 6px;
}

textarea::-webkit-scrollbar-track {
  background: #475569;
}

textarea::-webkit-scrollbar-thumb {
  background: #64748b;
  border-radius: 3px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>