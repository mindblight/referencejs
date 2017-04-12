// @flow
import isArrayLikeObject from 'lodash/isArrayLikeObject';
import clone from 'lodash/clone';

import type { PathSegment, Path } from './typings';
import isPath from './isPath';

export type FirstArg = PathSegment | PathSegment[];

/**
 * Create a reference path from *either* an array of {@link PathSegment}s, or multiple {@link PathSegment} arguments
 * @param {PathSegment | PathSegment[]} firstArg
 * @param ...pathSegments
 * @throws {Error} if both an array of PathSegments and multiple PathSegment arguments are passed
 * @throws {Error} if something besides a PathSegment is passed
 *
 * @example
 * import createPath from 'referencejs/plain/createPath';
 * createPath(['foo', 'bar']);
 * createPath('foo', 'bar');
 *
 * // Throws an error
 * createPath(['foo'], 'bar')
 * createPath({}, 9);
 */
export default function createPath(firstArg :FirstArg, ...pathSegments :PathSegment[]) :Path {
  let path :Path;

  if (isArrayLikeObject(firstArg)) {
    if (pathSegments.length > 0) {
      throw new Error('accepts single array of PathSegments, or multiple pathSegment arguments');
    }
    path = clone(firstArg);
  } else {
    path = [(firstArg :any)].concat(pathSegments);
  }

  if (!isPath(path)) {
    throw Error(`PathSegments must be non-empty strings, or integers. Received ${path.join(', ')}`);
  }
  return path;
}
