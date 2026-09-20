# Graph Report - listshop-webclient  (2026-09-20)

## Corpus Check
- 226 files · ~310,170 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1845 nodes · 3955 edges · 124 communities (88 shown, 26 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 146 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3bd8e990`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- authentication.service.ts
- package.json
- EditListComponent
- AlertService
- dependencies
- EditIngredientInlineComponent
- @angular/core
- home.module.ts
- ManageDishesComponent
- AuthenticationService
- feedback.service.ts
- user.module.ts
- app.module.ts
- IngredientInputComponent
- EditPlanComponent
- edit-list.component.ts
- shoppingList.ts
- AddDishToPlanComponent
- devDependencies
- Ingredient
- beta-campaign.module.ts
- EditDishComponent
- TagTreeService
- CelebrationService
- Dish
- compilerOptions
- EnvironmentLoaderService
- ManageMealPlansComponent
- scripts
- MealPlanService
- @angular/common
- manage-dishes.component.ts
- list.service.ts
- ErrorType
- SignUpComponent
- CreateTagDialogComponent
- Technical Design
- compilerOptions
- ListService
- LandingFixService
- production
- UserModule
- DishService
- food.service.ts
- legend.service.ts
- ILegacyShoppingList
- manage-lists.component.ts
- PasswordTokenComponent
- prerender
- Token
- IAmount
- Proposed Changes
- ITag
- architect
- options
- DishContext
- SingleDishElementComponent
- TagSelectInlineComponent
- TagSelectComponent
- Changelog - The List Shop - Web Client
- [0.0.1] - February 2022
- Tovo
- FooterComponent
- .isValid
- app.server.module.ts
- server.ts
- PlanContext
- XLModalComponent
- AddDishComponent
- SingleListElementComponent
- AGENTS.md
- LoginComponent
- lint
- tsconfig.server.json
- SinglePlanElementComponent
- OperationType
- GenerateListComponent
- ChangePasswordComponent
- tovo
- TokenType
- PlanDishElementComponent
- ModalComponent
- ResetPasswordComponent
- angular.json
- tsconfig.spec.json
- HomeThreeComponent
- tsconfig.app.json
- e2e
- tslint.json
- [0.0.0] template - date
- [2.2.0] June 2022
- shared.module.ts
- ListShopTokenInterceptor
- [2.3.0] June 2022
- [2.5.1] July 2023
- ISuggestion
- MealPlansComponent
- TokenGatewayComponent
- pace.min.js
- [2.1.0] April 2022
- ContactForm
- ListShopError
- [2.4.4] January 2023
- tag-select-type.ts
- environment.prod.ts
- test.ts
- [2.4.6, 2.4.7] May 2023
- [2.4.8] June 2023
- [2.4.9] June 2023
- [2.5.0] July 2023
- [2.6.0] July 2024
- [2.6.1] March 2025
- [2.0.1] April 2022
- [2.5.3] July 2023

## God Nodes (most connected - your core abstractions)
1. `@angular/core` - 109 edges
2. `AuthenticationService` - 65 edges
3. `ITag` - 55 edges
4. `EditListComponent` - 54 edges
5. `@angular/router` - 52 edges
6. `EditIngredientInlineComponent` - 51 edges
7. `LandingFixService` - 49 edges
8. `ListService` - 47 edges
9. `ManageDishesComponent` - 44 edges
10. `Dish` - 43 edges

## Surprising Connections (you probably didn't know these)
- `AddDishIngredientComponent` --references--> `Dish`  [EXTRACTED]
  src/app/dishes/add-dish/add-dish-ingredient.component.ts → src/app/model/dish.ts
- `AddDishIngredientComponent` --references--> `TagType`  [EXTRACTED]
  src/app/dishes/add-dish/add-dish-ingredient.component.ts → src/app/model/tag-type.ts
- `AddDishComponent` --references--> `Dish`  [EXTRACTED]
  src/app/dishes/add-dish/add-dish.component.ts → src/app/model/dish.ts
- `AddDishComponent` --references--> `ITag`  [EXTRACTED]
  src/app/dishes/add-dish/add-dish.component.ts → src/app/model/tag.ts
- `AddDishComponent` --references--> `Tag`  [EXTRACTED]
  src/app/dishes/add-dish/add-dish.component.ts → src/app/model/tag.ts

## Import Cycles
- None detected.

## Communities (124 total, 26 thin omitted)

### Community 0 - "authentication.service.ts"
Cohesion: 0.07
Nodes (23): AuthorizePost, IAuthorizePost, ChangePasswordPost, IChangePasswordPost, CreateListPost, ICreateListPost, CreateUserPost, CreatUserStatus (+15 more)

### Community 1 - "package.json"
Cohesion: 0.04
Nodes (48): name, private, version, @angular/animations, @angular/cdk, @angular/cli, @angular/compiler, @angular/compiler-cli (+40 more)

### Community 2 - "EditListComponent"
Cohesion: 0.09
Nodes (6): EditListComponent, Component, ViewChild, Category, IShoppingList, ShoppingList

### Community 3 - "AlertService"
Cohesion: 0.07
Nodes (18): Alert, AlertType, Error, Info, Success, Warning, AlertComponent, Component (+10 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (39): dependencies, @angular/animations, @angular/cdk, @angular/common, @angular/compiler, @angular/core, @angular/forms, @angular/localize (+31 more)

### Community 5 - "EditIngredientInlineComponent"
Cohesion: 0.10
Nodes (4): EditIngredientInlineComponent, Component, Input, Output

### Community 6 - "@angular/core"
Cohesion: 0.16
Nodes (9): @angular/core, @angular/platform-browser, @angular/router, MealPlansModule, NgModule, MealPlansRoutingModule, routes, NgModule (+1 more)

### Community 7 - "home.module.ts"
Cohesion: 0.06
Nodes (24): @ng-bootstrap/ng-bootstrap, AboutmeComponent, Component, AnonymousBetaTestComponent, Component, PartyComponent, Component, AboutComponent (+16 more)

### Community 8 - "ManageDishesComponent"
Cohesion: 0.10
Nodes (3): ManageDishesComponent, Component, ViewChild

### Community 9 - "AuthenticationService"
Cohesion: 0.07
Nodes (11): ContentHeaderComponent, Component, Inject, Component, UserHeaderComponent, HeaderComponent, Component, HostListener (+3 more)

### Community 10 - "feedback.service.ts"
Cohesion: 0.14
Nodes (9): CampaignFeedbackDialogComponent, Component, Output, CampaignFeedback, ICampaignFeedback, IItemOperationPut, ItemOperationPut, IItemSource (+1 more)

### Community 11 - "user.module.ts"
Cohesion: 0.23
Nodes (9): @angular/forms, ngx-spinner, EmailValidator, PasswordValidator, ResetConfirmComponent, Component, routes, NgModule (+1 more)

### Community 12 - "app.module.ts"
Cohesion: 0.10
Nodes (15): rootRouterConfig, DishesComponent, Component, DishesModule, NgModule, HomeComponent, Component, ListsComponent (+7 more)

### Community 13 - "IngredientInputComponent"
Cohesion: 0.12
Nodes (10): EntryEvent, IEntryEvent, IngredientInputComponent, Component, HostListener, Input, Output, ViewChild (+2 more)

### Community 14 - "EditPlanComponent"
Cohesion: 0.13
Nodes (3): EditPlanComponent, Component, ViewChild

### Community 15 - "edit-list.component.ts"
Cohesion: 0.30
Nodes (11): ngx-logger, rxjs, IIngredient, TagType, ContentType, All, Direct, GroupType (+3 more)

### Community 16 - "shoppingList.ts"
Cohesion: 0.17
Nodes (7): IListOfShoppingLists, INestedShoppingList, ListOfShoppingLists, ListSelectComponent, Component, Input, Output

### Community 18 - "devDependencies"
Cohesion: 0.08
Nodes (25): devDependencies, @angular/cli, @angular/compiler-cli, @angular-devkit/build-angular, @angular/language-service, @angular/platform-browser-dynamic, codelyzer, jasmine-core (+17 more)

### Community 19 - "Ingredient"
Cohesion: 0.13
Nodes (4): AddDishIngredientComponent, Component, ViewChild, Ingredient

### Community 20 - "beta-campaign.module.ts"
Cohesion: 0.08
Nodes (19): BetaCampaignModule, NgModule, LandingRoutingModule, routes, NgModule, LandingComponent, Component, LandingPartyComponent (+11 more)

### Community 21 - "EditDishComponent"
Cohesion: 0.13
Nodes (3): EditDishComponent, Component, ViewChild

### Community 22 - "TagTreeService"
Cohesion: 0.13
Nodes (6): ITagList, TagList, TagService, Injectable, TagTreeService, Injectable

### Community 23 - "CelebrationService"
Cohesion: 0.06
Nodes (16): Directive, canvas-confetti, MainPitchComponent, Component, ViewChild, Celebration, ICelebration, CelebrationComponent (+8 more)

### Community 24 - "Dish"
Cohesion: 0.06
Nodes (29): MealplanSelectComponent, Component, Input, Output, Dish, DishList, IDish, IDishList (+21 more)

### Community 25 - "compilerOptions"
Cohesion: 0.25
Nodes (7): compilerOptions, module, outDir, target, types, extends, ../tsconfig.json

### Community 26 - "EnvironmentLoaderService"
Cohesion: 0.07
Nodes (15): initAppConfig(), BetaTestComponent, Component, ViewChild, EnvConfig, IUserPropertiesPost, UserPropertiesPost, IUserProperty (+7 more)

### Community 28 - "scripts"
Cohesion: 0.11
Nodes (19): scripts, build, build:client-and-server-bundles_bak, build:ssr, build:ssr_bak, build:ssrr, compile:server_bak, dev:sass (+11 more)

### Community 30 - "@angular/common"
Cohesion: 0.12
Nodes (11): @angular/common, ListShopHeaderComponent, Component, Inject, browserWindowProvider, BrowserWindowRef, Injectable, WINDOW (+3 more)

### Community 31 - "manage-dishes.component.ts"
Cohesion: 0.28
Nodes (8): DishSort, SortDirection, Down, Up, SortKey, CreatedOn, LastUsed, Name

### Community 32 - "list.service.ts"
Cohesion: 0.13
Nodes (7): IListAddProperties, ListAddProperties, IListGenerateProperties, ListGenerateProperties, IShoppingListPut, ShoppingListPut, ListShopUtils

### Community 33 - "ErrorType"
Cohesion: 0.12
Nodes (13): ErrorType, badVerificationMatch, cantHaveSpaces, EmailNotFound, emailTaken, generalError, InvalidEmail, isRequired (+5 more)

### Community 35 - "CreateTagDialogComponent"
Cohesion: 0.17
Nodes (4): CreateTagDialogComponent, Component, Input, Output

### Community 36 - "Technical Design"
Cohesion: 0.11
Nodes (18): Architecture Diagram, Backend (`listshop-api`), Current Implementation, Delivery Steps, File Structure, Key Decisions, Key Scenarios, Overview & Goals (+10 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compileOnSave, compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, emitDecoratorMetadata, experimentalDecorators, lib (+9 more)

### Community 39 - "LandingFixService"
Cohesion: 0.12
Nodes (3): LandingFixService, Inject, Injectable

### Community 40 - "production"
Cohesion: 0.13
Nodes (15): production, aot, browserTarget, budgets, buildOptimizer, devServerTarget, extractCss, extractLicenses (+7 more)

### Community 43 - "food.service.ts"
Cohesion: 0.18
Nodes (4): AddIngredientInlineComponent, Component, FoodService, Injectable

### Community 44 - "legend.service.ts"
Cohesion: 0.20
Nodes (8): ApiLegendSource, ILegendSource, ILegendIconSource, LegendIconSource, ILegendPoint, LegendPoint, LegendService, Injectable

### Community 45 - "ILegacyShoppingList"
Cohesion: 0.15
Nodes (8): ILegacyCategory, LegacyCategory, ILegacyItem, LegacyItem, ILegacyShoppingList, LegacyShoppingList, ILegacyLegendSource, LegendSource

### Community 46 - "manage-lists.component.ts"
Cohesion: 0.24
Nodes (3): ManageListsComponent, Component, NestedShoppingList

### Community 48 - "prerender"
Cohesion: 0.15
Nodes (14): extract-i18n, prerender, serve-ssr, builder, options, browserTarget, routes, serverTarget (+6 more)

### Community 49 - "Token"
Cohesion: 0.19
Nodes (5): IToken, ITokenList, TokenList, Token, Suggestion

### Community 50 - "IAmount"
Cohesion: 0.15
Nodes (12): Amount, IAmount, ICategory, IPutIngredient, PutIngredient, IItem, IItemPost, Item (+4 more)

### Community 51 - "Proposed Changes"
Cohesion: 0.12
Nodes (15): 1. Model Initialization, 2. State Management, 3. Component Robustness, 4. Parent Component Logic, Current Implementation, Delivery Steps, File Structure Changes, Overview & Goals (+7 more)

### Community 52 - "ITag"
Cohesion: 0.26
Nodes (4): ITag, Tag, TagTree, TagTreeNode

### Community 53 - "architect"
Cohesion: 0.15
Nodes (13): build, serve, server, test, builder, configurations, builder, configurations (+5 more)

### Community 54 - "options"
Cohesion: 0.24
Nodes (13): options, aot, assets, index, karmaConfig, main, outputPath, polyfills (+5 more)

### Community 56 - "SingleDishElementComponent"
Cohesion: 0.15
Nodes (4): SingleDishElementComponent, Component, Input, Output

### Community 57 - "TagSelectInlineComponent"
Cohesion: 0.19
Nodes (4): TagSelectInlineComponent, Component, Input, Output

### Community 58 - "TagSelectComponent"
Cohesion: 0.18
Nodes (4): TagSelectComponent, Component, Input, Output

### Community 59 - "Changelog - The List Shop - Web Client"
Cohesion: 0.14
Nodes (13): [2.0.0] March 2022, [2.4.0] November 2022, [2.4.5] February 2023, [2.5.2] July 2023, [2.5.4] July 2023, [2.6.3] December 2025, Added, Changed (+5 more)

### Community 60 - "[0.0.1] - February 2022"
Cohesion: 0.17
Nodes (11): [0.0.1] - February 2022, [1.1.1] - baseline, Added, Added, Changed, Changed, Changelog - The List Shop - Web Client, Deprecated (+3 more)

### Community 61 - "Tovo"
Cohesion: 0.20
Nodes (9): Build, Code scaffolding, Development server, Further help, nextgen, Running end-to-end tests, running in weird version, Running unit tests (+1 more)

### Community 62 - "FooterComponent"
Cohesion: 0.18
Nodes (5): FooterComponent, Component, HostListener, ColorPickerService, Injectable

### Community 64 - "app.server.module.ts"
Cohesion: 0.17
Nodes (9): @angular/platform-browser-dynamic, @angular/platform-server, AppComponent, Component, AppModule, NgModule, AppServerModule, NgModule (+1 more)

### Community 65 - "server.ts"
Cohesion: 0.20
Nodes (10): express, localstorage-polyfill, @nguniversal/express-engine, app(), domino, fs, path, run() (+2 more)

### Community 67 - "XLModalComponent"
Cohesion: 0.24
Nodes (4): Component, Input, Output, XLModalComponent

### Community 68 - "AddDishComponent"
Cohesion: 0.24
Nodes (3): AddDishComponent, Component, ViewChild

### Community 69 - "SingleListElementComponent"
Cohesion: 0.20
Nodes (4): SingleListElementComponent, Component, Input, Output

### Community 70 - "AGENTS.md"
Cohesion: 0.25
Nodes (7): Architecture & Patterns, Configuration & Deployment, Development Workflow, Key Modules & Features, Project Overview, Purpose, Technology Stack

### Community 72 - "lint"
Cohesion: 0.22
Nodes (9): lint, builder, options, exclude, projects, tovo-e2e, architect, projectType (+1 more)

### Community 73 - "tsconfig.server.json"
Cohesion: 0.22
Nodes (8): ./tsconfig.app.json, angularCompilerOptions, entryModule, compilerOptions, module, outDir, extends, files

### Community 74 - "SinglePlanElementComponent"
Cohesion: 0.22
Nodes (4): SinglePlanElementComponent, Component, Input, Output

### Community 75 - "OperationType"
Cohesion: 0.22
Nodes (8): OperationType, Copy, CrossOff, Move, Remove, RemoveAll, RemoveCrossedOff, UnCrossOff

### Community 76 - "GenerateListComponent"
Cohesion: 0.22
Nodes (4): GenerateListComponent, Component, Input, Output

### Community 78 - "tovo"
Cohesion: 0.25
Nodes (8): tovo, styleext, @schematics/angular:component, prefix, projectType, root, schematics, sourceRoot

### Community 79 - "TokenType"
Cohesion: 0.25
Nodes (8): TokenType, DecimalNumber, Fraction, Marker, Range, Unit, UnitSize, WholeNumber

### Community 80 - "PlanDishElementComponent"
Cohesion: 0.25
Nodes (4): PlanDishElementComponent, Component, Input, Output

### Community 81 - "ModalComponent"
Cohesion: 0.32
Nodes (4): ModalComponent, Component, Input, Output

### Community 83 - "angular.json"
Cohesion: 0.29
Nodes (6): cli, analytics, defaultProject, newProjectRoot, $schema, version

### Community 85 - "tsconfig.spec.json"
Cohesion: 0.25
Nodes (7): compilerOptions, outDir, types, extends, files, include, ../tsconfig.json

### Community 87 - "tsconfig.app.json"
Cohesion: 0.29
Nodes (6): compilerOptions, outDir, types, extends, files, ../tsconfig.json

### Community 88 - "e2e"
Cohesion: 0.33
Nodes (6): e2e, builder, configurations, options, devServerTarget, protractorConfig

### Community 89 - "tslint.json"
Cohesion: 0.33
Nodes (5): ../tslint.json, extends, rules, component-selector, directive-selector

### Community 90 - "[0.0.0] template - date"
Cohesion: 0.40
Nodes (5): [0.0.0] template - date, Added, Changed, Deprecated, Fixed

### Community 91 - "[2.2.0] June 2022"
Cohesion: 0.40
Nodes (5): [2.2.0] June 2022, Added, Changed, Deprecated, Fixed

### Community 92 - "shared.module.ts"
Cohesion: 0.15
Nodes (6): ConfirmDialogComponent, Component, LoaderComponent, Component, ConfirmDialogService, Injectable

### Community 94 - "[2.3.0] June 2022"
Cohesion: 0.50
Nodes (4): [2.3.0] June 2022, Added, Changed, Fixed

### Community 95 - "[2.5.1] July 2023"
Cohesion: 0.50
Nodes (4): [2.5.1] July 2023, Added, Changed, Fixed

### Community 99 - "pace.min.js"
Cohesion: 0.29
Nodes (4): classlist.js, web-animations-js, a(), b()

### Community 100 - "[2.1.0] April 2022"
Cohesion: 0.67
Nodes (3): [2.1.0] April 2022, Added, Changed

### Community 104 - "[2.4.4] January 2023"
Cohesion: 0.67
Nodes (3): [2.4.4] January 2023, Fixed, Removed

### Community 116 - "[2.4.6, 2.4.7] May 2023"
Cohesion: 0.67
Nodes (3): [2.4.6, 2.4.7] May 2023, Changed, Fixed

### Community 117 - "[2.4.8] June 2023"
Cohesion: 0.67
Nodes (3): [2.4.8] June 2023, Changed, Fixed

### Community 118 - "[2.4.9] June 2023"
Cohesion: 0.67
Nodes (3): [2.4.9] June 2023, Changed, Fixed

### Community 119 - "[2.5.0] July 2023"
Cohesion: 0.67
Nodes (3): [2.5.0] July 2023, Added, Changed

### Community 120 - "[2.6.0] July 2024"
Cohesion: 0.67
Nodes (3): [2.6.0] July 2024, Added, Changed

### Community 121 - "[2.6.1] March 2025"
Cohesion: 0.67
Nodes (3): [2.6.1] March 2025, Added, Fixed

## Knowledge Gaps
- **352 isolated node(s):** `$schema`, `analytics`, `version`, `newProjectRoot`, `root` (+347 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 780 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@angular/core` connect `@angular/core` to `authentication.service.ts`, `package.json`, `AlertService`, `home.module.ts`, `AuthenticationService`, `feedback.service.ts`, `user.module.ts`, `app.module.ts`, `IngredientInputComponent`, `edit-list.component.ts`, `shoppingList.ts`, `beta-campaign.module.ts`, `Dish`, `EnvironmentLoaderService`, `@angular/common`, `manage-dishes.component.ts`, `list.service.ts`, `food.service.ts`, `legend.service.ts`, `manage-lists.component.ts`, `app.server.module.ts`, `XLModalComponent`, `shared.module.ts`?**
  _High betweenness centrality (0.153) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **Why does `EditIngredientInlineComponent` connect `EditIngredientInlineComponent` to `ISuggestion`, `food.service.ts`, `app.module.ts`, `edit-list.component.ts`, `Token`, `Ingredient`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **What connects `$schema`, `analytics`, `version` to the rest of the system?**
  _352 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `authentication.service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07138047138047138 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.04081632653061224 - nodes in this community are weakly interconnected._
- **Should `EditListComponent` be split into smaller, more focused modules?**
  _Cohesion score 0.0851063829787234 - nodes in this community are weakly interconnected._