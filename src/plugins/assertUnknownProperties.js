/**
 * A plugin that throws when a property is accessed that was not defined in the model's schema.
 *
 * @class assertUnknownPropertiesPlugin
 * @param  {Class} ParentClass The class to extend with added functionality
 * @return {Class} The updated Manikin class with assert unkown properties functionality added.
 */
const assertUnknownPropertiesPlugin = function assertUnknownPropertiesPlugin(
  ParentClass
) {
  return class AssertUnknownPropertiesClass extends ParentClass {
    /**
     * Evaluate the model to see if the provided property name is known.
     *
     * @param  {String} propertyName The name of the property to evaluate
     * @param  {String} verb Some indication of what we are doing to prompt the check. Is
     * added to the error message if the check fails.
     */
    _evaluateAssertUnknownProperties(propertyName, verb) {
      // If the property requested is not already set, throw
      // We don't have to check the original schema, because the default values from the
      // schema are set on the object via the constructor
      if (
        process.env.NODE_ENV !== 'production' &&
        !Object.prototype.hasOwnProperty.call(this, `__${propertyName}`) &&
        !Object.prototype.hasOwnProperty.call(
          this.__getDefaults(),
          propertyName
        )
      ) {
        throw new Error(
          `Trying to ${verb} ${propertyName}, but ${propertyName} is not defined on ${
            this.modelName
          }.`
        );
      }
    }

    // Extend Manikin's get method to check .get of unknown properties
    get(propertyName, ...rest) {
      this._evaluateAssertUnknownProperties(propertyName, 'get');

      // Get the property as usual
      return super.get(propertyName, ...rest);
    }

    // Extend Manikin's _set method to check for instantiating a model with an unknown property
    _set(propertyName, ...rest) {
      this._evaluateAssertUnknownProperties(propertyName, 'instantiate');

      // Continue setting the property as usual
      return super._set(propertyName, ...rest);
    }

    // Extend Manikin's set method to check for setting an unknown property
    set(propertyName, ...rest) {
      this._evaluateAssertUnknownProperties(propertyName, 'instantiate');

      // Continue setting the property as usual
      return super.set(propertyName, ...rest);
    }
  };
};

export default assertUnknownPropertiesPlugin;
