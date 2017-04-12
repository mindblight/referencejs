// @flow
import { List } from 'immutable';
import isPathSegment from '../isPathSegment';

/**
 * tests whether the argument is a {@link ImmutablePath}
 * @param   maybePath
 * @return {Boolean}
 * @example
 * import { List } from 'immutable';
 * import isPath from 'referencejs/immutable/isPath';
 *
 * isPath(List(['foo', 0])) === true;
 * isPath(['foo', 0]) === false;
 * isPath(List(['', -10])) === false;
 */
export default function isPath(maybePath :any) :boolean {
  return List.isList(maybePath)
    && maybePath.size > 0
    && maybePath.every(isPathSegment);
}
