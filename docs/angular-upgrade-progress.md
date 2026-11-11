# Angular upgrade progress

## Current checkpoint — Angular 18

**Angular 18 implementation and automated validation complete; stop for review before Angular 19.**

- Branch `chore/angular-upgrade`. Angular 17 intermediate checkpoint committed as `d41d9de` after all gates passed (including Docker). Both adjacent hops were authorized by the user's request to reach Angular 18. Stop for review before Angular 19.
- Core/CDK 18.2.14, CLI/build tooling 18.2.21, angular-eslint 18.4.3, ng-bootstrap 17.0.1, carousel 18.0.1, spinner 18.0.0, page-scroll/core 13.0.0. Retained PrimeNG 17.18.15, Bootstrap 5.3.3, TypeScript 5.4.5, Zone 0.14.10, ESLint 8.57.0, TypeScript ESLint 7.11.0, RxJS 6 and ngx-logger 5.0.12.
- Node 18.19.1 retained. npm **10.9.4** now pinned in engines, Docker and CI. Local npm is isolated at `/private/tmp/listshop-angular18-tools/node_modules/npm/bin/npm-cli.js`; use that with Node 18 or `npx --package npm@10.9.4 npm ...`. Existing nvm default/Node installation unchanged. Playwright remains on Node 24.15.0.
- npm 10.2.4 generated a chokidar/readdirp lockfile inconsistent with clean installation, including after a full install. npm 10.9.4 regenerated the tree and passed `npm ci --strict-peer-deps`. Explicit @typescript-eslint/types/utils 7.11.0 pins satisfy angular-eslint 18 peers and avoid npm choosing current 8.x dependencies with Node 20-only transitives. No force or legacy-peer flags.
- Page-scroll/core 14.0.0 advertises Angular 18 peers but publishes unbuilt source without module/types entry points. The build caught this; 13.0.0 targets Angular 18 and publishes compiled modules. Switched to 13.0.0 and repeated clean installation. The historical candidate matrix is not proof of runtime/package compatibility; selected versions are recorded in angular-upgrade-dependencies.md.
- Official installed CLI/core/CDK adjacent migrations completed with explicit previous/target versions, `--allow-dirty`, `NG_DISABLE_VERSION_CHECK=true` and noninteractive CI mode. CLI offered only the optional application-builder migration; deliberately skipped it. Core replaced HttpClientModule with `provideHttpClient(withInterceptorsFromDi())`, migrated HTTP test providers and adjusted HTTP imports. Invalid-binding/afterRender/server migrations required no application edits. CDK required no edits. NgModules and browser builder retained.
- Angular 18 removed the `async` testing alias. Updated imports/calls to `waitForAsync` in 16 generated specs so TypeScript can compile the maintained gate; their existing fixture/dependency failures remain an accepted baseline. Did not repair or claim the generated full suite passing.
- Browser mocks now assert login requests omit Authorization and authenticated shopping-list requests contain `Bearer upgrade-test-token`, validating the HTTP provider migration alongside existing session/reload/logout/expiry flows.
- PrimeNG 17 intentionally retained: it supports Angular 18 and preserves the resource theme. PrimeNG 18's separate theme migration, signals, standalone conversion, RxJS 7 and application-builder migration remain deferred.

### Angular 18 validation

- Final clean `npm ci --strict-peer-deps`: **passed**, no engine warnings. `npm ls --all --json`: **passed**, no dependency problems. Manifest/lockfile dependency and engine fields match.
- Correctness lint: **passed**. Maintained tests: **15/15 passed**, including runtime config, list generation, ingredient parsing, all three autocompletes, logger/error handling and InputSwitch.
- Final production build: **passed**, initial 1.71 MB / estimated transfer 362.42 kB. Existing style warnings now display edit-dish 18.02 kB, ingredient-input 15.92 kB (CLI 18 displays byte units differently). Existing invalid CSS/Sass diagnostics remain deferred; critical-CSS processing skips two `.form-floating>~label` rules.
- Development server: **compiled successfully**, root HTTP 200. Both contact assets returned HTTP 200 and exact source bytes. Server intentionally stopped after verification.
- Browser suite: **14/14 passed** in 36.4s. Original desktop/mobile login/list screenshots unchanged. Auth header assertions, session/reload/logout/expiry, navigation, carousel/scrolling, dropdowns and confirmation dialogs all pass.
- Docker build stage: **passed**, including clean strict-peer install with npm 10.9.4 and production build. Local image `listshop-angular18-checkpoint:local`, ID `b57f7a81df6631e01925ab470acf368dce966f6aa7d47efeaf25e092c850f323`.
- Logs: `/private/tmp/listshop-angular18-{resolution-final,ci-final,scroll-install,cli-migrations,core-migrations,cdk-migrations,lint-final,tests-final,build-final,serve-final,browser,docker-final}.log`; tree `...-tree.json` / `...-tree-errors.log`. Earlier failed attempts are preserved in the same directory without `-final` suffixes.

