/**
 * The basic ManikinObject class that provides the constructor, get, and set.
 *
 * @class ManikinObject
 * @namespace Zillow.Manikin
 */
class ManikinObject {
  /**
   * An internal flag to indicate if the constructor has finished running. We may want to behave
   * differently in situations dispatched by the constructor as opposed to other situations.
   * @type {Boolean}
   */
  __constructed = false;

  /**
   * Apply all of the initial values when instantiating a model.
   *
   * @param {Object} initialValues An object containing default values and defining the schema of the mdoel
   */
  constructor(initialValues = {}) {
    const applyValues = values => {
      Object.keys(values).forEach(key => {
        const value = values[key];

        // Functions are added directly, while properties are added via set
        if (typeof value === 'function') {
          this[key] = value;
        } else {
          this._set(key, value);
        }
      });
    };

    // Apply each default value
    applyValues(this.__getDefaults());

    // Apply overrides after the defaults have been applied to ensure the initialValues are applied
    // on top of the defaults. This is particularly important for computed properties since, if we
    // applied combined values at once, a computed property may manipulate some other value that
    // could then be overwritten by a default value depending on the order of the keys.
    applyValues(initialValues);

    // Update the constructed flag to indicate that the constructor is done
    this.__constructed = true;
  }

  /**
   * The name of the model.
   *
   * @type {String}
   */
  get modelName() {
    return '';
  }

  /**
   * Get the value of a property.
   *
   * @param  {String} propertyName The name of the property that you want to retrieve
   * @return {*} The value of the named property
   */
  get(propertyName) {
    // Properties are stored by prefixing them with `__`.
    // This keeps them separate from methods and class functionality. It also makes it less
    // tempting to access properties directly and circumventing `get` and `set`
    return this[`__${propertyName}`];
  }

  /**
   * Get multiple properties at once.
   *
   * @param  {String} propertyNames The names of the properties to get
   * @return {Object} Values indexed by propertyName
   */
  getProperties(...propertyNames) {
    return propertyNames.reduce((built, propertyName) => {
      built[propertyName] = this.get(propertyName);
      return built;
    }, {});
  }

  /**
   * Sets a value on the object instead of making a copy with updated values. Used internally.
   * @param {String} propertyName The name of the property that you want to set
   * @param {*} value The value to set the property to
   * @param {ManikinObject} instance The instance of a manikin object to update
   * @return {ManikinObject} The updated manikin object
   * @private
   */
  _set(propertyName, value, instance = this) {
    // Properties are stored by prefixing them with `__`.
    // This keeps them separate from methods and class functionality. It also makes it less
    // tempting to access properties directly and circumventing `get` and `set`
    instance[`__${propertyName}`] = value;
    return instance;
  }

  /**
   * Set the value of a property.
   *
   * @param {String} propertyName The name of the property that you want to set
   * @param {*} value The value to set the property to
   * @return {ManikinObject} newInstance The new value to apply to the property
   */
  set(propertyName, value, ...rest) {
    // Like Immutable, when we set a value, return a new updated version rather than modifying
    // an existing object.
    const newInstance = Object.assign(
      Object.create(Object.getPrototypeOf(this)),
      this
    );
    return newInstance._set(propertyName, value, newInstance, ...rest);
  }

  /**
   * Set a list of properties at once.
   *
   * @param {Object} values the hash of keys and values to set
   * @return {Object} the passed ahash
   */
  setProperties(values) {
    // Like Immutable, when we set a value, return a new updated version rather than modifying
    // an existing object.

    // If we are still constructing the object, apply values directly to this
    let instance = this;

    // If the object has already been constructed, create a copy of this, and apply values there for
    // immutability.
    if (this.__constructed) {
      instance = Object.assign(
        Object.create(Object.getPrototypeOf(this)),
        this
      );
    }

    // Set each value provided
    Object.keys(values).forEach(propertyName =>
      instance._set(propertyName, values[propertyName], instance)
    );
    return instance;
  }

  /**
   * Get the default properties defined by the schema.
   *
   * @return {Object} The default properties defined when the model is created
   * @private
   */
  __getDefaults() {
    return {};
  }
}
export default ManikinObject;
