import { player, updateStats, game, loadSection, formatNumber } from './index.js';

const currentBusiness = player.currentBusiness;

const businessNameText = document.getElementById('businessNameText');
const businessTypeText = document.getElementById('businessTypeText');
const businessPriceText = document.getElementById('businessPriceText');
const businessRevenueText = document.getElementById('businessRevenueText');
const businessExpensesText = document.getElementById('businessExpensesText');
const businessProfitText = document.getElementById('businessProfitText');
const businessMoneyText = document.getElementById('businessMoneyText');

const nameButton = document.getElementById('nameButton');
const depositMoneyButton = document.getElementById('depositMoneyButton');
const withdrawMoneyButton = document.getElementById('withdrawMoneyButton');
const investButton = document.getElementById('investButton');
const sellBusinessButton = document.getElementById('sellBusinessButton');

businessOverview(currentBusiness);

nameButton.onclick = () => changeName();
depositMoneyButton.onclick = () => depositMoney();
withdrawMoneyButton.onclick = () => withdrawMoney();
investButton.onclick = () => investMoney();
sellBusinessButton.onclick = () => sellBusiness();

// updates
function updateBusinessStats() {
	businessOverview(currentBusiness);
}

// money
function depositMoney() {
	const amount = Number(prompt("Enter the amount you wish to deposit: "));
	if (player.money >= amount) {
		player.businesses[currentBusiness].addMoney(amount);
		player.spendMoney(amount);
		updateBusinessStats();
		updateStats();
	}
}

function withdrawMoney() {
	const amount = Number(prompt("Enter the amount you wish to withdraw: "));
	if (player.businesses[currentBusiness].money >= amount) {
		player.addMoney(amount);
		player.businesses[currentBusiness].spendMoney(amount);
		updateBusinessStats();
		updateStats();
	}
}

function investMoney() {
	const amount = Number(prompt("Enter the amount you wish to invest: "));
	if (player.businesses[currentBusiness].money >= amount) {
		player.businesses[currentBusiness].invested += amount;
		player.businesses[currentBusiness].spendMoney(amount);
		updateBusinessStats();
		updateStats();
	}
}

function goBusinesses() {
    loadSection('businesses');
}

function sellBusiness() {
	const business = player.businesses[currentBusiness];
	player.addMoney(business.returnPrice());
	player.businesses.splice(currentBusiness, 1);
	game.businesses.push(business);
	player.currentBusiness = -1;
	updateStats();
	goBusinesses();
}

function changeName() {
	const newName = prompt("Enter a new name: ");
	player.businesses[currentBusiness].name = newName;
	businessNameText.innerText = player.businesses[currentBusiness].name;
}

function businessOverview(index) {
    businessNameText.innerText = player.businesses[index].name;
    businessTypeText.innerText = player.businesses[index].type;
    businessPriceText.innerText = formatNumber(player.businesses[index].returnPrice());
    businessRevenueText.innerText = formatNumber(player.businesses[index].returnRevenue());
    businessExpensesText.innerText = formatNumber(player.businesses[index].returnExpenses());
    businessProfitText.innerText = formatNumber(player.businesses[index].returnProfit());
    if (player.businesses[index].returnProfit() < 0) {
            businessProfitText.style.color = "red";
        } else {
            businessProfitText.style.color = "green";
        }

	businessMoneyText.innerText = formatNumber(player.businesses[index].money.toFixed(2));
}

