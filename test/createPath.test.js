/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai';
import { List } from 'immutable';
import './applyChaiPlugins';

import createPathPlain from '../src/createPath';
import isPathPlain from '../src/isPath';
import createPathImmutable from '../src/immutable/createPath';
import isPathImmutable from '../src/immutable/isPath';


describe('isPath', function() {
  describe('Plain', function() {
    it('should return new path array', function() {
      const pathArray = ['b', 1];
      const path = createPathPlain(pathArray);
      pathArray.push(2);

      expect(path).to.deep.equal(['b', 1]);
    });

    it('should accept single Array<PathSegments> as argument', function() {
      const pathArray = ['b', 1];
      const path = createPathPlain(pathArray);

      expect(isPathPlain(path)).to.be.true;
      expect(path).to.deep.equal(pathArray);
    });

    it('should throw error on invalid path array', function() {
      expect(createPathPlain.bind(null, [-10])).to.throw(Error);
    });

    it('should throw error when passed both an array and path segment args', function() {
      expect(createPathPlain.bind(null, ['b'], 'c')).to.throw(Error);
    });

    it('should accept multiple path segment args', function() {
      const expectedPath = ['b', 1];
      const path = createPathPlain('b', 1);

      expect(isPathPlain(path)).to.be.true;
      expect(path).to.deep.equal(expectedPath);
    });

    it('should throw error when passed invalid path segment argument', function() {
      expect(createPathPlain.bind(null, '', 'c')).to.throw(Error);
    });

    it('should throw error when passed no arguments', function() {
      expect(createPathPlain.bind(null)).to.throw(Error);
    });
  });


  describe('Immutable', function() {
    it('should accept single Array<PathSegments> as argument', function() {
      const pathArray = ['b', 1];
      const path = createPathImmutable(pathArray);

      expect(isPathImmutable(path)).to.be.true;
      expect(path).to.deep.equal(List(pathArray));
    });

    it('should accept single List<PathSegments> as argument', function() {
      const pathList = List(['b', 1]);
      const path = createPathImmutable(pathList);

      expect(isPathImmutable(path)).to.be.true;
      expect(path).to.deep.equal(pathList);
    });

    it('should throw error on invalid path List', function() {
      expect(createPathImmutable.bind(null, List([-10]))).to.throw(Error);
    });

    it('should throw error when passed both a List and path segment args', function() {
      expect(createPathImmutable.bind(null, List(['b']), 'c')).to.throw(Error);
    });

    it('should accept multiple path segment args', function() {
      const expectedPath = List(['b', 1]);
      const path = createPathImmutable('b', 1);

      expect(isPathImmutable(path)).to.be.true;
      expect(path).to.deep.equal(expectedPath);
    });

    it('should throw error when passed invalid path segment argument', function() {
      expect(createPathImmutable.bind(null, '', 'c')).to.throw(Error);
    });

    it('should throw error when passed no arguments', function() {
      expect(createPathImmutable.bind(null)).to.throw(Error);
    });
  });
});
