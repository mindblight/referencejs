// @flow
import isPath from './isPath';

/**
 * Tests whether the argument is a {@link Reference}.
 * @param maybeReference
 * @return
 */
export default function isReference(maybeReference :any) :boolean {
  return !!maybeReference && isPath(maybeReference.path);
}
