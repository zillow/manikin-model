import ComputedProperty from '../classes/ComputedProperty';

/**
 * @param {Function|Object} computation The function for computing the property. If this is an
 * Object, it should have `get` and `set` keys representing functions for getting or setting
 * the value of the computed property.
 * @return {Zillow.Manikin.ComputedProperty} The computed property
 */
const computed = function computed(computation) {
  return new ComputedProperty(computation);
};

export default computed;
