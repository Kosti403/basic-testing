import axios from 'axios';

import { throttledGetDataFromApi } from './index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    mockedAxios.create.mockReturnThis();
    mockedAxios.get.mockResolvedValue({ data: 'mocked data' });
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('/posts');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi('/posts/1');
    expect(mockedAxios.get).toHaveBeenCalledWith('/posts/1');
  });

  test('should return response data', async () => {
    const data = await throttledGetDataFromApi('/posts/2');
    expect(data).toBe('mocked data');
  });
});
