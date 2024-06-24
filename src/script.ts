import { Decimal } from './break.js';

const TPS = 20;

let currentTab = "main";
let loaftime = 0;
const gel = (name: string) => document.getElementById(name)!;
const newsfile = ["owo", "uwu", "hello", "uparrow", "x<sup>2</sup>"];

const elements = {
  debug: {
    mspt: gel("mspt"),
    targetMspt: gel("target-mspt"),
  },
  buyallbutton: gel("buyallbutton"),
  hcbutton: gel("hcbutton"),
  hvcbutton: gel("hvcbutton"),
  catlimbar: gel("catlimbar") as HTMLProgressElement,
  catbarpercent: gel("catbarpercent"),
  cats: gel("cats"),
  cps: gel("cps"),
  catlim: gel("catlim"),
  catsummoners: gel("catsummoners"),
  catfood: gel("catfood"),
  basecats: gel("basecats"),
  catmulti: gel("catmulti"),
  cscost: gel("cscost"),
  cfcost: gel("cfcost"),
  catlimitnum: gel("catlimitnum"),
  maxccs: gel("maxccs"),
  ccs: gel("ccs"),
  ls: gel("ls"),
  bm: gel("bm"),
  lscost: gel("lscost"),
  bmcost: gel("bmcost"),
  lsboost: gel("lsboost"),
  bmboost: gel("bmboost"),
  catssacrificed: gel("catssacrificed"),
  sacrificedboost: gel("sacrificedboost"),
  hc: gel("hc"),
  hcboost: gel("hcboost"),
  timeplayed: gel("timeplayed"),
  energycats: gel("energycats"),
  ecps: gel("ecps"),
  highcats: gel("highcats"),
  voidc: gel("voidc"),
  exenercat: gel("exenercat"),
  voidg: gel("voidg"),
  hypervoidcats: gel("hypervoidcats"),
  hypervoidcatsboost: gel("hypervoidcatsboost"),
  voidb: gel("voidb"),
  catsize: gel("catsize"),
  catweight: gel("catweight"),
  voidpower: gel("voidpower"),
  catlimitboost: gel("catlimitboost"),
  catgodvboost: gel("catgodvboost"),
  hypercatvboost: gel("hypercatvboost"),
  catlimitvboost: gel("catlimitvboost"),
  csas: gel("csas"),
  cfas: gel("cfas"),
  las: gel("las"),
  voidhypercatstuff: gel("voidhypercatstuff") as HTMLSpanElement,
  secretpasses: gel("secretpasses") as HTMLTextAreaElement,
};

//region jacorb's code for formatting
function exponentialFormat(num: Decimal, precision: number) {
  let e: string | number = num.exponent;
  let m = num.mantissa;
  if (Number(new Decimal(m).toStringWithDecimalPlaces(precision)) == 10) {
    m = 1;
    e++;
  }
  e =
    e >= 1000
      ? commaFormat(new Decimal(e), 0)
      : new Decimal(e).toStringWithDecimalPlaces(0);
  return new Decimal(m).toStringWithDecimalPlaces(precision) + "e" + e;
}
function commaFormat(num: Decimal, precision: number) {
  if (num === null || num === undefined) return "NaN";
  if (num.mag < 0.001) return (0).toFixed(precision);
  return num
    .toStringWithDecimalPlaces(precision)
    .replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}
