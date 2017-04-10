// @flow
/**
 * A {@link Symbol} returned when a {@link Reference} or {@link ImmutableReference}
 * is not present in {@link Store} or {@link ImmutableStore}
 * @example
 * import createReference from 'referencejs/plain/createReference';
 * import dereference from 'referencejs/plain/dereference';
 *
 * const store = {};
 * const reference = createReference('nothing', 'here');
 * dereference(store, reference) === EmptyReference
 *
 * @example
 * import { Map } from 'immutable';
 * import createReference from 'referencejs/immutable/createReference';
 * import dereference from 'referencejs/immutable/dereference';
 *
 * const store = Map();
 * const reference = createReference('nothing', 'here');
 * dereference(store, reference) === EmptyReference
 */
export default Symbol('empty reference');
