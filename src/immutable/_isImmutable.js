// @flow
import { Iterable } from 'immutable';

// TODO: Replace with Immutable.isImmutable when 4.0 comes out
export default function isImmutable(obj :*) {
  return Iterable.isIterable(obj);
}
