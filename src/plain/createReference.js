// @flow
import type { PathSegment, Reference } from './typings';
import type { FirstArg } from './createPath';
import createPath from './createPath';

/**
 * Creates a reference.
 * @param  {PathSegment | PathSegment[]} firstArg anything accepted by createPath
 * @param  pathSegments
 * @return
 *
 * @example
 *    import createReference from 'referencejs/plain/createReference'
 *    const store = {
 *      foo: {
 *        bar: 5
 *      },
 *      baz: ['hi']
 *    }
 *    // create a reference to 'foo.bar' in plain JS object
 *    createReference('foo', 'bar');
 *    createReference(['foo', 'bar']);
 *
 *    //create a reference to 'foo[0]'
 *    createReference('baz', 0);
 *    createReference(['baz', 0]);
 */
export default function createReference(firstArg :FirstArg, ...pathSegments :PathSegment[]) :Reference {
  const path = createPath(firstArg, ...pathSegments);

  return { path };
}