function regularFormat(num: Decimal, precision: number) {
  if (num === null || num === undefined) return "NaN";
  if (num.mag < 0.001) return (0).toFixed(precision);
  return num.toStringWithDecimalPlaces(precision);
}
function fixValue(x: Decimal, y = 0) {
  return x || new Decimal(y);
}
function sumValues(x: Array<Decimal>) {
  x = Object.values(x);
  if (!x[0]) return Decimal.dZero;
  return x.reduce((a, b) => Decimal.add(a, b));
}
function format(decimal: Decimal | number, precision = 2, whole = false) {
  decimal = new Decimal(decimal);
  if (isNaN(decimal.sign) || isNaN(decimal.layer) || isNaN(decimal.mag)) {
    return "NaN";
  }
  if (decimal.sign < 0) return "-" + format(decimal.neg(), precision);
  if (decimal.mag == Number.POSITIVE_INFINITY) return "Infinity";
  if (decimal.eq(0)) return "0";
  if (decimal.gte("eeee1000")) {
    var slog = decimal.slog();
    if (slog.gte(1e3)) return "10^^" + formatWhole(slog);
    else return "10^^" + regularFormat(slog, 3);
  } else if (decimal.gte("eee100000"))
    return "eee" + format(decimal.log10().log10().log10(), 3);
  else if (decimal.gte("ee100000"))
    return "ee" + format(decimal.log10().log10(), 3);
  else if (decimal.gte("1e100000")) return "e" + format(decimal.log10(), 3);
  else if (decimal.gte("1e1000")) return exponentialFormat(decimal, 0);
  else if (decimal.gte(1e9)) return exponentialFormat(decimal, precision);
  else if (decimal.gte(1e3)) return commaFormat(decimal, 0);
  else if (decimal.gte(Decimal.pow(0.1, precision)) || whole)
    return regularFormat(decimal, precision);
  else if (decimal.gt("1e-100000"))
    return exponentialFormat(decimal, decimal.gte("1e-1000") ? precision : 0);
  else return "1/(" + format(decimal.pow(-1), precision) + ")";
}
function formatWhole(decimal: Decimal | number, reallyWhole = false) {
  decimal = new Decimal(decimal);
  if (decimal.gte(1e9)) return format(decimal, 2);
  if (decimal.lte(0.95) && !decimal.eq(0) && !reallyWhole)
    return format(decimal, 2);
  else return format(decimal, 0, true);
}
function formatTime(s: Decimal) {
  s = new Decimal(s);
  if (s.gte(1 / 0)) return "Forever";
  else if (s.lt(60)) return format(s) + "s";
  else if (s.lt(3600))
    return (
      formatWhole(s.div(60).floor()) + "m " + format(s.toNumber() % 60) + "s"
    );
  else if (s.lt(86400))
    return (
      formatWhole(s.div(3600).floor()) +
      "h " +
      format(s.div(60).toNumber() % 60) +
      "m"
    );
  else if (s.lt(31536000))
    return (
      formatWhole(s.div(84600).floor()) +
      "d " +
      formatWhole(s.div(3600).toNumber() % 24) +
      "h"
    );
  else if (s.lt(31536000000))
    return (
      formatWhole(s.div(31536000).floor()) +
      "y " +
      formatWhole(s.div(84600).toNumber() % 365) +
      "d"
    );
  else return formatWhole(s.div(31536000)) + "y";
}
function toPlaces(x: Decimal, precision: number, maxAccepted: number) {
  x = new Decimal(x);
  let result = x.toStringWithDecimalPlaces(precision);
  if (new Decimal(result).gte(maxAccepted)) {
    result = new Decimal(
      maxAccepted - Math.pow(0.1, precision),
    ).toStringWithDecimalPlaces(precision);
  }
  return result;
}
// endregion

// region start of teste's shitty code

let catsPerSecond = Decimal.dZero;

const formatForH = (x: Decimal | number) => format(x);

const formatForZ = (x: Decimal | number) => format(x, 0, true);

const data = {
  startPlaying: new Decimal(Date.now()),
  lastTick: new Decimal(Date.now()),
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
  voidhypercats: Decimal.dZero,
};

let timeSinceLastNewsMessage = Decimal.dZero;

function exportSave() {
  (gel("savedata") as HTMLTextAreaElement).value = btoa(JSON.stringify(data));
}

function importSave() {
  const data = JSON.parse(atob((gel("savedata") as HTMLTextAreaElement).value));
  for (const i in data) data[i] = data[i];
  save();
  location.reload();
}

function getCatSize(cats: Decimal) {
  const size_of_cat = new Decimal(11470.9448); //in cm^3/cat
  var size_of_all_cats = size_of_cat.times(cats); // cats * cm^3/cat = cm^3
  const density_of_cat_cm3 = new Decimal(0.00106202412); //in kg/cm^3
  var weight_of_all_cats = size_of_all_cats.times(density_of_cat_cm3); // cm^3 * kg/cm^3 = kg
  var p = [size_of_all_cats, weight_of_all_cats];
  return p;
}

/**
 * Updates the content of various HTML elements based on the values of certain variables.
 */
