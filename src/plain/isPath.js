// @flow
import isPathSegment from '../isPathSegment';
import isArrayLikeObject from 'lodash/isArrayLikeObject';

/**
 * tests whether the argument is a {@link Path}
 * @param   maybePath
 * @return {Boolean}
 * @example
 * import { isPath } from 'referencejs';
 *
 * isPath(['foo', 0]) === true;
 * isPath(['', -10]) === false;
 */
export default function isPath(maybePath :any) :boolean {
  return isArrayLikeObject(maybePath) &&
    maybePath.length > 0 &&
    maybePath.every(isPathSegment);
}
