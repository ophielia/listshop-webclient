# Graph Report - listshop-webclient  (2026-11-13)

## Corpus Check
- 264 files · ~40,288 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2263 nodes · 4170 edges · 196 communities (109 shown, 87 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 129 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- @angular/core
- EditIngredientInlineComponent
- IngredientInputComponent
- package.json
- Shopping list editor / Categorized shopping items
- edit-list.component.ts
- UserProperty
- dependencies
- rxjs
- AuthenticationService
- TagTreeService
- ManageDishesComponent
- EditListComponent
- manage-dishes.component.ts
- EditDishComponent
- Meal plan editor / app-dish-select
- devDependencies
- Dish
- EditPlanComponent
- ContentHeaderComponent
- Edit dish details ingredients tags and ratings / Add ingredients to dish
- Dish search filtering and bulk actions / app-confirm-dialog
- home.module.ts
- EditDishComponent
- CelebrationService
- LandingFixService
- ManageListsComponent
- AlertService
- .isAuthenticated
- MealPlanService
- legend.service.ts
- Add dishes to meal plan / app-modal
- Technical Design
- scripts
- app.module.ts
- ListService
- Requirements
- Technical Design
- IShoppingList
- compilerOptions
- beta-campaign.module.ts
- mapping-utils.ts
- AuthenticationService
- Proposed Changes
- AuthenticationService
- EnvironmentLoaderService
- CreateTagDialogComponent
- production
- shared.module.ts
- Inline ingredient editing / Inline ingredient creation
- shoppingList.ts
- TagSelectInlineComponent
- TagSelectComponent
- prerender
- Changelog - The List Shop - Web Client
- app.server.module.ts
- CelebrationService
- EditDishComponent
- meal-plan.service.ts
- FooterComponent
- architect
- options
- CelebrationService
- server.ts
- shoppingList.ts
- UserDeviceInfo
- SingleDishElementComponent
- SignUpComponent
- MainPitchComponent
- MainPitchComponent
- Home Three composition / app-about
- list.service.ts
- [0.0.1] - February 2022
- ITag
- ManageListsComponent
- IDish
- XLModalComponent
- ChangePasswordComponent
- PasswordTokenComponent
- .isValid
- LoginComponent
- Tovo
- Beta release notifications and tester email / app-modal
- SingleListElementComponent
- UserDeviceInfo
- HeaderComponent
- Inline tag autocomplete / Embedded p-autoComplete
- Tag autocomplete selector / Embedded p-autoComplete
- lint
- tsconfig.server.json
- EditPlanComponent
- SinglePlanElementComponent
- OperationType
- Create item category wizard / Category drilldown step
- GenerateListComponent
- Landing navigation / Event handler active
- HeaderComponent
- ResetPasswordComponent
- AGENTS.md
- tovo
- compilerOptions
- home.module.ts
- PlanDishElementComponent
- Shopping application navigation / Event handler logout
- ModalComponent
- tsconfig.spec.json
- angular.json
- Dishes page shell / router-outlet
- List Shop features / Add by item, list or dish
- AlertService
- Generate shopping list options / Template handler cancelInput
- Login form / Embedded route-message
- Sign up form / Form control confirmPassword
- tsconfig.app.json
- e2e
- tslint.json
- App launch pitch and feedback / submitFeedback template handler
- PitchFeaturesComponent
- Home Two composition / app-about
- Privacy policy summary / app-content-header
- Shopping list manager / app-confirm-dialog
- Meal plan manager / app-confirm-dialog
- Dish autocomplete selector / p-autoComplete
- user-header.component.ts
- authentication-interceptor.ts
- AlertService
- Change password form / Form control confirmPassword
- [0.0.0] template - date
- [2.2.0] June 2022
- home.module.ts
- app.module.ts
- home.module.ts
- Application footer / Embedded app-celebration
- Password token reset form / Form control confirmPassword
- Request password reset form / Embedded ngx-spinner
- [2.3.0] June 2022
- [2.5.1] July 2023
- Campaign landing composition / app-celebration
- app.module.ts
- Meal plan selection / cancelMealplanInput template handler
- List Shop introduction and app access / App Store availability
- home.module.ts
- home.module.ts
- Shopping lists page layout / app-alert
- Meal plans page layout / app-alert
- app.module.ts
- UserDeviceInfo
- list.service.ts
- list.service.ts
- Dish selection card / Event handler editDish
- Authentication navigation / Route /home
- ListShopTokenInterceptor
- Delete account confirmation / Embedded ngx-spinner
- User page layout / Embedded app-alert
- [2.1.0] April 2022
- [2.4.4] January 2023
- [2.4.6, 2.4.7] May 2023
- [2.4.8] June 2023
- [2.4.9] June 2023
- [2.5.0] July 2023
- [2.6.0] July 2024
- [2.6.1] March 2025
- Shopping list card / Template handler deleteList
- Meal plan card / Template handler deletePlan
- ContactForm
- ListShopError
- meal-plan.service.ts
- Confirmation dialog / Template handler message.noFn
- List selection panel / Event handler cancelListInput
- [2.0.1] April 2022
- [2.5.3] July 2023
- createDish template handler / Create new dish
- inputChanged template handler / Ingredient amount autocomplete
- owl-carousel-o / Testimonials carousel
- Template handler doubleTapDish / Meal plan dish card
- tag-select-type.ts
- Template handler removeAlert / Alert messages
- app-modal / Celebration hostess modal
- environment.prod.ts
- test.ts
- Campaign launch announcement
- Shopping list feature overview
- Public navigation and authentication links
- Shopping assistance overview
- Route message display
- Extra large modal placeholder
- Loading indicator
- Reset email confirmation
- Token processing status

## God Nodes (most connected - your core abstractions)
1. `@angular/core` - 109 edges
2. `AuthenticationService` - 65 edges
3. `EditListComponent` - 58 edges
4. `@angular/router` - 52 edges
5. `ITag` - 52 edges
6. `EditIngredientInlineComponent` - 49 edges
7. `LandingFixService` - 49 edges
8. `ListService` - 44 edges
9. `Shopping list editor` - 41 edges
10. `ManageDishesComponent` - 40 edges

## Surprising Connections (you probably didn't know these)
- `App launch pitch and feedback` --references--> `ngx-spinner`  [EXTRACTED]
  src/app/beta-campaign/landing/main-pitch/main-pitch.component.html → package.json
- `Beta release notifications and tester email` --references--> `ngx-spinner`  [EXTRACTED]
  src/app/landing/beta-test/beta-test.component.html → package.json
- `Celebration page` --references--> `ngx-spinner`  [EXTRACTED]
  src/app/landing/celebration/party.component.html → package.json
- `Dish search filtering and bulk actions` --references--> `app-tag-select`  [EXTRACTED]
  src/app/dishes/manage-dishes/manage-dishes.component.html → src/app/dishes/edit-dish/edit-dish.component.html
- `CreateUserPost` --references--> `User`  [EXTRACTED]
  src/app/model/create-user-post.ts → src/app/model/user.ts

## Import Cycles
- 2-file cycle: `src/app/model/Amount.ts -> src/app/model/Ingredient.ts -> src/app/model/Amount.ts`

## Communities (196 total, 87 thin omitted)

### Community 0 - "@angular/core"
Cohesion: 0.07
Nodes (17): @angular/core, @angular/platform-browser, @angular/router, @ng-bootstrap/ng-bootstrap, primeng, DishesModule, DishesRoutingModule, routes (+9 more)

### Community 1 - "EditIngredientInlineComponent"
Cohesion: 0.05
Nodes (3): AddIngredientInlineComponent, EditIngredientInlineComponent, FoodService

### Community 2 - "IngredientInputComponent"
Cohesion: 0.06
Nodes (19): EntryEvent, IEntryEvent, IToken, ITokenList, TokenList, Token, TokenType, DecimalNumber (+11 more)

### Community 3 - "package.json"
Cohesion: 0.04
Nodes (46): name, private, version, @angular/animations, @angular/cdk, @angular/cli, @angular/compiler, @angular/compiler-cli (+38 more)

### Community 4 - "Shopping list editor / Categorized shopping items"
Cohesion: 0.05
Nodes (42): Categorized shopping items, app-create-tag-dialog, app-dish-select, app-list-select, app-modal, app-tag-select, p-toggleswitch, Template handler addDishToList (+34 more)

### Community 5 - "edit-list.component.ts"
Cohesion: 0.15
Nodes (18): Amount, IAmount, Dish, DishList, IDish, IDishList, IUpdateDish, UpdateDish (+10 more)

### Community 6 - "UserProperty"
Cohesion: 0.08
Nodes (7): BetaTestComponent, MappingUtils, IUserPropertiesPost, UserPropertiesPost, IUserProperty, UserProperty, UserService

### Community 7 - "dependencies"
Cohesion: 0.05
Nodes (39): dependencies, @angular/animations, @angular/cdk, @angular/common, @angular/compiler, @angular/core, @angular/forms, @angular/localize (+31 more)

### Community 8 - "rxjs"
Cohesion: 0.18
Nodes (12): ngx-logger, rxjs, EnvConfig, Tag, TagService, ContentType, All, Direct (+4 more)

### Community 9 - "AuthenticationService"
Cohesion: 0.13
Nodes (16): @angular/forms, ngx-spinner, ErrorType, badVerificationMatch, cantHaveSpaces, EmailNotFound, emailTaken, generalError (+8 more)

### Community 10 - "TagTreeService"
Cohesion: 0.12
Nodes (6): ITagList, TagList, TagType, TagTree, TagTreeNode, TagTreeService

### Community 13 - "manage-dishes.component.ts"
Cohesion: 0.15
Nodes (9): DishContext, DishSort, SortDirection, Down, Up, SortKey, CreatedOn, LastUsed (+1 more)

### Community 15 - "Meal plan editor / app-dish-select"
Cohesion: 0.08
Nodes (26): app-dish-select, app-list-select, app-modal, app-plan-dish-element, p-toggleswitch, Template handler addDishToPlan, Template handler addMealPlanToList, Template handler clearRemovedDishes (+18 more)

### Community 16 - "devDependencies"
Cohesion: 0.08
Nodes (25): devDependencies, @angular/cli, @angular/compiler-cli, @angular-devkit/build-angular, @angular/language-service, @angular/platform-browser-dynamic, codelyzer, jasmine-core (+17 more)

### Community 19 - "ContentHeaderComponent"
Cohesion: 0.08
Nodes (4): ContentHeaderComponent, IntroTwoComponent, AuthGuardHandler, DeleteUserComponent

### Community 20 - "Edit dish details ingredients tags and ratings / Add ingredients to dish"
Cohesion: 0.11
Nodes (23): legacyAddNewIngredient template handler, Add ingredients to dish, app-add-ingredient-inline, app-create-tag-dialog, app-edit-ingredient-inline, app-tag-select, app-xlmodal, ngb-rating (+15 more)

### Community 21 - "Dish search filtering and bulk actions / app-confirm-dialog"
Cohesion: 0.09
Nodes (23): app-confirm-dialog, app-generate-list, app-list-select, app-mealplan-select, app-single-dish-element, addDishesToList template handler, addDishesToMealplan template handler, addTagToDishes template handler (+15 more)

### Community 22 - "home.module.ts"
Cohesion: 0.13
Nodes (7): ngx-owl-carousel-o, AboutmeComponent, AnonymousBetaTestComponent, PartyComponent, HomeModule, HomeRoutingModule, routes

### Community 26 - "ManageListsComponent"
Cohesion: 0.14
Nodes (5): ListsModule, ListsRoutingModule, routes, ManageListsComponent, NestedShoppingList

### Community 27 - "AlertService"
Cohesion: 0.18
Nodes (7): Alert, AlertType, Error, Info, Success, Warning, AlertService

### Community 30 - "legend.service.ts"
Cohesion: 0.14
Nodes (7): ILegendIconSource, LegendIconSource, ILegendPoint, LegendPoint, ILegendSource, LegendSource, LegendService

### Community 31 - "Add dishes to meal plan / app-modal"
Cohesion: 0.10
Nodes (20): app-modal, app-single-dish-element, app-tag-select, Dish name and tag filters, Inverted tag filters, Template handler addDishToMealPlan, Template handler addTagToFilter, Template handler backToMealPlanEdit (+12 more)

### Community 32 - "Technical Design"
Cohesion: 0.11
Nodes (18): Architecture Diagram, Backend (`listshop-api`), Current Implementation, Delivery Steps, File Structure, Key Decisions, Key Scenarios, Overview & Goals (+10 more)

### Community 33 - "scripts"
Cohesion: 0.11
Nodes (19): scripts, build, build:client-and-server-bundles_bak, build:ssr, build:ssr_bak, build:ssrr, compile:server_bak, dev:sass (+11 more)

### Community 34 - "app.module.ts"
Cohesion: 0.14
Nodes (5): rootRouterConfig, ListsComponent, listshopTheme, UserComponent, UserModule

### Community 36 - "Requirements"
Cohesion: 0.11
Nodes (17): Architecture Diagram, Current Implementation, Delivery Steps, EditList Styles (`src/app/lists/edit-list/edit-list.component.scss`), EditList Template (`src/app/lists/edit-list/edit-list.component.html`), EditListComponent (`src/app/lists/edit-list/edit-list.component.ts`), Functional Requirements, Key Decisions (+9 more)

### Community 37 - "Technical Design"
Cohesion: 0.11
Nodes (17): Architecture Diagram, Current Implementation, Delivery Steps, Key Decisions, Key Scenarios, Overview & Goals, Proposed Changes, Requirements (+9 more)

### Community 38 - "IShoppingList"
Cohesion: 0.18
Nodes (6): Category, ICategory, IItem, Item, IItemDetails, ItemDetails

### Community 39 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compileOnSave, compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, emitDecoratorMetadata, experimentalDecorators, lib (+9 more)

### Community 40 - "beta-campaign.module.ts"
Cohesion: 0.18
Nodes (5): BetaCampaignModule, LandingRoutingModule, routes, LandingComponent, LandingPartyComponent

### Community 41 - "mapping-utils.ts"
Cohesion: 0.26
Nodes (8): Celebration, ICelebration, DishRatingInfo, IDishRatingInfo, IRatingInfo, RatingInfo, IRatingUpdateInfo, RatingUpdateInfo

### Community 42 - "AuthenticationService"
Cohesion: 0.17
Nodes (9): CreateUserStatus, IListShopPayload, ListShopPayload, ITokenProcessPost, TokenProcessPost, ITokenRequest, TokenRequest, TokenType (+1 more)

### Community 43 - "Proposed Changes"
Cohesion: 0.12
Nodes (15): 1. Model Initialization, 2. State Management, 3. Component Robustness, 4. Parent Component Logic, Current Implementation, Delivery Steps, File Structure Changes, Overview & Goals (+7 more)

### Community 47 - "production"
Cohesion: 0.13
Nodes (15): production, aot, browserTarget, budgets, buildOptimizer, devServerTarget, extractCss, extractLicenses (+7 more)

### Community 48 - "shared.module.ts"
Cohesion: 0.17
Nodes (6): browserWindowProvider, BrowserWindowRef, WINDOW, WINDOW_PROVIDERS, windowProvider, WindowRef

### Community 49 - "Inline ingredient editing / Inline ingredient creation"
Cohesion: 0.19
Nodes (15): saveFromTag template handler, setTag template handler, Inline ingredient creation, cancelIngredientEdit template handler, app-ingredient-input, app-tag-select-inline, beginEditAmount template handler, beginEditTag template handler (+7 more)

### Community 50 - "shoppingList.ts"
Cohesion: 0.19
Nodes (7): ApiLegendSource, ILegendSource, IItemSource, ItemSource, IListOfShoppingLists, ListOfShoppingLists, ShoppingList

### Community 54 - "prerender"
Cohesion: 0.15
Nodes (14): extract-i18n, prerender, serve-ssr, builder, options, browserTarget, routes, serverTarget (+6 more)

### Community 55 - "Changelog - The List Shop - Web Client"
Cohesion: 0.14
Nodes (13): [2.0.0] March 2022, [2.4.0] November 2022, [2.4.5] February 2023, [2.5.2] July 2023, [2.5.4] July 2023, [2.6.3] December 2025, Added, Changed (+5 more)

### Community 56 - "app.server.module.ts"
Cohesion: 0.18
Nodes (7): @angular/platform-browser-dynamic, classlist.js, web-animations-js, AppModule, a(), b(), environment

### Community 59 - "meal-plan.service.ts"
Cohesion: 0.23
Nodes (5): IMealPlan, IMealPlanList, MealPlan, MealPlanList, ConfirmDialogService

### Community 61 - "architect"
Cohesion: 0.15
Nodes (13): build, serve, server, test, builder, configurations, builder, configurations (+5 more)

### Community 62 - "options"
Cohesion: 0.24
Nodes (13): options, aot, assets, index, karmaConfig, main, outputPath, polyfills (+5 more)

### Community 64 - "server.ts"
Cohesion: 0.17
Nodes (12): @angular/common, @angular/platform-server, express, localstorage-polyfill, @nguniversal/express-engine, app(), domino, fs (+4 more)

### Community 66 - "UserDeviceInfo"
Cohesion: 0.27
Nodes (7): AuthorizePost, IAuthorizePost, CreateUserPost, CreatUserStatus, ICreateUserPost, IUserDeviceInfo, UserDeviceInfo

### Community 69 - "MainPitchComponent"
Cohesion: 0.24
Nodes (3): CampaignFeedbackDialogComponent, CampaignFeedback, ICampaignFeedback

### Community 71 - "Home Three composition / app-about"
Cohesion: 0.17
Nodes (12): app-about, app-alert, app-blog, app-contact-us, app-feature, app-header, app-newsletter, app-price (+4 more)

### Community 72 - "list.service.ts"
Cohesion: 0.26
Nodes (5): IListGenerateProperties, ListGenerateProperties, IShoppingListPut, ShoppingListPut, ListShopUtils

### Community 73 - "[0.0.1] - February 2022"
Cohesion: 0.17
Nodes (11): [0.0.1] - February 2022, [1.1.1] - baseline, Added, Added, Changed, Changed, Changelog - The List Shop - Web Client, Deprecated (+3 more)

### Community 80 - ".isValid"
Cohesion: 0.36
Nodes (3): EmailValidator, PasswordValidator, TextValidator

### Community 82 - "Tovo"
Cohesion: 0.20
Nodes (9): Build, Code scaffolding, Development server, Further help, nextgen, Running end-to-end tests, running in weird version, Running unit tests (+1 more)

### Community 83 - "Beta release notifications and tester email / app-modal"
Cohesion: 0.27
Nodes (10): app-list-shop-header, app-content-header, Project origin and shopping workflow rationale, redirectToLogin template handler, Anonymous beta access sign in, sendTestInformation template handler, signUpForNotification template handler, Beta release notifications and tester email (+2 more)

### Community 85 - "UserDeviceInfo"
Cohesion: 0.33
Nodes (5): CreateListPost, ICreateListPost, RoleType, IUser, User

### Community 87 - "Inline tag autocomplete / Embedded p-autoComplete"
Cohesion: 0.20
Nodes (10): Embedded p-autoComplete, Event handler add, Event handler bingo, Event handler cancelAdd, Event handler cancelSelectTag, Event handler checkSearchEnter, Event handler filterTags, Selected model autoSelectedTag (+2 more)

### Community 88 - "Tag autocomplete selector / Embedded p-autoComplete"
Cohesion: 0.20
Nodes (10): Embedded p-autoComplete, Event handler add, Event handler bingo, Event handler cancelAdd, Event handler cancelSelectTag, Event handler checkSearchEnter, Event handler filterTags, Selected model autoSelectedTag (+2 more)

### Community 89 - "lint"
Cohesion: 0.22
Nodes (9): lint, builder, options, exclude, projects, tovo-e2e, architect, projectType (+1 more)

### Community 90 - "tsconfig.server.json"
Cohesion: 0.22
Nodes (8): ./tsconfig.app.json, angularCompilerOptions, entryModule, compilerOptions, module, outDir, extends, files

### Community 93 - "OperationType"
Cohesion: 0.22
Nodes (8): OperationType, Copy, CrossOff, Move, Remove, RemoveAll, RemoveCrossedOff, UnCrossOff

### Community 94 - "Create item category wizard / Category drilldown step"
Cohesion: 0.22
Nodes (9): Category drilldown step, Confirm creation and add target, Template handler createTag, Template handler drillDown, Template handler moveToStepThree, Template handler moveToStepTwo, Editable tagName, Item name step (+1 more)

### Community 96 - "Landing navigation / Event handler active"
Cohesion: 0.22
Nodes (9): Event handler active, Event handler logout, Route /home, Route /home/celebration, Route /lists/manage, Route /user/login, Route /user/password, Route /user/signup (+1 more)

### Community 99 - "AGENTS.md"
Cohesion: 0.25
Nodes (7): Architecture & Patterns, Configuration & Deployment, Development Workflow, Key Modules & Features, Project Overview, Purpose, Technology Stack

### Community 100 - "tovo"
Cohesion: 0.25
Nodes (8): tovo, styleext, @schematics/angular:component, prefix, projectType, root, schematics, sourceRoot

### Community 101 - "compilerOptions"
Cohesion: 0.25
Nodes (7): compilerOptions, module, outDir, target, types, extends, ../tsconfig.json

### Community 105 - "Shopping application navigation / Event handler logout"
Cohesion: 0.25
Nodes (8): Event handler logout, Route /dishes, Route /home, Route /home/celebration, Route /lists/manage, Route /mealplans, Route /user/password, Shopping application navigation

### Community 107 - "tsconfig.spec.json"
Cohesion: 0.25
Nodes (7): compilerOptions, outDir, types, extends, files, include, ../tsconfig.json

### Community 108 - "angular.json"
Cohesion: 0.29
Nodes (6): cli, analytics, defaultProject, newProjectRoot, $schema, version

### Community 109 - "Dishes page shell / router-outlet"
Cohesion: 0.33
Nodes (7): app-loader, router-outlet, Application shell, app-alert, Dishes page shell, app-footer, Home page shell

### Community 110 - "List Shop features / Add by item, list or dish"
Cohesion: 0.29
Nodes (7): Add by item, list or dish, Crossed item filtering, Multiple shopping lists, Offline mode, Personalized frequent items, Starter shopping list, List Shop features

### Community 112 - "Generate shopping list options / Template handler cancelInput"
Cohesion: 0.29
Nodes (7): Template handler cancelInput, Template handler sendProperties, Save as meal plan, Editable addStarterToList, Editable saveAsMealPlan, Include starter list, Generate shopping list options

### Community 113 - "Login form / Embedded route-message"
Cohesion: 0.29
Nodes (7): Embedded route-message, Form control email, Form control userPassword, Reactive form signInForm, Event handler doLogin, Event handler goToForgotPassword, Login form

### Community 114 - "Sign up form / Form control confirmPassword"
Cohesion: 0.29
Nodes (7): Form control confirmPassword, Form control email, Form control userPassword, Reactive form signUpForm, Event handler signUp, Event handler validateEmailNotTaken, Sign up form

### Community 115 - "tsconfig.app.json"
Cohesion: 0.29
Nodes (6): compilerOptions, outDir, types, extends, files, ../tsconfig.json

### Community 116 - "e2e"
Cohesion: 0.33
Nodes (6): e2e, builder, configurations, options, devServerTarget, protractorConfig

### Community 117 - "tslint.json"
Cohesion: 0.33
Nodes (5): ../tslint.json, extends, rules, component-selector, directive-selector

### Community 118 - "App launch pitch and feedback / submitFeedback template handler"
Cohesion: 0.33
Nodes (6): Campaign feedback form, app-campaign-feedback-dialog, goToTheParty template handler, openSendFeedbackModal template handler, submitFeedback template handler, App launch pitch and feedback

### Community 121 - "Home Two composition / app-about"
Cohesion: 0.33
Nodes (6): app-about, app-feature, app-header, app-intro-two, app-testimonial, Home Two composition

### Community 122 - "Privacy policy summary / app-content-header"
Cohesion: 0.33
Nodes (6): app-content-header, Login cookie policy, User deletion route /user/delete, Email account identifier policy, Full privacy policy PDF, Privacy policy summary

### Community 123 - "Shopping list manager / app-confirm-dialog"
Cohesion: 0.33
Nodes (6): app-confirm-dialog, app-single-list-element, Template handler createShoppingList, Template handler deleteShoppingList, Template handler editShoppingList, Shopping list manager

### Community 124 - "Meal plan manager / app-confirm-dialog"
Cohesion: 0.33
Nodes (6): app-confirm-dialog, app-single-plan-element, Template handler createMealPlan, Template handler deleteMealPlan, Template handler editMealPlan, Meal plan manager

### Community 125 - "Dish autocomplete selector / p-autoComplete"
Cohesion: 0.33
Nodes (6): p-autoComplete, Template handler bingo, Template handler cancelDishInput, Template handler filterDishes, Editable autoSelectedDish, Dish autocomplete selector

### Community 129 - "Change password form / Form control confirmPassword"
Cohesion: 0.33
Nodes (6): Form control confirmPassword, Form control newPassword, Form control originalPassword, Reactive form signUpForm, Event handler changePassword, Change password form

### Community 130 - "[0.0.0] template - date"
Cohesion: 0.40
Nodes (5): [0.0.0] template - date, Added, Changed, Deprecated, Fixed

### Community 131 - "[2.2.0] June 2022"
Cohesion: 0.40
Nodes (5): [2.2.0] June 2022, Added, Changed, Deprecated, Fixed

### Community 135 - "Application footer / Embedded app-celebration"
Cohesion: 0.40
Nodes (5): Embedded app-celebration, Event handler onActivate, Route /home/aboutme, Route /home/privacy, Application footer

### Community 136 - "Password token reset form / Form control confirmPassword"
Cohesion: 0.40
Nodes (5): Form control confirmPassword, Form control userPassword, Reactive form signUpForm, Event handler resetPassword, Password token reset form

### Community 137 - "Request password reset form / Embedded ngx-spinner"
Cohesion: 0.40
Nodes (5): Embedded ngx-spinner, Form control email, Reactive form signUpForm, Event handler requestReset, Request password reset form

### Community 138 - "[2.3.0] June 2022"
Cohesion: 0.50
Nodes (4): [2.3.0] June 2022, Added, Changed, Fixed

### Community 139 - "[2.5.1] July 2023"
Cohesion: 0.50
Nodes (4): [2.5.1] July 2023, Added, Changed, Fixed

### Community 140 - "Campaign landing composition / app-celebration"
Cohesion: 0.50
Nodes (4): app-celebration, app-main-pitch, app-pitch-features, Campaign landing composition

### Community 142 - "Meal plan selection / cancelMealplanInput template handler"
Cohesion: 0.50
Nodes (4): cancelMealplanInput template handler, createNewMealplan template handler, mealplanIsSelected template handler, Meal plan selection

### Community 143 - "List Shop introduction and app access / App Store availability"
Cohesion: 0.50
Nodes (4): App Store availability, Authenticated app route /home/theapp, Logged out app route /home/loggedout/theapp, List Shop introduction and app access

### Community 147 - "Shopping lists page layout / app-alert"
Cohesion: 0.50
Nodes (4): app-alert, app-footer, app-list-shop-header, Shopping lists page layout

### Community 148 - "Meal plans page layout / app-alert"
Cohesion: 0.50
Nodes (4): app-alert, app-footer, app-list-shop-header, Meal plans page layout

### Community 153 - "Dish selection card / Event handler editDish"
Cohesion: 0.50
Nodes (4): Event handler editDish, Event handler selectADish, Event handler selectDishFromLink, Dish selection card

### Community 154 - "Authentication navigation / Route /home"
Cohesion: 0.50
Nodes (4): Route /home, Route /user/login, Route /user/signup, Authentication navigation

### Community 156 - "Delete account confirmation / Embedded ngx-spinner"
Cohesion: 0.50
Nodes (4): Embedded ngx-spinner, Event handler deleteUser, Route /user/login, Delete account confirmation

### Community 157 - "User page layout / Embedded app-alert"
Cohesion: 0.50
Nodes (4): Embedded app-alert, Embedded app-footer, Embedded user-header, User page layout

### Community 158 - "[2.1.0] April 2022"
Cohesion: 0.67
Nodes (3): [2.1.0] April 2022, Added, Changed

### Community 159 - "[2.4.4] January 2023"
Cohesion: 0.67
Nodes (3): [2.4.4] January 2023, Fixed, Removed

### Community 160 - "[2.4.6, 2.4.7] May 2023"
Cohesion: 0.67
Nodes (3): [2.4.6, 2.4.7] May 2023, Changed, Fixed

### Community 161 - "[2.4.8] June 2023"
Cohesion: 0.67
Nodes (3): [2.4.8] June 2023, Changed, Fixed

### Community 162 - "[2.4.9] June 2023"
Cohesion: 0.67
Nodes (3): [2.4.9] June 2023, Changed, Fixed

### Community 163 - "[2.5.0] July 2023"
Cohesion: 0.67
Nodes (3): [2.5.0] July 2023, Added, Changed

### Community 164 - "[2.6.0] July 2024"
Cohesion: 0.67
Nodes (3): [2.6.0] July 2024, Added, Changed

### Community 165 - "[2.6.1] March 2025"
Cohesion: 0.67
Nodes (3): [2.6.1] March 2025, Added, Fixed

### Community 166 - "Shopping list card / Template handler deleteList"
Cohesion: 0.67
Nodes (3): Template handler deleteList, Template handler editList, Shopping list card

### Community 167 - "Meal plan card / Template handler deletePlan"
Cohesion: 0.67
Nodes (3): Template handler deletePlan, Template handler editPlan, Meal plan card

### Community 171 - "Confirmation dialog / Template handler message.noFn"
Cohesion: 0.67
Nodes (3): Template handler message.noFn, Template handler message.yesFn, Confirmation dialog

### Community 172 - "List selection panel / Event handler cancelListInput"
Cohesion: 0.67
Nodes (3): Event handler cancelListInput, Event handler listIsSelected, List selection panel

## Knowledge Gaps
- **396 isolated node(s):** `@angular/animations`, `@angular/cdk`, `@angular/cli`, `@angular/compiler`, `@angular/compiler-cli` (+391 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1145 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **87 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@angular/core` connect `@angular/core` to `AlertService`, `IngredientInputComponent`, `package.json`, `home.module.ts`, `edit-list.component.ts`, `UserProperty`, `app.module.ts`, `rxjs`, `home.module.ts`, `AuthenticationService`, `manage-dishes.component.ts`, `home.module.ts`, `home.module.ts`, `ManageListsComponent`, `AlertService`, `.isAuthenticated`, `legend.service.ts`, `app.module.ts`, `beta-campaign.module.ts`, `AuthenticationService`, `AuthenticationService`, `shared.module.ts`, `app.server.module.ts`, `meal-plan.service.ts`, `FooterComponent`, `shoppingList.ts`, `MainPitchComponent`, `list.service.ts`, `XLModalComponent`, `HeaderComponent`, `PitchFeaturesComponent`, `user-header.component.ts`?**
  _High betweenness centrality (0.093) - this node is a cross-community bridge._
- **What connects `@angular/animations`, `@angular/cdk`, `@angular/cli` to the rest of the system?**
  _396 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `@angular/core` be split into smaller, more focused modules?**
  _Cohesion score 0.0675990675990676 - nodes in this community are weakly interconnected._
- **Why does `ngx-spinner` connect `AuthenticationService` to `app.module.ts`, `package.json`, `UserProperty`, `beta-campaign.module.ts`, `rxjs`, `Beta release notifications and tester email / app-modal`, `App launch pitch and feedback / submitFeedback template handler`, `home.module.ts`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Should `EditIngredientInlineComponent` be split into smaller, more focused modules?**
  _Cohesion score 0.05451127819548872 - nodes in this community are weakly interconnected._
- **Why does `EditIngredientInlineComponent` connect `EditIngredientInlineComponent` to `@angular/core`, `IngredientInputComponent`, `edit-list.component.ts`, `rxjs`, `EditDishComponent`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Should `IngredientInputComponent` be split into smaller, more focused modules?**
  _Cohesion score 0.06079664570230608 - nodes in this community are weakly interconnected._

Scope: src/app; existing nodes outside this scope retained. Semantic token usage unavailable from agent tools; reported zero token counters are placeholders, not measured cost.

`graphify-out/` was written into the working tree and appears in git status unless ignored.

Graph health warning (fresh extraction): 265 dangling-endpoint edges and 65 same-endpoint edge collapses in the undirected representation; some relationships may be incomplete.
