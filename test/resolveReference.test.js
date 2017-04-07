/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import cloneDeep from 'lodash/cloneDeep';
import { fromJS } from 'immutable';
import { expect } from 'chai';
import './applyChaiPlugins';

import createReferencePlain from '../src/createReference';
import createReferenceImmutable from '../src/immutable/createReference';

import resolveReferencePlain from '../src/resolveReference';
import resolveReferenceImmutable from '../src/immutable/resolveReference';


describe('resolveReference', function() {
  describe('Plain', function() {
    it('should throw error on empty store', function() {
      expect(resolveReferencePlain.bind(null, null)).to.throw(Error);
    });

    it('should throw error on invalid reference', function() {
      expect(resolveReferencePlain.bind(null, {}, {})).to.throw(Error);
    });

    it('should update reference path', function() {
      const reference = createReferencePlain('c');
      const value = 5;
      const initialState = {
        c: 6,
      };
      const state = resolveReferencePlain(initialState, reference, value);

      expect(state).to.have.property('c').equal(value);
    });

    it('should not mutate the passed state', function() {
      const reference = createReferencePlain(['a', 'b']);
      const state = {
        a: 1,
        b: 'hi',
      };

      const expectedState = cloneDeep(state);

      resolveReferencePlain(state, reference, 5);

      expect(state).to.deep.equal(expectedState);
    });

    it('should preserve state properties', function() {
      const path = ['a', 'b'];
      const reference = createReferencePlain(path);
      const value = 5;
      const initialState = {
        c: 6,
      };
      const state = resolveReferencePlain(initialState, reference, value);

      expect(state).to.have.property('c').equal(6);
      expect(state).to.have.deep.property(path.join('.')).equal(value);
    });

    it('should handle arrays in store', function() {
      const path = ['a', 0];
      const reference = createReferencePlain(path);
      const value = 'foo';
      const initialState = {
        a: [],
      };
      const state = resolveReferencePlain(initialState, reference, value);
      const expectedState = {
        a: [value],
      };

      expect(state).to.deep.equal(expectedState);
    });

    it('should handle deep object creation', function() {
      const path = ['a', 0, 'b'];
      const reference = createReferencePlain(path);
      const value = 'foo';
      const initialState = {};
      const state = resolveReferencePlain(initialState, reference, value);
      const expectedState = {
        a: [{
          b: value,
        }],
      };

      expect(state).to.deep.equal(expectedState);
    });
  });


  describe('Immutable', function() {
    it('should throw error on empty store', function() {
      expect(resolveReferenceImmutable.bind(null, null)).to.throw(Error);
    });

    it('should throw error on invalid reference', function() {
      expect(resolveReferenceImmutable.bind(null, {}, {})).to.throw(Error);
    });

    it('should update reference path', function() {
      const reference = createReferenceImmutable('c');
      const value = 5;
      const initialState = fromJS({
        c: 6,
      });
      const state = resolveReferenceImmutable(initialState, reference, value);

      expect(state).to.have.property('c').equal(value);
    });

    it('should preserve state properties', function() {
      const path = ['a', 'b'];
      const reference = createReferenceImmutable(path);
      const value = 5;
      const initialState = fromJS({
        c: 6,
      });
      const state = resolveReferenceImmutable(initialState, reference, value);

      expect(state).to.have.property('c').equal(6);
      expect(state).to.have.deep.property(path.join('.')).equal(value);
    });

    it('should handle arrays in store', function() {
      const path = ['a', 0];
      const reference = createReferenceImmutable(path);
      const value = 'foo';
      const initialState = fromJS({
        a: [],
      });
      const state = resolveReferenceImmutable(initialState, reference, value);
      const expectedState = fromJS({
        a: [value],
      });

      expect(state).to.deep.equal(expectedState);
    });

    it('should handle deep object creation', function() {
      const path = ['a', 0, 'b'];
      const reference = createReferenceImmutable(path);
      const value = 'foo';
      const initialState = fromJS({});
      const state = resolveReferenceImmutable(initialState, reference, value);
      const expectedState = fromJS({
        a: [{
          b: value,
        }],
      });

      expect(state).to.deep.equal(expectedState);
    });
  });
});
