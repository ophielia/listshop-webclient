# Changelog - The List Shop - Web Client

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres
to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.5.1] July 2023
### Changed
- landing root changed - goodbye mr peanutbutter
### Added
- twitter card added.
### Fixed
- links hidden until loaded
- 
## [2.5.0] July 2023

### Added
- landing page for launch

### Changed
- footer now in module components

## [2.4.9] June 2023

### Fixed
- yet another login issue

### Changed
- adding configurable app store link.  Thinking about the future, here! 


## [2.4.8] June 2023

### Fixed
- deployment for static link (another one)
- another login issue
- checked off toggle on list

### Changed
- using production build mode
- progressively removing console.log statements


## [2.4.6, 2.4.7] May 2023

### Changed
- auth guard handles checking if token exists or not
- authentication service checks token for validity, and removes if not valid
- small text changes

### Fixed
- bad login behavior


## [2.4.5] February 2023

### Changed

- some configuration changed / fixed to run on kubernetes

## [2.4.4] January 2023

### Fixed

- constant misleading and annoying error upon login

### Removed

- all notions of layout_type for layouts


## [2.4.0] November 2022

### Added

- structure to add url for api dynamically at runtime, with default.  Used to start in docker context.
- context for dish module, so that search parameters are kept as user moves through dishes.


## [2.3.0] June 2022

### Added
- page for beta testing, where user can sign up to be notified, or receive an email
- framework for celebrations - configured through a static .json

### Changed
- application now authenticates user token validity when application is loaded

### Fixed
- some small login issues

## [2.2.0] June 2022

### Added
- stars shown  for ratings in drop down
- modal for adding item, which allows user to select category

### Changed
- call on api for tags
- dish select cleared after adding dish to meal plan

### Deprecated
- assign_select, search_select in tag object

### Fixed
-remove / cross off items clears selected list afterwards


## [2.1.0] April 2022

### Added
- navigation through meal plans
- confirm dialog service

### Changed
- frequent toggle not shown when no frequent items are available
- done button moved on add ingredient, new dish
- can only add ingredient tags

## [2.0.1] April 2022

### Fixed
* Typo on home page

## [2.0.0] March 2022 

### Changed
 * Everything! Restart from new template.
 * New look and feel for entire website
 * reworked user login / logout / password handling
 * overhaul of mealplan, list, and dish pages


## [0.0.0] template - date

### Added

### Changed

### Deprecated

### Fixed

