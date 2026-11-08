# Tovo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Upgrade checkpoint toolchain

The Angular upgrade is tracked in [the plan](docs/angular-upgrade-plan.md) and
[the progress record](docs/angular-upgrade-progress.md). The current checkpoint
is Angular 11 preparation; Angular 12 has not started.

Use the existing nvm installation (no Homebrew nvm required):

```sh
nvm use
npx --package npm@7.24.2 npm ci
npx --package npm@7.24.2 npm start
```

`.nvmrc` selects Node 12.22.12 for this historical checkpoint. On Apple Silicon,
this version runs through Rosetta. Keep it isolated to the migration; the final
toolchain will move forward with Angular. Browser checks use a separate Node 24
toolchain; see [e2e instructions](e2e/README.md).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

See [browser regression checks](e2e/README.md) for Playwright setup and commands.
The application is deployed as browser assets through Nginx; unused Universal
server rendering has been removed.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
# nextgen
