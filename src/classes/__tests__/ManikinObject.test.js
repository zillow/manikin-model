import ManikinObject from '../ManikinObject';

describe('constructor', () => {
    it('sets all initial properties as private properties on the new object', () => {
        const myObject = new ManikinObject({
            prop1: 'test',
            prop2: 0,
            prop3: false,
            prop4: null,
            method1() {},
        });
        expect(myObject.__prop1).toEqual('test');
        expect(myObject.__prop2).toEqual(0);
        expect(myObject.__prop3).toEqual(false);
        expect(myObject.__prop4).toBeNull();
        expect(myObject.__method1).toBeUndefined();
    });
    it('sets all initial methods directly on the new object', () => {
        const myObject = new ManikinObject({
            prop1: 'test',
            prop2: 0,
            prop3: false,
            prop4: null,
            method1() {
                return 'boogers';
            },
            method2() {
                return this.get('prop1');
            },
        });
        expect(myObject.method1()).toEqual('boogers');
        expect(myObject.method2()).toEqual('test');
    });
    it('includes default properties', () => {
        class TestClass extends ManikinObject {
            __getDefaults() {
                return {
                    foo: 'bar',
                };
            }
        }
        const myObject = new TestClass();
        expect(myObject.__foo).toEqual('bar');
    });
    it('includes default methods', () => {
        class TestClass extends ManikinObject {
            __getDefaults() {
                return {
                    foo() {
                        return 'bar';
                    },
                };
            }
        }
        const myObject = new TestClass();
        expect(myObject.foo()).toEqual('bar');
    });
});

describe('get', () => {
    it('returns the expected value', () => {
        const myObject = new ManikinObject({
            opinion: 'static typing is unnecessary',
        });

        expect(myObject.get('opinion')).toEqual('static typing is unnecessary');
    });
    it('returns the new value after it is _set', () => {
        const myObject = new ManikinObject({
            opinion: 'static typing is unnecessary',
        });
        myObject._set('opinion', 'Manikin is all you need');

        expect(myObject.get('opinion')).toEqual('Manikin is all you need');
    });
});

describe('getProperties', () => {
    it('retrieves all the requested values', () => {
        class ClassWithDefaults extends ManikinObject {
            __getDefaults() {
                return {
                    foo: 'bar',
                    bar: 'foo',
                };
            }
        }
        const myObject = new ClassWithDefaults({
            foo: 'far',
            fizz: 'buzz',
        });
        const result = myObject.getProperties('foo', 'bar', 'fizz', 'buzz');
        expect(result).toEqual({
            foo: 'far',
            bar: 'foo',
            fizz: 'buzz',
            buzz: undefined,
        });
    });
});

describe('modelName', () => {
    it("is '' by default", () => {
        const myObject = new ManikinObject();
        expect(myObject.modelName).toEqual('');
    });
});

describe('set', () => {
    it('returns a new object with the updated value without modifying the original', () => {
        const myObject = new ManikinObject();
        const newObject = myObject.set('opinion', 'opinionated frameworks make development easier');
        expect(myObject.__opinion).toBeUndefined();
        expect(newObject.__opinion).toEqual('opinionated frameworks make development easier');
    });
});

describe('setProperties', () => {
    it('sets all of the provided values', () => {
        class ClassWithDefaults extends ManikinObject {
            __getDefaults() {
                return {
                    foo: 'bar',
                    bar: 'foo',
                };
            }
        }
        let myObject = new ClassWithDefaults();
        myObject = myObject.setProperties({
            foo: 'far',
            fizz: 'buzz',
        });
        expect(myObject.get('foo')).toEqual('far');
        expect(myObject.get('bar')).toEqual('foo');
        expect(myObject.get('fizz')).toEqual('buzz');
    });
});

describe('__getDefaults', () => {
    it('returns an empty hash', () => {
        const myObject = new ManikinObject();
        expect(myObject.__getDefaults()).toEqual({});
    });
});
