import { Map } from 'immutable';
import isPath from './isPath';


export default function isReference(reference :*) :boolean {
  return Map.isMap(reference) && isPath(reference.get('path'));
}
