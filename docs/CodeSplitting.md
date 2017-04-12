# Code Splitting
*WARNING: Unstable feature. May be removed in later version*

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
