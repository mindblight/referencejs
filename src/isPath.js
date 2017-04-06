import isPathSegment from './isPathSegment';
import isArray from 'lodash/isArray';

export default function isPath(path :*) {
  return isArray(path) &&
    path.length > 0 &&
    path.every(isPathSegment);
}
