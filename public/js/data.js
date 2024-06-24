import { Decimal } from './break.js';
export const TPS = 20;
export const currentTab = { _: "main" };
export const loaftime = { _: 0 };
export const newsfile = ["owo", "uwu", "hello", "uparrow", "x<sup>2</sup>"];
export function energyMilestone() {
    if (data.energyCats.gte(100000)) {
        data.energyCatMilestone = new Decimal(4);
    }
    else if (data.energyCats.gte(75000)) {
        data.energyCatMilestone = new Decimal(3);
    }
    else if (data.energyCats.gte(50000)) {
        data.energyCatMilestone = Decimal.dTwo;
    }
    else if (data.energyCats.gte(10000)) {
        data.energyCatMilestone = Decimal.dOne;
    }
    else {
        data.energyCatMilestone = Decimal.dZero;
    }
}
export function voidUpgradeBoosts(x) {
    const catlimtemp = new Decimal(1000)
        .pow(data.catLimit)
        .times(new Decimal(0.85).pow(data.lessSpace));
    const percentToCl = isNaN(data.cats.log(10).divide(catlimtemp.log(10)).mag)
        ? Decimal.dZero
        : data.cats.log(10).divide(catlimtemp.log(10));
    const voidEnergy = data.voidCats
        .pow(0.6)
        .times(Decimal.dOne.minus(percentToCl));
    switch (x) {
        case 1:
            return data.voidup1.lt(1)
                ? Decimal.dZero
                : Decimal.dOne.divide(new Decimal(-0.00015).times(voidEnergy.plus(5000))).plus(2);
        case 2:
            return data.voidup2.lt(1)
                ? Decimal.dOne
                : Decimal.dOne
                    .divide(new Decimal(-0.00022).times(voidEnergy.plus(2280)))
                    .plus(2)
                    .divide(2)
                    .plus(1);
        case 3:
            return data.voidup3.lt(1)
                ? Decimal.dZero
                : voidEnergy.divide(10000);
        default:
            return Decimal.dZero;
    }
}
export function save() {
}
export function load() {
    if (localStorage.getItem("catgame-save") != null) {
        var data = JSON.parse(atob(localStorage.getItem("catgame-save") ?? ""));
        for (const i in data)
            data[i] = new Decimal(data[i]);
    }
    // if (localStorage.getItem("catgame-secrets") != null) {
    // 	var data = JSON.parse(atob(localStorage.getItem("catgame-secrets") ?? ""))
    // 	for (const i in data) secrets[i] = new Decimal(data[i]);
    // }
}
export function resetCatLimit(force = false) {
    const catLimitTemp = Decimal.pow(1000, data.catLimit)
        .times(Decimal.pow(0.85, data.lessSpace));
    const shouldReset = data.cats.gte(catLimitTemp) || force;
    if (shouldReset) {
        resetCatData(force);
        if (!force) {
            incrementCatLimit();
        }
    }
}
export function calculateVoidBoost(catlimtemp) {
    const voidBoost = data.voidCats
        .plus(1)
        .log(3)
        .times(catlimtemp.log(10).divide(data.cats.plus(1).log(10)))
        .plus(1);
    return !Decimal.isNaN(voidBoost) && voidBoost.gte(1) ? voidBoost : new Decimal(1);
}
function resetCatData(force = false) {
    data.cats = new Decimal(11);
    data.catSummoners = Decimal.dZero;
    data.catFood = Decimal.dZero;
    data.catGodSacrificed = Decimal.dZero;
    data.hyperCats = Decimal.dZero;
    data.energyCats = Decimal.dZero;
}
function incrementCatLimit() {
    data.catLimit = data.catLimit.plus(1);
}
export function buyItem(itemIndex, tabIndex) {
    if (tabIndex === 1) {
        buyCatUpgrade(itemIndex, data.catSummoners, 1.75);
        buyCatUpgrade(itemIndex, data.catFood, 2.05);
    }
    if (tabIndex === 2) {
        buyCoinUpgrade(itemIndex, data.lessSpace, 1.15);
        buyCoinUpgrade(itemIndex, data.betterMagic, 1.25);
    }
    if (tabIndex === 3) {
        buyUnlockUpgrade(itemIndex, data.voidup1, 1e30);
        buyUnlockUpgrade(itemIndex, data.voidup2, 10);
        buyUnlockUpgrade(itemIndex, data.voidup3, 1e35);
    }
}
function buyCatUpgrade(itemIndex, catValue, base) {
    if (itemIndex === 1 &&
        data.cats.gte(new Decimal(10).times(Decimal.pow(base, catValue)))) {
        data.cats = data.cats.minus(new Decimal(10).times(Decimal.pow(base, catValue)));
        catValue.plus(1);
    }
    if (itemIndex === 2 &&
        data.cats.gte(new Decimal(25).times(Decimal.pow(base, catValue)))) {
        data.cats = data.cats.minus(new Decimal(25).times(Decimal.pow(base, catValue)));
        catValue.plus(1);
    }
}
function buyCoinUpgrade(itemIndex, coinValue, base) {
    const catCoins = data.catLimit.minus(data.spentCatCoins);
    const upgradeCost = Decimal.pow(base, coinValue).floor();
    if (itemIndex === 1 && catCoins.gte(upgradeCost)) {
        data.spentCatCoins = data.spentCatCoins.add(upgradeCost);
        coinValue.plus(1);
    }
    if (itemIndex === 2 && catCoins.gte(upgradeCost)) {
        data.spentCatCoins = data.spentCatCoins.plus(upgradeCost);
        coinValue.plus(1);
    }
}
function buyUnlockUpgrade(itemIndex, unlockValue, threshold) {
    if (itemIndex === 1 &&
        unlockValue.eq(0) &&
        data.catGodSacrificed.gte(threshold)) {
        unlockValue = Decimal.dOne;
    }
    if (itemIndex === 2 && unlockValue.eq(0) && data.hyperCats.gte(10)) {
        unlockValue = Decimal.dOne;
    }
    if (itemIndex === 3 && unlockValue.eq(0) && data.cats.gte(threshold)) {
        unlockValue = Decimal.dOne;
    }
}
export const data = {
    startPlaying: new Decimal(Date.now()),
    lastTick: Date.now(),
    highCats: Decimal.dZero,
    cats: new Decimal(11),
    catLimit: Decimal.dOne,
    catSummoners: Decimal.dZero,
    catFood: Decimal.dZero,
    spentCatCoins: Decimal.dZero,
    lessSpace: Decimal.dZero,
    betterMagic: Decimal.dZero,
    catGodSacrificed: Decimal.dZero,
    hyperCats: Decimal.dZero,
    energyCats: Decimal.dZero,
    energyCatMilestone: Decimal.dZero,
    eautobuycs: Decimal.dOne,
    eautobuycf: Decimal.dOne,
    eautobuyl: Decimal.dOne,
    eautobuys: Decimal.dOne,
    voidCats: Decimal.dZero,
    voidGain: Decimal.dZero,
    voidup1: Decimal.dZero,
    voidup2: Decimal.dZero,
    voidup3: Decimal.dZero,
    voidhypercats: Decimal.dZero
};
