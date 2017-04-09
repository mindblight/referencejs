/* eslint-disable prefer-arrow-callback, no-unused-expressions */
import { List, Map, OrderedMap, Set, OrderedSet, Stack, Record, Seq } from 'immutable';
import { expect } from 'chai';
import './applyChaiPlugins';

import EmptyReference from '../src/EmptyReference';
import createReferencePlain from '../src/plain/createReference';
import createReferenceImmutable from '../src/immutable/createReference';
import smartDereferencePlain from '../src/plain/smartDereference';
import smartDereferenceImmutable from '../src/immutable/smartDereference';


describe('smartDereference', function() {
  describe('Plain', function() {
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
      reference1 = createReferencePlain(['a', 'b']);
      reference2 = createReferencePlain(['a', 'c']);
    });

    it('should throw error on null store', function() {
      expect(smartDereferencePlain.bind(null, null)).to.throw(Error);
    });

    it('should return EmptyReference when reference does not exist', function() {
      expect(smartDereferencePlain({}, createReferencePlain(['a']))).to.equal(EmptyReference);
    });

    it('should return value for non-reference input', function() {
      const value = Symbol();
      expect(smartDereferencePlain(store, value)).to.equal(value);
    });

    it('should return value at reference', function() {
      expect(smartDereferencePlain(store, reference1)).to.equal(value1);
    });

    it('should return reference in array', function() {
      const input = [reference1, reference2];
      const expected = [value1, value2];

      expect(smartDereferencePlain(store, input)).to.deep.equal(expected);
    });

    it('should ignore non-reference in array', function() {
      const input = [reference1, value2];
      const expected = [value1, value2];

      expect(smartDereferencePlain(store, input)).to.deep.equal(expected);
    });

    it('should deeply handle arrays', function() {
      const input = [reference1, [reference2]];
      const expected = [value1, [value2]];

      expect(smartDereferencePlain(store, input)).to.deep.equal(expected);
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

      expect(smartDereferencePlain(store, input)).to.deep.equal(expected);
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

      expect(smartDereferencePlain(store, input)).to.deep.equal(expected);
    });

    it('should not recurse by default', function() {
      reference1 = createReferencePlain(['a']);
      reference2 = createReferencePlain(['c']);
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

      expect(smartDereferencePlain(store, input)).to.deep.equal(expected);
    });

    it('should dereference itself', function() {
      reference1 = createReferencePlain(['b', 'b1']);
      reference2 = createReferencePlain(['c']);
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

      expect(smartDereferencePlain(store, store)).to.deep.equal(expected);
    });

    it.skip('should not recurse when recurse=true', function() {
      reference1 = createReferencePlain(['a']);
      reference2 = createReferencePlain(['c']);
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

      expect(smartDereferencePlain(store, input, true)).to.deep.equal(expected);
    });
  });


  describe('Immutable', function() {
    const value1 = 9;
    const value2 = 20;
    let store;
    let reference1;
    let reference2;

    beforeEach(function() {
      store = Map({
        a: Map({
          b: value1,
          c: value2,
        }),
      });
      reference1 = createReferenceImmutable('a', 'b');
      reference2 = createReferenceImmutable('a', 'c');
    });

    it('should throw error on null store', function() {
      expect(smartDereferenceImmutable.bind(null, null)).to.throw(Error);
    });

    it('should return EmptyReference when reference does not exist', function() {
      expect(smartDereferenceImmutable(Map(), createReferenceImmutable('a'))).to.equal(EmptyReference);
    });

    it('should return value for non-reference input', function() {
      const value = Symbol();
      expect(smartDereferenceImmutable(store, value)).to.equal(value);
    });

    it('should return value at reference', function() {
      expect(smartDereferenceImmutable(store, reference1)).to.equal(value1);
    });

    it('should return reference in List', function() {
      const input = List([reference1, reference2]);
      const expected = List([value1, value2]);

      expect(smartDereferenceImmutable(store, input)).to.deep.equal(expected);
    });

    it('should ignore non-reference in List', function() {
      const input = List([reference1, value2]);
      const expected = List([value1, value2]);

      expect(smartDereferenceImmutable(store, input)).to.deep.equal(expected);
    });

    it('should deeply handle List', function() {
      const input = List([reference1, List([reference2])]);
      const expected = List([value1, List([value2])]);

      expect(smartDereferenceImmutable(store, input)).to.deep.equal(expected);
    });

    it('should handle Map', function() {
      const input = Map({
        foo: reference1,
        bar: reference2,
      });
      const expected = Map({
        foo: value1,
        bar: value2,
      });

      expect(smartDereferenceImmutable(store, input)).to.deep.equal(expected);
    });

    it('should handle Map', function() {
      const input = Map({
        foo: reference1,
        bar: reference2,
      });
      const expected = Map({
        foo: value1,
        bar: value2,
      });

      expect(smartDereferenceImmutable(store, input)).to.deep.equal(expected);
    });

    it('should deep handle deep Map', function() {
      const input = Map({
        foo: reference1,
        bar: Map({
          baz: reference2,
        }),
      });
      const expected = Map({
        foo: value1,
        bar: Map({
          baz: value2,
        }),
      });

      expect(smartDereferenceImmutable(store, input)).to.deep.equal(expected);
    });

    it('should handle OrderedMap', function() {
      const input = OrderedMap({
        foo: reference1,
        bar: reference2,
      });
      const expected = OrderedMap({
        foo: value1,
        bar: value2,
      });

      expect(smartDereferenceImmutable(store, input)).to.deep.equal(expected);
    });

    it('should handle Set', function() {
      const input = Set([
        reference1,
        reference2,
      ]);
      const expected = Set([
        value1,
        value2,
      ]);

      expect(smartDereferenceImmutable(store, input)).to.deep.equal(expected);
    });

    it('should handle OrderedSet', function() {
      const input = OrderedSet([
        reference1,
        reference2,
      ]);
      const expected = OrderedSet([
        value1,
        value2,
      ]);

      expect(smartDereferenceImmutable(store, input)).to.deep.equal(expected);
    });

    it('should handle Stack', function() {
      const input = Stack([
        reference1,
        reference2,
      ]);
      const expected = Stack([
        value1,
        value2,
      ]);

      expect(smartDereferenceImmutable(store, input)).to.deep.equal(expected);
    });

    it('should handle Record', function() {
      const base = Record({
        a: reference1,
        b: reference2,
      });
      const input = new base();
      const expected = new base({
        a: value1,
        b: value2,
      });

      expect(smartDereferenceImmutable(store, input)).to.deep.equal(expected);
    });

    it('should handle Seq', function() {
      const input = Seq([
        reference1,
        reference2,
      ]);
      const expected = Seq([
        value1,
        value2,
      ]);

      expect(smartDereferenceImmutable(store, input)).to.deep.equal(expected);
    });

    it('should not recurse by default', function() {
      reference1 = createReferenceImmutable(['a']);
      reference2 = createReferenceImmutable(['c']);
      const object = Map({
        b: reference2,
      });
      store = Map({
        a: object,
        c: value2,
      });

      const input = Map({
        foo: reference1,
      });
      const expected = Map({
        foo: object,
      });

      expect(smartDereferenceImmutable(store, input)).to.deep.equal(expected);
    });

    it('should dereference itself', function() {
      reference1 = createReferenceImmutable(['b', 'b1']);
      reference2 = createReferenceImmutable(['c']);
      store = Map({
        a: reference1,
        b: Map({
          b1: value1,
        }),
        c: value2,
        d: Map({
          d1: reference2,
        }),
        e: reference1,
      });

      const expected = Map({
        a: value1,
        b: Map({
          b1: value1,
        }),
        c: value2,
        d: Map({
          d1: value2,
        }),
        e: value1,
      });

      expect(smartDereferenceImmutable(store, store)).to.deep.equal(expected);
    });

    it.skip('should not recurse when recurse=true', function() {
      reference1 = createReferenceImmutable(['a']);
      reference2 = createReferenceImmutable(['c']);
      const object = Map({
        b: reference2,
      });
      store = Map({
        a: object,
        c: value2,
      });

      const input = Map({
        foo: reference1,
      });
      const expected = Map({
        foo: Map({
          b: value2,
        }),
      });

      expect(smartDereferenceImmutable(store, input, true)).to.deep.equal(expected);
    });
  });
});
