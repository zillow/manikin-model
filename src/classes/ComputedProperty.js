/**
 * The class that represents a computed property.
 *
 * @class ComputedProperty
 * @namespace Zillow.Manikin
 */
class ComputedProperty {
  /**
   * Store the computations to be made when interacting with the computed property.
   *
   * @param {Function|Object} computation The function for computing the property. If this is an
   * Object, it should have `get` and `set` keys representing functions for getting or setting
   * the value of the computed property.
   */
  constructor(computation) {
    if (typeof computation === 'function') {
      this.compute = computation;
    } else {
      this.compute = computation.get;
      this.handleSet = computation.set;
    }
  }
}

export default ComputedProperty;
