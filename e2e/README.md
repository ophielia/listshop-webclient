# Browser regression checks

The Angular 14 app builds on Node 14.21.3 / npm 8.19.4. Current Playwright runs separately on Node 24.15.0. Neither command changes nvm's default alias.

From the repository root, build the app first:

```sh
nvm use
npx --package npm@8.19.4 npm ci
npx --package npm@8.19.4 npm run build -- --configuration production
```

Then install and run browser checks in this directory:

```sh
cd e2e
nvm use
npm ci
npm test
```

Requires Google Chrome. Playwright starts a local server for `dist/browser` on port 4201. Tests intercept configuration and API calls; they never use real accounts or modify the backend. Unexpected mocked API calls fail the test.

Coverage: login validation, login/session persistence across reload, list rendering, logout, expired API sessions, password-reset navigation, landing carousel/section scrolling/connect menu, list-deletion confirmation, and desktop/mobile login and list screenshots. Screenshots currently use macOS Chrome; regenerate deliberately with `npm run screenshots` only after reviewing visual changes. Other OSes should run `npm test -- --grep-invert 'layout baseline'` until reviewed native baselines are added (list snapshot assertions are macOS-only). Traces are saved for failures under ignored `test-results/`.

Remaining acceptance coverage: real backend integration, list edits/deletion, dish/ingredient autocomplete, meal-plan generation, password-reset submission, beta feedback, and broader landing-page visuals. The initial smoke suite does not certify these workflows.
