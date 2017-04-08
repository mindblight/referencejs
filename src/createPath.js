// @flow
import isArrayLikeObject from 'lodash/isArrayLikeObject';
import clone from 'lodash/clone';

import type { PathSegment, Path } from './typings';
import isPath from './isPath';

export type FirstArg = PathSegment | PathSegment[];

/**
 * Create a reference path from an array of path segments, or multiple arguments
 * e.g.
 *  createPath(['foo', 'bar']);
 *  createPath('foo', 'bar');
 * @param firstOrArray {PathSegment | PathSegment[]} - an array of PathSegments, or a PathSegment
 * @param ...pathSegments
 */
export default function createPath(firstArg :FirstArg, ...pathSegments :PathSegment[]) :Path {
  let path :Path;

  if (isArrayLikeObject(firstArg)) {
    if (pathSegments.length > 0) {
      throw new Error('accepts single array of PathSegments, or multiple pathSegment arguments');
    }
    path = clone(firstArg);
  } else {
    path = clone(pathSegments);
    path.unshift(firstArg);
  }

  if (!isPath(path)) {
    throw Error(`PathSegments must be non-empty strings, or integers. Received ${path.join(', ')}`);
  }
  return path;
}
