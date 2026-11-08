const {defineConfig} = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:4201',
    channel: 'chrome',
    trace: 'retain-on-failure'
  },
  projects: [
    {name: 'desktop', use: {viewport: {width: 1440, height: 1000}}},
    {name: 'mobile', use: {viewport: {width: 390, height: 844}, isMobile: true, hasTouch: true}}
  ],
  webServer: {
    command: 'node serve.cjs',
    url: 'http://127.0.0.1:4201',
    reuseExistingServer: false
  }
});
