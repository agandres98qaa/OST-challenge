import { defineConfig } from 'cypress';
import { ENV_CONFIG } from './config';

let env: string;

switch (ENV_CONFIG.TEST_ENVIRONMENT) {
  case 'dev':
    env = 'http://localhost:3000/';
    break;
  case 'prod':
    env = 'http://localhost:3000:prod/';
    break;
  default:
    throw new Error('Invalid environment: ' + ENV_CONFIG.TEST_ENVIRONMENT);
}

export default defineConfig({
  watchForFileChanges: false,
  e2e: {
    baseUrl: env,
    viewportWidth: 1440,
    viewportHeight: 900,
    defaultCommandTimeout: 10000,
    retries: {
      runMode: 2,
      openMode: 1,
    },
    video: true,
    screenshotOnRunFailure: true,
    downloadsFolder: 'cypress/downloads',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
