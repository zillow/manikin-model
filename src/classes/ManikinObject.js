/**
 * The basic ManikinObject class that provides the constructor, get, and set.
 *
 * @class ManikinObject
 * @namespace Zillow.Manikin
 */
class ManikinObject {
  /**
   * Apply all of the initial values when instantiating a model.
   *
   * @param {Object} initialValues An object containing default values and defining the schema of the mdoel
   */
  constructor(initialValues) {
    // Get the default values defined by the model and join them with the initial values
    const values = Object.assign({}, this.__getDefaults(), initialValues);

    // Apply each value
    Object.keys(values).forEach(key => {
      const value = values[key];

      // Functions are added directly, while properties are added via set
      if (typeof value === 'function') {
        this[key] = value;
      } else {
        this._set(key, value);
      }
    });
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
   * @return {ManikinObject} newInstance The new value to apply to the property
   * @private
   */
  _set(propertyName, value) {
    // Properties are stored by prefixing them with `__`.
    // This keeps them separate from methods and class functionality. It also makes it less
    // tempting to access properties directly and circumventing `get` and `set`
    this[`__${propertyName}`] = value;
    return value;
  }

  /**
   * Set the value of a property.
   *
   * @param {String} propertyName The name of the property that you want to set
   * @param {*} value The value to set the property to
   * @return {ManikinObject} newInstance The new value to apply to the property
   */
  set(propertyName, value) {
    // Like Immutable, when we set a value, return a new updated version rather than modifying
    // an existing object.
    const newInstance = Object.assign(
      Object.create(Object.getPrototypeOf(this)),
      this
    );
    newInstance._set(propertyName, value);
    return newInstance;
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
    const newInstance = Object.assign(
      Object.create(Object.getPrototypeOf(this)),
      this
    );
    Object.keys(values).forEach(propertyName =>
      newInstance._set(propertyName, values[propertyName])
    );
    return newInstance;
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