### Review / next action

Stop at Angular 18 for user review before Angular 19. Broader manual visual and real-backend acceptance remains outstanding: dishes/ingredients, meal-plan generation, password-reset submission, beta feedback and other forms/menus/alerts. Shared control integration checks do not cover full dish browser journeys. Nginx runtime-stage validation and deployment remain later checkpoints; remote CI not run and nothing pushed or deployed.

Before Angular 19, recheck TypeScript/Zone/UI dependencies. PrimeNG 17's peer range ends at Angular 18, so the next step needs a deliberate PrimeNG/theme migration and desktop/mobile visual review. Keep the application-builder migration separate from framework checkpoints.

Unrelated `.junie/`, API configuration and original screenshot baselines untouched. Graphify launcher remains broken; no graph rebuild attempted. Angular 17 modules/lockfile preserved at `/private/tmp/listshop-angular17-node_modules-before18` and `/private/tmp/listshop-angular17-lock-before18.json`; Git `d41d9de` is the durable fallback.

---

## Previous Angular 17 checkpoint

**Angular 17 automated validation complete.** User authorized both adjacent hops in this request; continue to Angular 18.

- Started from Angular 16 `e8a6020`, branch `chore/angular-upgrade`. Core 17.3.12, CLI/build 17.3.17, CDK 17.3.10, TypeScript 5.4.5, Zone 0.14.10, angular-eslint 17.5.3, TypeScript ESLint 7.11.0, ESLint 8.57.0. PrimeNG 17.18.15, ng-bootstrap 16.0.0, Bootstrap 5.3.3, carousel 17.0.1, page-scroll/core 12.0.0, spinner 17.0.0. Node 18.19.1/npm 10.2.4 and RxJS 6 retained.
- Selected PrimeNG 17 because its peers support both Angular 17 and 18. Retains the existing resource theme; the PrimeNG 18 theme migration remains separate. Bootstrap 5.3.3 aligns with ng-bootstrap 16's documented Bootstrap 5.3 support.
- Official installed CLI/core/CDK migrate-only commands completed with explicit adjacent versions, `--allow-dirty` and `NG_DISABLE_VERSION_CHECK=true`. CLI migrated browserTarget to buildTarget. Core escaped literal @ text in footer/reset confirmation templates. Retained NgModules, existing control-flow syntax and browser builder. No signals/standalone/builder conversion.
- Reviewed Angular 17 recommendations: no application NgSwitch, deep Zone imports, signals, hydration, dynamic ngDoCheck or removed router-option assignments requiring changes. Existing navigation checks pass with automatic component-style cleanup.
- PrimeNG now selects autocomplete options on mousedown; adapted actual-control tests to that event while keeping tag/dish output and clearing assertions. Added InputSwitch integration coverage for list/meal-plan toggles, change events and disabled behavior.
- Clean strict-peer install and `npm ls --all --json`: passed; manifest/lockfile match. No force or legacy-peer flags. Maintained tests: **15/15 passed**. Correctness lint: **passed**.
- Production build: **passed**, initial 1.62 MB / estimated transfer 352.22 kB. Existing style budgets: edit-dish 17.63 kB and ingredient-input 15.58 kB. Deferred CSS/Sass diagnostics remain; critical-CSS processing skips two `.form-floating>~label` rules.
- Development server: **compiled successfully**, root HTTP 200 and both contact assets returned exact source bytes. Verification server stopped.
- Browser suite: **14/14 passed** in 44.4s; original desktop/mobile screenshots unchanged, including Bootstrap 5.3. Broader manual and real-backend acceptance remains outstanding as previously documented.
- Docker build stage: **passed**, clean strict-peer install and production build. Local image `listshop-angular17-checkpoint:local`, ID `cd90da1596f060a07ac327e2f10555438fef8b3a8bca22b5226881e9fe1ff171`.
- Logs: `/private/tmp/listshop-angular17-{resolution,install,cli-migrations,core-migrations,cdk-migrations,lint-final,tests-final,build,serve,browser,docker}.log`; tree `...-tree.json` / `...-tree-errors.log`.
- Angular 16 modules/lockfile saved at `/private/tmp/listshop-angular16-node_modules-before17` and `/private/tmp/listshop-angular16-lock-before17.json`; Git `e8a6020` is the durable fallback. Unrelated `.junie/`, API configuration and baseline screenshots untouched. Nothing pushed or deployed; remote CI not run.

