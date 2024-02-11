import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import * as fs from 'fs';
import * as path from 'path';

jest.mock('fs', () => ({
  existsSync: jest.fn(),
  promises: {
    readFile: jest.fn(),
  },
}));

jest.mock('path', () => ({
  join: jest.fn(),
}));

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);

    expect(jest.getTimerCount()).toBe(1);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    jest.advanceTimersByTime(500);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);
    expect(jest.getTimerCount()).toBe(1);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);
    jest.advanceTimersByTime(3000);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (path.join as jest.Mock).mockImplementation((...args) => args.join('/'));
  });

  test('should call join with pathToFile', async () => {
    const mockPath = 'mock/path/test.txt';
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.promises.readFile as jest.Mock).mockResolvedValue(
      Buffer.from('File content'),
    );

    const expectedPath = `${__dirname}/test.txt`;

    await readFileAsynchronously('test.txt');

    expect(path.join).toHaveBeenCalledWith(__dirname, 'test.txt');

    expect(fs.existsSync).toHaveBeenCalledWith(expectedPath);
  });
});
