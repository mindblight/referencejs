# Referencejs [![Build Status](https://travis-ci.org/mindblight/referencejs.svg?branch=master)](https://travis-ci.org/mindblight/referencejs)

Referencejs manages references to values in plain JS or [Immmutable](https://facebook.github.io/immutable-js/) objects. You can use this to:

1. Easily manage complex denormalized, without needing an explicited schema
3. referencing data that doesn't exist yet (e.g. async data)
4. normalize and denormalize immutable data

## A Basic Example

    import {
      createReference,
      resolveReference,
      dereference,
    } from 'referencejs';

    const user = {
      id: 'abc',
      name: 'John Doe'
    };
    const reference = createReference('users', user.id);

    let store = {};
    store = resolveReference(store, reference, user);

    dereference(store, reference) === user;

## dereferencing using `smartDereference`
Dereferencing one reference at a time isn't that useful. `smartDereference` dereferences
every reference in an object. This is useful if you have data structures that differ
significantly from your store

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

## Plain vs. Immutable
Referencejs implements the same API for both Plain JS and [Immmutable](https://facebook.github.io/immutable-js/) objects.
Read full [API](docs/README.md) docs.

## What's a Reference?
A reference is an object that contains everything needed to find a value in a JSON object (called the store).
The signature looks like:

    {
      path : Array<number|string>
    }
