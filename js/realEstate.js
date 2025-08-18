import { player, updateStats } from './index.js';
import { properties } from './properties.js';

const buttonAssets1 = document.getElementById('buttonAssets1');
const buttonAssets2 = document.getElementById('buttonAssets2');
const buttonAssets3 = document.getElementById('buttonAssets3');

const ownershipText = document.getElementById('ownershipText');
const propertyNameText = document.getElementById('propertyNameText');
const priceText = document.getElementById('priceText');
const text = document.getElementById('text');

let index = 0;

buttonAssets1.onclick = previousProperty;
buttonAssets3.onclick = nextProperty;

checkOwnership();
update(index);

function update(index) {
    propertyNameText.innerText = properties[index].name;
    priceText.innerText = properties[index].price.toFixed(2);
    text.innerText = properties[index].text;
    checkOwnership();
    updateStats();
}

function buyProperty(index) {
    if (player.money >= properties[index].price) {
        player.money -= properties[index].price;
        player.properties.push(properties[index]);
    }
    update(index);
}

function sellProperty(index) {
    const playerPropertyIndex = player.properties.indexOf(properties[index]);
    if (playerPropertyIndex !== -1) {
        player.properties.splice(playerPropertyIndex, 1);
        player.money += properties[index].price;
    }
    update(index);
}

function checkOwnership() {
    if (player.properties.includes(properties[index])) {
        buttonAssets2.innerText = "Sell";
        ownershipText.innerText = "Owned";
        ownershipText.style.color = "green";
        buttonAssets2.onclick = () => sellProperty(index);
    } else {
        buttonAssets2.innerText = "Buy";
        ownershipText.innerText = "Not Owned";
        ownershipText.style.color = "red";
        buttonAssets2.onclick = () => buyProperty(index);
    }
}

function nextProperty() {
    if (index < properties.length - 1) {
        index += 1;
        update(index);
    }
}

function previousProperty() {
    if (index > 0) {
        index -= 1;
        update(index);
    }
}