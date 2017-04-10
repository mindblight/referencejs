// @flow
import isPathSegment from '../isPathSegment';
import isArrayLikeObject from 'lodash/isArrayLikeObject';

/**
 * tests whether the argument is a {@link Path} or not
 * @param   maybePath
 * @return {Boolean}
 */
export default function isPath(maybePath :any) :boolean {
  return isArrayLikeObject(maybePath) &&
    maybePath.length > 0 &&
    maybePath.every(isPathSegment);
}
