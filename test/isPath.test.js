/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai';
import { List } from 'immutable';
import './applyChaiPlugins';

import isPathPlain from '../src/isPath';
import isPathImmutable from '../src/immutable/isPath';


describe('isPath', function() {
  describe('JSON', function() {
    it('should return false on non-array', function() {
      expect(isPathPlain({})).to.be.false;
    });

    it('should return false on empty array', function() {
      expect(isPathPlain([])).to.be.false;
    });

    it('should return false on non-string, non-integer array', function() {
      expect(isPathPlain([{}, 'hi'])).to.be.false;
    });

    it('should return false on string array with empty string', function() {
      expect(isPathPlain(['', 'hi'])).to.be.false;
    });

    it('should return true on string array', function() {
      expect(isPathPlain(['bye', 'hi'])).to.be.true;
    });

    it('should support array indices', function() {
      expect(isPathPlain(['array', 5])).to.be.true;
    });
  });


  describe('Immutable', function() {
    it('should return false on non-array', function() {
      expect(isPathImmutable({})).to.be.false;
    });

    it('should return false on empty list', function() {
      expect(isPathImmutable(List())).to.be.false;
    });

    it('should return false on non-string, non-integer list', function() {
      expect(isPathImmutable(List([{}, 'hi']))).to.be.false;
    });

    it('should return false on string array with empty string', function() {
      expect(isPathImmutable(List(['', 'hi']))).to.be.false;
    });

    it('should return true on string array', function() {
      expect(isPathImmutable(List(['bye', 'hi']))).to.be.true;
    });

    it('should support array indices', function() {
      expect(isPathImmutable(List(['array', 5]))).to.be.true;
    });
  });
});
