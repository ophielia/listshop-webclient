# Graph Report - listshop-webclient  (2026-09-13)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 1693 nodes · 3743 edges · 116 communities (80 shown, 25 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 143 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9857458a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- UserProperty
- package.json
- EditListComponent
- AlertService
- dependencies
- EditIngredientInlineComponent
- @angular/core
- home.module.ts
- ManageDishesComponent
- AuthenticationService
- shoppinglist.ts
- authentication.service.ts
- dishes.module.ts
- IngredientInputComponent
- EditPlanComponent
- ITag
- ListService
- Dish
- devDependencies
- Ingredient
- beta-campaign.module.ts
- EditDishComponent
- TagTreeService
- CelebrationService
- mapping-utils.ts
- compilerOptions
- EnvironmentLoaderService
- ManageMealPlansComponent
- scripts
- MealPlanService
- shared.module.ts
- manage-dishes.component.ts
- list.service.ts
- ErrorType
- SignUpComponent
- CreateTagDialogComponent
- HeaderComponent
- compilerOptions
- edit-plan.component.ts
- LandingFixService
- production
- app.module.ts
- DishService
- food.service.ts
- legend.service.ts
- Category
- ManageListsComponent
- PasswordTokenComponent
- prerender
- edit-ingredient-inline.component.ts
- IIngredient
- CelebrationComponent
- TagTree
- architect
- options
- DishContext
- SingleDishElementComponent
- TagSelectInlineComponent
- TagSelectComponent
- .constructor
- MainPitchComponent
- DishSelectComponent
- FooterComponent
- .isValid
- app.server.module.ts
- server.ts
- dishes-routing.module.ts
- XLModalComponent
- AddDishComponent
- SingleListElementComponent
- sign-up.component.ts
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
- ContentHeaderComponent
- HomeThreeComponent
- MappingUtils
- e2e
- tslint.json
- TextAndSelection
- BrowserWindowRef
- ConfirmDialogComponent
- list-shop-token-interceptor.ts
- FeedbackService
- AppComponent
- AddIngredientInlineComponent
- IntroTwoComponent
- pace.min.js
- polyfills.ts
- ContactForm
- ListShopError
- canvas-confetti
- tag-select-type.ts
- environment.prod.ts
- test.ts

## God Nodes (most connected - your core abstractions)
1. `@angular/core` - 109 edges
2. `AuthenticationService` - 65 edges
3. `EditListComponent` - 53 edges
4. `@angular/router` - 52 edges
5. `ITag` - 51 edges
6. `EditIngredientInlineComponent` - 50 edges
7. `LandingFixService` - 49 edges
8. `ListService` - 47 edges
9. `ManageDishesComponent` - 44 edges
10. `Dish` - 43 edges

## Surprising Connections (you probably didn't know these)
- `IShoppingList` --references--> `ILegendSource`  [EXTRACTED]
  src/app/model/shoppinglist.ts → src/app/model/legend-source.ts
- `EditListComponent` --references--> `ShoppingList`  [EXTRACTED]
  src/app/lists/edit-list/edit-list.component.ts → src/app/model/shoppinglist.ts
- `ManageListsComponent` --references--> `ShoppingList`  [EXTRACTED]
  src/app/lists/manage-lists/manage-lists.component.ts → src/app/model/shoppinglist.ts
- `ShoppingList` --references--> `Category`  [EXTRACTED]
  src/app/model/shoppinglist.ts → src/app/model/category.ts
- `IngredientInputComponent` --references--> `TextAndSelection`  [EXTRACTED]
  src/app/dishes/ingredient-input/ingredient-input.component.ts → src/app/dishes/ingredient-input/text-and-selection.ts

## Import Cycles
- None detected.

## Communities (116 total, 25 thin omitted)

### Community 0 - "UserProperty"
Cohesion: 0.07
Nodes (23): BetaTestComponent, Component, ViewChild, AuthorizePost, IAuthorizePost, ChangePasswordPost, IChangePasswordPost, CreateListPost (+15 more)

### Community 1 - "package.json"
Cohesion: 0.04
Nodes (48): name, private, version, @angular/animations, @angular/cdk, @angular/cli, @angular/compiler, @angular/compiler-cli (+40 more)

### Community 2 - "EditListComponent"
Cohesion: 0.08
Nodes (4): EditListComponent, Component, ViewChild, IShoppingList

