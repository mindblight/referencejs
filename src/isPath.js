// @flow
import isPathSegment from './isPathSegment';
import isArray from 'lodash/isArray';

export default function isPath(path :*) :boolean {
  return isArray(path) &&
    path.length > 0 &&
    path.every(isPathSegment);
}
