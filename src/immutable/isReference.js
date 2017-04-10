// @flow
import isImmutable from './_isImmutable';
import isPath from './isPath';

/**
 * Tests whether the argument is an {@link ImmutableReference}.
 * {@link ImmutableReference} is typed as a {@link Record}, however the only requirement
 * is that it is an Immutable object where `get('path')` returns an {@link ImmutablePath}.
 * @see [Plain vs. Immutable]{@link PlainVsImmutable.md} for more details
 * @param maybeReference
 * @return
 * @example
 * import isReference from 'referencejs/immutable/isReference';
 * import createReference from 'referencejs/immutable/createReference';
 *
 * isReference(createReference('foo')) === true;
 * isReference({}) === false;
 * isReference(null) === false;
 */
export default function isReference(reference :any) :boolean {
  return isImmutable(reference) && isPath(reference.get('path'));
}
