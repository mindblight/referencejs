# Referencejs [![Build Status](https://travis-ci.org/mindblight/referencejs.svg?branch=master)](https://travis-ci.org/mindblight/referencejs)

Referencejs manages references to values in plain JS or [Immutable](https://facebook.github.io/immutable-js/) objects (called stores). You can use this to:

1. Easily manage complex denormalized, without needing an explicited schema
2. referencing data that doesn't exist yet (e.g. async data)
3. normalize and denormalize immutable data
4. Lazily denormalize stored data


## Getting Started
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

Or use [Immutable](https://facebook.github.io/immutable-js/) if that's your jam
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

## More Advanced: `smartDereference`
Dereferencing one reference at a time can be painful.
`smartDereference` scans an object or array and dereferences every reference it finds

```js
import {
  createReference,
  smartDereference,
} from 'referencejs';

const store = {
  users: {
    user1: {
      name: 'John Doe'
    },
    user2: {
      name: 'Jane Doe'
    },
    user3: {
      name: 'Billy Doe'
    },

    user4: {
      name: 'Lucy Doe'
    }
  }
};

const john = createReference(['users', 'user1']);
const jane = createReference(['users', 'user2']);
const billy = createReference(['users', 'user3']);
const lucy = createReference(['users', 'user4']);

const familyTreeReferences = {
  father: john,
  mother: jane,
  children: [billy, lucy]
};

// familyTree will contain the user objects instead of the references  
const familyTree = smartDereference(store, familyTree);
```

## Like what you see?
- [Read the docs](docs/README.md)
