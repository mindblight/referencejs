/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai';
import './applyChaiPlugins';

import isPathSegment from '../src/isPathSegment';


describe('isPathSegment', function() {
  it('should return true for integer >= 0', function() {
    expect(isPathSegment(5)).to.be.true;
  });

  it('should return false for integer < 0', function() {
    expect(isPathSegment(-5)).to.be.false;
  });

  it('should return false for non-integer number', function() {
    expect(isPathSegment(5.5)).to.be.false;
  });

  it('should return true for string', function() {
    expect(isPathSegment('hello')).to.be.true;
  });

  it('should return false for empty string', function() {
    expect(isPathSegment('')).to.be.false;
  });

  it('should return false for non-string, non-integer', function() {
    expect(isPathSegment({})).to.be.false;
  });
});
