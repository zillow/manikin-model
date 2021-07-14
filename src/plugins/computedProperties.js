import ComputedProperty from '../classes/ComputedProperty';

/**
 * A plugin that adds functionality for computed properties.
 *
 * @class computedPropertiesPlugin
 * @namespace Zillow.Manikin.Plugins
 * @param  {Class} ParentClass The class to extend with added functionality
 * @return {Class} The ParentClass extended with computed property functionality
 */
const computedPropertiesPlugin = function computedPropertiesPlugin(
  ParentClass
) {
  return class ComputedPropertiesClass extends ParentClass {
    // Extend Manikin's get method so that it will evaluate computed properties
    get(propertyName, ...rest) {
      const value = super.get(propertyName, ...rest);

      // If the user is getting a computed property, return the computed value
      if (value instanceof ComputedProperty) {
        return value.compute.bind(this)(...rest);
      }

      // Return the regular value for non-computed properties
      return value;
    }

    // Extend Manikin's private _set method so that it will evaluate computed setters or notify
    // about setting readonly computed properties
    _set(propertyName, value, instance = this, ...rest) {
      // Get the property from the default values instead of using get, because we just need
      // to check the type, and the stored value may not be set yet.
      const originalValue = instance.__getDefaults()[propertyName];

      // If the property is a computed property, and it has been set, then continue
      // with the computed property logic
      if (
        originalValue instanceof ComputedProperty &&
        instance[`__${propertyName}`]
      ) {
        // Throw an error if the computed property doesn't have a setter
        if (!originalValue.handleSet) {
          throw new Error(
            `Cannot set ${propertyName} because it is a computed property that has no setter.`
          );
        }

        // Run the setter
        return originalValue.handleSet.bind(instance)(value, ...rest);
      }

      // If the value is not a computed property or has not yet been set, set the value as
      // usual. This is done to account for `set` being called for each property within
      // the ManikinObject constructor
      return super._set(propertyName, value, instance, ...rest);
    }

    // Extend Manikin's setProperties method so that it will evaluate computed setters or notify
    // about setting readonly computed properties when setProperties is used
    setProperties(values, ...rest) {
      const defaults = this.__getDefaults();

      // Separate the computed properties from the non-computed properties
      const properties = Object.keys(values).reduce(
        (accumulatedChanges, propertyName) => {
          const originalValue = defaults[propertyName];
          if (
            originalValue instanceof ComputedProperty &&
            this[`__${propertyName}`]
          ) {
            if (!originalValue.handleSet) {
              throw new Error(
                `Cannot set ${propertyName} because it is a computed property that has no setter.`
              );
            }
            accumulatedChanges.computed[propertyName] = values[propertyName];
            return accumulatedChanges;
          }
          accumulatedChanges.nonComputed[propertyName] = values[propertyName];
          return accumulatedChanges;
        },
        { computed: {}, nonComputed: {} }
      );

      // If the value is not a computed property or has not yet been set, set the value as
      // usual. This is done to account for `set` being called for each property within
      // the ManikinObject constructor
      const updatedWithNormalProperties = super.setProperties(
        properties.nonComputed,
        ...rest
      );

      // Run each computed property
      return Object.keys(properties.computed).reduce(
        (accumulatedChanges, propertyName) => {
          const value = properties.computed[propertyName];
          const originalValue = defaults[propertyName];
          return originalValue.handleSet.bind(accumulatedChanges)(value);
        },
        updatedWithNormalProperties
      );
    }
  };
};

export default computedPropertiesPlugin;
