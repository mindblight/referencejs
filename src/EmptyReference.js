// @flow
/**
 * references can point to locations without a value.
 * @example
 * const store = {};
 * const reference = createReference('nothing', 'here');
 * dereference(store, reference) == EmptyReference
 */
export default Symbol('empty reference');
