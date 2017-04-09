// @flow
import isNil from 'lodash/isNil';
import get from 'lodash/get';

import isReference from './isReference';
import EmptyRefrence from '../EmptyReference';
import storeHasReference from './storeHasReference';
import type { Store, Reference } from './typings';

export default function dereference(store :Store, reference :Reference) :* {
  if (isNil(store)) {
    throw new Error('"store" must be defined');
  }
  if (!isReference(reference)) {
    throw new Error('"reference" must be a valid reference');
  }

  if (storeHasReference(store, reference)) {
    return get(store, reference.path);
  }
  return EmptyRefrence;
}
