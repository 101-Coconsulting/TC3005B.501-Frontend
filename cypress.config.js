import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4321',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    
    // IMPORTANT: SSL and security settings for localhost
    chromeWebSecurity: false,
    modifyObstructiveCode: false,
    
    setupNodeEvents(on, config) {
      // Set Chrome flags for SSL
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          launchOptions.args.push('--ignore-certificate-errors');
          launchOptions.args.push('--ignore-ssl-errors');
          launchOptions.args.push('--ignore-certificate-errors-spki-list');
          launchOptions.args.push('--disable-web-security');
          launchOptions.args.push('--allow-running-insecure-content');
          launchOptions.args.push('--disable-features=VizDisplayCompositor');
        }
        return launchOptions;
      });
      
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });
    },
    
    env: {
      TEST_USER: 'testuser',
      TEST_PASSWORD: 'testpass',
    },
    
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    fixturesFolder: 'cypress/fixtures',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    downloadsFolder: 'cypress/downloads',
  },
});