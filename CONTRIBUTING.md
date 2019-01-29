# Contributing

## Install

This project is managed by NPM.

```
npm i
```

## Build

The build process will create a dist folder containing `manikin.cjs.js` and `manikin.esm.js` files.

```
npm run build
```

## Linting

Linting is managed by eslint and prettier.

```
npm run lint
```

## Testing

Tests are run through jest. 100% test coverage is enforced.

-   Run tests relevant to your changes `npm test`
-   Run all test via `npm test -- --watchAll`.
-   Run all tests without watch by running `npm test -- --no-watch`.
-   Run tests for a specific file by running `npm test -- MyFile.js`.
-   Run tests based on the test name by running `npm test -- -t 'test pattern'`.
-   Run test with coverage by running `npm test -- --coverage`.
