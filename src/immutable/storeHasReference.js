// @flow
import isNill from 'lodash/isNil';

import isReference from './isReference';
import type { ImmutableStore, ImmutableReference } from './typings';


export default function storeHasReference(
  store :ImmutableStore,
  reference :ImmutableReference) :boolean {

  if (isNill(store)) {
    throw new Error('"store" must be defined');
  }
  if (!isReference(reference)) {
    throw new Error('"reference" must be a valid reference');
  }

  return store.hasIn(reference.get('path'));
}
