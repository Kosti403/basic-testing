import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  let account: BankAccount;

  beforeEach(() => {
    account = getBankAccount(100);
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(150)).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const toAccount = getBankAccount(0);
    expect(() => account.transfer(150, toAccount)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(50, account)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    account.deposit(50);
    expect(account.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    account.withdraw(50);
    expect(account.getBalance()).toBe(50);
  });

  test('should transfer money', () => {
    const toAccount = getBankAccount(0);
    account.transfer(50, toAccount);
    expect(account.getBalance()).toBe(50);
    expect(toAccount.getBalance()).toBe(50);
  });

  test('fetchBalance should return number in case if request did not fail', async () => {
    const balance = await account.fetchBalance();
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const originalBalance = account.getBalance();
    await account.synchronizeBalance();

    expect(account.getBalance()).not.toBe(originalBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
