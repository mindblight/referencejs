import isPath from './isPath';

import type { PathSegment } from './typings';
import type { FirstArg } from './createPath';
import createPath from './createPath';

/* Reference */
export default function createReference(firstArg :FirstArg, ...pathSegments :PathSegment[]) :Reference {
  const path = createPath(firstArg, ...pathSegments);
  if (!isPath(path)) {
    throw Error(`path" must be a non-empty array of strings and integers. Received ${path.join(', ')}`);
  }

  return { path };
}
