'use strict';

const Matchers = {

  toBeMapWithKeys: (util, customEqualityTesters) => {
    return {
      compare: (actual, expected) => {
        const result = {};
        result.pass = (typeof actual === 'object') &&
        (actual instanceof Map) &&
        (actual.size === expected.length) &&
        expected.every(element => actual.has(element));
        result.message = result.pass
        ? `Expected [${typeof actual}] not to be a Map() with keys [${expected.join(', ')}].`
        : `Expected [${typeof actual}] to be a Map() with keys [${expected.join(', ')}].`;
        return result;
      },
    }
  },

  toBeSetWithValues: (util, customEqualityTesters) => {
    return {
      compare: (actual, expected) => {
        const result = {};
        result.pass = (typeof actual === 'object') &&
        (actual instanceof Set) &&
        (actual.size === expected.length) &&
        expected.every(element => actual.has(element));
        result.message = result.pass
        ? `Expected [${typeof actual}] not to be a Set() with values [${expected.join(', ')}].`
        : `Expected [${typeof actual}] to be a Set() with values [${expected.join(', ')}].`;
        return result;
      },
    }
  }

};
