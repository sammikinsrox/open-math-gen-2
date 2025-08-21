<script setup>
const emit = defineEmits(['navigate'])
</script>

<template>
  <footer class="bg-slate-900/50 backdrop-blur-sm border-t border-slate-700/50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="col-span-1 md:col-span-1">
          <div class="flex items-center mb-4">
            <h3 class="text-xl font-bold text-white">
              <span class="text-orange-400">Open</span> Math Gen
            </h3>
          </div>
          <p class="text-slate-300 text-sm leading-relaxed">
            Comprehensive mathematics worksheet generator for educators, parents, and students. 
            Create beautiful, professional worksheets in seconds.
          </p>
         
        </div>

        <!-- Product -->
        <div>
          <h4 class="text-white font-semibold mb-4">Product</h4>
          <ul class="space-y-2">
            <li><a href="#" class="text-slate-300 hover:text-orange-400 transition-colors text-sm">Features</a></li>
            <li><button @click="emit('navigate', 'worksheet-builder')" class="text-slate-300 hover:text-orange-400 transition-colors text-sm bg-transparent border-none cursor-pointer p-0 font-inherit">Worksheet Builder</button></li>
            <li><button @click="emit('navigate', 'templates')" class="text-slate-300 hover:text-orange-400 transition-colors text-sm bg-transparent border-none cursor-pointer p-0 font-inherit">Templates</button></li>
            <li><a href="#" class="text-slate-300 hover:text-orange-400 transition-colors text-sm">Changelog</a></li>
          </ul>
        </div>

        <!-- Resources -->
        <div>
          <h4 class="text-white font-semibold mb-4">Resources</h4>
          <ul class="space-y-2">
            <li><a href="#" class="text-slate-300 hover:text-orange-400 transition-colors text-sm">Documentation</a></li>
            <li><a href="#" class="text-slate-300 hover:text-orange-400 transition-colors text-sm">API Reference</a></li>
            <li><a href="#" class="text-slate-300 hover:text-orange-400 transition-colors text-sm">Examples</a></li>
            <li><a href="#" class="text-slate-300 hover:text-orange-400 transition-colors text-sm">Tutorials</a></li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h4 class="text-white font-semibold mb-4">Support</h4>
          <ul class="space-y-2">
            <li><button @click="emit('navigate', 'contact')" class="text-slate-300 hover:text-orange-400 transition-colors text-sm bg-transparent border-none cursor-pointer p-0 font-inherit">Contact Us</button></li>
            <li><a href="#" class="text-slate-300 hover:text-orange-400 transition-colors text-sm">Bug Reports</a></li>
          </ul>
        </div>
      </div>

      <!-- Bottom section -->
      <div class="border-t border-slate-700/50 mt-12 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center mb-6">
          <div class="text-slate-400 text-sm mb-4 md:mb-0">
            © 2024 Open Math Gen. Open source & MIT licensed.
          </div>
        <!-- Khan Academy Attribution -->
        <div class="flex flex-col items-center space-y-3">
          <span class="text-slate-400 text-sm">Inspired by</span>
          <a href="https://www.khanacademy.org" target="_blank" class="text-slate-400 hover:text-orange-400 transition-colors">
            <img src="/khan-academy-white.svg" alt="Khan Academy" class="h-12 w-auto" />
          </a>
        </div>
          <div class="flex space-x-6">
            <button @click="emit('navigate', 'privacy')" class="text-slate-400 hover:text-orange-400 transition-colors text-sm bg-transparent border-none cursor-pointer p-0 font-inherit">Privacy Policy</button>
            <a href="#" class="text-slate-400 hover:text-orange-400 transition-colors text-sm">Terms of Service</a>
            <a href="https://github.com/sammikinsrox/open-math-gen-2/blob/main/LICENSE" target="_blank" class="text-slate-400 hover:text-orange-400 transition-colors text-sm">MIT License</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>