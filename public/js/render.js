import { calculateVoidBoost, currentTab, data, loaftime, voidUpgradeBoosts } from './data.js';
// import { getCatSize } from './utils';
import { Decimal } from './break.js';
import { gel, getCatSize } from './utils.js';
import { format, formatForH, formatForZ, formatTime } from './format.js';
export const catsPerSecond = { _: Decimal.dZero };
export const timeSinceLastNewsMessage = { _: Decimal.dZero };
export function updateElement(dt) {
    // Update the element with various data calculations
    let catlimtemp = new Decimal(1000).pow(data.voidCats.plus(1).log(3).times((data.cats.plus(1).log(10).divide(data.cats.plus(1).log(10))).plus(1))) || new Decimal(1);
    const baseCps = data.catSummoners
        .pow(data.betterMagic.divide(60).plus(1))
        .times(new Decimal(1.75).pow(data.catFood));
    const catlimitBoost = new Decimal(1.05)
        .plus(voidUpgradeBoosts(3))
        .pow(data.catLimit.minus(1));
    const catgodBoost = data.catGodSacrificed
        .plus(1)
        .logarithm(new Decimal(5).minus(voidUpgradeBoosts(1)))
        .plus(1)
        .pow(1.01);
    const hypercatBoost = data.hyperCats.plus(1).pow(voidUpgradeBoosts(2));
    const voidBoost = calculateVoidBoost(catlimtemp);
    catsPerSecond._ = baseCps.times(catlimitBoost).times(catgodBoost).times(hypercatBoost).times(voidBoost);
    // Update buyallbutton text content
    gel("buyallbutton").textContent = data.catLimit.gte(6) ? "Buy All" : "Locked";
    // Update hcbutton text content
    gel("hcbutton").textContent = data.cats.gte(Decimal.times(1e3, Decimal.pow(4e2, data.hyperCats)))
        ? "Hyper Cat Reset"
        : "You need " + formatForH(Decimal.times(1e3, Decimal.pow(4e2, data.hyperCats))) + " Cats to (HC)Reset";
    // Update hvcbutton text content
    gel("hvcbutton").textContent = data.voidCats.gte(Decimal.times(1e5, Decimal.pow(2.25, Decimal.times(0.93, data.voidhypercats))))
        ? "Hyper Void-Cat Reset"
        : "You need " + formatForH(Decimal.times(1e5, Decimal.pow(2.25, Decimal.times(0.93, data.voidhypercats)))) + " Void Cats to (HVC)Reset";
    catlimtemp = Decimal.pow(1000, data.catLimit)
        .times(Decimal.pow(0.85, data.lessSpace));
    // Update catlimbar and catbarpercent elements
    if (data.cats.gte(1)) {
        let catlimbarValue = data.cats.log(10).divide(catlimtemp.log(10)).mag;
        if (catlimbarValue >= 0.347130895052)
            catlimbarValue = 0.011;
        gel("catlimbar").value = catlimbarValue;
        gel("catbarpercent").textContent = `${formatForH(data.cats.log(10).divide(catlimtemp.log(10)).times(100))}% (${(catlimbarValue * 100).toPrecision(2)}%)`;
    }
    else {
        gel("catlimbar").value = 0;
        gel("catbarpercent").textContent = "0%";
    }
    // Update other elements
    gel("cats").textContent = formatForH(data.cats);
    gel("cps").textContent = formatForH(catsPerSecond._);
    gel("catlim").textContent = formatForH(catlimtemp);
    gel("catsummoners").textContent = formatForZ(data.catSummoners);
    gel("catfood").textContent = formatForZ(data.catFood);
    gel("basecats").textContent = formatForH(data.catSummoners.pow(data.betterMagic.divide(60).plus(1)));
    gel("catmulti").textContent = formatForH(Decimal.pow(1.75, data.catFood));
    gel("cscost").textContent = formatForH(Decimal.times(10, Decimal.pow(1.75, data.catSummoners)));
    gel("cfcost").textContent = formatForH(Decimal.times(25, Decimal.pow(2.05, data.catFood)));
    gel("catlimitnum").textContent = formatForZ(data.catLimit.minus(1));
    gel("maxccs").textContent = formatForZ(data.catLimit);
    gel("ccs").textContent = formatForZ(data.catLimit.minus(data.spentCatCoins));
    gel("ls").textContent = formatForZ(data.lessSpace);
    gel("bm").textContent = formatForZ(data.betterMagic);
    gel("lscost").textContent = formatForZ(Decimal.pow(1.15, data.lessSpace).floor());
    gel("bmcost").textContent = formatForZ(Decimal.pow(1.25, data.betterMagic).floor());
    gel("lsboost").textContent = formatForH(Decimal.pow(0.85, data.lessSpace).times(100));
    gel("bmboost").textContent = formatForH(data.betterMagic.divide(60).plus(1));
    gel("catssacrificed").textContent = formatForH(data.catGodSacrificed);
    gel("sacrificedboost").textContent = formatForH(data.catGodSacrificed.plus(1).logarithm(Decimal.minus(5, voidUpgradeBoosts(1))).plus(1).pow(1.01));
    gel("hc").textContent = formatForZ(data.hyperCats);
    gel("hcboost").textContent = formatForH(data.hyperCats.plus(1).pow(voidUpgradeBoosts(2)));
    gel("timeplayed").textContent = formatTime(Decimal.minus(new Decimal(Date.now()), data.startPlaying).divide(1000));
    gel("energycats").textContent = formatForH(data.energyCats);
    gel("ecps").textContent = formatForH(data.cats.log(10));
    gel("highcats").textContent = formatForH(data.highCats);
    gel("voidc").textContent = formatForH(data.voidCats);
    gel("exenercat").textContent = formatForH(data.energyCats);
    gel("voidg").textContent = formatForH(data.energyCats.log(10).times(Decimal.pow(1.375, data.voidhypercats)));
    gel("hypervoidcats").textContent = formatForZ(data.voidhypercats);
    gel("hypervoidcatsboost").textContent = formatForH(Decimal.pow(1.375, data.voidhypercats));
    gel("voidb").textContent = formatForH(isNaN(data.cats.log(10).mag) ? Decimal.plus(1, Decimal.divide(Decimal.log(3, Decimal.plus(1, Decimal.log(10, data.cats))), Decimal.log(10, Decimal.plus(1, data.cats)))) : 1);
    gel("catsize").textContent = format(getCatSize(data.cats)[0], 6);
    gel("catweight").textContent = format(getCatSize(data.cats)[1], 6);
    const percent_to_cl = isNaN(data.cats.log(10).divide(catlimtemp.log(10)).mag) ? Decimal.dZero : Decimal.divide(data.cats.log(10), catlimtemp.log(10));
    gel("voidpower").textContent = formatForH(Decimal.times(Decimal.pow(data.voidCats, 0.6), Decimal.minus(Decimal.dOne, percent_to_cl)));
    gel("catlimitboost").textContent = voidUpgradeBoosts(3).lt(1) ? "" : "Boost: *" + format(Decimal.plus(1.05, voidUpgradeBoosts(3)).pow(Decimal.minus(data.catLimit, 1)), 3) + " More Cats";
    gel("catgodvboost").textContent = format(voidUpgradeBoosts(1), 4);
    gel("hypercatvboost").textContent = format(voidUpgradeBoosts(2), 4);
    gel("catlimitvboost").textContent = format(voidUpgradeBoosts(3), 4);
    gel("csas").textContent = data.eautobuycs.gte(1) ? "ON" : "OFF";
    gel("cfas").textContent = data.eautobuycf.gte(1) ? "ON" : "OFF";
    gel("las").textContent = data.eautobuyl.gte(1) ? "ON" : "OFF";
    return catlimtemp;
}
export function updateTabs() {
    const tabElements = {
        main: "main",
        options: "options",
        catlimit: "catlimit",
        catcoins: "catcoins",
        catgod: "catgod",
        hypercats: "hypercats",
        energy: "energy",
        void: "void",
        hyperspecificats: "hyperspecificats",
        dogsdogsdogsdogs: "dogsdogsdogsdogs",
        stupidoptionslol: "stupidoptionslol",
    };
    for (const tab in tabElements) {
        const elementId = tabElements[tab];
        const element = gel(elementId);
        element.style.display = tab === currentTab._ ? "inline" : "none";
    }
    // Hide the loading element after a certain time
    if (loaftime._ > 10) {
        gel("loafing").style.display = "none";
    }
    else {
        loaftime._++;
    }
    // Update button displays based on cat data conditions
    gel("catlimbutton").style.display =
        data.cats.gte(999) || data.catLimit.gte(2) ? "inline" : "none";
    gel("catcoinbutton").style.display = data.catLimit.gte(2) ? "inline" : "none";
    gel("catgodbutton").style.display = data.catLimit.gte(4) ? "inline" : "none";
    gel("hypercatsbutton").style.display = data.catLimit.gte(7) ? "inline" : "none";
    gel("energybutton").style.display = data.catLimit.gte(8) ? "inline" : "none";
    gel("voidbutton").style.display = data.catLimit.gte(11) ? "inline" : "none";
    gel("overlay").style.display = data.voidGain.gte(1) ? "inline" : "none";
}