---

## Previous Angular 16 checkpoint

**Angular 16 implementation and automated validation complete; stop for review before Angular 17.**

- Branch `chore/angular-upgrade`; started from Angular 15 commit `af15f48`. User explicitly authorized Angular 16. Stop for review before Angular 17.
- Core 16.2.12, CLI/build tooling 16.2.16, CDK 16.2.14, angular-eslint 16.3.1, TypeScript ESLint 5.62.0, TypeScript 4.9.5, Zone 0.13.3. PrimeNG 16.9.1, ng-bootstrap 15.1.2, carousel 16.0.1, page-scroll/core 11.0.0, spinner 16.0.2, ngx-logger 5.0.12. Bootstrap 5.2.3, Popper 2.11.8, RxJS 6 and ESLint 7.32.0 retained.
- Node 18.19.1 / npm 10.2.4 pinned in `.nvmrc`, package engines, Docker and CI. Uses the existing ARM64 Node 18 installation and its bundled npm; no default nvm alias or installation changes. Playwright remains isolated on Node 24.15.0. Removed the Node 14 `node-releases` override. npm 10 regenerated the lockfile in version 3 format.
- Upgraded ngx-logger 4 to Ivy-compatible 5.0.12. Verified partial-Ivy declarations in the logger and used UI library entry points, including PrimeNG autocomplete/inputswitch. Removed `postinstall: ngcc`; clean installation/builds no longer need the removed compatibility compiler.
- Official installed CLI/core/CDK migrate-only commands ran with unversioned package names, explicit previous/target versions, `--allow-dirty` and `NG_DISABLE_VERSION_CHECK=true`. Core removed deprecated CanActivate imports/implements from the two guards; methods, routes and behavior remain unchanged. CLI/CDK required no file edits. Reviewed the Angular 16 recommendations for router events, removed APIs, module metadata and rendering; no other application compatibility changes required.
- Fixed a real PrimeNG 16 regression caught by the maintained tests: autocomplete `onSelect` now emits `{originalEvent, value}`. All three shared templates pass `$event.value` to their existing handlers. Direct Enter-key selection continues to pass tags directly. Application outputs remain tag/dish entities.
- Expanded the actual PrimeNG control tests to cover tag/inline-tag/dish pointer selection, tag/inline-tag Enter selection and unmatched text/cancel. Added real logger integration checks for ERROR filtering, console output without HTTP logging and authentication error alerts. Legacy generated specs remain excluded and unmaintained.

### Angular 16 validation

- Fresh lockfile resolution and final clean `npm ci --strict-peer-deps`: **passed**. No force or legacy-peer-deps flags. TypeScript ESLint aligned to angular-eslint's 5.62.0 dependencies for TypeScript 4.9 support, followed by another clean installation.
- `npm ls --all --json`: **passed**, no dependency problems. Manifest and lockfile engines/dependencies checked.
- Correctness lint: **passed**.
- Maintained tests: **14/14 passed**. Native ARM64 Node 18 starts Chrome normally; no temporary Chrome launcher override needed. Initial autocomplete failures exposed the selection-event regression; final tests preserve entity assertions. Updated test fixture completeness and drained new PrimeNG overlay timers.
- Final production build: **passed**, initial total 1.56 MB / estimated transfer 341.54 kB. Existing style-budget warnings: edit-dish 17.64 kB, ingredient-input 15.59 kB. Existing invalid CSS/Sass diagnostics remain deferred.
- Development server: **compiled successfully** on 127.0.0.1:4202; root HTTP 200. Both contact-default.png and color/color-4/contact.png asset URLs returned HTTP 200 and exact source bytes. Server stopped intentionally after verification.
- Playwright: **14/14 passed** in 50.7 seconds. All original desktop/mobile login/list screenshots match without baseline updates. Mocked auth/session/logout/expiry, navigation, carousel/scrolling/dropdowns and confirmation dialogs pass.
- Docker build stage: **passed**, including clean strict-peer installation and production build without ngcc. Local image `listshop-angular16-checkpoint:local`, ID `34e382b7b52dacfaee0b387b53b81c05669f85ac72bf55e6929181f2e0a7031d`.
- Logs: `/private/tmp/listshop-angular16-{resolution,install-final,eslint-install,cli-migrations,core-migrations,cdk-migrations,lint-final,tests-final,build-final,browser,serve,docker}.log`. Dependency tree: `...-tree.json`, errors: `...-tree-errors.log`.

