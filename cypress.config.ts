import { defineConfig} from 'cypress'
export default defineConfig({
  e2e:{
    supportFile: false,
    baseUrl: 'https://localhost:4321',
    chromeWebSecurity: false
  }
})