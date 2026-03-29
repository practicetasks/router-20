
interface Transaction {
    type: 'deposit' | 'withdraw' | 'transfer';
    amount: number;
    date: Date;
}

export class BankAccount {
    private balance: number = 0;
    private transactions: Transaction[] = [];

    private addTransaction(type: Transaction['type'], amount: number): void {
        this.transactions.push({
            type,
            amount,
            date: new Date(),
        });
    }

    deposit(amount: number): void {
        if (amount <= 0) {
            throw new Error('Amount must be greater than 0');
        }

        this.balance += amount;

        this.transactions.push({
            type: 'deposit',
            amount,
            date: new Date(),
        });
    }

    withdraw(amount: number): void {
        if (amount <= 0) {
            throw new Error('Amount must be greater than 0');
        }

        if (amount > this.balance) {
            throw new Error('Insufficient funds');
        }

        this.balance -= amount;
        this.addTransaction('withdraw', amount);
    }

    transfer(amount: number, target: BankAccount): void {
        if (amount <= 0) {
            throw new Error('Amount must be greater than 0');
        }

        if (amount > this.balance) {
            throw new Error('Insufficient funds');
        }

        this.balance -= amount;
        target.balance += amount;
        this.addTransaction('transfer', amount);
        target.addTransaction('deposit', amount);
    }

    getBalance(): number {
        return this.balance;
    }

    getHistory(): Transaction[] {
        return [...this.transactions];
    }
}
