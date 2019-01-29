# createModel

Create a new model using the provided name and schema. Returns the created Manikin model (JS class).

Example:

```javascript
const MyModel = createModel('MyModel', {
    myProperty: null,
    myOtherProperty: 'otherProperty',
});
```

## Parameters

| Name        | Type     | Description                                                                                                                                             |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `modelName` | `String` | A name attributed to the model that you are creating. This name will be used in error messages to provide clarity on what model is having issues.       |
| `schema`    | `Object` | The schema being defined. This is an object containing default values for every defined property. This can also include methods or computed properties. |
