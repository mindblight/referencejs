// @flow
import isPathSegment from './isPathSegment';
import isArrayLikeObject from 'lodash/isArrayLikeObject';

export default function isPath(path :*) :boolean {
  return isArrayLikeObject(path) &&
    path.length > 0 &&
    path.every(isPathSegment);
}
