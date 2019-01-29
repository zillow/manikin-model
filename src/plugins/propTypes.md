# Prop Types

PropTypes allows for defining proptypes with your model which will be evaluated whenever a value is set on an instance of the model.

Example:

```javascript
import { createModel } from 'manikin-model';
import PropTypes from 'prop-types';

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

// Defining PropTypes for CompanyModel
CompanyModel.prototype.propTypes = {
    companyName: PropTypes.string.isRequired,
    url: PropTypes.string,
};

export default CompanyModel;
```

Using the Model:

```javascript
import CompanyModel from './path/to/CompanyModel';

let microsoft = new CompanyModel({
    name: 'Microsoft',
    url: 1234, // An error will be thrown because `url` should be a string
});

microsoft = microsoft.set('name', true); // An error will be thrown because `name` should be a string
```

# Using Manikin models with Prop Types

In React, or other systems that use PropTypes, the defined models can be checked with PropTypes when being passed in to components and whatnot.

Example:

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import { DogModel } from 'path/to/DogModel';

const myComponent = ({ bestDog }) => (
  <p>{{bestDog.get('name')}} is the best dog ever</p>
);

myComponent.propTypes = {
  bestDog: PropTypes.instanceOf(DogModel).isRequired
};
```
