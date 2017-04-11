// @flow
import isPath from './isPath';

/**
 * Tests whether the argument is a {@link Reference}.
 * @param maybeReference
 * @return
 * @example
 * import isReference from 'referencejs/plain/isReference';
 * import createReference from 'referencejs/plain/createReference';
 *
 * isReference(createReference('foo')) === true;
 * isReference({}) === false;
 * isReference(null) === false;
 */
export default function isReference(maybeReference :any) :boolean {
  return !!maybeReference && isPath(maybeReference.path);
}
