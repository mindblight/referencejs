import isPath from './isPath';


export default function isReference(reference :*) {
  return !!reference && isPath(reference.path);
}
