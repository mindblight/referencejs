/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai';
import './applyChaiPlugins';
import { List } from 'immutable';

import isReferencePlain from '../src/isReference';
import isReferenceImmutable from '../src/immutable/isReference';

import createReferencePlain from '../src/createReference';
import createReferenceImmutable from '../src/immutable/createReference';

describe('createReference', function() {
  describe('Plain', function() {
    it('should accept single array argument', function() {
      const path = ['a', 'b'];
      const reference = createReferencePlain(path);

      expect(isReferencePlain(reference)).to.be.true;
      expect(reference).to.have.property('path').deep.equal(path);
    });

    it('should accept multiple PathSegment arguments', function() {
      const path = ['a', 'b'];
      const reference = createReferencePlain('a', 'b');

      expect(isReferencePlain(reference)).to.be.true;
      expect(reference).to.have.property('path').deep.equal(path);
    });
  });

  describe('Immutable', function() {
    it('should accept single array argument', function() {
      const path = ['a', 'b'];
      const reference = createReferenceImmutable(path);

      expect(isReferenceImmutable(reference)).to.be.true;
      expect(reference).to.have.property('path').deep.equal(List(path));
    });

    it('should accept single List argument', function() {
      const path = List(['a', 'b']);
      const reference = createReferenceImmutable(path);

      expect(isReferenceImmutable(reference)).to.be.true;
      expect(reference).to.have.property('path').deep.equal(path);
    });

    it('should accept multiple PathSegment arguments', function() {
      const path = ['a', 'b'];
      const reference = createReferenceImmutable('a', 'b');

      expect(isReferenceImmutable(reference)).to.be.true;
      expect(reference).to.have.property('path').equal(List(path));
    });
  });
});
