// @flow
/** a non-empty string, or a non-negative integer >= 0
 */
export type PathSegment = string | number;
/**
 * @since 0.1.0
 * A non-empty array of strings and non-negative integers (indeces).
 * They describe how to traverse a JS object to retrieve a value.
 * You should always use {@link createPath}. This validates the Path,
 * future-proofs your code, and lets you switch from Plain to Immutable by
 * changing an import path.
 * @example
 * const store = {
 *   auth: {
 *     users: [
 *       {
 *         name: 'Jon'
 *       }
 *     ]
 *   }
 * }
 * const path = ['auth', 'users', 0, 'name'];
 */
export type Path = PathSegment[];

/**
 * @since 0.1.0
 * A wrapper around at {@link Path}. You should always use {@link createReference}.
 * This validates the Reference, future-proofs your code, and lets you switch
 * from Plain to Immutable by changing an import path.
 * @type {Object}
 * @example
 * const store = {
 *   auth: {
 *     users: [
 *       {
 *         name: 'Jon'
 *       }
 *     ]
 *   }
 * }
 * const reference = {
 *   path: ['auth', 'users', 0, 'name']
 * }
 */
export type Reference = {
  path :Path,
};
/**
 *
 */
export type Store = { [key :string] :* };
