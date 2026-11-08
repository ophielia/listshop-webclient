# Angular upgrade progress

## Current checkpoint

Preparation implementation is ready for review, with the recorded legacy unit/lint failures and product acceptance limits below. **Angular remains 11.2.14; Angular 12 has not started or been authorized.**

- Branch: `chore/angular-upgrade`.
- Starting commit: `4db41f1032fae67d7435caf78aff73eb4c545dfa`.
- Preparation commit: use `git log -1` after the preparation commit is created; all work is on the branch above.
- Existing unrelated untracked `.junie/` is untouched.
- Resume by reading this file and `docs/angular-upgrade-plan.md`, then inspecting Git before changing anything.

## Completed changes

- Saved the plan, resume protocol, and Angular 11–22 compatibility candidate matrix with npm peer evidence (`angular-upgrade-dependencies.md` / `.json`). Regenerate using Node 24: `node scripts/angular-upgrade-audit.cjs` after installing root dependencies. Candidates require additional API/peer verification at each future hop.
- Removed unused Universal dependencies, server entrypoints and backup files, SSR targets/scripts, server transition bootstrap, and server-only polyfill. Browser deployment and runtime configuration remain in place.
- Removed unused Angular 13 `@nicky-lenaers/ngx-scroll-to` dependency (no source references).
- Aligned used UI packages to Angular 11: CDK 11.2.13, PrimeNG 11.4.5, carousel 5.1.2, spinner 11.0.2; Codelyzer 6.0.2 fixes its Angular compiler/core peer mismatch. Bootstrap remains 4 and ng-bootstrap remains 9. No peer-bypass flags used.
- Pinned app Node 12.22.12 / npm 7.24.2, `.nvmrc`, and lockfile; repaired `npm start`. Docker build stage uses these versions, `npm ci --strict-peer-deps`, and a `.dockerignore` that prevents host modules overwriting Linux modules.
- Replaced the incomplete Protractor entry point with an isolated current Playwright package on Node 24.15.0 (`e2e/`). Root `npm run e2e` delegates there; run using Node 24 as documented. Protractor remains a transitive Angular 11 builder dependency until later upgrades.
- Added mocked browser journeys for login validation, successful login, stored session/reload, list rendering, mobile menu/logout, expired API session, and password-reset navigation. Original production-bundle screenshots of login and lists are saved for desktop/mobile; the cleaned-up bundle matches them.
- Corrected five pre-existing nonexistent component imports/class names in user specs. Repaired the configuration service test's missing HTTP provider and added a runtime initialization/readiness test.
- Added a PR/manual CI workflow for production build and functional browser smoke checks. macOS screenshots are compared locally; CI excludes the login screenshot-only case and skips list snapshots on Linux. The workflow has not been run on GitHub.
- Updated README/AGENTS instructions; `e2e/README.md` contains exact commands and the remaining product acceptance coverage.

## Local tooling

Host is Apple Silicon (`arm64`). Existing standalone nvm 0.39.7 remains unchanged; no Homebrew nvm was installed. Added only Node 12.22.12 (x64 through Rosetta) and Node 24.15.0 (native arm64). Download checksums matched. Default nvm alias still resolves to Node 18.19.1; shell startup files are unchanged. Node 14 for Angular 13–15 is not installed yet.

Node 12's bundled npm is still 6.14.16. Commands in this session used a temporary npm 7.24.2 at `/private/tmp/listshop-upgrade-tools/node_modules/npm/bin/npm-cli.js` with Node 12 explicitly. Recreate portably with `nvm use` then `npx --package npm@7.24.2 npm ci`. Do not rely on the temporary tools surviving a restart. E2E commands use the Node version in `e2e/.nvmrc`.

## Validation evidence (2026-11-08)

- Original bundle built on Node 12, initial total 1.80 MB. Node 18 build failed with `ERR_OSSL_EVP_UNSUPPORTED`; no workaround was added. Sandbox font-inlining DNS failure was resolved by rerunning with network access.
- Clean `npm ci --strict-peer-deps` including ngcc passed on Node 12/npm 7 after UI alignment. After Codelyzer alignment, `npm ls --all --json` reports no dependency-tree errors. No `--force` / `--legacy-peer-deps` used for installation.
- Cleaned-up local production build passed, initial total 1.85 MB. Existing component style-budget warnings persist (ingredient-input 15.41 kB and edit-dish 17.45 kB). Bundle growth accompanies the compatible UI library releases.
- Browser suite: final **10/10 passed** (28.6 seconds) against the cleaned-up production bundle, including all four original login/list screenshots. The expiry fixture establishes a successful session before returning 401 on reload.
- Focused runtime-configuration Karma tests: **2/2 passed**, Node 12, ChromeHeadless, `--include=src/app/shared/services/environment-loader.service.spec.ts --source-map=false`.
- Legacy full suite: corrected imports allow compilation, but it fails on missing Router/ActivatedRoute providers (AlertService, ResetConfirm, ResetPassword observed), then Chrome disconnects after 3/27 failing tests. Other legacy fixtures are not certified; no tests have been skipped to hide failures. Temporary detailed log: `/private/tmp/listshop-unit-baseline.log`.
- Lint: fails with **2,314 errors / 17 warnings**, predominantly pre-existing style/deprecation issues; temporary log `/private/tmp/listshop-lint-final.log`. Codelyzer itself now declares compatible peers. The Angular 12 checkpoint includes ESLint migration; this is not a passing lint baseline.
- Final-state Linux Docker build-stage validation **passed** (exit 0), including clean strict-peer installation, ngcc, production compilation and font inlining. Local image: `listshop-angular11-preparation:local`, ID `5e050c429b7de4c72c3d4750c601204e5e05088c349c68dc5b7cf78342d6617d`. Log: `/private/tmp/listshop-docker-final.log`. No image was published or deployed. Nginx runtime stage is not validated yet.
- Old dependencies emit deprecation messages and a transitive `node-releases@2.0.57` Node >=18 engine warning under Node 12. Production compilation still passes; revisit the old builder's transitive tooling as Angular is upgraded.
- Graphify launcher is broken (deleted Python interpreter path); existing graph JSON was used directly. SharedModule is imported across the major feature modules. No graph rebuild/repair was attempted.

## Next checkpoint / unresolved work

1. Stop for user review of the preparation commit. All validation processes have finished. Nothing has been pushed, published or deployed.
2. Review desktop/mobile login/list screenshots and dependency alignment. Preparation exposes baseline exceptions; it does not assert all legacy tests or product journeys pass.
3. Before calling Angular 12 gates passed, resolve or explicitly agree how to handle existing unit-fixture and lint failures. Extend coverage for list edits, dishes/ingredients, meal-plan generation, reset submission and beta feedback; verify against a real backend. These remain unverified, as listed in `e2e/README.md`.
4. On explicit authorization, start only Angular 11 → 12, using the official adjacent-major guide and pinned compatible libraries. Stop again before Angular 13.
