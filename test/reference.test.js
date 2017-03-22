import { expect } from 'chai';
import {
  isPath,
  isReference,
  createReference,
  resolveReference
} from '../src/reference';
import cloneDeep from 'lodash/cloneDeep'


describe('reference', function() {

  describe('isPath', function () {
    it('should return false on non-array', function() {
      expect(isPath({})).to.be.false;
    });

    it('should return false on empty array', function() {
      expect(isPath([])).to.be.false;
    });

    it('should return false on non-string array', function() {
      expect(isPath([1,'hi'])).to.be.false;
    });

    it('should return false on string array with empty string', function() {
      expect(isPath(['','hi'])).to.be.false;
    });

    it('should return true on string array', function() {
      expect(isPath(['bye','hi'])).to.be.true;
    });
  });


  describe('isReference', function() {
    it('should return false on null', function() {
      expect(isReference(null)).to.be.false;
    });

    it('should return false on object without valid path', function() {
      expect(isReference({})).to.be.false;
    });

    it('should return true on valid reference', function() {
      expect(isReference({
        path: ['a', 'b']
      })).to.be.true;
    });
  });

  describe('createReference', function() {
    it('should throw error on null path', function() {
      expect(createReference.bind(null, null)).to.throw(Error);
    });

    it('should throw error on invalid path', function() {
      expect(createReference.bind(null, [3])).to.throw(Error);
    });

    it('should return valid reference', function() {
      const path = ['a', 'b'];
      const reference = createReference(path);

      expect(isReference(reference)).to.be.true;
      expect(reference).to.have.property('path').equal(path);
    });
  });


  describe('resolveReference', function() {
    it('should throw error on empty store', function() {
      expect(resolveReference.bind(null, null)).to.throw(Error);
    });

    it('should throw error on invalid reference', function() {
      expect(resolveReference.bind(null, {}, {})).to.throw(Error);
    });

    it('should not mutate the passed state', function() {
      const reference = createReference(['a', 'b']);
      const state = {
        a: 1,
        b: 'hi'
      };

      const expectedState = cloneDeep(state);

      resolveReference(state, reference, 5);

      expect(state).to.deep.equal(expectedState);
    });

    it('should return state with value placed at reference.path', function() {
      const path = ['a', 'b'];
      const reference = createReference(path);
      const value = 5;
      const initialState = {
        c: 6
      }
      const state = resolveReference(initialState, reference, value);

      expect(state).to.have.property('c').equal(6);
      expect(state).to.have.deep.property(path.join('.')).equal(value);
    });
  });
});
