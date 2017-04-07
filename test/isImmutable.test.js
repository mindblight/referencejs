/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai';
import './applyChaiPlugins';

import {
  List,
  Map,
  OrderedMap,
  Set,
  OrderedSet,
  Stack,
} from 'immutable';

import isImmutable from '../src/immutable/_isImmutable';

describe('isImmutable', function() {
  it('should return true on List', function() {
    expect(isImmutable(List())).to.be.true;
  });

  it('should return true on Map', function() {
    expect(isImmutable(Map())).to.be.true;
  });

  it('should return true on OrderedMap', function() {
    expect(isImmutable(OrderedMap())).to.be.true;
  });

  it('should return true on Set', function() {
    expect(isImmutable(Set())).to.be.true;
  });

  it('should return true on OrderedSet', function() {
    expect(isImmutable(OrderedSet())).to.be.true;
  });

  it('should return true on Stack', function() {
    expect(isImmutable(Stack())).to.be.true;
  });
});
