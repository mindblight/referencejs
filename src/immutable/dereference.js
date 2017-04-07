import isNil from 'lodash/isNil';

import isReference from './isReference';
import EmptyRefrence from '../EmptyReference';
import type { Store, Reference } from './typings';

export default function dereference(store :Store, reference :Reference) :* {
  if (isNil(store)) {
    throw new Error('"store" must be defined');
  }
  if (!isReference(reference)) {
    throw new Error('"reference" must be a valid reference');
  }

  return store.getIn(reference.get('path'), EmptyRefrence);
}
