// @flow
import { Iterable } from 'immutable';

export default function isImmutable(obj :*) {
  return Iterable.isIterable(obj);
}
