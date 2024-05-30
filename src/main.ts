// SPLIT: main.ts
import Decimal from 'break_eternity.js';
import { TPS, resetCatLimit, currentTab, data, energyMilestone, load, newsfile, save, voidUpgradeBoosts, buyItem } from './data';
import { catsPerSecond, timeSinceLastNewsMessage, updateElement, updateTabs } from './render';
import { exportSave, gel, importSave } from './utils';
import { formatForH } from './format';

let avgmsptTimer = 0;
const avgmspt: Array<number> = [];

function initializeGame() {
    load();
    gel("newsticker").textContent = newsfile[Math.floor(Math.random() * (newsfile.length - 1))];

    setInterval(() => {
        save();
    }, 10000);

    setInterval(gameLoop, 1000 / TPS);
}

function gameLoop() {
    if (data.cats.gte(data.highCats)) {
        data.highCats = data.cats;
    }

    const dt = (Date.now() - data.lastTick) / 1000;
    data.lastTick = Date.now();

    document.title = `${formatForH(data.cats)} Cats | CatGame`;
    updateTabs();
    const catlimtemp = updateElement(dt);

    handleEnergyCats(dt);
    handleVoidCats(dt);

    data.cats = data.cats.plus(catsPerSecond._.mul(dt));

    if (data.cats.greaterThanOrEqualTo(catlimtemp)) {
        data.cats = catlimtemp;
    }

    if (data.catLimit.greaterThanOrEqualTo(8)) {
        handleMilestones(dt);
    }

    if (currentTab._ === "dogsdogsdogsdogs") {
        data.cats = Decimal.dZero;
    }

    handleNews(dt);
    handleMspt(dt);
}

function handleEnergyCats(dt: number) {
    if (data.catLimit.greaterThanOrEqualTo(8) && !isNaN(data.cats.log(10).mag) && !data.voidGain.gte(1)) {
        data.energyCats = data.energyCats.plus(data.cats.log(10).times(dt));
    }
}

function handleVoidCats(dt: number) {
    if (data.catLimit.greaterThanOrEqualTo(11) && !isNaN(data.energyCats.log(10).mag) && data.voidGain.gte(1)) {
        data.voidCats = data.voidCats.plus(
            data.energyCats
                .log(10)
                .times(new Decimal(1.375).pow(data.voidhypercats))
                .mul(dt),
        );
    }
}

function handleMilestones(dt: number) {
    energyMilestone();
    if (data.energyCatMilestone.gte(4) && data.eautobuys.gte(1) && !data.voidGain.gte(1)) {
        data.catGodSacrificed = data.catGodSacrificed.plus(data.cats.divide(20).mul(dt));
    }
    if (data.energyCatMilestone.gte(2) && data.eautobuyl.gte(1) && !data.voidGain.gte(1)) {
        resetCatLimit(false);
    }
    if (data.energyCatMilestone.gte(3) && data.eautobuycf.gte(1) && !data.voidGain.gte(1)) {
        buyItem(2, 1);
    }
    if (data.energyCatMilestone.gte(1) && data.eautobuycs.gte(1) && !data.voidGain.gte(1)) {
        buyItem(1, 1);
    }
}

function handleNews(dt: number) {
    timeSinceLastNewsMessage._ = timeSinceLastNewsMessage._.add(dt);
    if (timeSinceLastNewsMessage._.gte(10)) {
        const newsMessage = newsfile[Math.floor(Math.random() * (newsfile.length - 1))];
        console.log(newsMessage);
        gel("newsticker").textContent = newsMessage;
        timeSinceLastNewsMessage._ = Decimal.dZero;
    }
}

function handleMspt(dt: number) {
    avgmsptTimer++;
    if (avgmsptTimer >= 100) {
        avgmsptTimer = 0;
        avgmspt.length = 0;
    }

    avgmspt.push(dt * 1000);

    gel("avg-mspt").textContent = (
        avgmspt.reduce((a, b) => a + b) / avgmspt.length
    ).toFixed(3);
    gel('mspt').textContent = (dt * 1000).toString();
}

// post initialization
console.debug("catgame core loaded");
console.debug("begin loading post initialize");
gel("target-mspt").textContent = (1000 / TPS).toString();

// Initialize the game
initializeGame();
