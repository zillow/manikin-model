## AssertUnknownProperties

AssertUnknownProperties asserts that every property set or retrieved from a Manikin model was defined in the schema.

Example:

```javascript
import { createModel } from 'manikin-model';

/**
 * A model that represents a company.
 *
 * @class CompanyModel
 */
const CompanyModel = createModel('CompanyModel', {
    /**
     * The name of the company.
     *
     * @type {String}
     * @default ''
     */
    companyName: '',

    /**
     * The url for the company.
     *
     * @type {String}
     * @default null
     */
    url: null,
});

export default CompanyModel;
```

Using the model:

```javascript
import CompanyModel from './path/to/CompanyModel';

let microsoft = new CompanyModel({
    name: 'Microsoft',
    url: 'http://microsoft.com',
});

console.log(microsoft.get('companyName')); // Microsoft
console.log(microsoft.get('foobar')); // Throws Error because foobar was not defined in the CompanyModel schema
microsoft = microsoft.set('companyMame', 'microsoft'); // Throws Error because companyMame was not defined in the CompanyModel schema
```
