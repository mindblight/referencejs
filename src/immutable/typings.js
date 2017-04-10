// @flow
import { List, Map, Record } from 'immutable';

/**
 * a non-empty string, or a non-negative integer (index)
 *
 * @example
 * const pathSegmentString = 'hi';
 * const PathSegmentInt = 0;
 */
export type PathSegment = string | number;

/**
 * A non-empty {@link List} of strings and non-negative integers (indeces).
 * They describe how to traverse an Immutable object to retrieve a value.
 * You should always use {@link createPath}. This validates the ImmutablePath,
 * future-proofs your code, and lets you switch from Plain to Immutable by
 * changing an import path.
 *
 * @type List<PathSegment>
 * @example
 * import { fromJS, List } from 'immutable';
 * const store = fromJS({
 *   auth: {
 *     users: [
 *       {
 *         name: 'Jon'
 *       }
 *     ]
 *   }
 * });
 * const path = List(['auth', 'users', 0, 'name']);
 */
export type ImmutablePath = List<PathSegment>;

/**
 * A wrapper around at {@link ImmutablePath}. You should always use {@link createReference}.
 * This validates the ImmutableReference, future-proofs your code, and lets you switch
 * from Plain to Immutable by changing an import path.
 *
 * @type Record<{ path: ImmutablePath}>
 * @see {@link isReference} ImmutableReference is typed as a {@link Record},
 * but the only hard requirement is that it's an Immutable object where
 * `get('path')` returns an {@link ImmutablePath}
 * @see [Plain vs. Immutable]{@link PlainVsImmutable.md}
 * @example
 *
 * import { fromJS, List, Record } from 'immutable';
 * const store = fromJS({
 *   auth: {
 *     users: [
 *       {
 *         name: 'Jon'
 *       }
 *     ]
 *   }
 * });
 * const Reference = Record({ path: List() });
 * const reference = Reference({
 *   path: List(['auth', 'users', 0, 'name'])
 * });
 */
export type ImmutableReference = Record<{ path :ImmutablePath}>;

/**
 * A {@link Map}
 * @type Map<string, any>
 * @example
 * import { fromJS } from 'immutable';
 * const store = fromJS({
 *   foo: [{
 *     bar: 'hi'
 *   }]
 * });
 */
export type ImmutableStore = Map<string, any>;
