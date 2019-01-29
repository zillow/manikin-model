import ManikinObject from '../classes/ManikinObject';
import assertUnknownPropertiesPlugin from '../plugins/assertUnknownProperties';
import computedPropertiesPlugin from '../plugins/computedProperties';
import propTypesPlugin from '../plugins/propTypes';

/**
 * @param {String} modelName A name by which to refer to the new model
 * @param  {Object} schema A hash defining the schema for a model with default values.
 * @return {Class}        Returns a class that is an extension of ManikinObject and the classes
 * implemented by the plugins.
 */
const createModel = function createModel(modelName, schema) {
  if (!schema) {
    throw new Error('A schema must be provided when using createModel');
  }
  // Let each plugin extend ManikinObject to come up with a new class
  const plugins = [
    computedPropertiesPlugin,
    assertUnknownPropertiesPlugin,
    propTypesPlugin
  ];
  const ClassWithPlugins = plugins.reduce(
    (BuiltClass, plugin) => plugin(BuiltClass),
    ManikinObject
  );

  // Separate the properties and methods from the schema
  // Properties will be only accessable via get/set, but methods should be accessable directly
  const { props, methods } = Object.keys(schema).reduce(
    (built, key) => {
      const value = schema[key];
      if (typeof value === 'function') {
        built.methods[key] = value;
        return built;
      }
      built.props[key] = value;
      return built;
    },
    {
      methods: {},
      props: {}
    }
  );

  // Create a new internal class that will represent the new model
  class InternalClass extends ClassWithPlugins {
    get modelName() {
      return modelName;
    }

    /**
     * Retrieves the default values defined in the schema when the model was created.
     * This only retrieves properties, not methods.
     *
     * @return {Object} The default values defined when creating a model
     */
    __getDefaults() {
      const superDefaults = super.__getDefaults();
      return Object.assign({}, superDefaults, props);
    }
  }

  // Add each method to the new class
  Object.keys(methods).forEach(key => {
    InternalClass.prototype[key] = methods[key];
  });

  return InternalClass;
};

export default createModel;
