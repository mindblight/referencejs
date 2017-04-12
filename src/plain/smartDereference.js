// @flow
import isNil from 'lodash/isNil';
import isArrayLikeObject from 'lodash/isArrayLikeObject';
import isPlainObject from 'lodash/isPlainObject';
import mapValues from 'lodash/mapValues';

import isReference from './isReference';
import dereference from './dereference';
import type { Store } from './typings';

/**
 * Traverses `val` and dereferences every reference.
 * @param  store
 * @param  val    The object to scan. {@link Reference}s are dereferenced,
*                 all {@link https://lodash.com/docs/4.17.4#isArrayLikeObject|ArrayLikeObjects} are iteratated,
*                 all {@link https://lodash.com/docs/4.17.4#isPlainObject|PlainObjects} are traversed,
*                 and everything else is returned unmodified.
 * @return        A new object with all references dereferenced
 *
 * @example
 * import createReference from 'referencejs/plain/createReference';
 * import resolveReference from 'referencejs/plain/resolveReference';
 * import smartDereference from 'referencejs/plain/smartDereference';
 *
 * function createUserReference(user) {
 *   return createReference('users', user.id);
 * }
 *
 * let store = {};
 *
 * const jon = {
 *  id: 'user_1',
 *  name: 'jon'
 * };
 * const jonReference = createUserReference(jon);
 * store = resolveReference(store, jonReference, jon);
 *
 * const james = {
 *   id: 'user_2',
 *   name: 'james'
 * };
 * const jamesReference = createUserReference(james);
 * store = resolveReference(store, jamesReference, james);
 *
 * const sally = {
 *  id: 'user_3',
 *  name: 'sally',
 * };
 * const sallyReference = createUserReference(sally);
 * store = resolveReference(store, sallyReference, sally);
 *
 * const relations = [
 *   {
 *     from: jonReference,
 *     to: sallyReference,
 *     type: "husband"
 *   },{
 *     from: sallyReference,
 *     to: jonReference,
 *     type: "wife"
 *   },{
 *     from: sallyReference,
 *     to: jamesReference,
 *     type: "daughter"
 *   },{
 *     from: jonReference,
 *     to: jamesReference,
 *     type: "son-in-law"
 *   },{
 *     from: jamesReference,
 *     to: jonReference,
 *     type: "father-in-law"
 *   },
 * ];
 * // 'from' and 'to' will be their respective user objects in the store
 * const dereferencedRelations = smartDereference(store, relations);
 */
export default function smartDereference(store :Store, val :*) :* {
  if (isNil(store)) {
    throw new Error('"store" must be defined');
  }

  if (isReference(val)) {
    return dereference(store, val);
  }
  else if(isArrayLikeObject(val)) {
    return val.map(value => smartDereference(store, value));
  }
  else if (isPlainObject(val)) {
    return mapValues(val, (value) => {
      return smartDereference(store, value);
    });
  }
  return val;
}
