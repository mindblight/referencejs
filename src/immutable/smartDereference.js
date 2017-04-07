// @flow
import isNil from 'lodash/isNil';
import { Record } from 'immutable';

import isImmutable from './_isImmutable';
import isReference from './isReference';
import dereference from './dereference';
import type { Store } from './typings';

export default function smartDereference(store :Store, val :*) :* {
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
