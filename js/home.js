import { player, returnMoney, updateStats } from './index.js';

const moneyText = document.getElementById('moneyText');
const revenueText = document.getElementById('revenueText');
const expensesText = document.getElementById('expensesText');
const debtText = document.getElementById('debtText');
const interestText = document.getElementById('interestText');
const profitText = document.getElementById('profitText');

const businessesText = document.getElementById('businessesText');
const propertiesText = document.getElementById('propertiesText');

autoUpdateStatsHome();


// updates
function updateStatsHome() {
    moneyText.innerText = Number(player.money.toFixed(2));
    revenueText.innerText = player.returnRevenue();
    expensesText.innerText = player.returnExpenses();
    debtText.innerText = player.returnDebt();
    interestText.innerText = player.returnInterest();
    showProfit();
    businessesText.innerText = player.showBusinesses();
    propertiesText.innerText = player.showProperties();
}

function autoUpdateStatsHome() {
    updateStatsHome();
    setInterval(function(){
        updateStatsHome();
    }, 1000);
}

function showProfit() {
    profitText.innerText = player.returnProfit();
    if (player.returnProfit() < 0) {
        profitText.style.color = "red";
    } else {
        profitText.style.color = "green";
    }
}