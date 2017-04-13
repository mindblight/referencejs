/* eslint-disable prefer-arrow-callback, no-unused-expressions */

describe('createPath', function() {
  describe('Plain', function() {
    it('should import directly', function() {
      require('../src/plain/index');
    });
    it('should import directly', function() {
      require('../src/plain');
    });
  });


  describe('Immutable', function() {
    it('should import directly', function() {
      require('../src/immutable/index');
    });
    it('should import', function() {
      require('../src/immutable');
    });
  });
});