### Community 3 - "AlertService"
Cohesion: 0.07
Nodes (18): Alert, AlertType, Error, Info, Success, Warning, AlertComponent, Component (+10 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (39): dependencies, @angular/animations, @angular/cdk, @angular/common, @angular/compiler, @angular/core, @angular/forms, @angular/localize (+31 more)

### Community 5 - "EditIngredientInlineComponent"
Cohesion: 0.08
Nodes (4): EditIngredientInlineComponent, Component, Input, Output

### Community 6 - "@angular/core"
Cohesion: 0.14
Nodes (9): @angular/core, @angular/platform-browser, @angular/router, ListsRoutingModule, routes, NgModule, CelebrateService, ConfirmDialogService (+1 more)

### Community 7 - "home.module.ts"
Cohesion: 0.08
Nodes (19): AboutmeComponent, Component, PartyComponent, Component, AboutComponent, Component, FeatureComponent, Component (+11 more)

### Community 8 - "ManageDishesComponent"
Cohesion: 0.10
Nodes (3): ManageDishesComponent, Component, ViewChild

### Community 9 - "AuthenticationService"
Cohesion: 0.10
Nodes (6): AnonymousBetaTestComponent, Component, Component, UserHeaderComponent, AuthenticationService, Injectable

### Community 10 - "shoppinglist.ts"
Cohesion: 0.11
Nodes (12): CampaignFeedbackDialogComponent, Component, Output, CampaignFeedback, ICampaignFeedback, IItemOperationPut, ItemOperationPut, IItemSource (+4 more)

### Community 11 - "authentication.service.ts"
Cohesion: 0.14
Nodes (13): @angular/forms, ngx-spinner, ITokenRequest, TokenRequest, TokenType, PasswordReset, ResetConfirmComponent, Component (+5 more)

### Community 12 - "dishes.module.ts"
Cohesion: 0.09
Nodes (13): @ng-bootstrap/ng-bootstrap, DishesComponent, Component, DishesModule, NgModule, HomeComponent, Component, ListsComponent (+5 more)

### Community 13 - "IngredientInputComponent"
Cohesion: 0.13
Nodes (8): EntryEvent, IEntryEvent, IngredientInputComponent, Component, HostListener, Input, Output, ViewChild

### Community 14 - "EditPlanComponent"
Cohesion: 0.10
Nodes (3): EditPlanComponent, Component, ViewChild

### Community 15 - "ITag"
Cohesion: 0.34
Nodes (12): ngx-logger, rxjs, ITag, Tag, TagType, ContentType, All, Direct (+4 more)

### Community 16 - "ListService"
Cohesion: 0.10
Nodes (6): ListSelectComponent, Component, Input, Output, ListService, Injectable

### Community 17 - "Dish"
Cohesion: 0.14
Nodes (3): AddDishToPlanComponent, Component, Dish

### Community 18 - "devDependencies"
Cohesion: 0.08
Nodes (25): devDependencies, @angular/cli, @angular/compiler-cli, @angular-devkit/build-angular, @angular/language-service, @angular/platform-browser-dynamic, codelyzer, jasmine-core (+17 more)

### Community 19 - "Ingredient"
Cohesion: 0.12
Nodes (4): AddDishIngredientComponent, Component, ViewChild, Ingredient

### Community 20 - "beta-campaign.module.ts"
Cohesion: 0.12
Nodes (11): BetaCampaignModule, NgModule, LandingRoutingModule, routes, NgModule, LandingComponent, Component, LandingPartyComponent (+3 more)

### Community 21 - "EditDishComponent"
Cohesion: 0.12
Nodes (3): EditDishComponent, Component, ViewChild

### Community 22 - "TagTreeService"
Cohesion: 0.13
Nodes (6): ITagList, TagList, TagService, Injectable, TagTreeService, Injectable

### Community 23 - "CelebrationService"
Cohesion: 0.16
Nodes (4): Celebration, ICelebration, CelebrationService, Injectable

### Community 24 - "mapping-utils.ts"
Cohesion: 0.23
Nodes (12): DishList, IDish, IDishList, IUpdateDish, DishRatingInfo, IDishRatingInfo, UpdateDish, IRatingInfo (+4 more)

### Community 25 - "compilerOptions"
Cohesion: 0.10
Nodes (18): compilerOptions, module, outDir, target, types, extends, ../tsconfig.json, compilerOptions (+10 more)

### Community 26 - "EnvironmentLoaderService"
Cohesion: 0.17
Nodes (4): initAppConfig(), EnvConfig, EnvironmentLoaderService, Injectable

### Community 27 - "ManageMealPlansComponent"
Cohesion: 0.14
Nodes (4): ManageMealPlansComponent, Component, PlanContext, Injectable

### Community 28 - "scripts"
Cohesion: 0.11
Nodes (19): scripts, build, build:client-and-server-bundles_bak, build:ssr, build:ssr_bak, build:ssrr, compile:server_bak, dev:sass (+11 more)

### Community 29 - "MealPlanService"
Cohesion: 0.12
Nodes (6): MealplanSelectComponent, Component, Input, Output, MealPlanService, Injectable

### Community 30 - "shared.module.ts"
Cohesion: 0.18
Nodes (7): @angular/common, LoaderComponent, Component, browserWindowProvider, WINDOW, WINDOW_PROVIDERS, windowProvider

### Community 31 - "manage-dishes.component.ts"
Cohesion: 0.24
Nodes (8): DishSort, SortDirection, Down, Up, SortKey, CreatedOn, LastUsed, Name

### Community 32 - "list.service.ts"
Cohesion: 0.18
Nodes (6): IListAddProperties, ListAddProperties, IListGenerateProperties, ListGenerateProperties, IShoppingListPut, ShoppingListPut

### Community 33 - "ErrorType"
Cohesion: 0.12
Nodes (13): ErrorType, badVerificationMatch, cantHaveSpaces, EmailNotFound, emailTaken, generalError, InvalidEmail, isRequired (+5 more)

### Community 34 - "SignUpComponent"
Cohesion: 0.12
Nodes (4): IListShopPayload, ListShopPayload, SignUpComponent, Component

### Community 35 - "CreateTagDialogComponent"
Cohesion: 0.14
Nodes (5): CreateTagDialogComponent, Component, Input, Output, ListShopUtils

### Community 36 - "HeaderComponent"
Cohesion: 0.11
Nodes (7): ListShopHeaderComponent, Component, Inject, HeaderComponent, Component, HostListener, Inject

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compileOnSave, compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, emitDecoratorMetadata, experimentalDecorators, lib (+9 more)

### Community 38 - "edit-plan.component.ts"
Cohesion: 0.22
Nodes (5): MealPlanType, IMealPlan, MealPlan, ISlot, Slot

### Community 39 - "LandingFixService"
Cohesion: 0.12
Nodes (3): LandingFixService, Inject, Injectable

### Community 40 - "production"
Cohesion: 0.13
Nodes (15): production, aot, browserTarget, budgets, buildOptimizer, devServerTarget, extractCss, extractLicenses (+7 more)

### Community 41 - "app.module.ts"
Cohesion: 0.14
Nodes (9): rootRouterConfig, ListsModule, NgModule, SharedModule, NgModule, Component, UserComponent, NgModule (+1 more)

### Community 43 - "food.service.ts"
Cohesion: 0.19
Nodes (4): ISuggestion, Suggestion, FoodService, Injectable

### Community 44 - "legend.service.ts"
Cohesion: 0.23
Nodes (6): ILegendIconSource, LegendIconSource, ILegendPoint, LegendPoint, LegendService, Injectable

### Community 45 - "Category"
Cohesion: 0.22
Nodes (4): Category, ICategory, IItem, Item

### Community 47 - "PasswordTokenComponent"
Cohesion: 0.14
Nodes (4): ITokenProcessPost, TokenProcessPost, PasswordTokenComponent, Component

### Community 48 - "prerender"
Cohesion: 0.15
Nodes (14): extract-i18n, prerender, serve-ssr, builder, options, browserTarget, routes, serverTarget (+6 more)

### Community 49 - "edit-ingredient-inline.component.ts"
Cohesion: 0.26
Nodes (8): allSuggestions, currentSuggestions, doubleSuggestions, tokenList, IToken, ITokenList, TokenList, Token

### Community 50 - "IIngredient"
Cohesion: 0.30
Nodes (6): Amount, IAmount, IIngredient, IPutIngredient, PutIngredient, NestedTag

### Community 51 - "CelebrationComponent"
Cohesion: 0.21
Nodes (4): CelebrationComponent, Component, Inject, ViewChild

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

### Community 59 - ".constructor"
Cohesion: 0.20
Nodes (4): Directive, MyIsPartyDirective, PartyGuardHandler, Injectable

### Community 60 - "MainPitchComponent"
Cohesion: 0.20
Nodes (3): MainPitchComponent, Component, ViewChild

### Community 61 - "DishSelectComponent"
Cohesion: 0.18
Nodes (4): DishSelectComponent, Component, Input, Output

### Community 62 - "FooterComponent"
Cohesion: 0.18
Nodes (5): FooterComponent, Component, HostListener, ColorPickerService, Injectable

### Community 64 - "app.server.module.ts"
Cohesion: 0.25
Nodes (7): @angular/platform-browser-dynamic, @angular/platform-server, AppModule, NgModule, AppServerModule, NgModule, environment

### Community 65 - "server.ts"
Cohesion: 0.20
Nodes (10): express, localstorage-polyfill, @nguniversal/express-engine, app(), domino, fs, path, run() (+2 more)

### Community 66 - "dishes-routing.module.ts"
Cohesion: 0.22
Nodes (8): DishesRoutingModule, routes, NgModule, MealPlansRoutingModule, routes, NgModule, AuthGuardHandler, Injectable

### Community 67 - "XLModalComponent"
Cohesion: 0.24
Nodes (4): Component, Input, Output, XLModalComponent

### Community 68 - "AddDishComponent"
Cohesion: 0.24
Nodes (3): AddDishComponent, Component, ViewChild

### Community 69 - "SingleListElementComponent"
Cohesion: 0.20
Nodes (4): SingleListElementComponent, Component, Input, Output

### Community 70 - "sign-up.component.ts"
Cohesion: 0.42
Nodes (3): CreateUserStatus, EmailValidator, PasswordValidator

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

### Community 85 - "ContentHeaderComponent"
Cohesion: 0.29
Nodes (3): ContentHeaderComponent, Component, Inject

### Community 88 - "e2e"
Cohesion: 0.33
Nodes (6): e2e, builder, configurations, options, devServerTarget, protractorConfig

### Community 89 - "tslint.json"
Cohesion: 0.33
Nodes (5): ../tslint.json, extends, rules, component-selector, directive-selector

### Community 91 - "BrowserWindowRef"
Cohesion: 0.33
Nodes (3): BrowserWindowRef, Injectable, WindowRef

## Knowledge Gaps
- **268 isolated node(s):** `CreatUserStatus`, `TagSelectType`, `CelebrateService`, `name`, `private` (+263 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 690 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **25 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@angular/core` connect `@angular/core` to `UserProperty`, `package.json`, `AlertService`, `home.module.ts`, `shoppinglist.ts`, `authentication.service.ts`, `dishes.module.ts`, `IngredientInputComponent`, `ITag`, `ListService`, `beta-campaign.module.ts`, `TagTreeService`, `EnvironmentLoaderService`, `shared.module.ts`, `manage-dishes.component.ts`, `list.service.ts`, `edit-plan.component.ts`, `app.module.ts`, `food.service.ts`, `legend.service.ts`, `edit-ingredient-inline.component.ts`, `DishSelectComponent`, `app.server.module.ts`, `dishes-routing.module.ts`, `XLModalComponent`, `sign-up.component.ts`, `list-shop-token-interceptor.ts`?**
  _High betweenness centrality (0.168) - this node is a cross-community bridge._
- **Why does `AuthenticationService` connect `AuthenticationService` to `UserProperty`, `AlertService`, `@angular/core`, `home.module.ts`, `authentication.service.ts`, `dishes.module.ts`, `beta-campaign.module.ts`, `CelebrationService`, `EnvironmentLoaderService`, `shared.module.ts`, `ErrorType`, `SignUpComponent`, `HeaderComponent`, `app.module.ts`, `PasswordTokenComponent`, `.constructor`, `.isValid`, `dishes-routing.module.ts`, `sign-up.component.ts`, `LoginComponent`, `ChangePasswordComponent`, `ResetPasswordComponent`, `ContentHeaderComponent`, `AppComponent`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **Why does `@angular/router` connect `@angular/core` to `package.json`, `dishes-routing.module.ts`, `AlertService`, `edit-plan.component.ts`, `home.module.ts`, `sign-up.component.ts`, `app.module.ts`, `authentication.service.ts`, `dishes.module.ts`, `ITag`, `beta-campaign.module.ts`, `shared.module.ts`, `manage-dishes.component.ts`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **What connects `CreatUserStatus`, `TagSelectType`, `CelebrateService` to the rest of the system?**
  _268 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `UserProperty` be split into smaller, more focused modules?**
  _Cohesion score 0.07402031930333818 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.04081632653061224 - nodes in this community are weakly interconnected._
- **Should `EditListComponent` be split into smaller, more focused modules?**
  _Cohesion score 0.08325624421831637 - nodes in this community are weakly interconnected._