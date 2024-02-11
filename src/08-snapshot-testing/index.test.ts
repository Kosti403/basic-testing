// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const values = [1, 2, 3];
    const expectedLinkedList = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: null,
            next: null,
          },
        },
      },
    };

    const generatedList = generateLinkedList(values);
    expect(generatedList).toStrictEqual(expectedLinkedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const values = [4, 5, 6];
    const generatedList = generateLinkedList(values);

    expect(generatedList).toMatchSnapshot();
  });
});
