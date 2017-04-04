/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import {
  isPath,
  isReference,
  createReference,
  resolveReference,
  dereference,
  EMPTY_REFERENCE,
  isValueAtReference,
  smartDereference,
} from '../src/reference';
import cloneDeep from 'lodash/cloneDeep';

describe('isPath', function() {
  it('should return false on non-array', function() {
    expect(isPath({})).to.be.false;
  });

  it('should return false on empty array', function() {
    expect(isPath([])).to.be.false;
  });

  it('should return false on non-string, non-integer array', function() {
    expect(isPath([{}, 'hi'])).to.be.false;
  });

  it('should return false on string array with empty string', function() {
    expect(isPath(['', 'hi'])).to.be.false;
  });

  it('should return true on string array', function() {
    expect(isPath(['bye', 'hi'])).to.be.true;
  });

  it('should support array indices', function() {
    expect(isPath(['array', 5])).to.be.true;
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
      path: ['a', 'b'],
    })).to.be.true;
  });
});


describe('createReference', function() {
  it('should throw error on null path', function() {
    expect(isValueAtReference.bind(null, null)).to.throw(Error);
  });

  it('should throw error on invalid path', function() {
    expect(isValueAtReference.bind(null, [3])).to.throw(Error);
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
      b: 'hi',
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
      c: 6,
    };
    const state = resolveReference(initialState, reference, value);

    expect(state).to.have.property('c').equal(6);
    expect(state).to.have.deep.property(path.join('.')).equal(value);
  });

  it('should handle arrays in store', function() {
    const path = ['a', 0];
    const reference = createReference(path);
    const value = 'foo';
    const initialState = {
      a: [],
    };
    const state = resolveReference(initialState, reference, value);
    const expectedState = {
      a: [value],
    };

    expect(state).to.deep.equal(expectedState);
  });

  it('should handle deep object creation', function() {
    const path = ['a', 0, 'b'];
    const reference = createReference(path);
    const value = 'foo';
    const initialState = {};
    const state = resolveReference(initialState, reference, value);
    const expectedState = {
      a: [{
        b: value,
      }],
    };

    expect(state).to.deep.equal(expectedState);
  });
});


describe('isValueAtReference', function() {
  it('should throw error on empty store', function() {
    expect(dereference.bind(null, null)).to.throw(Error);
  });

  it('should throw error on invalid reference', function() {
    expect(dereference.bind(null, {}, {})).to.throw(Error);
  });

  it('should return false when reference does not exist', function() {
    const reference = createReference(['a']);
    expect(isValueAtReference({}, reference)).to.be.false;
  });

  it('should return value at reference', function() {
    const value = 9;
    const store = {
      a: {
        b: value,
      },
    };
    const reference = createReference(['a', 'b']);

    expect(isValueAtReference(store, reference)).to.be.true;
  });
});


describe('dereference', function() {
  it('should throw error on empty store', function() {
    expect(dereference.bind(null, null)).to.throw(Error);
  });

  it('should throw error on invalid reference', function() {
    expect(dereference.bind(null, {}, {})).to.throw(Error);
  });

  it('should return EMPTY_REFERENCE when reference does not exist', function() {
    expect(dereference({}, createReference(['a']))).to.equal(EMPTY_REFERENCE);
  });

  it('should return value at reference', function() {
    const value = 9;
    const store = {
      a: {
        b: value,
      },
    };
    const reference = createReference(['a', 'b']);

    expect(dereference(store, reference)).to.equal(value);
  });
});


describe('smartDereference', function() {
  const value1 = 9;
  const value2 = 20;
  let store;
  let reference1;
  let reference2;

  beforeEach(function() {
    store = {
      a: {
        b: value1,
        c: value2,
      },
    };
    reference1 = createReference(['a', 'b']);
    reference2 = createReference(['a', 'c']);
  });

  it('should throw error on null store', function() {
    expect(smartDereference.bind(null, null)).to.throw(Error);
  });

  it('should return EMPTY_REFERENCE when reference does not exist', function() {
    expect(smartDereference({}, createReference(['a']))).to.equal(EMPTY_REFERENCE);
  });

  it('should return value for non-reference input', function() {
    const value = Symbol();
    expect(smartDereference(store, value)).to.equal(value);
  });

  it('should return value at reference', function() {
    expect(smartDereference(store, reference1)).to.equal(value1);
  });

  it('should return reference in array', function() {
    const input = [reference1, reference2];
    const expected = [value1, value2];

    expect(smartDereference(store, input)).to.deep.equal(expected);
  });

  it('should ignore non-reference in array', function() {
    const input = [reference1, value2];
    const expected = [value1, value2];

    expect(smartDereference(store, input)).to.deep.equal(expected);
  });

  it('should deeply handle arrays', function() {
    const input = [reference1, [reference2]];
    const expected = [value1, [value2]];

    expect(smartDereference(store, input)).to.deep.equal(expected);
  });

  it('should handle plain objects', function() {
    const input = {
      foo: reference1,
      bar: reference2,
    };
    const expected = {
      foo: value1,
      bar: value2,
    };

    expect(smartDereference(store, input)).to.deep.equal(expected);
  });

  it('should deep handle plain objects', function() {
    const input = {
      foo: reference1,
      bar: {
        baz: reference2,
      },
    };
    const expected = {
      foo: value1,
      bar: {
        baz: value2,
      },
    };

    expect(smartDereference(store, input)).to.deep.equal(expected);
  });

  it('should not recurse by default', function() {
    reference1 = createReference(['a']);
    reference2 = createReference(['c']);
    const object = {
      b: reference2,
    };
    store = {
      a: object,
      c: value2,
    };

    const input = {
      foo: reference1,
    };
    const expected = {
      foo: object,
    };

    expect(smartDereference(store, input)).to.deep.equal(expected);
  });

  it('should dereference itself', function() {
    reference1 = createReference(['b', 'b1']);
    reference2 = createReference(['c']);
    store = {
      a: reference1,
      b: {
        b1: value1,
      },
      c: value2,
      d: {
        d1: reference2,
      },
      e: reference1,
    };

    const expected = {
      a: value1,
      b: {
        b1: value1,
      },
      c: value2,
      d: {
        d1: value2,
      },
      e: value1,
    };

    expect(smartDereference(store, store)).to.deep.equal(expected);
  });

  it.skip('should not recurse when recurse=true', function() {
    reference1 = createReference(['a']);
    reference2 = createReference(['c']);
    const object = {
      b: reference2,
    };
    store = {
      a: object,
      c: value2,
    };

    const input = {
      foo: reference1,
    };
    const expected = {
      foo: {
        b: value2,
      },
    };

    expect(smartDereference(store, input, true)).to.deep.equal(expected);
  });
});
