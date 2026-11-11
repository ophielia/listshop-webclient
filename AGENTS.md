### Project Overview
This project is a client for a REST service designed to access a shopping list and meal plan service. Internally referred to as "Tovo" or "NextGen".

### Purpose
- Provide access to shopping lists, meal plans, and dishes.
- Manage user authentication and profile settings.
- Support beta testing campaigns.

### Technology Stack
- **Frontend Framework**: Angular 16.2.12
- **State Management**: RxJS based services.
- **UI Components**: PrimeNG 16, Ng-bootstrap 15, Bootstrap 5.2.
- **Styling**: SASS / SCSS.
- **Rendering**: Browser app served by Nginx; unused Angular Universal support removed during upgrade preparation.
- **Logging**: ngx-logger.
- **Service**: Calls on a Spring Boot REST application (in-house development).

### Key Modules & Features
- **Lists (`/lists`)**: Management of shopping lists.
- **Meal Plans (`/meal-plans`)**: Planning meals and associating dishes.
- **Dishes (`/dishes`)**: Recipe/Dish management, including ingredients.
- **User (`/user`)**: Authentication (Login, Sign-up, Password Reset).
- **Beta Campaign (`/beta-campaign`)**: Logic for beta testers and feedback.

### Architecture & Patterns
- **Service-Driven**: Logic is centralized in Angular services found in `src/app/shared/services`.
- **Model-Driven**: TypeScript models for API entities are located in `src/app/model`.
- **Authentication**: JWT-based authentication. The user object (including token) is stored in `localStorage` under the key `currentUser`.
- **API Communication**: Standard `HttpClient` with JSON payloads. Base64 encoding is used for sensitive data like passwords during registration/change.

### Configuration & Deployment
- **Runtime Configuration**: Uses `src/assets/config/config.json`. In Docker, this is generated from `config.template.json` using `envsubst` to allow environment variable injection at runtime.
- **Dockerized**: Multi-stage build (Node build stage -> Nginx serving stage).
- **Environment**: Backend API typically runs on `http://localhost:8182/` in development.

### Development Workflow
- **Node Version**: Node 18.19.1 / npm 10.2.4 for the Angular 16 checkpoint (see `.nvmrc`); isolated Playwright checks use Node 24.15.0 in `e2e/`.
- **Build Commands**:
  - `ng serve`: Development server.
  - `ng build`: Production build.
- **Testing**:
  - `ng test`: Unit tests using Karma/Jasmine.
  - Browser checks: See `e2e/README.md` for Playwright commands.
- **Linting**: `npm run lint` uses angular-eslint with explicit correctness rules; formatting is deferred.
- **Upgrade tests**: `npm run test:upgrade` runs focused behavioral tests. Generated legacy component specs remain an accepted failing baseline.
