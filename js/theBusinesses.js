export class Business {
    constructor(name, type, price) {
        this.name = name;
        this.type = type;
        this.price = price;
        this.money = 0;
        this.invested = 0;
        this.revenue = 0;
        this.expenses = 0;
        this.debt = 0;
        this.interest = 0;
        this.profit = 0;
    }

    addMoney(amount) {
        this.money += amount;
    }

    spendMoney(amount) {
        this.money -= amount;
    }

    returnNetWorth() {
        return this.netWorth + this.money;
    }

    returnRevenue() {
        this.revenue = this.invested * 1.5;
        return Number(this.revenue.toFixed(2));
    }

    returnExpenses() {
        this.expenses = this.invested * 1.25;
        return Number(this.expenses.toFixed(2));
    }

    returnProfit() {
        const profit = this.returnRevenue() - this.returnExpenses();
        return Number(profit.toFixed(2));
    }

    returnPrice() {
        const price = this.price + (this.returnProfit() * 5);
        return Number(price.toFixed(2));
    }
}

