# Angular upgrade plan

## Agreed direction

Upgrade Angular 11 through each major to Angular 22, selecting stable patch releases at implementation time. Preserve UI behavior, REST contracts, routes, JWT handling, and the `currentUser` localStorage contract. Remove unused SSR support and keep the browser/Nginx deployment. Defer signals, standalone conversion, and redesign.

## Checkpoints and review

1. Preparation: reproduce baseline, document failures, map dependency compatibility, remove unused SSR, add browser smoke coverage and capture desktop/mobile screenshots.
2. Angular 12, then 13, 14, 15, 16, 17, 18, 19, 20, 21, 22: one validated commit/PR per major. Stop for user review before starting the next major.
3. Explicit visual review at Bootstrap 5 and PrimeNG theme migrations; pause for product decisions if a replacement materially changes behavior.
4. Final staging acceptance: actual Docker image, runtime configuration, routing, assets, and backend integration. Production deployment requires explicit authorization; retain the old image for rollback.

Within an authorized checkpoint, resolve routine compatibility problems autonomously. Never mark a failed checkpoint complete. Preparation is committed as bb34f66. Angular 14 automated checks are complete, including Bootstrap 5 compatibility work; stop for visual review before Angular 15.

## Implementation constraints

- Use Angular's update guide for each adjacent major and run the framework/CLI migrations together. Align CDK and third-party peer dependencies; do not bypass conflicts using `--force` or `--legacy-peer-deps`.
- Pin checkpoint Node/npm versions and commit the lockfile. Use temporary historical runtimes for early steps. Keep the existing standalone nvm installation and default Node unchanged; do not add Homebrew nvm.
- Replace TSLint/Codelyzer with angular-eslint and obsolete Protractor configuration with Playwright at the Angular 12 checkpoint.
- Migrate Bootstrap styles when the selected ng-bootstrap version requires Bootstrap 5. Remove `postinstall: ngcc` when crossing Angular 16, after checking all used libraries support Ivy.
- Migrate the application builder separately after a framework checkpoint passes; adjust Sass imports and Docker output paths. Migrate PrimeNG's legacy resource theme when adopting v18.
- Keep RxJS 6 initially; migrate to 7 separately once dependencies permit. Remove rxjs-compat only after checking application and dependency usage.

## Validation

Every major: clean installation, development build/server startup, production build, maintained unit tests, lint, smoke tests, and visual comparison. Cover login/logout/session expiry, protected routes, password flows, list editing, dishes/ingredients, meal planning, generated shopping lists, shared autocomplete/dialogs/loaders, landing carousel/scrolling, and beta feedback. Compare desktop and mobile layouts. Baseline failures must be documented separately from regressions.

Preparation supplies initial browser coverage, not full product acceptance. Remaining workflows are listed in `e2e/README.md`; expand coverage alongside each affected subsystem. The user confirmed that legacy generated component tests were never maintained. Their known failures remain documented and are not upgrade gates. Passing gates are the production build, new browser checks, focused meaningful unit tests, and the new lint configuration. Expand coverage as affected features are upgraded.

Toolchain route (check exact target minor requirements before every hop): Node 12.22.12 for Angular 11–12; Node 14.21.3 for 13–15; existing Node 18.19.1 for 16–19; Node 24.15.0 for 20–22. Node 14.21.3 is installed for Angular 13–15. Use a supported npm for each checkpoint and preserve lockfile reproducibility. Current checkpoint npm is 8.19.4, invoked through a temporary tool installation or `npx --package npm@8.19.4 npm ...` after `nvm use`.

The Playwright package is isolated in `e2e/` on Node 24.15.0 and uses installed Chrome. Keep current Playwright outside the app's historical dependency tree. Candidate versions and peer-range evidence are saved in `docs/angular-upgrade-dependencies.md` and `.json`; recheck package APIs and the other peer ranges before selecting a future version. The matrix deliberately reports candidates rather than promising runtime compatibility from peer metadata alone.

## Pause and resume

Update `docs/angular-upgrade-progress.md` at each pause/checkpoint with Git state, exact runtime, commands/results, pending decisions and next action. Preserve unrelated changes. Identify incomplete work explicitly.

Resume prompt:

> Resume the Angular upgrade. Read docs/angular-upgrade-plan.md and docs/angular-upgrade-progress.md, inspect actual Git state, and continue the current checkpoint. Stop for my review before starting the next major.

After a crash, reconcile Git and the installed toolchain with the record before repeating commands. A resumed conversation is convenient; these repository documents are the durable handoff.

## References

- https://angular.dev/reference/releases
- https://angular.dev/reference/versions
- https://angular.dev/update-guide
- https://angular.dev/tools/cli/build-system-migration
- https://v18.primeng.org/guides/migration

## Agreed lint policy

Replace TSLint/Codelyzer with version-matched angular-eslint at Angular 12. Start with explicitly selected correctness rules, fix meaningful findings with behavior review, and defer stylistic enforcement. Do not auto-change loose equality or var scoping across the app. Do not enable a large recommended preset merely to disable its findings afterward. Keep pre-existing generated tests visible as legacy failures; do not spend this upgrade repairing creation-only scaffolding or silently mark the full suite green.
