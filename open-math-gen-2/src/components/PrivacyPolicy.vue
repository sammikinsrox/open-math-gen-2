<script setup>
import { ref } from 'vue'

const emit = defineEmits(['navigate'])

const lastUpdated = ref('January 15, 2025')
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
      <div class="max-w-4xl mx-auto">
        
        <!-- Page Header -->
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">
            Privacy <span class="text-orange-400">Policy</span>
          </h1>
          <p class="text-xl text-slate-300 max-w-3xl mx-auto">
            Your privacy matters to us. Learn how we protect your information while you create amazing math worksheets.
          </p>
          <p class="text-sm text-slate-400 mt-4">
            Last updated: {{ lastUpdated }}
          </p>
        </div>

        <!-- Privacy Policy Content -->
        <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 lg:p-12">
          
          <!-- Introduction -->
          <section class="mb-12">
            <h2 class="text-2xl font-bold text-white mb-6">Our Commitment to Privacy</h2>
            <div class="prose prose-slate prose-invert max-w-none">
              <p class="text-slate-300 leading-relaxed mb-4">
                Open Math Gen is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard information when you use our mathematics worksheet generator application.
              </p>
              <p class="text-slate-300 leading-relaxed">
                <strong class="text-orange-400">The short version:</strong> We don't collect, store, or share any personal information. Our application runs entirely in your browser, and all data stays on your device.
              </p>
            </div>
          </section>

          <!-- Information We Don't Collect -->
          <section class="mb-12">
            <h2 class="text-2xl font-bold text-white mb-6">Information We Don't Collect</h2>
            <div class="bg-green-500/10 border border-green-400/20 rounded-xl p-6 mb-6">
              <div class="flex items-start space-x-3">
                <svg class="w-6 h-6 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div>
                  <h3 class="text-lg font-semibold text-white mb-2">No Account Required</h3>
                  <p class="text-slate-300">We don't require you to create accounts, so we never collect usernames, passwords, or email addresses.</p>
                </div>
              </div>
            </div>
            
            <div class="space-y-4 text-slate-300">
              <p>We do <strong>NOT</strong> collect:</p>
              <ul class="list-disc list-inside space-y-2 ml-4">
                <li>Personal information (names, addresses, phone numbers)</li>
                <li>Email addresses or contact information</li>
                <li>Account credentials or login information</li>
                <li>Payment information (the service is completely free)</li>
                <li>Behavioral tracking data</li>
                <li>Location information</li>
                <li>Device identifiers</li>
              </ul>
            </div>
          </section>

          <!-- Local Storage -->
          <section class="mb-12">
            <h2 class="text-2xl font-bold text-white mb-6">Local Storage Usage</h2>
            <div class="bg-blue-500/10 border border-blue-400/20 rounded-xl p-6 mb-6">
              <div class="flex items-start space-x-3">
                <svg class="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                </svg>
                <div>
                  <h3 class="text-lg font-semibold text-white mb-2">Browser Storage Only</h3>
                  <p class="text-slate-300">All data is stored locally in your browser and never leaves your device.</p>
                </div>
              </div>
            </div>
            
            <div class="space-y-4 text-slate-300">
              <p>Open Math Gen uses your browser's local storage to:</p>
              <ul class="list-disc list-inside space-y-2 ml-4">
                <li><strong>Save your worksheet configurations</strong> - Problem sets, settings, and titles</li>
                <li><strong>Remember your preferences</strong> - Print settings, generator selections</li>
                <li><strong>Improve user experience</strong> - So you don't lose your work when refreshing the page</li>
              </ul>
              <p class="mt-4">
                <strong>Important:</strong> This data is stored only on your device and is never transmitted to our servers or any third parties. You can clear this data at any time through your browser settings.
              </p>
            </div>
          </section>

          <!-- Third-Party Services -->
          <section class="mb-12">
            <h2 class="text-2xl font-bold text-white mb-6">Third-Party Services</h2>
            <div class="space-y-4 text-slate-300">
              <p>Open Math Gen is designed to work entirely offline after the initial page load. We do not integrate with third-party analytics, tracking, or advertising services.</p>
              <p>The only external connection is when you click the Khan Academy link in our footer, which will take you to Khan Academy's website (subject to their own privacy policy).</p>
            </div>
          </section>

          <!-- Open Source -->
          <section class="mb-12">
            <h2 class="text-2xl font-bold text-white mb-6">Open Source Transparency</h2>
            <div class="bg-orange-500/10 border border-orange-400/20 rounded-xl p-6 mb-6">
              <div class="flex items-start space-x-3">
                <svg class="w-6 h-6 text-orange-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                </svg>
                <div>
                  <h3 class="text-lg font-semibold text-white mb-2">Complete Transparency</h3>
                  <p class="text-slate-300">Our entire codebase is open source and available for review on GitHub.</p>
                </div>
              </div>
            </div>
            
            <div class="space-y-4 text-slate-300">
              <p>Open Math Gen is released under the MIT License, which means:</p>
              <ul class="list-disc list-inside space-y-2 ml-4">
                <li>You can review our source code to verify our privacy claims</li>
                <li>You can run the application on your own servers if desired</li>
                <li>You can modify the code to suit your needs</li>
                <li>The code is auditable by security researchers and privacy advocates</li>
              </ul>
              <p class="mt-4">
                View our source code: <a href="https://github.com/sammikinsrox/open-math-gen-2" target="_blank" class="text-orange-400 hover:text-orange-300 underline">GitHub Repository</a>
              </p>
            </div>
          </section>

          <!-- Data Security -->
          <section class="mb-12">
            <h2 class="text-2xl font-bold text-white mb-6">Data Security</h2>
            <div class="space-y-4 text-slate-300">
              <p>Since we don't collect or store personal data on our servers, there's no risk of data breaches involving your personal information. Your worksheet data remains:</p>
              <ul class="list-disc list-inside space-y-2 ml-4">
                <li><strong>Local to your device</strong> - Never transmitted over the internet</li>
                <li><strong>Under your control</strong> - You can delete it anytime</li>
                <li><strong>Private by design</strong> - No external access possible</li>
              </ul>
            </div>
          </section>

          <!-- Children's Privacy -->
          <section class="mb-12">
            <h2 class="text-2xl font-bold text-white mb-6">Children's Privacy (COPPA Compliance)</h2>
            <div class="space-y-4 text-slate-300">
              <p>Open Math Gen is safe for children to use because:</p>
              <ul class="list-disc list-inside space-y-2 ml-4">
                <li>We don't collect any personal information from users of any age</li>
                <li>No registration or account creation is required</li>
                <li>The application contains no social features or communication tools</li>
                <li>No data is transmitted to external servers</li>
              </ul>
              <p class="mt-4">Parents and educators can use Open Math Gen with confidence that children's privacy is fully protected.</p>
            </div>
          </section>

          <!-- Contact Information -->
          <section class="mb-12">
            <h2 class="text-2xl font-bold text-white mb-6">Questions About Privacy</h2>
            <div class="space-y-4 text-slate-300">
              <p>If you have questions about this Privacy Policy or our privacy practices, please contact us:</p>
              <div class="bg-slate-700/50 rounded-lg p-4 mt-4">
                <p><strong>Email:</strong> <a href="mailto:privacy@openmathgen.com" class="text-orange-400 hover:text-orange-300">privacy@openmathgen.com</a></p>
                <p><strong>General Contact:</strong> <a href="mailto:support@openmathgen.com" class="text-orange-400 hover:text-orange-300">support@openmathgen.com</a></p>
              </div>
            </div>
          </section>

          <!-- Changes to Policy -->
          <section>
            <h2 class="text-2xl font-bold text-white mb-6">Changes to This Policy</h2>
            <div class="space-y-4 text-slate-300">
              <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last modified" date.</p>
              <p>Since we don't collect contact information, we cannot notify you directly of changes. We recommend checking this page periodically if you use Open Math Gen regularly.</p>
              <p class="mt-4 p-4 bg-slate-700/50 rounded-lg">
                <strong>Current version:</strong> {{ lastUpdated }}<br>
                <strong>Effective date:</strong> {{ lastUpdated }}
              </p>
            </div>
          </section>

        </div>

        <!-- Bottom CTA -->
        <div class="text-center mt-16">
          <div class="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-400/20 rounded-2xl p-8">
            <h3 class="text-2xl font-bold text-white mb-4">Privacy-First Math Education</h3>
            <p class="text-slate-300 mb-6">Create worksheets with confidence knowing your privacy is protected.</p>
            <button 
              @click="emit('navigate', 'worksheet-builder')"
              class="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Start Creating Worksheets
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom prose styles for better readability */
.prose h2 {
  color: #fff;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.prose p {
  margin-bottom: 1rem;
}

.prose ul {
  margin-bottom: 1rem;
}

.prose li {
  margin-bottom: 0.5rem;
}
</style>