export class Player {
    constructor(name) {
        this.name = name;
        this.money = 20000;
        this.revenue = 0;
        this.expenses = 0;
        this.debt = 0;
        this.interest = 0;
        this.profit = 0;
        this.bank = "Wood&Steel Bank";
        this.businesses = [];
        this.currentBusiness;
        this.properties = [];
        this.assets = [];
        this.mail = [];
    }

    addMoney(amount) {
        this.money += amount;
    }

    spendMoney(amount) {
        this.money -= amount;
    }

    returnRevenue() {
        return this.revenue;
    }

    returnExpenses() {
        return this.expenses;
    }

    returnDebt() {
        return this.debt;
    }

    returnInterest() {
        return this.interest;
    }

    returnProfit() {
        return this.revenue - this.expenses;
    }

    showBusinesses() {
        return this.businesses.map(b => b.name).join(', ');
    }

    showProperties() {
        return this.properties.map(p => p.name).join(', ');
    }
}

