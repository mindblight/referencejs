// @flow
/**
 * A {@link Symbol} returned when a {@link Reference} or {@link ImmutableReference}
 * is not present in {@link Store} or {@link ImmutableStore}
 * @example
 * import { createReference, dereference } from 'referencejs';
 *
 * const store = {};
 * const reference = createReference('nothing', 'here');
 * dereference(store, reference) === EmptyReference
 *
 * @example
 * import { Map } from 'immutable';
 * import { createReference, dereference } from 'referencejs/immutable';
 *
 * const store = Map();
 * const reference = createReference('nothing', 'here');
 * dereference(store, reference) === EmptyReference
 */
export default Symbol('empty reference');
