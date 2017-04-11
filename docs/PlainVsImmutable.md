# Plain vs. Immutable
ReferenceJS supports both a Plain (JSON) API, and an [Immutable](https://facebook.github.io/immutable-js/) API.
They have feature parity, and you should be able to (nearly) seamlessly switch from one to the other
by changing you import paths.

But, there are caveats. (You already guessed that, didn't you?)

## Switching from plain to Immutable
*Warning: This should work, but it is currently an untested feature. There will be bugs. See [#18](https://github.com/mindblight/referencejs/issues/18)*

The two APIs are built to interop. So,

```js
import { fromJS } from 'immutable';
import {
  createPath as createPathPlain,
  createReference as createReferencePlain,
  dereference as dereferencePlain
} from 'referencejs';
import {
  createPath as createPathImmutable,
  createReference as createReferenceImmutable,
  dereference as dereferenceImmutable
} from 'referencejs/immutable';

// The store
const value = 'hi';
const storePlain = {
  foo: [ value ]
};
const storeImmutable = fromJS(storeImmutable);

// Paths
const pathPlain = createPathPlain('foo', 0);
const pathImmutable = createPathImmutable('foo', 0);

pathImmutable.equals(pathPlain) === false;
fromJS(pathPlain).equals(pathImmutable) === true;
Object.is(pathPlain).equals(pathImmutable.toJS()) === true;

// references & dereferencing
const referencePlain = createReference(pathPlain);
const referenceImmutable = createReference(pathImmutable);

dereferencePlain(storePlain, referencePlain) === dereferenceImmutable(storeImmutable, referenceImmutable);
dereferencePlain(storeImmutable.toJS(), referenceImmutable.toJS()) === value;
dereferenceImmutable(fromJS(storePlain), fromJS(referencePlain)) === value;

Object.is(referencePlain, referenceImmutable.toJS()) === true;
// Wait, what?
fromJS(referencePlain).equals(referenceImmutable) === false;
```

Everything works as expected until we make `referencePlain` immutable and compare it to `immutablePlain`.
What happened? `createReferenceImmutable` returns a [Record](https://facebook.github.io/immutable-js/docs/#/Record).
This works better with Flowtype, and it guarantees that an immutable reference will have a `path`.
`fromJS` turns a plain JS object into a [Map](https://facebook.github.io/immutable-js/docs/#/Map) instead of a [Record](https://facebook.github.io/immutable-js/docs/#/Record). Outside of Flowtype, the code only cares
that a record is Immutable, and that `record.get('path')` returns an ImmutablePath. You can safely use any Immutable
data structure that conforms to this interface.

_Next_ Read the [Plain API](PlainApi.md) or the [Immutable API](ImmutableApi.md)
