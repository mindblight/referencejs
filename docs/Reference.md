# What's a Reference?
A Reference points to a location in a JS object. Normally, getting a value looks like

```js
const jon = {
  id: 'user_1',
  name: 'John Doe',
  email: 'jon@doe.com'
};
const store = {
  auth: {
    users: {
      user_1: jon
    }
  }
};

store.auth.users.user_1 === jon;
```

A Reference lets you save 'jon's location in the store and easily extract him later:

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

## Separating State and View Structure
Many applications need to store data in a flat or normalized form,
then pass a denormalized version to a view. (Redux apps being a prime example)

[Normalizr](https://github.com/paularmstrong/normalizr) is an awesome normalization library,
but we can improve a few things:

1. Support [Immutable](https://facebook.github.io/immutable-js/).
2. Gracefully handle empty references (e.g. async data)
3. Lazily or partially denormalize ([TBD](https://github.com/mindblight/referencejs/issues/22))

The following example shows one way you can use ReferenceJS to support case 1 and 2:

```js
import { createReference, smartDereference, EmptyReference } from 'referencejs';

// Data
const jon = {
  id: 'user_1',
  name: 'John Doe',
  email: 'jon@doe.com'
};
const jonRefrence = createReference('users', jon.id);

const post0 = {
  title: 'About bees',
  author: jonRefrence,
  body: 'something about bees'
};
const post0Reference = createReference('posts', 0);

const post1 = {
  title: 'About trees',
  author: jonRefrence,
  body: 'something about trees'
}
const post1Reference = createReference('posts', 1);

const store = {
  users: {
    user_1: jon
  },
  posts: [
    post0,
    post1
  ]
};

const blog = {
  title: 'Jon\'s Cool Blog',
  author: jonRefrence;
  posts: [
    post0Reference,
    post1Reference,
    createReference('posts', 2)
  ]
};

// `smartDereference` traverses `blog` and returns an object with everything dereferenced
const denormalizedBlog = smartDereference(store, blog);

// Blog references a post that doesn't exist in the store yet
denormalizedBlog.posts[2] === EmptyReference;
```
**Immutable:** to make the above example immutable, change the import to `referencejs/immutable`,
and wrap `blog` and `store` in `fromJS` calls. `smartDereference` and `createReference` will return
Immutable objects.

**Async:** `dereference` and `smartDereference` both gracefully handle empty references.
This means your application can create a reference before it exists in the store.

_Next_ read [Plain vs. Immutable](PlainVsImmutable.md)
