// @flow
import { List } from 'immutable';
import isPathSegment from '../isPathSegment';

/**
 * tests whether the argument is a {@link ImmutablePath}
 * @param   maybePath
 * @return {Boolean}
 */
export default function isPath(path :*) :boolean {
  return List.isList(path)
    && path.size > 0
    && path.every(isPathSegment);
}
