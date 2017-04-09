/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai';
import { fromJS } from 'immutable';
import './applyChaiPlugins';

import storeHasReferencePlain from '../src/plain/storeHasReference';
import createReferencePlain from '../src/plain/createReference';

import storeHasReferenceImmutable from '../src/immutable/storeHasReference';
import createReferenceImmutable from '../src//immutable/createReference';


describe('storeHasReference', function() {
  describe('Plain', function() {
    it('should throw error on null path', function() {
      expect(storeHasReferencePlain.bind(null, null, null)).to.throw(Error);
    });

    it('should throw error on invalid path', function() {
      expect(storeHasReferencePlain.bind(null, {}, [''])).to.throw(Error);
    });

    it('should return false when reference does not exist', function() {
      const reference = createReferencePlain('a');
      expect(storeHasReferencePlain({}, reference)).to.be.false;
    });

    it('should return true when reference exists', function() {
      const value = 9;
      const store = {
        a: {
          b: value,
        },
      };
      const reference = createReferencePlain(['a', 'b']);

      expect(storeHasReferencePlain(store, reference)).to.be.true;
    });
  });


  describe('Immutable', function() {
    it('should throw error on null path', function() {
      expect(storeHasReferenceImmutable.bind(null, null, null)).to.throw(Error);
    });

    it('should throw error on invalid path', function() {
      expect(storeHasReferenceImmutable.bind(null, {}, [''])).to.throw(Error);
    });

    it('should return false when reference does not exist', function() {
      const reference = createReferenceImmutable('a');
      expect(storeHasReferenceImmutable(fromJS({}), reference)).to.be.false;
    });

    it('should return true if reference exists', function() {
      const value = 9;
      const store = fromJS({
        a: {
          b: value,
        },
      });
      const reference = createReferenceImmutable('a', 'b');

      expect(storeHasReferenceImmutable(store, reference)).to.be.true;
    });
  });
});
