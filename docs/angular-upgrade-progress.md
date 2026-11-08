# Angular upgrade progress

## Current checkpoint

**Angular 12 implementation and automated checkpoint checks are complete; awaiting user review. Angular 13 has not started or been authorized.**

- Branch: `chore/angular-upgrade`.
- Preparation commit: `bb34f66`; starting application commit: `4db41f1`.
- Angular 12 checkpoint commit: use `git log -1` after committing this checkpoint. Existing unrelated untracked `.junie/` remains untouched.
- User approved a minimal correctness-focused ESLint migration. Generated legacy tests were never maintained; their existing failures are accepted as a baseline and are not upgrade gates.

## Angular 12 changes

- Core framework 12.2.17, CLI/build tooling 12.2.18, CDK 12.2.13, TypeScript 4.3.5, Zone 0.11.8, tslib 2.3.1.
- Compatible UI dependencies: PrimeNG 12.2.3, ng-bootstrap 10.0.0, carousel 6.0.3, spinner 12.0.0. The fresh lockfile also resolves allowed ranges to Bootstrap 4.6.2, ngx-logger 4.3.3, and jQuery 3.7.1. Bootstrap 5 migration is deferred.
- Official CLI, core and CDK migrations completed. CLI updated build defaults/options and Zone import paths. Framework/CDK migrations completed without additional source rewrites. Other upgraded UI packages do not declare ng-update migrations.
- TSLint/Codelyzer and their configs removed. `.eslintrc.json` uses explicit correctness rules with angular-eslint 12.7.0, ESLint 7.32.0 and TypeScript ESLint 4.28.2. No formatting preset or broad autofix was applied. Quotes, semicolons, whitespace, var/const and loose equality are deferred.
- Removed unused Codelyzer import from UserComponent and obsolete TSLint comments. Four scoped variable renames remove shadowing; a comma-expression assignment in DishService was split into equivalent assignments.
- Fixed two concrete bugs caught by lint: generated list names were overwritten by an assignment in a condition; UnitSize ingredient modifiers were skipped by a comma-separated switch label. Focused tests cover supplied/default list names and preservation of size/marker modifiers.
- Added `npm run test:upgrade`, selecting five maintained behavioral tests (runtime configuration, generated list payloads, ingredient modifiers). Full `npm test` still exposes legacy scaffolding failures; no fixtures were skipped to make it appear green.
- CI now gates lint and maintained tests as well as production build and browser smoke checks. The GitHub workflow has not run remotely. Docker build stage uses npm 8 and `--configuration production`.

## Toolchain and installation

- App: Node 12.22.12 (Rosetta x64 on this Mac), npm **8.19.4**, `.nvmrc` unchanged. Angular 12 explicitly accepts npm >=8; npm 7 failed resolution against the old builder and then selected incompatible modern wildcard ESLint peers.
- Existing standalone nvm 0.39.7 and shell config are unchanged. Node 18.19.1 remains the default; E2E package uses native Node 24.15.0. No Homebrew nvm installation.
- Use `nvm use`, then `npx --package npm@8.19.4 npm ci --strict-peer-deps`. Session commands use temporary npm at `/private/tmp/listshop-upgrade-tools/node_modules/npm/bin/npm-cli.js`; recreate it after a restart rather than relying on temporary files.
- The official updater wrote target versions but its npm 7 installation failed before migrations. npm 8 resolved a fresh v2 lockfile with strict peer checks, followed by successful clean installation including ngcc. No force/legacy-peer-deps flags were used.
- Old lockfile: Git `bb34f66:package-lock.json`, plus `/private/tmp/listshop-angular11-package-lock-1794121771.json`. The updater removed old node_modules before its failed install; there is no node_modules backup. Official migrations were subsequently run using explicit package targets and `--migrate-only` with the original from-versions.
- `npm ls --all --json` reports no dependency-tree errors. Fresh historical dependencies emit deprecation notices and engine warnings for tmp 0.2.7 (Node >=14.14) and node-releases 2.0.63 (Node >=18); final build/test outcomes determine current practical compatibility. Do not install unbounded new packages into this historical toolchain.

