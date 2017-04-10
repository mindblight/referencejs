# API
ReferenceJS provides a comparable API for both plain and [Immmutable](https://facebook.github.io/immutable-js/) objects.
There are slight differences between the two - primarily in the datatypes they accept and return

- [Plain Object API](docs/plainApi.md)
- [Immutable API](docs/immutableApi.md)

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
