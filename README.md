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
- `npm run visual -- --run` to run the visual tests locally
- `npm run visual -- --update` to update snapshots

## folder structure

- ui/specs - a place where your Tests should be placed
- ui/po - Page Objects and Element Objects should be here
- ui/data - your REPEATABLE tests data that is used in the tests should be stored here
- ui/utils - folder for any helper classes you might need
- ui/interfaces - should hold any repeatable interfaces(types)
- ui/fixtures - Page fixtures or configuration fixtures etc.

## Visual Testing:

Docker should be installed and running.
`npm run visual -- --run`

# Main Goal to use Docker:

- To avoid screenshot differences caused by various OS(windows/mac/linux), Browser versions etc.
- Run visual tests inside a docker container locally. (on ci/cd it will be in a container by default)
- baselines will be stored in `ui/snapshots`
- IMPORTANT: USE the same docker container locally and on CI/CD
- Notes: To make it stable and cross-platform we need to install node modules inside the docker container
- This means you will have to reinstall the dependencies
