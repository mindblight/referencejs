// @flow
import isNill from 'lodash/isNil';
import isInteger from 'lodash/isInteger';
import { Map, List } from 'immutable';

import isReference from './isReference';
import type { Store, Reference, PathSegment } from './typings';


export default function resolveReference(store :Store, reference :Reference, value :*) :Store {
  if (isNill(store)) {
    throw new Error('"store" must be defined');
  }
  if (!isReference(reference)) {
    throw new Error('"reference" must be a valid reference');
  }

  const path = reference.get('path');
  if (store.hasIn(path)) {
    return store.setIn(path, value);
  }

  const pathObject = path.reduceRight((objectForMerge, pathSegment :PathSegment) => {
    if (isInteger(pathSegment)) {
      return List().set(pathSegment, objectForMerge);
    }
    return Map({
      [pathSegment]: objectForMerge,
    });
  }, value);

  return store.mergeDeep(pathObject);
}
