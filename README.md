# Referencejs [![Build Status](https://travis-ci.org/mindblight/referencejs.svg?branch=master)](https://travis-ci.org/mindblight/referencejs)

Reference JS lets you create references to any location in a JSON tree.
This is useful for

1. For normalizing and denormalizing data without needing an explicit schema
2. For referencing data that doesn't yet exist in the store (e.g. async data)
3. For normalizing and denormalizing immutable data

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
    const reference = createReference(['users', user.id]);

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

## What's a Reference?
A reference is an object that contains everything needed to find a value in a JSON object (called the store).
The signature looks like:

    {
      path : Array<number|string>
    }
