// @flow
import { Record, List } from 'immutable';

import type { PathSegment, ImmutableReference } from './typings';
import type { FirstArg } from './createPath';
import createPath from './createPath';

const Reference = Record({
  path: List(),
});

/**
 * Creates an {@link ImmutableReference}
 * @param  {PathSegment | PathSegment[] | List<PathSegment>} firstArg
 * @param  pathSegments
 * @return
 *
 * @example
 * import { fromJS } from 'immutable';
 * import createReference from 'referencejs/immutable/createReference'
 * const store = fromJS({
 *   foo: {
 *     bar: 5
 *   },
 *   baz: ['hi']
 * });
 * // create a reference to 'foo.bar' in plain JS object
 * createReference('foo', 'bar');
 * createReference(['foo', 'bar']);
 * createReference(List(['foo', 'bar']));
 *
 * //create a reference to 'baz[0]'
 * createReference('baz', 0);
 * createReference(['baz', 0]);
 * createReference(List(['baz', 0]));
 */
export default function createReference(firstArg :FirstArg, ...pathSegments :PathSegment[]) :ImmutableReference {
  const path = createPath(firstArg, ...pathSegments);

  return Reference({ path });
}
