/* eslint-disable prefer-arrow-callback, no-unused-expressions */

describe('createPath', function() {
  describe('Plain', function() {
    it('should import', function() {
      require('../src/index');
    });
  });


  describe('Immutable', function() {
    it('should import', function() {
      require('../src/immutable/index');
    });
  });
});
