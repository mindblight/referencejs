// @flow
import type { PathSegment, Reference } from './typings';
import type { FirstArg } from './createPath';
import createPath from './createPath';

/* Reference */
export default function createReference(firstArg :FirstArg, ...pathSegments :PathSegment[]) :Reference {
  const path = createPath(firstArg, ...pathSegments);

  return { path };
}
