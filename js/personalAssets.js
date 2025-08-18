import { player, updateStats, game } from './index.js'; //immortal, catcoffee, renaissance, beyond, deluxo, n2n, cloudPush
import { personalAssets } from './personalAssetsArray.js';

const buttonAssets1 = document.getElementById('buttonAssets1');
const buttonAssets2 = document.getElementById('buttonAssets2');
const buttonAssets3 = document.getElementById('buttonAssets3');

const ownershipText = document.getElementById('ownershipText');
const assetNameText = document.getElementById('assetNameText');
const priceText = document.getElementById('priceText');
const text = document.getElementById('text');

let index = 0;

buttonAssets1.onclick = previousAsset;
buttonAssets3.onclick = nextAsset;

checkOwnership();
update(index);

function update(index) {
    assetNameText.innerText = personalAssets[index].name;
    priceText.innerText = personalAssets[index].price;
    text.innerText = personalAssets[index].text;
    checkOwnership();
    updateStats();
}

function buyAsset(index) {
    if (player.money >= personalAssets[index].price) {
        player.money -= personalAssets[index].price;
        getBonus(index);
        player.personalAssets.push(personalAssets[index]);
    }
    update(index);
}

function checkOwnership() {
    if (player.personalAssets.includes(personalAssets[index])) {
        buttonAssets2.innerText = "Sell";
        buttonAssets2.disabled = true;
        ownershipText.innerText = "Owned";
        ownershipText.style.color = "green";
    } else {
        buttonAssets2.innerText = "Buy";
        buttonAssets2.disabled = false;
        ownershipText.innerText = "Not Owned";
        ownershipText.style.color = "red";
        buttonAssets2.onclick = () => buyAsset(index);
    }
}

function nextAsset() {
    if (index < personalAssets.length - 1) {
        index += 1;
        update(index);
    }
}

function previousAsset() {
    if (index > 0) {
        index -= 1;
        update(index);
    }
}

// Bonus
function getBonus(bonus) {
    for (let i = 0; i < game.businesses.length; i++) {
        if (game.businesses[i]) {
            game.businesses[i].price -= game.businesses[i].price * (personalAssets[bonus].bonus / 100);
        }
    }
}