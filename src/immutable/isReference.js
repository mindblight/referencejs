// @flow
import isImmutable from './_isImmutable';
import isPath from './isPath';


export default function isReference(reference :any) :boolean {
  return isImmutable(reference) && isPath(reference.get('path'));
}
