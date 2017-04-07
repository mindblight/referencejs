/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai';
import { Map, fromJS } from 'immutable';

import './applyChaiPlugins';
import isReferencePlain from '../src/isReference';
import isReferenceImmutable from '../src/immutable/isReference';


describe('isReference', function() {
  describe('Plain', function() {
    it('should return false on null', function() {
      expect(isReferencePlain(null)).to.be.false;
    });

    it('should return false on object without valid path', function() {
      expect(isReferencePlain({})).to.be.false;
    });

    it('should return true on valid reference', function() {
      expect(isReferencePlain({
        path: ['a', 'b'],
      })).to.be.true;
    });
  });

  describe('Immutable', function() {
    it('should return false on null', function() {
      expect(isReferenceImmutable(null)).to.be.false;
    });

    it('should return false on non-map', function() {
      expect(isReferenceImmutable({})).to.be.false;
    });

    it('should return false on Map without valid path', function() {
      expect(isReferenceImmutable(Map())).to.be.false;
    });

    it('should return true on valid reference', function() {
      expect(isReferenceImmutable(fromJS({
        path: ['a', 'b'],
      }))).to.be.true;
    });
  });
});
