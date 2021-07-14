import PropTypes from 'prop-types';
import { createModel, computed } from '../../index';

describe('development', () => {
  describe('get', () => {
    it("should throw when a computed property's computation is invalid", () => {
      const MyModel = createModel('MyModel', {
        oneProperty: '',
        twoProperty: '',
        someComputedThing: computed(() => 123)
      });
      MyModel.prototype.propTypes = {
        someComputedThing: PropTypes.string.isRequired
      };
      expect(() => new MyModel()).toThrow();
    });
    it("should not throw when a computed property's computation is valid", () => {
      const MyModel = createModel('MyModel', {
        oneProperty: '',
        twoProperty: '',
        someComputedThing1: computed(() => '123')
      });
      MyModel.prototype.propTypes = {
        someComputedThing1: PropTypes.string.isRequired
      };
      const myInstance = new MyModel();
      expect(myInstance.get('someComputedThing1')).toBeTruthy();
    });
    it("should throw when the computed property's computation is invalid after instantiation", () => {
      const MyModel = createModel('MyModel', {
        oneProperty: true,
        someComputedThing2: computed(function computeSomeComputedThing() {
          if (this.get('oneProperty')) {
            return '123';
          }
          return 456;
        })
      });
      MyModel.prototype.propTypes = {
        someComputedThing2: PropTypes.string.isRequired
      };
      let myInstance = new MyModel();
      myInstance = myInstance.set('oneProperty', false);
      expect(() => myInstance.get('someComputedThing2')).toThrow();
    });
  });
  describe('set', () => {
    it('should allow instantiating the model if it is defined properly', () => {
      const MyModel = createModel('MyModel', {
        a: '',
        b: null,
        c: true,
        d: 123
      });
      MyModel.prototype.propTypes = {
        a: PropTypes.string.isRequired,
        b: PropTypes.string,
        c: PropTypes.bool.isRequired,
        d: PropTypes.number.isRequired
      };
      expect(new MyModel()).toBeTruthy();
    });
    it('should allow instantating a model with invalid default properties if the invalid properties are overridden', () => {
      const MyModel = createModel('MyModel', {
        a: '',
        b: null,
        c: true,
        d: 123
      });
      MyModel.prototype.propTypes = {
        a: PropTypes.string.isRequired,
        b: PropTypes.string.isRequired,
        c: PropTypes.bool.isRequired,
        d: PropTypes.number.isRequired
      };
      expect(new MyModel({ b: 'overriding value' })).toBeTruthy();
    });
    it('should throw when instantiating the model if the model schema doesnt match the proptypes', () => {
      const MyModel = createModel('MyModel', {
        a: '',
        b: null,
        c: true,
        d: 123
      });
      MyModel.prototype.propTypes = {
        a: PropTypes.string.isRequired,
        b: PropTypes.string.isRequired,
        c: PropTypes.bool.isRequired,
        d: PropTypes.number.isRequired
      };
      expect(() => new MyModel()).toThrow();
    });
    it('should allow instantiating the model with valid properties', () => {
      const MyModel = createModel('MyModel', {
        a: '',
        b: null,
        c: true,
        d: 123
      });
      MyModel.prototype.propTypes = {
        a: PropTypes.string.isRequired,
        b: PropTypes.string,
        c: PropTypes.bool.isRequired,
        d: PropTypes.number.isRequired
      };
      expect(
        new MyModel({
          a: 'new value',
          b: 'another new value',
          c: false,
          d: 456
        })
      ).toBeTruthy();
    });
    it('should throw when instantiating the model with invalid properties', () => {
      const MyModel = createModel('MyModel', {
        a: '',
        b: null,
        c: true,
        d: 123
      });
      MyModel.prototype.propTypes = {
        a: PropTypes.string.isRequired,
        b: PropTypes.string,
        c: PropTypes.bool.isRequired,
        d: PropTypes.number.isRequired
      };
      expect(
        () =>
          new MyModel({
            a: 456
          })
      ).toThrow();
    });
    it('should allow setting values that match the prop types', () => {
      const MyModel = createModel('MyModel', {
        a: '',
        b: null,
        c: true,
        d: 123
      });
      MyModel.prototype.propTypes = {
        a: PropTypes.string.isRequired,
        b: PropTypes.string,
        c: PropTypes.bool.isRequired,
        d: PropTypes.number.isRequired
      };
      const myInstance = new MyModel();
      expect(myInstance.set('a', 'new value')).toBeTruthy();
    });
    it('should throw when setting values that do not match the prop types', () => {
      const MyModel = createModel('MyModel', {
        a: '',
        b: null,
        c: true,
        d: 123
      });
      MyModel.prototype.propTypes = {
        a: PropTypes.string.isRequired,
        b: PropTypes.string,
        c: PropTypes.bool.isRequired,
        d: PropTypes.number.isRequired
      };
      const myInstance = new MyModel();
      expect(() => myInstance.set('c', 789)).toThrow();
    });
    it('allows non prop-typed properties to be set', () => {
      const MyModel = createModel('MyModel', {
        a: '',
        stuff: ''
      });
      MyModel.prototype.propTypes = {
        a: PropTypes.string.isRequired
      };
      const myInstance = new MyModel();
      expect(myInstance.set('stuff', 'things')).toBeTruthy();
    });
    it('should have an appropriate message when throwing', () => {
      const MyModel = createModel('MyModel', {
        e: ''
      });
      MyModel.prototype.propTypes = {
        e: PropTypes.string.isRequired
      };
      const myInstance = new MyModel();
      expect(() => myInstance.set('e', 789)).toThrowError(
        'Failed property type: Invalid property `e` of type `number` supplied to `MyModel`, expected `string`.'
      );
    });
    it('should allow for instantiating a model with a computed property', () => {
      const MyModel = createModel('MyModel', {
        staticProperty: '',
        someComputedThing: computed(() => 'Some Value')
      });
      MyModel.prototype.propTypes = {
        staticProperty: PropTypes.string.isRequired,
        someComputedThing: PropTypes.string.isRequired
      };
      expect(new MyModel()).toBeTruthy();
    });
    it('should throw when setting a computed property with an invalid value', () => {
      const MyModel = createModel('MyModel', {
        staticProperty: '',
        someComputedThing4: computed({
          get() {
            return 'Some Value';
          },
          set() {}
        })
      });
      MyModel.prototype.propTypes = {
        staticProperty: PropTypes.string.isRequired,
        someComputedThing4: PropTypes.string.isRequired
      };
      const myInstance = new MyModel();
      expect(() => myInstance.set('someComputedThing4', 123)).toThrow();
    });
    it('should allow setting a computed property with a valid value', () => {
      const MyModel = createModel('MyModel', {
        staticProperty: '',
        someComputedThing5: computed({
          get() {
            return 'Some Value';
          },
          set(value) {
            return this.set('staticProperty', value);
          }
        })
      });
      MyModel.prototype.propTypes = {
        staticProperty: PropTypes.string.isRequired,
        someComputedThing5: PropTypes.string.isRequired
      };
      const myInstance = new MyModel();
      expect(
        myInstance.set('someComputedThing5', 'some new value')
      ).toBeTruthy();
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

  describe('set', () => {
    it('should not throw when instantiating the model if the model schema doesnt match the proptypes', () => {
      const MyModel = createModel('MyModel', {
        a: '',
        b: null,
        c: true,
        d: 123
      });
      MyModel.prototype.propTypes = {
        a: PropTypes.string.isRequired,
        b: PropTypes.string.isRequired,
        c: PropTypes.bool.isRequired,
        d: PropTypes.number.isRequired
      };
      expect(new MyModel()).toBeTruthy();
    });
    it('should not throw when instantiating the model with invalid properties', () => {
      const MyModel = createModel('MyModel', {
        a: '',
        b: null,
        c: true,
        d: 123
      });
      MyModel.prototype.propTypes = {
        a: PropTypes.string.isRequired,
        b: PropTypes.string,
        c: PropTypes.bool.isRequired,
        d: PropTypes.number.isRequired
      };
      expect(
        new MyModel({
          a: 456
        })
      ).toBeTruthy();
    });
    it('should not throw when setting values that do not match the prop types', () => {
      const MyModel = createModel('MyModel', {
        a: '',
        b: null,
        c: true,
        d: 123
      });
      MyModel.prototype.propTypes = {
        a: PropTypes.string.isRequired,
        b: PropTypes.string,
        c: PropTypes.bool.isRequired,
        d: PropTypes.number.isRequired
      };
      const myInstance = new MyModel();
      expect(myInstance.set('c', 789)).toBeTruthy();
    });
  });
});
