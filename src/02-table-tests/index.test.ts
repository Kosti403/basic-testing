import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 4, b: 5, action: Action.Multiply, expected: 20 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 'not a number', b: 2, action: Action.Add, expected: null },
  { a: 1, b: 'not a number', action: Action.Add, expected: null },
  { a: 1, b: 2, action: 'not valid', expected: null },
];

describe('simpleCalculator table tests', () => {
  test.each(testCases)(
    'for $action $a и $b await $expected',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
