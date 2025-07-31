import { player, updateStats } from './index.js';

const balanceText = document.getElementById('balanceText');
const bankNameText = document.getElementById('bankNameText');
const buttonBank1 = document.getElementById('buttonBank1');
const buttonBank2 = document.getElementById('buttonBank2');

bankNameText.innerText = player.bank;
balanceText.innerText = player.bankMoney;

buttonBank1.onclick = () => depositMoney();
buttonBank2.onclick = () => withdrawMoney();

function depositMoney(amount) {
    amount = Number(prompt("How much? "));
    if (player.money >= amount) {
        player.bankMoney += amount;
        player.money -= amount;
        balanceText.innerText = player.bankMoney;
        updateStats();
    }
}

function withdrawMoney(amount) {
    amount = Number(prompt("How much? "));
    if (player.bankMoney >= amount) {
        player.bankMoney -= amount;
        player.money += amount;
        balanceText.innerText = player.bankMoney;
        updateStats();
    }
}
