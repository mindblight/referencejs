// @flow
import isPath from './isPath';

export default function isReference(reference :*) :boolean {
  return !!reference && isPath(reference.path);
}
