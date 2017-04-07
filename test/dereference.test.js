/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { fromJS } from 'immutable';
import { expect } from 'chai';
import './applyChaiPlugins';

import createReferencePlain from '../src/createReference';
import createReferenceImmutable from '../src/immutable/createReference';
import dereferencePlain from '../src/dereference';
import dereferenceImmutable from '../src/immutable/dereference';
import EmptyRefrence from '../src/EmptyReference';

describe('dereference', function() {
  describe('Plain', function() {
    it('should throw error on empty store', function() {
      expect(dereferencePlain.bind(null, null)).to.throw(Error);
    });

    it('should throw error on invalid reference', function() {
      expect(dereferencePlain.bind(null, {}, {})).to.throw(Error);
    });

    it('should return EMPTY_REFERENCE when reference does not exist', function() {
      expect(dereferencePlain({}, createReferencePlain('a'))).to.equal(EmptyRefrence);
    });

    it('should return value at reference', function() {
      const value = 9;
      const store = {
        a: {
          b: value,
        },
      };
      const reference = createReferencePlain('a', 'b');

      expect(dereferencePlain(store, reference)).to.equal(value);
    });

    it('should derefence arrays', function() {
      const value = {};
      const store = {
        a: [value],
      };
      const reference = createReferencePlain('a', 0);

      expect(dereferencePlain(store, reference)).to.equal(value);
    });
  });


  describe('Immutable', function() {
    it('should throw error on empty store', function() {
      expect(dereferenceImmutable.bind(null, null)).to.throw(Error);
    });

    it('should throw error on invalid reference', function() {
      expect(dereferenceImmutable.bind(null, fromJS({}), {})).to.throw(Error);
    });

    it('should return EMPTY_REFERENCE when reference does not exist', function() {
      expect(dereferenceImmutable(fromJS({}), createReferenceImmutable('a'))).to.equal(EmptyRefrence);
    });

    it('should return value at reference', function() {
      const value = 9;
      const store = fromJS({
        a: {
          b: value,
        },
      });
      const reference = createReferenceImmutable('a', 'b');

      expect(dereferenceImmutable(store, reference)).to.equal(value);
    });

    it('should derefence arrays', function() {
      const value = -10;
      const store = fromJS({
        a: [value],
      });
      const reference = createReferenceImmutable('a', 0);

      expect(dereferenceImmutable(store, reference)).to.equal(value);
    });
  });
});