function updateElement() {
  // Calculate catlimtemp
  const catlimtemp = new Decimal(1000)
    .pow(data.catLimit)
    .times(new Decimal(0.85).pow(data.lessSpace));

  // Store repeating elements from gel into an object

  // Update buyallbutton text content
  elements.buyallbutton.textContent = data.catLimit.gte(6)
    ? "Buy All"
    : "Locked";

  // Update hcbutton text content
  if (
    data.cats.gte(new Decimal(1e3).times(new Decimal(4e2).pow(data.hyperCats)))
  ) {
    elements.hcbutton.textContent = "Hyper Cat Reset";
  } else {
    elements.hcbutton.textContent =
      "You need " +
      formatForH(new Decimal(1e3).times(new Decimal(4e2).pow(data.hyperCats))) +
      " Cats to (HC)Reset";
  }

  // Update hvcbutton text content
  if (
    data.voidCats.gte(
      new Decimal(1e5).times(
        new Decimal(2.25).pow(new Decimal(0.93).times(data.voidhypercats)),
      ),
    )
  ) {
    elements.hvcbutton.textContent = "Hyper Void-Cat Reset";
  } else {
    elements.hvcbutton.textContent =
      "You need " +
      formatForH(
        new Decimal(1e5).times(
          new Decimal(2.25).pow(new Decimal(0.93).times(data.voidhypercats)),
        ),
      ) +
      " Void Cats to (HVC)Reset";
  }

  // Update catlimbar and catbarpercent elements
  if (data.cats.gte(1)) {
    const catlimbarValue = data.cats.log(10).divide(catlimtemp.log(10)).mag;
    elements.catlimbar.value = catlimbarValue;
    elements.catbarpercent.textContent =
      formatForH(data.cats.log(10).divide(catlimtemp.log(10)).times(100)) + "%";
  } else {
    elements.catlimbar.value = 0;
    elements.catbarpercent.textContent = "0%";
  }

  // Update other elements
  elements.cats.textContent = formatForH(data.cats);
  elements.cps.textContent = formatForH(catsPerSecond);
  elements.catlim.textContent = formatForH(catlimtemp);
  elements.catsummoners.textContent = formatForZ(data.catSummoners);
  elements.catfood.textContent = formatForZ(data.catFood);
  elements.basecats.textContent = formatForH(
    data.catSummoners.pow(data.betterMagic.divide(60).plus(1)),
  );
  elements.catmulti.textContent = formatForH(
    new Decimal(1.75).pow(data.catFood),
  );
  elements.cscost.textContent = formatForH(
    new Decimal(10).times(new Decimal(1.75).pow(data.catSummoners)),
  );
  elements.cfcost.textContent = formatForH(
    new Decimal(25).times(new Decimal(2.05).pow(data.catFood)),
  );
  elements.catlimitnum.textContent = formatForZ(data.catLimit.minus(1));
  elements.maxccs.textContent = formatForZ(data.catLimit);
  elements.ccs.textContent = formatForZ(
    data.catLimit.minus(data.spentCatCoins),
  );
  elements.ls.textContent = formatForZ(data.lessSpace);
  elements.bm.textContent = formatForZ(data.betterMagic);
  elements.lscost.textContent = formatForZ(
    new Decimal(1.15).pow(data.lessSpace).floor(),
  );
  elements.bmcost.textContent = formatForZ(
    new Decimal(1.25).pow(data.betterMagic).floor(),
  );
  elements.lsboost.textContent = formatForH(
    new Decimal(0.85).pow(data.lessSpace).times(100),
  );
  elements.bmboost.textContent = formatForH(
    data.betterMagic.divide(60).plus(1),
  );
  elements.catssacrificed.textContent = formatForH(data.catGodSacrificed);
  elements.sacrificedboost.textContent = formatForH(
    data.catGodSacrificed
      .plus(1)
      .logarithm(new Decimal(5).minus(voidUpgradeBoosts(1)))
      .plus(1)
      .pow(1.01),
  );
  elements.hc.textContent = formatForZ(data.hyperCats);
  elements.hcboost.textContent = formatForH(
    data.hyperCats.plus(1).pow(voidUpgradeBoosts(2)),
  );
  elements.timeplayed.textContent = formatTime(
    new Decimal(Date.now()).minus(data.startPlaying).divide(1000),
  );
  elements.energycats.textContent = formatForH(data.energyCats);
  elements.ecps.textContent = formatForH(data.cats.log(10));
  elements.highcats.textContent = formatForH(data.highCats);
  elements.voidc.textContent = formatForH(data.voidCats);
  elements.exenercat.textContent = formatForH(data.energyCats);
  elements.voidg.textContent = formatForH(
    data.energyCats.log(10).times(new Decimal(1.375).pow(data.voidhypercats)),
  );
  elements.hypervoidcats.textContent = formatForZ(data.voidhypercats);
  elements.hypervoidcatsboost.textContent = formatForH(
    new Decimal(1.375).pow(data.voidhypercats),
  );
  elements.voidb.textContent = formatForH(
    !isNaN(data.cats.log(10).mag)
      ? data.voidCats
          .plus(1)
          .log(3)
          .times(catlimtemp.log(10).divide(data.cats.plus(1).log(10)))
          .plus(1)
      : 1,
  );
  elements.catsize.textContent = format(getCatSize(data.cats)[0], 6);
  elements.catweight.textContent = format(getCatSize(data.cats)[1], 6);
  const percent_to_cl = isNaN(data.cats.log(10).divide(catlimtemp.log(10)).mag)
    ? Decimal.dZero
    : data.cats.log(10).divide(catlimtemp.log(10));
  elements.voidpower.textContent = formatForH(
    data.voidCats.pow(0.6).times(Decimal.dOne.minus(percent_to_cl)),
  );
  elements.catlimitboost.textContent = data.voidup3.lt(1)
    ? ""
    : "Boost: *" +
      format(
        new Decimal(1.05)
          .plus(voidUpgradeBoosts(3))
          .pow(data.catLimit.minus(1)),
        3,
      ) +
      " More Cats";
  elements.catgodvboost.textContent = format(voidUpgradeBoosts(1)!, 4);
  elements.hypercatvboost.textContent = format(voidUpgradeBoosts(2)!, 4);
  elements.catlimitvboost.textContent = format(voidUpgradeBoosts(3)!, 4);
  elements.csas.textContent = data.eautobuycs.gte(1) ? "ON" : "OFF";
  elements.cfas.textContent = data.eautobuycf.gte(1) ? "ON" : "OFF";
  elements.las.textContent = data.eautobuyl.gte(1) ? "ON" : "OFF";
}

