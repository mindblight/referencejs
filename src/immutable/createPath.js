// @flow
import { List } from 'immutable';

import type { PathSegment, ImmutablePath } from './typings';
import isPath from './isPath';
import type { FirstArg as FirstArgPlain } from '../plain/createPath';
import createPathPlain from '../plain/createPath';

export type FirstArg = FirstArgPlain | List<PathSegment>;

/**
 * Create a reference path from *either* an array of {@link PathSegment}s, or multiple {@link PathSegment} arguments
 * @param {PathSegment | PathSegment[] | List<PathSegment>} firstArg
 * @param ...pathSegments
 * @throws {Error} if both an array of PathSegments and multiple PathSegment arguments are passed
 * @throws {Error} if something besides a PathSegment is passed
 *
 * @example
 * import { List } from 'immutable'
 * import { createPath } from 'referencejs/immutable';
 * createPath(['foo', 'bar']);
 * createPath('foo', 'bar');
 * createPath(List(['foo', 'bar']));
 *
 * // Throws an error
 * createPath(['foo'], 'bar')
 * createPath(List(['foo']), 'bar');
 * createPath({}, 9);
 */
export default function createPath(firstArg :FirstArg, ...pathSegments :PathSegment[]) :ImmutablePath {
  let path :ImmutablePath;

  if (List.isList(firstArg)) {
    if (pathSegments.length > 0) {
      throw new Error('accepts single array of PathSegments, or multiple pathSegment arguments');
    }
    path = ( firstArg :any );
  } else {
    path = List(createPathPlain((firstArg :any), ...pathSegments));
  }

  if (!isPath(path)) {
    throw Error(`PathSegments must be non-empty strings, or integers. Received ${path.join(', ')}`);
  }
  return path;
}
