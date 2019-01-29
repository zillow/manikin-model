import { assertPropTypes } from 'wattyrev-check-prop-types';
import ComputedProperty from '../classes/ComputedProperty';

/**
 * A plugin that allows PropTypes to be used with a ManikinObject.
 *
 * Example:
 * ```
 * const MyModel = createModel('MyModel', {...});
 *
 * MyModel.prototype.propTypes = {
 *   ...my prop types go here
 * }
 *
 * // Add a model name for easier debugging
 * MyModel.prototype.modelName = "MyModel";
 * ```
 *
 * @class propTypesPlugin
 * @namespace Zillow.Manikin.Plugins
 * @param  {Class} ParentClass The class being extended with the plugin functionality
 * @return {Class} The parent class extended with prop types functionality
 */
const propTypesPlugin = function propTypesPlugin(ParentClass) {
  return class PropTypesClass extends ParentClass {
    /**
     * Evaluate the given property and value to determine if it validates prop types.
     * @param  {String} propertyName The name of the property to check
     * @param  {*} value The value to check validity for based on the propertyName
     */
    _evaluatePropTypes(propertyName, value) {
      const { propTypes } = this;

      // Only check the proptype for the property if it exists
      if (
        process.env.NODE_ENV !== 'production' &&
        propTypes &&
        propTypes[propertyName]
      ) {
        // Create a hash containing just the proptype that we are interested in
        const propTypeHash = {};
        propTypeHash[propertyName] = propTypes[propertyName];

        // Create a hash containing only the property that we are interested in, but with
        // the new value that the user is trying to set
        const valueHash = {};
        valueHash[propertyName] = value;

        // Check the prop types
        assertPropTypes(propTypeHash, valueHash, 'property', this.modelName);
      }
    }

    // Extend Manikin's get property to evaluate the prop types of values when they are
    // retrieved. This mostly ensures that computed properties' computations match prop types
    get(propertyName, ...rest) {
      const value = super.get(propertyName, ...rest);
      this._evaluatePropTypes(propertyName, value);

      // Continue setting the property as usual
      return value;
    }

    // Extend Manikin's _set property to evaluate the prop types during instantiation
    _set(propertyName, value, ...rest) {
      // Allow computed properties to be set regardless of proptypes. The get check will catch
      // any invalid values in computed properties. This allows Manikin to _set computed
      // properties during instantiation.
      if (!(value instanceof ComputedProperty)) {
        this._evaluatePropTypes(propertyName, value);
      }

      // Continue setting the property as usual
      return super._set(propertyName, value, ...rest);
    }

    // Extend Manikin's set property to evaluate the prop types of values when they are being
    // set
    set(propertyName, value, ...rest) {
      this._evaluatePropTypes(propertyName, value);

      // Continue setting the property as usual
      return super.set(propertyName, value, ...rest);
    }
  };
};

export default propTypesPlugin;
