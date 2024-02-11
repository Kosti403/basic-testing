import * as indexModule from './index';

jest.mock('./index', () => {
  const originalModule = jest.requireActual<typeof indexModule>('./index');

  return {
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});
describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    indexModule.mockOne();
    indexModule.mockTwo();
    indexModule.mockThree();

    expect(consoleSpy).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  test('unmockedFunction should log into console', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    indexModule.unmockedFunction();

    expect(consoleSpy).toHaveBeenCalledWith('I am not mocked');

    consoleSpy.mockRestore();
  });
});
