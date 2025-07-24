import { player, game, updateStats, loadSection, immortal } from './index.js';

const businessSelector = document.getElementById('businessSelector');
const businessSelector2 = document.getElementById('businessSelector2');

const goBusinessButton1 = document.getElementById('goBusinessButton1');
const goBusinessButton2 = document.getElementById('goBusinessButton2');

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

const businessSelectorOption0 = document.getElementById('businessSelectorOption0');
const businessSelector2Option0 = document.getElementById('businessSelector2Option0');

checkSelector();
player.currentBusiness = -1;

goBusinessButton1.onclick = () => goMainBusiness();
goBusinessButton2.onclick = () => buyBusiness(immortal);

businessSelector.onchange = function() {
    const index = this.value;
    player.currentBusiness = index;

    if (index === "") return;

    businessOverview(index);
}

businessSelector2.onchange = function() {
    const index = this.value;

    if (index === "") return;

    businessOverview2(index);
}

function goMainBusiness() {
    if (player.currentBusiness !== -1) {
        loadSection('mainBusiness');
    }
}

function goBusinesses() {
    loadSection('businesses');
}

function buyBusiness(name) {
    const index = game.businesses.indexOf(name);
    if (index !== -1) {
        game.businesses.splice(index, 1);
        player.businesses.push(name);
        name.money = 0;
        player.spendMoney(name.returnPrice());
    }
    checkSelector();
    updateStats();
    goBusinesses();
}

function checkSelector() {
    if (game.businesses[0]) {
        businessSelector2Option0.textContent = game.businesses[0].name;
        businessSelector2Option0.hidden = false;
    } else {
        businessSelector2Option0.hidden = true;
    }
    if (player.businesses[0]) {
        businessSelectorOption0.textContent = player.businesses[0].name;
        businessSelectorOption0.hidden = false;
    } else {
        businessSelectorOption0.hidden = true;
    }
}

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