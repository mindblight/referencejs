import { expect } from 'chai';
import {
  isPath,
  isReference,
  createReference
} from '../src/reference';

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
});
