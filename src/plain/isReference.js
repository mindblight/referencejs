// @flow
import isPath from './isPath';

/**
 * Tests whether the argument is a {@link Reference}.
 * @param maybeReference
 * @return
 * @example
 * import { isReference, createReference } from 'referencejs';
 *
 * isReference(createReference('foo')) === true;
 * isReference({}) === false;
 * isReference(null) === false;
 */
export default function isReference(maybeReference :any) :boolean {
  return !!maybeReference && isPath(maybeReference.path);
}
