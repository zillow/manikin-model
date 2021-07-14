# computed

Define a computed property for use in a ManikinObject model.

Example:

```javascript
const myModel = createModel('MyModel', {
    firstName: '',
    lastName: '',
    fullName: computed(function() {
        return this.get('firstName') + ' ' + this.get('lastName');
    }),
});

const modelInstance = new myModel({
    firstName: 'Frank',
    lastName: 'Sinatra',
});

modelInstance.get('fullName'); // 'Frank Sinatra'
```

You can also define a property with a getter and setter. If no setter is provided, the computed
property will be considered readonly, and any attempt to set the value will result in an error.

```javascript
const myModel = createModel('MyModel', {
    firstName: '',
    lastName: '',
    fullName: computed({
        get() {
            return this.get('firstName') + ' ' + this.get('lastName');
        },
        set(value) {
            const names = value.split[' '];

            // Manikin models are immutable, so the set must be returned
            return this.setProperties({
                firstName: names[0],
                lastName: names[1],
            });
        },
    }),
});

let modelInstance = new myModel({
    firstName: 'Frank',
    lastName: 'Sinatra',
});

modelInstance.get('fullName'); // 'Frank Sinatra'
modelInstance = modelInstance.set('fullName', 'Freddie Mercury');
modelInstance.get('fullName'); // 'Freddie Mercury'
modelInstance.get('firstName'); // 'Freddie'
modelInstance.get('lastName'); // 'Mercury'
```

Computed properties with a setter can also be set when the model is instaniated.

```javascript
const myModel = createModel('MyModel', {
    firstName: '',
    lastName: '',
    fullName: computed({
        get() {
            return this.get('firstName') + ' ' + this.get('lastName');
        },
        set(value) {
            const names = value.split[' '];

            // Manikin models are immutable, so the set must be returned
            return this.setProperties({
                firstName: names[0],
                lastName: names[1],
            });
        },
    }),
});

let modelInstance = new myModel({
    fullName: 'Freddie Mercury',
});

modelInstance.get('fullName'); // 'Freddie Mercury'
modelInstance.get('firstName'); // 'Freddie'
modelInstance.get('lastName'); // 'Mercury'
```