### Review and next action

Stop before Angular 17 for user review. Broader manual visual and real-backend acceptance remain outstanding: dishes/ingredients, meal-plan generation, password-reset submission, beta feedback and other forms/menus/alerts. The shared autocomplete checks are component integration tests, not full dish browser journeys. Nginx runtime validation and deployment remain later checkpoints. Nothing pushed or deployed; remote CI has not run.

Retain Node 18.19.1 for Angular 17; recheck TypeScript, Zone and all UI dependencies, then run the adjacent-major migrations. Signals, standalone conversion, RxJS 7 and the application-builder migration remain separate work.

Unrelated `.junie/` remains untouched; API configuration and screenshot baselines unchanged. Graphify launcher still points to a deleted Python interpreter; no graph rebuild attempted. Angular 15 installation/lockfile preserved at `/private/tmp/listshop-angular15-node_modules-before16` and `/private/tmp/listshop-angular15-lock-before16.json`; Git `af15f48` is the durable fallback.

---

## Previous Angular 15 checkpoint

**Angular 15 implementation and automated validation complete; stop for review before Angular 16.**

- Branch: `chore/angular-upgrade`; started from Angular 14 commit `e5899c0`.
- The user explicitly requested Angular 15, authorizing continuation past the prior pause. This does not claim broader Bootstrap 5 visual acceptance.
- Core 15.2.10, CLI/build tooling 15.2.11, CDK 15.2.9, angular-eslint 15.2.1, PrimeNG 15.4.1, ng-bootstrap 14.2.0, carousel 15.0.2, page-scroll/core 10.0.0, spinner 15.0.1. Bootstrap 5.2.3, RxJS 6, Zone 0.11.8 and TypeScript 4.8.4 retained.
- Node 14.21.3 / npm 8.19.4 retained; Playwright remains isolated on Node 24.15.0. No default nvm alias changes. `node-releases` pinned to 2.0.27 because current 2.0.63 requires Node >=18; revisit at the Node 18 checkpoint.
- Official CLI/core/CDK migrate-only commands ran from the installed CLI with `NG_DISABLE_VERSION_CHECK=true`, unversioned package names, `--allow-dirty` and explicit previous/target versions. CLI removed obsolete `require.context` test discovery and set ES2022 / `useDefineForClassFields: false`. Core and CDK required no source edits. Reviewed Angular 15 recommendations for router options, keyframes, forms value accessors, iframe bindings and removed APIs; no additional application edits required.
- Added two integration tests using the actual PrimeNG autocomplete with Angular Forms: typing/filtering/selecting/clearing, and unmatched text/create affordance/cancel. Test setup focuses the input and drains overlay timers. These are included in `test:upgrade`; legacy generated specs remain excluded and unmaintained.

### Angular 15 validation

- Clean `npm ci --strict-peer-deps`: **passed**, including ngcc. Resolution used a fresh lockfile after npm hit the known stale-builder conflict; no force or legacy-peer-deps flags. The lockfile-only initial command reached postinstall without installed ngcc; final resolution used `--ignore-scripts`, followed by the full clean installation with scripts enabled.
- `npm ls --all --json`: **passed**, no dependency errors after removing the generated ngcc entry-point cache file that npm classified as extraneous.
- Correctness lint: **passed**.
- Maintained tests: **7/7 passed**. On this Apple Silicon Mac, Chrome inherited Rosetta from Node 14 and did not connect to Karma. Set `CHROME_BIN=/private/tmp/listshop-chrome-arm64`; that executable runs `/usr/bin/arch -arm64 "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" "$@"`. No repository launcher or CI changes needed.
- Production build: **passed**, initial total 1.62 MB / estimated transfer 354.32 kB. Existing component style budgets warn at edit-dish 17.60 kB and ingredient-input 15.55 kB. Existing Sass/CSS diagnostics remain deferred; index generation also reports a skipped `legend+*` selector.
- Development server: **compiled successfully** on 127.0.0.1:4202; root HTTP 200. Both `assets/images/contact-default.png` and `assets/images/color/color-4/contact.png` returned HTTP 200 and exact source bytes. Server stopped after verification.
- Playwright: **14/14 passed** in 1.3 minutes, including all original desktop/mobile login/list screenshots without baseline updates. Mocked auth/session/logout/expiry, navigation, carousel/scrolling/dropdowns and confirmation dialogs pass.
- Docker build stage: **passed**, local image `listshop-angular15-checkpoint:local`, ID `6bff1be8525bb9615aa41879d3390a09bde955d6ce1bd4131a4a94c92aeca6f3`. Includes clean strict-peer installation, ngcc and production build.
- Logs: `/private/tmp/listshop-angular15-{resolution-final,install-final,cli-migrations,core-migrations,cdk-migrations,lint-final,tests-final,build,browser,serve,docker}.log`; tree data in `...-tree.json` and errors in `...-tree-errors.log`.

