// @flow
import { List, Map, Record } from 'immutable';

export type PathSegment = string | number;
export type ImmutablePath = List<PathSegment>;

export type ImmutableReference = Record<{ path :ImmutablePath}>;
export type ImmutableStore = Map<string, *>;
