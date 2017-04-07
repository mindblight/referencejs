// @flow
import isNil from 'lodash/isNil';
import isArrayLikeObject from 'lodash/isArrayLikeObject';
import isPlainObject from 'lodash/isPlainObject';
import mapValues from 'lodash/mapValues';

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
