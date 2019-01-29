import { createModel } from '../../index';

describe('development', () => {
    describe('get', () => {
        it('should get the value if it is defined in the schema', () => {
            const MyModel = createModel('MyModel', {
                floo: '',
            });
            const someInstance = new MyModel();
            expect(someInstance.get('floo')).toEqual('');
        });

        it('should throw if the value is not defined in the schema', () => {
            const MyModel = createModel('MyModel', {
                floo: '',
            });
            const someInstance = new MyModel();
            expect(() => someInstance.get('blarg')).toThrow();
        });
    });

    describe('set', () => {
        it('should set the value if it is defined in the schema', () => {
            const MyModel = createModel('MyModel', {
                floo: '',
            });
            const someInstance = new MyModel();
            expect(someInstance.set('floo', 'flarg').get('floo')).toEqual('flarg');
        });

        it('should throw when setting a value that is not defined in the schema', () => {
            const MyModel = createModel('MyModel', {
                floo: '',
            });
            const someInstance = new MyModel();
            expect(() => someInstance.set('blarg', 'flarg')).toThrow();
        });

        it('should allow instantiating the model with properties that were defined in the schema', () => {
            const MyModel = createModel('MyModel', {
                floo: '',
            });
            expect(new MyModel({ floo: 'flarg' })).toBeTruthy();
        });

        it('should throw when instantiating a model with properties not defined in the schema', () => {
            const MyModel = createModel('MyModel', {
                floo: '',
            });
            expect(() => new MyModel({ blarg: '' })).toThrow();
        });
    });
});

describe('production', () => {
    beforeEach(() => {
        process.env.NODE_ENV = 'production';
    });

    afterEach(() => {
        delete process.env.NODE_ENV;
    });

    describe('get', () => {
        it('should not throw if the value is not defined in the schema', () => {
            const MyModel = createModel('MyModel', {
                floo: '',
            });
            const someInstance = new MyModel();
            expect(someInstance.get('blarg')).toBeUndefined();
        });
    });

    describe('set', () => {
        it('should not throw when setting a value that is not defined in the schema', () => {
            const MyModel = createModel('MyModel', {
                floo: '',
            });
            const someInstance = new MyModel();
            expect(someInstance.set('blarg', 'flarg')).toBeTruthy();
        });
        it('should not throw when instantiating a model with properties not defined in the schema', () => {
            const MyModel = createModel('MyModel', {
                floo: '',
            });
            expect(new MyModel({ blarg: '' })).toBeTruthy();
        });
    });
});
