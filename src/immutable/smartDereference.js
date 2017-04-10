// @flow
import isNil from 'lodash/isNil';
import { Record } from 'immutable';

import isImmutable from './_isImmutable';
import isReference from './isReference';
import dereference from './dereference';
import type { ImmutableStore } from './typings';

/**
 * Traverses {@param val} and dereferences every reference.
 * @param  store
 * @param  val    The object to scan. {@link ImmutableReference}s are dereferenced,
*                 all other immutable objects are traversed, and everything else is returned unmodified.
 * @return        A new immutable object with all references dereferenced
 *
 * @example
 * import { fromJS, Map } from 'immutable';
 * import createReference from 'referencejs/immutable/createReference';
 * import resolveReference from 'referencejs/immutable/resolveReference';
 * import smartDereference from 'referencejs/immutable/smartDereference';
 *
 * function createUserReference(user) {
 *   return createReference('users', user.id);
 * }
 *
 * let store = Map();
 *
 * const jon = Map({
 *  id: 'user_1',
 *  name: 'jon'
 * });
 * const jonReference = createUserReference(jon);
 * store = resolveReference(store, jonReference, jon);
 *
 * const james = Map({
 *   id: 'user_2',
 *   name: 'james'
 * });
 * const jamesReference = createUserReference(james);
 * store = resolveReference(store, jamesReference, james);
 *
 * const sally = Map({
 *  id: 'user_3',
 *  name: 'sally',
 * });
 * const sallyReference = createUserReference(sally);
 * store = resolveReference(store, sallyReference, sally);
 *
 * const relations = fromJS([
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
 * ]);
 * // 'from' and 'to' will be their respective user objects in the store
 * const dereferencedRelations = smartDereference(store, relations);
 */
export default function smartDereference(store :ImmutableStore, val :*) :* {
  if (isNil(store)) {
    throw new Error('"store" must be defined');
  }

  if (isReference(val)) {
    return dereference(store, val);
  }
  else if (val instanceof Record) {
    // Hack to deal with Record not supporting map. See https://github.com/facebook/immutable-js/issues/505
    const dereferencedRecordData = val.toMap().map(value => smartDereference(store, value));
    const RecordClass = val.constructor;
    return new RecordClass(dereferencedRecordData);
  }
  else if (isImmutable(val)) {
    return val.map(value => smartDereference(store, value));
  }
  return val;
}
