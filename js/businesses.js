import { player, game, updateStats, loadSection, immortal, catcoffee } from './index.js';

const goBusinessButton1 = document.getElementById('goBusinessButton1');
const goBusinessButton2 = document.getElementById('goBusinessButton2');

const previousBusinessOwnedButton = document.getElementById('previousBusinessOwnedButton');
const nextBusinessOwnedButton = document.getElementById('nextBusinessOwnedButton');
const previousBusinessSaleButton = document.getElementById('previousBusinessSaleButton');
const nextBusinessSaleButton = document.getElementById('nextBusinessSaleButton');

const businessNameText = document.getElementById('businessNameText');
const businessTypeText = document.getElementById('businessTypeText');
const businessPriceText = document.getElementById('businessPriceText');
const businessRevenueText = document.getElementById('businessRevenueText');
const businessExpensesText = document.getElementById('businessExpensesText');
const businessProfitText = document.getElementById('businessProfitText');

const businessNameText2 = document.getElementById('businessNameText2');
const businessTypeText2 = document.getElementById('businessTypeText2');
const businessPriceText2 = document.getElementById('businessPriceText2');
const businessRevenueText2 = document.getElementById('businessRevenueText2');
const businessExpensesText2 = document.getElementById('businessExpensesText2');
const businessProfitText2 = document.getElementById('businessProfitText2');

player.currentBusiness = 0;
let selectedBusiness = 0;

startingOverview();

previousBusinessOwnedButton.onclick = previousBusiness;
nextBusinessOwnedButton.onclick = nextBusiness;
previousBusinessSaleButton.onclick = previousBusinessSale;
nextBusinessSaleButton.onclick = nextBusinessSale;

goBusinessButton1.onclick = () => goMainBusiness();
goBusinessButton2.onclick = () => buyBusiness(selectedBusiness);

function previousBusiness() {
    if (player.currentBusiness > 0) {
        player.currentBusiness -= 1;
        businessOverview(player.currentBusiness);
    }
}

function nextBusiness() {
    if (player.currentBusiness < player.businesses.length -1) {
        player.currentBusiness += 1;
        businessOverview(player.currentBusiness);
    }
}

function previousBusinessSale() {
    if (selectedBusiness > 0) {
        selectedBusiness -= 1;
        businessOverview2(selectedBusiness);
    }
}

function nextBusinessSale() {
    if (selectedBusiness < game.businesses.length - 1) {
        selectedBusiness += 1;
        businessOverview2(selectedBusiness);
    }
    
}

function goMainBusiness() {
    if (player.currentBusiness !== -1) {
        loadSection('mainBusiness');
    }
}

function goBusinesses() {
    loadSection('businesses');
}

function buyBusiness(index) {
    player.businesses.push(game.businesses[index]);
    game.businesses[index].money = 0;
    player.spendMoney(game.businesses[index].returnPrice());
    game.businesses.splice(selectedBusiness, 1);
    updateStats();
    goBusinesses();
}

// buying via name
/*function buyBusiness(name) {
    const index = game.businesses.indexOf(name);
    if (index !== -1) {
        game.businesses.splice(index, 1);
        player.businesses.push(name);
        name.money = 0;
        player.spendMoney(name.returnPrice());
    }
    updateStats();
    goBusinesses();
}*/

function businessOverview(index) {
    businessNameText.innerText = player.businesses[index].name;
    businessTypeText.innerText = player.businesses[index].type;
    businessPriceText.innerText = player.businesses[index].returnPrice();
    businessRevenueText.innerText = player.businesses[index].returnRevenue();
    businessExpensesText.innerText = player.businesses[index].returnExpenses();
    businessProfitText.innerText = player.businesses[index].returnProfit();
    if (player.businesses[index].returnProfit() < 0) {
            businessProfitText.style.color = "red";
        } else {
            businessProfitText.style.color = "green";
        }
}

function businessOverview2(index) {
    businessNameText2.innerText = game.businesses[index].name;
    businessTypeText2.innerText = game.businesses[index].type;
    businessPriceText2.innerText = game.businesses[index].returnPrice();
    businessRevenueText2.innerText = game.businesses[index].returnRevenue();
    businessExpensesText2.innerText = game.businesses[index].returnExpenses();
    businessProfitText2.innerText = game.businesses[index].returnProfit();
    if (game.businesses[index].returnProfit() < 0) {
            businessProfitText2.style.color = "red";
        } else {
            businessProfitText2.style.color = "green";
        }
}

function startingOverview() {
    if (player.businesses.length !== 0) {
        businessOverview(player.currentBusiness);
    }

    if (game.businesses.length !== 0) {
        businessOverview2(selectedBusiness);
    }
}