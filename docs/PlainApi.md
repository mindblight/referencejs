# createPath

Create a reference path from _either_ an array of [PathSegment](#pathsegment)s, or multiple [PathSegment](#pathsegment) arguments

**Parameters**

-   `firstArg` **([PathSegment](#pathsegment) \| [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[PathSegment](#pathsegment)>)** 
-   `pathSegments` **...Any** 

**Examples**

```javascript
import { createPath } from 'referencejs';
createPath(['foo', 'bar']);
createPath('foo', 'bar');

// Throws an error
createPath(['foo'], 'bar')
createPath({}, 9);
```

-   Throws **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** if both an array of PathSegments and multiple PathSegment arguments are passed
-   Throws **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** if something besides a PathSegment is passed

Returns **[Path](#path)** 

# createReference

Creates a [Reference](#reference).

**Parameters**

-   `firstArg` **([PathSegment](#pathsegment) \| [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[PathSegment](#pathsegment)>)** 
-   `pathSegments` **...Any** 

**Examples**

```javascript
import { createReference } from 'referencejs'
const store = {
  foo: {
    bar: 5
  },
  baz: ['hi']
}
// create a reference to 'foo.bar' in plain JS object
createReference('foo', 'bar');
createReference(['foo', 'bar']);

//create a reference to 'baz[0]'
createReference('baz', 0);
createReference(['baz', 0]);
```

Returns **Any** 

# dereference

retrieves a value at a reference from a store

**Parameters**

-   `store` **[Store](#store)** 
-   `reference` **[Reference](#reference)** 

**Examples**

```javascript
import { createReference, dereference } from 'referencejs';

const user = {
 name: "john"
};
const userReference = createReference('auth', 'users', 'user_1');
const store = {
  auth: {
    users: {
      user_1: user
    }
  }
};
dereference(store, userReference) === user;
```

Returns **Any** The value at `reference` or [EmptyRefrence](EmptyRefrence) if value is not present

# EmptyReference

A [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) returned when a [Reference](#reference) or [ImmutableReference](ImmutableReference)
is not present in [Store](#store) or [ImmutableStore](ImmutableStore)

**Examples**

```javascript
import { createReference, dereference } from 'referencejs';

const store = {};
const reference = createReference('nothing', 'here');
dereference(store, reference) === EmptyReference
```

```javascript
import { Map } from 'immutable';
import { createReference, dereference } from 'referencejs/immutable';

const store = Map();
const reference = createReference('nothing', 'here');
dereference(store, reference) === EmptyReference
```

# isPathSegment

Tests whether the given argument is a [PathSegment](#pathsegment)

**Parameters**

-   `maybePathSegment` **any** 

**Examples**

```javascript
// Also imports from 'referencejs/immutable'
import { isPathSegment } from 'referencejs';
isPathSegment('users') === true
isPathSegment(5) === true
isPathSegment({}) === false
```

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

# isPath

tests whether the argument is a [Path](#path)

**Parameters**

-   `maybePath` **Any** 

**Examples**

```javascript
import { isPath } from 'referencejs';

isPath(['foo', 0]) === true;
isPath(['', -10]) === false;
```

Returns **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

# isReference

Tests whether the argument is a [Reference](#reference).

**Parameters**

-   `maybeReference` **Any** 

**Examples**

```javascript
import { isReference, createReference } from 'referencejs';

isReference(createReference('foo')) === true;
isReference({}) === false;
isReference(null) === false;
```

Returns **Any** 

# resolveReference

Returns a new [Store](#store) with `value` at `reference`

**Parameters**

-   `store` **[Store](#store)** 
-   `reference` **[Reference](#reference)** Reference where the value should be placed
-   `value` **any** The value to place in the store

**Examples**

```javascript
import { createReference, resolveReference, dereference } from 'referencejs';

const user = {
 name: "john"
};
const userReference = createReference('auth', 'users', 'user_1');

let store = {};
store = resolveReference(store, userReference, user);
dereference(store, userReference) === user;
```

Returns **Any** A new [Store](#store) containing `value` at `reference`

# smartDereference

Traverses `val` and dereferences every reference.

**Parameters**

-   `store` **[Store](#store)** 
-   `val`  The object to scan. [Reference](#reference)s are dereferenced,
                    all [ArrayLikeObjects](https://lodash.com/docs/4.17.4#isArrayLikeObject) are iteratated,
                    all [PlainObjects](https://lodash.com/docs/4.17.4#isPlainObject) are traversed,
                    and everything else is returned unmodified.

**Examples**

```javascript
import { createReference, resolveReference, smartDereference } from 'referencejs';

function createUserReference(user) {
  return createReference('users', user.id);
}

let store = {};

const jon = {
 id: 'user_1',
 name: 'jon'
};
const jonReference = createUserReference(jon);
store = resolveReference(store, jonReference, jon);

const james = {
  id: 'user_2',
  name: 'james'
};
const jamesReference = createUserReference(james);
store = resolveReference(store, jamesReference, james);

const sally = {
 id: 'user_3',
 name: 'sally',
};
const sallyReference = createUserReference(sally);
store = resolveReference(store, sallyReference, sally);

const relations = [
  {
    from: jonReference,
    to: sallyReference,
    type: "husband"
  },{
    from: sallyReference,
    to: jonReference,
    type: "wife"
  },{
    from: sallyReference,
    to: jamesReference,
    type: "daughter"
  },{
    from: jonReference,
    to: jamesReference,
    type: "son-in-law"
  },{
    from: jamesReference,
    to: jonReference,
    type: "father-in-law"
  },
];
// 'from' and 'to' will be their respective user objects in the store
const dereferencedRelations = smartDereference(store, relations);
```

Returns **Any** A new object with all references dereferenced

# storeHasReference

Test if [Reference](#reference) is set in [Store](#store).

**Parameters**

-   `store` **[Store](#store)** 
-   `reference` **[Reference](#reference)** 

**Examples**

```javascript
import { storehasReference, createReference } from 'referencejs';

const store = {
  foo: 5,
};

const reference = createReference('foo');
const emptyRefrence = createReference('bar');

storehasReference(store, foo) === true;
storehasReference(store, emptyRefrence) === false;
```

Returns **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

# PathSegment

a non-empty string, or a non-negative integer

**Examples**

```javascript
const pathSegmentString = 'hi';
const PathSegmentInt = 0;
```

# Path

A non-empty array of strings and non-negative integers (indeces).
They describe how to traverse a JS object to retrieve a value.
You should always use [createPath](#createpath). This validates the Path,
future-proofs your code, and lets you switch from Plain to Immutable by
changing an import path.

**Examples**

```javascript
const store = {
  auth: {
    users: [
      {
        name: 'Jon'
      }
    ]
  }
}
const path = ['auth', 'users', 0, 'name'];
```

# Reference

A wrapper around at [Path](#path). You should always use [createReference](#createreference).
This validates the Reference, future-proofs your code, and lets you switch
from Plain to Immutable by changing an import path.

**Examples**

```javascript
const store = {
  auth: {
    users: [
      {
        name: 'Jon'
      }
    ]
  }
}
const reference = {
  path: ['auth', 'users', 0, 'name']
}
```

# Store

A plain JS object

**Examples**

```javascript
const store = {
  foo: [{
    bar: 'hi'
  }]
};
```
