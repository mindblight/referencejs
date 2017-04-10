# API
ReferenceJS provides a comparable API for both plain and [Immutable](https://facebook.github.io/immutable-js/) objects.
There are slight differences between the two - primarily in the datatypes they accept and return.

- [Plain Object API](plainApi.md)
- [Immutable API](immutableApi.md)

# What's a Reference?
A reference points to a location in a JS object. Normally, getting a value looks like

```js
const store = {
  auth: {
    users: {
      user_1: {
        name: 'John Doe',
        email: 'jon@doe.com'
      }
    }
  }
};

const jon = store.auth.users.user_1;
console.log(jon.name);
```
A reference lets you save 'jon's location in the store and easily extract him later:

```js
import { createReference, dereference } from 'referencejs';
const jonRefrence = createReference('auth', 'users', 'user_1');
const jon = dereference(store, jonRefrence);
console.log(jon.name);
```

## Example: Normalizing data
[Normalizr](https://github.com/paularmstrong/normalizr) is an awesome library for
normalizing data. It has two things we can improve on:

1. It doesn't work with [Immutable](https://facebook.github.io/immutable-js/)
2. All data has to be loaded before you can denormalize (doesn't handle partially loaded data well)

We'll use a blog to demonstrate how we can solve these problems:

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

## Importing
ReferenceJS exposes the Plain object API by default:

```js
// Plain
import { createReference } from 'referencejs';
```

You can import the immutable API instead:
```js
// Immutable
import { createReference } from 'referencejs/immutable';
```

### Code splitting
You can also import only the functions you need.

```js
// Plain
import createReference from 'referencejs/plain/createReference';
```
*NOTE: the individual plain functions are under `referencejs/plain/`*

```js
// Immutable
import createReference from 'referencejs/immutable/createReference';
```
