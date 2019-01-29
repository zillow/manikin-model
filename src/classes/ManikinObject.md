# ManikinObject

## Methods

### get

Retrieves the specified top-level value from the model.

Example:

```javascript
import myModel from 'path/to/myModel';

const modelInstance = new myModel({
    name: 'frank',
});

modelInstance.get('name'); // 'frank'
```

### getProperties

Retrieves multiple top-level values from the model as an object.

Example:

```javascript
import myModel from "path/to/myModel";

const modelInstance = new myModel({
    firstName: 'Frank',
    lastName: 'Sinatra'
});

modelInstance.getProperties('firstName', 'lastName');

// returns:
{
    firstName: 'Frank',
    lastName: 'Sinatra'
}
```

### set

Returns a copy of the model instance with the set field changed. Does not alter the original instance.

Example:

```javascript
import myModel from 'path/to/myModel';

const modelInstance = new myModel({
    name: 'frank',
});

const updatedModelInstance = modelInstance.set('name', 'Frank');

modelInstance.get('name'); // 'frank'
updatedModelInstance.get('name'); // 'Frank'
```

### setProperties

Returns a copy of the model instance with the set fields changed. Does not alter the original instance.

Example:

```javascript
import myModel from 'path/to/myModel';

const modelInstance = new myModel({
    firstName: 'frank',
    lastName: 'sinatra',
});

const updatedModelInstance = modelInstance.setProperties({
    firstName: 'Frank',
    lastName: 'Sinatra',
});

modelInstance.get('firstName'); // 'frank'
modelInstance.get('lastName'); // 'sinatra'
updatedModelInstance.get('firstName'); // 'Frank'
updatedModelInstance.get('lastName'); // 'Sinatra'
```

## Properties

### modelName

Example:

```javascript
import myModel from 'path/to/myModel';

const modelInstance = new myModel();

// Returns whatever modelName value was provided to createModel.
console.log(modelInstance.modelName);
```