### Review and next action

Review Angular 15 before authorizing Angular 16. Broader manual visual and real-backend acceptance remain outstanding: dishes/ingredients, meal-plan generation, password-reset submission, beta feedback and other forms/menus/alerts. Autocomplete now has component integration coverage, not a full dish browser journey. Nginx runtime validation and deployment remain later checkpoints. Nothing pushed or deployed; remote CI has not run.

Before Angular 16, move to the agreed Node 18.19.1 runtime, check Ivy support and upgrade/replace ngx-logger 4 (currently compiled by ngcc), then remove the ngcc postinstall only once all used libraries support Ivy. Recheck dependencies and run the adjacent-major migrations.

Unrelated `.junie/` remains untouched. API configuration, localStorage contracts and screenshot baselines unchanged. Graphify launcher remains broken due to a deleted Python interpreter; no graph rebuild attempted. Angular 14 installation and lockfile were preserved at `/private/tmp/listshop-angular14-node_modules-before15` and `/private/tmp/listshop-angular14-lock-before15.json`; Git `e5899c0` is the durable fallback.

---

## Previous Angular 14 checkpoint

**Angular 14 implementation and automated checks are complete; awaiting Bootstrap 5 visual review before Angular 15.**

- Branch: chore/angular-upgrade. Starting commit a1e5547 (validated Angular 13).
- Earlier checkpoints: Angular 12 c1b6f4b, casing fix 574dc84, local API settings 74499f7.
- Unrelated .junie/ remains untouched. API URLs remain localhost:8888; no config/environment edits.
- User accepts generated legacy component tests as a failing historical baseline. Gates are selected correctness lint, maintained tests, development/production builds, browser journeys and visual comparisons.

## Angular 14 changes

- Core 14.3.0, CLI/build tooling 14.2.13, CDK 14.2.7, TypeScript 4.8.4, angular-eslint 14.4.0, TypeScript ESLint 5.43.0. RxJS 6, ESLint 7.32.0 and Zone 0.11.8 retained.
- PrimeNG 14.2.3, carousel 14.0.2, page-scroll/core 9.0.0, spinner 14.0.0. Required UI transition: ng-bootstrap 13.1.1, Bootstrap 5.2.3 and @popperjs/core 2.11.8. Removed old popper.js and obsolete scoped Nx override; angular-eslint 14 builder no longer depends on Nx.
- Official CLI/core/CDK migrations completed. CLI updated target to ES2020. Core converted forms to UntypedFormBuilder/UntypedFormGroup/etc. to preserve existing behavior. NgModules and existing form semantics retained.
- CLI 14 migrate-only requires unversioned package names. Ran installed CLI/core/CDK migrations with NG_DISABLE_VERSION_CHECK=true to prevent CLI self-bootstrap beyond this checkpoint; dependency peer checks were never bypassed. Initial version-suffixed attempts did not run migrations and were followed by successful commands.
- Removed router initialNavigation 'enabled' alias; replaced with enabledBlocking after verifying that Angular 13 maps both values to the same implementation. Authentication/browser checks confirm preserved behavior.
- Migrated used Bootstrap directional utilities to start/end names and navbar data attributes to data-bs-*. Alert dismiss control is now a native Bootstrap 5 close button with an accessible label.
- Added _bootstrap-settings.scss and targeted global layout rules to preserve old container widths, 30px gutters, control radii, form-group spacing and navbar geometry. Disabled Bootstrap-native smooth scrolling because it interfered with ngx-page-scroll's existing animation. Retained original menu-icon sizing.
- Corrected legacy 'and(' media-query syntax rejected by the newer Sass compiler, and removed obsolete tilde imports from app.scss. Other existing CSS/Sass warnings were not broadly reformatted.
- Added desktop/mobile confirmation-dialog browser coverage: No cancels without a DELETE; Yes deletes through a mocked API and removes the card. No real backend data is modified by tests.

