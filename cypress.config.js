const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
      baseUrl: 'https://www.globalsqa.com/angularJs-protractor/BankingProject/',
      testIsolation: false,
      specPattern: "cypress/e2e/**/*.{cy,spec}.{js,ts}",
  },
})
