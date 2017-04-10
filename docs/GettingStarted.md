# Getting Started

Install the library
```sh
npm install --save referencejs
```

Update a Plain store
```js
import { createReference, resolveReference, dereference } from 'referencejs';
const jon = {
  id: 'user_1',
  name: 'John Doe',
  email: 'jon@doe.com'
};
const jonRefrence = createReference('auth', 'users', jon.id);

let store = {};
store = resolveReference(store, jonReference, jon);

dereference(store, jonRefrence) === jon;
```

Or use immutable if that's your jam

```js
import { Map, is } from 'immutable';
import { createReference, resolveReference, dereference } from 'referencejs/immutable';
const jon = Map({
  id: 'user_1',
  name: 'John Doe',
  email: 'jon@doe.com'
});
const jonRefrence = createReference('auth', 'users', jon.id);

let store = Map();
store = resolveReference(store, jonReference, jon);

is(dereference(store, jonRefrence), jon);
```

_Next_, read [What's A Reference](Reference.md) for more details or dive right into one of the APIs:

- [Plain Object API](PlainApi.md)
- [Immutable API](ImmutableApi.md)
