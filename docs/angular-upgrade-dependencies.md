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