## Installation / toolchain

- Node 14.21.3 (Rosetta x64 on this Mac), npm 8.19.4 unchanged. Browser checks remain isolated on Node 24.15.0. Existing standalone nvm and default alias are preserved.
- Use nvm use, then npx --package npm@8.19.4 npm ci --strict-peer-deps. Temporary npm path used here: /private/tmp/listshop-upgrade-tools/node_modules/npm/bin/npm-cli.js.
- Prior majors repeatedly encountered stale builder resolution, so this checkpoint resolved all compatible versions jointly from a fresh lockfile and clean installation. Angular 13 lockfile/modules preserved at /private/tmp/listshop-angular13-package-lock.json-1794136089 and /private/tmp/listshop-angular13-node_modules-1794136089; Git a1e5547 is the durable fallback. No force/legacy-peer-deps flags used.
- Strict-peer resolution, clean install including ngcc and migration package updates passed. npm ls --all --json reports no tree errors; manifest/lockfile dependencies and engines match.
- Logs: /private/tmp/listshop-angular14-{resolution,install,cli-migrations,core-migrations,cdk-migrations,tree-errors}.log (tree JSON is ...-tree.json).

## Validation

- Lint: **passed** after all source changes; log /private/tmp/listshop-angular14-lint.log.
- Maintained tests: **5/5 passed**, log /private/tmp/listshop-angular14-tests.log.
- Final local production build: **passed**, initial total 1.50 MB, estimated transfer 329.79 kB (Angular 13: 1.58 MB). Existing style-budget warnings remain: edit-dish 17.71 kB, ingredient-input 15.67 kB. Existing invalid CSS declarations and Sass diagnostics remain deferred. Log /private/tmp/listshop-angular14-build.log.
- Browser suite: **14/14 passed** in 38.9 seconds. All four original Angular 11 login/list screenshots match, without updating baselines. Covers login, stored session/reload/logout, expiry, reset navigation, carousel, section scrolling, connect menu and deletion confirmation. Log /private/tmp/listshop-angular14-browser.log.
- Initial browser run exposed native smooth-scroll interference and a 1px mobile header shift. Compared computed dimensions with the local Angular 13 build: restored navbar outer padding, collapsed-container padding and icon background sizing. Final tests pass with the original images.
- Docker build stage: **passed**, clean strict-peer install, ngcc and production build. Local image listshop-angular14-checkpoint:local, ID d3431ea706b31fcb2fa0e8958d720a75a0d570dba18f0a9d8913058967b9b01d. Log /private/tmp/listshop-angular14-docker.log.
- Development server: **compiled successfully** on 127.0.0.1:4202. Both contact image URLs returned HTTP 200 and exact source-image bytes. Verification server stopped intentionally; log /private/tmp/listshop-angular14-serve.log.
- Temporary Angular 13/reference and Angular 14 static comparison servers on ports 4203/4201 were stopped. Reference assets extracted from the local Angular 13 image to /private/tmp/listshop-angular13-reference; no apps were published or deployed.

## Review / accepted limits

Bootstrap 5 needs user visual review before Angular 15. Automated screenshots cover login/list views only; manually inspect other forms, dropdowns, alerts and dialogs. Remaining integration/coverage gaps: real backend behavior, dish autocomplete, meal-plan generation, reset submission, beta feedback and broad visuals. The added dialog test uses mocked requests. See e2e/README.md.

Generated full unit fixtures remain unmaintained and are not declared passing. Maintained tests cover runtime configuration, generated list names and ingredient unit-size/marker parsing. Formatting and broad var/equality cleanup remain deferred. Nginx runtime-stage validation and deployment are later checkpoints. GitHub workflow has not run remotely; nothing pushed or deployed.

The prior Contact.png/contact.png development collision remains fixed by contact-default.png; verify both asset responses below. Graphify launcher remains broken (deleted Python interpreter); no graph repair/rebuild attempted.

## Resume / next action

1. Stop for user visual review of Bootstrap 5 forms, menus, alerts and dialogs. All validation processes are finished and temporary servers stopped. Find the Angular 14 checkpoint with git log; it is the commit containing this record.
2. Start Angular 14 → 15 only on explicit authorization. Retain Node 14.21.3/npm 8.19.4 unless target package requirements change; preserve the documented baseline exceptions and original screenshot comparisons.
