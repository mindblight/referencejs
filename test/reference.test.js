import { expect } from 'chai';
import {
  isPath
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
});
