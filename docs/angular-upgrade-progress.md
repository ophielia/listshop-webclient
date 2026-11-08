# Angular upgrade progress

## Current checkpoint

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
