## Installation

- Preconditions: You have `node` and `npm` installed.
- run `npm install` to download all the needed libraries
- run `npx playwright install` this is needed to download the browser binaries.

## To run the tests
- `npm run e2e` to run UI tests
- `npm run format` to format the code

## IMPORTANT
- Step-by-step tutorial for better understanding can be found `ui/specs/tutorial-example.spec.ts`
- It contains comments/links/references

## Project structure:

# UI
- `npm run e2e` to run UI tests
- specs - test cases and suits
- po - Page Objects and PageElements
- data - holds the test related data
- snapshots - baseline screenshots
- utils

# Visual testing
- Preconditions: Docker is installed and running.
- `npm run vvisual -- --run` to run the visual tests locally
- `npm run vvisual -- --update` to update snapshots

## folder structure
- src/specs - a place where your Tests should be placed
- src/po - Page Objects and Element Objects should be here
- src/data - your REPEATABLE tests data that is used in the tests should be stored here
- src/utils - folder for any helper classes you might need
- src/interfaces - should hold any repeatable interfaces(types)
- src/fixtures - Page fixtures or configuration fixtures etc.

## Visual Testing:
Docker should be installed and running.
`npm run visual -- --run`

# Main Goal:
- To avoid screenshot differences caused by various OS(windows/mac/linux), Browser versions etc.
- Run visual tests inside a docker container locally. (on ci/cd it will be in a container by default)
- baselines will be stored in `src/snapshots`
- IMPORTANT: USE the same docker container locally and on CI/CD
- Notes: To make it stable and cross-platform we need to install node modules inside the docker container
- This means you will have to reinstall the dependencies
