# PathSegment

a non-empty string, or a non-negative integer (index)

**Examples**

```javascript
const pathSegmentString = 'hi';
const PathSegmentInt = 0;
```

# isPath

tests whether the argument is a [ImmutablePath](#immutablepath)

**Parameters**

-   `maybePath` **Any** 

**Examples**

```javascript
import { List } from 'immutable';
import { isPath } from 'referencejs/immutable';

isPath(List(['foo', 0])) === true;
isPath(['foo', 0]) === false;
isPath(List(['', -10])) === false;
```

Returns **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

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

# isReference

Tests whether the argument is an [ImmutableReference](#immutablereference).
[ImmutableReference](#immutablereference) is typed as a [Record](Record), however the only requirement
is that it is an Immutable object where `get('path')` returns an [ImmutablePath](#immutablepath).

**Parameters**

-   `maybeReference` **Any** 

**Examples**

```javascript
import { isReference, createReference } from 'referencejs/immutable';

isReference(createReference('foo')) === true;
isReference({}) === false;
isReference(null) === false;
```

Returns **Any** 

# EmptyReference

A [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) returned when a [Reference](Reference) or [ImmutableReference](#immutablereference)
is not present in [Store](Store) or [ImmutableStore](#immutablestore)

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

# storeHasReference

Test if [ImmutableReference](#immutablereference) is set in [ImmutableStore](#immutablestore).

**Parameters**

-   `store` **[ImmutableStore](#immutablestore)** 
-   `reference` **[ImmutableReference](#immutablereference)** 

**Examples**

```javascript
import { Map } from 'immutable';
import { storehasReference, createReference } from 'referencejs/immutable';

const store = Map({
  foo: 5,
});

const reference = createReference('foo');
const emptyRefrence = createReference('bar');

storehasReference(store, foo) === true;
storehasReference(store, emptyRefrence) === false;
```

Returns **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

# resolveReference

Returns a new [ImmutableStore](#immutablestore) with `value` at `reference`

**Parameters**

-   `store` **[ImmutableStore](#immutablestore)** 
-   `reference` **[ImmutableReference](#immutablereference)** Reference where the value should be placed
-   `value` **any** The value to place in the store

**Examples**

```javascript
import { Map } from 'immutable';
import { createReference, resolveReference, dereference } from 'referencejs/immutable';

const user = Map({
 name: "john"
});
const userReference = createReference('auth', 'users', 'user_1');

let store = Map();
store = resolveReference(store, userReference, user);
dereference(store, userReference) === user;
```

Returns **Any** An [ImmutableStore](#immutablestore) containing `value` at `reference`

# createPath

Create a reference path from _either_ an array of [PathSegment](#pathsegment)s, or multiple [PathSegment](#pathsegment) arguments

**Parameters**

-   `firstArg` **([PathSegment](#pathsegment) \| [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[PathSegment](#pathsegment)> | List&lt;[PathSegment](#pathsegment)>)** 
-   `pathSegments` **...Any** 

**Examples**

```javascript
import { List } from 'immutable'
import { createPath } from 'referencejs/immutable';
createPath(['foo', 'bar']);
createPath('foo', 'bar');
createPath(List(['foo', 'bar']));

// Throws an error
createPath(['foo'], 'bar')
createPath(List(['foo']), 'bar');
createPath({}, 9);
```

-   Throws **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** if both an array of PathSegments and multiple PathSegment arguments are passed
-   Throws **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** if something besides a PathSegment is passed

Returns **[ImmutablePath](#immutablepath)** 

# dereference

retrieves a value at a reference from a store

**Parameters**

-   `store` **[ImmutableStore](#immutablestore)** 
-   `reference` **[ImmutableReference](#immutablereference)** 

**Examples**

```javascript
import { fromJS } from 'immutable';
import { createReference, dereference } from 'referencejs/immutable';

const user = fromJS({
 name: "john"
});
const userReference = createReference('auth', 'users', 'user_1');
const store = fromJS({
  auth: {
    users: {
      user_1: user
    }
  }
});
dereference(store, userReference) === user;
```

Returns **Any** The value at `reference` or [EmptyRefrence](EmptyRefrence) if value is not present

# ImmutablePath

A non-empty List of strings and non-negative integers (indeces).
They describe how to traverse an Immutable object to retrieve a value.
You should always use [createPath](#createpath). This validates the ImmutablePath,
future-proofs your code, and lets you switch from Plain to Immutable by
changing an import path.

**Examples**

```javascript
import { fromJS, List } from 'immutable';
const store = fromJS({
  auth: {
    users: [
      {
        name: 'Jon'
      }
    ]
  }
});
const path = List(['auth', 'users', 0, 'name']);
```

# createReference

Creates an [ImmutableReference](#immutablereference)

**Parameters**

-   `firstArg` **([PathSegment](#pathsegment) \| [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[PathSegment](#pathsegment)> | List&lt;[PathSegment](#pathsegment)>)** 
-   `pathSegments` **...Any** 

**Examples**

```javascript
import { fromJS } from 'immutable';
import { createReference } from 'referencejs/immutable'

const store = fromJS({
  foo: {
    bar: 5
  },
  baz: ['hi']
});
// create a reference to 'foo.bar' in plain JS object
createReference('foo', 'bar');
createReference(['foo', 'bar']);
createReference(List(['foo', 'bar']));

//create a reference to 'baz[0]'
createReference('baz', 0);
createReference(['baz', 0]);
createReference(List(['baz', 0]));
```

Returns **Any** 

# ImmutableReference

A wrapper around at [ImmutablePath](#immutablepath). You should always use [createReference](#createreference).
This validates the ImmutableReference, future-proofs your code, and lets you switch
from Plain to Immutable by changing an import path.

**Examples**

```javascript
import { fromJS, List, Record } from 'immutable';
const store = fromJS({
  auth: {
    users: [
      {
        name: 'Jon'
      }
    ]
  }
});
const Reference = Record({ path: List() });
const reference = Reference({
  path: List(['auth', 'users', 0, 'name'])
});
```

# smartDereference

Traverses {@param val} and dereferences every reference.

**Parameters**

-   `store` **[ImmutableStore](#immutablestore)** 
-   `val`  The object to scan. [ImmutableReference](#immutablereference)s are dereferenced,
                    all other immutable objects are traversed, and everything else is returned unmodified.

**Examples**

```javascript
import { fromJS, Map } from 'immutable';
import { createReference, resolveReference, smartDereference } from 'referencejs/immutable';

function createUserReference(user) {
  return createReference('users', user.id);
}

let store = Map();

const jon = Map({
 id: 'user_1',
 name: 'jon'
});
const jonReference = createUserReference(jon);
store = resolveReference(store, jonReference, jon);

const james = Map({
  id: 'user_2',
  name: 'james'
});
const jamesReference = createUserReference(james);
store = resolveReference(store, jamesReference, james);

const sally = Map({
 id: 'user_3',
 name: 'sally',
});
const sallyReference = createUserReference(sally);
store = resolveReference(store, sallyReference, sally);

const relations = fromJS([
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
]);
// 'from' and 'to' will be their respective user objects in the store
const dereferencedRelations = smartDereference(store, relations);
```

Returns **Any** A new immutable object with all references dereferenced

# ImmutableStore

A [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

**Examples**

```javascript
import { fromJS } from 'immutable';
const store = fromJS({
  foo: [{
    bar: 'hi'
  }]
});
```
