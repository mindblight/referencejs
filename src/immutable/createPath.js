// @flow
import { List } from 'immutable';

import type { PathSegment, ImmutablePath } from './typings';
import isPath from './isPath';
import type { FirstArg as FirstArgPlain } from '../createPath';
import createPathPlain from '../createPath';

export type FirstArg = FirstArgPlain | List<PathSegment>;

/**
 * Create a reference path from an array of path segments, or multiple arguments
 * e.g.
 *  createPath(['foo', 'bar']);
 *  createPath('foo', 'bar');
 * @param firstOrArray {PathSegment | PathSegment[] | List<PathSegment>} - an array of PathSegments, or a PathSegment
 * @param ...pathSegments
 */
export default function createPath(firstArg :FirstArg, ...pathSegments :PathSegment[]) :ImmutablePath {
  let path :ImmutablePath;

  if (List.isList(firstArg)) {
    if (pathSegments.length > 0) {
      throw new Error('accepts single array of PathSegments, or multiple pathSegment arguments');
    }
    path = ( firstArg :List<PathSegment> );
  } else {
    path = List(createPathPlain(firstArg, ...pathSegments));
  }

  if (!isPath(path)) {
    throw Error(`PathSegments must be non-empty strings, or integers. Received ${path.join(', ')}`);
  }
  return path;
}
