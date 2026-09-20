### Project Overview
This project is a client for a REST service designed to access a shopping list and meal plan service. Internally referred to as "Tovo" or "NextGen".

### Purpose
- Provide access to shopping lists, meal plans, and dishes.
- Manage user authentication and profile settings.
- Support beta testing campaigns.

### Technology Stack
- **Frontend Framework**: Angular 11.2.14
- **State Management**: RxJS based services.
- **UI Components**: PrimeNG 10, Ng-bootstrap 9, Bootstrap 4.
- **Styling**: SASS / SCSS.
- **Server-Side Rendering (SSR)**: Angular Universal (@nguniversal).
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
- **Node Version**: Recommended Node 16 (as per README).
- **Build Commands**:
  - `ng serve`: Development server.
  - `ng build`: Production build.
  - `npm run ssrbuild`: Build and serve with SSR.
- **Testing**:
  - `ng test`: Unit tests using Karma/Jasmine.
  - `ng e2e`: End-to-end tests using Protractor.
- **Linting**: Uses TSLint.