## Validation

- Clean strict-peer installation: passed. Manifest and lockfile dependency/engine metadata match.
- `npm run lint`: **passed**, no lint errors/warnings.
- `npm run test:upgrade`: **5/5 passed** in ChromeHeadless under Node 12.
- Local production build: **passed** after removing an unused Codelyzer import. Initial total 2.13 MB (prepared Angular 11: 1.85 MB). Existing style-budget warnings and newer Sass/CSS diagnostic warnings remain. Log: `/private/tmp/listshop-angular12-build.log`.
- Docker build stage: **passed**, including clean strict-peer installation, ngcc and production compilation. Image `listshop-angular12-checkpoint:local`, ID `64dc384c38288f46771a4308f25c73827022afa955040baf7482c02c2fa8e5bd`. Log: `/private/tmp/listshop-angular12-docker.log`.
- Angular 12 browser suite: **10/10 passed** in 25.4 seconds, including all four original Angular 11 desktop/mobile login/list screenshot comparisons. No baselines were changed. Log: `/private/tmp/listshop-angular12-browser.log`.
- Temporary migration logs: `/private/tmp/listshop-angular12-cli-migrations.log`, `...-core-migrations.log`, `...-cdk-migrations.log`. All three have successful completion output.

## Earlier preparation and known limits

Preparation removed unused Universal support, retained browser/Nginx deployment, saved the version compatibility candidate matrix and added isolated Playwright checks. Its production and Docker build-stage checks passed; 10 browser tests and 2 focused runtime-config tests passed. Four screenshots (login/lists, desktop/mobile) were captured from the original Angular 11 bundle and matched the prepared bundle.

The generated full unit suite originally failed on nonexistent component imports. After those imports were corrected it compiled, then reported missing Router/ActivatedRoute providers and Chrome disconnected after 3/27 failures. The user confirmed these tests were generated and unmaintained. Earlier TSLint reported 2,314 errors/17 warnings; this has been replaced with the passing selected-rule configuration, not a wholesale formatting rewrite.

Broader acceptance remains unverified: real backend integration, list editing/deletion, dish autocomplete, meal-plan generation, reset submission, beta feedback and landing-page visuals. See `e2e/README.md`. Nginx runtime-stage validation and production deployment remain later checkpoints. Nothing has been pushed, published or deployed.

Graphify's CLI launcher points at a deleted Python interpreter; preparation read the existing graph directly. No graph rebuild/repair was attempted.

## Resume / next action

1. Stop for user review of Angular 12 and the two lint-discovered bug fixes. All validation processes have finished.
2. Manual product checks remain useful: list generation with a chosen name, ingredient quantities/modifiers, dishes, meal plans and beta flows. Broader gaps are listed above and in e2e/README.md.
3. Resume only after user authorization for Angular 12 → 13. Node 14.21.3 will be needed under the planned toolchain route; it is not installed yet. Read this record and inspect Git before executing migrations.

## Follow-up: development asset casing collision

User reported ng serve failing on Contact.png vs contact.png. The default image and color-4 image are distinct files, flattened by development stylesheet resource emission; production output hashing had hidden the collision. Renamed src/assets/images/Contact.png to contact-default.png and updated its SCSS variable reference. Added a development build to CI and future checkpoint checks. Verification ng serve on 127.0.0.1:4202 compiled successfully. HTTP checks confirmed both emitted images return 200 and exactly match their distinct source bytes (19,283 and 49,930 bytes). The verification server was stopped (exit 130 from intentional Ctrl-C). Log: /private/tmp/listshop-angular12-serve.log. User's src/environments/environment.ts change (API port 8888) and .junie/ remain untouched.
