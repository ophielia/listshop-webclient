# Angular upgrade progress

## Current checkpoint

**Angular 13 implementation and automated checkpoint checks are complete; awaiting user review. Angular 14 has not started or been authorized.**

- Branch: `chore/angular-upgrade`.
- Starting commit: `74499f7` (user committed local API port changes).
- Angular 13 checkpoint is the commit containing this record; find it with git log.
- Earlier checkpoints: preparation `bb34f66`, Angular 12 `c1b6f4b`, development asset collision fix `574dc84`.
- Existing unrelated `.junie/` is untouched. API configuration remains `http://localhost:8888/`.
- User accepts generated legacy component tests as an unmaintained failing baseline. Upgrade gates use maintained tests, explicit correctness lint rules, development server/build, production build and browser checks.

## Angular 13 implementation

- Framework 13.4.0, CLI/build tooling 13.3.11, CDK 13.3.9, TypeScript 4.6.4, angular-eslint 13.5.0, TypeScript ESLint 5.27.1. ESLint 7.32.0, RxJS 6 and Zone 0.11.8 retained.
- UI updates: PrimeNG 13.4.1, ng-bootstrap 11.0.1, carousel 7.0.5, page-scroll/core 8.0.0, spinner 13.1.1. Chose ng-bootstrap 11 rather than 12 to retain Bootstrap 4.6.2 and defer Bootstrap 5 migration/visual review. No application behavior rewrite intended.
- Official CLI/core/CDK 12→13 migrations completed. CLI removed classlist/web-animations dependencies and imports for unsupported IE, removed extractCss, and ignored .angular/cache. Core migration explicitly preserves old TestBed teardown behavior. CDK migration completed without additional app edits.
- Added .angular to .dockerignore so the CLI's new disk cache is not copied into build images.
- Added a desktop/mobile browser journey checking landing carousel initialization, section scrolling and the connect dropdown, because those libraries changed. Existing four login/list screenshots remain unchanged.
- Scoped npm override: nx@13.1.3 → @nrwl/cli 13.1.3. angular-eslint builder pins devkit 13.1.3, which pulls Nx 13.1.3 with a wildcard CLI dependency. Fresh resolution otherwise selected CLI/Nx 15.9.3 and a Yarn parser requiring Node 18. The scoped override keeps this internal tooling consistent and removes that parser; revisit/remove when lint tooling changes at a later checkpoint.

## Toolchain / installation

- App Node 14.21.3 (x64 under Rosetta), npm 8.19.4. .nvmrc, engines, Docker and CI updated. Node was added through existing standalone nvm, download checksum verified; shell configuration and default Node alias were not changed. Browser tests remain isolated on native Node 24.15.0 in e2e/.
- Use `nvm use`, then `npx --package npm@8.19.4 npm ci --strict-peer-deps`. Current session uses temporary npm at /private/tmp/listshop-upgrade-tools/node_modules/npm/bin/npm-cli.js; recreate it if missing after restart.
- The official updater selected target versions but its install stopped against the old Angular 12 builder in the lockfile before migrations. Old lockfile is preserved at /private/tmp/listshop-angular12-package-lock-1794130904.json and in Git 74499f7. The updater removed old node_modules. Resolved a fresh lockfile and installed cleanly with strict peer checks; no force/legacy-peer-deps flags.
- Ran official migrate-only with explicit package targets after installing: CLI from 12.2.18 to 13.3.11; core from 12.2.17 to 13.4.0; CDK from 12.2.13 to 13.3.9. Logs are /private/tmp/listshop-angular13-{cli,core,cdk}-migrations.log. Other upgraded UI packages do not declare migrations.
- `npm ls --all --json` reports no dependency-tree errors. Historical dependencies still emit deprecation notices and node-releases engine warnings; record practical validation below.

## Validation

- Strict-peer resolution and clean install including ngcc: passed. A subsequent install applied the scoped Nx override, followed by CLI migration dependency cleanup.
- Lint: **passed** after migrations; log /private/tmp/listshop-angular13-lint.log.
- Maintained tests: **5/5 passed** in ChromeHeadless on Node 14. Log /private/tmp/listshop-angular13-tests.log.
- Development server: **compiled successfully** on 127.0.0.1:4202. Both contact-default.png and contact.png returned HTTP 200 and exact source-image bytes. Verification server was stopped intentionally; log /private/tmp/listshop-angular13-serve.log.
- Docker build stage: **passed**, including clean strict-peer installation, ngcc and production compilation. Local image listshop-angular13-checkpoint:local, ID e4d7972e32fa4393715e012e4279608e53c59a757df267768c61e2b5b8010408. Log /private/tmp/listshop-angular13-docker.log.
- Local production build: **passed**, initial total 1.58 MB (Angular 12: 2.13 MB), estimated transfer 334.22 kB. Existing component style-budget warnings remain (edit-dish 17.71 kB, ingredient-input 15.67 kB), along with Sass/CSS warnings. Log /private/tmp/listshop-angular13-build.log.
- Browser suite: **12/12 passed** in 32 seconds, including desktop/mobile landing carousel/scrolling/connect checks and all four original Angular 11 screenshot comparisons. No screenshot baselines changed. Log /private/tmp/listshop-angular13-browser.log.
- Nothing pushed, published or deployed; GitHub workflow has not run remotely. No Angular 14 work has started.

## Accepted baseline / remaining limits

Generated full unit fixtures are not functional and are not an upgrade gate. The maintained suite covers runtime configuration, preservation/defaulting of generated list names and ingredient unit-size/marker parsing. Original TSLint was replaced by selected correctness checks; formatting, var/const and loose equality cleanup remain deferred.

Earlier Angular 12 checks passed: five maintained tests, ten browser checks, four original screenshot comparisons, development server/asset checks and production/Docker build stage. The earlier casing collision between distinct Contact.png/contact.png assets was fixed by renaming the default image to contact-default.png. Keep that fix and verify both resource responses during this checkpoint.

Broader acceptance remains unverified: real backend integration, list editing/deletion, dish autocomplete, meal-plan generation, reset submission, beta feedback and broad visuals. The new landing journey adds functional coverage, not a complete redesign/visual audit. See e2e/README.md. Full Nginx runtime-stage validation and production deployment remain later checkpoints.

Graphify launcher points at a deleted Python interpreter. Earlier architecture analysis used the existing graph JSON; no graph repair/rebuild was attempted.

## Resume / next action

1. Stop for user review of Angular 13. All validation processes have finished; the temporary development server is stopped.
2. For manual checks, run nvm use (Node 14.21.3) before starting ng serve. API settings still point to localhost:8888. Review key list/dish/meal-plan flows; remaining coverage gaps are listed above.
3. Start Angular 13 → 14 only on explicit authorization. Keep Node 14/npm 8 unless target package requirements change; reassess ng-bootstrap/Bootstrap compatibility and plan the explicit Bootstrap 5 visual checkpoint when required. Preserve the scoped Nx override only while Nx 13.1.3 remains in the graph.
