import { Iterable, Map } from 'immutable';

export type PathSegment = string | number;
export type ImmutablePath = Iterable<PathSegment>;

export type ImmutableReference = Map<string, ImmutablePath>;
export type ImmutableStore = Map<string, *>;
