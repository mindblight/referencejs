// @flow
export type PathSegment = string | number;
export type Path = PathSegment[];

export type Reference = {
  path :Path,
};
export type Store = { [key :string] :* };
