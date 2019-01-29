# Manikin Model

Manikin provides a basis for defining models/schema for JavaScript concepts.

## Docs

- [API](src/api.md)

## Installation

`npm install manikin-model --save`

## Overview

Example of a basic model:

```javascript
import { createModel } from "manikin-model";

/**
 * A model that represents a company.
 *
 * @class CompanyModel
 */
const CompanyModel = createModel("CompanyModel", {
  /**
   * The name of the company.
   *
   * @type {String}
   * @default ''
   */
  companyName: "",

  /**
   * The url for the company.
   *
   * @type {String}
   * @default null
   */
  url: null
});

export default CompanyModel;
```

Creating an instance of the model:

```javascript
import CompanyModel from "./path/to/CompanyModel";

let microsoft = new CompanyModel({
  companyName: "Microsoft"
});

// Get a value
console.log(microsoft.get("companyName")); // 'Microsoft'

// Set a value and get it after it has been changed
console.log(microsoft.get("url")); // null
microsoft = microsoft.set("url", "http://microsoft.com");
console.log(microsoft.get("url")); // 'http://microsoft.com'

// Get and set multiple properties at a time
console.log(microsoft.getProperties("companyName", "url")); // { companyName: 'Microsoft', url: 'http://microsoft.com'}
microsoft = microsoft.setProperties({
  companyName: "Google",
  url: "http://google.com"
});
console.log(microsoft.getProperties("companyName", "url")); // { companyName: 'Google', url: 'http://google.com'}
```

## Testing

This project uses Jest for testing. Relevant tests will be run on precommit, and all tests will be run on Jenkins once your changes are pushed.

- Run tests relevant to your changes `npm test`
- Run all test via `npm test -- --watchAll`.
- Run all tests without watch by running `npm test -- --no-watch`.
- Run tests for a specific file by running `npm test -- MyFile.js`.
- Run tests based on the test name by running `npm test -- -t 'test pattern'`.
- Run test with coverage by running `npm test -- --coverage`.

Because this is a utility that could be used in many ways, a high level of testing coverage will be maintained on this project.

## Linting

This project uses eslint and prettier to format JavaScript.
