// @flow
import isString from 'lodash/isString';
import isInteger from 'lodash/isInteger';

/**
 * Tests whether the given argument is a {@link PathSegment}
 * @param  {any} maybePathSegment
 * @return {boolean}
 *
 * @example
 * // Also imports from 'referencejs/immutable'
 * import { isPathSegment } from 'referencejs';
 * isPathSegment('users') === true
 * isPathSegment(5) === true
 * isPathSegment({}) === false
 *
 */
export default function isPathSegment(maybePathSegment :*) :boolean {
  // TODO: Add lodash typings and remove 'any' typecast
  return (isInteger(maybePathSegment) && (maybePathSegment :any) >= 0)
    || isString(maybePathSegment) && (maybePathSegment :any).length > 0;
}
