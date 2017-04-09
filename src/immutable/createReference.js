// @flow
import { Record, List } from 'immutable';

import type { PathSegment, ImmutableReference } from './typings';
import type { FirstArg } from './createPath';
import createPath from './createPath';

const Reference = Record({
  path: List(),
});

/* Reference */
export default function createReference(firstArg :FirstArg, ...pathSegments :PathSegment[]) :ImmutableReference {
  const path = createPath(firstArg, ...pathSegments);

  return Reference({ path });
}
