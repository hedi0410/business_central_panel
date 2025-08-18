import { Player } from './player.js';
import { Business } from './theBusinesses.js';

const buttonNav1 = document.getElementById('buttonNav1');
const buttonNav2 = document.getElementById('buttonNav2');
const buttonNav3 = document.getElementById('buttonNav3');
const buttonNav4 = document.getElementById('buttonNav4');
const buttonNav5 = document.getElementById('buttonNav5');
const buttonNav6 = document.getElementById('buttonNav6');
const changeName = document.getElementById('changeName');

const moneyText = document.getElementById('moneyText');
const nameText = document.getElementById('nameText');
const currentBankText = document.getElementById('currentBankText');

const name = "";
export const player = new Player(name);

export const game = new Player("Game");

// businesses
export const immortal = new Business("The Immortal", "Bar", 10000);
export const catcoffee = new Business("The Cat Coffee", "Bar", 19000);
export const renaissance = new Business("The Renaissance", "Nightclub", 39000);
export const beyond = new Business("Beyond Delivery", "Delivery Service", 84000);
export const deluxo = new Business("Deluxo Jeans", "Clothing Brand", 268000);
export const n2n = new Business("N2N Corporation", "Trading", 780000);
export const cloudPush = new Business("Cloud Push", "Import/Export", 10000000);

game.businesses.push(immortal);
game.businesses.push(catcoffee);
game.businesses.push(renaissance);
game.businesses.push(beyond);
game.businesses.push(deluxo);
game.businesses.push(n2n);
game.businesses.push(cloudPush);

autoUpdateStats();
goHome();

buttonNav1.onclick = () => loadSection('home');
buttonNav2.onclick = () => loadSection('businesses');
buttonNav3.onclick = () => loadSection('realEstate');
buttonNav4.onclick = () => loadSection('bank');
buttonNav5.onclick = () => loadSection('personalAssets');
buttonNav6.onclick = () => loadSection('assets');

changeName.onclick = () => changePlayerName();

// updates 
export function updateStats() {
    moneyText.innerText = Number(player.money.toFixed(2));
    if (player.money < 0) {
        moneyText.style.color = "red";
    } else {
        moneyText.style.color = "green";
    }
    currentBankText.innerText = player.bank;
    nameText.innerText = player.name;
}

function autoUpdateStats() {
    updateStats();
    setInterval(function(){
        generateMoney();
        assetFluctuation();
        updateStats();
    }, 1000);
}

// Change sections
function goHome() {
    loadSection('home');
}

// money
function generateMoney() {
    for (let i = 0; i < player.businesses.length; i++) {
        if (player.businesses[i]) {
        player.businesses[i].money += player.businesses[i].returnProfit() / 3600;
        }
    }
    player.money += player.returnProfit() / 3600;
}

export function returnMoney() {
    return player.money;
}

function assetFluctuation() {
    let randNum = Math.random() < 0.51 ? 1 : -1; //it means 50% to be 1 or -1
    for (let i = 0; i < player.assets.length; i++) {
        player.assets[i].price += player.assets[i].price * 0.001 * randNum;
    }
}

// Section management
export async function loadSection(sectionName) {
    const centerDiv = document.getElementById('center');

    try {
        const htmlResponse = await fetch(`sections/${sectionName}.html`);
        const html = await htmlResponse.text();
        centerDiv.innerHTML = html;

        // remove old section script if any
        const oldScript = document.getElementById('section-script');
        if (oldScript) oldScript.remove();

        const script = document.createElement('script');
        script.type = 'module';
        script.src = `js/${sectionName}.js?t=${(new Date()).getTime()}`; //for cache issues
        script.id = 'section-script';
        document.body.appendChild(script);

    } catch (err) {
        centerDiv.innerHTML = `<p>Error loading section: ${err.message}</p>`;
    }
}

function changePlayerName() {
    player.name = prompt("Enter your name: ");
    updateStats();
}

// clock & date & meteo

function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    document.getElementById('clock').textContent = timeString;
}

function setDate() {
    const now = new Date();
    const dateString = now.toLocaleDateString('fr-FR');
    document.getElementById('date').textContent = dateString;
}

setDate();
setInterval(updateClock, 1000);
updateClock();