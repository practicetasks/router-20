import { test, expect } from "@jest/globals";
import { BankAccount } from "../bankAccount";

test('Баланс увеличивается после депозита', () => {
    const account = new BankAccount();

    account.deposit(100);

    expect(account.getBalance()).toBe(100);
});

test('Ошибка при отрицательной сумме при пополнении', () => {
    const account = new BankAccount();

    expect(() => account.deposit(-100)).toThrow();
});

test('Баланс уменьшается', () => {
    const account = new BankAccount();
    account.deposit(200);
    account.withdraw(100);

    expect(account.getBalance()).toBe(100);
});

test('Ошибка при недостатке средств', () => {
    const account = new BankAccount();
    account.deposit(50);

    expect(() => account.withdraw(-100)).toThrow();
});

test('Ошибка при отрицательной сумме при снятии', () => {
    const account = new BankAccount();

    expect(() => account.withdraw(-100)).toThrow();
});


test('Деньги списались с одного и пришли на другой', () => {
    const account = new BankAccount();
    const targetAccount = new BankAccount();

    account.deposit(100);
    account.transfer(100, targetAccount);
    expect(account.getBalance()).toBe(0);
    expect(targetAccount.getBalance()).toBe(100);
});

test('Ошибка при недостатке средств', () => {
    const account = new BankAccount();
    const targetAccount = new BankAccount();

    account.deposit(50);
    expect(() => account.transfer(100, targetAccount)).toThrow();
    expect(targetAccount.getBalance()).toBe(0);
});

test('Ошибка при недостатке средств', () => {
    const account = new BankAccount();
    const targetAccount = new BankAccount();

    account.deposit(50);
    expect(() => account.transfer(100, targetAccount)).toThrow();
    expect(targetAccount.getBalance()).toBe(0);
});

test('История содержит запись после каждой операции', () => {
    const account = new BankAccount();
    const targetAccount = new BankAccount();

    account.deposit(200);
    account.withdraw(50);
    account.transfer(100, targetAccount);

    const history = account.getHistory();

    expect(history).toEqual(
        expect.arrayContaining([
            expect.objectContaining({ type: 'deposit', amount: 200 }),
            expect.objectContaining({ type: 'withdraw', amount: 50 }),
            expect.objectContaining({ type: 'transfer', amount: 100 }),
        ])
    );
});



