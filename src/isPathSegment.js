// @flow
import isString from 'lodash/isString';
import isInteger from 'lodash/isInteger';

export default function(maybePathSegment :*) :boolean {
  // TODO: Add lodash typings and remove 'any' typecast
  return (isInteger(maybePathSegment) && (maybePathSegment :any) >= 0)
    || isString(maybePathSegment) && (maybePathSegment :any).length > 0;
}
