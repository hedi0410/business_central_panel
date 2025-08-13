import { player, updateStats } from './index.js';
import { assets } from './assetsArray.js';

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
    //buttonAssets2.onclick = ;
    assetNameText.innerText = assets[index].name;
    priceText.innerText = assets[index].price;
    text.innerText = assets[index].text;
    checkOwnership();
    updateStats();
}

function buyAsset(index) {
    if (player.money >= assets[index].price) {
        player.money -= assets[index].price;
        player.assets.push(assets[index]);
    }
    update(index);
}

function sellAsset(index) {
    const playerAssetIndex = player.assets.indexOf(assets[index]);
    if (playerAssetIndex !== -1) {
        player.assets.splice(playerAssetIndex, 1);
        player.money += assets[index].price;
    }
    update(index);
}

function checkOwnership() {
    if (player.assets.includes(assets[index])) {
        buttonAssets2.innerText = "Sell";
        ownershipText.innerText = "Owned";
        ownershipText.style.color = "green";
        buttonAssets2.onclick = () => sellAsset(index);
    } else {
        buttonAssets2.innerText = "Buy";
        ownershipText.innerText = "Not Owned";
        ownershipText.style.color = "red";
        buttonAssets2.onclick = () => buyAsset(index);
    }
}

function nextAsset() {
    if (index < assets.length - 1) {
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