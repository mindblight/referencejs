// @flow
import { List } from 'immutable';
import isPathSegment from '../isPathSegment';


export default function isPath(path :*) :boolean {
  return List.isList(path)
    && path.size > 0
    && path.every(isPathSegment);
}