gel("sas").textContent = data.eautobuys.gte(1) ? "ON" : "OFF";
gel("voidup1").className = data.voidup1.gte(1) ? "vu1button" : "vu0button";
gel("voidup2").className = data.voidup2.gte(1) ? "vu1button" : "vu0button";
gel("voidup3").className = data.voidup3.gte(1) ? "vu1button" : "vu0button";

// Update energy cat elements
const emprefix = ["csa", "cfa", "ear", "as"];
const emvalues = [10000, 75000, 50000, 100000];
for (let i = 0; i < 4; i++) {
  const emElement = gel(emprefix[i] + "em");
  if (data.energyCats.gte(emvalues[i])) {
    emElement.textContent = "Unlocked (" + formatForH(emvalues[i]) + " EC)";
  } else {
    emElement.textContent =
      formatForH(new Decimal(emvalues[i]).minus(data.energyCats)) +
      " ECs left (" +
      formatForH(emvalues[i]) +
      " Required)";
  }
}

function buyItem(itemIndex: number, tabIndex: number) {
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

function buyCatUpgrade(itemIndex: number, catValue: Decimal, base: number) {
  if (
    itemIndex === 1 &&
    data.cats.gte(new Decimal(10).times(Decimal.pow(base, catValue)))
  ) {
    data.cats = data.cats.minus(
      new Decimal(10).times(Decimal.pow(base, catValue)),
    );
    catValue.plus(1);
  }

  if (
    itemIndex === 2 &&
    data.cats.gte(new Decimal(25).times(Decimal.pow(base, catValue)))
  ) {
    data.cats = data.cats.minus(
      new Decimal(25).times(Decimal.pow(base, catValue)),
    );
    catValue.plus(1);
  }
}

function buyCoinUpgrade(itemIndex: number, coinValue: Decimal, base: number) {
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

function buyUnlockUpgrade(
  itemIndex: number,
  unlockValue: Decimal,
  threshold: number,
) {
  if (
    itemIndex === 1 &&
    unlockValue.eq(0) &&
    data.catGodSacrificed.gte(threshold)
  ) {
    unlockValue = Decimal.dOne;
  }

  if (itemIndex === 2 && unlockValue.eq(0) && data.hyperCats.gte(10)) {
    unlockValue = Decimal.dOne;
  }

  if (itemIndex === 3 && unlockValue.eq(0) && data.cats.gte(threshold)) {
    unlockValue = Decimal.dOne;
  }
}
function voidUpgradeBoosts(x: Decimal | number) {
  const catlimtemp = new Decimal(1000)
    .pow(data.catLimit)
    .times(new Decimal(0.85).pow(data.lessSpace));
  const percent_to_cl = isNaN(data.cats.log(10).divide(catlimtemp.log(10)).mag)
    ? Decimal.dZero
    : data.cats.log(10).divide(catlimtemp.log(10));
  const voidenergy = data.voidCats
    .pow(0.6)
    .times(Decimal.dOne.minus(percent_to_cl));
  if (x == 1) {
    if (data.voidup1.lt(1)) {
      return Decimal.dZero;
    } else {
      return Decimal.dOne
        .divide(new Decimal(-0.00015).times(voidenergy.plus(5000)))
        .plus(2);
    }
  }
  if (x == 2) {
    if (data.voidup2.lt(1)) {
      return Decimal.dOne;
    } else {
      return Decimal.dOne
        .divide(new Decimal(-0.00022).times(voidenergy.plus(2280)))
        .plus(2)
        .divide(2)
        .plus(1);
    }
  }
  if (x == 3) {
    if (data.voidup3.lt(1)) {
      return Decimal.dZero;
    } else {
      return voidenergy.divide(10000);
    }
  }
  return Decimal.dZero;
}
function energyMilestone() {
  if (data.energyCats.gte(0)) {
    data.energyCatMilestone = Decimal.dZero;
  }
  if (data.energyCats.gte(10000)) {
    data.energyCatMilestone = Decimal.dOne;
  }
  if (data.energyCats.gte(50000)) {
    data.energyCatMilestone = Decimal.dTwo;
  }
  if (data.energyCats.gte(75000)) {
    data.energyCatMilestone = new Decimal(3);
  }
  if (data.energyCats.gte(100000)) {
    data.energyCatMilestone = new Decimal(4);
  }
}
function save() {
  localStorage.setItem("catgame-save", btoa(JSON.stringify(data)));
  //  localStorage.setItem("catgame-secrets", btoa(JSON.stringify(secrets)))
}
function load() {
  if (localStorage.getItem("catgame-save") != null) {
    var data = JSON.parse(atob(localStorage.getItem("catgame-save") ?? ""));
    for (const i in data) data[i] = new Decimal(data[i]);
  }
  // if (localStorage.getItem("catgame-secrets") != null) {
  // 	var data = JSON.parse(atob(localStorage.getItem("catgame-secrets") ?? ""))
  // 	for (const i in data) secrets[i] = new Decimal(data[i]);
  // }
}
function hardReset() {
  if (confirm("Are you sure?") && confirm("Are you REALLY sure?")) {
    localStorage.removeItem("catgame-save");
    localStorage.removeItem("catgame-secrets");
    location.reload();
  }
}
function updateTabs() {
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
    element.style.display = tab === currentTab ? "inline" : "none";
  }
  // delusional teste??
  if (loaftime > 10) {
    gel("loafing").style.display = "none";
  } else {
    loaftime++;
  }

  gel("catlimbutton").style.display =
    data.cats.gte(999) || data.catLimit.gte(2) ? "inline" : "none";
  gel("catcoinbutton").style.display = data.catLimit.gte(2) ? "inline" : "none";
  gel("catgodbutton").style.display = data.catLimit.gte(4) ? "inline" : "none";
  gel("hypercatsbutton").style.display = data.catLimit.gte(7)
    ? "inline"
    : "none";
  gel("energybutton").style.display = data.catLimit.gte(8) ? "inline" : "none";
  gel("voidbutton").style.display = data.catLimit.gte(11) ? "inline" : "none";

  gel("overlay").style.display = data.voidGain.gte(1) ? "inline" : "none";
}
function catGodSacrifice() {
  var p = data.cats;
  if (data.catSummoners.gte(1)) {
    data.cats = Decimal.dZero;
    data.catGodSacrificed = data.catGodSacrificed.plus(p);
  }
}
function hyperCatsReset(multicat: number) {
  const mulcat = new Decimal(multicat);
  if (mulcat.gte(1)) {
  } else {
    if (
      data.cats.gte(
        new Decimal(1e3).times(new Decimal(4e2).pow(data.hyperCats)),
      )
    ) {
      data.cats = new Decimal(11);
      data.catSummoners = Decimal.dZero;
      data.catFood = Decimal.dZero;
      data.hyperCats = data.hyperCats.plus(1);
    }
  }
}
function vHyperCatsReset(multicat: number) {
  const mulcat = new Decimal(multicat);
  if (mulcat.gte(1)) {
  } else {
    if (
      data.voidCats.gte(
        new Decimal(1e5).times(
          new Decimal(2.25).pow(new Decimal(0.93).times(data.voidhypercats)),
        ),
      )
    ) {
      data.voidCats = new Decimal(1e5).times(
        new Decimal(2.25).pow(new Decimal(0.93).times(data.voidhypercats)),
      );
      data.voidhypercats = data.voidhypercats.plus(1);
    }
  }
}
export function catLimitReset(force = 0) {
  let catlimtemp = new Decimal(1000)
    .pow(data.catLimit)
    .times(new Decimal(0.85).pow(data.lessSpace));
  if (data.cats.greaterThanOrEqualTo(catlimtemp) || force == 1) {
    data.cats = new Decimal(11);
    if (force == 0) {
      data.catLimit = data.catLimit.plus(1);
    }
    data.catSummoners = Decimal.dZero;
    data.catFood = Decimal.dZero;
    data.catGodSacrificed = Decimal.dZero;
    data.hyperCats = Decimal.dZero;
    data.energyCats = Decimal.dZero;
  }
}
export function buyAll() {
  if (data.catLimit.gte(6)) {
    while (
      data.cats.greaterThanOrEqualTo(
        new Decimal(10).times(new Decimal(1.75).pow(data.catSummoners)),
      ) ||
      data.cats.greaterThanOrEqualTo(
        new Decimal(25).times(new Decimal(2.05).pow(data.catFood)),
      )
    ) {
      buyItem(2, 1);
      buyItem(1, 1);
    }
  }
}
function respec() {
  if (
    confirm(
      "Are you sure? you will regain all your Cat Coins, but you will have to retry the CL!",
    )
  ) {
    data.spentCatCoins = Decimal.dZero;
    data.lessSpace = Decimal.dZero;
    data.betterMagic = Decimal.dZero;
    catLimitReset(1);
  }
}
function verifyCode(code: string) {
  if (code.length !== 16) return;
  switch (code) {
    case "hyperspecificats":
      currentTab = "hyperspecificats";
      break;
    case "killsyourselfasap":
      hardReset();
      break;
    case "dogsdogsdogsdogs":
      data.cats = Decimal.dZero;
      currentTab = "dogsdogsdogsdogs";
      break;
    case "mewwhenthecatsdo":
      console.log("mew in 3m");
      setTimeout(() => {
        console.log("mew");
        alert("mew sound not found");
      }, 180000);
      break;
    case "excludeallstyles":
      document
        .querySelectorAll('style,link[rel="stylesheet"]')
        .forEach((item) => item.remove());
      break;
    case "moregamesbyteste":
      window.location.href = "https://testehome.glitch.me/cmowre";
      break;
    case "stupidoptionslol":
      currentTab = "stupidoptionslol";
      break;
    default:
      alert("Invalid code");
  }
  elements.secretpasses.value = "";
}

load();
gel("newsticker").textContent =
  newsfile[Math.floor(Math.random() * (newsfile.length - 1))];

setInterval(() => {
  save();
}, 10000);

let avgmsptTimer = 0;
const avgmspt: Array<number> = [];

setInterval(() => {
  const catlimtemp = new Decimal(1000)
    .pow(data.catLimit)
    .times(new Decimal(0.85).pow(data.lessSpace));
  if (data.cats.gte(data.highCats)) {
    data.highCats = data.cats;
  }
  const dt = new Decimal(Date.now()).minus(data.lastTick).divide(1000);
  // deltatime = (new Decimal(Date.now()).minus(d.lastTick).divide(1000))
  data.lastTick = new Decimal(Date.now());
  document.title = formatForH(data.cats) + " Cats | CatGame";
  updateTabs();

  // CS^((cc.BM/60)+1)*(1.75^CF)
  const base_cps = data.catSummoners
    .pow(data.betterMagic.divide(60).plus(1))
    .times(new Decimal(1.75).pow(data.catFood));

  //1.05^CL
  const catlimit_boost = new Decimal(1.05)
    .plus(voidUpgradeBoosts(3))
    .pow(data.catLimit.minus(1));

  //(log5(cg.SA+1)+1)^1.01
  const catgod_boost = data.catGodSacrificed
    .plus(1)
    .logarithm(new Decimal(5).minus(voidUpgradeBoosts(1)))
    .plus(1)
    .pow(1.01);
  const hypercat_boost = data.hyperCats.plus(1).pow(voidUpgradeBoosts(2));

  // log3(VC+1)*(log10(CL.v)/(log10(cats+1))+1 if >1 or not undefined, else 1
  const void_boost =
    !Decimal.isNaN(
      data.voidCats
        .plus(1)
        .log(3)
        .times(catlimtemp.log(10).divide(data.cats.plus(1).log(10)))
        .plus(1),
    ) &&
    data.voidCats
      .plus(1)
      .log(3)
      .times(catlimtemp.log(10).divide(data.cats.plus(1).log(10)))
      .plus(1)
      .gte(1)
      ? data.voidCats
          .plus(1)
          .log(3)
          .times(catlimtemp.log(10).divide(data.cats.plus(1).log(10)))
          .plus(1)
      : 1;

  catsPerSecond = base_cps
    .times(catlimit_boost)
    .times(catgod_boost)
    .times(hypercat_boost)
    .times(void_boost);

  updateElement();

  if (
    data.catLimit.greaterThanOrEqualTo(8) &&
    !isNaN(data.cats.log(10).mag) &&
    !data.voidGain.gte(1)
  ) {
    data.energyCats = data.energyCats.plus(data.cats.log(10).times(dt));
  }

  if (
    data.catLimit.greaterThanOrEqualTo(11) &&
    !isNaN(data.energyCats.log(10).mag) &&
    data.voidGain.gte(1)
  ) {
    data.voidCats = data.voidCats.plus(
      data.energyCats
        .log(10)
        .times(new Decimal(1.375).pow(data.voidhypercats))
        .mul(dt),
    );
  }

  data.cats = data.cats.plus(catsPerSecond.mul(dt));

  if (data.cats.greaterThanOrEqualTo(catlimtemp)) {
    data.cats = catlimtemp;
  }
  if (data.catLimit.greaterThanOrEqualTo(8)) {
    energyMilestone();
    if (
      data.energyCatMilestone.gte(4) &&
      data.eautobuys.gte(1) &&
      !data.voidGain.gte(1)
    ) {
      data.catGodSacrificed = data.catGodSacrificed.plus(
        data.cats.divide(20).mul(dt),
      );
    }
    if (
      data.energyCatMilestone.gte(2) &&
      data.eautobuyl.gte(1) &&
      !data.voidGain.gte(1)
    ) {
      catLimitReset(0);
    }
    if (
      data.energyCatMilestone.gte(3) &&
      data.eautobuycf.gte(1) &&
      !data.voidGain.gte(1)
    ) {
      buyItem(2, 1);
    }
    if (
      data.energyCatMilestone.gte(1) &&
      data.eautobuycs.gte(1) &&
      !data.voidGain.gte(1)
    ) {
      buyItem(1, 1);
    }
  }

  if (currentTab == "dogsdogsdogsdogs") {
    data.cats = Decimal.dZero;
  }

  timeSinceLastNewsMessage = timeSinceLastNewsMessage.add(dt);
  if (timeSinceLastNewsMessage.gte(10)) {
    console.log(newsfile[Math.floor(Math.random() * (newsfile.length - 1))]);
    gel("newsticker").textContent =
      newsfile[Math.floor(Math.random() * (newsfile.length - 1))];
    timeSinceLastNewsMessage = Decimal.dZero;
  }

  avgmsptTimer++;

  if (avgmsptTimer >= 100) {
    avgmsptTimer = 0;
    avgmspt.length = 0;
  }

  avgmspt.push(dt.mul(1000).toNumber());

  gel("avg-mspt").textContent = (
    avgmspt.reduce((a, b) => a + b) / avgmspt.length
  ).toFixed(3);
  elements.debug.mspt.textContent = dt.mul(1000).toString();
}, 1000 / TPS);

// post initialization
console.debug("catgame core loaded");
console.debug("begin loading post initialize");
elements.debug.targetMspt.textContent = (1000 / TPS).toString();

// verifyCode(elements.secretpasses.value)
// surely this wouldn't break anything
// if it does then the game is bad
