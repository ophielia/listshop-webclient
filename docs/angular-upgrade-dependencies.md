# Dependency compatibility candidates

Generated from npm registry metadata by `scripts/angular-upgrade-audit.cjs`.
These are stable releases whose declared Angular core/common peer ranges accept the target.
They are candidates, not a solved installation: verify RxJS, Bootstrap, CDK, Node and package-specific migrations at each hop.
A missing candidate blocks that dependency until it is replaced or removed. Never bypass peer checks.

| Angular target | @angular/cdk | primeng | @ng-bootstrap/ng-bootstrap | ngx-logger | ngx-owl-carousel-o | ngx-page-scroll | ngx-page-scroll-core | ngx-spinner |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 11.2.14 | 11.2.13 | 12.2.3 | 9.1.3 | 5.0.3 | 5.1.2 | 7.0.6 | 7.0.6 | 11.0.2 |
| 12.2.17 | 12.2.13 | 12.2.3 | 10.0.0 | 5.0.3 | 6.0.3 | 7.0.6 | 7.0.6 | 12.0.0 |
| 13.4.0 | 13.3.9 | 13.4.1 | 12.1.2 | 5.0.3 | 7.0.5 | 8.0.0 | 8.0.0 | 13.1.1 |
| 14.3.0 | 14.2.7 | 14.2.3 | 13.1.1 | 5.0.3 | 14.0.2 | 9.0.0 | 9.0.0 | 15.0.0 |
| 15.2.10 | 15.2.9 | 15.4.1 | 14.2.0 | 5.0.3 | 15.0.2 | 10.0.0 | 10.0.0 | 17.0.0 |
| 16.2.12 | 16.2.14 | 16.9.1 | 15.1.2 | 5.0.3 | 16.0.1 | 11.0.0 | 11.0.0 | 17.0.0 |
| 17.3.12 | 17.3.10 | 18.0.2 | 16.0.0 | 5.0.3 | 17.0.1 | 12.0.0 | 12.0.0 | 17.0.0 |
| 18.2.14 | 18.2.14 | 18.0.2 | 17.0.1 | 5.0.3 | 18.0.1 | 14.0.0 | 14.0.0 | 18.0.0 |
| 19.2.25 | 19.2.19 | 19.1.4 | 18.0.0 | 5.0.3 | 20.0.0 | 14.0.1 | 14.0.1 | 19.0.0 |
| 20.3.35 | 20.2.14 | 20.4.0 | 19.0.1 | 5.0.3 | 20.1.1 | 15.0.1 | 15.0.1 | 22.0.1 |
| 21.2.26 | 21.2.14 | 21.1.10 | 20.0.0 | 5.0.3 | 21.0.3 | 17.0.0 | 17.0.0 | 22.0.1 |
| 22.2.5 | 22.2.6 | 22.1.4 | 21.0.0 | 5.0.3 | 22.0.0 | 17.0.0 | 17.0.0 | 22.0.1 |

## Angular 15 selected versions

Rechecked registry metadata at the Angular 15 checkpoint: core 15.2.10,
CLI/build tooling 15.2.11, CDK 15.2.9, angular-eslint 15.2.1,
PrimeNG 15.4.1, ng-bootstrap 14.2.0, carousel 15.0.2,
page-scroll/core 10.0.0 and spinner 15.0.1. Bootstrap 5.2.3,
Popper 2.11.8, TypeScript 4.8.4, RxJS 6 and Zone 0.11.8 remain compatible.
The spinner candidate table above is historical; 15.0.1 is the selected
Angular 15 release (15.0.0 declares Angular 14 peers).

The `node-releases` override pins 2.0.27 because the currently resolved 2.0.63
requires Node >=18. Version 2.0.27 stays within the requesting packages' 2.x
ranges and works with this checkpoint's Node 14.21.3. Revisit the override
when changing the Node checkpoint. Strict peer resolution is required.

