# Welcome to the GitHub Node API!

This project has been created using **webpack-cli**

## Getting started

### Prerequisites

#### Minimum versions

- Node >= 16.19.0
- yarn >= 1.22.19
- npm >= 8.19.3

### Installing Dependencies

To install all packages, run `yarn install`

#### Global packages

### Environment variables

See the .env.sample file for required environment variables. Most values can be copy/pasted into your own `.env` file. Values surrounded by {YOUR_VALUE_HERE} will require some additional work to configure.

#### GITHUB_TOKEN

To set up your GitHub personal access token, follow GitHub's instructions [here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-personal-access-token-classic)

### Running the App

This application runs in development mode using ts-node-dev. To start the application, run `yarn start`

To build the app, run `yarn build:dev` to build the application using its development configuration, or run `yarn build:prod` to build the application using its production configuration

### Running tests

- Unit tests: `yarn test`
- Integration tests: `yarn test:integration`
- Unit test coverage: `yarn coverage`
- Integration test coverage: `yarn coverage:integration`
- Run tests in watch mode: `yarn test:watch`

### Documentation

- Inline JSdoc comments
- Generated documentation using jsdoc + better-docs
  - To generate docs, run `yarn docs`. Open the generated `index.html` withing `./docs` in the browser
- Swagger OpenAPI
  - After starting the application, navigate to `/api-docs` to see the swagger openapi documentation
