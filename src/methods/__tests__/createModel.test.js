import createModel from '../createModel';

describe('when provided a schema', () => {
    it('applies default properties when creating a new instance of the model', () => {
        const Animal = createModel('Animal', {
            name: '',
            numberOfLegs: null,
        });
        const genericAnimal = new Animal();
        expect(genericAnimal.get('name')).toEqual('');
        expect(genericAnimal.get('numberOfLegs')).toBeNull();
    });

    it('applies default methods when creating a new instance of the model', () => {
        const Animal = createModel('Animal', {
            name: '',
            numberOfLegs: null,
            type: '',
            getCanFly() {
                return this.get('type') === 'bird';
            },
        });
        const owl = new Animal({
            name: 'owl',
            numberOfLegs: 2,
            type: 'bird',
        });
        expect(owl.getCanFly()).toEqual(true);
    });
});

describe('when not provided schema', () => {
    it('throws', () => {
        expect(() => createModel('Useless')).toThrow();
    });
});

describe('__getDefaults', () => {
    it('returns the default properties from the provided schema', () => {
        const Animal = createModel('Animal', {
            name: '',
            numberOfLegs: null,
            type: '',
            getCanFly() {
                return this.get('type') === 'bird';
            },
        });
        const genericAnimal = new Animal();
        expect(genericAnimal.__getDefaults()).toEqual({
            name: '',
            numberOfLegs: null,
            type: '',
        });
    });
});