Official references: [Angular version compatibility](https://angular.dev/reference/versions)
and [Angular 15 upgrade recommendations](https://github.com/angular/angular-update-guide/blob/main/src/app/recommendations.ts).

## Angular 16 selected versions

Rechecked registry metadata for core 16.2.12, CLI/build tooling 16.2.16,
CDK 16.2.14, angular-eslint 16.3.1, TypeScript ESLint 5.62.0,
TypeScript 4.9.5, Zone 0.13.3, PrimeNG 16.9.1, ng-bootstrap 15.1.2,
carousel 16.0.1, page-scroll/core 11.0.0 and spinner 16.0.2.
Node 18.19.1 / npm 10.2.4 are pinned. Bootstrap 5.2.3, Popper 2.11.8,
ESLint 7.32.0 and RxJS 6 are retained.

The historical logger 5.0.3 candidate above is insufficient for Angular 16:
[ngx-logger's changelog](https://github.com/dbfannin/ngx-logger/blob/master/CHANGELOG.md)
records Ivy support starting at 5.0.4. Selected 5.0.12 and verified partial-Ivy
metadata in its distributed module. All used Angular UI entry points also
contain Ivy declarations. Removed `postinstall: ngcc` because Angular 16
no longer supports it. The Node 14 `node-releases` override is removed on Node 18.

PrimeNG 16 selection events wrap the selected entity in `event.value`.
All three shared autocomplete templates now unwrap the value before calling
the existing application handlers, preserving direct tag/dish outputs and
the existing Enter-key selection path. Integration tests exercise all three
actual PrimeNG controls, plus the upgraded logger and error handler.

## Angular 17 selected versions

Core 17.3.12, CLI/build 17.3.17, CDK 17.3.10, TypeScript 5.4.5,
Zone 0.14.10, angular-eslint 17.5.3, TypeScript ESLint 7.11.0 and ESLint 8.57.0.
PrimeNG 17.18.15 declares Angular 17 **or 18** peers and retains the legacy
resource theme. Use it for both checkpoints; defer the PrimeNG 18 theme migration.
ng-bootstrap 16.0.0 targets Angular 17 and documents Bootstrap 5.3.2;
selected Bootstrap 5.3.3 / Popper 2.11.8. Carousel 17.0.1, page-scroll/core
12.0.0 and spinner 17.0.0 complete the strict-peer installation.
Node 18.19.1/npm 10.2.4, RxJS 6 and ngx-logger 5.0.12 retained.

PrimeNG 17 selects autocomplete options on mousedown. Updated the real-control
integration tests to dispatch that pointer event; entity/clearing assertions
remain unchanged. Added a real InputSwitch/Angular Forms test for toggling,
change-event values and disabled state used by lists/meal planning.

## Angular 18 selected versions

Core/CDK 18.2.14, CLI/build 18.2.21, angular-eslint 18.4.3,
ng-bootstrap 17.0.1, carousel 18.0.1, page-scroll/core **13.0.0** and
spinner 18.0.0. PrimeNG 17.18.15, Bootstrap 5.3.3, TypeScript 5.4.5,
Zone 0.14.10, TypeScript ESLint 7.11.0, ESLint 8.57.0, RxJS 6 and
ngx-logger 5.0.12 retained. Node 18.19.1 retained; npm updated to 10.9.4.

Pin page-scroll/core 13.0.0 specifically: it targets Angular 18 and publishes compiled entry points. The 14.0.0 tarballs advertise Angular 18 peers but ship unbuilt source without module/type entry points; 14.0.1 targets Angular 19.
Pin @typescript-eslint/types/utils 7.11.0 explicitly to satisfy angular-eslint
18's new peer dependencies with the existing parser/plugin family. Automatic
peer selection chose current 8.x packages with Node 20-only transitives.

npm 10.2.4 produced an inconsistent chokidar/readdirp lockfile even after a
full install. npm 10.9.4 supports Node 18, regenerated the lockfile and passed
clean strict-peer installation. Docker/CI/package engines now pin 10.9.4;
local commands use an isolated temporary npm installation or npx, preserving
the existing Node installation/default nvm alias.

Retaining PrimeNG 17 is deliberate: Angular 18 does not require PrimeNG 18,
and 17.18.15 declares compatible peers. Its separate theme migration remains
pending for a later library checkpoint. The browser builder remains in use;
the Angular CLI 18 optional application-builder migration is deferred.

## Angular 19 selected versions

Registry metadata rechecked for the requested Angular 19 checkpoint: core
19.2.25, CLI/build 19.2.27, CDK 19.2.19, angular-eslint 19.8.1,
ng-bootstrap 18.0.0, carousel 19.0.2, page-scroll/core 14.0.1,
spinner 19.0.0, PrimeNG/themes 19.1.4, TypeScript 5.7.3 and Zone 0.15.1.
TypeScript ESLint parser/plugin/types/utils are pinned together at 8.18.0
(Node 18 compatible). Karma 6.4.4 satisfies the new builder's ^6.4 peer.
Node 18.19.1/npm 10.9.4, ESLint 8.57.0, Bootstrap 5.3.3, RxJS 6 and
ngx-logger 5.0.12 retained. Clean strict-peer resolution/install and full
npm tree checks validate the selected set without bypass flags.

PrimeNG 17's peers stop at Angular 18. Adopted PrimeNG 19 and its matching
theme package together. Removed legacy resource CSS imports, configured a
light-only Lara-based preset with blue inputs and orange switches, migrated
InputSwitch to ToggleSwitch, and updated autocomplete/checked-option CSS
selectors. PrimeNG 19 selects autocomplete options on click; actual-control
tests keep their entity and clearing assertions. The application builder,
RxJS migration and standalone conversion remain separate work.

Official references: [Angular compatibility](https://angular.dev/reference/versions),
[Angular 19 update recommendations](https://github.com/angular/angular/blob/19.2.x/adev/src/app/features/update/recommendations.ts),
[PrimeNG migration](https://v19.primeng.org/guides/migration),
[PrimeNG theming](https://v19.primeng.org/theming).

## Angular 20 selected versions

Registry peers and official update guidance rechecked: core 20.3.35,
CLI/build 20.3.42, CDK 20.2.14, angular-eslint 20.7.0,
TypeScript 5.9.3 and TypeScript ESLint parser/plugin/types/utils 8.72.2.
PrimeNG 20.4.0, ng-bootstrap 19.0.1, carousel 20.1.1 and page-scroll/core
15.0.1. Retained spinner 19.0.0 (peers >=19), logger 5.0.12, Bootstrap
5.3.3, RxJS 6, Zone 0.15.1, ESLint 8.57.0 and Karma 6.4.4.

Node moves to the planned 24.15.0 runtime. npm 11.21.2 is isolated locally
and pinned in package engines, Docker and CI; no changes to installed nvm
runtimes/default alias. Initial npm 10 strict resolution failed around the
build tool's Vite/SSL plugin graph. npm 11 resolved a lockfile, but the full
tree check then exposed the old Node 12 type definitions as invalid for
Vite 7's optional peer. Aligned @types/node to 24.19.2 before repeating clean
installation/tree checks. No force or legacy-peer flags.

PrimeNG 20's shared theme implementation supports the existing Lara preset.
Replaced the deprecated @primeng/themes wrapper with @primeuix/themes 1.2.5
(the version required by the matching wrapper), updating only preset imports.
Retain blue fields, orange switches and light-only configuration. Existing
actual-control tests and desktop/mobile checks validate selection, filtering,
disabled state and overlay placement. PrimeNG 20 removed the autocomplete
`field` input; replaced it with `optionLabel="name"` in all three shared
controls and removed the duplicate dynamic bindings. The build/tests caught
unknown bindings and dish suggestions rendered as `[object Object]` before
this fix; output entity and clearing assertions remain unchanged.

Official references: [Angular compatibility](https://angular.dev/reference/versions),
[Angular 20 update recommendations](https://github.com/angular/angular/blob/20.3.x/adev/src/app/features/update/recommendations.ts),
[PrimeNG 20 migration](https://v20.primeng.org/migration/v20).
